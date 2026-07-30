---
tags:
  - Osint
  - Medileak3
  - Chall
---

>Une petite excursion ça vous dit ?
![[content/Notes/Medileak 3/Voyage Voyage/M3_VV.png]]

***Les autres parties du CTF :***
 · | · [[Here we go again]]
 · | · Voyage Voyage
 · | · [[Money For Nothing]]
 · | · [[Ecole du micro d argent]]
 · | · [[Antisocial]]
 · | · [[Hygiaphone]]
 · | · [[Ya foye]]
 · | · [[Family Affair]]

---
## Go West

### Énoncé [1/3]
>Rester derrière son écran, c'est bien. Aller sur place, c'est mieux. Après une rapide concertation d'équipe (et un débat houleux pour savoir qui allait garder le chat), vous prenez la décision de vous déplacer.
>
>Direction **==XXxxx==**.

### RETEX [1/3]
Le challenge "Love me tender" nous a déjà appris que Gizem, qui accompagne Raoul était lié à l'**==île de Skye==**.
Sa chanson intitulée "Skye" fait même mention de certaines aventures qu'elle y a vécu avec Raoul.

### Énoncé [2/3]
>Le billet est réservé dans la foulée. Évidemment, le parcours le moins cher passe par Dublin, avec trois heures d'escale et un sandwich triangle au saumon qui restera dans les mémoires pour de mauvaises raisons. L'avion pour Inverness décolle avec vingt minutes de retard, le temps qu'un passager retrouve son bagage à main dans le mauvais compartiment.
>Depuis Inverness, la route vers le nord-ouest longe des lacs noirs et des collines sans arbres. La pluie commence quelque part après Invergarry. Elle ne s'arrêtera plus.
>Vous savez où chercher. Un concert est prévu à **==XXxxx==** — de quoi resserrer la zone et localiser leur lieu de villégiature.

### RETEX [2/3]
Rappelons-nous que Gizem possède un [compte instagram](https://www.instagram.com/gizemreid/) qui lui sert pour son auto-promotion.
Dessus, elle a posté quelques images.
![[content/Notes/Medileak 3/Voyage Voyage/M3_VV_GW_I1.png|500]]
Cette première, fait mention d'un concert raté "à cause des activités de Raoul", de plus elle dit que c'était situé à l'endroit de sa petite maison de campagne inspirante. Donc potentiellement celle de la chanson.

En faisant une recherche inversée par image, on peut trouver [une annonce](https://big-cottages.com/properties/united-kingdom/scotland/highland/portree/quiraing-cottage) pour la location d'une maison de campagne avec le même point de vue.
![[content/Notes/Medileak 3/Voyage Voyage/M3_VV_GW_C1.png|500]]

On peut donc pivoter sur cette annonce pour retrouver [la localisation de cette maison](https://www.google.com/maps/place/57%C2%B038'38.4%22N+6%C2%B014'33.0%22W/@57.6441964,-6.2420911,3a,75y,239.84h,74.6t/data=!3m7!1e1!3m5!1sBnvON7OupeaEKFHlDCW81A!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D15.402031574290007%26panoid%3DBnvON7OupeaEKFHlDCW81A%26yaw%3D239.84162938381706!7i16384!8i8192!4m4!3m3!8m2!3d57.644!4d-6.2425?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D) sur Google Maps.
![[content/Notes/Medileak 3/Voyage Voyage/M3_VV_GW_M1.png|500]]
On sait donc qu'ils ont dormi ici pendant un temps.

Sur son compte compte Instagram, Gizem a aussi publié d'autres photos.
![[content/Notes/Medileak 3/Voyage Voyage/M3_VV_GW_I2.png|500]]
Ce post est antérieur à celui analysé au-dessus et elle y explique que son prochain concert (donc celui qui a été annulé à cause des activités de Raoul) se trouvera ici. Elle précise qu'il aura lieu sur la terrasse si le temps le permet et que sa maison de campagne se trouve vraiment proche.
Ça veut donc dire que la terrasse n'est pas couverte.
En analysant la troisième image, on peut y voir une terrasse sur une sorte de muraille. Cette muraille donne sur la mer, et on peut voir une île ou une presqu'île en face, de plus on peut voir des barrières délimitant le terrain en dessous.
![[content/Notes/Medileak 3/Voyage Voyage/M3_VV_GW_S.png|500]]
En se baladant un peu autour de la maison de campagne en vue satellite, on peut trouver un endroit qui semble prometteur. Un hôtel qui possède une sorte de muraille avec une terrasse qui porte face à la mer avec une ile en face.
![[content/Notes/Medileak 3/Voyage Voyage/M3_VV_GW_M2.png|500]]
En cherchant dans les photos/vidéos disponibles du lieu, on peut trouver [une vidéo](https://www.google.com/maps/place/The+Flodigarry+Hotel/@57.6648821,-6.2537233,3a,75y,90t/data=!3m7!1e5!3m5!1sCIHM0ogKEICAgIDxjPmJYA!2e10!3e10!7i1920!8i1080!4m13!3m12!1s0x488dcf9c955a5ad3:0x8fb0893c09ff6915!5m3!1s2026-05-25!4m1!1i2!8m2!3d57.6648821!4d-6.2537233!10e5!14m1!1BCgIgAQ!16s%2Fg%2F1th7xyld?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D) qui nous donne à peu près le même point de vue la photo. On sait donc que le concert était prévu au **==The Flodigarry Hotel==**.
### Énoncé [3/3]
>De là, plus qu'à remonter la route. Leur point de chute n'est pas loin de la **==XXxxx==**.
### RETEX [3/3]
La route à remonter est donc la **==A855==** comme vu précédemment puisque l'hôtel/terrasse du concert et la maison de campagne sont accès dessus.

---
##  Mull of Kintyre

### Énoncé [1/2]
>La maison est vide quand vous y arrivez. Évidemment. Mais grâce à une aide extérieure, vous trouvez un récépissé pour un colis destiné à **==XXxxx==**. On le note, on le photographie, on le glisse dans le sac.
>
>La pluie n'a pas faibli. Comme Gizem et Raoul l'ont fait avant vous, vous attrapez le bus pour quitter l'ile à destination de **==XXxxx==**, qui part dans vingt minutes.

### RETEX [1/2]
Pour ce CTF, Oscar Zulu (OZ) nous ont mis à disposition un outil d'exploration des lieux. On peut donc visiter virtuellement la maison de campagne dans laquelle Gizem et Raoul ont dormi en renseignant ses coordonnées dessus.
![[content/Notes/Medileak 3/Voyage Voyage/M3_VV_MoK_E1.png|500]]
En fouillant les poubelles, on peut même retrouver quelque chose d'intéressant.
![[content/Notes/Medileak 3/Voyage Voyage/M3_VV_MoK_E2.png|500]]
Un certificat pour la livraison d'un colis destiné a **==Medideal 24==**.
Enfin, en faisant le tour de la maison, nous pouvons trouver un habitant qui entretient le terrain.
![[content/Notes/Medileak 3/Voyage Voyage/M3_VV_MoK_E3.png|500]]
En se faisant passer pour un policier et en lui expliquant que Raoul était lié à des activités dangereuses, on peut lui faire croire que Gizem est en danger et ainsi récupérer quelques informations de sa part.
![[content/Notes/Medileak 3/Voyage Voyage/M3_VV_MoK_IN1.png|500]]
Il nous prévient qu'ils sont partis sans prévenir ce matin, qu'ils n'ont rien nettoyé tellement ils étaient pressés, et qu'ils ont pris le bus vers **==Inverness==**.
![[content/Notes/Medileak 3/Voyage Voyage/M3_V_MoK_IN2.png|500]]
On ne parvient pas vraiment à avoir plus de détails, mais il nous précise qu'il a mis à la poubelle le reste de leurs affaires et qu'on pourrait peut-être y trouver quelque chose d'intéressant.
### Énoncé [2/2]
>Vous montez dans le bus.
>
>Il est déjà aux trois quarts plein. Une équipe de rugby amateur — maillots rouges, sacs énormes, décibels assortis — rentre d'un déplacement quelque part dans les Highlands. Résultat inconnu, ambiance clairement post-victoire. Vous vous glissez dans la dernière rangée libre, coincés entre la vitre embuée et un pilier de quinze kilos de plus que vous, qui s'endort sur votre épaule au bout de quelques kilomètres.
>
>Pendant le trajet, l'un de vous croise les manifestes de vol. D'après les informations collectées, ils ont pris le vol **==XXxxx==** depuis **==XXxxx==** vers **==XXxxx==**.

### RETEX [2/2]
On peut donc croiser les informations que l'on a déjà à disposition : 
soit : `M1REIDID/RAOUL E1P2JXZ MANLIGFR FR38 125Y14C 04210063026246200 + Porte E4 et siege 11A`

Ce sont des informations typiquement liées à un vol d'avion.
Numéro du vol :  
    **==FR 38==** 
Date, classe et siège :
	125 Y 14C 
Numéro de séquence :
	0421
Données de sécurité :
	0063026246200
On peut donc retrouver sur [FlightRadar](https://www.flightradar24.com/data/flights/fr38) le trajet habituel du vol FR 38. 
![[content/Notes/Medileak 3/Voyage Voyage/M3_VV_MoK_FR.png|500]]
C'est donc un vol habituel et journalier depuis **==Manchester==** vers **==Limoges==**.
Ce qui colle avec la couleur des maillots de Manchester.
![[content/Notes/Medileak 3/Voyage Voyage/M3_VV_MoK_T.png|500]]

---
***Les autres parties du CTF :***
 · | · [[Here we go again]]
 · | · Voyage Voyage
 · | · [[Money For Nothing]]
 · | · [[Ecole du micro d argent]]
 · | · [[Antisocial]]
 · | · [[Hygiaphone]]
 · | · [[Ya foye]]
 · | · [[Family Affair]]