"use client";

import { memo } from "react";
import { History } from "lucide-react";
import { useHistory } from "@/context/history-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import HistoryList from "./HistoryList";

// Isoler le menu d'historique dans un composant séparé pour éviter les re-rendus
const HistoryDropdown = memo(function HistoryDropdown() {
  const { history } = useHistory();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 bg-[#151a2a] hover:bg-[#1e263f] p-2 rounded-md border border-white/5 transition-colors relative">
        <History className="h-4 w-4 text-white/70" />
        {history.length > 0 && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-500 rounded-full" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#151a2a] border border-white/10 text-white rounded-md p-4 shadow-xl w-[350px] max-h-[400px] overflow-y-auto">
        <div className="mb-2 pb-2 border-b border-white/5">
          <h3 className="text-sm font-semibold">Historique</h3>
        </div>
        <HistoryList />
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default HistoryDropdown; 