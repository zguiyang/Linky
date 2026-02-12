# Adonisjs - Other

**Pages:** 11

---

## Atomic Locks

**URL:** https://docs.adonisjs.com/guides/digging-deeper/locks

**Contents:**
- Atomic Locks
- Installation
- Configuration
  - Environment variables
  - Redis store
  - Database store
  - Memory store
- Locking a resource
- Using another store
- Managing locks across multiple processes

An atomic lock, otherwise known as a mutex, is used for synchronizing access to a shared resource. In other words, it prevents several processes, or concurrent code, from executing a section of code at the same time.

The AdonisJS team has created a framework-agnostic package called Verrou. The @adonisjs/lock package is based on this package, so make sure to also read the Verrou documentation which is more detailed.

Install and configure the package using the following command:

Install the @adonisjs/lock package using the detected package manager.

Registers the following service provider inside the adonisrc.ts file.

Create the config/lock.ts file.

Define the following environment variable alongside its validation inside the start/env.ts file.

Optionally, create the database migration for the locks table if using the database store.

The configuration for the locks is stored inside the config/lock.ts file.

The default store to use for managing locks. The store is defined within the same config file under the stores object.

A collection of stores you plan to use within your application. We recommend always configuring the memory store that could be used during testing.

The default lock store is defined using the LOCK_STORE environment variable, and therefore, you can switch between different stores in different environments. For example, use the memory store during testing and the redis store for development and production.

Also, the environment variable must be validated to allow one of the pre-configured stores. The validation is defined inside the start/env.ts file using the Env.schema.enum rule.

The redis store has a peer dependency on the @adonisjs/redis package; therefore, you must configure this package before using the Redis store.

Following is the list of options the Redis store accepts:

The connectionName property refers to a connection defined within the config/redis.ts file.

The database store has a peer dependency on the @adonisjs/lucid package, and therefore, you must configure this package before using the database store.

Following is the list of options the database store accepts:

Reference to the database connection defined within the config/database.ts file. If not defined, we will use the default database connection.

The database table to use to store rate limits.

The memory store is a simple in-memory store that can be useful for testing purposes but not only. Sometimes, for some use cases, you might want to have a lock that is only valid for the current process and not shared across multiple ones.

The memory store is built on top of the async-mutex package.

Once you have configured your lock store, you can start using locks to protect your resources anywhere within your application.

Here is a simple example of how to use locks to protect a resource.

This is a quick example of how to use locks within your application.

They are many other methods available to manage locks, such as extend for extending the lock duration, getRemainingTime to get the remaining time before the lock expires, options to configure the lock, and more.

For that, make sure to read the Verrou documentation for more details. As a reminder, the @adonisjs/lock package is based on the Verrou package, so everything you read in the Verrou documentation is also applicable to the @adonisjs/lock package.

If you defined multiple stores inside the config/lock.ts file, you can use a different store for a specific lock by using the use method.

Otherwise, if using only the default store, you can omit the use method.

Sometimes, you might want to have one process creating and acquiring a lock, and another process releasing it. For example, you might want to acquire a lock inside a web request and release it inside a background job. This is possible using the restoreLock method.

During testing, you can use the memory store to avoid making real network requests to acquire locks. You can do this by setting the LOCK_STORE environment variable to memory inside the .env.testing file.

First, make sure to consult the Verrou documentation that goes deeper into the creation of a custom lock store. In AdonisJS, it will be pretty much the same.

Let's create a simple Noop store that does not do anything. First, we must create a class that will implement the LockStore interface.

Once you have created your store, you must define a simple factory function that will be used by @adonisjs/lock to create an instance of you store.

Once done, you may use the noopStore function as follows:

**Examples:**

Example 1 (python):
```python
node ace add @adonisjs/lock
```

Example 2 (typescript):
```typescript
{
  providers: [
    // ...other providers
    () => import('@adonisjs/lock/lock_provider')
  ]
}
```

Example 3 (typescript):
```typescript
LOCK_STORE=redis
```

Example 4 (typescript):
```typescript
import env from '#start/env'
import { defineConfig, stores } from '@adonisjs/lock'

const lockConfig = defineConfig({
  default: env.get('LOCK_STORE'),
  stores: {
    redis: stores.redis({}),

    database: stores.database({
      tableName: 'locks',
    }),

    memory: stores.memory()
  },
})

export default lockConfig

declare module '@adonisjs/lock/types' {
  export interface LockStoresList extends InferLockStores<typeof lockConfig> {}
}
```

---

## OpenTelemetry

**URL:** https://docs.adonisjs.com/guides/digging-deeper/open-telemetry

**Contents:**
- OpenTelemetry
- Overview
- OpenTelemetry concepts
- Installation
- Manual setup
- Configuration
  - Service identification
  - Exporters
  - Debug mode
  - Enabling and disabling

This guide covers OpenTelemetry integration in AdonisJS applications. You will learn how to install and configure the @adonisjs/otel package, understand OpenTelemetry concepts like traces and spans, use automatic instrumentation for HTTP requests and database queries, create custom spans with helpers and decorators, propagate trace context across services, and configure sampling and exporters for production environments.

OpenTelemetry is an open standard for collecting telemetry data from your applications: traces, metrics, and logs. The @adonisjs/otel package provides a seamless integration between AdonisJS and OpenTelemetry, giving you distributed tracing and automatic instrumentation with sensible defaults and zero-config setup.

Observability is essential for understanding what happens inside your application, especially in production. When a user reports that "the checkout page is slow," tracing lets you see exactly where time is spent: was it the database query? An external API call? A slow service? Without tracing, you're left guessing.

This package handles the complexity of OpenTelemetry setup for you. Run a single command, and your application automatically traces HTTP requests, database queries, Redis operations, and more.

Before diving into the implementation, you should understand a few core OpenTelemetry concepts. For a comprehensive introduction, see the official OpenTelemetry documentation.

A trace represents the complete journey of a request through your system. When a user hits your API, the trace captures everything that happens: the HTTP request, database queries, cache lookups, calls to external services, and the response.

A span is a single unit of work within a trace. Each database query, HTTP request, or function call can be a span. Spans have a start time, duration, name, and attributes (key-value metadata). Spans are nested hierarchically: a parent span for the HTTP request contains child spans for each database query made during that request.

Attributes are key-value pairs attached to spans that provide context. For example, an HTTP span might have attributes like http.method: GET, http.route: /users/:id, and http.status_code: 200.

Install and configure the package using the following command:

This command creates otel.ts at the root of your project with the OpenTelemetry initialization, adds the import at the top of bin/server.ts, registers the provider and middleware, and sets up environment variables.

That's it. Your application now has automatic tracing for HTTP requests, database queries, and more.

The import order is critical

OpenTelemetry must initialize before any other code loads. The SDK needs to patch libraries like http, pg, and redis before they're imported. That's why otel.ts is imported as the very first line in bin/server.ts.

If you move or remove the import './otel.js' line, auto-instrumentation will not work. You'll still be able to create manual spans, but automatic tracing of HTTP requests and database queries won't be captured.

If you prefer not to use node ace add, here's what it configures.

First, create a file at otel.ts with the OpenTelemetry initialization:

Then update bin/server.ts to import it as the very first line:

Add the provider in adonisrc.ts to hook into AdonisJS's exception handler and record errors in spans:

Finally, add the middleware as the first router middleware in start/kernel.ts to enrich HTTP spans with route information:

The configuration file is located at config/otel.ts:

The package resolves service metadata from multiple sources:

By default, the package exports traces using OTLP over gRPC to localhost:4317. This is the standard OpenTelemetry Collector endpoint. If you're running an OpenTelemetry Collector locally or in your infrastructure, traces will be sent there automatically.

You can configure the exporter endpoint using environment variables without changing any code:

For authentication or custom headers:

See the OpenTelemetry environment variable specification for all available options, and check Advanced configuration for even more customization.

Enable debug mode to print spans to the console during development:

This adds a ConsoleSpanExporter that outputs spans to your terminal, helping you visualize traces without setting up a collector.

OpenTelemetry is automatically disabled when NODE_ENV === 'test' to avoid noise during tests. You can override this behavior:

In high-traffic production environments, tracing every single request generates enormous amounts of data. Sampling controls what percentage of traces are collected:

The sampler uses parent-based sampling, meaning child spans inherit the sampling decision from their parent. This ensures you always get complete traces rather than fragments.

See also: OpenTelemetry Sampling documentation

If you provide a custom sampler option, samplingRatio is ignored.

Under the hood, @adonisjs/otel uses the official @opentelemetry/auto-instrumentations-node package. This means you get automatic tracing for a wide range of libraries without any code changes: HTTP requests (incoming and outgoing), database queries (PostgreSQL, MySQL, MongoDB), Redis operations, and many more.

We pre-configure sensible defaults so everything works out of the box. However, you can override any instrumentation setting through the instrumentations option in your configuration.

To reduce noise, the following endpoints are excluded from tracing by default:

You can configure individual instrumentations or add custom ignored URLs:

While automatic instrumentation covers most common operations, you'll often want to trace custom business logic. The package provides helpers and decorators for this purpose.

The record helper creates a span around a code section:

For class methods, decorators provide a cleaner syntax:

To automatically trace all methods of a class, use the @spanAll decorator:

Use setAttributes to add metadata to the currently active span without creating a new one:

Events are time-stamped annotations within a span. Use them to mark significant moments:

When your application calls other services or processes background jobs, you need to propagate the trace context so all operations appear in the same trace.

When dispatching background jobs, include the trace context:

In your queue worker, extract the context and continue the trace:

When @adonisjs/auth is installed, the middleware automatically sets user attributes on spans if a user is authenticated. This includes user.id, user.email (if available), and user.roles (if available).

You can customize this behavior or add additional user attributes:

You can also manually set user context anywhere in your code:

The package automatically injects trace context into Pino logs, adding trace_id and span_id to each log entry. This lets you correlate logs with traces in your observability platform.

When using pino-pretty for development, you can hide these fields for cleaner output:

To keep specific fields visible:

The defineConfig function accepts all options from the OpenTelemetry Node SDK, giving power users full control:

See the OpenTelemetry JS documentation for all available options.

OpenTelemetry adds some overhead to your application. The SDK needs to create span objects, record timing information, and export data to your collector. In most applications, this overhead is negligible, but you should be aware of it.

For high-traffic production environments, consider these recommendations:

Use sampling to reduce the volume of traces. A samplingRatio of 0.1 (10%) is often sufficient to identify issues while dramatically reducing overhead and storage costs.

Use batch processing (the default) rather than sending spans immediately. The BatchSpanProcessor queues spans and sends them in batches, reducing network overhead.

Be selective with custom spans. Automatic instrumentation covers most needs. Only add custom spans for business-critical operations where you need additional visibility. Don't over-instrument by using a @spanAll decorator on every single class.

See also: OpenTelemetry Sampling documentation

All helpers are available from @adonisjs/otel/helpers:

**Examples:**

Example 1 (python):
```python
node ace add @adonisjs/otel
```

Example 2 (typescript):
```typescript
import { init } from '@adonisjs/otel/init'

await init(import.meta.dirname)
```

Example 3 (typescript):
```typescript
/**
 * OpenTelemetry initialization - MUST be the first import
 */
import './otel.js'

import { Ignitor } from '@adonisjs/core'
// ... rest of your server setup
```

Example 4 (typescript):
```typescript
{
  providers: [
    // ... other providers
    () => import('@adonisjs/otel/otel_provider'),
  ]
}
```

---

## Transmit

**URL:** https://docs.adonisjs.com/guides/digging-deeper/transmit

**Contents:**
- Transmit
- Installation
- Configuration
- Register Routes
- Channels
  - Channel Names
  - Channel Authorization
- Broadcasting Events
  - Syncing across multiple servers or instances
- Transmit Client

Transmit is a native opinionated Server-Sent-Event (SSE) module built for AdonisJS. It is a simple and efficient way to send real-time updates to the client, such as notifications, live chat messages, or any other type of real-time data.

The data transmission occurs only from server to client, not the other way around. You have to use a form or a fetch request to achieve client to server communication.

Install and configure the package using the following command :

Installs the @adonisjs/transmit package using the detected package manager.

Registers the @adonisjs/transmit/transmit_provider service provider inside the adonisrc.ts file.

Creates a new transmit.ts file inside the config directory.

You will also have to install the Transmit client package to listen for events on the client-side.

The configuration for the transmit package is stored within the config/transmit.ts file.

See also: Config stub

The interval used to send ping messages to the client. The value is in milliseconds or using a string Duration format (i.e: 10s). Set to false to disable ping messages.

Transmit supports syncing events across multiple servers or instances. You can enable the feature by referencing the wanted transport layer (only redis is supported for now). Set to null to disable syncing.

Ensure you have ioredis installed when using the redis transport.

You have to register the transmit routes to allow the client to connect to the server. The routes are registered manually.

You can also register each route manually by binding the controller by hand.

If you want to modify the route definition, for example, to use the Rate Limiter and auth middleware to avoid abuse of some transmit routes, you can either change the route definition or pass a callback to the transmit.registerRoutes method.

Channels are used to group events. For example, you can have a channel for notifications, another for chat messages, and so on. They are created on the fly when the client subscribes to them.

Channel names are used to identify the channel. They are case-sensitive and must be a string. You cannot use any special characters or spaces in the channel name except /. The following are some examples of valid channel names:

Channel names use the same syntax as route in AdonisJS but are not related to them. You can freely define a http route and a channel with the same key.

You can authorize or reject a connection to a channel using the authorize method. The method receives the channel name and the HttpContext. It must return a boolean value.

You can broadcast events to a channel using the broadcast method. The method receives the channel name and the data to send.

You can also broadcast events to any channel except one using the broadcastExcept method. The method receives the channel name, the data to send, and the UID you want to ignore.

By default, broadcasting events works only within the context of an HTTP request. However, you can broadcast events from the background using the transmit service if you register a transport in your configuration.

The transport layer is responsible for syncing events across multiple servers or instances. It works by broadcasting any events (like broadcasted events, subscriptions, and un-subscriptions) to all connected servers or instances using a Message Bus.

The server or instance responsible for your client connection will receive the event and broadcast it to the client.

You can listen for events on the client-side using the @adonisjs/transmit-client package. The package provides a Transmit class. The client use the EventSource API by default to connect to the server.

You should create only one instance of the Transmit class and reuse it throughout your application.

The Transmit class accepts an object with the following properties:

The base URL of the server. The URL must include the protocol (http or https) and the domain name.

A function that generates a unique identifier for the client. The function must return a string. It defaults to crypto.randomUUID.

A function that creates a new EventSource instance. It defaults to the WebAPI EventSource. You need to provide a custom implementation if you want to use the client on Node.js, React Native or any other environment that does not support the EventSource API.

A function that creates a new EventTarget instance. It defaults to the WebAPI EventTarget. You need to provide a custom implementation if you want to use the client on Node.js, React Native or any other environment that does not support the EventTarget API. Return null to disable the EventTarget API.

A function that creates a new HttpClient instance. It is mainly used for testing purposes.

A function that is called before subscribing to a channel. It receives the channel name and the Request object sent to the server. Use this function to add custom headers or modify the request object.

A function that is called before unsubscribing from a channel. It receives the channel name and the Request object sent to the server. Use this function to add custom headers or modify the request object.

The maximum number of reconnection attempts. It defaults to 5.

A function that is called before each reconnection attempt and receives the number of attempts made so far. Use this function to add custom logic.

A function that is called when the reconnection attempts fail. Use this function to add custom logic.

A function that is called when the subscription fails. It receives the Response object. Use this function to add custom logic.

A function that is called when the subscription is successful. It receives the channel name. Use this function to add custom logic.

A function that is called when the unsubscription is successful. It receives the channel name. Use this function to add custom logic.

You can create a subscription to a channel using the subscription method. The method receives the channel name.

The create method registers the subscription on the server. It returns a promise that you can await or void.

If you don't call the create method, the subscription will not be registered on the server, and you will not receive any events.

You can listen for events on the subscription using the onMessage method that receives a callback function. You can call the onMessage method multiple times to add different callbacks.

You can also listen to a channel only once using the onMessageOnce method which receives a callback function.

The onMessage and onMessageOnce methods return a function that you can call to stop listening for a specific callback.

You can delete a subscription using the delete method. The method returns a promise that you can await or void. This method will unregister the subscription on the server.

When deploying applications that use @adonisjs/transmit, it’s important to ensure that GZip compression does not interfere with the text/event-stream content type used by Server-Sent Events (SSE). Compression applied to text/event-stream can cause connection issues, leading to frequent disconnects or SSE failures.

If your deployment uses a reverse proxy (such as Traefik or Nginx) or other middleware that applies GZip, ensure that compression is disabled for the text/event-stream content type.

**Examples:**

Example 1 (python):
```python
node ace add @adonisjs/transmit
```

Example 2 (python):
```python
npm install @adonisjs/transmit-client
```

Example 3 (typescript):
```typescript
import { defineConfig } from '@adonisjs/transmit'

export default defineConfig({
  pingInterval: false,
  transport: null,
})
```

Example 4 (typescript):
```typescript
import env from '#start/env'
import { defineConfig } from '@adonisjs/transmit'
import { redis } from '@adonisjs/transmit/transports'

export default defineConfig({
  transport: {
    driver: redis({
      host: env.get('REDIS_HOST'),
      port: env.get('REDIS_PORT'),
      password: env.get('REDIS_PASSWORD'),
      keyPrefix: 'transmit',
    })
  }
})
```

---

## Logger

**URL:** https://docs.adonisjs.com/guides/digging-deeper/logger

**Contents:**
- Logger
- Usage
- Configuration
- Transport targets
- Defining targets conditionally
- Using multiple loggers
- Dependency injection
- Logging methods
- Logging conditionally
- Child logger

AdonisJS has an inbuilt logger that supports writing logs to a file, standard output, and external logging services. Under the hood, we use pino. Pino is one of the fastest logging libraries in the Node.js ecosystem that generates logs in the NDJSON format.

To begin, you may import the Logger service to write logs from anywhere inside your application. The logs are written to stdout and will appear on the terminal.

It is recommended to use the ctx.logger property during HTTP requests. The HTTP context holds an instance of a request-aware logger that adds the current request ID to every log statement.

The config for the logger is stored within the config/logger.ts file. By default, only one logger is configured. However, you can define config for multiple loggers if you want to use more than one in your application.

The default property is a reference to one of the configured loggers within the same file under the loggers object.

The default logger is used to write logs unless you select a specific logger when using the logger API.

The loggers object is a key-value pair to configure multiple loggers. The key is the name of the logger, and the value is the config object accepted by pino

Transports in pino play an essential role as they write logs to a destination. You can configure multiple targets within your config file, and pino will deliver logs to all of them. Each target can also specify a level from which it wants to receive the logs.

If you have not defined the level within the target configuration, the configured targets will inherit it from the parent logger.

This behavior is different from pino. In Pino, targets do not inherit levels from the parent logger.

The pino/file target writes logs to a file descriptor. The destination = 1 means write logs to stdout (this is a standard unix convention for file descriptors).

The pino-pretty target uses the pino-pretty npm module to pretty-print logs to a file descriptor.

It is common to register targets based on the environment in which the code is running. For example, using the pino-pretty target in development and the pino/file target in production.

As shown below, constructing the targets array with conditionals makes the config file look untidy.

Therefore, you can use the targets helper to define conditional array items using a fluent API. We express the same conditionals in the following example using the targets.pushIf method.

To further simplify the code, you can define the config object for the pino/file and pino-pretty targets using the targets.pretty and targets.file methods.

AdonisJS has first-class support for configuring multiple loggers. The logger's unique name and config are defined within the config/logger.ts file.

Once configured, you can access a named logger using the logger.use method.

When using Dependency injection, you can type-hint the Logger class as a dependency, and the IoC container will resolve an instance of the default logger defined inside the config file.

If the class is constructed during an HTTP request, then the container will inject the request-aware instance of the Logger.

The Logger API is nearly identical to Pino, except the AdonisJS logger is not an instance of an Event emitter (whereas Pino is). Apart from that, the logging methods have the same API as pino.

An additional merging object can be passed as the first argument. Then, the object properties are added to the output JSON.

To display errors, you can use the err key to specify the error value.

The logger produces logs for and above the level configured in the config file. For example, if the level is set to warn, the logs for the info, debug, and the trace levels will be ignored.

If computing data for a log message is expensive, you should check if a given log level is enabled before computing the data.

You may express the same conditional using the ifLevelEnabled method. The method accepts a callback as the 2nd argument, which gets executed when the specified logging level is enabled.

A child logger is an isolated instance that inherits the config and bindings from the parent logger.

An instance of the child logger can be created using the logger.child method. The method accepts bindings as the first argument and an optional config object as the second argument.

The child logger can also log under a different logging level.

Pino static methods and properties are exported by the @adonisjs/core/logger module.

Pino ships with a pino/file target, which you can use to write logs to a file. Within the target options, you can specify the log file destination path.

Pino does not have inbuilt support for file rotation, and therefore, you either have to use a system-level tool like logrotate or make use of a third-party package like pino-roll.

Logs can become the source for leaking sensitive data. Therefore, it is recommended to observe your logs and remove/hide sensitive values from the output.

In Pino, you can use the redact option to hide/remove sensitive key-value pairs from the logs. Under the hood, the fast-redact package is used, and you can consult its documentation to view available expressions.

By default, the value is replaced with the [Redacted] placeholder. You can define a custom placeholder or remove the key-value pair.

An alternative to redaction is to wrap sensitive values inside the Secret class. For example:

See also: Secret class usage docs

**Examples:**

Example 1 (typescript):
```typescript
import logger from '@adonisjs/core/services/logger'

logger.info('this is an info message')
logger.error({ err: error }, 'Something went wrong')
```

Example 2 (typescript):
```typescript
import router from '@adonisjs/core/services/router'
import User from '#models/user'

router.get('/users/:id', async ({ logger, params }) => {
  logger.info('Fetching user by id %s', params.id)
  const user = await User.find(params.id)
})
```

Example 3 (typescript):
```typescript
import env from '#start/env'
import { defineConfig } from '@adonisjs/core/logger'

export default defineConfig({
  default: 'app',
  
  loggers: {
    app: {
      enabled: true,
      name: env.get('APP_NAME'),
      level: env.get('LOG_LEVEL', 'info')
    },
  }
})
```

Example 4 (typescript):
```typescript
{
  loggers: {
    app: {
      enabled: true,
      name: env.get('APP_NAME'),
      level: env.get('LOG_LEVEL', 'info'),
      
      transport: {
        targets: [
          {
            target: 'pino/file',
            level: 'info',
            options: {
              destination: 1
            }
          },
          {
            target: 'pino-pretty',
            level: 'info',
            options: {}
          },
        ]
      }
    }
  }
}
```

---

## Helpers reference

**URL:** https://docs.adonisjs.com/guides/references/helpers

**Contents:**
- Helpers reference
- escapeHTML
- encodeSymbols
- prettyHrTime
- isEmpty
- truncate
- excerpt
- slug
- interpolate
- plural

AdonisJS bundles its utilities into the helpers module and makes them available to your application code. Since these utilities are already installed and used by the framework, the helpers module does not add any additional bloat to your node_modules.

The helper methods are exported from the following modules.

Escape HTML entities in a string value. Under the hood, we use the he package.

Optionally, you can encode non-ASCII symbols using the encodeSymbols option.

You may encode non-ASCII symbols in a string value using the encodeSymbols helper. Under the hood, we use he.encode method.

Pretty print the diff of process.hrtime method.

Check if a string value is empty.

Truncate a string at a given number of characters.

By default, the string is truncated exactly at the given index. However, you can instruct the method to wait for the words to complete.

You can customize the suffix using the suffix option.

The excerpt method is identical to the truncate method. However, it strips the HTML tags from the string.

Generate slug for a string value. The method is exported from the slugify package; therefore, consult its documentation for available options.

You can add custom replacements for Unicode values as follows.

Interpolate variables inside a string. The variables must be inside double curly braces.

Curly braces can be escaped using the \\ prefix.

Convert a word to its plural form. The method is exported from the pluralize package.

Find if a word already is in plural form.

This method combines the singular and the plural methods and uses one or the other based on the count. For example:

The pluralize property exports additional methods to register custom uncountable, irregular, plural, and singular rules.

Convert a word to its singular form. The method is exported from the pluralize package.

Find if a word is already in a singular form.

Convert a string value to camelcase.

Following are some of the conversion examples.

Convert a string value to a capital case.

Following are some of the conversion examples.

Convert a string value to a dash case.

Optionally, you can capitalize the first letter of each word.

Following are some of the conversion examples.

Convert a string value to a dot case.

Optionally, you can convert the first letter of all the words to lowercase.

Following are some of the conversion examples.

Remove all sorts of casing from a string value.

Following are some of the conversion examples.

Convert a string value to a Pascal case. Great for generating JavaScript class names.

Following are some of the conversion examples.

Convert a value to a sentence.

Following are some of the conversion examples.

Convert value to snake case.

Following are some of the conversion examples.

Convert a string value to the title case.

Following are some of the conversion examples.

Generate a cryptographically secure random string of a given length. The output value is a URL-safe base64 encoded string.

Convert an array of words to a comma-separated sentence.

You can replace the and with an or by specifying the options.lastSeparator property.

In the following example, the two words are combined using the and separator, not the comma (usually advocated in English). However, you can use a custom separator for a pair of words.

Remove multiple whitespaces from a string to a single whitespace.

Parse a string-based time expression to seconds.

Passing a numeric value to the parse method is returned as it is, assuming the value is already in seconds.

You can format seconds to a pretty string using the format method.

Parse a string-based time expression to milliseconds.

Passing a numeric value to the parse method is returned as it is, assuming the value is already in milliseconds.

Using the format method, you can format milliseconds to a pretty string.

Parse a string-based unit expression to bytes.

Passing a numeric value to the parse method is returned as it is, assuming the value is already in bytes.

Using the format method, you can format bytes to a pretty string. The method is exported directly from the bytes package. Please reference the package README for available options.

Get the ordinal letter for a given number.

Check if two buffer or string values are the same. This method does not leak any timing information and prevents timing attack.

Under the hood, this method uses Node.js crypto.timeSafeEqual method, with support for comparing string values. (crypto.timeSafeEqual does not support string comparison)

Create a secure, collision-resistant ID optimized for horizontal scaling and performance. This method uses the @paralleldrive/cuid2 package under the hood.

You can use the isCuid method to check if a value is a valid CUID.

The compose helper allows you to use TypeScript class mixins with a cleaner API. Following is an example of mixin usage without the compose helper.

Following is an example with the compose helper.

Utility methods to base64 encode and decode values.

Like the encode method, you can use the urlEncode to generate a base64 string safe to pass in a URL.

The urlEncode method performs the following replacements.

You can use the decode and the urlDecode methods to decode a previously encoded base64 string.

The decode and the urlDecode methods return null when the input value is an invalid base64 string. You can turn on the strict mode to raise an exception instead.

Get a list of all the files from a directory. The method recursively fetches files from the main and the sub-folders. The dotfiles are ignored implicitly.

You can also pass the options along with the directory path as the second argument.

The fsImportAll method imports all the files recursively from a given directory and sets the exported value from each module on an object.

The second param is the option to customize the import behavior.

The StringBuilder class offers a fluent API to perform transformations on a string value. You may get an instance of string builder using the string.create method.

The MessageBuilder class offers an API to serialize JavaScript data types with an expiry and purpose. You can either store the serialized output in safe storage like your application database or encrypt it (to avoid tampering) and share it publicly.

In the following example, we serialize an object with the token property and set its expiry to be 1 hour.

Once you have the JSON string with the expiry and the purpose, you can encrypt it (to prevent tampering) and share it with the client.

During the token verification, you can decrypt the previously encrypted value and use the MessageBuilder to verify the payload and convert it to a JavaScript object.

The Secret class lets you hold sensitive values within your application without accidentally leaking them inside logs and console statements.

For example, the appKey value defined inside the config/app.ts file is an instance of the Secret class. If you try to log this value to the console, you will see [redacted] and not the original value.

For demonstration, let's fire up a REPL session and try it.

You can call the config.appKey.release method to read the original value. The purpose of the Secret class is not to prevent your code from accessing the original value. Instead, it provides a safety net from exposing sensitive data inside logs.

You can wrap custom values inside the Secret class as follows.

We export the @sindresorhus/is module from the helpers/is import path, and you may use it to perform the type detection in your apps.

**Examples:**

Example 1 (typescript):
```typescript
import is from '@adonisjs/core/helpers/is'
import * as helpers from '@adonisjs/core/helpers'
import string from '@adonisjs/core/helpers/string'
```

Example 2 (typescript):
```typescript
import string from '@adonisjs/core/helpers/string'

string.escapeHTML('<p> foo © bar </p>')
// &lt;p&gt; foo © bar &lt;/p&gt;
```

Example 3 (typescript):
```typescript
import string from '@adonisjs/core/helpers/string'

string.escapeHTML('<p> foo © bar </p>', {
  encodeSymbols: true,
})
// &lt;p&gt; foo &#xA9; bar &lt;/p&gt;
```

Example 4 (typescript):
```typescript
import string from '@adonisjs/core/helpers/string'

string.encodeSymbols('foo © bar ≠ baz 𝌆 qux')
// 'foo &#xA9; bar &#x2260; baz &#x1D306; qux'
```

---

## Drive

**URL:** https://docs.adonisjs.com/guides/digging-deeper/drive

**Contents:**
- Drive
- Installation
- Configuration
  - Environment variables
- Usage
- Drive service
- Local filesystem driver
- Edge helpers
- MultipartFile helper
- Faking disks during tests

AdonisJS Drive (@adonisjs/drive) is a lightweight wrapper on top of flydrive.dev. FlyDrive is a file storage library for Node.js. It provides a unified API to interact with the local file system and cloud storage solutions like S3, R2, and GCS.

Using FlyDrive, you can manage user-uploaded files on various cloud storage services (including the local filesystem) without changing a single line of code.

Install and configure the @adonisjs/drive package using the following command:

Installs the @adonisjs/drive package using the detected package manager.

Registers the following service provider inside the adonisrc.ts file.

Creates the config/drive.ts file.

Defines the environment variables for the selected storage services.

Installs the required peer dependencies for the selected storage services.

The @adonisjs/drive package configuration is stored inside the config/drive.ts file. You can define config for multiple services within a single config file.

See also: Config stub

The credentials/settings for the storage services are stored as environment variables within the .env file. Make sure to update the values before you can use Drive.

Also, the DRIVE_DISK environment variable defines the default disk/service for managing files. For example, you may want to use the fs disk in development and the spaces disk in production.

Once you have configured Drive, you can import the drive service to interact with its APIs. In the following example, we handle a file upload operation using Drive.

Since the AdonisJS integration is a thin wrapper on top of FlyDrive, you should read the FlyDrive docs to better understand its APIs.

The Drive package adds the moveToDisk method to the MultipartFile. This method moves the file from its tmpPath to the configured storage provider.

After moving the file, the meta.url property will be set on the file object. This property contains the public URL of the file. If your files are private, then you must use the drive.use().getSignedUrl() method.

Drive service exported by the @adonisjs/drive/services/main path is a singleton instance of the DriveManager class created using the config exported from the config/drive.ts file.

You can import this service to interact with the DriveManager and the configured file storage services. For example:

Once you have access to an instance of a Disk, you can use it to manage files.

AdonisJS integration enhances the FlyDrive's local filesystem driver and adds support for URL generation and the ability to serve files using the AdonisJS HTTP server.

Following is the list of options you may use to configure the filesystem driver.

The location property defines the store inside which the files should be stored. This directory should be added to .gitignore so that you do not push files uploaded during development to the production server.

The visibility property is used to mark files public or private. Private files can only be accessed using signed URLs. Learn more

The serveFiles option auto registers a route to serve the files from the local filesystem. You can view this route using the list:routes ace command.

The routeBasePath option defines the base prefix for the route to serve files. Make sure the base prefix is unique.

You may optionally define the appUrl property to create URLs with the complete domain name of your application. Otherwise relative URLs will be created.

Within the Edge templates, you may use one of the following helper methods to generate URLs. Both the methods are async, so make sure to await them.

Drive extends the Bodyparser MultipartFile class and adds the moveToDisk method. This method copies the file from its tmpPath to the configured storage provider.

The fakes API of Drive can be used during testing to prevent interacting with a remote storage. In the fakes mode, the drive.use() method will return a fake disk (backed by local filesystem) and all files will be written inside the ./tmp/drive-fakes directory of your application root.

These files are deleted automatically after you restore a fake using the drive.restore method.

See also: FlyDrive fakes documentation

**Examples:**

Example 1 (python):
```python
node ace add @adonisjs/drive
```

Example 2 (typescript):
```typescript
{
  providers: [
    // ...other providers
    () => import('@adonisjs/drive/drive_provider'),
  ]
}
```

Example 3 (typescript):
```typescript
import env from '#start/env'
import app from '@adonisjs/core/services/app'
import { defineConfig, services } from '@adonisjs/drive'

const driveConfig = defineConfig({
  default: env.get('DRIVE_DISK'),

  services: {
    /**
     * Persist files on the local filesystem
     */
    fs: services.fs({
      location: app.makePath('storage'),
      serveFiles: true,
      routeBasePath: '/uploads',
      visibility: 'public',
    }),

    /**
     * Persist files on Digital Ocean spaces
     */
    spaces: services.s3({
      credentials: {
        accessKeyId: env.get('SPACES_KEY'),
        secretAccessKey: env.get('SPACES_SECRET'),
      },
      region: env.get('SPACES_REGION'),
      bucket: env.get('SPACES_BUCKET'),
      endpoint: env.get('SPACES_ENDPOINT'),
      visibility: 'public',
    }),
  },
})

export default driveConfig
```

Example 4 (typescript):
```typescript
import { cuid } from '@adonisjs/core/helpers'
import drive from '@adonisjs/drive/services/main'
import router from '@adonisjs/core/services/router'

router.put('/me', async ({ request, response }) => {
  /**
   * Step 1: Grab the image from the request and perform basic
   * validations
   */
  const image = request.file('avatar', {
    size: '2mb',
    extnames: ['jpeg', 'jpg', 'png'],
  })
  if (!image) {
    return response.badRequest({ error: 'Image missing' })
  }

  /**
   * Step 2: Move the image with a unique name using Drive
   */
  const key = `uploads/${cuid()}.${image.extname}`
  await image.moveToDisk(key)

  /**
   * Respond with the file's public URL
   */
  return {
    message: 'Image uploaded',
    url: image.meta.url,
  }
})
```

---

## Event Emitter

**URL:** https://docs.adonisjs.com/guides/digging-deeper/emitter

**Contents:**
- Event Emitter
- Basic usage
- Making events type-safe
- Class-based listeners
  - Lazy-loading listeners
  - Dependency injection
- Class-based events
  - Listening to class-based events
  - Emitting class-based events
- Simplifying events listening experience

AdonisJS has an inbuilt event emitter created on top of emittery. Emittery dispatches events asynchronously and fixes many common issues with the Node.js default Event emitter.

AdonisJS further enhances emittery with additional features.

The event listeners are defined inside the start/events.ts file. You may create this file using the make:preload ace command.

You must use the emitter.on to listen to an event. The method accepts the event's name as the first argument and the listener as the second argument.

Once you have defined the event listener, you can emit the user:registered event using the emitter.emit method. It takes the event name as the first argument and the event data as the second argument.

You may use the emitter.once to listen to an event once.

AdonisJS makes it mandatory to define static types for every event you want to emit within your application. The types are registered within the types/events.ts file.

In the following example, we register the User model as the data type for the user:registered event.

If you find defining types for every event cumbersome, you may switch to class-based events.

Like HTTP controllers, listener classes offer an abstraction layer to move inline event listeners inside dedicated files. Listener classes are stored inside the app/listeners directory and you may create a new listener using the make:listener command.

See also: Make listener command

The listener file is scaffolded with the class declaration and handle method. In this class, you can define additional methods to listen to multiple events (if needed).

As the final step, you must bind the listener class to an event within the start/events.ts file. You may import the listener using the #listeners alias. The aliases are defined using the subpath imports feature of Node.js.

It is recommended to lazy load listeners to speed up the application boot phase. Lazy loading is as simple as moving the import statement behind a function and using dynamic imports.

You cannot inject the HttpContext inside a listener class. Because events are processed asynchronously, the listener might run after the HTTP request is finished.

The listener classes are instantiated using the IoC container; therefore, you can type-hint dependencies inside the class constructor or the method which handles the event.

In the following example, we type-hint the TokensService as a constructor argument. When invoking this listener, the IoC container will inject an instance of the TokensService class.

In the following example, we inject the TokensService inside the handle method. However, do remember, the first argument will always be the event payload.

An event is a combination of the event identifier (usually a string-based event name) and the associated data. For example:

Class-based events encapsulate the event identifier and the event data within the same class. The class constructor serves as the identifier, and an instance of the class holds the event data.

You may create an event class using the make:event command.

See also: Make event command

The event class has no behavior. Instead, it is a data container for the event. You may accept event data via the class constructor and make it available as an instance property.

You may attach listeners for class-based events using the emitter.on method. The first argument is the event class reference, followed by the listener.

In the following example, we use both class-based events and listeners.

You may emit a class-based event using the static dispatch method. The dispatch method takes arguments accepted by the event class constructor.

If you decide to use class-based events and listeners, you may use the emitter.listen method to simplify the process of binding listeners.

The emitter.listen method accepts the event class as the first argument and an array of class-based listeners as the second argument. In addition, the registered listener must have a handle method to handle the event.

By default, the exceptions raised by the listeners will result in unhandledRejection. Therefore, it is recommended to self capture and handle the error using the emitter.onError method.

The emitter.onError method accepts a callback which receives the event name, error, and event data.

You can listen to all the events using the emitter.onAny method. The method accepts the listener callback as the only parameter.

The emitter.on method returns an unsubscribe function you may call to remove the event listener subscription.

You may also use the emitter.off method to remove the event listener subscription. The method accepts the event name/class as the first argument and a reference to the listener as the second argument.

The emitter.offAny removes a wildcard listener, listening for all the events.

The emitter.clearListeners method removes all the listeners for a given event.

The emitter.clearAllListeners method removes all the listeners for all the events.

Please check the events reference guide to view the list of available events.

Event listeners are often used for performing side effects after a given action. For example: Send an email to a newly registered user, or send a notification after an order status update.

When writing tests, you might want to avoid sending emails to the user created during the test.

You may disable event listeners by faking the event emitter. In the following example, we call emitter.fake before making an HTTP request to signup a user. After the request, we use the events.assertEmitted method to ensure that the SignupController emits a specific event.

The emitter.fake method fakes all the events if you invoke the method without any arguments. If you want to fake a specific event, pass the event name or the class as the first argument.

Calling the emitter.fake method multiple times will remove the old fakes.

You may use assertEmitted, assertNotEmitted, assertNoneEmitted and the assertEmittedCount methods to write assertions for faked events.

The assertEmitted and assertNotEmitted methods accepts either the event name or the class constructor as the first argument and an optional finder function that must return a boolean to mark the event as emitted.

**Examples:**

Example 1 (unknown):
```unknown
node ace make:preload events
```

Example 2 (typescript):
```typescript
import emitter from '@adonisjs/core/services/emitter'

emitter.on('user:registered', function (user) {
  console.log(user)
})
```

Example 3 (typescript):
```typescript
import emitter from '@adonisjs/core/services/emitter'

export default class UsersController {
  async store() {
    const user = await User.create(data)
    emitter.emit('user:registered', user)
  }
}
```

Example 4 (typescript):
```typescript
emitter.once('user:registered', function (user) {
  console.log(user)
})
```

---

## Cache

**URL:** https://docs.adonisjs.com/guides/digging-deeper/cache

**Contents:**
- Cache
- Installation
- Configuration
  - Redis
  - Database
  - Other drivers
- Usage
  - Tagging
  - Namespaces
  - Grace period

AdonisJS Cache (@adonisjs/cache) is a simple, lightweight wrapper built on top of bentocache.dev to cache data and enhance the performance of your application. It provides a straightforward and unified API to interact with various cache drivers, such as Redis, DynamoDB, PostgreSQL, in-memory caching, and more.

We highly encourage you to read the Bentocache documentation. Bentocache offers some advanced, optional concepts that can be very useful in certain situations, such as multi-tiering, grace periods, tagging, timeouts, Stampede Protection and more.

Install and configure the @adonisjs/cache package by running the following command:

Installs the @adonisjs/cache package using the detected package manager.

Registers the following service provider inside the adonisrc.ts file:

Creates the config/cache.ts file.

Defines the environment variables for the selected cache drivers inside the .env file.

The configuration file for the cache package is located at config/cache.ts. You can configure the default cache driver, the list of drivers, and their specific configurations.

See also: Config stub

In the code example above, we are setting up multiple layers for each cache store. This is called a multi-tier caching system. It lets us first check a fast in-memory cache (the first layer). If we do not find the data there, we will then use the distributed cache (the second layer).

To use Redis as your cache system, you must install the @adonisjs/redis package and configure it. Refer to the documentation here: Redis.

In config/cache.ts, you must specify a connectionName. This property should match the Redis configuration key in the config/redis.ts file.

The database driver has a peer dependency on @adonisjs/lucid. Therefore, you must install and configure this package to use the database driver.

In config/cache.ts, you must specify a connectionName. This property should correspond to the database configuration key in the config/database.ts file.

Additionally, when configuring the database driver, a migration will be published to your database/migrations directory, which you must run to create the necessary table for storing cache entries.

You can use other drivers such as memory, dynamodb, kysely and orchid.

See Cache Drivers for more information.

Once your cache is configured, you can import the cache service to interact with it. In the following example, we cache the user details for 5 minutes:

As you can see, we serialize the user's data using user.toJSON(). This is necessary because your data must be serialized to be stored in the cache. Classes such as Lucid models or instances of Date cannot be stored directly in caches like Redis or a database.

The ttl defines the time-to-live for the cache key. After the TTL expires, the cache key is considered stale, and the next request will re-fetch the data from the factory method.

You can associate a cache entry with one or more tags to simplify invalidation. Instead of managing individual keys, entries can be grouped under multiple tags and invalidated in a single operation.

Another way to group your keys is to use namespaces. This allows you to invalidate everything at once later:

You can allow Bentocache to return stale data if the cache key is expired but still within a grace period using the grace option. This makes Bentocache work in the same way libraries like SWR or TanStack Query do.

In the example above, the data will be considered stale after 1 hour. However, the next request within the grace period of 6 hours will return the stale data while re-fetching the data from the factory method and updating the cache.

You can configure how long you allow your factory method to run before returning stale data using the timeout option. By default, Bentocache sets a soft timeout of 0ms, which means we always return stale data while re-fetching the data in the background.

In the example above, the factory method will be allowed to run for a maximum of 200ms. If the factory method takes longer than 200ms, the stale data will be returned to the user but the factory method will continue to run in the background.

If you have not defined a grace period, you can still use a hard timeout to stop the factory method from running after a certain time.

In this example, the factory method will be stopped after 200ms and an error will be thrown.

You can define the timeout and hardTimeout together. The timeout is the maximum time the factory method is allowed to run before returning stale data, while the hardTimeout is the maximum time the factory method is allowed to run before being stopped.

The cache service exported from @adonisjs/cache/services/main is a singleton instance of the BentoCache class created using the configuration defined in config/cache.ts.

You can import the cache service into your application and use it to interact with the cache:

You can find all available methods here: BentoCache API.

The cache service is available as an Edge helper within your views. You can use it to retrieve cached values directly in your templates.

The @adonisjs/cache package also provides a set of Ace commands to interact with the cache from the terminal.

Clears the cache for the specified store. If not specified, it will clear the default one.

Deletes a specific cache key from the specified store. If not specified, it will delete from the default one.

Some cache drivers, like the database driver, do not automatically remove expired keys because they lack native TTL support. You can use the cache:prune command to manually remove expired keys. On stores that support TTL, this command will result in a no-op.

**Examples:**

Example 1 (python):
```python
node ace add @adonisjs/cache
```

Example 2 (typescript):
```typescript
{
  providers: [
    // ...other providers
    () => import('@adonisjs/cache/cache_provider'),
  ]
}
```

Example 3 (typescript):
```typescript
import { defineConfig, store, drivers } from '@adonisjs/cache'

const cacheConfig = defineConfig({
  default: 'redis',

  stores: {
    /**
     * Cache data only on DynamoDB
     */
    dynamodb: store().useL2Layer(drivers.dynamodb({})),

    /**
     * Cache data using your Lucid-configured database
     */
    database: store().useL2Layer(drivers.database({ connectionName: 'default' })),

    /**
     * Cache data in-memory as the primary store and Redis as the secondary store.
     * If your application is running on multiple servers, then in-memory caches
     * need to be synchronized using a bus.
     */
    redis: store()
      .useL1Layer(drivers.memory({ maxSize: '100mb' }))
      .useL2Layer(drivers.redis({ connectionName: 'main' }))
      .useBus(drivers.redisBus({ connectionName: 'main' })),
  },
})

export default cacheConfig
```

Example 4 (typescript):
```typescript
import cache from '@adonisjs/cache/services/main'
import router from '@adonisjs/core/services/router'
import User from '#models/user'

router.get('/user/:id', async ({ params }) => {
  return cache.getOrSet({
    key: `user:${params.id}`,
    factory: async () => {
      const user = await User.find(params.id)
      return user.toJSON()
    },
    ttl: '5m',
  })
})
```

---

## Events reference

**URL:** https://docs.adonisjs.com/guides/references/events

**Contents:**
- Events reference
- http:request_completed
- http:server_ready
- container_binding:resolved
- session:initiated
- session:committed
- session:migrated
- i18n:missing:translation
- mail:sending
- mail:sent

In this guide, we look at the list of events dispatched by the framework core and the official packages. Check out the emitter documentation to learn more about its usage.

The http:request_completed event is dispatched after an HTTP request is completed. The event contains an instance of the HttpContext and the request duration. The duration value is the output of the process.hrtime method.

The event is dispatched once the AdonisJS HTTP server is ready to accept incoming requests.

The event is dispatched after the IoC container resolves a binding or constructs a class instance. The event.binding property will be a string (binding name) or a class constructor, and the event.value property is the resolved value.

The @adonisjs/session package emits the event when the session store is initiated during an HTTP request. The event.session property is an instance of the Session class.

The @adonisjs/session package emits the event when the session data is written to the session store during an HTTP request.

The @adonisjs/session package emits the event when a new session ID is generated using the session.regenerate() method.

The event is dispatched by the @adonisjs/i18n package when a translation for a specific key and locale is missing. You may listen to this event to find the missing translations for a given locale.

The @adonisjs/mail package emits the event before sending an email. In the case of the mail.sendLater method call, the event will be emitted when the mail queue processes the job.

After sending the email, the event is dispatched by the @adonisjs/mail package.

The @adonisjs/mail package emits the event before queueing the job to send the email.

After the email has been queued, the event is dispatched by the @adonisjs/mail package.

The event is dispatched when the MemoryQueue implementation of the @adonisjs/mail package is unable to send the email queued using the mail.sendLater method.

If you are using a custom queue implementation, you must capture the job errors and emit this event.

The event is dispatched by the SessionGuard implementation of the @adonisjs/auth package when the auth.login method is called either directly or internally by the session guard.

The event is dispatched by the SessionGuard implementation of the @adonisjs/auth package after a user has been logged in successfully.

You may use this event to track sessions associated with a given user.

The event is dispatched by the @adonisjs/auth package when an attempt is made to validate the request session and check for a logged-in user.

The event is dispatched by the @adonisjs/auth package after the request session has been validated and the user is logged in. You may access the logged-in user using the event.user property.

The event is dispatched by the @adonisjs/auth package when the authentication check fails, and the user is not logged in during the current HTTP request.

The event is dispatched by the @adonisjs/auth package after the user has been logged out.

The event is dispatched by the @adonisjs/auth package when an attempt is made to validate the access token during an HTTP request.

The event is dispatched by the @adonisjs/auth package after the access token has been verified. You may access the authenticated user using the event.user property.

The event is dispatched by the @adonisjs/auth package when the authentication check fails.

The event is dispatched by the @adonisjs/bouncer package after the authorization check has been performed. The event payload includes the final response you may inspect to know the status of the check.

The event is dispatched by the @adonisjs/cache package after the cache has been cleared using the cache.clear method.

The event is dispatched by the @adonisjs/cache package after a cache key has been deleted using the cache.delete method.

The event is dispatched by the @adonisjs/cache package when a cache key is found in the cache store.

The event is dispatched by the @adonisjs/cache package when a cache key is not found in the cache store.

The event is dispatched by the @adonisjs/cache package after a cache key has been written to the cache store.

Edge helpers and tags

**Examples:**

Example 1 (typescript):
```typescript
import emitter from '@adonisjs/core/services/emitter'
import string from '@adonisjs/core/helpers/string'

emitter.on('http:request_completed', (event) => {
  const method = event.ctx.request.method()
  const url = event.ctx.request.url(true)
  const duration = event.duration

  console.log(`${method} ${url}: ${string.prettyHrTime(duration)}`)
})
```

Example 2 (typescript):
```typescript
import emitter from '@adonisjs/core/services/emitter'

emitter.on('http:server_ready', (event) => {
  console.log(event.host)
  console.log(event.port)

  /**
   * Time it took to boot the app and start
   * the HTTP server.
   */
  console.log(event.duration)
})
```

Example 3 (typescript):
```typescript
import emitter from '@adonisjs/core/services/emitter'

emitter.on('container_binding:resolved', (event) => {
  console.log(event.binding)
  console.log(event.value)
})
```

Example 4 (typescript):
```typescript
import emitter from '@adonisjs/core/services/emitter'

emitter.on('session:initiated', (event) => {
  console.log(`Initiated store for ${event.session.sessionId}`)
})
```

---

## Mail

**URL:** https://docs.adonisjs.com/guides/digging-deeper/mail

**Contents:**
- Mail
- Installation
- Configuration
- Transports config
- Basic example
- Queueing emails
  - Using bullmq for queueing emails
- Switching between mailers
- Configuring the template engine
- Events

You can send emails from your AdonisJS application using the @adonisjs/mail package. The mail package is built on top of Nodemailer, bringing the following quality of life improvements over Nodemailer.

Install and configure the package using the following command:

Installs the @adonisjs/mail package using the detected package manager.

Registers the following service provider and command inside the adonisrc.ts file.

Create the config/mail.ts file.

Defines the environment variables and their validations for the selected mail services

The configuration for the mail package is stored inside the config/mail.ts file. Inside this file, you may configure multiple email services as mailers to use them within your application.

See also: Config stub

The name of the mailer to use by default for sending emails.

A static global address to use for the from property. The global address will be used unless an explicit from address is defined on the email.

A static global address to use for the reply-to property. The global address will be used unless an explicit replyTo address is defined on the email.

The mailers object is used to configure one or more mailers you want to use for sending emails. You can switch between the mailers at runtime using the mail.use method.

Following is a complete reference of configuration options accepted by the officially supported transports.

See also: TypeScript types for config object

The following configuration options are sent to the Mailgun's /messages.mime API endpoint.

The following configuration options are forwarded to Nodemailer as it is. So please check the Nodemailer documentation as well.

The following configuration options are forwarded to Nodemailer as it is. So please check the Nodemailer documentation as well.

Make sure to install the @aws-sdk/client-ses package to use the SES transport.

The following configuration options are sent to the SparkPost's /transmissions API endpoint.

The following configuration options are sent to the Resend's /emails API endpoint.

Once the initial configuration is completed, you may send emails using the mail.send method. The mail service is a singleton instance of the MailManager class created using the config file.

The mail.send method passes an instance of the Message class to the callback and delivers the email using the default mailer configured inside the config file.

In the following example, we trigger an email from the controller after creating a new user account.

Since sending emails can be time-consuming, you might want to push them to a queue and send emails in the background. You can do the same using the mail.sendLater method.

The sendLater method accepts the same parameters as the send method. However, instead of sending the email immediately, it will use the Mail messenger to queue it.

By default, the mail messenger uses an in-memory queue, meaning the queue will drop the jobs if your process dies with pending jobs. This might not be a huge deal if your application UI allows re-sending emails with manual actions. However, you can always configure a custom messenger and use a database-backed queue.

In the following example, we use the mail.setMessenger method to configure a custom queue that uses bullmq under the hood for storing jobs.

We store the compiled email, runtime configuration, and the mailer name inside the job. Later, we will use this data to send emails inside a worker process.

Finally, let's write the code for the queue Worker. Depending on your application workflow, you may have to start another process for the workers to process the jobs.

In the following example:

That's all! You may continue using the mail.sendLater method. However, the emails will be queued inside a Redis database this time.

You may switch between the configured mailers using the mail.use method. The mail.use method accepts the name of the mailer (as defined inside the config file) and returns an instance of the Mailer class.

You may call the mailer.send or mailer.sendLater methods to send email using a mailer instance. For example:

The mailer instances are cached for the lifecycle of the process. You may use the mail.close method to destroy an existing instance and re-create a new instance from scratch.

By default, the mail package is configured to use the Edge template engine for defining the email HTML and Plain text contents.

However, as shown in the following example, you may also register a custom template engine by overriding the Message.templateEngine property.

See also: Defining email contents

Please check the events reference guide to view the list of events dispatched by the @adonisjs/mail package.

The properties of an email are defined using the Message class. An instance of this class is provided to the callback function created using the mail.send, or mail.sendLater methods.

You may define the email subject using the message.subject method and the email's sender using the message.from method.

The from method accepts the email address as a string or an object with the sender name and the email address.

The sender can also be defined globally within the config file. The global sender will be used if no explicit sender is defined for an individual message.

You may define the email recipients using the message.to, message.cc, and the message.bcc methods. These methods accept the email address as a string or an object with the recipient name and the email address.

You can define multiple cc and bcc recipients as an array of email addresses or an array of objects with the recipient name and email address.

You may also define the replyTo email address using the message.replyTo method.

You may define the HTML and Plain text contents for an email using message.html or message.text methods.

Since writing inline content could be cumbersome, you may use Edge templates instead. If you have already configured Edge, you may use the message.htmlView and message.textView methods to render templates.

MJML is a markup language for creating emails without writing all the complex HTML to make your emails look good in every email client.

The first step is to install the mjml package from npm.

Once done, you can write MJML markup inside your Edge templates by wrapping it inside the @mjml tag.

Since the output of MJML contains the html, head, and body tags, it is unnecessary to define them within your Edge templates.

You may pass the MJML configuration options as props to the @mjml tag.

You may use the message.attach method to send attachments in an email. The attach method accepts an absolute path or a file system URL of a file you want to send as an attachment.

You may define the filename for the attachment using the options.filename property.

The complete list of options accepted by the message.attach method follows.

Custom headers for the attachment node. The headers property is a key-value pair

You may create email attachments from streams and buffers using the message.attachData method. The method accepts a readable stream or the buffer as the first argument and the options object as the second argument.

The message.attachData method should not be used when queueing emails using the mail.sendLater method. Since queued jobs are serialized and persisted inside a database, attaching raw data will increase the storage size.

Moreover, queueing an email will fail if you attach a stream using the message.attachData method.

You may embed images within the contents of your email using the embedImage view helper. The embedImage method under the hood uses CID to mark the image as an attachment and uses its content id as the source of the image.

Following will be the output HTML

The following attachment will be defined automatically on the email payload.

Like the embedImage method, you may use the embedImageData method to embed an image from raw data.

You may attach calendar events to an email using the message.icalEvent method. The icalEvent method accepts the event contents as the first parameter and the options object as the second parameter.

Since defining the event file contents manually can be cumbersome, you may pass a callback function to the icalEvent method and generate the invite contents using JavaScript API.

The calendar object provided to the callback function is a reference of the ical-generator npm package, so make sure to go through the package's README file as well.

You may define the invite contents from a file or an HTTP URL using the icalEventFromFile or icalEventFromUrl methods.

You may define additional email headers using the message.header method. The method accepts the header key as the first parameter and the value as the second parameter.

By default, the email headers are encoded and folded to meet the requirement of having plain ASCII messages with lines no longer than 78 bytes. However, if you want to bypass the encoding rules, you may set a header using the message.preparedHeader method.

The message class includes helper methods to define complex headers like List-Unsubscribe or List-Help with ease. You can learn about the encoding rules for List headers on the nodemailer website.

For all other arbitrary List headers, you may use the addListHeader method.

Instead of writing emails inside the mail.send method closure, you may move them to dedicated mail classes for better organization and easier testing.

The mail classes are stored inside the ./app/mails directory, and each file represents a single email. You may create a mail class by running the make:mail ace command.

See also: Make mail command

The mail class extends the BaseMail class and is scaffolded with the following properties and methods. You may configure the mail message inside the prepare method using the this.message property.

Configure the sender's email address. If you omit this property, you must call the message.from method to define the sender.

Configure the email subject. If you omit this property, you must use the message.subject method to define the email subject.

Configure the replyTo email address.

The prepare method is called automatically by the build method to prepare the mail message for sending.

You must define the email contents, attachments, recipients, etc, within this method.

The build method is inherited from the BaseMail class. The method is called automatically at the time of sending the email.

Make sure to reference the original implementation if you decide to override this method.

You may call the mail.send method and pass it an instance of the mail class to send the email. For example:

You may share data with the mail class using constructor arguments. For example:

One of the primary benefits of using Mail classes is a better testing experience. You can build mail classes without sending them and write assertions for the message properties.

You may write assertions for the message contents as follows.

Also, you may write assertions for the attachments. The assertions only work with file-based attachments and not for streams or raw content.

Feel free to look at the Message class source code for all the available assertion methods.

You may want to use the Fake mailer during testing to prevent your application from sending emails. The Fake mailer collects all outgoing emails within memory and offers an easy-to-use API for writing assertions against them.

In the following example:

Once you are done writing the test, you must restore the fake using the mail.restore method.

The mails.assertSent method accepts the mail class constructor as the first argument and throws an exception when unable to find any emails for the expected class.

You may pass a callback function to the assertSent method to further check if the email was sent to the expected recipient or has correct subject.

The callback function receives an instance of the mail class and you can use the .message property to get access to the message object.

You may run assertions on the message object within the callback. For example:

You may use the mails.assertNotSent method to assert an email was not sent during the test. This method is the opposite of the assertSent method and accepts the same arguments.

Finally, you can assert the count of sent emails using the assertSentCount and assertNoneSent methods.

If you have queued emails using the mail.sendLater method, you may use the following methods to write assertions for them.

You may use the mails.sent or mails.queued methods to get an array of emails sent/queued during tests.

AdonisJS Mail transports are built on top of Nodemailer transports; therefore, you must create/use a nodemailer transport before you can register it with the Mail package.

In this guide, we will wrap the nodemailer-postmark-transport to an AdonisJS Mail transport.

As you can see in the following example, the heavy lifting of sending an email is done by the Nodemailer. The AdonisJS transport acts as an adapter forwarding the message to nodemailer and normalizing its response to an instance of MailResponse.

To reference the above transport inside the config/mail.ts file, you must create a factory function that returns an instance of the transport.

You may write the following code within the same file as your transport's implementation.

Finally, you can reference the transport inside your config file using the postmarkTransport helper.

**Examples:**

Example 1 (markdown):
```markdown
node ace add @adonisjs/mail

# Pre-define transports to use via CLI flag
node ace add @adonisjs/mail --transports=resend --transports=smtp
```

Example 2 (typescript):
```typescript
{
  commands: [
    // ...other commands
    () => import('@adonisjs/mail/commands')
  ],
  providers: [
    // ...other providers
    () => import('@adonisjs/mail/mail_provider')
  ]
}
```

Example 3 (typescript):
```typescript
import env from '#start/env'
import { defineConfig, transports } from '@adonisjs/mail'

const mailConfig = defineConfig({
  default: 'smtp',

  /**
   * A static address for the "from" property. It will be
   * used unless an explicit from address is set on the
   * Email
   */
  from: {
    address: '',
    name: '',
  },

  /**
   * A static address for the "reply-to" property. It will be
   * used unless an explicit replyTo address is set on the
   * Email
   */
  replyTo: {
    address: '',
    name: '',
  },

  /**
   * The mailers object can be used to configure multiple mailers
   * each using a different transport or the same transport with different
   * options.
   */
  mailers: {
    smtp: transports.smtp({
      host: env.get('SMTP_HOST'),
      port: env.get('SMTP_PORT'),
    }),

    resend: transports.resend({
      key: env.get('RESEND_API_KEY'),
      baseUrl: 'https://api.resend.com',
    }),
  },
})
```

Example 4 (typescript):
```typescript
{
  mailers: {
    mailgun: transports.mailgun({
      baseUrl: 'https://api.mailgun.net/v3',
      key: env.get('MAILGUN_API_KEY'),
      domain: env.get('MAILGUN_DOMAIN'),

      /**
       * The following options can be overridden at
       * runtime when calling the `mail.send` method.
       */
      oDkim: true,
      oTags: ['transactional', 'adonisjs_app'],
      oDeliverytime: new Date(2024, 8, 18),
      oTestMode: false,
      oTracking: false,
      oTrackingClick: false,
      oTrackingOpens: false,
      headers: {
        // h:prefixed headers
      },
      variables: {
        appId: '',
        userId: '',
        // v:prefixed variables
      }
    })
  }
}
```

---

## REPL

**URL:** https://docs.adonisjs.com/guides/digging-deeper/repl

**Contents:**
- REPL
- Interacting with REPL
  - Accessing the result of the last executed command
  - Accessing error raised by last executed command
  - Searching through history
  - Exiting from REPL session
- Importing modules
- Helpers methods
- Adding custom methods to REPL

Like the Node.js REPL, AdonisJS offers an application-aware REPL to interact with your application from the command line. You can start the REPL session using the node ace repl command.

On top of a standard Node.js REPL, AdonisJS provides the following features.

Once you start the REPL session, you will see an interactive prompt in which you can write valid JavaScript code and press enter to execute it. The output of the code will be printed on the following line.

If you want to type multiple lines of code, you can enter into the editor mode by typing the .editor command. Press Ctrl+D to execute a multiline statement or Ctrl+C to cancel and exit the editor mode.

If you forget to assign the value of a statement to a variable, you can access it using the _ variable. For example:

You can access the exception raised by the previous command using the _error variable. For example:

The REPL history is saved in the .adonisjs_v6_repl_history file in the user's home directory.

You can loop through the commands from the history by pressing the up arrow ↑ key or pressing Ctrl+R to search within the history.

You can exit the REPL session by typing .exit or press the Ctrl+C twice. AdonisJS will perform a graceful shutdown before closing the REPL session.

Also, if you modify your codebase, you must exit and restart the REPL session for new changes to pick up.

Node.js does not allow using the import statements inside the REPL session. Therefore, you must use the dynamic import function and assign the output to a variable. For example:

You can use the importDefault method to access default export without destructuring the exports.

Helper methods are shortcut functions you can execute to perform specific actions. You can view the list of available methods using the .ls command.

You can add custom methods to the REPL using repl.addMethod. The method accepts the name as the first argument and the implementation callback as the second argument.

For demonstration, let's create a preload file file and define a method to import all models from the ./app/models directory.

You can pass the following options to the repl.addMethod method as the third argument.

Once done, you can restart the REPL session and execute the loadModels method to import all the models.

**Examples:**

Example 1 (unknown):
```unknown
node ace repl
```

Example 2 (markdown):
```markdown
> (js) .editor
# // Entering editor mode (Ctrl+D to finish, Ctrl+C to cancel)
```

Example 3 (markdown):
```markdown
> (js) helpers.string.generateRandom(32)
# 'Z3y8QQ4HFpYSc39O2UiazwPeKYdydZ6M'
> (js) _
# 'Z3y8QQ4HFpYSc39O2UiazwPeKYdydZ6M'
> (js) _.length
# 32
> (js)
```

Example 4 (markdown):
```markdown
> (js) helpers.string.generateRandom()
> (js) _error.message
# 'The value of "size" is out of range. It must be >= 0 && <= 2147483647. Received NaN'
```

---
