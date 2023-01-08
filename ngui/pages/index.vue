<script lang="ts" setup>
let tabs = ['SUBSCRIPTION', 'SERVER']
const currentTab = ref(0)

const { data } = await toFetch<any>('touch')

for (const sub of data.value.data.touch.subscriptions) {
  tabs.push(sub.host)
}
</script>

<template>
  <VaTabs v-model="currentTab" class="mb-10">
    <template #tabs>
      <VaTab v-for="tab in tabs" :key="tab" >
        {{ tab }}
      </VaTab>
    </template>
  </VaTabs>

  <Subscription :data="data.data.touch.subscriptions" v-if="currentTab === 0" />
  <Server :data="data.data.touch.servers" v-else-if="currentTab === 1" />
  <SubServer :data="data.data.touch.subscriptions[currentTab - 2].servers" v-else />
</template>
