"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import VideoPlayer from "@/components/ui/video-player";

export default function TestVidmolyPage() {
  const [vidmolyUrl, setVidmolyUrl] = useState("");
  const [vidmolyId, setVidmolyId] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [testMode, setTestMode] = useState<"url" | "player">("url");

  const handleTestUrl = () => {
    if (vidmolyUrl) {
      setCurrentUrl(vidmolyUrl);
    } else if (vidmolyId) {
      setCurrentUrl(`https://vidmoly.to/embed-${vidmolyId}.html`);
    }
  };

  const handleTestNet = () => {
    if (vidmolyUrl) {
      setCurrentUrl(vidmolyUrl.replace('vidmoly.to', 'vidmoly.net'));
    } else if (vidmolyId) {
      setCurrentUrl(`https://vidmoly.net/embed-${vidmolyId}.html`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Vidmoly</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Test avec URL complète */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Test avec URL complète</h2>
            <div className="space-y-4">
              <Input
                placeholder="https://vidmoly.to/embed-XXXXX.html"
                value={vidmolyUrl}
                onChange={(e) => setVidmolyUrl(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
              <div className="flex space-x-2">
                <Button onClick={handleTestUrl} className="bg-blue-600 hover:bg-blue-700">
                  Test .to
                </Button>
                <Button onClick={handleTestNet} className="bg-green-600 hover:bg-green-700">
                  Test .net
                </Button>
              </div>
            </div>
          </div>

          {/* Test avec ID seulement */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Test avec ID seulement</h2>
            <div className="space-y-4">
              <Input
                placeholder="rjnzgaf5w0ws"
                value={vidmolyId}
                onChange={(e) => setVidmolyId(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
              <div className="flex space-x-2">
                <Button onClick={handleTestUrl} className="bg-blue-600 hover:bg-blue-700">
                  Test .to
                </Button>
                <Button onClick={handleTestNet} className="bg-green-600 hover:bg-green-700">
                  Test .net
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sélecteur de mode de test */}
        <div className="bg-gray-800 p-4 rounded-lg mb-8">
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => setTestMode("url")} 
              className={`${testMode === "url" ? "bg-blue-600" : "bg-gray-700"} hover:bg-blue-700`}
            >
              Iframe direct
            </Button>
            <Button 
              onClick={() => setTestMode("player")} 
              className={`${testMode === "player" ? "bg-blue-600" : "bg-gray-700"} hover:bg-blue-700`}
            >
              VideoPlayer
            </Button>
          </div>
        </div>

        {/* URL actuelle */}
        {currentUrl && (
          <div className="bg-gray-800 p-4 rounded-lg mb-8">
            <h3 className="text-lg font-semibold mb-2">URL actuelle :</h3>
            <code className="bg-gray-700 p-2 rounded text-sm break-all block">
              {currentUrl}
            </code>
          </div>
        )}

        {/* Lecteur vidéo */}
        {currentUrl && testMode === "url" && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Lecteur Vidmoly (iframe direct)</h2>
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src={currentUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none' }}
              />
            </div>
          </div>
        )}

        {/* Test avec le composant VideoPlayer */}
        {currentUrl && testMode === "player" && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Lecteur Vidmoly (composant VideoPlayer)</h2>
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
              <VideoPlayer
                vidmolyUrl={currentUrl.includes('vidmoly.to') ? currentUrl : undefined}
                vidmolyId={currentUrl.includes('vidmoly.net') ? vidmolyId : undefined}
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-900 p-6 rounded-lg mt-8">
          <h3 className="text-lg font-semibold mb-2">Instructions :</h3>
          <ul className="space-y-2 text-sm">
            <li>• Entrez une URL complète Vidmoly ou juste l'ID</li>
            <li>• Testez avec .to et .net pour voir lequel fonctionne</li>
            <li>• Utilisez le bouton "Iframe direct" pour tester directement l'iframe</li>
            <li>• Utilisez le bouton "VideoPlayer" pour tester avec le composant VideoPlayer</li>
            <li>• Regardez dans l'inspecteur d'élément pour voir si l'iframe se charge</li>
            <li>• Vérifiez la console pour les erreurs</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 