import { cn } from "../../utils/cn";
import { Loader2 } from "lucide-react";

export function Button({ 
  children, 
  className, 
  variant = "primary", 
  isLoading = false, 
  disabled, 
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950";
  
  const variants = {
    primary: "bg-primary-500 text-slate-950 hover:bg-primary-400 focus:ring-primary-500 shadow-[0_0_15px_rgba(20,184,166,0.2)] hover:shadow-[0_0_25px_rgba(20,184,166,0.4)]",
    secondary: "bg-white/10 text-white hover:bg-white/20 focus:ring-white/50 border border-white/5",
    outline: "border-2 border-primary-500/50 text-primary-400 hover:bg-primary-500/10 focus:ring-primary-500",
    danger: "bg-red-500/20 text-red-400 hover:bg-red-500/30 focus:ring-red-500 border border-red-500/20",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const selectedVariant = variants[variant] || variants.primary;
  const selectedSize = sizes[props.size] || sizes.md;

  return (
    <button 
      className={cn(baseStyles, selectedVariant, selectedSize, className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
      {children}
    </button>
  );
}
