import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "../../../components/modal/modal.comp";

const SignOut = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    openModal();
    setTimeout(() => {
      history.push("/");
    }, 3000);

    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default SignOut;
