---
tags:
  - Osint
  - LAF
  - Chall
  - casebandit
  - googlelens
order: 16
---
## Éléments déjà découverts
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.
>Voici le graphique issu de la dernière partie : [[Chapitre 2 - Acte 4]]

![[LAF_C2_A4.svg]]

---
## Le Silence des Mouettes

### Énoncé
>![[LAF_C3_C_SM1.png]]
>>Pour une question de déroulement du CTF, nous n’allons pas vous faire attendre, mais nous allons faire comme si vous aviez eu le temps de vous reposer, et que nous sommes le dimanche 05/07/2026 au matin.
>Vous êtes réveillé par un message de C. Brethone :
>![[LAF_C3_C_SM2.png]]
>![[LAF_C3_C_SM3.png]]
>En lisant le journal, une terrible intuition vous vient. Vous décidez d’en faire part à la police afin de vous éviter tout ennui judiciaire :  
>Vous appelez Mme Brethone et lui expliquez ce que vous savez.
>Vous avez travaillé sur cette affaire avec un certain Péhuson qui travaille en tant que détective privé sur les affaires animales. Depuis hier, il n’a pas répondu à votre dernier message alors que tout au long de votre enquête il répondait dans les 2 minutes qui suivaient. Vous en profitez pour communiquer votre numéro de téléphone à la policière qui semble pouvoir obtenir l’identité de l’abonné à partir de celui-ci, mais cela cela peut prendre un peu de temps.  
>Elle vous remercie pour votre honnêteté, même si vous sentez que le fait que vous lui ayez caché cet aspect de votre enquête la gêne et que sa confiance semble en être ébranlée.  
>Vous en profitez pour l’interroger sur les animaux qui étaient sur place et elle vous explique qu’ils vont parfaitement bien. Leur eau et leur nourriture ont été changées entre l’heure du crime et l’arrivée de la police. De plus, la police a contacté le refuge La Tanière, qui n’est qu’à 1h30 et est spécialisé dans ce genre de cas. Ils s’occuperont des animaux, ce qui vous rassure quant à l’avenir de ces boules de poils, plumes, écailles...

### RETEX
Ce challenge n'en est pas vraiment un, il permet seulement de faire avancer l'histoire.
On y apprend globalement qu'il y a eu un massacre à la soirée Bellerophon, plusieurs morts et des coups de feu.
Les seules personnes au courant du lieu et de l'heure sont les clients, les policiers et Péhuson. Or, Péhuson ne répond plus depuis qu'on lui a donné ces informations... ça n'augure rien de bon.

---
## Le festin du vautour

### Énoncé
>_📳 Bling 📳_
>Vous sentez que cette policière ne va pas vous lâcher de sitôt pour cette affaire. Ce qui vous arrange bien, car vous comptez découvrir ce qu’il s’est réellement passé dans cette ferme :
>![[LAF_C3_C_FV1.png]]
>![[LAF_C3_C_FV2.png]]
>From OSINT to PTS. Bon, eh bien, vous qui regardiez Rex chien policier quand vous étiez petit, vous voilà dans votre élément. Vous vous mettez au travail sans attendre.
>
>>Quels sont le calibre et le modèle (le plus probable) de l’arme utilisée ?
>
>_Format : `1.2x34mm_Desert_Eagle`_

### RETEX
La première difficulté de ce challenge, c'est que la règle à côté de la douille n'est pas graduée en cm mais en ths ; après une rapide recherche, on comprend qu'il s'agit en fait d'une règle graduée en pouces.
![[LAF_C3_C_FV3.png]]
La douille fait donc 1 inch + 2/16 inch de long.
Ce qui représente 28 mm.

Le challenge suivant est débloqué en même temps que celui-ci, et on peut voir sur l'image de caméra de surveillance que l'individu avait une arme de poing.

Donc en cherchant "arme de poing calibre 28mm", le premier résultat est le Five-Seven.
![[LAF_C3_C_FV4.png]]
La photo de l'arme sur Wikipédia correspond à celle de la photo de la caméra de surveillance.
On a donc le flag : **==5.7x28mm_Five-Seven==**

---
## La Vigile du Hibou

### Énoncé
>_📳 Bling 📳_
>Votre nouvelle alliée vous a envoyé un nouveau message pour vous demander de l’aide :
>![[LAF_C3_C_VH1.png]]
>![[LAF_C3_C_VH2.png]]
>>Le suspect semble porter un élément pouvant nous aider à le confondre. Quelle en est la marque ?
>
>_Format : `Canada Goose`_

### RETEX
Pour ce challenge, rien de plus facile : on utilise Google Lens pour rechercher des images de vestes similaires.
![[LAF_C3_C_VH3.png]]
Les premiers résultats pointent vers un bomber d'Alpha Industries.
![[LAF_C3_C_VH4.png]]
Après avoir vérifié que la veste concorde bien visuellement avec celle de la photo de la caméra de surveillance, on obtient le flag : **==Alpha Industries==**

---
## Le venin du Taïpan

### Énoncé
>_📳 Bling 📳_
>Cette coopération avec la Police porte vraiment ses fruits, et vous sentez que vous vous rapprochez du véritable dénouement de cette affaire :
>![[LAF_C3_C_VT1.png]]
>![[LAF_C3_C_VT2.png]]
>>Quel est le nom de la molécule en lien avec cette notice, et sous quel nom est-elle commercialisée en France par l’entreprise ayant déposé le brevet ?
>
>_Format : `paracétamol_doliprane`_

### RETEX
![[LAF_C3_C_VT3.png]]
En cherchant les mots-clés présents sur cette notice, on peut trouver des résultats qui correspondent aux effets secondaires du **==stilnox==**.
![[LAF_C3_C_VT4.png]]
En cherchant qui a déposé le brevet, on apprend [sur Wikipédia](https://fr.wikipedia.org/wiki/Zolpidem) que "Stilnox" est le nom commercial du brevet en France, et que "Zolpidem" est le nom du principe actif, la molécule.
![[LAF_C3_C_VT5.png]]
On a donc le flag : **==zolpidem_stilnox==**
![[LAF_C3_C_VT6.png]]
D'ailleurs, on peut aussi y apprendre que, depuis janvier 2017, il n'est prescrit que sous ordonnance.

---
## Le caillou de la loutre

### Énoncé
>Guillaume Calidur a utilisé une arme de catégorie B pour commettre son crime. Cependant, la police ne l’a pas retrouvé sur le SIA, donc il doit s’être procuré cette arme de manière illégale.
>
>>Auprès de qui Guillaume s’est-il procuré cette arme ?
>
>_Format : `yuri orlov`_

### RETEX
Ce challenge n'est faisable qu'après avoir réussi certains challenges de la partie suivante. Sans trop en dévoiler, on y découvre [un site](https://lessoulevementsdegaia.xyz/authors/).
![[LAF_C3_C_CL1.png]]
Sur ce site, certaines images sont hébergées sur un [sous-domaine](https://pehuson.lessoulevementsdegaia.xyz).
![[LAF_C3_C_CL2.png]]
On y trouve une liste de fichiers, dont un fichier nommé : `Re_ Achat FiveSeveN.eml`.
![[LAF_C3_C_CL3.png]]
Dans ce mail, on peut trouver une demande de Péhuson à un certain **==Victor Zakarof==** pour l'obtention d'une arme de poing.

---
## Synthèse de nos éléments
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.

![[LAF_C3_C.svg]]