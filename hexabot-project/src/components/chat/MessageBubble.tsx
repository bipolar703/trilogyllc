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
      <div className="flex justify-center my-4" data-oid="_2tyt9c">
        <div
          className="bg-yellow-50 text-yellow-800 text-sm px-3 py-2 rounded-full border border-yellow-200"
          data-oid="k38y2wl"
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
      data-oid="a1y3yh5"
    >
      <div
        className={cn(
          "flex max-w-[80%] gap-3",
          isUser ? "flex-row-reverse" : "flex-row",
        )}
        data-oid="i:u7p9j"
      >
        {/* Avatar */}
        <div
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
            isUser
              ? "bg-trilogy-blue text-white"
              : "bg-gray-100 text-gray-600 border border-gray-200",
          )}
          data-oid="3t0hd59"
        >
          {isUser ? "U" : "H"}
        </div>

        {/* Message Content */}
        <div
          className={cn("flex flex-col", isUser ? "items-end" : "items-start")}
          data-oid="jugtl9b"
        >
          {/* Message Bubble */}
          <div
            className={cn(
              "px-4 py-3 rounded-2xl shadow-sm max-w-full break-words",
              isUser
                ? "bg-trilogy-blue text-white rounded-br-md"
                : "bg-white text-gray-800 border border-gray-200 rounded-bl-md",
            )}
            data-oid="6pi0:u9"
          >
            {isTyping ? (
              <div className="flex items-center space-x-1" data-oid="k7_dyno">
                <div className="flex space-x-1" data-oid="tj.tlyw">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot"
                    data-oid="713xcpu"
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot"
                    style={{ animationDelay: "0.2s" }}
                    data-oid="c2g1o41"
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot"
                    style={{ animationDelay: "0.4s" }}
                    data-oid="53ue5az"
                  ></div>
                </div>
                <span className="text-sm text-gray-500 ml-2" data-oid="mvx1y8k">
                  Hexabot is thinking...
                </span>
              </div>
            ) : (
              <div className="whitespace-pre-wrap" data-oid="4ob4c:_">
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
              data-oid="--ntj_z"
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
    <div className="flex justify-start w-full mb-4" data-oid="-zy2xte">
      <div className="flex max-w-[80%] gap-3" data-oid="a3hfbm7">
        {/* Avatar */}
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-gray-100 text-gray-600 border border-gray-200"
          data-oid="46-jcqr"
        >
          H
        </div>

        {/* Typing Animation */}
        <div className="flex flex-col items-start" data-oid="lxk9ym3">
          <div
            className="px-4 py-3 rounded-2xl rounded-bl-md bg-white border border-gray-200 shadow-sm"
            data-oid="hiw537s"
          >
            <div className="flex items-center space-x-1" data-oid="_u5-:ap">
              <div className="flex space-x-1" data-oid="214ywxj">
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot"
                  data-oid="08adtm_"
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot"
                  style={{ animationDelay: "0.2s" }}
                  data-oid="rp-czz_"
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot"
                  style={{ animationDelay: "0.4s" }}
                  data-oid="ptt5mnz"
                ></div>
              </div>
              <span className="text-sm text-gray-500 ml-2" data-oid="l4oikh8">
                Hexabot is thinking...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
