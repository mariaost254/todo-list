<template>
  <div
    style="
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    "
  >
    <q-card class="q-pa-md q-mb-md" flat>
      <q-card-section
        horizontal
        style="
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <q-card-section class="q-pa-none">
          <div class="text-h6 text-secondary">Today's Tasks</div>
        </q-card-section>
        <q-card-section class="q-pa-none">
          <q-circular-progress
            show-value
            font-size="14px"
            class="text-info q-mr-md"
            :value="completedPercentage"
            size="40px"
            :thickness="0.1"
            color="info"
            track-color="dark"
          >
            {{ completedPercentage }}%
          </q-circular-progress>
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-card class="q-px-md q-py-sm q-mb-md" flat>
      <q-card-section
        horizontal
        dense
        style="
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <q-card-section class="q-pa-none">
          <q-input
            style="width: 400px"
            borderless
            v-model="task"
            placeholder="Add a new task..."
            dense
          >
            <template v-slot:prepend>
              <q-icon name="subject" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section
          class="q-pa-none"
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          "
        >
          <q-input
            borderless
            v-model="time"
            placeholder="Enter time (optional)"
            dense
          >
            <template v-slot:prepend>
              <q-icon name="schedule" />
            </template>
          </q-input>
          <q-btn
            push
            color="positive"
            text-color="black"
            round
            icon="add"
            @click="addTask"
          >
          </q-btn>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  activeRows: Array,
  completedRows: Array,
});

const task = ref("");
const time = ref("");
const completedPercentage = computed(() => {
  const rowsActive = props.activeRows || [];
  const rowsComp = props.completedRows || [];
  const totalTasks = rowsActive.length + rowsComp.length;
  const completedTasks = props.completedRows.length;
  return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
});

const emit = defineEmits(["addRow"]);
const addTask = () => {
  if (task.value != "") {
    const newTask = {
      desc: task.value,
      time: time.value,
    };
    emit("addRow", newTask);
    task.value = "";
    time.value = "";
  }
};
</script>
