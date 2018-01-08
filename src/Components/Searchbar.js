import React, { Component } from 'react';

let timer = null;
let compositionStarted = false;

class Searchbar extends Component {

    componentDidMount () {
        this.inputBar.addEventListener('compositionstart', () => {
            this.compositionToggle(true);
        });
        this.inputBar.addEventListener('compositionend', (e) => {
            this.compositionToggle(false);
            this.onSearchInput(e);
        });
    }

    onSearchInput = (e) => {
        if (compositionStarted) {
            return;
        }
        if (timer) {
            clearTimeout(timer);
        }
        const value = e.target.value;
        timer = setTimeout(() => {
            this.props.setFilter(value);
            timer = null;
        }, 200);
    }

    compositionToggle (state) {
        console.log('compositionToggle', state);
        compositionStarted = !!state;
    }

    render() {
      return (
        <section className="search-bar">
          <input 
            type="text" 
            placeholder="Search something..." 
            onInput={ this.onSearchInput }
            ref={ (el) => this.inputBar = el }
          />
        </section>
      );
    }
  }
  
  export default Searchbar;