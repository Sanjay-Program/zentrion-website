'use client';

import React, { useState } from 'react';
import { LabLayout } from '@/components/LabLayout';
import { GlassCard } from '@/components/ui';

export default function LabClient() {
  const [balance, setBalance] = useState(10);
  const [vaultBalance, setVaultBalance] = useState(100);
  const [logs, setLogs] = useState<string[]>([]);
  const [contractCode] = useState(`contract VulnerableVault {
    mapping(address => uint) public balances;

    function withdraw() public {
        uint bal = balances[msg.sender];
        require(bal > 0);

        // VULNERABILITY: External call before state update
        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");

        balances[msg.sender] = 0;
    }
}`);

  const handleNormalWithdraw = () => {
    if (balance <= 0) return;
    setLogs(prev => [...prev, `[Normal] Withdrawing ${balance} ETH...`]);
    setVaultBalance(prev => prev - balance);
    setBalance(0);
    setLogs(prev => [...prev, `[Normal] Withdrawal successful.`]);
  };

  const handleExploit = () => {
    if (balance <= 0) {
      setLogs(prev => [...prev, `[Exploit] You need at least 1 ETH to initiate the attack.`]);
      return;
    }
    
    setLogs(prev => [...prev, `[Exploit] Initiating reentrancy attack...`]);
    
    // Simulate recursive withdrawal
    let currentVault = vaultBalance;
    let stolen = 0;
    let i = 0;
    
    const interval = setInterval(() => {
      if (currentVault > 0 && i < 10) {
        const amountToSteal = Math.min(balance, currentVault);
        currentVault -= amountToSteal;
        stolen += amountToSteal;
        setLogs(prev => [...prev, `[Exploit] Fallback triggered! Re-entering withdraw(). Stole ${amountToSteal} ETH.`]);
        setVaultBalance(currentVault);
        i++;
      } else {
        clearInterval(interval);
        setLogs(prev => [...prev, `[Exploit] Attack finished. Total stolen: ${stolen} ETH.`]);
        setBalance(prev => prev + stolen);
      }
    }, 500);
  };

  const reset = () => {
    setBalance(10);
    setVaultBalance(100);
    setLogs([]);
  };

  return (
    <LabLayout
      labId="smart-contract-reentrancy"
      xpReward={350}
      title="Smart Contract Reentrancy"
      category="Web3 Security"
      difficulty="Advanced"
      objective="Drain the VulnerableVault smart contract by executing a reentrancy attack."
      scope="Simulated EVM"
      target="0xVault...9f2"
      hints={[
        "The contract sends ETH to your address BEFORE updating your balance to 0.",
        "If your address is a malicious smart contract, its fallback() function will be triggered when receiving ETH.",
        "Inside the fallback(), you can call withdraw() again before the first withdraw() finishes!"
      ]}
      flag="ZENTRION{r33ntr4ncy_dr41n3d_v4ult}"
      explanation={
        <>
          <p className="mb-4">
            A reentrancy attack occurs when a smart contract calls an external untrusted contract, and the untrusted contract makes a recursive call back to the original function before the first invocation finishes.
          </p>
          <p>
            In the <code>VulnerableVault</code>, the state variable <code>balances[msg.sender] = 0;</code> is updated <strong>after</strong> the ETH is sent. By using a malicious contract with a fallback function that calls <code>withdraw()</code> again, the attacker can repeatedly drain the vault because their balance hasn't been set to 0 yet!
          </p>
        </>
      }
      remediation={
        <p>
          Always use the <strong>Checks-Effects-Interactions</strong> pattern. Update all state variables (like balances) <em>before</em> calling external contracts or sending Ether. Alternatively, use OpenZeppelin's <code>ReentrancyGuard</code> modifier.
        </p>
      }
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h3 className="font-bold text-lg mb-4 text-emerald-400">Attacker Wallet</h3>
            <div className="text-4xl font-mono mb-2">{balance} <span className="text-sm text-mute">ETH</span></div>
            <p className="text-xs text-mute font-mono">0xAttacker...b7a</p>
            
            <div className="mt-6 flex gap-3">
              <button onClick={handleNormalWithdraw} disabled={balance <= 0 || vaultBalance <= 0} className="btn-ghost py-2 text-sm flex-1">
                Normal Withdraw
              </button>
              <button onClick={handleExploit} disabled={balance <= 0 || vaultBalance <= 0} className="btn-primary py-2 text-sm flex-1 bg-red-500 hover:bg-red-600 text-white border-none shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                Execute Exploit
              </button>
            </div>
          </GlassCard>
          
          <GlassCard className="p-6">
            <h3 className="font-bold text-lg mb-4 text-cyan">VulnerableVault Contract</h3>
            <div className="text-4xl font-mono mb-2">{vaultBalance} <span className="text-sm text-mute">ETH</span></div>
            <p className="text-xs text-mute font-mono">0xVault...9f2</p>
            
            <div className="mt-6">
              <button onClick={reset} className="btn-ghost py-2 text-sm w-full">Reset Simulation</button>
            </div>
          </GlassCard>
        </div>

        <GlassCard className="p-0 overflow-hidden">
          <div className="bg-surface/80 p-3 border-b border-line flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider">VulnerableVault.sol</span>
          </div>
          <div className="p-4 bg-[#0d1117] overflow-x-auto">
            <pre className="text-xs text-blue-300 font-mono leading-relaxed">
              {contractCode}
            </pre>
          </div>
        </GlassCard>

        <GlassCard className="p-4 bg-black h-48 overflow-y-auto font-mono text-xs crt-terminal">
          <div className="text-emerald-400 mb-2">Transaction Logs:</div>
          {logs.map((log, i) => (
            <div key={i} className={log.includes('Exploit') ? 'text-red-400' : 'text-gray-300'}>{log}</div>
          ))}
          {logs.length === 0 && <div className="text-mute">Awaiting transactions...</div>}
        </GlassCard>

      </div>
    </LabLayout>
  );
}
