import chalk from 'chalk';
import { consola } from 'consola';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as tables from '#shared/tables';

const logger = consola;

export type DbType = NodePgDatabase<typeof tables>;

let pool: Pool | null = null;
let db: DbType | null = null;

/**
 * Get database connection instance
 * @returns Database connection instance
 */
export function setupDB() {
  if (db && pool) {
    return db;
  }

  const database = useRuntimeConfig().database;
  const DATABASE_URI = database.url;

  if (!DATABASE_URI) {
    logger.error(chalk.red('数据库连接字符串未配置'));
    throw new Error('数据库连接字符串未配置');
  }

  try {
    logger.start(chalk.blue('connecting to database...'));
    pool = new Pool({
      connectionString: DATABASE_URI,
      ssl: false,
    });

    db = drizzle<typeof tables>({ client: pool, schema: tables });
    logger.success(chalk.green('connected to database'));
  } catch (e) {
    logger.error(e);
    pool = null;
    throw e;
  }

  return db;
}

/**
 * Close database connection and cleanup resources
 * @returns Promise that resolves when connection is closed
 */
export function closeDB() {
  if (pool) {
    pool.end().finally(() => {
      pool = null;
      db = null;
    });
  } else {
    logger.info(chalk.blue('No active database connection to close.'));
  }
}
