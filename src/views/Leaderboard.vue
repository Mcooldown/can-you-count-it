<template>
  <div class="c-bg-black">
    <div class="c-background" id="background">
      <div class="container-fluid">
        <h1>This is leaderboard</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
export default {
  setup() {
    const level = ref(null);
    const levelId = ref(1);
    const isLoading = ref(true);

    const getScores = async (levelId) => {
      const res = await fetch(
        `http://127.0.0.1:8000/api/get-level-with-scores?level_id=${levelId}`,
        {
          method: "POST",
        }
      );
      const data = await res.json();
      return data;
    };

    onMounted(() => {
      getScores(1).then((data) => {
        level.value = data.level;
        isLoading.value = false;
      });
    });

    watch(levelId, () => {
      isLoading.value = true;
      getScores(levelId.value).then((data) => {
        level.value = data.level;
        isLoading.value = false;
      });
    });
  },
};
</script>

<style>
</style>