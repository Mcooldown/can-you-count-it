<template>
  <div class="row justify-content-center">
    <div class="col-lg-8 col-md-10 col-11">
      <h1 class="fw-bold c-text-yellow mt-5">Select your Level</h1>
      <Button
        class="mt-4"
        title="BACK TO HOME"
        icon="fas fa-home"
        @click="goToHome"
      />
      <div v-if="levels.length" class="row justify-content-center mt-4">
        <div
          class="col-md-6 my-3"
          v-for="(level, index) in levels"
          :key="level.id"
        >
          <div class="c-level-box" @click="handleFinished(level.id)">
            <div class="c-symbol-level">{{ index + 1 }}</div>
            <h4 class="fw-bold text-white my-3">
              {{ level.name }}
            </h4>
            <p class="text-muted m-0">
              <span class="text-info">
                <i class="fa fa-clock"></i> Time: {{ level.play_time }} seconds
              </span>
              <br />
              <span class="text-info">
                <i class="fa fa-clock"></i> Change Interval:
                {{ level.round_time }} seconds
              </span>
              <br />
              <span class="text-success">
                <i class="fa fa-check"></i> Correct Answer: +{{
                  level.correct_score
                }}
                Point
              </span>
              <br />
              <span class="text-danger">
                <i class="fa fa-times"></i> Incorrect Answer: -{{
                  level.incorrect_score
                }}
                Point
              </span>
            </p>
          </div>
        </div>
      </div>
      <div v-else class="d-flex justify-content-center mt-4">
        <div class="spinner-border c-text-yellow" role="status"></div>
      </div>
    </div>
  </div>
  <Copyright />
</template>

<script>
import Copyright from "../components/Copyright.vue";
import Button from "../components/Button.vue";
import { onMounted, ref } from "vue";

export default {
  components: { Copyright, Button },
  props: ["name"],
  emits: ["finished", "goToHome"],
  setup(_, { emit }) {
    const levels = ref([]);

    onMounted(() => {
      fetch("http://127.0.0.1:8000/api/levels", {
        method: "POST",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          levels.value = data.levels;
        })
        .catch((err) => {
          console.log(err.message);
        });
    });

    const handleFinished = (levelId) => {
      emit("finished", levelId);
    };

    const goToHome = () => {
      emit("goToHome", 1);
    };

    return { levels, handleFinished, goToHome };
  },
};
</script>

<style scoped>
.c-level-box {
  background: rgb(63, 63, 63);
  border-radius: 20px;
  padding: 2rem 1rem;
  cursor: pointer;
}

.c-level-box:hover {
  box-shadow: 0px 0px 1px 1px rgb(139, 139, 139);
}

.c-symbol-level {
  width: 100px;
  height: 100px;
  font-size: 48px;
  color: #f6d55c;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #f6d55c;
}
</style>