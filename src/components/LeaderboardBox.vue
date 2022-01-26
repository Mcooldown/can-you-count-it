<template>
  <div :class="'c-list-box d-flex p-3 mb-3 ' + (index < 3 ? 'top' : '')">
    <h1
      :class="
        'fw-bold px-2 ' +
        (index < 3 ? 'c-text-rank-top c-text-blue' : 'c-text-rank text-muted')
      "
    >
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
        <h5 class="text-white m-0">{{ username }}</h5>
        <small class="text-muted"> ID: {{ userId }} </small>
      </div>
      <h2 class="c-text-yellow fw-bold text-end my-2">
        <span class="h6 text-muted">Score:&nbsp;&nbsp;</span>{{ score.score }}
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  props: ["score", "index"],
  setup(props) {
    const usernameArray = props.score.username.split("-");
    const username = usernameArray[0].trim();
    const userId = usernameArray[1].trim();

    return { username, userId };
  },
};
</script>

<style scoped>
.c-list-box {
  border-radius: 20px;
  background: rgb(63, 63, 63);
}

.c-text-rank {
  font-size: 3em;
}

.c-text-rank-top {
  font-size: 3.5em;
}
</style>