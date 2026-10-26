---
title: PERCE V2
tags:
  - Osint
  - Chall
  - PerceLeFrontNumeriqueV2
order: 5
description: RETEX des challenges de la partie "Les femmes dans les armées" du CTF Perce le Front Numérique V2
---
![[PLFNV2_WP.jpg]]

>[!info] Notes
> Voici les retex des challs liés à la partie "Les femmes dans les armées" du CTF Perce le Front Numérique V2.

***Les différentes parties du CTF :***
 · | · [[Learning Track]]
 · | · [[Les monuments militaires français]]
 · | · [[La Section camouflage]]
 · | · Les femmes dans les armées
 · | · [[Track Bonus - Le 14 Juillet]]

---
## « Merlinettes », ces femmes engagées !

### Énoncé 
>![[PLFNV2_FA_M_E.jpg]]
> Cette photo représente un groupe de Merlinettes. L’une d’entre elles, née en 1921 à Alger, a été décorée de la croix du combattant volontaire. 
>
>> Qui est-elle ? 
>> Quel est son matricule ? 
>
>_Format du flag :  `Prénom Nom - 12345`_

### RETEX
On commence par une recherche par image inversée de la photo de l'énoncé avec Google Lens.
![[PLFNV2_FA_M_GL.png|500]]
Le premier résultat est exactement notre image, sur [une page « Les Merlinettes »](http://tournantsrovigo.free.fr/Merlinettes.html) hébergée sur un site perso consacré à la rue Rovigo, à Alger.

En descendant sur la page, on trouve une section consacrée à une Merlinette en particulier : Denise Peyronnet, née Berger, qui habitait au 111 rue Rovigo. La page montre aussi deux documents officiels : sa carte du combattant et le diplôme de sa croix du combattant volontaire.
![[PLFNV2_FA_M_TR.png|500]]
Le diplôme confirme qu'elle a bien reçu la croix du combattant volontaire avec barrette « Guerre 1939-1945 » et qu'elle est née le 21 avril 1921, et la carte du combattant porte le numéro 66108.

Petite incohérence quand même : d'après ces deux documents, elle est née à **Oran**, et non à Alger comme le dit l'énoncé. Alger, c'était en fait son domicile. Comme c'était la seule candidate qui correspondait au reste de l'énoncé, on a tenté **==Denise Peyronnet - 66108==**, et c'était bien ça. Ce n'est malheureusement pas la seule coquille des énoncés de ce CTF.

---
## Le train arrive

### Énoncé 
>Longtemps, certaines armes de l’armée de Terre sont restées commandées exclusivement par des hommes. Pourtant, avec 17,3 % de femmes au sein des armées françaises, l’institution poursuit sa féminisation. 
>
>En 2026, une officière franchit ainsi une étape historique en prenant pour la première fois le commandement d’un des régiments spécialisés, sans lesquels aucune force ne peut se déplacer. 
> 
>>De quel régiment a-t-elle pris le commandement ? 
>>Citez un pays dans lequel a été déployé ce régiment en 2024. 
>
>_Format du flag :  `012e nom du régiment - pays`_

### RETEX
En reprenant les éléments de l'énoncé, `première femme chef de corps régiment du train 2026`, le premier résultat donne directement la réponse.
![[PLFNV2_FA_TA_G.png|500]]
[L'article d'Objectif Sud](https://www.objectifsud.fr/actualites/garons-le-lieutenant-colonel-fanny-peluttiero-devient-la-premiere-femme-chef-de-corps-de-lhistoire-de-larme-du-train-165409.php) nous apprend que le lieutenant-colonel Fanny Peluttiero a pris en juin 2026 le commandement du 503e régiment du Train, à Nîmes-Garons, devenant la première femme à la tête d'un régiment de l'arme du Train. Le titre du challenge, « Le train arrive », était d'ailleurs un bon indice.
![[PLFNV2_FA_TA_G2.png]]
Pour les déploiements, on va sur [la page du 503e régiment du Train](https://www.sengager.fr/tous-nos-regiments/503e-regiment-du-train) du site de recrutement de l'armée de Terre. La partie « Missions » liste les dernières opérations du régiment, dont la mission Lynx en Estonie en 2024.
![[PLFNV2_FA_TA_SE.png|500]]
Le flag était donc **==503e régiment du Train - Estonie==**.

---
## Ecrire pour faire vivre leur mémoire

### Énoncé 
>Plusieurs articles de presse mettent en lumière ces femmes engagées pour la France. L’une d’entre elles, qui était âgée de 98 ans lorsqu’elle a été mise à l’honneur, était présentée comme l’une des dernières volontaires encore en vie.
>
>>Qui est-elle et comment s’appelle sa fille ?
>
>_Format du flag :  `Prénom Nom - Prénom Nom`_

### RETEX
Le challenge fait partie de la catégorie sur les femmes dans les armées, et les deux challenges précédents parlaient des Merlinettes : on suppose donc qu'on cherche une ancienne Merlinette. On reprend les éléments de l'énoncé : `dernière merlinette 98 ans fille`.
![[PLFNV2_FA_EPF_G.png|500]]
L'extrait de l'article du Monde correspond parfaitement : « A 98 ans, Colette Escoffier-Martini serait la dernière volontaire encore en vie ». Dans [cet article de M le magazine du Monde](https://www.lemonde.fr/m-le-mag/article/2021/05/13/les-merlinettes-heroines-oubliees-de-la-seconde-guerre-mondiale_6080058_4500055.html), publié en 2021, on apprend aussi le nom de sa fille, Roselyne Digoix, qui l'accompagnait lors de l'interview :
![[PLFNV2_FA_EPF_LM.png|500]]
Pour confirmer, [l'hommage de Theatrum Belli](https://theatrum-belli.com/in-memoriam-colette-escoffier-martini-merlinette-decedee-le-26-mai-2024/) publié à son décès en 2024 rappelle qu'elle a bien été Merlinette et qu'elle était alors présentée comme la dernière Merlinette en vie.
![[PLFNV2_FA_EPF_TB.png|500]]
Attention au piège : beaucoup de femmes ont été présentées dans la presse comme « l'une des dernières volontaires encore en vie ». C'est le détail des 98 ans qui permet de trouver la bonne. Le flag était donc **==Colette Escoffier-Martini - Roselyne Digoix==**.

---
## Une dénomination plus technique

### Énoncé 
>« Merlinette » n’était en réalité qu’un surnom, ces troupes féminines avaient une autre dénomination officielle.
>
>>Quelle était cette dénomination ?
>
>_Format du flag :  `Dénomination complète`_

### RETEX
À première vue, ce challenge paraît simple. [La page Wikipédia des Merlinettes](https://fr.wikipedia.org/wiki/Merlinettes) explique dès la première phrase que c'est le surnom des femmes du Corps féminin des transmissions (CFT) :
![[PLFNV2_FA_DPT_W.png|500]]
On retrouve la même dénomination sur [le blog Le Signaleur](https://lesignaleur.blogspot.com/2012/03/les-merlinettes-premieres-femmes.html) et sur les affiches de recrutement de l'époque :
![[PLFNV2_FA_DPT_LS.png|400]]
![[PLFNV2_FA_DPT_AF.png|300]]
Pourtant, `Corps Féminin des Transmissions` a été refusé. Comme les flags ne sont pas sensibles à la casse, ce n'était pas un problème de majuscules : le « Dénomination complète » du format laissait plutôt penser qu'ils attendaient autre chose.

On est donc retournés sur [la page « Les Merlinettes »](http://tournantsrovigo.free.fr/Merlinettes.html) du challenge `« Merlinettes », ces femmes engagées !`. Elle renvoie vers des témoignages publiés dans la revue *L'Algérianiste* (« Pages 32 & 33 revue algérianiste n° 145 - mars 2014 »). Sur [cet extrait](http://tournantsrovigo.free.fr/Photos/algerianist-145-merl.jpg), illustré d'ailleurs par une photo de Denise Peyronnet, on trouve une autre dénomination :
![[PLFNV2_FA_DPT_AL.png|400]]
Les A.F.A.T., pour **==auxiliaires féminines de l'arme des transmissions==**, et c'était le flag attendu.

Techniquement, c'est discutable : les Merlinettes faisaient partie des AFAT, mais toutes les AFAT n'étaient pas des Merlinettes. La dénomination la plus juste reste le Corps féminin des transmissions.

---
## Une grande figure contemporaine

### Énoncé 
>La première femme nommée Officier général, Valérie André, s’est éteinte le 21 janvier 2025 à l’aube de ses 103 ans. D’abord médecin, elle s’engage dans l’armée et part en Indochine pour sa première mission. Rêvant d’être aviatrice depuis l’enfance, elle poursuit ensuite une formation pour piloter des hélicoptères dans l’optique de pouvoir à la fois réaliser des allers-retours de façon autonome et soigner les blessés.
>
>Après quelques missions en double commande et de l'entraînement, un capitaine lui dit « _**ça y est, maintenant la prochaine mission c’est à vous !**_ ». C’est ainsi que débute sa carrière de médecin capitaine, chirurgienne, breveté parachutiste et pilote d’hélicoptère.
>
>>Qui est ce capitaine, devenu ensuite colonel ?
>
>_Format du flag :  `Prénom Nom`_

### RETEX
On commence par chercher des sources sur sa carrière en Indochine : `Valérie André capitaine hélicoptère Indochine`.
![[PLFNV2_FA_GFC_G.png|500]]
Parmi les résultats, on trouve une vidéo du Ministère des Armées, « [Valérie André, un destin exceptionnel](https://www.youtube.com/watch?v=tQQVDO82mJ8) », où elle raconte elle-même son parcours. La citation de l'énoncé ressemble beaucoup à une phrase dite à l'oral, donc on ouvre la transcription de la vidéo et on cherche « c'est à vous » :
![[PLFNV2_FA_GFC_YT.png|500]]
À 5:39, elle explique : « c'était Santini, qui est devenu mon mari bien après, qui m'a dit : "Ça y est, maintenant la prochaine mission c'est à vous." » (la transcription automatique a écrit « Sentinie »).

[L'article d'Hélico Fascination](https://helico-fascination.com/pilotes-et-equipages/breve/guerre-d-indochine-valerie-andre-pionniere-des-evasan-heliportees) sur les évacuations sanitaires en hélicoptère confirme qu'il s'agit bien du capitaine Santini, pilote de l'armée de l'Air en Indochine :
![[PLFNV2_FA_GFC_HF.png|500]]
Il reste à trouver son prénom. [La page Wikipédia de Valérie André](https://fr.wikipedia.org/wiki/Val%C3%A9rie_Andr%C3%A9) indique dans l'infobox que son conjoint, à partir de 1963, est Alexis Santini :
![[PLFNV2_FA_GFC_W.png|500]]
Le capitaine devenu colonel est donc **==Alexis Santini==**.

---
## Hommage à un enfant de la Nation

### Énoncé 
>![[PLFNV2_FA_HEN_E.png]]
>Entre 2014 et 2022, la France a perdu 58 de ses enfants au cours d’une opération extérieure. Parmi eux, un héros dont le nom a récemment été donné à une promotion se distingue.
>
>>À partir de cette image, identifiez ce héros et son unité d’appartenance.
>
>_Format du flag :  `Prénom Nom - 0e nom du régiment`_

### RETEX
On commence par une recherche par image inversée de la photo de l'énoncé avec Google Lens. Malgré la pixellisation, on retrouve dans les correspondances visuelles une photo du même portail, publiée sur Facebook par l'Académie de Ménaka : c'est le lycée public de Ménaka, au Mali.
![[PLFNV2_FA_HEN_GL.png|500]]
En l'ouvrant, on lit clairement l'enseigne « LYCÉE PUBLIC DE MENAKA », avec les mêmes murs et la même disposition que sur l'image de l'énoncé :
![[PLFNV2_FA_HEN_L.png|500]]

On a maintenant un lieu, Ménaka au Mali, et une période, 2014-2022. Pour savoir quelle opération extérieure française s'y déroulait, on cherche `Ménaka opération militaire française 2014 2022`.
![[PLFNV2_FA_HEN_G1.png|500]]
Le premier résultat, [la page du Ministère des Armées](https://www.defense.gouv.fr/operations/bande-sahelo-saharienne/operation-barkhane), indique qu'entre 2013 et 2022, les forces françaises étaient engagées au Sahel dans le cadre des opérations Serval (2013-2014) puis Barkhane (2014-2022). Les dates de Barkhane correspondent exactement à l'énoncé. Un autre résultat, un article de La Croix, confirme que l'armée française avait une base à Ménaka dans le cadre de cette opération.

Il reste à vérifier les 58 morts de l'énoncé : `opération Barkhane 58 militaires français morts`.
![[PLFNV2_FA_HEN_G2.png|500]]
Le premier résultat est [la page Wikipédia des pertes militaires françaises au Mali et au Sahel](https://fr.wikipedia.org/wiki/Pertes_militaires_fran%C3%A7aises_au_Mali_et_au_Sahel), qui recense 58 militaires morts, dont 57 hommes et 1 femme. La page contient la liste complète des morts de l'opération. Une seule femme figure dans la liste, ce qui colle avec la catégorie du challenge : la sergent Yvonne Huynh, du 2e RH, tuée le 2 janvier 2021 justement dans la région de Ménaka.
![[PLFNV2_FA_HEN_W.png|500]]
En cherchant `promotion Yvonne Huynh`, on tombe sur [un article de l'ANOPEX](https://anopex.org/la-391eme-promotion-de-lensoa-a-recu-le-nom-sergent-chef-yvonne-huynh/) : la 391e promotion de l'École nationale des sous-officiers d'active (ENSOA) a reçu son nom. L'article confirme aussi son unité, le 2e régiment de hussards.
![[PLFNV2_FA_HEN_A.png|500]]
Le flag était donc **==Yvonne Huynh - 2e régiment de hussards==**.

---
***Les différentes parties du CTF :***
 · | · [[Learning Track]]
 · | · [[Les monuments militaires français]]
 · | · [[La Section camouflage]]
 · | · Les femmes dans les armées
 · | · [[Track Bonus - Le 14 Juillet]]