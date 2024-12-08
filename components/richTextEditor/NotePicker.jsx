
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Tiptap from "./Tiptap";

const NotePicker = () => {
  const [content, setContent] = useState("");
  const handleChange = (reason) => {
    setContent(reason);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // remove all attributes with their properties such as "class" from the html string
    const data = content.replace(
      /<(\w+)([^>]*)>/g,
      (match, p1) => "<" + p1 + ">"
    );
    console.log(data);
  };
  return (
    // <form onSubmit={handleSubmit} className="max-w-3xl mb-10">
    <div  className="flex flex-col w-full rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
      <Tiptap content={content} handleChange={handleChange} />
    </div>
  );
};

export default NotePicker;
