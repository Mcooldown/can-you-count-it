<template>
  <div class="c-background">
    <div class="container-fluid">
      <Home v-if="step === 1" @finished="handlePlay" />
      <Play v-if="step === 2" :name="name" @finished="handleResult" />
      <Result
        v-if="step === 3"
        :name="name"
        :score="score"
        @playAgain="handlePlayAgain"
      />
    </div>
  </div>
</template>

<script>
import Home from "./Home.vue";
import Play from "./Play.vue";
import Result from "./Result.vue";
import { ref } from "vue";

export default {
  name: "Main",
  components: { Home, Play, Result },
  setup() {
    const step = ref(1);
    const name = ref(null);
    const score = ref(0);

    const handlePlay = (nameParam) => {
      name.value = nameParam;
      step.value = 2;
    };

    const handleResult = (scoreParam) => {
      score.value = scoreParam;
      step.value = 3;
    };

    const handlePlayAgain = () => {
      step.value = 2;
    };

    return { step, name, handlePlay, handleResult, score, handlePlayAgain };
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