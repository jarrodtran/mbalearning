"use client";
// @ts-nocheck

import { useChat } from '@ai-sdk/react';
import { Send, Trash2, User, GraduationCap } from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';

interface ProfessorChatProps {
  moduleSlug?: string;
  moduleContext?: string;
}

export default function ProfessorChat({ moduleSlug, moduleContext }: ProfessorChatProps) {
  const { messages = [], sendMessage, setMessages, isLoading = false } = useChat({
    api: '/api/chat',
    body: {
      moduleSlug,
      moduleContext,
    },
  });

  const [input, setInput] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const clearChat = () => {
    setMessages([]);
  };

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  }, [input, isLoading, sendMessage]);

  return (
    <div className="flex flex-col h-full bg-cream backdrop-blur-sm">
      <div className="flex items-center justify-between p-4 border-b border-border bg-white">
        <div className="flex items-center gap-3">
          <div className="bg-navy p-2 rounded-full text-cream">
            <GraduationCap size={20} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-navy leading-tight">AI Professor</h3>
            <p className="text-xs text-text-secondary">
              {moduleSlug ? "Module Office Hours" : "Global Knowledge Base"}
            </p>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="p-2 text-text-secondary hover:text-red-500 transition-colors"
          title="Clear Conversation"
          aria-label="Clear Conversation"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-text-secondary p-8">
            <GraduationCap size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-serif mb-2 text-navy font-bold">Welcome to Office Hours.</p>
            <p className="text-sm">
              {moduleSlug 
                ? "I'm ready to discuss this module. What area of the framework or case gives you the most trouble?"
                : "I am ready to discuss the entire Strategic MBA curriculum. Where shall we begin?"}
            </p>
          </div>
        )}
        
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={clsx(
              "flex gap-4 max-w-[85%]",
              m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div className={clsx(
              "shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
              m.role === 'user' ? "bg-accent text-white" : "bg-navy text-cream"
            )}>
              {m.role === 'user' ? <User size={16} /> : <GraduationCap size={16} />}
            </div>
            
            <div className={clsx(
              "px-4 py-3 rounded-2xl",
              m.role === 'user' 
                ? "bg-gradient-to-r from-accent to-accent_secondary text-white rounded-tr-none shadow-md shadow-accent/10" 
                : "bg-white border border-border text-text-primary shadow-sm rounded-tl-none prose prose-sm max-w-none"
            )}>
              {m.role === 'user' ? (
                <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
              ) : (
                <ReactMarkdown>{m.content}</ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 max-w-[85%] mr-auto">
            <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-navy text-cream">
              <GraduationCap size={16} />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white border border-border text-text-primary shadow-sm rounded-tl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-border animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-border animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-border animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form 
        onSubmit={handleSubmit}
        className="p-4 border-t border-border bg-white"
      >
        <div className="relative flex items-center bg-cream-dark rounded-xl border border-border overflow-hidden focus-within:ring-2 focus-within:ring-accent/50 focus-within:border-accent/30 transition-all">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent px-4 py-3 outline-none w-full text-text-primary placeholder:text-text-secondary"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 text-navy hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
