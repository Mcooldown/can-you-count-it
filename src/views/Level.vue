<template>
  <div v-for="level in levels" :key="level.name">
    {{ level.name }}
  </div>
</template>

<script>
import levelData from "../data/levels.json";

export default {
  setup() {
    const levels = levelData.levels;

    return { levels };
  },
};
</script>

<style>
</style>