<template>
  <q-form @submit.prevent="onSearch" class="search-bar glass">
    <q-icon name="search" size="22px" class="search-icon" />
    <input
      v-model="query"
      type="text"
      class="search-input"
      placeholder="Search city..."
      :disabled="loading"
    />
    <transition name="fade">
      <q-btn
        v-if="query.trim()"
        flat
        round
        dense
        icon="close"
        size="sm"
        class="clear-btn"
        @click="query = ''"
      />
    </transition>
    <button
      type="submit"
      class="search-submit"
      :disabled="!query.trim() || loading"
    >
      <q-spinner-dots v-if="loading" color="white" size="18px" />
      <q-icon v-else name="arrow_forward" size="20px" />
    </button>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  loading?: boolean;
}>();

const emit = defineEmits<{
  search: [location: string];
}>();

const query = ref('');

function onSearch() {
  const trimmed = query.value.trim();
  if (trimmed && !props.loading) {
    emit('search', trimmed);
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  align-items: center;
  padding: 6px 8px 6px 18px;
  gap: 10px;
}

.search-icon {
  color: rgba(255, 255, 255, 0.35);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: #fff;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0.01em;
  padding: 10px 0;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &:disabled {
    opacity: 0.5;
  }
}

.clear-btn {
  color: rgba(255, 255, 255, 0.4);
}

.search-submit {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: var(--accent);
  transition: all 0.2s ease;
  box-shadow: 0 2px 12px rgba(108, 99, 255, 0.35);

  &:hover:not(:disabled) {
    background: #7c74ff;
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    transform: none;
  }
}
</style>
