import React, { Component } from 'react';

let timer = null;

class Searchbar extends Component {

    onSearchChange = (e) => {
        if (timer) {
            clearTimeout(timer);
        }
        const value = e.target.value;
        timer = setTimeout(() => {
            this.props.setFilter(value);
        }, 200);
    }

    render() {
      return (
        <section className="search-bar">
          <input type="text" placeholder="Search something..." onChange={this.onSearchChange}/>
        </section>
      );
    }
  }
  
  export default Searchbar;