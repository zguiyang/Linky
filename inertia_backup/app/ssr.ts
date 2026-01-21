import { createInertiaApp } from '@inertiajs/vue3'
import { renderToString } from '@vue/server-renderer'
import ui from '@nuxt/ui/vue-plugin'
import { createHead, renderSSRHead } from '@unhead/vue/server'
import { createSSRApp, h, type DefineComponent } from 'vue'

export default function render(page: any) {
  const head = createHead()
  return createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = import.meta.glob<DefineComponent>('../pages/**/*.vue', { eager: true })
      return pages[`../pages/${name}.vue`]
    },
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) })
        .use(plugin)
        .use(head)
        .use(ui)
    },
  }).then(async (app) => {
    const payload = await renderSSRHead(head)
    app.head.push(payload.headTags)
    return app
  })
}
