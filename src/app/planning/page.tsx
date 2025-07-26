import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { tuesdayReleases } from "@/lib/data";
import AnimeCard from "@/components/AnimeCard";
import { CalendarDays } from "lucide-react";

export default function PlanningPage() {
  const days = [
    { name: "Lundi", animes: [] },
    { name: "Mardi", animes: tuesdayReleases },
    { name: "Mercredi", animes: [] },
    { name: "Jeudi", animes: [] },
    { name: "Vendredi", animes: [] },
    { name: "Samedi", animes: [] },
    { name: "Dimanche", animes: [] },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center gap-3">
            <CalendarDays className="h-7 w-7 text-gray-400" />
            <h1 className="text-2xl font-bold text-white">Planning Hebdomadaire</h1>
          </div>

          <div className="space-y-10">
            {days.map((day) => (
              <div key={day.name} className="border-b border-gray-800 pb-8">
                <h2 className="text-xl font-bold text-white mb-4">{day.name}</h2>

                {day.animes.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {day.animes.map((anime) => (
                      <AnimeCard
                        key={anime.id}
                        title={anime.title}
                        imageUrl={anime.imageUrl}
                        type={anime.type as "Anime" | "Scans"}
                        language={anime.language as "VO" | "VF" | "VF & VO"}
                        href={`/catalogue/${anime.id}`}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Aucune sortie prévue ce jour.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
