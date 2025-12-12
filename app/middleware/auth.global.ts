import { authClient } from '@/lib/auth-client';
export default defineNuxtRouteMiddleware(async to => {
  const { data: session } = await authClient.useSession(useFetch);
  if (!session.value) {
    if (to.path !== '/sign-in' && !to.path.startsWith('/api')) {
      return navigateTo('/sign-in?redirect=' + to.fullPath, { external: true });
    }
  } else {
    if (to.path === '/sign-in') {
      return navigateTo('/', { external: true });
    }
  }
});
