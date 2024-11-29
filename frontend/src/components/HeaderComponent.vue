<template>
  <q-header class="bg-dark text-white">
    <div>
      <div class="header">
        <q-tabs
          v-model="tab"
          align="center"
          indicator-color="secondary"
          active-color="secondary"
          style="font-size: 18px"
        >
          <q-tab name="todo"> Todo List </q-tab>
        </q-tabs>
      </div>
      <q-separator color="grey-8" />
    </div>
  </q-header>
</template>

<script setup>
import { ref } from "vue";
const tab = ref("todo");
</script>
<style scoped>
.header {
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  padding: 0 1em;
}
</style>
