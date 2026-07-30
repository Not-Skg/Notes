---
tags:
  - Chall
  - Osint
  - Osint4fun
  - AdventOfOsint
---
## Énoncé
>Encore un homonyme !
>![[17 Decembre.png]]
>Ensemble ils donnent la solution.
>>*Format de réponse :* $:Parker Son and Me;%

## Retex
Dans un premier temps, trouvons le nom de la personne sur la photo.
Pour une fois, je ne trouve rien via Google Lens, et Bing non plus. Je passe donc à Yandex et grâce à ce dernier, je trouve la photo complète. 
![[17 Decembre.2.png]]
Avec la photo, il y a le mot clé ==Dante== qui y est associé.
Toujours sur Yandex, on trouve un nom : ==Kazuhisa Hashimoto==, vu que sur la photo, ils ont l'air d'être un groupe de musique, on peut donc chercher :`Kazuhisa Hashimoto music band`
D'après le site [metal-archive](https://www.metal-archives.com/artists/Kazuhisa_Hashimoto/185055), il faisait partie du groupe ==Dante== et était le chanteur. Je comprends donc le mot clé associé avec. Toujours sur ce site en regardant la lineup du groupe, on trouve : 

| [Shougo Hata](https://www.metal-archives.com/artists/Shougo_Hata/185058)               | Drums   |
| -------------------------------------------------------------------------------------- | ------- |
| [Tomofumi Kaneko](https://www.metal-archives.com/artists/Tomofumi_Kaneko/185056)       | Guitars |
| [Kazuhisa Hashimoto](https://www.metal-archives.com/artists/Kazuhisa_Hashimoto/185055) | Vocals  |
| [Yoshihiro "Tetsu" Matsumoto](https://www.metal-archives.com/artists/Tetsu%21/185059)  | Bass    |
Maintenant qu'on a les noms, il faut trouver qui est l'homonyme de qui.
Après une rapide recherche, on apprend que le chanteur est l'homonyme du [créateur du konami Code](https://en.wikipedia.org/wiki/Kazuhisa_Hashimoto) (il n'y avait donc pas besoin de chercher très loin...).

Vu que je n'ai pas plus d'info j'utilise l'indice : ==rappel toi du slogan de Nike==.
Pour rappel ce dernier est **Just Do It**.
J'imagine qu'il faut donc faire le konami code sur l'interface du chall.
Et si besoin, ce code est le suivant :
![[content/Notes/Osint4Fun/Advent Of Osint 2025/17 December/17D_Konami.png|500]]

Quand on le fait sur l'interface du chall, un popup apparaît :
![[content/Notes/Osint4Fun/Advent Of Osint 2025/17 December/17D_Code.png|500]]

J'imagine qu'on doit donc utiliser le flag : `*-ALBUM 1991:!` avec le nom de l'album en question à la place de `ALBUM 1991`
Toujours d'après le site de [Metal](https://www.metal-archives.com/albums/Dante/In_the_Lost_Paradise/239747 "In the Lost Paradise"), cet album est nommé :  **==In the Lost Paradise==**

