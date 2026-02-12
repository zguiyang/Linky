# Adonisjs - Testing

**Pages:** 7

---

## Prompts

**URL:** https://docs.adonisjs.com/guides/ace/prompts

**Contents:**
- Prompts
- Displaying a prompt
- Prompt options
- Text input
- Masked input
- List of choices
- Multi-select choices
- Confirm action
- Autocomplete

Prompts are interactive terminal widgets you can use to accept user input. Ace prompts are powered by the @poppinss/prompts package, which supports the following prompt types.

Ace prompts are built with testing in mind. When writing tests, you may trap prompts and respond to them programmatically.

See also: Testing ace commands

You may display prompts using the this.prompt property available on all Ace commands.

Following is the list of options accepted by prompts. You may reference this table as the single source of truth.

The default value to use when no value is entered. In the case of select, multiselect, and autocomplete prompts, the value must be the choices array index.

The unique name for the prompt

The hint text to display next to the prompt

Transform the prompt return value. The input value of the result method depends on the prompt. For example, the multiselect prompt value will be an array of selected choices.

Live format the input value as the user types. The formatting is only applied to the CLI output, not the return value.

Validate the user input. Returning true from the method will pass the validation. Returning false or an error message string will be considered a failure.

Limit the number of options to display. You will have to scroll to see the rest of the options.

You may render the prompt to accept text input using the prompt.ask method. The method accepts the prompt message as the first parameter and the options object as the second parameter.

As the name suggests, the masked input prompt masks the user input in the terminal. You may display the masked prompt using the prompt.secure method.

The method accepts the prompt message as the first parameter and the options object as the second parameter.

You may display a list of choices for a single selection using the prompt.choice method. The method accepts the following parameters.

To mention a different display value, you can define options as objects. The name property is returned as the prompt result, and the message property is displayed in the terminal.

You may use the prompt.multiple method to allow multiple selections in the choices list. The accepted parameters are the same as the choice prompt.

You can display a confirmation prompt with Yes/No options using the prompt.confirm method. The method accepts the prompt message as the first parameter and the options object as the second parameter.

The confirm prompt returns a boolean value.

To customize the Yes/No options display value, you may use the prompt.toggle method.

The autocomplete prompt is a combination of the select and the multi-select prompt, but with the ability to fuzzy search the choices.

**Examples:**

Example 1 (typescript):
```typescript
import { BaseCommand } from '@adonisjs/core/ace'

export default class GreetCommand extends BaseCommand {
  async run() {
    const modelName = await this.prompt.ask('Enter the model name')
    
    console.log(modelName)
  }
}
```

Example 2 (typescript):
```typescript
{
  result(value) {
    return value.toUpperCase()
  }
}
```

Example 3 (typescript):
```typescript
{
  format(value) {
    return value.toUpperCase()
  }
}
```

Example 4 (typescript):
```typescript
{
  validate(value) {
    return value.length > 6
    ? true
    : 'Model name must be 6 characters long'
  }
}
```

---

## Terminal UI

**URL:** https://docs.adonisjs.com/guides/ace/terminal-ui

**Contents:**
- Terminal UI
- Displaying log messages
  - Adding prefix and suffix
  - Loading animation
  - Logger actions
- Formatting text with ANSI colors
- Rendering tables
  - Right-align columns
  - Full-width rendering
- Printing stickers

Ace terminal UI is powered by the @poppinss/cliui package. The package exports helpers to display logs, render tables, render animated tasks UI, and much more.

The terminal UI primitives are built with testing in mind. When writing tests, you may turn on the raw mode to disable colors and formatting and collect all logs in memory to write assertions against them.

See also: Testing Ace commands

You may display log messages using the CLI logger. Following is the list of available log methods.

Using the options object, you may define the prefix and suffix for the log message. The prefix and suffix are displayed with lower opacity.

A log message with loading animation appends animated three dots (...) to the message. You may update the log message using the animation.update method and stop the animation using the animation.stop method.

Logger actions can display the state of action with consistent styling and colors.

You may create an action using the logger.action method. The method accepts the action title as the first parameter.

You can mark an action as either succeeded, failed, or skipped.

Ace uses kleur for formatting text with ANSI colors. Using the this.colors property, you can access kleur's chained API.

A table can be created using the this.ui.table method. The method returns an instance of the Table class that you can use to define the table head and rows.

You may apply color transforms to any value when rendering the table. For example:

You may right-align the columns by defining them as objects and using the hAlign property. Make sure to also right-align the header column.

By default, tables are rendered with width auto, taking only the space required by the contents of each column.

However, you may render tables at full-width (taking all the terminal space) using the fullWidth method. In full-width mode:

You may change the column index for the fluid column (the one that takes all the space) by calling the table.fluidColumnIndex method.

Stickers allow you to render content inside a box with a border. They are helpful when you want to draw the user's attention to an essential piece of information.

You can create an instance of a sticker using the this.ui.sticker method.

If you want to display a set of instructions inside a box, you can use the this.ui.instructions method. Each line in the instructions output will be prefixed with an arrow sign >.

The tasks widget provides an excellent UI for sharing the progress of multiple time-taking tasks. The widget has the following two rendering modes:

You can create an instance of the tasks widget using the this.ui.tasks method.

Individual tasks are added using the tasks.add method. The method accepts the task title as the first parameter and the implementation callback as the second parameter.

You must return the status of the task from the callback. All return values are considered success messages until you wrap them inside the task.error method or throw an exception inside the callback.

Instead of writing the task progress messages to the console, it is recommended to call the task.update method.

The update method displays the latest log message using the minimal renderer and logs all messages using the verbose renderer.

You may switch to a verbose renderer when creating the tasks widget. You might consider allowing the command's user to pass a flag to turn on the verbose mode.

**Examples:**

Example 1 (typescript):
```typescript
import { BaseCommand } from '@adonisjs/core/ace'

export default class GreetCommand extends BaseCommand {
  async run() {
    this.logger.debug('Something just happened')
    this.logger.info('This is an info message')
    this.logger.success('Account created')
    this.logger.warning('Running out of disk space')

    // Writes to stderr
    this.logger.error(new Error('Unable to write. Disk full'))
    this.logger.fatal(new Error('Unable to write. Disk full'))
  }
}
```

Example 2 (typescript):
```typescript
this.logger.info('installing packages', {
  suffix: 'npm i --production'
})

this.logger.info('installing packages', {
  prefix: process.pid
})
```

Example 3 (typescript):
```typescript
const animation = this.logger.await('installing packages', {
  suffix: 'npm i'
})

animation.start()

// Update the message
animation.update('unpacking packages', {
  suffix: undefined
})

// Stop animation
animation.stop()
```

Example 4 (typescript):
```typescript
const createFile = this.logger.action('creating config/auth.ts')

try {
  await performTasks()
  createFile.displayDuration().succeeded()  
} catch (error) {
  createFile.failed(error)
}
```

---

## Browser tests

**URL:** https://docs.adonisjs.com/guides/testing/browser-tests

**Contents:**
- Browser tests
- Setup
  - Registering browser suite
  - Configuring the plugin
- Basic example
- Reading/writing cookies
- Populating session store
  - Setup
  - Writing session data
  - Reading session data

Browser tests are executed inside real browsers like Chrome, Firefox, or Safari. We make use of Playwright (a browser automation tool) for interacting with webpages programmatically.

Playwright is both a testing framework and a library that exposes JavaScript APIs to interact with the browser. We do not use the Playwright testing framework because we are already using Japa, and using multiple testing frameworks inside a single project will only lead to confusion and config bloat.

Instead, we will use the Browser Client plugin from Japa, which integrates nicely with Playwright and offers a great testing experience.

The first step is to install the following packages from the npm packages registry.

Let's start by creating a new test suite for browser tests inside the adonisrc.ts file. The test files for the browser suite will be stored inside the tests/browser directory.

Before you can start writing tests, you must register the browserClient plugin within the tests/bootstrap.ts file.

Let's create an example test that will open the home page of your AdonisJS application and verify the contents of the page. The visit helper opens a new page and visits a URL. The return value is the page object.

See also: List of assertions methods

Finally, let's run the above test using the test command. You may use the --watch flag to create a file watcher and re-run tests on every file change.

When testing inside a real browser, the cookies are persisted throughout the lifecycle of a browser context.

Japa creates a fresh browser context for each test. Therefore, the cookies from one test will not leak onto other tests. However, multiple page visits inside a single test will share the cookies because they use the same browserContext.

Similarly, the cookies set by the server can be accessed using the browserContext.getCookie method.

You may use the following methods to read/write encrypted and plain cookies.

If you are using the @adonisjs/session package to read/write session data in your application, you may also want to use the sessionBrowserClient plugin to populate the session store when writing tests.

The first step is registering the plugin inside the tests/bootstrap.ts file.

And then, update the .env.test file (create one if it is missing) and set the SESSON_DRIVER to memory.

You may use the browserContext.setSession method to define the session data for the current browser context.

All page visits using the same browser context will have access to the same session data. However, the session data will be removed when the browser or the context is closed.

Like the setSession method, you may use the browser.setFlashMessages method to define flash messages.

You may read the data inside a session store using the browserContext.getSession and browser.getFlashMessages methods. These methods will return all the data for the session ID associated with a specific browser context instance.

If you are using the @adonisjs/auth package to authenticate users in your application, you may use the authBrowserClient Japa plugin to authenticate users when making HTTP requests to your application.

The first step is registering the plugin inside the tests/bootstrap.ts file.

If you are using session-based authentication, make sure to also set up the session plugin. See Populating session store - Setup.

That's all. Now, you may login users using the loginAs method. The method accepts the user object as the only argument and marks the user as logged in the current browser context.

All page visits using the same browser context will have access to the logged-in user. However, the user session will be destroyed when the browser or the context is closed.

The loginAs method uses the default guard configured inside the config/auth.ts file for authentication. However, you may specify a custom guard using the withGuard method. For example:

You may use the route helper from the TestContext to create a URL for a route. Using the route helper ensures that whenever you update your routes, you do not have to come back and fix all the URLs inside your tests.

The route helper accepts the same set of arguments accepted by the global template method route.

**Examples:**

Example 1 (python):
```python
npm i -D playwright @japa/browser-client
```

Example 2 (typescript):
```typescript
{
  tests: {
    suites: [
      {
        files: [
          'tests/browser/**/*.spec(.ts|.js)'
        ],
        name: 'browser',
        timeout: 300000
      }
    ]
  }
}
```

Example 3 (typescript):
```typescript
import { browserClient } from '@japa/browser-client'

export const plugins: Config['plugins'] = [
  assert(),
  apiClient(),
  browserClient({
    runInSuites: ['browser']
  }),
  pluginAdonisJS(app)
]
```

Example 4 (markdown):
```markdown
node ace make:test pages/home --suite=browser
# DONE:    create tests/browser/pages/home.spec.ts
```

---

## Browser tests

**URL:** https://docs.adonisjs.com/guides/browser-tests

**Contents:**
- Browser tests
- Setup
  - Registering browser suite
  - Configuring the plugin
- Basic example
- Reading/writing cookies
- Populating session store
  - Setup
  - Writing session data
  - Reading session data

Browser tests are executed inside real browsers like Chrome, Firefox, or Safari. We make use of Playwright (a browser automation tool) for interacting with webpages programmatically.

Playwright is both a testing framework and a library that exposes JavaScript APIs to interact with the browser. We do not use the Playwright testing framework because we are already using Japa, and using multiple testing frameworks inside a single project will only lead to confusion and config bloat.

Instead, we will use the Browser Client plugin from Japa, which integrates nicely with Playwright and offers a great testing experience.

The first step is to install the following packages from the npm packages registry.

Let's start by creating a new test suite for browser tests inside the adonisrc.ts file. The test files for the browser suite will be stored inside the tests/browser directory.

Before you can start writing tests, you must register the browserClient plugin within the tests/bootstrap.ts file.

Let's create an example test that will open the home page of your AdonisJS application and verify the contents of the page. The visit helper opens a new page and visits a URL. The return value is the page object.

See also: List of assertions methods

Finally, let's run the above test using the test command. You may use the --watch flag to create a file watcher and re-run tests on every file change.

When testing inside a real browser, the cookies are persisted throughout the lifecycle of a browser context.

Japa creates a fresh browser context for each test. Therefore, the cookies from one test will not leak onto other tests. However, multiple page visits inside a single test will share the cookies because they use the same browserContext.

Similarly, the cookies set by the server can be accessed using the browserContext.getCookie method.

You may use the following methods to read/write encrypted and plain cookies.

If you are using the @adonisjs/session package to read/write session data in your application, you may also want to use the sessionBrowserClient plugin to populate the session store when writing tests.

The first step is registering the plugin inside the tests/bootstrap.ts file.

And then, update the .env.test file (create one if it is missing) and set the SESSON_DRIVER to memory.

You may use the browserContext.setSession method to define the session data for the current browser context.

All page visits using the same browser context will have access to the same session data. However, the session data will be removed when the browser or the context is closed.

Like the setSession method, you may use the browser.setFlashMessages method to define flash messages.

You may read the data inside a session store using the browserContext.getSession and browser.getFlashMessages methods. These methods will return all the data for the session ID associated with a specific browser context instance.

If you are using the @adonisjs/auth package to authenticate users in your application, you may use the authBrowserClient Japa plugin to authenticate users when making HTTP requests to your application.

The first step is registering the plugin inside the tests/bootstrap.ts file.

If you are using session-based authentication, make sure to also set up the session plugin. See Populating session store - Setup.

That's all. Now, you may login users using the loginAs method. The method accepts the user object as the only argument and marks the user as logged in the current browser context.

All page visits using the same browser context will have access to the logged-in user. However, the user session will be destroyed when the browser or the context is closed.

The loginAs method uses the default guard configured inside the config/auth.ts file for authentication. However, you may specify a custom guard using the withGuard method. For example:

You may use the route helper from the TestContext to create a URL for a route. Using the route helper ensures that whenever you update your routes, you do not have to come back and fix all the URLs inside your tests.

The route helper accepts the same set of arguments accepted by the global template method route.

**Examples:**

Example 1 (python):
```python
npm i -D playwright @japa/browser-client
```

Example 2 (typescript):
```typescript
{
  tests: {
    suites: [
      {
        files: [
          'tests/browser/**/*.spec(.ts|.js)'
        ],
        name: 'browser',
        timeout: 300000
      }
    ]
  }
}
```

Example 3 (typescript):
```typescript
import { browserClient } from '@japa/browser-client'

export const plugins: Config['plugins'] = [
  assert(),
  apiClient(),
  browserClient({
    runInSuites: ['browser']
  }),
  pluginAdonisJS(app)
]
```

Example 4 (markdown):
```markdown
node ace make:test pages/home --suite=browser
# DONE:    create tests/browser/pages/home.spec.ts
```

---

## Testing

**URL:** https://docs.adonisjs.com/guides/testing/introduction

**Contents:**
- Testing
- Configuring the tests runner
  - Suites
  - Runner hooks
  - Plugins
  - Reporters
- Creating tests
- Writing tests
  - Using test groups
  - Lifecycle hooks

AdonisJS has in-built support for writing tests. You do not have to install additional packages or wire up your application to be ready for testing - All the hard work has already been done.

You can run the application tests using the following ace command.

The tests are stored inside the tests directory and we further organize tests by their type. For example, the functional tests are stored inside the tests/functional directory, and the unit tests are stored inside the tests/unit directory.

Functional tests refer to outside-in testing in which you will make real HTTP requests to your application to test the functionality of a given flow or an endpoint. For example, you may have a collection of functional tests for creating a user.

Some communities might refer to functional tests as feature tests or end-to-end tests. AdonisJS is flexible about what you call them. We decided to settle on the term functional tests.

AdonisJS uses Japa for writing and running tests. Therefore, we recommend reading the Japa documentation to understand its APIs and configuration options better.

The test suites are defined inside the adonisrc.ts file. By default, we register the functional and the unit test suites. If needed, you can remove the existing suites and start from scratch.

You can configure a suite at runtime using the configureSuite hook defined inside the tests/bootstrap.ts file. For example, when running functional tests, you can register suite-level hooks to start the HTTP server.

Runner hooks are global actions you can run before and after all the tests. The hooks are defined using the runnerHooks property inside the tests/boostrap.ts file.

Japa has a plugin system you can use to extend its functionality. Plugins are registered inside the tests/bootstrap.ts file.

See also: Creating Japa plugins

Reporters are used for reporting/displaying the progress of tests as they run. The reporters are registered inside the tests/bootstrap.ts file.

See also: Creating Japa reporters

You may create a new test using the make:test command. The command needs the suite's name to create the test file.

See also: Make test command

The file will be created inside the directory configured using the files glob property.

The tests are defined using the test method imported from the @japa/runner package. A test accepts a title as the first parameter and the implementation callback as the second parameter.

In the following example, we create a new user account and use the assert object to ensure the password hashed correctly.

Test groups are created using the test.group method. Groups add structure to your tests and allow you to run lifecycle hooks around your tests.

Continuing the previous example, let's move the password hashing test inside a group.

If you have noticed, we remove the "when creating a new user" fragment from our test title. This is because the group title clarifies that all tests under this group are scoped to creating a new user.

Lifecycle hooks are used to perform actions around tests. You can define hooks using the group object.

See also - Japa docs for Lifecycle hooks

Now that you know the basics of creating and writing tests. We recommend you explore the following topics in the Japa documentation.

You may run tests using the test command. By default, the tests for all the suites are executed. However, you can run tests for a specific suite by passing the name.

You may use the --watch command to watch the file system and re-run tests. If a test file is changed, then tests inside the changed file will run. Otherwise, all tests will be re-run.

You can apply filters using the command-line flags when running the tests. Following is the list of available options.

See also: Japa filtering tests guide

Using VSCode? Use the Japa extension to run selected tests within your code editor using keyboard shortcuts or the activity sidebar.

Japa waits for the process to gracefully shut down after completing all the tests. The graceful shutdown process means exiting all long-lived connections and emptying the Node.js event loop.

If needed, you can force Japa to exit the process and not wait for a graceful shutdown using the --force-exit flag.

You can retry failing tests for multiple times using the --retries flag. The flag will be applied to all the tests without an explicit retries count defined at the test level.

You can re-run tests failed from the last run using the --failed commandline flag.

Japa allows you register multiple test reporters inside the config file, but does not activate them by default. You can activate reporters either inside the config file, or using the --reporter commandline flag.

You may also activate reporters inside the config file.

The test command runs tests (bin/test.ts file) as a child process. If you want to pass node arguments to the child process, you can define them before the command name.

You may use the .env.test file to define the environment variables required during testing. The values inside the .env.test takes precedence over those inside the .env file.

The SESSION_DRIVER during testing must be set to memory.

**Examples:**

Example 1 (unknown):
```unknown
node ace test
```

Example 2 (typescript):
```typescript
{
  tests: {
    suites: [
      {
        name: 'functional',
        files: ['tests/functional/**/*.spec.(js|ts)']
      },
      {
        name: 'unit',
        files: ['tests/unit/**/*.spec.(js|ts)']
      }
    ]
  }
}
```

Example 3 (typescript):
```typescript
export const configureSuite: Config['configureSuite'] = (suite) => {
  if (['browser', 'functional', 'e2e'].includes(suite.name)) {
    return suite.setup(() => testUtils.httpServer().start())
  }
}
```

Example 4 (typescript):
```typescript
export const runnerHooks: Required<Pick<Config, 'setup' | 'teardown'>> = {
  setup: [
    () => {
      console.log('running before all the tests')
    }
  ],
  teardown: [
    () => {
      console.log('running after all the tests')
    }
  ],
}
```

---

## Mocks and Fakes

**URL:** https://docs.adonisjs.com/guides/testing/mocks-and-fakes

**Contents:**
- Mocks and Fakes
- Using the fakes API
- Dependency injection and fakes
- Mocks and stubs using Sinon.js
- Mocking network requests
- Freezing time

When testing your applications, you might want to mock or fake specific dependencies to prevent actual implementations from running. For example, you wish to refrain from emailing your customers when running tests and neither call third-party services like a payment gateway.

AdonisJS offers a few different APIs and recommendations using which you can fake, mock, or stub a dependency.

Fakes are objects with working implementations explicitly created for testing. For example, The mailer module of AdonisJS has a fake implementation that you can use during testing to collect outgoing emails in memory and write assertions for them.

We provide fake implementations for the following container services. The fakes API is documented alongside the module documentation.

If you use dependency injection in your application or use the container to create class instances, you can provide a fake implementation for a class using the container.swap method.

In the following example, we inject UserService to the UsersController.

During testing, we can provide an alternate/fake implementation of the UserService class as follows.

Once the test has been completed, you must restore the fake using the container.restore method.

Sinon is a mature, time-tested mocking library in the Node.js ecosystem. If you use mocks and stubs regularly, we recommend using Sinon, as it works great with TypeScript.

If your application makes outgoing HTTP requests to third-party services, you can use nock during testing to mock the network requests.

Since nock intercepts all outgoing requests from the Node.js HTTP module, it works with almost every third-party library like got, axios and so on.

You may use the timekeeper package to freeze or travel time when writing tests. The timekeeper packages works by mocking the Date class.

In the following example, we encapsulate the API of timekeeper inside a Japa Test resource.

You may use the timeTravel method inside your tests as follows.

**Examples:**

Example 1 (typescript):
```typescript
import UserService from '#services/user_service'
import { inject } from '@adonisjs/core'

export default class UsersController {
  @inject()
  index(service: UserService) {}
}
```

Example 2 (typescript):
```typescript
import UserService from '#services/user_service'
import app from '@adonisjs/core/services/app'

test('get all users', async () => {
  class FakeService extends UserService {
    all() {
      return [{ id: 1, username: 'virk' }]
    }
  }
  
  /**
   * Swap `UserService` with an instance of
   * `FakeService`
   */  
  app.container.swap(UserService, () => {
    return new FakeService()
  })
  
  /**
   * Test logic goes here
   */
})
```

Example 3 (typescript):
```typescript
app.container.restore(UserService)

// Restore UserService and PostService
app.container.restoreAll([UserService, PostService])

// Restore all
app.container.restoreAll()
```

Example 4 (typescript):
```typescript
import { getActiveTest } from '@japa/runner'
import timekeeper from 'timekeeper'

export function timeTravel(secondsToTravel: number) {
  const test = getActiveTest()
  if (!test) {
    throw new Error('Cannot use "timeTravel" outside of a Japa test')
  }

  timekeeper.reset()

  const date = new Date()
  date.setSeconds(date.getSeconds() + secondsToTravel)
  timekeeper.travel(date)

  test.cleanup(() => {
    timekeeper.reset()
  })
}
```

---

## Console tests

**URL:** https://docs.adonisjs.com/guides/testing/console-tests

**Contents:**
- Console tests
- Basic example
- Testing logger output
- Testing tables output
- Trapping prompts
  - Choosing options
  - Accepting or rejecting confirmation prompts
  - Asserting against validations
- Available assertions
  - assertSucceeded

Command-line tests refer to testing custom Ace commands that are part of your application or the package codebase.

In this guide, we will learn how to write tests for a command, mock the logger output, and trap CLI prompts.

Let's start by creating a new command named greet.

Let's create a unit test inside the tests/unit directory. Feel free to define the unit test suite if it is not already defined.

Let's open the newly created file and write the following test. We will use the ace service to create an instance of the Greet command and assert that it exits successfully.

Let's run the test using the following ace command.

The Greet command currently writes the log message to the terminal. To capture this message and write an assertion for it, we will have to switch the UI library of ace into raw mode.

In raw mode, the ace will not write any logs to the terminal. Instead, keep them within memory for writing assertions.

We will use the Japa each.setup hook to switch into and out of the raw mode.

Once the hook has been defined, you can update your test as follows.

Similar to testing the log messages, you can write assertions for the table output by switching the UI library into raw mode.

Given the above table, you can write an assertion for it as follows.

Since prompts block the terminal waiting for manual input, you must trap and respond to them programmatically when writing tests.

Prompts are trapped using the prompt.trap method. The method accepts the prompt title (case-sensitive) and offers a chainable API for configuring additional behavior.

The traps are removed automatically after the prompt gets triggered. An error will be thrown if the test finishes without triggering the prompt with a trap.

In the following example, we place a trap on a prompt titled "What is your name?" and answer it using the replyWith method.

You can choose options with a select or a multi-select prompt using the chooseOption and chooseOptions methods.

You can accept or reject prompts displayed using the toggle and the confirm methods.

To test the validation behavior of a prompt, you can use the assertPasses and assertFails methods. These methods accept the value of the prompt and test it against the prompt's validate method.

Following is an example of using assertions and replying to a prompt together.

Following is the list of assertion methods available on a command instance.

Assert the command exited with exitCode=0.

Assert the command exited with non-zero exitCode.

Assert the command exited with a specific exitCode.

Assert the command exited with any exitCode, but not the given exit code.

Assert the command writes a log message using the this.logger property. You can optionally assert the output stream as stdout or stderr.

Assert the command writes a log message that matches the given regular expression.

Assert the command prints a table to the stdout. You can provide the table rows as an array of columns. The columns are represented as an array of cells.

**Examples:**

Example 1 (unknown):
```unknown
node ace make:command greet
```

Example 2 (typescript):
```typescript
import { BaseCommand } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'

export default class Greet extends BaseCommand {
  static commandName = 'greet'
  static description = 'Greet a username by name'

  static options: CommandOptions = {}

  async run() {
    this.logger.info('Hello world from "Greet"')
  }
}
```

Example 3 (markdown):
```markdown
node ace make:test commands/greet --suite=unit

# DONE:    create tests/unit/commands/greet.spec.ts
```

Example 4 (typescript):
```typescript
import { test } from '@japa/runner'
import Greet from '#commands/greet'
import ace from '@adonisjs/core/services/ace'

test.group('Commands greet', () => {
  test('should greet the user and finish with exit code 0', async () => {
    /**
     * Create an instance of the Greet command class
     */
    const command = await ace.create(Greet, [])

    /**
     * Execute command
     */
    await command.exec()

    /**
     * Assert command exited with status code 0
     */
    command.assertSucceeded()
  })
})
```

---
