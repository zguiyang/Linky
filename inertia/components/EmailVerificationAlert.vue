<template>
  <u-alert
    v-if="showAlert && !userClosed"
    title="请验证您的邮箱地址"
    description="验证邮箱以使用完整功能，包括重置密码等安全功能"
    color="warning"
    icon="i-lucide-mail-warning"
    :close="true"
    @update:open="handleClose"
    :actions="[
      {
        label: sending
          ? '发送中...'
          : isCooldown
            ? `${cooldownSeconds}s 后重发`
            : '重新发送验证邮件',
        color: 'warning',
        variant: 'solid',
        disabled: sending || isCooldown,
        onClick: handleResend,
      },
    ]"
  />
</template>

<script setup lang="ts">
import { usePage } from '@inertiajs/vue3'
import { ref, computed, onUnmounted } from 'vue'
import { router } from '@inertiajs/vue3'

const page = usePage()
const user = computed(
  () => page.props.user as { emailVerifiedAt: string | null; email: string } | null
)

const showAlert = computed(() => user.value && !user.value.emailVerifiedAt)
const userClosed = ref(false)

const sending = ref(false)
const isCooldown = ref(false)
const cooldownSeconds = ref(60)
let cooldownTimer: NodeJS.Timeout | null = null

const handleClose = () => {
  userClosed.value = true
}

const handleResend = async () => {
  if (sending.value || isCooldown.value) return

  sending.value = true

  try {
    await router.post(
      '/auth/resend-verification',
      {},
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          const result = page.props as any
          if (result.success) {
            startCooldown()
            // 重新加载当前页面以更新用户状态
            router.reload({ only: ['user'] })
          } else {
            alert(result.message || '发送失败，请稍后重试')
          }
        },
        onError: (errors) => {
          console.error('Failed to resend verification email:', errors)
          alert('发送失败，请稍后重试')
        },
      }
    )
  } catch (error) {
    console.error('Failed to resend verification email:', error)
    alert('发送失败，请稍后重试')
  } finally {
    sending.value = false
  }
}

const startCooldown = () => {
  isCooldown.value = true
  cooldownSeconds.value = 60

  cooldownTimer = setInterval(() => {
    cooldownSeconds.value--
    if (cooldownSeconds.value <= 0) {
      clearInterval(cooldownTimer!)
      isCooldown.value = false
    }
  }, 1000)
}

onUnmounted(() => {
  if (cooldownTimer) {
    clearInterval(cooldownTimer)
  }
})
</script>
