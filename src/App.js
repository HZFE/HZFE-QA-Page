// @flow
import React, { Component } from 'react';
import './style/index.scss';
import Header from './Components/Header';
import Searchbar from './Components/Searchbar';
import QAList from './Components/QAList';
import axios from 'axios';
import config from './config';

type Props = any;
type List = {
  title: string;
  category: string;
  tag: string;
}[];
type State = {
  filter: string,
  list: List
}


const listTemplate = {
  title: "",
  link: "",
  category: "",
  tag: ""
};
const HTTP = axios.create({
  timeout: 10000
});

class App extends Component<Props, State> {
  constructor () {
    super();
    this.state = {
      filter: "",
      list: [],
      pagination: {
        total: 0,
        perPage: 20,
        current: 0
      }
    }
  }

  componentDidMount() {
    HTTP.get(config.repo)
      .then(res => {
        // 中文乱码，解决方法来自 http://blog.sqrtthree.com/2015/08/29/utf8-to-b64/
        const content = JSON.parse(decodeURIComponent(escape(atob(res.data.content))));
        this.setState((prevState, props) => {
          return {
            list: content,
            pagination: {
              ...prevState.pagination,
              total: content.length
            }
          }
        });
      });
  }

  setFilter = (value: string) => {
    this.setState({
      filter: value
    });
  }

  listFiltered = (): List => {
    const filter = this.state.filter.toLowerCase();
    return this.state.list.filter(item => {
      return Boolean(
        item.title.toLowerCase().indexOf(filter) >= 0 ||
        item.category.toLowerCase().indexOf(filter) >= 0 ||
        item.tag.toLowerCase().indexOf(filter) >= 0
      );
    })
  }

  listPaged = (): List => {
    const page = this.state.pagination;
    const listFiltered = this.listFiltered();
    const startIndex = page.current * page.perPage;
    return listFiltered.slice(startIndex, startIndex + page.perPage);
  }

  setPage = (page: number) => {
    page = +page;
    this.setState((prevState, props) => {
      return {
        pagination: {
          ...prevState.pagination,
          current: page
        }
      }
    })
  }

  render() {
    const pageNum = Math.ceil(this.listFiltered().length / this.state.pagination.perPage);
    return (
      <main className="hzfe">
        <Header></Header>
        <Searchbar setFilter={ this.setFilter }></Searchbar>
        <QAList list={ this.listPaged() } page={ pageNum } setPage={ this.setPage }></QAList>
      </main>
    );
  }
}

export default App;
