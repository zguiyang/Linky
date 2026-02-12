---
title: Common Pitfalls
description: Common pitfalls and bug fixes when using AdonisJS and Lucid ORM
---

# Common Pitfalls and Bug Fixes

This document records common bugs, pitfalls, and their solutions encountered in the Linky project.

## Lucid ORM Pitfalls

### withCount() Doesn't Work Correctly for Many-to-Many Relationships

**Bug Description**

When using `withCount()` method on a model with many-to-many relationships (through pivot tables), the count may return incorrect values. Specifically, only the last related record might be counted correctly.

**Affected Code**

```typescript
// ❌ WRONG - withCount doesn't work correctly for many-to-many
async findAll(userId: number) {
  return await Tag.query()
    .where('user_id', userId)
    .withCount('bookmarks')   // Bug: incorrect count for many-to-many
    .withCount('memos')
    .orderBy('name', 'asc')
}
```

**Symptoms**

- API returns `bookmarksCount: 0` for most tags
- Only one tag (typically the last one) shows the correct count
- All tags are associated with the same bookmark, but counts are wrong

**Solution**

Use explicit subqueries instead of `withCount()` for many-to-many relationships:

```typescript
// ✅ CORRECT - Use subqueries for accurate many-to-many counts
import Database from '@adonisjs/lucid/services/db'

async findAll(userId: number) {
  return await Tag.query()
    .where('user_id', userId)
    .select(
      '*',
      Database.from('bookmark_tags')
        .count('*')
        .whereColumn('bookmark_tags.tag_id', 'tags.id')
        .as('bookmarks_count')
    )
    .select(
      Database.from('memo_tags')
        .count('*')
        .whereColumn('memo_tags.tag_id', 'tags.id')
        .as('memos_count')
    )
    .orderBy('name', 'asc')
}
```

**Why This Works**

The `withCount()` method generates SQL that uses JOINs, which can cause duplicate counting or incorrect results in many-to-many scenarios. Explicit subqueries ensure each tag's count is calculated independently.

**Related Files**

- `backend/app/services/tag_service.ts`
- `backend/app/models/tag.ts`

**Date Fixed**

2026-01-29

**See Also**

- [Lucid ORM Documentation](https://docs.adonisjs.com/guides/database/relationships#counting-related-records)
