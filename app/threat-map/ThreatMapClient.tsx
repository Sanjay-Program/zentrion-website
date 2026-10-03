'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AttackEvent {
  id: string;
  source: { x: number, y: number, country: string };
  target: { x: number, y: number, country: string };
  type: string;
  color: string;
  timestamp: number;
}

const ATTACK_TYPES = [
  { name: 'DDoS Amplification', color: '#ff3366' },
  { name: 'SQL Injection', color: '#00e5ff' },
  { name: 'Ransomware Payload', color: '#ffcc00' },
  { name: 'Zero-Day Exploit', color: '#bf00ff' },
  { name: 'Phishing Campaign', color: '#00ff66' }
];

const NODES = [
  { country: 'United States', x: 20, y: 35 },
  { country: 'Brazil', x: 32, y: 65 },
  { country: 'United Kingdom', x: 45, y: 30 },
  { country: 'Russia', x: 70, y: 25 },
  { country: 'China', x: 75, y: 40 },
  { country: 'Japan', x: 85, y: 35 },
  { country: 'Australia', x: 80, y: 75 },
  { country: 'South Africa', x: 55, y: 70 },
  { country: 'India', x: 65, y: 45 },
  { country: 'Germany', x: 50, y: 32 }
];

export default function ThreatMapClient() {
  const [attacks, setAttacks] = useState<AttackEvent[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    let active = true;

    const generateAttack = () => {
      if (!active) return;
      
      const sourceNode = NODES[Math.floor(Math.random() * NODES.length)];
      let targetNode = NODES[Math.floor(Math.random() * NODES.length)];
      while (targetNode.country === sourceNode.country) {
        targetNode = NODES[Math.floor(Math.random() * NODES.length)];
      }

      const type = ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)];
      const attackId = Math.random().toString(36).substring(7);

      const newAttack: AttackEvent = {
        id: attackId,
        source: sourceNode,
        target: targetNode,
        type: type.name,
        color: type.color,
        timestamp: Date.now()
      };

      setAttacks(prev => {
        // keep only last 15
        const next = [...prev, newAttack];
        if (next.length > 15) next.shift();
        return next;
      });

      setLogs(prev => {
        const timeStr = new Date().toISOString().split('T')[1].substring(0, 8);
        const next = [`[${timeStr}] ALERT: ${type.name} detected originating from ${sourceNode.country} targeting ${targetNode.country}`, ...prev];
        if (next.length > 50) next.pop();
        return next;
      });

      setTimeout(generateAttack, Math.random() * 2000 + 500); // 0.5s to 2.5s
    };

    generateAttack();

    return () => { active = false; };
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#02040a] overflow-hidden font-mono flex flex-col">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(rgba(47, 107, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(47, 107, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      <header className="relative z-10 p-6 flex justify-between items-center border-b border-cyan/20 bg-black/50 backdrop-blur">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
            Global Threat Intel
          </h1>
          <p className="text-cyan text-xs tracking-widest mt-1">LIVE TELEMETRY STREAM // CONFIDENTIAL</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-mute mb-1 uppercase">Active Threats</div>
          <div className="text-3xl font-bold text-red-500">{attacks.length * 142}</div>
        </div>
      </header>

      <div className="flex-1 relative">
        {/* Map Visualization Area */}
        <div className="absolute inset-4 md:inset-10 border border-cyan/30 rounded-2xl bg-[#05070d]/80 backdrop-blur overflow-hidden">
          
          {/* Radar Sweep */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            <motion.div 
              className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(47, 107, 255, 0.8) 100%)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* SVG Map Container */}
          <svg className="w-full h-full absolute inset-0 z-10 pointer-events-none">
            <AnimatePresence>
              {attacks.map(attack => (
                <g key={attack.id}>
                  {/* Source Ripple */}
                  <motion.circle
                    cx={`${attack.source.x}%`}
                    cy={`${attack.source.y}%`}
                    r="2"
                    fill={attack.color}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 10 }}
                    transition={{ duration: 1.5 }}
                  />
                  {/* Attack Path */}
                  <motion.path
                    d={`M ${attack.source.x}% ${attack.source.y}% Q 50% 50% ${attack.target.x}% ${attack.target.y}%`}
                    fill="none"
                    stroke={attack.color}
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 1 }}
                    animate={{ pathLength: 1, opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                  {/* Target Explosion */}
                  <motion.circle
                    cx={`${attack.target.x}%`}
                    cy={`${attack.target.y}%`}
                    r="4"
                    fill="none"
                    stroke={attack.color}
                    strokeWidth="2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 2, 4] }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </g>
              ))}
            </AnimatePresence>
            
            {/* Render Nodes */}
            {NODES.map(node => (
              <g key={node.country}>
                <circle cx={`${node.x}%`} cy={`${node.y}%`} r="3" fill="rgba(47, 107, 255, 0.5)" />
                <text x={`${node.x}%`} y={`${node.y - 2}%`} fill="rgba(47, 107, 255, 0.8)" fontSize="10" textAnchor="middle">
                  {node.country}
                </text>
              </g>
            ))}
          </svg>

          {/* Legend Overlay */}
          <div className="absolute bottom-6 right-6 bg-black/80 border border-line p-4 rounded-lg z-20 backdrop-blur">
            <h3 className="text-white text-xs font-bold mb-3 uppercase tracking-wider border-b border-line pb-2">Attack Vectors</h3>
            <ul className="space-y-2">
              {ATTACK_TYPES.map(type => (
                <li key={type.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: type.color }}></span>
                  <span className="text-mute">{type.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Terminal Log */}
      <div className="h-48 border-t border-cyan/20 bg-black/80 backdrop-blur p-4 overflow-hidden relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent z-10 pointer-events-none h-4"></div>
        <div className="flex flex-col gap-1 text-[11px] h-full overflow-y-auto">
          {logs.map((log, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              key={i} 
              className={log.includes('DDoS') ? 'text-red-400' : log.includes('Zero-Day') ? 'text-violet' : 'text-cyan'}
            >
              {log}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
