---
tags:
  - Osint
  - Chall
  - crypto
order: 7
---
![[LeCaire.jpeg]]

***Les autres parties du CTF :***
 · | · [[Visiorbis — Les origines]]
 · | · [[Good cop]]
 · | · [[La tempete]]
 · | · [[La brume]]
 · | · [[Bad Cop]]
 · | · 黑市 — Marché Noir
 · | · [[Le pacte]]

---
## LES BÂTISSEURS DE L'OMBRE

### Énoncé
>Les services de l’État, pour lesquels le cabinet Skopein travaille, enquêtent également de leur côté, à la lumière des informations que les directeurs de Skopein leur transmettent.
>
>Ils ont notamment identifié ce lien : [https://shorturl.at/5e4q3](https://shorturl.at/5e4q3), mais, faute de temps, leurs investigations semblent pour l’instant au point mort.
>
>Quel pseudo d'un groupe de hackers bien connu a développé et sponsorisé cette page web ?
>
>>_Format du flag : pseudo_

### RETEX

Le lien de l'énoncé nous redirige vers `http://r5zxdoyib3qfw6dgtutyl7ylmqnlvmm2ckpva2saami5bvk3fon3w2yd.onion`.
On va donc devoir sortir TOR.
![[LC_MN_T1.png|500]]
Le lien nous redirige donc vers un site avec une interface en chinois, et une direction artistique digne d'un film Matrix.
![[LC_MN_T2.png|500]]
En inspectant le code source, on trouve sur le potentiel auteur du site : Anonymous. Mais malheureusement ça ne flag pas, pourtant, c'est le groupe de hacker le plus connu, c'est peut-être juste trop évident pour être ça.
Il y avait aussi `powered by 铪` écrit sur le footer de la page.
![[LC_MN_GHT.png|500]]
En traduisant le caractère, on trouve **==Hafnium==**, un APT chinois assez connu et affilié à APT40. On a donc notre flag.

---
## 黑市 — PREMIER CONTACT

### Énoncé
>Dans les profondeurs du forum **黑市**, un thread publié par un certain archive_bot sur une entreprise de technologie attire particulièrement l'attention.
>
>Quelle est la date du post du premier utilisateur lui ayant répondu dans ce thread ?
>
>>_Format du flag : JJ/MM/AAAA_

### RETEX
En recherchant `archive_bot` dans la barre de recherche, on peut trouver deux posts.
![[LC_MN_OS1.png|500]]
En traduisant tout ça on obtient : 

| Sujet                                                                        | Rubrique            | Auteur      | Réponses |
| ---------------------------------------------------------------------------- | ------------------- | ----------- | -------- |
| Document de décision relatif à une opération d'acquisition [Pièce jointe]    | Partage de fichiers | archive_bot | 2        |
| Archivage des informations sur la structure de l'actionnariat [Pièce jointe] | Partage de fichiers | archive_bot | 2        |
Étant donné que le premier parle d'une décision de rachat, on va y jeter un coup d'œil.
![[LC_MN_OS2.png|500]]
Le premier commentaire associé provient d'un utilisateur nommé "PGP_King" et a été posté le **==22/12/2025==**.
La pièce jointe mentionne bien une entreprise de technologie, on a donc trouvé le bon article et la bonne date.
![[LC_MN_PDF1.png|500]]

---
## ASHIDAKON

### Énoncé
>**Ashidakon Technologies** est mentionnée dans les échanges du forum. Cette entreprise possède une expertise bien précise.
>
>En quelle année a-t-elle établi son centre de recherche en analyse d'images ?
>
>>_Format du flag : XXXX_

### RETEX
Une partie du document comporte une liste avec dates, on va donc traduire cette partie.
![[LC_MN_PDF1T.png|500]]

Ça nous donne donc : 
```
II. Présentation de la société Ashidakon Technologies
Fondée en 2003, Ashidakon Technologies a son siège social à Shenzhen, en Chine.
Créée par une équipe d’ingénieurs spécialisés en optoélectronique et en ingénierie des communications,
la société se consacre principalement à la recherche et au développement de systèmes de vidéosurveillance numérique et de technologies d’analyse d’images.
Au fil des années, elle est devenue une entreprise technologique de premier plan dans le domaine des infrastructures de sécurité.
III. Étapes du développement de l’entreprise
(1) Déploiement de systèmes de vidéosurveillance dans les infrastructures publiques et les installations industrielles.
(2) Lancement en 2010 de l’Ashidakon Eagle 1, un équipement développé en interne.
(3) Création en 2014 d’un centre de recherche et développement dédié à l’analyse d’images à Nanjing.
(4) Lancement en 2016 de la gamme Sentinel de systèmes de caméras intelligentes.
IV. Situation actuelle de l’entreprise
```

On comprend donc que Ashidakon Technologies se consacre principalement à la recherche et au développement de systèmes de vidéosurveillance numérique et de technologies d’analyse d’images.
> Comme Visiorbis...

De plus, d'après le point (3), un centre de recherche et développement dédié à l’analyse d’images est créé à Nanjing en **==2014==**.

## CARDA NO LIES 

### Énoncé
>Une adresse Cardano apparaît dans une transaction liée au réseau. La blockchain ne ment pas. Il y a eu un échange de fonds entre la société et une autre entité.
>
>Quel est le montant exact reçu par l'adresse de sortie dans la transaction identifiée ?
>
>>_Format du flag : X.XXXXXX ADA_

### RETEX
Le premier document ne nous donne rien à ce sujet, on va donc s'intéresser à la pièce jointe du deuxième article.
![[LC_MN_OS3.png|500]]
On n'a même pas vraiment de le lire puisque l'adresse est notée noir sur blanc.
![[LC_MN_PDF2.png|500]]
En cherchant ```addr1qxt6fk4t7jhjpsxm72zhhztwjpaxmqxt3zscykey0gad042e9778qy80m9fserhews0fj6wux2xurtdmr3upgdqc34
lqvzy5pq``` sur [adastat](https://adastat.net/addresses/addr1qxt6fk4t7jhjpsxm72zhhztwjpaxmqxt3zscykey0gad042e9778qy80m9fserhews0fj6wux2xurtdmr3upgdqc34lqvzy5pq), on peut retrouver l'unique transaction liée à cette adresse. 
![[LC_MN_ADA.png|500]]
Le montant exact reçu était donc de **==8.334279 ADA==**.

---
***Les autres parties du CTF :***
 · | · [[Visiorbis — Les origines]]
 · | · [[Good cop]]
 · | · [[La tempete]]
 · | · [[La brume]]
 · | · [[Bad Cop]]
 · | · 黑市 — Marché Noir
 · | · [[Le pacte]]