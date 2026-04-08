---
tags:
  - Chall
  - TryHackMe
  - LoveAtFirstBreach
  - web
  - Token_jwt
---
## Énoncé
>The TryHeartMe shop is open for business. Can you find a way to purchase the hidden “Valenflag” item?
## Retex
Cette fois-ci, on va devoir analyser une boutique en ligne.
![[Shop.png|500]]
On peut commencer par check les pages associés à cette boutique via l'outil `gobuster`.
![[content/Skg Notes/TryHackMe/Love at First Breach 2026/TryHeartMe/Gobuster.png|500]]
Il ne donne pas grand-chose d'intéressant, que des pages classique (login, register, admin, etc)

Vu qu'on a la possibilité de se créer un compte, on va essayer et regarder à quoi ressemble la requête qui s'envoie en parallèle.
![[T_CA.png|500]]
On peut noter que le mdp est envoyé en clair dans la requête Post, mais rien d'autre de notable.

Suite à cette requête on reçoit : 
![[create_account_2.png|500]]

Vu qu'on a un cookie avec un token jwt analysons : `tryheartme_jwt`
![[cookie.png|500]]
En le décodant, on peut voir qu'il contient l'email, le rôle, le nombre de crédits, un iat et le thème de la page.

Donc en gros, c'est le serveur qui envoie un cookie avec le nombre de credits et c'est le client qui valide sur son navigateur. Pareil pour le role.

Le jwt token contient aussi un id d'algo, on pourrait tester de changer l'algo pour voir ce qu'il se passe.
Donc pour l'instant, on va essayer de créer notre propre token avec pleins de crédit, le rôle d'admin et l'ago `none`.

Donc le header sera :
```json
{
  "alg": "none",
  "typ": "JWT"
}
```
Et la payload :
```json
{
  "email": "admin@test.com",
  "role": "admin",
  "credits": 9999,
  "iat": 1771093574,
  "theme": "valentine"
}
```

Quand on reconstruit le token ça donne : 
```
eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwicm9sZSI6ImFkbWluIiwiY3JlZGl0cyI6MCwiaWF0IjoxNzcxMDkzNTc0LCJ0aGVtZSI6InZhbGVudGluZSJ9.
```

(ne pas oublier le secret à la fin, parce qu'un token est composé : d'un header, d'une payload et d'un secret, c'est la partie bleue du screen du dessus)

![[nouveau_produit.png|500]]
En modifiant la requête reçue avec le nouveau token jwt, on a pleins de crédits et on peut voir un nouveau produit "ValenFlag".
(Pour chaque interaction sur le site il faudra s'assurer d'avoir le bon token)

![[TryHeartMe_flag.png|500]]
En l'ouvrant, on a accès au flag : **==THM{v4l3nt1n3_jwt_c00k13_t4mp3r_4dm1n_sh0p}==**

## Explication de la faille
Le serveur **fait confiance au client** : le cookie JWT contient `credits`, `role=admin` et est vérifié côté navigateur. En changeant l’algorithme en `none` (pas de signature), on forge un token avec `credits=9999` + `role=admin` → accès au produit secret ValenFlag.
## Pour s'en protéger
- **Vérif serveur strict** : Toujours revalider `role`, `credits` en base de données côté serveur (ne JAMAIS faire confiance au JWT seul)
- **Signature forte** : JWT avec `HS256/RS256` + clé secrète robuste (pas `none` ni `HS000`)
- **Refresh tokens** : JWT courts + refresh pour limiter l’impact d’un token volé
- **HTTPS only** : Pour éviter l’interception du cookie