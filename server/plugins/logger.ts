import logger from '../lib/logger';

export default defineNitroPlugin(nitroApp => {
  console.log('=== 日志插件挂载 ===');
  console.log('NODE_ENV:', process.env.NODE_ENV);

  nitroApp.hooks.hook('error', error => {
    console.log('=== 错误钩子被调用 ===');
    logger.error(error, '请求错误');
  });
});
