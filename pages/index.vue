<script>
import Chip from "~/components/chip.vue";
import moment from "moment";

export default {
  components: {
    Chip,
  },
  data() {
    return {
      response: null,
      filteredResponse: null,
      filters: {
        typologie: [],
        localisation: [],
        caserne: [],
      },
      selectedFilters: {
        typologie: [],
        localisation: [],
        caserne: [],
      },
    };
  },
  computed: {
    typologieOptions() {
      const options = new Set();
      if (this.response) {
        this.response.forEach((item) => options.add(item.INCIDENT_TYPE_DESC));
      }
      return Array.from(options);
    },
    localisationOptions() {
      const options = new Set();
      if (this.response) {
        this.response.forEach((item) => options.add(item.NOM_ARROND));
      }
      return Array.from(options);
    },
    caserneOptions() {
      const options = new Set();
      if (this.response) {
        this.response.forEach((item) => options.add(item.DIVISION));
      }
      return Array.from(options);
    },
  },
  methods: {
    async requestLastCalls() {
      try {
        const response = await $fetch("/api/sim", {
          method: "get",
        });
        this.response = response;
        this.filteredResponse = response; // Initially, all data is shown
      } catch (error) {
        console.error(error);
      }
    },

    formatDate(dateTime) {
      return moment(dateTime).format("DD/MM/YY");
    },
    formatTime(dateTime) {
      return moment(dateTime).format("HH:mm");
    },

    applyFilters() {
      this.filteredResponse = this.response.filter((item) => {
        return (
          (this.selectedFilters.typologie.length === 0 ||
            this.selectedFilters.typologie.includes(item.INCIDENT_TYPE_DESC)) &&
          (this.selectedFilters.localisation.length === 0 ||
            this.selectedFilters.localisation.includes(item.NOM_ARROND)) &&
          (this.selectedFilters.caserne.length === 0 ||
            this.selectedFilters.caserne.includes(item.DIVISION))
        );
      });
    },

    toggleFilter(filterType, value) {
      const filterArray = this.selectedFilters[filterType];
      const index = filterArray.indexOf(value);
      if (index > -1) {
        filterArray.splice(index, 1);
      } else {
        filterArray.push(value);
      }
      this.applyFilters();
    },
  },
  mounted() {
    this.requestLastCalls();
  },
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold pb-6 text-red-500">
      Service sécurité incendie de Montréal (SIM)
    </h1>
    <div
      class="rounded-xl flex flex-row items-center bg-white mb-6 p-1 dark:bg-[#1e1e1e]"
    >
      <UPopover>
        <UButton
          icon="i-heroicons-document-magnifying-glass-20-solid"
          size="lg"
          label="Typologie"
          color="yellow"
          variant="ghost"
        />
        <template #panel>
          <div class="p-4">
            <div v-for="option in typologieOptions" :key="option">
              <label>
                <input
                  type="checkbox"
                  :value="option"
                  v-model="selectedFilters.typologie"
                  @change="applyFilters"
                />
                {{ option }}
              </label>
            </div>
          </div>
        </template>
      </UPopover>
      <UPopover>
        <UButton
          icon="i-heroicons-map-pin-16-solid"
          size="lg"
          label="Localisation"
          color="green"
          variant="ghost"
        />
        <template #panel>
          <div class="p-4">
            <div v-for="option in localisationOptions" :key="option">
              <label>
                <input
                  type="checkbox"
                  :value="option"
                  v-model="selectedFilters.localisation"
                  @change="applyFilters"
                />
                {{ option }}
              </label>
            </div>
          </div>
        </template>
      </UPopover>
      <UPopover>
        <UButton
          icon="i-heroicons-building-office-20-solid"
          size="lg"
          label="Caserne"
          color="red"
          variant="ghost"
        />
        <template #panel>
          <div class="p-4">
            <div v-for="option in caserneOptions" :key="option">
              <label>
                <input
                  type="checkbox"
                  :value="option"
                  v-model="selectedFilters.caserne"
                  @change="applyFilters"
                />
                Caserne {{ option }}
              </label>
            </div>
          </div>
        </template>
      </UPopover>
    </div>
    <div
      v-if="filteredResponse && filteredResponse.length"
      class="rounded-xl overflow-scroll h-[75vh] border-2 dark:border-[#1e1e1e]"
    >
      <div
        class="flex flex-row items-center w-full gap-4 p-2 bg-white dark:bg-[#1e1e1e]"
      >
        <UIcon
          name="i-heroicons-phone-arrow-down-left-16-solid"
          class="w-5 h-5"
          color="grey"
        />
        <p class="font-medium text-xl line-h-0 dark:text-white">
          Dernières interventions
        </p>
      </div>
      <div
        v-for="(item, index) in filteredResponse"
        :key="index"
        class="flex flex-row p-2 gap-4"
        :class="{
          'bg-gray-100 dark:bg-[#101010]': index % 2 === 0,
          'bg-white dark:bg-[#111111]': index % 2 !== 0,
        }"
      >
        <div class="flex flex-col items-center">
          <p class="font-bold text-xl dark:text-white">
            {{ formatTime(item.CREATION_DATE_TIME) }}
          </p>
          <p class="dark:text-white">
            {{ formatDate(item.CREATION_DATE_TIME) }}
          </p>
        </div>
        <div class="flex flex-col">
          <div class="flex flex-row items-center gap-4">
            <p class="font-bold text-lg text-[#201c4f] dark:text-[#ef4444]">
              {{ item.INCIDENT_TYPE_DESC }}
            </p>
            <Chip :label="`#${item.INCIDENT_NBR}`" />
            <Chip :label="`Caserne #${item.DIVISION}`" color="red" />
            <Chip
              :label="`${item.NOMBRE_UNITES} unité${
                item.NOMBRE_UNITES > 1 ? 's' : ''
              }`"
              color="orange"
            />
          </div>
          <a
            class="w-fit dark:text-white"
            :href="`https://www.google.com/maps?q=${item.LATITUDE},${item.LONGITUDE}`"
            target="_blank"
            >{{ item.NOM_VILLE
            }}{{
              item.NOM_ARROND != "Indéterminé" ? ", " + item.NOM_ARROND : ""
            }}</a
          >
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>
