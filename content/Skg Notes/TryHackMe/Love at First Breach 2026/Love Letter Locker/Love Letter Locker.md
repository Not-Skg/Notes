---
tags:
  - Chall
  - TryHackMe
  - LoveAtFirstBreach
  - web
  - IDOR
---
## Énoncé
>My Dearest Hacker,
>
>Welcome to LoverLetterLocker, where you can safely write and store your Valentine's letters. For your eyes only?
>
>>*You can access the web app here:* `http://MACHINE_IP:5000`
## Retex
Cette fois-ci on doit analyser un site qui archive en secret des lettres, j'imagine qu'il faudra donc en trouvé une sensible.

Sur le site on peut se créer un compte. Et quand on le créé, on a accès a une interface qui nous dit même le nombre de lettres qui ont été archivées et apparement il y en a 2.
![[lettre_cachés.png|500]]
Et vu qu'on ne peut rien faire d'autre, on va en créé une.
![[Faille.png|500]]
Quand on l'ouvre on voit un indice (le petit `3`) dans l'url, c'est donc la faille.

> Pourquoi c'est une faille ? 

Parce que ça veut dire qu'on peut potentiellement construire nous même l'url pour accéder à d'autres lettres.

En remplaçant le `3` par un `1` dans l'url, on trouve donc la première lettre.
![[FLAG.png|500]]
Le pire (ou le mieux), c'est qu'on a même pas besoin de droits spécifiques pour y accéder.

On a donc le flag suivant : **==THM{1_c4n_r3ad_4ll_l3tters_w1th_th1s_1d0r}==**

---
## Explication de la faille
L'URL des lettres utilise un ID séquentiel simple (`/letter/3`) sans vérification d'autorisation. En changeant `3` par `1` ou `2`, n'importe qui accède aux lettres des autres utilisateurs sans login ni droits spécifiques.
## Pour s'en protéger
- *IDs UUID :* Utiliser des identifiants aléatoires imprévisibles à la place des `3`, `1` etc
- *Vérif serveur :* Toujours checker la lettre dont l'utilisateur veut avoir accès lui appartient avant affichage
- *JWT dans URL :* Signer l'accès ou utiliser des sessions
- *Rate limiting :* Limiter les tentatives de brute force d'IDs