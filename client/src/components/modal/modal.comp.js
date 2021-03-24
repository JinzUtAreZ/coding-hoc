import React, { useCallback, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { animated, useSpring } from "react-spring";
import "./modal.css";

// IMPORTANT: styled comp used in modal.comp1.js

const Modal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        console.log("I pressed");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <div className="divanimated" onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <div className="divanimated__modal" showModal={showModal}>
              <div
                className="divanimated__modal__img"
                src={require("../../assets/modal.jpeg")}
                alt="camera"
              />
              <div className="divanimated__modal__content">
                <h1>Are you ready?</h1>
                <p>Get exclusive access to our next launch.</p>
                <button>Join Now</button>
              </div>
              <div
                className="divanimated__close"
                aria-label="Close modal"
                onClick={() => setShowModal((prev) => !prev)}
              >
                <MdClose size={42} />
              </div>
            </div>
          </animated.div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
