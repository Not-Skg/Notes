---
title: Track Bonus - Le 14 Juillet
tags:
  - Osint
  - Chall
  - PerceLeFrontNumeriqueV2
order: 6
description: RETEX des challenges de la partie "Track Bonus - Le 14 Juillet" du CTF Perce le Front Numérique V2
---
![[PLFNV2_WP.jpg]]

>[!info] Notes
> Voici les retex des challs liés à la partie "Track Bonus - Le 14 Juillet" du CTF Perce le Front Numérique V2.

***Les différentes parties du CTF :***
 · | · [[Learning Track]]
 · | · [[Les monuments militaires français]]
 · | · [[La Section camouflage]]
 · | · [[Les femmes dans les armées]]
 · | · Track Bonus - Le 14 Juillet

---
## Le chant du retour

### Énoncé 
>![[PLFNV2_TB_CR_E.jpg]]
>Cette photographie d'archive capture un moment de ferveur populaire lors d'une fête nationale historique juste après la Grande Guerre, marquant le retour à la France d'un territoire longtemps annexé. 
>
>>Dans quelle la ville a été prise cette photo ? 
>>Combien d’enfants y ont chanté la Marseillaise ?
>
>_Format du flag :  `Ville - 1 000`_

### RETEX
On commence par une recherche par image inversée de la photo de l'énoncé avec Google Lens.
![[PLFNV2_TB_CR_GL.png|500]]
Le premier résultat est exactement notre image, sur un site alsacien, avec pour titre « Straßburg : fêtes du 14 juillet 1919 ». Le « territoire longtemps annexé » de l'énoncé, c'est donc l'Alsace, revenue à la France après la Grande Guerre, et la ville est Strasbourg.

On retrouve d'ailleurs la même carte postale sur [le portail patrimonial d'Abbeville](https://patrimoine.abbeville.fr/en/records/item/1961-strasbourg-14-juillet-1919-defile-des-societes-place-de-la-republique), légendée « Strasbourg. 14 juillet 1919, défilé des sociétés, place de la République » :
![[PLFNV2_TB_CR_AB.png|500]]

Pour le nombre d'enfants, il faut se méfier. En cherchant `Strasbourg 14 juillet 1919 enfants Marseillaise`, les résumés automatiques de Google avancent le chiffre de 10 000 enfants, sans source fiable. En remontant à la page d'où semblait venir l'information, [l'article « Allons enfants de la patrie » de Chemins de mémoire](https://web.archive.org/web/20240725111825/https://www.cheminsdememoire.gouv.fr/fr/allons-enfants-de-la-patrie-le-peuple-et-la-marseillaise) (le site était en maintenance pendant le CTF, il faut passer par la Wayback Machine), on se rend compte qu'il parle en fait de **Mulhouse**, le 10 décembre 1918, et de deux mille enfants :
![[PLFNV2_TB_CR_MUL.png|500]]
Ce n'est donc ni la bonne ville, ni la bonne date.

Après de longues recherches pour trouver une source plus solide, on a fini par tomber sur [le PDF de l'exposition « La Gloire et le Deuil »](https://www.servicehistorique.sga.defense.gouv.fr/sites/default/files/2021-04/expo_virtuelle_Gloire_deuil1_d%C3%A9finitive.pdf) du Service historique de la Défense (SHD), consacrée au souvenir des soldats entre 1919 et 1939 :
![[PLFNV2_TB_CR_SHD0.png|250]]
À la page 9, dans la partie « En France et chez les alliés, fêter le retour et la victoire », on trouve enfin la réponse :
![[PLFNV2_TB_CR_SHD.png|500]]
À Strasbourg, 25 000 enfants entonnent la Marseillaise. Le flag était donc **==Strasbourg - 25 000==**.

---
## L'allié oublié

### Énoncé 
>Le 14 juillet 1919, un immense défilé est organisé dans Paris afin de célébrer la victoire dont le tracé traverse de nombreux lieux emblématiques de la capitale. 
>Cette parade militaire a également la particularité de faire défiler toutes les armées ayant participé au conflit aux côtés de la France, y compris des pays auxquels on ne s’attend pas…
>
>>À quelle heure a défilé l’armée siamoise lorsqu’elle est passée à la fois devant un monument et un café iconique de la capitale ?
>
>_Format du flag :  `01h23`_

### RETEX
Ce challenge a été de loin le plus long de tout le CTF. Dès le départ, le format du flag, `01h23`, laisse penser qu'il faut une heure précise à la minute près, qu'on devrait donc pouvoir lire quelque part.

**Trouver les Siamois**

Pour le 14 juillet, on avait remarqué que ce CTF utilisait beaucoup les sources officielles du ministère des Armées. La source naturelle pour des images du défilé de 1919, c'est donc l'ECPAD, l'agence d'images de la Défense, qui conserve les films et les photos tournés par le service cinématographique de l'armée. D'ailleurs, en cherchant d'autres vidéos du défilé, on s'est vite rendu compte que la plupart des films de l'époque qui circulent en ligne (Istituto Luce, Australian War Memorial, documentaires sur YouTube...) reprennent en fait les mêmes images, tournées par l'armée française et conservées à l'ECPAD.

Dans les [archives en ligne de l'ECPAD](https://archives.ecpad.fr/archives/consulter-les-archives-en-ligne?detail=22584), on trouve plusieurs films « Les fêtes de la Victoire ». Ce sont des films muets, et chaque armée alliée est présentée par un carton. Dans « Les fêtes de la Victoire [n°1] », le carton « Les Siamois » apparaît à 5:52 :
![[PLFNV2_TB_AO_C1.png|500]]
Juste après, on voit le contingent siamois défiler :
![[PLFNV2_TB_AO_V1.png|500]]
Grâce au carton, on est sûrs que ce sont bien eux, et on connaît maintenant leur apparence (uniforme, casque, drapeau), ce qui permet de les reconnaître dans les autres vidéos. On les retrouve par exemple dans « [Les fêtes de la Victoire [n°5]](https://archives.ecpad.fr/archives/consulter-les-archives-en-ligne?detail=22092) » à 15:44, filmés d'un peu plus loin, ce qui permet de voir le public de l'autre côté de la place :
![[PLFNV2_TB_AO_V5.png|500]]
Et dans le film italien « [Feste in Parigi per la vittoria](https://patrimonio.archivioluce.com/luce-web/detail/IL3000089757/1/feste-parigi-vittoria-14-luglio-1919.html) » de l'Istituto Luce, avec le carton « I Siamesi » :
![[PLFNV2_TB_AO_LUCE.png|500]]
Attention, le compteur `TCR` incrusté dans l'image n'est pas une heure : c'est le timecode de la bobine, utilisé par les monteurs. Les témoignages écrits les mentionnent aussi, comme ce récit d'un témoin américain repris par [le blog Roads to the Great War](https://roadstothegreatwar-ww1.blogspot.com/2013/07/14-july-1919-victory-parade-in-paris.html), qui confirme leur place dans le cortège, entre les Serbes et les Tchécoslovaques :
![[PLFNV2_TB_AO_RTG.png|500]]

**Trouver le lieu**

Pour savoir où ces images ont été filmées, on compare avec les photos du défilé conservées par l'ECPAD. La photo SPA 24 OX 537, légendée « Place de l'Opéra, le défilé des troupes », montre exactement le même public et le même décor. En zoomant, on lit l'enseigne du café en face : le **Café de la Paix**.
![[PLFNV2_TB_AO_EP.png|500]]
Le Café de la Paix est situé place de l'Opéra, juste en face de l'[Opéra Garnier](https://fr.wikipedia.org/wiki/Op%C3%A9ra_Garnier), le monument de l'énoncé :
![[PLFNV2_TB_AO_W.png|500]]
Sur une vue satellite, on comprend mieux la situation : la caméra filmait en hauteur, à l'angle de la place, face au Café de la Paix, avec l'Opéra Garnier juste à côté.
![[PLFNV2_TB_AO_SAT.png|500]]

**Trouver l'heure**

On a d'abord cherché dans la presse de l'époque. L'Intransigeant du 15 juillet 1919, sur [RetroNews](https://www.retronews.fr/journal/lintransigeant/15-juillet-1919/1/b3237e65-12c8-4e0c-b83d-37af84e9a673), indique que les Siamois passaient l'Arc de Triomphe à 9h20 :
![[PLFNV2_TB_AO_INT.png|400]]
Le même journal fait passer les maréchaux à l'Arc à 8h40, et un autre journal sur [Gallica](https://gallica.bnf.fr/ark:/12148/bpt6k2437057/f2.image.r=neuf%20heures.zoom) les fait arriver place de l'Opéra à 9h15. En gardant le même écart de 40 minutes, les Siamois seraient arrivés à l'Opéra vers 9h55. Refusé.

On a donc écrit aux organisateurs. Dans ce premier mail, on leur expliquait déjà qu'on avait écarté la piste des ombres, parce qu'elle ne permet pas d'obtenir une heure précise à la minute près comme le laisse penser le format du flag. Ils nous ont confirmé le lieu et indiqué que l'heure se trouvait à partir d'une vidéo du défilé :
![[PLFNV2_TB_AO_M1.png|400]]
On a alors recensé et analysé, image par image, toutes les vidéos du défilé qu'on a pu trouver (ECPAD, Istituto Luce, Australian War Memorial, CNC, Musée Albert-Kahn, Gaumont Pathé, etc.), sans jamais trouver d'horloge ni d'heure affichée au moment du passage des Siamois. Quelques jours plus tard, après un second mail récapitulant toutes nos recherches, voici leur réponse :
![[PLFNV2_TB_AO_M2.png|600]]
Autant dire qu'on a été très déçus. Ils nous renvoyaient vers une méthode qu'on leur avait dit avoir écartée dès notre premier mail, et vers une vidéo qu'on avait depuis le début. Le format `01h23` nous avait poussés à chercher une heure exacte, ce qui nous a fait perdre énormément de temps et d'énergie. Généralement, quand un challenge demande ce genre de méthode, l'énoncé précise la marge d'erreur acceptée.

Il fallait donc faire de la chronolocalisation à partir des ombres. Dans la vidéo « [Défilé de la victoire en 1918](https://www.youtube.com/watch?v=RZCDQDaUAvA) » du Service historique de la Défense, les Siamois passent devant l'Opéra vers 21:16, et les ombres des soldats et des spectateurs sont bien visibles. Attention à la coquille dans le titre de la vidéo sur YouTube : le défilé de la Victoire a bien eu lieu en 1919, et non en 1918.

On reporte ensuite la scène sur [SunCalc](https://www.suncalc.org), qui affiche la position du soleil pour un lieu et une date donnés. On se place à l'endroit de la caméra, place de l'Opéra, à la date du 14 juillet 1919, et on fait varier l'heure jusqu'à ce que la direction des ombres (la ligne orange) corresponde à celle de la vidéo.
![[PLFNV2_TB_AO_SC1.png|500]]
Le choix de l'heure a été compliqué, car l'orientation exacte des ombres dans la vidéo est difficile à estimer. En reprenant l'alignement de plus près, les ombres correspondaient le mieux autour de 11h10 :
![[PLFNV2_TB_AO_SC2.png|500]]
Et c'était enfin la bonne réponse : **==11h10==**.

Il faut quand même relativiser la précision de cette méthode ici. Le 14 juillet 1919 en milieu de matinée, la direction du soleil ne tourne que d'environ 3° toutes les 10 minutes (d'environ 120° à 10h30 à 129° à 11h). Or, sur cette vidéo filmée de biais, en basse qualité et sans repère clair au sol (pas de ligne droite nette, de bord de trottoir ou de poteau bien visible pour tracer l'axe des ombres), il est impossible d'estimer l'orientation des ombres à 3° près. En pratique, la méthode permet de situer la scène à l'heure près, voire à la demi-heure près, mais pas à la dizaine de minutes : entre 10h30, 10h40 et 11h10, c'est en grande partie du guessing.

---
## Arrête ton char !

### Énoncé 
>Le 14 juillet 1945 est le premier défilé mené à Paris suite à l’occupation et à la signature de l’armistice du 8 mai 1945. Parmi les véhicules qui défilent devant la tribune où se trouve le général De Gaulle, un char attire l’attention par son nom. 
>Il rappelle aussi bien une région, qu’une famille royale… 
>
>>Quel est le grade et le nom du chef de ce char ?
>
>_Format du flag :  `Grade Nom`_

### RETEX
On avait remarqué que ce CTF utilisait souvent les sources officielles, généralement des sites liés à l'armée. Pour des images du défilé du 14 juillet 1945, le réflexe est donc d'aller voir l'ECPAD, l'agence d'images de la Défense, qui conserve les films tournés par l'armée française.

Dans ses [archives en ligne](https://archives.ecpad.fr/archives/consulter-les-archives-en-ligne?detail=37493), le film « La cérémonie du 14 juillet 1945 à Paris » (référence ACT 871) montre le défilé des véhicules devant la tribune. À 5:34, plusieurs chars Sherman passent devant les tribunes, dont un qui porte le numéro 42 et le nom « VALOIS II » :
![[PLFNV2_TB_ATC_V.png|500]]
Ce nom colle parfaitement avec l'énoncé. Le [Valois](https://fr.wikipedia.org/wiki/Valois_(r%C3%A9gion)) est une région naturelle de France, en Picardie :
![[PLFNV2_TB_ATC_W1.png|500]]
Et la [maison de Valois](https://fr.wikipedia.org/wiki/Maison_de_Valois) est une famille royale, qui a régné sur la France de 1328 à 1589 :
![[PLFNV2_TB_ATC_W2.png|500]]
Pour trouver l'équipage, on cherche simplement le nom et le numéro du char : `"Valois II" char sherman 42`.
![[PLFNV2_TB_ATC_G.png|500]]
Le premier résultat est une fiche de [chars-francais.net](https://www.chars-francais.net/index.php/classement-individuel/m4-sherman?view=article&id=1434:valois-ii-12rca&catid=31), un site qui recense les chars de la 2e DB et de l'armée française avec leurs équipages (le même site qui nous avait servi pour le challenge `Sur la route de la libération`). On y trouve le Valois II, M4A2 n°42, du 3e escadron du 12e RCA, avec la même inscription « VALOIS » sur la caisse que dans la vidéo :
![[PLFNV2_TB_ATC_CF.png|500]]
Le chef de char était le **==Maréchal des Logis Bock==**.

---
## Sécurise le défilé

### Énoncé 
>L’année dernière, vous étiez chargé de sécuriser en partie le défilé du 14 juillet. Le service de sécurité vous avait demandé d’inventorier toutes les bouches de métro situées à moins de 200 mètres du tracé du défilé entre l'Arc de Triomphe et la Place de la Concorde. 
>
>>Combien y en avait-il ?
>
>_Format du flag :  `01`_

### RETEX
L'énoncé parle de « l'année dernière », donc du défilé du 14 juillet 2025. D'après [la page de l'Élysée sur ce défilé](https://www.elysee.fr/emmanuel-macron/2025/07/14/defile-militaire-du-14-juillet-2025), il s'est tenu sur l'avenue des Champs-Élysées, de la place de l'Étoile à la place de la Concorde :
![[PLFNV2_TB_SLD_E.png|500]]

Pour compter des bouches de métro autour d'un tracé, l'outil idéal est [Overpass Turbo](https://overpass-turbo.eu), qui permet d'interroger les données d'OpenStreetMap. Même sans le connaître, le CTF le suggérait dans ses ressources pédagogiques :
![[PLFNV2_TB_SLD_RP.png|500]]
Dans OpenStreetMap, les bouches de métro sont des points avec le tag `railway=subway_entrance`. On cherche donc tous ceux qui se trouvent à moins de 200 m de l'avenue des Champs-Élysées. Pour coller à l'énoncé, on peut même demander les données telles qu'elles étaient le jour du défilé, avec l'option `date` :
```json
[out:json][date:"2025-07-14T00:00:00Z"];
way["name"="Avenue des Champs-Élysées"]["highway"="primary"]({{bbox}})->.avenue;
.avenue out geom;
node(around.avenue:200)["railway"="subway_entrance"];
out body;
```
- `way[...]` récupère la chaussée principale de l'avenue dans la zone affichée à l'écran (il faut donc centrer la carte sur Paris) ;
- `node(around.avenue:200)` récupère les points situés à 200 m ou moins de l'avenue ;
- `["railway"="subway_entrance"]` ne garde que les bouches de métro.

![[PLFNV2_TB_SLD_O1.png|500]]
Le résultat dépend beaucoup de la façon dont on définit le tracé et de la date des données. Dans OSM, l'avenue s'arrête au bord des deux places, donc on a aussi testé un tracé prolongé jusqu'au centre de l'Arc de Triomphe et de l'Obélisque :
```
[out:json];
node(around:200,48.873792,2.295028,48.865633,2.321236)["railway"="subway_entrance"];
out body;
```
![[PLFNV2_TB_SLD_O2.png|500]]
Selon les variantes (avenue seule, tracé prolongé, contour des places, données actuelles ou de 2025), on obtenait 22, 29, 21, 27 ou 31 bouches. Toutes ces réponses ont été refusées.

On a donc écrit aux organisateurs en détaillant notre méthode. Leur réponse : le résultat du challenge était effectivement variable, notre compréhension de l'énoncé était la bonne, et ils allaient ajouter plusieurs réponses possibles.
![[PLFNV2_TB_SLD_M.png|500]]
![[PLFNV2_TB_SLD_U.png|500]]
Après cette mise à jour, notre résultat avec la première requête et les données du 14 juillet 2025 a été accepté : **==21==**.

---
## Un 14 Juillet enflammé

### Énoncé 
>![[PLFNV2_TB_14JE_E.m4a]]
>Le 14 juillet, tout le monde regarde les avions, les troupes, les uniformes et les véhicules. Mais en 2025, le chef-d'œuvre n’était pas uniquement dans le ciel, il était aussi dans la musique, en témoigne cet extrait. 
>
>Cette composition au titre brûlant accompagnait une séquence solennelle tenue au pied d’un monument emblématique de Paris. 
>
>>De quelle musique s’agit-il ? 
>>Quand a-t-elle été créée ?
>
>_Format du flag :  `Nom de la musique - 1234`_

### RETEX
L'extrait audio est une marche militaire. Premier réflexe : le passer dans Shazam, mais l'application ne trouvait rien de fiable sur ce genre de musique militaire, il a donc fallu passer par l'énoncé. 
L'énoncé nous donne plusieurs indices : le défilé du 14 juillet 2025, un titre « brûlant », et une séquence solennelle au pied d'un monument de Paris. 
Pour le 14 juillet, ce monument ne peut être que l'Arc de Triomphe, où brûle la Flamme du Souvenir. On cherche donc `14 juillet 2025 musique Arc de Triomphe flamme séquence d'ouverture`.
![[PLFNV2_TB_14JE_G.png|500]]
Le deuxième résultat est une publication de la Musique des Sapeurs-Pompiers de Paris : « Tout feu tout flamme - 14 juillet 2025 (animation initiale) », un morceau composé par Olivier Decrouille. On peut d'ailleurs comparer avec [la vidéo de la séquence](https://www.youtube.com/watch?v=c7n8FS1zOQc) pour confirmer que c'est bien la musique de l'extrait.

Pour la date de création, [l'article de l'association « La Flamme sous l'Arc de Triomphe »](https://www.laflammesouslarcdetriomphe.org/actualites/1925-2025-centenaire-de-l-association) sur son centenaire précise que ce morceau a été spécialement composé pour l'association en 2023, lors du centenaire du premier allumage de la Flamme :
![[PLFNV2_TB_14JE_F.png|500]]
Le flag était donc **==Tout Feu, Tout Flamme - 2023==**.


---
***Les différentes parties du CTF :***
 · | · [[Learning Track]]
 · | · [[Les monuments militaires français]]
 · | · [[La Section camouflage]]
 · | · [[Les femmes dans les armées]]
 · | · Track Bonus - Le 14 Juillet