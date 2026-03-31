import { useState } from "react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Send, AlertCircle, CheckCircle2, ExternalLink } from "lucide-react";
import { sendPayment } from "../utils/stellar";

export function TransactionForm({ publicKey }) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: string, hash?: string }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipient || !amount) return;
    
    // Basic validation
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setStatus({ type: "error", message: "Amount must be greater than 0" });
      return;
    }
    
    if (recipient === publicKey) {
      setStatus({ type: "error", message: "Cannot send to yourself" });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const response = await sendPayment(publicKey, recipient, parseFloat(amount));
      if (response.success) {
        setStatus({
          type: "success",
          message: "Transaction successful!",
          hash: response.hash,
        });
        setRecipient("");
        setAmount("");
      }
    } catch (err) {
      setStatus({ type: "error", message: err.message || "An unknown error occurred" });
    } finally {
      setLoading(false);
    }
  };

  if (!publicKey) return null;

  return (
    <Card>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 text-slate-100 font-bold text-lg tracking-tight">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl">
            <Send className="w-5 h-5" />
          </div>
          <span>Send XLM</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Recipient Address"
            id="recipient"
            placeholder="G..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            disabled={loading}
          />
          
          <Input
            label="Amount (XLM)"
            id="amount"
            type="number"
            step="0.0000001"
            min="0"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
          />

          {status && (
            <div
              className={`p-4 rounded-2xl flex flex-col gap-3 text-sm border backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                status.type === "success"
                  ? "bg-green-500/10 text-green-300 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                  : "bg-red-500/10 text-red-300 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {status.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                )}
                <span className="font-bold text-base">{status.message}</span>
              </div>
              
              {status.hash && (
                <div className="mt-1 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-500/70 font-semibold uppercase tracking-widest">
                      Transaction Hash
                    </span>
                    <a
                      href={`https://stellar.expert/explorer/testnet/tx/${status.hash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300 transition-colors text-xs font-bold"
                      title="View on Stellar Expert"
                    >
                      Explorer <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <code className="text-xs break-all bg-black/40 p-3 rounded-xl border border-green-500/10 font-mono text-green-200/80 max-h-24 overflow-y-auto">
                    {status.hash}
                  </code>
                </div>
              )}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full mt-4 h-14 text-lg rounded-2xl shadow-[0_0_15px_rgba(20,184,166,0.15)] hover:shadow-[0_0_25px_rgba(20,184,166,0.3)] transition-all" 
            isLoading={loading}
            disabled={!recipient || !amount}
          >
            {loading ? "Sending..." : "Confirm Transfer"}
          </Button>
        </form>
      </div>
    </Card>
  );
}
