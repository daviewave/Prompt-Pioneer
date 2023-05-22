'use client';
import React, { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import copy from 'clipboard-copy';

interface CopyToClipboardProps {
  text: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    copy(text);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000); // reset the copySuccess state after 2 seconds
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {copySuccess && (
        <div
          style={{
            position: 'absolute',
            bottom: '130%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#333',
            color: '#fff',
            padding: '2px 5px',
            borderRadius: '3px',
            fontSize: '0.8em',
            whiteSpace: 'nowrap',
          }}
        >
          Copied!
        </div>
      )}
      <FaRegCopy onClick={copyToClipboard} style={{ cursor: 'pointer' }} />
    </div>
  );
};

export default CopyToClipboard;
