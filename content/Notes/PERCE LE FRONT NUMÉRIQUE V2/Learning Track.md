---
title: PERCE V2
tags:
  - Osint
  - Chall
  - PerceLeFrontNumeriqueV2
order: 2
description: RETEX des challenges de la partie "Learning Track" du CTF Perce le Front Numérique V2
---
![[PLFNV2_WP.jpg]]

>[!info] Notes
> Voici les retex des challs liés à la partie "Learning Track" du CTF Perce le Front Numérique V2.

***Les différentes parties du CTF :***
 · | · Learning Track
 · | · [[Les monuments militaires français]]
 · | · [[La Section camouflage]]
 · | · [[Les femmes dans les armées]]
 · | · [[Track Bonus - Le 14 Juillet]]

---
## Bienvenue !

### Énoncé 
>Cher joueur,
>
>Bienvenue sur le CTF Perce le front numérique organisé par le Gouverneur militaire de Paris et le club OSINT et Veille de l'AEGE ! Nous vous remercions pour votre inscription.
>
>Principalement dédié aux collégiens et aux lycéens, ce CTF vous embarque dans une plongée historique : de 1914 à aujourd’hui - les évolutions dans l’armée de Terre.
>
>Mais avant de commencer votre voyage et afin que votre expérience se déroule au mieux, nous vous demandons de prendre connaissance du règlement.
>
>Professeurs réalisant le CTF Perce le front numérique en classe, nous vous remercions également de vérifier les conditions de votre éligibilité au tirage au sort qui vous permettra de gagner les lots, dans les parties « Barème, jury et prix », et « Inscription et participation » du règlement. Nous attirons également votre attention sur le fait qu’une notice vous a normalement été remise par la Région académique Île-de-France afin de vous apporter des explications supplémentaires sur l’organisation du CTF en classe. Si vous ne l’avez pas reçu et que cela constitue pour vous un sujet bloquant, n’hésitez pas à vous rapprocher des organisateurs du CTF par courriel à l’adresse présente dans le règlement et nous vous la ferons parvenir dans les plus brefs délais.
>
>>Pour continuer, retrouvez quel sera le format de flag tout au long de l’événement, dans le règlement (la réponse est soulignée et en gras) ?

### RETEX
Challenge d'échauffement : il suffit d'ouvrir [le règlement](https://www.percelefrontnumerique.fr/reglement) et de chercher le passage sur les flags.
![[PLFNV2_LN_B_R.png|500]]
On y apprend que les flags ne sont pas sensibles à la casse, et que le format sera tout simplement **==votre reponse au challenge==**.

Petit piège quand même : le point qui suit le texte souligné ne fait pas partie du flag.

---
## Que portent-ils ?
### Énoncé 
>![[PLFNV2_LN_QP_E.png]]
>En 2019, ce monument a été construit pour rendre hommage à certains soldats français morts pour la France, mais qui ne disposaient alors d’aucun monument en leur honneur. 
>
>>Quel est le nom du concepteur de ce monument ? 
>
>_Format du flag :  `Prénom Nom`_

### RETEX
Comme souvent sur ce CTF, on commence par une recherche par image inversée de la photo de l'énoncé avec Google Lens.
![[PLFNV2_LN_QP_GL.png|500]]
Le premier résultat des correspondances visuelles est exactement notre image. Elle vient d'[une page du Ministère des Armées](https://www.defense.gouv.fr/chemins-memoire/histoire-memoires/ressources-historiques/operations-exterieures/memoire-opex/monument-national) sur le **Monument aux morts pour la France en opérations extérieures** (OPEX), dans le parc André-Citroën à Paris.

Cela colle avec l'énoncé : le monument a été inauguré le 11 novembre 2019 et rend hommage aux soldats morts en OPEX, qui n'avaient jusque-là aucun monument national.

Dans la partie « L'objectif du projet » de cette page, on apprend que le groupe sculpté a été réalisé par le sculpteur **==Stéphane Vigny==**, avec l'agence Pièces Montées.
![[PLFNV2_LN_QP_MA.png|500]]
La même page explique aussi le titre du challenge : les six soldats **portent** un cercueil invisible, et ils **portent** chacun une coiffe différente (casquette, calot, képi, béret, bâchi et tricorne).

On remarque au passage que le monument se trouve dans le jardin Eugénie-Djendi : ça nous servira pour le challenge `Promenade historique` un peu plus bas.

---
## Camouflage

### Énoncé 
>![[PLFNV2_LN_C_E.png]]
>En janvier 1915, sur le front ouest, les uniformes français (capote bleue, pantalon garance) rendent les soldats trop visibles pour les snipers allemands. 
>Un peintre réinvente la furtivité en créant une blouse-cagoule tachée afin de se fondre dans le paysage. 
>
>>Comment se nomme-t-elle ?
>
>_Format du flag :  `veste`_

### RETEX
Encore une fois, on lance une recherche par image inversée de la photo de l'énoncé avec Google Lens.
![[PLFNV2_LN_C_GL.png|500]]
Le premier résultat des correspondances visuelles est exactement notre image. Elle vient de l'article « Se fondre dans le décor » de [la revue _Modes pratiques_ de l'INHA](https://devisu.inha.fr/modespratiques/420), qui retrace l'histoire du camouflage.

Dans la partie « Été, caméléon », la photo de l'énoncé est présentée avec le nom de la tenue :
![[PLFNV2_LN_C_I.png|500]]
`Photographie stéréoscopique de Guirand de Scévola faisant une démonstration de tenue camouflée composée d’une blouse, et d’une cagoule de son invention : la scévolette, 1915.`

On retrouve bien le peintre de l'énoncé : [Lucien-Victor Guirand de Scévola](https://fr.wikipedia.org/wiki/Lucien-Victor_Guirand_de_Sc%C3%A9vola), qui a créé la section camouflage de l'armée française en 1915 et a donné son nom à sa tenue, la **==scévolette==**.

---
## Promenade historique

### Énoncé 
>Pour mettre à l’honneur l’histoire d’une sous-lieutenante « Merlinette » arrêtée et déportée au camp de concentration de Ravensbrück, un square existe aujourd’hui en son nom.
>
>>Quel est ce square ?
>
>_Format du flag :  `typologie du square nom du square`_

### RETEX
Les « Merlinettes » sont les femmes du Corps féminin des transmissions (CFT), créé par le général Lucien Merlin pendant la Seconde Guerre mondiale.

En cherchant `sous-lieutenante Merlinette Ravensbrück`, on tombe sur Eugénie-Malika Djendi, par exemple dans [cet article de France Inter](https://www.radiofrance.fr/franceinter/le-destin-tragique-et-heroique-de-la-sous-lieutenante-eugenie-malika-djendi-3718803) ou [celui-ci](https://www.cailloutendre.fr/2015/07/le-2-juillet-2015-un-hommage-a-une-merlinette-eugenie-malika-djendi/).

[Sa fiche sur le site Chemins de mémoire](https://www.defense.gouv.fr/chemins-memoire/histoire-memoires/personnalites/personnalites-lettre-lettre/eugenie-malika-djendi) confirme tous les éléments de l'énoncé : sous-lieutenant, engagée dans le CFT, déportée puis fusillée à Ravensbrück le 18 janvier 1945.
![[PLFNV2_LN_PH_D1.png|500]]
Tout en bas de la même fiche :
![[PLFNV2_LN_PH_D2.png|500]]
Le jardin en question est celui du monument OPEX du challenge `Que portent-ils ?`. On peut le retrouver sur Google Maps :
![[PLFNV2_LN_PH_M.png|500]]

Petite hésitation sur le flag, car on trouve deux noms selon les sources :
- `Jardin Sous-lieutenante Eugénie-Malika Djendi` (par exemple sur [mypacer](https://www.mypacer.com/parks/102638/jardin-sous-lieutenante-eugenie-malika-djendi-paris))
- `Jardin Eugénie-Malika Djendi` (sur Google Maps)

Le format demande `typologie du square nom du square` : la typologie est « Jardin » et le nom est celui de la résistante. On a donc choisi la version courte de Google Maps, **==Jardin Eugénie-Malika Djendi==**, et c'était la bonne.

---
***Les différentes parties du CTF :***
 · | · Learning Track
 · | · [[Les monuments militaires français]]
 · | · [[La Section camouflage]]
 · | · [[Les femmes dans les armées]]
 · | · [[Track Bonus - Le 14 Juillet]]