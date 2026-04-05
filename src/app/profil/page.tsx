"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HistoryList from "@/components/HistoryList";
import FavoritesList from "@/components/FavoritesList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHistory } from "@/context/history-context";
import { useFavorites } from "@/context/favorites-context";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Clock, Heart, Bell, Trash2, User, LogOut } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { history, clearHistory } = useHistory();
  const { favorites, clearFavorites } = useFavorites();
  const { user, isAuthenticated, logout } = useAuth();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("history");

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "history" || tabParam === "favorites" || tabParam === "notifications") {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8 max-w-5xl">

          {/* Profile Header */}
          <div className="relative mb-8 rounded-xl overflow-hidden">
            {/* Banner gradient */}
            <div className="h-32 bg-gradient-to-r from-pink-500/20 via-blue-500/20 to-purple-500/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent" />

            <div className="relative -mt-12 px-6 pb-6 flex flex-col sm:flex-row items-center sm:items-end gap-4">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-blue-500 p-[2px] flex-shrink-0">
                <div className="w-full h-full rounded-full bg-[#0F1729] flex items-center justify-center">
                  <User className="h-9 w-9 text-gray-300" />
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-white">
                  {isAuthenticated && user ? user.username : "Utilisateur"}
                </h1>
                <p className="text-sm text-gray-400">
                  Membre depuis {user?.createdAt ? new Date(user.createdAt).getFullYear() : 2024}
                </p>
              </div>

              {isAuthenticated && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => logout?.()}
                  className="bg-transparent border-gray-700 text-gray-400 hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/5"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              )}
            </div>

            {/* Stats row */}
            <div className="px-6 pb-6 grid grid-cols-3 gap-4 max-w-md mx-auto sm:mx-0 sm:ml-6">
              <div className="text-center px-4 py-3 rounded-lg bg-white/5 border border-white/5">
                <p className="text-xl font-bold text-white">{history.length}</p>
                <p className="text-xs text-gray-400">Vus</p>
              </div>
              <div className="text-center px-4 py-3 rounded-lg bg-white/5 border border-white/5">
                <p className="text-xl font-bold text-white">{favorites.length}</p>
                <p className="text-xs text-gray-400">Favoris</p>
              </div>
              <div className="text-center px-4 py-3 rounded-lg bg-white/5 border border-white/5">
                <p className="text-xl font-bold text-white">0</p>
                <p className="text-xs text-gray-400">Notifs</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-[#0F1729] border border-white/5 w-full mb-6 p-1 rounded-xl h-auto">
              <TabsTrigger
                value="history"
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/10 data-[state=active]:to-blue-500/10 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/10 flex items-center gap-2 py-2.5"
              >
                <Clock className="h-4 w-4" />
                Historique
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/10 data-[state=active]:to-blue-500/10 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/10 flex items-center gap-2 py-2.5"
              >
                <Heart className="h-4 w-4" />
                Favoris
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/10 data-[state=active]:to-blue-500/10 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/10 flex items-center gap-2 py-2.5"
              >
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="mt-0">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-white">Historique de visionnage</h2>
                {history.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearHistory}
                    className="text-xs text-gray-400 hover:text-red-400 hover:bg-red-500/5"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                    Tout effacer
                  </Button>
                )}
              </div>
              <HistoryList limit={20} />
            </TabsContent>

            <TabsContent value="favorites" className="mt-0">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-white">Mes Favoris</h2>
                {favorites.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFavorites}
                    className="text-xs text-gray-400 hover:text-red-400 hover:bg-red-500/5"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                    Tout effacer
                  </Button>
                )}
              </div>
              <FavoritesList />
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <div className="text-center py-16">
                <Bell className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 font-medium">Aucune notification</p>
                <p className="text-gray-500 text-sm mt-1">Vous serez notifié des nouveaux épisodes ici.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
