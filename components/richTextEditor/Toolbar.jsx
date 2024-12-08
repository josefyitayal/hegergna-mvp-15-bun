"use client";

import React from "react";
import { Bold, List, ListOrdered, Heading2, Undo, Redo, Quote, Heading1, Heading3, Italic } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

const Toolbar = ({ editor, content }) => {
  if (!editor) {
    return null;
  }
  return (
    // <div className="flex justify-start items-center gap-4 p-1 border border-primary rounded-lg">
    <div className="flex flex-wrap gap-1 p-1 border-b border-input my-toggle-group">
      <Toggle
        pressed={editor.isActive("bold")}
        className="toggle-item"
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="w-4 h-4" />
      </Toggle>

      <Toggle
        pressed={editor.isActive("italic")}
        className="toggle-item"
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="w-4 h-4"/>
      </Toggle>

      <Toggle
        pressed={editor.isActive('heading', { level: 1 })}
        className="toggle-item"
        onPressedChange={() => {
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
      >
        <Heading1 className="w-4 h-4" />
      </Toggle>

      <Toggle
        pressed={editor.isActive('heading', { level: 2 })}
        className="toggle-item"
        onPressedChange={() => {
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
      >
        <Heading2 className="w-4 h-4" />
      </Toggle>

      <Toggle
        pressed={editor.isActive('heading', { level: 3 })}
        className="toggle-item"
        onPressedChange={() => {
          editor.chain().focus().toggleHeading({ level: 3 }).run();
        }}
      >
        <Heading3 className="w-4 h-4" />
      </Toggle>

      <Toggle
        pressed={editor.isActive("blockquote")}
        className="toggle-item"
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="w-4 h-4" />
      </Toggle>

      <Toggle
        pressed={editor.isActive("bulletList")}
        className="toggle-item"
        onPressedChange={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <List className="w-4 h-4" />
      </Toggle>

      <Toggle
        pressed={editor.isActive("orderedList")}
        className="toggle-item"
        onPressedChange={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
      >
        <ListOrdered className="w-4 h-4" />
      </Toggle>

      <Toggle
        pressed={editor.isActive("undo")}
        className="toggle-item"
        onPressedChange={() => {
          editor.chain().focus().undo().run();
        }}
      >
        <Undo className="w-4 h-4" />
      </Toggle>

      <Toggle
        pressed={editor.isActive("redo")}
        className="toggle-item"
        onPressedChange={() => {
          editor.chain().focus().redo().run();
        }}
      >
        <Redo className="w-4 h-4" />
      </Toggle>
    </div>
  );
};

export default Toolbar;