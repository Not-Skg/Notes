---
tags:
  - Osint
  - Chall
  - CaseBandit
  - ChainMap
  - crypto
draft: true
order: 14
---

## Éléments déjà découverts
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.
>Voici le graphique issu de la dernière partie : [[Chapitre 2 - Acte 3 - Financement]]

![[LAF_C2_A3_F.svg]]

Nous allons pouvoir nous appuyer dessus pour poursuivre nos recherches dans la suite du CTF.

---
## Dans le sillage du cachalot

### Énoncé
>Le nouveau site que vous venez de trouver est une véritable mine d'informations. Ainsi, le groupe que vous avez commencé à suivre ne se limite pas aux animaux locaux, mais s'intéresse aussi aux animaux plus exotiques.
>![[LAF_C2_A3_T_SC_P.png]]
>
>Il n'a pas tort, alors autant commencer par le commencement.
>
>>Quel est le port de départ et d'arrivée du bateau ayant ramené des animaux en ce début d'année ?  
>
>_Format : `Paris-Dakar`

### RETEX
Pour rappel, le nouveau site trouvé en question c'est le .onion.
![[LAF_C2_A3_T_SC_1.png]]
Et dans l'onglet "Actualité", on peut voir une notification sur un nouvel approvisionnement par cargo portée par Maximus.
Et on a accès à une image du cargo en question.
![[LAF_C2_A3_T_SC_2.png]]
Et sur ce cargo, on peut lire : "GERD" et "safety first".
En utilisant google lens sur l'image, on peut retrouver plus d'informations sur ce cargo, notamment sur identifiant IMO : 9052707
Et le nom de ce cargo : [GERD](https://www.shipspotting.com/photos/3926582?).

Pour trouver l'historique de navigation de ce bateau gratuitement, je n'ai trouvé qu'un seul site fiable : [globalfishingwatch.org](https://globalfishingwatch.org/map/fishing-activity/)

Par contre, il nous manque encore une information, on cherche les ports lié au trajet de quelle date ? 

Pour trouver ça, on peut pivoter sur Maximus, on avait trouvé un peu plus tôt [son calendrier Google](https://calendar.google.com/calendar/u/0/embed?src=tuskontheroad@tacosint.fr), regardons le de plus près.
![[LAF_C2_A3_O_TT_CGG.png]]

Sur ce planning, il est noté que le départ du cargo était le 25/02/2026 et que l'arrivé était le 27 février. De plus, Morelos le confirme dans Keybase.
![[LAF_C2_A3_T_SC_3.png]]

En rentrant l'imo du cargo et les dates recherché, on peut récupérer le trajet.
![[LAF_C2_A3_T_SC_4.png]]
Le Gerd était donc à quai à Nador, au Maroc depuis 25 févr. 2026 à 05:24 UTC pendant 7h 52'
![[LAF_C2_A3_T_SC_5.png]]
Et il a finit à quai à esp-valencia, en Espagne le 27 févr. 2026 à 08:44 UTC.

Le flag était donc : **==Nador-Valence==**

---
## La caravane de dromadaires

### Énoncé
>Vous vous lancez donc dans la tâche fastidieuse de retracer le parcours de ces pauvres animaux. Vous avez déjà un morceau du trajet, mais pour le retracer complètement, il vous faut déjà déterminer le lieu où ces animaux ont été pris en charge par le groupe que vous suivez.
>
>> Où le groupe a-t-il séjourné lorsqu'il a pris en charge les animaux de ce chargement pour la première fois ? 
>
>_Format : `XX.XXXXXXX, XX.XXXXXXX`

### RETEX
Toujours sur le [calendrier Google de Maximus](https://calendar.google.com/calendar/u/0/embed?src=tuskontheroad@tacosint.fr), on peut voir qu'il avais une réservation dans un hotel le 19 et 20 février, soit quelques temps avant, ça doit être le lieux dont parle l'énoncé.

Pour continuer nos recherches on aurait pu utiliser les avis google maps provenant du compte de Maximus, mais il n'en a qu'un seul, localisé a Orléans.
Il va donc falloir chercher autre part.
![[LAF_C2_A3_O_TT_WMN.png]]
Dans la partie [[Chapitre 2 - Acte 3 - Organisation]], on avais fait une recherche whatsmyname pour trouver ce qui était lié au nom d'utilisateur de Maximus `tuskontheroad`.
Et dans les résultats, on avait eu un [avis tripadvisor](https://www.tripadvisor.com/ShowUserReviews-g303168-d8024019-r269336747-Hotel_Tahat-Tamanrasset_Tamanrasset_Province.html) sur l'hôtel "Hotel Tahat" !
![[LAF_C2_A3_T_CD_1.png]]
On reconnait bien maximus sur sa photo de profil et il utilise même le pseudo Maximus.
![[LAF_C2_A3_T_CD_2.png]]
On peut récupérer les coordonnées de l'hôtel en question via google maps : **==22.782784, 5.535160==**

---
## La Migration de la Cigogne

### Énoncé
>Nous savons donc où le cargo est arrivé. Mais pour procéder à la livraison des clients finaux, les animaux ont dû passer par la frontière avec la France. Un groupe de cette envergure doit sûrement réutiliser les mêmes routes, il serait donc utile de connaître ce point de passage afin d'empêcher la prochaine livraison.
>
>> Où la frontière franco-espagnole a-t-elle été franchie lors de la livraison ? 

### RETEX

---
## La nuée de chauves-souris

### Énoncé
>Au cours de leur trajet pour rapatrier les animaux, ceux-ci vont devoir effectuer plusieurs pauses. Parmi ces pauses, l'une d'elles semble avoir un double usage, car les membres en profitent pour rencontrer un certain "groupe du Sud-Ouest".
>
>>Où cette rencontre a-t-elle eu lieu ? 

### RETEX


---
## La tanière du lion

### Énoncé
>Bon, vous décidez de vous recentrer sur l'essentiel. Ce groupe va procéder à une grosse opération, et ce qui compte c'est de savoir le point de chute de tout ça pour avertir la police et leur tomber dessus quand ils seront tous au même endroit.
>
>>Quel est le lieu où la prochaine soirée du groupe est prévue ?

### RETEX


---
## Synthèse de nos éléments
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.

