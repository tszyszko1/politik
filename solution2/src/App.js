import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import { getData } from "./scripts/api";
import constants from "./constants";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTable: "councillors",
      data: { councillors: [], affairs: [], councils: [] },
      filter: {
        attribute: "id",
        term: ""
      },
      sort: {
        by: null,
        direction: null
      }
    };
  }

  componentDidMount() {
    getData("councillors").then(councillors =>
      this.setState({ data: { councillors } })
    );
  }
  setSort = (by, direction) => this.setState({ sort: { by, direction } });
  setFilter = (attribute, term) =>
    this.setState({ filter: { attribute, term } });
  filterData = data => {
    if (!this.state.filter.attribute || !this.state.filter.term) {
      return data;
    }
    const filteredData = this.state.data[this.state.selectedTable].filter(v => {
      const term =
        this.state.filter.attribute === "name"
          ? `${v.firstName} ${v.lastName}`
          : v[this.state.filter.attribute].toString();
      return term.includes(this.state.filter.term);
    });
    return filteredData;
  };
  selectTable = selectedTable => {
    getData(selectedTable).then(data => {
      const filters = constants[selectedTable].filters;
      this.setState(prevState => ({
        data: { ...prevState.data, [selectedTable]: data },
        selectedTable,
        filter: { attribute: filters[0], term: "" }
      }));
    });
  };
  render() {
    const filteredData = this.filterData(
      this.state.data[this.state.selectedTable]
    );

    const sortedData = filteredData.sort((v1, v2) => {
      if (v1[this.state.sort.by] === v2[this.state.sort.by]) {
        return 0;
      }
      return this.state.sort.direction === "asc"
        ? v1[this.state.sort.by] > v2[this.state.sort.by]
          ? 1
          : -1
        : v2[this.state.sort.by] > v1[this.state.sort.by]
        ? 1
        : -1;
    });
    return (
      <div className="App">
        <h1 className="App-header">Solution2</h1>
        <Navbar
          setFilter={this.setFilter}
          filter={this.state.filter}
          selectedTable={this.state.selectedTable}
          selectTable={this.selectTable}
        />
        <Table
          type={this.state.selectedTable}
          data={sortedData}
          setSort={this.setSort}
          sort={this.state.sort}
        />
      </div>
    );
  }
}

export default App;
