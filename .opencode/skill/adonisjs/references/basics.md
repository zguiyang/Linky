# Adonisjs - Basics

**Pages:** 18

---

## Session

**URL:** https://docs.adonisjs.com/guides/basics/session

**Contents:**
- Session
- Installation
- Configuration
  - Stores configuration
    - Adding tagging support to an existing database
  - Updating environment variables validation
- Basic example
- Supported data types
- Reading and writing data
  - get

You can manage user sessions inside your AdonisJS application using the @adonisjs/session package. The session package provides a unified API for storing session data across different storage providers.

Following is the list of the bundled stores.

cookie: The session data is stored inside an encrypted cookie. The cookie store works great with multi-server deployments since the data is stored with the client.

file: The session data is saved inside a file on the server. The file store can only scale to multi-server deployments if you implement sticky sessions with the load balancer.

redis: The session data is stored inside a Redis database. The redis store is recommended for apps with large volumes of session data and can scale to multi-server deployments.

dynamodb: The session data is stored inside an Amazon DynamoDB table. The DynamoDB store is suitable for applications that require a highly scalable and distributed session store, especially when the infrastructure is built on AWS.

database: The session data is stored inside a SQL database using Lucid. The database store is a good option if you are already using a SQL database in your application and want to avoid adding an extra dependency like Redis.

memory: The session data is stored within a global memory store. The memory store is used during testing.

Alongside the inbuilt backend stores, you can also create and register custom session stores.

Install and configure the package using the following command :

Installs the @adonisjs/session package using the detected package manager.

Registers the following service provider and command inside the adonisrc.ts file.

Create the config/session.ts file.

Define the following environment variables and their validations.

Registers the following middleware inside the start/kernel.ts file.

The configuration for the session package is stored inside the config/session.ts file.

See also: Session config stub

Enable or disable the middleware temporarily without removing it from the middleware stack.

The cookie name is used to store the session ID. Feel free to rename it.

When set to true, the session ID cookie will be removed after the user closes the browser window. This cookie is technically known as session cookie.

The age property controls the validity of session data without user activity. After the given duration, the session data is considered expired.

Control session ID cookie attributes. See also cookie configuration.

Define the store you want to use to store the session data. It can be a fixed value or read from the environment variables.

The stores object is used to configure one or multiple backend stores.

Most applications will use a single store. However, you can configure multiple stores and switch between them based on the environment in which your application is running.

Following is the list of the backend stores bundled with the @adonisjs/session package.

The cookie store encrypts and stores the session data inside a cookie.

Define the configuration for the file store. The method accepts the location path for storing the session files.

Define the configuration for the redis store. The method accepts the connection name for storing the session data.

Make sure to first install and configure the @adonisjs/redis package before using the redis store.

Define the configuration for the dynamodb store. You may either pass the DynamoDB config via the clientConfig property or pass an instance of the DynamoDB as the client property.

Additionally, you may define a custom table name and key attribute name.

Define the configuration for the database store. The method optionally accepts the connectionName to use and the tableName for storing session data.

Make sure to first install and configure the @adonisjs/lucid package before using the database store.

You must also create the sessions table inside your database. You can use the following command to create the migration file.

Unlike Redis which handles expiration automatically, SQL databases require manual cleanup of expired sessions. The database store implements a probabilistic garbage collection: on each request, there is a gcProbability percent chance (default: 2%) that expired sessions will be deleted from the database.

Set gcProbability to 0 to disable automatic garbage collection entirely. In this case, you should set up a scheduled task to periodically clean up expired sessions.

If you have an existing sessions table and want to use session tagging, you need to add the user_id column. Create a new migration:

If you decide to use session stores other than the default one, make sure to also update the environment variables validation for the SESSION_DRIVER environment variable.

We configure the cookie, the redis, and the dynamodb stores in the following example. Therefore, we should also allow the SESSION_DRIVER environment variable to be one of them.

Once the session package has been registered, you can access the session property from the HTTP Context. The session property exposes the API for reading and writing data to the session store.

The session data is read from the session store at the start of the request and written back to the store at the end. Therefore, all changes are kept in memory until the request finishes.

The session data is serialized to a string using JSON.stringify; therefore, you can use the following JavaScript data types as session values.

The following is the list of methods you can use to interact with the data from the session object.

Returns the value of a key from the store. You can use dot notation to read nested values.

You can also define a default value as the second parameter. The default value will be returned if the key does not exist in the store.

Check if a key exists in the session store.

Returns all the data from the session store. The return value will always be an object.

Add a key-value pair to the session store. You can create objects with nested values using the dot notation.

Remove a key-value pair from the session store.

The pull method returns the value of a key and removes it from the store simultaneously.

The increment method increments the value of a key. A new key value is defined if it does not exist already.

The decrement method decrements the value of a key. A new key value is defined if it does not exist already.

The clear method removes everything from the session store.

AdonisJS creates an empty session store and assigns it to a unique session ID on the first HTTP request, even if the request/response lifecycle doesn't interact with sessions.

On every subsequent request, we update the maxAge property of the session ID cookie to ensure it doesn't expire. The session store is also notified about the changes (if any) to update and persist them.

You can access the unique session ID using the sessionId property. A visitor's session ID remains the same until it expires.

Re-generating session ID helps prevent a session fixation attack in your application. You must re-generate the session ID when associating an anonymous session with a logged-in user.

The @adonisjs/auth package automatically re-generates the session ID, so you do not have to do it manually.

Session tagging allows you to link a session to a user ID. This is useful for implementing features like:

Session tagging is only supported by the redis, database, and memory stores. Attempting to use tagging with cookie, file, or dynamodb stores will throw an error.

You can tag the current session with a user ID using the session.tag method. This is typically done after a user logs in.

The SessionCollection class provides APIs for programmatic session management outside of an HTTP request context. It allows you to read, destroy, and tag sessions by their ID.

You must obtain the SessionCollection instance through the container to ensure proper configuration injection.

Here is an example of listing all active sessions for a user in their account settings page.

Here is a complete example of implementing a "Logout from all other devices" feature.

Flash messages are used to pass data between two HTTP requests. They are commonly used to provide feedback to the user after a specific action. For example, showing the success message after the form submission or displaying the validation error messages.

In the following example, we define the routes for displaying the contact form and submitting the form details to the database. Post form submission, we redirect the user back to the form alongside a success notification using flash messages.

You can access the flash messages inside the edge templates using the flashMessage tag or the flashMessages property.

You can access the flash messages inside controllers using the session.flashMessages property.

The Session middleware automatically captures the validation exceptions and redirects the user back to the form. The validation errors and form input data are kept within flash messages, and you can access them inside Edge templates.

In the following example:

The following are the methods to write data to the flash messages store. The session.flash method accepts a key-value pair and writes it to the flash messages property inside the session store.

Instead of manually reading the request data and storing it in the flash messages, you can use one of the following methods to flash form data.

Finally, you can reflash the current flash messages using the session.reflash method.

The flash messages are only available in the subsequent request after the redirect. You can access them using the session.flashMessages property.

The same flashMessages property is also shared with Edge templates, and you can access it as follows.

See also: Edge helpers reference

Finally, you can access a specific flash message or a validation error using the following Edge tags.

Please check the events reference guide to view the list of events dispatched by the @adonisjs/session package.

Session stores must implement the SessionStoreContract interface and define the following methods.

In the above code example, we export the following values.

MongoDBConfig: TypeScript type for the configuration you want to accept.

MongoDBStore: The store's implementation as a class. It must adhere to the SessionStoreContract interface.

mongoDbStore: Finally, a factory function to create an instance of the store for every HTTP request.

Once the store has been created, you can reference it inside the config file using the mongoDbStore factory function.

The write method receives the session data as an object, and you might have to convert it to a string before saving it. You can use any serialization package for the same or the MessageBuilder helper provided by the AdonisJS helpers module. For inspiration, please consult the official session stores.

**Examples:**

Example 1 (python):
```python
node ace add @adonisjs/session
```

Example 2 (typescript):
```typescript
{
  commands: [
    // ...other commands
    () => import('@adonisjs/session/commands')
  ],
  providers: [
    // ...other providers
    () => import('@adonisjs/session/session_provider')
  ]
}
```

Example 3 (unknown):
```unknown
SESSION_DRIVER=cookie
```

Example 4 (typescript):
```typescript
router.use([
  () => import('@adonisjs/session/session_middleware')
])
```

---

## Controllers

**URL:** https://docs.adonisjs.com/guides/basics/controllers

**Contents:**
- Controllers
  - Using magic strings
- Single action controllers
- HTTP context
- Dependency injection
  - Method injection
  - Tree of dependencies
- Resource-driven controllers
  - Nested resources
  - Shallow resources

HTTP controllers offer an abstraction layer to organize the route handlers inside dedicated files. Instead of expressing all the request handling logic within the routes file, you move it to controller classes.

The controllers are stored within the ./app/controllers directory, representing each controller as a plain JavaScript class. You may create a new controller by running the following command.

See also: Make controller command

A newly created controller is scaffolded with the class declaration, and you may manually create methods inside it. For this example, let's create an index method and return an array of users.

Finally, let's bind this controller to a route. We will import the controller using the #controllers alias. The aliases are defined using subpath imports feature of Node.js.

As you might have noticed, we do not create an instance of the controller class and instead pass it directly to the route. Doing so allows AdonisJS to:

You can also notice that we are lazy-loading the controller using a function.

Lazy-loading controllers are needed when you are using HMR.

As your codebase grows, you will notice it starts impacting the boot time of your application. A common reason for that is importing all controllers inside the routes file.

Since controllers handle HTTP requests, they often import other modules like models, validators, or third-party packages. As a result, your routes file becomes this central point of importing the entire codebase.

Lazy-loading is as simple as moving the import statement behind a function and using dynamic imports.

You can use our ESLint plugin to enforce and automatically convert standard controller imports to lazy dynamic imports.

Another way of lazy loading the controllers is to reference the controller and its method as a string. We call it a magic string because the string itself has no meaning, and it's just the router uses it to look up the controller and imports it behind the scenes.

In the following example, we do not have any import statements within the routes file, and we bind the controller import path + method as a string to the route.

The only downside of magic strings is they are not type-safe. If you make a typo in the import path, your editor will not give you any feedback.

On the upside, magic strings can clean up all the visual clutter inside your routes file because of the import statements.

Using magic strings is subjective, and you can decide if you want to use them personally or as a team.

AdonisJS provides a way to define a single action controller. It's an effective way to wrap up functionality into clearly named classes. To accomplish this, you need to define a handle method inside the controller.

Then, you can reference the controller on the route with the following.

The controller methods receive an instance of the HttpContext class as the first argument.

The controller classes are instantiated using the IoC container; therefore, you can type-hint dependencies inside the controller constructor or a controller method.

Given you have a UserService class, you can inject an instance of it inside the controller as follows.

You can inject an instance of UserService directly inside the controller method using method injection. In this case, you must apply the @inject decorator on the method name.

The first parameter passed to the controller method is always the HttpContext. Therefore, you must type-hint the UserService as the second parameter.

Automatic resolution of dependencies is not only limited to the controller. Any class injected inside the controller can also type-hint dependencies, and the IoC container will construct the tree of dependencies for you.

For example, let's modify the UserService class to accept an instance of the HttpContext as a constructor dependency.

After this change, the UserService will automatically receive an instance of the HttpContext class. Also, no changes are required in the controller.

For conventional RESTful applications, a controller should only be designed to manage a single resource. A resource is usually an entity in your application like a User resource or a Post resource.

Let's take the example of a Post resource and define the endpoints to handle its CRUD operations. We will start by creating a controller first.

You may create a controller for a resource using the make:controller ace command. The --resource flag scaffolds the controller with the following methods.

Next, let's bind the PostsController to a resourceful route using the router.resource method. The method accepts the resource name as the first argument and the controller reference as the second argument.

Following is the list of routes registered by the resource method. You can view this list by running node ace list:routes command.

Nested resources can be created by specifying the parent and the child resource name separated using the dot . notation.

In the following example, we create routes for the comments resource nested under the posts resource.

When using nested resources, the routes for the child resource are always prefixed with the parent resource name and its id. For example:

The existence of /posts/:post_id in the second route is irrelevant, as you can look up the comment by its id.

A shallow resource registers its routes by keeping the URL structure flat (wherever possible). This time, let's register the posts.comments as a shallow resource.

The routes created using the router.resource method are named after the resource name and the controller action. First, we convert the resource name to snake case and concatenate the action name using the dot . separator.

You can rename the prefix for all the routes using the resource.as method. In the following example, we rename the group_attributes.index route name to attributes.index.

The prefix given to the resource.as method is transformed to snake_ case. If you want, you can turn off the transformation, as shown below.

When creating an API server, the forms to create and update a resource are rendered by a front-end client or a mobile app. Therefore, creating routes for these endpoints is redundant.

You can use the resource.apiOnly method to remove the create and the edit routes. As a result, only five routes will be created.

To register only specific routes, you may use the resource.only or the resource.except methods.

The resource.only method accepts an array of action names and removes all other routes except those mentioned. In the following example, only the routes for the index, store, and destroy actions will be registered.

The resource.except method is the opposite of the only method, registering all the routes except the mentioned one's.

The routes generated by the router.resource method use id for the param name. For example, GET /posts/:id to view a single post, and DELETE /post/:id to delete the post.

You can rename the param from id to something else using the resource.params method.

The above change will generate the following routes (showing partial list).

You can also rename params when using nested resources.

You may assign middleware to routes register by a resource using the resource.use method. The method accepts an array of action names and the middleware to assign to them. For example:

You may use the wildcard (*) keyword to assign a middleware to all the routes.

Finally, you may call the .use method multiple times to assign multiple middleware. For example:

**Examples:**

Example 1 (unknown):
```unknown
node ace make:controller users
```

Example 2 (typescript):
```typescript
export default class UsersController {
  index() {
    return [
      {
        id: 1,
        username: 'virk',
      },
      {
        id: 2,
        username: 'romain',
      },
    ]
  }
}
```

Example 3 (typescript):
```typescript
import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')

router.get('users', [UsersController, 'index'])
```

Example 4 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.get('users', '#controllers/users_controller.index')
```

---

## Static files server

**URL:** https://docs.adonisjs.com/guides/basics/static-file-server

**Contents:**
- Static files server
- Installation
- Configuration
- Serving static files
- Copying static files to production build

You can serve static files from a given directory using the @adonisjs/static package. The package ships with a middleware that you must register in the server middleware stack to intercept the HTTP requests and serve files.

The package comes pre-configured with the web starter kit. However, you can install and configure it as follows with other starter kits.

Install and configure the package using the following command :

Installs the @adonisjs/static package using the detected package manager.

Registers the following service provider inside the adonisrc.ts file.

Create the config/static.ts file.

Registers the following middleware inside the start/kernel.ts file.

The configuration for the static middleware is stored inside the config/static.ts file.

Enable or disable the middleware temporarily without removing it from the middleware stack.

The Accept-Range header allows browsers to resume an interrupted file download instead of trying to restart the download. You can disable resumable downloads by setting acceptsRanges to false.

Enable or disable the Cache-Control header. The immutable and maxAge properties will be ignored when cacheControl is disabled.

Define how to treat requests for dot files inside the public directory. You can set one of the following options.

Enable or disable etag generation.

Enable or disable the Last-Modified header. The file stat.mtime property is used as the value for the header.

Enable or disable the immutable directive for the Cache-Control header. By default, the immutable property is disabled.

If the immutable property is enabled, you must define the maxAge property to enable caching.

Define the max-age directive for the Cache-Control header. The value should be either in milliseconds or a time expression string.

A function that returns an object of headers to set on the response. The function receives the file path as the first argument and the file stats object as the second argument.

Once the middleware is registered, you may create files inside the public directory and access them in the browser using the file path. For example, the ./public/css/style.css file can be accessed using the http://localhost:3333/css/style.css URL.

The files in the public directory are not compiled or built using an assets bundler. If you want to compile frontend assets, you must place them inside the resources directory and use the assets bundler.

The static files stored inside the /public directory are automatically copied to the build folder when you run node ace build command.

The rule for copying public files is defined inside the adonisrc.ts file.

**Examples:**

Example 1 (python):
```python
node ace add @adonisjs/static
```

Example 2 (typescript):
```typescript
{
  providers: [
    // ...other providers
    () => import('@adonisjs/static/static_provider')
  ]
}
```

Example 3 (typescript):
```typescript
server.use([
  () => import('@adonisjs/static/static_middleware')
])
```

Example 4 (typescript):
```typescript
import { defineConfig } from '@adonisjs/static'

const staticServerConfig = defineConfig({
  enabled: true,
  etag: true,
  lastModified: true,
  dotFiles: 'ignore',
})

export default staticServerConfig
```

---

## CORS

**URL:** https://docs.adonisjs.com/guides/security/cors

**Contents:**
- CORS
- Installation
- Configuration
- Debugging CORS errors

CORS helps you protect your application from malicious requests triggered using scripts in a browser environment.

For example, if an AJAX or a fetch request is sent to your server from a different domain, the browser will block that request with a CORS error and expect you to implement a CORS policy if you think the request should be allowed.

In AdonisJS, you can implement the CORS policy using the @adonisjs/cors package. The package ships with an HTTP middleware that intercepts incoming requests and responds with correct CORS headers.

Install and configure the package using the following command :

Installs the @adonisjs/cors package using the detected package manager.

Registers the following service provider inside the adonisrc.ts file.

Creates the config/cors.ts file. This file contains the configuration settings for CORS.

Registers the following middleware inside the start/kernel.ts file.

The configuration for the CORS middleware is stored inside the config/cors.ts file.

Turn the middleware on or off temporarily without removing it from the middleware stack.

The origin property controls the value for the Access-Control-Allow-Origin header.

You can allow the request's current origin by setting the value to true or disallow the request's current origin by setting it to false.

You may specify a list of hardcoded origins to allow an array of domain names.

Use the wildcard expression * to allow all the origins. Read the MDN documentation to understand how the wildcard expression works.

When the credentials property is set to true, we will automatically make the wildcard expression behave like a boolean (true).

You can compute the origin value during the HTTP request using a function. For example:

The methods property controls the method to allow during the preflight request. The Access-Control-Request-Method header value is checked against the allowed methods.

The headers property controls the request headers to allow during the preflight request. The Access-Control-Request-Headers header value is checked against the headers property.

Setting the value to true will allow all the headers. Whereas setting the value to false will disallow all the headers.

You can specify a list of headers to allow by defining them as an array of strings.

You can compute the headers config value using a function during the HTTP request. For example:

The exposeHeaders property controls the headers to expose via Access-Control-Expose-Headers header during the preflight request.

The credentials property controls whether to set the Access-Control-Allow-Credentials header during the preflight request.

The maxAge property controls the Access-Control-Max-Age response header. The value is in seconds.

Debugging CORS issues is a challenging experience. However, there are no shortcuts other than understanding the rules of CORS and debugging the response headers to ensure everything is in place.

Following are some links to the articles you may read to understand better how CORS works.

**Examples:**

Example 1 (python):
```python
node ace add @adonisjs/cors
```

Example 2 (typescript):
```typescript
{
  providers: [
    // ...other providers
    () => import('@adonisjs/cors/cors_provider')
  ]
}
```

Example 3 (typescript):
```typescript
server.use([
  () => import('@adonisjs/cors/cors_middleware')
])
```

Example 4 (typescript):
```typescript
import { defineConfig } from '@adonisjs/cors'

const corsConfig = defineConfig({
  enabled: true,
  origin: true,
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})

export default corsConfig
```

---

## Request

**URL:** https://docs.adonisjs.com/guides/basics/request

**Contents:**
- Request
- Query string and route params
- Request body
  - Cherry-picking values
  - Type-safe request body
- Request URL
- Request headers
- Request method
- User IP Address
  - Defining a custom getIp method

An instance of the request class holds data for the ongoing HTTP request, including the request body, reference to uploaded files, cookies, request headers, and much more. The request instance can be accessed using the ctx.request property.

The request.qs method returns the parsed query string as an object.

The request.params method returns an object of Route params.

You can access a single parameter using the request.param method.

AdonisJS parses the request body using the body-parser middleware registered inside the start/kernel.ts file.

You can access the request body using the request.body() method. It returns the parsed request body as an object.

The request.all method returns a merged copy of both the request body and the query string.

The request.input, request.only, and the request.except methods can cherry-pick specific properties from the request data. All the cherry-picking methods lookup for values inside both the request body and the query string.

The request.only method returns an object with only the mentioned properties.

The request.except method returns an object excluding the mentioned properties.

The request.input method returns the value for a specific property. Optionally, you can pass a default value as the second argument. The default value is returned when the actual value is missing.

By default, AdonisJS does not enforce data types for the request.all, request.body, or cherry-picking methods, as it cannot know the expected content of the request body in advance.

To ensure type-safety, you can use the validator to validate and parse the request body, ensuring that all values are correct and match the expected types.

The request.url method returns the request URL relative to the hostname. By default, the return value does not include the query string. However, you can get the URL with query string by calling request.url(true).

The request.completeUrl method returns the complete URL, including the hostname. Again, unless explicitly told, the return value does not include the query string.

The request.headers method returns the request headers as an object.

You can access the value for an individual header using the request.header method.

The request.method method returns the HTTP method for the current request. This method returns the spoofed method when form method spoofing is enabled, and you can use the request.intended method to get the original request method.

The request.ip method returns the user IP address for the current HTTP request. This method relies on the X-Forwarded-For header set by proxy servers like Nginx or Caddy.

Read the trusted proxies section to configure the proxies your application should trust.

The request.ips method returns an array of all the IP addresses set by intermediate proxies. The array is sorted by most trusted to least trusted IP address.

If the trusted proxy settings are insufficient to determine the correct IP address, you can implement your custom getIp method.

The method is defined inside the config/app.ts file under the http settings object.

AdonisJS provides several methods for content-negotiation by parsing all the commonly supported Accept headers. For example, you can use the request.types method to get a list of all the content types accepted by a given request.

The return value of the request.types method is ordered by the client's preference (most preferred first).

Following is the complete list of content negotiation methods.

Sometimes you want to find the preferred content type based on what the server can support.

For the same, you can use the request.accepts method. The method takes an array of supported content types and returns the most preferred one after inspecting the Accept header. A null value is returned when unable to find a match.

Similar to request.accept, the following methods can be used to find the preferred value for other Accept headers.

Request ids help you debug and trace application issues from logs by assigning a unique id to every HTTP request. By default, request id creation is disabled. However, you can enable it inside the config/app.ts file.

Request ids are generated using the cuid2 package. Before generating an id, we check for the X-Request-Id request header and use its value (if it exists).

Once enabled, you can access the id using the request.id method.

The same request-id is also added to all the logs generated using the ctx.logger instance.

Most Node.js applications are deployed behind a proxy server like Nginx or Caddy. Therefore we have to rely on HTTP headers such as X-Forwarded-Host, X-Forwarded-For, and X-Forwarded-Proto to know about the real end-client making an HTTP request.

These headers are only used when your AdonisJS application can trust the source IP address.

You can configure which IP addresses to trust within the config/app.ts file using the http.trustProxy configuration option.

The value for trustProxy can also be a function. The method should return true if the IP address is trusted; otherwise, return false.

If you are running Nginx on the same server as your application code, you need to trust the loopback IP addresses, i.e. (127.0.0.1).

Suppose your application is only accessible through a load balancer, and you do not have a list of IP addresses for that load balancer. Then, you can trust the proxy server by defining a callback that always returns true.

Query strings from the request URL are parsed using the qs module. You can configure the parser settings inside the config/app.ts file.

View the list of all the available options.

The form method on an HTML form can only be set to GET, or POST, making it impossible to leverage restful HTTP methods.

However, AdonisJS allows you to workaround this limitation using form method spoofing. Form method spoofing is a fancy term for specifying the form method via the _method query string.

For method spoofing to work, you must set the form action to POST and enable the feature inside the config/app.ts file.

Once enabled, you can spoof the form method as follows.

You can add custom properties to the Request class using macros or getters. Make sure to read the extending AdonisJS guide first if you are new to the concept of macros.

Since the macros and getters are added at runtime, you must inform TypeScript about their types.

**Examples:**

Example 1 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.get('posts', async ({ request }) => {
  /*
   * URL: /?sort_by=id&direction=desc
   * qs: { sort_by: 'id', direction: 'desc' }
   */
  request.qs()
})
```

Example 2 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.get('posts/:slug/comments/:id', async ({ request }) => {
  /*
   * URL: /posts/hello-world/comments/2
   * params: { slug: 'hello-world', id: '2' }
   */
  request.params()
})
```

Example 3 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.get('posts/:slug/comments/:id', async ({ request }) => {
  const slug = request.param('slug')
  const commentId = request.param('id')
})
```

Example 4 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.post('/', async ({ request }) => {
  console.log(request.body())
})
```

---

## Cookies

**URL:** https://docs.adonisjs.com/guides/basics/cookies

**Contents:**
- Cookies
- Configuration
- Supported data types
- Signed cookies
- Encrypted cookies
- Plain cookies
- Setting cookies during tests

The request cookies are parsed automatically during an HTTP request. You can read cookies using the request object and set/clear cookies using the response object.

The default configuration for setting cookies is defined inside the config/app.ts file. Feel free to tweak the options as per your application requirements.

The options are converted to set-cookie attributes. The maxAge property accepts a string-based time expression, and its value will be converted to seconds.

The same set of options can be overridden when setting the cookies.

The cookie values are serialized to a string using JSON.stringify; therefore, you can use the following JavaScript data types as cookie values.

The cookies set using the response.cookie method are signed. A signed cookie is tamper-proof, meaning changing its contents will invalidate its signature, and the cookie will be ignored.

The cookies are signed using the appKey defined inside the config/app.ts file.

The signed cookies are still readable by Base64 decoding them. You can use encrypted cookies if you want the cookie value to be unreadable.

Unlike signed cookies, the encrypted cookie value cannot be decoded to plain text. Therefore, you can use encrypted cookies for values containing sensitive information that should not be readable by anyone.

Encrypted cookies are set using the response.encryptedCookie method and read using the request.encryptedCookie method. Under the hood, these methods use the Encryption module.

Plain cookies are meant to be used when you want the cookie to be accessed by your frontend code using the document.cookie value.

By default, we call JSON.stringify on raw values and convert them to a base64 encoded string. It is done so that you can use objects and arrays for the cookie value. However, the encoding can be turned off.

Plain cookies are defined using the response.plainCookie method and can be read using the request.plainCookie method.

To turn off encoding, set encoding: false in the options object.

The following guides cover the usage of cookies when writing tests.

**Examples:**

Example 1 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.get('cart', async ({ request }) => {
  const cartItems = request.cookie('cart_items', [])
  console.log(cartItems)
})
```

Example 2 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.post('cart', async ({ request, response }) => {
  const id = request.input('product_id')
  response.cookie('cart_items', [{ id }])
})
```

Example 3 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.delete('cart', async ({ request, response }) => {
  response.clearCookie('cart_items')
})
```

Example 4 (typescript):
```typescript
http: {
  cookie: {
    domain: '',
    path: '/',
    maxAge: '2h',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    /**
     * Experimental properties
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#partitioned
     */
    partitioned: false,
    priority: 'medium',
  }
}
```

---

## Vite

**URL:** https://docs.adonisjs.com/guides/basics/vite

**Contents:**
- Vite
- Installation
- Configuration
  - Vite config file
  - AdonisJS config file
- Folder structure for frontend assets
- Starting the dev server
- Including entrypoints in Edge templates
- Referencing assets inside Edge templates
- Processing additional assets with Vite

AdonisJS uses Vite to bundle the frontend assets of your applications. We provide an official integration that performs all the heavy lifting required to integrate Vite with a backend framework like AdonisJS. It includes:

Vite is embedded inside the AdonisJS dev server, and every request that should be handled by Vite is proxied to it through an AdonisJS middleware. It allows us to directly access Vite's runtime API to perform server-side rendering (SSR) and manage a single dev server. That also means that assets are served by AdonisJS directly and not by a separate process.

Still using @adonisjs/vite 2.x ? See the migration guide to upgrade to the latest version.

First, make sure to have at least the following versions of AdonisJS installed:

Then install and configure the @adonisjs/vite package. The command below installs the package and vite, and configures the project by creating the necessary configuration files.

Registers the following service provider inside the adonisrc.ts file.

Create vite.config.ts and config/vite.ts configuration files.

Create the frontend entry point file, i.e. resources/js/app.js.

Once done, add the following to your adonisrc.ts file.

The assetsBundler property is set to false to turn off the assets bundler management done by the AdonisJS Assembler.

The hooks property registers the @adonisjs/vite/build_hook to execute the Vite build process. See Assembler hooks for more information.

The setup process creates two configuration files. The vite.config.ts file is used to configure the Vite bundler, and config/vite.ts is used by AdonisJS on the backend.

The vite.config.ts file is a regular configuration file used by Vite. Per your project requirements, you can install and register additional Vite plugins inside this file.

By default, the vite.config.ts file uses the AdonisJS plugin, which accepts the following options.

The entrypoints refers to the entry point file of your frontend codebase. Usually, it will be a JavaScript or a TypeScript file with additional imports. Each entry point will result in a separate output bundle.

Also, if needed, you can define multiple entrypoints. For example, an entry point for your user-facing app and another for the admin panel.

The buildDirectory option defines a relative path to the output directory. The option value is supplied to Vite as the build.outDir option.

If you decide to change the default value, make sure also to update the buildDirectory path in the config/vite.ts file.

Default: public/assets

It contains an array of glob patterns to watch and reload the browser on file change. By default, we watch for Edge templates. However, you can configure additional patterns as well.

It contains the URL to prefix when generating links for assets in production. If you upload the Vite output to a CDN, then the value of this property should be the CDN server URL.

Ensure you update the backend configuration to use the same assetsUrl value.

AdonisJS uses the config/vite.ts file on the backend to know about the output paths of the Vite build process.

It contains the path to the Vite's build output directory. You must also update this backend config if you change the default value inside the vite.config.ts file.

The URL to prefix when generating links for assets in production. If you upload the Vite output to a CDN, then the value of this property should be the CDN server URL.

You can use the scriptAttributes property to set attributes on the script tags generated using the @vite tag. The attributes are a collection of key-value pairs.

You can use the styleAttributes property to set attributes on the link tags generated using the @vite tag. The attributes are a collection of key-value pairs.

You can also apply the attributes conditionally by assigning a function to the styleAttributes option.

Technically, AdonisJS does not enforce any folder structure for storing your frontend assets. You can organize them as you like.

However, we recommend storing frontend assets inside the resources folder, with each asset class inside its subdirectory.

The vite output will be in the public/assets folder. We choose the /assets subdirectory so you can continue using the public folder for other static files you wish not to process using Vite.

You can start your application as usual, and AdonisJS will automatically proxy the needed requests to Vite.

You can render the script and the style tags for the entrypoints defined inside the vite.config.ts file using the @vite Edge tag. The tag accepts an array of entrypoints and returns the script and the link tags.

We recommend importing CSS files inside your JavaScript files and not registering them separately as an entry point. For example:

Vite creates a dependency graph of files imported by the entrypoints and auto-updates their paths per the bundled output. However, Vite is unaware of Edge templates and cannot detect their referenced assets.

Therefore, we provide an Edge helper you can use to create URLs for files processed by Vite. In the following example:

Vite ignores static assets not imported by the frontend code. It could be static images, fonts, or SVG icons only referenced inside the Edge templates.

Therefore, you will have to notify Vite about the existence of these assets using its Glob imports API.

In the following example, we ask Vite to process all the files within the resources/images directory. This code should be written within an entry point file.

Now, you can reference the images within your Edge templates as follows.

If you plan to use TypeScript in your frontend codebase, create an additional tsconfig.json file inside the resources directory. Vite and your code editor will automatically use this config file for the TypeScript source code inside the resources directory.

To enable react-refresh during development, you must use the @viteReactRefresh Edge tag. It should be written before you include the entrypoints using the @vite tag.

Once done, you can configure the React plugin as usual in a regular Vite project.

After you create the production build using Vite, you can upload the bundled output to a CDN server to serve the files.

However, before you do that, you must register the URL of your CDN server with both Vite and AdonisJS so that the output URLs inside the manifest.json file or lazy loaded chunks should point to your CDN server.

You must define the assetsUrl inside the vite.config.ts and config/vite.ts files.

With older versions of AdonisJS, Vite was spawned as a separate process and had its own dev server.

With the 3.x version, Vite is embedded inside the AdonisJS dev server, and every request that should be handled by Vite are proxied to it through an AdonisJS middleware.

The advantages of the middleware mode are that we can directly access Vite's runtime API to perform server-side rendering (SSR) and have a single dev server to manage.

You can read more about the middleware mode in the Vite documentation.

Vite generates the manifest file alongside the production build of your assets.

The manifest file contains the URLs to the assets processed by Vite, and AdonisJS uses this file to create URLs for assets referenced inside the Edge templates either using the asset helper or the @vite tag.

**Examples:**

Example 1 (python):
```python
node ace add @adonisjs/vite
```

Example 2 (typescript):
```typescript
{
  providers: [
    // ...other providers
    () => import('@adonisjs/vite/vite_provider')
  ]
}
```

Example 3 (typescript):
```typescript
import { defineConfig } from '@adonisjs/core/build/standalone'

export default defineConfig({
  assetsBundler: false,
  hooks: {
    onBuildStarting: [() => import('@adonisjs/vite/build_hook')],
  },
})
```

Example 4 (typescript):
```typescript
import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'

export default defineConfig({
  plugins: [
    adonisjs({
      entrypoints: ['resources/js/app.js'],
      reload: ['resources/views/**/*.edge'],
    }),
  ]
})
```

---

## Routing

**URL:** https://docs.adonisjs.com/guides/basics/routing

**Contents:**
- Routing
- View list of registered routes
- Route params
  - Optional params
  - Wildcard params
  - Params matchers
  - Inbuilt matchers
  - Global matchers
- HTTP methods
- Router handler

The users of your website or web application can visit different URLs like /, /about, or /posts/1. To make these URLs work, you have to define routes.

In AdonisJS, routes are defined inside the start/routes.ts file. A route is a combination of a URI pattern and a handler to handle requests for that specific route. For example:

The last route in the above example uses a dynamic URI pattern. The :id is a way to tell the router to accept any value for the id. We call them route params.

You can run the list:routes command to view the list of routes registered by your application.

Also, you can see the routes list from the VSCode activity bar, if you are using our official VSCode extension.

Route params allow you to define URIs that can accept dynamic values. Each param captures the value of a URI segment, and you can access this value within the route handler.

A route param always starts with a colon :, followed by the param's name.

A URI can also accept multiple params. Each param should have a unique name.

The route params can also be optional by appending a question mark ? at the end of the param name. The optional params should come after the required params.

To capture all the segments of a URI, you can define a wildcard param. The wildcard param is specified using a special * keyword and must be defined at the last position.

The router does not know the format of the param data you want to accept. For example, a request with URI /posts/foo-bar and /posts/1 will match the same route. However, you can explicitly validate the params values using param matchers.

A matcher is registered by chaining the where() method. The first argument is the param name, and the second argument is the matcher object.

In the following example, we define a regex to validate the id to be a valid number. The route will be skipped in case the validation fails.

Alongside the match regex, you can also define a cast function to convert the param value to its correct data type. In this example, we can convert the id to a number.

The router ships with the following helper methods for commonly used data types.

The route matchers can be defined globally on the router instance. Unless explicitly overridden at the route level, a global matcher is applied on all the routes.

The router.get() method creates a route that responds to GET HTTP method. Similarly, you can use the following methods to register routes for different HTTP methods.

You can use the router.any() method to create a route that responds to all standard HTTP methods.

Finally, you can create a route for custom HTTP methods using the router.route() method.

The route handler handles the request by returning a response or raising an exception to abort the request.

A handler can be an inline callback (as seen in this guide) or a reference to a controller method.

Route handlers can be async functions, and AdonisJS will handle the promise resolution automatically.

In the following example, we import the UsersController class and bind it to the route. During an HTTP request, AdonisJS will create an instance of the controller class using the IoC container and execute the store method.

See also: Dedicated guide on controllers.

You can define a middleware on a route by chaining the use() method. The method accepts an inline callback or a reference to a named middleware.

Following is a minimal example of defining a route middleware. We recommend reading the dedicated guide on middleware to explore all the available options and the execution flow of middleware.

Every route has a unique identifier you can use to reference the route elsewhere in your application. For example, you can generate a URL to a route using the URL builder or redirect to a route using the response.redirect() method.

By default, the route pattern is the route identifier. However, you can assign a unique, memorable name to the route using the route.as method.

You can now construct URLs using the route name within your templates or using the URL builder.

Route groups offer a convenience layer to bulk configure nested inside a group. You may create a group of routes using the router.group method.

Route groups can be nested inside each other, and AdonisJS will merge or override properties based on the behavior of the applied setting.

The URI pattern of routes inside a group can be prefixed using the group.prefix method. The following example will create routes for the /api/users and /api/payments URI patterns.

In the case of nested groups, the prefix will be applied from the outer to the inner group. The following example will create routes for /api/v1/users and /api/v1/payments URI patterns.

Similar to prefixing the route pattern, you can also prefix the route names inside a group using the group.as method.

The routes inside a group must have names before you can prefix them.

In the case of nested groups, the names will be prefixed from the outer to the inner group.

You can assign middleware to routes inside a group using the group.use method. The group middleware are executed before the middleware applied on individual routes within the group.

In the case of nested groups, the middleware from the outermost group will run first. In other words, a group prepends middleware to the route middleware stack.

See also: Middleware guide

AdonisJS allows you to register routes under a specific domain name. This is helpful when you have an application mapped to multiple domains and want different routes for each domain.

In the following example, we define two sets of routes.

Once you deploy your application, the routes under the group with an explicit domain will only be matched if the request's hostname is blog.adonisjs.com.

You can specify dynamic subdomains using the group.domain method. Similar to the route params, the dynamic segment of a domain starts with a colon :.

In the following example, the tenant segment accepts any subdomain, and you can access its value using the HttpContext.subdomains object.

You may use the router.on().render() method if you have a route handler that only renders a view. It is a convenient shortcut to render a view without defining an explicit handler.

The render method accepts the name of the edge template to render. Optionally, you can pass the template data as the second argument.

The route.on().render() method only exists when you have configured the Edge service provider

If you are using the Inertia.js adapter, you can use the router.on().renderInertia() method to render an Inertia view. It is a convenient shortcut to render a view without defining an explicit handler.

The renderInertia method accepts the name of the Inertia component to render. Optionally, you can pass the component data as the second argument.

The route.on().renderInertia() method only exists when you have configured the Inertia service provider

If you are defining a route handler to redirect the request to another path or route, you may use the router.on().redirect() or router.on().redirectToPath() methods.

The redirect method accepts the route identifier. Whereas the redirectToPath method accepts a static path/URL.

In the following example, the value of id from the original request will be used to construct the /articles/:id route. So, if a request comes for /posts/20, it will be redirected to /articles/20.

You can also specify the route params explicitly as the second argument. In this case, the params from the current request will be ignored.

The query string for the redirect URL can be defined within the options object.

The route of the current request can be accessed using the HttpContext.route property. It includes the route pattern, name, reference to its middleware store, and reference to the route handler.

You can also check if the current request is for a specific route or not using the request.matchesRoute method. The method accepts either the route URI pattern or the route name.

You can also match against multiple routes. The method will return true as soon as it finds the first match.

The routes are matched in the same order as they are registered inside the routes file. We begin the match from the topmost route and stop at the first matching route.

If you have two similar routes, you must first register the most specific route.

In the following example, the request for the URL /posts/archived will be handled by the first route (i.e., /posts/:id ) because the dynamic param id will capture the archived value.

This behavior can be fixed by re-ordering the routes by placing the most specific route before the route with a dynamic param.

AdonisJS raises a 404 exception when no matching route is found for the current request's URL.

To display a 404 page to the user, you can catch the E_ROUTE_NOT_FOUND exception inside the global exception handler and render a template.

You may use the URL builder to create URLs for pre-defined routes in your application. For example, create a form action URL inside Edge templates, or make the URL to redirect the request to another route.

The router.builder method creates an instance of the URL builder class, and you can use the builder's fluent API to look up a route and create a URL for it.

You may generate the URL for the posts.show route as follows.

The params can be specified as an array of positional arguments. Or you can define them as a key-value pair.

The query parameters can be defined using the builder.qs method. The method accepts an object of key-value pair and serializes it to a query string.

The query string is serialized using the qs npm package. You can configure its settings inside the config/app.ts file under the http object.

You may prefix a base URL to the output using the builder.prefixUrl method.

Signed URLs are URLs with a signature query string appended to them. The signature is used to verify if the URL has been tampered after it was generated.

For example, you have a URL to unsubscribe users from your newsletter. The URL contains the userId and might look as follows.

To prevent someone from changing the user id from 231 to something else, you can sign this URL and verify the signature when handling requests for this route.

You may use the makeSigned method to create a signed URL.

You may generate signed URLs that expire after a given duration using the expiresIn option. The value can be a number in milliseconds or a time expression string.

The URL builder performs a route lookup with the route identifier given to the make and the makeSigned methods.

If you want to create a URL for routes defined outside your AdonisJS application, you may disable the route lookup and give the route pattern to the make and the makeSigned methods.

You can make URLs for routes registered under a specific domain using the router.builderForDomain method. The method accepts the route pattern you used at the time of defining the routes.

You can create URL for the posts.show route under blog.adonisjs.com domain as follows.

You may use the route and the signedRoute methods inside templates to generate a URL using the URL builder.

See also: Edge helpers reference

You can add custom properties to different router classes using macros and getters. Make sure to read the extending AdonisJS guide first if you are new to the concept of macros.

Following is the list of classes you can extend.

The Router class contains the top-level methods for creating a route, a route group, or a route resource. An instance of this class is made available via the router service.

The Route class represents a single route. An instance of the Route class is created once you call the router.get, router.post, and other similar methods.

The RouteGroup class represents a group of routes. An instance of RouteGroup class is created once you call the router.group method.

You can access the group's routes using the this.routes property inside your macro or getter implementation.

The RouteResource class represents a group of routes for a resource. An instance of RouteResource class is created once you call the router.resource method.

You can access the routes of the resource using the this.routes property inside your macro or getter implementation.

The BriskRoute class represents a route without an explicit handler. An instance of BriskRoute class is created once you call the router.on method.

You can call the this.setHandler method inside your macro or getter to assign a route handler.

TypeScript build process

**Examples:**

Example 1 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.get('/', () => {
  return 'Hello world from the home page.'
})

router.get('/about', () => {
  return 'This is the about page.'
})

router.get('/posts/:id', ({ params }) => {
  return `This is post with id ${params.id}`
})
```

Example 2 (unknown):
```unknown
node ace list:routes
```

Example 3 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.get('/posts/:id', ({ params }) => {
  return params.id
})
```

Example 4 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.get('/posts/:id/comments/:commentId', ({ params }) => {
  console.log(params.id)
  console.log(params.commentId)
})
```

---

## Routing

**URL:** https://docs.adonisjs.com/guides/basics

**Contents:**
- Routing
- View list of registered routes
- Route params
  - Optional params
  - Wildcard params
  - Params matchers
  - Inbuilt matchers
  - Global matchers
- HTTP methods
- Router handler

The users of your website or web application can visit different URLs like /, /about, or /posts/1. To make these URLs work, you have to define routes.

In AdonisJS, routes are defined inside the start/routes.ts file. A route is a combination of a URI pattern and a handler to handle requests for that specific route. For example:

The last route in the above example uses a dynamic URI pattern. The :id is a way to tell the router to accept any value for the id. We call them route params.

You can run the list:routes command to view the list of routes registered by your application.

Also, you can see the routes list from the VSCode activity bar, if you are using our official VSCode extension.

Route params allow you to define URIs that can accept dynamic values. Each param captures the value of a URI segment, and you can access this value within the route handler.

A route param always starts with a colon :, followed by the param's name.

A URI can also accept multiple params. Each param should have a unique name.

The route params can also be optional by appending a question mark ? at the end of the param name. The optional params should come after the required params.

To capture all the segments of a URI, you can define a wildcard param. The wildcard param is specified using a special * keyword and must be defined at the last position.

The router does not know the format of the param data you want to accept. For example, a request with URI /posts/foo-bar and /posts/1 will match the same route. However, you can explicitly validate the params values using param matchers.

A matcher is registered by chaining the where() method. The first argument is the param name, and the second argument is the matcher object.

In the following example, we define a regex to validate the id to be a valid number. The route will be skipped in case the validation fails.

Alongside the match regex, you can also define a cast function to convert the param value to its correct data type. In this example, we can convert the id to a number.

The router ships with the following helper methods for commonly used data types.

The route matchers can be defined globally on the router instance. Unless explicitly overridden at the route level, a global matcher is applied on all the routes.

The router.get() method creates a route that responds to GET HTTP method. Similarly, you can use the following methods to register routes for different HTTP methods.

You can use the router.any() method to create a route that responds to all standard HTTP methods.

Finally, you can create a route for custom HTTP methods using the router.route() method.

The route handler handles the request by returning a response or raising an exception to abort the request.

A handler can be an inline callback (as seen in this guide) or a reference to a controller method.

Route handlers can be async functions, and AdonisJS will handle the promise resolution automatically.

In the following example, we import the UsersController class and bind it to the route. During an HTTP request, AdonisJS will create an instance of the controller class using the IoC container and execute the store method.

See also: Dedicated guide on controllers.

You can define a middleware on a route by chaining the use() method. The method accepts an inline callback or a reference to a named middleware.

Following is a minimal example of defining a route middleware. We recommend reading the dedicated guide on middleware to explore all the available options and the execution flow of middleware.

Every route has a unique identifier you can use to reference the route elsewhere in your application. For example, you can generate a URL to a route using the URL builder or redirect to a route using the response.redirect() method.

By default, the route pattern is the route identifier. However, you can assign a unique, memorable name to the route using the route.as method.

You can now construct URLs using the route name within your templates or using the URL builder.

Route groups offer a convenience layer to bulk configure nested inside a group. You may create a group of routes using the router.group method.

Route groups can be nested inside each other, and AdonisJS will merge or override properties based on the behavior of the applied setting.

The URI pattern of routes inside a group can be prefixed using the group.prefix method. The following example will create routes for the /api/users and /api/payments URI patterns.

In the case of nested groups, the prefix will be applied from the outer to the inner group. The following example will create routes for /api/v1/users and /api/v1/payments URI patterns.

Similar to prefixing the route pattern, you can also prefix the route names inside a group using the group.as method.

The routes inside a group must have names before you can prefix them.

In the case of nested groups, the names will be prefixed from the outer to the inner group.

You can assign middleware to routes inside a group using the group.use method. The group middleware are executed before the middleware applied on individual routes within the group.

In the case of nested groups, the middleware from the outermost group will run first. In other words, a group prepends middleware to the route middleware stack.

See also: Middleware guide

AdonisJS allows you to register routes under a specific domain name. This is helpful when you have an application mapped to multiple domains and want different routes for each domain.

In the following example, we define two sets of routes.

Once you deploy your application, the routes under the group with an explicit domain will only be matched if the request's hostname is blog.adonisjs.com.

You can specify dynamic subdomains using the group.domain method. Similar to the route params, the dynamic segment of a domain starts with a colon :.

In the following example, the tenant segment accepts any subdomain, and you can access its value using the HttpContext.subdomains object.

You may use the router.on().render() method if you have a route handler that only renders a view. It is a convenient shortcut to render a view without defining an explicit handler.

The render method accepts the name of the edge template to render. Optionally, you can pass the template data as the second argument.

The route.on().render() method only exists when you have configured the Edge service provider

If you are using the Inertia.js adapter, you can use the router.on().renderInertia() method to render an Inertia view. It is a convenient shortcut to render a view without defining an explicit handler.

The renderInertia method accepts the name of the Inertia component to render. Optionally, you can pass the component data as the second argument.

The route.on().renderInertia() method only exists when you have configured the Inertia service provider

If you are defining a route handler to redirect the request to another path or route, you may use the router.on().redirect() or router.on().redirectToPath() methods.

The redirect method accepts the route identifier. Whereas the redirectToPath method accepts a static path/URL.

In the following example, the value of id from the original request will be used to construct the /articles/:id route. So, if a request comes for /posts/20, it will be redirected to /articles/20.

You can also specify the route params explicitly as the second argument. In this case, the params from the current request will be ignored.

The query string for the redirect URL can be defined within the options object.

The route of the current request can be accessed using the HttpContext.route property. It includes the route pattern, name, reference to its middleware store, and reference to the route handler.

You can also check if the current request is for a specific route or not using the request.matchesRoute method. The method accepts either the route URI pattern or the route name.

You can also match against multiple routes. The method will return true as soon as it finds the first match.

The routes are matched in the same order as they are registered inside the routes file. We begin the match from the topmost route and stop at the first matching route.

If you have two similar routes, you must first register the most specific route.

In the following example, the request for the URL /posts/archived will be handled by the first route (i.e., /posts/:id ) because the dynamic param id will capture the archived value.

This behavior can be fixed by re-ordering the routes by placing the most specific route before the route with a dynamic param.

AdonisJS raises a 404 exception when no matching route is found for the current request's URL.

To display a 404 page to the user, you can catch the E_ROUTE_NOT_FOUND exception inside the global exception handler and render a template.

You may use the URL builder to create URLs for pre-defined routes in your application. For example, create a form action URL inside Edge templates, or make the URL to redirect the request to another route.

The router.builder method creates an instance of the URL builder class, and you can use the builder's fluent API to look up a route and create a URL for it.

You may generate the URL for the posts.show route as follows.

The params can be specified as an array of positional arguments. Or you can define them as a key-value pair.

The query parameters can be defined using the builder.qs method. The method accepts an object of key-value pair and serializes it to a query string.

The query string is serialized using the qs npm package. You can configure its settings inside the config/app.ts file under the http object.

You may prefix a base URL to the output using the builder.prefixUrl method.

Signed URLs are URLs with a signature query string appended to them. The signature is used to verify if the URL has been tampered after it was generated.

For example, you have a URL to unsubscribe users from your newsletter. The URL contains the userId and might look as follows.

To prevent someone from changing the user id from 231 to something else, you can sign this URL and verify the signature when handling requests for this route.

You may use the makeSigned method to create a signed URL.

You may generate signed URLs that expire after a given duration using the expiresIn option. The value can be a number in milliseconds or a time expression string.

The URL builder performs a route lookup with the route identifier given to the make and the makeSigned methods.

If you want to create a URL for routes defined outside your AdonisJS application, you may disable the route lookup and give the route pattern to the make and the makeSigned methods.

You can make URLs for routes registered under a specific domain using the router.builderForDomain method. The method accepts the route pattern you used at the time of defining the routes.

You can create URL for the posts.show route under blog.adonisjs.com domain as follows.

You may use the route and the signedRoute methods inside templates to generate a URL using the URL builder.

See also: Edge helpers reference

You can add custom properties to different router classes using macros and getters. Make sure to read the extending AdonisJS guide first if you are new to the concept of macros.

Following is the list of classes you can extend.

The Router class contains the top-level methods for creating a route, a route group, or a route resource. An instance of this class is made available via the router service.

The Route class represents a single route. An instance of the Route class is created once you call the router.get, router.post, and other similar methods.

The RouteGroup class represents a group of routes. An instance of RouteGroup class is created once you call the router.group method.

You can access the group's routes using the this.routes property inside your macro or getter implementation.

The RouteResource class represents a group of routes for a resource. An instance of RouteResource class is created once you call the router.resource method.

You can access the routes of the resource using the this.routes property inside your macro or getter implementation.

The BriskRoute class represents a route without an explicit handler. An instance of BriskRoute class is created once you call the router.on method.

You can call the this.setHandler method inside your macro or getter to assign a route handler.

TypeScript build process

**Examples:**

Example 1 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.get('/', () => {
  return 'Hello world from the home page.'
})

router.get('/about', () => {
  return 'This is the about page.'
})

router.get('/posts/:id', ({ params }) => {
  return `This is post with id ${params.id}`
})
```

Example 2 (unknown):
```unknown
node ace list:routes
```

Example 3 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.get('/posts/:id', ({ params }) => {
  return params.id
})
```

Example 4 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.get('/posts/:id/comments/:commentId', ({ params }) => {
  console.log(params.id)
  console.log(params.commentId)
})
```

---

## Middleware

**URL:** https://docs.adonisjs.com/guides/basics/middleware

**Contents:**
- Middleware
- Middleware stacks
  - Server middleware stack
  - Router middleware stack
  - Named middleware collection
- Creating middleware
  - Abort request
  - Continue with the request
  - Send a response, and do not call the next method
- Assigning middleware to routes and route groups

Middleware are a series of functions executed during an HTTP request before the request reaches the route handler. Every function in the chain can end the request or forward it to the next middleware.

A typical AdonisJS application uses middleware for parsing request body, managing users sessions, authenticating requests, serving static assets, etc.

You can also create custom middleware to perform additional tasks during an HTTP request.

To give you better control over the execution of the middleware pipeline, AdonisJS split the middleware stack into following three groups.

Server middleware runs on every HTTP request, even if you have not defined any route for the current request's URL.

They are great for adding additional functionality to your app that does not rely on the routing system of the framework. For example, the Static assets middleware is registered as server middleware.

You can register server middleware using the server.use method inside the start/kernel.ts file.

Router middleware are also known as global middleware. They are executed on every HTTP request that has a matching route.

The Bodyparser, auth, and session middleware are registered under the router middleware stack.

You can register router middleware using the router.use method inside the start/kernel.ts file.

Named middleware is a collection of middleware that are not executed unless explicitly assigned to a route or a group.

Instead of defining middleware as an inline callback within the routes file, we recommend you create dedicated middleware classes, store them inside the named middleware collection and then assign them to the routes.

You can define named middleware using the router.named method inside the start/kernel.ts file. Make sure to export the named collection to be able to use it inside the routes file.

Middleware are stored inside the ./app/middleware directory, and you can create a new middleware file by running the make:middleware ace command.

See also: Make middleware command

The above command will create the user_location_middleware.ts file under the middleware directory.

A middleware is represented as a class with the handle method. During execution, AdonisJS will automatically call this method and give it the HttpContext as the first argument.

Within the handle method, a middleware has to decide whether to continue with the request, finish the request by sending a response or raise an exception to abort the request.

If a middleware raises an exception, all the upcoming middleware and the route handler will not be executed, and the exception will be given to the global exception handler.

You must call the next method to continue with the request. Otherwise, the rest of the actions inside the middleware stack will not be executed.

Finally, you can end the request by sending the response. In this case, do not call the next method.

The named middleware collection is unused by default, and you must explicitly assign them to routes or the route groups.

In the following example, we first import the middleware collection and assign the userLocation middleware to a route.

Multiple middleware can be applied either as an array or by calling the use method multiple times.

Similarly, you can assign middleware to a route group as well. The group middleware will be applied to all group routes automatically.

Middleware registered under the named middleware collection can accept an additional parameter as part of the handle method arguments. For example, the auth middleware accepts the authentication guard as a configuration option.

When assigning the middleware to the route, you can specify the guard to use.

Middleware classes are instantiated using the IoC container; therefore, you can type-hint dependencies inside the middleware constructor, and the container will inject them for you.

Given you have a GeoIpService class to look up user location from the request IP, you can inject it into the middleware using the @inject decorator.

The middleware layer of AdonisJS is built on top of Chain of Responsibility design pattern. A middleware has two execution phases: the downstream phase and the upstream phase.

AdonisJS automatically captures the exception raised by the middleware pipeline or the route handler and converts it into an HTTP response using the global exception handler.

As a result, you do not have to wrap the next function calls inside a try/catch statement. Also, the automatic exception handling ensures that the upstream logic of middleware is always executed after the next function call.

The upstream phase of middleware can mutate the response body, headers, and status code. Doing so will discard the old response set by the route handler or any other middleware.

Before mutating the response, you must ensure you are dealing with the correct response type. Following is the list of response types in the Response class.

You will/will not have access to specific response properties based on the kind of response.

When mutating a standard response, you can access it using the response.content property. Make sure first to check if the content exists or not.

Response streams set using the response.stream method are not immediately piped to the outgoing HTTP response. Instead, AdonisJS waits for the route handler and the middleware pipeline to finish.

As a result, inside a middleware, you can replace the existing stream with a new stream or define event handlers to monitor the stream.

The file downloads performed using the response.download, and response.attachment methods defer the download process until the route handler and the middleware pipeline finish.

As a result, inside a middleware, you can replace the path for the file to download.

Creating middleware as classes allows you to easily test a middleware in isolation (aka unit test a middleware). There are a few different ways to test middleware. Let's explore all the available options.

The simplest option is to create a new instance of the middleware class and invoke the handle method with the HTTP context and next callback function.

The testUtils service is available only after the AdonisJS application is booted. However, if you are testing a middleware inside a package, you can use the HttpContextFactory class to create a dummy HTTP context instance without booting an application.

See also: CORS middleware test for a real-world example.

If your middleware relies on other middleware to be executed first, you may compose a pipeline of middleware using the server.pipeline method.

You can define the finalHandler and errorHandler functions before calling the pipeline.run method.

The server service is available after the application is booted. However, if you are creating a package, you can use the ServerFactory to create an instance of the Server class without booting the application.

**Examples:**

Example 1 (typescript):
```typescript
import server from '@adonisjs/core/services/server'

server.use([
  () => import('@adonisjs/static/static_middleware')
])
```

Example 2 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.use([
  () => import('@adonisjs/core/bodyparser_middleware')
])
```

Example 3 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.named({
  auth: () => import('#middleware/auth_middleware')
})
```

Example 4 (unknown):
```unknown
node ace make:middleware user_location
```

---

## Exception handling

**URL:** https://docs.adonisjs.com/guides/basics/exception-handling

**Contents:**
- Exception handling
- Assigning error handler to the server
- Handling exceptions
  - Status pages
  - Debug mode
- Reporting exceptions
  - Logging exceptions
  - Ignoring status codes
  - Ignoring errors
  - Custom shouldReport method

Exceptions raised during an HTTP request are handled by the HttpExceptionHandler defined inside the ./app/exceptions/handler.ts file. Inside this file, you can decide how to convert exceptions to responses and log them using the logger or report them to an external logging provider.

The HttpExceptionHandler extends the ExceptionHandler class, which does all the heavy lifting of handling errors and provides you with high-level APIs to tweak the reporting and rendering behavior.

The error handler is registered with the AdonisJS HTTP server inside the start/kernel.ts file. We lazily import the HTTP handler using the #exceptions alias defined in the package.json file.

The exceptions are handled by the handle method on the exceptions handler class. By default, the following steps are performed while handling an error.

If you want to handle a specific exception differently, you can do that inside the handle method. Make sure to use the ctx.response.send method to send a response, since the return value from the handle method is discarded.

Status pages are a collection of templates you want to render for a given or a range of status codes.

The range of status codes can be defined as a string expression. Two dots separate the starting and the ending status codes (..).

If you are creating a JSON server, you may not need status pages.

The content negotiation renderers handle exceptions that are not self-handled and not converted to a status page.

The content negotiation renderers have support for debug mode. They can parse and pretty-print errors in debug mode using the Youch npm package.

You can toggle the debug mode using the debug property on the exceptions handler class. However, turning off the debug mode in production is recommended, as it exposes sensitive information about your app.

The report method on the exceptions handler class handles reporting of exceptions.

The method receives the error as the first argument and the HTTP context as the second argument. You should not write a response from the report method and use the context only to read the request information.

All exceptions are reported using the logger by default.

You can add custom properties to the log messages by returning an object from the context method.

You can ignore exceptions from being reported by defining an array of status codes via the ignoreStatuses property.

You can also ignore exceptions by defining an array of error codes or error classes to ignore.

An array of exception classes can be ignored using the ignoreExceptions property.

The logic to ignore status codes or exceptions is written inside the shouldReport method. If needed, you can override this method and define your custom logic for ignoring exceptions.

You can create an exception class using the make:exception ace command. An exception extends the Exception class from the @adonisjs/core package.

See also: Make exception command

You can raise the exception by creating a new instance of it. When raising the exception, you can assign a custom error code and status code to the exception.

The error and status codes can also be defined as static properties on the exception class. The static values will be used if no custom value is defined when throwing the exception.

To self-handle the exception, you can define the handle method on the exception class. This method should convert an error to an HTTP response using the ctx.response.send method.

The error.handle method receives an instance of the error as the first argument and the HTTP context as the second argument.

You can implement the report method on the exception class to self-handle the exception reporting. The report method receives an instance of the error as the first argument and the HTTP context as the second argument.

The framework core and other official packages exports the exceptions raised by them. You can verify if an error is an instance of a specific exception using the instanceof check. For example:

Please check the exceptions reference guide to view the list of known errors.

**Examples:**

Example 1 (typescript):
```typescript
import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction
  protected renderStatusPages = app.inProduction

  async handle(error: unknown, ctx: HttpContext) {
    return super.handle(error, ctx)
  }

  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
```

Example 2 (typescript):
```typescript
server.errorHandler(() => import('#exceptions/handler'))
```

Example 3 (typescript):
```typescript
import { errors } from '@vinejs/vine'

export default class HttpExceptionHandler extends ExceptionHandler {
  async handle(error: unknown, ctx: HttpContext) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      ctx.response.status(422).send(error.messages)
      return
    }

    return super.handle(error, ctx)
  }
}
```

Example 4 (typescript):
```typescript
import { StatusPageRange, StatusPageRenderer } from '@adonisjs/http-server/types'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected statusPages: Record<StatusPageRange, StatusPageRenderer> = {
    '404': (_, { view }) => view.render('errors/not-found'),
    '500..599': (_, { view }) => view.render('errors/server-error')
  }
}
```

---

## Body parser middleware

**URL:** https://docs.adonisjs.com/guides/basics/body-parser

**Contents:**
- Body parser middleware
- Allowed methods
- Converting empty strings to null
- JSON parser
- URL encoded form parser
- Multipart parser

The request data is parsed using the BodyParser middleware registered inside the start/kernel.ts file.

The configuration for the middleware is stored inside the config/bodyparser.ts file. In this file, you may configure parsers for parsing JSON payloads, multipart forms with file uploads, and URL-encoded forms.

See also: Reading request body See also: File uploads

You may define an array of allowedMethods for which the bodyparser middleware should attempt to parse the request body. By default, the following methods are configured. However, feel free to remove or add new methods.

HTML forms send an empty string in the request body when an input field has no value. This behavior of HTML forms makes data normalization at the database layer harder.

For example, if you have a database column country set to nullable, you would want to store null as a value inside this column when the user does not select a country.

However, with HTML forms, the backend receives an empty string, and you might insert an empty string into the database instead of leaving the column as null.

The BodyParser middleware can handle this inconsistency by converting all empty string values to null when the convertEmptyStringsToNull flag is enabled inside the config.

The JSON parser is used for parsing request body defined as a JSON encoded string with the Content-type header matching one of the pre-defined types values.

The encoding to use when converting the request body Buffer to a string. Most likely, you want to use utf-8. However, you can use any encoding supported by the iconv-lite package.

The maximum limit of request body data the parser should allow. A 413 error will be returned if the request body exceeds the configured limit.

The strict parsing allows only objects and arrays at the top level of a JSON-encoded string.

An array of values for the Content-type header should be parsed using the JSON parser.

The form parser is used for parsing URL encoded strings with the Content-type header set to application/x-www-form-urlencoded. In other words, the HTML forms data is parsed using the form parser.

The encoding to use when converting the request body Buffer to a string. Most likely, you want to use utf-8. However, you can use any encoding supported by the iconv-lite package.

The maximum limit of request body data the parser should allow. A 413 error will be returned if the request body exceeds the configured limit.

The URL-encoded request body is parsed using the qs package. You can define the options for the package using the queryString property.

The multipart parser is used for parsing HTML form requests with file uploads.

See also: File uploads

Enabling autoProcess will move all the user-uploaded files to the tmp directory of your operating system.

Later, inside the controllers, you can validate the files and move them to a persistent location or a cloud service.

If you disable the autoProcess flag, then you will have to manually process the stream and read files/fields from the request body. See also: Self-processing multipart stream.

You may define an array of routes for which to auto process the files. The values must be a route pattern and not the URL.

The processManually array allows you to turn off auto processing of files for selected routes. The values must be a route pattern and not the URL.

The encoding to use when converting the request body Buffer to a string. Most likely, you want to use utf-8. However, you can use any encoding supported by the iconv-lite package.

The maximum limit of bytes to allow when processing all files. You can define the individual file size limit using the request.file method.

The maximum limit of bytes to allow for the fields (not files) when processing the multipart request. A 413 error will be returned if the field size exceeds the configured limit.

**Examples:**

Example 1 (typescript):
```typescript
import { defineConfig } from '@adonisjs/core/bodyparser'

export const defineConfig({
  allowedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],

  form: {
    // settings for parsing HTML forms
  },

  json: {
    // Settings for parsing JSON body
  },

  multipart: {
    // Settings for multipart parser
  },

  raw: {
    // Settings for a raw text parser
  },
})
```

Example 2 (typescript):
```typescript
{
  allowedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
}
```

Example 3 (typescript):
```typescript
{
  form: {
    // ... rest of the config
    convertEmptyStringsToNull: true
  },

  json: {
    // ... rest of the config
    convertEmptyStringsToNull: true
  },

  multipart: {
    // ... rest of the config
    convertEmptyStringsToNull: true
  }
}
```

Example 4 (typescript):
```typescript
json: {
  encoding: 'utf-8',
  limit: '1mb',
  strict: true,
  types: [
    'application/json',
    'application/json-patch+json',
    'application/vnd.api+json',
    'application/csp-report',
  ],
  convertEmptyStringsToNull: true,
}
```

---

## Exceptions reference

**URL:** https://docs.adonisjs.com/guides/references/exceptions

**Contents:**
- Exceptions reference
- E_ROUTE_NOT_FOUND
- E_ROW_NOT_FOUND
- E_AUTHORIZATION_FAILURE
- E_TOO_MANY_REQUESTS
- E_BAD_CSRF_TOKEN
- E_OAUTH_MISSING_CODE
- E_OAUTH_STATE_MISMATCH
- E_UNAUTHORIZED_ACCESS
- E_INVALID_CREDENTIALS

In this guide we will go through the list of known exceptions raised by the framework core and the official packages. Some of the exceptions are marked as self-handled. Self-handled exceptions can convert themselves to an HTTP response.

The exception is raised when the HTTP server receives a request for a non-existing route. By default, the client will get a 404 response, and optionally, you may render an HTML page using status pages.

The exception is raised when the database query for finding one item fails [e.g when using Model.findOrFail()]. By default, the client will get a 404 response, and optionally, you may render an HTML page using status pages.

The exception is raised when a bouncer authorization check fails. The exception is self-handled and uses content-negotiation to return an appropriate error response to the client.

The exception is raised by the @adonisjs/rate-limiter package when a request exhausts all the requests allowed during a given duration. The exception is self-handled and uses content-negotiation to return an appropriate error response to the client.

The exception is raised when a form using CSRF protection is submitted without the CSRF token, or the CSRF token is invalid.

The E_BAD_CSRF_TOKEN exception is self-handled, and the user will be redirected back to the form, and you can access the error using the flash messages.

The @adonisjs/ally package raises the exception when the OAuth service does not provide the OAuth code during the redirect.

You can avoid this exception if you handle the errors before calling the .accessToken or .user methods.

The @adonisjs/ally package raises the exception when the CSRF state defined during the redirect is missing.

You can avoid this exception if you handle the errors before calling the .accessToken or .user methods.

The exception is raised when one of the authentication guards is not able to authenticate the request. The exception is self-handled and uses content-negotiation to return an appropriate error response to the client.

The exception is raised when the auth finder is not able to verify the user credentials. The exception is handled and use content-negotiation to return an appropriate error response to the client.

The exception is raised when you attempt to create a URL for a route using the URL builder.

The E_HTTP_EXCEPTION is a generic exception for throwing errors during an HTTP request. You can use this exception directly or create a custom exception extending it.

The E_HTTP_REQUEST_ABORTED is a sub-class of the E_HTTP_EXCEPTION exception. This exception is raised by the response.abort method.

The exception is raised when the length of appKey is smaller than 16 characters. You can use the generate ace command to generate a secure app key.

The exception is raised when the appKey property is not defined inside the config/app.ts file. By default, the value of the appKey is set using the APP_KEY environment variable.

The exception is raised when one or more environment variables fail the validation. The detailed validation errors can be accessed using the error.help property.

The exception is raised when a command does not define the commandName property or its value is an empty string.

The exception is raised by Ace when unable to find a command.

The exception is raised when executing a command without passing a required CLI flag.

The exception is raised when trying to execute a command without providing any value to a non-boolean CLI flag.

The exception is raised when executing a command without defining the required arguments.

The exception is raised when executing a command without defining the value for a required argument.

The exception is raised when executing a command with an unknown CLI flag.

The exception is raised when the value provided for a CLI flag is invalid—for example, passing a string value to a flag that accepts numeric values.

The @adonisjs/redis package raises the exception when you attempt to subscribe to a given pub/sub channel multiple times.

The @adonisjs/redis package raises the exception when you attempt to subscribe to a given pub/sub pattern multiple times.

The exception is raised by the @adonisjs/mail package when unable to send the email using a given transport. Usually, this will happen when the HTTP API of the email service returns a non-200 HTTP response.

You may access the network request error using the error.cause property. The cause property is the error object returned by got (npm package).

The exception is raised by the @adonisjs/session package when the session store is initiated in the read-only mode.

The exception is raised by the @adonisjs/session package when the session store has not been initiated yet. This will be the case when you are not using the session middleware.

**Examples:**

Example 1 (typescript):
```typescript
import { errors } from '@adonisjs/core'
if (error instanceof errors.E_ROUTE_NOT_FOUND) {
  // handle error
}
```

Example 2 (typescript):
```typescript
import { errors as lucidErrors } from '@adonisjs/lucid'
if (error instanceof lucidErrors.E_ROW_NOT_FOUND) {
  // handle error
  console.log(`${error.model?.name || 'Row'} not found`)
}
```

Example 3 (typescript):
```typescript
import { errors as bouncerErrors } from '@adonisjs/bouncer'
if (error instanceof bouncerErrors.E_AUTHORIZATION_FAILURE) {
}
```

Example 4 (typescript):
```typescript
import { errors as limiterErrors } from '@adonisjs/limiter'
if (error instanceof limiterErrors.E_TOO_MANY_REQUESTS) {
}
```

---

## Debugging

**URL:** https://docs.adonisjs.com/guides/basics/debugging

**Contents:**
- Debugging
- Debug using the VSCode debugger
  - Debugging tests
  - Debugging all other Ace commands
  - Debugging Edge templates
- Dump and Die
  - Edge helpers for debugging
  - Dumper settings
- Framework debug logs

In this guide, we will explore multiple ways of debugging your AdonisJS applications, from using the VSCode debugger to using Dump and Die and viewing the debug logs of the framework.

Debugging AdonisJS applications using the VSCode debugger is straightforward. You only need to create a .vscode/launch.json file and use the Node.js debugger.

In the following example, we define a configuration to start the AdonisJS development server in the debug mode and then attach the VSCode debugger to it.

See also: VSCode Debugging Docs

You may define another launch option to run tests in the debug mode.

Defining individual launch options for every ace command is not a practical option. Therefore, you can define an attach configuration within the .vscode/launch.json file.

In attach mode, VSCode will attach its debugger with an already running Node.js process, given the process was started with the --inspect flag from within the VSCode integrated terminal.

Let's start by modifying the .vscode/launch.json file and adding the following configuration to it.

To start debugging in attach mode:

You can debug Edge templates similar to your application code written in TypeScript. However, with Edge, you cannot use the breakpoints provided by VSCode. Instead, you must use the @debugger tag to define an in-code breakpoint.

The debugger will show the compiled output for Edge templates.

Dump and Die (known as dd) is similar to the most loved debugging technique, console.log. However, the dd helper will halt the execution by throwing an exception and displaying the output inside the browser or the terminal.

The output is rendered as an HTML document when you use the dd helper during an HTTP request. Otherwise, the output is displayed within the terminal.

The output of dd slightly differs from what you see when using console.log.

You can use the dd helper within Edge templates via the @dd tag. Additionally, you can use the @dump helper, which doesn't throw an exception and continues rendering the rest of the template.

When using the @dump helper make sure there is an EdgeJS Stack named "dumper" on the page. The script and styles used by the @dump helper will be written to this stack for inclusion in the final HTML output.

You can configure the dumper settings inside the config/app.ts file. This file should export a dumper configuration object, as shown below.

When set to true, the non-enumerable properties of an object will be processed. Default: false

The depth at which to stop parsing nested values. The depth is shared among all tree-like data structures. For example, Objects, Arrays, Maps, and Sets. Default: 5

Inspect prototype properties of an object. The non-enumerable properties of the prototype are included by default. Default: 'unless-plain-object'.

Inspect prototype properties of an Array. Default: false.

Inspect static members of a class. Even though functions and classes are technically the same, this config only applies to functions defined using the [class] keyword. Default: false.

Maximum number of members to process for Arrays, Maps, and Sets. Default: 100.

Maximum number of characters to display for a string. Default: 1000.

An array of object constructor names that should not be further inspected.

You can view the framework debug logs using the NODE_DEBUG environment variable. The NODE_DEBUG flag is supported by the Node.js runtime, and you may use it to view logs for one or more modules using the module name.

For example, you can view logs for all AdonisJS packages using the NODE_DEBUG="adonisjs:*" value.

Similarly, you may use the NODE_DEBUG environment variable to view logs from the Node.js native modules like fs, net, module, and so on.

**Examples:**

Example 1 (json):
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Dev server",
      "program": "${workspaceFolder}/ace.js",
      "args": ["serve", "--hmr"],
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

Example 2 (json):
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Dev server",
      "program": "${workspaceFolder}/ace.js",
      "args": ["serve", "--hmr"],
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Tests",
      "program": "${workspaceFolder}/ace.js",
      "args": ["test", "--watch"],
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

Example 3 (json):
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach Program",
      "port": 9229,
      "autoAttachChildProcesses": true,
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Dev server",
      "program": "${workspaceFolder}/ace.js",
      "args": ["serve", "--hmr"],
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Tests",
      "program": "${workspaceFolder}/ace.js",
      "args": ["test", "--watch"],
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

Example 4 (unknown):
```unknown
node --inspect ace migration:run
```

---

## Validation

**URL:** https://docs.adonisjs.com/guides/basics/validation

**Contents:**
- Validation
- Choosing the validation library
- Configuring VineJS
- Using validators
  - Creating validators
  - Using validators inside controllers
- Error handling
- The request.validateUsing method
  - Validating cookies, headers and route params
- Passing metadata to validators

The data validation in AdonisJS is usually performed at the controller level. This ensures you validate the user input as soon as your application handles the request and send errors in the response that can be displayed next to the form fields.

Once the validation is completed, you can use the trusted data to perform the rest of the operations, like database queries, scheduling queue jobs, sending emails, etc.

The AdonisJS core team has created a framework agnostic data validation library called VineJS. Following are some of the reasons for using VineJS.

It is one of the fastest validation libraries in the Node.js ecosystem.

Provides static type safety alongside the runtime validations.

It comes pre-configured with the web and the api starter kits.

Official AdonisJS packages extend VineJS with custom rules. For example, Lucid contributes unique and exists rules to VineJS.

However, AdonisJS does not technically force you to use VineJS. You can use any validation library that fits great for you or your team. Just uninstall the @vinejs/vine package and install the package you want to use.

Install and configure VineJS using the following command.

See also: VineJS documentation

Installs the @vinejs/vine package using the detected package manager.

Registers the following service provider inside the adonisrc.ts file.

VineJS uses the concept of validators. You create one validator for each action your application can perform. For example: Define a validator for creating a new post, another for updating the post, and maybe a validator for deleting a post.

We will use a blog as an example and define validators to create/update a post. Let's start by registering a couple of routes and the PostsController.

Once you have created the PostsController and defined the routes, you may use the following ace command to create a validator.

See also: Make validator command

The validators are created inside the app/validators directory. The validator file is empty by default, and you can use it to export multiple validators from it. Each validator is a const variable holding the result of vine.compile method.

In the following example, we define createPostValidator and updatePostValidator. Both validators have a slight variation in their schemas. During creation, we allow the user to provide a custom slug for the post, whereas we disallow updating it.

Do not worry too much about the duplication within the validator schemas. We recommend you opt for easy-to-understand schemas vs. avoiding duplication at all costs. The wet codebase analogy might help you embrace duplication.

Let's go back to the PostsController and use the validators to validate the request body. You can access the request body using the request.all() method.

That is all! Validating the user input is two lines of code inside your controllers. The validated output has static-type information inferred from the schema.

Also, you do not have to wrap the validate method call inside a try/catch. Because in the case of an error, AdonisJS will automatically convert the error to an HTTP response.

The HttpExceptionHandler will convert the validation errors to an HTTP response automatically. The exception handler uses content negotiation and returns a response based upon the Accept header value.

You might want to peek through the ExceptionHandler codebase and see how the validation exceptions are converted to an HTTP response.

Also, the session middleware overwrites the renderValidationErrorAsHTML method and uses flash messages to share the validation errors with the form.

HTTP requests with Accept=application/json header will receive an array of error messages created using the SimpleErrorReporter.

HTTP requests with Accept=application/vnd.api+json header will receive an array of error messages formatted as per the JSON API spec.

Server rendered forms using the session package will receive the errors via session flash messages.

All other requests will receive errors back as plain text.

The recommended way to perform validations inside controllers is to use the request.validateUsing method. When using request.validateUsing method, you do not have do define the validation data explicitly; the request body, query string values, and the files are merged together and passed as data to the validator.

When using the request.validateUsing method you can validate cookies, headers and route params as follows.

Since validators are defined outside the request lifecycle, they do not have direct access to the request data. This is usually good because it makes validators reusable outside an HTTP request lifecycle.

However, if a validator needs access to some runtime data, you must pass it as metadata during the validate method call.

Let's take an example of the unique validation rule. We want to ensure the user email is unique in the database but skip the row for the currently logged-in user.

In the above example, we access the currently logged-in user via the meta.userId property. Let's see how we can pass the userId during an HTTP request.

In the previous example, we must remember to pass the meta.userId during the validation. It would be great if we could make TypeScript remind us of the same.

In the following example, we use the vine.withMetaData function to define the static type of the metadata we expect to use in our schema.

Do note, VineJS does not validate the metadata at runtime. However, if you want to do that, you can pass a callback to the withMetaData method and perform the validation manually.

You may create a preload file inside the start directory to configure VineJS with custom error messages or use a custom error reporter.

In the following example, we define custom error messages.

In the following example, we register a custom error reporter.

Following is the list of VineJS rules contributed by AdonisJS.

**Examples:**

Example 1 (unknown):
```unknown
node ace add vinejs
```

Example 2 (typescript):
```typescript
{
  providers: [
    // ...other providers
    () => import('@adonisjs/core/providers/vinejs_provider')
  ]
}
```

Example 3 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

const PostsController = () => import('#controllers/posts_controller')

router.post('posts', [PostsController, 'store'])
router.put('posts/:id', [PostsController, 'update'])
```

Example 4 (sql):
```sql
node ace make:controller post store update
```

---

## Response

**URL:** https://docs.adonisjs.com/guides/basics/response

**Contents:**
- Response
- Sending response
- Streaming content
- Downloading files
  - Force downloading files
- Setting response status and headers
  - Setting status
  - Setting headers
  - X-Request-Id header
- Redirects

An instance of the response class is used to respond to HTTP requests. AdonisJS supports sending HTML fragments, JSON objects, streams, and much more. The response instance can be accessed using the ctx.response property.

The simplest way to send a response is to return a value from the route handler.

Along with returning a value from the route handler, you can use the response.send method to explicitly set the response body. However, calling the response.send method multiple times will overwrite the old body and only keep the latest one.

A custom status code for the response can be set using the response.status method.

The response.stream method allows piping a stream to the response. The method internally destroys the stream after it finishes.

The response.stream method does not set the content-type and the content-length headers; you must set them explicitly before streaming the content.

A 500 status code is sent to the client in case of an error. However, you can customize the error code and message by defining a callback as the second parameter.

We recommend using the response.download method over the response.stream method when you want to stream files from the disk. This is because the download method automatically sets the content-type and the content-length headers.

Optionally, you can generate an Etag for the file contents. Using Etags will help the browser re-use the cached response from the previous request (if any).

Similar to the response.stream method, you can send a custom error message and status code by defining a callback as the last parameter.

The response.attachment method is similar to the response.download method, but it forces the browsers to save the file on the user's computer by setting the Content-Disposition header.

You may set the response status using the response.status method. Calling this method will override the existing response status (if any). However, you may use the response.safeStatus method to set the status only when it is undefined.

You may set the response headers using the response.header method. This method overrides the existing header value (if it already exists). However, you may use the response.safeHeader method to set the header only when it is undefined.

You can use the response.append method to append values to existing header values.

The response.removeHeader method removes the existing header.

If the header exists in the current request or if Generating request ids is enabled, the header will be present in the response.

The response.redirect method returns an instance of the Redirect class. The redirect class uses fluent API to construct the redirect URL.

The simplest way to perform a redirect is to call the redirect.toPath method with the redirection path.

The redirect class also allows constructing a URL from a pre-registered route. The redirect.toRoute method accepts the route identifier as the first parameter and the route params as the second parameter.

You might want to redirect the user to the previous page during form submissions in case of validation errors. You can do that using the redirect.back method.

The default status for redirect responses is 302; you can change it by calling the redirect.status method.

You can use the withQs method to append a query string to the redirect URL. The method accepts an object of a key-value pair and converts it to a string.

To forward the query string from the current request URL, call the withQs method without any parameters.

When redirecting back to the previous page, the withQs method will forward the query string of the previous page.

You may use the response.abort method to end the request by raising an exception. The method will throw an E_HTTP_REQUEST_ABORTED exception and trigger the exception handling flow.

By default, the exception will create an HTTP response with a 400 status code. However, you can specify a custom status code as the second parameter.

You may listen for the event when Node.js finishes writing the response to the TCP socket using the response.onFinish method. Under the hood, we use the on-finished package, so feel free to consult the package README file for an in-depth technical explanation.

You can access the Node.js res object using the response.response property.

The response body set using the response.send method gets serialized to a string before it is written as response to the outgoing message stream.

Following is the list of supported data types and their serialization rules.

After serializing the response, the response class automatically infers and sets the content-type and the content-length headers.

Following is the list of rules we follow to set the content-type header.

You can add custom properties to the Response class using macros or getters. Make sure to read the extending AdonisJS guide first if you are new to the concept of macros.

Since the macros and getters are added at runtime, you must inform TypeScript about their types.

**Examples:**

Example 1 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  /** Plain string */
  return 'This is the homepage.'

  /** Html fragment */
  return '<p> This is the homepage </p>'

  /** JSON response */
  return { page: 'home' }

  /** Converted to ISO string */
  return new Date()
})
```

Example 2 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.get('/', async ({ response }) => {
  /** Plain string */
  response.send('This is the homepage')

  /** Html fragment */
  response.send('<p> This is the homepage </p>')

  /** JSON response */
  response.send({ page: 'home' })

  /** Converted to ISO string */
  response.send(new Date())
})
```

Example 3 (typescript):
```typescript
response.status(200).send({ page: 'home' })

// Send empty 201 response
response.status(201).send('')
```

Example 4 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.get('/', async ({ response }) => {
  const image = fs.createReadStream('./some-file.jpg')
  response.stream(image)
})
```

---

## File uploads

**URL:** https://docs.adonisjs.com/guides/basics/file-uploads

**Contents:**
- File uploads
- Access user-uploaded files
- Manually validating files
- Using validator to validate files
- Moving files to a persistent location
  - File properties
- Serving files
- Using Drive to upload and serve files
- Advanced - Self-processing multipart stream
  - Error handling

AdonisJS has first-class support for processing user-uploaded files sent using the multipart/form-data content type. The files are auto-processed using the bodyparser middleware and saved inside your operating system's tmp directory.

Later, inside your controllers, you may access the files, validate them and move them to a persistent location or a cloud storage service like S3.

You may access the user-uploaded files using the request.file method. The method accepts the field name and returns an instance of MultipartFile.

If a single input field is used to upload multiple files, you may access them using the request.files method. The method accepts the field name and returns an array of MultipartFile instances.

You may validate files using the validator or define the validation rules via the request.file method.

In the following example, we will define the validation rules inline via the request.file method and use the file.errors property to access the validation errors.

When working with an array of files, you can iterate over files and check if one or more files have failed the validation.

The validation options provided to the request.files method are applied to all files. In the following example, we expect each file to be under 2mb and must have one of the allowed file extensions.

Instead of validating files manually (as seen in the previous section), you may use the validator to validate files as part of the validation pipeline. You do not have to manually check for errors when using the validator; the validation pipeline takes care of that.

An array of files can be validated using the vine.array type. For example:

By default, the user-uploaded files are saved in your operating system's tmp directory and may get deleted as your computer cleans up the tmp directory.

Therefore, it is recommended to store files in a persistent location. You may use the file.move to move a file within the same filesystem. The method accepts an absolute path to the directory to move the file.

It is recommended to provide a unique random name to the moved file. For this, you may use the cuid helper.

Once the file has been moved, you may store its name inside the database for later reference.

Following is the list of properties you may access on the MultipartFile instance.

If you have persisted user-uploaded files in the same filesystem as your application code, you may serve files by creating a route and using the response.download method.

Drive is a file system abstraction created by the AdonisJS core team. You may use Drive to manage user-uploaded files and store them inside the local file system or move them to a cloud storage service like S3 or GCS.

We recommend using Drive over manually uploading and serving files. Drive handles many security concerns like path traversal and offers a unified API across multiple storage providers.

Learn more about Drive

You can turn off the automatic processing of multipart requests and self-process the stream for advanced use cases. Open the config/bodyparser.ts file and change one of the following options to disable auto-processing.

Once you have disabled the auto-processing, you can use the request.multipart object to process individual files.

In the following example, we use the stream.pipeline method from Node.js to process the multipart readable stream and write it to a file on the disk. However, you can stream this file to some external service like s3.

The multipart.onFile method accepts the input field name for which you want to process the files. You can use the wildcard * to process all the files.

The onFile listener receives the part (readable stream) as the first parameter and a reporter function as the second parameter.

The reporter function is used to track the stream progress so that AdonisJS can provide you access to the processed bytes, file extension, and other meta-data after the stream has been processed.

Finally, you can return an object of properties from the onFile listener, and they will be merged with the file object you access using the request.file or request.allFiles() methods.

You must listen to the error event on the part object and handle the errors manually. Usually, the stream reader (the writeable stream) will internally listen for this event and abort the write operation.

AdonisJS allows you to validate the stream parts (aka files) even when you process the multipart stream manually. In case of an error, the error event is emitted on the part object.

The multipart.onFile method accepts the validation options as the second parameter. Also, make sure to listen for the data event and bind the reporter method to it. Otherwise, no validations will occur.

**Examples:**

Example 1 (typescript):
```typescript
import { HttpContext } from '@adonisjs/core/http'

export default class UserAvatarsController {
  update({ request }: HttpContext) {
    const avatar = request.file('avatar')
    console.log(avatar)
  }
}
```

Example 2 (typescript):
```typescript
import { HttpContext } from '@adonisjs/core/http'

export default class InvoicesController {
  update({ request }: HttpContext) {
    const invoiceDocuments = request.files('documents')
    
    for (let document of invoiceDocuments) {
      console.log(document)
    }
  }
}
```

Example 3 (typescript):
```typescript
const avatar = request.file('avatar', {
  size: '2mb',
  extnames: ['jpg', 'png', 'jpeg']
})

if (!avatar.isValid) {
  return response.badRequest({
    errors: avatar.errors
  })
}
```

Example 4 (typescript):
```typescript
const invoiceDocuments = request.files('documents', {
  size: '2mb',
  extnames: ['jpg', 'png', 'pdf']
})

/**
 * Creating a collection of invalid documents
 */
let invalidDocuments = invoiceDocuments.filter((document) => {
  return !document.isValid
})

if (invalidDocuments.length) {
  /**
   * Response with the file name and errors next to it
   */
  return response.badRequest({
    errors: invalidDocuments.map((document) => {
      name: document.clientName,
      errors: document.errors,
    })
  })
}
```

---

## HTTP tests

**URL:** https://docs.adonisjs.com/guides/testing/http-tests

**Contents:**
- HTTP tests
- Setup
  - Registering the plugin
- Basic example
- Open API testing
  - Registering schema
  - Writing assertions
- Reading/writing cookies
  - Reading cookies from the response
- Populating session store

HTTP tests refer to testing your application endpoints by making an actual HTTP request against them and asserting the response body, headers, cookies, session, etc.

HTTP tests are performed using the API client plugin of Japa. The API client plugin is a stateless request library similar to Axios or fetch but more suited for testing.

If you want to test your web apps inside a real browser and interact with them programmatically, we recommend using the Browser client that uses Playwright for testing.

The first step is to install the following packages from the npm packages registry.

Before moving forward, register the plugin inside the tests/bootstrap.ts file.

The apiClient method optionally accepts the baseURL for the server. If not provided, it will use the HOST and the PORT environment variables.

Once the apiClient plugin is registered, you may access the client object from TestContext to make an HTTP request.

The HTTP tests must be written inside the folder configured for the functional tests suite. You may use the following command to create a new test file.

To view all the available request and assertion methods, make sure to go through the Japa documentation.

The assertion and API client plugins allow you to use Open API spec files for writing assertions. Instead of manually testing the response against a fixed payload, you may use a spec file to test the shape of the HTTP response.

It is a great way to keep your Open API spec and server responses in sync. Because if you remove a certain endpoint from the spec file or change the response data shape, your tests will fail.

AdonisJS does not offer tooling for generating Open API schema files from code. You may write it by hand or use graphical tools to create it.

Once you have a spec file, save it inside the resources directory (create the directory if missing) and register it with the openapi-assertions plugin within the tests/bootstrap.ts file.

Once the schema is registered, you can use the response.assertAgainstApiSpec method to assert against the API spec.

Only the response's shape is tested, not the actual values. Therefore, you may have to write additional assertions. For example:

You may send cookies during the HTTP request using the withCookie method. The method accepts the cookie name as the first argument and the value as the second.

The withCookie method defines a signed cookie. In addition, you may use the withEncryptedCookie or withPlainCookie methods to send other types of cookies to the server.

You may access the cookies set by your AdonisJS server using the response.cookies method. The method returns an object of cookies as a key-value pair.

You may use the response.cookie method to access a single cookie value by its name. Or use the assertCookie method to assert the cookie value.

If you are using the @adonisjs/session package to read/write session data in your application, you may also want to use the sessionApiClient plugin to populate the session store when writing tests.

The first step is registering the plugin inside the tests/bootstrap.ts file.

And then, update the .env.test file (create one if it is missing) and set the SESSON_DRIVER to memory.

You may use the withSession method on the Japa API client to make an HTTP request with some pre-defined session data.

The withSession method will create a new session ID and populate the memory store with the data, and your AdonisJS application code can read the session data as usual.

After the request finishes, the session ID and its data will be destroyed.

Like the withSession method, you may use the withFlashMessages method to set flash messages when making an HTTP request.

You may access the session data set by your AdonisJS server using the response.session() method. The method returns the session data as an object of a key-value pair.

You may read flash messages from the response using the response.flashMessage or response.flashMessages method.

Finally, you may write assertions for the session data using one of the following methods.

If you use the @adonisjs/auth package to authenticate users in your application, you may use the authApiClient Japa plugin to authenticate users when making HTTP requests to your application.

The first step is registering the plugin inside the tests/bootstrap.ts file.

If you are using session-based authentication, make sure to also set up the session plugin. See Populating session store - Setup.

That's all. Now, you may login users using the loginAs method. The method accepts the user object as the only argument and marks the user as logged in for the current HTTP request.

The loginAs method uses the default guard configured inside the config/auth.ts file for authentication. However, you may specify a custom guard using the withGuard method. For example:

If forms in your application use CSRF protection, you may use the withCsrfToken method to generate a CSRF token and pass it as a header during the request.

Before using the withCsrfToken method, register the following Japa plugins inside the tests/bootstrap.ts file and also make sure to switch the SESSION_DRIVER env variable to memory.

You may use the route helper from the TestContext to create a URL for a route. Using the route helper ensures that whenever you update your routes, you do not have to come back and fix all the URLs inside your tests.

The route helper accepts the same set of arguments accepted by the global template method route.

**Examples:**

Example 1 (python):
```python
npm i -D @japa/api-client
```

Example 2 (typescript):
```typescript
import { apiClient } from '@japa/api-client'

export const plugins: Config['plugins'] = [
  assert(),
  apiClient(),
  pluginAdonisJS(app),
]
```

Example 3 (typescript):
```typescript
import env from '#start/env'

export const plugins: Config['plugins'] = [
  apiClient({
    baseURL: `http://${env.get('HOST')}:${env.get('PORT')}`
  })
]
```

Example 4 (unknown):
```unknown
node ace make:test users/list --suite=functional
```

---
