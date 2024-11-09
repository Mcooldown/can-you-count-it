<template>
  <!-- <div class="text-end pt-3">
    <Button
      title="LEADERBOARD"
      icon="fas fa-trophy"
      @click="this.$router.push({ name: 'Leaderboard' })"
    />
  </div> -->
  <div class="c-home">
    <div class="row justify-content-center align-items-center">
      <div class="col-lg-4 col-md-6 col-11 my-4">
        <img src="../assets/can-you-count-it-logo.png" class="w-100" alt="" />
      </div>
      <div class="col-12"></div>
      <div class="col-lg-2 col-md-4 col-10 my-4">
        <!-- <form @submit.prevent="handleSubmit" class="c-form"> -->
          <!-- <input
            type="text"
            :class="
              'form-control c-input ' + (errorName ? ' is-invalid' : 'border-0')
            "
            v-model="name"
            placeholder="Input Your Name"
          /> -->
          <!-- <h6 v-if="errorName" class="c-error-input">{{ errorName }}</h6> -->
          <div class="d-flex justify-content-center">  <!-- mt-4 -->
            <!-- <Button type="submit" title="PLAY" icon="fas fa-play" /> -->
            <Button type="submit" title="PLAY" icon="fas fa-play" @click="handleSubmit" />
          </div>
          <h6
            class="c-how-to-play mt-4"
            @click="this.$router.push({ name: 'How To Play' })"
          >
            How to Play?
          </h6>
        <!-- </form> -->
      </div>
    </div>
    <Copyright />
  </div>
</template>

<script>
import Button from "../components/Button.vue";
import Copyright from "../components/Copyright.vue";

export default {
  name: "Home",
  emits: ["finished"],
  components: { Button, Copyright },
  setup(_, { emit }) {
    // const name = ref("");
    // const errorName = ref(null);

    // watch(name, () => {
    //   errorName.value = null;
    // });

    const handleSubmit = () => {
      // if (name.value === "") {
      //   errorName.value = "Name must be filled";
      // } else if (name.value.length > 15) {
      //   errorName.value = "Name must not greater than 15 characters";
      // } else {
      //  emit("finished", name.value);
      // }
      emit("finished");
    };

    return {
      // name,
      // errorName,
      handleSubmit
    };
  },
};
</script>

<style scoped>
.c-home {
  /* padding-top: 5rem; */
  padding-top: 30vh;
}

.c-input {
  background: rgb(63, 63, 63);
  padding: 10px 20px;
  border-radius: 50px;
  color: white;
}

.c-error-input {
  color: red;
  margin-top: 1rem;
}

.c-how-to-play {
  cursor: pointer;
  color: #f6d55c;
}
.c-how-to-play:hover {
  color: #fff0bb;
}
</style>
