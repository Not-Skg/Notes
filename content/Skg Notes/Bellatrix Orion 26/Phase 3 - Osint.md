---
tags:
  - Osint
  - CTF
---
![[Bellatrix_Illustration.png]]
>[!info] Notes
>Voici les retex de tous les challenges de cette troisième journée de l'opération Bellatrix !
>C'était varié et immersif, c'est toujours sympa de jouer avec du Morse (Temps incertains), y'avait un peu trop de réalisme à mon goût (cc "**Plein trop cher**").  
>Le point frustrant c'était **"On se rapproche"** que j'ai trouvé trop guessy, j'étais parti sur l'article de Veylanne à tort. 
>Globalement depuis le début de ce CTF, je me compliquais trop la vie, le mélange fictif/réel me piégeait souvent sur les adresses par exemple.
>Après mes journées de taff je n'étais pas toujours concentré le soir pour ce CTF mais je suis content de l'avoir mené au bout, même si je suis toujours frustré d'avoir utilisé des points pour des indices lors des précédentes phases, indices qui m'ont paru vraiment inutiles pour la plupart.
>Par contre, j'ai beau me plaindre, ce CTF était quand même vraiment sympa, avoir recréé autant de sites et de vies n'a pas dû être simple pour les organisateurs mais ça laisse quand même une très bonne expérience.  
>J'espère pouvoir trouver plus de CTF de ce style, avec autant de réalisme. 👏
>![[Phase 3 - Challs.png]]

---
## En chemin pour une partie de pêche (optionnel)

### Mission 
>Vous êtes chargé de retracer l’itinéraire de Marc Veylanne en analysant ses haltes géolocalisées lors de ses déplacements vers son lieu de pêche. Votre objectif est de localiser sa zone d’origine en vous basant sur les traces qu’il a laissées. Le flag sera la distance entre ses deux avis les plus éloignés, ce qui permettra de circonscrire son territoire de départ.
>
>Pour effectuer cette recherche un service ami vous communique le profil Google de Marc Veylanne: **[https://www.google.com/maps/contrib/107774103484141078088/](https://www.google.com/maps/contrib/107774103484141078088/)**
>
>**Actions requises:** 
>>- Collecter les données géolocalisées (avis, commentaires, publications) laissées par Marc Veylanne. 
>>- Cartographier les haltes sur une carte pour visualiser son itinéraire. 
>>- Déterminer la zone d’origine en analysant la répartition des points et calculer la distance maximale entre ces points. 
>>- ==Calculer la distances entre les points pour identifier les deux avis les plus éloignés.==

### RETEX
Le but de cette troisième journée est de trouver la localisation de la pilote "Lynx", pour ce faire commençons nos recherche en retraçant la route du primo-diffuseur de la campagne de désinformation.
![[P3_avis.png|500]]
Après avoir trouvé son compte Google, on se rend compte qu'il a laissé 4 avis a un interval très court. et ça dans la période de temps où Lynx a disparu.
Le premier avis se trouve à "Arcachon", et le dernier dans le "domaine Départementale Gérard Lagors". En traçant une ligne entre ces deux points, on obtient un trajet a vol d'oiseau de ==43.54 km==.

---
## Remonter la piste (optionnel)
### Mission
>Vous devez déterminer l’azimut (angle de direction par rapport au nord géographique) pour remonter la piste spécifique, liée au trajet ou au déplacement mentionné précédemment (ex. : itinéraire de Marc Veylanne, sentier de pêche, etc.). Cet azimut servira à retracer avec précision la trajectoire empruntée et à localiser des points clés.
>
>Pour effectuer cette recherche un service ami vous communique le profil Google de Marc Veylanne: **[https://www.google.com/maps/contrib/107774103484141078088/](https://www.google.com/maps/contrib/107774103484141078088/)**
>
>**Actions requises :**
>>- Identifier les points de départ et d’arrivée de la piste : Coordonnées GPS exactes (latitude/longitude) ou adresses précises. Si non disponibles, utiliser des indices géographiques (ex. : "à 5 km au nord-est"). 
>>- ==Calculer l’azimut entre ces points== : Utiliser la formule de l’azimut (basée sur les coordonnées GPS) pour obtenir l’azimut en degrés à deux décimales.

### RETEX
Pour "remonter la piste", j'ai calculé l'**azimut** entre les 2 avis extrêmes de Marc Veylanne : 
1. **Premier point** : Arcachon 
	--> (44.66235228289864, -1.1510635131705484)
2. **Dernier point** : Domaine Départementale Gérard Lagors 
	--> (44.4980716400456, -0.6520178313626805)
3. **Azimut obtenu** : **==114.63°==** (sud-est) 

Pour le calcul j'ai utilisé le site dcode :
![[P3_decode_azimut.png|500]]

>[!Tips] **Interprétation** de l'azimut
>On trace une ligne droite entre ces 2 points, puis on **prolonge cette droite** pour anticiper sa direction de déplacement. 
>En gros, l'azimut donne l'**angle précis** par rapport au Nord (ici sud-est), permettant de cibler les zones/routes à explorer pour "remonter" une trajectoire.

Maintenant, on a une idée de sa trajectoire.

---
## On se rapproche (optionnel)
### Mission
>Sur le site Rando-Gogo, un célèbre site de randonnées Aquiloniennes accessible sur [https://rando-gogo.site/](https://rando-gogo.site/), votre objectif est de ==trouver le point d'intérêt mentionné== et par recherche OSINT le code du point d’intérêt mentionné (probablement un lieu, un sentier, ou une balise spécifique). Ce "PlusCode" pourrait être un identifiant unique correspondant a ce lieu unique, un numéro de référence, ou un tag utilisé pour localiser ou gérer ce point d’intérêt dans la base de données du site.
>
>>**Actions requises :** Localiser le point d’intérêt sur Rando-Gogo Rechercher le nom du point d’intérêt dans la barre de recherche du site. Explorer les cartes interactives ou les listes de sentiers/balises pour le repérer.
>
>**Attention: ce flag contient en plus des caratères autorisés un caractère "+"**

### RETEX
On sait que Marc Veylanne aime et pratique énormément la randonnée. On le sait de part son blog personnel mais aussi par son compte Amstramgram.
Un site de randonnée connue (Rando-Gogo) a récemment été utilisé par Veylanne, on va le fouiller un peu pour voir s'il n'y a pas un indice intéressant dedans sur sa destination.

Ce site répertorie des randonnées sympa a faire, et Veylanne a récemment proposé celle-ci.
![[P3_rgg_vlan.png|500]]
![[P3_rgg_vlan_desc.png|500]]
Cette randonnée aurait pu nous être utile mais la trace GPS ne peux pas être récupéré, et les points d'intérêts sont assez nombreux et pas vraiment dans une localisation intéressante.

On va donc se pencher sur le dernier chemin de randonnée partagé sur ce site : 
![[P3_rgg_boucle_pecheur.png|500]]
![[P3_rgg_boucle_pecheur_desc.png|500]]
Ce qui est intéressant, c'est que ce trajet se situe en Aquilonnie.
![[P3_maps_pi.png|500]]
Et le plus intéressant c'est que le point d'intérêt "L’aire de Caussaieu" se trouve pas très loin de la localisation du dernier avis google de Veylanne.
La localisation de ce nouveau point est donc : ==GJ5F+R5_Leogeats==

---
## Les archives au secours (optionnel)

### Mission
>Vous avez obtenu un titre de propriété intéressant via les archives de la préfecture. Votre objectif est maintenant de ==retrouver la parcelle cadastrale correspondante== pour localiser précisément le terrain, identifier son propriétaire actuel, et analyser son historique (ventes, usages, liens éventuels avec des activités suspectes).
>
>**Actions requises :** 
>>- Extraire les informations clés du titre de propriété Numéro de lot/parcelle (ex. : Section AB, Parcelle 123). Adresse ou lieu-dit (ex. : "5 Rue des Pêcheurs, Langon"). Nom du propriétaire (ancien ou actuel). Date d’enregistrement du titre. 
>>- Consulter le cadastre en ligne Utiliser le site officiel du cadastre français : cadastre.gouv.fr. 
>>- Identifier la parcelle cadastrale précise par son code.
>
>![[P3_titre_propriete.pdf]]
>Vérifier les limites de la parcelle et son environnement (proximité avec d’autres terrains suspects).
### RETEX
On sait, d'après ce titre de propriété, que Marc Veylanne a vendue la parcelle ==00C198== a la milice Aquilonne.
Et cette parcelle ce trouve près de Leogats (donc proche du point d'intérêt du chall précédent).

---
## Le plein trop cher (optionnel)

### Mission
>Une interception sur une application de messagerie indique que Marc Veylanne signale "avoir effectué un plein de diesel à un prix très élevé le 18 mars 2026 à l'intermarché de Langon". Votre objectif est d’identifier la station-service exacte où il a fait ce plein et de confirmer le prix pratiqué ce jour-là.
>
>**Actions requises :**
>>Vérifier les prix du diesel le 18/03/2026 via les plateformes de suivi des prix (comme [https://www.prix-carburants.gouv.fr/](https://www.prix-carburants.gouv.fr/) ). Nom et adresse de la station. Prix du diesel le 18/03/2026.
### RETEX
Grace a cette interception de message, on arrive a apprend que Veylanne s'approvisionne en disiel a Langon, une petite recherche google nous permet rapidement de trouvé la station-service en question.
![[P3_map_langon.png|500]]
Et Langon se trouve un peu a l'est de l'aire de Caussarieu, ça nous aide donc a compléter sa trajectoire.
Grâce à ce site : [prix-carburant.eu](https://prix-carburant.eu/station/33210010#google_vignette ), on est capable de trouver le prix du diesel le 18 mars dans la station que Marc a visité.
![[P3_prix_diesel.png|500]]
Il était a 2.013€/L, il est encore plus cher maintenant...

---
## Temps incertains (optionnel)
### Mission
>Votre objectif est de décrypter un message caché dans un bulletin météo spécial, probablement diffusé à une date ou sur un canal spécifique (radio, site web, application). Ce message pourrait être dissimulé sous forme de codes, d’anagrammes, de séquences numériques, ou de mots-clés intégrés dans les prévisions.
>![[bms.wav]]
>**Actions requises :**
>Analyser le contenu pour repérer des anomalies :
>>- Mots ou phrases inhabituels (ex. : termes techniques détournés, répétitions).
>>- Séquences numériques (températures, pressions, heures) pouvant cacher un code.
>>- Acrostiches ou anagrammes dans les descriptions.
>>- Symboles ou icônes suspectes (ex. : pictogrammes modifiés).
>>- ==Identifier le message caché==

### RETEX
Pour déchiffrer le message caché derrière ce bulletin météo, je vais utiliser l'application "Audacity".
A la première écoute de ce message, j'entend des bips sonores irréguliers.
Ça ressemble clairement a du morse, pour retranscrire plus facilement ce message je vais afficher le spectrogramme de la piste audio, et je vais filtrer les fréquences pour ne voir que ce qu'il y a entre 760 et 830.
![[P3_waw_morse.png|500]]
Je distingue maintenant plutôt bien le code morse. Mais pour le visualiser encore mieux je vais zoomer un peu plus sur certains endroits : 
![[P3_wav_zoom.png|500]]
Maintenant, il ne reste plus qu'a retranscrire les long violets par des " ", les courts jaunes par des "." et les longs jaunes par des "-".
Ensuite on a plus qu'a copier coller ça sur un [site de traduction de code morse](https://morsecodetranslator.com/fr) : 
![[P3_morse_translate.png|500]]

On a donc le message caché suivant : ==LYNX_RÉCUPÉRÉE==
On est maintenant sûr que c'est bien eux qui ont récupéré la pilote, mais on a déjà une idée de la localisation "près de Leogats"

---
## Localisation de "Lynx" (intrigue principale)

### Mission
>Vous avez maintenant toutes les preuves de l'implication de la milice il faut désormais localiser la pilote pour déclencher l'opération "ouvrir la cage" afin de la libérer. Votre objectif final: localiser précisément la pilote LYNX retenu en otage. Vous disposez de deux photos de la maison de détention.
>![[P3_photo1.jpeg|500]]![[P3_photo2.jpeg|500]]
>**Actions requises:**
>>- Analyser la photo de la maison pour extraire des indices visuels
>>- Valider la localisation avec les indices fournis sur la plateforme
>>- Séparateur _ !

### RETEX
Maintenant qu'on a ces photos, on a tout ce qu'il nous faut pour retrouver la localisation de Lynx.
Les outils de recherchent inversé ne vont pas nous aider ici, parce que les photos sont trop "basiques", il n'y a pas vraiment d'élément notable.

Par contre, on peut utiliser toutes les informations que l'on a.
![[P3_loc_lynx.png|500]]
On sait qu'une parcelle a été vendu proche de Leogats, on va donc rester dans le coin.
On sait que sur la photo il y a des palissades sur la gauche.
![[P3_loc_lynx_pallissades.png|500]]
On va donc chercher des petites cabanes proches de ces palissades.
![[P3_loc_lynx_idea.png|500]]**
Je trouve une petite cabane avec ces caractéristique proche de l'aire.
![[P3_localisaion_Lynx.png|500]]
En se positionnant sur la route à côté, on retrouve le même cadrage que la photo originale, on est donc au bon endroit.

On a donc la localisation suivante : ==44.509103, -0.372658==.

---

[[Phase 1 - Analysis]] · | · [[Phase 2 - Technical]] · | · Les autres phases du CTF 