/**
 * --------------------------------------------
 *
 * Code for deploying commands to the bot
 * This does not need to be run every time the bot is started
 *
 * --------------------------------------------
 */

// import { REST, Routes, SlashCommandBuilder } from 'discord.js';
// import { env } from './env';

export const COMMAND_ADDRESS = 'address';

// const commands = [
//   new SlashCommandBuilder()
//     .setName(COMMAND_ADDRESS)
//     .setDescription('Lotus address commands')
//     .addSubcommand((subcommand) =>
//       subcommand
//         .setName('get')
//         .setDescription('Get Lotus address')
//         .addUserOption((option) =>
//           option
//             .setName('user')
//             .setDescription(
//               'User to get Lotus address for. Defaults to yourself.',
//             ),
//         ),
//     )
//     .addSubcommand((subcommand) =>
//       subcommand
//         .setName('set')
//         .setDescription('Set Lotus address')
//         .addStringOption((option) =>
//           option
//             .setName('address')
//             .setDescription('Lotus address')
//             .setRequired(true),
//         ),
//     ),
// ].map((command) => command.toJSON());

// const rest = new REST({ version: '10' }).setToken(env.DISCORD_BOT_TOKEN);

// rest
//   .put(
//     Routes.applicationGuildCommands(
//       env.DISCORD_CLIENT_ID,
//       env.DISCORD_GUILD_ID,
//     ),
//     { body: commands },
//   )
//   .then(() => console.log('Successfully registered application commands.'))
//   .catch(console.error);

// rest
//   .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] })
//   .then(() => console.log('Successfully deleted all guild commands.'))
//   .catch(console.error);
