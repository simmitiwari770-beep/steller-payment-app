import { cn } from "../../utils/cn";

export function Input({ label, error, className, id, ...props }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={id} className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full px-4 py-4 rounded-xl border border-white/10 bg-black/20 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-inner",
          error && "border-red-500 focus:ring-red-500 bg-red-500/5",
          className
        )}
        {...props}
      />
      {error && <span className="text-sm text-red-400 font-semibold pl-1">{error}</span>}
    </div>
  );
}
