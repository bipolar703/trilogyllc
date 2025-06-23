"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSendMessage,
  disabled = false,
  isLoading = false,
  placeholder = "Type your message here...",
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4" data-oid="q7a5b6a">
      <form
        onSubmit={handleSubmit}
        className="flex gap-3 items-end"
        data-oid=".v4aymk"
      >
        <div className="flex-1 relative" data-oid="6q25mwp">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            className={cn(
              "min-h-[44px] max-h-[120px] resize-none pr-12 py-3",
              "focus:ring-2 focus:ring-trilogy-blue focus:border-transparent",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
            rows={1}
            data-oid="v5v:7gy"
          />

          {/* Character count indicator */}
          {message.length > 0 && (
            <div
              className="absolute bottom-2 right-2 text-xs text-gray-400"
              data-oid="u733tug"
            >
              {message.length}/2000
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={!message.trim() || disabled || isLoading}
          className={cn(
            "h-11 px-4 bg-trilogy-blue hover:bg-trilogy-navy",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-all duration-200",
          )}
          data-oid="cp2t309"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" data-oid="25-58lh" />
          ) : (
            <Send className="h-4 w-4" data-oid="c2uzny7" />
          )}
          <span className="sr-only" data-oid="fdo:s3-">
            Send message
          </span>
        </Button>
      </form>

      {/* Helper text */}
      <div
        className="mt-2 text-xs text-gray-500 flex justify-between items-center"
        data-oid="w5.1pbl"
      >
        <span data-oid="wpelr56">
          Press Enter to send, Shift+Enter for new line
        </span>
        <span className="flex items-center gap-1" data-oid="24-3vl3">
          <div
            className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
            data-oid="gnj_d2."
          ></div>
          Hexabot is online
        </span>
      </div>
    </div>
  );
}
