<script lang="ts" setup>
import { ref } from "vue";
import SearchIcon from "../assets/images/icon-search.svg?component";

defineProps<{
  notFound: boolean;
}>();

const emit = defineEmits<{
  search: [username: string];
}>();

const username = ref("");

const inputRef = ref<HTMLInputElement>();
</script>

<template>
  <div
    class="flex cursor-pointer items-center rounded-[15px] bg-almost-white pb-[7.5px] pl-[16px] pr-[7px] pt-[6.5px] shadow-[0_16px_30px_-10px_rgba(70,96,187,0.2)] dark:bg-yankees-blue dark:shadow-none tablet:py-[9.5px] tablet:pl-[32px] tablet:pr-[10px]"
    @click="() => inputRef?.focus()"
  >
    <SearchIcon
      class="fill-azure max-tablet:h-[20px] max-tablet:w-[20px]"
      viewBox="0 0 24 24"
      aria-hidden="true"
    />
    <input
      ref="inputRef"
      id="search-username"
      class="ml-[9px] flex-1 border-none bg-transparent p-0 leading-[25px] placeholder:text-blue dark:placeholder:text-white tablet:ml-[24px] tablet:text-[18px]"
      type="text"
      placeholder="Search GitHub username..."
      v-model="username"
    />
    <div v-if="notFound" class="ml-[4px] font-bold text-[#f74646]">
      No results
    </div>
    <button
      class="ml-[7px] rounded-[10px] bg-azure px-[16px] py-[12.5px] text-[14px] font-bold leading-normal text-white hover:bg-blue-jeans tablet:pb-[13.5px] tablet:pl-[24px] tablet:pr-[23px] tablet:pt-[12.5px] tablet:text-[16px] desktop:ml-[24px]"
      type="button"
      @click.stop="emit('search', username)"
    >
      Search
    </button>
  </div>
</template>
