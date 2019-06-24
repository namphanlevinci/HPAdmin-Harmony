import React, { Component } from "react";
import PropTypes from "prop-types";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalRecords: "",
      pageLimit: "",
      totalPages: "",
      currentPage: "",
      initialPage: "",
      pagesToShow: ""
    };
  }

  componentDidMount() {
    this.setState({
      totalRecords: this.props.totalRecords,
      pageLimit: this.props.pageLimit || 20,
      totalPages: Math.ceil(this.props.totalRecords / this.props.pageLimit),
      pagesToShow: this.props.pagesToShow || 10,
      currentPage: this.props.initialPage || 1
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      totalRecords: nextProps.totalRecords,
      pageLimit: nextProps.pageLimit || 20,
      totalPages: Math.ceil(nextProps.totalRecords / nextProps.pageLimit),
      pagesToShow: nextProps.pagesToShow || 10
    });

  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.totalRecords !== prevState.totalRecords ||
      this.state.pageLimit !== prevState.pageLimit
    ) {
      await this.setPage(this.state.currentPage);
    }
  }

  async setPage(page,status) {    
    var { totalRecords, pageLimit, totalPages } =await  this.state;
    const { PaginationFilter } = await this.props;
    if (page < 1) {
      page = 1;
    } else if (page > totalPages) {
      page = totalPages;
    }

    this.setState({
      currentPage: PaginationFilter ? 1 : page
    });

    var startIndex = (page - 1) * pageLimit;
    var endIndex = Math.min(startIndex + pageLimit - 1, totalRecords - 1);

    this.props.onChangePage({
      pageLimit,
      totalPages,
      page,
      startIndex,
      endIndex
    });
  }

  getPager() {
    var { pagesToShow, currentPage, totalPages } = this.state;
    var pages = [],
      startFromNumber;

    if (totalPages <= pagesToShow) {
      startFromNumber = 1;
      pagesToShow = totalPages;
    } else {
      if (currentPage <= Math.ceil(pagesToShow / 2)) {
        startFromNumber = 1;
      } else if (
        currentPage + Math.floor((pagesToShow - 1) / 2) >=
        totalPages
      ) {
        startFromNumber = totalPages - (pagesToShow - 1);
      } else {
        startFromNumber = currentPage - Math.floor(pagesToShow / 2);
      }
    }

    for (let i = 1; i <= pagesToShow; i++) {
      pages.push(startFromNumber++);
    }

    return {
      currentPage,
      totalPages,
      pages
    };
  }

  render() {
    if (!this.state.totalRecords || this.state.totalPages === 1) return null;

    var pager = this.getPager();

    return (
      <ul className="pagination">
        <li>
          <button
            disabled={pager.currentPage === 1 ? true : false}
            onClick={() => this.setPage(1)}
          >
            First
          </button>
        </li>
        <li>
          <button
            disabled={pager.currentPage === 1 ? true : false}
            onClick={() => this.setPage(pager.currentPage - 1)}
          >
            Prev
          </button>
        </li>
        {pager.pages.map((page, index) => (
          <li key={index}>
            <button
              className={pager.currentPage === page ? "isActiveP" : ""}
              onClick={() => this.setPage(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={pager.currentPage === pager.totalPages ? true : false}
            onClick={() => this.setPage(pager.currentPage + 1)}
          >
            Next
          </button>
        </li>
        <li>
          <button
            disabled={pager.currentPage === pager.totalPages ? true : false}
            onClick={() => this.setPage(pager.totalPages)}
          >
            Last
          </button>
        </li>
      </ul>
    );
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  initialPage: PropTypes.number,
  pagesToShow: PropTypes.number,
  onChangePage: PropTypes.func
};

export default Pagination;