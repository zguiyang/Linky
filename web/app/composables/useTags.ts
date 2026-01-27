import { ref } from 'vue'
import { tagsApi } from '~/api/tags'
import type { Tag, CreateTagRequest, UpdateTagRequest } from '~/api/types'

export const useTags = () => {
  const tags = ref<Tag[]>([])
  const pending = ref(false)
  const error = ref<string | null>(null)

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

  const selectedTags = ref<number[]>([])

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
    selectedTags,
    toggleTag,
    clearTags,
    removeTag,
    isSelected
  }
}
