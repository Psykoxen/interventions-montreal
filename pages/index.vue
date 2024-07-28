<script>
const toast = useToast();
export default {
  data() {
    return {
      response: null,
      flooding: 0,
      groundMovements: 0,
      earthquakes: 0,
      avalanches: 0,
      volcanicEruptions: 0,
      forestFires: 0,
      weatherTroubles: 0,
      radon: 0,
      industrialRisks: 0,
      nuclearRisks: 0,
      damBreaks: 0,
      dangerTransport: 0,
      warEngines: 0,
      miningRisks: 0,
      isOpen: false,
    };
  },
  methods: {
    detectEnterKey(event) {
      if (event.key === "Enter") {
        this.requestDanger();
      }
    },
    async requestDanger() {
      if (document.getElementById("adress").value === "") {
        toast.add({
          title: "Recherche Invalide",
          description: "Veuillez entrer une adresse valide",
          icon: "i-heroicons-x-circle",
          color: "red",
        });
        return;
      } else {
        this.setDefaultValue();
        try {
          const response = await $fetch("/api/risk", {
            method: "post",
            body: { adress: document.getElementById("adress").value },
          });
          this.$data.response = response;
          for (let i = 0; i < response.risques.length; i++) {
            switch (parseInt(response.risques[i].num_risque)) {
              case 140:
              case 180:
              case 183:
              case 130:
              case 286:
                this.$data.flooding++;
                break;
              case 134:
              case 135:
              case 143:
              case 147:
              case 153:
              case 157:
                this.$data.groundMovements++;
                break;
              case 158:
                this.$data.earthquakes++;
                break;
              case 159:
                this.$data.avalanches++;
                break;
              case 160:
                this.$data.volcanicEruptions++;
                break;
              case 166:
                this.$data.forestFires++;
                break;
              case 167:
              case 168:
              case 169:
              case 175:
              case 176:
              case 177:
                this.$data.weatherTroubles++;
                break;
              case 229:
                this.$data.radon++;
                break;
              case 215:
              case 236:
              case 237:
              case 238:
                this.$data.industrialRisks++;
                break;
              case 230:
                this.$data.nuclearRisks++;
                break;
              case 213:
                this.$data.damBreaks++;
                break;
              case 226:
                this.$data.dangerTransport++;
                break;
              case 231:
                this.$data.warEngines++;
                break;
              case 256:
              case 254:
              case 293:
              case 288:
              case 259:
                this.$data.miningRisks++;
                break;
            }
          }
        } catch (error) {
          this.setDefaultValue();
          toast.add({
            title: "Erreur",
            description: "Oups, une erreur est survenue",
            icon: "i-heroicons-question-mark-circle",
            color: "amber",
          });
        }
      }
    },
    setDefaultValue() {
      this.$data.response = null;
      this.$data.flooding = 0;
      this.$data.groundMovements = 0;
      this.$data.earthquakes = 0;
      this.$data.avalanches = 0;
      this.$data.volcanicEruptions = 0;
      this.$data.forestFires = 0;
      this.$data.weatherTroubles = 0;
      this.$data.radon = 0;
      this.$data.industrialRisks = 0;
      this.$data.nuclearRisks = 0;
      this.$data.damBreaks = 0;
      this.$data.dangerTransport = 0;
      this.$data.warEngines = 0;
      this.$data.miningRisks = 0;
    },
  },
  mounted() {
    window.addEventListener("scroll", function () {
      let value = window.scrollY;

      title.style.marginTop = value * 1.8 + "px";
      layer6.style.top = value * 1.5 + "px";
      layer5.style.top = value * 1.3 + "px";
      layer4.style.top = value * 1.0 + "px";
      layer3.style.top = value * 0.8 + "px";
      layer2.style.top = value * 0.6 + "px";
    });
  },
};
</script>

<template>
  <h1 class="text-4xl font-bold">ACCUEIL</h1>
</template>

<style></style>
