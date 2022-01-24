<template>
  <div class="c-top row justify-content-between" v-if="countdownTime <= 0">
    <div class="col-md-4 text-center my-3">
      <h5 class="text-white">
        Current Player: <span class="c-text-yellow fw-bold">{{ name }}</span>
      </h5>
    </div>
    <div class="col-md-4 text-center my-3">
      <h5 class="text-white">
        Round Time:
        <span class="text-danger fw-bold">{{ roundTime }} seconds</span>
      </h5>
    </div>
    <div class="col-md-4 text-md-end my-3">
      <h5 class="text-white">
        Round {{ round }}
        <br />
        Score: <span class="c-text-blue fw-bold">{{ score }}</span>
      </h5>
    </div>
  </div>
  <div class="c-play">
    <div class="c-countdown" v-if="countdownTime > 0">
      {{ countdownTime }}
    </div>
    <div v-if="isPlaying">
      <h1 class="c-number c-text-yellow">{{ thirdNumber }}</h1>
      <div class="c-question">
        <h1 class="c-number">{{ firstNumber }}</h1>
        <h1 class="text-white mx-4">+</h1>
        <h1 class="c-number">{{ secondNumber }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  props: ["name"],
  emits: ["finished"],
  setup() {
    const score = ref(0);
    const countdown = ref(null);
    const countdownTime = ref(5);

    const isPlaying = ref(false);
    const firstNumber = ref(0);
    const secondNumber = ref(0);
    const thirdNumber = ref(0);
    const timer = ref(null);
    const playTime = ref(0);
    const round = ref(1);
    const roundTime = ref(15);

    const handleCountdown = () => {
      countdown.value = setInterval(() => {
        if (countdownTime.value > 0) {
          countdownTime.value--;
        }
        if (countdownTime.value === 0) {
          clearInterval(countdown.value);
          startPlay();
        }
      }, 1000);
    };

    const startPlay = () => {
      firstNumber.value = Math.floor(Math.random() * 10);
      secondNumber.value = Math.floor(Math.random() * 10);
      thirdNumber.value = Math.floor(Math.random() * 10);
      playTime.value = 60;
      isPlaying.value = true;

      timer.value = setInterval(() => {
        playTime.value--;
        if (roundTime.value > 0) {
          roundTime.value--;
        }
        if (roundTime.value <= 0) {
          roundTime.value = 15;
          round.value++;
        }
      }, 1000);
    };

    onMounted(() => {
      handleCountdown();
    });

    return {
      score,
      countdownTime,
      playTime,
      round,
      roundTime,
      firstNumber,
      secondNumber,
      thirdNumber,
      isPlaying,
    };
  },
};
</script>

<style scoped>
.c-countdown {
  width: 150px;
  height: 150px;
  background: #50b1f5;
  color: white;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 56px;
  font-weight: bold;
}

.c-question {
  display: flex;
  align-items: center;
  justify-content: center;
}

.c-number {
  color: #50b1f5;
  font-weight: bold;
  font-size: 72px;
}

.c-text-yellow {
  color: #f6d55c;
}

.c-text-blue {
  color: #50b1f5;
}

.c-play {
  padding-top: 5rem;
}

.c-top {
  padding-top: 1rem;
}
</style>