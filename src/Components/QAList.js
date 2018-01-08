import React, { Component } from 'react';

class QAList extends Component {

    listBuilder = () => {
        return this.props.list.map(item => {
            const content = [
                <h4>{ item.title }</h4>,
                <div className="meta">
                    <span className="category">{ item.category }</span>
                    <span className="tag">{ item.tag }</span>
                </div>,
                !item.link && <button>PR</button>
            ];
            return (
                <li key={ item.title }>{
                    item.link ? 
                        <a href={ item.link }>{ content }</a> : 
                        content
                }</li>
            );
        });
    }

    render() {
        const pages = Array.from({length: this.props.page}, (_, index) => (
            <li key={ index } onClick={this.props.setPage.bind(null, index)}>{ index + 1 }</li>
        ));
        return [
            <nav className="qa-list">
                <h3>{ this.props.title }</h3>
                <ul>
                    { this.listBuilder() }
                </ul>
            </nav>,
            <ul className="pagination">
                { pages }
            </ul>
        ];
    }
  }
  
  export default QAList;