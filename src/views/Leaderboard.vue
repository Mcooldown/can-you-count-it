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
              <div v-if="scores.length && !isLoading">
                <LeaderboardBox
                  v-for="(score, index) in scores"
                  :key="score.id"
                  :score="score"
                  :index="index"
                />
              </div>
              <div v-else-if="!isLoading && scores.length <= 0">
                <p class="text-muted">No data available.</p>
              </div>
              <div v-else class="d-flex justify-content-center mt-5">
                <div class="spinner-border text-muted" role="status"></div>
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
import { computed, onMounted, ref, watch } from "vue";
import postAPI from "../composables/postAPI.js";
import Button from "../components/Button.vue";
import Copyright from "../components/Copyright.vue";
import LeaderboardBox from "../components/LeaderboardBox.vue";

export default {
  components: { Button, Copyright, LeaderboardBox },
  setup() {
    const levels = ref([]);
    const scores = ref([]);
    const levelId = ref(1);
    const isLoading = ref(true);
    const selectedLevel = ref(null);

    const {
      data: dataLevel,
      error: errorLevel,
      accessAPI: accessAPILevel,
    } = postAPI();
    const {
      data: dataScores,
      error: errorScores,
      accessAPI: accessAPIScores,
    } = postAPI();

    const getScores = () => {
      selectedLevel.value = levels.value.find(
        (level) => level.id === levelId.value
      );

      accessAPIScores(`get-scores-by-level-id?level_id=${levelId.value}`).then(
        () => {
          if (errorScores.value) {
            console.log(errorLevel.value);
          } else {
            scores.value = dataScores.value.scores;
          }
          isLoading.value = false;
        }
      );
    };

    onMounted(() => {
      accessAPILevel(`levels`)
        .then(() => {
          if (errorLevel.value) {
            console.log(errorLevel.value);
          } else {
            levels.value = dataLevel.value.levels;
          }
        })
        .then(() => {
          getScores();
        });
    });

    watch(levelId, () => {
      isLoading.value = true;
      getScores();
    });

    return { levels, levelId, scores, selectedLevel, isLoading };
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