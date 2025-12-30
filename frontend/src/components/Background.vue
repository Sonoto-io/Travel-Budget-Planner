<template>
  <div class="background">
    <div v-if="configStore.enableBackground">
      <img :src="planeImg" alt="plane" class="plane" :style="'top: ' + (20 + Math.round(Math.random() * 60)) + '%'" />
      <div v-for="n in nbClouds" :key="'cloud-' + n">
        <img :src="clouds[Math.floor(Math.random() * clouds.length)]" alt="cloud" class="cloud" :style="'top: ' + (10 + Math.round(Math.random() * 100)) + '%;' +
          'animation-delay: ' + (60 - Math.round(cloudValues[n - 1] * 60)) + 's;' +
          'animation-duration: ' + (120 - Math.round(cloudValues[n - 1] * 80)) + 's;' +
          'z-index: ' + zIndexCalculator(cloudValues[n - 1]) + ';' +
          'width: ' + (10 + cloudValues[n - 1] * 20) + 'vw;'" />
      </div>
      <div v-for="n in nbMounts" :key="'mount-' + n">
        <img :src="mounts[Math.floor(Math.random() * mounts.length)]" alt="mount" class="mount" :style="'bottom: ' + (-105 + Math.round(mountValues[n - 1] * 100)) + '%;' +
          'animation-duration: ' + (140 - Math.round(mountValues[n - 1] * 60)) + 's;' +
          'z-index: ' + zIndexCalculator(mountValues[n - 1]) + ';' +
          'width: ' + (20 + Math.round(mountValues[n - 1] * 30)) + 'vw;'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import planeImg from "@/assets/images/plane.svg?url"
import cloud2Img from "@/assets/images/cloud2.svg?url"
import cloud3Img from "@/assets/images/cloud3.svg?url"
import mount1Img from "@/assets/images/mount1.svg?url"
import { useConfigStore } from "@/stores/configStore";

const configStore = useConfigStore();


const clouds = [cloud2Img, cloud3Img];
const mounts = [mount1Img];

const nbClouds = 35;
const nbMounts = 5;

const cloudValues = Array.from({ length: nbClouds }, () => Math.random());
const mountValues = Array.from({ length: nbMounts }, () => Math.random());


const zIndexCalculator = (value: number) => {
  const index = - 3 + Math.round(value * 3);
  return index
};
</script>


<style lang="scss" scoped>
@keyframes slide-right-plane {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(120vw);
  }
}

@keyframes slide-left {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-200vw);
  }
}



.background {
  position: fixed;
  display: flex;
  background-color: #3892cf;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;


  .plane {
    position: absolute;
    z-index: 0;
    left: -20%;
    width: 10vw;
    height: auto;
    animation: slide-right-plane 60s infinite linear;
  }

  .cloud {
    position: absolute;
    height: auto;
    right: -40vw;

    animation-name: slide-left;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  .mount {
    position: absolute;
    right: -50vw;

    height: auto;
    animation-name: slide-left;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
}

@keyframes day-cycle {
  0% {
    background: rgba(255, 255, 0, 0.1);
  }

  25% {
    background: rgba(255, 128, 0, 0.3);
  }

  50% {
    background: rgba(0, 0, 50, 0.5);
  }

  75% {
    background: rgba(0, 247, 255, 0.3);
  }

  100% {
    background: rgba(255, 255, 0, 0.1);
  }
}

.background::after {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: day-cycle 300s infinite;
}
</style>