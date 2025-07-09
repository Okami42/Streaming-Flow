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
      3: "L’enseignant de l’école élémentaire de South Park, M. Garrison annonce que Cartman a remporté le concours national de rédaction Sauvons notre planète, à la grande colère de sa camarade de classe, Wendy Testaburger, qui le soupçonne aussitôt de tricherie.",
      4: "Sparky, le nouveau chien de Stan, a suivi son maître jusqu'à l’arrêt de bus. Comme Stan affirme que Sparky est le chien le plus féroce de South Park, Cartman parie que Sylvester, un autre chien de la ville, est plus féroce.",
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
      1: "Le film de Terrance et Philippe sort au cinéma, et les garçons font tout pour le voir malgré son classement R.",
      2: "Cartman découvre l'identité de son père, mais sa mère refuse de lui dire la vérité.",
      3: "Les habitants de South Park commencent à exploser spontanément, et le maire charge Stan et Kyle de résoudre le mystère.",
      4: "Cartman se fait passer pour un enfant handicapé mental pour participer aux Jeux Paralympiques et gagner de l'argent.",
      5: "Les garçons découvrent un poulet géant qui hypnotise les gens et les force à agir de manière érotique.",
      6: "Les garçons créent un club secret pour échapper aux filles, mais Wendy est déterminée à y entrer.",
      7: "Après avoir vu un documentaire sur les vaches, les garçons décident de libérer toutes les vaches d'une ferme locale.",
      8: "Chef aide les garçons à créer un groupe de musique pour participer à un concours de talents, mais ils deviennent rapidement célèbres pour les mauvaises raisons.",
      9: "Cartman se fait enlever par des extraterrestres qui lui implantent une sonde anale. Quand il revient, personne ne le croit.",
      10: "Les garçons découvrent que leur professeur, M. Garrison, mène une double vie secrète le week-end."
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
      1: "Les garçons découvrent que les gnomes voleurs de slips existent réellement et qu'ils dirigent une entreprise secrète sous la ville.",
      2: "Cartman devient accro à KFC et commence à vendre du poulet illégalement après la fermeture du restaurant local.",
      3: "Les garçons créent un film d'horreur amateur qui est accidentellement pris pour un documentaire réel sur des événements paranormaux.",
      4: "Kenny obtient un emploi dans une animalerie locale et découvre que le propriétaire maltraite les animaux.",
      5: "Les parents de South Park deviennent obsédés par un nouveau jeu de société, négligeant complètement leurs enfants.",
      6: "Butters est confondu avec un chien errant et envoyé à la fourrière, où il doit survivre parmi les animaux.",
      7: "Les garçons découvrent une conspiration impliquant les dentistes de la ville qui implantent des dispositifs de contrôle mental.",
      8: "Cartman prétend être possédé par le fantôme d'une star de cinéma décédée pour attirer l'attention.",
      9: "Les garçons sont kidnappés par un culte qui croit que Kenny est leur prophète réincarné.",
      10: "La ville est envahie par des hippies organisant un festival de musique, et Cartman forme une équipe anti-hippies pour les arrêter."
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