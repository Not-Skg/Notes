---
tags:
  - Osint
  - googlelens
  - whatsmyname
  - LAF
  - Chall
  - casebandit
draft: false
order: 14
---
## Éléments déjà découverts
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.
>Voici le graphique issu de la dernière partie : [[Chapitre 2 - Acte 3 - Financement]]

![[LAF_C2_A3_F.svg]]

Nous allons pouvoir nous appuyer dessus pour poursuivre nos recherches dans la suite du CTF.

---
## Dans le sillage du cachalot

### Énoncé
>Le nouveau site que vous venez de trouver est une véritable mine d'informations. Ainsi, le groupe que vous avez commencé à suivre ne se limite pas aux animaux locaux, mais s'intéresse aussi aux animaux plus exotiques.
>![[LAF_C2_A3_T_SC_P.png]]
>
>Il n'a pas tort, alors autant commencer par le commencement.
>
>>Quel est le port de départ et d'arrivée du bateau ayant ramené des animaux en ce début d'année ?  
>
>_Format : `Paris-Dakar`

### RETEX
Pour rappel, le nouveau site trouvé en question, c'est le .onion.
![[LAF_C2_A3_T_SC_1.png]]
Dans l'onglet "Actualité", on peut voir une notification postée par Maximus au sujet d'un nouvel approvisionnement par cargo.
On a aussi accès à une image du cargo en question.
![[LAF_C2_A3_T_SC_2.png]]
Sur ce cargo, on peut lire : "GERD" et "safety first".
En utilisant Google Lens sur l'image, on peut retrouver plus d'informations sur ce cargo, notamment son identifiant IMO : 9052707.
Et le nom de ce cargo : [GERD](https://www.shipspotting.com/photos/3926582?).

Pour trouver l'historique de navigation de ce bateau gratuitement, je n'ai trouvé qu'un seul site fiable : [globalfishingwatch.org](https://globalfishingwatch.org/map/fishing-activity/)

Par contre, il nous manque encore une information : à quelle date correspond le trajet dont on cherche les ports ?

Pour ça, on peut pivoter sur Maximus : on avait trouvé un peu plus tôt [son calendrier Google](https://calendar.google.com/calendar/u/0/embed?src=tuskontheroad@tacosint.fr), regardons-le de plus près.
![[LAF_C2_A3_O_TT_CGG.png]]

Sur ce planning, il est noté que le départ du cargo était le 25/02/2026 et que l'arrivée était le 27 février. De plus, Morelos le confirme dans Keybase.
![[LAF_C2_A3_T_SC_3.png]]

En rentrant l'IMO du cargo et les dates recherchées, on peut récupérer le trajet.
![[LAF_C2_A3_T_SC_4.png]]
Le GERD était donc à quai à Nador, au Maroc, depuis le 25 févr. 2026 à 05:24 UTC, pendant 7h 52.
![[LAF_C2_A3_T_SC_5.png]]
Et il a fini à quai à Valence, en Espagne, le 27 févr. 2026 à 08:44 UTC.

Le flag était donc : **==Nador-Valence==**

---
## La caravane de dromadaires

### Énoncé
>Vous vous lancez donc dans la tâche fastidieuse de retracer le parcours de ces pauvres animaux. Vous avez déjà un morceau du trajet, mais pour le retracer complètement, il vous faut déjà déterminer le lieu où ces animaux ont été pris en charge par le groupe que vous suivez.
>
>> Où le groupe a-t-il séjourné lorsqu'il a pris en charge les animaux de ce chargement pour la première fois ? 
>
>_Format : `XX.XXXXXXX, XX.XXXXXXX`

### RETEX
Toujours sur le [calendrier Google de Maximus](https://calendar.google.com/calendar/u/0/embed?src=tuskontheroad@tacosint.fr), on peut voir qu'il avait une réservation d'hôtel les 19 et 20 février, soit quelque temps avant : ça doit être le lieu dont parle l'énoncé.

Pour continuer nos recherches, on aurait pu utiliser les avis Google Maps du compte de Maximus, mais il n'en a qu'un seul, localisé à Orléans. Il va donc falloir chercher autre part.
![[LAF_C2_A3_O_TT_WMN.png]]
Dans la partie [[Chapitre 2 - Acte 3 - Organisation]], on avait fait une recherche WhatsMyName pour trouver ce qui était lié au nom d'utilisateur de Maximus : `tuskontheroad`.
Et dans les résultats, on avait eu un [avis TripAdvisor](https://www.tripadvisor.com/ShowUserReviews-g303168-d8024019-r269336747-Hotel_Tahat-Tamanrasset_Tamanrasset_Province.html) sur l'hôtel "Hotel Tahat" !
![[LAF_C2_A3_T_CD_1.png]]
On reconnaît bien Maximus sur sa photo de profil, il utilise même le pseudo Maximus.
![[LAF_C2_A3_T_CD_2.png]]
On peut récupérer les coordonnées de l'hôtel via Google Maps : **==22.782784, 5.535160==**

---
## La Migration de la Cigogne

### Énoncé
>Nous savons donc où le cargo est arrivé. Mais pour procéder à la livraison des clients finaux, les animaux ont dû passer par la frontière avec la France. Un groupe de cette envergure doit sûrement réutiliser les mêmes routes, il serait donc utile de connaître ce point de passage afin d'empêcher la prochaine livraison.
>
>> Où la frontière franco-espagnole a-t-elle été franchie lors de la livraison ? 
>
>_Format : `XX.XXXXXXX, XX.XXXXXXX`

### RETEX
J'avais omis de le mentionner depuis le début, mais l'équipe partie chercher la cargaison d'animaux jusqu'au Maroc est composée de Morelos, Martinezi, Julietteae et Maximus ; on le sait grâce à un message sur Keybase de Lycaon à leur égard.
![[LAF_C2_A3_T_NCS_1.png]]

Un peu plus loin dans la conversation, on trouve un échange où Morelos explique à Lycaon avoir passé la frontière et avoir fait une pause juste à droite après celle-ci.
![[LAF_C2_A3_T_MC_2.png]]
Et si on fait bien attention, Morelos avait aussi expliqué, 5 heures plus tôt, être partis (en retard).
![[LAF_C2_A3_T_MC_3.png]]

Le trajet entre le port de Valence (Espagne) et le lieu de pause (proche de la frontière) a donc duré à peu près 5h.

Maintenant, analysons la photo jointe au message de pause de Morelos :
![[LAF_C2_A3_T_MC_4.png]]

On peut y remarquer deux éléments qui vont nous permettre de trouver ce lieu.

Tout d'abord, la méthode de notre expert en lampadaires : Heiden !
La première méthode consiste à faire comme pour la partie [[Chapitre 1 - La Famille Michelle - BONUS]], à savoir utiliser les lampadaires comme indicateurs géographiques.

Cette fois-ci, c'est un peu plus simple : on a juste à utiliser Google Street View dans chaque village de la frontière franco-espagnole jusqu'à trouver un village qui possède le même type de lampadaire.
![[LAF_C2_A3_T_MC_5.png]]
Ce faisant, on finit par trouver le village nommé Bourg-Madame et, en cherchant le même type d'intersection via vue satellite, on finit par trouver le lieu exact de la pause :
![[LAF_C2_A3_T_MC_6.png]]
Enfin, il ne nous reste plus qu'à reprendre la vue satellite pour voir comment ils ont pu arriver ici en passant la frontière, puis en allant directement à droite.
![[LAF_C2_A3_T_MC_7.png]]
On trouve donc les coordonnées suivantes pour le passage à la frontière : **==42.433713, 1.940837==**.
La deuxième méthode consistait à s'intéresser au disque métallique imprimé sur la route avec le numéro 482.
![[LAF_C2_A3_T_MC_8.png]]

En faisant la recherche `482 espagne france route frontière`, on pouvait trouver [un blog](https://curiositespyrenees.blogspot.com/2017/06/bornes-frontiere-des-pyrenees.html) qui répertorie les bornes qui existent à la frontière des Pyrénées.
![[LAF_C2_A3_T_MC_9.png]]
La borne 482 y était bien référencée, localisée à Bourg-Madame ; on pouvait ensuite continuer comme pour la première méthode.

---
## La nuée de chauves-souris

### Énoncé
>Au cours de leur trajet pour rapatrier les animaux, ceux-ci vont devoir effectuer plusieurs pauses. Parmi ces pauses, l'une d'elles semble avoir un double usage, car les membres en profitent pour rencontrer un certain "groupe du Sud-Ouest".
>
>>Où cette rencontre a-t-elle eu lieu ? 
>
>_Format : `XX.XXXXXXX, XX.XXXXXXX`

### RETEX
On peut trouver une mention du "groupe du Sud-Ouest" dans Keybase, au moment où Lycaon mentionne tous les membres de l'équipe.
![[LAF_C2_A3_T_NCS_1.png]]
Le message précise qu'ils doivent se rejoindre à 20h dans un lieu avec des branchages, sur un chemin un peu étroit, localisé via la chaîne de caractères `spbcj83c`.
Pour savoir ce qu'est cette suite de caractères, on peut demander à une IA, qui nous explique que c'est un [geohash](https://fr.wikipedia.org/wiki/Geohash), puis utiliser un [GeoHash Explorer](https://geohash.softeng.co/spbcj83c) pour savoir quel lieu il pointe.
![[LAF_C2_A3_T_NCS_2.png]]
On valide rapidement via vue satellite que c'est bien un chemin étroit.
![[LAF_C2_A3_T_NCS_3.png]]
On peut ensuite vérifier via Street View que la cabane pointée est entourée de branches et semble bloquer un peu l'entrée.

On vient donc de trouver le lieu de rassemblement avec le groupe du Sud-Ouest : **==43.77116203, 1.29896164==**

---
## La tanière du lion

### Énoncé
>Bon, vous décidez de vous recentrer sur l'essentiel. Ce groupe va procéder à une grosse opération, et ce qui compte c'est de savoir le point de chute de tout ça pour avertir la police et leur tomber dessus quand ils seront tous au même endroit.
>
>>Quel est le lieu où la prochaine soirée du groupe est prévue ?
>
>_Format : `XX.XXXXXXX, XX.XXXXXXX`

### RETEX
Pour rappel, un message dans le canal Events de Keybase précisait que, pour se rendre à la nouvelle soirée (Bellerophon), il fallait récupérer le point de départ dans la boîte aux lettres mortes (découverte dans la partie [[Chapitre 2 - Acte 3 - Communication]]).
![[LAF_C2_A3_T_TL_1.png]]
Puis suivre le tracé ci-dessous afin de trouver le lieu de la soirée.
![[LAF_C2_A3_T_TL_2.jpg]]
On peut déjà noter que le tracé représente un fléché allemand. Pour plus d'informations, je vous invite à lire [cet article](https://www.sport-nature.net/fleche-allemand/).

![[LAF_C2_A3_T_TL_3.png]]
Sur le drive découvert un peu plus tôt, il y avait un fichier nommé `point-départ-bellerophon.pdf` : ce doit être le fichier imprimé et glissé dans la boîte aux lettres mortes.
Ce fichier contient deux indications :
- ETT 51075 : ça doit nous donner une coordonnée précise
- "prendre la route en direction du nord" : ça va nous servir à connaître la direction initiale pour débuter le fléché allemand.

On a cherché très longtemps ce que pouvait signifier ETT, mais une IA a fini par nous donner la réponse :
![[LAF_C2_A3_T_TL_4.png]]
ETT signifie Équipement de Terrain Tourelle, c'est donc un sigle qui sert de code d'identification pour les radars routiers.

La bonne façon de le savoir (sans IA) aurait été de chercher dans une base de données communautaire comme OpenStreetMap.

![[LAF_C2_A3_T_TL_5.png]]
On peut retrouver un jeu de données listant les radars en France sur [data.gouv](https://www.data.gouv.fr/datasets/liste-des-radars-fixes-en-france).
![[LAF_C2_A3_T_TL_6.png]]
Dessus, on apprend que l'ETT 51075 est aux coordonnées : +47.674316, +1.328694.
![[LAF_C2_A3_T_TL_7.png]]
Une fois retrouvé sur Google Maps, il suffit de suivre le fléché allemand via la vue satellite en excluant les chemins agricoles (qui ne sont pas de vraies routes).
![[LAF_C2_A3_T_TL_8.png]]
Sur la capture ci-dessus, on peut voir le chemin qui suit le fléché allemand, les chemins agricoles (barrés en noir) et la destination de ce fléché allemand : le lieu-dit "Villarçay", situé aux coordonnées : **==47.7017958024, 1.3421130180==**
Pour information, le "T" dans le fléché allemand n'est pas une notation commune, mais il signifie généralement une route fermée au public.

---
## Synthèse de nos éléments
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.

![[LAF_C2_A3_T.svg]]