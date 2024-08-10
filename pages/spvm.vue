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
        pdq: [],
      },
      selectedFilters: {
        typologie: [],
        pdq: [],
      },
    };
  },
  computed: {
    typologieOptions() {
      const options = new Set();
      if (this.response) {
        this.response.forEach((item) => options.add(item.CATEGORIE));
      }
      return Array.from(options).sort();
    },
    pdqOptions() {
      const options = new Set();
      if (this.response) {
        this.response.forEach((item) => options.add(item.PDQ));
      }
      return Array.from(options)
        .map(Number)
        .sort((a, b) => a - b)
        .map(String);
    },
  },
  methods: {
    async requestLastCalls() {
      try {
        const response = await $fetch("/api/spvm", {
          method: "get",
        });
        this.response = response;
        console.log(response);
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
            this.selectedFilters.typologie.includes(item.CATEGORIE)) &&
          (this.selectedFilters.pdq.length === 0 ||
            this.selectedFilters.pdq.includes(item.PDQ))
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
    <h1 class="text-2xl font-semibold pb-6 text-indigo-500">
      Service de police de la Ville de Montréal (SPVM)
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
          icon="i-heroicons-building-office-20-solid"
          size="lg"
          label="Poste de Quartier"
          color="indigo"
          variant="ghost"
        />
        <template #panel>
          <div class="p-4">
            <div v-for="option in pdqOptions" :key="option">
              <label>
                <input
                  type="checkbox"
                  :value="option"
                  v-model="selectedFilters.pdq"
                  @change="applyFilters"
                />
                Poste de Quartier {{ option }}
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
            {{ item.QUART[0].toUpperCase() + item.QUART.slice(1) }}
          </p>
          <p class="dark:text-white">
            {{ formatDate(item.DATE) }}
          </p>
        </div>
        <div class="flex flex-col">
          <div class="flex flex-row items-center gap-4">
            <p class="font-bold text-lg text-[#201c4f] dark:text-[#4455ef]">
              {{ item.CATEGORIE }}
            </p>
            <Chip :label="`#${item._id}`" />
            <Chip :label="`Poste de Quartier #${item.PDQ}`" color="blue" />
          </div>
          <a
            v-if="item.LATITUDE && item.LONGITUDE"
            class="w-fit dark:text-white"
            :href="`https://www.google.com/maps?q=${item.LATITUDE},${item.LONGITUDE}`"
            target="_blank"
          >
            {{ item.LATITUDE }}, {{ item.LONGITUDE }}
          </a>
          <p
            v-if="!item.LATITUDE && !item.LONGITUDE"
            class="w-fit dark:text-white"
          >
            Non communiqué
          </p>
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>
