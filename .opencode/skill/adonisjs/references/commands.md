# Adonisjs - Commands

**Pages:** 10

---

## Command arguments

**URL:** https://docs.adonisjs.com/guides/ace/arguments

**Contents:**
- Command arguments
- Argument name and description
- Optional arguments with a default value
- Processing argument value
- Accessing all arguments

Arguments refer to the positional arguments mentioned after the command name. Since arguments are positional, passing them in the correct order is necessary.

You must define command arguments as class properties and decorate them using the args decorator. The arguments will be accepted in the same order as they are defined in the class.

In the following example, we use the @args.string decorator to define an argument that accepts a string value.

To accept multiple values under the same argument name, you may use the @args.spread decorator. Do note, the spread argument must be the last.

The argument name is displayed on the help screen. By default, the argument name is a dashed case representation of the class property name. However, you can define a custom value as well.

The argument description is shown on the help screen and can be set using the description option.

By default, all arguments are required. However, you can make them optional by setting the required option to false. The optional arguments must be at the end.

You may set the default value of an optional argument using the default property.

Using the parse method, you can process the argument value before it is defined as the class property.

You can access all the arguments mentioned while running the command using the this.parsed.args property.

**Examples:**

Example 1 (typescript):
```typescript
import { BaseCommand, args, flags } from '@adonisjs/core/ace'

export default class GreetCommand extends BaseCommand {
  static commandName = 'greet'
  static description = 'Greet a user by name'
  
  @args.string()
  declare name: string

  run() {
    console.log(this.name)
  }
}
```

Example 2 (typescript):
```typescript
import { BaseCommand, args, flags } from '@adonisjs/core/ace'

export default class GreetCommand extends BaseCommand {
  static commandName = 'greet'
  static description = 'Greet a user by name'
  
  @args.spread()
  declare names: string[]

  run() {
    console.log(this.names)
  }
}
```

Example 3 (typescript):
```typescript
@args.string({
  argumentName: 'user-name'
})
declare name: string
```

Example 4 (typescript):
```typescript
@args.string({
  argumentName: 'user-name',
  description: 'Name of the user'
})
declare name: string
```

---

## FAQs

**URL:** https://docs.adonisjs.com/guides/preface/faqs

**Contents:**
- FAQs
- Who maintains AdonisJS?
- How is AdonisJS licensed?
- Is AdonisJS reliable and well-maintained?
- Is AdonisJS fast?
- Do you offer paid support?
- How do I stay up to date with AdonisJS?

AdonisJS is an independent project created by Harminder Virk in 2015. The framework is actively maintained by the core team and community contributors.

The framework creator (Harminder Virk) is the project lead and works full-time on the framework.

The project is funded through GitHub Sponsors. If you or your business benefit from AdonisJS, consider sponsoring us to support the framework development.

AdonisJS (the framework) and the official packages are distributed under the MIT License. In addition, the source code is publicly available on GitHub.

AdonisJS is used in production by Marie Claire, Cleavr, Ledger, Cavai, Kayako, Renault Group, Zakodium, FIVB, and many more companies in varying capacities.

The framework creator works full-time on AdonisJS and ensures the framework is actively improved and maintained.

When creating the framework or adding new features, we primarily focus on solving real-world problems rather than cutting down the functionality to make AdonisJS win the benchmark Olympics.

However, we look closer at the performance metrics and fine-tune the framework performance wherever it matters. For example:

Yes! On our website, you can learn more about the priority support program.

Check out the following links to stay connected and up-to-date.

---

## Introduction

**URL:** https://docs.adonisjs.com/guides/ace/introduction

**Contents:**
- Introduction
- Help and list commands
- Enabling/disabling colors
- Creating command aliases
  - How alias expansion works?
- Running commands programmatically

Ace is a command line framework used by AdonisJS to create and run console commands. The entry point file for Ace is stored in the root of your project, and you can execute it as follows.

Since the node binary cannot run the TypeScript source code directly, we have to keep the ace file in pure JavaScript and use the .js extension.

Under the hood, the ace.js file registers TS Node as an ESM module loader hook to execute the TypeScript code and imports the bin/console.ts file.

You can view the list of available commands by running the ace entry point file without any arguments or using the list command.

You can view help for a single command by typing the command name with the --help flag.

The output of the help screen is formatted as per the docopt standard.

Ace detects the CLI environment in which it is running and disables the colorful output if the terminal does not support colors. However, you can manually enable or disable colors using the --ansi flag.

Command aliases provide a convenience layer to define aliases for commonly used commands. For example, if you often create singular resourceful controllers, you may create an alias for it inside the adonisrc.ts file.

Once the alias is defined, you can use the alias to run the command.

Every time you run a command, Ace will check for aliases inside the commandsAliases object.

If an alias exists, the first segment (before the space) will be used to look up the command.

If a command exists, the rest of the alias value segments will be appended to the command name.

For example, if you run the following command

It will be expanded to

You can use the ace service to execute commands programmatically. The ace service is available after the application has been booted.

The ace.exec method accepts the command name as the first parameter and an array of command line arguments as the second parameter. For example:

You may use the ace.hasCommand method to check if a command exists before executing it.

**Examples:**

Example 1 (markdown):
```markdown
node ace

# Same as above
node ace list
```

Example 2 (unknown):
```unknown
node ace make:controller --help
```

Example 3 (markdown):
```markdown
# Disable colors
node ace list --no-ansi

# Force enable colors
node ace list --ansi
```

Example 4 (typescript):
```typescript
{
  commandsAliases: {
    resource: 'make:controller --resource --singular'
  }
}
```

---

## Creating commands

**URL:** https://docs.adonisjs.com/guides/ace/creating-commands

**Contents:**
- Creating commands
- Command metadata
- Command lifecycle methods
- Dependency injection
- Handling errors and exit code
  - Handling errors with try/catch
  - Handling errors inside the completed method
- Terminating application
- Cleaning up before the app terminates

Alongside using Ace commands, you may also create custom commands as part of your application codebase. The commands are stored inside the commands directory (at the root level). You may create a command by running the following command.

See also: Make command

The above command will create a greet.ts file inside the commands directory. Ace commands are represented by a class and must implement the run method to execute the command instructions.

The command metadata consists of the command name, description, help text, and the options to configure the command behavior.

The commandName property is used to define the command name. A command name should not contain spaces. Also, it is recommended to avoid using unfamiliar special characters like *, &, or slashes in the command name.

The command names can be under a namespace. For example, to define a command under the make namespace, you may prefix it with make:.

The command description is shown inside the commands list and on the command help screen. You must keep the description short and use the help text for longer descriptions.

The help text is used to write a longer description or show usage examples.

The {{ binaryName }} variable substitution is a reference to the binary used to execute ace commands.

You may define one or more aliases for the command name using the aliases property.

By default, AdonisJS does not boot the application when running an Ace command. This ensures that the commands are quick to run and do not go through the application boot phase to perform simple tasks.

However, if your command relies on the application state, you can tell Ace to start the app before executing the command.

By default, Ace prints an error if you pass an unknown flag to the command. However, you can disable strict flags parsing at the command level using the options.allowUnknownFlags property.

AdonisJS implicitly terminates the app after executing the command's run command. However, if you want to start a long-running process in a command, you must tell Ace not to kill the process.

See also: Terminating app and cleaning up before the app terminates sections.

You may define the following lifecycle methods on a command class, and Ace will execute them in a pre-defined order.

Ace commands are constructed and executed using the IoC container. Therefore, you can type-hint dependencies on command lifecycle methods and use the @inject decorator to resolve them.

For demonstration, let's inject the UserService class in all the lifecycle methods.

Exceptions raised by commands are displayed using the CLI logger, and the command exitCode is set to 1 (a non-zero error code means the command failed).

However, you may also capture errors by wrapping your code inside a try/catch block or using the completed lifecycle method to handle errors. In either situation, remember to update the command exitCode and error properties.

By default, Ace will terminate the application after executing the command. However, if you have enabled the staysAlive option, you will have to explicitly terminate the application using the this.terminate method.

Let's assume we make a redis connection to monitor the server memory. We listen for the error event on the redis connection and terminate the app when the connection fails.

Multiple events can trigger an application to terminate, including the SIGTERM signal. Therefore, you must listen for the terminating hook in your commands to perform the cleanup.

You can listen for the terminating hook inside the prepare lifecycle method.

**Examples:**

Example 1 (unknown):
```unknown
node ace make:command greet
```

Example 2 (typescript):
```typescript
import { BaseCommand } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'

export default class GreetCommand extends BaseCommand {
  static commandName = 'greet'
  static description = 'Greet a user by name'

  static options: CommandOptions = {
    startApp: false,
    allowUnknownFlags: false,
    staysAlive: false,
  }
}
```

Example 3 (typescript):
```typescript
export default class GreetCommand extends BaseCommand {
  static help = [
    'The greet command is used to greet a user by name',
    '',
    'You can also send flowers to a user, if they have an updated address',
    '{{ binaryName }} greet --send-flowers',
  ]
}
```

Example 4 (typescript):
```typescript
export default class GreetCommand extends BaseCommand {
  static commandName = 'greet'
  static aliases = ['welcome', 'sayhi']
}
```

---

## Governance

**URL:** https://docs.adonisjs.com/guides/preface/governance

**Contents:**
- Governance
- Roles and responsibilities
  - Authors
  - Project Leads
  - Core team
    - Active Core Team Members
    - Core Team Emeriti
  - Contributors
  - Users
- Support

Harminder Virk (the creator of AdonisJS) serves as the Project Author. The project author is responsible for the project's governance, standards, and direction. To summarize:

AdonisJS is a combination of several packages created and managed by the core team. All of these packages are led by a project lead selected by the project Author.

In almost every case, the creator of the package serves as the project lead since they are the ones who have put the initial efforts into bringing the idea to life.

The project lead has the final say in all aspects of decision-making within the project. However, because the community always has the ability to fork, this person is fully answerable to the community. It is the project lead's responsibility to set the strategic objectives of the project and communicate these clearly to the community. They also have to understand the community as a whole and strive to satisfy as many conflicting needs as possible while ensuring that the project survives in the long term.

In many ways, the role of the project lead is about diplomacy. The key is to ensure that, as the project expands, the right people are given influence over it, and the community rallies behind the vision of the project lead. The lead's job is then to ensure that the core team members (see below) make the right decisions on behalf of the project. Generally speaking, as long as the core team members are aligned with the project's strategy, the project lead will allow them to proceed as desired.

A project lead cannot archive or decide to remove the project from the AdonisJS umbrella. They can decide to stop working on the project, and in that case, we will find a new project lead.

Members of the core team are contributors who have made multiple valuable contributions to the project and are now relied upon to both write code directly to the repository and screen the contributions of others. In many cases, they are programmers, but it is also possible that they contribute in a different role, for example, community engagement. Typically, a core team member will focus on a specific aspect of the project and will bring a level of expertise and understanding that earns them the respect of the community and the project lead. The role of core team member is not an official one, it is simply a position that influential members of the community will find themselves in as the project lead looks to them for guidance and support.

Core team members have no authority over the overall direction of the project. However, they do have the ear of the project lead. It is a core team member's job to ensure that the lead is aware of the community's needs and collective objectives, and to help develop or elicit appropriate contributions to the project. Often, core team members are given informal control over their specific areas of responsibility, and are assigned rights to directly modify certain areas of the source code. That is, although core team members do not have explicit decision-making authority, they will often find that their actions are synonymous with the decisions made by the lead.

Active Core Team Members contribute to the project on a regular basis. An active core team member usually has one or more focus areas - in the most common cases, they will be responsible for the regular issue triaging, bug fixing, documentation improvements or feature development in a subproject repository.

Some core team members who have made valuable contributions in the past may no longer be able to commit to the same level of participation today due to various reasons. That is perfectly normal, and any past contributions to the project are still highly appreciated. These core team members are honored for their contributions as Core Team Emeriti, and are welcome to resume active participation at any time.

Contributors are community members who either have no desire to become core team members, or have not yet been given the opportunity by the project lead. They make valuable contributions, such as those outlined in the list below, but generally do not have the authority to make direct changes to the project code. Contributors engage with the project through communication tools, such as the RFC discussions, GitHub issues and pull requests, Discord chatroom, and the forum.

Anyone can become a contributor. There is no expectation of commitment to the project, no specific skill requirements and no selection process. To become a contributor, a community member simply has to perform one or more actions that are beneficial to the project.

Some contributors will already be engaging with the project as users, but will also find themselves doing one or more of the following:

As contributors gain experience and familiarity with the project, they may find that the project lead starts relying on them more and more. When this begins to happen, they gradually adopt the role of core team member, as described above.

Users are community members who have a need for the project. They are the most important members of the community: without them, the project would have no purpose. Anyone can be a user; there are no specific requirements.

Users should be encouraged to participate in the life of the project and the community as much as possible. User contributions enable the project team to ensure that they are satisfying the needs of those users. Common user activities include (but are not limited to):

Users who continue to engage with the project and its community will often find themselves becoming more and more involved. Such users may then go on to become contributors, as described above.

All participants in the community are encouraged to provide support for new users within the project management infrastructure. This support is provided as a way of growing the community. Those seeking support should recognize that all support activity within the project is voluntary and is therefore provided as and when time allows. A user requiring guaranteed response times or results should therefore seek to purchase a support contract. However, for those willing to engage with the project on its terms, and willing to help support other users, the community support channels are ideal.

For an open development project, money is less important than active contribution. However, some people or organizations are cash-rich and time-poor and would prefer to make their contribution in the form of cash. If you want to make a significant donation, you may be able to sponsor us to implement a new feature or fix some bugs. The project website provides clear guidance on how to go about donating.

If you run a business using the project as a revenue-generating product, it makes business sense to sponsor its development. It ensures the project that your product relies on stays healthy and actively maintained. It can also improve exposure in our community and make it easier to attract new developers.

AdonisJS (spelled with "JS" at the end) is a registered trademark of Harminder Virk.

Only the projects under the @adonisjs npm scope and the AdonisJS GitHub organization are managed and officially supported by the core team.

Also, you must not use the AdonisJS name or logos in a way that could mistakenly imply any official connection with or endorsement of AdonisJS. Any use of the AdonisJS name or logos in a manner that could cause customer confusion is not permitted.

This includes naming a product or service in a way that emphasizes the AdonisJS brand, like "AdonisJS UIKit" or "AdonisJS Studio", as well as in domain names like "adonisjs-studio.com".

Instead, you must use your own brand name in a way that clearly distinguishes it from AdonisJS.

Additionally, you may not use our trademarks for t-shirts, stickers, or other merchandise without explicit written consent.

Projects under the AdonisJS umbrella are the intellectual property of the Project Author. Once a project created by a project lead becomes part of the "AdonisJS GitHub organization," or if it is published under the @adonisjs npm scope, the project leads cannot delete or abandon the project.

This governance document is based upon the Benevolent Dictator Governance Model by Ross Gardler and Gabriel Hanganu, licensed under a Creative Commons Attribution-ShareAlike 4.0 International License. This document itself is also licensed under the same license.

---

## Introduction

**URL:** https://docs.adonisjs.com/guides/preface/introduction

**Contents:**
- Introduction
  - Getting started
  - Community and Help
  - Translations
- What is AdonisJS?
  - Frontend agnostic
  - Modern and Type-safe
  - Embracing MVC
- Guides assumptions
- Recent releases

The following translations are not official and managed by the community

AdonisJS is a TypeScript-first web framework for Node.js. You can use it to create a full-stack web application or a JSON API server.

At the fundamental level, AdonisJS provides structure to your applications, configures a seamless TypeScript development environment, configures HMR for your backend code, and offers a vast collection of well-maintained and extensively documented packages.

We envision teams using AdonisJS spending less time on trivial decisions like cherry-picking npm packages for every minor feature, writing glue code, debating for the perfect folder structure, and spending more time delivering real-world features critical for the business needs.

AdonisJS focuses on the backend and lets you choose the frontend stack of your choice.

If you like to keep things simple, pair AdonisJS with a traditional template engine to generate static HTML on the server, create a JSON API for your frontend Vue/React application or use Inertia to make your favorite frontend framework work together in perfect harmony.

AdonisJS aims to provide you with batteries to create a robust backend application from scratch. Be it sending emails, validating user input, performing CRUD operations, or authenticating users. We take care of it all.

AdonisJS is built on top of modern JavaScript primitives. We use ES modules, Node.js sub-path import aliases, SWC for executing TypeScript source, and Vite for assets bundling.

Also, TypeScript plays a considerable role when designing the framework's APIs. For example, AdonisJS has:

AdonisJS embraces the classic MVC design pattern. You start by defining the routes using the functional JavaScript API, bind controllers to them and write logic to handle the HTTP requests within the controllers.

Controllers can use models to fetch data from the database and render a view (aka template) as a response.

If you are building an API server, you can replace the view layer with a JSON response. But, the flow of handling and responding to the HTTP requests remains the same.

The AdonisJS documentation is written as a reference guide, covering the usage and the API of several packages and modules maintained by the core team.

The guide does not teach you how to build an application from scratch. If you are looking for a tutorial, we recommend starting your journey with Adocasts. Tom (the creator of Adocasts) has created some high quality screencasts, helping you to take the first steps with AdonisJS.

With that said, the documentation extensively covers the usage of available modules and the inner workings of the framework.

Following is the list of recent releases. Click here to view all the releases.

List of individuals and companies publicly sponsoring Harminder Virk on GitHub. If you are sponsoring and cannot see your name, ensure your sponsorship is not private.

**Examples:**

Example 1 (typescript):
```typescript
import router from '@adonisjs/core/services/router'
const PostsController = () => import('#controllers/posts_controller')

router.get('posts', [PostsController, 'index'])
```

Example 2 (typescript):
```typescript
import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async index({ view }: HttpContext) {
    const posts = await Post.all()
    return view.render('pages/posts/list', { posts })
  }
}
```

Example 3 (typescript):
```typescript
import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async index({ view }: HttpContext) {
    const posts = await Post.all()
    return view.render('pages/posts/list', { posts })
    /**
     * Posts array will be serialized to JSON
     * automatically.
     */
    return posts
  }
}
```

---

## Contributing

**URL:** https://docs.adonisjs.com/guides/preface/contribution-guide

**Contents:**
- Contributing
- Reporting bugs
- Having a discussion
- Educating others
- Creating pull requests
- Repository setup
- Tools in use
- Commands
- Coding style
- Getting recognized as a contributor

This is a general contribution guide for all of the AdonisJS repos. Please read this guide thoroughly before contributing to any of the repos 🙏

Code is not the only way to contribute. Following are also some ways to contribute and become part of the community.

Many issues reported on open source projects are usually questions or misconfiguration at the reporter's end. Therefore, we highly recommend you properly troubleshoot your issues before reporting them.

If you're reporting a bug, include as much information as possible with the code samples you have written. The scale of good to bad issues looks as follows.

PERFECT ISSUE: You isolate the underlying bug. Create a failing test in the repo and open a Github issue around it.

GOOD ISSUE: You isolate the underlying bug and provide a minimal reproduction of it as a Github repo. Antfu has written a great article on Why Reproductions are Required.

DECENT ISSUE: You correctly state your issue. Share the code that produces the issue in the first place. Also, include the related configuration files and the package version you use.

Last but not least is to format every code block properly by following the Github markdown syntax guide.

POOR ISSUE: You dump the question you have with the hope that the other person will ask the relevant questions and help you. These kinds of issues are closed automatically without any explanation.

You often want to discuss a topic or maybe share some ideas. In that case, create a discussion in the discussions forum under the 💡Ideas category.

Educating others is one of the best ways to contribute to any community and earn recognition.

You can use the 📚 Cookbooks category on our discussion forum to share an article with others. The cookbooks section is NOT strictly moderated, except the shared knowledge should be relevant to the project.

It is never a good experience to have your pull request declined after investing a lot of time and effort in writing the code. Therefore, we highly recommend you to kick off a discussion before starting any new work on your side.

Just start a discussion and explain what are you planning to contribute?

Are you trying to create a PR to fix a bug: PRs for bugs are mostly accepted once the bug has been confirmed.

Are you planning to add a new feature: Please thoroughly explain why this feature is required and share links to the learning material we can read to educate ourselves.

For example: If you are adding support for snapshot testing to Japa or AdonisJS. Then share the links I can use to learn more about snapshot testing in general.

Note: You should also be available to open additional PRs for documenting the contributed feature or improvement.

Start by cloning the repo on your local machine.

Install dependencies on your local. Please do not update any dependencies along with a feature request. If you find stale dependencies, create a separate PR to update them.

We use npm for managing dependencies, therefore do not use yarn or any other tool.

Run tests by executing the following command.

Following is the list of tools in use.

All of our projects are written in TypeScript and are moving to pure ESM.

Also, make sure to run the following commands before pushing the code.

We rely on GitHub to list all the repo contributors in the right-side panel of the repo. Following is an example of the same.

Also, we use the auto generate release notes feature of Github, which adds a reference to the contributor profile within the release notes.

**Examples:**

Example 1 (typescript):
```typescript
git clone <REPO_URL>
```

Example 2 (unknown):
```unknown
npm install
```

Example 3 (julia):
```julia
# Formats using prettier
npm run format

# Lints using Eslint
npm run lint
```

---

## Commands reference

**URL:** https://docs.adonisjs.com/guides/references/commands

**Contents:**
- Commands reference
- serve
- build
- add
- configure
- eject
- generate:key
- make:controller
- make:middleware
- make:event

In this guide, we cover the usage of all the commands shipped with the framework core and the official packages. You may also view the commands help using the node ace list command or the node ace <command-name> --help command.

The output of the help screen is formatted as per the docopt standard.

The serve uses the @adonisjs/assembler package to start the AdonisJS application in development environment. You can optionally watch for file changes and restart the HTTP server on every file change.

The serve command starts the development server (via the bin/server.ts file) as a child process. If you want to pass node arguments to the child process, you can define them before the command name.

Following is the list of available options you can pass to the serve command. Alternatively, use the --help flag to view the command's help.

Watch the filesystem and reload the server in HMR mode.

Watch the filesystem and always restart the process on file change.

Use polling to detect filesystem changes. You might want to use polling when using a Docker container for development.

Clear the terminal after every file change and before displaying the new logs. Use the --no-clear flag to retain old logs.

--assets | --no-assets

Start the assets bundle development server alongside the AdonisJS HTTP server. Use the --no-assets flag to turn off the assets bundler dev server.

Pass commandline arguments to the asset manager child process. For example, if you use vite, you can define its options as follows.

The build command uses the @adonisjs/assembler package to create the production build of your AdonisJS application. The following steps are performed to generate the build.

See also: TypeScript build process.

Following is the list of available options you can pass to the build command. Alternatively, use the --help flag to view the command's help.

The build command terminates the build process when your project has TypeScript errors. However, you can ignore those errors and finish the build using the --ignore-ts-errors flag.

The build command copies the package.json file alongside the lock file of the package manager your application is using.

We detect the package manager using the @antfu/install-pkg package. However, you can turn off detection by explicitly providing the package manager's name.

--assets | --no-assets

Bundle frontend assets alongside your backend application. Use the --no-assets flag to turn off the assets bundler dev server.

Pass commandline arguments to the asset manager child process. For example, if you use vite, you can define its options as follows.

The add command combines the npm install <package-name> and node ace configure commands. So, instead of running two separate commands, you can install and configure the package in one go using the add command.

The add command will automatically detect the package manager used by your application and use that to install the package. However, you can always opt for a specific package manager using the --package-manager CLI flag.

If the package can be configured using flags, you can pass them directly to the add command. Every unknown flag will be passed down to the configure command.

Enable verbose mode to display the package installation and configuration logs.

Passed down to the configure command. Force overwrite files when configuring the package. See the configure command for more information.

Define the package manager to use for installing the package. The value must be npm, pnpm, bun or yarn.

Install the package as a development dependency.

Configure a package after it has been installed. The command accepts the package name as the first argument.

Enable verbose mode to display the package installation logs.

The stubs system of AdonisJS does not overwrite existing files. For example, if you configure the @adonisjs/lucid package and your application already has a config/database.ts file, the configure process will not overwrite the existing config file.

However, you can force overwrite files using the --force flag.

Eject stubs from a given package to your application stubs directory. In the following example, we copy the make/controller stubs to our application for modification.

See also: Customizing stubs

Generate a cryptographically secure random key and write to the .env file as the APP_KEY environment variable.

Display the key on the terminal instead of writing it to the .env file. By default, the key is written to the env file.

The generate:key command does not write the key to the .env file when running your application in production. However, you can use the --force flag to override this behavior.

Create a new HTTP controller class. Controllers are created inside the app/controllers directory and use the following naming conventions.

You also generate a controller with custom action names, as shown in the following example.

Force the controller name to be in singular form.

Generate a controller with methods to perform CRUD operations on a resource.

The --api flag is similar to the --resource flag. However, it does not define the create and the edit methods since they are used to display forms.

Create a new middleware for HTTP requests. Middleware are stored inside the app/middleware directory and uses the following naming conventions.

Skip the middleware stack selection prompt by defining the stack explicitly. The value must be server, named, or router.

Create a new event class. Events are stored inside the app/events directory and use the following naming conventions.

Create a new VineJS validator file. The validators are stored inside the app/validators directory, and each file may export multiple validators.

Create a validator file with pre-defined validators for create and update actions.

Create a new event listener class. The listener classes are stored inside the app/listeners directory and use the following naming conventions.

Generate an event class alongside the event listener.

Create a new service class. Service classes are stored inside the app/services directory and use the following naming conventions.

A service has no pre-defined meaning, and you can use it to extract the business logic inside your application. For example, if your application generates a lot of PDFs, you may create a service called PdfGeneratorService and reuse it in multiple places.

Create a new custom exception class. Exceptions are stored inside the app/exceptions directory.

Create a new Ace command. By default, the commands are stored inside the commands directory at the root of your application.

Commands from this directory are imported automatically by AdonisJS when you try to execute any Ace command. You may prefix the filename with an _ to store additional files that are not Ace commands in this directory.

Create a new Edge.js template file. The templates are created inside the resources/views directory.

Create a service provider file. Providers are stored inside the providers directory at the root of your application and use the following naming conventions.

Define environments in which the provider should get imported. Learn more about app environments

Create a new preload file. Preload files are stored inside the start directory.

Define environments in which the preload file should get imported. Learn more about app environments

Create a new test file inside the tests/<suite> directory.

Define the suite for which you want to create the test file. Otherwise, the command will display a prompt for suite selection.

Create a new mail class inside the app/mails directory. The mail classes are suffixed with the Notification keyword. However, you may define a custom suffix using the --intent CLI flag.

Define a custom intent for the mail.

Create a new Bouncer policy class. The policies are stored inside the app/policies folder and use the following naming conventions.

View the contents of the adonisrc.ts file after merging the defaults. You may use this command to inspect the available configuration options and override them per your application requirements.

See also: AdonisRC file

View list of routes registered by your application. This command will boot your AdonisJS application in the console environment.

Also, you can see the routes list from the VSCode activity bar if you are using our official VSCode extension.

View routes as a JSON string. The output will be an array of object.

View routes inside a CLI table. By default, we display routes inside a compact, pretty list.

Filter routes list and include the ones using the mentioned middleware. You may use the * keyword to include routes using one or more middleware.

Filter routes list and include the ones NOT using the mentioned middleware. You may use the * keyword to include routes that do not use any middleware.

The env:add command allows you to add a new environment variables to the .env, .env.example files and will also define the validation rules in the start/env.ts file.

You can just run the command and it will prompt you for the variable name, value, and validation rules. Or you can pass them as arguments.

Define the type of the environment variable. The value must be one of the following: string, boolean, number, enum.

Define the allowed values for the environment variable when the type is enum.

Edge helpers and tags

**Examples:**

Example 1 (unknown):
```unknown
node ace list
```

Example 2 (unknown):
```unknown
node ace serve --hmr
```

Example 3 (unknown):
```unknown
node ace --no-warnings --inspect serve --hmr
```

Example 4 (unknown):
```unknown
node ace serve --hmr --assets-args="--cors --open"
```

---

## Command flags

**URL:** https://docs.adonisjs.com/guides/ace/flags

**Contents:**
- Command flags
- Flag types
  - Boolean flag
  - String flag
  - Number flag
  - Array flag
- Flag name and description
- Flag aliases
- Default value
- Processing flag value

Flags are named parameters mentioned with either two hyphens (--) or a single hyphen (-) (known as the flag alias). The flags can be mentioned in any order.

You must define flags as class properties and decorate them using the @flags decorator. In the following example, we define resource and singular flags, and both represent a boolean value.

Ace allows defining flags for one of the following types.

A boolean flag is defined using the @flags.boolean decorator. Mentioning the flag will set its value to true. Otherwise, the flag value is undefined.

The last example shows that the boolean flags can be negated with the --no- prefix.

By default, the negated option is not shown in the help output. However, you may enable it using the showNegatedVariantInHelp option.

A string flag accepts a value after the flag name. You may define a string flag using the @flags.string method.

If the flag value has spaces or special characters, it must be wrapped inside the quotes "".

An error is displayed if the flag is mentioned but no value is provided (even when the flag is optional).

The parsing of a number flag is similar to the string flag. However, the value is validated to ensure it is a valid number.

You can create a number flag using the @flags.number decorator.

The array flag allows the usage of the flag multiple times when running a command. You can define an array flag using the @flags.array method.

By default, the flag name is a dashed case representation of the class property name. However, you can define a custom name via the flagName option.

The flag description is displayed on the help screen. You can define it using the description option.

Aliases the shorthand names for a flag mentioned using a single hyphen (-). An alias must be a single character.

Flag aliases can be combined when running the command.

You can define the default value for a flag using the default option. The default value is used when the flag is not mentioned or mentioned without a value.

Using the parse method, you can process the flag value before it is defined as the class property.

You can access all flags mentioned while running the command using the this.parsed.flags property. The flags property is an object of key-value pair.

**Examples:**

Example 1 (typescript):
```typescript
import { BaseCommand, flags } from '@adonisjs/core/ace'

export default class MakeControllerCommand extends BaseCommands {
  @flags.boolean()
  declare resource: boolean

  @flags.boolean()
  declare singular: boolean
}
```

Example 2 (yaml):
```yaml
make:controller --resource

# this.resource === true
```

Example 3 (yaml):
```yaml
make:controller

# this.resource === undefined
```

Example 4 (yaml):
```yaml
make:controller --no-resource

# this.resource === false
```

---

## Releases

**URL:** https://docs.adonisjs.com/guides/preface/releases

**Contents:**
- Releases

This document outlines notable releases for the framework core and the ecosystem packages maintained by the AdonisJS core team.

---
