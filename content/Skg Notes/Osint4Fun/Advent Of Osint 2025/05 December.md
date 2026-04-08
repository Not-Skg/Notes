---
tags:
  - Chall
  - Osint
  - Osint4fun
  - AdventOfOsint
---
## Énoncé
>En France, certains ==arrêtés== ==municipaux== sont plutôt originaux, comme par exemple ceux interdisant au personnage croisé le [3 décembre](https://www.osint4fun.eu/advent2025/20251203153000) de gêner le travail du Père Noël.
>
>En ==décembre 2024==, on peut retrouver de tels arrêtés sur les sites ==WordPress== de deux ==communes==.
>
>Quels sont les noms de famille de ces deux maires ?
>>*Format de réponse :* Martin Durand

## RETEX
Pour rappel, le personnage du [[03 December|3 décembre]] est le Grinch, donc en cherchant : `inurl:"wp-content" "arrêté" "grinch" "décembre 2024"`
On trouve directement les liens wordpress lié à des arrêtés du style.
![[5D_WP.png|500]]
Le premier lien nous donne le nom ==Driol==
![[5D_Driol.png|500]]
Et le deuxième nous donne ==Dupuy==
![[5D_Dupuy.png|500]]

