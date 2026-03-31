import { cn } from "../../utils/cn";

export function Card({ children, className, ...props }) {
  return (
    <div 
      className={cn("glass-panel p-6 sm:p-8 w-full max-w-md mx-auto transition-all", className)} 
      {...props}
    >
      {children}
    </div>
  );
}
