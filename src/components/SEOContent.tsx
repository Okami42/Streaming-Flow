import React from 'react';

const SEOContent: React.FC = () => {
  return (
    <section className="bg-[#0F1729] py-16 mt-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Okastream - Votre Destination #1 pour le Streaming Anime Gratuit
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <div className="grid md:grid-cols-2 gap-8 text-gray-300">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Pourquoi choisir Okastream ?
                </h2>
                <p className="mb-4">
                  <strong>Okastream</strong> est le site de streaming anime de référence qui vous offre 
                  un accès gratuit à la plus grande collection d'animes en VOSTFR et VF. 
                  Découvrez vos séries préférées comme One Piece, Naruto, Attack on Titan, 
                  Dragon Ball et bien plus encore sur <strong>okastream.fr</strong>.
                </p>
                <p className="mb-4">
                  Sur Okastream, profitez d'une expérience de streaming optimale avec :
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Streaming HD gratuit et sans inscription</li>
                  <li>Animes en VOSTFR et VF disponibles</li>
                  <li>Nouvelle episodes chaque jour</li>
                  <li>Interface moderne et responsive</li>
                  <li>Pas de publicités intrusives</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Catalogue Okastream
                </h2>
                <p className="mb-4">
                  Le catalogue <strong>Okastream</strong> comprend plus de 1000 animes populaires 
                  et récents. Que vous soyez fan de shonen, seinen, ou anime slice of life, 
                  vous trouverez votre bonheur sur notre plateforme.
                </p>
                <p className="mb-4">
                  Animes populaires sur Okastream :
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>One Piece - Episodes en VOSTFR et VF</li>
                  <li>Naruto Shippuden - Streaming complet</li>
                  <li>Attack on Titan - Saisons complètes</li>
                  <li>Dragon Ball Super - Tous les épisodes</li>
                  <li>Demon Slayer - Dernière saison disponible</li>
                  <li>My Hero Academia - Episodes récents</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-[#151a2a] rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4">
                Comment utiliser Okastream ?
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h3 className="font-semibold text-blue-400 mb-2">1. Naviguez</h3>
                  <p>Explorez notre catalogue d'animes organisé par genre, popularité et nouveautés sur okastream.fr</p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-400 mb-2">2. Choisissez</h3>
                  <p>Sélectionnez votre anime préféré et l'épisode que vous souhaitez regarder en streaming</p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-400 mb-2">3. Regardez</h3>
                  <p>Profitez du streaming HD gratuit en VOSTFR ou VF directement sur Okastream</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                Rejoignez les milliers d'otakus qui font confiance à <strong>Okastream</strong> 
                pour regarder leurs animes préférés en streaming gratuit. 
                Okastream.fr - L'univers de l'anime à portée de clic !
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOContent;
