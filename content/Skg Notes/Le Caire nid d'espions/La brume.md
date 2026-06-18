---
tags:
  - Osint
  - Chall
---
![[LeCaire.jpeg]]

***Les autres parties du CTF :***
 · | · [[Visiorbis — Les origines]]
 · | · [[Good cop]]
 · | · [[La tempete]]
 · | · La brume
 · | · [[Bad Cop]]
 · | · [[黑市 — Marché Noir]]
 · | · [[Le pacte]]

---
## LE CABINET DE L'OMBRE

### Énoncé
>Derrière la campagne contre Visiorbis se cache un Thinktank qui œuvre discrètement avec une entreprise.
>
>Quelle entreprise est liée à ce Thinktank ?
>
>>_Format du flag : BrutDecoffrage_

### RETEX
Lors du dernier challenge de la catégorie [[La tempete]], on avait découvert [un compte TikTok](https://www.tiktok.com/@karahiyafaransa9812/photo/7643826667655302432) lié à un blog qui dénigrait Visiorbis et la France.
![[LC_LB_T.png|500]]
Pour les curieux voici la traduction de sa définition : 
`Je suis ici uniquement pour révéler la vérité sur la situation en France`
Et voici celle du nom du compte : `La haine de la France 9812`.

Nous avons d'abord épluché les vidéos en détail de ce compte en détail, puis au bout d'un long moment l'un d'entre nous a découvert qu'un tag était présent sur l'une des vidéos.
![[LC_LB_TT.png|500]]
Le tag est en fait un lien vers un Telegram : `https://t.me/thinktank_karahiyafaransa`
Le nom du thinktank recherché est donc karahiyafaransa qui est aussi l'écriture littérale du nom du compte TikTok mais avec l'alphabet commun.
Sur ce canal Telegram, un lien vers une annonce d'ouverture de [post sur linkedin](https://www.linkedin.com/posts/nathalie-zhou-0068503a8_hazy-%E6%9C%A6%E8%83%A7-strategic-communications-activity-7456699151666458624-hc7w?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEEYH0QBJoJNIHzZlh-euJLzJ2LJFH_DcqU) a été posté. 
![[LC_LB_L.png|500]]
C'est un poste pour l'entreprise **==hazyoffice==**, on a donc trouvé liée au ThinkTank.

---
## MISSION SECRÈTE

### Énoncé
>L'entreprise cherche à recruter. Dans sa fiche de poste, une mission d'influence particulière se dessine en filigrane.
>
>Sur quelle campagne va devoir travailler le futur employé ?
>
>>_Format du flag : Mexican restaurant selling good Tacos_

### RETEX
En ouvrant la fiche de post sur le site de l'entreprise, on apprend que la fiche déclare noir sur blanc lancer une campagne d'influence pour une entreprise Chinoise qui s'étend en France.
![[LC_LB_H.png|500]]

---
## LA VRAIE NATHALIE

### Énoncé
>**Nathalie Zhou** est une figure centrale de ce réseau. L'adresse mail qu'elle utilise publiquement n'est pourtant pas la bonne.
>
>Trouvez sa véritable adresse email.
>
>>_Format du flag : [vraieadresse@gmail.com](mailto:vraieadresse@gmail.com)_

### RETEX
Nathalie Zhou est la personne qui a posté sur LinkedIn l'ouverture de ce nouveau post.
![[LC_LB_NZ.png|500]]
Elle n'a pas précisé son mail sur son LinkedIn, on va donc devoir se tourner vers le site de son entreprise.
Sur la fiche de post, un mail est mentionné : "n.zhou@hazyoffice.fr", c'est donc le mail public dont parle l'énoncé.
![[LC_LB_IP.png|500]]
Lorsque l'on inspecte la page, on apprend que c'est elle qui a développé le site.
On va donc inspecter le site via un WHOIS.
![[LC_LB_W.png|500]]
Nathalie a utilisé son adresse perso pour créer le site et l'enregistrer, on a donc pu la récupérer : **==nathalie.zhou\@protonmail.me==**.

---
***Les autres parties du CTF :***
 · | · [[Visiorbis — Les origines]]
 · | · [[Good cop]]
 · | · [[La tempete]]
 · | · La brume
 · | · [[Bad Cop]]
 · | · [[黑市 — Marché Noir]]
 · | · [[Le pacte]]