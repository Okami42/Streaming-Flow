'use client';

import { useState } from 'react';

export default function DebugEpisodePage() {
  const [result, setResult] = useState<string>('');

  const testFileAccess = async () => {
    const folders = ['anime_episodes_js', 'anime_episodes_js_2'];
    const testFile = 'shingeki-no-kyojin/saison1/episodes_vostfr.js';
    
    for (const folder of folders) {
      const url = `/${folder}/${testFile}`;
      
      try {
        console.log(`🔍 Test accès fichier dans ${folder}:`, url);
        setResult(prev => prev + `🔍 Test accès fichier dans ${folder}: ${url}\n`);
        
        const response = await fetch(url);
        console.log('📡 Status:', response.status, response.statusText);
        setResult(prev => prev + `📡 Status: ${response.status} ${response.statusText}\n`);
        
        if (response.ok) {
          const content = await response.text();
          console.log('📄 Contenu (100 premiers chars):', content.substring(0, 100));
          setResult(prev => prev + `📄 Contenu (100 premiers chars): ${content.substring(0, 100)}\n`);
          
          // Test parsing
          const arrayMatch = content.match(/var\s+\w+\s*=\s*\[([\s\S]*?)\];/);
          if (arrayMatch) {
            const urlMatches = arrayMatch[1].match(/'([^']+)'/g);
            console.log('🎯 URLs trouvées:', urlMatches?.length || 0);
            setResult(prev => prev + `🎯 URLs trouvées: ${urlMatches?.length || 0}\n`);
            
            if (urlMatches) {
              const firstUrls = urlMatches.slice(0, 3).map(u => u.slice(1, -1));
              console.log('📋 Premières URLs:', firstUrls);
              setResult(prev => prev + `📋 Premières URLs: ${firstUrls.join(', ')}\n`);
              
              // Extraire IDs
              const ids = firstUrls.map(url => {
                const match = url.match(/videoid=(\d+)/);
                return match ? match[1] : null;
              }).filter(id => id !== null);
              
              console.log('🔢 IDs extraits:', ids);
              setResult(prev => prev + `🔢 IDs extraits: ${ids.join(', ')}\n`);
            }
          } else {
            setResult(prev => prev + `❌ Aucun tableau trouvé dans le fichier\n`);
          }
          
          setResult(prev => prev + `✅ ${folder}: Fichier trouvé et traité avec succès\n\n`);
          break; // Si trouvé dans ce dossier, pas besoin de tester les autres
        } else {
          setResult(prev => prev + `❌ Erreur: ${response.status}\n`);
        }
      } catch (error) {
        console.error('❌ Erreur:', error);
        setResult(prev => prev + `❌ Erreur dans ${folder}: ${error}\n`);
      }
      
      setResult(prev => prev + `\n`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔧 Debug Accès Fichiers (Multi-dossiers)</h1>
      
      <p className="mb-4 text-gray-600">
        Cette page teste l'accès aux fichiers d'épisodes dans les dossiers anime_episodes_js et anime_episodes_js_2
      </p>
      
      <button
        onClick={testFileAccess}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
      >
        🧪 Tester Accès Fichiers (Multi-dossiers)
      </button>
      
      <button
        onClick={() => setResult('')}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mb-4 ml-2"
      >
        🗑️ Clear
      </button>
      
      <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm whitespace-pre-wrap">
        {result || 'Aucun test effectué...'}
      </div>
    </div>
  );
} 