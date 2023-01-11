import React from "react";
import {pageProps, pagination} from "../service/Props";

function Pagination({pagination, setPage}: pageProps) {
  const {number, totalPages, first, last}: pagination = pagination;
  const handleClick = (p: number) => setPage(p);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item ">
          <button className={"page-link " + (first ? "disabled" : "")} onClick={() => handleClick(number - 1)}>
            ‹
          </button>
        </li>
        {[0, 1, 2, 3, 4]
          .map((k: number) => k + number - 1)
          .filter((k: number) => k > 0 && k <= totalPages)
          .map((el: number) => {
            return (
              <li className="page-item " key={el}>
                <button className={"page-link " + (number + 1 === el ? "active" : "")} onClick={() => handleClick(el - 1)}>
                  {el}
                </button>
              </li>
            );
          })}
        <li className="page-item ">
          <button className={"page-link " + (last ? "disabled" : "")} onClick={() => handleClick(number + 1)}>
            ›
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
