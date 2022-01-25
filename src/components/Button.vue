<template>
  <button class="btn c-btn">{{ title }}</button>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style scoped>
.c-btn {
  background: #50b1f5;
  margin-top: 2rem;
  padding: 10px 40px;
  color: #054d80;
  border-radius: 50px;
  transition: 500ms ease all;
  font-weight: bold;
}

.c-btn:hover {
  background: #054d80;
  color: white;
}
</style>