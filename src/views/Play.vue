<template>
  <div class="c-top row justify-content-between" v-if="countdownTime <= 0">
    <div class="col-md-4 order-1 order-md-1 text-center text-md-start my-2">
      <h5 class="text-white">
        Player Name: <span class="c-text-yellow fw-bold">{{ name }}</span>
        <br />
        Level: <span class="c-text-yellow fw-bold">{{ level.name }}</span>
      </h5>
    </div>
    <div class="col-md-4 order-3 order-md-2 text-center my-2">
      <h5 class="text-white">
        Remaining Time:
        <span class="text-danger fw-bold">{{ playTime }} seconds</span>
      </h5>
    </div>
    <div class="col-md-4 order-2 order-md-3 text-center text-md-end my-2">
      <h5 class="text-white">
        Total Score: <br />
        <span class="c-text-blue fw-bold">{{ score }} Points</span>
      </h5>
    </div>
  </div>
  <div class="c-play">
    <div class="c-countdown-wrapper" v-if="countdownTime > 0">
      <h5 class="text-white fw-bold mb-4">Game will start in</h5>
      <div class="c-countdown">
        {{ countdownTime }}
      </div>
    </div>
    <div v-if="isPlaying">
      <div class="c-question">
        <h1 class="c-number">{{ firstNumber }}</h1>
        <h1 class="mx-4">+</h1>
        <h1 class="c-number">{{ secondNumber }}</h1>
        <h1 class="mx-4">+</h1>
        <div class="position-relative">
          <h1 class="c-number c-text-yellow position-relative">
            {{ thirdNumber }}
          </h1>
          <span class="position-absolute badge rounded-pill bg-danger">
            {{ roundTime }}
          </span>
        </div>
      </div>
      <div class="c-answer">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="row justify-content-center">
              <div class="col-4 my-3" v-for="answer in answers" :key="answer">
                <div class="c-answer-box py-3" @click="handleClick(answer)">
                  <h2 class="m-0">{{ answer }}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Copyright />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import Copyright from "../components/Copyright.vue";
export default {
  components: { Copyright },
  props: ["name", "level"],
  emits: ["finished"],
  setup(props, { emit }) {
    const score = ref(0);
    const countdown = ref(null);
    const countdownTime = ref(5);

    const isPlaying = ref(false);
    const firstNumber = ref(0);
    const secondNumber = ref(0);
    const thirdNumber = ref(0);
    const timer = ref(null);
    const playTime = ref(props.level.play_time);
    const roundTime = ref(props.level.round_time);
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
      isPlaying.value = false;
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
      isPlaying.value = true;

      timer.value = setInterval(() => {
        if (playTime.value > 0) {
          if (roundTime.value > 0) {
            roundTime.value--;
          }
          if (roundTime.value <= 0) {
            randomThirdNumber();
            roundTime.value += props.level.round_time;
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
        score.value += props.level.correct_score;
      } else {
        if (score.value > 0) {
          if (score.value - props.level.incorrect_score < 0) {
            score.value = 0;
          } else {
            score.value -= props.level.incorrect_score;
          }
        }
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
      roundTime,
    };
  },
};
</script>

<style scoped>
.c-countdown-wrapper {
  margin-top: 5rem;
}
.c-countdown {
  width: 100px;
  height: 100px;
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
  font-size: 56px;
}

.c-play {
  padding-top: 1rem;
}

.c-top {
  padding-top: 0.25rem;
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
}

.c-answer-box:hover {
  box-shadow: 0px 0px 1px 1px rgb(139, 139, 139);
}

.badge {
  top: 0;
  right: -35px;
  padding: 5px 10px;
}
</style>