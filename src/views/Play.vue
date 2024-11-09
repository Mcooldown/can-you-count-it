<template>
  <div class="pt-3" v-if="level && isPlaying">
    <div class="text-end mb-5">
      <Button icon="fas fa-sign-out-alt" @click="goToLevel" />
    </div>
    <h5 class="text-white mb-4">
      Remaining Time:
      <span class="text-danger fw-bold">{{ playTime }} seconds</span>
    </h5>
    <h5 class="text-white">
      Total Score: <br />
      <span class="c-text-yellow fw-bold">{{ score }} Points</span>
    </h5>
  </div>
  <div class="pt-3">
    <div class="c-countdown-wrapper" v-if="level && countdownTime > 0">
      <h5 class="text-white mb-5">
        <!-- Player Name: <span class="c-text-yellow fw-bold">{{ name }}</span> -->
        <!-- <br /> -->
        Level: <span class="c-text-yellow fw-bold">{{ level.name }}</span>
      </h5>
      <p class="text-white fw-bold mb-4">Game will start in</p>
      <div class="c-countdown">
        {{ countdownTime }}
      </div>
    </div>
    <div v-if="level && isPlaying">
      <div class="d-flex justify-content-center align-items-center mt-4">
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
                  <h2 class="m-0 fw-bold">{{ answer }}</h2>
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
import Button from "../components/Button.vue";
// import postAPI from "../composables/postAPI";
import levels from '../data/levels.json'

export default {
  components: { Copyright, Button },
  props: ["name", "levelId"],
  emits: ["finished", "goToLevel"],
  setup(props, { emit }) {
    const score = ref(0);
    const countdown = ref(null);
    const countdownTime = ref(5);

    const isPlaying = ref(false);
    const firstNumber = ref(0);
    const secondNumber = ref(0);
    const thirdNumber = ref(0);
    const timer = ref(null);
    const level = ref(null);
    const playTime = ref(0);
    const roundTime = ref(0);
    const answers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    // const { data, error, accessAPI } = postAPI();

    onMounted(() => {
      // accessAPI(`get-level-by-id?level_id=${props.levelId}`)
      //   .then(() => {
      //     if (error.value) {
      //       console.log(error.value);
      //     } else {
      //       level.value = data.value.level;
      //     }
      //   })
      //   .then(() => {
      //     playTime.value = level.value.play_time;
      //     roundTime.value = level.value.round_time;
      //     handleCountdown();
      //   });
      const selectedLevel = levels.find(level => level.id === props.levelId)
      if (!selectedLevel) {
        goToLevel()
        return
      }
      level.value = selectedLevel
      playTime.value = level.value.play_time
      roundTime.value = level.value.round_time
      handleCountdown()
    });

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

    const goToLevel = () => {
      clearInterval(timer.value);
      isPlaying.value = false;
      emit("goToLevel", 2);
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
            roundTime.value += level.value.round_time;
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
        score.value += level.value.correct_score;
      } else {
        if (score.value > 0) {
          if (score.value - level.value.incorrect_score < 0) {
            score.value = 0;
          } else {
            score.value -= level.value.incorrect_score;
          }
        }
      }
      randomPairNumber();
    };

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
      goToLevel,
      level,
    };
  },
};
</script>

<style scoped>
.c-countdown-wrapper {
  margin-top: 5rem;
}
.c-countdown {
  width: 6rem;
  height: 6rem;
  background: #50b1f5;
  color: white;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 56px;
  font-weight: bold;
}

.c-number {
  color: #50b1f5;
  font-weight: bold;
  font-size: 56px;
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