---
tags:
  - Osint
  - ChallOsint
  - CTI
  - TryHackMe
  - recon
  - web
  - crackstation
  - reverse_shell
  - nmap
  - gobuster
---
## Énoncé
>Welcome to the OSINT challenge, part of TryHackMe’s Red Teaming Path. In this task, you will be an ethical hacker aiming to exploit a newly developed web application.
>
>SuperSecure Corp, a fast-paced startup, is currently creating a blogging platform inviting security professionals to assess its security. The challenge involves using OSINT techniques to gather information from publicly accessible sources and exploit potential vulnerabilities in the web application.
>
>>Your goal is to identify and exploit vulnerabilities in the application using a combination of recon and OSINT skills. As you progress, you’ll look for weak points in the app, find sensitive data, and attempt to gain unauthorized access. You will leverage the skills and knowledge acquired through the Red Team Pathway to devise and execute your attack strategies.
## RETEX

Ce challenge consiste à faire de la recon sur une application web, on part du point de vue d'un membre d'une Red Team.
La première chose que je fais, pour cerner le challenge, c'est vérifier si une page y est associée ou pas.
![[THM_Grep_page.png|500]]
On tombe sur une page standard Apache2.
Je décide donc de lancer un nmap pour voir ce qu'il en est coté port ouvert.
![[THM_Grep_nmap_A.png|500]]
On peut voir que les 3 ports suivants sont ouverts : 
- p22 : ssh
- p80 : http → c'est pour la page vuau-dessuss
- p443 : https

Nmap nous montre aussi un certificat SSL : `Subject: commonName=grep.thm/organizationName=SearchME/stateOrProvinceName=Some-State/countryName=US`

On va donc pouvoir ajouter `grep.thm` dans notre `/etc/hosts`.
Maintenant, on a donc accès à la page : `grep.thm`
![[THM_Grep_grep_main.png|500]]

---
> What is the API key that allows a user to register on the website?

Sur cette page, nous avons la possibilité de nous inscrire et de nous connecter.
Le site se présente comme `SearchME!` et serait encore en développement.
Si on essaie de nous inscrire, on obtient une erreur qui nous dit qu'on l'on n'a pas de clé d'API valide (logique pour un site en dev)
![[THM_Grep_register_fail.png|500]]

En inspectant la page, on voit qu'elle prend pour source un script : `/js/register.js`
Et ce script contient une clé d'api écrit directement dedans : `e8d25b4208b80008a9e15c8698640e85`
![[THM_Grep_register_js.png|500]]
Et en la passant dans crackstation, on peut la déchiffrer.
![[THM_Grep_crackstation_api-key.png|500]]
C'était donc du md5, et déchiffré ça nous donne : ==johncena==. 

Aussi, vu que le site est en dev, je me suis dit qu'il avait potentiellement un GitHub lié.
J'ai donc recherché `Welcome to SearchME!`en espérant tomber sur le code php lié.
![[THM_Grep_github.png|500]]
Bingo !

![[THM_Grep_github_api_folder.png|500]]
En me baladant dans ses dossiers, je vois que le fichier `register.php` a été Maj pour supprimer la clé... vu que GitHub laisse accès à l'historique, je ne vais pas me gêner.
![[THM_Grep_commit_fix_key.png|500]]
On a donc accès à la clé d'api suivante : **==ffe60ecaa8bba2f12b43d1a4b15b8f39==**.
![[THM_Grep_crackstation_api-key2.png|500]]
Après un petit passage sur crackstation, on trouve le mot de passe suivant : ==youcantseeme==.

---
> What is the first flag?

Maintenant que l'on a les clés d'api, essayons de nous créer un compte.
Pour ça, on va utiliser burp suite pour intercepter la requête de demande d'inscription et y insérer les bonnes clés d'API.
![[THM_Grep_burp_register.png|500]]
La clé api de base est donc johncena, la blague, c'est que si on l'utilise, alors on nous voit et on nous bloque l'accès. Mais si on le change pour youcantseeme alors, on peut passer.
![[THM_Grep_dashboard.png|500]]
Une fois connecté, on a accès à un dashboard.
Avec le premier flag qui apparait : ==THM{4ec9806d7e1350270dc402ba870ccebb}==

---
> What is the email of the "admin" user?

On avait vu plus tôt un fichier `upload.php` à côté du fichier `register.php`. Essayons de voir ce que ça donne si on le met dans l'URL.
![[THM_Grep_upload.png|500]]
On a maintenant accès à une nouvelle fonctionnalité, uploader un fichier.
![[THM_Grep_CS_upload.png|500]]
Le code source sur GitHub déclare que seuls les `jpg`, `jpeg`, `png` et `bmp` sont des formats valides.

On va donc essayer un reverse shell. Je vais utiliser le classique : https://github.com/pentestmonkey/php-reverse-shell/blob/master/php-reverse-shell.php

Pour être sûr que le reverse shell ne se fasse pas bloquer, on va même le cacher en changeant ses données via hexedit (ffd8ffe0 pour jpg).
![[Grepqq.png|500]]
Puis je peux vérifier qu'il est bien considéré comme un jpg via file. Et enfin je l'upload.
![[THM_Grep_RS_upload.png|500]]
Maintenant, on voudrait pouvoir l'activer. 
Pour ça on peut utiliser gobuster qui va nous trouver la page `uploads`.
![[THM_Grep_gobuster_uploads.png|500]]
Dessus, on pourra cliquer sur notre fichier, mais avant ça, il faut lancer un netcat en écoute sur le port choisit dans le reverse shell.
![[THM_Grep_shell.png|500]]
On a donc accès à la machine.
![[THM_Grep_RS_ls.png]]
En me baladant un peu dans les dossiers, je trouve une base sql utilisateurs.
![[THM_Grep_users_sql.png|500]]
On y trouve l'adresse mail de l'admin (==admin\@searchme2023cms.grep.thm==), mais aussi à son MdP chiffré.

---
> What is the host name of the web application that allows a user to check an email for a possible password leak?

En vérifiant le certificat du site, je trouve aussi **==leakchecker.grep.thm==** et le port `51337`donc je décide de le rajouter au fichier `/etc/hosts`
![[THM_Grep_leakchecker.png|500]]
En essayant de nous connecter à l'URL : leakchecker.grep.thm:51337 on trouve une page qui nous propose de vérifier si notre mail a leak.

---
> What is the password of the "admin" user?

Avant de me lancer dans un interminable cassage de MdP, je voudrais vérifier si le MdP n'a pas déjà leak...
![[THM_Grep_bingo.png|500]]
Bingo !
En utilisant la page de vérification de leak, pour l'adresse mail de l'admin, on trouve ==admin_tryhackme!==

---
## Synthèse

### Failles exploitées
- L’application présente plusieurs faiblesses critiques. Des clés d’API sont exposées côté client dans le PHP, ce qui permet de les récupérer facilement. En plus, ces clés sont hashées en MD5, un algorithme obsolète et cassable rapidement.
- Le projet est aussi accessible sur GitHub, et l’historique des commits révèle des secrets supprimés du code actuel, montrant une mauvaise gestion des informations sensibles.
- La fonctionnalité d’upload est mal sécurisée : la validation repose uniquement sur l’extension des fichiers, sans contrôle réel côté serveur, ce qui permet d’uploader du code malveillant.
- Enfin, la page de vérification de leak de mdp via adresse mail révèle le mdp directement s'il a déjà leak, peut importe quel compte demande.
### Déroulé de l'attaque
1. L’attaque commence par une reconnaissance avec Nmap, qui permet d’identifier le domaine via le certificat SSL. Une fois le site accessible, l’analyse du PHP révèle une clé d’API, qui est cassée.
2. Une recherche OSINT permet de retrouver le dépôt GitHub et d’extraire une seconde clé depuis l’historique. Cette clé est utilisée pour contourner la protection à l’inscription via Burp Suite.
3. Après authentification, une fonctionnalité d’upload est découverte. Un reverse shell est uploadé en contournant les restrictions (only jpg), puis exécuté depuis le dossier `/uploads`, donnant un accès à la machine.
4. Depuis cet accès, des informations sensibles sont récupérées, notamment une base de donnée comportant l’email admin et le hash de son mdp. Un service de leak découvert permet ensuite de retrouver son mot de passe en clair, finalisant la compromission.