<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-transparent" style="box-shadow: none">
      <q-toolbar class="q-py-md q-px-lg">
        <q-toolbar-title class="app-title">
          <q-icon name="wb_sunny" size="26px" class="title-icon q-mr-sm" />
          Weather Forecast
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.app-title {
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: -0.01em;
}

.title-icon {
  color: var(--accent-light);
}
</style>
