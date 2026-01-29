import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { tagsApi } from '~/api/tags'
import type { Tag, CreateTagRequest, UpdateTagRequest } from '~/api/types'

export const useTagsStore = defineStore('tags', () => {
  const tags = ref<Tag[]>([])
  const pending = ref(false)
  const error = ref<string | null>(null)
  const selectedTags = ref<number[]>([])

  const tagMap = computed(() => {
    const map = new Map<number, Tag>()
    tags.value.forEach(tag => map.set(tag.id, tag))
    return map
  })

  const getTagName = (tagId: number) => {
    return tagMap.value.get(tagId)?.name || ''
  }

  const getTagById = (tagId: number) => {
    return tagMap.value.get(tagId)
  }

  const tagSelectItems = computed(() => {
    return tags.value.map(tag => ({
      label: tag.name,
      value: tag.id,
      ...(tag.color && { color: tag.color })
    }))
  })

  const fetchTags = async () => {
    if (tags.value.length > 0) {
      return { data: tags.value, error: null }
    }
    pending.value = true
    error.value = null
    const { data, error: apiError } = await tagsApi.index()
    console.log('Fetched tags:', data, apiError)
    if (apiError) {
      error.value = 'Failed to load tags'
      tags.value = []
      pending.value = false
      return { data: null, error: apiError }
    }
    tags.value = data || []
    pending.value = false
    return { data: data || [], error: null }
  }

  const refreshTags = async () => {
    pending.value = true
    error.value = null
    const { data, error: apiError } = await tagsApi.index()
    if (apiError) {
      error.value = 'Failed to load tags'
      pending.value = false
      return { data: null, error: apiError }
    }
    tags.value = data || []
    pending.value = false
    return { data: data || [], error: null }
  }

  const createTag = async (data: CreateTagRequest) => {
    const { error: apiError } = await tagsApi.create(data)
    if (apiError) {
      return { error: apiError }
    }
    await refreshTags()
    return { error: null }
  }

  const updateTag = async (id: number, data: UpdateTagRequest) => {
    const { error: apiError } = await tagsApi.update(id, data)
    if (apiError) {
      return { error: apiError }
    }
    await refreshTags()
    return { error: null }
  }

  const deleteTag = async (id: number) => {
    const { error: apiError } = await tagsApi.delete(id)
    if (apiError) {
      return { error: apiError }
    }
    await refreshTags()
    return { error: null }
  }

  const batchDelete = async (ids: number[]) => {
    const deletePromises = ids.map(id => tagsApi.delete(id))
    const results = await Promise.all(deletePromises)
    const hasError = results.some(r => r.error)
    if (hasError) {
      return { error: results.find(r => r.error)?.error || null }
    }
    await refreshTags()
    return { error: null }
  }

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

  const selectAll = () => {
    selectedTags.value = tags.value.map(t => t.id)
  }

  return {
    tags,
    pending,
    error,
    selectedTags,
    tagMap,
    getTagName,
    getTagById,
    tagSelectItems,
    fetchTags,
    refreshTags,
    createTag,
    updateTag,
    deleteTag,
    batchDelete,
    toggleTag,
    clearTags,
    removeTag,
    isSelected,
    selectAll
  }
})
