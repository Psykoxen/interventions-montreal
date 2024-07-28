<script>
import Chip from "~/components/chip.vue";

export default {
  components: {
    Chip,
  },
  data() {
    return {
      response: null,
    };
  },
  methods: {
    async requestLastCalls() {
      try {
        const response = await $fetch("/api/sim", {
          method: "get",
        });
        this.response = response;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.requestLastCalls();
  },
};
</script>

<template>
  <div>
    <div
      v-if="response && response.length"
      class="border-2 border-[#c2c8d3] rounded-xl overflow-hidden"
    >
      <div
        v-for="(item, index) in response"
        :key="index"
        class="flex flex-row p-2 gap-4"
        :class="{ 'bg-gray-100': index % 2 === 0, 'bg-white': index % 2 !== 0 }"
      >
        <div class="flex flex-col items-center">
          <p class="font-bold text-xl">
            {{
              item.CREATION_DATE_TIME.slice(
                item.CREATION_DATE_TIME.length - 8,
                item.CREATION_DATE_TIME.length - 3
              )
            }}
          </p>
          <p>{{ item.CREATION_DATE_TIME.slice(0, 10) }}</p>
        </div>
        <div class="flex flex-col">
          <div class="flex flex-row items-center gap-4">
            <p class="font-bold text-lg">{{ item.INCIDENT_TYPE_DESC }}</p>
            <Chip :label="`#${item.INCIDENT_NBR}`" />
            <Chip :label="`Caserne #${item.DIVISION}`" color="red" />
            <Chip
              :label="`${item.NOMBRE_UNITES} unité${
                item.NOMBRE_UNITES > 1 ? 's' : ''
              }`"
              color="red"
            />
          </div>
          <a
            :href="`https://www.google.com/maps?q=${item.LATITUDE},${item.LONGITUDE}`"
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
