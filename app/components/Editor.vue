<script setup lang="ts">
import { ref, nextTick, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { BubbleMenu } from '@tiptap/vue-3/menus'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'

const model = defineModel<string>()

// ── SVG icons ─────────────────────────────────────────────────────────────────
const icons = {
  quote: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  clear: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M4 7V4h16v3"/><path d="M5 20h6"/><path d="M13 4l-6 16"/><line x1="17" y1="10" x2="21" y2="14"/><line x1="21" y1="10" x2="17" y2="14"/></svg>`,
}

// ── Link state ────────────────────────────────────────────────────────────────
const linkInputEl = useTemplateRef('linkInputEl')
const linkUrl = ref('')
const linkMode = ref(false)

const openLink = function () {
  linkUrl.value = editor.value?.getAttributes('link').href ?? ''
  linkMode.value = true
  nextTick(() => linkInputEl.value?.focus())
}

const onLinkKeydown = function (ev: KeyboardEvent) {
  if (ev.key === 'enter') {
    applyLink()
  } else if (ev.key === 'esc') {
    closeLinkMode()
  }
}

const closeLinkMode = function () {
  linkMode.value = false
}

const applyLink = function () {
  const url = linkUrl.value.trim()
  if (!url) {
    editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()
  } else {
    editor.value
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url, target: '_blank' })
      .run()
  }
  closeLinkMode()
}

// ── Tiptap editor instance ────────────────────────────────────────────────────
const editor = useEditor({
  extensions: [
    StarterKit,
    Underline,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: { rel: 'noopener noreferrer' },
    }),
  ],
  content: model.value,
  onUpdate: () => {
    updateContent(editor.value?.getHTML())
  },
})

onBeforeUnmount(() => editor.value?.destroy())

watch(model, (value: string | undefined) => {
  // HTML
  const isSame = editor.value?.getHTML() === value

  // JSON
  // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

  if (isSame) {
    return
  }

  editor.value?.commands.setContent(value ?? '')
})

const updateContent = (content: string | undefined): void => {
  if (getHtml()?.replace(/\n/g, '') != '') {
    model.value = content
  } else {
    clearContents()
  }
}

const clearContents = (): void => {
  // editor.value?.commands.setContent('')
  model.value = '<p><br></p>'
}

const getHtml = (): string | undefined => {
  return editor.value?.getHTML()
}

const focus = (): void => {
  editor.value?.chain().focus()
}

defineExpose({
  focus,
})

// ── Button definitions ────────────────────────────────────────────────────────
const inlineBtns = [
  {
    cmd: 'bold',
    title: 'Bold',
    label: '<b>B</b>',
    action: () => editor.value?.chain().focus().toggleBold().run(),
  },
  {
    cmd: 'italic',
    title: 'Italic',
    label: '<i>I</i>',
    action: () => editor.value?.chain().focus().toggleItalic().run(),
  },
  {
    cmd: 'strike',
    title: 'Strikethrough',
    label: '<s>S</s>',
    action: () => editor.value?.chain().focus().toggleStrike().run(),
  },
  {
    cmd: 'underline',
    title: 'Underline',
    label: '<u>U</u>',
    action: () => editor.value?.chain().focus().toggleUnderline().run(),
  },
]

const blockBtns = [
  {
    title: 'Heading 1',
    label: 'H1',
    active: { name: 'heading', attrs: { level: 1 } },
    action: () => editor.value?.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    title: 'Heading 2',
    label: 'H2',
    active: { name: 'heading', attrs: { level: 2 } },
    action: () => editor.value?.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    title: 'Blockquote',
    label: icons.quote,
    active: { name: 'blockquote', attrs: {} },
    action: () => editor.value?.chain().focus().toggleBlockquote().run(),
  },
]
</script>

<template>
  <div class="editor-wrapper">
    <!-- Bubble menu -->
    <BubbleMenu
      v-if="editor"
      :editor="editor"
      :tippy-options="{ duration: 100, placement: 'top' }"
      class="bubble"
    >
      <template v-if="!linkMode">
        <!-- Inline formats -->
        <button
          v-for="btn in inlineBtns"
          :key="btn.cmd"
          type="button"
          class="bbn"
          :class="{ active: editor.isActive(btn.cmd) }"
          :title="btn.title"
          @click="btn.action()"
          v-html="btn.label"
        />
        <div class="sep" />

        <!-- Block formats -->
        <button
          v-for="btn in blockBtns"
          :key="btn.title"
          type="button"
          class="bbn"
          :class="{ active: editor.isActive(btn.active.name, btn.active.attrs) }"
          :title="btn.title"
          @click="btn.action()"
          v-html="btn.label"
        />
        <div class="sep" />

        <!-- Link -->
        <button
          type="button"
          class="bbn"
          :class="{ active: editor.isActive('link') }"
          title="Link"
          @click="openLink"
          v-html="icons.link"
        />

        <!-- Clear -->
        <button
          type="button"
          class="bbn"
          title="Clear formatting"
          @click="editor.chain().focus().clearNodes().unsetAllMarks().run()"
          v-html="icons.clear"
        />
      </template>

      <!-- Link input -->
      <div v-else class="link-row">
        <input
          ref="linkInputEl"
          v-model="linkUrl"
          type="url"
          placeholder="https://…"
          @keydown="onLinkKeydown"
        >
        <button type="button" @click="applyLink">Add</button>
      </div>
    </BubbleMenu>

    <!-- Editor -->
    <EditorContent :editor="editor" class="editor" />
  </div>
</template>

<style scoped>
.editor-wrapper {
  width: 100%;
  height: 100%;
}

/* ── Bubble ── */
.bubble {
  display: flex;
  align-items: center;
  gap: 2px;
  background: var(--color-background-primary, #fff);
  border: 0.5px solid rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 5px 6px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  user-select: none;
}

.bbn {
  background: transparent;
  border: none;
  border-radius: 6px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary, #6b6b68);
  transition:
    background 0.1s,
    color 0.1s;
  padding: 0;
  font-family: inherit;
}
.bbn:hover,
.bbn.active {
  background: var(--color-background-secondary, #f5f5f4);
  color: var(--color-text-primary, #1a1a18);
}

.sep {
  width: 0.5px;
  height: 16px;
  background: rgba(0, 0, 0, 0.15);
  margin: 0 3px;
  flex-shrink: 0;
}

/* ── Link input ── */
.link-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 2px;
}
.link-row input {
  font-size: 13px;
  padding: 3px 8px;
  width: 200px;
  border: 0.5px solid rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  background: var(--color-background-primary, #fff);
  color: var(--color-text-primary, #1a1a18);
  outline: none;
  font-family: inherit;
}
.link-row button {
  font-size: 12px;
  padding: 3px 8px;
  border: 0.5px solid rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  background: transparent;
  color: var(--color-text-primary, #1a1a18);
  cursor: pointer;
  font-family: inherit;
}
.link-row button:hover {
  background: var(--color-background-secondary, #f5f5f4);
}

/* ── Tiptap editor ── */
.editor :deep(.tiptap) {
  min-height: 30px;
  padding: 1rem 1.25rem;
  border: 0.5px solid rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  background: var(--color-background-primary, #fff);
  /* font-size: 10px; */
  /* line-height: 1; */
  color: var(--color-text-primary, #1a1a18);
  outline: none;
  cursor: text;
}
.editor :deep(.tiptap:focus) {
  border-color: rgba(0, 0, 0, 0.3);
}
.editor :deep(.tiptap h1) {
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
.editor :deep(.tiptap h2) {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
.editor :deep(.tiptap blockquote) {
  border-left: 3px solid rgba(0, 0, 0, 0.3);
  padding-left: 1rem;
  color: var(--color-text-secondary, #6b6b68);
  margin: 0.5rem 0;
}
.editor :deep(.tiptap a) {
  color: #185fa5;
  text-decoration: underline;
  cursor: pointer;
}
.editor :deep(.tiptap p) {
  margin-bottom: 0.25rem;
}

/* Placeholder */
.editor :deep(.tiptap p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: var(--color-text-tertiary, #9b9b97);
  pointer-events: none;
  height: 0;
}

/* ── Hint ── */
.hint {
  font-size: 12px;
  color: var(--color-text-tertiary, #9b9b97);
  margin-top: 8px;
  text-align: center;
}
</style>
