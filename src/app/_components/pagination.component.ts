import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({ selector: 'pagination', templateUrl: 'pagination.component.html' })
export class PaginationComponent implements OnChanges {
    @Input() items?: Array<any>;
    @Output() changePage = new EventEmitter<any>(true);
    @Input() initialPage = 1;
    @Input() pageSize = 10;
    @Input() maxPages = 10;
    @Input() selectedPageSize = 10;

    pageSizes: number[] = [10, 15, 50, 80, 100];
    pager?: Pager;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['items'] && changes['items'].currentValue !== changes['items'].previousValue) {
            if (this.items) {
                this.setPage(this.initialPage);
            }
        }
    }

    setPage(page: number) {
        if (!this.items || this.items.length === 0) {
          return;
        }
      
        // Update the page size to the selected value
        this.pageSize = this.selectedPageSize;
      
        // calculate total pages
        const totalPages = Math.ceil(this.items.length / this.pageSize);
      
        // ensure current page isn't out of range
        if (page < 1) {
          page = 1;
        } else if (page > totalPages) {
          page = totalPages;
        }
      
        // get new pager object for specified page
        this.pager = this.paginate(this.items.length, page, this.pageSize, this.maxPages);
      
        // get new page of items from items array
        const pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
      
        // call change page function in parent component
        this.changePage.emit(pageOfItems);
      }
      

    paginate(totalItems: number, currentPage: number = 1, pageSize: number = 10, maxPages: number = 10): Pager {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage: number, endPage: number;
        if (totalPages <= maxPages) {
            // total pages less than max so show all pages
            startPage = 1;
            endPage = totalPages;
        } else {
            // total pages more than max so calculate start and end pages
            let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
            let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
            if (currentPage <= maxPagesBeforeCurrentPage) {
                // current page near the start
                startPage = 1;
                endPage = maxPages;
            } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                // current page near the end
                startPage = totalPages - maxPages + 1;
                endPage = totalPages;
            } else {
                // current page somewhere in the middle
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages
        };
    }

    pageSizeChanged() {
        this.setPage(1); // Reset to the first page when the page size changes
      }
      

}

export interface Pager {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    startIndex: number;
    endIndex: number;
    pages: number[];
}