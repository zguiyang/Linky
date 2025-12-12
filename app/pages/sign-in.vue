<script setup lang="ts">
  import type { FormSubmitEvent } from '@nuxt/ui';
  import { z } from 'zod/v4';
  import { authClient } from '@/lib/auth-client';

  const toast = useToast();
  const route = useRoute();

  const schema = z.object({
    email: z.email({
      message: '请输入有效的邮箱地址',
    }),
    password: z.string({
      error: '请输入登录密码',
    }),
  });

  type Schema = z.output<typeof schema>;

  const state = reactive<Partial<Schema>>({
    email: undefined,
    password: undefined,
  });

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const res = await authClient.signIn.email(event.data);
    console.log(res);
    if (res.error) {
      toast.add({
        title: '登录失败',
        description: res.error.message,
        color: 'error',
      });
      return;
    } else {
      toast.add({
        title: '登录成功',
        description: '登录成功，即将进入首页',
        color: 'success',
      });
      const redirect = route.query.redirect as string;
      navigateTo(redirect ?? '/');
    }
  }
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center">
    <div class="w-4/12">
      <u-card variant="outline">
        <template #header>
          <h2 class="font-bold text-center text-2xl">系统登录</h2>
        </template>
        <u-form :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
          <u-form-field label="Email" name="email" size="lg">
            <u-input v-model="state.email" placeholder="Email" class="w-full" />
          </u-form-field>
          <u-form-field label="Password" name="password" size="lg">
            <u-input v-model="state.password" placeholder="Password" class="w-full" type="password" />
          </u-form-field>

          <u-button type="submit"> Submit </u-button>
          <u-button variant="link" to="/sign-up"> Sign Up </u-button>
        </u-form>
      </u-card>
    </div>
  </div>
</template>

<style scoped></style>
