# Guide d'utilisation - Titres des Films

Ce système permet d'afficher les vrais noms des films d'animation au lieu du générique "Film".

## Comment ça fonctionne

1. **Fichier de mapping** : `src/lib/filmTitles.ts` contient la correspondance entre les IDs d'animés et les vrais noms des films
2. **Fonctions utilitaires** : Des fonctions aident à récupérer et afficher les bons titres
3. **Intégration automatique** : Les pages utilisent automatiquement ces titres

## Ajouter un nouveau film

### ✅ **Pour un seul film :**
```typescript
"mon-anime-id": {
  "Film": "Titre du Film Unique",
  "Film_1": "Titre du Film Unique"  // Alternative
}
```

### ✅ **Pour plusieurs films :**
```typescript
"mon-anime-id": {
  "Film_1": "Titre du Premier Film",
  "Film_2": "Titre du Deuxième Film", 
  "Film_3": "Titre du Troisième Film",
  "Film_4": "Titre du Quatrième Film"
  // etc...
}
```

### 🎯 **Structure dans animeData.ts :**

#### **Option 1: Saisons Film séparées (RECOMMANDÉ)**
```typescript
{
  id: "mon-anime",
  seasons: [
    { seasonNumber: 1, title: "Saison 1", episodes: [...] },
    { seasonNumber: "Film", title: "Film", episodes: [{ number: 1, title: "Film 1" }] },
    { seasonNumber: "Film", title: "Film", episodes: [{ number: 1, title: "Film 2" }] },
    { seasonNumber: "Film", title: "Film", episodes: [{ number: 1, title: "Film 3" }] }
  ]
}
```

#### **Option 2: Une seule saison Film avec plusieurs épisodes**
```typescript
{
  id: "mon-anime", 
  seasons: [
    { seasonNumber: 1, title: "Saison 1", episodes: [...] },
    { 
      seasonNumber: "Film", 
      title: "Film", 
      episodes: [
        { number: 1, title: "Premier Film" },
        { number: 2, title: "Deuxième Film" },
        { number: 3, title: "Troisième Film" }
      ]
    }
  ]
}
```

## Format des clés

Le système essaie plusieurs formats dans cet ordre :
1. **`"Film_X"`** : Format recommandé pour les films numérotés
2. **`"Film"`** : Pour un film unique  
3. **`"X"`** : Numéros simples (1, 2, 3...)
4. **`"seasonNumber_episodeNumber"`** : Format complet

### 📋 **Exemples de mapping :**

```typescript
// Cas simple - Un seul film
"akira": {
  "Film": "Akira",
  "1": "Akira"  // Alternative
}

// Cas complexe - Plusieurs films
"evangelion": {
  "Film_1": "Evangelion: 1.0 You Are (Not) Alone",
  "Film_2": "Evangelion: 2.0 You Can (Not) Advance", 
  "Film_3": "Evangelion: 3.0 You Can (Not) Redo",
  "Film_4": "Evangelion: 3.0+1.0 Thrice Upon a Time"
}

// Cas mixte - Films + numérotation spéciale
"one-piece": {
  "Film_1": "One Piece: Strong World",
  "Film_2": "One Piece: Z",
  "Film_3": "One Piece: Gold",
  "Film_4": "One Piece: Stampede",
  "Film_5": "One Piece: Red"
}
```

## Exemples d'usage

```typescript
// Obtenir le titre d'un film
const title = getFilmTitle("demon-slayer", "Film", 1);
// Retourne: "Le Train de l'Infini"

// Obtenir le titre d'une saison
const seasonTitle = getSeasonTitle("demon-slayer", season);
// Retourne le vrai nom si c'est un film, sinon le titre normal

// Vérifier si un titre est générique
const isGeneric = isGenericFilmTitle("Film");
// Retourne: true
```

## Où les changements s'appliquent

- ✅ Pages de catalogue (`/catalogue/[id]`)
- ✅ Pages d'épisodes (`/catalogue/[id]/episodes`)
- ✅ Sélecteurs de saisons
- ✅ Titres dans l'interface

## Extensions possibles

Pour étendre le système :

1. **Descriptions de films** : Ajouter des descriptions spécifiques
2. **Images de films** : Mapper des images spécifiques aux films
3. **Dates de sortie** : Ajouter les dates de sortie des films
4. **Traductions** : Support multilingue pour les titres

## Maintenance

- Ajoutez les nouveaux films au fur et à mesure
- Vérifiez que les IDs correspondent bien aux données d'animés
- Testez l'affichage après ajout de nouveaux films
