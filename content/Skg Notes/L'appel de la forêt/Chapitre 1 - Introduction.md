---
tags:
  - Osint
  - Chall
  - CaseBandit
---
---
##  Chill comme un capybara

### Énoncé
Vous êtes tranquillement chez vous, en train de ~~stalker~~ faire de l'OSINT sur cette charmante personne que vous croisez régulièrement pendant que vous faites vos courses, lorsque vous entendez un cri sur le palier. La voix ressemble à celle de Renée Michelle, votre sympathique voisine.

Intrigué, vous ouvrez la porte et découvrez votre voisine paniquée : la porte de son appartement est fracturée et grande ouverte. Entre deux sanglots, vous parvenez à comprendre que son chat n'est plus dans l'appartement : elle n'était partie qu'une courte demi-heure afin de faire ses courses au supermarché du coin, Route d'Olivet semble-t-il.
![[LAF_C1_I_CCC.png]]
>**Renée Michelle**
> « Mon Malo... On m'a pris mon Malo... J'avais pourtant bien tout fermé, c'est sûr qu'il n'est pas parti... Je suis sûre que c'est des voleurs de chat, comme ils l'ont dit à la télé ! »

_*Mouais... Des voleurs de chat, comme à la télé, bien sûr... Comme si des cambrioleurs allaient s'encombrer d'un chat...*_

Néanmoins, pour rassurer votre voisine, vous lui dites de contacter la police pour signaler la disparition et de bien faire une liste de tout ce qui a disparu. En attendant, vous allez rechercher sur internet si vous ne trouvez pas quelque chose. Après tout, ça ne coûte rien de regarder, ça rassurera votre voisine, et puis cette charmante personne ~~que vous stalkiez~~ dont vous consultiez les réseaux, peut bien attendre 5 minutes.

Pour débuter votre enquête, vous décidez tout d'abord de vous renseigner sur votre voisine que vous saluez souvent, mais que vous connaissez peu. Vous savez qu'elle vit seule suite au décès de son mari il y a quelques années, mais qu'elle garde contact avec ses petites-filles via les réseaux sociaux. Peut-être trouverez-vous une piste en obtenant plus d'informations sur elle et son entourage proche.

>>Quelle est la date du décès de son mari ?
>
>_Format : `31/12/2000`_

### RETEX

Avant toute chose, rassemblons les infos que l'on a : 
- Voisine : Renée Michelle 
- Localisation : inconnue, proche d'un supermarché et d'une "Route d'Olivet" 
- Situation : vit seule, mari décédé, garde contact avec sa famille via les réseaux sociaux 
- Possession : chat nommé Malo qui vient de se faire kidnapper en l'espace d'une trentaine de minutes.

Notre première piste est donc de chercher un réseau social sur lequel elle pourrait avoir un contact avec sa famille. 
Au vu de sa tranche d'âge supposée, je penche vers Facebook. 
En recherchant "Renée Michelle" dans les publications Facebook de 2026, on peut trouver un post d'un compte éponyme.
![[LAF_C1_I_CCC_PF.png]]
Ce post fait mention de "Malo" et de petites-filles. La photo de profil correspond à la photo de Renée Michelle paniquée de l'énoncé.
![[LAF_C1_I_CCC_PP.png]]
On vient donc de trouver [le compte Facebook](https://www.facebook.com/profile.php?id=61578487714446) de cette dame.
En épluchant les posts de son compte, on peut trouver très rapidement [un post en hommage](https://www.facebook.com/photo?fbid=122101238324949590&set=a.122101239230949590) à son défunt mari.
Sur ce post, elle annonce que le jour de cette publication, cela faisait 13 ans jour pour jour que son mari est décédé.
![[LAF_C1_I_CCC_PM.png]]
Son post datant du 24/03/2026, cela veut dire que son mari est décédé le **==24/03/2013==**.

---

## Sous l'oeil du Sphynx

### Énoncé
>Les publications de Renée sur son réseau social semblent confirmer qu'elle tient beaucoup à son chat, mais que celui-ci ne supporte pas très bien les voyages.   
>Vous vous souvenez qu'elle est pourtant allée voir sa famille cette année. Elle doit donc avoir trouvé un moyen de garde pour Malo.
>
>>Quel est le numéro de téléphone associé à ce moyen de garde ?
>
>_Format : `0612345678`_

### RETEX

Continuons sur notre lancée avec le compte Facebook de madame Michelle.
![[LAF_C1_I_SOS_ICF.png]]
Son compte annonce qu'elle habite Orléans. Une petite recherche sur Google Maps permet de confirmer qu'il y a bien une "Route d'Olivet" avec un supermarché à proximité, ce qui colle bien avec l'énoncé.
![[LAF_C1_I_SOS_GGM.png]]
On peut aussi noter qu'elle a pour amis sur cette plateforme plusieurs personnes portant le même nom de famille, ce qui corrobore avec l'indice selon lequel elle utilise ce réseau pour garder contact avec sa famille. Parmi eux, il y a notamment :
- [Lucia Michelle](https://www.facebook.com/profile.php?id=61577432904055)
- [Jean Michelle Jr.](https://www.facebook.com/profile.php?id=61579482161478)
- [Sarah Michelle](https://www.facebook.com/michelle.sarah2003)

En survolant très rapidement ces trois comptes, on apprend que Jean et Lucia sont mariés, et que Sarah est leur fille et appelle Renée "Mamie". 
On peut aussi trouver[un post](https://www.facebook.com/michelle.sarah2003/posts/pfbid02euSNaM9KUWSFMrBfyJb17dNXoQ7WUi9XL6kLsZqE24Mv9Lh8ux1K91ADhf6LL7kEl) sur le compte Facebook de cette dernière qui interpelle sa grand-mère via une photo montrant une affiche de PetSitter à Orléans, en lui précisant qu’il pourrait garder Malo.
![[LAF_C1_I_SOS_AP.png]]
Cette affiche présente le numéro suivant : **==0261913352==**.
On peut aussi noter que Lucia explique en commentaire qu'une de ses amies a déjà vu un des messages de ce PetSitter sur un autre réseau avec le même numéro.
![[LAF_C1_I_SOS_APC.png]]

---

## BONUS - Le sens de l'orientation d'un chat

### Énoncé
>Si Malo s'est enfui pendant que des cambrioleurs étaient là, il est possible que quelqu'un l'ait ramené à la SPA.
>
>>Quel est le numéro de téléphone de la SPA autonome régionale la plus proche qui permet d'accueillir des animaux ?
>
>_Format : `0123456789`_

### RETEX
Cette question contient étonnamment beaucoup de mots compliqués... 
Essayons de les utiliser dans une recherche : `SPA autonome régionale Orléans`. 
Le premier lien indexé via cette recherche est une page du site de la [SPA du Centre](https://www.spa-du-centre.com).
![[LAF_C1_I_SOC.png]]
On peut retrouver sur leur page d'accueil exactement les mêmes termes pour décrire la SPA du Centre d'Orléans, ce qui confirme qu’on est au bon endroit. 
Après avoir vérifié les distances respectives entre chacun de leurs sites présents sur cette page et la "Route d'Olivet" via Google Maps, on peut s'assurer que le site le plus proche possède le numéro :**==0238448964==**.

---

## Synthèse de nos éléments
> Parce que ce CTF est très long, je me permets de partager à chaque fin de page dédiée un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l'ensemble de nos éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.
