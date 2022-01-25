<template>
  <button class="btn c-btn">
    <div class="d-inline-flex">
      <i :class="icon"></i>
      <h6 class="text-white mb-0 ms-2 fw-bold" v-if="title">
        {{ title }}
      </h6>
    </div>
  </button>
</template>

<script>
export default {
  props: ["title", "icon"],
};
</script>

<style scoped>
.c-btn {
  background: #50b1f5;
  padding: 8px 32px;
  color: white;
  border-radius: 50px;
  transition: 500ms ease all;
}

.c-btn:hover {
  background: #2d658d;
}
</style>