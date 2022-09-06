<script setup lang="ts">
import { ref } from 'vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import LoginForm from '@/components/LoginForm.vue';
import RegistrationForm from '@/components/RegistrationForm.vue';

const categoriesLocaleKeys = ref(['auth.authorization', 'auth.registration']);
</script>

<template>
  <div class="outer">
    <TabGroup>
      <TabPanels class="bg-white dark:bg-gray-900/50 rounded-3xl p-3">
        <TabList class="flex mb-10 flex-col md:flex-row gap-2">
          <Tab
            v-for="category in categoriesLocaleKeys"
            as="template"
            :key="category"
            v-slot="{ selected }"
          >
            <button
              class="tab-btn shadow focus:outline-none w-full rounded-3xl py-4 text-md font-semibold leading-5"
              :class="
                selected
                  ? 'bg-gray-200 dark:bg-light/75 text-gray-600'
                  : 'text-primary/80 dark:text-light'
              "
            >
              {{ $t(category) }}
            </button>
          </Tab>
        </TabList>

        <TabPanel class="mb-5">
          <LoginForm></LoginForm>
        </TabPanel>
        <TabPanel class="mb-5">
          <RegistrationForm></RegistrationForm>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<style scoped lang="scss">
.outer {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  width: 100%;
  max-width: 36rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.tab-btn {
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
}
</style>
