'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Message } from '@/lib/supabase';

interface MessageBubbleProps {
  message: Message;
  isTyping?: boolean;
}

export function MessageBubble({ message, isTyping = false }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';
  const isSystem = message.role === 'system';

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-yellow-50 text-yellow-800 text-sm px-3 py-2 rounded-full border border-yellow-200">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex w-full mb-4 animate-fade-in',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'flex max-w-[80%] gap-3',
          isUser ? 'flex-row-reverse' : 'flex-row'
        )}
      >
        {/* Avatar */}
        <div
          className={cn(
            'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
            isUser
              ? 'bg-trilogy-blue text-white'
              : 'bg-gray-100 text-gray-600 border border-gray-200'
          )}
        >
          {isUser ? 'U' : 'H'}
        </div>

        {/* Message Content */}
        <div
          className={cn(
            'flex flex-col',
            isUser ? 'items-end' : 'items-start'
          )}
        >
          {/* Message Bubble */}
          <div
            className={cn(
              'px-4 py-3 rounded-2xl shadow-sm max-w-full break-words',
              isUser
                ? 'bg-trilogy-blue text-white rounded-br-md'
                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
            )}
          >
            {isTyping ? (
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span className="text-sm text-gray-500 ml-2">Hexabot is thinking...</span>
              </div>
            ) : (
              <div className="whitespace-pre-wrap">{message.content}</div>
            )}
          </div>

          {/* Timestamp */}
          {!isTyping && (
            <div
              className={cn(
                'text-xs text-gray-500 mt-1 px-1',
                isUser ? 'text-right' : 'text-left'
              )}
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
    <div className="flex justify-start w-full mb-4">
      <div className="flex max-w-[80%] gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-gray-100 text-gray-600 border border-gray-200">
          H
        </div>

        {/* Typing Animation */}
        <div className="flex flex-col items-start">
          <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="text-sm text-gray-500 ml-2">Hexabot is thinking...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}