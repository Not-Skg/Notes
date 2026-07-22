---
tags:
  - Osint
  - Chall
  - CaseBandit

---

## Éléments déjà découverts
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.
>Voici le graphique issu de la dernière partie : [[Chapitre 2 - Acte 1]]

![[LAF_C2_A1.svg]]

Nous allons pouvoir nous appuyer dessus pour poursuivre nos recherches dans la suite du CTF.

---
## La parade du paon

### Énoncé
>Vous informez votre coéquipier de vos trouvailles sur Steven Pichon :
>![[LAF_C2_A2_A_PDD_P.png]]
>
>Vous décidez de vous concentrer sur ce site web afin de dénicher cette potentielle erreur OPSEC.
>
>>Quelle identité parvenez-vous à obtenir à partir de cette erreur ? 
>
>_Format : `Zinedine Zidane`

### RETEX
Pour rappel, dans la dernière partie, nous avions découvert que le catnapper Steven Pichon possédait un blog qui partageait le même certificat SSL que le site into-tacs.shop.

Ce site est donc lié au catnapper et devient notre nouveau pivot principal.
![[LAF_C2_A2_A_PDD_ITS_A.png]]
into-tacs.shop promeut les services de l'entreprise into-tacs en "entraînement canin", en "sécurisation de sites" et en "gestion de conflits", tout en promettant discrétion.

![[LAF_C2_A2_A_PDD_ITS_E.png]]
Trois personnes sont mises en avant sur le site : Martinezi, Morelos et Julietteae. 
Maître Artaux est mentionné dans la FAQ comme conseiller externe. 

En inspectant les photos de profil de la présentation de l'équipe, on peut s'apercevoir que celle de la membre Julietteae est nommée `emmapoirier1990.png`.
![[LAF_C2_A2_A_PDD_ITS_J.png]]
Ce nom de fichier ressemble étrangement à un nom d'utilisateur, on va donc pouvoir pivoter dessus via un outil comme Sherlock ou Maigret.
![[LAF_C2_A2_A_PDD_S.png]]
Un résultat intéressant de ce type d'outil est [le compte X  emmapoirier1990](https://x.com/emmapoirier1990).

On peut reconnaître Julietteae en photo de profil, et en description : Emma Poirier.
![[LAF_C2_A2_A_PDD_XE.png]]
**==Emma Poirier==** est donc sa vraie identité, et 1990 doit potentiellement être sa date de naissance.

---
## Les Traces de l'Ours

### Énoncé
>Maintenant que vous avez identifié Emma, vous décidez de continuer de faire son environnement en espérant trouver des informations sur ses deux comparses. Vous vous concentrez d'abord sur Morelos.
>
>>Quelle est l'identité de Morelos ? 
>
>_Format : `John Wick`

### RETEX

>[!info] Information
>La méthode de résolution de ce challenge et du challenge "La chasse du guépard" explicitée ici est celle prévue par les challmakers.
>Il faut savoir que pour les challenges "Les Traces de l'Ours" et "La chasse du guépard", nous avons passé beaucoup de temps à chercher la solution et avons fini par trouver un raccourci non prévu par les challmakers. Ce raccourci nous a fait sauter un asset très important pour un challenge ultérieur. Notre méthode, ainsi que ce raccourci, sont explicités dans la partie "Raccourcis Ours et Guépard".

Pour ce challenge, il fallait chercher dans les listes X du compte d'Emma.
![[LAF_C2_A2_A_TO_XE.png]]

Plus précisément dans [les listes dont elle est membre](https://x.com/EmmaPoirier1990/lists/memberships).
![[LAF_C2_A2_A_TO_XEL.png]]

Emma appartient à [une liste X](https://x.com/i/lists/2030953833291997356) nommé "Les copains", créée par le compte `lebriochard69`.
![[LAF_C2_A2_A_TO_XELC.png]]

Dans cette liste, il y a aussi un compte nommé `Morelhunt25591`.
![[LAF_C2_A2_A_TO_LM.png]]
On peut reconnaître sur les photos de profil de ces deux comptes les deux derniers membres du groupe d'into-tacs.

Morelos est donc [MorelHunt25591](https://x.com/MorelHunt25591) et Martinezi est [lebriochard69](https://x.com/lebriochard69).

Morelos précise même dans la description de son compte X qu’il est bien Morelos. On peut aussi noter qu’il y précise qu’il habite à `XQJM+H27 Boulay-les-Barres`. En lisant les tweets d’Emma et de Morelos, on peut se rendre compte qu’ils semblent entretenir une relation de couple.

Maintenant qu’on a un nouveau nom d’utilisateur pour Morelos, on peut pivoter dessus via un outil comme Sherlock, qui nous permet de trouver son compte 9gag.
![[LAF_C2_A2_A_TO_9G.png]]
Le fait qu’il possède un compte 9gag est cohérent puisqu’il partageait plusieurs posts provenant de 9gag sur son compte X.
![[LAF_C2_A2_A_TO_XM.png]]
La description de son compte 9gag contient [un lien pastebin](https://pastebin.com/YBwuJjLP).
![[LAF_C2_A2_A_TO_D9G.png]]

Et ce lien nous renvoie vers un texte confirmant que sa vraie identité est Hubert LeMaitre et que ses pseudos sont : HLM, Morelos et MorelHunt.
![[LAF_C2_A2_A_TO_PB.png]]
Ce qui corrobore aussi le fait que, dans la description du compte X d’Emma, elle précise habiter chez HLM. Elle précise d’ailleurs aussi dans un commentaire qu’elle avait emménagé avec HLM.
![[LAF_C2_A2_A_TO_EXC.png]]
On peut aussi noter que le texte sur Pastebin contient un bout d’URL : `/c3e5e2b5e8d159cd4c02a4684a376c494418beafa24ef31e5837fd8101b0b1ca.html`, et qu’il servirait à le contacter.

---
## La chasse du guépard

### Énoncé
>Maintenant que vous avez identifié Emma, vous décidez de continuer de faire son environnement en espérant trouver des informations sur ses deux comparses. Vous vous concentrez d'abord sur Martinezi.
>
>>Quelle est l'identité de Martinezi ? 
>
>_Format : `Roger Duprès`

### RETEX
On peut pivoter de la même façon que pour Morelos, c’est-à-dire via son pseudo de compte X : `lebriochard69`.
![[LAF_C2_A2_A_CG_S.png]]
Et via un outil comme Sherlock, on peut trouver [un compte Twitch](https://www.twitch.tv/lebriochard69) avec le même nom d'utilisateur.
![[LAF_C2_A2_A_CG_T.png]]
Dans sa bio, il précise s’appeler **==Edouard Pasquier==**, et habiter à Tours. 
Même s’il n’y a pas de photos de lui sur Twitch, on peut quand même être sûr qu’Edouard est bien Martinezi puisque sa bio Twitch corrobore ses posts sur X, portés sur la muscu et la fête, tout comme sa description dans l’équipe d’into-tacs.

---
## Raccourcis Ours et Guépard

Étant donné que nous ne connaissions pas l’existence des listes X et que nous sommes très persévérants, nous ne sommes pas passés par la liste X d’Emma Poirier et n’avons donc pas trouvé les comptes X de Martinezi et de Morelos.

Au bout de longues recherches infructueuses en tentant de pivoter sur les noms d’utilisateur des membres de l’équipe de façon classique, nous avons fini par tenter ces noms d’utilisateur sur des sites peu habituels. En reprenant plusieurs fois le compte X d’Emma, nous avons fini par penser que l’emoji maison dans la description de son compte devait avoir une symbolique précise. Et, quand on pense à maison, on pense aux clés de maison ; nous avons donc fini par penser à Keybase...
![[LAF_C2_A2_A_UR_KB.png]]
En tapant les pseudos des membres de l’équipe sur Keybase, nous avons réussi à trouver des profils avec une photo de profil qui concorde avec celles des membres sur le site into-tacs.
![[LAF_C2_A2_A_UR_KBT.png]]
Et chacun de ces profils appartenait au groupe "lameuterouge". Groupe public, nous avons donc pu nous y infiltrer et y trouver un document bien spécifique qui reliait les identités de chacun des membres à leurs pseudos et à leurs activités respectives. Je n’en dirai pas plus pour ne pas spoiler, mais nous étions censés découvrir ce groupe dans le challenge "La danse des abeilles" de la partie [[Chapitre 2 - Acte 3 - Communication]].

Aussi, le fait de ne pas avoir trouvé cette liste nous a empêchés de trouver le compte X de Morelos, et donc de trouver son adresse lors du challenge "Scorpiox" de la partie [[Chapitre 2 - Acte 4]].
Le support nous a donc demandé de refaire les challenges "Les Traces de l'Ours" et "La chasse du guépard" de la manière correcte, ce que nous n’avons pas réussi, avant de finir par débloquer un indice et d’apprendre l’existence des listes X. 
On remercie donc fortement le support, car apprendre est toujours un plaisir, et dans ce cas-là c’était aussi une délivrance après tant d’heures de recherche. Aussi, afin de ne pas submerger le graphique CaseBandit d’informations qui ne sont pas censées être connues à l’heure actuelle, je vais modifier les prochains graphiques en partant du principe que nous avons utilisé la méthode correcte.

---
## Les Abysses des Lophiiformes 

### Énoncé
>Hop, vous informez Péhuson de vos de vos avancées, et échangez un peu sur la suite de l'enquête :
>![[LAF_C2_A2_A_AL_P.png]]
>
>>Quel est le nom de domaine de l'autre site utilisé par ces individus ? 
>
>_Format : `2gzyxa5ihm7nsggfxnu52rck2vv4rvmdlkiu3zzi5du4xyclen53vid.carrot`

### RETEX
Le format du flag sous-entend très clairement qu’on cherche un .onion. Pour l’instant, nous n’en avons pas, mais nous avions trouvé plus tôt un bout d’URL sur le Pastebin de Morelos. En le collant dans l’URL du seul site directement lié à cet individu, into-tacs.shop, on trouve une page cachée du site, qui s’avère être une page de connexion.

![[LAF_C2_A2_A_AL_PC.png]]
Étant donné que nous n’avons pas de mot de passe, et que nous faisons de l’OSINT, nous n’allons pas tenter de le bruteforcer ni utiliser une autre technique peu discrète. 

Un asset que nous n’avons pas vraiment exploité jusqu’au bout est le compte Twitch de Martinezi. Sur son compte, Martinezi a posté plusieurs vidéos dans lesquelles on peut apercevoir son bureau et d’autres onglets, dont un onglet du gestionnaire de mots de passe KeePass. Nous allons donc pouvoir analyser ces vidéos pour y chercher un indice.

On peut retrouver [dans une de ses vidéos](https://www.twitch.tv/videos/2802852167) un aperçu de l’un de ses mots de passe juste avant qu’il n’ouvre un autre onglet.
![[LAF_C2_A2_A_AL_LT.png]]

Le mot de passe est intitulé "MDP ONION", et le mot de passe en question est `ulysse`.
![[LAF_C2_A2_A_AL_FPC.png]]
En le tentant sur la page de connexion trouvée précédemment, on est redirigé vers une page qui nous explique que, si l’on veut les rejoindre, il faut aller sur **==2mflu6auogvubqrf2pv4jzsaaacs6k2mf5vfn5evstgdo6f6ydcvckad.onion==**.

---
## Synthèse de nos éléments
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.

![[LAF_C2_A2_A.svg]]