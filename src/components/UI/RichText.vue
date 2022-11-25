<script setup lang="ts">
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import BubbleMenuExtension from '@tiptap/extension-bubble-menu';
import Placeholder from '@tiptap/extension-placeholder';

interface IProps {
  placeholder?: string;
  modelValue?: string;
}

interface IEmits {
  (eventName: 'update:modelValue', value: string): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit.configure({
      paragraph: {
        HTMLAttributes: {
          class: 'rich-text-paragraph',
        },
      },
    }),
    Placeholder.configure({ placeholder: props.placeholder }),
    BubbleMenuExtension.configure({
      element: document.querySelector('.menu') as HTMLElement,
    }),
  ],
  onUpdate: ({ editor }) => {
    const content = editor.getHTML();
    emit('update:modelValue', content);
  },
});
</script>

<template>
  <div class="rich-text">
    <EditorContent
      class="editor-content"
      :editor="editor"
      :value="modelValue"
    />

    <BubbleMenu
      class="menu"
      :editor="editor"
      :tippy-options="{ duration: 100, placement: 'bottom-start' }"
      v-if="editor"
    >
      <button
        class="menu-button"
        @click.prevent="editor?.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        bold
      </button>
      <button
        class="menu-button"
        @click.prevent="editor?.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        italic
      </button>
      <button
        class="menu-button"
        @click.prevent="editor?.chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        strike
      </button>
    </BubbleMenu>
  </div>
</template>

<style scoped lang="scss">
.menu-button {
  border-width: 1px;
  border-color: black;
  border-radius: 10px;
  margin-right: 2px;
  padding: 3px;
  transition: background-color, color 0.2s ease-in-out;
  background-color: white;
}

.menu-button.is-active {
  background-color: black;
  color: white;
}

.dark .menu-button {
  filter: brightness(0.8);
}
</style>

<style>
.rich-text-paragraph {
  overflow-wrap: anywhere;
}

.ProseMirror {
  padding-top: 0.5rem;
  padding-right: 0.75rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;

  min-height: 200px;
  max-height: 500px;
  overflow-y: auto;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  pointer-events: none;
  height: 0;
  color: rgb(156 163 175);
}

.dark .ProseMirror p.is-editor-empty:first-child::before {
  color: rgb(209 213 219 / 0.6);
}
</style>
