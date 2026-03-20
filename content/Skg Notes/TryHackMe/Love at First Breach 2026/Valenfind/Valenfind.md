---
tags:
  - Chall
  - TryHackMe
  - LoveAtFirstBreach
  - web
  - LFI
---
## Énoncé
>My Dearest Hacker,
>There’s this new dating app called “Valenfind” that just popped up out of nowhere. I hear the creator only learned to code this year; surely this must be vibe-coded. Can you exploit it?
## Retex
Pour ce challenge, il va falloir analyser un site de rencontre.
![[VF_HP.png|500]]
On a la possibilité de se créer un compte, et de visiter les profils des autres.
On peut même changer le theme de leur profil.
![[V_go.png|500]]
J'ai lancé un gobuster en fond pour voir si une page spécifique existait mais je n'ai rien trouvé d'intéressant.
![[V_L.png|500]]
Lorsque l'on change de theme sur un profil, on voit (via Burp) qu'un GET est réalisé en envoyant une valeur pour layout. Cette valeur correspond à un nom de fichier html. Cela veut donc dire que l'on peut potentiellement choisir le fichier que l'on veut à la place du fichier de theme.

![[V_passwd.png|500]]
Ça a marché, j'ai même pu afficher le contenu du fichier /etc/passwd.

Si j'arrive a afficher ça je peux donc afficher le code de l'app.
![[V_API.png|500]]
Bingo, j'arrive même a récupérer la clé API Admin`CUPID_MASTER_KEY_2024_XOXO`.

Et il y a aussi une route admin d'export de la db `/api/admin/export_db`. Et cette route nous demande d'utiliser le `X-Valentine-Token`, probablement la clé API du dessus.
![[V_export.png|500]]

On peut donc l'afficher et ça nous donne le flag : **==THM{v1be_c0ding_1s_n0t_my_cup_0f_t3a}==**
![[V_Flag.png|500]]

## Explication de la faille
La faille consiste en un **LFI (Local File Inclusion)** dans le paramètre `layout` du change theme : au lieu de valider que c'est un thème légitime (`dark.html`, `light.html`), l'app charge **n'importe quel fichier** du serveur (`/etc/passwd`, `/app/server.js`). 
De plus le source code leak la clé API admin `CUPID_MASTER_KEY_2024_XOXO` ainsi que la route ce qui nous donne un accès.
## Pour s'en protéger
- **Whitelist stricte** : `layout` ne doit accepter que `['dark.html','light.html','valentine.html']`
- **`realpath()`** : Vérifier que le fichier est dans `/themes/` seulement
- **Pas de source leak** : Jamais exposer `/app/`, `/src/`, clés API en prod
- **API keys en env** : `process.env.API_KEY` vs hardcoded