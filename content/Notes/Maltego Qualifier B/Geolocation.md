---
title: Geolocation
tags:
  - Osint
  - Chall
  - MaltegoQualifierB
order: 2
description: RETEX des challenges de la catégorie "Geolocation" du Maltego Community OSINT CTF, Qualifier B
---
![[MaltegoQualifierB.webp]]

>[!info] Notes
> Voici les retex des challs de la catégorie "Geolocation" du Qualifier B du Maltego Community OSINT CTF Championship 2026-27.

***Les différentes parties du CTF :***
 · | · Geolocation
 · | · [[Threat Intelligence]]
 · | · `[[Fraud]]`
 · | · `[[Physical Security]]`
 · | · `[[Chronolocation]]`
 · | · `[[Trust & Safety]]`
 · | · `[[Due Diligence]]`
 · | · `[[Maritime & Aviation]]`
 · | · `[[Dark Web]]`

---
## Gate Of Departure

### Énoncé
> Just before the suspect boarded their flight, an image was captured near the departure gate. Investigators believe the image was taken close to the gate from which the suspect's flight departed, but the exact gate number remains unknown.
> ![[MQB_GOD.webp|400]]
> Your task is to examine the image, identify the airport and relevant flight details using OSINT techniques, and determine the exact departure gate.
>
>> Flag Format: If the gate number is A12, submit flag{A12}.

### RETEX
L'énoncé parle de "flight details", mais la seule chose qu'on a, c'est un ticket de caisse posé sur une table. Avant de chercher un vol, commençons donc par lire ce ticket en détail.
![[MQB_GOD_1.png|500]]
1. "Autogrill Middle East LLC" et "AAUH1 Terminal A" : Autogrill appartient au groupe Avolta (d'où le logo ClubAvolta), et AUH est le code IATA de l'aéroport Zayed International d'Abu Dhabi. On est donc au **terminal A** de cet aéroport.
2. Le repas date du 27/09/2026 à 21h25.
3. Le menu "CMB Thali Veg" (CMB pour combo), avec dal tadka, paneer butter masala et gulab jamun : c'est de la cuisine indienne.
4. L'adresse de contact "AAUH.feelgood@avolta.net" confirme le préfixe AUH.
5. Les prix sont en dirhams des Émirats arabes unis.
6. L'étoile en bas à droite est le filigrane de Gemini : l'image a été retouchée par l'IA de Google. Le ticket de carte bancaire à gauche est d'ailleurs incohérent (il est daté du "21/29/2035"), inutile de perdre du temps dessus.

Le ticket ne donne ni numéro de vol ni destination. Par contre, il donne le restaurant, et l'énoncé précise que la photo a été prise près de la porte d'embarquement. Il suffit donc de trouver où se trouve le restaurant indien d'Avolta dans le terminal A.

En cherchant "Avolta Abu Dhabi Terminal A food beverage", on tombe sur [cet article](https://moodiedavittreport.com/avolta-celebrates-food-beverage-openings-at-abu-dhabi-international-airport-terminal-a) de The Moodie Davitt Report, qui liste les 13 enseignes ouvertes par Avolta au terminal A.
![[MQB_GOD_2.png|600]]
Une seule est indienne : "Taste of India", et sa description ("street food inspired by the busy streets of Delhi") colle avec le thali du ticket.

Il ne reste plus qu'à chercher "Taste of India Zayed International Airport" sur Google Maps.
![[MQB_GOD_3.png|600]]
La [fiche du restaurant](https://www.google.com/maps/place/Taste+of+india/@24.4514258,54.6421225,17z) donne directement son adresse : "Terminal A Gate D43". Le restaurant se trouve donc au niveau de la porte **==D43==**.

---
## The Hotel Observer

### Énoncé
> An image intercepted during an investigation is believed to have been captured from a hotel where a meeting is taking place. However, the exact location from which the photograph was taken remains unknown.
> ![[MQB_THO.jpg|400]]
> Your task is to analyze the image, identify distinctive landmarks and environmental features, and use open-source intelligence techniques to determine the name of the hotel from which the image was captured.
>
>> For example, if the hotel is named Grand Palace, the flag would be flag{Grand_Palace}.

### RETEX
La photo est prise depuis une fenêtre en hauteur, au-dessus d'une grande avenue. Avant de chercher l'hôtel, repérons tout ce qui pourrait nous situer.
![[MQB_THO_1.png|500]]
1. En haut du chantier à gauche, une bâche indique "PAVILION SQUARE" : c'est le nom du projet en construction, et ce sera notre point de départ.
2. Au bord gauche, on aperçoit un toit de style malais traditionnel.
3. En bas à droite, un îlot avec un panneau bleu, puis un passage piéton jaune.
4. Plus loin, un petit bâtiment blanc, une palissade bleue et une foreuse jaune.
5. À droite, la façade de l'immeuble d'où est prise la photo : du granit et du verre sombre.

En cherchant "Pavilion Square" sur Google Maps, on trouve le chantier ("Pavilion Square (Actual Site)") au 92 Jalan Raja Chulan, à Kuala Lumpur, juste à côté du carrefour avec Jalan Bukit Bintang.
![[MQB_THO_2.png|600]]
Juste derrière, on trouve l'hôtel Royale Chulan, dont les bâtiments ont des toits de style malais, comme celui du repère 2.

Ici, la vue satellite de Google est très oblique et les tours penchent, ce qui rend la comparaison difficile. Il vaut mieux descendre dans la rue avec Street View.

En se plaçant [au carrefour](https://www.google.com/maps/@3.1484161,101.7154919,3a,90y,110h,95t/data=!3m4!1e1!3m2!1stSEPTT5VfrI-8LSmoWCk4w!2e0) et en regardant vers l'est, on retrouve les éléments de la photo, vus du sol.
![[MQB_THO_3.png|600]]
On y voit un toit de style malais du Royale Chulan (2). Ce n'est pas le même bâtiment que sur la photo de l'énoncé : quand celle-ci a été prise, ce bâtiment-là était encore en construction. Mais il a exactement le même style, ce qui confirme qu'on est au bon endroit. On retrouve aussi l'îlot avec son panneau bleu et le passage piéton jaune (3), ainsi que la palissade bleue du chantier (4). La photo a donc été prise depuis un immeuble à l'angle de ce carrefour.

Il suffit alors de se retourner dans Street View pour voir l'immeuble à l'angle.
![[MQB_THO_4.png|600]]
L'auvent de l'entrée porte l'inscription "PAVILION HOTEL", et la façade en granit et verre sombre ressemble bien à celle du repère 5.

Sur Google Maps, l'établissement s'appelle "Pavilion Hotel Kuala Lumpur Managed By Banyan Tree", mais le flag n'attendait que le nom de l'hôtel : **==Pavilion Hotel Kuala Lumpur==**.

---
## The Brewery Trail - 1

### Énoncé
> A video recording has been recovered, but the exact location where it was filmed remains unknown. Investigators believe the footage was recorded somewhere near a conference center. The only additional clue is a conversation in which someone mentions the smell of a nearby brewery.
>
> Can you analyze the available footage, follow the brewery clue, and identify the complete name of the conference center near the recording location?
>
>![[MQB_BT1_V.mp4]]
>
>> Flag Format: flag{complete_name_of_the_conference_center}
>>
>> Note: Submit the flag in all lowercase letters. Use underscores instead of spaces.

### RETEX
Avant toute chose, analysons quelques arrêts sur image de la vidéo fournie dans l'énoncé.
![[MQB_BT1_AI1.png|500]]
Le premier arrêt sur image montre l'enseigne d'une boutique : **"SIMON LÉVELT"**. On ne peut pas capturer le nom en entier sur une seule image, mais on le lit sans problème en regardant la vidéo. Juste devant, des jardinières fleuries sont accrochées à une rambarde de pont.

![[MQB_BT1_AI2.png|600]]
Les vues larges de la vidéo montrent ensuite des rues pavées, des façades anciennes et une place pleine de terrasses : on est dans le centre historique d'une ville.

Simon Lévelt est une chaîne de torréfacteurs (café et thé). En la cherchant sur Google Maps, on obtient des dizaines de boutiques, surtout aux Pays-Bas.
![[MQB_BT1_1.png|600]]
En les passant en revue, une seule ressemble à celle de la vidéo, avec sa façade sombre aux lettres dorées au bord d'un pont : celle du 1 Guldenstraat, à Malines (Mechelen), en Belgique.

Street View le confirme : on y retrouve la même enseigne (1) et, juste à côté, le pont sur la Dijle avec sa rambarde (2).
![[MQB_BT1_2.png|700]]

Il ne reste plus qu'à suivre l'indice de la brasserie. Sur Google Maps, à moins de 100 m de l'endroit où la vidéo a été filmée (le point bleu, au bout du pont, en face de Tempo Team), on trouve le "**Lamot Congress and heritage center**", au 8/10 Van Beethovenstraat.
![[MQB_BT1_3.png|600]]
Le lien avec la brasserie est direct : Lamot est une [ancienne brasserie](https://www.wikiwand.com/nl/articles/Brouwerij_Lamot), fermée en 1994, puis transformée en centre de congrès et du patrimoine (Congres- en Erfgoedcentrum).

Le centre de congrès recherché est donc le **==Lamot Congress and Heritage Center==**.

---
## The Brewery Trail - 2

### Énoncé
> Now that you have identified the conference center and the city where the target was present, a new video recording has surfaced showing the target travelling on Sept 25th 2026.
>
> Your task is to carefully analyze the footage and determine the exact time at which the video was recorded.
>
> Once you have identified the time, determine the corresponding one-hour time window. The timezone should be CEST local to the country.
>
>![[MQB_BT2_V.mp4]]
>
>> For example, if the video was recorded at 8:25 AM, the correct flag would be flag{8_9_AM}.

### RETEX
La vidéo est filmée depuis la fenêtre d'un train, qui traverse une petite gare sans s'arrêter. Comme pour la première partie, analysons quelques arrêts sur image.
![[MQB_BT2_AI1.png|500]]
Le premier montre le panneau bleu de la gare. Il est très flou à cause de la vitesse du train, mais en faisant défiler la vidéo image par image, on devine le nom **"Weerde"** (en jaune dans l'encart, par-dessus le flou).

En cherchant "Station Weerde" sur Google Maps, on trouve une petite gare de la commune de Zemst, sur la ligne de chemin de fer qui part de Malines vers le sud. C'est cohérent avec la première partie : la cible a quitté Malines en train.
![[MQB_BT2_1.png|600]]

![[MQB_BT2_AI2.png|500]]
Juste après le panneau, on passe devant l'horloge du quai. Elle ne fait qu'une trentaine de pixels et elle est floue. Pour gagner en lisibilité, on peut empiler les 5 images où elle apparaît : on les agrandit, on les recale sur le centre du cadran, puis on en fait la moyenne. Le bruit diminue, et les aiguilles ressortent un peu mieux.
![[MQB_BT2_2.png|700]]
De gauche à droite : une image brute, la moyenne des 5 images, puis la lecture. On distingue une aiguille vers le 3 (en rouge) et une plus courte vers le 12 (en orange) : il est environ **12 h 15**.

Le 25 septembre, la Belgique est à l'heure d'été : l'heure de l'horloge est déjà en CEST, pas besoin de conversion. La vidéo a donc été filmée entre 12 h et 13 h, soit **==12_1_PM==**.

>[!warning] Piège
> On a d'abord essayé de dater la vidéo avec les ombres du quai, ce qui donnait un créneau entre 11 h et 12 h : flag refusé. L'horloge, même floue, était l'indice le plus fiable.

---
## Hidden Stay: The Vagator Mystery - 1

### Énoncé
> A picture holds the clue to a hidden getaway. Your task is to identify the complete name of the Airbnb resort shown in the image. The only information available is that the property is located somewhere in the vicinity of Vagator Beach
> ![[MQB_VAG1.webp|400]]
>
>> Flag format: flag{complete_name_of_the_airbnb_resort}
>>
>> Note: Submit the name of the property as, using lowercase letters and underscores instead of spaces.

### RETEX
La photo montre la piscine d'une résidence, de nuit : un grand bassin en forme de haricot avec un petit bassin rond à l'intérieur, des tapis verts antidérapants tout autour, et un immeuble crème à bandeaux bordeaux. On sait seulement qu'on est près de la plage de Vagator, dans le nord de Goa, en Inde.

Avec si peu d'éléments, le plus simple est une recherche par image inversée. Google Lens renvoie surtout des piscines d'autres hôtels de Goa, mais Yandex fait bien mieux sur ce type d'image : dans l'onglet "Sites", plusieurs résultats montrent la même piscine en plein jour.
![[MQB_VAG1_1.png|600]]
On y trouve notamment "Urja Resort Casablanca", un appartement avec services à Vagator, et "Urja Resorts" au 372/1A du "Casablanca complex" sur Yandex Maps.

En cherchant "Urja Resort" à Vagator sur Google Maps, on trouve l'établissement le long de Vagator Beach Road, et sa photo principale est bien notre piscine.
![[MQB_VAG1_2.png|600]]
En comparant la photo du challenge avec celle de la fiche, on retrouve le petit bassin rond (1) et l'échelle (2). L'immeuble à bandeaux (3), lui, n'est pas le même : la position de l'échelle montre que les deux photos sont prises depuis des côtés opposés de la piscine. Sur la photo du challenge, l'échelle est au fond, au pied de l'immeuble, alors que sur celle de la fiche elle est au premier plan. On voit donc l'immeuble juste en face, qui a exactement le même style (façade crème à bandeaux bordeaux) : ça confirme qu'on est bien au même endroit.
![[MQB_VAG1_3.png|700]]

Le nom complet de la résidence est donc **==Urja Resort Casablanca==** : "Casablanca" est le nom du complexe dans lequel elle se trouve.

---
## Hidden Stay: The Vagator Mystery - 2

### Énoncé
> After intercepting the network traffic, investigators recovered a PCAP file containing clues about a meeting between two individuals. However, the exact meeting location remains unknown.
>
> The only clues available are that the place is somewhere near their accommodation, and they overheard a conversation mentioning a rabbit and an art café. Can you follow the clues, investigate the surrounding area, and uncover the complete name of the art café where the two individuals met?
>
>> Flag format: flag{complete_name_of_the_art_cafe}

### RETEX
Cette fois, pas d'image : on a une capture réseau (pcap). Pour avoir un premier aperçu de son contenu, on affiche tout le texte lisible qu'elle contient avec `strings`.
![[MQB_VAG2_1.png|800]]
Au milieu du bruit, on voit des requêtes HTTP en clair vers `chat.meetup-hub.example` (1). Chacune contient un message en JSON, avec un expéditeur (`from`), un destinataire (`to`) et un texte (`text`) (2) : c'est une messagerie entre Alice et Bob, envoyée sans chiffrement.

Pour n'afficher que la conversation, on ne garde que les lignes qui contiennent `from`.
![[MQB_VAG2_2.png|800]]
Alice a trouvé un petit café et l'a pris en photo pour que Bob reconnaisse l'endroit (1). Elle lui envoie ensuite le lien de la photo, encodé en base64 (2). Ils se donnent rendez-vous "table by the window, around 4 pm".

Il suffit de décoder le base64 pour obtenir un lien MEGA (3).
![[MQB_VAG2_3.png|700]]

Le lien mène à l'image "Challenge_Image-2.jpeg" : un escalier de nuit, vu d'en haut depuis un tapis de gazon synthétique, avec des rampes blanches à barres horizontales, un ruban LED enroulé sur la main courante, une arche de verdure et des plantes en pot.
![[MQB_VAG2_4.webp|500]]

L'énoncé donne deux autres indices : le café est près de leur logement, et on a entendu parler d'un lapin et d'un café d'art. Le logement, c'est la résidence de la partie 1, Urja Resort Casablanca. On cherche donc "art cafe" sur Google Maps autour de la résidence : le premier résultat, Nest Cafe 1966, est justement classé "Café des arts", à environ 600 m à l'est, sur Vagator Beach Road.
![[MQB_VAG2_5.png|600]]

Reste le lapin. Sur les photos de la fiche, le café est un rooftop, et le mur en azulejos bleus porte le logo de l'enseigne : un lapin assis dans un nid (1).
![[MQB_VAG2_6.jpg|800]]

Sur une des photos du rooftop, on aperçoit même le haut de l'escalier de la photo d'Alice : la rampe qui descend, avec son ruban LED sur la main courante (1). On retrouve aussi, comme sur sa photo, des plantes en pot le long des rampes (2).
![[MQB_VAG2_7.png|700]]

Le café où Alice et Bob se sont retrouvés est donc **==Nest Cafe 1966==**.

---
***Les différentes parties du CTF :***
 · | · Geolocation
 · | · [[Threat Intelligence]]
 · | · `[[Fraud]]`
 · | · `[[Physical Security]]`
 · | · `[[Chronolocation]]`
 · | · `[[Trust & Safety]]`
 · | · `[[Due Diligence]]`
 · | · `[[Maritime & Aviation]]`
 · | · `[[Dark Web]]`