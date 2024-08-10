import e from "cors";

export default defineEventHandler(async (event) => {
  function isInBoundingBox(
    lat: number,
    lon: number,
    box: { latMin: number; latMax: number; lonMin: number; lonMax: number }
  ): boolean {
    return (
      lat >= box.latMin &&
      lat <= box.latMax &&
      lon >= box.lonMin &&
      lon <= box.lonMax
    );
  }

  function getCauseDescription(value: number): string {
    return damageCause.includes(value)
      ? "Dégât matériel"
      : weatherCause.includes(value)
      ? "Dégât dû à la météo"
      : incidentCause.includes(value)
      ? "Incident/Accident"
      : vegetationCause.includes(value)
      ? "Dégât dû à la végétation"
      : animalCause.includes(value)
      ? "Dégât causé par un animal"
      : "Autre";
  }

  const boundingBox = {
    latMin: 45.4,
    latMax: 45.6,
    lonMin: -73.7,
    lonMax: -73.4,
  };

  const damageCause = [11, 12, 13, 14, 15, 58, 70, 72, 73, 74, 79];
  const weatherCause = [21, 22, 24, 25, 26];
  const incidentCause = [31, 32, 33, 34, 41, 42, 43, 44, 54, 55, 56, 57];
  const vegetationCause = [51];
  const animalCause = [52, 53];

  async function requestLastShiftsCalls() {
    const timestampUrl = `http://pannes.hydroquebec.com/pannes/donnees/v3_0/bisversion.json`;
    const version = await (await fetch(timestampUrl)).json();
    const url = `http://pannes.hydroquebec.com/pannes/donnees/v3_0/bismarkers${version}.json`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = (await response.json()).pannes.slice(0, 100);

    const filteredAndTransformedData = data
      .filter((entry: any) => {
        const coordinates = JSON.parse(entry[4]) as [number, number];
        return (
          isInBoundingBox(coordinates[1], coordinates[0], boundingBox) &&
          entry[6] !== "4"
        );
      })
      .map((call: any) => {
        return {
          ...call,
          [7]: getCauseDescription(Number(call[7])),
        };
      })
      .sort(
        (a: any, b: any) => new Date(b[1]).getTime() - new Date(a[1]).getTime()
      );

    return filteredAndTransformedData;
  }

  return await requestLastShiftsCalls();
});
