import React, { useMemo, useState } from "react";
import Header from "../../../components/datatables/header/header.comp";
import { Search, TableHeader } from "../../../components/datatables/index";
//import useFullPageLoader from "../../hooks/useFullPageLoader";
import usePagination from "../../../hooks/usePagination";
import "../Datatables.css";
//import ExternalInfo from "components/ExternalInfo";
//import AppConfig from "App.config";

const DataTable = ({ data, itemsPerPage, startFrom }) => {
  //const [comments, setComments] = useState([]);
  //const [loader, showLoader, hideLoader] = useFullPageLoader();
  //const [totalItems, setTotalItems] = useState(0);
  //const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchFalse, setSearchFalse] = useState(true);
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const {
    slicedData,
    pagination,
    prevPage,
    nextPage,
    changePage,
    filteredData,
    setFilteredData,
    setSearching,
  } = usePagination({ itemsPerPage, data, startFrom });

  //const ITEMS_PER_PAGE = 50;

  const headers = [
    { name: "No#", field: "id", sortable: false },
    { name: "Name", field: "name", sortable: true },
    { name: "Email", field: "email", sortable: true },
    { name: "Comment", field: "body", sortable: false },
  ];

  // useEffect(() => {
  //   const getData = () => {
  //     showLoader();

  //     fetch("https://jsonplaceholder.typicode.com/comments")
  //       .then((response) => response.json())
  //       .then((json) => {
  //         hideLoader();
  //         setComments(json);
  //         console.log(json);
  //       });
  //   };

  //   getData();
  //   // eslint-disable-next-line
  // }, []);
  //FIX: SEARCHING ISSUE WITH PAGINATION
  const memoTblData = useMemo(() => {
    let computedData = data;

    if (search.trim() !== "" && searchFalse) {
      computedData = computedData.filter(
        (comment) =>
          comment.name.toLowerCase().includes(search.toLowerCase()) ||
          comment.email.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(computedData);
      setSearching(true);
      setSearchFalse(false);
    } else if (slicedData !== undefined && search === "") {
      computedData = slicedData;
    } else {
      computedData = data;
    }

    //setTotalItems(computedData.length);

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedData = computedData.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedData;
    // return computedComments.slice(
    //   (currentPage - 1) * ITEMS_PER_PAGE,
    //   (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    // );
  }, [data, slicedData, filteredData, search, sorting]);

  return (
    <>
      <Header title="Building a data table in react" />

      {/* <ExternalInfo page="datatable" /> */}

      <div className="row w-100">
        <div className="col mb-3 col-12 text-center">
          <div className="row">
            <div className="col-md-6">
              {/* {commentsData.length > 0 ? (
                <Pagination
                  // total={totalItems}
                  // itemsPerPage={ITEMS_PER_PAGE}
                  // currentPage={currentPage}
                  // onPageChange={(page) => setCurrentPage(page)}
                  itemsPerPage={ITEMS_PER_PAGE}
                  data={commentsData}
                  startFrom={currentPage}
                />
              ) : (
                ""
              )} */}
            </div>
            <div className="col-md-6 d-flex flex-row-reverse">
              <Search
                onSearch={(value) => {
                  setSearch(value);
                  //setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <table className="smart-table">
            {/* {console.log("DT", headers)} */}
            <TableHeader
              headers={headers}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {memoTblData.map((comment) => (
                <tr key={comment.id}>
                  <td data-col-title="ID">{comment.id}</td>
                  <td data-col-title="Name">{comment.name}</td>
                  <td data-col-title="Email">{comment.email}</td>
                  <td data-col-title="Body">{comment.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className="pagination">
            <a href="/#" className="pagination-previous" onClick={prevPage}>
              Previous
            </a>
            <a href="/#" className="pagination-next" onClick={nextPage}>
              Next
            </a>
            <ul className="pagination-list">
              {pagination.map((page) => {
                if (!page.ellipsis) {
                  return (
                    <li key={page.id}>
                      <a
                        href="/#"
                        className={
                          page.current
                            ? "pagination-link is-current"
                            : "pagination-link"
                        }
                        onClick={(e) => changePage(page.id, e)}
                      >
                        {page.id}
                      </a>
                    </li>
                  );
                } else {
                  return (
                    <li key={page.id}>
                      <span className="pagination-ellipsis">&hellip;</span>
                    </li>
                  );
                }
              })}
            </ul>
          </nav>
        </div>
      </div>
      {/* {loader} */}
    </>
  );
};

export default DataTable;
