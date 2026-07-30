---
tags:
  - Chall
  - TryHackMe
  - LoveAtFirstBreach
  - web
  - RSA
---
### Énoncé
>My Dearest Hacker,
>
>Valentine's Day is fast approaching, and "Romance & Co" are gearing up for their busiest season.
>
>Behind the scenes, however, things are going wrong. Security alerts suggest that "Romance & Co" has already been compromised. Logs are incomplete, developers defensive and Shareholders want answers now!
>
>As a security analyst, your mission is to retrace the attacker's, uncover how the attackers exploited the vulnerabilities found on the "Romance & Co" web application and determine exactly how the breach occurred.

### Retex

Pour ce challenge, on doit s'attaquer à un site qui propose d'offrir ses services afin de créer des moments romantique.
![[content/Notes/TryHackMe/Love at First Breach 2026/Corp Website/CW_HP.png|500]]
J'ai voulu tester les boutons et voir ce que je pouvais faire, mais c'était super limité, donc j'imagine qu'il faut plutôt se concentrer sur la structure en elle-même plutôt que sur ses fonctionnalités.
Après une rapide requête, on sait que le site est fait en Next.js.
![[content/Notes/TryHackMe/Love at First Breach 2026/Corp Website/CW_NextJS.png|500]]

Je vais donc analyser les vulnérabilités potentielles via l'outil `nuclei`.
![[content/Notes/TryHackMe/Love at First Breach 2026/Corp Website/CW_nuclei.png|500]]

Une CVE critique est recensé, je vais donc l'exploiter via ce repos github : https://github.com/Chocapikk/CVE-2025-55182

En lançant l'exploit, on voit que ça réagit.
![[content/Notes/TryHackMe/Love at First Breach 2026/Corp Website/CW_Pwd.png|500]]

Je m'assure donc de savoir quel compte on utilise.
![[content/Notes/TryHackMe/Love at First Breach 2026/Corp Website/CW_WhoamI.png|500]]

Et ce qu'il y a autour
![[content/Notes/TryHackMe/Love at First Breach 2026/Corp Website/CW_Flag.png|500]]
Après une rapide recherche, je trouve le premier flag dans `/home/daniel/` : **==THM{R34c7_2_5h311_3xpl017}==**

Maintenant qu'on a un accès, j'aimerais bien passer root.
J'énumère d'abord les privilèges sudoers de l'utilisateur daniel.
![[content/Notes/TryHackMe/Love at First Breach 2026/Corp Website/CW_sudo.png|500]]
On peut voir que cet utilisateur peut executer python3 en tant que root sans mdp.
On va donc profiter de ça pour fouiller les fichiers en tant que root via python.
![[content/Notes/TryHackMe/Love at First Breach 2026/Corp Website/CW_end.png|500]]
On retrouve assez facilement le flag : **==THM{Pr1v_35c_47_175_f1n357}==**

## Explication de la faille
**CVE-2025-55182** (React2Shell) : vulnérabilité RCE critique dans React Server Components/Next.js via desérialisation non sécurisée des payloads RSC. Un simple HTTP crafté exécute du code serveur → reverse shell utilisateur `daniel`. Privilège root via `sudo python3` sans mot de passe.

## Pour s'en protéger
- **Patch immédiat** : Next.js 15.0.5+ / 15.1.9+ / 16.0.7+ (décembre 2025)
- **Limiter sudo** : `NOPASSWD` seulement pour scripts non interactifs, pas `python3`