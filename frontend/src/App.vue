<template>
  <q-layout view="hhh lpR fff">
    <HeaderComponent />
    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import HeaderComponent from "@/components/HeaderComponent.vue";
</script>
