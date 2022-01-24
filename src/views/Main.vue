<template>
  <div class="c-background">
    <div class="container">
      <Home v-if="step === 1" @finished="handlePlay" />
      <Play v-if="step === 2" :name="name" @finished="handleResult" />
    </div>
  </div>
</template>

<script>
import Home from "./Home.vue";
import Play from "./Play.vue";
import { ref } from "vue";

export default {
  name: "Main",
  components: { Home, Play },
  setup() {
    const step = ref(1);
    const name = ref(null);

    const handlePlay = (nameParam) => {
      name.value = nameParam;
      step.value = 2;
    };

    const handleResult = () => {};

    return { step, name, handlePlay, handleResult };
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