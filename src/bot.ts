import GhostAdminAPI from '@tryghost/admin-api';
import { Client } from 'discord.js';
import { COMMAND_ADDRESS } from './deploy-commands';
import { getGhostMemberByDiscordId } from './ghost';

export function createBot(ghostAPIClient: GhostAdminAPI) {
  const client = new Client({
    intents: [],
  });

  client.once('ready', () => {
    console.log('Bot ready!');
  });

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === COMMAND_ADDRESS) {
      const discordId = interaction.user.id;

      if (interaction.options.getSubcommand() === 'get') {
        const user = interaction.options.getUser('user');

        if (user) {
          const ghostMember = await getGhostMemberByDiscordId(
            ghostAPIClient,
            user.id,
          );

          if (ghostMember) {
            const address = ghostMember.labels
              .find((label) => label.name.startsWith('address='))
              ?.name?.split('=')[1];

            if (address) {
              await interaction.reply({
                content: `Lotus address for ${user.username} is ${address}`,
                ephemeral: true,
              });
            } else {
              await interaction.reply({
                content: `${user.username} does not have a Lotus address set`,
                ephemeral: true,
              });
            }
          } else {
            await interaction.reply({
              content: `${user.username} has not linked their Discord account`,
              ephemeral: true,
            });
          }
        } else {
          const ghostMember = await getGhostMemberByDiscordId(
            ghostAPIClient,
            discordId,
          );

          if (ghostMember) {
            const address = ghostMember.labels
              .find((label) => label.name.startsWith('address='))
              ?.name?.split('=')[1];

            if (address) {
              await interaction.reply({
                content: `Your Lotus address is ${address}`,
                ephemeral: true,
              });
            } else {
              await interaction.reply({
                content: 'You do not have a Lotus address set',
                ephemeral: true,
              });
            }
          } else {
            await interaction.reply({
              content:
                'You have not linked your Discord account. Please do so at https://blog.givelotus.org',
              ephemeral: true,
            });
          }
        }
      } else if (interaction.options.getSubcommand() === 'set') {
        const address = interaction.options.getString('address', true);

        // TODO: Validate address
        if (address.length <= 40 || address.length >= 50) {
          await interaction.reply({
            content: 'Invalid Lotus address',
            ephemeral: true,
          });
        }

        const ghostMember = await getGhostMemberByDiscordId(
          ghostAPIClient,
          discordId,
        );

        if (ghostMember) {
          const labels = ghostMember.labels;

          const addressLabelIdx = labels.findIndex((label) =>
            label.name.startsWith('address='),
          );

          if (addressLabelIdx !== -1) {
            labels.splice(addressLabelIdx, 1);
          }

          await ghostAPIClient.members.edit({
            id: ghostMember.id,
            labels: [...labels, { name: `address=${address}` }],
          });

          await interaction.reply({
            content: `Your Lotus address has been set to ${address}`,
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content:
              'You have not linked your Discord account. Please do so at https://blog.givelotus.org',
            ephemeral: true,
          });
        }
      }
    }
  });

  return client;
}
