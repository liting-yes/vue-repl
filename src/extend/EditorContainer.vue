<script setup lang="ts">
import Message from '../Message.vue'
import { debounce } from '../utils'
import { inject, ref, watch } from 'vue'
import { Store } from '../store'
import MessageToggle from '../editor/MessageToggle.vue'
import MonacoEditor from '../editor/MonacoEditor.vue'

export interface Props {
  hideMessageToggle?: boolean
  hideMessage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hideMessageToggle: false,
})

const SHOW_ERROR_KEY = 'repl_show_error'

const store = inject('store') as Store
const showMessage = ref(props.hideMessage || getItem())

const onChange = debounce((code: string) => {
  store.state.activeFile.code = code
}, 250)

function setItem() {
  localStorage.setItem(SHOW_ERROR_KEY, showMessage.value ? 'true' : 'false')
}

function getItem() {
  const item = localStorage.getItem(SHOW_ERROR_KEY)
  return !(item === 'false')
}

watch(showMessage, () => {
  setItem()
})
</script>

<template>
  <div class="editor-container">
    <MonacoEditor
      @change="onChange"
      :value="store.state.activeFile.code"
      :filename="store.state.activeFile.filename"
    />
    <Message v-show="showMessage" :err="store.state.errors[0]" />
    <MessageToggle v-if="!props.hideMessageToggle" v-model="showMessage" />
  </div>
</template>

<style scoped>
.editor-container {
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
