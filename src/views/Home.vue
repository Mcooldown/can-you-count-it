<template>
  <div class="c-home">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-6">
        <img src="../assets/can-you-count-it-logo.png" class="w-100" alt="" />
      </div>
    </div>
    <div class="d-flex justify-content-center c-form">
      <form @submit.prevent="handleSubmit">
        <input
          type="text"
          :class="
            'form-control c-input ' + (errorName ? ' is-invalid' : 'border-0')
          "
          v-model="name"
          placeholder="Input Your Name"
        />
        <h6 v-if="errorName" class="c-error-input">{{ errorName }}</h6>
        <button type="submit" class="btn c-btn-submit">PLAY</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "Home",
  emits: ["finished"],
  components: {},
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
  width: 25rem;
  padding: 15px 20px;
  border-radius: 50px;
  color: white;
}

.c-btn-submit {
  background: #50b1f5;
  margin-top: 2rem;
  padding: 10px 40px;
  color: white;
  border-radius: 50px;
  transition: 500ms ease all;
  font-weight: bold;
}

.c-btn-submit:hover {
  background: #13649e;
}

.c-error-input {
  color: red;
  margin-top: 1rem;
}
</style>
