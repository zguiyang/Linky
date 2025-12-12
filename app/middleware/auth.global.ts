import { authClient } from '@/lib/auth-client';

const notAuthPaths = ['/sign-in', '/sign-up'];
export default defineNuxtRouteMiddleware(async to => {
  const { data: session } = await authClient.useSession(useFetch);
  if (!session.value) {
    if (!notAuthPaths.includes(to.path) && !to.path.startsWith('/api')) {
      return navigateTo('/sign-in?redirect=' + to.fullPath, { external: true });
    }
  } else {
    if (to.path === '/sign-in') {
      return navigateTo('/', { external: true });
    }
  }
});
