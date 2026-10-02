'use client';

import React, { useState, useRef, useEffect } from 'react';

export type TerminalCommandMap = Record<string, string | ((args: string[]) => string)>;

interface TerminalProps {
  welcomeMessage?: string;
  prompt?: string;
  commandMap: TerminalCommandMap;
  onSuccess?: () => void;
  successCommand?: string; // If this command is typed, trigger onSuccess
  className?: string;
}

export function Terminal({
  welcomeMessage = 'ZENTRION WEB TERMINAL v1.0.0\nType "help" for a list of available commands.',
  prompt = 'user@lab:~$',
  commandMap,
  onSuccess,
  successCommand,
  className = '',
}: TerminalProps) {
  const [history, setHistory] = useState<{ type: 'input' | 'output'; content: string }[]>(
    welcomeMessage ? [{ type: 'output', content: welcomeMessage }] : []
  );
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, { type: 'input', content: `${prompt} ${trimmed}` }]);

    const args = trimmed.split(/\s+/);
    const baseCommand = args[0].toLowerCase();
    const fullCommand = trimmed;

    if (trimmed === 'clear') {
      setHistory(welcomeMessage ? [{ type: 'output', content: welcomeMessage }] : []);
      return;
    }

    if (successCommand && trimmed === successCommand) {
      if (onSuccess) onSuccess();
    }

    // Try to match the exact full command first, then just the base command
    let output = '';
    const exactMatch = commandMap[fullCommand];
    if (exactMatch) {
      output = typeof exactMatch === 'function' ? exactMatch(args) : exactMatch;
    } else {
      const baseMatch = commandMap[baseCommand];
      if (baseMatch) {
        output = typeof baseMatch === 'function' ? baseMatch(args) : baseMatch;
      } else {
        output = `bash: ${baseCommand}: command not found`;
      }
    }

    setHistory((prev) => [...prev, { type: 'output', content: output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div
      onClick={handleFocus}
      className={`bg-[#0a0a0a] border border-line rounded-lg p-4 font-mono text-sm text-gray-300 h-[400px] overflow-y-auto cursor-text shadow-inner ${className}`}
    >
      {history.map((item, i) => (
        <div key={i} className="mb-2 whitespace-pre-wrap break-words leading-relaxed">
          {item.type === 'input' ? (
            <span className="text-emerald-400">{item.content}</span>
          ) : (
            <span>{item.content}</span>
          )}
        </div>
      ))}
      <div className="flex items-center">
        <span className="text-emerald-400 mr-2">{prompt}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-gray-300 caret-white"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
