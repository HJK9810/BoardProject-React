import {questionForm} from "./Form";

interface sortObject {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface pageableObject {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  sort: sortObject;
}

export interface BoardForm {
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberPfElements: number;
  pageable: pageableObject;
  sort: sortObject;
  totalElements: number;
  totalPages: number;
  content: questionForm[];
}
