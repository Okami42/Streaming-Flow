// Fichier contenant toutes les descriptions des épisodes pour chaque série
// Organisé par ID de série, puis par saison, puis par épisode

interface EpisodeDescription {
  [episodeId: number]: string;
}

interface SeasonDescriptions {
  [seasonNumber: number]: EpisodeDescription;
}

interface SeriesDescriptions {
  [seriesId: string]: SeasonDescriptions;
}

const episodeDescriptions: SeriesDescriptions = {
  "squid-game": {
    1: {
      1: "Ruiné et prêt à tout, Gi-hun accepte de participer à un jeu mystérieux. Mais dès la première épreuve, la promesse d'argent facile fait place à l'horreur.",
      2: "Le groupe organise un vote pour décider s'il continue ou abandonne l'aventure. Mais la réalité du monde extérieur peut s'avérer aussi impitoyable que le jeu.",
      3: "Plusieurs joueurs passent à l'épreuve suivante, aussi délicieuse que mortelle. Certains sont plus avantagés que les autres. Jun-ho réussit quant à lui à s'infiltrer.",
      4: "Les joueurs forment des alliances. La nuit tombée, personne n'est à l'abri au dortoir. Pour la troisième épreuve, l'équipe de Gi-hun doit penser de façon stratégique.",
      5: "Gi-hun et son équipe se relaient pour monter la garde toute la nuit. Les hommes masqués rencontrent des ennuis dans leur propre camp de conspirateurs.",
      6: "Les joueurs se mettent par deux pour la quatrième épreuve. Gi-hun est aux prises avec un dilemme moral. Tandis que Sang-woo choisit de se préserver, Sae-byeok se livre.",
      7: "Les invités VIP sont accueillis avec les honneurs aux premières loges du spectacle. La pression du cinquième match est tellement forte que certains joueurs craquent.",
      8: "Avant la dernière épreuve, la méfiance et le dégoût règnent parmi les finalistes. Jun-ho s'enfuit, bien décidé à révéler les sombres dessous de la compétition.",
      9: "Le grand final approche et les tensions sont à leur comble. Le vainqueur sera-t-il à la hauteur du prix promis ou le jeu réserve-t-il un dernier rebondissement ?",
    },
    2: {
      1: "Une fois à l'aéroport, Gi-hun fait demi-tour et jure de se venger. Depuis sa planque, il intensifie son enquête pour retrouver le recruteur qui cherche de nouveaux joueurs.",
      2: "Gi-hun parvient enfin à se procurer une invitation, pour le 31 octobre, jour d'Halloween. Au cours d'une rencontre tendue avec Jun-ho, chacun annonce ses objectifs mutuels.",
      3: "De nouveaux participants se réunissent pour tenter de gagner 45,6 milliards de wons. Après un premier tour éprouvant, le sort des survivants est remis en jeu par un vote.",
      4: "Les joueurs se préparent pour la prochaine épreuve : le pentathlon à six jambes, où chaque membre d'équipe doit réussir un mini-jeu pour survivre, sous peine d'élimination collective.",
      5: "Kang No-eul se fait des ennemis à cause de ses actions irresponsables. La tension est à son comble quand les joueurs restants votent pour décider s'ils passeront au tour suivant.",
      6: "Jun-ho et son équipe s'apprêtent à intervenir sur une île suspecte. Alors que les enjeux monétaires et les tensions s'accroissent, les joueurs se divisent en deux factions rivales.",
      7: "Les derniers participants élaborent des stratégies pour survivre à la nuit, qui promet d'être sanglante. Gi-hun propose un plan risqué pour lequel il va avoir besoin de fidèles alliés."
    },
    3: {
      1: "No-eul prend des risques pour infiltrer une opération dangereuse. Un nouveau jeu est annoncé : un cache-cache avec des clés pour les uns et des couteaux pour les autres.",
      2: "Alors que le jeu reprend, Gi-hun tient absolument à affronter Kang Dae-ho. Kim Jun-hee se retrouve soudain dans une situation critique qui met sa détermination à rude épreuve.",
      3: "L'équipe de Jun-ho est sur le point de trouver l'île. Jang Geum-ja supplie Gi-hun d'aider Jun-hee. Les VIP étudient une proposition cruelle.",
      4: "Gi-hun soutient Jun-hee alors que la tension monte, mais cette dernière doit prendre une décision cruciale. Avant l'épreuve finale, le maître du jeu donne un ultimatum à Gi-hun.",
      5: "No-eul essaie de prendre l'avantage lors des négociations, mais son plan se retourne contre elle. L'intégrité morale de Gi-hun est testée... Jusqu'où ira-t-il ?",
      6: "Alors que Jun-ho se hâte de rejoindre l'île, la tension est à son comble pendant la manche finale. Les joueurs sont dans une situation impossible lors des dernières minutes du jeu."
    }
  },
  
  "motorheads": {
    1: {
      1: "Caitlyn et Zac Torres, fraîchement débarqués à Ironwood, tentent de s'intégrer au lycée tout en fuyant la réputation de leur père. Logan peine à garder la tête hors de l'eau. Caitlyn fait la connaissance de Curtis, tiraillé entre un père shérif et un frère rebelle.",
      2: "Le festival des lucioles fait des étincelles à Ironwood. Caitlyn prend un risque. Zac force tête baissée pour défier Harris Bowers. Marcel dévoile son logo. Curtis met un pied dans le milieu louche de son frère Ray, tandis que l'oncle Logan se voit offrir une opportunité inattendue.",
      3: "Poussé par Logan à récoller les morceaux avec Marcel, Zac propose une Virée sur un circuit de karting un peu extrême. Curtis invite Caitlyn à un barbecue familial, où un invité inattendu fait son apparition. Harris se prépare pour un rassemblement secret.",
      4: "Zac et Curtis s'achètent les cours pour assister à des courses illégales sur la piste gérée par Ray, le frère de Curtis. King propose un déjeuner à Caitlyn qui se retrouve en sortie de groupe. Une vidéo de Harris Bowers déclenche une tempête sur les réseaux sociaux.",
      5: "Une vente aux enchères de voitures se tient à Ironwood. Sam, gagnée par la nostalgie, envisage de racheter son ancienne voiture. Marcel persuade son père Wade de préparer son célèbre chili. Logan, sur les conseils de Caitlyn, se lance dans la restauration d'une Mustang 1967.",
      6: "Alors que Marcel apprend une mauvaise nouvelle concernant son père, la bande l'emmène à la Course Endiablée, une course de motocross à West Newton. Logan et Sam vont rendre visite à la mère de Marcel. Le shérif Hugo Young fait appel à Ray pour traquer un mystérieux voleur de pièces détachées.",
      7: "À trois semaines de la course contre Harris, l'équipe redouble d'efforts pour terminer la voiture IMBATTABLE. Sous la houlette de Ray, Zac gagne en assurance. Caitlyn et Curtis découvrent un indice qui pourrait mener à Christian Maddox. Logan apprend un secret familial qui change tout.",
      8: "Le bal du lycée post-apocalyptique imaginé par Marcel et Brooke fait un carton. Zac espère y croiser Alicia. Caitlyn et Curtis, face à un souci électrique sur la voiture, hésitent à se rendre au bal. Sam et Darren Bowers, parents bénévoles, sont prêts à intervenir si nécessaire.",
      9: "La veille de la grande course, l'équipe fait face à un sabotage de dernière minute. Zac et Curtis doivent mettre leurs différends de côté pour réparer la voiture à temps. Caitlyn découvre qui se cache derrière les menaces. Logan prend une décision qui pourrait tout changer.",
      10: "Le jour de la course arrive enfin. Toute la ville d'Ironwood se rassemble pour l'événement. Alors que Zac prend place derrière le volant, des révélations explosives menacent de faire dérailler plus que la course. Marcel et Caitlyn font face à un choix qui déterminera leur avenir."
    }
  },
  
  "adventure-time": {
    1: {
      1: "Finn et Jake partent à la recherche d'une princesse disparue dans le Royaume de la Glace.",
      2: "Marceline la vampire défie Finn à un concours de farces qui tourne mal.",
      3: "La Princesse Chewing-Gum crée accidentellement des bonbons zombies qui envahissent son royaume.",
      4: "Finn et Jake découvrent un donjon ancien rempli de trésors et de pièges mortels.",
      5: "Le Roi des Glaces enlève plusieurs princesses pour un dîner forcé, et Finn et Jake doivent les sauver.",
      6: "BMO est possédé par un virus informatique maléfique qui menace de le reprogrammer.",
      7: "Finn rencontre son héros, Billy le héros légendaire, et apprend une vérité troublante sur le Lich.",
      8: "Jake et Lady Rainicorn annoncent une nouvelle qui va changer leur vie pour toujours."
    }
  }
};

export default episodeDescriptions;

// Fonction utilitaire pour récupérer la description d'un épisode
export function getEpisodeDescription(seriesId: string, episodeId: number, seasonNumber: number = 1): string {
  if (!episodeDescriptions[seriesId] || !episodeDescriptions[seriesId][seasonNumber] || !episodeDescriptions[seriesId][seasonNumber][episodeId]) {
    return "Description non disponible";
  }
  return episodeDescriptions[seriesId][seasonNumber][episodeId];
} 