import { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Wallet, LogOut, Copy, ExternalLink, RefreshCw } from "lucide-react";
import { fetchBalance } from "../utils/stellar";

export function WalletCard({ publicKey, setPublicKey }) {
  const [balance, setBalance] = useState("0");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const loadBalance = async () => {
    if (!publicKey) return;
    setLoading(true);
    setError(null);
    try {
      const b = await fetchBalance(publicKey);
      setBalance(b);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  const handleDisconnect = () => {
    setPublicKey(null);
    setBalance("0");
  };

  const copyToClipboard = () => {
    if (!publicKey) return;
    navigator.clipboard.writeText(publicKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const trimAddress = (addr) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-6)}`;
  };

  if (!publicKey) return null;

  return (
    <Card className="mb-0 border border-t-white/10 bg-white/5 shadow-2xl backdrop-blur-3xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 mix-blend-screen rounded-full blur-[80px] pointer-events-none" />
      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <div className="flex items-center gap-3 text-slate-100 font-bold text-lg tracking-tight">
            <div className="p-2 bg-primary-500/20 text-primary-400 rounded-xl">
              <Wallet className="w-5 h-5" />
            </div>
            <span>Dashboard</span>
          </div>
          <Button variant="danger" size="sm" onClick={handleDisconnect} className="gap-2 rounded-xl text-xs py-1.5 px-3">
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Disconnect</span>
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Public Key</span>
          <div className="flex items-center gap-2 bg-black/20 p-3 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <code className="text-sm text-primary-200 flex-1 truncate font-mono tracking-wider ml-1">
              {trimAddress(publicKey)}
            </code>
            <button 
              onClick={copyToClipboard}
              className="text-slate-400 hover:text-primary-400 transition-colors p-2 bg-white/5 rounded-xl hover:bg-white/10"
              title="Copy to clipboard"
            >
              {copied ? <span className="text-xs font-semibold text-primary-400">Copied!</span> : <Copy className="w-4 h-4" />}
            </button>
            <a 
              href={`https://stellar.expert/explorer/testnet/account/${publicKey}`}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-primary-400 transition-colors p-2 bg-white/5 rounded-xl hover:bg-white/10"
              title="View on Stellar Expert"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <div className="flex justify-between items-end mb-1">
            <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Balance</span>
            <button 
              onClick={loadBalance} 
              disabled={loading}
              className="text-primary-400 hover:text-primary-300 transition-colors disabled:opacity-50 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
          <div className="text-5xl font-black tracking-tighter text-white flex items-baseline gap-3">
            {loading ? (
              <span className="text-3xl text-slate-500 animate-pulse">Scanning...</span>
            ) : (
              <>
                {parseFloat(balance).toLocaleString(undefined, { maximumFractionDigits: 4 })}
                <span className="text-xl font-bold text-primary-500 tracking-normal">XLM</span>
              </>
            )}
          </div>
          {error && <p className="text-sm text-red-400 italic mt-2">{error}</p>}
        </div>
      </div>
    </Card>
  );
}

