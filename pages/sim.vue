<script>
export default {
  data() {
    return {
      response: null, // Stocke la réponse de l'API
    };
  },
  methods: {
    async requestLastCalls() {
      try {
        // Fait une requête GET à l'API
        const response = await $fetch("/api/sim", {
          method: "get",
        });
        // Stocke la réponse dans la propriété 'response'
        this.response = response;
      } catch (error) {
        console.error(error);
      }
    },
  },
  // Appelle la méthode requestLastCalls lorsque le composant est monté
  mounted() {
    this.requestLastCalls();
  },
};
</script>

<template>
  <div>
    <div v-if="response && response.length">
      <div v-for="(item, index) in response" :key="index">
        <p>{{ item.INCIDENT_NBR }}</p>
        <p>{{ item.INCIDENT_TYPE_DESC }}</p>
        <a
          :href="`https://www.google.com/maps?q=${item.LATITUDE},${item.LONGITUDE}`"
          >MAPS</a
        >
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<style>
/* Ajoutez ici vos styles personnalisés */
</style>
