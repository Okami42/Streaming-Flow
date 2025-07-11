// Fichier contenant toutes les descriptions des épisodes pour chaque série
// Organisé par ID de série, puis par saison, puis par épisode
import { Content } from './types';
import { seriesData } from './seriesData';

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
  
  "game-of-thrones": {
    1: {
      1: "Ned Stark, seigneur de Winterfell, se voit confier la charge de Main du Roi par son vieil ami le roi Robert Baratheon. À Winterfell, la famille royale est accueillie et des tensions apparaissent. De l'autre côté du Détroit, les derniers héritiers Targaryen cherchent à reconquérir le trône.",
      2: "Alors que Bran reste dans le coma, Ned part pour Port-Réal avec ses filles. Jon Snow se dirige vers le Mur pour rejoindre la Garde de Nuit. Daenerys doit s'adapter à sa nouvelle vie de Khaleesi.",
      3: "Arrivé à Port-Réal, Ned commence son enquête sur la mort de Jon Arryn. Catelyn suit secrètement son mari pour lui révéler ses soupçons. Jon fait ses premiers pas difficiles à la Garde de Nuit.",
      4: "Ned poursuit son enquête et découvre que le roi a un fils illégitime. Tyrion, sur le chemin du retour, est capturé par Catelyn qui le soupçonne d'avoir tenté de tuer Bran.",
      5: "À Port-Réal, Ned est confronté au roi Robert sur la question des Targaryen. Catelyn emmène Tyrion à l'Est. Bran reçoit un cadeau spécial avant de commencer une nouvelle vie.",
      6: "Tyrion demande un jugement par combat pour prouver son innocence. À Port-Réal, Ned fait une découverte choquante sur les enfants royaux. Au-delà du Détroit, Viserys devient de plus en plus désespéré.",
      7: "Suite à la blessure du roi Robert, Ned se retrouve régent temporaire. Il confronte Cersei avec ses découvertes. À l'Est, Drogo promet de conquérir les Sept Royaumes pour son fils à naître.",
      8: "Avec le roi Robert mort, Ned refuse de reconnaître Joffrey comme héritier légitime. Robb Stark rassemble les bannières du Nord pour marcher vers le Sud. Jon Snow fait un choix difficile.",
      9: "Tyrion mène sa première bataille. Robb affronte l'armée Lannister. À Port-Réal, le sort de Ned est scellé lors d'une audience publique.",
      10: "Après l'exécution de Ned, la guerre des cinq rois commence. Robb est proclamé Roi du Nord. Daenerys fait face à une terrible perte mais aussi à la naissance d'un miracle."
    },
    2: {
      1: "Alors que la guerre fait rage dans les Sept Royaumes, Tyrion arrive à Port-Réal pour servir comme Main du Roi. Daenerys et ses suivants traversent le désert rouge. Jon Snow et la Garde de Nuit font face aux dangers au-delà du Mur.",
      2: "Theon retourne sur les Îles de Fer et retrouve sa famille. Arya, déguisée en garçon, voyage vers le Nord. Tyrion réorganise le conseil restreint et se débarrasse d'un homme dangereux.",
      3: "Catelyn tente de forger une alliance avec Renly Baratheon. Tyrion teste la loyauté des membres du conseil. Theon doit choisir entre sa famille de sang et celle qui l'a élevé.",
      4: "Joffrey punit Sansa pour les victoires de Robb. Tyrion découvre le plan de défense de Cersei. Catelyn propose un échange de prisonniers. Jon découvre un secret inquiétant chez Craster.",
      5: "Les hommes de la Garde de Nuit font face à une mutinerie. Daenerys rencontre un riche marchand qui pourrait être la clé de son avenir. Theon s'empare de Winterfell.",
      6: "Theon consolide son contrôle sur Winterfell. Jon est fait prisonnier par les sauvageons. À Port-Réal, Tyrion et Cersei se préparent pour l'attaque imminente de Stannis Baratheon.",
      7: "Jaime est escorté vers Port-Réal par Brienne. Arya reçoit une surprise de Jaqen H'ghar. Robb est confronté à une trahison. Theon poursuit Bran et Rickon.",
      8: "Le roi Stannis arrive enfin à Port-Réal avec son armée. Tyrion et la famille royale se préparent pour la bataille. Jon est mis à l'épreuve par Qhorin Mimain.",
      9: "Tyrion et les Lannister combattent pour leur vie alors que la flotte de Stannis attaque Port-Réal. La bataille de la Néra s'annonce sanglante et décisive.",
      10: "Après la bataille, Joffrey récompense ses alliés. Tyrion se réveille dans une nouvelle position. Daenerys entre dans une ville mystérieuse. Au-delà du Mur, une armée de morts s'avance."
    },
    3: {
      1: "Jon rencontre Mance Rayder, le roi d'au-delà du Mur. Daenerys arrive à Astapor pour acheter une armée. Tyrion demande une récompense. Petyr Baelish fait une offre à Sansa.",
      2: "Brienne et Jaime sont capturés. Arya rencontre la Fraternité sans Bannières. Theon est torturé par des inconnus. Tyrion prend de nouvelles responsabilités.",
      3: "Tyrion obtient un nouveau titre. Daenerys rencontre le propriétaire des Immaculés. Les hommes de la Garde de Nuit se rebellent. Jaime fait face à une situation difficile.",
      4: "La Garde de Nuit fait face à une mutinerie. Daenerys libère les esclaves d'Astapor. Jaime révèle un secret à Brienne. Varys raconte son histoire à Tyrion.",
      5: "Robb doit faire face à une rébellion. Jon et les sauvageons escaladent le Mur. Jaime tente de négocier sa libération. Tyrion découvre le coût de son mariage.",
      6: "Tyrion et Sansa se marient. Daenerys rencontre les dirigeants de Yunkai. Melisandre révèle un secret à Gendry. Brienne fait face à un ours.",
      7: "Daenerys rencontre les mercenaires de Yunkai. Robb négocie avec Walder Frey. Jon est mis à l'épreuve par les sauvageons. Bran découvre un nouveau pouvoir.",
      8: "Daenerys attend la réponse de Yunkai. Robb présente ses excuses à Lord Frey. Jon fait face à la plus grande épreuve de sa loyauté. Bran découvre une nouvelle capacité.",
      9: "Robb et Catelyn arrivent aux Jumeaux pour le mariage d'Edmure. Jon fait face à sa plus grande épreuve. Bran se rapproche de sa destination.",
      10: "Joffrey défie Tywin. Bran raconte une légende. La Garde de Nuit fait face à son plus grand défi. Daenerys attend de voir comment sa dernière conquête la recevra."
    },
    4: {
      1: "Tyrion accueille un invité à Port-Réal. Jon est jugé pour ses actions. Daenerys marche vers Meereen avec sa nouvelle armée. Arya retrouve un visage familier.",
      2: "Tyrion offre son aide à un suspect. Joffrey et Margaery célèbrent leur union. Jaime et Cersei se retrouvent. Stannis perd patience avec Davos.",
      3: "Tyrion considère ses options. Tywin offre un partenariat. Daenerys conquiert une nouvelle ville. Jon organise la défense de Châteaunoir.",
      4: "Daenerys équilibre justice et miséricorde. Jaime demande à Brienne de remplir un serment. Jon organise la défense du Mur. Cersei et Tywin complotent.",
      5: "Jon mène un groupe de volontaires. Bran et sa compagnie trouvent refuge. Daenerys apprend à gouverner. Tyrion fait face à son père dans un procès pour sa vie.",
      6: "Tyrion fait face à son accusateur. Daenerys reçoit des nouvelles inquiétantes. Jon est appelé à défendre le Mur. Brienne suit une nouvelle piste.",
      7: "Tyrion obtient un visiteur inattendu. Ramsay démontre sa valeur à son père. Petyr et Sansa arrivent au Val d'Arryn. Jon et les frères jurés sont confrontés à leur plus grand défi.",
      8: "Mole's Town reçoit des visiteurs inattendus. Littlefinger est interrogé. Ramsay tente de prouver sa valeur à son père. Tyrion est jugé par combat.",
      9: "Jon Snow et la Garde de Nuit font face à leur plus grand défi. Au nord du Mur, une bataille épique s'engage contre l'armée des sauvageons.",
      10: "Les circonstances changent après la bataille au Mur. Daenerys fait face à de dures réalités. Bran apprend une vérité stupéfiante. Un voyageur arrive à une destination."
    },
    5: {
      1: "Cersei et Jaime ajustent leur vie après la mort de leur père. Jon est courtisé par Stannis. Une prophétie hante Cersei. Daenerys fait face à une nouvelle menace.",
      2: "Arya arrive à Braavos. Jaime et Bronn se dirigent vers Dorne. Ellaria Sand cherche vengeance. Stannis tente de gagner le soutien du Nord.",
      3: "Jon prend une décision audacieuse en tant que Lord Commandant. Daenerys est confrontée à un choix difficile. Cersei nomme un nouveau Grand Moineau. Arya commence son entraînement.",
      4: "Les Moineaux prennent le contrôle de Port-Réal. Jaime et Bronn approchent de Dorne. Ellaria et les Aspics des Sables planifient leur vengeance. Melisandre voit une vision dans les flammes.",
      5: "Jon forme une alliance controversée. Stannis continue sa marche. Jaime et Bronn atteignent leur destination. Arya progresse dans son entraînement. Jorah et Tyrion voyagent ensemble.",
      6: "Arya fait ses premiers pas dans sa nouvelle vie. Sansa confronte une vérité douloureuse. Stannis maintient sa résolution malgré les obstacles. Jaime fait face à un dilemme.",
      7: "Jon prépare une mission dangereuse. Arya progresse dans son entraînement. Stannis fait face à des défis sur sa route vers Winterfell. Daenerys est confrontée à une situation périlleuse.",
      8: "Jon revient à Châteaunoir. Arya fait une rencontre. Daenerys assiste à des jeux traditionnels. Stannis fait face à une décision déchirante.",
      9: "Stannis marche vers Winterfell. Jon revient au Mur. Arya croise un visage familier. Daenerys assiste à des jeux de combat à Meereen.",
      10: "Stannis marche vers Winterfell. Jon fait face aux conséquences de ses actions. Cersei cherche le pardon. Daenerys est entourée d'étrangers."
    },
    6: {
      1: "À Châteaunoir, Thorne défend ses actions. Daenerys rencontre un chef Dothraki. Cersei reçoit des nouvelles de Myrcella. Ramsay fait face au deuil.",
      2: "Bran s'entraîne avec le Corneille à trois yeux. À Port-Réal, Jaime confronte le Grand Moineau. Arya continue son entraînement. Ramsay reçoit un cadeau.",
      3: "Daenerys rencontre son futur. Bran visite le passé. Tommen confronte le Grand Moineau. Arya se voit offrir une seconde chance. Ramsay reçoit un cadeau des Omble.",
      4: "Tyrion frappe un accord avec les maîtres. Jon et Sansa discutent de leur avenir. Theon retrouve sa sœur. Cersei et Olenna planifient contre les Moineaux.",
      5: "Tyrion cherche un nouvel allié. Jon prépare une bataille pour le Nord. Arya est mise à l'épreuve. Jorah dévoile un secret à Daenerys.",
      6: "Une ancienne ennemie revient. Les acteurs interprètent des événements récents. Arya fait face à un choix. Jaime affronte le Grand Moineau.",
      7: "Le Limier trouve un nouveau but. Jaime parle avec Brienne. Cersei choisit la violence. Tyrion conseille Daenerys.",
      8: "Brienne arrive à Vivesaigues. Arya planifie son avenir. Cersei et Olenna discutent de leur avenir. Jaime fait face au Silure.",
      9: "Jon et Sansa affrontent Ramsay Bolton dans la bataille pour Winterfell. La bataille des bâtards déterminera le sort du Nord.",
      10: "Cersei fait face à son procès. Daenerys prépare son retour à Westeros. Bran découvre un secret crucial. Jon est reconnu par les seigneurs du Nord."
    },
    7: {
      1: "Jon organise la défense du Nord. Cersei cherche à renforcer ses alliances. Daenerys revient sur sa terre natale. Arya planifie sa vengeance.",
      2: "Daenerys reçoit un visiteur inattendu. Jon fait face à une rébellion. Sam risque sa carrière et sa vie. Cersei trouve un nouvel allié.",
      3: "Daenerys tient conseil. Cersei rend justice à ses ennemis. Jaime apprend de ses erreurs. Jon reçoit un visiteur inattendu.",
      4: "Daenerys attaque les forces Lannister. Arya retourne à Winterfell. Jon et Daenerys se préparent pour leur rencontre.",
      5: "Daenerys exige loyauté. Jon propose une solution audacieuse. Tyrion médite sur les conséquences. Cersei reçoit une proposition.",
      6: "Jon et ses compagnons partent au-delà du Mur à la recherche d'une preuve. Daenerys et Tyrion discutent de l'avenir. Arya se confronte à Sansa.",
      7: "Une réunion cruciale a lieu à Port-Réal, où tous les principaux protagonistes se rencontrent pour discuter de la menace commune venant du Nord."
    },
    8: {
      1: "Les forces de Daenerys et Jon arrivent à Winterfell. Dans le Nord, des nouvelles inquiétantes forcent Jon à prendre une décision difficile.",
      2: "Jaime doit répondre de ses actes. Tyrion évalue sa loyauté. Jon révèle sa véritable identité à Daenerys. La Bataille de Winterfell approche.",
      3: "La bataille de Winterfell commence. L'armée des morts affronte les vivants dans un combat épique pour la survie de l'humanité.",
      4: "Les survivants célèbrent leur victoire et pleurent leurs morts. Daenerys et Cersei se préparent pour une confrontation finale.",
      5: "Daenerys apporte le feu et le sang à Port-Réal. Cersei observe la destruction de sa ville. Les civils tentent désespérément d'échapper au carnage.",
      6: "Les conséquences de la guerre se font sentir dans tout Westeros. Un nouveau dirigeant est choisi et le sort des Sept Royaumes est décidé."
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
  },
  "south-park": {
    1: {
      1: "Cartman raconte à ses amis qu'il a été enlevé par des extraterrestres, mais personne ne le croit. Pendant ce temps, le Chef tente de mettre en garde les enfants contre les visiteurs de l'espace.",
      2: "Jimbo, l'oncle de Stan, et son vieux copain de la guerre du Viêt Nam, Ned, emmènent Stan, Kenny, Kyle et Cartman chasser dans les montagnes",
      3: "L'enseignant de l'école élémentaire de South Park, M. Garrison annonce que Cartman a remporté le concours national de rédaction Sauvons notre planète, à la grande colère de sa camarade de classe, Wendy Testaburger, qui le soupçonne aussitôt de tricherie.",
      4: "Sparky, le nouveau chien de Stan, a suivi son maître jusqu'à l'arrêt de bus. Comme Stan affirme que Sparky est le chien le plus féroce de South Park, Cartman parie que Sylvester, un autre chien de la ville, est plus féroce.",
      5: "Les enfants cherchent à créer des éléphants de lait (croisement entre un éléphant et un cochon de lait), ils s'adressent au généticien de la ville mais celui-ci est un brin foldingue…",
      6: "Marvin Marsh, le grand-père de Stan, veut absolument mourir. Il demande à son petit-fils de l'aider. Entretemps, les parents partent en guerre contre les programmes télévisés vulgaires et scatologiques...",
      7: "Kenny meurt, écrasé par la station Mir. À la morgue, la sauce Worcestershire d'un des employés tombe accidentellement dans le réservoir servant au liquide d'embaumement, ce qui transforme Kenny en zombie. ",
      8: "Pensant recevoir une montre à quartz, les enfants envoient cinq dollars en Éthiopie mais reçoivent en fait un enfant du pays.",
      9: "Kyle se sent exclu pendant la période de Noël car il est juif. Pendant ce temps, Cartman est visité par Mr. Hankey, le petit caca Noël, mais personne ne le croit.",
      10: "Les parents de South Park, inquiets de l'influence de Terrance et Philippe sur leurs enfants, font pression pour que l'émission soit annulée.",
      11: "Cartman prétend avoir des visions de la Vierge Marie qui lui parle. Pendant ce temps, un cheval s'échappe d'une ferme et terrorise la ville.",
      12: "Barbra Streisand arrive à South Park à la recherche d'un artefact ancien qui la transformera en un monstre mécanique géant.",
      13: "Cartman ignore qui est son père. Alphonse Mephisto veut bien l'aider mais les recherches coûtent 3 000 $."
    },
    2: {
      1: "Terrence et Philippe sont victimes d'un complot orchestré par Scott, visant à permettre à Saddam Hussein de prendre le pouvoir au Canada.",
      2: "Mephisto est sur le point d'annoncer le nom du père d'Eric, mais il se fait tirer dessus. Les enfants doivent soigner Mephisto dont l'état s'aggrave pour connaitre le nom du père d'Eric.",
      3: "M. MacKey vient enseigner les méfais de la drogue aux enfants. Il fait passer un échantillon de Marijuana dans la classe pour apprendre aux élève à en reconnaitre lorsqu'ils en verront. Mais il ne récupère pas l'échantillon qui semble avoir disparut. ",
      4: "A South Park, un criminel viole des poules et l'officier Barbrady a des difficultés à mener l'enquête car il ne sait ni lire, ni écrire. Il retourne alors à l'école et obtient de l'aide des enfants.",
      5: "L'infirmière Gollum inquiète tout South Park à cause de son infirmité dérangeante: elle a un foetus mort accroché à son visage.",
      6: "Pour leurs exposé, Stan, Kyle, Eric et Kenny demandent des informations sur la guerre du Vietnam à Jimbo et Ned qui animent une émission de télévision sur la chasse. Ceux ci leurs donnent une image très décalé de la guerre du Vietnam",
      7: "Alors que leur car penche au-dessus d'une falaise, les sales gosses se rappellent leurs méfaits passés...",
      8: "Alors que Jimbo et Ned veulent faire des feux d'artifice pour le 4 juillet, M. Garrison s'aperçoit que M. Toc a disparu et qu'il est « son côté gay »...",
      9: "Le festival de Sundance arrive à South Park. Mais les festivaliers étouffent M. Hankey avec leurs déjections pleines de nourriture bio.",
      10: "Alors que Kenny est atteint de varicelle, les parents de Kyle, Stan et Cartman décident de les envoyer chez Kenny pour qu'ils la fasse étant jeune. Apprenant la supercherie, ils vont vouloir se venger.",
      11: "Le directeur du planétarium de South Park tente d'hypnotiser la population. Pendant ce temps, Cartman passe le casting pour une pub Cheesy Puffs.",
      12: "Alors que Stan doit construire une garçonnière pour jouer à 'action ou vérité' avec Wendy, ses parents se séparent.",
      13: "Un couple gagne lors d'une émission télé des billets pour Les journées Vaches, la grande fête foraine de South Park. Alors que nos héros tentent de gagner des poupées Terrance et Philippe, un rassemblement de vaches se forme.",
      14: "Chef intente un procès a une maison de disque pour les droits d'une chanson d'Alanis Morissette mais le perd et doit payer 2 millions de dollars. Stan, Kyle, Cartman et Kenny vont l'aider à trouver l'argent en organisant un concert.",
      15: "Tante Flo, la soeur de Sharon Marsh, offre à son neveu un poisson rouge. Mais Stan découvre que c'est en réalité un serial killer...",
      16: "Kyle, Kenny et Cartman s'en vont pour les fêtes de Noël dans le Nebraska pour aller rendre visite à la grand-mère de Cartman.",
      17: "Mr. Tweek risque de perdre son café à cause de la concurrence des cafés Harbucks... Commentaire : Cet épisode pointe du doigt certaines pratiques marketing qui utilisent des enfants pour vendre ou promouvoir n'importe quoi.",
      18: "Alors que nos héros jouent dans la montagne, ils découvrent un homme congelé dans la glace depuis... 1996"
    },
    3: {
      1: "Les garçons participent à un tournoi de dodgeball et se retrouvent à représenter les États-Unis dans un championnat international.",
      2: "Cartman prétend avoir des super pouvoirs après avoir reçu un coup à la tête, et commence à combattre le crime sous le nom de 'The Coon'.",
      3: "Les garçons découvrent un parc d'attractions abandonné et décident de le remettre en état pour gagner de l'argent.",
      4: "Kenny contracte une maladie mortelle rare et les garçons tentent de réaliser tous ses derniers souhaits avant qu'il ne meure.",
      5: "Butters est envoyé dans un camp de redressement pour enfants difficiles après que ses parents l'aient surpris en train de regarder une émission interdite.",
      6: "Cartman hérite d'un million de dollars et le dépense entièrement en un mois, puis tente désespérément de récupérer l'argent.",
      7: "Un nouveau magasin Walmart ouvre à South Park et hypnotise les habitants pour qu'ils y fassent leurs achats, menaçant les commerces locaux.",
      8: "Les garçons créent leur propre réseau de télévision sur internet et deviennent rapidement célèbres pour leur contenu controversé.",
      9: "Cartman se fait passer pour un voyant psychique et commence à résoudre des crimes pour la police locale.",
      10: "Les garçons partent en camping dans les bois et se retrouvent poursuivis par le légendaire Homme-Ours-Cochon."
    },
    4: {
      1: "Cartman reçoit deux dollars de la part de la fée des dents. Un plan malsain lui vient alors en tête.",
      2: "Les garçons sont défiés à la luge par les filles. Malheureusement, Cartman, qui faisait avancer la luge grâce à son poids, est envoyé en maison de correction pour avoir commis un « crime de haine » envers Token",
      3: "Le nouvel élève Timmy ne fait pas ses devoirs. M. Garrison l'envoie chez la Principale Victoria qui s'en remet à un médecin. On lui diagnostique un déficit aigu de l'attention (DAA).",
      4: "Des quintuplées et leur grand-mère se retrouvent chez Stan une nuit. Mais, à la mort de celle-ci, les quintuplées orphelines hésitent entre, rester aux États-Unis, ou retourner dans leur pays, la Roumanie.",
      5: "Cartman trouve que ses amis sont trop immatures. Après quelques tentatives de rencontres par le biais d'internet, Mephisto lui conseille de s'inscrire à la NAMBLA (North American Marlon Brando Look Alikes)",
      6: "Kyle est très malade des reins. Sous les conseils de Sharon, Sheila fait appel à une guérisseuse. Sentant que la vieille femme n'est qu'un charlatan, Stan cherche à sauver Kyle en consultant un vrai médecin.",
      7: "Chef est scandalisé : le drapeau de South Park est selon lui raciste. Afin d'en juger avec la plus grande impartialité, il est demandé aux enfants de décider s'il faut changer ou non le drapeau.",
      8: "Dieu a envoyé un message à Cartman : il doit fonder un boys band. Mais Randy, le père de Stan, semble opposé à l'affaire.",
      9: "Après une séance édifiante à l'église au cours de laquelle le père Maxi les menace de damnation éternelle s'ils ne prennent pas la religion plus au sérieux.",
      10: "Les enfants fondent leur propre église et ne vont plus à l'école. Cartman devient leur leader et prêcheur. Ainsi, en échange d'argent, il fait des miracles et transmet la parole du Seigneur. ",
      11: "Les enfants passent en CM1. Mais Mme Crockelpaf, leur nouveau professeur, est très étrange. Ils commencent à regretter ce bon vieux Garrison... Cartman décide qu'ils doivent retourner en CE2 coûte que coûte.",
      12: "À l'arrêt de bus, Kyle montre à Stan et Kenny son super-classeur Dawson, mais lorsque Cartman arrive avec un super-classeur Dawson Ultra + Futura 2000, Kyle est immédiatement jaloux. ",
      13: "C'est l'heure du spectacle de Thanksgiving à l'école de South Park. Butters raconte que le spectacle des maternelles sera largement meilleur que celui des CM1. ",
      14: "Pip, un jeune et pauvre orphelin, trouve un travail consistant à jouer avec une « jolie mais offensante » petite fille. Après des études pour devenir gentilhomme.",
      15: "Kenny est prêt à faire n'importe quoi pour de l'argent. Les enfants décident d'exploiter cela à leur profit. Pendant ce temps-là, Cartman part en camp de régime.",
      16: "Les enfants découvrent qu'ils peuvent débarrasser la ville des parents en les accusant de les « molester ». De là, des choses plutôt bizarres adviennent, tant du côté des enfants que de celui des parents.",
      17: "South Park a perdu l'esprit de Noël ce qui déplaît à M. Hankey. Les enfants décident de l'aider en créant un film censé imprégner les habitants de cet esprit"
    },
    5: {
      1: "Les garçons découvrent un portail vers une dimension parallèle dans le placard de Stan.",
      2: "Cartman devient le nouveau présentateur du journal télévisé de l'école et utilise sa position pour diffuser de la propagande.",
      3: "Kenny commence à travailler comme super-héros la nuit, protégeant South Park des criminels.",
      4: "Les garçons créent accidentellement une intelligence artificielle qui prend le contrôle de tous les appareils électroniques de la ville.",
      5: "Butters est envoyé dans un camp d'été pour enfants perturbés et organise une révolte avec les autres campeurs.",
      6: "Les garçons découvrent que leur professeur de musique est en réalité un ancien rockeur célèbre qui se cache.",
      7: "Cartman devient accro à un jeu vidéo en ligne et refuse de quitter sa chambre pendant des semaines.",
      8: "Les garçons sont coincés à l'école pendant une tempête de neige et doivent survivre avec des ressources limitées.",
      9: "Kenny développe une allergie mortelle qui le fait mourir chaque fois qu'il entend quelqu'un dire un mot spécifique.",
      10: "Les garçons découvrent un complot gouvernemental impliquant des extraterrestres vivant secrètement à South Park."
    }
  },
  
  "top-gun-maverick": {
    1: {
      1: "Après plus de 30 ans de service en tant que l'un des meilleurs aviateurs de la Marine, Pete 'Maverick' Mitchell est à sa place."
    }
  },
  
  "euphoria": {
    1: {
      1: "Rue, 17 ans, sort de désintoxication sans aucune intention de rester sobre. Elle rencontre Jules, une fille transgenre récemment arrivée en ville suite au divorce de ses parents, et se sent immédiatement attirée par elle.",
      2: "Au lendemain d'une soirée mouvementée, Rue fait face à Jules qui la questionne sur sa rechute. Nate est préoccupé par l'activité en ligne de Jules et McKay fait face aux pressions de l'université.",
      3: "Kat se lance dans une nouvelle quête audacieuse, tandis que Maddy découvre une activité suspecte sur le téléphone de Nate. Cassie est tiraillée entre ses sentiments pour McKay et ses interactions avec Daniel.",
      4: "Gia, Jules et Rue se rendent à la kermesse. Tandis que Nate juge la tenue de Maddy déplacée, McKay ne présente pas Cassie comme sa petite amie, ce qui ne manque pas de blesser la jeune femme.",
      5: "i Rue est aux anges depuis qu'elle s'est rapprochée de Jules, cette dernière semble de plus en plus mal à l'aise. Après la kermesse, des marques de strangulation sont remarquées sur le cou de Maddy.",
      6: "À la fête d'Halloween du lycée, Rue teste la loyauté de Jules, Kat explore sa nouvelle personnalité, et Cassie et Maddy discutent de leurs relations tendues.",
      7: "Après une cure de désintoxication, Rue, 17 ans, fait la connaissance de Jules, qui vient d'emménager. Les deux ados se soutiennent et explorent leur sexualité...",
      8: "La grossesse pousse Cassie à se rapprocher de sa mère. Tout comme ses camarades, elle doit à présent faire des choix"
    },
    2: {
      1: "Rue et Jules se retrouvent à la fête du Nouvel An, mais les tensions sont palpables. Cassie cherche à faire face à sa rupture avec McKay, tandis que Lexi se lie avec Fezco.",
      2: "Nate et Cassie entament une relation secrète alors que Rue met en place un plan audacieux. Jules s'interroge sur sa relation avec Rue.",
      3: "Cal se confronte à son passé. Lexi commence à travailler sur sa pièce de théâtre, tandis que Rue continue de lutter contre son addiction.",
      4: "La pièce de théâtre de Lexi prend forme, exposant les secrets et les tensions du groupe. Cassie s'isole de plus en plus à cause de sa relation avec Nate.",
      5: "Rue atteint son point de rupture. Jules et Elliot se rapprochent, tandis que la famille de Rue organise une intervention.",
      6: "Rue affronte les conséquences de ses actions. Maddy découvre la vérité sur Cassie et Nate, déclenchant un conflit explosif.",
      7: "La pièce de Lexi est enfin présentée, révélant des vérités inconfortables. Les tensions atteignent leur paroxysme entre les différents personnages.",
      8: "Les conséquences de la pièce de Lexi se font sentir. Rue commence son chemin vers la guérison, tandis que Nate prend une décision qui changera la vie de plusieurs personnes."
    }
  },
  
  "the-boys": {
    1: {
      1: "Lorsqu'un super-héros tue l'amour de sa vie, Hughie Campbell, vendeur de matériel informatique, s'allie à Billy Butcher, un justicier qui n'a qu'une obsession, buter tous les super-héros corrompus",
      2: "Un super-héros se fait choper par la bande, Stella se venge, Le Protecteur se lâche et un sénateur s'encanaille.",
      3: "C'est la course du siècle. A-Train et Onde de Choc se battent pour le titre de l'Homme le plus rapide du monde. Du côté des justiciers, la bande est enfin au complet, et ça, ça fait du bien.",
      4: "Dans cet épisode si particulier de The Boys… on voit du sang, du gore, des détournements d'avion, de la folie, des fantômes et une femme très mystérieuse.",
      5: "La bande se dirige vers l'expo de l'Espérance pour suivre une piste prometteuse dans leur guerre contre les Supers. Il se peut qu'il y ait... PEUT-ÊTRE... un bébé meurtrier, mais tu devras le regarder",
      6: "Stella fait face aux conséquences de ses révélations à l'exposition Believe et s'affirme face à Madelyn. La Crème explique aux autres membres du groupe ce que lui et Butcher ont découvert à l'hôpital",
      7: "Ne jamais faire confiance à un super-héros au bout du rouleau - les Boys apprennent cette leçon à la dure. Pendant ce temps, Le Protecteur plonge dans son passé, Stella découvre que l'amour, ça fait mal",
      8: "C'est le grand final de la saison ! Tout est résolu ! Les secrets sont révélés ! Les conflits sont… conflictuels ! Des personnages explosent, et bien plus encore !"
    },
    2: {
      1: "La situation est plus que délicate pour les Boys : Butcher, qui reste introuvable, a été accusé du meurtre de Madelyn. Ils sont accusés de terrorisme et tous recherchés. Contraints de rester caché",
      2: "Butcher est de retour, ce qui ne plait pas à Hughie. Le Protecteur décide de passer du temps avec son fils, Ryan, sous le regard impuissant de Becca. L'Homme-Poisson reste chez l'Aigle qui lui présente sa marraine",
      3: "Les Boys doivent gérer la garde du Super-Terroriste, Kenji, le frère de Kimiko, le temps de le remettre à la CIA, tout en restant discret étant toujours recherchés eux même en tant que terroristes",
      4: "Road-Trip ! Les Boys se rendent en Caroline du Nord pour suivre la piste d’une mystérieuse Super nommée Liberty. Saviez-vous que l’on peut identifier un serial-killer par son type de barre chocolatée préférée ?",
      5: "VoughtStudios est heureux d'annoncer que le tournage de #LAubedesSept a commencé. 12 ans de films VCU l'y ont conduit. Si vous aimez les films sur Un Héros, vous adorerez un film sur Sept Héros.",
      6: "Le Sage Grove Center® se consacre à la prise en charge des personnes souffrant de maladies mentales. Nos bienveillants médecins et conseillers fournissent des services personnalisés pour que chaque patient puisse croquer la vie à pleine dent",
      7: "La mascarade de commission d’enquête contre Vought initiée par Victoria Neuman se tiendra dans 3 JOURS. La laisserons-nous incriminer les Super-héros qui nous protègent ? Aux armes, citoyens, et rejoignez-nous contre cette flagrante politique partisane",
      8: "*** Alerte Super-vilain *** Ceci est une notification du Département de la Sécurité intérieure. Une alerte au super-vilain est en cours dans les environs. Veuillez être vigilant et signaler toute personne ou activité suspecte"
    },
    3: {
      1: "Après sa scandaleuse liaison avec Stormfront, le Protecteur fait son mea culpa publiquement lors de l'avant-première du nouveau film sur les 'Sept' au Lamplighter Memorial Theater de la Tour Vought.",
      2: "Hughie partage ses récentes découvertes sur Vic avec Stella. De son côté, celle-ci est une fois de plus contrariée par le Protecteur. Toujours hanté par ses démons, Butcher peine à garder le contrôle",
      3: "Le discours du Protecteur lui permet - contre toute attente - de voir sa côte de popularité remonter. Et son assurance aussi. Stella et le Protecteur doivent s'entendre sur le choix des recrues qui intègreront les Sept.",
      4: "Acculée encore une fois dans ses retranchements lorsque le Protecteur annonce publiquement qu'ils sont en couple, Stella cherche des alliés pour contrer les agissements de cet adversaire imprévisible.",
      5: "Butcher, la Crème et les autres sont abasourdis par leur découverte en Russie. Après les récents changements au sein du Conseil d'administration de Vought, l'Homme-poisson prend la tête de la section Analyse Criminelle.",
      6: "Ayant découvert qui est derrière les dernières attaques, le Protecteur espère que l'information, qui pourrait être fatale pour Vought, ne fuitera pas. Sachant qu'il est l'un des prochains sur la liste, Black Noir,",
      7: "Suite à la publication de sa vidéo sur les réseaux sociaux, Stella est discréditée par Vought. Butcher et Hughie continuent de s'injecter du V provisoire pour pouvoir se défendre face à leurs adversaires.",
      8: "L'opinion publique est divisée après les déclarations du Protecteur sur le live Instagram de Stella, et les actions de Vought s'effondrent. Hughie ressent de plus en plus les effets secondaires du V provisoire."
    },
    4: {
      1: "Le monde est au bord du gouffre. Victoria Neuman est plus proche que jamais du Bureau Oval et sous la coupe musclée du Protecteur, qui consolide son pouvoir. Butcher, qui n’a plus que quelques mois à vivre,",
      2: "Vous saviez que les mondialistes mettaient des produits chimiques dans la nourriture pour nous rendre homos, que Dakota Bob était un démon venu tout droit de l'enfer et que la lune n'existait pas ?",
      3: "En décembre à la Vought Coin Arena, l'histoire de Noël est présentée telle qu'elle devait être contée : sur la glace. Billets disponibles sur VoughtSurGlace.com.",
      4: "Vought News Network est fière de présenter sa nouvelle série #Véritéexplosive ! Suivez la présentatrice Firecracker et ses célèbres invités pour la première de six heures en direct où ils dénoncent les Parties Adrénochromes de Stella !",
      5: "Votre attention #superfans ! Cette année à #V52, découvrez A-Train en direct et en personne qui vous fera découvrir un avant-goût de son histoire vraie et passionnante : LA FORMATION D'A-TRAIN ! V52 : Proposé par les fans, pour les fans !",
      6: "Les Services Pénitentiaires Vernon se proposent d'aider activement leurs prisonniers afin qu'ils réussissent leur réinsertion. Chez Vernon, ce n'est pas une question de détention, mais de famille.",
      7: "Salut, les jeunes ! Votre voisin, votre oncle, ou même vos parents essaient de détruire l'Amérique ? Découvrez comment l'empêcher sur l'Avenue V Christmas Special ! Si vous voyez quelque chose, dénoncez-le !",
      8: "À tous les patriotes ! Nous devons empêcher que ces élections truquées soient confirmées demain ! Mettons fin au projet anti-Sage de Bob Singer ! PRÉPAREZ-VOUS À LA GUERRE ! #LàOùUnSeulVaVoughtVa"
    }
  }
};

export default episodeDescriptions;

// Fonction utilitaire pour récupérer la description d'un épisode
export function getEpisodeDescription(seriesId: string, episodeId: number, seasonNumber: number = 1): string {
  // Vérifier si c'est un film en cherchant dans seriesData
  const series = seriesData.find((s: Content) => s.id === seriesId);
  
  // Si c'est un film, ne pas afficher "Description non disponible"
  if (series && series.type === "Film") {
    return "";
  }
  
  // Pour les séries, comportement habituel
  if (!episodeDescriptions[seriesId] || !episodeDescriptions[seriesId][seasonNumber] || !episodeDescriptions[seriesId][seasonNumber][episodeId]) {
    return "Description non disponible";
  }
  return episodeDescriptions[seriesId][seasonNumber][episodeId];
} 