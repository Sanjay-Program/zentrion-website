'use client';

export default function ClientTester() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="glass-card p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-4">CSP Violation Trigger</h2>
        <p className="text-sm text-[rgb(var(--c-mute))] mb-6">
          Test if the Content-Security-Policy successfully blocks inline execution.
        </p>
        <button
          className="btn-primary w-full"
          onClick={() => {
            try {
              // eslint-disable-next-line no-eval
              eval('console.log("EVAL EXECUTED - THIS SHOULD FAIL IF CSP IS SECURE")');
              alert('VULNERABILITY: eval() succeeded!');
            } catch (e) {
              alert('SECURE: eval() was successfully blocked by browser/CSP. ' + e);
            }
          }}
        >
          Test eval() Execution
        </button>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Cross-Origin Messaging</h2>
        <p className="text-sm text-[rgb(var(--c-mute))] mb-6">
          Test postMessage listener boundaries and validation.
        </p>
        <button
          className="btn-secondary w-full"
          onClick={() => {
            window.postMessage({ type: 'TEST_MESSAGE', payload: 'malicious_payload' }, '*');
            console.log('Fired test postMessage.');
          }}
        >
          Fire Test postMessage
        </button>
      </div>
    </div>
  );
}
