<template>
  <div class="c-top row justify-content-between" v-if="countdownTime <= 0">
    <div class="col-md-4 order-1 order-md-1 text-center text-md-start my-2">
      <h4 class="text-white">
        Current Player: <span class="c-text-yellow fw-bold">{{ name }}</span>
        <br />
        Level: <span class="c-text-yellow fw-bold">Intermediate</span>
      </h4>
    </div>
    <div class="col-md-4 order-3 order-md-2 text-center my-2">
      <h4 class="text-white">
        Remaining Time:
        <span class="text-danger fw-bold">{{ playTime }} seconds</span>
      </h4>
    </div>
    <div class="col-md-4 order-2 order-md-3 text-center text-md-end my-2">
      <h4 class="text-white">
        Total Score: <br />
        <span class="c-text-blue fw-bold">{{ score }}</span>
      </h4>
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
      <div class="c-answer">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="row justify-content-center">
              <div
                class="col-md-4 my-3"
                v-for="answer in answers"
                :key="answer"
              >
                <div class="c-answer-box" @click="handleClick(answer)">
                  <h1>{{ answer }}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  props: ["name"],
  emits: ["finished"],
  setup(_, { emit }) {
    const score = ref(0);
    const countdown = ref(null);
    const countdownTime = ref(3);

    const isPlaying = ref(false);
    const firstNumber = ref(0);
    const secondNumber = ref(0);
    const thirdNumber = ref(0);
    const timer = ref(null);
    const playTime = ref(0);
    const roundTime = ref(15);
    const answers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

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

    const handleFinished = () => {
      console.log(score.value);
      emit("finished", score.value);
    };

    const randomPairNumber = () => {
      firstNumber.value = Math.floor(Math.random() * 10);
      secondNumber.value = Math.floor(Math.random() * 10);
    };

    const randomThirdNumber = () => {
      thirdNumber.value = Math.floor(Math.random() * 10);
    };

    const startPlay = () => {
      randomPairNumber();
      randomThirdNumber();
      playTime.value = 10;
      isPlaying.value = true;

      timer.value = setInterval(() => {
        if (playTime.value > 0) {
          if (roundTime.value > 0) {
            roundTime.value--;
          }
          if (roundTime.value <= 0) {
            randomPairNumber();
            randomThirdNumber();
            roundTime.value += 15;
          }
          playTime.value--;
        }
        if (playTime.value <= 0) {
          clearInterval(timer.value);
          handleFinished();
        }
      }, 1000);
    };

    const handleClick = (answer) => {
      const correctAnswer =
        (firstNumber.value + secondNumber.value + thirdNumber.value) % 10;
      if (answer === correctAnswer) {
        score.value += 10;
      } else {
        if (score.value > 0) score.value -= 5;
      }
      randomPairNumber();
    };

    onMounted(() => {
      handleCountdown();
    });

    return {
      score,
      countdownTime,
      playTime,
      firstNumber,
      secondNumber,
      thirdNumber,
      isPlaying,
      answers,
      handleClick,
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

.c-play {
  padding-top: 3rem;
}

.c-top {
  padding-top: 1rem;
}

.c-answer {
  padding-top: 2rem;
}

.c-answer-box {
  background-color: rgb(63, 63, 63);
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px;
  padding: 1.25rem 0;
}

.c-answer-box:hover {
  box-shadow: 0px 0px 1px 1px rgb(192, 192, 192);
}
</style>