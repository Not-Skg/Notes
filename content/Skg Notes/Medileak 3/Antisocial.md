---
tags:
  - Osint
  - Medileak3
  - Chall
---

>On peut ne pas être d'accord, mais au moins on peut débattre non ?
![[M3_A.png]]

***Les autres parties du CTF :***
 · | · [[Here we go again]]
 · | · [[Voyage Voyage]]
 · | · [[Money For Nothing]]
 · | · [[Ecole du micro d argent]]
 · | · [[Antisocial]]
 · | · [[Hygiaphone]]
 · | · [[Ya foye]]
 · | · [[Family Affair]]
 
 ---
## Message in a Bottle

### Énoncé [1/3]
>Vous quittez la Slovénie pour les réseaux sociaux. Et là, le projet ne laisse personne indifférent : deux camps s'affrontent à coups de mots-dièses.
>
>D'un côté, le hashtag **==XXxxx==**, brandi par les _partisans_. De l'autre, **==XXxxx==**, étendard des _opposants_. Les deux camps croisent le fer sur **==XXxxx==**.

### RETEX [1/3]
Le projet dont parle l'énoncé doit être le projet de stage avec des étudiants pour un Laboratoire sur de vraies données de santé.
![[M3_A_M1.png|500]]
Le post sur **==Mastodon==** de Thimothé nous met sur la piste avec son **==#healthdatalake==**.
En cherchant les posts liés, on trouve des posts du camp des **==#nohealthdatalake==**.

### Énoncé [2/3]
>Vous lisez les fils, vous remontez les threads. Parmi les voix contre, l'une se distingue par son volume sonore, et son expérience de vie. Le compte **==XXxxx==** ne mâche pas ses mots, et le fait savoir avec une certaine régularité.

### RETEX[2/3]

Techniquement le compte qui poste le plus avec le \#nohealthdatalake c'est **lucfera**.
![[M3_A_M2.png|500]]
Mais si on regarde plus en détail, il y a un autre compte qui en parle beaucoup et surtout qui a plus d'expérience de vie visible, c'est **==hpgirolle==** un retraité de l'Éducation nationale et ancien conseiller communautaire en Haute-Vienne.
![[M3_A_M3.png|500]]


### Énoncé [3/3]
>Derrière le pseudo, un nom : **==XXxxx XXxxx==**. Visiblement très remonté sur le sujet, au point d'animer un site dédié, accessible à l'adresse **==XXxxx==**.

### RETEX [3/3]

En visitant son site personnel **==hxxps://henripierregirolles.wordpress.com==**, accessible via la description de son compte Mastodon, on peut connaitre son nom entier : **==Henri Pierre Girolles==**.

---
##  Every Breath You Take

### Énoncé [1/4]
>Henri-Pierre n'a pas que des fans. Il s'est fait suivre par un véhicule **==XXxxx==**, immatriculé **==XXxxx==**, de couleur **==XXxxx==**. Discret comme un éléphant dans un couloir.
>
>Il a réussi à prendre une photo. Voici l'endroit :

### RETEX [1/4]
HP en avait parlé dans un post Mastodon : 
![[M3_A_EBYT_M1.png|500]]
En analysant la photo, on peut voir que c'est un **==Range Rover==** de couloir **==noir==** immatriculé **==LE-003-AK==**
![[M3_A_EBYT_M2.png|500]]
De plus, on peut noter qu'il y a une station essence ESSO à gauche et que le Range Rover se trouvait en face du numéro 11 de la rue.

En cherchant les stations d'essence ESSO à l'image, on peut facilement trouver [la localisation](https://www.google.fr/maps/place/ESSO+EXPRESS+COUZEIX/@45.8657844,1.2381798,3a,75y,209.43h,83.54t/data=!3m7!1e1!3m5!1sFhpSwfUtb38OPAYgEulzVw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D6.460141316982771%26panoid%3DFhpSwfUtb38OPAYgEulzVw%26yaw%3D209.42714526645426!7i16384!8i8192!4m10!1m2!2m1!1sEsso+limoges!3m6!1s0x47fecada4014d6fd:0xaaad24d742536b19!8m2!3d45.865269!4d1.238365!15sCgxFc3NvIGxpbW9nZXMiA4gBAZIBC2dhc19zdGF0aW9u4AEA!16s%2Fg%2F1jky_53fs?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D).
![[M3_A_EBYT_M.png]]
Les coordonnées GPS sont donc les suivantes : **==45.865724, 1.238156==**

### Énoncé [2/4]
>Et comme si cela ne suffisait pas, il a aussi reçu un appel anonyme. Un appel de menace, pour être précis.
>
>Au bout du fil, du silence, puis quelques mots. La géolocalisation du correspondant fait sortir un lieu peu banal : l'auteur de l'appel se trouvait à proximité des **==XXxxx==**.

### RETEX[2/4]
Encore une fois, HP n'a pas hésité à parler de ce qui lui arrive de bizarre en ce moment [sur son site](https://henripierregirolles.wordpress.com/2026/04/08/un-message-sur-mon-repondeur/).

![[M3_A_EBYT_WP.png|500]]
Il y décrit le contexte et ce qu'il a compris de ce message.

Il a même précisé qu'il l'avait enregistré et qu'il nous le met à disposition.
Le problème, c'est que l'upload a eu un problème, il est donc noté dans son article : 
```   
File cannot be uploaded  
SUQzAwAAAABLEVRZRVIAAAAGAAAAM...AAAA==   
```
On ne peut donc pas l'écouter directement, mais si l'on met tout le contenu `SU...AAA==` dans un fichier `file.txt`puis que l'on utilise la commande suivante, on peut récupérer l'audio.
```powershell
cat file.txt | base64 -d > audio.mp3
```
![[audio.mp3]
On y entend donc la menace en premier plan, mais en arrière-plan, on entend aussi une sorte d'alarme puis une sorte d'explosion.
Il n'y a pas beaucoup de cas en France où des explosions sont autorisées, le but ça va être de trouver où.
On entend aussi des oiseaux en fond, peut-être que la personne au bout du fil est proche d'une forêt.
L'alarme / bip grave régulier me fait penser à une machine qui travaille, qui fait une marche arrière, voire qui prévient de quelque chose.

La seule chose qui me vient a l'idée, c'est une carrière, les carrières en France ont le droit d'utiliser des explosifs pour creuser certains endroits, le bip grave c'est probablement un excavateur ou une autre grosse machine, et les oiseaux signifierait que cette carrière se trouverait proche d'une forêt.

Étant donné qu'une personne surveille H-P.G et le menace, j'imagine qu'il se trouve proche de lui, soit dans Limoges ou autour.

En plus, on a plusieurs fois trouvé des traces de pneus de voitures à Limoges avec des résidus de terre rouge incrustés.

Les carrières qui correspondent à ces éléments sont les **==carrières de Chambon==**.
![[M3_A_EBYT_C.png|500]]

En cherchant un peu plus loin qui aurait pu lui en vouloir, on a lu tous les articles de H-P.G.
Et [un article](https://henripierregirolles.wordpress.com/2026/01/16/le-projet-de-campus-veda-abandonne-une-bonne-nouvelle-ou-presque/) en particulier a capté notre attention : 
![[M3_A_EBYT_HPG1.png|500]]
Il y explique que la Veda avait pour projet de s'étendre à Limoges, mais qu'il y a 
	_plusieurs zones d’incertitude n’ont pu être levées de manière satisfaisante concernant la structure actionnariale de l’établissement_
Dans le document qui donne l'avis défavorable pour ce projet, il y est mention de quelques sociétés  : STAVROS & LYNCH PARTNERS LTD et LIMOUSIN HOLDING SA
![[M3_A_EBYT_HPG2.png|500]]

Lorsque l'on cherche plus d'information sur LIMOUSIN HOLDING SA, on est redirigé vers la société Crédit Briance & Vienne dont LIMOUSIN HOLDING SA est le Président du conseil d'administration et directeur général.
![[M3_A_EBYT_HPG3.png|500]]
![[M3_A_EBYT_CBV.png|500]]

Et lorsque l'on cherche des informations sur STAVROS & LYNCH PARTNERS LTD, on trouve dans ses partenaires Despina Kyparissidou.
![[M3_A_EBYT_SLP.png|500]]

Et cette dame est la dirigeante de Nicosian Holding.
![[M3_A_EBYT_NH.png|500]]

### Énoncé [3/4]
>Vous remontez la propriété du terrain. C'est une parcelle qui appartient à la **==XXxxx XXxxx==** ! **==XXxxx XXxxx==** serait donc derrière les menaces visant Henri-Pierre.

### RETEX
En utilisant Rhinocorp, on arrive à retrouver à qui appartient la parcelle, et c'est à la **==SCI Nicosian Holding==**
![[M3_A_EBYT_RC.png|500]]
D'ailleurs, on peut retrouver le Range Rover garé à côté d'une maison proche de cette carrière.
![[M3_A_EBYT_RR.png|500]]

La seule dirigeante et propriétaire de ces terres, c'est **==Despina KYPARISSIDOU==** on peut donc penser que c'est son véhicule et que c'est elle derrière cet appel masqué.


### Énoncé [4/4]
>Le 4x4 qui a failli renverser HPG était garé sur le côté de la maison !
>
>Et tant qu'on y est, on remarque autre chose : ce même véhicule etait également garé devant la nouvelle **==XXxxx==** de **==XXxxx==**, comme le confirme la photo ci-dessous :
>
>2 fois c'est une coincidence… Trois fois, c'est un pattern !
>
>Ce projet d'école retoqué semble donc gêner du beau monde.

### RETEX
Étant donné que H-P.G se prend des coups de pressions parce qu'il a fait échouer le plan de la Veda, un véhicule potentiellement appartenant à la dirigeante d'un partenaire de l'investisseur du projet annulé à suivi H-P.G. Donc ça peut être une bonne idée de continuer à jeter un œil sur les sociétés liés à STAVROS & LYNCH PARTNERS LTD.
Pour rappel **==Crédit Briance & Vienne==** en est une filiale. Et ils possèdent un compte linkedin.
![[M3_A_EBYT_L.png|500]]
Et on peut retrouver le Range Rover sur un de leur poste en face d'une d'une nouvelle **==agence==**.

---
***Les autres parties du CTF :***
 · | · [[Here we go again]]
 · | · [[Voyage Voyage]]
 · | · [[Money For Nothing]]
 · | · [[Ecole du micro d argent]]
 · | · [[Antisocial]]
 · | · [[Hygiaphone]]
 · | · [[Ya foye]]
 · | · [[Family Affair]]