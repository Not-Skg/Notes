---
tags:
  - Osint
  - sherlock
  - LAF
  - Chall
  - casebandit
order: 11
---
## Éléments déjà découverts
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.
>Voici le graphique issu de la dernière partie : [[Chapitre 2 - Acte 2 - Développement]]

![[LAF_C2_A2_DV.svg]]

Nous allons pouvoir nous appuyer dessus pour poursuivre nos recherches dans la suite du CTF.

---
## La danse des abeilles

### Énoncé
>Vous avez trouvé un très bon filon avec ce site onion. Vous en avez informé Péhuson qui répond très rapidement. Retrouver ceux qui s'en prennent à de petites boules de poils comme Malo à l'air de lui tenir autant à coeur qu'à vous. En effet, vous n'avez pas eu le temps de reposer votre téléphone qu'il vous a déjà répondu : 
>
>![[LAF_C2_A3_C_LDA_P.png]]
>
>>Quels sont le nom et la date de l'événement qui a été organisé par le groupe que vous venez de découvrir afin de rencontrer leurs futurs clients ? 
>
>_Format : `calembour_13/01/2000`_

### RETEX
Pour rappel, on avait pu trouver la page cachée qui nous renvoyait vers le .onion via le Pastebin de Morelos et le mot de passe leaké dans une vidéo Twitch de Martinezi dans [[Chapitre 2 - Acte 2 - Activités]].

Pour ouvrir ce .onion, le plus simple est d’utiliser le navigateur Tor.
![[LAF_C2_A3_C_LDA_O.png]]
Grâce à lui, on peut voir un site à l’apparence un peu flashy, très verte et très « matrix ». C’est une sorte de site vitrine pour la vente d’animaux rares et d’espèces protégées.

![[LAF_C2_A3_C_LDA_OA.png]]
Plusieurs onglets sont disponibles, comme « Actualités ». Celui-ci donne un aperçu d’informations, mais il reste très limité et, d’après les articles mis en avant, pour plus d’informations il faut les contacter via le canal sécurisé.

![[LAF_C2_A3_C_LDA_OC.png]]
En allant dans l’onglet « Contact », un logo est mis en avant.

![[LAF_C2_A3_C_LDA_OIC.png]]
En inspectant la page, on apprend que c’est le logo de Keybase, une application de messagerie sécurisée.

![[LAF_C2_A3_C_LDA_KB.png]]
En allant sur le site Keybase et en cherchant l’un des pseudos liés au site into-tacs, on trouve à chaque fois un compte appartenant à la team « lameuterouge ».

![[LAF_C2_A3_C_LDA_TKB.png]]
Cette team est dite « ouverte » : elle permet donc une libre entrée, probablement pour faciliter l’arrivée de nouveaux investisseurs ou clients. 
Une fois l’application téléchargée et un compte Keybase créé, on peut entrer dans la team et tout exporter pour garder et travailler sur les traces récoltées.
![[LAF_C2_A3_C_LDA_EKB.png]]
On peut compter sept canaux différents, plus un canal lié directement à une utilisatrice nommée « lycaon » et un autre lié à un utilisateur nommé « maximus ». 

Étant donné que l’on cherche des événements, on peut directement analyser le canal « Events ».
Deux soirées y sont référencées : 
1. Bellerophon
   ![[LAF_C2_A3_C_LDA_MB.png]]
   Qui est la nouvelle soirée organisée.
2. **==Amanra==**
   ![[LAF_C2_A3_C_LDA_MA.png]]
   Qui est la soirée organisée le **==31/05/2026==**, donc la dernière en date, déjà passée.


---
## L'Instinct du Pigeon Voyageur

### Énoncé
>Parmi les membres du groupe que vous avez réussi à identifier, certains sont assez proches des clients et semblent se déplacer régulièrement. Notamment, un membre apparaît être en charge de récupérer physiquement les demandes des différents clients.
>
>>Quel lieu paraît être utilisé en tant que boîte aux lettres mortes à cet effet ? 
>
>_Format : `XX.XXXXXXX, XX.XXXXXXX`

### RETEX
Avant même de se lancer dans ce challenge, il peut être très intéressant de survoler rapidement les données dont on dispose. 

On sait que l’on a accès à un drive Proton via le dossier lié à Maximus, et on sait surtout que le dossier de Lycaon renferme un PDF et un JPG nommés fiche_rh_registre et organigramme_meute_rouge. 

Cela a l’air d’être une mine d’or d’informations : analysons-les rapidement.
![[LAF_C2_A3_C_IPV_I.png]]
L’organigramme nous apprend que les personnes liées à into-tacs font partie de l’équipe Scorpiox, que Virgata et Huhul font partie de l’équipe Noctua, et que Tigris fait partie de l’équipe Panthera. 
Nous avions donc bien réussi à comprendre les liens entre ces personnes et leurs activités peu nettes, mais ce document nous prouve que c’est encore une plus grosse organisation que ce que l’on imaginait, avec à sa tête Lycaon.

![[LAF_C2_A3_C_IPV_O.png]]
La fiche RH, elle, nous donne les liens entre pseudonymes et noms/prénoms. 
Nous connaissons donc maintenant la vraie identité de chacun, et, en plus, cela nous donne une petite observation pour chacun. 

On peut notamment y lire qu’Uncia a un très bon profil pour maintenir le réseau des clients et fournisseurs. 
On peut donc maintenant fouiller dans les messages liés à ce pseudo, ce qui nous permet de trouver un message indiquant qu’elle a déposé « les points de départ pour la soirée dans la BAL morte, comme d’habitude pendant une course », et que « les clients pourront les récupérer pour venir à la soirée ».
![[Chapitre 2 - Acte 3 - Communicationerdsfgdsgd.png]]

Le point important dans ce message, c’est qu’elle a fait l’action lors d’une course. Elle est donc, à l’instar du fils de Renée Michelle, une coureuse. 
On peut donc aller vérifier sur Strava si elle a un compte.

En utilisant un outil comme Sherlock avec le pseudo « Uncia », ou en recherchant directement la vraie identité d’Uncia découverte via la fiche RH, on peut trouver [son compte](https://www.strava.com/athletes/uncia).
![[LAF_C2_A3_C_IPV_S.png]]

Elle a l’air d’avoir un profil plutôt actif : il y a donc plusieurs courses enregistrées, mais comme son message date du 2026-06-20 à 11:13:05, on ne va s’intéresser qu’à la course datant du même moment.
![[LAF_C2_A3_C_IPV_CS.png]]
On peut voir qu’elle a une foulée plutôt régulière, mais bizarrement, elle ne s’arrête pas aux passages piétons qu’elle traverse. En revanche, elle s’arrête à un endroit dans le parc, suffisamment longtemps pour provoquer un pic dans le tableau de vitesse disponible sur Strava.
![[LAF_C2_A3_C_IPV_ZCS.png]]

En recherchant un peu sur Internet, on peut s’assurer qu’il y a bien une boîte aux lettres disponible à cet endroit : ![[LAF_C2_A3_C_IPV_BLM.png]]

Les coordonnées de ce pic sur Strava, **==47.9071514, 1.9107018==**, sont donc l’endroit utilisé en tant que boîte aux lettres mortes pendant les affaires avec les clients. On peut le confirmer puisqu’une conversation entre Uncia et un client dans le channel Général décrit ce lieu comme étant proche d’une table. Et la table en question est la grande table noire à côté de l’endroit où elle s’est arrêtée.
![[LAF_C2_A3_C_IPV_T.png]]

---
## Synthèse de nos éléments
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.

![[LAF_C2_A3_C.svg]]