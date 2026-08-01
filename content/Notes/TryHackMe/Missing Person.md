---
tags:
  - Osint
  - googlelens
  - exif
  - ChallOsint
  - TryHackMe
---
## Énoncé
>"My friend went on holiday in 2025 and shared some photos, but I haven’t heard from him since. Can you help me track him down for the police report?"
>![[MotoGP.jpg|500]]
>![[food.jpg|500]]

## RETEX
Pour ce challenge, l’objectif est de **reconstituer le trajet et les activités d’une personne à partir de quelques indices visuels et contextuels**
À partir des deux photos fournies dans l’énoncé, il faut croiser les informations, identifier les lieux visités, puis remonter jusqu’aux personnes et aux activités associées afin d’aider la police à compléter son rapport.

---
>What is the commercial name of this circuit?   
>>**Format: English, full commercial name.**

Jeoncernée est `MotoGP.jpg`.
Le nom du fichier suggère immédiatement un circuit utilisé pour un Grand Prix moto, ce qui constitue un premier indice sur le lieu.

Pour confirmer cette hypothèse, je m’appuie sur une recherche d’image inversée afin de retrouver des correspondances visuelles.
![[THM_MP_LENS_GP.png|500]]
Plusieurs résultats renvoient vers le même endroit, sous les appellations **Pertamina Mandalika International Circuit** et **Pertamina Mandalika Street Circuit**.
![[THM_MP_wiki_gp.png|500]]
D'après [wikipédia](https://en.wikipedia.org/wiki/Mandalika_International_Street_Circuit), le nom commercial complet du circuit est : **==Pertamina Mandalika International Street Circuit==**

---
>When did the event take place?   
>**Format: DD-DD/MM/YYYY.**

L’étape suivante consiste à dater précisément l’événement associé à la photo.  
L’énoncé indique qu’on est en **2025**, ce qui permet de cibler l’édition correspondante du MotoGP sur ce circuit.

En recherchant le calendrier du **Pertamina Mandalika International Circuit** pour 2025, je retrouve les [dates de l’événement](https://sportrik.com/en/full-schedule-for-2025-mandalika-motogp-at-pertamina-circuit-en). 
![[THM_MP_GP_schedule.png|500]]
Le MotoGP a donc eu lieu du : **==03-05/10/2025==**.

---
>He told me he ate delicious Mexican food. What is the name of the restaurant?

Pour savoir où il a mangé, nous pouvons utiliser la photo `food.jpg`, en utilisant encore une fois Google Lens, on trouve cette fois-ci la mention de **==Cantina Mexicana==** avec la même photo que l'énoncé.
![[THM_MP_food.png|500]]

---
>At what time was this photo taken?   
>>**Format: HH:MM:SS.**

Pour obtenir l’heure exacte de la prise de vue, je m’intéresse aux métadonnées de la photo.  
L’analyse des informations EXIF permet de retrouver l’horodatage associé à l’image.
![[THM_MP_food_exif.png|500]]
Elle a donc été prise à **==19:55:30==** le dernier jours du GP.

---
>He sent me a message, this is the last I heard from him: ”Went to this cool MotoGP after party, and became friends with one of the local DJs who played that night. We’re going to visit a cave tomorrow.”
>
>>What is the full address of the bar’s location?

Le dernier message fourni par la victime est particulièrement utile, car il donne un enchaînement d’indices exploitables :  un after party MotoGP, un bar local, puis une visite prévue dans une grotte le lendemain.

Je commence donc par identifier l’after party en question.  
En recherchant une soirée MotoGP 2025 à Lombok, je retrouve une publication Instagram qui fait la promotion d’un événement au **Surfers Bar**.
![[THM_MP_surfers.png|500]]
Via Google Maps, on trouve son adresse complète : **==Jl. Raya Kuta, Kuta, Kec. Pujut, Kabupaten Lombok Tengah, Nusa Tenggara Bar==**

---
> What is the DJ's stage name?

La vidéo Instagram fait la promotion de 3 DJ pour ce set : 
![[THM_MP_dj-set.png]]
Étant donné qu'on parle d'un DJ avec une cave, j'imagine qu'on parle du natif **==Bong Leleh==**

---
>After digging into the DJ's other online accounts, what cave does he take tourists to?

En cherchant les autres réseaux de ce DJ, je suis tombé sur un compte Facebook qui parle d'une cave, mais qui a pour URL : "facebook\.com/@bongleleh/".
![[THM_MP_cave.png|500]]
Cette page lui appartient donc et ça devait être un de ses business.
Il devait emmener les touristes à la cave **==Gua Sumur==** qui ne se trouve pas très loin du bar.

---
>What number did the DJ list for his tour business?  
>>**Format: Full number, no country code.**

Le numéro de téléphone associé est affiché sur ce compte facebook :
**==085333137345==**.

---
## Synthèse
L’objectif était de reconstituer les déplacements d’une personne, de confirmer les lieux visités, puis de remonter jusqu’aux contacts et activités associées à son dernier message.

La personne disparue a suivi cet itinéraire en **2025 à Lombok, Indonésie** :
- **03-05/10/2025** : Assisté au **MotoGP** sur le **Pertamina Mandalika International Street Circuit**  
- **05/10/2025 - 19:55** : Dîné à la **Cantina Mexicana** (tacos mexicains)  
- **Soirée** : After party au **Surfers Bar** (Jl. Raya Kuta, Lombok Tengah)  
- **Rencontre** : DJ local **Bong Leleh**  
- **Plan lendemain** : Excursion à la grotte **Gua Sumur** (contact : **085333137345**)

**Dernière activité connue** : Après la soirée MotoGP, parti avec le DJ pour visiter sa grotte touristique. C'est le dernier contact avant disparition.