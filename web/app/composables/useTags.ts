import { useState } from '#app'
import { tagsApi } from '~/api/tags'
import type { Tag, CreateTagRequest, UpdateTagRequest } from '~/api/types'

export const useTags = () => {
  const tags = useState<Tag[]>('global-tags', () => [])
  const pending = useState('global-tags-pending', () => false)
  const error = useState<string | null>('global-tags-error', () => null)

  const fetchTags = async (forceRefresh = false) => {
    if (tags.value.length > 0 && !forceRefresh) {
      return tags.value
    }

    if (pending.value) {
      return tags.value
    }

    pending.value = true
    error.value = null

    try {
      const data = await tagsApi.index()
      tags.value = data
      return data
    } catch (e) {
      error.value = 'Failed to load tags'
      tags.value = []
      throw e
    } finally {
      pending.value = false
    }
  }

  const createTag = async (data: CreateTagRequest) => {
    await tagsApi.create(data)
    await fetchTags(true)
  }

  const updateTag = async (id: number, data: UpdateTagRequest) => {
    await tagsApi.update(id, data)
    await fetchTags(true)
  }

  const deleteTag = async (id: number) => {
    await tagsApi.delete(id)
    await fetchTags(true)
  }

  const refreshTags = async () => {
    return await fetchTags(true)
  }

  const selectedTags = useState('selectedTags', () => [] as number[])

  const toggleTag = (tagId: number) => {
    const index = selectedTags.value.indexOf(tagId)
    if (index > -1) {
      selectedTags.value.splice(index, 1)
    } else {
      selectedTags.value.push(tagId)
    }
  }

  const clearTags = () => {
    selectedTags.value = []
  }

  const removeTag = (tagId: number) => {
    const index = selectedTags.value.indexOf(tagId)
    if (index > -1) {
      selectedTags.value.splice(index, 1)
    }
  }

  const isSelected = (tagId: number) => {
    return selectedTags.value.includes(tagId)
  }

  return {
    tags,
    pending,
    error,
    fetchTags,
    createTag,
    updateTag,
    deleteTag,
    refreshTags,
    selectedTags,
    toggleTag,
    clearTags,
    removeTag,
    isSelected
  }
}
