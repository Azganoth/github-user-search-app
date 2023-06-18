<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";
import MoonIcon from "../assets/images/icon-moon.svg?component";
import SunIcon from "../assets/images/icon-sun.svg?component";

type Theme = "light" | "dark";

const getSavedTheme = (): Theme | undefined => {
  const theme = localStorage.getItem("theme");
  if (theme !== null && (theme === "light" || theme === "dark")) {
    return theme;
  }
};

const currentTheme = ref<Theme>(
  // Checar se há alguma preferência salva
  getSavedTheme() ||
    // Se não usar a preferência padrão do sistema
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light")
);

watchEffect(() => {
  // Definir classe de tema do Tailwind
  if (currentTheme.value === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  // Salvar preferência
  try {
    localStorage.setItem("theme", currentTheme.value);
  } catch (error) {
    console.error(error);
  }
});

const toggle = () => {
  currentTheme.value = currentTheme.value === "dark" ? "light" : "dark";
};

const content = computed<{ label: string; Icon: unknown }>(() => {
  const isDark = currentTheme.value === "dark";
  return {
    label: isDark ? "Light" : "Dark",
    Icon: isDark ? SunIcon : MoonIcon,
  };
});
</script>

<template>
  <button
    class="font-bold uppercase leading-normal tracking-[2.5px] text-gray hover:text-dark-blue dark:hover:text-ceil-blue tablet:text-[13px]"
    type="button"
    @click="toggle()"
  >
    <span class="mr-[14px]">{{ content.label }}</span>
    <component
      class="inline fill-current"
      :is="content.Icon"
      aria-hidden="true"
    />
  </button>
</template>
