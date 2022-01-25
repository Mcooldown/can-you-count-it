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
          <h2 class="text-white mt-4">
            Congratulations, <span class="fw-bold c-text-blue">{{ name }}</span>
          </h2>
          <h2 class="mt-3 text-white">
            You've got <span class="fw-bold c-text-blue">{{ score }}</span> as
            your total score!
          </h2>
        </div>
        <div class="d-flex justify-content-center">
          <Button title="PLAY AGAIN" @click="handlePlayAgain" />
          <div class="me-4"></div>
          <Button title="LEADERBOARD" @click="handleLeaderboard" />
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
  props: ["score", "name"],
  setup(_, { emit }) {
    const handlePlayAgain = () => {
      emit("playAgain");
    };

    const handleLeaderboard = () => {};

    return { handlePlayAgain, handleLeaderboard };
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
  font-size: 72px;
}

.c-result-box {
  background: rgb(63, 63, 63);
  border-radius: 20px;
  padding: 2rem 1rem;
  margin-top: 3rem;
}
</style>