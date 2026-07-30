---
tags:
  - Chall
  - Osint
  - Osint4fun
  - AdventOfOsint
---
## Énoncé [1/2]
>Un samedi de 1988, un tirage du loto allemand n'était composé que de numéros impairs.
>Quels étaient (dans l'ordre croissant) les numéros gagnants ?
>>*Format de réponse :* 7 11 15 23 35 49

## RETEX [1/2]
En cherchant `lotery stats 1988 Germany` on trouve [ce site](https://www.lotteryleaf.com/german-lotto/1988).
On peut y voir tous les numéros gagnant de l'année.
![[content/Notes/Osint4Fun/Advent Of Osint 2025/11 December/11D_loto.png|500]]
Le seul composé entièrement de numéro impair, c'est celui du 24 septembre 1988 3 21 23 25 27 47 (BONUS : 26).
Donc en les mettant dans l'ordre croissant : **==3 21 23 25 27 47==** 
## Énoncé [2/2]
>Un acteur polonais est né ce jour-là, et on trouve rapidement une photo sur laquelle il porte un dossard.
> Quel est le nom de l'événement auquel il participe le jour de la photo ?
>>*Format de réponse :* dach dla naszych dzieci

## RETEX [2/2]
En cherchant `polish actor september 24 1988` on trouve instantanément un acteur : ==Szymon Piotr Warszawski==
![[content/Notes/Osint4Fun/Advent Of Osint 2025/11 December/11D_actor.png|500]]
Et lorsque l'on cherche des photos de lui sur Google image, on trouve : 
![[content/Notes/Osint4Fun/Advent Of Osint 2025/11 December/11D_photos.png|500]]
On peut lire sur ce dossard : **==Bieg po nowe Zycie==**
![[11 Decembre.png|500]]
Et la traduction de ce texte veut dire : "Courir pour une nouvelle vie", c'est donc le nom de l'événement auquel il participe le jour de la photo.

