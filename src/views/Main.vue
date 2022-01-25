<template>
  <div class="c-background">
    <div class="container-fluid">
      <Home v-if="step === 1" @finished="handleSelectLevel" />
      <Level v-else-if="step === 2" :name="name" @finished="handlePlay" />
      <Play
        v-else-if="step === 3"
        :name="name"
        :level="level"
        @finished="handleResult"
      />
      <Result
        v-else-if="step === 4"
        :name="name"
        :level="level"
        :score="score"
        @playAgain="handlePlayAgain"
      />
    </div>
  </div>
</template>

<script>
import Home from "./Home.vue";
import Level from "./Level.vue";
import Play from "./Play.vue";
import Result from "./Result.vue";
import { ref } from "vue";

export default {
  name: "Main",
  components: { Home, Level, Play, Result },
  setup() {
    const step = ref(1);
    const name = ref(null);
    const level = ref(null);
    const score = ref(0);

    const handlePlay = (levelParam) => {
      level.value = levelParam;
      step.value = 3;
    };

    const handleResult = (scoreParam) => {
      score.value = scoreParam;
      step.value = 4;
    };

    const handleSelectLevel = (nameParam) => {
      name.value = nameParam;
      step.value = 2;
    };

    const handlePlayAgain = (stepParam) => {
      if (stepParam === 1) {
        name.value = null;
      }
      level.value = null;
      step.value = stepParam;
    };

    return {
      step,
      name,
      handlePlay,
      handleResult,
      score,
      handleSelectLevel,
      level,
      handlePlayAgain,
    };
  },
};
</script>

<style>
body {
  margin: 0;
}

.c-background {
  background: url("../assets/background.png") center center repeat;
  min-height: 100vh;
}
</style>