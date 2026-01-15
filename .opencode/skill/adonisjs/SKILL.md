---
name: adonisjs
description: AdonisJS is a TypeScript-first web framework for Node.js. Use this skill for AdonisJS development including routing, controllers, models, middleware, authentication, database operations with Lucid ORM, validation, testing, and Ace CLI commands.
---

# Adonisjs Skill

Comprehensive assistance with adonisjs development, generated from official documentation.

## When to Use This Skill

This skill should be triggered when:
- Working with adonisjs
- Asking about adonisjs features or APIs
- Implementing adonisjs solutions
- Debugging adonisjs code
- Learning adonisjs best practices

## Quick Reference

### Common Patterns

**Pattern 1:** In the following example:

```
title
```

**Pattern 2:** When using nested resources, the routes for the child resource are always prefixed with the parent resource name and its id. For example:

```
/posts/:post_id/comments
```

**Pattern 3:** You may assign middleware to routes register by a resource using the resource.use method. The method accepts an array of action names and the middleware to assign to them. For example:

```
resource.use
```

**Pattern 4:** Finally, you may call the .use method multiple times to assign multiple middleware. For example:

```
.use
```

**Pattern 5:** Copy code to clipboard { metaFiles: [ { pattern: 'public/**', reloadServer: false } ] }

```
{
  metaFiles: [
    {
      pattern: 'public/**',
      reloadServer: false
    }
  ]
}
```

**Pattern 6:** You may repeat this process for other TypeScript files as well. For example:

```
node --import=ts-node-maintained/register/esm bin/test.ts
```

**Pattern 7:** You can compute the origin value during the HTTP request using a function. For example:

```
origin
```

**Pattern 8:** You can compute the headers config value using a function during the HTTP request. For example:

```
headers
```

### Example Code Patterns

**Example 1** (typescript):
```typescript
import env from '#start/env'

env.get('NODE_ENV')
env.get('HOST')
env.get('PORT')

// Returns 3333 when PORT is undefined
env.get('PORT', 3333)
```

**Example 2** (typescript):
```typescript
import router from '@adonisjs/core/services/router'

router.get('/', (ctx) => {
  console.log(ctx.inspect())
})
```

**Example 3** (python):
```python
node ace add @adonisjs/session
```

**Example 4** (typescript):
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

**Example 5** (typescript):
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

## Reference Files

This skill includes comprehensive documentation in `references/`:

- **authentication.md** - Authentication documentation
- **basics.md** - Basics documentation
- **commands.md** - Commands documentation
- **concepts.md** - Concepts documentation
- **database.md** - Database documentation
- **getting_started.md** - Getting Started documentation
- **other.md** - Other documentation
- **security.md** - Security documentation
- **testing.md** - Testing documentation
- **views.md** - Views documentation

Use `view` to read specific reference files when detailed information is needed.

## Working with This Skill

### For Beginners
Start with the getting_started or tutorials reference files for foundational concepts.

### For Specific Features
Use the appropriate category reference file (api, guides, etc.) for detailed information.

### For Code Examples
The quick reference section above contains common patterns extracted from the official docs.

## Resources

### references/
Organized documentation extracted from official sources. These files contain:
- Detailed explanations
- Code examples with language annotations
- Links to original documentation
- Table of contents for quick navigation

### scripts/
Add helper scripts here for common automation tasks.

### assets/
Add templates, boilerplate, or example projects here.

## Notes

- This skill was automatically generated from official documentation
- Reference files preserve the structure and examples from source docs
- Code examples include language detection for better syntax highlighting
- Quick reference patterns are extracted from common usage examples in the docs

## Updating

To refresh this skill with updated documentation:
1. Re-run the scraper with the same configuration
2. The skill will be rebuilt with the latest information
