<template>
  <div>
    <div
      style="
        display: flex;
        max-width: 800px;
        margin: 0 auto;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1em;
      "
    >
      <div
        style="display: flex; flex-direction: column; align-items: center"
        class="q-my-lg"
      >
        <div class="q-mb-sm text-h3">{{ day }}</div>
        <div class="text-body1">{{ date }}</div>
      </div>
      <TopCardComponent
        :active-rows="activeRows"
        :completed-rows="completedRows"
        @addRow="addRow"
      />
      <q-table
        flat
        :rows="activeRows"
        :columns="columns"
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
        row-key="id"
        separator="none"
        style="width: 100%; font-size: 16px"
        hide-header
        hide-bottom
        :loading="loading"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="isDone" :props="props" class="q-pa-none">
              <div
                style="display: flex; justify-content: flex-end"
                class="q-pa-none"
              >
                <q-btn
                  size="md"
                  round
                  flat
                  desnse
                  padding="2.8px 1px 1px 1px"
                  color="white"
                  icon="drag_indicator"
                  class="handle"
                  style="cursor: move; align-self: center"
                />
                <q-checkbox
                  v-model="props.row.isDone"
                  @update:model-value="updateTaskStatus(props.row.id)"
                />
              </div>
            </q-td>
            <q-td key="desc" :props="props" class="q-pa-none">
              {{ props.row.desc }}
            </q-td>
            <q-td key="time" :props="props" class="q-pa-none">
              {{ props.row.time }}
            </q-td>
            <q-td key="functions" :props="props">
              <q-btn
                size="xs"
                flat
                round
                color="red"
                icon="clear"
                @click="removeRow(props.row.id)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <q-separator color="grey-8" style="width: 100%" class="q-my-md" />

      <q-table
        flat
        :rows="completedRows"
        :columns="columnsCompleted"
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
        row-key="id"
        separator="none"
        style="width: 100%; font-size: 16px"
        hide-header
        hide-bottom
        :loading="loading"
      >
        <template v-slot:top>
          <div>Completed Tasks</div>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="isDone" :props="props" class="q-pa-none">
              <div
                style="display: flex; justify-content: flex-end"
                class="q-pa-none"
              >
                <q-checkbox
                  v-model="props.row.isDone"
                  @update:model-value="updateTaskStatusToActive(props.row.id)"
                />
              </div>
            </q-td>
            <q-td key="desc" :props="props" class="q-pa-none">
              <div style="color: darkgray; text-decoration: line-through">
                {{ props.row.desc }}
              </div>
            </q-td>
            <q-td key="time" :props="props" class="q-pa-none">
              <div style="color: darkgray; text-decoration: line-through">
                {{ props.row.time }}
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import TopCardComponent from "@/components/TopCardComponent.vue";
import { useDraggable } from "vue-draggable-plus";
import { format } from "date-fns";

const store = useStore();
const loading = ref(false);
const tableRef = ref(null);
const day = ref("");
const date = ref("");
const pagination = ref({
  rowsPerPage: 0,
});

onMounted(() => {
  tableRef.value = document.querySelector(".q-table tbody");
  const currentDate = new Date();
  day.value = currentDate.toLocaleString("en-US", { weekday: "long" });
  date.value = format(currentDate, "MMMM dd, yyyy");

  store.dispatch("fetchTasks");
});

watch(
  () => tableRef.value,
  (val) => {
    if (val) {
      useDraggable(tableRef, activeRows.value, {
        animation: 350,
        handle: ".handle",
        onStart() {},
        onUpdate() {
          activeRows.value = [...activeRows.value];
        },
      });
    }
  }
);

const columns = [
  {
    name: "isDone",
    label: "isDone",
    field: "isDone",
    align: "center",
    style: "width: 80px;",
  },
  {
    name: "desc",
    required: true,
    label: "desc",
    align: "left",
    style: "width: 500px",
  },
  { name: "time", align: "left", label: "time", style: "width: 180px" },
  { name: "functions", label: "", field: "functions", style: "width: 40px" },
];

const columnsCompleted = [
  {
    name: "isDone",
    label: "isDone",
    field: "isDone",
    align: "center",
    style: "width: 80px;",
  },
  {
    name: "desc",
    required: true,
    label: "desc",
    align: "left",
    style: "width: 540px",
  },
  { name: "time", align: "left", label: "time", style: "min-width: 220px" },
];

const activeRows = computed(() => store.getters.activeTasks);
const completedRows = computed(() => store.getters.completedTasks);

const addRow = (newTask) => {
  store.dispatch("createTask", newTask);
};

const updateTaskStatus = (taskId) => {
  store.dispatch("updateTaskStatus", { taskId: taskId, isDone: true });
};

const updateTaskStatusToActive = (taskId) => {
  store.dispatch("updateTaskStatus", { taskId: taskId, isDone: false });
};

const removeRow = (taskId) => {
  store.dispatch("deleteTask", taskId);
};
</script>

<style>
.q-table td {
  background-color: inherit;
  font-size: 16px !important;
}
.q-table th {
  background-color: inherit;
  font-size: 16px !important;
  font-weight: 600;
}
</style>
