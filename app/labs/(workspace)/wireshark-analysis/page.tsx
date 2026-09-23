'use client';

import { useState, useMemo } from 'react';
import LabWorkspace from '@/components/LabWorkspace';

type Packet = {
  id: number;
  time: string;
  src: string;
  dst: string;
  proto: string;
  length: number;
  info: string;
  details: string;
  hex: string;
};

const rawPackets: Packet[] = [
  { id: 1, time: "0.000000", src: "192.168.1.100", dst: "192.168.1.1", proto: "DNS", length: 73, info: "Standard query 0x1a2b A www.zentrion.local", details: "Domain Name System (query)\n    Queries\n        www.zentrion.local: type A, class IN", hex: "0000   00 1a 2b 01 00 00 01 00 00 00 00 00 00 03 77 77   ..+...........ww\n0010   77 08 7a 65 6e 74 72 69 6f 6e 05 6c 6f 63 61 6c   w.zentrion.local" },
  { id: 2, time: "0.002145", src: "192.168.1.1", dst: "192.168.1.100", proto: "DNS", length: 89, info: "Standard query response 0x1a2b A 192.168.1.5", details: "Domain Name System (response)\n    Answers\n        www.zentrion.local: type A, class IN, addr 192.168.1.5", hex: "0000   00 1a 2b 81 80 00 01 00 01 00 00 00 00 03 77 77   ..+...........ww\n0010   77 08 7a 65 6e 74 72 69 6f 6e 05 6c 6f 63 61 6c   w.zentrion.local" },
  { id: 3, time: "0.015233", src: "192.168.1.100", dst: "192.168.1.5", proto: "TCP", length: 74, info: "50552 > 21 [SYN] Seq=0 Win=64240 Len=0", details: "Transmission Control Protocol, Src Port: 50552, Dst Port: 21, Seq: 0, Len: 0\n    Flags: 0x002 (SYN)", hex: "0000   00 50 56 c0 00 08 00 0c 29 b7 23 41 08 00 45 00   .PV.....).#A..E." },
  { id: 4, time: "0.017321", src: "192.168.1.5", dst: "192.168.1.100", proto: "TCP", length: 74, info: "21 > 50552 [SYN, ACK] Seq=0 Ack=1 Win=28960 Len=0", details: "Transmission Control Protocol, Src Port: 21, Dst Port: 50552, Seq: 0, Ack: 1, Len: 0\n    Flags: 0x012 (SYN, ACK)", hex: "0000   00 0c 29 b7 23 41 00 50 56 c0 00 08 08 00 45 00   ..).#A.PV.....E." },
  { id: 5, time: "0.018112", src: "192.168.1.100", dst: "192.168.1.5", proto: "TCP", length: 66, info: "50552 > 21 [ACK] Seq=1 Ack=1 Win=64240 Len=0", details: "Transmission Control Protocol, Src Port: 50552, Dst Port: 21, Seq: 1, Ack: 1, Len: 0\n    Flags: 0x010 (ACK)", hex: "0000   00 50 56 c0 00 08 00 0c 29 b7 23 41 08 00 45 00   .PV.....).#A..E." },
  { id: 6, time: "0.025443", src: "192.168.1.5", dst: "192.168.1.100", proto: "FTP", length: 86, info: "Response: 220 (vsFTPd 3.0.3)", details: "File Transfer Protocol (FTP)\n    220 (vsFTPd 3.0.3)\\r\\n", hex: "0000   32 32 30 20 28 76 73 46 54 50 64 20 33 2e 30 2e   220 (vsFTPd 3.0.\n0010   33 29 0d 0a                                       3).." },
  { id: 7, time: "0.026122", src: "192.168.1.100", dst: "192.168.1.5", proto: "TCP", length: 66, info: "50552 > 21 [ACK] Seq=1 Ack=21 Win=64240 Len=0", details: "Transmission Control Protocol, Src Port: 50552, Dst Port: 21, Seq: 1, Ack: 21, Len: 0", hex: "0000   00 50 56 c0 00 08 00 0c 29 b7 23 41 08 00 45 00   .PV.....).#A..E." },
  { id: 8, time: "0.050432", src: "192.168.1.100", dst: "192.168.1.5", proto: "FTP", length: 78, info: "Request: USER admin", details: "File Transfer Protocol (FTP)\n    USER admin\\r\\n", hex: "0000   55 53 45 52 20 61 64 6d 69 6e 0d 0a               USER admin.." },
  { id: 9, time: "0.055998", src: "192.168.1.5", dst: "192.168.1.100", proto: "FTP", length: 100, info: "Response: 331 Please specify the password.", details: "File Transfer Protocol (FTP)\n    331 Please specify the password.\\r\\n", hex: "0000   33 33 31 20 50 6c 65 61 73 65 20 73 70 65 63 69   331 Please speci\n0010   66 79 20 74 68 65 20 70 61 73 73 77 6f 72 64 2e   fy the password." },
  { id: 10, time: "0.080112", src: "192.168.1.100", dst: "192.168.1.5", proto: "FTP", length: 104, info: "Request: PASS ZENTRION{ftp_cl34rt3xt_sn1ff3d}", details: "File Transfer Protocol (FTP)\n    PASS ZENTRION{ftp_cl34rt3xt_sn1ff3d}\\r\\n", hex: "0000   50 41 53 53 20 5a 45 4e 54 52 49 4f 4e 7b 66 74   PASS ZENTRION{ft\n0010   70 5f 63 6c 33 34 72 74 33 78 74 5f 73 6e 31 66   p_cl34rt3xt_sn1f\n0020   66 33 64 7d 0d 0a                                 f3d}.." },
  { id: 11, time: "0.082344", src: "192.168.1.5", dst: "192.168.1.100", proto: "FTP", length: 89, info: "Response: 230 Login successful.", details: "File Transfer Protocol (FTP)\n    230 Login successful.\\r\\n", hex: "0000   32 33 30 20 4c 6f 67 69 6e 20 73 75 63 63 65 73   230 Login succes\n0010   73 66 75 6c 2e 0d 0a                              sful..." },
  { id: 12, time: "0.085112", src: "192.168.1.100", dst: "239.255.255.250", proto: "SSDP", length: 216, info: "M-SEARCH * HTTP/1.1", details: "Simple Service Discovery Protocol\n    M-SEARCH * HTTP/1.1\\r\\n", hex: "0000   4d 2d 53 45 41 52 43 48 20 2a 20 48 54 54 50 2f   M-SEARCH * HTTP/\n0010   31 2e 31 0d 0a                                    1.1.." },
  { id: 13, time: "0.100555", src: "192.168.1.100", dst: "192.168.1.5", proto: "FTP", length: 72, info: "Request: SYST", details: "File Transfer Protocol (FTP)\n    SYST\\r\\n", hex: "0000   53 59 53 54 0d 0a                                 SYST.." },
  { id: 14, time: "0.102666", src: "192.168.1.5", dst: "192.168.1.100", proto: "FTP", length: 86, info: "Response: 215 UNIX Type: L8", details: "File Transfer Protocol (FTP)\n    215 UNIX Type: L8\\r\\n", hex: "0000   32 31 35 20 55 4e 49 58 20 54 79 70 65 3a 20 4c   215 UNIX Type: L\n0010   38 0d 0a                                          8.." },
];

export default function WiresharkLab() {
  const [filter, setFilter] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [selectedPacketId, setSelectedPacketId] = useState<number | null>(null);
  const [isSolved] = useState(false); // Can be tied to a flag submission logic in the future

  // Simple filter parser for typical wireshark syntax: ip.src == "x", proto == "x", or just string match
  const filteredPackets = useMemo(() => {
    if (!activeFilter.trim()) return rawPackets;
    const lowerFilter = activeFilter.toLowerCase();
    
    return rawPackets.filter(p => {
      // Basic syntax support
      if (lowerFilter.includes('ip.src ==') || lowerFilter.includes('ip.src==')) {
        const ip = lowerFilter.split('==')[1].replace(/['"]/g, '').trim();
        return p.src === ip;
      }
      if (lowerFilter.includes('ip.dst ==') || lowerFilter.includes('ip.dst==')) {
        const ip = lowerFilter.split('==')[1].replace(/['"]/g, '').trim();
        return p.dst === ip;
      }
      if (lowerFilter.includes('tcp.port ==') || lowerFilter.includes('tcp.port==')) {
        const port = lowerFilter.split('==')[1].trim();
        // Naive port check since we don't have separate port fields in this mock, we just check info string
        return p.info.includes(port) || p.info.includes(`> ${port}`);
      }
      if (lowerFilter.includes('ftp') && lowerFilter.length <= 4) {
        return p.proto.toLowerCase() === 'ftp';
      }
      
      // Fallback: general string match across all fields
      return (
        p.src.toLowerCase().includes(lowerFilter) ||
        p.dst.toLowerCase().includes(lowerFilter) ||
        p.proto.toLowerCase().includes(lowerFilter) ||
        p.info.toLowerCase().includes(lowerFilter)
      );
    });
  }, [activeFilter]);

  const selectedPacket = useMemo(() => {
    return rawPackets.find(p => p.id === selectedPacketId) || null;
  }, [selectedPacketId]);

  const handleApplyFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveFilter(filter);
  };

  const getRowColor = (proto: string) => {
    switch(proto) {
      case 'TCP': return 'bg-[#e7e6ff] text-[#12132b] hover:bg-[#d6d5f7]';
      case 'DNS': return 'bg-[#e7ffe6] text-[#122b13] hover:bg-[#d5f7d5]';
      case 'FTP': return 'bg-[#ffe6e6] text-[#2b1212] hover:bg-[#f7d5d5]';
      case 'SSDP': return 'bg-[#fffce6] text-[#2b2b12] hover:bg-[#f7f5d5]';
      default: return 'bg-white text-slate-800 hover:bg-slate-100';
    }
  };

  const missionBriefing = (
    <>
      <p>
        A malicious actor infiltrated the corporate network and intercepted traffic to our legacy internal file server. We captured a snippet of the network traffic (PCAP) during the incident.
      </p>
      <p>
        The attacker logged in via <strong>FTP (File Transfer Protocol)</strong>. Since FTP is unencrypted, passwords are sent in <strong>cleartext</strong> over the network.
      </p>
      <div className="p-3 bg-void rounded border border-line mt-4">
        <span className="text-xs font-mono text-cyan block mb-1">Target:</span>
        <span className="text-sm text-white">Find the stolen FTP password hidden in the network packets and submit it as the flag.</span>
      </div>
    </>
  );

  const hints = [
    "FTP is an unencrypted protocol. Try filtering the packets to only show 'ftp' traffic.",
    "Type 'ftp' in the filter bar and hit enter.",
    "Look for the FTP 'PASS' command, which sends the password to the server.",
    "Click on a packet to view its detailed contents in the bottom panes."
  ];

  return (
    <LabWorkspace
      labId="wireshark-analysis"
      title="Packet Analysis (Wireshark)"
      category="Network Defense"
      difficulty="Beginner"
      missionBriefing={missionBriefing}
      hints={hints}
      isSolved={isSolved}
      flagId="ZENTRION{ftp_cl34rt3xt_sn1ff3d}" // The flag is the password itself
    >
      <div className="flex flex-col h-full bg-[#f0f0f0] text-slate-800 font-sans text-sm overflow-hidden">
        
        {/* Toolbar & Filter */}
        <div className="bg-[#dfdfdf] border-b border-[#cccccc] p-2 flex flex-col gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <button className="p-1 hover:bg-[#cccccc] rounded" title="Start capturing packets (Disabled)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></button>
              <button className="p-1 hover:bg-[#cccccc] rounded" title="Stop capturing packets (Disabled)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="6" width="12" height="12"></rect></svg></button>
              <button className="p-1 hover:bg-[#cccccc] rounded" title="Restart current capture (Disabled)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg></button>
            </div>
            <div className="h-4 w-[1px] bg-[#999999] mx-1"></div>
            <span className="text-xs font-semibold text-slate-600">Wireshark Network Analyzer</span>
          </div>
          
          <form onSubmit={handleApplyFilter} className="flex gap-2 w-full">
            <div className={`flex-1 flex items-center border ${activeFilter && filteredPackets.length > 0 ? 'bg-[#d5f7d5] border-[#4caf50]' : activeFilter && filteredPackets.length === 0 ? 'bg-[#f7d5d5] border-[#f44336]' : 'bg-white border-[#cccccc]'} px-2`}>
              <span className="text-slate-500 mr-2 font-mono text-xs">Apply a display filter ...</span>
              <input 
                type="text" 
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none py-1 text-sm font-mono"
                placeholder="e.g. tcp.port == 21 or ip.src == 192.168.1.5"
              />
            </div>
            <button type="submit" className="px-4 py-1 bg-[#eeeeee] border border-[#cccccc] rounded hover:bg-[#dddddd] shadow-sm text-xs font-medium flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
              Apply
            </button>
            <button type="button" onClick={() => { setFilter(''); setActiveFilter(''); }} className="px-4 py-1 bg-[#eeeeee] border border-[#cccccc] rounded hover:bg-[#dddddd] shadow-sm text-xs font-medium">
              Clear
            </button>
          </form>
        </div>

        {/* Packet List Pane */}
        <div className="flex-1 overflow-auto bg-white border-b border-[#cccccc] min-h-[30%]">
          <table className="w-full text-left border-collapse table-fixed">
            <thead className="bg-[#f2f2f2] border-b border-[#cccccc] sticky top-0 shadow-sm z-10">
              <tr>
                <th className="font-normal text-xs py-1 px-2 border-r border-[#cccccc] w-12 truncate text-center">No.</th>
                <th className="font-normal text-xs py-1 px-2 border-r border-[#cccccc] w-24 truncate">Time</th>
                <th className="font-normal text-xs py-1 px-2 border-r border-[#cccccc] w-32 truncate">Source</th>
                <th className="font-normal text-xs py-1 px-2 border-r border-[#cccccc] w-32 truncate">Destination</th>
                <th className="font-normal text-xs py-1 px-2 border-r border-[#cccccc] w-20 truncate">Protocol</th>
                <th className="font-normal text-xs py-1 px-2 border-r border-[#cccccc] w-16 truncate">Length</th>
                <th className="font-normal text-xs py-1 px-2 truncate">Info</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[13px] cursor-default select-none">
              {filteredPackets.map((pkt) => (
                <tr 
                  key={pkt.id} 
                  onClick={() => setSelectedPacketId(pkt.id)}
                  className={`border-b border-[#dddddd]/50 ${selectedPacketId === pkt.id ? '!bg-[#4d4d4d] !text-white' : getRowColor(pkt.proto)}`}
                >
                  <td className="py-0.5 px-2 text-center border-r border-[#cccccc]/20">{pkt.id}</td>
                  <td className="py-0.5 px-2 border-r border-[#cccccc]/20 truncate">{pkt.time}</td>
                  <td className="py-0.5 px-2 border-r border-[#cccccc]/20 truncate">{pkt.src}</td>
                  <td className="py-0.5 px-2 border-r border-[#cccccc]/20 truncate">{pkt.dst}</td>
                  <td className="py-0.5 px-2 border-r border-[#cccccc]/20 truncate">{pkt.proto}</td>
                  <td className="py-0.5 px-2 border-r border-[#cccccc]/20 truncate">{pkt.length}</td>
                  <td className="py-0.5 px-2 truncate">{pkt.info}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Packet Details & Hex Dump Panes */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          {selectedPacket ? (
            <>
              {/* Packet Tree Pane */}
              <div className="flex-1 border-b border-[#cccccc] p-2 overflow-y-auto font-mono text-[13px] bg-white text-slate-800 leading-relaxed">
                <div><span className="cursor-pointer mr-1 text-slate-400">▶</span> Frame {selectedPacket.id}: {selectedPacket.length} bytes on wire ({selectedPacket.length * 8} bits)</div>
                <div><span className="cursor-pointer mr-1 text-slate-400">▶</span> Ethernet II, Src: 00:1a:2b:3c:4d:5e, Dst: 00:11:22:33:44:55</div>
                <div><span className="cursor-pointer mr-1 text-slate-400">▶</span> Internet Protocol Version 4, Src: {selectedPacket.src}, Dst: {selectedPacket.dst}</div>
                <div className="whitespace-pre">
                  <span className="cursor-pointer mr-1 text-slate-600 font-bold">▼</span> {selectedPacket.details}
                </div>
              </div>

              {/* Hex Dump Pane */}
              <div className="flex-1 p-2 overflow-y-auto font-mono text-xs bg-[#fdfdfd] text-slate-600">
                <pre>{selectedPacket.hex}</pre>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
              Select a packet in the list to view its details.
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="bg-[#eeeeee] border-t border-[#cccccc] h-6 flex items-center px-4 justify-between text-xs text-slate-500 shrink-0">
          <div>File: capture_incident_992.pcap</div>
          <div>Packets: {rawPackets.length} &middot; Displayed: {filteredPackets.length}</div>
          <div>Profile: Default</div>
        </div>
      </div>
    </LabWorkspace>
  );
}
