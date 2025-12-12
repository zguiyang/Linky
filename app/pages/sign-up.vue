<script setup lang="ts">
  import type { FormSubmitEvent } from '@nuxt/ui';
  import { z } from 'zod/v4';
  import { authClient } from '@/lib/auth-client';

  const schema = z.object({
    name: z
      .string({
        error: '用户名不能为空',
      })
      .max(50, '用户名称不能超过50个字符'),
    displayUsername: z.string().max(100, '昵称不能超过100个字符').optional(),
    email: z.string().min(1, '邮箱不能为空').email('请输入有效的邮箱地址'),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, '密码必须包含字母和数字,且不少于8位'),
  });

  type Schema = z.output<typeof schema>;

  const state = reactive<Partial<Schema>>({
    name: '',
    displayUsername: '',
    email: '',
    password: '',
  });

  const toast = useToast();

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const data = event.data;
    const res = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
      username: data.name,
      displayUsername: data.displayUsername ?? data.name,
    });

    if (res.error) {
      toast.add({
        title: '注册失败',
        description: res.error.message,
        color: 'error',
      });
      return;
    }
    toast.add({
      title: '注册成功',
      description: '你已注册成功，去登录吧',
      color: 'success',
    });

    navigateTo('/sign-in');
  }
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center">
    <div class="w-4/12">
      <u-card variant="outline">
        <template #header>
          <h2 class="font-bold text-center text-2xl">系统注册</h2>
        </template>
        <u-form :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
          <u-form-field label="邮箱" name="email" size="lg">
            <u-input v-model="state.email" placeholder="邮箱" class="w-full" />
          </u-form-field>
          <u-form-field label="用户名" name="name" size="lg">
            <u-input v-model="state.name" placeholder="用户名" class="w-full" />
          </u-form-field>
          <u-form-field label="昵称" name="displayUsername" size="lg">
            <u-input v-model="state.displayUsername" placeholder="昵称" class="w-full" />
          </u-form-field>
          <u-form-field label="密码" name="password" size="lg">
            <u-input v-model="state.password" placeholder="密码" class="w-full" type="password" />
          </u-form-field>

          <u-button type="submit"> 提交 </u-button>
          <u-button variant="link" to="/sign-in"> 去登录 </u-button>
        </u-form>
      </u-card>
    </div>
  </div>
</template>

<style scoped></style>
