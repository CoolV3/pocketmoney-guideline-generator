"use client";

import { useState, useRef, forwardRef, useImperativeHandle } from "react";

export type MarkdownInputRef = {
    getValue: () => string;
    setValue: (value: string) => void;
};

type MarkdownInputProps = {
    className?: string;
    onChange?: (value: string) => void; // Neu: Callback-Prop
};

const MarkdownInput = forwardRef<MarkdownInputRef, MarkdownInputProps>(
    ({ className = "", onChange }, ref) => { // onChange hier extrahieren
        const [text, setText] = useState("");
        const textareaRef = useRef<HTMLTextAreaElement | null>(null);

        // Hilfsfunktion zum Update beider Zustände
        const handleTextChange = (newValue: string) => {
            setText(newValue);
            if (onChange) onChange(newValue);
        };

        useImperativeHandle(ref, () => ({
            getValue: () => text,
            setValue: (value: string) => handleTextChange(value), // Auch hier Callback nutzen
        }));


        const insertText = (before: string, after = "") => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            const selectedText = text.substring(start, end);

            const newText =
                text.substring(0, start) +
                before +
                selectedText +
                after +
                text.substring(end);

            handleTextChange(newText);

            setTimeout(() => {
                textarea.focus();

                const cursorPosition =
                    start + before.length + selectedText.length + after.length;

                textarea.setSelectionRange(cursorPosition, cursorPosition);
            }, 0);
        };

        return (
            <div className={className}>
                <div className="flex gap-2 bg-yellow-400 p-2 rounded-t-2xl">
                    <button className="cursor-pointer hover:text-gray-600 transition-colors" onClick={() => insertText("# ")}>Heading</button>

                    <button className="cursor-pointer hover:text-gray-600 transition-colors" onClick={() => insertText("**", "**")}>Bold</button>

                    <button className="cursor-pointer hover:text-gray-600 transition-colors" onClick={() => insertText("*", "*")}>Italic</button>
                    <button className="cursor-pointer hover:text-gray-600 transition-colors" onClick={() => insertText("```", "```")}>Code</button>
                </div>

                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => handleTextChange(e.target.value)}
                    placeholder="Write your article in Markdown here"
                    rows={10}
                    className="w-100 border-2 rounded-b-2xl p-2"
                />
            </div>
        );
    }
);

MarkdownInput.displayName = "MarkdownInput";

export default MarkdownInput;