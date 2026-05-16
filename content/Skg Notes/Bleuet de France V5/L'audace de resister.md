---
tags:
  - Osint
  - BleuetV5
  - Chall
  - suncalc
---
![[BleuetV5.png]]

>[!info] Notes
> Voici les retex des challs liés à la partie "L'audace de résister" du CTF BLEUET DE FRANCE V5 by AEGE.

***Les autres parties du CTF :***
 · | · [[Dans la peau d'un resistant]]
 · | · L'audace de résister
 · | · [[Un devoir de memoire]]
 · | · [[L'art de resister]]
 · | · [[Nos partenaires]]

---
## Alias et acide

### Énoncé 
>![[BLEUETV5_ADR_AeA.png|500]]
> Dans la valise de votre grand-père, vous tombez sur des dizaines de documents, de lettres et d’images. Plusieurs articles papiers que vous avez lu font état de l’arrestation de ==Maurice Ripoche en 1943==. Le mouvement de Résistance « ==Ceux de la Libération== » est alors repris par un homme, ==chimiste de profession==. Il avait compris que pour résister, l'inventivité était primordiale. Son laboratoire, situé à l'==Académie de médecine==, servait régulièrement de lieu de rendez-vous clandestin et de point de départ pour des actions de sabotage.
>
>1. Quel était son alias de résistant ? 
>2. Quelle invention chimique a-t-il mis au point pour saboter les camions allemands ?
>
>>**Format du flag** : legrand_plaques_lumineuses

### RETEX
Il faut donc retrouver l'homme qui a pris la tête du mouvement de résistance "Ceux de la Libération" à la suite d'un certain "Maurice Ripoche" en 1943.
Pour commencer nos recherches, nous pouvons nous rendre sur [la page wikipédia du mouvement](https://fr.wikipedia.org/wiki/Ceux_de_la_Lib%C3%A9ration).
![[BLEUETV5_ADR_AeA_CDLL.png|500]]

On a déjà la réponse à notre première question, Roger Coquoin alias ==Lenormand== a remplacé Maurice Ripoche en tant que chef de CDLL.

![[BLEUETV5_ADR_AeA_RC.png|500]]
[La page wikipédia de Lenormand](https://fr.wikipedia.org/wiki/Roger_Coquoin) nous permet de vérifier les informations de l'énoncé.

Il ne nous reste plus qu'à trouver l'invention chimique qu'il a mise au point pour saboter les camions allemands en cherchant les mots clés suivant sur Google : `Roger Coquoin Lenormand sabotage camion allemands invention`

Le [premier site indexé](https://www.ordredelaliberation.fr/fr/compagnons/roger-coquoin) nous dit qu'il avait inventé des ==pastilles abrasives== destinées aux camions allemands.
![[BLEUETV5_ADR_AeA_PA.png]]

On a donc le flag complet : **==lenormand_pastilles_abrasives==**

---
## Le glacier tenace

### Énoncé 
>![[BLEUETV5_ADR_GT.png|500]]
>Dans la valise, une seule mention griffonnée : « monument - combats - devise du chef - merci ». Votre grand-père n'a pas précisé quel était ce monument. En cherchant, vous tombez sur une piste inattendue : un personnage de Picsou qui ==apprécie== tout particulièrement la « diversité » de parfums de glace de la ==Gelateria Venezia de Nyon en Suisse==. Ce personnage est déjà allé en France, dans ce monument aux morts qui rend hommage aux résistants et l’a pris en ==photo==. Renseignez-vous sur ce lieu de résistance. Qui fut le chef résistant qui s’est particulièrement illustré lors des combats à cet endroit  ?
>
>Trouvez sa devise.
>
>>**Format de flag** : Le monde entier ne pourra nous résister **il n'y a pas de _ pour ce flag**

### RETEX

Pour ce challenge, j'ai d'abord commencé par chercher un lien entre le magazine de Picsou et un monument au mort. Mais je n'ai trouvé aucun numéro "d'hommage" ou autre mention de monuments aux morts lié à une aventure de la bande a Picsou, j'ai donc changé d'idée et j'ai décidé de chercher le glacier de l'énoncé et de vérifier s'il n'y a pas des avis Google Maps d'un personnage de picsou.

![[BLEUETV5_ADR_GT_DD.png|500]]

J'ai pu trouver un commentaire d'un certain "Donald Duck" qui mentionne la "diversité de parfums". On a donc bien retrouvé les informations de l'énoncé.
Maintenant, on va devoir vérifier si un(e) de ses avis/photos google est lié à un monument au mort.
![[BLEUETV5_ADR_GT_MM.png|500]]

Il n'a partagé que très peu de photos sur Google en France, on peut donc vite faire le tri et en trouver une du monument des Glières.

![[BLEUETV5_ADR_GT_MMG.png|500]]
Ce monument [rend hommage](https://fr.wikipedia.org/wiki/Monument_national_%C3%A0_la_R%C3%A9sistance_du_plateau_des_Gli%C3%A8res) à l'action du maquis des Glières.
![[BLEUETV5_ADR_GT_MG.png|500]]
Ils ont su tenir face aux troupes ennemies et se faire une base pour sécuriser des largages malgré la [différence d'effectif](https://fr.wikipedia.org/wiki/Maquis_des_Gli%C3%A8res).

[D'après sa page wikipédia](https://fr.wikipedia.org/wiki/Tom_Morel), Tom Morel, le chef du maquis des Glières avait pour devise : **==vivre libre ou mourir==**

Pour plus d'infos sur ce maquis et comment ils ont résistés, je conseille la [vidéo](https://youtu.be/GjUbp_kzLcI?si=hwhPDu0jljoR0-pR) de The Great Review qui relate très bien l'histoire.


---
## Plymouth 2

### Énoncé 
>![[BLEUETV5_ADR_P2.png|500]]
> En fouillant dans la valise, vous identifiez un document faisant référence au ==Plan Sussex==. Lancé en mars 1943, ce plan consistait à ==parachuter des binômes d’agents français derrière les lignes allemandes== afin de collecter et transmettre des renseignements stratégiques.  Mis en œuvre à grande échelle en 1944, en préparation du débarquement et de la libération de la France, ce plan comprenait également des missions spéciales destinées à approvisionner les groupes de Résistance en armes et munitions sur le territoire occupé.  Votre grand-père avait fait beaucoup de recherches sur certains résistants ayant participé à ce plan.
>
>À partir de ces éléments, retrouvez le nom de l’==opérateur radio chargé de parachuter l'équipage Plutarque de la mission Plymouth 2==.
>
>>**Format du flag** : Delaunay

### RETEX

Pour commencer ce challenge, j'essaie de trouver le plus de contexte possible sur cette mission via les mots clés : `Plan Sussex plutarque plymouth 2`

Je trouve [un rapport](https://www.plan-sussex-1944.net/fr/pdf/parachutages_10_equipes_Sussex_Souppes_sur_Loing.pdf) réalisé à partir de témoignages qui m'apprend ce qui suit : 
- **André Degorse** : agent Sussex, pseudonyme **Louis Bessonne** ; il fait partie de l’équipe Plutarque parachutée le 8 mai 1944 et est décrit comme ingénieur géophysique dans le témoignage associé à l’opération. Il est l'observateur.
- **Henri Schouler** : agent Sussex, pseudonyme **André Beignet** ; il constitue avec Degorse le second membre de l’équipe Plutarque. Il fait l'échange radio avec Londres
- **Gilbert Gaillardon** : responsable du parachutage de l’équipe ; il est mentionné comme l’homme sollicité pour assurer le parachutage lié à la mission Sussex.
- **Lieutenant-colonel Soubestre** : responsable du Plan Sussex, aussi cité comme le cadre qui confie l’organisation et la réception par parachutages d’agents SR du BCRA.

![[BLEUETV5_ADR_P2_R.png|500]]
J'apprends aussi des infos sur l'avion (Liberator B 24 des Carpetbaggers de l’USAAF) qui les a largués, sur l'équipage qui le composait (Saint-Clair) et leur code de mission (Mission n°393).

Je trouve même un [tableau récapitulatif](https://www.plan-sussex-1944.net/fr/pdf/missions_sussex_parachutages_agents.pdf) des missions du Plan Sussex et des parachutages liés.
![[BLEUETV5_ADR_P2_T.png|500]]
Malheureusement, il n'y a aucune information sur l'opérateur radio qui était chargé de parachuter le binôme.

Je décide donc de chercher un peu plus sur [ce site](https://www.plan-sussex-1944.net/fr/) qui a l'air de regorger d'informations sur ce Plan. Et d'orienter mes recherches vers les [Carpetbaggers](https://www.plan-sussex-1944.net/fr/plan-sussex.html#escadrille-carpetbaggers).
![[BLEUETV5_ADR_P2_CB.png|500]]
Un équipage y est décrit, mais ça n'a pas l'air d'être l'équipage Saint-Clair.

En ouvrant les rapports de missions des Carpetbagger, je tombe trouve le rapport de la mission 393.
![[BLEUETV5_ADR_P2_393.png|500]]
J'obtiens donc les noms de tout l'équipage présent et donc de l'opérateur radio : **==Jones==**

---
## Le tract dissident

### Énoncé 
>![[BLEUETV5_ADR_TD.png|500]]
> [Une photographie](https://bleuet.aege.fr/files/5c215111e4f1c61d441bae2156a0015e/CTF_Bleuet_2K26_-_Le_tract_dissident_-_bis.png) attire votre attention : des cyclistes qui ne font que passer, ou qui distribuent des tracts dans la rue. Votre grand-père avait noté une date en marge : 29 octobre. Cependant, vous ne parvenez pas à confirmer cette date avec vos propres recherches, alors vous décidez de faire lui faire confiance.
>
>Retrouvez le lieu et l’heure **(arrondie à l’entier)** à laquelle cette photographie a été prise.
>
>>> _Nota bene_ : Les « cyclistes lanceurs de tracts » désignent des résistants qui utilisaient le vélo pour diffuser rapidement des tracts et journaux clandestins, parfois « à la volée », tout en se fondant dans la circulation ordinaire.
>
>>**Format de flag** : nom_de_la_rue_heure (_exemple_ : rue_jean_jacques_rousseau_23)

### RETEX

Pour ce challenge, on va simplement commencer par une recherche d'image inversée via Google Lens.
![[BLEUETV5_ADR_TD_P.png|500]]
Un [premier site](https://www.musee-resistance.com/expositions-doisneau-presentation/) nous donne la rue : ==Henry_Monnier==, et un [deuxième](https://mezzaluna.me/post/59676387089) nous donne une version uncropped et un [troisième](https://expresso.pt/revista/fisga/planetario/2024-01-06-A-resistencia-na-fotografia-de-Robert-Doisneau-958faa5a) nous précise l'année ; 1945.

Maintenant, on passe à ma parti préféré : l'analyse.
Déjà, on peut vérifier le point de prise de la photo.
![[BLEUETV5_ADR_TD_M.png]]
On a de la chance, la pharmacie n'a pas changé d'emplacement et les bâtiments n'ont pas été rénovés.

Il ne nous reste donc plus qu'à trouver l'heure et pour ce faire, on va utiliser l'outil suncalc.
Il nous permet de voir simuler les ombrages en fonctions d'une date et d'un lieu.
![[BLEUETV5_ADR_TD_SC.png]]
Après une rapide analyse, j'en déduis qu'il était entre 11h et 13h. 
En coupant la poire en deux, on a le flag : **==rue_henry_monnier_12==**.
Normalement, on pourrait être plus précis, mais on avait le droit à trois essais et vu que j'aime le risque, j'ai testé les trois heures en finissant par 12H.


---
***Les autres parties du CTF :***
 · | · [[Dans la peau d'un resistant]]
 · | · L'audace de résister
 · | · [[Un devoir de memoire]]
 · | · [[L'art de resister]]
 · | · [[Nos partenaires]]