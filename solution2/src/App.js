import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import { getData } from "./scripts/api";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filter: {
        attribute: "",
        term: ""
      },
      sort: {
        by: null,
        direction: null
      }
    };
  }

  componentDidMount() {
    getData().then(data => this.setState({ data }));
  }
  setSort = (by, direction) => this.setState({ sort: { by, direction } });
  setFilter = (attribute, term) =>
    this.setState({ filter: { attribute, term } });
  filterData = data => {
    if (!this.state.filter.attribute || !this.state.filter.term) {
      return data;
    }
    const filteredData = this.state.data.filter(v => {
      const term =
        this.state.filter.attribute === "name"
          ? `${v.firstName} ${v.lastName}`
          : v[this.state.filter.attribute].toString();
      return term.includes(this.state.filter.term);
    });
    return filteredData;
  };
  render() {
    const filteredData = this.filterData(this.state.data);
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
        <Navbar setFilter={this.setFilter} filter={this.state.filter} />
        <Table
          data={sortedData}
          setSort={this.setSort}
          sort={this.state.sort}
        />
      </div>
    );
  }
}

export default App;
