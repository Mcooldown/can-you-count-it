<template>
  <div class="d-md-flex justify-content-between pt-2">
    <img
      src="../assets/can-you-count-it-logo.png"
      height="40"
      class="my-2"
      alt=""
    />
    <h5 class="text-white my-2">
      Player Name: <span class="c-text-yellow fw-bold">{{ name }}</span>
    </h5>
  </div>
  <h1 class="c-title c-text-blue">Select your Level</h1>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="row justify-content-center mt-4">
        <div
          class="col-md-6 my-3"
          v-for="(level, index) in levels"
          :key="level.id"
        >
          <div class="c-level-box" @click="handleFinished(level)">
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
    </div>
  </div>
  <Copyright />
</template>

<script>
import levelData from "../data/levels.json";
import Copyright from "../components/Copyright.vue";

export default {
  components: { Copyright },
  props: ["name"],
  emits: ["finished"],
  setup(_, { emit }) {
    const levels = levelData.levels;

    const handleFinished = (level) => {
      emit("finished", level);
    };

    return { levels, handleFinished };
  },
};
</script>

<style scoped>
.c-title {
  font-size: 48px;
  font-weight: bold;
  margin-top: 3rem;
}

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