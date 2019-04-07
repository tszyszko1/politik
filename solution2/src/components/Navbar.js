import React, { Component } from "react";

class MyNavbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="navbar">
        <button className="input">Reset</button>
        <input
          type="text"
          className="input"
          onChange={e =>
            this.props.setFilter(this.props.filter.attribute, e.target.value)
          }
        />
        <select
          className="input"
          onChange={e =>
            this.props.setFilter(e.target.value, this.props.filter.term)
          }
        >
          <option />
          <option>id</option>
          <option>name</option>
        </select>
        <button className="input">Search</button>
      </div>
    );
  }
}

export default MyNavbar;
