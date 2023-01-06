import React from "react";
import {pageProps} from "../service/Props";

function Pagination({pagination, setPage}: pageProps) {
  const {number, totalPages, first, last}: any = pagination;
  const handleClick = (p: number) => {
    setPage(p);
  };
  const pages = [0, 1, 2, 3, 4];

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={"page-item " + (first ? "disabled" : "")}>
          <button className="page-link " onClick={() => handleClick(number - 1)}>
            ‹
          </button>
        </li>
        {[...pages]
          .map((k) => k + number - 1)
          .filter((k) => k > 0 && k <= totalPages)
          .map((el) => {
            return (
              <li className={"page-item " + (number + 1 === el ? "active" : "")} key={el}>
                <button className="page-link " onClick={() => handleClick(el - 1)}>
                  {el}
                </button>
              </li>
            );
          })}
        <li className={"page-item " + (last ? "disabled" : "")}>
          <button className="page-link " onClick={() => handleClick(number + 1)}>
            ›
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
