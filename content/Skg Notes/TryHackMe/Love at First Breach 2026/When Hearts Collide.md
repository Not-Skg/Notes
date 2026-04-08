---
tags:
  - Chall
  - TryHackMe
  - LoveAtFirstBreach
  - web
  - md5_collision
---
## Énoncé
>My Dearest Hacker,
>
>Matchmaker is a playful, hash-powered experience that pairs you with your ideal dog by comparing MD5 fingerprints. Upload a photo, let the hash chemistry do its thing, and watch the site reveal whether your vibe already matches one of our curated pups. The algorithm is completely transparent, making every match feel like a wink from fate instead of random swipes.
>
>Come get your dog today!
>
>>*You can access the web app here:* `http://MACHINE_IP`
## Retex
Cette fois-ci, on doit analyser un site qui est sensé trouvé notre âme sœur en comparant les hash md5 des images qu'on upload.
![[WHC_HP.png|500]]
On a donc la possibilité d'upload une image, et dans le titre, on nous parle aussi de "Collision", or une collision md5 c'est lorsque deux images différentes ont le même hash.
On va donc essayer d'en reproduire une via l'outil `fastcoll`.
![[collide.png|500]]
Pour la collision, on va utiliser l'image de l'exemple du site (le chien).
Le but, c'est de créer deux images `dog1.jpg` et `dog2.jpg` qui auront le même hash md5.

![[upload1.png|500]]
On upload le premier `dog1.jpg`.

![[upload2.png|500]]
Puis la deuxième et maintenant, on reçoit le flag :  **==THM{hash_puppies_4_all}==**
