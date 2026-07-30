---
tags:
  - Osint
  - Chall
---
![[content/Notes/Le Caire nid d'espions/LeCaire.jpeg]]

***Les autres parties du CTF :***
 · | · [[Visiorbis — Les origines]]
 · | · Good cop
 · | · [[La tempete]]
 · | · [[La brume]]
 · | · [[Bad Cop]]
 · | · [[黑市 — Marché Noir]]
 · | · [[Le pacte]]

---
## DERRIÈRE LE PSEUDO

### Énoncé 
>Qui se cache vraiment derrière ce papillon ?
>
>>_Format du flag : Jean Dupont-Martin_

### RETEX

Nous avions trouvé lors du challenge `MAAAARRRRRC !!!!` de [[Visiorbis — Les origines]] que l'auteur du document d'appel d'offre s'appelait **==Naydhal Al-Mahrizi==**. On a même pu le prouver via un post sur son compte Bluesky.
![[content/Notes/Le Caire nid d'espions/LC_GC/LC_GC_B.png|50]]
Blueksy qui possède un logo en forme de papillon, nous avons donc déjà le flag.

---
## SALUT LA COMMU 

### Énoncé 
>Naydhal est un homme de convictions et cherche à s'investir contre la corruption notamment au travers d'une page.
>
>Quel est le nom en arabe de cette page ?
>
>>_Format du flag : لعالم العربي_

### RETEX
En recherchant le nom prénom de l'auteur de l'appel d'offre sur un moteur de recherche, on peut trouver facilement [son compte Facebook](https://www.facebook.com/profile.php?id=61579465497079&sk=likes).
![[content/Notes/Le Caire nid d'espions/LC_GC/LC_GC_GL.png|500]]
Sur son compte, on peut trouver qu'il like 2 pages avec un nom complet en arabe. Mais celle qui a pour illustration un enquêteur paraît plus intéressante au vu de l'énoncé.
![[content/Notes/Le Caire nid d'espions/LC_GC/LC_GC_F.png|500]]
Le thème de la corruption est présent sur cette page, elle doit donc être celle qu'il nous fallait. 
![[content/Notes/Le Caire nid d'espions/LC_GC/LC_GC_FE.png|500]]
Le flag est donc : **==إفشاء مصري==**

---
## ARCHITECTE ARCHICHOUETTE 

### Énoncé 
>L'Egypte ancienne est associée aux pyramides, la moderne à cette tour.
>
>Quel est le nom de l'architecte de ce bâtiment ?
>
>>_Format du flag : Jean Dupont_

### RETEX
Étant donné que le challenge précédent portait sur une page Facebook spécifique, ce challenge doit aussi y être lié.
![[content/Notes/Le Caire nid d'espions/LC_GC/LC_GC_FEA.png|500]]
On peut y trouver un post, avec la photo de profil complète de cette page. Sur la photo de profil, on trouve pleins de référence à l'Égypte : pyramide, bateau du Caire, sphinx. La tour doit donc être celle que l'on cherche. 
![[content/Notes/Le Caire nid d'espions/LC_GC/LC_GC_TC.png|500]]
Après avoir utilisé Google Lens, on apprend que cette tour est la tour du caire.
[Sa page Wikipédia](https://fr.wikipedia.org/wiki/Tour_du_Caire) nous apprennent que l'architecte est **==Naoum Shebib==**, mais il faut faire attention pour le flag parce qu'il est aussi nommé Naoum Chebib.
![[content/Notes/Le Caire nid d'espions/LC_GC/LC_GC_TA.png|500]]

---
## LE MESSAGER

### Énoncé 
>Un journaliste couvre de près les activités de Visiorbis. Sa présence en ligne est un pivot essentiel de l'enquête.
>
>Quel est son identifiant sur X (Twitter) ?
>
>>_Format du flag : @jeandupont_

### RETEX
La page Facebook anti-corruption des derniers challenges avait posté le 10 mai une liste de compte à suivre pour être informé sur la corruption.
![[content/Notes/Le Caire nid d'espions/LC_GC/LC_GC_FPLC.png]]
Tous ces comptes sont des comptes connus et utilisés comme source pour de nombreuses personnes comme le compte Bellingcat. Mais le compte **==@nadirelamori==** est le seul moins connu.
Généralement, quand on donne un username avec un @ comme ça, c'est que c'est un compte Twitter, et là ça ne déroge pas à la règle : 
![[content/Notes/Le Caire nid d'espions/LC_GC/LC_GC_TEJ.png]]
C'est le [compte X](https://x.com/nadirelamori)/Twitter d'un journaliste égyptien.
Et d'après ses tweets, il a l'air de s'intéresser de près à Visiorbis.

---
***Les autres parties du CTF :***
 · | · [[Visiorbis — Les origines]]
 · | · Good cop
 · | · [[La tempete]]
 · | · [[La brume]]
 · | · [[Bad Cop]]
 · | · [[黑市 — Marché Noir]]
 · | · [[Le pacte]]