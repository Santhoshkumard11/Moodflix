import React, { createContext, useContext, useReducer } from "react";
import { actionTypes } from "./types";

const initialState = {
  isModalVisible: false,
  modalData: {}
};

const ModalContext = createContext();

const modalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.OPEN_MODAL: {
      return {
        ...state,
        isModalVisible: true,
        modalData: payload
      };
    }
    case actionTypes.CLOSE_MODAL: {
      return {
        ...state,
        isModalVisible: false
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, { ...initialState });
  const value = { state, dispatch };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

const useModalValue = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModalValue must be used within a ModalProvider");
  }

  return context;
};

export { ModalProvider, useModalValue };
