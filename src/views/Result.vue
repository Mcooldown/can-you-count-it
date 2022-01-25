<template>
  <div class="c-result">
    <div class="row justify-content-center">
      <div class="col-lg-2 col-md-4 col-8">
        <img src="../assets/can-you-count-it-logo.png" class="w-100" alt="" />
      </div>
      <div class="col-12"></div>
      <div class="col-lg-6 col-md-8 col-11">
        <div class="c-result-box mt-4">
          <div v-if="score">
            <h1 class="c-text-yellow fw-bold">Time's Up</h1>
            <h5 class="text-white mt-4">
              Congratulations,
              <span class="fw-bold c-text-blue">{{ score.username }}</span>
            </h5>
            <h5 class="mt-3 text-white">
              You've got
              <span class="fw-bold c-text-blue">{{ score.score }}</span>
              point(s) as your total score on
              <span class="fw-bold c-text-blue">{{ score.level.name }}</span>
              level.
            </h5>
          </div>
          <div v-else class="d-flex justify-content-center mt-4">
            <div class="spinner-border c-text-yellow" role="status"></div>
          </div>
        </div>
      </div>
      <div class="col-12"></div>
      <div class="col-lg-2 col-md-4 col-10 mt-3" v-if="score">
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
          @click="this.$router.push({ name: 'leaderboard' })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import Button from "../components/Button.vue";

export default {
  components: { Button },
  emits: ["playAgain"],
  props: ["score", "name", "levelId"],
  setup(props, { emit }) {
    const score = ref(null);

    onMounted(() => {
      fetch(
        `http://127.0.0.1:8000/api/store-score?username=${props.name}&level_id=${props.levelId}&score=${props.score}`,
        {
          method: "POST",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          score.value = data.score;
        })
        .catch((err) => {
          console.log(err.message);
        });
    });

    const handlePlayAgain = (step) => {
      emit("playAgain", step);
    };

    return {
      handlePlayAgain,
      handleLeaderboard,
      score,
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