<template>
  <div class="c-home">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-4">
        <img src="../assets/can-you-count-it-logo.png" class="w-100" alt="" />
      </div>
      <div class="col-12"></div>
      <div class="col-md-3">
        <form @submit.prevent="handleSubmit" class="c-form">
          <input
            type="text"
            :class="
              'form-control c-input ' + (errorName ? ' is-invalid' : 'border-0')
            "
            v-model="name"
            placeholder="Input Your Name"
          />
          <h6 v-if="errorName" class="c-error-input">{{ errorName }}</h6>
          <Button title="PLAY" />
        </form>
      </div>
    </div>
    <div class="d-flex justify-content-center c-form"></div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import Button from "../components/Button.vue";

export default {
  name: "Home",
  emits: ["finished"],
  components: { Button },
  setup(_, { emit }) {
    const name = ref("");
    const errorName = ref(null);

    watch(name, () => {
      errorName.value = null;
    });

    const handleSubmit = () => {
      if (name.value === "") {
        errorName.value = "Name must be filled";
      } else {
        emit("finished", name.value);
      }
    };

    return { name, errorName, handleSubmit };
  },
};
</script>

<style scoped>
.c-home {
  padding-top: 15rem;
}
.c-form {
  margin-top: 5rem;
}

.c-input {
  background: rgb(63, 63, 63);
  padding: 15px 20px;
  border-radius: 50px;
  color: white;
}

.c-error-input {
  color: red;
  margin-top: 1rem;
}
</style>
