import React from "react";
import Pagination from "react-js-pagination";
import prevPage from "@/assets/images/prevPage.png";
import nextPage from "@/assets/images/nextPage.png";
import lastPage from "@/assets/images/lastPage.png";
import firstPage from "@/assets/images/firstPage.png";
import prevPage_disable from "@/assets/images/prevPage_disable.png";
import nextPage_disable from "@/assets/images/nextPage_disable.png";
import lastPage_disable from "@/assets/images/lastPage_disable.png";
import firstPage_disable from "@/assets/images/firstPage_disable.png";

import "./style.scss";

const Index = ({
  activePage = 1,
  handlePageChange = () => {},
  totalItem = 450,
}) => {
  return (
    <div className="pagination_container">
      <Pagination
        activePage={activePage}
        itemsCountPerPage={20}
        totalItemsCount={totalItem}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
        prevPageText={
          <img
            className="icon-pagination"
            src={activePage !== 1 ? prevPage : prevPage_disable}
            alt="img"
          />
        }
        nextPageText={
          <img
            className="icon-pagination"
            src={
              activePage !== Math.ceil(totalItem / 20)
                ? nextPage
                : nextPage_disable
            }
            alt="img"
          />
        }
        firstPageText={
          <img
            className="icon-pagination"
            src={activePage !== 1 ? firstPage : firstPage_disable}
            alt="img"
          />
        }
        lastPageText={
          <img
            className="icon-pagination"
            src={
              activePage !== Math.ceil(totalItem / 20)
                ? lastPage
                : lastPage_disable
            }
            alt="img"
          />
        }
      />
    </div>
  );
};

export default Index;
