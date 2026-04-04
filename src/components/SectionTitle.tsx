import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function SectionTitle({ title, icon, className }: SectionTitleProps) {
  return (
    <div className={cn("flex items-center mb-6", className)}>
      <div className="flex items-center gap-2 sm:gap-3 relative">
        {/* Decorative line */}
        <div className="absolute left-0 -bottom-2 w-1/3 h-[2px] bg-gradient-to-r from-pink-500 to-transparent"></div>

        <div className="flex items-center justify-center rounded-md bg-gradient-to-r from-pink-500/20 to-blue-500/10 p-1 sm:p-1.5 text-white">
          {icon}
        </div>

        <h2 className="text-white uppercase text-[10px] sm:text-sm md:text-xl font-bold tracking-wide">
          {title}
          <span className="ml-1 sm:ml-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">・</span>
        </h2>
      </div>
    </div>
  );
}
