---
title: Les monuments militaires français
tags:
  - Osint
  - Chall
  - PerceLeFrontNumeriqueV2
order: 3
description: RETEX des challenges de la partie "Les monuments militaires français" du CTF Perce le Front Numérique V2
---
![[PLFNV2_WP.jpg]]

>[!info] Notes
> Voici les retex des challs liés à la partie "Les monuments militaires français" du CTF Perce le Front Numérique V2.

***Les différentes parties du CTF :***
 · | · [[Learning Track]]
 · | · Les monuments militaires français
 · | · [[La Section camouflage]]
 · | · [[Les femmes dans les armées]]
 · | · [[Track Bonus - Le 14 Juillet]]

---
## Honneur, courage et fraternité

### Énoncé 
>L’Armée d’Afrique, créée dès les années 1830, est intervenue à de multiples reprises pour défendre les couleurs de la France. En hommage à ce corps militaire, un mémorial de la reconnaissance de la France a été érigé dans une ville du sud de la France le 15 août 1975.
>
>>Qu’est-il inscrit **exactement** en gros sur ce monument ?
>
>_Format du flag :  `Aux Explorateurs Polaires Le Futur Retrouvé`_

### RETEX
En cherchant les éléments de l'énoncé, `mémorial armée d'Afrique 15 août 1975`, les deux premiers résultats parlent du même monument.
![[PLFNV2_MMF_HCF_G.png|500]]
Le premier, sur aerosteles.net, précise qu'il a été inauguré le 15 août 1975 à Saint-Raphaël. Le second, [la fiche Liberation Route Europe](https://www.liberationroute.com/fr/pois/1453/memorial-de-l-armee-d-afrique), confirme qu'il s'agit du monument national en hommage à l'Armée d'Afrique, un corps créé dès les années 1830, comme dans l'énoncé.
![[PLFNV2_MMF_HCF_LR.png|500]]
L'énoncé demande ce qui est inscrit **exactement** en gros sur le monument. Le plus simple est d'aller voir les photos du « Monument de l'Armée d'Afrique » sur Google Maps :
![[PLFNV2_MMF_HCF_GM.png|500]]
On lit en grosses lettres : « À L'ARMÉE D'AFRIQUE », puis « LA FRANCE RECONNAISSANTE ».

Le piège, c'est le mot **exactement** : nos premières tentatives avec les accents (`À L'Armée D'Afrique...`) ont été refusées. En zoomant sur la photo, on voit qu'il n'y a aucun accent gravé dans la pierre. Le flag attendu était donc **==A L'Armee D'Afrique La France Reconnaissante==**.

---
## Un monument particulier

### Énoncé 
>![[PLFNV2_MMF_MP_E.png]]
>Ce monument ne sert pas à rendre hommage à des soldats tel que l’on pourrait le penser, mais à d’autres acteurs qui ont pourtant été très utiles durant la Première Guerre mondiale…
>
>>À quelle date a été créée l’organisation qui a effectué la demande de sa construction ?
>
>_Format du flag :  `JJ/MM/AAAA`_


### RETEX
On commence par une recherche par image inversée de la photo de l'énoncé avec Google Lens.
![[PLFNV2_MMF_MP_GL.png|500]]
Le premier résultat est exactement notre image : l'inauguration du monument aux pigeons voyageurs de Lille, en avril 1936. Le monument ne rend donc pas hommage à des soldats, mais aux pigeons voyageurs qui ont transporté des messages pendant la Première Guerre mondiale.

Pour savoir qui a demandé sa construction, on cherche `monument pigeons voyageurs Lille commande`.
![[PLFNV2_MMF_MP_G.png|500]]
[L'article de Good Morning Lille](https://www.goodmorninglille.org/blog/monument-pigeons-guerre-lille) nous apprend que le monument a été réalisé suite à une commande de la Fédération nationale des sociétés colombophiles de France, et qu'il a été inauguré le 13 avril 1936.
![[PLFNV2_MMF_MP_GML.png|500]]

Il faut maintenant trouver la date de création de cette fédération... et c'est là que le challenge s'est transformé en cauchemar.

Premier réflexe : [le site officiel de l'actuelle Fédération colombophile française](https://www.colombophiliefr.com/page-d-exemple/), qui affirme que la fédération nationale a été créée par décret le 28 juillet 1927.
![[PLFNV2_MMF_MP_FCF.png|500]]
Refusé. En lisant ce décret dans le Journal officiel, on s'aperçoit d'ailleurs qu'il cite déjà la fédération comme existante : ce n'est pas un acte de création.

[La notice de la BnF](https://data.bnf.fr/fr/ark:/12148/cb12984983m) sur la Fédération colombophile française donne une autre date de création, le 8 juin 1925 :
![[PLFNV2_MMF_MP_BNF.png|500]]
Refusé aussi. Sur [Data-Asso](https://www.data-asso.fr/annuaire/association/W595027417), qui reprend le Répertoire national des associations, la date de création affichée est le 17 avril 1930, qui correspond en fait à la reconnaissance d'utilité publique :
![[PLFNV2_MMF_MP_DA.png|500]]
Encore refusé. On a alors fouillé Gallica, la bibliothèque numérique de la BnF, pour remonter plus loin. Un ouvrage sur la colombophilie raconte que le congrès du Trocadéro de juillet-août 1889 a donné naissance au **projet** d'une « Fédération des sociétés colombophiles de France » :
![[PLFNV2_MMF_MP_GA.png|500]]
On a aussi retrouvé, dans le Bulletin municipal officiel de Paris de juin 1931, la demande d'emplacement faite par la fédération pour élever un monument aux pigeons voyageurs, à l'origine prévu à Paris. C'est la preuve qu'on parle bien de la bonne organisation :
![[PLFNV2_MMF_MP_BMO.png|250]]
Mais toutes les dates autour de ce projet de 1889-1890 (réunions, congrès, publication des statuts) ont elles aussi été refusées.

Bloqués, on a fini par écrire aux organisateurs, qui nous ont donné un indice :
![[PLFNV2_MMF_MP_MAIL.png|400]]
Un site de l'administration publique qui recense les associations françaises, c'est le [Journal officiel des associations](https://www.journal-officiel.gouv.fr/pages/associations-recherche/) (JOAFE). On y cherche « Fédération Nationale des Sociétés Colombophiles de France », et en triant par date, on trouve l'annonce de création d'origine, parue le 3 mai 1906 :
![[PLFNV2_MMF_MP_JO.png|500]]
Le justificatif de publication permet même de voir l'annonce dans le Journal officiel de l'époque :
![[PLFNV2_MMF_MP_JO2.png|500]]
La fédération a donc été déclarée le **==25/04/1906==**.

Leçon retenue : pour la date de création d'une association française, le premier réflexe doit être le Journal officiel des associations, qui remonte jusqu'aux déclarations du début du XXe siècle. C'est une source bien plus fiable que le site de l'association elle-même ou que les bases qui en reprennent les informations : une association peut se tromper, simplifier ou embellir son histoire sur son propre site, alors que le Journal officiel publie la déclaration officielle, qui est censée avoir été vérifiée par l'administration. Ici, le site de la fédération donnait une date fausse.

---
## Un endroit bien loin

### Énoncé 
>![[PLFNV2_MMF_UEBL_E.jpeg]]
>« Un soldat ne meurt véritablement que lorsqu’on oublie son nom. »
>
>À première vue, cette image paraît anodine. Pourtant, elle dissimule un indice essentiel dont la base de l’opération serait 64.
>
>Cette photographie constitue votre unique point de départ vers une destination inconnue où se trouve un monument historique précis.
>
>>Quelle est l'identité de la dernière personne honorée sur la liste des « Morts pour la France » de ce site ?
>
>_Format du flag :  `Prénom Nom`_

### RETEX
L'énoncé dit que l'image dissimule un indice dont « la base de l'opération serait 64 » : c'est une référence au **base64**. L'image doit donc cacher quelque chose, et le premier endroit où regarder, ce sont les métadonnées. On les affiche avec `exiftool` :
![[PLFNV2_MMF_UEBL_EX.png|500]]
Le champ `XP Keywords` contient une chaîne en base64 : `NDYuNzc3NDUgLTU2LjE3ODEyNA==`. Une fois décodée, elle donne des coordonnées GPS : `46.77745 -56.178124`.

Cacher une information dans une image, c'est de la stéganographie, et ce n'est pas vraiment de l'OSINT. Mais le CTF ne se présentait pas comme 100 % OSINT, donc ça ne me dérange pas plus que ça.

En les collant dans Google Maps, on arrive au Monument aux Morts de Saint-Pierre, à Saint-Pierre-et-Miquelon. On comprend mieux le titre du challenge.
![[PLFNV2_MMF_UEBL_GM.png|500]]
La fiche Google Maps du monument renvoie vers le site [monuments-aux-morts.fr](https://www.monuments-aux-morts.fr), qui recense les monuments aux morts et les noms qui y sont inscrits.
![[PLFNV2_MMF_UEBL_GM2.png|500]]
Sur la fiche du monument de Saint-Pierre, la liste des noms se termine par VICTOR Eugène.
![[PLFNV2_MMF_UEBL_MAM.png|300]]
Pour vérifier qu'il est bien « Mort pour la France », on le cherche sur [MemorialGenWeb](https://www.memorialgenweb.org/memorial3/html/fr/resultcommune.php?idsource=9063) : Eugène Paul Jules Victor, marsouin du 33e RIC, tué à l'ennemi le 25 septembre 1915 à Souain, avec la mention « Mort pour la France ».
![[PLFNV2_MMF_UEBL_MGW.png|500]]
La dernière personne honorée sur la liste est donc **==Eugène Victor==**.

---
## Sur la route de la libération

### Énoncé 
>![[PLFNV2_MMF_RL_E.png]]
>En 2004, de nombreux monuments sont inaugurés dans de nombreuses villes et villages du nord de la France.
>Ces derniers visent à retracer la route de l’épopée d’une célèbre unité blindée des Forces Françaises Libres qui a activement participé à la libération de la France. 
>
>>Combien de ces monuments sont présents dans le département des Vosges, fin octobre 2014 ? 
>
>_Format du flag :  `1`_

### RETEX
On commence par une recherche par image inversée de la photo de l'énoncé avec Google Lens.
![[PLFNV2_MMF_RL_GL.png|500]]
Le premier résultat est exactement notre image, publiée sur Wikipédia sous le nom « 2e DB ». En creusant les autres résultats, on retrouve aussi la photo sur [chars-francais.net](https://www.chars-francais.net/index.php/classement-individuel/m4-sherman?view=article&id=1435:valserine-12rca&catid=31), avec une légende plus précise : c'est le Sherman « Valserine » du 12e RCA, de la 2e division blindée du général Leclerc.
![[PLFNV2_MMF_RL_CF.png|500]]

L'unité blindée est donc la 2e DB. Pour trouver les monuments inaugurés à partir de 2004, on cherche `2e DB monuments inaugurés 2004 route`.
![[PLFNV2_MMF_RL_G.png|500]]
Il s'agit des bornes du Serment de Koufra, qui jalonnent la [Voie de la 2e DB](https://www.voiedela2edb.fr), depuis Utah Beach jusqu'à Strasbourg. La première a été installée en 2004.

Pour compter celles des Vosges, on a d'abord utilisé la page Wikipédia [Liste des bornes de la voie de la 2e DB](https://fr.wikipedia.org/wiki/Liste_des_bornes_de_la_voie_de_la_2e_DB), qui nous donnait seulement cinq bornes inaugurées avant fin octobre 2014. Mais elle n'est pas complète : la source la plus fiable est [l'index des bornes](https://2db.forumactif.com/t976-voie-de-la-2eme-db-bornes-du-serment-de-koufra-index) du forum dédié à la 2e DB, qui liste les bornes par commune :
![[PLFNV2_MMF_RL_IDX.png|500]]
Chaque commune renvoie vers un sujet qui donne la date d'inauguration de la borne. Par exemple pour Vrécourt et Bocquegney, deux bornes qui manquaient à notre décompte Wikipédia :
![[PLFNV2_MMF_RL_FV.png|500]]
![[PLFNV2_MMF_RL_FB.png|500]]
En ne gardant que les bornes inaugurées avant fin octobre 2014, on en trouve huit :

| Commune | Inauguration |
| --- | --- |
| Châtel-sur-Moselle / Nomexy | 15 février 2012 |
| Vrécourt | 9 septembre 2012 |
| Madonne-et-Lamerey | 16 septembre 2012 |
| Darney | 14 septembre 2013 |
| Bouxières-aux-Bois | 14 septembre 2013 |
| Ville-sur-Illon | 15 septembre 2013 |
| Bocquegney | 20 septembre 2014 |
| Anglemont | 5 octobre 2014 |

Les autres (Houécourt, Vittel, Mattaincourt, Bulgnéville, Remoncourt, Escles...) ont été inaugurées à partir de 2015.

On était sûrs de notre réponse, et pourtant `8` était refusé. On a passé un long moment bloqués, à revérifier chaque borne et chaque date sans comprendre ce qui clochait.

En fait, le problème ne venait pas de nous : les organisateurs s'étaient trompés dans le champ du flag, qui attendait le nombre écrit en toutes lettres et non en chiffres, ce qui contredisait le format `1` donné dans l'énoncé. Ils ont fini par corriger l'énoncé en changeant le format `1` en `un`. Le flag était donc **==huit==**.

---
## Bien à l’abri

### Énoncé 
>Les alentours de la ville de Verdun sont un lieu important de l’histoire de France. En effet, du 21 février au 18 décembre 1916, il s’y déroule la plus longue bataille du XXe siècle, qui a duré 300 jours et 300 nuits. 
>
>Verdun est alors une zone lourdement fortifiée afin de bloquer toute potentielle avancée ennemie vers Paris. Ces fortifications, qui comprennent ouvrages, forts, abris de combat et casemates, sont toujours présentes aujourd’hui et sont devenues des lieux de mémoire importants. 
>
>>Combien d’ouvrages modernisés par bétonnage sont présents dans le secteur de Verdun ? 
>
>_Format du flag :  `1`_

### RETEX
Ce challenge a été un vrai casse-tête, car selon les sources et la date, on trouve énormément de chiffres différents.

[La page Wikipédia de la place fortifiée de Verdun](https://fr.wikipedia.org/wiki/Place_fortifi%C3%A9e_de_Verdun) indique qu'en 1914, sur 28 forts et ouvrages, 23 sont « plus ou moins modernes (protégés par du béton) » :
![[PLFNV2_MMF_BAA_W23.png|500]]
La même page contient des tableaux qui détaillent chaque fort et ouvrage avec ses dates de modernisation. En comptant toutes les cases avec une date de modernisation, on arrive à 24 :
![[PLFNV2_MMF_BAA_W24.png|350]]
[Le site Verdun 1916](https://verdunmonsite.wordpress.com/de-1914-a-1916/ouvrages-fortifies/) parle lui de 28 forts et ouvrages fortifiés, « dont 16 modernisés » :
![[PLFNV2_MMF_BAA_V16.png|500]]
Et [la page Wikipédia de la bataille de Verdun](https://fr.wikipedia.org/wiki/Bataille_de_Verdun) évoque une double ceinture de 34 forts et ouvrages fortifiés :
![[PLFNV2_MMF_BAA_W34.png|500]]

La clé est de bien lire la question : elle porte sur les **ouvrages** modernisés par **bétonnage**, et pas sur les forts. On cherche donc `ouvrages béton armé place forte de Verdun 1914`.
![[PLFNV2_MMF_BAA_G.png|500]]
Le deuxième résultat, [l'article de Fortif'Séré](https://fortifsere.fr/la-place-forte-ou-le-camp-retranche-de-verdun/) sur la place forte de Verdun, reprend justement ces deux notions dans son extrait. Dans la partie « Le renforcement de la place forte de Verdun 1900-1914 », on trouve la liste des ouvrages intermédiaires en béton armé :
![[PLFNV2_MMF_BAA_F.png|500]]
- en rive droite, cinq ouvrages : Froideterre, Thiaumont, La Laufée, Déramé et Saint-Symphorien ;
- en rive gauche, trois ouvrages : La Falouse, Chana et Charny.

Attention, la même page parle aussi de « 19 forts, dont 14 modernisés », mais ce sont des **forts**, pas des ouvrages. C'était d'ailleurs une de nos premières tentatives.
![[PLFNV2_MMF_BAA_F14.png|500]]
En additionnant les deux listes, on obtient **==8==** ouvrages.

---
## Pour ne pas oublier

### Énoncé 
>![[PLFNV2_MMF_PPO_E.png]]
>Au niveau de mes fondations, un hommage à des millions de personnes. Parmi huit, j’ai été sélectionné, mais ce lieu ne m’était pas initialement destiné. Chaque jour à 18h30, le même évènement se reproduit depuis fort longtemps au pied de ce monument. 
>
>>Que trouve-t-on aux fondations de cet édifice ? 
>>De quel événement est-il question ? 
>>Qui en a eu l’idée ? 
>
>Cette vue sera votre point de départ. 
>
>_Format du flag :  `statue de la liberté - ouverture au public - Gustave Eiffel`_

### RETEX
La photo de l'énoncé est un panorama de Paris, où l'on reconnaît notamment la tour Montparnasse et le dôme des Invalides. Ici, la recherche par image inversée ne donne rien de concluant, on part donc de l'énigme.

Chaque indice pointe vers le même lieu :
- « un hommage à des millions de personnes » et « parmi huit, j'ai été sélectionné » : c'est la Tombe du Soldat inconnu, choisi parmi huit cercueils ;
- « chaque jour à 18h30 » : c'est l'heure du ravivage de la Flamme ;
- « ce lieu ne m'était pas initialement destiné » : le Soldat inconnu devait au départ reposer au Panthéon, avant d'être inhumé sous l'Arc de Triomphe.

On le vérifie sur [la page Wikipédia de la Tombe du Soldat inconnu](https://fr.wikipedia.org/wiki/Tombe_du_Soldat_inconnu_(France)). On y lit que l'idée d'origine était de l'inhumer au Panthéon :
![[PLFNV2_MMF_PPO_W1.png|500]]
Et que le Soldat inconnu a bien été choisi parmi huit corps :
![[PLFNV2_MMF_PPO_W2.png|500]]
Le panorama est d'ailleurs cohérent avec la vue depuis la terrasse de l'Arc de Triomphe, d'où l'on voit la verrière du Grand Palais, le dôme des Invalides et la tour Montparnasse.
On peut le vérifier via la [visite virtuelle](http://timographie360.fr/nos-realisations/arc-de-triomphe-80) de l'Arc de Triomphe en 360°.
![[PLFNV2_MMF_PPO_W3.png]]

Pour l'événement et la personne qui en a eu l'idée, on va sur [la page du ravivage de la Flamme](https://www.paris-arc-de-triomphe.fr/enseignants/la-ceremonie-du-ravivage-de-la-flamme) du site officiel de l'Arc de Triomphe. On y apprend que l'idée d'une flamme symbolique vient du journaliste Gabriel Boissy :
![[PLFNV2_MMF_PPO_A1.png|500]]
Et que la cérémonie du ravivage a lieu chaque soir à 18h30 :
![[PLFNV2_MMF_PPO_A2.png|500]]
Le format du flag (`statue de la liberté - ouverture au public - Gustave Eiffel`) ne colle pas parfaitement à la tournure de la réponse, mais en suivant sa structure, on obtient **==tombe du soldat inconnu - ravivage de la flamme - Gabriel Boissy==**.

---
***Les différentes parties du CTF :***
 · | · [[Learning Track]]
 · | · Les monuments militaires français
 · | · [[La Section camouflage]]
 · | · [[Les femmes dans les armées]]
 · | · [[Track Bonus - Le 14 Juillet]]