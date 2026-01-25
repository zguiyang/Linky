import { useState } from '#app'

export const useTags = () => {
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
    selectedTags,
    toggleTag,
    clearTags,
    removeTag,
    isSelected
  }
}
