<script lang="ts" setup>
const currentTab = ref('SUBSCRIPTION')
const { data } = await toFetch<any>('touch')
</script>

<template>
  <ElTabs v-model="currentTab" class="mb-10">
    <ElTabPane name="SUBSCRIPTION" label="SUBSCRIPTION">
      <Subscription :data="data.data.touch.subscriptions" />
    </ElTabPane>
    <ElTabPane name="SERVER" label="SERVER">
      <Server :data="data.data.touch.servers" />
    </ElTabPane>
    <ElTabPane
      v-for="s in data.data.touch.subscriptions"
      :key="s.host"
      :name="s.host"
      :label="s.host.toUpperCase()"
    >
      <SubServer :data="s.servers" />
    </ElTabPane>
  </ElTabs>
</template>
