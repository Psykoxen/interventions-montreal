import e from "cors";

export default defineEventHandler(async (event) => {
  async function requestLastShiftsCalls() {
    let url = `https://donnees.montreal.ca/api/3/action/datastore_search?resource_id=71e86320-e35c-4b4c-878a-e52124294355&sort=CREATION_DATE_TIME desc&limit=500`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.result.records;
  }

  return await requestLastShiftsCalls();
});
