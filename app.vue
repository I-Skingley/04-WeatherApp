<script setup lang="ts">
import { symlinkSync } from "fs";

const search = ref("Lillehammer");
const input = ref("");
const background = ref("");

// const { data: city, error } = useFetch(
//   () =>
//     `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=c6bd29d73061465642ea8b1bc459b031`
// ); //rename data to city

const {
  data: city,
  refresh,
  error,
} = useAsyncData("city", async () => {
  const response = await $fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=c6bd29d73061465642ea8b1bc459b031`
  );

  const temp = response.main.temp;

  if (temp <= -10) {
    background.value =
      "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80";
  } else if (temp > -10 && temp <= 0) {
    background.value =
      "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80";
  } else if (temp > 0 && temp <= 25) {
    background.value =
      "https://images.unsplash.com/photo-1560258018-c7db7645254e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4032&q=80";
  } else {
    background.value =
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3546&q=80";
  }
  return response;
});

const handleClick = () => {
  const formattedSearch = input.value.trim().split(" ").join("+"); //removes whitespace and appends cities with multiple words in the name
  search.value = formattedSearch;
  input.value = "";
  refresh(); //Refresh data loaded from API
};
</script>

<template>
  <div class="h-screen overflow-hidden">
    <img :src="background"/>
    <div class="absolute w-full h-full top-0 overlay" />
    <div class="absolute w-full h-full top-0 p-48">
      <!--padding 48-->
      <div class="flex space-x-5">
        <div>
          <h1 class="text-7xl text-white">
            {{ city.name }} - {{ city.sys.country }}
          </h1>
          <!-- <h1 class="text-7xl text-white">{{ city.name }}</h1> -->
          <p class="font-extralight text-2xl text-white">Sunday Dec 9th</p>
          <img
            :src="`https://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`"
            class="w-56 icon"
          />
        </div>
        <div>
          <p class="text-9xl text-white font-extralight">
            {{ city.main.temp }}°
          </p>
        </div>
      </div>
      <div class="mt-20 flex">
        <input
          type="text"
          class="w-1/2 h-10"
          placeholder="Search a city..."
          v-model="input"
          v-on:keyup.enter="handleClick"
        />
        <button class="bg-sky-400 w-20 text-white h-10" @click="handleClick">
          Search
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
}

.icon {
  margin-left: -2.75rem;
  margin-top: -2.75rem;
}
</style> 