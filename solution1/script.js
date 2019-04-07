class Service {
  constructor() {
    this.columns = [
      "id",
      "updated",
      "active",
      "code",
      "firstName",
      "lastName"
      // "salutationLetter"
      // "salutationTitle",
      // "officialDenomination"
    ];
    this.data = null;
    this.filteredData = null;
    this.sortDirection = "asc";
    this.getData();
    this.connectButtons();
  }
  getData = async (reset = false) => {
    if (this.data && !reset) {
      return this.data;
    }
    const response = await fetch("http://ws-old.parlament.ch/councillors", {
      headers: { Accept: "text/json" }
    });
    const dataJSON = await response.json();
    this.fillTable(dataJSON);
    this.data = dataJSON;

    this.filteredData = dataJSON;
    console.log("newData", dataJSON);

    return dataJSON;
  };
  sortBy = async property => {
    if (this.columns.includes(property)) {
      const data = await this.getFilteredData();
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      const sortedData = data.sort((v1, v2) =>
        this.sortDirection === "asc"
          ? v1[property] > v2[property]
            ? 1
            : -1
          : v2[property] > v1[property]
          ? 1
          : -1
      );
      this.fillTable(sortedData);
    }
  };
  getFilteredData = async () => {
    const data = await this.getData();
    const searchTerm = document.getElementById("filter_input").value;
    const searchAttribute = document
      .getElementById("filter_select")
      .value.toLowerCase();

    const filteredData = data.filter(v => {
      const term =
        searchAttribute === "name"
          ? `${v.firstName} ${v.lastName}`
          : v[searchAttribute].toString();
      return term.includes(searchTerm);
    });
    this.filteredData = filteredData;
    return filteredData;
  };
  connectButtons = () => {
    document.querySelectorAll("th").forEach(thElement => {
      thElement.onclick = e => this.sortBy(e.target.getAttribute("data-sort"));
    });
    document.getElementById("filter_submit").onclick = async () => {
      const data = await this.getFilteredData();
      this.fillTable(data);
    };
    document.getElementById("reset_button").onclick = () => this.getData(true);
  };
  fillTable = data => {
    document
      .querySelectorAll(".table_councillors__data_row")
      .forEach(el => el.remove());
    const table = document.getElementById("table_councillors");
    data.forEach(rowObject => {
      const tableRow = document.createElement("tr");
      tableRow.id = rowObject.id;
      tableRow.classList.add("table_councillors__data_row");
      this.columns.forEach(col => {
        const tmpCol = document.createElement("td");
        tmpCol.innerText =
          col === "updated"
            ? new Date(rowObject[col]).toLocaleDateString()
            : rowObject[col];
        tableRow.appendChild(tmpCol);
      });
      table.appendChild(tableRow);
    });
  };
}

new Service();
