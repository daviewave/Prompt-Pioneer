import React from 'react';
import Loader from 'react-loader-spinner';
import { Circles } from 'react-loader-spinner';

const Spinner = ({ message }) => {
  return (
    <>
      <div className="flex justify-center items-center mr-2">
        <Circles color="#00BFFF" height={50} width={50} />
      </div>

      {message && message !== '' && (
        <p className="text-lg text-center px-2 mt-2">{message}</p>
      )}
    </>
  );
};

export default Spinner;
