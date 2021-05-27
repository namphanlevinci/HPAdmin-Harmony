import React, { Component } from 'react';
import Button from "./Button";
import PopupRows from "./PopupRows";
import RowPerPage from "./RowPerPage";
import arrow from "@/assets/images/pagination/next.png"
import "./style.scss";

export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPopupRows: false,
            rowSelected: 5,
            page: 1,
        }
    }

    openPopupRows = () => {
        this.setState({ isPopupRows: true });
    }

    closePopupRows = () => {
        this.setState({ isPopupRows: false })
    }

    selectRows = async (row) => {
        await this.setState({ rowSelected: row, page: 1 });
        await this.props.fetchApi();
        await this.closePopupRows();
    }

    changePage = (page) => {
        this.setState({ page })
    }

    changeRow = (row) => {
        this.setState({ rowSelected: row });
    }

    nextPage = async () => {
        const { page } = await this.state;
        await this.setState({ page: page + 1 });
        await this.props.fetchApi();
    }

    previousPage = async () => {
        const { page } = await this.state;
        await this.setState({ page: page - 1 });
        await this.props.fetchApi();
    }

    render() {
        const { isPopupRows, rowSelected, page } = this.state;
        const { pageCount, loading = false } = this.props;
        return (
            <div className="container_pagination">
                <Button
                    isDisabled={page == 1 || loading}
                    onClick={this.previousPage}
                >
                    Previous
                </Button>

                <div className="container_pagination_row row_per_page_pagination">
                    <RowPerPage page={page} pageCount={pageCount} />
                    <div
                        onClick={this.openPopupRows}
                        className="container_pagination_input container_pagination_input_row"
                    >
                        {`${rowSelected} rows`}
                        <img src={arrow} className="container_pagination_arrow" />
                        {
                            isPopupRows &&
                            <PopupRows
                                selectRows={this.selectRows}
                                closePopupRows={this.closePopupRows}
                            />
                        }
                    </div>
                </div>

                <Button
                    isDisabled={parseInt(page) >= parseInt(pageCount) || loading}
                    onClick={this.nextPage}
                >
                    Next
                </Button>

            </div>
        )
    }
}
