export default {
  affairs: { columns: ["id", "updated", "shortId"], filters: ["updated"] },
  councillors: {
    columns: ["id", "updated", "active", "code", "firstName", "lastName"],
    filters: ["id", "name"]
  },
  councils: {
    columns: ["id", "updated", "abbreviation", "name", "type"],
    filters: ["updated"]
  }
};
