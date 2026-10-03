'use client';

import React, { useState, useRef, useEffect } from 'react';
import LabWorkspace from '@/components/LabWorkspace';

export default function DockerEscapeLab() {
  const [history, setHistory] = useState<{ cmd: string, output: string }[]>([
    { cmd: 'whoami', output: 'root' },
    { cmd: 'hostname', output: 'container-9a8f7c6e5d' },
    { cmd: 'ls -la /', output: 'total 56\ndrwxr-xr-x   1 root root 4096 Oct  3 12:00 .\ndrwxr-xr-x   1 root root 4096 Oct  3 12:00 ..\n-rwxr-xr-x   1 root root    0 Oct  3 12:00 .dockerenv\ndrwxr-xr-x   2 root root 4096 Oct  3 12:00 bin\ndrwxr-xr-x   5 root root  360 Oct  3 12:00 dev\ndrwxr-xr-x   1 root root 4096 Oct  3 12:00 etc\ndrwxr-xr-x   1 root root 4096 Oct  3 12:00 mnt\ndr-xr-xr-x 131 root root    0 Oct  3 12:00 proc\ndrwxr-xr-x   1 root root 4096 Oct  3 12:00 var\n' }
  ]);
  const [input, setInput] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  
  // Simulated File System State
  const [isMounted, setIsMounted] = useState(false);
  
  const endOfTerminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().replace(/\s+/g, ' '); // Normalize spaces
    if (!cmd) return;

    let output = '';

    // Simple Terminal Simulation Logic
    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (cmd === 'ls' || cmd === 'ls -la' || cmd === 'ls /') {
      output = `bin  dev  etc  mnt  proc  var`;
    } else if (cmd === 'ls /mnt' || cmd === 'ls -la /mnt') {
      if (isMounted) {
        output = `bin  boot  dev  etc  home  lib  opt  root  sbin  srv  tmp  usr  var`;
      } else {
        output = ``;
      }
    } else if (cmd === 'whoami') {
      output = `root`;
    } else if (cmd === 'pwd') {
      output = `/`;
    } else if (cmd === 'hostname') {
      output = `container-9a8f7c6e5d`;
    } else if (cmd === 'id') {
      output = `uid=0(root) gid=0(root) groups=0(root)`;
    } else if (cmd === 'fdisk -l' || cmd === 'lsblk' || cmd === 'ls /dev' || cmd === 'fdisk -l /dev/sda') {
      output = `Disk /dev/sda: 20 GiB, 21474836480 bytes, 41943040 sectors\nUnits: sectors of 1 * 512 = 512 bytes\nSector size (logical/physical): 512 bytes / 512 bytes\nI/O size (minimum/optimal): 512 bytes / 512 bytes\nDisklabel type: dos\nDisk identifier: 0x00000000\n\nDevice     Boot Start      End  Sectors Size Id Type\n/dev/sda1  *     2048 41943039 41940992  20G 83 Linux`;
    } else if (cmd.startsWith('mount ')) {
      if (cmd.includes('/dev/sda1') && cmd.includes('/mnt')) {
        setIsMounted(true);
        output = ``; // Mount usually has no output on success
      } else {
        output = `mount: permission denied or bad usage. Usage: mount /dev/<device> <dir>`;
      }
    } else if (cmd === 'umount /mnt') {
      setIsMounted(false);
      output = ``;
    } else if (cmd.startsWith('cat ')) {
      const file = cmd.replace('cat ', '').trim();
      if (file === '/etc/shadow') {
        output = `root:*:19000:0:99999:7:::\ndaemon:*:19000:0:99999:7:::\n(This is the container's shadow file, not the host.)`;
      } else if (file === '/mnt/etc/shadow') {
        if (isMounted) {
          output = `root:$6$a1b2c3d4$e5f6g7h8i9j0:19000:0:99999:7:::\nubnt:$6$z9y8x7w6$v5u4t3s2r1q0:19000:0:99999:7:::\nadmin:$6$superSecretHash$ZENTRION{d0ck3r_3sc4p3_m0unt3d}:19000:0:99999:7:::`;
          setIsSolved(true);
        } else {
          output = `cat: /mnt/etc/shadow: No such file or directory`;
        }
      } else if (file === '/mnt/etc/passwd') {
        if (isMounted) {
          output = `root:x:0:0:root:/root:/bin/bash\nadmin:x:1000:1000:Admin:/home/admin:/bin/bash`;
        } else {
          output = `cat: /mnt/etc/passwd: No such file or directory`;
        }
      } else {
        output = `cat: ${file}: No such file or directory`;
      }
    } else if (cmd === 'capsh --print') {
      output = `Current: = cap_chown,cap_dac_override,cap_fowner,cap_fsetid,cap_kill,cap_setgid,cap_setuid,cap_setpcap,cap_net_bind_service,cap_net_raw,cap_sys_chroot,cap_mknod,cap_audit_write,cap_setfcap,cap_sys_admin+eip`;
    } else {
      output = `bash: ${cmd.split(' ')[0]}: command not found`;
    }

    setHistory([...history, { cmd, output }]);
    setInput('');
  };

  const missionBriefing = (
    <>
      <p className="mb-3">
        You have successfully gained Remote Code Execution (RCE) on a target web application, which has dropped you into a shell.
      </p>
      <p className="mb-3">
        After running <code>ls -la /</code>, you notice the <code>.dockerenv</code> file, confirming you are inside a Docker container. However, this container was started with the dangerous <code>--privileged</code> flag (or with <code>CAP_SYS_ADMIN</code> capabilities), which completely disables Docker's isolation.
      </p>
      <div className="p-3 bg-void rounded border border-line mt-4">
        <span className="text-xs font-mono text-emerald-500 block mb-1">Target:</span>
        <span className="text-sm text-white">Escape the container, access the underlying Host OS file system, and read the host's <code>/etc/shadow</code> file to find the flag.</span>
      </div>
    </>
  );

  const hints = [
    "Because the container is privileged, you can see and interact with the host's hardware devices in the /dev directory.",
    "Use 'fdisk -l' to list all attached disks. You should see the host's primary hard drive (usually /dev/sda1).",
    "You can mount the host's hard drive directly into your container's file system using: mount /dev/sda1 /mnt",
    "Once mounted, the host's entire file system is available in the /mnt directory. Now you just need to cat the shadow file!"
  ];

  return (
    <LabWorkspace
      labId="docker-escape"
      title="Container Escape (Privileged)"
      category="Cloud / DevOps"
      difficulty="Expert"
      missionBriefing={missionBriefing}
      hints={hints}
      isSolved={isSolved}
      flagId="ZENTRION{d0ck3r_3sc4p3_m0unt3d}"
    >
      <div className="flex flex-col h-full bg-[#0a0a0f]">
        
        {/* Top Navbar Simulation */}
        <div className="px-6 py-4 border-b border-line bg-surface/30 flex items-center justify-between">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
            Interactive Reverse Shell
          </h3>
          <span className="px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-mono rounded animate-pulse">
            Root Access (Containerized)
          </span>
        </div>

        {/* Workspace Layout */}
        <div className="flex-1 p-6 flex flex-col h-full">
          
          <div className="w-full flex-1 flex flex-col border border-line bg-void rounded-xl overflow-hidden font-mono shadow-[0_0_30px_rgba(47,107,255,0.05)]">
            
            {/* Terminal Header */}
            <div className="flex items-center gap-2 p-3 bg-surface border-b border-line">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-mute ml-2">root@container-9a8f7c6e5d:~#</span>
            </div>

            {/* Terminal Body */}
            <div 
              className="flex-1 p-4 overflow-y-auto text-sm text-gray-300 whitespace-pre-wrap"
              onClick={() => document.getElementById('terminal-input')?.focus()}
            >
              <div className="text-emerald-400 mb-6">
                Connected to reverse shell handler...<br/>
                Spawning TTY...<br/>
                $ export TERM=xterm
              </div>

              {history.map((h, i) => (
                <div key={i} className="mb-4">
                  <div className="flex text-white">
                    <span className="text-emerald-500 mr-2">root@container-9a8f7c6e5d:/#</span>
                    {h.cmd}
                  </div>
                  {h.output && (
                    <div className="mt-1 text-gray-400">
                      {h.output}
                    </div>
                  )}
                </div>
              ))}

              {/* Input Line */}
              <form onSubmit={handleCommand} className="flex text-white mt-2">
                <span className="text-emerald-500 mr-2">root@container-9a8f7c6e5d:/#</span>
                <input
                  id="terminal-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0"
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
              
              <div ref={endOfTerminalRef} />
            </div>
          </div>
        </div>
      </div>
    </LabWorkspace>
  );
}
