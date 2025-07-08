import Header from "@/components/Header";
import SeriesFooter from "@/components/SeriesFooter";
import { SeriesCard, SeriesProps } from "@/components/SeriesCard";
import { CalendarDays } from "lucide-react";
import { popularSeries, recentFilms, classicFilms } from "@/lib/seriesData";

export default function SeriesPlanningPage() {
  const breakingBadImageUrl = "https://fr.web.img5.acsta.net/pictures/19/06/18/12/11/3956503.jpg";
  
  const seriesData: SeriesProps[] = [
    ...popularSeries.map(serie => ({
      id: serie?.id || '',
      title: serie?.title || '',
      imageUrl: serie?.id === 'breaking-bad' ? breakingBadImageUrl : (serie?.imageUrl || ''),
      time: `${serie?.seasons || ''} saisons`,
      type: "Série" as const,
      language: "VF" as const
    })),
    ...recentFilms.map(film => ({
      id: film?.id || '',
      title: film?.title || '',
      imageUrl: film?.imageUrl || '',
      time: film?.runtime || '',
      type: "Film" as const,
      language: "VF" as const
    }))
  ];

  const days = [
    { name: "Lundi", content: seriesData.slice(0, 2) },
    { name: "Mardi", content: seriesData.slice(2, 4) },
    { name: "Mercredi", content: recentFilms.map(film => ({
      id: film?.id || '',
      title: film?.title || '',
      imageUrl: film?.imageUrl || '',
      time: film?.runtime || '',
      type: "Film" as const,
      language: "VF" as const
    })) },
    { name: "Jeudi", content: seriesData.slice(0, 3) },
    { name: "Vendredi", content: seriesData.slice(1, 4) },
    { name: "Samedi", content: classicFilms.map(film => ({
      id: film?.id || '',
      title: film?.title || '',
      imageUrl: film?.imageUrl || '',
      time: film?.runtime || '',
      type: "Film" as const,
      language: "VF" as const
    })) },
    { name: "Dimanche", content: popularSeries.slice(0, 2).map(serie => ({
      id: serie?.id || '',
      title: serie?.title || '',
      imageUrl: serie?.id === 'breaking-bad' ? breakingBadImageUrl : (serie?.imageUrl || ''),
      time: `${serie?.seasons || ''} saisons`,
      type: "Série" as const,
      language: "VF" as const
    })) },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center gap-3">
            <CalendarDays className="h-7 w-7 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">Planning Hebdomadaire des Séries & Films</h1>
          </div>

          <div className="space-y-10">
            {days.map((day) => (
              <div key={day.name} className="border-b border-gray-800 pb-8">
                <h2 className="text-xl font-bold text-white mb-4">{day.name}</h2>

                {day.content.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {day.content.map((item, index) => (
                      <SeriesCard
                        key={`${item.id}-${index}`}
                        id={item.id}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        time={item.time}
                        type={item.type}
                        language={item.language}
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

      <SeriesFooter />
    </div>
  );
} 