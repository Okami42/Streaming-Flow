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
import { Pencil, User } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { clearHistory } = useHistory();
  const { favorites, clearFavorites } = useFavorites();
  const { user, isAuthenticated, loading } = useAuth();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("history");

  // Debug: afficher l'état de l'authentification
  useEffect(() => {
    console.log("=== DEBUG PROFIL ===");
    console.log("État auth:", { isAuthenticated, user, loading });
    console.log("localStorage auth_token:", localStorage.getItem('auth_token'));
    console.log("localStorage user_data:", localStorage.getItem('user_data'));
    if (localStorage.getItem('user_data')) {
      try {
        const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
        console.log("User data parsé:", userData);
      } catch (e) {
        console.error("Erreur parsing user_data:", e);
      }
    }
    console.log("==================");
  }, [isAuthenticated, user, loading]);
  
  // Récupérer l'onglet depuis l'URL
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
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-72">
              <div className="bg-[#0F1729] p-6 rounded-lg border border-gray-800 mb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#151a2a] rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {isAuthenticated && user ? user.username : "Utilisateur"}
                    </h2>
                    <p className="text-xs text-gray-400">
                      Membre depuis {user?.createdAt ? new Date(user.createdAt).getFullYear() : 2024}
                    </p>
                    {/* Debug temporaire */}
                    <p className="text-xs text-red-400">
                      DEBUG: Auth={isAuthenticated ? "✓" : "✗"} | User={user ? "✓" : "✗"} | Loading={loading ? "✓" : "✗"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-between bg-transparent text-gray-300 border-gray-700 hover:bg-gray-800/50">
                    Éditer le profil
                    <Pencil className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-[#151a2a] border border-gray-800 w-full mb-6 p-1 rounded-md">
                  <TabsTrigger
                    value="history"
                    className="rounded-md data-[state=active]:bg-[#1a1f35] data-[state=active]:text-white"
                  >
                    Historique
                  </TabsTrigger>
                  <TabsTrigger
                    value="favorites"
                    className="rounded-md data-[state=active]:bg-[#1a1f35] data-[state=active]:text-white"
                  >
                    Favoris
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="rounded-md data-[state=active]:bg-[#1a1f35] data-[state=active]:text-white"
                  >
                    Notifications
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="history" className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Historique de visionnage</h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearHistory}
                      className="text-xs bg-transparent border-gray-700 hover:bg-gray-800/50"
                    >
                      Effacer l'historique
                    </Button>
                  </div>

                  <HistoryList limit={20} />
                </TabsContent>

                <TabsContent value="favorites">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Mes Favoris</h2>
                    {favorites.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearFavorites}
                        className="text-xs bg-transparent border-gray-700 hover:bg-gray-800/50"
                      >
                        Effacer les favoris
                      </Button>
                    )}
                  </div>
                  
                  <FavoritesList />
                </TabsContent>

                <TabsContent value="notifications">
                  <div className="text-center py-8">
                    <p className="text-gray-400">Vous n'avez pas de notifications.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
