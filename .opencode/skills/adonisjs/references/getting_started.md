# Adonisjs - Getting Started

**Pages:** 5

---

## Environment variables

**URL:** https://docs.adonisjs.com/guides/getting-started/environment-variables

**Contents:**
- Environment variables
- Reading environment variables
- Using the AdonisJS env module
  - Sharing env module with Edge templates
- Validating environment variables
  - Static-type information
- Validator schema API
  - schema.string
    - host
    - url

Environment variables serve the purpose of storing secrets like the database password, the app secret, or an API key outside your application codebase.

Also, environment variables can be used to have different configurations for different environments. For example, you may use a memory mailer during tests, an SMTP mailer during development, and a third-party service in production.

Since environment variables are supported by all operating systems, deployment platforms, and CI/CD pipelines, they have become a de-facto standard for storing secrets and environment-specific config.

In this guide, we will learn how to leverage environment variables inside an AdonisJS application.

Node.js natively exposes all the environment variables as an object through the process.env global property, and you may access them as follows.

Reading environment variables via the process.env object requires no setup on the AdonisJS side, as the Node.js runtime supports it. However, in the rest of this document, we will use the AdonisJS env module for the following reasons.

The env module is instantiated inside the start/env.ts file, and you may access it elsewhere inside your application as follows.

If you want to access environment variables within edge templates, then you must share the env module as a global variable with edge templates.

You can create view.ts as a preload file inside the start directory and write the following lines of code inside it.

Doing this will not expose the env module to the browser. The env module is only available during server-side rendering.

The validation rules for environment variables are defined inside the start/env.ts file using the Env.create method.

The validation is performed automatically when you first import this file. Typically, the start/env.ts file is imported by one of the config files in your project. If not, then AdonisJS will import this file implicitly before booting the application.

The Env.create method accepts the validation schema as a key-value pair.

The same validation rules are used to infer the static-type information. The type information is available when using the env module.

The schema.string method ensures the value is a valid string. Empty strings fail the validation, and you must use the optional variant to allow empty strings.

The string value can be validated for its formatting. Following is the list of available formats.

Validate the value to be a valid URL or an IP address.

Validate the value to be a valid URL. Optionally, you can make the validation less strict by allowing URLs not to have protocol or tld.

Validate the value to be a valid email address.

The schema.boolean method ensures the value is a valid boolean. Empty values fail the validation, and you must use the optional variant to allow empty values.

The string representations of 'true', '1', 'false', and '0' are cast to the boolean data type.

The schema.number method ensures the value is a valid number. The string representation of a number value is cast to the number data type.

The schema.enum method validates the environment variable against one of the pre-defined values. The enum options can be specified as an array of values or a TypeScript native enum type.

Custom functions can perform validations not covered by the schema API.

The function receives the name of the environment variable as the first argument and the value as the second argument. It must return the final value post-validation.

The environment variables are defined inside the .env file during development. The env module looks for this file within the project's root and automatically parses it (if it exists).

Using your deployment platform to define the environment variables is recommended in production. Most modern-day deployment platforms have first-class support for defining environment variables from their web UI.

Suppose your deployment platform provides no means for defining environment variables. You can create a .env file in the project root or at some different location on your production server.

AdonisJS will automatically read the .env file from the project root. However, you must set the ENV_PATH variable when the .env file is stored at some different location.

The environment variables specific to the test environment must be defined within the .env.test file. The values from this file override the values from the .env file.

Alongside the .env file, AdonisJS processes the environment variables from the following dot-env files. Therefore, you can optionally create these files (if needed).

The file with the top-most rank overrides the values from the bottom rank files.

You can define and use "identifiers" to change the interpolation behavior. The identifier is a string that prefix the environment variable value and let you customize the value resolution.

In the above example, the base64: prefix tells the env parser to decode the value from base64 before returning it.

Alternatively, you can define an identifier using the defineIdentifierIfMissing method. This method will not override the existing identifier.

You can directly use those methods inside the start/env.ts file.

Within dot-env files, you can reference other environment variables using the variable substitution syntax.

We compute the APP_URL from the HOST and the PORT properties in the following example.

All letter, numbers, and the underscore (_) after the $ sign are used to form a variable name. You must wrap the variable name inside curly braces {} if the name has special characters other than an underscore.

To use the $ sign as a value, you must escape it to prevent variable substitution.

**Examples:**

Example 1 (unknown):
```unknown
process.env.NODE_ENV
process.env.HOST
process.env.PORT
```

Example 2 (typescript):
```typescript
import env from '#start/env'

env.get('NODE_ENV')
env.get('HOST')
env.get('PORT')

// Returns 3333 when PORT is undefined
env.get('PORT', 3333)
```

Example 3 (typescript):
```typescript
import env from '#start/env'
import edge from 'edge.js'

edge.global('env', env)
```

Example 4 (typescript):
```typescript
import Env from '@adonisjs/core/env'

/**
 * App root is used to locate .env files inside
 * the project root.
 */
const APP_ROOT = new URL('../', import.meta.url)

export default await Env.create(APP_ROOT, {
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  CACHE_VIEWS: Env.schema.boolean(),
  SESSION_DRIVER: Env.schema.string(),
  NODE_ENV: Env.schema.enum([
    'development',
    'production',
    'test'
  ] as const),
})
```

---

## Folder structure

**URL:** https://docs.adonisjs.com/guides/getting-started/folder-structure

**Contents:**
- Folder structure
- The adonisrc.ts file
- The tsconfig.json file
- The sub-path imports
- The bin directory
- The ace.js file
- The app directory
- The resources directory
- The start directory
- The public directory

In this guide, we will take a tour of the important files and folders created by AdonisJS during the installation process.

We ship with a thoughtful default folder structure that helps you keep your projects tidy and easy to refactor. However, you have all the freedom to diverge and have a folder structure that works great for your team and project.

The adonisrc.ts file is used to configure the workspace and some of the runtime settings of your application.

In this file, you can register providers, define command aliases, or specify the files to copy to the production build.

See also: AdonisRC file reference guide

The tsconfig.json file stores the TypeScript configuration for your application. Feel free to make changes to this file as per your project or team's requirements.

The following configuration options are required for AdonisJS internals to work correctly.

AdonisJS uses the sub-path imports feature from Node.js to define the import aliases.

The following import aliases are pre-configured within the package.json file. Feel free to add new aliases or edit the existing ones.

The bin directory has the entry point files to load your application in a specific environment. For example:

The ace file boots the command-line framework that is local to your app. So every time you run an ace command, it goes through this file.

If you notice, the ace file ends with a .js extension. This is because we want to run this file using the node binary without compiling it.

The app directory organizes code for the domain logic of your application. For example, the controllers, models, services, etc., all live within the app directory.

Feel free to create additional directories to better organize your application code.

The resources directory contains the Edge templates, alongside the source files of your frontend code. In other words, the code for the presentation layer of your app lives within the resources directory.

The start directory contains the files you want to import during the boot lifecycle of the application. For example, the files to register routes and define event listeners should live within the start directory.

AdonisJS does not auto-import files from the start directory. It is merely used as a convention to group similar files.

We recommend reading about preload files and the application boot lifecycle to have a better understanding of which files to keep under the start directory.

The public directory hosts static assets like CSS files, images, fonts, or the frontend JavaScript.

Do not confuse the public directory with the resources directory. The resources directory contains the source code of your frontend application, and the public directory has the compiled output.

When using Vite, you should store the frontend assets inside the resources/<SUB_DIR> directories and let the Vite compiler create the output in the public directory.

On the other hand, if you are not using Vite, you can create files directly inside the public directory and access them using the filename. For example, you can access the ./public/style.css file from the http://localhost:3333/style.css URL.

The database directory contains files for database migrations and seeders.

The ace commands are stored within the commands directory. You can create commands inside this folder by running node ace make:command.

The config directory contains the runtime configuration files for your application.

The framework's core and other installed packages read configuration files from this directory. You can also store config local to your application inside this directory.

Learn more about configuration management.

The types directory is the house for the TypeScript interfaces or types used within your application.

The directory is empty by default, however, you can create files and folders within the types directory to define custom types and interfaces.

The providers directory is used to store the service providers used by your application. You can create new providers using the node ace make:provider command.

Learn more about service providers

The temporary files generated by your application are stored within the tmp directory. For example, these could be user-uploaded files (generated during development) or logs written to the disk.

The tmp directory must be ignored by the .gitignore rules, and you should not copy it to the production server either.

The tests directory organizes your application tests. Further, sub-directories are created for unit and functional tests.

Environment variables

**Examples:**

Example 1 (json):
```json
{
  "compilerOptions": {
    "module": "NodeNext",
    "isolatedModules": true,
    "declaration": false,
    "outDir": "./build",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true
  }
}
```

Example 2 (json):
```json
{
  "imports": {
    "#controllers/*": "./app/controllers/*.js",
    "#exceptions/*": "./app/exceptions/*.js",
    "#models/*": "./app/models/*.js",
    "#mails/*": "./app/mails/*.js",
    "#services/*": "./app/services/*.js",
    "#listeners/*": "./app/listeners/*.js",
    "#events/*": "./app/events/*.js",
    "#middleware/*": "./app/middleware/*.js",
    "#validators/*": "./app/validators/*.js",
    "#providers/*": "./app/providers/*.js",
    "#policies/*": "./app/policies/*.js",
    "#abilities/*": "./app/abilities/*.js",
    "#database/*": "./database/*.js",
    "#tests/*": "./tests/*.js",
    "#start/*": "./start/*.js",
    "#config/*": "./config/*.js"
  }
}
```

Example 3 (unknown):
```unknown
├── app
│  └── controllers
│  └── exceptions
│  └── middleware
│  └── models
│  └── validators
```

Example 4 (unknown):
```unknown
├── resources
│  └── views
│  └── js
│  └── css
│  └── fonts
│  └── images
```

---

## Deployment

**URL:** https://docs.adonisjs.com/guides/getting-started/deployment

**Contents:**
- Deployment
- Creating production build
  - Creating a Docker image
- Configuring a reverse proxy
- Defining environment variables
- Starting the production server
- Migrating database
  - When to run migrations
  - Do not rollback in production
  - Concurrent migrations

Deploying an AdonisJS application is no different than deploying a standard Node.js application. You need a server running Node.js >= 20.6 along with npm to install production dependencies.

This guide will cover the generic guidelines to deploy and run an AdonisJS application in production.

As a first step, you must create the production build of your AdonisJS application by running the build command.

See also: TypeScript build process

The compiled output is written inside the ./build directory. If you use Vite, its output will be written inside the ./build/public directory.

Once you have created the production build, you may copy the ./build folder to your production server. From now on, the build folder will be the root of your application.

If you are using Docker to deploy your application, you may create a Docker image using the following Dockerfile.

Feel free to modify the Dockerfile to suit your needs.

Node.js applications are usually deployed behind a reverse proxy server like Nginx. So the incoming traffic on ports 80 and 443 will be handled by Nginx first and then forwarded to your Node.js application.

Following is an example Nginx config file you may use as the starting point.

Make sure to replace the values inside the angle brackets <>.

If you are deploying your application on a bare-bone server, like a DigitalOcean Droplet or an EC2 instance, you may use an .env file to define the environment variables. Ensure the file is stored securely and only authorized users can access it.

If you are using a deployment platform like Heroku or Cleavr, you may use their control panel to define the environment variables.

Assuming you have created the .env file in an /etc/secrets directory, you must start your production server as follows.

The ENV_PATH environment variable instructs AdonisJS to look for the .env file inside the mentioned directory.

You may start the production server by running the node server.js file. However, it is recommended to use a process manager like pm2.

Following is an example pm2 ecosystem file you may use as the starting point.

If you are using a SQL database, you must run the database migrations on the production server to create the required tables.

If you are using Lucid, you may run the following command.

The --force flag is required when running migrations in the production environment.

Also, it would be best if you always run the migrations before restarting the server. Then, if the migration fails, do not restart the server.

Using a managed service like Cleavr or Heroku, they can automatically handle this use case. Otherwise, you will have to run the migration script inside a CI/CD pipeline or run it manually through SSH.

Rolling back migrations in production is a risky operation. The down method in your migration files usually contains destructive actions like drop the table, or remove a column, and so on.

It is recommended to turn off rollbacks in production inside the config/database.ts file and instead, create a new migration to fix the issue and run it on the production server.

Disabling rollbacks in production will ensure that the node ace migration:rollback command results in an error.

If you are running migrations on a server with multiple instances, you must ensure that only one instance runs the migrations.

For MySQL and PostgreSQL, Lucid will obtain advisory locks to ensure that concurrent migration is not allowed. However, it is better to avoid running migrations from multiple servers in the first place.

Environments like Amazon EKS, Google Kubernetes, Heroku, DigitalOcean Apps, and so on, run your application code inside an ephemeral filesystem, which means that each deployment, by default, will nuke the existing filesystem and creates a fresh one.

If your application allows users to upload files, you must use a persistent storage service like Amazon S3, Google Cloud Storage, or DigitalOcean Spaces instead of relying on the local filesystem.

AdonisJS uses the pino logger by default, which writes logs to the console in JSON format. You can either set up an external logging service to read the logs from stdout/stderr, or forward them to a local file on the same server.

Serving static assets effectively is essential for the performance of your application. Regardless of how fast your AdonisJS applications are, the delivery of static assets plays a massive role to a better user experience.

The best approach is to use a CDN (Content Delivery Network) for delivering the static assets from your AdonisJS application.

The frontend assets compiled using Vite are fingerprinted by default, which means that the file names are hashed based on their content. This allows you to cache the assets forever and serve them from a CDN.

Depending upon the CDN service you are using and your deployment technique, you may have to add a step to your deployment process to move the static files to the CDN server. This is how it should work in a nutshell.

Update the vite.config.js and config/vite.ts configuration to use the CDN URL.

Run the build command to compile the application and the assets.

Copy the output of public/assets to your CDN server. For example, here is a command we use to publish the assets to an Amazon S3 bucket.

Another option is to offload the task of serving assets to Nginx. If you use Vite to compile the front-end assets, you must aggressively cache all the static files since they are fingerprinted.

Add the following block to your Nginx config file. Make sure to replace the values inside the angle brackets <>.

You can also rely on the AdonisJS inbuilt static file server to serve the static assets from the public directory to keep things simple.

No additional configuration is required. Just deploy your AdonisJS application as usual, and the request for static assets will be served automatically.

The static file server is not recommended for production use. It is best to use a CDN or Nginx to serve static assets.

**Examples:**

Example 1 (unknown):
```unknown
node ace build
```

Example 2 (sql):
```sql
FROM node:22.16.0-alpine3.22 AS base

# All deps stage
FROM base AS deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci

# Production only deps stage
FROM base AS production-deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci --omit=dev

# Build stage
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build

# Production stage
FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
EXPOSE 8080
CMD ["node", "./bin/server.js"]
```

Example 3 (typescript):
```typescript
server {
  listen 80;
  listen [::]:80;

  server_name <APP_DOMAIN.COM>;

  location / {
    proxy_pass http://localhost:<ADONIS_PORT>;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_cache_bypass $http_upgrade;
  }
}
```

Example 4 (unknown):
```unknown
ENV_PATH=/etc/secrets node build/bin/server.js
```

---

## Configuration

**URL:** https://docs.adonisjs.com/guides/getting-started/configuration

**Contents:**
- Configuration
- Importing config files
- Using the config service
  - Config service vs. directly importing config files
  - Reading config inside external packages
  - Reading config inside Edge templates
- Changing the config location
- Config files limitations
- Updating config at runtime

The configuration files of your AdonisJS application are stored inside the config directory. A brand new AdonisJS application comes with a handful of pre-existing files used by the framework core and installed packages.

Feel free to create additional files your application requires inside the config directory.

We recommend using environment variables for storing secrets and environment-specific configuration.

You may import the configuration files within your application codebase using the standard JavaScript import statement. For example:

When you import a config files, you get access to the exported values. In most cases, these exports are ConfigProvider instances, so directly using their values is not recommended. Instead, read the values from the resolved config.

The config service offers an alternate API for reading the configuration values. In the following example, we use the config service to read the appKey value stored within the config/app.ts file.

The config.get method accepts a dot-separated key and parses it as follows.

Using the config service over directly importing the config files has no direct benefits. However, the config service is the only choice to read the configuration in external packages and edge templates.

If you are creating a third-party package, you should not directly import the config files from the user application because it will make your package tightly coupled with the folder structure of the host application.

Instead, you should use the config service to access the config values inside a service provider. For example:

You may access configuration values inside edge templates using the config global method.

You can use the config.has method to check if a configuration value exists for a given key. The method returns false if the value is undefined.

You can update the location for the config directory by modifying the adonisrc.ts file. After the change, the config files will be imported from the new location.

Make sure to update the import alias within the package.json file.

The config files stored within the config directory are imported during the boot phase of the application. As a result, the config files cannot rely on the application code.

For example, if you try to import and use the router service inside the config/app.ts file, the application will fail to start. This is because the router service is not configured until the app is in a booted state.

Fundamentally, this limitation positively impacts your codebase because the application code should rely on the config, not vice versa.

You can mutate the config values at runtime using the config service. The config.set updates the value within the memory, and no changes are made to the files on the disk.

The config value is mutated for the entire application, not just for a single HTTP request. This is because Node.js is not a threaded runtime, and the memory in Node.js is shared between multiple HTTP requests.

Environment variables

**Examples:**

Example 1 (typescript):
```typescript
import { appKey } from '#config/app'
```

Example 2 (typescript):
```typescript
import databaseConfig from '#config/database'
```

Example 3 (typescript):
```typescript
import config from '@adonisjs/core/services/config'

config.get('app.appKey')
config.get('app.http.cookie') // read nested values
```

Example 4 (typescript):
```typescript
import { ApplicationService } from '@adonisjs/core/types'

export default class DriveServiceProvider {
  constructor(protected app: ApplicationService) {}
  
  register() {
    this.app.container.singleton('drive', () => {
      const driveConfig = this.app.config.get('drive')
      return new DriveManager(driveConfig)
    })
  }
}
```

---

## Installation

**URL:** https://docs.adonisjs.com/guides/getting-started/installation

**Contents:**
- Installation
- Creating a new application
- Starter kits
  - Web starter kit
  - API starter kit
  - Slim starter kit
  - Inertia starter kit
  - Bring your starter kit
- Starting the development server
- Building for production

Before creating a new application, you should ensure that you have Node.js and npm installed on your computer. AdonisJS needs Node.js version 20 or higher.

You may install Node.js using either the official installers or Volta. Volta is a cross-platform package manager that installs and runs multiple Node.js versions on your computer.

Are you more of a visual learner? - Checkout the Let's Learn AdonisJS 6 free screencasts series from our friends at Adocasts.

You may create a new project using npm init. These commands will download the create-adonisjs initializer package and begin the installation process.

You may customize the initial project output using one of the following CLI flags.

--kit: Select the starter kit for the project. You can choose between web, api, slim or inertia.

--db: Specify the database dialect of your choice. You can choose between sqlite, postgres, mysql, or mssql.

--git-init: Initiate the git repository. Defaults to false.

--auth-guard: Specify the authentication guard of your choice. You can choose between session, access_tokens, or basic_auth.

When passing CLI flags using the npm init command, make sure to use double dashes twice. Otherwise, npm init will not pass the flags to the create-adonisjs initializer package. For example:

Starter kits serve as a starting point for creating applications using AdonisJS. They come with an opinionated folder structure, pre-configured AdonisJS packages, and the necessary tooling you need during development.

The official starter kits use ES modules and TypeScript. This combination allows you to use modern JavaScript constructs and leverage static-type safety.

The Web starter kit is tailored for creating traditional server renderer web apps. Do not let the keyword "traditional" discourage you. We recommend this starter kit if you make a web app with limited frontend interactivity.

The simplicity of rendering HTML on the server using Edge.js will boost your productivity as you do not have to deal with complex build systems to render some HTML.

Later, you can use Hotwire, HTMX, or Unpoly to make your applications navigate like an SPA and use Alpine.js to create interactive widgets like a dropdown or a modal.

The web starter kit comes with the following packages.

The API starter kit is tailored for creating JSON API servers. It is a trimmed-down version of the web starter kit. If you plan to build your frontend app using React or Vue, you may create your AdonisJS backend using the API starter kit.

The API starter kit is configured with session-based authentication. However, if you wish to use tokens-based authentication, you can use the --auth-guard flag.

See also: Which authentication guard should I use?

For minimalists, we have created a slim starter kit. It comes with just the core of the framework and the default folder structure. You may use it when you do not want any bells and whistles of AdonisJS.

Inertia is a way to build server-driven single-page applications. You can use your favorite frontend framework ( React, Vue, Solid, Svelte ) to build the frontend of your application.

You can use the --adapter flag to choose the frontend framework you want to use. The available options are react, vue, solid, and svelte.

You can also use the --ssr and --no-ssr flags to turn server-side rendering on or off.

Starter kits are pre-built projects hosted with a Git repository provider like GitHub, Bitbucket, or GitLab. You can also create your starter kits and download them as follows.

You can download private repos using Git+SSH authentication using the git mode.

Finally, you can specify a tag, branch, or commit.

Once you have created an AdonisJS application, you may start the development server by running the node ace serve command.

Ace is a command line framework bundled inside the framework's core. The --hmr flag monitors the file system and performs hot module replacement (HMR) for certain sections of your codebase.

Once the development server runs, you may visit http://localhost:3333 to view your application in a browser.

Since AdonisJS applications are written in TypeScript, they must be compiled into JavaScript before running in production.

You may create the JavaScript output using the node ace build command. The JavaScript output is written to the build directory.

When Vite is configured, this command also compiles the frontend assets using Vite and writes the output to the build/public folder.

See also: TypeScript build process.

While AdonisJS takes care of building the end-user applications, you may need additional tools to enjoy the development process and have consistency in your coding style.

We strongly recommend you use ESLint to lint your code and use Prettier to re-format your code for consistency.

The official starter kits come pre-configured with both ESLint and Prettier and use the opinionated presets from the AdonisJS core team. You can learn more about them in the Tooling config section of the docs.

Finally, we recommend you install ESLint and Prettier plugins for your code editor so that you have a tighter feedback loop during the application development. Also, you can use the following commands to lint and format your code from the command line.

You can develop an AdonisJS application on any code editor supporting TypeScript. However, we have developed several extensions for VSCode to enhance the development experience further.

AdonisJS - View application routes, run ace commands, migrate the database, and read documentation directly from your code editor.

Edge - Supercharge your development workflow with support for syntax highlighting, autocompletion, and code snippets.

Japa - Run tests without leaving your code editor using Keyboard shortcuts or run them directly from the activity sidebar.

**Examples:**

Example 1 (markdown):
```markdown
node -v
# v22.0.0
```

Example 2 (python):
```python
npm init adonisjs@latest hello-world
```

Example 3 (markdown):
```markdown
# Create a project and get prompted for all options
npm init adonisjs@latest hello-world

# Create a project with MySQL
npm init adonisjs@latest hello-world -- --db=mysql

# Create a project with PostgreSQL and API starter kit
npm init adonisjs@latest hello-world -- --db=postgres --kit=api

# Create a project with API starter kit and access tokens guard
npm init adonisjs@latest hello-world -- --kit=api --auth-guard=access_tokens
```

Example 4 (markdown):
```markdown
npm init adonisjs@latest -- -K=web

# Switch database dialect
npm init adonisjs@latest -- -K=web --db=mysql
```

---
