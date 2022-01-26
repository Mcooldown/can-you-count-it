<template>
  <div class="c-bg-black">
    <div class="c-background" id="background">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-6 col-11">
            <Button
              class="mt-4"
              icon="fas fa-home"
              @click="this.$router.push({ name: 'main' })"
            />
            <h1 class="fw-bold c-text-yellow mt-5">Leaderboard</h1>
            <div v-if="levels.length">
              <div
                class="
                  d-flex
                  flex-wrap
                  justify-content-center
                  align-items-center
                  mt-4
                "
              >
                <div v-for="(level, index) in levels" :key="level.id">
                  <div
                    @click="levelId = level.id"
                    :class="
                      'c-nav-level m-2 ' +
                      (level.id === levelId ? 'c-nav-selected' : '')
                    "
                  >
                    {{ index + 1 }}
                  </div>
                </div>
              </div>
              <hr />
              <div v-if="selectedLevel">
                <h1 class="fw-bold c-text-blue my-4">
                  {{ selectedLevel.name }}
                </h1>
              </div>
              <div v-if="filteredScores.length">
                <div
                  v-for="(score, index) in filteredScores"
                  :key="score.id"
                  class="c-list-box d-flex p-3 mb-3"
                >
                  <h1 class="fw-bold c-text-blue">
                    {{ index + 1 }}
                  </h1>
                  <div
                    class="
                      d-md-flex
                      w-100
                      align-items-center align-items-center
                      justify-content-between
                      ms-3
                    "
                  >
                    <div class="text-start">
                      <h5 class="text-white m-0">
                        {{ score.username }}
                      </h5>
                      <small class="text-muted">
                        {{ score.user ? "User" : "Non-user" }}
                      </small>
                    </div>
                    <h2 class="c-text-yellow fw-bold text-end my-2">
                      <span class="h6 text-muted">Score:&nbsp;&nbsp;</span
                      >{{ score.score }}
                    </h2>
                  </div>
                </div>
              </div>
              <div v-else>
                <p class="text-muted">No data available.</p>
              </div>
            </div>
            <div v-else class="d-flex justify-content-center mt-5">
              <div class="spinner-border text-muted" role="status"></div>
            </div>
          </div>
        </div>
        <Copyright />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import postAPI from "../composables/postAPI.js";
import Button from "../components/Button.vue";
import Copyright from "../components/Copyright.vue";

export default {
  components: { Button, Copyright },
  setup() {
    const levels = ref([]);
    const scores = ref([]);
    const levelId = ref(1);

    const { data, error, accessAPI } = postAPI();

    onMounted(() => {
      accessAPI(`get-all-level-with-scores`).then(() => {
        if (error.value) {
          console.log(error.value);
        } else {
          levels.value = data.value.levels;
          scores.value = data.value.scores;
        }
      });
    });

    const filteredScores = computed(() => {
      return scores.value
        .filter((score) => score.level_id === levelId.value)
        .sort(function (a, b) {
          return b.score - a.score;
        })
        .slice(0, 50);
    });

    const selectedLevel = computed(() => {
      return levels.value.find((level) => level.id === levelId.value);
    });

    return { levels, filteredScores, levelId, selectedLevel };
  },
};
</script>

<style scoped>
.c-nav-level {
  width: 56px;
  height: 56px;
  font-size: 24px;
  color: #f6d55c;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #f6d55c;
  transition: 200ms ease all;
  cursor: pointer;
}

.c-nav-selected,
.c-nav-level:hover {
  background-color: #f6d55c;
  color: white;
}

.c-list-box {
  background: rgb(63, 63, 63);
  border-radius: 20px;
}
</style>