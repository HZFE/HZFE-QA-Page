import React, { Component } from 'react';
import { classNames } from '../utils';

class QAList extends Component {

    listBuilder = () => {
        if (!this.props.list.length) {
            return <li className="no-content">啊咧没搜到</li>
        }
        return this.props.list.map(item => {
            const content = [
                <h3 title={ item.title }>{ 
                    item.link ? 
                        <a href={ item.link }>{ item.title }</a> : 
                        item.title 
                }</h3>,
                <div className="meta">
                    <span className="category">{ item.category }</span>
                    <span className="tag">{ item.tag }</span>
                </div>,
                !item.link && <button>PR</button>
            ];
            const clsNames = {
                "qa-item": true,
                "qa-item-type-html": false,
                "qa-item-type-css": false,
                "qa-item-type-js": false,
                "qa-item-type-default": false,
                "qa-item-type-algorithm": false
            }
            return (
                <li key={ item.title } className={ classNames(clsNames) }>
                    <div className="cover">{ content }</div>
                </li>
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