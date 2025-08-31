'use client';

import { useAuth } from '@/context/auth-context';
import { useHistory } from '@/context/history-context';

export default function TestAuthPage() {
  const { isAuthenticated, user, loading } = useAuth();
  const { watchHistory, readHistory, syncHistory, loadUserHistory } = useHistory();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test du système d'authentification</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* État de l'authentification */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">État de l'authentification</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Statut:</span>{' '}
                <span className={isAuthenticated ? 'text-green-400' : 'text-red-400'}>
                  {isAuthenticated ? 'Connecté' : 'Non connecté'}
                </span>
              </p>
              {user && (
                <>
                  <p><span className="font-medium">ID:</span> {user.id}</p>
                  <p><span className="font-medium">Email:</span> {user.email}</p>
                  <p><span className="font-medium">Nom d'utilisateur:</span> {user.username}</p>
                  <p><span className="font-medium">Créé le:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
                </>
              )}
            </div>
          </div>

          {/* État de l'historique */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">État de l'historique</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Historique de visionnage:</span> {watchHistory.length} éléments</p>
              <p><span className="font-medium">Historique de lecture:</span> {readHistory.length} éléments</p>
            </div>
            
            {isAuthenticated && (
              <div className="mt-4 space-y-2">
                <button
                  onClick={syncHistory}
                  className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-colors"
                >
                  Synchroniser l'historique
                </button>
                <button
                  onClick={loadUserHistory}
                  className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
                >
                  Recharger l'historique
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Instructions de test</h2>
          <div className="space-y-2 text-gray-300">
            <p>1. Si vous n'êtes pas connecté, utilisez le bouton "Connexion" dans le header</p>
            <p>2. Créez un compte ou connectez-vous avec un compte existant</p>
            <p>3. Votre historique sera automatiquement synchronisé</p>
            <p>4. Testez la déconnexion et reconnexion pour vérifier la persistance</p>
          </div>
        </div>

        {/* Historique détaillé */}
        {(watchHistory.length > 0 || readHistory.length > 0) && (
          <div className="mt-8 bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Historique détaillé</h2>
            
            {watchHistory.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Historique de visionnage</h3>
                <div className="space-y-2">
                  {watchHistory.slice(0, 3).map((item, index) => (
                    <div key={index} className="bg-gray-700 p-3 rounded text-sm">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-gray-400">
                        S{item.episodeInfo.season}E{item.episodeInfo.episode} - 
                        Progression: {Math.round((item.progress / item.duration) * 100)}%
                      </p>
                      <p className="text-gray-500 text-xs">
                        {new Date(item.lastWatchedAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                  {watchHistory.length > 3 && (
                    <p className="text-gray-400 text-sm">
                      ... et {watchHistory.length - 3} autres éléments
                    </p>
                  )}
                </div>
              </div>
            )}

            {readHistory.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Historique de lecture</h3>
                <div className="space-y-2">
                  {readHistory.slice(0, 3).map((item, index) => (
                    <div key={index} className="bg-gray-700 p-3 rounded text-sm">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-gray-400">
                        Chapitre {item.chapter} - Page {item.page}/{item.totalPages}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {new Date(item.lastReadAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                  {readHistory.length > 3 && (
                    <p className="text-gray-400 text-sm">
                      ... et {readHistory.length - 3} autres éléments
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
