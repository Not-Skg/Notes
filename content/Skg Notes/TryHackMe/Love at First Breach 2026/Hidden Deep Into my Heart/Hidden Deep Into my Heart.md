---
tags:
  - Chall
  - TryHackMe
  - LoveAtFirstBreach
  - web
---
## Énoncé
>My Dearest Hacker,
>Cupid's Vault was designed to protect secrets meant to stay hidden forever. Unfortunately, Cupid underestimated how determined attackers can be.
>Intelligence indicates that Cupid may have unintentionally left vulnerabilities in the system. With the holiday deadline approaching, you've been tasked with uncovering what's hidden inside the vault before it's too late.
>You can find the web application here: `http://10.80.130.203:5000`
>With love,   
>Chief Inspector Valentine 💕
## Retex
On doit donc trouver les failles sur le site ci-dessous.
![[Vault.png|500]]
A première vue rien d'intéressant.
En essayant de mettre des mots clés à la suite de l'URL, on peut potentiellement trouver des pages cachés. Essayons avec robots.txt, c'est un fichier qui se positionne à la racine d'un site et sert à dire aux robots de ne pas fouiller à certains endroits. Généralement, c'est surtout pour empêcher l'indexation des pages admin par exemple.
![[robots.png|500]]
Ça a marché, ce fichier existe ici aussi, on y voit que la page ==cupids_secret_vault== est censé être bloqué aux robots. Et en prime, on a un commentaire qui ressemble à un mot de passe ==cupid_arrow_2026!!!==, probablement oublié par un dev lors de la mise en prod...

Allons voir à quoi ressemble la page cachée : 
![[secret_vault.png|500]]
Bon, ça ne nous avance pas trop, essayons donc de savoir s'il y a une page de connexion liée à cet URL, pour ce faire, on pourrait tenter des mots clés aux hasards (ex: connexion, portail, check_id, etc) mais pour aller plus vite, on va utiliser l'outil gobuster, il va faire ce travail à notre place.
![[admin.png|500]]
Il a déjà trouvé une page nommée "administrator", allons voir à quoi, elle ressemble.
![[admin2.png|500]]
C'est exactement ce qu'on cherche, un endroit pour tester ce qu'on a trouvé tout à l'heure et que l'on pense être un mot de passe.
Étant donné qu'on pense que c'est un dev/admin qui a oublié ce mot de passe en commentaire lors de la mise en prod, on test les creds suivants : admin / cupid_arrow_2026!!!
![[flag.png|500]]

Ça a marché, on a donc le flag suivant : **==THM{l0v3_is_in_th3_r0b0ts_txt}==**

---
## Explication de la faille
Le fichier `robots.txt` expose `/cupids_secret_vault/` l'interdisant aux bots, et contient le mot de passe admin en commentaire (surement oublié par un dev). 
On peut donc trouver la page de connexion et s'y connecter facilement grâce à ces secrets.
## Pour s'en protéger
Il serait utile de commencer par supprimer les commentaires sensibles de tous les fichiers en prod.
De plus analyser le robots.txt peut se permettre de se rendre compte ce qui est exposé et donc ce qui mérite plus de protection.