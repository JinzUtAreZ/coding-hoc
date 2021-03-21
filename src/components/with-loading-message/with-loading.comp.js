import React from "react";
import "./with-loading.css";

const WithLoading = ({ isLoading }) => {
  return isLoading ? (
    <div className="with-spinner">
      <div className="spinner__container" />
    </div>
  ) : (
    <></>
  );
};

export default WithLoading;
