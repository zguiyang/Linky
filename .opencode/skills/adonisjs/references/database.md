# Adonisjs - Database

**Pages:** 7

---

## Social authentication

**URL:** https://docs.adonisjs.com/guides/authentication/social-authentication

**Contents:**
- Social authentication
- Installation
- Configuration
  - Configuring the callback URL
- Usage
  - Redirecting the user for authentication
  - Handling callback response
- User properties
  - id
  - email

You can implement social authentication in your AdonisJS applications using the @adonisjs/ally package. Ally comes with the following inbuilt drivers, alongside an extensible API to register custom drivers.

Ally does not store any users or access tokens on your behalf. It implements the OAuth2 and OAuth1 protocols, authenticates a user with social service, and provides user details. You can store that information inside a database and use the auth package to login the user within your application.

Install and configure the package using the following command :

Installs the @adonisjs/ally package using the detected package manager.

Registers the following service provider inside the adonisrc.ts file.

Create the config/ally.ts file. This file contains the configuration settings for selected OAuth providers.

Defines the environment variables to store CLIENT_ID and CLIENT_SECRET for selected OAuth providers.

The @adonisjs/ally package configuration is stored inside the config/ally.ts file. You can define config for multiple services within a single config file.

See also: Config stub

OAuth providers require you to register a callback URL to handle the redirect response after the user authorizes the login request.

The callback URL must be registered with the OAuth service provider. For example: If you are using GitHub, you must log in to your GitHub account, create a new app and define the callback URL using the GitHub interface.

Also, you must register the same callback URL within the config/ally.ts file using the callbackUrl property.

Once the package has been configured, you can interact with Ally APIs using the ctx.ally property. You can switch between the configured auth providers using the ally.use() method. For example:

The first step in social authentication is to redirect the user to an OAuth service and wait for them to either approve or deny the authentication request.

You can perform the redirect using the .redirect() method.

You can pass a callback function to define custom scopes or query string values during the redirect.

The user will be redirected back to your application's callbackUrl after they approve or deny the authentication request.

Within this route, you can call the .user() method to get the logged-in user details and the access token. However, you must also check the response for possible error states.

Following is the list of properties you can access from the return value of the .user() method call. The properties are consistent among all the underlying drivers.

A unique ID returned by the OAuth provider.

The email address returned by the OAuth provider. The value will be null if the OAuth request does not ask for the user's email address.

Many OAuth providers allow users with unverified emails to log in and authenticate OAuth requests. You should use this flag to ensure only users with verified emails can log in.

Following is the list of possible values.

The name of the user returned by the OAuth provider.

A publicly visible nick name of the user. The value of nickName and name will be the same if the OAuth provider has no concept of nicknames.

The HTTP(s) URL to the user's public profile picture.

The token property is the reference to the underlying access token object. The token object has the following sub-properties.

Reference to the original response from the OAuth provider. You might want to reference the original response if the normalized set of user properties does not have all the information you need.

Scopes refers to the data you want to access after the user approves the authentication request. The name of scopes and the data you can access varies between the OAuth providers; therefore, you must read their documentation.

The scopes can be defined within the config/ally.ts file, or you can define them when redirecting the user.

Thanks to TypeScript, you will get autocomplete suggestions for all the available scopes.

You can customize the query parameters for the redirect request alongside the scopes. In the following example, we define the prompt and the access_type params applicable with the Google provider.

You can clear any existing parameters using the .clearParam() method on the request. This can be helpful if parameter defaults are defined in the config and you need to redefine them for a separate custom auth flow.

Sometimes, you might want to fetch user details from an access token stored in the database or provided via another OAuth flow. For example, you used the Native OAuth flow via a mobile app and received an access token back.

You can fetch the user details using the .userFromToken() method.

You can fetch the user details for an OAuth1 driver using the .userFromTokenAndSecret method.

Many OAuth providers recommend using a CSRF state token to prevent your application from cross-site request forgery attacks.

Ally creates a CSRF token and saves it inside an encrypted cookie, which is later verified after the user approves the authentication request.

However, if you cannot use cookies for some reason, you can enable the stateless mode in which no state verification will take place, and hence, no CSRF cookie will be generated.

The following is the complete configuration reference for all the drivers. You can copy-paste the following objects directly to config/ally.ts file.

This configuration is deprecated in compliance with the updated LinkedIn OAuth requirements.

We have created a starter kit to implement and publish a custom social driver on npm. Please go through the README of the starter kit for further instructions.

**Examples:**

Example 1 (markdown):
```markdown
node ace add @adonisjs/ally

# Define providers as CLI flags
node ace add @adonisjs/ally --providers=github --providers=google
```

Example 2 (typescript):
```typescript
{
  providers: [
    // ...other providers
    () => import('@adonisjs/ally/ally_provider')
  ]
}
```

Example 3 (typescript):
```typescript
import { defineConfig, services } from '@adonisjs/ally'

defineConfig({
  github: services.github({
    clientId: env.get('GITHUB_CLIENT_ID')!,
    clientSecret: env.get('GITHUB_CLIENT_SECRET')!,
    callbackUrl: '',
  }),
  twitter: services.twitter({
    clientId: env.get('TWITTER_CLIENT_ID')!,
    clientSecret: env.get('TWITTER_CLIENT_SECRET')!,
    callbackUrl: '',
  }),
})
```

Example 4 (typescript):
```typescript
router.get('/github/redirect', ({ ally }) => {
  // GitHub driver instance
  const gh = ally.use('github')
})

router.get('/twitter/redirect', ({ ally }) => {
  // Twitter driver instance
  const twitter = ally.use('twitter')
})

// You could also dynamically retrieve the driver
router.get('/:provider/redirect', ({ ally, params }) => {
  const driverInstance = ally.use(params.provider)
}).where('provider', /github|twitter/)
```

---

## Lucid ORM

**URL:** https://docs.adonisjs.com/guides/database/lucid

**Contents:**
- Lucid ORM
- Why Lucid
- Installation
- Creating your first model
- Migrations
- Query Builder
- CRUD operations
- Learn more

Lucid is a SQL query builder, and an Active Record ORM built on top of Knex created and maintained by the AdonisJS core team. Lucid strives to leverage SQL to its full potential and offers clean API for many advanced SQL operations.

The documentation for Lucid is available on https://lucid.adonisjs.com

Following are some of the hand-picked Lucid features.

Apart from those, the following are additional reasons for using Lucid inside an AdonisJS application.

We ship first-class integrations for Lucid with the Auth package and validator. Therefore, you do not have to write these integrations yourself.

Lucid comes pre-configured with the api and the web starter kits, providing a head start to your applications.

One of the primary goals of Lucid is to leverage SQL to its full potential and support many advanced SQL operations like window functions, recursive CTEs, JSON operations, row-based locks, and much more.

Both Lucid and Knex have been around for many years. Hence, they are mature and battle-tested compared to many other new ORMs.

With that said, AdonisJS does not force you to use Lucid. Just uninstall the package and install the ORM of your choice.

Install and configure Lucid using the following command.

Registers the following service provider inside the adonisrc.ts file.

Register the following command inside the adonisrc.ts file.

Create the config/database.ts file.

Define the environment variables and their validations for the selected dialect.

Install required peer dependencies.

Once the configuration is completed, you can create your first model using the following command.

This command creates a new file inside the app/models directory with the following content.

Learn more about models by visiting the official documentation.

Migrations are a way to modify the database schema and data using incremental changesets. You can create a new migration using the following command.

This command creates a new file inside the database/migrations directory with the following content.

You can run all the pending migrations using the following command.

Learn more about migrations by visiting the official documentation.

Lucid ships with a fluent query builder built on top of Knex. You can use the query builder to perform CRUD operations on your database.

The query builder can also be scoped to a model instance.

Learn more about the query builder by visiting the official documentation.

Lucid models have built-in methods to perform CRUD operations on the database.

Learn more about CRUD operations by visiting the official documentation.

**Examples:**

Example 1 (python):
```python
node ace add @adonisjs/lucid
```

Example 2 (typescript):
```typescript
{
  providers: [
    // ...other providers
    () => import('@adonisjs/lucid/database_provider'),
  ]
}
```

Example 3 (typescript):
```typescript
{
  commands: [
    // ...other commands
    () => import('@adonisjs/lucid/commands'),
  ]
}
```

Example 4 (unknown):
```unknown
node ace make:model User
```

---

## SQL and ORMs

**URL:** https://docs.adonisjs.com/guides/database/introduction

**Contents:**
- SQL and ORMs
- Popular options
- Using other SQL libraries and ORMs
  - Authentication

SQL databases are popular for storing the application's data in persistent storage. You can use any libraries and ORMs to make SQL queries inside an AdonisJS application.

The AdonisJS core team built the Lucid ORM but does not force you to use it. You can use any other SQL libraries and ORMs you would like inside an AdonisJS application.

Following is the list of other popular SQL libraries and ORMs you can use inside an AdonisJS application (just like any other Node.js application).

When using another SQL library or ORM, you will have to change the configuration of some packages manually.

The AdonisJS authentication module comes with built-in support for Lucid to fetch the authenticated user. When using another SQL library or ORM, you will have to implement the SessionUserProviderContract or the AccessTokensProviderContract interface to fetch the user.

Here is an example of how you can implement the SessionUserProviderContract interface when using Kysely.

Once you have implemented the UserProvider interface, you can use it inside your configuration.

**Examples:**

Example 1 (typescript):
```typescript
import { symbols } from '@adonisjs/auth'
import type { SessionGuardUser, SessionUserProviderContract } from '@adonisjs/auth/types/session'
import type { Users } from '../../types/db.js' // Specific to Kysely

export class SessionKyselyUserProvider implements SessionUserProviderContract<Users> {
  /**
   * Used by the event emitter to add type information to the events emitted by the session guard.
   */   
  declare [symbols.PROVIDER_REAL_USER]: Users

  /**
   * Bridge between the session guard and your provider.
   */
  async createUserForGuard(user: Users): Promise<SessionGuardUser<Users>> {
    return {
      getId() {
        return user.id
      },
      getOriginal() {
        return user
      },
    }
  }

  /**
   * Find a user using the user id using your custom SQL library or ORM.
   */
  async findById(identifier: number): Promise<SessionGuardUser<Users> | null> {
    const user = await db
      .selectFrom('users')
      .selectAll()
      .where('id', '=', identifier)
      .executeTakeFirst()

    if (!user) {
      return null
    }

    return this.createUserForGuard(user)
  }
}
```

Example 2 (typescript):
```typescript
const authConfig = defineConfig({
  default: 'web',

  guards: {
    web: sessionGuard({
      useRememberMeTokens: false,
      provider: sessionUserProvider({
        model: () => import('#models/user'),
      }),
      
      provider: configProvider.create(async () => {
        const { SessionKyselyUserProvider } = await import(
          '../app/auth/session_user_provider.js' // Path to the file
        )

        return new SessionKyselyUserProvider()
      }),
    }),
  },
})
```

---

## SQL and ORMs

**URL:** https://docs.adonisjs.com/guides/database

**Contents:**
- SQL and ORMs
- Popular options
- Using other SQL libraries and ORMs
  - Authentication

SQL databases are popular for storing the application's data in persistent storage. You can use any libraries and ORMs to make SQL queries inside an AdonisJS application.

The AdonisJS core team built the Lucid ORM but does not force you to use it. You can use any other SQL libraries and ORMs you would like inside an AdonisJS application.

Following is the list of other popular SQL libraries and ORMs you can use inside an AdonisJS application (just like any other Node.js application).

When using another SQL library or ORM, you will have to change the configuration of some packages manually.

The AdonisJS authentication module comes with built-in support for Lucid to fetch the authenticated user. When using another SQL library or ORM, you will have to implement the SessionUserProviderContract or the AccessTokensProviderContract interface to fetch the user.

Here is an example of how you can implement the SessionUserProviderContract interface when using Kysely.

Once you have implemented the UserProvider interface, you can use it inside your configuration.

**Examples:**

Example 1 (typescript):
```typescript
import { symbols } from '@adonisjs/auth'
import type { SessionGuardUser, SessionUserProviderContract } from '@adonisjs/auth/types/session'
import type { Users } from '../../types/db.js' // Specific to Kysely

export class SessionKyselyUserProvider implements SessionUserProviderContract<Users> {
  /**
   * Used by the event emitter to add type information to the events emitted by the session guard.
   */   
  declare [symbols.PROVIDER_REAL_USER]: Users

  /**
   * Bridge between the session guard and your provider.
   */
  async createUserForGuard(user: Users): Promise<SessionGuardUser<Users>> {
    return {
      getId() {
        return user.id
      },
      getOriginal() {
        return user
      },
    }
  }

  /**
   * Find a user using the user id using your custom SQL library or ORM.
   */
  async findById(identifier: number): Promise<SessionGuardUser<Users> | null> {
    const user = await db
      .selectFrom('users')
      .selectAll()
      .where('id', '=', identifier)
      .executeTakeFirst()

    if (!user) {
      return null
    }

    return this.createUserForGuard(user)
  }
}
```

Example 2 (typescript):
```typescript
const authConfig = defineConfig({
  default: 'web',

  guards: {
    web: sessionGuard({
      useRememberMeTokens: false,
      provider: sessionUserProvider({
        model: () => import('#models/user'),
      }),
      
      provider: configProvider.create(async () => {
        const { SessionKyselyUserProvider } = await import(
          '../app/auth/session_user_provider.js' // Path to the file
        )

        return new SessionKyselyUserProvider()
      }),
    }),
  },
})
```

---

## Redis

**URL:** https://docs.adonisjs.com/guides/database/redis

**Contents:**
- Redis
- Installation
- Configuration
  - Connect via Socket
  - Configuring clusters
  - Configuring sentinels
- Usage
  - Switching between connections
  - Quitting connections
- Error handling

You can use Redis inside your AdonisJS applications using the @adonisjs/redis package. The package is a thin wrapper on top of ioredis with better DX around Pub/Sub and automatic management of multiple redis connections.

Install and configure the package using the following command :

Installs the @adonisjs/redis package using the detected package manager.

Registers the following service provider inside the adonisrc.ts file.

Create config/redis.ts file. This file contains the connection configuration for your redis server.

Define following environment variables and their validation rules.

The configuration for the Redis package is stored inside the config/redis.ts file.

See also: Config file stub

The connection property defines the connection to use by default. When you run redis commands without choosing an explicit connection, they will be executed against the default connection.

The connections property is a collection of multiple named connections. You can define one or more connections inside this object and switch between them using the redis.connection() method.

Every named connection config is identical to the config accepted by ioredis.

You can configure Redis to use a Unix socket for connections. Use the path property in your Redis configuration object and provide the file system path to the socket.

The @adonisjs/redis package will create a cluster connection if you define an array of hosts inside the connection config. For example:

You can configure a redis connection to use sentinels by defining an array of sentinel nodes within the connection config. For example:

See also: IORedis docs on Sentinels config

You can run redis commands using the redis service exported by the package. The redis service is a singleton object configured using the configuration you have defined inside the config/redis.ts file.

Consult the ioredis documentation to view the list of available methods. Since we are a wrapper on top of IORedis, the commands API is identical.

Commands executed using the redis service are invoked against the default connection defined inside the config file. However, you can execute commands on a specific connection by first getting an instance of it.

The .connection() method creates and caches a connection instance for the process's lifetime.

The connections are long-lived, and you will get the same instance every time you call the .connection() method. You can quit the connection using the quit method. Use the disconnect method to end the connection forcefully.

Redis connections can fail anytime during the lifecycle of your application. Therefore it is essential to capture the errors and have a retry strategy.

By default, AdonisJS will log the redis connection errors using the application logger and retry a connection ten times before closing it permanently. The retry strategy is defined for every connection within the config/redis.ts file.

See also: IORedis docs on auto reconnect

You can disable the default error reporter using the .doNotLogErrors method. Doing so will remove the error event listener from the redis connection.

Redis needs multiple connections to publish and subscribe to channels. The subscriber connection cannot perform operations other than subscribing to new channels/patterns and unsubscribing.

When using the @adonisjs/redis package, you do not have to create a subscriber connection manually; we will handle that for you. When you call the subscribe method for the first time, we will automatically create a new subscriber connection.

When using ioredis, you must use two different APIs to subscribe to a channel and listen for new messages. However, with the AdonisJS wrapper, the subscribe method takes care of both.

You can publish messages using the publish method. The method accepts the channel name as the first parameter and the data to publish as the second parameter.

You can subscribe to patterns using the psubscribe method. Similar to the subscribe method, it will create a subscriber connection (if one does not exist).

You can unsubscribe from channels or patterns using the unsubscribe and punsubscribe methods.

You can register Lua Scripts as commands with the redis service, and they will be applied to all the connections.

See also: IORedis docs on Lua Scripting

Once you have defined a command, you can execute it using the runCommand method. First, all the keys are defined, and then the arguments.

The same command can be executed on an explicit connection.

Finally, you can also define commands with a specific connection instance. For example:

You can define the arguments transformer and the reply transformer using the redis.Command property. The API is identical to the IORedis API.

Following is the list of events emitted by a Redis connection instance.

The event is emitted when a connection is made. The subscriber:connect event is emitted when a subscriber connection is made.

Emitted when the connection is in wait mode because the lazyConnect option is set inside the config. After executing the first command, the connection will be moved from the wait state.

The event will be emitted immediately after the connect event unless you have enabled the enableReadyCheck flag inside the config. In that case, we will wait for the Redis server to report it is ready to accept commands.

The event is emitted when unable to connect to the redis server. See error handling to learn how AdonisJS handles connection errors.

The event is emitted when a connection is closed. IORedis might retry establishing a connection after emitting the close event, depending upon the retry strategy.

The event is emitted when trying to reconnect to the redis server after the close event.

The event is emitted when the connection has been closed, and no further reconnections will be made. It should be the end of the connection lifecycle.

The event is emitted when connected to a new cluster node (Applicable to cluster instances only).

The event is emitted when a cluster node is removed (Applicable to cluster instances only).

The event is emitted when unable to connect to a cluster node (Applicable to cluster instances only).

The event is emitted when a subscription on a given channel or a pattern has been established.

The event is emitted when unable to subscribe to a channel or a pattern.

**Examples:**

Example 1 (python):
```python
node ace add @adonisjs/redis
```

Example 2 (typescript):
```typescript
{
  providers: [
    // ...other providers
    () => import('@adonisjs/redis/redis_provider')
  ]
}
```

Example 3 (unknown):
```unknown
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
```

Example 4 (typescript):
```typescript
import env from '#start/env'
import { defineConfig } from '@adonisjs/redis'

const redisConfig = defineConfig({
  connection: 'main',
  connections: {
    main: {
      host: env.get('REDIS_HOST'),
      port: env.get('REDIS_PORT'),
      password: env.get('REDIS_PASSWORD', ''),
      db: 0,
      keyPrefix: '',
    },
  },
})

export default redisConfig
```

---

## Health checks

**URL:** https://docs.adonisjs.com/guides/digging-deeper/health-checks

**Contents:**
- Health checks
- Configuring health checks
- Exposing an endpoint
  - Sample report
  - Protecting the endpoint
- Available health checks
  - DiskSpaceCheck
  - MemoryHeapCheck
  - MemoryRSSCheck
  - DbCheck

Health checks are performed to ensure that your application is in a healthy state while running in production. This may include monitoring the available disk space on the server, the memory consumed by your application, or testing the database connection.

AdonisJS provides a handful of built-in health checks and the ability to create and register custom health checks.

You may configure health checks in your application by executing the following command. The command will create a start/health.ts file and configures health checks for memory usage and used disk space. Feel free to modify this file and remove/add additional health checks.

Make sure you have installed @adonisjs/core@6.12.1 before using the following command.

A common approach for performing health checks is to expose an HTTP endpoint that an external monitoring service can ping to collect the health check results.

So, let's define a route within the start/routes.ts file and bind the HealthChecksController to it. The health_checks_controller.ts file is created during the initial setup and lives inside the app/controllers directory.

The healthChecks.run method will execute all the checks and return a detailed report as a JSON object. The report has the following properties:

A boolean to know if all the checks have passed. The value will be set to false if one or more checks fail.

Report status after performing all the checks. It will be one of the following.

The DateTime at which the tests were completed.

An array of objects containing the detailed report of all the performed checks.

Debug info can be used to identify the process and the duration for which it has been running. It includes the following properties.

You may protect the /health endpoint from public access using either the auth middleware or creating a custom middleware that checks for a particular API secret inside the request header. For example:

Following is the list of available health checks you can configure within the start/health.ts file.

The DiskSpaceCheck calculates the used disk space on your server and reports a warning/error when a certain threshold has been exceeded.

By default, the warning threshold is set to 75%, and the failure threshold is set to 80%. However, you may also define custom thresholds.

The MemoryHeapCheck monitors the heap size reported by the process.memoryUsage() method and reports a warning/error when a certain threshold has been exceeded.

By default, the warning threshold is set to 250MB and the failure threshold is set to 300MB. However, you may define custom thresholds as well.

The MemoryRSSCheck monitors the Resident Set Size reported by the process.memoryUsage() method and reports a warning/error when a certain threshold has been exceeded.

By default, the warning threshold is set to 320MB, and the failure threshold is set to 350MB. However, you may also define custom thresholds.

The DbCheck is provided by the @adonisjs/lucid package to monitor the connection with a SQL database. You can import and use it as follows.

Following is an example report from the database health check.

The DbCheck class accepts a database connection for monitoring. Register this check multiple times for each connection if you want to monitor multiple connections. For example:

The DbConnectionCountCheck monitors the active connections on the database server and reports a warning/error when a certain threshold has been exceeded. This check is only supported for PostgreSQL and MySQL databases.

Following is an example report from the database connection count health check.

By default, the warning threshold is set to 10 connections, and the failure threshold is set to 15 connections. However, you may also define custom thresholds.

The RedisCheck is provided by the @adonisjs/redis package to monitor the connection with a Redis database (including Cluster). You can import and use it as follows.

Following is an example report from the database health check.

The RedisCheck class accepts a redis connection to monitor. Register this check multiple times for each connection if you want to monitor multiple connections. For example:

The RedisMemoryUsageCheck monitors the memory consumption of the redis server and reports a warning/error when a certain threshold has been exceeded.

Following is an example report from the redis memory usage health check.

By default, the warning threshold is set to 100MB, and the failure threshold is set to 120MB. However, you may also define custom thresholds.

Health checks are performed every time you call the healthChecks.run method (aka visit the /health endpoint). You might want to ping the /health endpoint frequently, but avoid performing certain checks on every visit.

For example, monitoring disk space every minute is not very useful, but tracking memory every minute can be helpful.

Therefore, we allow you to cache the results of individual health checks when you register them. For example:

You may create a custom health check as a JavaScript class that adheres to the HealthCheckContract interface. You can define a health check anywhere inside your project or package and import it within the start/health.ts file to register it.

As shown in the above example, you may use the Result class to create Health check results. Optionally, you may merge meta-data for the result as follows.

You may import your custom health check class within the start/health.ts file and register it by creating a new class instance.

**Examples:**

Example 1 (unknown):
```unknown
node ace configure health_checks
```

Example 2 (typescript):
```typescript
import { HealthChecks, DiskSpaceCheck, MemoryHeapCheck } from '@adonisjs/core/health'

export const healthChecks = new HealthChecks().register([
  new DiskSpaceCheck(),
  new MemoryHeapCheck(),
])
```

Example 3 (typescript):
```typescript
import router from '@adonisjs/core/services/router'
const HealthChecksController = () => import('#controllers/health_checks_controller')

router.get('/health', [HealthChecksController])
```

Example 4 (json):
```json
{
  "isHealthy": true,
  "status": "warning",
  "finishedAt": "2024-06-20T07:09:35.275Z",
  "debugInfo": {
    "pid": 16250,
    "ppid": 16051,
    "platform": "darwin",
    "uptime": 16.271809083,
    "version": "v21.7.3"
  },
  "checks": [
    {
      "name": "Disk space check",
      "isCached": false,
      "message": "Disk usage is 76%, which is above the threshold of 75%",
      "status": "warning",
      "finishedAt": "2024-06-20T07:09:35.275Z",
      "meta": {
        "sizeInPercentage": {
          "used": 76,
          "failureThreshold": 80,
          "warningThreshold": 75
        }
      }
    },
    {
      "name": "Memory heap check",
      "isCached": false,
      "message": "Heap usage is under defined thresholds",
      "status": "ok",
      "finishedAt": "2024-06-20T07:09:35.265Z",
      "meta": {
        "memoryInBytes": {
          "used": 41821592,
          "failureThreshold": 314572800,
          "warningThreshold": 262144000
        }
      }
    }
  ]
}
```

---

## Database tests

**URL:** https://docs.adonisjs.com/guides/testing/database

**Contents:**
- Database tests
- Migrating the database
  - Reset database after each run cycle
  - Truncate tables after each run cycle
- Seeding the database
- Keeping the database clean between tests
  - Global transaction
  - Truncate tables

Database tests refer to testing how your application interacts with the database. This includes testing what is written to the database, how to run migrations before the tests, and how to keep the database clean between tests.

Before executing your tests that interact with the database, you would want to run your migrations first. We have two hooks available in the testUtils service for that, which you can configure inside the tests/bootstrap.ts file.

The first option we have is testUtils.db().migrate(). This hook will first run all your migrations, and then rollback everything.

By configuring the hook here, what will happen is:

So, each time we run our tests, we will have a fresh and empty database.

Resetting the database after each run cycle is a good option, but it can be slow if you have a lot of migrations. Another option is to truncate the tables after each run cycle. This option will be faster, as the migrations will only be executed once : the very first time you run your tests on a fresh database.

At the end of each run cycle, the tables will just be truncated, but our schema will be kept. So, the next time we run our tests, we will have an empty database, but the schema will already be in place, so there's no need to run every migration again.

If you need to seed your database, you can use the testUtils.db().seed() hook. This hook will run all your seeds before running your tests.

When running tests, you may want to keep your database clean between each test. For that, you can use the testUtils.db().withGlobalTransaction() hook. This hook will start a transaction before each test and roll it back at the end of the test.

Note that if you are using any transactions in your tested code, this will not work as transactions cannot be nested. In this case, you can use the testUtils.db().migrate() or testUtils.db().truncate() hook instead.

As mentioned above, the global transaction will not work if you are using transactions in your tested code. In this case, you can use the testUtils.db().truncate() hook. This hook will truncate all your tables after each test.

**Examples:**

Example 1 (typescript):
```typescript
import testUtils from '@adonisjs/core/services/test_utils'

export const runnerHooks: Required<Pick<Config, 'setup' | 'teardown'>> = {
  setup: [
    () => testUtils.db().migrate(),
  ],
  teardown: [],
}
```

Example 2 (typescript):
```typescript
import testUtils from '@adonisjs/core/services/test_utils'

export const runnerHooks: Required<Pick<Config, 'setup' | 'teardown'>> = {
  setup: [
    () => testUtils.db().truncate(),
  ],
}
```

Example 3 (typescript):
```typescript
import testUtils from '@adonisjs/core/services/test_utils'

export const runnerHooks: Required<Pick<Config, 'setup' | 'teardown'>> = {
  setup: [
    () => testUtils.db().seed(),
  ],
}
```

Example 4 (typescript):
```typescript
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('User', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
})
```

---
