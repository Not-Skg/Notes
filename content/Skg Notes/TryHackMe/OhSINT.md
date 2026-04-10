---
tags:
  - Osint
  - Chall
  - TryHackMe
  - enola
---
## Énoncé
>What information can you possible get with just one image file?
>![[WindowsXP_1551719014755.jpg]]
>>**Note:** This challenge was updated on 2024-02-01. If you are following any older walkthroughs, expect a small change. Additionally, the file is also available on the AttackBox, under the `/Rooms/OhSINT` directory.

## RETEX
D'après l'énoncé, le but de ce chall c'est de trouver le plus d'infos possible à partir de cette image.
### [1/7]
>What is this user's avatar of?

Un de mes premiers reflex lorsque l'énoncé d'un chall comporte une image, c'est de vérifier ses métadonnées.
![[THM_OH_exif.png|500]]
On peut déjà en tirer 2 infos : 
- Un copyright : OWoodflint
- Une localisation : 54 deg 17' 41.27" N, 2 deg 15' 1.33" W

Dans ce cas précis, la localisation ne nous intéresse pas vraiment, puisque c'est juste l'endroit où ce fond d'écran iconique a été réalisé (Hawes, Royaume-Uni)
Étant donné qu'on a un username qui fait office de copyright, on peut essayer de voir quel sont les comptes associés.
Pour ce faire, je vais utiliser l'outil enola.
![[THM_OH_enola.png|500]]

On voit plein de comptes, mais vu qu'on veut un avatar, j'imagine qu'on parle d'une photo de profil sur un réseau social par exemple.
![[THM_OH_x.png|500]]
Son profil Twitter a pour photo de profil un chat donc **==cat==** en anglais.
### [2/7]
>What city is this person in?

Son profil Twitter nous dit qu'il est localisé dans l'espace (j'en doute un peu...)
On va donc chercher sur un autre de ses réseaux.
![[THM_OH_git.png|500]]
Son compte github nous donne plein d'infos : 
- Localisation : **==London==**
- Pivot 1 : compte Twitter (on avait déjà)
- Pivot 2 : WordPress perso (https://oliverwoodflint.wordpress.com)
- @mail : OWoodflint\@gmail.com
### [3/7]
>What is the SSID of the WAP he connected to?

Plus tôt, on avait vu qu'il avait posté son BSSID sur Twitter : B4:5D:50:AA:86:41
![[THM_OH_wigle.png|500]]
Pour trouver le SSID à partir du BSSID, on peut utiliser Wigle.net et ça nous donne : **==UnileverWiFi==**.
### [4/7]
>What is his personal email address?

D'après son GitHu : **==OWoodflint\@gmail.com==**
### [5/7]
>What site did you find his email address on?

Github
### [6/7]
>Where has he gone on holiday?

Selon son [WordPress](https://oliverwoodflint.wordpress.com/), il est en ce moment à ==New York==.
![[THM_OH_wp.png|500]]

### [7/7]
>What is the person's password?

Toujours d'après le WordPress, en inspectant la page, on peut voir que du texte était caché en couleur blanche sur fond blanc : **==pennYDr0pper.!==**
![[THM_OH_pwd.png|500]]
Il a probablement laissé le MdP ici comme pense-bête en espérant que personne ne le trouve.