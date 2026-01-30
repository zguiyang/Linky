<template>
  <u-alert
    v-if="showAlert && !userClosed"
    title="请验证您的邮箱地址"
    description="验证邮箱以使用完整功能，包括重置密码等安全功能"
    color="warning"
    icon="i-lucide-mail-warning"
    :close="true"
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
        onClick: handleResend
      }
    ]"
    @update:open="handleClose"
  />
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

interface User {
  emailVerifiedAt: string | null
  email: string
}

const props = defineProps<{
  user: User | null
}>()

const emit = defineEmits<{
  refresh: []
}>()

const showAlert = computed(() => props.user && !props.user.emailVerifiedAt)
const userClosed = ref(false)

const sending = ref(false)
const isCooldown = ref(false)
const cooldownSeconds = ref(60)
let cooldownTimer: NodeJS.Timeout | null = null

const handleClose = () => {
  userClosed.value = true
}

const handleResend = async () => {
  const toast = useToast()
  if (sending.value || isCooldown.value) return

  sending.value = true

  const { $api } = useNuxtApp()
  const result = await $api('/auth/resend-verification', { method: 'post' })

  if (result) {
    startCooldown()
    emit('refresh')
    toast.add({
      title: '验证邮件已发送',
      description: '请检查您的邮箱',
      color: 'success',
      icon: 'i-heroicons-envelope'
    })
  }

  sending.value = false
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
