<script setup lang="ts">
import { computed } from 'vue';
import {
  DraggableElement,
  DraggableArea,
  StencilPreview,
  ResizeEvent,
} from 'vue-advanced-cropper';
import type {
  Coordinates,
  Image,
  DragEvent,
  MoveEvent,
} from 'vue-advanced-cropper';

interface IProps {
  image: Image;
  coordinates: Coordinates;
  transitions: { enabled: boolean; time: number; timingFunction: string };
  stencilCoordinates: Coordinates;
}

interface IEmits {
  (eventName: 'move', event: MoveEvent): void;
  (eventName: 'move-end'): void;
  (eventName: 'resize', event: ResizeEvent): void;
  (eventName: 'resize-end'): void;
}

const emit = defineEmits<IEmits>();
const props = defineProps<IProps>();

const style = computed(() => {
  const { height, width, left, top } = props.stencilCoordinates;

  const style = {
    width: `${width}px`,
    height: `${height}px`,
    transform: `translate(${left}px, ${top}px)`,
    transition: undefined as string | undefined,
  };

  if (props.transitions && props.transitions.enabled) {
    style.transition = `${props.transitions.time}ms ${props.transitions.timingFunction}`;
  }

  return style;
});

const onMove = (moveEvent: MoveEvent) => {
  emit('move', moveEvent);
};

const onMoveEnd = () => {
  emit('move-end');
};

const onResize = (
  dragEvent: DragEvent,
  corner: `${'top' | 'bottom'}-${'left' | 'right'}`
) => {
  const { left, top } = dragEvent.shift();
  const directions = {
    respect: '' as 'height' | 'width',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };
  switch (corner) {
    case 'top-right':
      directions.top += -top;
      directions.right += left;
      directions.respect = 'height';
      break;
    case 'top-left':
      directions.top += -top;
      directions.left -= left;
      directions.respect = 'height';
      break;
    case 'bottom-right':
      directions.bottom += top;
      directions.right += left;
      directions.respect = 'height';
      break;
    case 'bottom-left':
      directions.bottom += top;
      directions.left -= left;
      directions.respect = 'width';
      break;
  }
  emit(
    'resize',
    new ResizeEvent(directions, {
      respectDirection: directions.respect,
    })
  );
};

const onResizeEnd = () => {
  emit('resize-end');
};
</script>

<template>
  <div class="absolute border border-pink-200 border-dashed" :style="style">
    <div
      class="absolute inset-0 z-10 border border-pink-200 border-dashed rounded-full pointer-events-none"
    />

    <div class="relative w-full h-full">
      <draggable-element
        class="absolute top-0 right-0 w-1/2 h-1/2"
        style="cursor: ne-resize"
        @drag="onResize($event, 'top-right')"
        @drag-end="onResizeEnd"
      />

      <draggable-element
        class="absolute top-0 left-0 w-1/2 h-1/2"
        style="cursor: nw-resize"
        @drag="onResize($event, 'top-left')"
        @drag-end="onResizeEnd"
      />

      <draggable-element
        class="absolute bottom-0 right-0 w-1/2 h-1/2"
        style="cursor: nw-resize"
        @drag="onResize($event, 'bottom-right')"
        @drag-end="onResizeEnd"
      />

      <draggable-element
        class="absolute bottom-0 left-0 w-1/2 h-1/2"
        style="cursor: ne-resize"
        @drag="onResize($event, 'bottom-left')"
        @drag-end="onResizeEnd"
      />

      <draggable-area class="cursor-move" @move="onMove" @move-end="onMoveEnd">
        <stencil-preview
          class="overflow-hidden rounded-full cursor-move"
          :image="image"
          :coordinates="coordinates"
          :width="stencilCoordinates.width"
          :height="stencilCoordinates.height"
          :transitions="transitions"
        />
      </draggable-area>
    </div>
  </div>
</template>
