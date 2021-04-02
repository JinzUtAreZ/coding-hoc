import React, { Fragment, useEffect, useState } from "react";
import useFullPageLoader from "../../../hooks/useFullPageLoader";
import DataTables from "./DataTables3.comp";

const LoadData = () => {
  const [data, setData] = useState();
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  useEffect(() => {
    const getData = () => {
      showLoader();

      fetch("https://dcoders-tutorial.herokuapp.com/mock/data?total=1000")
        .then((response) => response.json())
        .then((json) => {
          hideLoader();
          setData(json.users);
          //console.log(json);
        });
    };

    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <h3>TESTING USEPAGINATION WITH USEMEMO</h3>
      {loader}
      <div className="container px-2">
        {data && (
          <>
            <DataTables data={data} itemsPerPage={10} startFrom={1} />
          </>
        )}
      </div>
    </Fragment>
  );
};

export default LoadData;
