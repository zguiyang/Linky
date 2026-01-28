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
    pending.value = true
    error.value = null
    try {
      tags.value = await tagsApi.index()
    } catch {
      error.value = 'Failed to load tags'
      tags.value = []
    } finally {
      pending.value = false
    }
  }

  const createTag = async (data: CreateTagRequest) => {
    await tagsApi.create(data)
    await fetchTags()
  }

  const updateTag = async (id: number, data: UpdateTagRequest) => {
    await tagsApi.update(id, data)
    await fetchTags()
  }

  const deleteTag = async (id: number) => {
    await tagsApi.delete(id)
    await fetchTags()
  }

  const batchDelete = async (ids: number[]) => {
    const deletePromises = ids.map(id => tagsApi.delete(id))
    await Promise.all(deletePromises)
    await fetchTags()
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
