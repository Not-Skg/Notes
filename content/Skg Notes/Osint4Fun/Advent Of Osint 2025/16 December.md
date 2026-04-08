---
tags:
  - Chall
  - Osint
  - Osint4fun
  - AdventOfOsint
---
## Énoncé
>Au cours de l’==automne 2025==, l’UK Maritime Trade Operations (==UKMTO==) a émis un avertissement concernant un incident maritime survenu à proximité des coordonnées suivantes : `12.381162, 46.468557`.
>La cause de l’incident n’a toutefois pas pu être déterminée avec certitude.
>Quel est le numéro IMO du navire impliqué ?
>>*Format de réponse :* 5148910

## RETEX
Dans un premier temps, il est intéressant de chercher où pointent ces coordonnées. On peut le faire via Google Maps.
![[16D_Aden.png|500]]
On parle donc d'un incident dans le ==Golfe d'Aden==.

En cherchant `alerte UKMTO d'automne 2025` on trouve : https://www.ukmto.org/ukmto-products/advisories/2025.
Le seul problème, c'est qu'on a pleins de rapport et pas vraiment de façon de trier donc il faut les vérifier 1 par 1 jusqu'à en trouver un qui parle d'un incident dans le golfe d'Aden.

J'ai fini par trouver celui ci-dessous.

| REFERENCE                                       | ISSUE DATE | TIME  | NAME                                            | LOCATION     |
| ----------------------------------------------- | ---------- | ----- | ----------------------------------------------- | ------------ |
| 20251018-UKMTO_ADVISORY<br>_036-25 - Update-002 | 19/10/2025 | 14:50 | 20251018-UKMTO_ADVISORY<br>_036-25 - Update-002 | Gulf of Aden |

En cherchant le mot`IMO` dans la présentation, on trouve le numéro IMO **==9014432==**
![[16D_FALCON.png|500]]
## Énoncé [2/2]
>Face à la situation de détresse qu’a subie le navire, divers moyens ont été engagés pour lui porter secours, dont un appareil de l’armée française.
>Quel officier commandait l'opération de sauvetage ?
>>*Format de réponse :* Horatio Nelson

## RETEX [2/2]
En épluchant un peu plus la présentation, on tombe sur la page qui explique l'incident.
![[16D_Incident.png|500]]
Donc en cherchant : `116NM east of Aden, Yemen rescue` on trouve ce [site](https://shipandbunker.com/news/world/676046-24-crew-rescued-from-lpg-tanker-after-fire-in-gulf-of-aden#:~:text=24%20crew%20members%20have%20been,45%20AM%20UTC%20on%20Saturday.) qui nous donne le nom de l'officier qui commandait l'opération de sauvetage : **==Andrea Quondamatteo==**
![[16D_Rescue.png|500]]