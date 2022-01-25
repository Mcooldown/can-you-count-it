<template>
  <div class="c-result">
    <div class="row justify-content-center">
      <div class="col-md-2">
        <img src="../assets/can-you-count-it-logo.png" class="w-100" alt="" />
      </div>
      <div class="col-12"></div>
      <div class="col-md-6">
        <div class="c-result-box">
          <h1 class="c-time-up">Time's Up</h1>
          <h4 class="text-white mt-4">
            Congratulations, <span class="fw-bold c-text-blue">{{ name }}</span
            >!
          </h4>
          <h4 class="mt-3 text-white">
            You've got
            <span class="fw-bold c-text-blue">{{ score }}</span> point(s) as
            your total score on
            <span class="fw-bold c-text-blue">{{ level.name }}</span> level.
          </h4>
        </div>
        <div class="mt-4">
          <Button
            title="PLAY AGAIN"
            icon="fas fa-play"
            @click="handlePlayAgain(2)"
            class="me-3 my-2"
          />
          <Button
            title="HOME"
            class="me-3 my-2"
            icon="fa fa-home"
            @click="handlePlayAgain(1)"
          />
          <Button
            title="LEADERBOARD"
            class="my-2"
            icon="fas fa-trophy"
            @click="handleLeaderboard"
          />
        </div>
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

.c-time-up {
  color: #f6d55c;
  font-weight: bold;
  font-size: 56px;
}

.c-result-box {
  background: rgb(63, 63, 63);
  border-radius: 20px;
  padding: 2rem 1rem;
  margin-top: 3rem;
}
</style>