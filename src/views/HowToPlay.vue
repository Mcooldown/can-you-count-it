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
            <h1 class="fw-bold c-text-yellow mt-5">How To Play</h1>
            <img
              src="../assets/howtoplay.png"
              class="w-100 border my-4"
              alt=""
            />
            <div class="text-white text-start">
              <p>
                The picture above shows the display when starting the game at a
                certain level that can be selected when you want to start the
                game. At the top, there is remaining time, which is the time
                remaining to play this game. Remaining time will initially be
                equal to play time. Then every second will continue to decrease
                until the time runs out. When the time is up, the game is over
              </p>
              <p>
                The gameplay of this game is simple. You only need to add up the
                2 blue numbers and 1 yellow number listed in the image above.
                The example in the picture above, if added up, the result is 11.
                However, the answer taken is the last digit of the result, so
                the answer is 1. When the result is below 10, then 1 result is
                the answer. Every time you answer, the blue numbers will change
                randomly and you can start re-adding.
              </p>
              <p>
                However, unlike the blue number, the yellow number does not
                change when the user answers 1 question, but the yellow number
                changes at certain time intervals, which will change every few
                seconds, which differs for each level. In the picture above, the
                time interval is displayed to the right of the yellow number.
                When the number displayed there has touched 0 seconds, the
                yellow number will automatically change
              </p>
            </div>
          </div>
        </div>
        <Copyright />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../components/Button.vue";
import Copyright from "../components/Copyright.vue";

export default {
  components: { Button, Copyright },
};
</script>

<style>
</style>