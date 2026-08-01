---
tags:
  - Osint
  - exif
  - LeCaire
  - Chall
order: 2
---
![[LeCaire.jpeg]]

***Les autres parties du CTF :***
 · | · Visiorbis — Les origines
 · | · [[Good cop]]
 · | · [[La tempete]]
 · | · [[La brume]]
 · | · [[Bad Cop]]
 · | · [[黑市 — Marché Noir]]
 · | · [[Le pacte]]

---
## FAMILIA TUA ET MUNDUS TUUS 

### Énoncé 
>**Visiorbis** est une entreprise à l'histoire familiale bien particulière.
>
>Où et avec qui Marc a commencé ?
>
>>_Format du flag : chambre_nicole_bernard_

### RETEX
En recherchant `"Visiorbis"` sur Google, on peut trouver le site de Visiorbis ainsi que le compte Linkedin de son CEO : "André Marc".
![[LC_OG_G.png|500]]
On apprend sur la [page "Qui sommes-nous"](https://visiorbis.fr/about) que Marc a fondé Visiorbis dans son **==garage==** (comme les plus grands) avec ses enfants **==Juliette==** et **==Louis==**.
![[LC_OG_VOG.png|500]]

---
 ## SCROLL PRE-DODO

### Énoncé 
>Un certain **Marc André** a commenté un post sur LinkedIn le **20 mai 2026**. Son timing interpelle.
>
>À quelle heure exactement a t-il posté son commentaire porteur d'espoir ? (heure locale)
>
>>_Format du flag : 14:35_

### RETEX

En regardant les commentaires du compte trouvé précédemment, on voit un commentaire qui utilise les mots "Porteur d'espoir", ça doit être le post dont parle l'énoncé.
![[LC_OG_L.png|500]]

En utilisant un [outil trouvé sur le tas](https://ollie-boyd.github.io/Linkedin-post-timestamp-extractor/) on peut extraire la date du commentaire via [son lien](https://www.linkedin.com/feed/update/urn:li:activity:7462888714814390272?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A7462888714814390272%2C7462982279628361728%29&dashCommentUrn=urn%3Ali%3Afsd_comment%3A%287462982279628361728%2Curn%3Ali%3Aactivity%3A7462888714814390272%29).
![[LC_OG_LE.png]]

On sait donc que Marc a commenté à **==23:47==**.

---
## MAAAARRRRRC !!!!

### Énoncé 
>En tant que consultant méticuleux, vous avez contacté Marc afin d’obtenir davantage d’informations sur Visiorbis et ses velléités d’étendre ses activités au Moyen-Orient, et plus particulièrement en Égypte.
>
>Celui-ci, légèrement suspicieux, a toutefois accepté de vous transmettre l’appel d’offres pour lequel il est actuellement en train de constituer un dossier. 
>![[APPEL_DOFFRE_NATIONAL_ET_INTERNATIONAL_1_1_1-1.pdf]]
>Il affirme connaître l’identité de l’auteur de ce document, mais préfère rester discret à ce sujet.
>
>Toutefois, vous êtes plus perspicace que lui. Sur quel réseau social et sous quel pseudonyme peut-on retrouver l’auteur de ce document ?
>
>>_Format du flag : instagram_bi-nat_

### RETEX

En analysant le pdf avec un outil comme `exiftool`, on peut trouver les mots clés : "bsky" et "zi-nay".
![[LC_OG_SPD.png]]

"bsky" est le nom de domaine de **==bluesky==**, **==zi-nay==** doit donc être le username de la personne qui a rédigé ce document.
[Le compte](https://bsky.app/profile/zi-nay.bsky.social) existe bien !
![[LC_OG_B1.png|500]]
On peut aussi noter que le nom de l'auteur apparaît même clairement dans les données exifs.
Et un post du compte bluesky nous confirme que c'est bien son nom :
![[LC_OG_B2.png]]


---
***Les autres parties du CTF :***
 · | · Visiorbis — Les origines
 · | · [[Good cop]]
 · | · [[La tempete]]
 · | · [[La brume]]
 · | · [[Bad Cop]]
 · | · [[黑市 — Marché Noir]]
 · | · [[Le pacte]]