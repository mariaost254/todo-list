import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    tasks: [],
    loading: false,
    error: null,
  },
  getters: {
    allTasks: (state) => state.tasks,
    loading: (state) => state.loading,
    error: (state) => state.error,
    activeTasks: (state) => state.tasks.filter((task) => !task.isDone),
    completedTasks: (state) => state.tasks.filter((task) => task.isDone),
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    removeTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
    updateTaskStatus(state, updatedTask) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      commit("setLoading", true);
      try {
        const response = await axios.get("http://localhost:3000/api/tasks");
        const tasks = response.data.map((task) => ({
          id: task._id,
          desc: task.desc,
          isDone: task.isDone,
          time: task.time || "",
        }));
        commit("setTasks", tasks);
      } catch (error) {
        commit("setError", "Error fetching tasks");
      } finally {
        commit("setLoading", false);
      }
    },

    async createTask({ commit }, taskData) {
      commit("setLoading", true);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/tasks",
          taskData
        );
        const newTask = {
          id: response.data._id,
          desc: response.data.desc,
          isDone: response.data.isDone,
          time: response.data.time || "",
        };
        commit("addTask", newTask);
      } catch (error) {
        commit("setError", "Error adding task");
      } finally {
        commit("setLoading", false);
      }
    },

    async deleteTask({ commit }, taskId) {
      commit("setLoading", true);
      try {
        await axios.delete(`http://localhost:3000/api/tasks/${taskId}`);
        commit("removeTask", taskId);
      } catch (error) {
        commit("setError", "Error deleting task");
      } finally {
        commit("setLoading", false);
      }
    },

    async updateTaskStatus({ commit }, { taskId, isDone }) {
      commit("setLoading", true);
      try {
        const response = await axios.put(
          `http://localhost:3000/api/tasks/${taskId}`,
          { isDone }
        );
        commit("updateTaskStatus", response.data);
      } catch (error) {
        commit("setError", "Error updating task status");
      } finally {
        commit("setLoading", false);
      }
    },
  },
});
