import type { AuthSession } from '~/lib/auth';

declare module 'h3' {
  interface H3EventContext {
    session?: AuthSession;
  }
}
