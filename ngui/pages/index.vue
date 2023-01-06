<script lang="ts" setup>
const tabs = ['SUBSCRIPTION', 'SERVER']
const currentTab = ref(0)
</script>

<template>
  <VaTabs v-model="currentTab" class="mb-10">
    <template #tabs>
      <VaTab
        v-for="tab in tabs"
        :key="tab"
      >
        {{ tab }}
      </VaTab>
    </template>
  </VaTabs>
</template>
