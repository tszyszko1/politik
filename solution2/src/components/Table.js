import React, { Component } from "react";
import { columns } from "../constants";
class Table extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <table id="table_councillors">
        <tr>
          {columns.map(col => {
            return (
              <th
                onClick={() =>
                  this.props.setSort(
                    col,
                    this.props.sort.direction === "asc" ? "desc" : "asc"
                  )
                }
              >
                {col}
              </th>
            );
          })}
        </tr>
        {this.props.data.map(item => {
          return (
            <tr>
              <td>{item.id}</td>
              <td>{new Date(item.updated).toLocaleDateString()}</td>
              <td>{item.active}</td>
              <td>{item.code}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
            </tr>
          );
        })}
      </table>
    );
  }
}

export default Table;
