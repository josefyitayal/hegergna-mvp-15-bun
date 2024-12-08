
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// import Heading from "@tiptap/extension-heading";
import { Heading as OriginalHeading } from '@tiptap/extension-heading';
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import Toolbar from "./Toolbar";



const CustomHeading = OriginalHeading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => {
          const levelClass = {
            1: 'text-3xl font-bold',
            2: 'text-2xl font-semibold',
            3: 'text-xl font-medium',
          };
          return {
            class: levelClass[attributes.level] || 'text-xl font-medium',
          };
        },
      },
    };
  },
});



const Tiptap = ({ handleChange, content }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,

      CustomHeading.configure({
        levels: [1, 2, 3],
      }),
      
      BulletList.configure({
        HTMLAttributes: {
          class: "ml-6 list-disc",
        },
      }),

      OrderedList.configure({
        HTMLAttributes: {
          class: "ml-6 list-decimal",
        },
      }),

      Blockquote.configure({
        HTMLAttributes: {
          class: "border-l-4 border-blue-500 pl-4 text-gray-700"
        }
      })
    ],

    editorProps: {
      attributes: {
        class: "min-h-[80px] max-h-[330px] overflow-y-scroll px-3 py-2",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full">
      <Toolbar editor={editor} content={content} />
      <EditorContent className="max-h-[330px]" editor={editor} />
    </div>
  );
};

export default Tiptap;
