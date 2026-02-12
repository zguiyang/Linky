# Adonisjs - Security

**Pages:** 4

---

## Hashing

**URL:** https://docs.adonisjs.com/guides/security/hashing

**Contents:**
- Hashing
- Usage
- Configuration
  - Argon
  - Bcrypt
  - Scrypt
- Using model hooks to hash password
- Switching between drivers
- Checking if a password needs to be rehashed
- Faking hash service during tests

You may hash user passwords in your application using the hash service. AdonisJS has first-class support for bcrypt, scrypt, and argon2 hashing algorithms and the ability to add custom drivers.

The hashed values are stored in PHC string format. PHC is a deterministic encoding specification for formatting hashes.

The hash.make method accepts a plain string value (the user password input) and returns a hash output.

You cannot convert a hash value to plain text, hashing is a one-way process, and there is no way to retrieve the original value after a hash has been generated.

However, hashing provides a way to verify if a given plain text value matches against an existing hash, and you can perform this check using the hash.verify method.

The configuration for hashing is stored inside the config/hash.ts file. The default driver is set to scrypt because scrypt uses the Node.js native crypto module and does not require any third-party packages.

Argon is the recommended hashing algorithm to hash user passwords. To use argon with the AdonisJS hash service, you must install the argon2 npm package.

We configure the argon driver with secure defaults but feel free to tweak the configuration options per your application requirements. Following is the list of available options.

The argon hash variant to use.

The argon version to use. The available options are 0x10 (1.0) and 0x13 (1.3). The latest version should be used by default.

The iterations count increases the hash strength but takes more time to compute.

The default value is 3.

The amount of memory to be used for hashing the value. Each parallel thread will have a memory pool of this size.

The default value is 65536 (KiB).

The number of threads to use for computing the hash.

The default value is 4.

The length of salt (in bytes). Argon generates a cryptographically secure random salt of this size when computing the hash.

The default and recommended value for password hashing is 16.

Maximum length for the raw hash (in bytes). The output value will be longer than the mentioned hash length because the raw hash output is further encoded to PHC format.

The default value is 32

To use Bcrypt with the AdonisJS hash service, you must install the bcrypt npm package.

Following is the list of available configuration options.

The cost for computing the hash. We recommend reading the A Note on Rounds section from Bcrypt docs to learn how the rounds value has an impact on the time it takes to compute the hash.

The default value is 10.

The length of salt (in bytes). When computing the hash, we generate a cryptographically secure random salt of this size.

The default value is 16.

The version for the hashing algorithm. The supported values are 97 and 98. Using the latest version, i.e., 98 is recommended.

The scrypt driver uses the Node.js crypto module for computing the password hash. The configuration options are the same as those accepted by the Node.js scrypt method.

Since you will be using the hash service to hash user passwords, you may find placing the logic inside the beforeSave model hook helpful.

If you are using the @adonisjs/auth module, hashing passwords within your model is unnecessary. The AuthFinder automatically handles password hashing, ensuring your user credentials are securely processed. Learn more about this process here.

If your application uses multiple hashing drivers, you can switch between them using the hash.use method.

The hash.use method accepts the mapping name from the config file and returns an instance of the matching driver.

The latest configuration options are recommended to keep passwords secure, especially when a vulnerability is reported with an older version of the hashing algorithm.

After you update the config with the latest options, you can use the hash.needsReHash method to check if a password hash uses old options and perform a re-hash.

The check must be performed during user login because that is the only time you can access the plain text password.

You can assign a plain text value to user.password if you use model hooks to compute the hash.

Hashing a value is usually a slow process, and it will make your tests slow. Therefore, you might consider faking the hash service using the hash.fake method to disable password hashing.

We create 20 users using the UserFactory in the following example. Since you are using a model hook to hash passwords, it might take 5-7 seconds (depending on the configuration).

However, once you fake the hash service, the same test will run in order of magnitude faster.

A hash driver must implement the HashDriverContract interface. Also, the official Hash drivers use PHC format to serialize the hash output for storage. You can check the existing driver's implementation to see how they use the PHC formatter to make and verify hashes.

In the above code example, we export the following values.

PbkdfConfig: TypeScript type for the configuration you want to accept.

Pbkdf2Driver: Driver's implementation. It must adhere to the HashDriverContract interface.

pbkdf2Driver: Finally, a factory function to lazily create an instance of the driver.

Once the implementation is completed, you can reference the driver inside the config file using the pbkdf2Driver factory function.

**Examples:**

Example 1 (typescript):
```typescript
import hash from '@adonisjs/core/services/hash'

const hash = await hash.make('user_password')
// $scrypt$n=16384,r=8,p=1$iILKD1gVSx6bqualYqyLBQ$DNzIISdmTQS6sFdQ1tJ3UCZ7Uun4uGHNjj0x8FHOqB0pf2LYsu9Xaj5MFhHg21qBz8l5q/oxpeV+ZkgTAj+OzQ
```

Example 2 (typescript):
```typescript
import hash from '@adonisjs/core/services/hash'

if (await hash.verify(existingHash, plainTextValue)) {
  // password is correct
}
```

Example 3 (typescript):
```typescript
import { defineConfig, drivers } from '@adonisjs/core/hash'

export default defineConfig({
  default: 'scrypt',

  list: {
    scrypt: drivers.scrypt(),

    /**
     * Uncomment when using argon2
       argon: drivers.argon2(),
     */

    /**
     * Uncomment when using bcrypt
       bcrypt: drivers.bcrypt(),
     */
  }
})
```

Example 4 (unknown):
```unknown
npm i argon2
```

---

## Securing server-rendered applications

**URL:** https://docs.adonisjs.com/guides/security/securing-ssr-applications

**Contents:**
- Securing server-rendered applications
- CSRF protection
  - Protecting forms
  - Handling exceptions
  - Config reference
- Defining CSP policy
  - Using Nonce
  - Loading assets from the Vite Dev server
  - Adding Nonce to styles injected by Vite
- Configuring HSTS

If you are creating a server-rendered application using AdonisJS, then you must use the @adonisjs/shield package to protect your applications from common web attacks like CSRF, XSS, Content sniffing, and so on.

The package comes pre-configured with the web starter kit. However, you can manually install and configure the package as follows.

The @adonisjs/shield package has a peer dependency on the @adonisjs/session package, so make sure to configure the session package first.

Installs the @adonisjs/shield package using the detected package manager.

Registers the following service provider inside the adonisrc.ts file.

Creates the config/shield.ts file.

Registers the following middleware inside the start/kernel.ts file.

CSRF (Cross-Site Request Forgery) is an attack in which a malicious website tricks the users of your web app to perform form submissions without their explicit consent.

To protect against CSRF attacks, you should define a hidden input field holding the CSRF token value that only your website can generate and verify. Hence, the form submissions triggered by the malicious website will fail.

Once you configure the @adonisjs/shield package, all form submissions without a CSRF token will automatically fail. Therefore, you must use the csrfField edge helper to define a hidden input field with the CSRF token.

During the form submission, the shield_middleware will automatically verify the _csrf token, only allowing the form submissions with a valid CSRF token.

Shield raises an E_BAD_CSRF_TOKEN exception when the CSRF token is missing or invalid. By default, AdonisJS will capture the exception and redirect the user back to the form with an error flash message.

You can access the flash message as follows inside an edge template.

You can also self-handle the E_BAD_CSRF_TOKEN exception inside the global exception handler as follows.

The configuration for the CSRF guard is stored inside the config/shield.ts file.

Turn the CSRF guard on or off.

An array of route patterns to exempt from the CSRF protection. If your application has routes that accept form submissions via an API, you might want to exempt them.

For more advanced use cases, you may register a function to exempt specific routes dynamically.

When enabled, Shield will store the CSRF token inside an encrypted cookie named XSRF-TOKEN, which can be read by the frontend JavaScript code.

This allows frontend request libraries like Axios to read the XSRF-TOKEN automatically and set it as a X-XSRF-TOKEN header when making Ajax requests without server-rendered forms.

You must keep the enableXsrfCookie disabled if you are not triggering Ajax requests programmatically.

An array of HTTP methods to protect. All incoming requests for the mentioned methods must present a valid CSRF token.

Configuration for the XSRF-TOKEN cookie. See cookies configuration for available options.

CSP (Content security policy) protects your applications from XSS attacks by defining trusted sources for loading JavaScript, CSS, fonts, images, and so on.

The CSP guard is disabled by default. However, we recommend you enable it and configure the policy directives inside the config/shield.ts file.

Turn the CSP guard on or off.

Configure the CSP directives. You can view the list of available directives on https://content-security-policy.com/

The CSP policy will not block the resources when the reportOnly flag is enabled. Instead, it will report the violations on an endpoint configured using the reportUri directive.

Also, register the csp-report endpoint to collect the violation reports.

You may allow inline script and style tags by defining the nonce attribute on them. The value of the nonce attribute can be accessed inside Edge templates using the cspNonce property.

Also, use the @nonce keyword inside the directives config to allow nonce-based inline scripts and styles.

If you are using the Vite integration, you can use the following CSP keywords to allow assets served by the Vite Dev server.

If you are deploying the Vite bundled output to a CDN server, you must replace @viteDevUrl with the @viteUrl keyword to allow assets from both the development server and the CDN server.

Currently, Vite does not allow defining a nonce attribute to the style tags injected by it inside the DOM. There is an open PR for the same, and we are hoping it will be resolved soon.

The Strict-Transport-Security (HSTS) response header informs the browsers to always load the website using HTTPS.

You can configure the header directives using the config/shield.ts file.

Turn the hsts guard on or off.

Defines the max-age attribute. The value should either be a number in seconds or a string-based time expression.

Defines the includeSubDomains directive to apply the setting on subdomains.

The X-Frame-Options header is used to indicate if a browser is allowed to render a website embedded inside an iframe, frame, embed, or object tags.

If you have configured CSP, you may instead use the frame-ancestors directive and disable the xFrame guard.

You can configure the header directives using the config/shield.ts file.

Turn the xFrame guard on or off.

The action property defines the header value. It could be DENY, SAMEORIGIN, or ALLOW-FROM.

In the case of ALLOW-FROM, you must also define the domain property.

The X-Content-Type-Options header instructs browsers to follow the content-type header and not perform MIME sniffing by inspecting the content of an HTTP response.

Once you enable this guard, Shield will define the X-Content-Type-Options: nosniff header for all HTTP responses.

**Examples:**

Example 1 (python):
```python
node ace add @adonisjs/shield
```

Example 2 (typescript):
```typescript
{
  providers: [
    // ...other providers
    () => import('@adonisjs/shield/shield_provider'),
  ]
}
```

Example 3 (typescript):
```typescript
router.use([() => import('@adonisjs/shield/shield_middleware')])
```

Example 4 (jsx):
```jsx
<form method="POST" action="/">
  {{ csrfField() }}
  <input type="name" name="name" placeholder="Enter your name">
  <button type="submit"> Submit </button>
</form>
```

---

## Rate limiting

**URL:** https://docs.adonisjs.com/guides/security/rate-limiting

**Contents:**
- Rate limiting
- Installation
- Configuration
  - Environment variables
  - Shared options
  - Redis store
  - Database store
- Throttling HTTP requests
  - Dynamic rate limiting
  - Switching the backend store

AdonisJS provides a first-party package for implementing rate limits in your web application or the API server. The rate limiter provides redis, mysql, postgresql, sqlite and memory as the storage options, with the ability to create custom storage providers.

The @adonisjs/limiter package is built on top of the node-rate-limiter-flexible package, which provides one of the fastest rate-limiting API and uses atomic increments to avoid race conditions.

Install and configure the package using the following command :

Installs the @adonisjs/limiter package using the detected package manager.

Registers the following service provider inside the adonisrc.ts file.

Create the config/limiter.ts file.

Create the start/limiter.ts file. This file is used to define HTTP throttle middleware.

Define the following environment variable alongside its validation inside the start/env.ts file.

Optionally, create the database migration for the rate_limits table if using the database store.

The configuration for the rate limiter is stored within the config/limiter.ts file.

See also: Rate limiter config stub

The default store to use for applying rate limits. The store is defined within the same config file under the stores object.

A collection of stores you plan to use within your application. We recommend always configuring the memory store that could be used during testing.

The default limiter is defined using the LIMITER_STORE environment variable, and therefore, you can switch between different stores in different environments. For example, use the memory store during testing and the redis store for development and production.

Also, the environment variable must be validated to allow one of the pre-configured stores. The validation is defined inside the start/env.ts file using the Env.schema.enum rule.

Following is the list of options shared by all the bundled stores.

Define the prefix for the keys stored inside the database store. The database store ignores the keyPrefix since different database tables can be used to isolate data.

The execEvenly option adds a delay when throttling the requests so that all requests are exhausted at the end of the provided duration.

For example, if you allow a user to make 10 requests/min, all requests will have an artificial delay, so the tenth request finishes at the end of the 1 minute. Read the smooth out traffic peaks article on rate-limiter-flexible repo to learn more about the execEvenly option.

inMemoryBlockOnConsumed

Define the number of requests after which the key should be blocked within memory. For example, you allow a user to make 10 requests/min, and they have consumed all the requests within the first 10 seconds.

However, they continue to make requests to the server, and therefore, the rate limiter has to check with the database before denying the request.

To reduce the load on the database, you can define the number of requests, after which we should stop querying the database and block the key within the memory.

inMemoryBlockDuration

The duration for which to block the key within memory. This option will reduce the load on the database since the backend stores will first check within memory to see if a key is blocked.

The redis store has a peer dependency on the @adonisjs/redis package; therefore, you must configure this package before using the redis store.

Following is the list of options the redis store accepts (alongside the shared options).

The connectionName property refers to a connection defined within the config/redis.ts file. We recommend using a separate redis database for the limiter.

rejectIfRedisNotReady

Reject the rate-limiting requests when the status of the Redis connection is not ready.

The database store has a peer dependency on the @adonisjs/lucid package, and therefore, you must configure this package before using the Database store.

Following is the list of options the database store accepts (alongside the shared options).

Only MySQL, PostgreSQL, and SQLite databases can be used with the database store.

Reference to the database connection defined within the config/database.ts file. If not defined, we will use the default database connection.

The database to use for making SQL queries. We try to infer the value of dbName from the connection config defined within the config/database.ts file. However, if using a connection string, you must supply the database name via this property.

The database table to use to store rate limits.

The schema to use for making SQL queries (PostgreSQL only).

clearExpiredByTimeout

When enabled, the database store will clear expired keys every 5 minutes. Do note that only keys that have been expired for more than 1 hour will be cleared.

Once the limiter has been configured, you may create HTTP throttle middleware using the limiter.define method. The limiter service is a singleton instance of the LimiterManager class created using the config defined within the config/limiter.ts file.

If you open the start/limiter.ts file, you will find a pre-defined global throttle middleware you can apply on a route or a group of routes. Similarly, you can create as many throttle middleware as you need in your application.

In the following example, the global throttle middleware allows users to make 10 requests/min based on their IP address.

You can apply the throttle middleware to a route as follows.

Let's create another middleware to protect an API endpoint. This time, we will apply dynamic rate limits based on the authentication status of a request.

You can use a specific backend store with throttle middleware using the store method. For example:

By default, the requests are rate-limited by the user's IP Address. However, you can specify a custom key using the usingKey method.

You may block a user for a specified duration if they continue to make requests even after exhausting their quota using the blockFor method. The method accepts the duration in seconds or the time expression.

The throttle middleware throws the E_TOO_MANY_REQUESTS exception when the user has exhausted all the requests within the specified timeframe. The exception will be automatically converted to an HTTP response using the following content negotiation rules.

HTTP requests with the Accept=application/json header will receive an array of error messages. Each array element will be an object with the message property.

HTTP requests with the Accept=application/vnd.api+json header will receive an array of error messages formatted per the JSON API spec.

All other requests will receive a plain text response message. However, you may use status pages to show a custom error page for limiter errors.

You may also self-handle the error within the global exception handler.

Instead of handling the exception globally, you may customize the error message, status, and response headers using the limitExceeded hook.

If you have configured the @adonisjs/i18n package, you may define the translation for the error message using the errors.E_TOO_MANY_REQUESTS key. For example:

Finally, you can define a custom translation key using the error.t method.

Alongside throttling HTTP requests, you may also use the limiter to apply rate limits in other parts of your application. For example, block a user during login if they provide invalid credentials multiple times. Or limit the number of concurrent jobs a user can run.

Before you can apply rate limiting on an action, you must get an instance of the Limiter class using the limiter.use method. The use method accepts the name of the backend store and the following rate-limiting options.

Omit the first parameter if you want to use the default store. For example:

Once you have created a limiter instance, you can use the attempt method to apply rate limiting on an action. The method accepts the following parameters.

The attempt method returns the result of the callback function (if it is executed). Otherwise, it returns undefined.

Another example of direct usage could be to disallow an IP Address from making multiple invalid attempts on a login form.

In the following example, we use the limiter.penalize method to consume one request whenever the user provides invalid credentials and block them for 20 minutes after all the attempts have been exhausted.

The limiter.penalize method accepts the following arguments.

The penalize method returns the result of the callback function or an instance of the ThrottleException. You can use the exception to find the duration remaining till the next attempt.

Alongside the attempt and the penalize methods, you may interact with the limiter directly to check the remaining requests and manually consume them.

In the following example, we use the remaining method to check if a given key has consumed all the requests. Otherwise, use the increment method to consume one request.

You might run into a race condition in the above example between calling the remaining and the increment methods. Therefore, you may want to use the consume method instead. The consume method will increment the requests count and throw an exception if all the requests have been consumed.

Alongside consuming requests, you may block a key for longer if a user continues to make requests after exhausting all the attempts.

The blocking is performed by the consume, attempt, and the penalize methods automatically when you create a limiter instance with blockDuration option. For example:

Finally, you may use the block method to block a key for a given duration.

You may use one of the following methods to decrease the number of requests or delete the entire key from the storage.

The decrement method reduces the request count by 1, and the delete method deletes the key. Note that the decrement method is not atomic and might set the requests count to -1 when concurrency is too high.

If you use a single (i.e., default) store for rate limiting, you may want to switch to the memory store during testing by defining the LIMITER_STORE environment variable inside the .env.test file.

You may clear the rate-limiting storage between tests using the limiter.clear method. The clear method accepts an array of store names and flushes the database.

When using Redis, it is recommended to use a separate database for the rate limiter. Otherwise, the clear method will flush the entire DB, and this might impact other parts of the applications.

Alternatively, you can call the clear method without any arguments, and all configured stores will be cleared.

A custom storage provider must implement the LimiterStoreContract interface and define the following properties/methods.

You may write the implementation inside any file/folder. A service provider is not needed to create a custom store.

Once you have written the implementation, you must create a config helper to use the provider inside the config/limiter.ts file. The config helper should return a LimiterManagerStoreFactory function.

You may write the following function within the same file as the MongoDbLimiterStore implementation.

Once done, you may use the mongoDbStore helper as follows.

If you are planning to wrap an existing driver from the node-rate-limiter-flexible package, then you may use the RateLimiterBridge for the implementation.

Let's re-implement the same MongoDbLimiterStore using the bridge this time.

**Examples:**

Example 1 (python):
```python
node ace add @adonisjs/limiter
```

Example 2 (typescript):
```typescript
{
  providers: [
    // ...other providers
    () => import('@adonisjs/limiter/limiter_provider')
  ]
}
```

Example 3 (typescript):
```typescript
LIMITER_STORE=redis
```

Example 4 (typescript):
```typescript
import env from '#start/env'
import { defineConfig, stores } from '@adonisjs/limiter'

const limiterConfig = defineConfig({
  default: env.get('LIMITER_STORE'),

  stores: {
    redis: stores.redis({}),

    database: stores.database({
      tableName: 'rate_limits'
    }),

    memory: stores.memory({}),
  },
})

export default limiterConfig

declare module '@adonisjs/limiter/types' {
  export interface LimitersList extends InferLimiters<typeof limiterConfig> {}
}
```

---

## Encryption

**URL:** https://docs.adonisjs.com/guides/security/encryption

**Contents:**
- Encryption
- Encrypting values
- Decrypting values
- Supported data types
- Using custom secret keys

Using the encryption service, you may encrypt and decrypt values in your application. The encryption is based on the aes-256-cbc algorithm, and we append an integrity hash (HMAC) to the final output to prevent value tampering.

The encryption service uses the appKey stored inside the config/app.ts file as the secret to encrypt the values.

It is recommended to keep the appKey secure and inject it into your application using environment variables. Anyone with access to this key can decrypt values.

The key should be at least 16 characters long and have a cryptographically secure random value. You may generate the key using the node ace generate:key command.

If you decide to change the key later, you will not be able to decrypt existing values. This will result in invalidating existing cookies and user sessions.

You may encrypt values using the encryption.encrypt method. The method accepts the value to encrypt and an optional time duration after which to consider the value expired.

Define a time duration after which the value will be considered expired and cannot be decrypted.

Encrypted values can be decrypted using the encryption.decrypt method. The method accepts the encrypted value as the first argument.

The value given to the encrypt method is serialized to a string using JSON.stringify. Therefore, you can use the following JavaScript data types.

You can create an instance of the Encryption class directly to use custom secret keys.

**Examples:**

Example 1 (typescript):
```typescript
import encryption from '@adonisjs/core/services/encryption'

const encrypted = encryption.encrypt('hello world')
```

Example 2 (typescript):
```typescript
const encrypted = encryption.encrypt('hello world', '2 hours')
```

Example 3 (typescript):
```typescript
import encryption from '@adonisjs/core/services/encryption'

encryption.decrypt(encryptedValue)
```

Example 4 (typescript):
```typescript
import encryption from '@adonisjs/core/services/encryption'

// Object
encryption.encrypt({
  id: 1,
  fullName: 'virk',
})

// Array
encryption.encrypt([1, 2, 3, 4])

// Boolean
encryption.encrypt(true)

// Number
encryption.encrypt(10)

// BigInt
encryption.encrypt(BigInt(10))

// Data objects are converted to ISO string
encryption.encrypt(new Date())
```

---
