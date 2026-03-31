import { useState, useEffect } from "react";
import { checkFreighterInstalled, connectWallet, checkAlreadyConnected } from "../utils/stellar";
import { WalletCard } from "../components/WalletCard";
import { TransactionForm } from "../components/TransactionForm";
import { Button } from "../components/ui/Button";
import { Rocket, ShieldAlert, Sparkles } from "lucide-react";

export function Home() {
  const [publicKey, setPublicKey] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        // Simulate a brief secure initialization for professional feel
        await new Promise(resolve => setTimeout(resolve, 800));
        const installed = await checkFreighterInstalled();
        setIsInstalled(installed);
      } finally {
        setIsInitializing(false);
      }
    }
    init();
  }, []);

  const handleConnect = async () => {
    setLoading(true);
    setError(null);
    try {
      const pk = await connectWallet();
      setPublicKey(pk);
      setShowModal(false); // Close modal on success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-950 font-sans text-slate-100 selection:bg-primary-500/30">
      
      {/* Top Navigation */}
      <nav className="w-full border-b border-white/5 bg-slate-950/50 backdrop-blur-md z-50 sticky top-0 py-4 px-6 sm:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Rocket className="w-6 h-6 text-primary-400" />
          <span>Stellar<span className="text-primary-400">Pay</span></span>
        </div>
        {!publicKey && !isInitializing && isInstalled && (
          <Button size="sm" onClick={() => setShowModal(true)} className="rounded-full px-6 bg-white/5 border border-white/10 hover:bg-white/10 shadow-none text-slate-300">
            Connect
          </Button>
        )}
      </nav>

      <div className="relative w-full flex-1 flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-20 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-[28rem] h-[28rem] bg-indigo-500/10 rounded-full blur-[100px] mix-blend-screen animate-pulse animation-delay-2000" />
        </div>

        <header className="mb-14 text-center z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-500/10 border border-primary-500/20 text-primary-300 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest shadow-[0_0_15px_rgba(20,184,166,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            Testnet Alpha
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Stellar <span className="text-primary-400">Payment dApp</span>
          </h1>
          
          <p className="text-lg text-slate-400 font-medium">
            A premium, secure frontend to check your dashboard and send funds flawlessly on the Stellar Testnet.
          </p>
        </header>

        <main className="w-full max-w-3xl z-10 flex flex-col items-center min-h-[400px]">
          {isInitializing ? (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-1000">
              <div className="w-16 h-16 rounded-full border-4 border-white/5 border-t-primary-500 animate-spin mb-6 shadow-[0_0_30px_rgba(20,184,166,0.3)]"></div>
              <h2 className="text-xl font-bold text-slate-300 tracking-wide">Initializing secure environment...</h2>
              <p className="text-sm text-slate-500 mt-2">Connecting to Stellar Testnet</p>
            </div>
          ) : !isInstalled ? (
            <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 max-w-md w-full backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ShieldAlert className="w-8 h-8 text-amber-500 shrink-0" />
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-bold text-amber-400 mb-2">Freighter Wallet Missing</h3>
                <p className="text-sm text-slate-300 mb-5 leading-relaxed">
                  You need the Freighter browser extension to securely interact with the Stellar network.
                </p>
                <a 
                  href="https://freighter.app" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold transition-all text-sm shadow-lg hover:shadow-amber-500/25"
                >
                  Download Freighter Explorer
                </a>
              </div>
            </div>
          ) : !publicKey ? (
            <div className="flex flex-col items-center py-12 px-6 w-full max-w-md rounded-3xl border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in-95 duration-500">
              <div className="w-16 h-16 bg-gradient-to-tr from-primary-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg mb-6 rotate-3">
                <Rocket className="w-8 h-8 text-white -rotate-3" />
              </div>
              <h2 className="text-2xl font-bold mb-2 tracking-tight">Access Dashboard</h2>
              <p className="text-slate-400 text-center text-sm mb-8 leading-relaxed max-w-xs">
                Select your preferred Stellar wallet to verify identity and securely access your testnet funds.
              </p>
              
              <Button 
                size="lg" 
                onClick={() => setShowModal(true)} 
                className="w-full text-lg h-14 rounded-2xl shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_40px_rgba(20,184,166,0.4)]"
              >
                Connect Wallet
              </Button>
            </div>
          ) : (
            <div className="w-full space-y-8 fade-in">
              <WalletCard publicKey={publicKey} setPublicKey={setPublicKey} />
              <TransactionForm publicKey={publicKey} />
            </div>
          )}
        </main>
        
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-white/10 w-full max-w-sm rounded-[2rem] p-6 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center">
            
            <h3 className="text-xl font-bold mb-1 w-full text-center tracking-tight">Connect a Wallet</h3>
            <p className="text-sm text-slate-400 mb-6 text-center">Select a provider to connect.</p>

            <button
              onClick={handleConnect}
              disabled={loading}
              className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary-500/50 p-4 rounded-2xl transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                  <span className="text-primary-400 font-bold text-lg">F</span>
                </div>
                <span className="font-bold text-lg">Freighter</span>
              </div>
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-500 border-t-primary-500 rounded-full animate-spin"></div>
              ) : (
                <div className="px-3 py-1 bg-white/5 rounded-full text-xs font-semibold text-slate-400 group-hover:text-primary-300 transition-colors">
                  Installed
                </div>
              )}
            </button>
            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl w-full text-center">
                <p className="text-red-400 text-sm font-semibold">{error}</p>
              </div>
            )}
            <button 
              onClick={() => setShowModal(false)}
              className="mt-6 text-sm font-semibold text-slate-500 hover:text-slate-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <footer className="py-8 text-center text-slate-500 text-sm z-10 w-full border-t border-white/5 mt-auto">
        Built for the <span className="text-slate-300">Stellar Ecosystem</span> • Testnet
      </footer>
    </div>
  );
}
