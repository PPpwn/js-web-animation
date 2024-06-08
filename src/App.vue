<template>
  <div class="box-player m-0 p-0">
    <img
      id="finn"
      src="/charactor/FinnSprite.png"
      alt=""
      class="hidden w-full h-full"
    />
    <!-- <img id="finn" src="/forest/0.png" alt="" />
    <img src="/forest/1.png" alt="" />
    <img src="/forest/2.png" alt="" />
    <img src="/forest/3.png" alt="" />
    <img src="/forest/4.png" alt="" />
    <img src="/forest/5.png" alt="" />
    <img src="/forest/6.png" alt="" /> -->
    <div
      class="frame shadow-default absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] border-solid border border-black p-2.5 w-[500px] flex flex-col"
    >
      <canvas
        id="canvas"
        class="border border-solid border-black shadow-inner"
      ></canvas>
      <div class="controls m-2.5 text-[20px]">
        <p class="text-[30px] font-bold">Play Animation:</p>
        <input
          type="radio"
          name="animation"
          id="idle"
          value="idle"
          checked
          class="mr-1"
          v-model="animation"
        />
        <label for="idle" class="mr-2">Idle</label>
        <input
          type="radio"
          name="animation"
          id="run"
          v-model="animation"
          value="run"
          class="mr-1"
        />
        <label for="run" class="mr-2">Run</label>
        <input
          type="radio"
          name="animation"
          id="hurt"
          v-model="animation"
          value="hurt"
          class="mr-1"
        />
        <label for="hurt" class="mr-2">Hurt</label>
        <input
          type="radio"
          name="animation"
          id="dead"
          v-model="animation"
          value="dead"
          class="mr-1"
        />
        <label for="dead" class="mr-2">Dead</label>
        <input
          type="radio"
          name="animation"
          id="attack"
          v-model="animation"
          value="attack"
          class="mr-1"
        />
        <label for="attack" class="mr-2">Attack</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Player from "./assets/js/animation";

const canvasFrame = ref({});
const ctx = ref({});
const animation = ref("all");
const playerAction = ref(null);
// import imagetest from "@/img/bg/forest/0.png";

onMounted(() => {
  canvasFrame.value = document.getElementById("canvas");
  ctx.value = canvasFrame.value.getContext("2d");
  canvasFrame.value.width = 500;
  canvasFrame.value.height = 500;

  // const image = document.getElementById("finn");
  const img = new Image();
  img.src = "../public/charactor/FinnSprite.png";
  // console.log(img);
  playerAction.value = new Player(
    img,
    canvasFrame.value.width,
    canvasFrame.value.height
  );
  selectAnimation();
});

watch(animation, (newValue) => {
  switch (newValue) {
    case "idle":
      playerAction.value.idle();
      break;
    case "run":
      playerAction.value.run();
      break;
    case "hurt":
      playerAction.value.hurt();
      break;
    case "dead":
      playerAction.value.dead();
      break;
    case "attack":
      playerAction.value.attack();
      break;
  }
});

function selectAnimation() {
  animate();

  function animate() {
    ctx.value.clearRect(
      0,
      0,
      canvasFrame.value.width,
      canvasFrame.value.height
    ); // to clear entire in canvas in every
    playerAction.value.draw(ctx.value);
    playerAction.value.update();
    setTimeout(() => {
      requestAnimationFrame(animate); // pass animate func to create endless animation loop
    }, 100); // set time when want to slow or fast in frame by frame
  }
}
</script>

<style scoped></style>
