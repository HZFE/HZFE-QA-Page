import React, { Component } from 'react';
import './style/index.scss';
import Header from './Components/Header';
import Searchbar from './Components/Searchbar';
import QAList from './Components/QAList';

class App extends Component {
  constructor () {
    super();
    this.state = {
      filter: "",
      list: [
        {
          title: "aaa",
          link: "https://www.baidu.com",
          category: "HTML",
          tag: '2017 - hzfe questions and answers'
        },
        {
          title: "BBB",
          link: "https://www.baidu.com",
          category: "CSS",
          tag: '2017 - hzfe questions and answers'
        },
        {
          title: "CCC",
          category: "Types",
          tag: '2017 - Alloyteam Conf'
        }
      ]
    }
  }

  setFilter = (value) => {
    this.setState({
      filter: value
    });
  }

  listFiltered = () => {
    return this.state.list;
  }

  render() {
    return (
      <main className="hzfe">
        <Header></Header>
        <Searchbar setFilter={ this.setFilter }></Searchbar>
        <QAList list={ this.listFiltered() }></QAList>
      </main>
    );
  }
}

export default App;
