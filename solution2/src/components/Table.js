import React, { Component } from "react";
import constants from "../constants";
class Table extends Component {
  render() {
    return (
      <table id="table_councillors">
        <tbody>
          <tr>
            {constants.councillors.columns.map(col => {
              return (
                <th
                  key={col}
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
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{new Date(item.updated).toLocaleDateString()}</td>
                <td>{item.active}</td>
                <td>{item.code}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Table;
