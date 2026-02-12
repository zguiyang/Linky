// @ts-check
import vueComposable from 'eslint-plugin-vue-composable'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    plugins: {
      'vue-composable': vueComposable
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',

      // 强制模板中使用 kebab-case 命名组件
      'vue/component-name-in-template-casing': ['error', 'kebab-case', {
        registeredComponentsOnly: false,
        ignores: []
      }],

      // ========== Vue 3 Composition API 规范 ==========

      // Priority 0.3: Composable 必须在顶层调用
      'vue-composable/composable-placement': 'error',

      // Priority 0.4: 生命周期钩子必须在顶层
      'vue-composable/lifecycle-placement': 'error',

      // Priority 0.5: Vue 3 宏定义顺序
      'vue/define-macros-order': ['error', {
        order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots']
      }],

      // Priority 0.6: Props 解构模式 - 禁用（两种模式都可）
      'vue/define-props-destructuring': 'off'
    }
  }
  // Your custom configs here
)
