---
tags:
  - Osint
  - sherlock
  - LAF
  - Chall
  - casebandit
order: 7
---

## Éléments déjà découverts
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.
>Voici le graphique issu de la dernière partie : [[Chapitre 1 - Petsitter]]

![[LAF_C1_P.svg]]

Nous allons pouvoir nous appuyer dessus pour poursuivre nos recherches dans la suite du CTF.

---
## Tapir dans l'ombre

> [!challmaker] Eldwiin, Zmondy
### Énoncé
Avec toutes ces informations, vous pouvez en déduire 2 choses. Premièrement il semblerait que la famille de votre voisine, bien que vous ayez quelques soupçons, ne soit pas dans le coup. Deuxièmement, vous feriez bien de communiquer ce que vous avez trouvé, notamment concernant le gardien de Malo, à la police.
Sur cette pensée, vous allez voir votre voisine pour lui annoncer la nouvelle.

>**Renée Michelle**
>« C'est formidable, donc le monsieur de l'internet il a retrouvé mon petit Malo ? Je suis si heureuse ! »

_*Ouais, fin le monsieur il n'était pas tout seul...*_

Vous lui demandez donc si elle peut vous transmettre son contact de la police, afin que vous puissiez leur communiquer les informations que vous avez rassemblées sur le suspect. Ce qu'elle fait avec enthousiame.

Une fois de retour chez vous, vous contactez la Police et expliquez à l'officière que vous avez au téléphone tout ce que vous avez pu obtenir dans cette affaire. Celle-ci semble ravie, elle vous indique que cela lui rappelle plusieurs autres affaires dont elle a déjà entendu parler.

Pendant ce temps : 
![[LAF_C2_A1_TDL_A.png]]

Quelque temps après, votre téléphone émet un bruit familier :
![[LAF_C2_A1_TDL_CB.png]]

Et la pièce jointe : PV_interrogatoire.pdf : 
![[LAF_C2_A1_TDL_PV.png]]

>>Quelle est la date de naissance de l'individu qui a contacté Joseph Delamarre ? 
>
>_Format : `01/01/1970`

### RETEX
Avant toute chose, synthétisons les informations que nous apporte le procès-verbal :
- Joseph a été contacté sur Instagram par « Virgata ».
- « Virgata » n’est pas son pseudonyme Instagram, mais le nom par lequel il souhaite se faire appeler.
- Virgata a proposé à Joseph de l’aider à kidnapper des animaux de race contre une somme d’argent.
- Joseph a accepté, car il est étudiant en situation précaire.
- Joseph a communiqué à Virgata l’adresse de madame Michelle, puis s’est fait payer.

Le catnapper est donc ce « Virgata ».
Étant donné que Joseph a été contacté sur Instagram, passons en revue son compte et ses publications.
![[LAF_C1_P_MB_CIV.png]]
On peut retrouver sur [un post instagram de Joseph](https://www.instagram.com/p/DWyNL1XDMZR/?img_index=1) comportant des photos de Malo, un commentaire d’un compte nommé `petosint`, qui signe son commentaire par « Virgata »
On tient donc [le compte Instagram](https://www.instagram.com/petosint/) par lequel Virgata a approché Joseph.
Malheureusement, le compte est vide : pas de photo de profil, pas de publications, pas de stories.

Il va donc falloir pivoter sur le nom d'utilisateur `petosint` via un outil comme Maigret ou Sherlock.
![[LAF_C2_A1_TDL_M.png]]
Ces outils peuvent nous donner en résultat [un compte X](https://x.com/PetOsint) avec le même nom d'utilisateur.
Étant donné que c’est le seul résultat exploitable parmi ceux renvoyés par ce type d’outil, on va partir du principe qu’il s’agit bien de la même personne, puis le prouver plus tard à l’aide des autres recherches.
![[LAF_C2_A1_TDL_CX.png]]
Ce compte ne contient que quatre posts, tous orientés OSINT, sauf un qui précise qu’il a 33 ans le jour de la publication de [ce post](https://x.com/PetOsint/status/2038693656106881426).

Le post ayant été publié le 30 mars 2026, sa date de naissance est donc le **==30/03/1993==**

---
## Le Caméléon des internet

> [!challmaker] Eldwiin
### Énoncé
>_📳 Bling 📳_
>Ça n'en finira donc jamais ? 
>Vous ouvrez votre téléphone pour constater un message, non pas de la policière mais de votre partenaire : 
>![[LAF_C2_A1_LCI_P.png]]
>Ça ne vous réjouit pas forcément de donner ce genre d'information gratuitement, mais c'est grâce à lui que Malo a retrouvé sa maîtresse, et vous pourrez sûrement obtenir d'autres informations de sa part par la suite.
>
>>Quels sont le Prénom et le Nom de la personne ayant pris contact avec Joseph Delamare afin de dérober Malo ?
>
>_Format : `Clark Kent`

### RETEX

La seule source non encore exploitée liée à PetOsint, c’est sa photo de profil X. Dans la vue ronde de X, on peut voir qu’un texte est coupé par la forme de la photo de profil, mais en la téléchargeant, on peut le lire en entier.

![[LAF_C2_A1_LCI_PP.jpg]]
En bas à droite de cette photo de profil, on peut apercevoir la chaîne de caractères `OsintTheAnimals`. Comme elle ne contient aucun espace entre les trois mots qui la composent, on peut en déduire qu’il s’agit soit d’un nom de domaine, soit d’un nom d’utilisateur.
![[LAF_C2_A1_LCI_RG.png]]
En cherchant cette chaine de caractère sur Google, on peut trouver [un blog](https://blog-de-osinttheanimals.xyz).
![[LAF_C2_A1_LCI_B.png]]
Ce blog a l’air d’être le blog personnel d’un osinter utilisant « OsintTheAnimals » comme pseudonyme.
![[LAF_C2_A1_LCI_BPP.png]]
Dans l’onglet Présentation de ce blog, on peut trouver le nom et le prénom de cet osinter : Steven Pichon, ainsi que son âge : 33 ans.
On pourrait penser qu’il s’agit de la même personne que PetOsint, mais le simple fait que les deux individus aient approximativement le même âge, et que le pseudo soit mentionné dans la photo de profil du compte X de PetOsint, ne suffit pas comme preuve.

![[LAF_C2_A1_LCI_PX.png]]
PetOsint [avait posté](https://x.com/PetOsint/status/2053076077291966602) sur son compte X qu’il avait rejoint « pas mal de communautés OSINT ».
![[LAF_C2_A1_LCI_AB.png]]
Et OsintTheAnimals a publié un article sur "Oscar Zulu" sur son blog.
Oscar Zulu est une grosse communauté OSINT en France, notamment axée sur la protection et la sauvegarde des animaux, d’où leur logo : un rhinocéros.

Cette communauté possède un discord, ça vaut toujours le coup d'aller vérifier si un PetOsint ou un OsintTheAnimals a rejoint leur serveur.
![[LAF_C2_A1_LCI_D.png]]
Bingo !
Un compte Discord nommé `PetOsint`, avec pour alias `osinttheanimals` et comme photo de profil l’image de profil d’OsintTheAnimals sur son blog, s’y est présenté sous le prénom Steven
![[LAF_C2_A1_LCI_DCD.png]]
Et dans sa description de compte Discord, on peut trouver son compte X et son blog.

On est donc sûr que PetOsint et OsintTheAnimals sont la même personne : **==Steven Pichon==**. On vient donc de prouver l’identité du catnapper.

---
## Les piqueboeufs et l'hippopotame

> [!challmaker] Eldwiin
### Énoncé
>Vous avez réussi à identifier la personne derrière tout ça, même si ce n'était pas évident, vous pouvez être fier de vous. Cependant, quelque chose vous dit que Steven n'a pas dû agir seul. La logistique mise en place semble plus correspondre à un travail de groupe.
>
>>Quel est le nom de domaine du site web, outre son blog, qui est lié à Steven Pichon ?
>
>_Format : `google.com`

### RETEX
Généralement, pour prouver que deux sites sont liés, une des manières de faire consiste à montrer qu’ils partagent le même certificat SSL, par exemple.
![[LAF_C2_A1_PH_CSSL.png]]
Et, dans ce cas, le certificat SSL du blog est partagé avec un site nommé **==into-tacs.shop==**.

---
## Synthèse de nos éléments
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.

![[LAF_C2_A1.svg]]
