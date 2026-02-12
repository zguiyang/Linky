import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Tag, CreateTagRequest, UpdateTagRequest } from '~/api/types'

export const useTagsStore = defineStore('tags', () => {
  const tags = ref<Tag[]>([])
  const selectedTags = ref<number[]>([])
  const { $api } = useNuxtApp()

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

  const fetchTags = async (): Promise<Tag[]> => {
    if (tags.value.length > 0) return tags.value
    const response = await $api<Tag[]>('/tags')
    if (response) {
      tags.value = response
    }
    return tags.value
  }

  const refreshTags = async (): Promise<Tag[]> => {
    const response = await $api<Tag[]>('/tags')
    if (response) {
      tags.value = response
    }
    return tags.value
  }

  const createTag = async (data: CreateTagRequest) => {
    await $api('/tags', { method: 'post', body: data })
    await refreshTags()
  }

  const updateTag = async (id: number, data: UpdateTagRequest) => {
    await $api(`/tags/${id}`, { method: 'put', body: data })
    await refreshTags()
  }

  const deleteTag = async (id: number) => {
    await $api(`/tags/${id}`, { method: 'delete' })
    await refreshTags()
  }

  const batchDelete = async (ids: number[]) => {
    await Promise.all(ids.map(id => $api(`/tags/${id}`, { method: 'delete' })))
    await refreshTags()
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
