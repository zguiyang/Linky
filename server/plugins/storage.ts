import { consola } from 'consola';
import chalk from 'chalk';
import redisDriver from 'unstorage/drivers/redis';

export default defineNitroPlugin(() => {
  consola.start(chalk.blue('loading redis driver~~'));
  const redisConfig = useRuntimeConfig().redis;
  const storage = useStorage();

  const driver = redisDriver({
    base: 'redis',
    host: redisConfig.host,
    port: Number(redisConfig.port),
    db: Number(redisConfig.db),
    password: redisConfig.password,
  });

  consola.success(chalk.green('loading redis driver success'));

  storage.mount('redis', driver);
});
