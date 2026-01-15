# Adonisjs - Concepts

**Pages:** 17

---

## TypeScript build process

**URL:** https://docs.adonisjs.com/guides/concepts/typescript-build-process

**Contents:**
- TypeScript build process
- Executing TypeScript files without compilation
  - A note on file extensions
- Running the development server
  - Passing options to the Node.js commandline
- Creating production build
  - What is a standalone build?

Applications written in TypeScript must be compiled into JavaScript before you can run them in production.

Compiling TypeScript source files can be performed using many different build tools. However, with AdonisJS, we stick to the most straightforward approach and use the following time-tested tools.

All the below-mentioned tools come pre-installed as development dependencies with official starter kits.

TSC is the TypeScript's official compiler. We use TSC to perform type-checking and create the production build.

TS Node Maintained is a Just-in-Time compiler for TypeScript. It allows you to execute TypeScript files without compiling them to JavaScript and proves to be a great tool for development.

SWC is a TypeScript compiler written in Rust. We use it during development with TS Node to make the JIT process extremely fast.

You may execute the TypeScript files without compiling them using the ts-node-maintained/register/esm hook. For example, you may start the HTTP server by running the following command.

--import: The import flag allows you to specify a module that exports customization hooks for module resolution and loading. For more information refer to the Node.js customization hooks documentation.

ts-node-maintained/register/esm: The path to the ts-node-maintained/register/esm script that registers lifecycle hooks to perform Just-in-Time compilation of TypeScript source to JavaScript.

bin/server.js: The path to the AdonisJS HTTP server entry point file. See also: A note on file extensions

You may repeat this process for other TypeScript files as well. For example:

You might have noticed us using the .js file extension everywhere, even though the file on disk is saved with the .ts file extension.

This is because, with ES modules, TypeScript forces you to use the .js extension in imports and when running scripts. You can learn about the thesis behind this choice in TypeScript documentation.

If you are using TypeScript 5.7 or later, you can import TypeScript files using the .ts extension. This is made possible by the path rewriting for relative paths feature.

Since some runtimes allow you to run TypeScript code "in-place" and require the .ts extension, you may prefer to already use .ts extension for future compatibility.

Instead of running the bin/server.js file directly, we recommend using the serve command for the following reasons.

You may pass arguments to the Vite dev server using the --assets-args command line flag.

You may use the --no-assets flag to disable the Vite dev server.

The serve command starts the development server (bin/server.ts file) as a child process. If you want to pass node arguments to the child process, you can define them before the command name.

The production build of your AdonisJS application is created using the node ace build command. The build command performs the following operations to create a standalone JavaScript application inside the ./build directory.

Any modifications to the ace.js file will be lost during the build process since the file is rewritten from scratch. If you want to have any additional code that runs before Ace starts, you should instead do it inside the bin/console.ts file.

Once the build has been created, you can cd into the build folder, install production dependencies, and run your application.

You may pass arguments to the Vite build command using the --assets-args command line flag.

You may use the --no-assets flag to avoid compiling the frontend assets.

Standalone build refers to the JavaScript output of your application that you can run without the original TypeScript source.

Creating a standalone build helps reduce the size of the code you deploy on your production server, as you do not have to copy both the source files and the JavaScript output.

After creating the production build, you can copy the ./build to your production server, install dependencies, define environment variables, and run the application.

**Examples:**

Example 1 (unknown):
```unknown
node --import=ts-node-maintained/register/esm bin/server.js
```

Example 2 (unknown):
```unknown
node --import=ts-node-maintained/register/esm bin/test.ts
```

Example 3 (unknown):
```unknown
node --import=ts-node-maintained/register/esm bin/console.ts
```

Example 4 (unknown):
```unknown
node --import=ts-node-maintained/register/esm path/to/file.ts
```

---

## HTTP overview

**URL:** https://docs.adonisjs.com/guides/concepts/http-overview

**Contents:**
- HTTP overview
- The HTTP layer
- How AdonisJS boots the HTTP server
- HTTP request lifecycle

AdonisJS is primarily a web framework to create applications that respond to HTTP requests. In this guide, we will learn how AdonisJS boots the HTTP server, handles the incoming requests, and the modules available at the HTTP layer.

The HTTP layer inside an AdonisJS application consists of the following modules. It is worth mentioning that the AdonisJS HTTP layer is built from scratch and does not use any microframework under the hood.

The router module is responsible for defining the endpoints of your application, which are known as routes. A route should define a handler responsible for handling the request. The handler can be a closure or reference to a controller.

Controllers are JavaScript classes that you bind to a route to handle the HTTP requests. Controllers act as an organization layer and help you divide the business logic of your application inside different files/classes.

AdonisJS creates an instance of the HttpContext class for every incoming HTTP request. The HttpContext (aka ctx) carries the information like the request body, headers, authenticated user, etc, for a given request.

The middleware pipeline in AdonisJS is an implementation of Chain of Responsibility design pattern. You can use middleware to intercept HTTP requests and respond to them before they reach the route handler.

Global Exception handler

The global exception handler handles exceptions raised during an HTTP request at a central location. You can use the global exception handler to convert exceptions to an HTTP response or report them to an external logging service.

The server module wires up the router, middleware, the global exception handler and exports a handle function you can bind to the Node.js HTTP server to handle requests.

The HTTP server is booted once you call the boot method on the Server class. Under the hood, this method performs the following actions.

In a typical AdonisJS application, the boot method is called by the Ignitor module within the bin/server.ts file.

Also, it is essential to define the routes, middleware, and the global exception handler before the boot method is called, and AdonisJS achieves that using the start/routes.ts and start/kernel.ts preload files.

Now that we have an HTTP server listening for incoming requests. Let's see how AdonisJS handles a given HTTP request.

See also: Middleware execution flow Middleware and exception handling

As the first step, the server module creates an instance of the HttpContext class and passes it as a reference to the middleware, route handlers, and the global exception handler.

If you have enabled the AsyncLocalStorage, then the same instance is shared as the local storage state.

Next, the middleware from the server middleware stack are executed. These middleware can intercept and respond to the request before it reaches the route handler.

Also, every HTTP request goes through the server middleware stack, even if you have not defined any router for the given endpoint. This allows server middleware to add functionality to an app without relying on the routing system.

If a server middleware does not end the request, we look for a matching route for the req.url property. The request is aborted with a 404 - Not found exception when no matching route exists. Otherwise, we continue with the request.

Once there is a matching route, we execute the router global middleware and the named middleware stack. Again, middleware can intercept the request before it reaches the route handler.

As the final step, the request reaches the route handler and returns to the client with a response.

Suppose an exception is raised during any step in the process. In that case, the request will be handed over to the global exception handler, which is responsible for converting the exception to a response.

Once you define the response body using the response.send method or by returning a value from the route handler, we begin the response serialization process and set the appropriate headers.

Learn more about response body serialization

Hot module replacement

---

## HTTP context

**URL:** https://docs.adonisjs.com/guides/concepts/http-context

**Contents:**
- HTTP context
- Getting access to the HTTP context
  - Route handler
  - Controller method
  - Middleware class
  - Exception handler class
- Injecting HTTP Context using Dependency Injection
- Accessing HTTP context from anywhere inside your application
- HTTP Context properties
- Extending HTTP context

A new instance of HTTP Context class is generated for every HTTP request and passed along to the route handler, middleware, and exception handler.

HTTP Context holds all the information you may need related to an HTTP request. For example:

In a nutshell, the context is a request-specific store holding all the information for the ongoing request.

The HTTP context is passed by reference to the route handler, middleware, and exception handler, and you can access it as follows.

The router handler receives the HTTP context as the first parameter.

The controller method (similar to the router handler) receives the HTTP context as the first parameter.

The handle method of the middleware class receives HTTP context as the first parameter.

The handle and the report methods of the global exception handler class receive HTTP context as the second parameter. The first parameter is the error property.

If you use Dependency injection throughout your application, you can inject the HTTP context to a class or a method by type hinting the HttpContext class.

Ensure the #middleware/container_bindings_middleware middleware is registered inside the start/kernel.ts file. This middleware is required to resolve request-specific values (i.e., the HttpContext class) from the container.

See also: IoC container guide

For automatic dependency resolution to work, you must inject the UserService inside your controller. Remember, the first argument to a controller method will always be the context, and the rest will be injected using the IoC container.

That's all! The UserService will now automatically receive an instance of the ongoing HTTP request. You can repeat the same process for nested dependencies as well.

Dependency injection is one way to accept the HTTP context as a class constructor or a method dependency and then rely on the container to resolve it for you.

However, it is not a hard requirement to restructure your application and use Dependency injection everywhere. You can also access the HTTP context from anywhere inside your application using the Async local storage provided by Node.js.

We have a dedicated guide on how Async local storage works and how AdonisJS uses it to provide global access to the HTTP context.

In the following example, the UserService class uses the HttpContext.getOrFail method to get the HTTP context instance for the ongoing request.

The following code block shows the UserService class usage inside the UsersController.

Following is the list of properties you can access through the HTTP context. As you install new packages, they may add additional properties to the context.

Reference to an instance of the HTTP Request class.

Reference to an instance of the HTTP Response class.

Reference to an instance of logger created for a given HTTP request.

The matched route for the current HTTP request. The route property is an object of type StoreRouteNode

An object of route params

An object of route subdomains. Only exists when the route is part of a dynamic subdomain

Reference to an instance of Session created for the current HTTP request.

Reference to an instance of the Authenticator class. Learn more about authentication.

Reference to an instance of Edge renderer. Learn more about Edge in View and templates guide

Reference to an instance of the Ally Manager class to implement social login in your apps. Learn more about Ally

Reference to an instance of the Bouncer class. Learn more about Authorization.

Reference to an instance of the I18n class. Learn more about i18n in Internationalization guide.

You may add custom properties to the HTTP context class using macros or getters. Make sure to read the extending AdonisJS guide first if you are new to the concept of macros.

Since the macros and getters are added at runtime, you must inform TypeScript about their types using module augmentation.

You may use the testUtils service to create a dummy HTTP context during tests.

The context instance is not attached to any route; therefore, the ctx.route and ctx.params values will be undefined. However, you can manually assign these properties if required by the code under test.

By default, the createHttpContext method uses fake values for the req and the res objects. However, you can define custom values for these properties as shown in the following example.

The testUtils service is only available inside an AdonisJS application; therefore, if you are building a package and need access to a fake HTTP context, you may use the HttpContextFactory class.

**Examples:**

Example 1 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.get('/', (ctx) => {
  console.log(ctx.inspect())
})
```

Example 2 (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.get('/', ({ request, response }) => {
  console.log(request.url())
  console.log(request.headers())
  console.log(request.qs())
  console.log(request.body())
  
  response.send('hello world')
  response.send({ hello: 'world' })
})
```

Example 3 (typescript):
```typescript
import { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async index({ request, response }: HttpContext) {
  }
}
```

Example 4 (typescript):
```typescript
import { HttpContext } from '@adonisjs/core/http'

export default class AuthMiddleware {
  async handle({ request, response }: HttpContext) {
  }
}
```

---

## AdonisRC file

**URL:** https://docs.adonisjs.com/guides/concepts/adonisrc-file

**Contents:**
- AdonisRC file
- typescript
- directories
- preloads
- metaFiles
- commands
- commandsAliases
- tests
- providers
- assetsBundler

The adonisrc.ts file is used to configure the workspace settings of your application. In this file, you can register providers, define command aliases, specify the files to copy to the production build, and much more.

The adonisrc.ts file is imported by tools other than your AdonisJS application. Therefore, you must not write any application specific code or environment specific conditionals in this file.

The file contains the minimum required configuration to run your application. However, you can view the complete file contents by running the node ace inspect:rcfile command.

You can access the parsed RCFile contents using the app service.

The typescript property informs the framework and the Ace commands that your application uses TypeScript. Currently, this value is always set to true. However, we will later allow applications to be written in JavaScript.

A set of directories and their paths used by the scaffolding commands. If you decide to rename specific directories, update their new path inside the directories object to notify scaffolding commands.

An array of files to import at the time of booting the application. The files are imported immediately after booting the service providers.

You can define the environment in which to import the file. The valid options are:

You can create and register a preload file using the node ace make:preload command.

The metaFiles array is a collection of files you want to copy to the build folder when creating the production build.

These are non-TypeScript/JavaScript files that must exist in the production build for your application to work. For example, the Edge templates, i18n language files, etc.

An array of functions to lazy import ace commands from installed packages. Your applications commands will be imported automatically and hence you do not have to register them explicitly.

See also: Creating ace commands

A key-value pairs of command aliases. This is usually to help you create memorable aliases for the commands that are harder to type or remember.

See also: Creating command aliases

You can also define multiple aliases for the same command.

The tests object registers the test suites and some of the global settings for the test runner.

See also: Introduction to testing

An array of service providers to load during the application boot phase.

By default, the providers are loaded in all the environments. However, you can also define an explicit array of environments to import the provider.

Providers are loaded in the same order as registered inside the providers array.

See also: Service providers

The serve and build command attempt to detect the assets used by your application to compile the frontend assets.

The detection is performed for vite by searching for the vite.config.js file and Webpack encore by searching for the webpack.config.js file.

However, if you use a different assets bundler, you can configure it inside the adonisrc.ts file as follows.

**Examples:**

Example 1 (unknown):
```unknown
node ace inspect:rcfile
```

Example 2 (typescript):
```typescript
import app from '@adonisjs/core/services/app'

console.log(app.rcFile)
```

Example 3 (typescript):
```typescript
{
  directories: {
    config: 'config',
    commands: 'commands',
    contracts: 'contracts',
    public: 'public',
    providers: 'providers',
    languageFiles: 'resources/lang',
    migrations: 'database/migrations',
    seeders: 'database/seeders',
    factories: 'database/factories',
    views: 'resources/views',
    start: 'start',
    tmp: 'tmp',
    tests: 'tests',
    httpControllers: 'app/controllers',
    models: 'app/models',
    services: 'app/services',
    exceptions: 'app/exceptions',
    mails: 'app/mails',
    middleware: 'app/middleware',
    policies: 'app/policies',
    validators: 'app/validators',
    events: 'app/events',
    listeners: 'app/listeners',
    stubs: 'stubs',
  }
}
```

Example 4 (typescript):
```typescript
{
  preloads: [
    () => import('./start/view.js')
  ]
}
```

---

## Application lifecycle

**URL:** https://docs.adonisjs.com/guides/concepts/application-lifecycle

**Contents:**
- Application lifecycle
- How an AdonisJS application gets started
- The boot phase
- The start phase
  - During the web environment
  - During the test environment
  - During the console environment
- The termination phase
  - Responding to process signals
  - During the web environment

In this guide, we will learn how AdonisJS boots your application and what lifecycle hooks you can use to change the application state before it is considered ready.

The lifecycle of an application depends upon the environment in which it is running. For example, a long-lived process started to serve HTTP requests is managed differently from a short-lived ace command.

So, let's understand the application lifecycle for every supported environment.

An AdonisJS application has multiple entry points, and each entry point boots the application in a specific environment. The following entrypoint files are stored inside the bin directory.

If you open any of these files, you will find us using the Ignitor module to wire things up and then start the application.

The Ignitor module encapsulates the logic of starting an AdonisJS application. Under the hood, it performs the following actions.

The Ignitor codebase is relatively straightforward, so browse the source code to understand it better.

The boot phase remains the same for all the environments except the console environment. In the console environment, the executed command decides whether to boot the application.

You can only use the container bindings and services once the application is booted.

The start phase varies between all the environments. Also, the execution flow is further divided into the following sub-phases

The pre-start phase refers to the actions performed before starting the app.

The post-start phase refers to the actions performed after starting the app. In the case of an HTTP server, the actions will be executed after the HTTP server is ready to accept new connections.

In the web environment, a long-lived HTTP connection is created to listen for incoming requests, and the application stays in the ready state until the server crashes or the process receives a signal to shut down.

The pre-start and the post-start actions are executed in the test environment. After that, we import the test files and execute the tests.

In the console environment, the executed command decides whether to start the application.

A command can start the application by enabling the options.startApp flag. As a result, the pre-start and the post-start actions will run before the command's run method.

The termination of the application varies greatly between short-lived and long-lived processes.

A short-lived command or the test process begins the termination after the main operation ends.

A long-lived HTTP server process waits for exit signals like SIGTERM to begin the termination process.

In all the environments, we begin a graceful shutdown process when the application receives a SIGTERM signal. If you have started your application using pm2, the graceful shutdown will happen after receiving the SIGINT event.

In the web environment, the application keeps running until the underlying HTTP server crashes with an error. In that case, we begin terminating the app.

The graceful termination begins after all the tests have been executed.

In the console environment, the termination of the app depends on the executed command.

The app will terminate as soon as the command is executed unless the options.staysAlive flag is enabled, and in this case, the command should explicitly terminate the app.

Lifecycle hooks allow you to hook into the application bootstrap process and perform actions as the app goes through different states.

You can listen for hooks using the service provider classes or define them inline on the application class.

You should register lifecycle hooks as soon as an application instance is created.

The entry point files bin/server.ts, bin/console.ts, and bin/test.ts creates a fresh application instance for different environments, and you can register inline callbacks within these files.

initiating: The hook actions are called before the application moves to the initiated state. The adonisrc.ts file is parsed after executing the initiating hooks.

booting: The hook actions are called before booting the app. The config files are imported after executing booting hooks.

booted: The hook actions are invoked after all the service providers have been registered and booted.

starting: The hook actions are invoked before importing the preload files.

ready: The hook actions are invoked after the application is ready.

terminating: The hook actions are invoked once the graceful exit process begins. For example, this hook can close database connections or end open streams.

Services providers define the lifecycle hooks as methods in the provider class. We recommend using service providers over inline callbacks, as they keep everything neatly organized.

Following is the list of available lifecycle methods.

register: The register method registers bindings within the container. This method is synchronous by design.

boot: The boot method is used to boot or initialize the bindings you have registered inside the container.

start: The start method runs just before the ready method. It allows you to perform actions that the ready hook actions might need.

ready: The ready method runs after the application is considered ready.

shutdown: The shutdown method is invoked when the application begins the graceful shutdown. You can use this method to close database connections, or end opened streams.

**Examples:**

Example 1 (typescript):
```typescript
import { BaseCommand } from '@adonisjs/core/ace'

export default class GreetCommand extends BaseCommand {
  static options = {
    startApp: true
  }
  
  async run() {
    console.log(this.app.isReady) // true
  }
}
```

Example 2 (typescript):
```typescript
import { BaseCommand } from '@adonisjs/core/ace'

export default class GreetCommand extends BaseCommand {
  static options = {
    startApp: true,
    staysAlive: true,
  }
  
  async run() {
    await runSomeProcess()
    
    // Terminate the process
    await this.terminate()
  }
}
```

Example 3 (typescript):
```typescript
const app = new Application(new URL('../', import.meta.url))

new Ignitor(APP_ROOT, { importer: IMPORTER })
  .tap((app) => {
    app.booted(() => {
      console.log('invoked after the app is booted')
    })
    
    app.ready(() => {
      console.log('invoked after the app is ready')
    })
    
    app.terminating(() => {
      console.log('invoked before the termination starts')
    })
  })
```

Example 4 (typescript):
```typescript
import { ApplicationService } from '@adonisjs/core/types'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}
  
  register() {
  }
  
  async boot() {
  }
  
  async start() {
  }
  
  async ready() {
  }
  
  async shutdown() {
  }
}
```

---

## Async local storage

**URL:** https://docs.adonisjs.com/guides/concepts/async-local-storage

**Contents:**
- Async local storage
- Basic example
  - Step 1. Creating a new project
  - Step 2. Creating an instance of AsyncLocalStorage
  - Step 3. Execute code inside storage.run
  - Step 4. Access the state from the user_service module.
  - Step 5. Execute the main.js file.
- What is the need for Async local storage?
- Usage
- Caveats

As per the Node.js official documentation: “AsyncLocalStorage is used to create asynchronous state within callbacks and promise chains. It allows storing data throughout the lifetime of a web request or any other asynchronous duration. It is similar to thread-local storage in other languages.”

To simplify the explanation further, AsyncLocalStorage allows you to store a state when executing an async function and make it available to all the code paths within that function.

Let's see it in action. First, we will create a new Node.js project (without any dependencies) and use AsyncLocalStorage to share the state between modules without passing it by reference.

You can find the final code for this example on als-basic-example GitHub repo.

Open the package.json file and set the module system to ESM.

Create a file named storage.js, which creates and exports an instance of the AsyncLocalStorage.

Create an entry point file named main.js. Inside this file, import the instance of AsyncLocalStorage created inside the ./storage.js file.

The storage.run method accepts the state we want to share as the first argument and a callback function as the second argument. All code paths inside this callback (including the imported modules) will have access to the same state.

For demonstration, we will execute the run method three times without awaiting it. Paste the following code at the end of the main.js file.

Finally, let's import the storage instance inside the user_service module and access the current state.

Let's run the main.js file to see if the UserService can access the state.

Unlike other languages like PHP, Node.js is not a threaded language. In PHP, every HTTP request creates a new thread, and each thread has its memory. This allows you to store the state in the global memory and access it anywhere inside your codebase.

In Node.js, you cannot have a global state isolated between HTTP requests because Node.js runs on a single thread and has shared memory. As a result, all Node.js applications share data by passing it as parameters.

Passing data by reference has no technical downsides. But, it does make the code verbose, especially when you configure APM tools and have to provide request data to them manually.

AdonisJS uses AsyncLocalStorage during HTTP requests and shares the HTTP context as the state. As a result, you can access the HTTP context in your application globally.

First, you must enable the useAsyncLocalStorage flag inside the config/app.ts file.

Once enabled, you can use the HttpContext.get or HttpContext.getOrFail methods to get an instance of the HTTP Context for the ongoing request.

In the following example, we get the context inside a Lucid model.

You can use ALS if it makes your code straightforward and you prefer global access vs. passing HTTP Context by reference.

However, be aware of the following situations that can easily lead to memory leaks or unstable behavior of the program.

Do not access the ALS at the top level of any module because modules in Node.js are cached.

Incorrect usage Assigning the result of the HttpContext.getOrFail() method to a variable at top-level will hold the reference to the request that first imported the module.

Correct usage Instead, you should move the getOrFail method call inside the index method.

Static properties (not methods) of any class are evaluated as soon as the module is imported; hence, you should not access the HTTP context within static properties.

Correct usage Instead, you should move the HttpContext.get call inside a method or convert the property to a getter.

Event handlers are executed after the HTTP request finishes. Therefore you should refrain from attempting to access the HTTP context inside them.

Avoid usage inside event listeners

**Examples:**

Example 1 (unknown):
```unknown
npm init --yes
```

Example 2 (json):
```json
{
  "type": "module"
}
```

Example 3 (typescript):
```typescript
import { AsyncLocalStorage } from 'async_hooks'
export const storage = new AsyncLocalStorage()
```

Example 4 (typescript):
```typescript
import { storage } from './storage.js'
import UserService from './user_service.js'
import { setTimeout } from 'node:timers/promises'

async function run(user) {
  const state = { user }

  return storage.run(state, async () => {
    await setTimeout(100)
    const userService = new UserService()
    await userService.get()
  })
}
```

---

## Scaffolding and codemods

**URL:** https://docs.adonisjs.com/guides/concepts/scaffolding

**Contents:**
- Scaffolding and codemods
- Building blocks
  - Stubs
  - Generators
  - Codemods
  - Configure command
- Using stubs
  - Stubs templating
  - Using generators
  - Output destination

Scaffolding refers to the process of generating source files from static templates (aka stubs), and codemods refer to updating the TypeScript source code by parsing the AST.

AdonisJS uses both to speed up the repetitive tasks of creating new files and configuring packages. In this guide, we will go through the building blocks of Scaffolding and cover the codemods API you can use within Ace commands.

Stubs refers to the templates, that are used to create source files on a given action. For example, The make:controller command uses the controller stub to create a controller file inside the host project.

Generators enforce a naming convention and generate file, class, or method names based on the pre-defined conventions.

For example, the controller stubs use the controllerName and controllerFileName generators to create a controller.

Since generators are defined as an object, you can override the existing methods to tweak the conventions. We learn more about that later in this guide.

The codemods API comes from the @adonisjs/assembler package, and it uses ts-morph under the hood.

Since @adonisjs/assembler is a development dependency, ts-morph does not bloat your project dependencies in production. Also, it means, the codemods APIs are not available in production.

The codemods API exposed by AdonisJS are very specific to accomplish high-level tasks like add a provider to the .adonisrc.ts file, or register a middleware inside the start/kernel.ts file. Also, these APIs rely on the default naming conventions, so if you make drastic changes to your project, you will not be able to run codemods.

The configure command is used to configure an AdonisJS package. Under the hood, this command imports the main entry point file and executes the configure method exported by the mentioned package.

The package's configure method receives an instance of the Configure command, and therefore, it can access the stubs and codemods API from the command instance directly.

Most of the time, you will use stubs within an Ace command or inside the configure method of a package you have created. You can initialize the codemods module in both cases via the Ace command's createCodemods method.

The codemods.makeUsingStub method creates a source file from a stub template. It accepts the following arguments:

We use Tempura template engine to process the stubs with runtime data. Tempura is a super lightweight handlebars-style template engine for JavaScript.

Since Tempura's syntax is compatible with handlebars, you can set your code editors to use handlebar syntax highlighting with .stub files.

In the following example, we create a stub that outputs a JavaScript class. It uses the double curly braces to evaluate runtime values.

If you execute the above stub right now, it will fail because we have not provided the modelName and modelReference data properties.

We recommend computing these properties within the stub using inline variables. This way, the host application can eject the stub and modify the variables.

Finally, we have to specify the destination path of the file that will be created using the stub. Once again, we specify the destination path within the stub file, as it allows the host application to eject the stub and customize its output destination.

The destination path is defined using the exports function. The function accepts an object and exports it as the output state of the stub. Later, the codemods API uses this object to create the file at the mentioned location.

Right now, we have hardcoded the entity name as user within the stub. However, you should accept it as a command argument and share it with the stub as the template state.

The following global variables are always shared with a stub.

You can eject/copy stubs inside an AdonisJS application using the node ace eject command. The eject command accepts a path to the original stub file or its parent directory and copies the templates inside the stubs directory of your project's root.

In the following example, we will copy the make/controller/main.stub file from the @adonisjs/core package.

If you open the stub file, it will have the following contents.

Feel free to modify the stub. Next time, the changes will be picked when you run the make:controller command.

You may eject an entire directory of stubs using the eject command. Pass the path to the directory, and the command will copy the whole directory.

All scaffolding commands share the CLI flags (including unsupported ones) with the stub templates. Therefore, you can use them to create custom workflows or change the output destination.

In the following example, we use the --feature flag to create a controller inside the mentioned features directory.

By default, the eject command copies templates from the @adonisjs/core package. However, you may copy stubs from other packages using the --pkg flag.

You can find a package's stubs by visiting its GitHub repo. We store all the stubs at the root level of the package inside the stubs directory.

Here's a visual representation of how we find and execute stubs via the makeUsingStub method.

The codemods API is powered by ts-morph and is only available during development. You can lazily instantiate the codemods module using the command.createCodemods method. The createCodemods method returns an instance of the Codemods class.

Define validation rules for environment variables. The method accepts a key-value pair of variables. The key is the env variable name, and the value is the validation expression as a string.

This codemod expects the start/env.ts file to exist and must have the export default await Env.create method call.

Also, the codemod does not overwrite the existing validation rule for a given environment variable. This is done to respect in-app modifications.

Add one or multiple new environment variables to the .env and .env.example files. The method accepts a key-value pair of variables.

Sometimes you may want to not insert the variable value in the .env.example file. You can do so by using the omitFromExample option.

The above code will insert MY_NEW_VARIABLE=SOME_VALUE in the .env file and MY_NEW_VARIABLE= in the .env.example file.

Register AdonisJS middleware to one of the known middleware stacks. The method accepts the middleware stack and an array of middleware to register.

The middleware stack could be one of server | router | named.

This codemod expects the start/kernel.ts file to exist and must have a function call for the middleware stack for which you are trying to register a middleware.

You may define named middleware as follows.

Register providers, commands, define metaFiles and commandAliases to the adonisrc.ts file.

This codemod expects the adonisrc.ts file to exist and must have an export default defineConfig function call.

Register a Japa plugin to the tests/bootstrap.ts file.

This codemod expects the tests/bootstrap.ts file to exist and must have the export const plugins: Config['plugins'] export.

Register AdonisJS bouncer policies to the list of policies object exported from the app/policies/main.ts file.

This codemod expects the app/policies/main.ts file to exist and must export a policies object from it.

Register a Vite plugin to the vite.config.ts file.

This codemod expects the vite.config.ts file to exist and must have the export default defineConfig function call.

Install one or multiple packages using the detected package manager in the user's project.

The getTsMorphProject method returns an instance of ts-morph. This can be useful when you want to perform custom file transformations that are not covered by the Codemods API.

Make sure to read the ts-morph documentation to know more about the available APIs.

**Examples:**

Example 1 (typescript):
```typescript
import { BaseCommand } from '@adonisjs/core/ace'

const STUBS_ROOT = new URL('./stubs', import.meta.url)

export default class MakeApiResource extends BaseCommand {
  async run() {
    const codemods = await this.createCodemods()
    await codemods.makeUsingStub(STUBS_ROOT, 'api_resource.stub', {})
  }
}
```

Example 2 (javascript):
```javascript
export default class {{ modelName }}Resource {
  serialize({{ modelReference }}: {{ modelName }}) {
    return {{ modelReference }}.toJSON()
  }
}
```

Example 3 (javascript):
```javascript
{{#var entity = generators.createEntity('user')}}
{{#var modelName = generators.modelName(entity.name)}}
{{#var modelReference = string.camelCase(modelName)}}

export default class {{ modelName }}Resource {
  serialize({{ modelReference }}: {{ modelName }}) {
    return {{ modelReference }}.toJSON()
  }
}
```

Example 4 (javascript):
```javascript
{{#var entity = generators.createEntity('user')}}
{{#var modelName = generators.modelName(entity.name)}}
{{#var modelReference = string.camelCase(modelName)}}
{{#var resourceFileName = string(modelName).snakeCase().suffix('_resource').ext('.ts').toString()}}
{{{
  exports({
    to: app.makePath('app/api_resources', entity.path, resourceFileName)
  })
}}}
export default class {{ modelName }}Resource {
  serialize({{ modelReference }}: {{ modelName }}) {
    return {{ modelReference }}.toJSON()
  }
}
```

---

## Config providers

**URL:** https://docs.adonisjs.com/guides/concepts/config-providers

**Contents:**
- Config providers
- Without config providers
  - Well, that's a problem with AdonisJS architecture 🤷🏻‍♂️
- With config provider
- How do I access the resolved config?

Some configuration files like (config/hash.ts) do not export config as a plain object. Instead, they export a config provider. The config provider provides a transparent API for packages to lazily compute the configuration after the application is booted.

To understand config providers, let's see what the config/hash.ts file would look like if we were not using config providers.

So far, so good. Instead of referencing the scrypt driver from the drivers collection. We are importing it directly and returning an instance using a factory function.

Let's say the Scrypt driver needs an instance of the Emitter class to emit an event every time it hashes a value.

🚨 The above example will fail because the AdonisJS container services are unavailable until the application has been booted and the config files are imported before the application boot phase.

Not really. Let's not use the container service and create an instance of the Emitter class directly within the config file.

Now, we have a new problem. The emitter instance we have created for the Scrypt driver is not globally available for us to import and listen for events emitted by the driver.

Therefore, you might want to move the construction of the Emitter class to its file and export an instance of it. This way, you can pass the emitter instance to the driver and use it to listen to events.

The above code will work fine. However, you are manually constructing the dependencies your application needs this time. As a result, your application will have a lot of boilerplate code to wire everything together.

With AdonisJS, we strive to write minimal boilerplate code and use the IoC container for lookup dependencies.

Now, let's re-write the config/hash.ts file and use a config provider this time. Config provider is a fancy name for a function that accepts an instance of the Application class and resolves its dependencies using the container.

Once you use the hash service, the config provider for the scrypt driver will be executed to resolve its dependencies. As a result, we do not attempt to look up the emitter until we use the hash service elsewhere inside our code.

Since config providers are async, you might want to import the Scrypt driver lazily via dynamic import.

You may access the resolved config from the service directly. For example, in the case of the hash service, you can get a reference to the resolved config as follows.

Application lifecycle

**Examples:**

Example 1 (typescript):
```typescript
import { Scrypt } from '@adonisjs/core/hash/drivers/scrypt'

export default {
  default: 'scrypt',
  list: {
    scrypt: () => new Scrypt({
      cost: 16384,
      blockSize: 8,
      parallelization: 1,
      maxMemory: 33554432,
    })
  }
}
```

Example 2 (typescript):
```typescript
import { Scrypt } from '@adonisjs/core/hash/drivers/scrypt'
import emitter from '@adonisjs/core/services/emitter'

export default {
  default: 'scrypt',
  list: {
    scrypt: () => new Scrypt({
      cost: 16384,
      blockSize: 8,
      parallelization: 1,
      maxMemory: 33554432,
    }, emitter)
  }
}
```

Example 3 (typescript):
```typescript
import { Scrypt } from '@adonisjs/core/hash/drivers/scrypt'
import emitter from '@adonisjs/core/services/emitter'
import { Emitter } from '@adonisjs/core/events'

const emitter = new Emitter()

export default {
  default: 'scrypt',
  list: {
    scrypt: () => new Scrypt({
      cost: 16384,
      blockSize: 8,
      parallelization: 1,
      maxMemory: 33554432,
    }, emitter)
  }
}
```

Example 4 (typescript):
```typescript
import { Emitter } from '@adonisjs/core/events'
export const emitter = new Emitter()
```

---

## Async local storage

**URL:** https://docs.adonisjs.com/guides/concepts

**Contents:**
- Async local storage
- Basic example
  - Step 1. Creating a new project
  - Step 2. Creating an instance of AsyncLocalStorage
  - Step 3. Execute code inside storage.run
  - Step 4. Access the state from the user_service module.
  - Step 5. Execute the main.js file.
- What is the need for Async local storage?
- Usage
- Caveats

As per the Node.js official documentation: “AsyncLocalStorage is used to create asynchronous state within callbacks and promise chains. It allows storing data throughout the lifetime of a web request or any other asynchronous duration. It is similar to thread-local storage in other languages.”

To simplify the explanation further, AsyncLocalStorage allows you to store a state when executing an async function and make it available to all the code paths within that function.

Let's see it in action. First, we will create a new Node.js project (without any dependencies) and use AsyncLocalStorage to share the state between modules without passing it by reference.

You can find the final code for this example on als-basic-example GitHub repo.

Open the package.json file and set the module system to ESM.

Create a file named storage.js, which creates and exports an instance of the AsyncLocalStorage.

Create an entry point file named main.js. Inside this file, import the instance of AsyncLocalStorage created inside the ./storage.js file.

The storage.run method accepts the state we want to share as the first argument and a callback function as the second argument. All code paths inside this callback (including the imported modules) will have access to the same state.

For demonstration, we will execute the run method three times without awaiting it. Paste the following code at the end of the main.js file.

Finally, let's import the storage instance inside the user_service module and access the current state.

Let's run the main.js file to see if the UserService can access the state.

Unlike other languages like PHP, Node.js is not a threaded language. In PHP, every HTTP request creates a new thread, and each thread has its memory. This allows you to store the state in the global memory and access it anywhere inside your codebase.

In Node.js, you cannot have a global state isolated between HTTP requests because Node.js runs on a single thread and has shared memory. As a result, all Node.js applications share data by passing it as parameters.

Passing data by reference has no technical downsides. But, it does make the code verbose, especially when you configure APM tools and have to provide request data to them manually.

AdonisJS uses AsyncLocalStorage during HTTP requests and shares the HTTP context as the state. As a result, you can access the HTTP context in your application globally.

First, you must enable the useAsyncLocalStorage flag inside the config/app.ts file.

Once enabled, you can use the HttpContext.get or HttpContext.getOrFail methods to get an instance of the HTTP Context for the ongoing request.

In the following example, we get the context inside a Lucid model.

You can use ALS if it makes your code straightforward and you prefer global access vs. passing HTTP Context by reference.

However, be aware of the following situations that can easily lead to memory leaks or unstable behavior of the program.

Do not access the ALS at the top level of any module because modules in Node.js are cached.

Incorrect usage Assigning the result of the HttpContext.getOrFail() method to a variable at top-level will hold the reference to the request that first imported the module.

Correct usage Instead, you should move the getOrFail method call inside the index method.

Static properties (not methods) of any class are evaluated as soon as the module is imported; hence, you should not access the HTTP context within static properties.

Correct usage Instead, you should move the HttpContext.get call inside a method or convert the property to a getter.

Event handlers are executed after the HTTP request finishes. Therefore you should refrain from attempting to access the HTTP context inside them.

Avoid usage inside event listeners

**Examples:**

Example 1 (unknown):
```unknown
npm init --yes
```

Example 2 (json):
```json
{
  "type": "module"
}
```

Example 3 (typescript):
```typescript
import { AsyncLocalStorage } from 'async_hooks'
export const storage = new AsyncLocalStorage()
```

Example 4 (typescript):
```typescript
import { storage } from './storage.js'
import UserService from './user_service.js'
import { setTimeout } from 'node:timers/promises'

async function run(user) {
  const state = { user }

  return storage.run(state, async () => {
    await setTimeout(100)
    const userService = new UserService()
    await userService.get()
  })
}
```

---

## Hot module replacement

**URL:** https://docs.adonisjs.com/guides/concepts/hot-module-replacement

**Contents:**
- Hot module replacement
- Key concepts
  - No updates are propagated to the browser
  - Works only with dynamic imports
- Usage
- Full reloads vs HMR
  - Creating a dependency tree
  - Identifying boundaries
  - Performing reloads

Hot module replacement (HMR) refers to the process of reloading JavaScript modules after modification without restarting the entire process. HMR usually results in a faster feedback loop since, after a file change, you do not have to wait for the whole of the process to restart.

The term HMR has been used for many years now in the frontend ecosystem, where tools like Vite can hot-reload modules and apply changes to a webpage while maintaining its existing state.

However, the HMR performed by AdonisJS is a lot simpler and vastly differs from tools like Vite or Webpack. Our goal with HMR is to offer faster reloads, and that's it.

Since AdonisJS is a backend framework, we are not in charge of maintaining the state of a frontend application or applying CSS to a web page. Therefore, our HMR integration cannot talk to your frontend app and reconcile its state.

In fact, not every AdonisJS application is a browser-rendered web app. Many use AdonisJS for creating pure JSON APIs, and they can also benefit from our HMR integration.

Most HMR tools use code transformations to inject additional code into the compiled output. At AdonisJS, we are not a big fan of transpilers and always strive to embrace the platform as it is. Therefore, our approach to HMR uses Node.js loader hooks and works only with dynamic imports.

The good news is that all the critical parts of your AdonisJS application are dynamically imported by default. For example, Controllers, middleware, and event listeners are all dynamically imported, and hence, you can leverage HMR from today without changing a single line of code in your app.

It is worth mentioning that the imports of a dynamically imported module can be at the top level. For example, a controller (which is dynamically imported in the routes file) can have top-level imports for validators, TSX files, models, and services, and they all benefit from HMR.

All official starter kits have been updated to use HMR by default. However, if you have an existing application, you can configure HMR as follows.

Install the hot-hook npm package as a development dependency. The AdonisJS core team has created this package, which can also be used outside of an AdonisJS application.

Next, copy-paste the following configuration to the package.json file. The boundaries property accepts an array of glob patterns that must be considered for HMR.

After the configuration, you can start the development server with the --hmr flag.

Also, you might want to update the dev script within the package.json file to use this new flag.

This section explains the underlying workings of hot-hook. Feel free to skip it if you are not in the mood to read extended technical theory 🤓

Or, go through the README file of the package if you want an even deeper explanation.

Let's understand when AdonisJS will perform a complete reload (restarting the process) and when it will hot reload the module.

When using the --hmr flag, AdonisJS will use hot-hook to create a dependency tree of your application starting from the bin/server.ts file and will watch all the files that are part of this dependency tree.

It means that if you create a TypeScript file in your application source code but never import it anywhere in your app, this file will not trigger any reload. It will be ignored as if the file does not exist.

Next, hot-hook will use the boundaries array from the configuration to identify the files that qualify for HMR.

As a rule of thumb, you should never register config files, service providers, or preload files as boundaries. This is because these files usually result in some side-effect that will re-occur if we reload them without clearing the side-effects. Here are some examples:

The config/database.ts file establishes a connection with the database. Hot reloading this file means closing the existing connection and re-creating it. The same can be achieved by restarting the entire process without adding any additional complexity.

The start/routes.ts file is used to register the routes. Hot reloading this file means removing existing routes registered with the framework and re-registering them. Again, restarting the process is simple.

In other words, we can say that the modules imported/executed during an HTTP request should be part of HMR boundaries, and modules needed to boot the application should not be.

Once hot-hook has identified the boundaries, it will perform HMR for dynamically imported modules that are part of the boundary and restart the process for the rest of the files.

Extending the framework

**Examples:**

Example 1 (unknown):
```unknown
npm i -D hot-hook
```

Example 2 (json):
```json
{
  "hotHook": {
    "boundaries": [
      "./app/controllers/**/*.ts",
      "./app/middleware/*.ts"
    ]
  }
}
```

Example 3 (unknown):
```unknown
node ace serve --hmr
```

Example 4 (json):
```json
{
  "scripts": {
    "dev": "node ace serve --hmr"
  }
}
```

---

## Service providers

**URL:** https://docs.adonisjs.com/guides/concepts/service-providers

**Contents:**
- Service providers
- Writing service providers
  - register
  - boot
  - start
  - ready
  - shutdown

Services providers are plain JavaScript classes with lifecycle methods to perform actions during different phases of the application.

A service provider can register bindings into the container, extend existing bindings, or run actions after the HTTP server starts.

Service providers are the entry point to an AdonisJS application with the ability to modify the application state before it is considered ready. It is mainly used by external packages to hook into the application lifecycle.

If you only want to inject dependencies into one of your classes, you can use the dependency injection feature.

The providers are registered inside the adonisrc.ts file under the providers array. The value is a function to lazily import the service provider

By default, a provider is loaded in all the runtime environments. However, you can limit the provider to run in specific environments.

Service providers are stored inside the providers directory of your app. Alternatively, you can use the node ace make:provider app command.

The provider module must have an export default statement returning the provider class. The class constructor receives an instance of the Application class.

See also: Make provider command

Following are the lifecycle methods you can implement to perform different actions.

The register method is called after an instance of the provider class is created. The register method can register bindings within the IoC container.

The register method is synchronous, so you cannot use Promises inside this method.

The boot method is called after all the bindings have been registered with the IoC container. Inside this method, you can resolve bindings from the container to extend/mutate them.

It is a good practice to extend bindings when they are resolved from the container. For example, you can use the resolving hook to add custom rules to the validator.

The start method is called after the boot and before the ready method. It allows you to perform actions that the ready hook actions might need.

The ready method gets called at different stages based on the application's environment.

The shutdown method is called when AdonisJS is in the middle of gracefully exiting the application.

The event of exiting the application depends upon the environment in which the app is running and how the application process started. Please read the application lifecycle guide to know more about it.

**Examples:**

Example 1 (typescript):
```typescript
{
  providers: [
    () => import('@adonisjs/core/providers/app_provider'),
    () => import('./providers/app_provider.js'),
  ]
}
```

Example 2 (typescript):
```typescript
{
  providers: [
    () => import('@adonisjs/core/providers/app_provider'),
    {
      file: () => import('./providers/app_provider.js'),
      environment: ['web', 'repl']
    }
  ]
}
```

Example 3 (typescript):
```typescript
import { ApplicationService } from '@adonisjs/core/types'

export default class AppProvider {
  constructor(protected app: ApplicationService) {
  }
}
```

Example 4 (typescript):
```typescript
export default class AppProvider {
  register() {
  }
  
  async boot() {
  }
  
  async start() {
  }
  
  async ready() {
  }
  
  async shutdown() {
  }
}
```

---

## Dependency injection

**URL:** https://docs.adonisjs.com/guides/concepts/dependency-injection

**Contents:**
- Dependency injection
- Basic example
  - Step 1. Create the Service class
  - Step 2. Inject the service inside the controller
  - Step 3. Using the inject decorator
  - Conclusion
- Constructing a tree of dependencies
- Using method injection
- When to use Dependency Injection
- Using the container directly

At the heart of every AdonisJS application is an IoC container that can construct classes and resolve dependencies with almost zero config.

The IoC container serves the following two primary use cases.

Let's start with injecting dependencies into a class.

The automatic dependency injection relies on the TypeScript legacy decorators implementation and the Reflection metadata API.

In the following example, we create an EchoService class and inject an instance of it into the HomeController class. You can follow along by copy-pasting the code examples.

Start by creating the EchoService class inside the app/services folder.

Create a new HTTP controller inside the app/controllers folder. Alternatively, you can use the node ace make:controller home command.

Import the EchoService in the controller file and accept it as a constructor dependency.

To make automatic dependency resolution work, we will have to use the @inject decorator on the HomeController class.

That's all! You can now bind the HomeController class to a route and it will automatically receive an instance of the EchoService class.

You can think of the @inject decorator as a spy looking at the class constructor or method dependencies and informing the container about it.

When the AdonisJS router asks the container to construct the HomeController, the container already knows about the controller dependencies.

Right now, the EchoService class has no dependencies, and using the container to create an instance of it might seem overkill.

Let's update the class constructor and make it accept an instance of the HttpContext class.

Again, we must place our spy (the @inject decorator) on the EchoService class to inspect its dependencies.

Voila, that's all we have to do. Without changing a single line of code inside the controller, you can re-run the code, and the EchoService class will receive an instance of the HttpContext class.

The great thing about using the container is that you can have deeply nested dependencies, and the container can resolve the entire tree for you. The only deal is to use the @inject decorator.

Method injection is used to inject dependencies inside a class method. For method injection to work, you must place the @inject decorator before the method signature.

Let's continue with our previous example and move the EchoService dependency from the HomeController constructor to the handle method.

When using method injection inside a controller, remember the first parameter receives a fixed value (i.e., the HTTP context), and the rest of the parameters are resolved using the container.

That's all! This time, the EchoService class instance will be injected inside the handle method.

Leveraging dependency injection in your projects is recommended because DI creates a loose coupling between different parts of your application. As a result, the codebase becomes easier to test and refactor.

However, you have to be careful and not take the idea of dependency injection to its extreme that you start to lose its benefits. For example:

Most classes within your AdonisJS application, like the Controllers, Middleware, Event listeners, Validators, and Mailers, are constructed using the container. Therefore you can leverage the @inject decorator for automatic dependency injection.

For situations where you want to self-construct a class instance using the container, you can use the container.make method.

The container.make method accepts a class constructor and returns an instance of it after resolving all its dependencies.

You can use the container.call method to inject dependencies inside a method. The container.call method accepts the following arguments.

Container bindings are one of the primary reasons for the IoC container to exist in AdonisJS. Bindings act as a bridge between the packages you install and your application.

Bindings are essentially a key-value pair, the key is the unique identifier for the binding, and the value is a factory function that returns the value.

You may use the container.bind method to register a container binding. Following is a straightforward example of registering and resolving bindings from the container.

Container bindings are used for specific use cases, like registering singleton services exported by a package or self-constructing class instances when automatic dependency injection is insufficient.

We recommend you not make your applications unnecessarily complex by registering everything to the container. Instead, look for specific use cases in your application code before reaching for container bindings.

Following are some of the examples which are using container bindings inside the framework packages.

The concept of container bindings is not commonly used in the JavaScript ecosystem. Therefore, feel free to join our Discord community to clarify your doubts.

You can resolve other bindings from the container within the binding factory function. For example, if the MyFakeCache class needs config from the config/cache.ts file, you can access it as follows.

Singletons are bindings for which the factory function is called once, and the return value is cached for the application's lifetime.

You can register a singleton binding using the container.singleton method.

You can bind values directly to the container using the container.bindValue method.

You can define aliases for bindings using the alias method. The method accepts the alias name as the first parameter and a reference to an existing binding or a class constructor as the alias value.

You can define the static-type information for binding using TypeScript declaration merging.

The types are defined on the ContainerBindings interface as a key-value pair.

If you create a package, you can write the above code block inside the service provider file.

In your AdonisJS application, you can write the above code block inside the types/container.ts file.

The container allows you to create an abstraction layer for your application. You can define a binding for an interface and resolve it to a concrete implementation.

This method is useful when you want to apply Hexagonal Architecture, also known as Port and Adapter principles to your application.

Since TypeScript interfaces do not exist at runtime, you must use an abstract class constructor for your interface.

Next, you can create a concrete implementation of the PaymentService interface.

Now, you can register the PaymentService interface and the StripePaymentService concrete implementation inside the container inside your AppProvider.

Finally, you can resolve the PaymentService interface from the container and use it inside your application.

When you rely on the container to resolve a tree of dependencies, you have less/no control over the classes in that tree. Therefore, mocking/faking those classes can become harder.

In the following example, the UsersController.index method accepts an instance of the UserService class, and we use the @inject decorator to resolve the dependency and give it to the index method.

Let's say during testing, you do not want to use the actual UserService as it makes external HTTP requests. Instead, you want to use a fake implementation.

But first, look at the code you might write to test the UsersController.

In the above test, we interact with the UsersController over an HTTP request and do not have direct control over it.

The container provides a straightforward API to swap classes with fake implementations. You can define a swap using the container.swap method.

The container.swap method accepts the class constructor you want to swap, followed by a factory function to return an alternative implementation.

Once a swap has been defined, the container will use it instead of the actual class. You can restore the original implementation using the container.restore method.

Contextual dependencies allow you to define how a dependency should be resolved for a given class. For example, you have two services depending on the Drive Disk class.

You want the UserService to receive a disk instance with the GCS driver and the PostService to receive a disk instance with the S3 driver. You can do so using contextual dependencies.

The following code must be written inside a service provider register method.

You can use the container's resolving hook to modify/extend the return value of the container.make method.

Usually, you will use hooks inside a service provider when trying to extend a particular binding. For example, the Database provider uses the resolving hook to register additional database-driven validation rules.

The container emits the container_binding:resolved event after resolving a binding or constructing a class instance. The event.binding property will be a string (binding name) or a class constructor, and the event.value property is the resolved value.

Extending the framework

**Examples:**

Example 1 (typescript):
```typescript
export default class EchoService {
  respond() {
    return 'hello'
  }
}
```

Example 2 (typescript):
```typescript
import EchoService from '#services/echo_service'

export default class HomeController {
  constructor(protected echo: EchoService) {
  }
  
  handle() {
    return this.echo.respond()
  }
}
```

Example 3 (typescript):
```typescript
import EchoService from '#services/echo_service'
import { inject } from '@adonisjs/core'

@inject()
export default class HomeController {
  constructor(protected echo: EchoService) {
  }
  
  handle() {
    return this.echo.respond()
  }
}
```

Example 4 (typescript):
```typescript
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class EchoService {
  constructor(protected ctx: HttpContext) {
  }

  respond() {
    return `Hello from ${this.ctx.request.url()}`
  }
}
```

---

## Extending the framework

**URL:** https://docs.adonisjs.com/guides/concepts/extending-adonisjs

**Contents:**
- Extending the framework
- Macros and getters
  - Getters
  - Macroable classes
- Extending modules

The architecture of AdonisJS makes it very easy to extend the framework. We dogfood framework's core APIs to build an ecosystem of first-party packages.

In this guide, we will explore different APIs you can use to extend the framework through a package or within your application codebase.

Macros and getters offer an API to add properties to the prototype of a class. You can think of them as Syntactic sugar for Object.defineProperty. Under the hood, we use macroable package, and you can refer to its README for an in-depth technical explanation.

Since macros and getters are added at runtime, you will have to inform TypeScript about the type information for the added property using declaration merging.

You can write the code for adding macros inside a dedicated file (like the extensions.ts) and import it inside the service provider's boot method.

In the following example, we add the wantsJSON method to the Request class and define its types simultaneously.

Getters are lazily evaluated properties added to a class. You can add a getter using the Class.getter method. The first argument is the getter name, and the second argument is the callback function to compute the property value.

Getter callbacks cannot be async because getters in JavaScript cannot be asynchronous.

Getters can be a singleton, meaning the function to compute the getter value will be called once, and the return value will be cached for an instance of the class.

Following is the list of classes that can be extended using Macros and getters.

Most of the AdonisJS modules provide extensible APIs to register custom implementations. Following is an aggregated list of the same.

Hot module replacement

**Examples:**

Example 1 (typescript):
```typescript
export default class AppProvider {
  async boot() {
    await import('../src/extensions.js')
  }
}
```

Example 2 (typescript):
```typescript
import { Request } from '@adonisjs/core/http'

Request.macro('wantsJSON', function (this: Request) {
  const firstType = this.types()[0]
  if (!firstType) {
    return false
  }
  
  return firstType.includes('/json') || firstType.includes('+json')
})
```

Example 3 (typescript):
```typescript
declare module '@adonisjs/core/http' {
  interface Request {
    wantsJSON(): boolean
  }
}
```

Example 4 (typescript):
```typescript
import { Request } from '@adonisjs/core/http'

Request.getter('hasRequestId', function (this: Request) {
  return this.header('x-request-id')
})

// you can use the property as follows.
if (ctx.request.hasRequestId) {
}
```

---

## Tooling config

**URL:** https://docs.adonisjs.com/guides/concepts/tooling-config

**Contents:**
- Tooling config
- TSConfig
- Prettier config
- ESLint config

AdonisJS relies heavily on TypeScript, Prettier, and ESLint to have consistency in code, check for errors at build time, and more importantly, have a joyful development experience.

We have abstracted all our choices inside ready-to-use configuration presets used by all the official packages and by the official starter kits.

Continue reading this guide if you want to use the same configuration presets in your Node.js applications written in TypeScript.

The @adonisjs/tsconfig package contains the base configuration for TypeScript projects. We set the TypeScript module system to NodeNext and use TS Node + SWC for Just-in-Time compilation.

Feel free to explore options inside the base config file, application config file, and package development config file.

You can install the package and use it as follows.

Extend from the tsconfig.app.json file when creating an AdonisJS application. (Comes pre-configured with starter kits).

Extend from the tsconfig.package.json file when creating a package for the AdonisJS ecosystem.

The @adonisjs/prettier-config package contains the base configuration to auto-format the source code for consistent styling. Feel free to explore configuration options inside the index.json file.

You can install the package and use it as follows.

Define the following property inside the package.json file.

Also, create a .prettierignore file to ignore specific files and directories.

The @adonisjs/eslint-config package contains the base configuration to apply the linting rules. Feel free to explore options inside the base config file, application config file, and package development config file.

You can install the package and use it as follows.

Our config preset uses the eslint-plugin-prettier to ensure ESLint and Prettier can work together without stepping over each other.

Extend from the eslint-config/app file when creating an AdonisJS application. (Comes pre-configured with starter kits).

Extend from the eslint-config/package file when creating a package for the AdonisJS ecosystem.

TypeScript build process

**Examples:**

Example 1 (markdown):
```markdown
npm i -D @adonisjs/tsconfig

# Make sure also to install the following packages
npm i -D typescript ts-node-maintained @swc/core
```

Example 2 (json):
```json
{
  "extends": "@adonisjs/tsconfig/tsconfig.app.json",
  "compilerOptions": {
    "rootDir": "./",
    "outDir": "./build"
  }
}
```

Example 3 (json):
```json
{
  "extends": "@adonisjs/tsconfig/tsconfig.package.json",
  "compilerOptions": {
    "rootDir": "./",
    "outDir": "./build"
  }
}
```

Example 4 (markdown):
```markdown
npm i -D @adonisjs/prettier-config

# Make sure also to install prettier
npm i -D prettier
```

---

## Container services

**URL:** https://docs.adonisjs.com/guides/concepts/container-services

**Contents:**
- Container services
- The need for container services
- Container services vs. Dependency injection
- Testing with container services
- Container bindings and services

As we discussed in the IoC container guide, the container bindings are one of the primary reasons for the IoC container to exists in AdonisJS.

Container bindings keep your codebase clean from boilerplate code required to construct objects before they can be used.

In the following example before you can use the Database class, you will have to create an instance of it. Depending the class you are constructing, you might have write a lot of boilerplate code to get all of its dependencies.

However, when using an IoC container, you can offload the task of constructing a class to the container and fetch a pre-built instance.

Using the container to resolve pre-configured objects is great. However, using the container.make method has its own downsides.

Editors are good with auto imports. If you attempt to use a variable and the editor can guess the import path of the variable, then it will write the import statement for you. However, this cannot work with container.make calls.

Using a mix of import statements and container.make calls feels unintuitive compared to having a unified syntax for importing/using modules.

To overcome these downsides, we wrap container.make calls inside a regular JavaScript module, so you can fetch them using the import statement.

For example, the @adonisjs/lucid package has a file called services/db.ts and this file has roughly the following contents.

Within your application, you can replace the container.make call with an import pointing to the services/db.ts file.

As you can see, we are still relying on the container to resolve an instance of the Database class for us. However, with a layer of indirection, we can replace the container.make call with a regular import statement.

The JavaScript module wrapping the container.make calls is known as a Container service. Almost every package that interacts with the container ships with one or more container services.

Container services are an alternative to dependency injection. For example, instead of accepting the Disk class as a dependency, you ask the drive service to give you a disk instance. Let's look at some code examples.

In the following example, we use the @inject decorator to inject an instance of the Disk class.

When using the drive service, we call the drive.use method to get an instance of Disk with s3 driver.

Container services are great for keeping your code terse. Whereas, dependency injection creates a loose coupling between different application parts.

Choosing one over the other comes down to your personal choice and the approach you want to take to structure your code.

The outright benefit of dependency injection is the ability to swap dependencies at the time of writing tests.

To provide a similar testing experience with container services, AdonisJS provides first-class APIs for faking implementations when writing tests.

In the following example, we call the drive.fake method to swap drive disks with an in-memory driver. After a fake is created, any call to the drive.use method will receive the fake implementation.

The following table outlines a list of container bindings and their related services exported by the framework core and first-party packages.

**Examples:**

Example 1 (typescript):
```typescript
import { Database } from '@adonisjs/lucid'
export const db = new Database(
  // inject config and other dependencies
)
```

Example 2 (typescript):
```typescript
import app from '@adonisjs/core/services/app'
const db = await app.container.make('lucid.db')
```

Example 3 (typescript):
```typescript
const db = await app.container.make('lucid.db')
export { db as default }
```

Example 4 (typescript):
```typescript
import app from '@adonisjs/core/services/app'
const db = await app.container.make('lucid.db')
import db from '@adonisjs/lucid/services/db'
```

---

## Application

**URL:** https://docs.adonisjs.com/guides/concepts/application

**Contents:**
- Application
- Environment
- Node environment
- State
- Listening for process signals
- Notifying parent process
- Making URLs and paths to project files
  - makeURL
  - makePath
  - configPath

The Application class does all the heavy lifting of wiring together an AdonisJS application. You can use this class to know about the environment in which your app is running, get the current state of the application, or make paths to specific directories.

See also: Application lifecycle

The environment refers to the application runtime environment. The application is always booted in one of the following known environments.

web environment refers to the process started for the HTTP server.

console environment refers to the Ace commands except for the REPL command.

repl environment refers to the process started using the node ace repl command.

Finally, the test environment refers to the process started using the node ace test command.

You can access the application environment using the getEnvironment method.

You can also switch the application environment before it has been booted. A great example of this is the REPL command.

The node ace repl command starts the application in the console environment, but the command internally switches the environment to repl before presenting the REPL prompt.

You can access the Node.js environment using the nodeEnvironment property. The value is a reference to the NODE_ENV environment variable. However, the value is further normalized to be consistent.

Also, you can use the following properties as a shorthand to know the current environment.

The state refers to the current state of the application. The framework features you can access significantly depend upon the current state of the application. For example, you cannot access the container bindings or container services until the app is in a booted state.

The application is always in one of the following known states.

created: It is the default state of the application.

initiated: In this state, we parse/validate the environment variables and process the adonisrc.ts file.

booted: The application service providers are registered and booted at this state.

ready: The ready state varies between different environments. For example, in the web environment, the ready state means the application is ready to accept new HTTP requests.

terminated: The application has been terminated, and the process will exit shortly. The application will not accept new HTTP requests in the web environment.

You can also use the following shorthand properties to know whether the application is in a given state.

You can listen for POSIX signals using the app.listen, or app.listenOnce methods. Under the hood, we register the listener with the Node.js process object.

At times, you might want to register the listeners conditionally. For example, listen to the SIGINT signal when running inside the pm2 environment.

You can use the listenIf or listenOnceIf methods to register a listener conditionally. The listener is only registered when the first argument's value is truthy.

If your application starts as a child process, you can send messages to the parent process using the app.notify method. Under the hood, we use the process.send method.

Instead of self-constructing absolute URLs or paths to project files, we highly recommend using the following helpers.

The make URL method returns a file URL to a given file or directory within the project root. For example, you may generate a URL when importing a file.

The makePath method returns an absolute path to a given file or directory within the project root.

Returns path to a file inside the project's config directory.

Returns path to a file inside the project's public directory.

Returns path to a file inside the provider's directory.

Returns path to a file inside the database factories directory.

Returns path to a file inside the database migrations directory.

Returns path to a file inside the database seeders directory.

Returns path to a file inside languages directory.

Returns path to a file inside the views directory.

Returns path to a file inside the start directory.

Returns path to a file inside the tmp directory within the project root.

Returns path to a file inside the HTTP controllers directory.

Returns path to a file inside the model's directory.

Returns path to a file inside the services directory.

Returns path to a file inside the exceptions directory.

Returns path to a file inside the mails directory.

Returns path to a file inside the middleware directory.

Returns path to a file inside the policies directory.

Returns path to a file inside the validators directory.

Returns path to a file inside the commands directory.

Return path to a file inside the events directory.

Return path to a file inside the listeners directory.

Generators are used to create class names and file names for different entities. For example, you may use the generators.controllerFileName method to generate the filename for a controller.

Please reference the generators.ts source code to view the list of available generators.

Application lifecycle

**Examples:**

Example 1 (typescript):
```typescript
import app from '@adonisjs/core/services/app'

console.log(app.getEnvironment())
```

Example 2 (typescript):
```typescript
if (!app.isBooted) {
	app.setEnvironment('repl')
}
```

Example 3 (typescript):
```typescript
import app from '@adonisjs/core/services/app'

console.log(app.nodeEnvironment)
```

Example 4 (typescript):
```typescript
import app from '@adonisjs/core/services/app'

// Is in production
app.inProduction
app.nodeEnvironment === 'production'

// Is in development
app.inDev
app.nodeEnvironment === 'development'

// Is in the test
app.inTest
app.nodeEnvironment === 'test'
```

---

## Assembler hooks

**URL:** https://docs.adonisjs.com/guides/concepts/assembler-hooks

**Contents:**
- Assembler hooks
- Adding a hook
- Create a hook
- Hooks list
  - onBuildStarting
  - onBuildCompleted
  - onDevServerStarted
  - onSourceFileChanged

Assembler hooks are a way of executing code at specific points in the assembler lifecycle. As a reminder, the Assembler is a part of AdonisJS that enables you to launch your dev server, build your application, and run your tests.

These hooks can be helpful for tasks such as file generation, code compilation, or injecting custom build steps.

For example, the @adonisjs/vite package uses the onBuildStarting hook to inject a step where front-end assets are built. So, when you run node ace build, the @adonisjs/vite package will build your front-end assets before the rest of the build process. This is a good example of how hooks can be used to customize the build process.

Assembler hooks are defined in the adonisrc.ts file, in the hooks key :

Several hooks can be defined for each stage of the assembly lifecycle. Each hook is an array of functions to be executed.

We recommend using dynamic imports to load hooks. It ensures that hooks are not loaded unnecessarily but only when needed. If you write your hook code directly in the adonisrc.ts file, this may slow down the start-up of your application.

A hook is just a simple function. Let's take an example of a hook that is supposed to execute a custom build task.

Note that the hook must be exported by default.

Once this hook has been defined, all you have to do is add it to the adonisrc.ts file like this:

And now, every time you run node ace build, the onBuildStarting hook will be executed with the custom logic you defined.

Here's the list of available hooks:

This hook is executed before the build starts. It is helpful for tasks such as file generation or for injecting custom build steps.

This hook is executed once the build is complete. It can also be used to customize the build process.

This hook is executed once the Adonis dev server is started.

This hook is executed each time a source file (included by your tsconfig.json ) is modified. Your hook will receive the path of the modified file as an argument.

**Examples:**

Example 1 (typescript):
```typescript
import { defineConfig } from '@adonisjs/core/app'

export default defineConfig({
  hooks: {
    onBuildCompleted: [
      () => import('my-package/hooks/on_build_completed')
    ],
    onBuildStarting: [
      () => import('my-package/hooks/on_build_starting')
    ],
    onDevServerStarted: [
      () => import('my-package/hooks/on_dev_server_started')
    ],
    onSourceFileChanged: [
      () => import('my-package/hooks/on_source_file_changed')
    ],
  },
})
```

Example 2 (typescript):
```typescript
import type { AssemblerHookHandler } from '@adonisjs/core/types/app'

const buildHook: AssemblerHookHandler = async ({ logger }) => {
  logger.info('Generating some files...')

  await myCustomLogic()
}

export default buildHook
```

Example 3 (typescript):
```typescript
import { defineConfig } from '@adonisjs/core/app'

export default defineConfig({
  hooks: {
    onBuildStarting: [
      () => import('./hooks/on_build_starting')
    ],
  },
})
```

---
