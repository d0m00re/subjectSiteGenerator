/*
todo : manage pagination with lot of page, currently no security on number of page
*/

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";

  interface IPagination {
    currentPage : number;
    totalPage : number;
    changePage : (target : number) => void;
  }
   
  export default function _Pagination(props : IPagination) {
    let arr = Array(props.totalPage).fill(0).map((_, i) => i);

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
                href="#"
                onClick={() => props.changePage(Math.max(props.currentPage - 1, 0))}
            />
          </PaginationItem>
            {
             arr.map((elem, key) => <PaginationItem key={`pagination-${elem}`}>
                <PaginationLink
                    onClick={() => props.changePage(elem)}
                    href="#"
                    isActive={(key === props.currentPage)}>
                    {key + 1}
                </PaginationLink>
             </PaginationItem>)   
            }
        {/*}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        */}
          <PaginationItem>
            <PaginationNext
                onClick={() => props.changePage(Math.min(props.currentPage + 1, props.totalPage - 1))}
                href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }