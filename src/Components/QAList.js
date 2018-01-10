import React, { Component, Fragment } from 'react';
import { classNames } from '../utils';

function QaItem (props) {
    return (
        <div className="cover">
            {!props.item.link && <button>PR</button>}
            <h3 title={ props.item.title }>{ 
                props.item.link ? 
                    <a href={ props.item.link }>{ props.item.title }</a> : 
                    props.item.title 
            }</h3>
            <div className="meta">
                <span className="category">{ props.item.category }</span>
                <span className="tag">{ props.item.tag }</span>
            </div>
        </div>
    );
}

class QAList extends Component {

    listBuilder = () => {
        if (!this.props.list.length) {
            return <li className="no-content">啊咧没搜到</li>
        }
        return this.props.list.map(item => {
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
                    <QaItem item={ item }></QaItem>
                </li>
            );
        });
    }

    render() {
        const pages = Array.from({length: this.props.page}, (_, index) => (
            <li key={ index } onClick={this.props.setPage.bind(null, index)}>{ index + 1 }</li>
        ));
        return (
            <Fragment>
                <nav className="qa-list">
                    <h3>{ this.props.title }</h3>
                    <ul>
                        { this.listBuilder() }
                    </ul>
                </nav>,
                <ul className="pagination">
                    { pages }
                </ul>
            </Fragment>
        )
    }
  }

  export default QAList;