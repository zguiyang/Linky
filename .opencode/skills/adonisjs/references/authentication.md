# Adonisjs - Authentication

**Pages:** 9

---

## Authorization

**URL:** https://docs.adonisjs.com/guides/security/authorization

**Contents:**
- Authorization
- Installation
- The Initialize bouncer middleware
- Defining abilities
  - Performing authorization
  - Allowing guest users
  - Authorizing users other than the logged-in user
- Defining policies
  - Performing authorization
  - Allowing guest users

You can write authorization checks in your AdonisJS application using the @adonisjs/bouncer package. Bouncer provides a JavaScript first API for writing authorization checks as abilities and policies.

The goal of abilities and policies is to abstract the logic of authorizing an action to a single place and reuse it across the rest of the codebase.

Abilities are defined as functions and can be a great fit if your application has fewer and simpler authorization checks.

Policies are defined as classes, and you must create one policy for every resource in your application. Policies can also benefit from automatic dependency injection.

Bouncer is not an implementation of RBAC or ACL. Instead, it provides a low-level API with fine-grained control to authorize actions in your AdonisJS applications.

Install and configure the package using the following command:

Installs the @adonisjs/bouncer package using the detected package manager.

Registers the following service provider and command inside the adonisrc.ts file.

Creates the app/abilities/main.ts file to define and export abilities.

Creates the app/policies/main.ts file to export all policies as a collection.

Creates initialize_bouncer_middleware inside the middleware directory.

Register the following middleware inside the start/kernel.ts file.

Are you more of a visual learner? - Checkout the AdonisJS Bouncer free screencasts series from our friends at Adocasts.

During setup, we create and register the #middleware/initialize_bouncer_middleware middleware within your application. The initialize middleware is responsible for creating an instance of the Bouncer class for the currently authenticated user and shares it via the ctx.bouncer property with the rest of the request.

Also, we share the same Bouncer instance with Edge templates using the ctx.view.share method. Feel free to remove the following lines of code from the middleware if you are not using Edge inside your application.

You own your application's source code, including the files created during the initial setup. So, do not hesitate to change them and make them work with your application environment.

Abilities are JavaScript functions usually written inside the ./app/abilities/main.ts file. You may export multiple abilities from this file.

In the following example, we define an ability called editPost using the Bouncer.ability method. The implementation callback must return true to authorize the user and return false to deny access.

An ability should always accept the User as the first parameter, followed by additional parameters needed for the authorization check.

Once you have defined an ability, you may perform an authorization check using the ctx.bouncer.allows method.

Bouncer will automatically pass the currently logged-in user to the ability callback as the first parameter, and you must supply the rest of the parameters manually.

The opposite of bouncer.allows method is the bouncer.denies method. You may prefer this method instead of writing an if not statement.

By default, Bouncer denies authorization checks for non-logged-in users without invoking the ability callback.

However, you may want to define certain abilities that can work with a guest user. For example, allow guests to view published posts but allow the creator of the post to view drafts as well.

You may define an ability that allows guest users using the allowGuest option. In this case, the options will be defined as the first parameter, and callback will be the second parameter.

If you want to authorize a user other than the logged-in user, you may use the Bouncer constructor to create a new bouncer instance for a given user.

Policies offer an abstraction layer to organize the authorization checks as classes. It is recommended to create one policy per resource. For example, if your application has a Post model, you must create a PostPolicy class to authorize actions such as creating or updating posts.

The policies are stored inside the ./app/policies directory, and each file represents a single policy. You may create a new policy by running the following command.

See also: Make policy command

The policy class extends the BasePolicy class, and you may implement methods for the authorization checks you want to perform. In the following example, we define authorization checks to create, edit, and delete a post.

Once you have created a policy, you may use the bouncer.with method to specify the policy you want to use for authorization and then chain the bouncer.allows or bouncer.denies methods to perform the authorization check.

The allows and denies methods chained after the bouncer.with methods are type-safe and will show a list of completions based on the methods you have defined on the policy class.

Similar to abilities, policies can also define authorization checks for guest users using the @allowGuest decorator. For example:

You may define the before and the after template methods on a policy class to run actions around an authorization check. A common use case is always allowing or denying access to a certain user.

The before and the after methods are always invoked, regardless of a logged-in user. So make sure to handle the case where the value of user will be null.

The response from the before is interpreted as follows.

The after method receives the raw response from the action method and can override the previous response by returning a new value. The response from the after is interpreted as follows.

The policy classes are created using the IoC container; therefore, you can type-hint and inject dependencies inside the policy constructor using the @inject decorator.

If a Policy class is created during an HTTP request, you may also inject an instance of HttpContext inside it.

Alongside the allows and the denies methods, you may use the bouncer.authorize method to perform the authorization check. This method will throw the AuthorizationException when the check fails.

AdonisJS will convert the AuthorizationException to a 403 - Forbidden HTTP response using the following content negotiation rules.

HTTP requests with the Accept=application/json header will receive an array of error messages. Each array element will be an object with the message property.

HTTP requests with Accept=application/vnd.api+json header will receive an array of error messages formatted as per the JSON API spec.

All other requests will receive a plain text response message. However, you may use status pages to show a custom error page for authorization errors.

You may also self-handle AuthorizationException errors within the global exception handler.

Instead of returning a boolean value from abilities and policies, you may construct an error response using the AuthorizationResponse class.

The AuthorizationResponse class gives you fine grained control to define a custom HTTP status code and the error message.

If you are using the @adonisjs/i18n package, you may return a localized response using the .t method. The translation message will be used over the default message during an HTTP request based on the user's language.

The flexibility to define custom error messages for individual authorization checks is great. However, if you always want to return the same response, it might be cumbersome to repeat the same code every time.

Therefore, you can override the default response builder for Bouncer as follows.

So far, in this guide, we explicitly import an ability or a policy whenever we want to use it. However, once you pre-register them, you can reference an ability or a policy by its name as a string.

Pre-registering abilities and policies might be less useful within your TypeScript codebase than just cleaning up the imports. However, they offer far better DX within Edge templates.

Look at the following code examples of Edge templates with and without pre-registering a policy.

Without pre-registering. No, not super clean

If you open the initialize_bouncer_middleware.ts file, you will find us already importing and pre-registering abilities and policies when creating the Bouncer instance.

If you decide to define abilities in other parts of your codebase, then make sure to import and pre-register them inside the middleware.

In the case of policies, every time you run the make:policy command, make sure to accept the prompt to register the policy inside the policies collection. The policies collection is defined inside the ./app/policies/main.ts file.

In the following example, we get rid of the imports and reference abilities and policies by their name. Do note the string-based API is also type-safe, but your code editor's "Go to Definition" feature may not work.

Before you can perform authorization checks inside Edge templates, make sure to pre-register abilities and policies. Once done, you may use the @can and @cannot tags to perform the authorization checks.

These tags accept the ability name or the policy.method name as the first parameter, followed by the rest of the parameters accepted by the ability or a policy.

Please check the events reference guide to view the list of events dispatched by the @adonisjs/bouncer package.

Social authentication

**Examples:**

Example 1 (python):
```python
node ace add @adonisjs/bouncer
```

Example 2 (typescript):
```typescript
{
  commands: [
    // ...other commands
    () => import('@adonisjs/bouncer/commands')
  ],
  providers: [
    // ...other providers
    () => import('@adonisjs/bouncer/bouncer_provider')
  ]
}
```

Example 3 (typescript):
```typescript
router.use([
  () => import('#middleware/initialize_bouncer_middleware')
])
```

Example 4 (typescript):
```typescript
async handle(ctx: HttpContext, next: NextFn) {
  ctx.bouncer = new Bouncer(
    () => ctx.auth.user || null,
    abilities,
    policies
  ).setContainerResolver(ctx.containerResolver)

  /**
   * Remove if not using Edge
   */
  if ('view' in ctx) {
    ctx.view.share(ctx.bouncer.edgeHelpers)
  }

  return next()
}
```

---

## Basic authentication guard

**URL:** https://docs.adonisjs.com/guides/authentication/basic-auth-guard

**Contents:**
- Basic authentication guard
- Configuring the guard
- Preparing the User model
- Protecting routes
  - Handling authentication exception
- Getting access to the authenticated user
  - Get authenticated user or fail

The basic auth guard is an implementation of the HTTP authentication framework, in which the client must pass the user credentials as a base64 encoded string via the Authorization header. The server allows the request if the credentials are valid. Otherwise, a web-native prompt is displayed to re-enter the credentials.

The authentication guards are defined inside the config/auth.ts file. You can configure multiple guards inside this file under the guards object.

The basicAuthGuard method creates an instance of the BasicAuthGuard class. It accepts a user provider that can be used to find users during authentication.

The basicAuthUserProvider method creates an instance of the BasicAuthLucidUserProvider class. It accepts a reference to the model to use for verifying user credentials.

The model (User model in this example) configured with the basicAuthUserProvider must use the AuthFinder mixin to verify the user credentials during authentication.

Once you have configured the guard, you can use the auth middleware to protect routes from unauthenticated requests. The middleware is registered inside the start/kernel.ts file under the named middleware collection.

The auth middleware throws the E_UNAUTHORIZED_ACCESS if the user is not authenticated. The exception is automatically converted to an HTTP response with the WWW-Authenticate header in the response. The WWW-Authenticate challenges the authentication and triggers a web-native prompt to re-enter the credentials.

You may access the logged-in user instance using the auth.user property. Since, you are using the auth middleware, the auth.user property will always be available.

If you do not like using the non-null assertion operator on the auth.user property, you may use the auth.getUserOrFail method. This method will return the user object or throw E_UNAUTHORIZED_ACCESS exception.

**Examples:**

Example 1 (typescript):
```typescript
import { defineConfig } from '@adonisjs/auth'
import { basicAuthGuard, basicAuthUserProvider } from '@adonisjs/auth/basic_auth'

const authConfig = defineConfig({
  default: 'basicAuth',
  guards: {
    basicAuth: basicAuthGuard({
      provider: basicAuthUserProvider({
        model: () => import('#models/user'),
      }),
    })
  },
})

export default authConfig
```

Example 2 (typescript):
```typescript
import { DateTime } from 'luxon'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column()
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
```

Example 3 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

export const middleware = router.named({
  auth: () => import('#middleware/auth_middleware')
})
```

Example 4 (typescript):
```typescript
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .get('dashboard', ({ auth }) => {
    return auth.user
  })
  .use(middleware.auth({
    guards: ['basicAuth']
  }))
```

---

## Authentication

**URL:** https://docs.adonisjs.com/guides/authentication

**Contents:**
- Authentication
- Features not supported by the Auth package
- Choosing an auth guard
  - Session
  - Access tokens
  - Basic auth
- Choosing a user provider
- Installation
- The Initialize auth middleware
- Creating the users table

AdonisJS ships with a robust and secure authentication system you can use to log in and authenticate users of your application. Be it a server-rendered application, a SPA client, or a mobile app, you can set up authentication for all of them.

The authentication package is built around guards and providers.

Guards are end-to-end implementations of a specific login type. For example, the session guard allows you to authenticate users using cookies and session. Meanwhile, the access_tokens guard will enable you to authenticate clients using tokens.

Providers are used to look up users and tokens from a database. You can either use the inbuilt providers or implement your own.

To ensure the security of your applications, we properly hash user passwords and tokens. Moreover, the security primitives of AdonisJS are protected from timing attacks and session fixation attacks.

The auth package narrowly focuses on authenticating HTTP requests, and the following features are outside its scope.

The following inbuilt authentication guards provide you with the most straightforward workflow for authenticating users without compromising the security of your applications. Also, you can build your authentication guards for custom requirements.

The session guard uses the @adonisjs/session package to track the logged-in user state inside the session store.

Sessions and cookies have been on the internet for a long time and work great for most applications. We recommend using the session guard:

Access tokens are cryptographically secure random tokens (also known as Opaque access tokens) issued to users after successful login. You may use access tokens for apps where your AdonisJS server cannot write/read cookies. For example:

When using access tokens, it becomes the responsibility of your client-side application to store them securely. Access tokens provide unrestricted access to your application (on behalf of a user), and leaking them can lead to security issues.

The basic auth guard is an implementation of the HTTP authentication framework, in which the client must pass the user credentials as a base64 encoded string via the Authorization header.

There are better ways to implement a secure login system than basic authentication. However, you may use it temporarily while your application is in active development.

As covered earlier in this guide, a user provider is responsible for finding users during the authentication process.

The user providers are guards specific; for example, The user provider for the session guard is responsible for finding users by their ID, and the user provider for the access tokens guard is also responsible for verifying access tokens.

We ship with a Lucid user provider for the inbuilt guards, which uses Lucid models to find users, generate tokens, and verify tokens.

The auth system comes pre-configured with the web and the api starter kits. However, you can install and configure it manually inside an application as follows.

Install the @adonisjs/auth package using the detected package manager.

Registers the following service provider inside the adonisrc.ts file.

Creates and registers the following middleware inside the start/kernel.ts file.

Creates the user model inside the app/models directory.

Creates database migration for the users table.

Creates database migrations for the selected guard.

During setup, we register the @adonisjs/auth/initialize_auth_middleware within your application. The middleware is responsible for creating an instance of the Authenticator class and shares it via the ctx.auth property with the rest of the request.

Note that the initialize auth middleware does not authenticate the request or protect the routes. It's used only for initializing the authenticator and sharing it with the rest of the request. You must use the auth middleware for protecting routes.

Also, the same authenticator instance is shared with Edge templates (if your app is using Edge), and you can access it using the auth property. For example:

The configure command creates a database migration for the users table inside the database/migrations directory. Feel free to open this file and make changes per your application requirements.

By default, the following columns are created.

Also, update the User model if you define, rename, or remove columns from the users table.

Verifying user credentials

**Examples:**

Example 1 (markdown):
```markdown
# Configure with session guard (default)
node ace add @adonisjs/auth --guard=session

# Configure with access tokens guard
node ace add @adonisjs/auth --guard=access_tokens

# Configure with basic auth guard
node ace add @adonisjs/auth --guard=basic_auth
```

Example 2 (typescript):
```typescript
{
  providers: [
    // ...other providers
    () => import('@adonisjs/auth/auth_provider')
  ]
}
```

Example 3 (typescript):
```typescript
router.use([
  () => import('@adonisjs/auth/initialize_auth_middleware')
])
```

Example 4 (typescript):
```typescript
router.named({
  auth: () => import('#middleware/auth_middleware'),
  // only if using the session guard
  guest: () => import('#middleware/guest_middleware')
})
```

---

## Access tokens guard

**URL:** https://docs.adonisjs.com/guides/authentication/access-tokens-guard

**Contents:**
- Access tokens guard
- Configuring the user model
- Creating the access tokens database table
- Issuing tokens
  - Defining abilities
  - Token abilities vs. Bouncer abilities
  - Expiring tokens
  - Naming tokens
- Configuring the guard
- Authenticating requests

Access tokens authenticate HTTP requests in API contexts where the server cannot persist cookies on the end-user device, for example, third-party access to an API or authentication for a mobile app.

Access tokens can be generated in any format; for instance, the tokens that conform to the JWT standard are known as JWT access tokens, and tokens in a proprietary format are known as opaque access tokens.

AdonisJS uses opaque access tokens that are structured and stored as follows.

Before using the access tokens guard, you must set up a tokens provider with the User model. The tokens provider is used to create, list, and verify access tokens.

The auth package comes with a database tokens provider, which persists tokens inside an SQL database. You can configure it as follows.

The DbAccessTokensProvider.forModel accepts the User model as the first argument and an options object as the second argument.

The duration after which the token will expire. You can pass a numeric value in seconds or a time expression as a string.

By default, tokens are long-lived and do not expire. Also, you can specify the expiry of a token at the time it is generated.

The prefix for the publicly shared token value. Defining a prefix helps secret scanning tools identify a token and prevent it from leaking inside the codebases.

Changing the prefix after issuing tokens will make them invalid. Therefore, choose the prefix carefully and do not change them often.

The database table name for storing the access tokens. Defaults to auth_access_tokens.

A unique type to identify a bucket of tokens. If you issue multiple types of tokens within a single application, you must define a unique type for all of them.

Defaults to auth_token.

The length (in characters) of the random token value. Defaults to 40.

Once you have configured a token provider, you can start issuing tokens on behalf of a user. You do not have to set up an authentication guard for issuing tokens. The guard is needed to verify tokens.

We create the migration file for the auth_access_tokens table during the initial setup. The migration file is stored inside the database/migrations directory.

You may create the database table by executing the migration:run command.

However, if you are configuring the auth package manually for some reason, you can create a migration file manually and copy-paste the following code snippet inside it.

Depending upon your application, you might issue a token during login or after login from the application dashboard. In either case, issuing a token requires a user object (for whom the token will be generated), and you can generate them directly using the User model.

If you are using access tokens as the primary way to log users in/out, you might prefer to create/invalidate tokens directly through the auth guard, see Logging in and out.

In the following example, we find a user by id and issue them an access token using the User.accessTokens.create method. Of course, in a real-world application, you will have this endpoint guarded by authentication, but let's keep it simple for now.

The .create method accepts an instance of the User model and returns an instance of the AccessToken class.

The token.value property contains the value (wrapped as a Secret) that must be shared with the user. The value is only available when generating the token, and the user will not be able to see it again.

You can also return the token directly in response, which will be serialized to the following JSON object.

Depending upon the application you are building, you might want to limit access tokens to only perform specific tasks. For example, issue a token that allows reading and listing projects without creating or deleting them.

In the following example, we define an array of abilities as the second parameter. The abilities are serialized to a JSON string and persisted inside the database.

For the auth package, the abilities have no real meaning. It is up to your application to check for token abilities before performing a given action.

You should not confuse token abilities with bouncer authorization checks. Let's try to understand the difference with a practical example.

Let's say you define a bouncer ability that allows admin users to create new projects.

The same admin user creates a token for themselves, but to prevent token abuse, they limit the token abilities to read projects.

Now, within your application, you will have to implement access control, which allows the admin users to create new projects while disallowing the token from creating new projects.

You can write a bouncer ability for this use case as follows.

The user.currentAccessToken refers to the access token used for authentication during the current HTTP request. You can learn more about it inside the authenticating requests section.

By default, the tokens are long-lived, and they never expire. However, you define the expiration at the time of configuring the tokens provider or when generating a token.

The expiry can be defined as a numeric value representing seconds or a string-based time expression.

By default, the tokens are not named. However, you can assign them a name when generating the token. For example, if you allow the users of your application to self-generate tokens, you may ask them also to specify a recognizable name.

Now that we can issue tokens, let's configure an authentication guard to verify requests and authenticate users. The guard must be configured inside the config/auth.ts file under the guards object.

The tokensGuard method creates an instance of the AccessTokensGuard class. It accepts a user provider that can be used for verifying tokens and finding users.

The tokensUserProvider method accepts the following options and returns an instance of the AccessTokensLucidUserProvider class.

Once the guard has been configured, you can start authenticating requests using the auth middleware or manually calling the auth.authenticate method.

The auth.authenticate method returns an instance of the User model for the authenticated user, or it throws an E_UNAUTHORIZED_ACCESS exception when unable to authenticate the request.

Instead of manually calling the authenticate method. You can use the auth middleware to authenticate the request or throw an exception.

The auth middleware accepts an array of guards to use for authenticating the request. The authentication process stops after one of the mentioned guards authenticates the request.

You can check if a request has been authenticated using the auth.isAuthenticated flag. The value of auth.user will always be defined for an authenticated request.

If you do not like using the non-null assertion operator on the auth.user property, you may use the auth.getUserOrFail method. This method will return the user object or throw E_UNAUTHORIZED_ACCESS exception.

The access token guard defines the currentAccessToken property on the user object after successfully authenticating the request. The currentAccessToken property is an instance of the AccessToken class.

You may use the currentAccessToken object to get the token's abilities or check the expiration of the token. Also, during authentication, the guard will update the last_used_at column to reflect the current timestamp.

If you reference the User model with currentAccessToken as a type in the rest of the codebase, you may want to declare this property on the model itself.

Instead of merging currentAccessToken

Declare it as a property on the model

You may use the tokens provider to get a list of all the tokens using the accessTokens.all method. The return value will be an array of AccessToken class instances.

The all method also returns expired tokens. You may want to filter them before rendering the list or display a "Token expired" message next to the token. For example

You may delete a token using the accessTokens.delete method. The method accepts the user as the first parameter and the token id as the second parameter.

Please check the events reference guide to view the list of available events emitted by the access tokens guard.

Access tokens are sometimes the preferred method for signing users in and out - for instance when authenticating a native app.

To accommodate those situations the access tokens guard provides an API similar to the login and logout methods of the session guard.

Logging out (the currently authenticated token):

Assuming that an access tokens guards, api, is already in place (e.g. you've set up: user model, access tokens, and auth guard), a session controller can be implemented in the following way:

Use content negotiation to get appropriate responses when User.verifyCredentials fails (and throws E_INVALID_CREDENTIALS).

In the above example's case, the client should include an Accept=application/json header in post requests to /session. This ensures that failures will result in json formatted responses rather than redirects.

If you are using access tokens to sign in from an external source, like a mobile app, you might want to disable CSRF protection. You can either disable CSRF protection globally (if your app is solely used as an API), or add exceptions for API routes (including the /session route). See shield config reference

**Examples:**

Example 1 (typescript):
```typescript
import { BaseModel } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

export default class User extends BaseModel {
  // ...rest of the model properties

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
```

Example 2 (typescript):
```typescript
export default class User extends BaseModel {
  // ...rest of the model properties

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })
}
```

Example 3 (unknown):
```unknown
node ace migration:run
```

Example 4 (unknown):
```unknown
node ace make:migration auth_access_tokens
```

---

## Authorization

**URL:** https://docs.adonisjs.com/guides/security

**Contents:**
- Authorization
- Installation
- The Initialize bouncer middleware
- Defining abilities
  - Performing authorization
  - Allowing guest users
  - Authorizing users other than the logged-in user
- Defining policies
  - Performing authorization
  - Allowing guest users

You can write authorization checks in your AdonisJS application using the @adonisjs/bouncer package. Bouncer provides a JavaScript first API for writing authorization checks as abilities and policies.

The goal of abilities and policies is to abstract the logic of authorizing an action to a single place and reuse it across the rest of the codebase.

Abilities are defined as functions and can be a great fit if your application has fewer and simpler authorization checks.

Policies are defined as classes, and you must create one policy for every resource in your application. Policies can also benefit from automatic dependency injection.

Bouncer is not an implementation of RBAC or ACL. Instead, it provides a low-level API with fine-grained control to authorize actions in your AdonisJS applications.

Install and configure the package using the following command:

Installs the @adonisjs/bouncer package using the detected package manager.

Registers the following service provider and command inside the adonisrc.ts file.

Creates the app/abilities/main.ts file to define and export abilities.

Creates the app/policies/main.ts file to export all policies as a collection.

Creates initialize_bouncer_middleware inside the middleware directory.

Register the following middleware inside the start/kernel.ts file.

Are you more of a visual learner? - Checkout the AdonisJS Bouncer free screencasts series from our friends at Adocasts.

During setup, we create and register the #middleware/initialize_bouncer_middleware middleware within your application. The initialize middleware is responsible for creating an instance of the Bouncer class for the currently authenticated user and shares it via the ctx.bouncer property with the rest of the request.

Also, we share the same Bouncer instance with Edge templates using the ctx.view.share method. Feel free to remove the following lines of code from the middleware if you are not using Edge inside your application.

You own your application's source code, including the files created during the initial setup. So, do not hesitate to change them and make them work with your application environment.

Abilities are JavaScript functions usually written inside the ./app/abilities/main.ts file. You may export multiple abilities from this file.

In the following example, we define an ability called editPost using the Bouncer.ability method. The implementation callback must return true to authorize the user and return false to deny access.

An ability should always accept the User as the first parameter, followed by additional parameters needed for the authorization check.

Once you have defined an ability, you may perform an authorization check using the ctx.bouncer.allows method.

Bouncer will automatically pass the currently logged-in user to the ability callback as the first parameter, and you must supply the rest of the parameters manually.

The opposite of bouncer.allows method is the bouncer.denies method. You may prefer this method instead of writing an if not statement.

By default, Bouncer denies authorization checks for non-logged-in users without invoking the ability callback.

However, you may want to define certain abilities that can work with a guest user. For example, allow guests to view published posts but allow the creator of the post to view drafts as well.

You may define an ability that allows guest users using the allowGuest option. In this case, the options will be defined as the first parameter, and callback will be the second parameter.

If you want to authorize a user other than the logged-in user, you may use the Bouncer constructor to create a new bouncer instance for a given user.

Policies offer an abstraction layer to organize the authorization checks as classes. It is recommended to create one policy per resource. For example, if your application has a Post model, you must create a PostPolicy class to authorize actions such as creating or updating posts.

The policies are stored inside the ./app/policies directory, and each file represents a single policy. You may create a new policy by running the following command.

See also: Make policy command

The policy class extends the BasePolicy class, and you may implement methods for the authorization checks you want to perform. In the following example, we define authorization checks to create, edit, and delete a post.

Once you have created a policy, you may use the bouncer.with method to specify the policy you want to use for authorization and then chain the bouncer.allows or bouncer.denies methods to perform the authorization check.

The allows and denies methods chained after the bouncer.with methods are type-safe and will show a list of completions based on the methods you have defined on the policy class.

Similar to abilities, policies can also define authorization checks for guest users using the @allowGuest decorator. For example:

You may define the before and the after template methods on a policy class to run actions around an authorization check. A common use case is always allowing or denying access to a certain user.

The before and the after methods are always invoked, regardless of a logged-in user. So make sure to handle the case where the value of user will be null.

The response from the before is interpreted as follows.

The after method receives the raw response from the action method and can override the previous response by returning a new value. The response from the after is interpreted as follows.

The policy classes are created using the IoC container; therefore, you can type-hint and inject dependencies inside the policy constructor using the @inject decorator.

If a Policy class is created during an HTTP request, you may also inject an instance of HttpContext inside it.

Alongside the allows and the denies methods, you may use the bouncer.authorize method to perform the authorization check. This method will throw the AuthorizationException when the check fails.

AdonisJS will convert the AuthorizationException to a 403 - Forbidden HTTP response using the following content negotiation rules.

HTTP requests with the Accept=application/json header will receive an array of error messages. Each array element will be an object with the message property.

HTTP requests with Accept=application/vnd.api+json header will receive an array of error messages formatted as per the JSON API spec.

All other requests will receive a plain text response message. However, you may use status pages to show a custom error page for authorization errors.

You may also self-handle AuthorizationException errors within the global exception handler.

Instead of returning a boolean value from abilities and policies, you may construct an error response using the AuthorizationResponse class.

The AuthorizationResponse class gives you fine grained control to define a custom HTTP status code and the error message.

If you are using the @adonisjs/i18n package, you may return a localized response using the .t method. The translation message will be used over the default message during an HTTP request based on the user's language.

The flexibility to define custom error messages for individual authorization checks is great. However, if you always want to return the same response, it might be cumbersome to repeat the same code every time.

Therefore, you can override the default response builder for Bouncer as follows.

So far, in this guide, we explicitly import an ability or a policy whenever we want to use it. However, once you pre-register them, you can reference an ability or a policy by its name as a string.

Pre-registering abilities and policies might be less useful within your TypeScript codebase than just cleaning up the imports. However, they offer far better DX within Edge templates.

Look at the following code examples of Edge templates with and without pre-registering a policy.

Without pre-registering. No, not super clean

If you open the initialize_bouncer_middleware.ts file, you will find us already importing and pre-registering abilities and policies when creating the Bouncer instance.

If you decide to define abilities in other parts of your codebase, then make sure to import and pre-register them inside the middleware.

In the case of policies, every time you run the make:policy command, make sure to accept the prompt to register the policy inside the policies collection. The policies collection is defined inside the ./app/policies/main.ts file.

In the following example, we get rid of the imports and reference abilities and policies by their name. Do note the string-based API is also type-safe, but your code editor's "Go to Definition" feature may not work.

Before you can perform authorization checks inside Edge templates, make sure to pre-register abilities and policies. Once done, you may use the @can and @cannot tags to perform the authorization checks.

These tags accept the ability name or the policy.method name as the first parameter, followed by the rest of the parameters accepted by the ability or a policy.

Please check the events reference guide to view the list of events dispatched by the @adonisjs/bouncer package.

Social authentication

**Examples:**

Example 1 (python):
```python
node ace add @adonisjs/bouncer
```

Example 2 (typescript):
```typescript
{
  commands: [
    // ...other commands
    () => import('@adonisjs/bouncer/commands')
  ],
  providers: [
    // ...other providers
    () => import('@adonisjs/bouncer/bouncer_provider')
  ]
}
```

Example 3 (typescript):
```typescript
router.use([
  () => import('#middleware/initialize_bouncer_middleware')
])
```

Example 4 (typescript):
```typescript
async handle(ctx: HttpContext, next: NextFn) {
  ctx.bouncer = new Bouncer(
    () => ctx.auth.user || null,
    abilities,
    policies
  ).setContainerResolver(ctx.containerResolver)

  /**
   * Remove if not using Edge
   */
  if ('view' in ctx) {
    ctx.view.share(ctx.bouncer.edgeHelpers)
  }

  return next()
}
```

---

## Authentication

**URL:** https://docs.adonisjs.com/guides/authentication/introduction

**Contents:**
- Authentication
- Features not supported by the Auth package
- Choosing an auth guard
  - Session
  - Access tokens
  - Basic auth
- Choosing a user provider
- Installation
- The Initialize auth middleware
- Creating the users table

AdonisJS ships with a robust and secure authentication system you can use to log in and authenticate users of your application. Be it a server-rendered application, a SPA client, or a mobile app, you can set up authentication for all of them.

The authentication package is built around guards and providers.

Guards are end-to-end implementations of a specific login type. For example, the session guard allows you to authenticate users using cookies and session. Meanwhile, the access_tokens guard will enable you to authenticate clients using tokens.

Providers are used to look up users and tokens from a database. You can either use the inbuilt providers or implement your own.

To ensure the security of your applications, we properly hash user passwords and tokens. Moreover, the security primitives of AdonisJS are protected from timing attacks and session fixation attacks.

The auth package narrowly focuses on authenticating HTTP requests, and the following features are outside its scope.

The following inbuilt authentication guards provide you with the most straightforward workflow for authenticating users without compromising the security of your applications. Also, you can build your authentication guards for custom requirements.

The session guard uses the @adonisjs/session package to track the logged-in user state inside the session store.

Sessions and cookies have been on the internet for a long time and work great for most applications. We recommend using the session guard:

Access tokens are cryptographically secure random tokens (also known as Opaque access tokens) issued to users after successful login. You may use access tokens for apps where your AdonisJS server cannot write/read cookies. For example:

When using access tokens, it becomes the responsibility of your client-side application to store them securely. Access tokens provide unrestricted access to your application (on behalf of a user), and leaking them can lead to security issues.

The basic auth guard is an implementation of the HTTP authentication framework, in which the client must pass the user credentials as a base64 encoded string via the Authorization header.

There are better ways to implement a secure login system than basic authentication. However, you may use it temporarily while your application is in active development.

As covered earlier in this guide, a user provider is responsible for finding users during the authentication process.

The user providers are guards specific; for example, The user provider for the session guard is responsible for finding users by their ID, and the user provider for the access tokens guard is also responsible for verifying access tokens.

We ship with a Lucid user provider for the inbuilt guards, which uses Lucid models to find users, generate tokens, and verify tokens.

The auth system comes pre-configured with the web and the api starter kits. However, you can install and configure it manually inside an application as follows.

Install the @adonisjs/auth package using the detected package manager.

Registers the following service provider inside the adonisrc.ts file.

Creates and registers the following middleware inside the start/kernel.ts file.

Creates the user model inside the app/models directory.

Creates database migration for the users table.

Creates database migrations for the selected guard.

During setup, we register the @adonisjs/auth/initialize_auth_middleware within your application. The middleware is responsible for creating an instance of the Authenticator class and shares it via the ctx.auth property with the rest of the request.

Note that the initialize auth middleware does not authenticate the request or protect the routes. It's used only for initializing the authenticator and sharing it with the rest of the request. You must use the auth middleware for protecting routes.

Also, the same authenticator instance is shared with Edge templates (if your app is using Edge), and you can access it using the auth property. For example:

The configure command creates a database migration for the users table inside the database/migrations directory. Feel free to open this file and make changes per your application requirements.

By default, the following columns are created.

Also, update the User model if you define, rename, or remove columns from the users table.

Verifying user credentials

**Examples:**

Example 1 (markdown):
```markdown
# Configure with session guard (default)
node ace add @adonisjs/auth --guard=session

# Configure with access tokens guard
node ace add @adonisjs/auth --guard=access_tokens

# Configure with basic auth guard
node ace add @adonisjs/auth --guard=basic_auth
```

Example 2 (typescript):
```typescript
{
  providers: [
    // ...other providers
    () => import('@adonisjs/auth/auth_provider')
  ]
}
```

Example 3 (typescript):
```typescript
router.use([
  () => import('@adonisjs/auth/initialize_auth_middleware')
])
```

Example 4 (typescript):
```typescript
router.named({
  auth: () => import('#middleware/auth_middleware'),
  // only if using the session guard
  guest: () => import('#middleware/guest_middleware')
})
```

---

## Verifying user credentials

**URL:** https://docs.adonisjs.com/guides/authentication/verifying-user-credentials

**Contents:**
- Verifying user credentials
- Basic example
- Using the Auth finder mixin
  - Verifying credentials
  - Handling exceptions
- Hashing user password

In an AdonisJS application, verifying user credentials is decoupled from the authentication layer. This ensures you can continue using the auth guards without limiting the options to verify the user credentials.

By default, we provide secure APIs to find users and verify their passwords. However, you can also implement additional ways to verify a user, like sending an OTP to their phone number or using 2FA.

In this guide, we will cover the process of finding a user by a UID and verifying their password before marking them as logged in.

You can use the User model directly to find a user and verify their password. In the following example, we find a user by email and use the hash service to verify the password hash.

Issues with the above approach

The code we have written in the above example is prone to timing attacks. In the case of authentication, an attacker can observe the application response time to find whether the email or the password is incorrect in their provided credentials. We recommend you use the AuthFinder mixin to prevent timing attacks and have a better developer experience.

As per the above implementation:

The request will take less time if the user's email is incorrect. This is because we do not verify the password hash when we cannot find a user.

The request will take longer if the email exists and the password is incorrect. This is because password hashing algorithms are slow in nature.

The difference in response time is enough for an attacker to find a valid email address and try different password combinations.

To prevent the timing attacks, we recommend you use the AuthFinder mixin on the User model.

The Auth finder mixin adds findForAuth and verifyCredentials methods to the applied model. The verifyCredentials method offers a timing attack safe API for finding a user and verifying their password.

You can import and apply the mixin on a model as follows.

The withAuthFinder method accepts a callback that returns a hasher as the first argument. We use the scrypt hasher in the above example. However, you can replace it with a different hasher.

Next, it accepts a configuration object with the following properties.

Finally, you can use the return value of the withAuthFinder method as a mixin on the User model.

Once you have applied the Auth finder mixin, you can replace all the code from the SessionController.store method with the following code snippet.

In case of invalid credentials, the verifyCredentials method will throw E_INVALID_CREDENTIALS exception.

The exception is self-handled and will be converted to a response using the following content negotiation rules.

HTTP requests with the Accept=application/json header will receive an array of error messages. Each array element will be an object with the message property.

HTTP requests with the Accept=application/vnd.api+json header will receive an array of error messages formatted per the JSON API spec.

If you use sessions, the user will be redirected to the form and receive the errors via session flash messages.

All other requests will receive errors back as plain text.

However, if needed, you can handle the exception inside the global exception handler as follows.

The AuthFinder mixin registers a beforeSave hook to automatically hash the user passwords during INSERT and UPDATE calls. Therefore, you do not have to manually perform password hashing in your models.

**Examples:**

Example 1 (typescript):
```typescript
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async store({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    /**
     * Find a user by email. Return error if a user does
     * not exists
     */
    const user = await User.findBy('email', email)

    if (!user) {
      return response.abort('Invalid credentials')
    }

    /**
     * Verify the password using the hash service
     */
    const isPasswordValid = await hash.verify(user.password, password)

    if (!isPasswordValid) {
      return response.abort('Invalid credentials')
    }

    /**
     * Now login the user or create a token for them
     */
    // ...
  }
}
```

Example 2 (typescript):
```typescript
import { DateTime } from 'luxon'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column()
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
```

Example 3 (typescript):
```typescript
import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class SessionController {
  async store({ request, response }: HttpContext) {
  async store({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    /**
     * Find a user by email. Return error if a user does
     * not exists
     */ 
    const user = await User.findBy('email', email)
    if (!user) {
      response.abort('Invalid credentials')
    }

    /**
     * Verify the password using the hash service
     */
    await hash.verify(user.password, password)
    const user = await User.verifyCredentials(email, password)

    /**
     * Now login the user or create a token for them
     */
  }
}
```

Example 4 (typescript):
```typescript
import { errors } from '@adonisjs/auth'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction
  protected renderStatusPages = app.inProduction

  async handle(error: unknown, ctx: HttpContext) {
    if (error instanceof errors.E_INVALID_CREDENTIALS) {
      return ctx
        .response
        .status(error.status)
        .send(error.getResponseMessage(error, ctx))
    }

    return super.handle(error, ctx)
  }
}
```

---

## Creating a custom auth guard

**URL:** https://docs.adonisjs.com/guides/authentication/custom-auth-guard

**Contents:**
- Creating a custom auth guard
- Creating the UserProvider interface
  - Understanding the JwtGuardUser type
- Implementing the guard
- Accepting a user provider
- Generating a token
- Authenticating a request
- Implementing the check method
- Implementing the getUserOrFail method
- Implementing the authenticateAsClient method

The auth package enables you to create custom authentication guards for use cases not served by the built-in guards. In this guide, we will create a guard for using JWT tokens for authentication.

The authentication guard revolves around the following concepts.

User Provider: Guards must be user agnostic. They should not hardcode the functions to query and find users from the database. Instead, a guard should rely on a User Provider and accept its implementation as a constructor dependency.

Guard implementation: The guard implementation must adhere to the GuardContract interface. This interface describes the APIs needed to integrate the guard with the rest of the Auth layer.

A guard is responsible for defining the UserProvider interface and the methods/properties it should contain. For example, the UserProvider accepted by the Session guard is far simpler than the UserProvider accepted by the Access tokens guard.

So, there is no need to create User Providers that satisfy every guard implementation. Each guard can dictate the requirements for the User provider they accept.

For this example, we need a provider to look up users inside the database using the user ID. We do not care which database is used or how the query is performed. That's the responsibility of the developer implementing the User provider.

All the code we will write in this guide can initially live inside a single file stored within the app/auth/guards directory.

In the above example, the JwtUserProviderContract interface accepts a generic user property named RealUser. Since this interface does not know what the actual user (the one we fetch from the database) looks like, it accepts it as a generic. For example:

An implementation using Lucid models will return an instance of the Model. Hence, the value of RealUser will be that instance.

An implementation using Prisma will return a user object with specific properties; therefore, the value of RealUser will be that object.

To summarize, the JwtUserProviderContract leaves it to the User Provider implementation to decide the User's data type.

The JwtGuardUser type acts as a bridge between the User provider and the guard. The guard uses the getId method to get the user's unique ID and the getOriginal method to get the user's object after authenticating the request.

Let's create the JwtGuard class and define the methods/properties needed by the GuardContract interface. Initially, we will have many errors in this file, but that's okay; as we progress, all the errors will disappear.

Please take some time and read the comments next to every property/method in the following example.

A guard must accept a user provider to look up users during authentication. You can accept it as a constructor parameter and store a private reference.

Let's implement the generate method and create a token for a given user. We will install and use the jsonwebtoken package from npm to generate a token.

Also, we will have to use a secret key to sign a token, so let's update the constructor method and accept the secret key as an option via the options object.

First, we use the userProvider.createUserForGuard method to create an instance of the provider user (aka the bridge between the real user and the guard).

Next, we use the jwt.sign method to create a signed token with the userId in the payload and return it.

Authenticating a request includes:

Our guard will need access to the HttpContext to read request headers and cookies, so let's update the class constructor and accept it as an argument.

We will read the token from the authorization header for this example. However, you can adjust the implementation to support cookies as well.

The check method is a silent version of the authenticate method, and you can implement it as follows.

Finally, let's implement the getUserOrFail method. It should return the user instance or throw an error (if the user does not exist).

The authenticateAsClient method is used during tests when you want to login a user during tests via the loginAs method. For the JWT implementation, this method should return the authorization header containing the JWT token.

Let's head over to the config/auth.ts and register the guard within the guards list.

As you can notice, we are using the sessionUserProvider with our JwtGuard implementation. This is because the JwtUserProviderContract interface is compatible with the User Provider created by the Session guard.

So, instead of creating our own implementation of a User Provider, we re-use one from the Session guard.

Once the implementation is completed, you can use the jwt guard like other inbuilt guards. The following is an example of how to generate and verify JWT tokens.

Social authentication

**Examples:**

Example 1 (typescript):
```typescript
import { symbols } from '@adonisjs/auth'

/**
 * The bridge between the User provider and the
 * Guard
 */
export type JwtGuardUser<RealUser> = {
  /**
   * Returns the unique ID of the user
   */
  getId(): string | number | BigInt

  /**
   * Returns the original user object
   */
  getOriginal(): RealUser
}

/**
 * The interface for the UserProvider accepted by the
 * JWT guard.
 */
export interface JwtUserProviderContract<RealUser> {
  /**
   * A property the guard implementation can use to infer
   * the data type of the actual user (aka RealUser)
   */
  [symbols.PROVIDER_REAL_USER]: RealUser

  /**
   * Create a user object that acts as an adapter between
   * the guard and real user value.
   */
  createUserForGuard(user: RealUser): Promise<JwtGuardUser<RealUser>>

  /**
   * Find a user by their id.
   */
  findById(identifier: string | number | BigInt): Promise<JwtGuardUser<RealUser> | null>
}
```

Example 2 (typescript):
```typescript
import { symbols } from '@adonisjs/auth'
import { AuthClientResponse, GuardContract } from '@adonisjs/auth/types'

export class JwtGuard<UserProvider extends JwtUserProviderContract<unknown>>
  implements GuardContract<UserProvider[typeof symbols.PROVIDER_REAL_USER]>
{
  /**
   * A list of events and their types emitted by
   * the guard.
   */
  declare [symbols.GUARD_KNOWN_EVENTS]: {}

  /**
   * A unique name for the guard driver
   */
  driverName: 'jwt' = 'jwt'

  /**
   * A flag to know if the authentication was an attempt
   * during the current HTTP request
   */
  authenticationAttempted: boolean = false

  /**
   * A boolean to know if the current request has
   * been authenticated
   */
  isAuthenticated: boolean = false

  /**
   * Reference to the currently authenticated user
   */
  user?: UserProvider[typeof symbols.PROVIDER_REAL_USER]

  /**
   * Generate a JWT token for a given user.
   */
  async generate(user: UserProvider[typeof symbols.PROVIDER_REAL_USER]) {
  }

  /**
   * Authenticate the current HTTP request and return
   * the user instance if there is a valid JWT token
   * or throw an exception
   */
  async authenticate(): Promise<UserProvider[typeof symbols.PROVIDER_REAL_USER]> {
  }

  /**
   * Same as authenticate, but does not throw an exception
   */
  async check(): Promise<boolean> {
  }

  /**
   * Returns the authenticated user or throws an error
   */
  getUserOrFail(): UserProvider[typeof symbols.PROVIDER_REAL_USER] {
  }

  /**
   * This method is called by Japa during testing when "loginAs"
   * method is used to login the user.
   */
  async authenticateAsClient(
    user: UserProvider[typeof symbols.PROVIDER_REAL_USER]
  ): Promise<AuthClientResponse> {
  }
}
```

Example 3 (typescript):
```typescript
export class JwtGuard<UserProvider extends JwtUserProviderContract<unknown>>
  implements GuardContract<UserProvider[typeof symbols.PROVIDER_REAL_USER]>
{
  #userProvider: UserProvider

  constructor(
    userProvider: UserProvider
  ) {
    this.#userProvider = userProvider
  }
}
```

Example 4 (python):
```python
npm i jsonwebtoken @types/jsonwebtoken
```

---

## Session guard

**URL:** https://docs.adonisjs.com/guides/authentication/session-guard

**Contents:**
- Session guard
- Configuring the guard
- Performing login
- Protecting routes
  - Handling authentication exception
- Getting access to the logged-in user
  - Silent auth middleware
  - Check if the request is authenticated
  - Get authenticated user or fail
  - Access user within Edge templates

The session guard uses the @adonisjs/session package to login and authenticate users during an HTTP request.

Sessions and cookies have been on the internet for a long time and work great for most applications. Therefore, we recommend using the session guard for server-rendered applications or an SPA web client on the same top-level domain.

The authentication guards are defined inside the config/auth.ts file. You can configure multiple guards inside this file under the guards object.

The sessionGuard method creates an instance of the SessionGuard class. It accepts a user provider that can be used to find users during authentication and an optional config object to configure the remember tokens behavior.

The sessionUserProvider method creates an instance of the SessionLucidUserProvider class. It accepts a reference to the model to use for authentication.

You can login a user using the login method from your guard. The method accepts an instance of the User model and creates a login session for them.

In the following example:

We use the verifyCredentials from the AuthFinder mixin to find a user by email and password.

The auth.use('web') returns an instance of the SessionGuard configured inside the config/auth.ts file (web is the name of the guard defined in your configuration).

Next, we call the auth.use('web').login(user) method to create a login session for the user.

Finally, we redirect the user to the /dashboard endpoint. Feel free to customize the redirect endpoint.

You can protect routes from unauthenticated users using the auth middleware. The middleware is registered inside the start/kernel.ts file under the named middleware collection.

Apply the auth middleware to the routes you want to protect from unauthenticated users.

By default, the auth middleware will authenticate the user against the default guard (as defined in the config file). However, you can specify an array of guards when assigning the auth middleware.

In the following example, the auth middleware will attempt to authenticate the request using the web and the api guards.

The auth middleware throws the E_UNAUTHORIZED_ACCESS if the user is not authenticated. The exception is handled automatically using the following content-negotiation rules.

Request with Accept=application/json header will receive an array of errors with the message property.

Request with Accept=application/vnd.api+json header will receive an array of errors as per the JSON API spec.

The user will be redirected to the /login page for server-rendered applications. You can configure the redirect endpoint within the auth middleware class.

You may access the logged-in user instance using the auth.user property. The value is only available when using the auth or silent_auth middleware or if you call the auth.authenticate or auth.check methods manually.

The silent_auth middleware is similar to the auth middleware, but it does not throw an exception when the user is not authenticated. Instead, the request still continues as usual.

This middleware is useful when you want to always authenticate the user to perform some actions but do not want to block the request when the user is not authenticated.

If you plan to use this middleware, then you must register it inside the list of router middleware.

You can check if a request has been authenticated using the auth.isAuthenticated flag. The value of auth.user will always be defined for an authenticated request.

If you do not like using the non-null assertion operator on the auth.user property, you may use the auth.getUserOrFail method. This method will return the user object or throw E_UNAUTHORIZED_ACCESS exception.

The InitializeAuthMiddleware also shares the ctx.auth property with Edge templates. Therefore, you can access the currently logged-in user via the auth.user property.

If you want to fetch logged-in user information on a non-protected route, you can use the auth.check method to check if the user is logged-in and then access the auth.user property. A great use case for this is displaying the logged-in user information on the website header of a public page.

You can logout a user using the guard.logout method. During logout, the user state will be deleted from the session store. The currently active remember me token will also be deleted (if using remember me tokens).

The Remember Me feature automatically login user after their session expires. This is done by generating a cryptographically secure token and saving it as a cookie inside the user's browser.

After the user session has expired, AdonisJS will use the remember me cookie, verify the token's validity, and automatically re-create the logged-in session for the user.

The remember me tokens are saved inside the database, and therefore, you must create a new migration to create the remember_me_tokens table.

To read-write tokens, you will have to assign the DbRememberMeTokensProvider to the User model.

Finally, let's enable the useRememberTokens flag on the session guard config inside the config/auth.ts file.

Once the setup is completed, you can generate the remember me token and cookie using the guard.login method as follows.

The auth package ships with a guest middleware you can use to redirect the logged-in users from accessing the /login page. This should be done to avoid creating multiple sessions for a single user on a single device.

By default, the guest middleware will check the user logged-in status using the default guard (as defined in the config file). However, you can specify an array of guards when assigning the guest middleware.

Finally, you can configure the redirect route for the logged-in users inside the ./app/middleware/guest_middleware.ts file.

Please check the events reference guide to view the list of available events emitted by the Auth package.

Verifying user credentials

**Examples:**

Example 1 (typescript):
```typescript
import { defineConfig } from '@adonisjs/auth'
import { sessionGuard, sessionUserProvider } from '@adonisjs/auth/session'

const authConfig = defineConfig({
  default: 'web',
  guards: {
    web: sessionGuard({
      useRememberMeTokens: false,
      provider: sessionUserProvider({
        model: () => import('#models/user'),
      }),
    })
  },
})

export default authConfig
```

Example 2 (typescript):
```typescript
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async store({ request, auth, response }: HttpContext) {
    /**
     * Step 1: Get credentials from the request body
     */
    const { email, password } = request.only(['email', 'password'])

    /**
     * Step 2: Verify credentials
     */
    const user = await User.verifyCredentials(email, password)

    /**
     * Step 3: Login user
     */
    await auth.use('web').login(user)

    /**
     * Step 4: Send them to a protected route
     */
    response.redirect('/dashboard')
  }
}
```

Example 3 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

export const middleware = router.named({
  auth: () => import('#middleware/auth_middleware')
})
```

Example 4 (typescript):
```typescript
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
 .get('dashboard', () => {})
 .use(middleware.auth())
```

---
