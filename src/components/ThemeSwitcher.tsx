"use client";

import { Check, Palette } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/theme-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function ThemeSwitcher() {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex items-center gap-1 bg-[#151a2a] hover:bg-[#1e263f] p-2 rounded-md border border-white/5 transition-colors">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: currentTheme.primaryColor }}
        />
        <Palette className="h-4 w-4 text-white/70" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-[#151a2a] border border-white/10 text-white rounded-md p-1 shadow-xl w-40">
        {availableThemes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded hover:bg-white/10",
              currentTheme.id === theme.id && "bg-white/5"
            )}
          >
            <div className="flex items-center gap-2 flex-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: theme.primaryColor }}
              />
              <span className="text-sm">{theme.name}</span>
            </div>

            {currentTheme.id === theme.id && (
              <Check className="h-4 w-4 text-white" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
