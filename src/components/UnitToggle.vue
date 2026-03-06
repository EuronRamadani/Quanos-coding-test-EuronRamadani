<template>
  <div class="unit-toggle">
    <button
      :class="['unit-btn', { active: modelValue === 'metric' }]"
      @click="$emit('update:modelValue', 'metric')"
    >
      °C
    </button>
    <button
      :class="['unit-btn', { active: modelValue === 'imperial' }]"
      @click="$emit('update:modelValue', 'imperial')"
    >
      °F
    </button>
  </div>
</template>

<script setup lang="ts">
import type { UnitSystem } from 'src/types/weather';

defineProps<{
  modelValue: UnitSystem;
}>();

defineEmits<{
  'update:modelValue': [value: UnitSystem];
}>();
</script>

<style lang="scss" scoped>
.unit-toggle {
  display: inline-flex;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
}

.unit-btn {
  border: none;
  outline: none;
  cursor: pointer;
  padding: 8px 20px;
  border-radius: 9px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  color: rgba(255, 255, 255, 0.45);
  background: transparent;

  &:hover:not(.active) {
    color: rgba(255, 255, 255, 0.7);
    background: rgba(255, 255, 255, 0.05);
  }

  &.active {
    color: #fff;
    background: var(--accent);
    box-shadow: 0 2px 12px rgba(108, 99, 255, 0.4);
  }
}
</style>
