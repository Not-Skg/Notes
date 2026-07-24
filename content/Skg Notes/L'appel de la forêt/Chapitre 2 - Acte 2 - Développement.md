---
tags:
  - Osint
  - Chall
  - CaseBandit
---

## Éléments déjà découverts
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.
>Voici le graphique issu de la dernière partie : [[Chapitre 2 - Acte 2 - Droit]]

![[LAF_C2_A2_DT.svg]]
Nous allons pouvoir nous appuyer dessus pour poursuivre nos recherches dans la suite du CTF.

Néanmoins, il faut noter que cette partie du CTF se débloquait en même temps que la partie [[Chapitre 2 - Acte 2 - Activités]]; nous devons donc partir du principe que le site into-tacs.shop vient tout juste d’être découvert.

---
## La Mémoire de l'Éléphant

### Énoncé
>Le fait que ces deux sites web soient liés est en effet intéressant. Obtenir des informations sur le développeur ayant publié ces sites pourrait permettre de faire avancer l'enquête.
>
>>Comment s'appelle le développeur ? 
>
>_Format : `Steve Jobs`

### RETEX
Pour rappel, les deux sites liés sont [into-tacs.shop](https://into-tacs.shop/) et  [le blog du catnapper](https://blog-de-osinttheanimals.xyz/), et ils sont liés par le même certificat SSL. 

Lorsque l’on veut analyser un site pour trouver des informations sur celui qui l’a développé, l’une des manières de procéder consiste à faire une requête WHOIS sur le nom de domaine.

>[!warning] Attention
>WHOIS a été remplacé par RDAP depuis janvier 2025 ; il est donc préférable d’utiliser le nouveau format.

![[LAF_C2_A2_DV_ME_W.png]]
Quoi qu’il en soit, en faisant une requête sur les deux domaines, une même personne y est référencée à chaque fois en tant que Registrant Contact et Technical Contact, avec pour nom et prénom : **==Dave Renault==**.

On vient donc de trouver l’identité de celui qui a loué les noms de domaine et qui a développé les deux sites. 

Mais assurons-nous qu’il existe bien et que ce n’est pas juste une fausse  identité. 
Généralement, les développeurs ont un compte GitHub qui leur sert aussi de portfolio professionnel.
![[LAF_C2_A2_DV_ME_RG.png]]
Un seul compte résulte de la recherche d’un utilisateur GitHub nommé Dave Renault. Et il fait du développement web.
![[LAF_C2_A2_DV_ME_CG.png]]
La description de son profil contient aussi une recommandation du CEO d’Into-Tacs, qui dit qu’il a fait un super travail avec le site et qu’ils en sont fiers. 
On vient donc de confirmer qu’il existe bien.

---
## Le Nid douillet

### Énoncé
>Son nom est donc Dave Renault. Vous en informez votre partenaire d'enquête dont la réponse ne tarde pas : 
>![[LAF_C2_A2_DV_ND_P.png]]
>
>>Comment s'appelle le développeur ? 
>
>_Format : `tacos@email.com`

### RETEX
Étant donné que l’on vient de trouver son GitHub, autant fouiller un peu ses repositories.
On va commencer par vérifier les commits. En ouvrant son [dernier commit](https://github.com/RenDavePet/RenDavePet/commit/13ec12136e528e02e2d9eda22132021bfa83207c) en [format raw](https://github.com/RenDavePet/RenDavePet/commit/13ec12136e528e02e2d9eda22132021bfa83207c.patch), on peut voir les informations techniques du commit, comme la date exacte et surtout l’adresse mail : **==RenDavePet\@proton.me==**.
![[LAF_C2_A2_DV_ND_GC.png]]

>[!warning] Tips
>En ajoutant `.patch` à l’URL d’un commit GitHub, on peut récupérer sa version raw (brute).

---
## Bonus - La Fourmilière d'Informations

### Énoncé
>Tout ce que vous pourrez trouver sur ce développeur pourrait vous aider, après tout on ne sait jamais, même la marque de son téléphone pourrait peut-être vous être utile un jour... Ou pas. Mais quitte à faire vos recherches, autant aller jusqu'au bout !
>
>>Quels sont la marque et le modèle du téléphone de Dave Renault ? 
>
>_Format : `Samsung Galaxy S8`

### RETEX
Généralement, le moyen le plus simple de trouver la marque et le modèle de téléphone d’une personne sur internet, c’est d’analyser les données EXIF des photos qu’elle a publiées. 

Étant donné que Dave n’en a pas publié sur GitHub, pivotons sur son pseudo GitHub :`RenDavePet`.
![[LAF_C2_A2_DV_FI_S.png]]
Sherlock nous renvoie vers un [lien Wikipédia](https://en.wikipedia.org/wiki/Special:CentralAuth/RenDavePet?uselang=qqx).
![[LAF_C2_A2_DV_FI_CA.png]]
Ce lien nous redirige vers une centralisation de comptes liée à Wikipédia portant le nom d’utilisateur RenDavePet. 
On y apprend qu’un administrateur appelé ainsi existe et a contribué sur [en.wikipedia.org](https://en.wikipedia.org/wiki/User:RenDavePet "(centralauth-foreign-link: RenDavePet, en.wikipedia.org)") et sur [commons.wikimedia.org](https://commons.wikimedia.org/wiki/User:RenDavePet "(centralauth-foreign-link: RenDavePet, commons.wikimedia.org)")
Sur [sa page de contribution en.wikipedia](https://en.wikipedia.org/wiki/User:RenDavePet), on peut confirmer que c’est bien la même personne que celle recherchée.
![[LAF_C2_A2_DV_FI_UW.png]]

Sur [sa page de contribution commons.wikimedia.org](https://commons.wikimedia.org/wiki/Special:Contributions/RenDavePet), on apprend qu’il a posté l’image d’une « Chappe tower ».
![[LAF_C2_A2_DV_FI_CW.png]]
La même que celle de la partie [[Chapitre 2 - Acte 2 - Droit]], celle de Baccon.
![[LAF_C2_A2_DV_FI_CT.png]]

En récupérant [la photo originale](https://upload.wikimedia.org/wikipedia/commons/7/73/Chappe_tower.jpg) que le développeur a ajoutée, on peut analyser ses données EXIF.
![[LAF_C2_A2_DV_FI_EX.png]]
Dans les données EXIF, on peut noter trois points intéressants : l’identité de la personne liée à la photo, Dave Renault ; son nom d’utilisateur, Huhul ; et la marque et le modèle de son téléphone ayant pris la photo : **==Google Pixel 8==**

---
## Synthèse de nos éléments
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.

![[LAF_C2_A2_DV.svg]]•