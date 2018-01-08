import React from 'react';
import config from '../config';

export default function header () {
    return (
        <header>
            <h1>{ config.name }</h1>
        </header>
    )
}