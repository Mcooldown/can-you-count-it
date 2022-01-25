<template>
  <div class="c-result">
    <div class="row justify-content-center">
      <div class="col-lg-2 col-md-4 col-8">
        <img src="../assets/can-you-count-it-logo.png" class="w-100" alt="" />
      </div>
      <div class="col-12"></div>
      <div class="col-lg-6 col-md-8 col-11">
        <div class="c-result-box mt-4">
          <h1 class="c-text-yellow fw-bold">Time's Up</h1>
          <h5 class="text-white mt-4">
            Congratulations, <span class="fw-bold c-text-blue">{{ name }}</span
            >!
          </h5>
          <h5 class="mt-3 text-white">
            You've got
            <span class="fw-bold c-text-blue">{{ score }}</span> point(s) as
            your total score on
            <span class="fw-bold c-text-blue">{{ level.name }}</span> level.
          </h5>
        </div>
      </div>
      <div class="col-12"></div>
      <div class="col-lg-2 col-md-4 col-10 mt-3">
        <Button
          title="PLAY AGAIN"
          icon="fas fa-play"
          @click="handlePlayAgain(2)"
          class="d-block w-100 my-3"
        />
        <Button
          title="HOME"
          class="d-block w-100 my-3"
          icon="fa fa-home"
          @click="handlePlayAgain(1)"
        />
        <Button
          title="LEADERBOARD"
          class="d-block w-100 my-3"
          icon="fas fa-trophy"
          @click="handleLeaderboard"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../components/Button.vue";

export default {
  components: { Button },
  emits: ["playAgain"],
  props: ["score", "name", "level"],
  setup(_, { emit }) {
    const handlePlayAgain = (step) => {
      emit("playAgain", step);
    };

    const handleLeaderboard = () => {};

    return {
      handlePlayAgain,
      handleLeaderboard,
    };
  },
};
</script>

<style scoped>
.c-result {
  padding-top: 5rem;
}

.c-result-box {
  background: rgb(63, 63, 63);
  border-radius: 20px;
  padding: 2rem 1rem;
}
</style>