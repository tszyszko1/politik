import React, { Component } from "react";
import constants from "../constants";
class MyNavbar extends Component {
  render() {
    const filters = constants[this.props.selectedTable].filters;

    return (
      <div className="navbar">
        <select
          className="input"
          onChange={e => this.props.selectTable(e.target.value)}
          value={this.props.selectedTable}
        >
          {Object.keys(constants).map(type => {
            return <option key={type}>{type}</option>;
          })}
        </select>
        <input
          type="text"
          className="input"
          onChange={e =>
            this.props.setFilter(this.props.filter.attribute, e.target.value)
          }
        />
        {filters.length > 1 && (
          <select
            className="input"
            onChange={e =>
              console.log(e.target.value) ||
              this.props.setFilter(e.target.value, this.props.filter.term)
            }
            value={this.props.filter.attribute}
          >
            {filters.map(f => (
              <option key={f}>{f}</option>
            ))}
          </select>
        )}
      </div>
    );
  }
}

export default MyNavbar;
