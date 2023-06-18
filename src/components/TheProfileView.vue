<script lang="ts" setup>
import { computed } from "vue";
import type { Profile } from "../api/profile";
import CompanyIcon from "../assets/images/icon-company.svg?component";
import LocationIcon from "../assets/images/icon-location.svg?component";
import TwitterIcon from "../assets/images/icon-twitter.svg?component";
import WebsiteIcon from "../assets/images/icon-website.svg?component";

const props = defineProps<{
  profile?: Profile;
  defaultProfile?: Profile;
}>();

const activeProfile = computed(() => props.profile ?? props.defaultProfile);

const formatDate = (date: string) => {
  const [month, , day, , year] = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).formatToParts(new Date(date));

  return `${day.value} ${month.value} ${year.value}`;
};
</script>

<template>
  <section
    v-if="activeProfile"
    class="mt-[16px] grid grid-cols-[max-content_1fr] rounded-[15px] bg-almost-white px-[24px] pb-[48px] pt-[32px] shadow-[0_16px_30px_-10px_rgba(70,96,187,0.2)] dark:bg-yankees-blue dark:shadow-none tablet:mt-[24px] tablet:px-[40px] tablet:pb-[42px] tablet:pt-[40px] desktop:grid-rows-[repeat(4,min-content)] desktop:gap-x-[37px] desktop:px-[48px] desktop:pb-[50px] desktop:pt-[48px]"
  >
    <img
      class="row-span-full h-[70px] w-[70px] overflow-hidden rounded-full tablet:h-[117px] tablet:w-[117px]"
      :src="activeProfile.avatar_url"
      alt=""
    />
    <div
      class="ml-[19px] leading-normal tablet:ml-[41px] desktop:ml-0 desktop:grid desktop:grid-flow-col desktop:grid-rows-[auto_min-content] desktop:justify-between"
    >
      <h1
        class="text-[16px] font-bold text-gunmetal dark:text-white tablet:mb-[3px] tablet:mt-[11px] tablet:text-[26px] desktop:-mt-[4px] desktop:mb-[2px]"
      >
        {{ activeProfile.name ?? activeProfile.login }}
      </h1>
      <a class="text-azure tablet:text-[16px]" :href="activeProfile.html_url">
        @{{ activeProfile.login }}
      </a>
      <p
        class="mt-[6px] whitespace-nowrap text-gray dark:text-white tablet:mt-[4px]"
      >
        Joined
        {{ formatDate(activeProfile.created_at) }}
      </p>
    </div>
    <p
      class="mt-[33px] leading-[25px] max-desktop:col-span-2 tablet:mt-[24px] desktop:mt-[20px]"
      :class="{ 'opacity-75': !activeProfile.bio }"
    >
      {{ activeProfile.bio ?? "This profile has no bio" }}
    </p>
    <ul
      class="mt-[23px] grid grid-cols-3 rounded-[10px] bg-ghost-white pb-[19px] pl-[13px] pr-[17px] pt-[18px] leading-normal dark:bg-dark-gunmetal max-desktop:col-span-2 tablet:mt-[32px] tablet:pb-[18px] tablet:pl-[32px] tablet:pt-[15px]"
    >
      <li class="text-center tablet:text-start">
        <h2 class="text-[11px] tablet:text-[13px]">Repos</h2>
        <p
          class="mt-[7px] text-[16px] font-bold text-gunmetal dark:text-white tablet:-mt-[1px] tablet:text-[22px]"
        >
          {{ activeProfile.public_repos }}
        </p>
      </li>
      <li class="text-center tablet:text-start">
        <h2 class="text-[11px] tablet:text-[13px]">Followers</h2>
        <p
          class="mt-[7px] text-[16px] font-bold text-gunmetal dark:text-white tablet:-mt-[1px] tablet:text-[22px]"
        >
          {{ activeProfile.followers }}
        </p>
      </li>
      <li class="text-center tablet:text-start">
        <h2 class="text-[11px] tablet:text-[13px]">Following</h2>
        <p
          class="mt-[7px] text-[16px] font-bold text-gunmetal dark:text-white tablet:-mt-[1px] tablet:text-[22px]"
        >
          {{ activeProfile.following }}
        </p>
      </li>
    </ul>
    <ul
      class="mt-[24px] grid gap-y-[16px] leading-normal max-desktop:col-span-2 tablet:mt-[30px] tablet:grid-flow-col tablet:grid-rows-2 desktop:mt-[37px]"
    >
      <li
        class="flex items-end gap-[13px]"
        :class="{ 'opacity-50': !activeProfile.location }"
      >
        <LocationIcon
          class="h-[20px] w-[20px] fill-current"
          aria-hidden="true"
        />
        <span class="select-none">
          {{ activeProfile.location ?? "Not Available" }}
        </span>
      </li>
      <li
        class="flex items-end gap-[13px]"
        :class="{ 'opacity-50': !activeProfile.blog }"
      >
        <WebsiteIcon class="fill-current" aria-hidden="true" />
        <a
          v-if="activeProfile.blog"
          class="hover:underline"
          :href="activeProfile.blog"
        >
          {{ activeProfile.blog }}
        </a>
        <span class="select-none" v-else>Not Available</span>
      </li>
      <li
        class="flex items-end gap-[13px] tablet:gap-[16px]"
        :class="{ 'opacity-50': !activeProfile.twitter_username }"
      >
        <TwitterIcon class="fill-current" aria-hidden="true" />
        <a
          v-if="activeProfile.twitter_username"
          class="hover:underline"
          :href="`https://twitter.com/${activeProfile.twitter_username}`"
        >
          {{ activeProfile.twitter_username }}
        </a>
        <span class="select-none" v-else>Not Available</span>
      </li>
      <li
        class="flex items-end gap-[13px] tablet:gap-[16px]"
        :class="{ 'opacity-50': !activeProfile.company }"
      >
        <CompanyIcon class="fill-current" aria-hidden="true" />
        <a
          v-if="activeProfile.company"
          class="hover:underline"
          :href="`https://github.com/${activeProfile.company.slice(1)}`"
        >
          {{ activeProfile.company }}
        </a>
        <span class="select-none" v-else>Not Available</span>
      </li>
    </ul>
  </section>
</template>
