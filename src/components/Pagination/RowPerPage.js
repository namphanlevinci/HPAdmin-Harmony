import React, { Component } from 'react'
import "./style.scss";

export default class RowPerPage extends Component {
    render() {
        const { page, pageCount } = this.props;
        return (
            <div className="container_pagination_row">
                <span>Page</span>
                <div className="container_pagination_input">
                    {page}
                </div>
                <span>of {pageCount}</span>
            </div>
        )
    }
}
