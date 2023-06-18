<script setup lang="ts">
import { ref } from "vue";
import { fetchProfile, type Profile } from "./api/profile";
import TheProfileView from "./components/TheProfileView.vue";
import TheSearchBar from "./components/TheSearchBar.vue";
import TheThemeToggle from "./components/TheThemeToggle.vue";

// Usuário padrão: octocat
const defaultProfile = ref<Profile>();
fetchProfile("octocat").then((p) => {
  defaultProfile.value = p;
});

const profile = ref<Profile>();
const notFound = ref(false);
const search = async (username: string) => {
  notFound.value = false;

  if (username) {
    try {
      profile.value = await fetchProfile(username);
    } catch (error) {
      if (error instanceof Error && error.message === "Not Found") {
        notFound.value = true;
      } else {
        console.error(error);
      }
    }
  }
};
</script>

<template>
  <header class="flex items-center justify-between">
    <h1
      class="text-[26px] font-bold leading-normal text-dark-blue dark:text-white"
    >
      devfinder
    </h1>
    <client-only>
      <TheThemeToggle />
    </client-only>
  </header>
  <main class="mt-[36px]">
    <TheSearchBar :not-found="notFound" @search="search" />
    <TheProfileView :profile="profile" :defaultProfile="defaultProfile" />
  </main>
</template>
