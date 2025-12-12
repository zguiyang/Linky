import type { BetterAuthOptions } from 'better-auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { username } from 'better-auth/plugins';

import { setupDB } from './db-connection';
import { accounts, sessions, users, verifications } from '#shared/tables';

const db = setupDB();
const authConfig = useRuntimeConfig().auth;
const authProviders = authConfig.providers;

const config = {
  plugins: [
    username({
      maxUsernameLength: 50,
    }),
  ],

  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      users,
      sessions,
      accounts,
      verifications,
    },
  }),
  secret: authConfig.secret,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    ...(authProviders.github.clientId && authProviders.github.clientSecret
      ? {
          github: {
            clientId: authProviders.github.clientId,
            clientSecret: authProviders.github.clientSecret,
          },
        }
      : {}),
    ...(authProviders.google.clientId && authProviders.google.clientSecret
      ? {
          google: {
            clientId: authProviders.google.clientId,
            clientSecret: authProviders.google.clientSecret,
          },
        }
      : {}),
  },
  user: {
    modelName: 'users',
  },
  account: {
    modelName: 'accounts',
  },
  verification: {
    modelName: 'verifications',
  },
  session: {
    modelName: 'sessions',
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  advanced: {
    cookiePrefix: 'linky-auth',
  },
} satisfies BetterAuthOptions;

export const auth = betterAuth(config);

export type AuthSession = typeof auth.$Infer.Session;
