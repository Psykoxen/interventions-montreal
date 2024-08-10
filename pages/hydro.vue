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
        cause: [],
      },
      selectedFilters: {
        cause: [],
      },
    };
  },
  computed: {
    causeOptions() {
      const options = new Set();
      if (this.response) {
        this.response.forEach((item) => options.add(item[7]));
      }
      return Array.from(options).sort();
    },
  },
  methods: {
    async requestLastCalls() {
      try {
        const response = await $fetch("/api/hydro", {
          method: "get",
        });
        console.log(response);
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
    formatDateTime(date1, date2) {
      if (this.formatDate(date1) === this.formatDate(date2)) {
        return moment(date2).format("à HH:mm");
      }
      return "le " + moment(date2).format(" DD/MM à HH:mm");
    },

    applyFilters() {
      this.filteredResponse = this.response.filter((item) => {
        return (
          this.selectedFilters.cause.length === 0 ||
          this.selectedFilters.cause.includes(item[7])
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
    <h1 class="text-2xl font-semibold pb-6 text-yellow-500">Hydro-Québec</h1>
    <div
      class="rounded-xl flex flex-row items-center bg-white mb-6 p-1 dark:bg-[#1e1e1e]"
    >
      <UPopover>
        <UButton
          icon="i-heroicons-document-magnifying-glass-20-solid"
          size="lg"
          label="Cause"
          color="green"
          variant="ghost"
        />
        <template #panel>
          <div class="p-4">
            <div v-for="option in causeOptions" :key="option">
              <label>
                <input
                  type="checkbox"
                  :value="option"
                  v-model="selectedFilters.cause"
                  @change="applyFilters"
                />
                {{ option }}
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
          Dernières pannes
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
            {{ formatTime(item[1]) }}
          </p>
          <p class="dark:text-white">
            {{ formatDate(item[1]) }}
          </p>
        </div>
        <div class="flex flex-col">
          <div class="flex flex-row items-center gap-4">
            <p class="font-bold text-lg text-[#201c4f] dark:text-[#eab308]">
              Panne
              {{
                item[2]
                  ? `en cours (fin estimée ${formatDateTime(item[1], item[2])})`
                  : "terminée"
              }}
            </p>
            <Chip
              v-if="item[5] !== 'N'"
              :label="`${
                item[5] === 'A'
                  ? 'Travaux assignés'
                  : item[5] === 'L'
                  ? 'Equipe au travail'
                  : 'Equipe en route'
              }`"
            />
            <Chip
              :label="`${
                item[0] > 1
                  ? item[0] + ' foyers touchés'
                  : item[0] + ' foyer touché'
              }`"
              color="red"
            />
            <Chip :label="`${item[7]}`" color="green" />
          </div>
          <a
            class="w-fit dark:text-white"
            :href="`https://www.google.com/maps?q=${JSON.parse(item[4])[1]},${
              JSON.parse(item[4])[0]
            }`"
            target="_blank"
            >{{ JSON.parse(item[4])[1] }}, {{ JSON.parse(item[4])[0] }}</a
          >
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>
