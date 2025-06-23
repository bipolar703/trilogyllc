"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Message } from "@/lib/supabase";

interface MessageBubbleProps {
  message: Message;
  isTyping?: boolean;
}

export function MessageBubble({
  message,
  isTyping = false,
}: MessageBubbleProps) {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";
  const isSystem = message.role === "system";

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (isSystem) {
    return (
      <div className="flex justify-center my-4" data-oid="l06nmjt">
        <div
          className="bg-yellow-50 text-yellow-800 text-sm px-3 py-2 rounded-full border border-yellow-200"
          data-oid="q33a8t1"
        >
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-fade-in",
        isUser ? "justify-end" : "justify-start",
      )}
      data-oid="2n00x2m"
    >
      <div
        className={cn(
          "flex max-w-[80%] gap-3",
          isUser ? "flex-row-reverse" : "flex-row",
        )}
        data-oid="xpen.c6"
      >
        {/* Avatar */}
        <div
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
            isUser
              ? "bg-trilogy-blue text-white"
              : "bg-gray-100 text-gray-600 border border-gray-200",
          )}
          data-oid="it0m8dd"
        >
          {isUser ? "U" : "H"}
        </div>

        {/* Message Content */}
        <div
          className={cn("flex flex-col", isUser ? "items-end" : "items-start")}
          data-oid="b5lzorb"
        >
          {/* Message Bubble */}
          <div
            className={cn(
              "px-4 py-3 rounded-2xl shadow-sm max-w-full break-words",
              isUser
                ? "bg-trilogy-blue text-white rounded-br-md"
                : "bg-white text-gray-800 border border-gray-200 rounded-bl-md",
            )}
            data-oid="vtgany3"
          >
            {isTyping ? (
              <div className="flex items-center space-x-1" data-oid="6q:x_a2">
                <div className="flex space-x-1" data-oid="lrxma65">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot"
                    data-oid="n5zs8yd"
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot"
                    style={{ animationDelay: "0.2s" }}
                    data-oid="3:109jg"
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot"
                    style={{ animationDelay: "0.4s" }}
                    data-oid="x.0dxwy"
                  ></div>
                </div>
                <span className="text-sm text-gray-500 ml-2" data-oid="vjo7qgr">
                  Hexabot is thinking...
                </span>
              </div>
            ) : (
              <div className="whitespace-pre-wrap" data-oid="qoav7oy">
                {message.content}
              </div>
            )}
          </div>

          {/* Timestamp */}
          {!isTyping && (
            <div
              className={cn(
                "text-xs text-gray-500 mt-1 px-1",
                isUser ? "text-right" : "text-left",
              )}
              data-oid="y46t8xl"
            >
              {formatTime(message.created_at)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Typing indicator component
export function TypingIndicator() {
  return (
    <div className="flex justify-start w-full mb-4" data-oid="fnwqk3g">
      <div className="flex max-w-[80%] gap-3" data-oid="v_c6rdg">
        {/* Avatar */}
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-gray-100 text-gray-600 border border-gray-200"
          data-oid="n_ihi73"
        >
          H
        </div>

        {/* Typing Animation */}
        <div className="flex flex-col items-start" data-oid="1-p:isr">
          <div
            className="px-4 py-3 rounded-2xl rounded-bl-md bg-white border border-gray-200 shadow-sm"
            data-oid="vhnqqbe"
          >
            <div className="flex items-center space-x-1" data-oid="1oohul-">
              <div className="flex space-x-1" data-oid="1qtkoso">
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot"
                  data-oid="bmcv5dr"
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot"
                  style={{ animationDelay: "0.2s" }}
                  data-oid="kch50r4"
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot"
                  style={{ animationDelay: "0.4s" }}
                  data-oid="st9crgm"
                ></div>
              </div>
              <span className="text-sm text-gray-500 ml-2" data-oid="6h0un-l">
                Hexabot is thinking...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
