---
tags:
  - Chall
  - Osint
  - Osint4fun
  - AdventOfOsint
---
## Énoncé [1/2]
>![[13 Decembre.jpg|500]]
> À l'été 2013, un article de ==blog== du journal _==Le Monde==_ revient sur un ==concert== de la veille.
>Placez sur la carte la position de la scène lors de ce concert.
>>*Note :* le format attendu est 48.858259, 2.294505 et vous pouvez coller des coordonnées dans la zone de réponse.
>>*Précision attendue :* 50m

## RETEX [1/2]
En faisant une recherche inversé sur l'image de l'énoncé on se rencontre qu'il s'appelle tous ==James Chambers==, on est donc en train de chercher quelqu'un lié à ce concert qui est un de leur homonyme.
Et d'après [Wikipedia](https://fr.wikipedia.org/wiki/James_Chambers) il y a un chanteur de reggae qui est né avec ce nom mais prend pour nom de scène ==Jimmy Cliff==.

En cherchant : `inurl:"lemonde.fr/blog/" 2013 AND "concert" Jimmy Cliff`
On tombe sur ==Mundo Latino - Reggae Night==, et dedans il y est mention de Rio Loco à [Toulouse](https://www.lemonde.fr/blog/mundolatino/2013/06/).
![[content/Skg Notes/Osint4Fun/Advent Of Osint 2025/13 December/13D_RL.png|500]]
Et le lieu précisé est ==la prairie des Filtres==.
On peut donc trouver les coordonnées via Google maps.
![[content/Skg Notes/Osint4Fun/Advent Of Osint 2025/13 December/13D_GGM.png|500]]

---
## Énoncé [2/2]
>Une ==vidéo== présente le « ==Programme== des concerts » de ce festival et on retrouve naturellement une photographie de Jimmy Cliff pour l'annoncer.
>Qui est le photographe à l'origine de cette photo ?
>>*Format de réponse :* Robert Capa

## RETEX [2/2]
En cherchant `Mundo Latino toulouse 2013 programm` on tombe sur cette [vidéo](https://www.youtube.com/watch?v=OzsPNSKc7YM).
![[content/Skg Notes/Osint4Fun/Advent Of Osint 2025/13 December/13D_V.png|500]]
Et à 0:36 une photographie de Jimmy Cliff le présente. 
![[13 Decembre.2.png|500]]
En utilisant Google Lens sur l'image on tombe sur ce [site](https://www.udiscovermusic.com/news/jimmy-cliff-love-supreme-2019/) qui nous indique que le photographe est **==Tom Sheehan==**.
![[content/Skg Notes/Osint4Fun/Advent Of Osint 2025/13 December/13D_Tom.png|500]]