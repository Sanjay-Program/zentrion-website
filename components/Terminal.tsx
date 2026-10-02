'use client';

import React, { useState, useRef, useEffect } from 'react';

export type TerminalCommandMap = Record<string, string | ((args: string[]) => string)>;

export interface VFSNode {
  type: 'file' | 'dir';
  content?: string;
  children?: Record<string, VFSNode>;
}

interface TerminalProps {
  welcomeMessage?: string;
  prompt?: string;
  commandMap?: TerminalCommandMap;
  vfs?: Record<string, VFSNode>; // Virtual file system root
  onSuccess?: () => void;
  successCommand?: string;
  className?: string;
}

export function Terminal({
  welcomeMessage = 'ZENTRION WEB TERMINAL v1.1.0\nType "help" for a list of available commands.',
  prompt = 'user@zentrion',
  commandMap = {},
  vfs,
  onSuccess,
  successCommand,
  className = '',
}: TerminalProps) {
  const [history, setHistory] = useState<{ type: 'input' | 'output'; content: string }[]>(
    welcomeMessage ? [{ type: 'output', content: welcomeMessage }] : []
  );
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState<string[]>([]); // [] is root '/'
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  // VFS Helper function
  const resolveNode = (pathStr: string): VFSNode | null => {
    if (!vfs) return null;
    let current: Record<string, VFSNode> = vfs;
    let targetNode: VFSNode | null = { type: 'dir', children: vfs };
    
    // Handle absolute vs relative
    let pathParts = pathStr.startsWith('/') ? pathStr.split('/').filter(Boolean) : [...cwd, ...pathStr.split('/').filter(Boolean)];
    
    // Resolve .. and .
    const resolvedParts: string[] = [];
    for (const part of pathParts) {
      if (part === '.') continue;
      if (part === '..') {
        resolvedParts.pop();
        continue;
      }
      resolvedParts.push(part);
    }

    for (let i = 0; i < resolvedParts.length; i++) {
      const part = resolvedParts[i];
      if (current[part]) {
        targetNode = current[part];
        if (targetNode.type === 'dir' && targetNode.children) {
          current = targetNode.children;
        } else if (i < resolvedParts.length - 1) {
          return null; // tried to go into a file
        }
      } else {
        return null;
      }
    }
    return targetNode;
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const displayPrompt = `${prompt}:~${cwd.length > 0 ? '/' + cwd.join('/') : ''}$`;
    setHistory((prev) => [...prev, { type: 'input', content: `${displayPrompt} ${trimmed}` }]);

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

    let output = '';

    // VFS Commands
    if (vfs) {
      if (baseCommand === 'pwd') {
        output = '/' + cwd.join('/');
      } else if (baseCommand === 'ls') {
        const targetPath = args[1] || '.';
        const node = resolveNode(targetPath);
        if (!node) {
          output = `ls: cannot access '${targetPath}': No such file or directory`;
        } else if (node.type === 'file') {
          output = targetPath;
        } else if (node.children) {
          output = Object.keys(node.children).sort().map(k => node.children![k].type === 'dir' ? k + '/' : k).join('  ');
        }
      } else if (baseCommand === 'cd') {
        const targetPath = args[1] || '/';
        const node = resolveNode(targetPath);
        if (!node) {
          output = `bash: cd: ${targetPath}: No such file or directory`;
        } else if (node.type === 'file') {
          output = `bash: cd: ${targetPath}: Not a directory`;
        } else {
          // Calculate new cwd
          if (targetPath === '/') {
            setCwd([]);
          } else {
            let pathParts = targetPath.startsWith('/') ? targetPath.split('/').filter(Boolean) : [...cwd, ...targetPath.split('/').filter(Boolean)];
            const resolvedParts: string[] = [];
            for (const part of pathParts) {
              if (part === '.') continue;
              if (part === '..') { resolvedParts.pop(); continue; }
              resolvedParts.push(part);
            }
            setCwd(resolvedParts);
          }
        }
      } else if (baseCommand === 'cat') {
        if (!args[1]) {
          output = 'Usage: cat <file>';
        } else {
          const filesToCat = args.slice(1);
          const outputs = filesToCat.map(f => {
            const node = resolveNode(f);
            if (!node) return `cat: ${f}: No such file or directory`;
            if (node.type === 'dir') return `cat: ${f}: Is a directory`;
            return node.content || '';
          });
          output = outputs.join('\n');
        }
      } else if (baseCommand === 'grep') {
        if (args.length < 3) {
          output = 'Usage: grep <pattern> <file>';
        } else {
          const pattern = args[1];
          const file = args[2];
          const node = resolveNode(file);
          if (!node) {
            output = `grep: ${file}: No such file or directory`;
          } else if (node.type === 'dir') {
            output = `grep: ${file}: Is a directory`;
          } else {
            const lines = (node.content || '').split('\n');
            const matched = lines.filter(l => l.includes(pattern));
            output = matched.join('\n');
          }
        }
      }
    }

    if (!output && ['pwd', 'ls', 'cd', 'cat', 'grep'].includes(baseCommand) && !vfs) {
       output = `bash: ${baseCommand}: command not found (VFS not initialized for this lab)`;
    }

    // Custom Commands
    if (!output && baseCommand !== 'cd') { // cd has no output on success
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
    }

    if (output) {
      setHistory((prev) => [...prev, { type: 'output', content: output }]);
    }
  };

  const displayPrompt = `${prompt}:~${cwd.length > 0 ? '/' + cwd.join('/') : ''}$`;

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
        <span className="text-emerald-400 mr-2">{displayPrompt}</span>
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
