import GhostAdminAPI from '@tryghost/admin-api';
import { env } from './env';

export const ghostAPIClient = new GhostAdminAPI({
  url: env.GHOST_API_URL,
  key: env.GHOST_ADMIN_API_KEY,
  version: 'v5.0',
});

export async function getGhostMemberByDiscordId(
  ghostAPIClient: GhostAdminAPI,
  discordId: string,
): Promise<GhostAdminAPI.Member | null> {
  const ghostMembers = await ghostAPIClient.members.browse({
    limit: 'all',
  });

  const ghostMember = ghostMembers.find((member) =>
    member.labels.find((label) => label.name === `discordId=${discordId}`),
  );

  return ghostMember || null;
}
