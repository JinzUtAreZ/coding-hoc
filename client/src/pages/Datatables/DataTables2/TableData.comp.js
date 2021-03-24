import React, { Fragment, useEffect, useState } from "react";
import DataTables from "../../../components/datatables2/datatables2.comp";
import useFullPageLoader from "../../../hooks/useFullPageLoader";
const TableData = () => {
  const [data, setData] = useState();
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  useEffect(() => {
    const getData = () => {
      showLoader();

      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((response) => response.json())
        .then((json) => {
          hideLoader();
          setData(json);
          //console.log(json);
        });
    };

    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <h3>ReactJS pagination using custom hook</h3>
      {loader}
      <div className="container px-2">
        {data && (
          <>
            <DataTables data={data} itemsPerPage={10} startFrom={15} />
          </>
        )}
      </div>
    </Fragment>
  );
};

export default TableData;
