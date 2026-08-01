---
tags:
  - Osint
  - LeCaire
  - Chall
order: 6
---
![[LeCaire.jpeg]]

***Les autres parties du CTF :***
 · | · [[Visiorbis — Les origines]]
 · | · [[Good cop]]
 · | · [[La tempete]]
 · | · [[La brume]]
 · | · Bad cop
 · | · [[黑市 — Marché Noir]]
 · | · [[Le pacte]]

---
## UN GRAND PHILOSOPHE

### Énoncé
>L'enquête prend une nouvelle dimension, s'il y a bien de la désinformation et de l'influence contre Visiorbis, il vous faut tenter de l'attribuer, de comprendre qui se cache derrière tout cela.
>
>Nathalie est un personnage central de l'histoire, elle fait le pont entre la Chine, l'Egypte et la France, aide à créer le contenu, pilote les campagnes d'influence pour le groupe HazyOffice puis créé des sites. Elle a d'ailleurs aidé un de ses collègues et ami à créer son site et lui apportait son expertise technique en retour.
>
>Ce nouveau protagoniste entre en scène. Développeur discret, mais présent. Sa philosophie de vie transparaît dans ses écrits.
>
>Pour lui, à quoi la vie ne se résume pas ? Répondez **en chinois**.
>
>>_Format du flag : 技术是我热爱的领域_

### RETEX

Lors du challenge `LA VRAIE NATHALIE` de la catégorie [[La brume]], on avait découvert via le code source du site de hazyoffice que Nathalie avait développé elle-même le site.
![[LC_BC_HO.png|500]]
Mais il y avait aussi une mention d'un autre site : [wodegereoke.com](https://wodegereoke.com)
![[LC_BC_WR.png|500]]
Malheureusement, c'est un site entièrement en chinois, il faudra donc faire très attention aux caractères si l'on veut en utiliser pour nos recherches.
![[LC_BC_WRT.png|500]]
En traduisant le site, on peut voir qu'il y a un article taggué "vie" et le titre implique une "réflexion du week-end", tout ce qui peut mener à des réflexions sur la vie.
![[LC_BC_WRT_RWT.png|500]]
Je vous laisse lire le contenu de l'article, mais en tout cas, il se finit par la phrase : `La vie n'est pas seulement une question de code et de rapports de vulnérabilité.`.
Ça doit être la philosophie dont parle l'énoncé.
![[LC_BR_WR_RW.png|500]]
En repassant sur [la page originelle](https://wodegereoke.com/blog/weekend-thoughts), on peut récupérer le flag : **==生活不只有代码和漏洞报告==**

---
## BETE D'ASTUCE

### Énoncé
>Ce protagoniste a glissé un indice précieux mais caché dans son site - un conseil qui vaut pour l'ensemble du CTF.
>
>Quelle astuce donne-t-il ?
>
>>_Format du flag : 技术是我热爱的领域_

### RETEX
Le premier réflexe qu'il me vient pour ce challenge, c'est de vérifier le [robots.txt](https://wodegereoke.com/robots.txt).
![[LC_BC_WR_R.png|500]]
J'ai bien fait parce qu'un message y est présent :
![[LC_BC_WR_T.png|500]]
On a donc trouvé son astuce : **==有些东西不在表面==**

---
## LE GONG

### Énoncé
>Sur l'un de ses comptes, le protagoniste utilise un caractère spécial après son pseudo, figure métaphorique de sa force.
>
>Quelle est la transcription française de ce caractère ?
>
>>_Format du flag : transcriptionenfrançais_

### RETEX

Sur le site, il y a un onglet de contact, dessus, on peut voir quelques comptes liés appartenant à cette personne.
![[LC_BC_C.png|500]]
Après vérification, aucun compte n'est vraiment intéressant, mais cette page possède une [archive sur la WBM](https://web.archive.org/web/20260419123537/https://wodegereoke.com/contact).
![[LC_BC_WBM.png|500]]
Et sur cette archive, il y a un réseau social de plus : Reddit.
![[LC_BC_R.png|500]]
On a donc accès à la page de son compte Reddit, et son pseudo possède le caractère : **==雷==** qui signifie le tonnerre.
![[LC_BC_T.png|500]]

---
## IL Y A FORT FORT PEU DE TEMPS

### Énoncé
>Quelqu'un a répondu à l'un de ses posts . Ce compte est étrangement récent.
>Quand a-t-il été créé ?
>
>>_Format du flag : 12/08/2024_

### RETEX

Ce compte ne possède qu'[un post sur reddit](https://www.reddit.com/user/Lei_Huan/comments/1rucng0/%E5%9C%A8%E4%B9%90%E6%B8%85%E5%8F%91%E7%8E%B0%E4%B8%80%E4%B8%AA%E5%BA%9F%E5%BC%83%E7%9A%84%E5%9C%B0%E6%96%B9%E8%80%83%E8%99%91%E6%8A%8A%E5%AE%83%E6%94%B9%E9%80%A0%E6%88%90_h_%E5%8A%9E%E5%85%AC%E5%AE%A4%E6%9C%89%E4%BB%80%E4%B9%88%E6%83%B3%E6%B3%95%E5%90%97/).
Et sur ce post, il n'y a qu'une personne qui ait laissé des commentaires.
![[LC_BC_RC.png|500]]
On peut trouver sur son compte Reddit la date de sa création : 
![[LC_BC_RAC.png|500]]
Il a donc été créé le **==17/05/2026==**.

---
## MADELEINE DE PROUST

### Énoncé
>Il doit y avoir une preuve de ce plan d'eau, quelqu'un a dû la prendre en photo car il n'apparaît pas sur la carte. A partir de là, il y a un village au Nord-Ouest de la position. Les souvenirs d'enfance flous mais pour autant bien preignants. La vue de cette maison au toit rouge fait ressurgir ces moments d'insouciances pour certains. Pour d'autres, elle est une piste d'espoirs et de nouvelles informations.
>
>Où se site cette maison exactement ? 
>
>>_Format du flag : 12.287, 170.456_


### RETEX

Ce challenge nous a pris le plus de temps dans ce CTF (+ 48h), je pense même que c'est spécifiquement à cause de lui si on n'a pas réussi à finir le CTF.
Pour ce retex, je vais expliquer rapidement un rabbit hole dans lequel nous sommes tombés et juste après la solution que l'on a fini par trouver.
Bien sûr, je vais essayer de rester succinct parce qu'en 48h on a le temps de cogiter et de partir dans tous les sens.

L'énoncé demande de trouver une maison, il donne même des indications pour la retrouver : 
- plan d'eau non visible sur une carte
- village au Nord-Ouest
- maison au toit rouge.

L'énoncé doit se porter sur [le post Reddit](https://www.reddit.com/user/Lei_Huan/comments/1rucng0/在乐清发现一个废弃的地方考虑把它改造成_h_办公室有什么想法吗/) des derniers challenges.
Revoici le en question :
![[LC_BC_P_RFP.png|500]]
Avant même de le traduire, on voit des images qui semblent être faites par IA, sur cette image, une maison abandonnée et très endommagé, en fond un décor qui semble être asiatique (grandes montagnes, tour/temple) et sur les côtés des villes dont une avec quelques buildings. 

Regardons la traduction : 
![[LC_BC_RFPT.png|500]]
Le post parle donc de la rénovation d'une maison abandonnée. Une localisation approximative y est donnée. Il y est expliqué que les images servent juste d'illustration pour s'imaginer un peu les rénovations à faire (elles ne servent donc a rien pour le challenge, mais dans le doute, on l'avait beaucoup analysé).

La personne en commentaire explique qu'elle connait la maison dont parle de post, qu'il habite dans le même village, mais au Nord-Ouest, près d'une des maisons a toit rouge.
Puis il explique qu'il allait souvent dans un gîte pas loin, et qu'en continuant un peu sur la route, on peut trouver le point d'eau en bas des montagnes, avec des gens qui vont souvent pêcher avec un filet.

Tout ceci s'accorde super bien avec l'énoncé, on a donc vraiment le bon post en tête.
Par contre, on n'est pas sûr de savoir quelle maison chercher, la maison abandonnée ou celle au toit rouge ? 
Aussi, étant donné que le post est en chinois, on ne va pas se fier à la traduction pour les noms de lieux, autrement, on risque d'avoir de mauvaises surprises.

On a donc le nom du gîte : `口吕品农家乐`
Le nom de la province : `浙江`
Le nom de la ville-district : `乐清`
![[LC_BC_Fermes.png|500]]
Lorsque l'on recherche le gîte, on trouve deux résultats, mais un seul se trouve dans Yueqing (乐清).
![[LC_BC_F.png|500]]
On peut donc voir le lieu-dit du commentaire.
D'ailleurs, ce lieu dît n'est pas vraiment visible sur la carte, et sur d'autres comme Baidu non plus. Et même si la carte de GG Maps n'est pas très qualitative sur cette région, c'est encore pire sur d'autres outils (j'ai testé), il vaut donc mieux rester sur GG Maps.

On peut apercevoir des plans d'eau non loin du gîte.
![[LC_BC_P_S.png|500]]
Et ces plans d'eau ne sont visibles qu'en vue satellite, pas en vue "plan GPS". 
![[LC_BC_P_P.png|500]]
Ça aurait pu être ce qu'entendait l'énoncé par : `plan d'eau non visible sur une carte` mais c'est juste une coïncidence.
![[LC_BC_P_RH.png]]
Par contre, à côté du gîte, il y a des photos d'un cours d'eau qui sont localisées à une zone qui ne possède pas d'eau d'après la vue satellite, ce qui est donc une étape encore plus violente que juste pas d'eau sur la vue "Plan GPS".
![[LC_BC_P_RH2.png]]
Et lorsque l'on suit le chemin, on trouve un village avec une maison à toit rouge sur le bord du village au Nord-Ouest.
On a longtemps cru que c'était le bon endroit, mais le problème, c'est qu'on n'arrivait pas à trouver de pécheurs.

Après de longues recherches, on a fini par abandonner cet endroit et élargir notre zone.
![[LC_BC_PT.png]]
On a fini par trouver un autre point d'eau non visible sur la carte, cette fois-ci vraiment en suivant la route. Et il y a encore un village au Nord-Ouest de ce point d'eau.
![[LC_BC_P_PE.png]]
De plus, il y a aussi une maison à toit rouge.
En lorsque l'on regarde une photo du point d'eau, on aperçoit des personnes qui pêchent, même si c'est avec des épuisettes plutôt qu'un filet. De plus, le point d'eau est entouré de falaises.
![[LC_BC_P_EAU.png]]
Après une petite vérification, on s'aperçoit que le commentaire parlait bien d'épuisettes, c'est juste la traduction qui n'est pas fidèle.
![[LC_BC_P_FT.png]]
On a donc enfin un point d'eau complètement convaincant.

Maintenant, il faut vérifier les maisons à toit rouge dans le village au Nord-Ouest.
![[LC_BC_P_2OH.png]]
Au premier abord on en voit une avec un toit bien rouge, et une autre entre le marron et le rouge bordeaux (personnellement, j'ai beaucoup de mal avec la teinte, du coup, on a beaucoup douté).
![[LC_BC_P_2H.png]]
En regardant bien, on en trouve même une autre un tout petit peu plus à l'écart, mais plus proche de la montagne.

Désormais, il ne reste plus qu'à joindre toutes les infos.
On cherche une maison, l'énoncé parle de toit rouge donc ça doit être une maison à toit rouge, au bord d'un village.
Celle qui est tout à droite est top à l'écart pour être au bord du village, et celle qui est rouge flashy est trop loin de la route et du point d'eau, la maison que l'on cherche, c'est donc : celle à côté du chemin, au plus proche du point d'eau : **==28.157, 120.888==**

Le challenge n'était pas si difficile en soit, mais assez flou pour qu'après le travail le soir, on soit un peu décontenancé et perdu. Ajouté à ça la sous-qualité de l'image satellite, et les posts en chinois avec les erreurs de traduction, c'était un défi vraiment intéressant et j'ai passé un super moment à le faire. 
Un grand merci au support parce que sans eux, je pense que j'aurai passé au moins une journée de plus dessus à me demander si les maisons à toit rouge bordeaux sont considérées comme rouge et si l'on cherchait la maison délabrée ou la maison à toit rouge.

---
***Les autres parties du CTF :***
 · | · [[Visiorbis — Les origines]]
 · | · [[Good cop]]
 · | · [[La tempete]]
 · | · [[La brume]]
 · | · Bad cop
 · | · [[黑市 — Marché Noir]]
 · | · [[Le pacte]]