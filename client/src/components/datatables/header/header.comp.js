import React, { useState } from "react";

const Header = ({ headers, onSorting }) => {
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };

  return (
    <>
      {headers !== undefined ? (
        <thead>
          <tr>
            {headers.map(({ name, field, sortable }) => (
              <th
                key={name}
                onClick={() => (sortable ? onSortingChange(field) : null)}
              >
                {name}

                {sortingField && sortingField === field && (
                  <span className="icon">
                    {sortingOrder === "asc" ? (
                      <i className="fas fa-sort-up"></i>
                    ) : (
                      <i className="fas fa-sort-down"></i>
                    )}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
