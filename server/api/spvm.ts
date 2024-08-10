import e from "cors";

export default defineEventHandler(async (event) => {
  async function requestLastShiftsCalls() {
    let url = `https://donnees.montreal.ca/api/3/action/datastore_search?resource_id=c6f482bf-bf0f-4960-8b2f-9982c211addd&sort=DATE desc, QUART desc&limit=100`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.result.records;
  }

  return await requestLastShiftsCalls();
});
