---
tags:
  - Osint
  - Chall
---
## Énoncé
>Derrière une mort spectaculaire se cache parfois une grande scientifique... Une fois que vous l'aurez retrouvée, un petit voyage en ligne vous permettra d'en savoir plus sur elle. Dans l'ordre, il vous faudra retrouver :
>
> - L'année de décès
> - le mont où elle est décédée,
> - son nom de famille,
> - son jour de naissance
> - et le mois de naissance de son mari.
>![[content/Notes/404CTF/404_26_CD/404_26_CD_C.jpeg]]
>>Format du flag : 404CTF{2026_Everest_Curie_01_01}

## RETEX
En procédant à une analyse d'image inversée via Google Lens, on peut trouver une référence à un site [Find a Grave](https://fr.findagrave.com/cemetery/2801783/cimeti%C3%A8re) qui possède exactement la même photo.
![[content/Notes/404CTF/404_26_CD/404_26_CD_GL.png|500]]
C'est donc une photo du cimetière de Pfastatt, dans le département du Haut-Rhin, en Alsace.
![[content/Notes/404CTF/404_26_CD/404_26_CD_FAG.png|500]]
Sur la page du cimetière, on peut afficher les mémoriaux.
![[content/Notes/404CTF/404_26_CD/404_26_CD_Kraft.png|500]]
Il y en a 89 donc on peut regarder rapidement à l'œil nu.
Trois profils sortent du lot, ceux de la famille ==Kraft==.
Ils possèdent même un monument dédié.
![[content/Notes/404CTF/404_26_CD/404_26_CD_VE.png|500]]
Sur le mémorial [Kraft](https://fr.findagrave.com/memorial/273890570/krafft), on apprend que c'est un mémorial en hommage à un couple de volcanologue Français. Ils ont même fait l'objet d'un documentaire. Ça pourrait donc être intéressant de lire les autres profils de cette famille.
![[content/Notes/404CTF/404_26_CD/404_26_CD_CJK.png|500]]
Sur le profil de "[Katia](https://fr.findagrave.com/memorial/269972054/catherine-jos%C3%A9phine-krafft)", on apprend qu'elle était une volcanologue (scientifique) réputée, qu'elle a même écrit une vingtaine de livres. Ça doit donc être la scientifique de l'énoncé.
Elle est décédée en ==1991== sur le mont ==Unzen== avec son mari. Et elle est née le ==17== avril 1942.
![[content/Notes/404CTF/404_26_CD/404_26_CD_M.png|500]]
On peut trouver la date de naissance de son mari sur son mémorial.

> On a donc le flag : **==404CTF{1991_Unzen_Krafft_17_03}==**

---
Les autres RETEX du [[404CTF 2026]] !