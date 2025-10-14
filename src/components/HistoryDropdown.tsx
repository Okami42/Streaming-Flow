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
      <DropdownMenuTrigger className="text-white/80 hover:text-white transition-colors relative">
        <History className="h-5 w-5" />
        {history.length > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black border border-gray-800 text-white rounded-md p-4 shadow-xl w-[350px] max-h-[400px] overflow-y-auto">
        <div className="mb-2 pb-2 border-b border-gray-800">
          <h3 className="text-sm font-semibold">Historique</h3>
        </div>
        <HistoryList />
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default HistoryDropdown; 
