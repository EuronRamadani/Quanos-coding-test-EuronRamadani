<template>
  <div class="stat-card text-center">
    <q-icon :name="icon" size="22px" class="stat-icon q-mb-sm" />
    <div class="stat-value">{{ value }}</div>
    <div class="stat-label">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
  label: string;
  value: string;
}>();
</script>

<style lang="scss" scoped>
.stat-icon {
  color: var(--accent-light);
}

.stat-value {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.3;
}

.stat-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: 2px;
}
</style>
