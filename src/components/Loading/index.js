import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import "./style.css";

export default class Loading extends Component {
    render() {
        return (
            <div className="loading_container">
                <ReactLoading
                    type={'spin'}
                    height={'50px'}
                    width={'50px'}
                    color="#1366AE"
                />
            </div>
        )
    }
}
