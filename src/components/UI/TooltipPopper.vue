<script setup lang="ts">
import { ref, computed, toRefs, watch, onMounted } from 'vue';
import { createPopper, type Placement } from '@popperjs/core';

interface IProps {
  text: string;
  placement?: Placement;
  forceHide?: boolean;
  delay?: number;
}

const props = defineProps<IProps>();
const { forceHide } = toRefs(props);

const button = ref<HTMLElement>();
const tooltip = ref<HTMLElement>();
let timeout: number;

const popperInstance = computed(() => {
  return createPopper(button.value!, tooltip.value!, {
    placement: props.placement || ('bottom' as Placement),
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
    strategy: 'fixed',
  });
});

const handleShow = () => {
  if (forceHide?.value) {
    return;
  }

  timeout = setTimeout(() => {
    tooltip.value?.setAttribute('data-show', '');

    popperInstance.value.update();
  }, props.delay);
};

const handleHide = () => {
  clearTimeout(timeout);
  tooltip.value?.removeAttribute('data-show');
};

onMounted(() => {
  if (forceHide) {
    watch(forceHide, (value) => {
      if ((value = true)) {
        handleHide();
      }
    });
  }
});
</script>

<template>
  <div>
    <div
      aria-describedby="tooltip"
      @mouseenter="handleShow"
      @mouseleave="handleHide"
      @focus="handleShow"
      @blur="handleHide"
      ref="button"
    >
      <slot></slot>
    </div>
    <div
      class="tooltip-text z-20 bg-dark text-light dark:bg-light dark:text-dark"
      role="tooltip"
      ref="tooltip"
    >
      {{ text }}
      <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<style scoped>
.tooltip-text {
  padding: 7px 10px;
  border-radius: 4px;
  font-size: 13px;
  display: none;
}

.tooltip-text[data-show] {
  display: block;
}

.tooltip-arrow,
.tooltip-arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
}

.tooltip-arrow {
  visibility: hidden;
}

.tooltip-arrow::before {
  visibility: visible;
  content: '';
  transform: rotate(45deg);
}

.tooltip-text[data-popper-placement^='top'] > .tooltip-arrow {
  bottom: -4px;
}

.tooltip-text[data-popper-placement^='bottom'] > .tooltip-arrow {
  top: -4px;
}

.tooltipText[data-popper-placement^='left'] > .tooltip-arrow {
  right: -4px;
}

.tooltip-text[data-popper-placement^='right'] > .tooltip-arrow {
  left: -4px;
}
</style>
