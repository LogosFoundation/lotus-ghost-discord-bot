const {
  DISCORD_BOT_TOKEN,
  DISCORD_PAID_MEMBER_ROLE_ID,
  DISCORD_GUILD_ID,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  GHOST_API_URL,
  GHOST_ADMIN_API_KEY,
  SERVER_BASE_URL,
  SERVER_PORT,
} = process.env;

if (
  !DISCORD_BOT_TOKEN ||
  !DISCORD_PAID_MEMBER_ROLE_ID ||
  !DISCORD_GUILD_ID ||
  !DISCORD_CLIENT_ID ||
  !DISCORD_CLIENT_SECRET ||
  !GHOST_API_URL ||
  !GHOST_ADMIN_API_KEY ||
  !SERVER_BASE_URL
) {
  throw new Error('Missing environment variables');
}

export const env = {
  DISCORD_BOT_TOKEN,
  DISCORD_PAID_MEMBER_ROLE_ID,
  DISCORD_GUILD_ID,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  GHOST_API_URL,
  GHOST_ADMIN_API_KEY,
  SERVER_BASE_URL,
  SERVER_PORT,
};
