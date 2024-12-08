"use client"
import React, { useState, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const RichTextEditor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = useMemo(() => ({
    buttons: [
      'bold', 'italic', 'underline', '|',
      'ul', 'ol', '|',
      'h1', 'h2', 'h3', '|',
      'code', 'quote', '|',
      'undo', 'redo'
    ],
    buttonsMD: [
      'bold', 'italic', 'underline', '|',
      'ul', 'ol', '|',
      'h1', 'h2', 'h3', '|',
      'code', 'quote', '|',
      'undo', 'redo'
    ],
    buttonsXS: [
      'bold', 'italic', 'underline', '|',
      'ul', 'ol', '|',
      'h1', 'h2', 'h3', '|',
      'code', 'quote', '|',
      'undo', 'redo'
    ],
    uploader: { insertImageAsBase64URI: true },
    responsive: false,
  }), []);

  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      onChange={handleChange}
    />
  );
};

export default RichTextEditor;
