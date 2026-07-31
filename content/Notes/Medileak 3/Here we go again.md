---
tags:
  - Osint
  - Medileak3
  - Chall
order: 2
---

Alors vraiment prêts pour l'aventure ?
![[M3_Hwga.png]]

***Les autres parties du CTF :***
 · | · Here we go again
 · | · [[Voyage Voyage]]
 · | · [[Money For Nothing]]
 · | · [[Ecole du micro d argent]]
 · | · [[Antisocial]]
 · | · [[Hygiaphone]]
 · | · [[Ya foye]]
 · | · [[Family Affair]]
 
---
## Old Friend
### Énoncé
>En cette fin de semaine du mois de mai, votre équipe reçoit un message d'un expéditeur inconnu, via une messagerie chiffrée.
>
>Pas d'introduction, pas d'explication : la photo d'un homme d'une soixantaine d'années, l'air quelconque, prise dans ce qui ressemble à un intérieur. Et une seule ligne de texte :
>**"_Hey ! Tu le connais pas, lui ?_"**
>
>L'expéditeur ne s'est plus jamais manifesté. On essaie de rappeler, rien. On essaie de tracer, rien non plus. Juste cette photo, plantée au milieu de l'écran.
>
>Mais ce visage, vous le connaissez. Et plutôt deux fois qu'une.
>![[M3_Hwga_OF.png|400]]
>L'homme sur la photo, c'est **==Xxx xxX==** !

### RETEX
Pour ce challenge, on pourrait essayer de faire de la recherche d'image inversée, mais si on a bien fait ces devoirs et lu les WU des deux dernières itérations de medileak, on sait à coup sûr que l'homme au centre de cette photo est **==Raoul Reidid==**. 
![[M3_Hwga_OF_RR.png]]
Il était au centre du lore du medileak et était connu pour ses arnaques et le réseau qu'il avait monté par-dessus.
- [WU Medileak 1](https://oscarzulu.org/wu-medileak/)
- [WU Medileak 2](https://md.oscarzulu.org/share/p3vydij90c/p/write-up-medileakv2-qlMwFP1DUl)

---
## Smile !
### Énoncé
>La photo ne sortait pas de nulle part. C'était bien cette tête qu'on traque depuis plus de deux ans, celle qui nous a baladés de Chypre à la République tchèque en passant par Limoges. Depuis sa fuite en juin 2025, il s'était évaporé sans laisser la moindre trace.
>
>Mais quelqu'un l'a photographié et a mis le cliché en ligne. Visiblement sans se douter qu'il attirerait notre attention.
>
>Vous remontez le fil. Et l'auteur de la photo, lui, ne se cache pas du tout.
>
>Son site internet est accessible à l'adresse **==hxxps://exemple.tld==**
>Et il tient même un album photo en ligne sur **==hxxps://another-exemple.tld==**, sur lequel on retrouve quelques pépites.

### RETEX
Analyser les données EXIF de la photo ne nous donne rien, par contre, on peut voir un détail sur le coin bas droit de la photo : `Alan Mc Cornish`.
Ça ressemble à la signature d'un photograph, ça paraît cohérent avec l'énoncé et la qualité de la photo.
En cherchant ces mots sur un moteur de recherche, on peut trouver le site **==hxxps://alanmccornish.co.uk==**.
On y apprend un peu plus sur lui.
![[M3_Hwga_S_P.png|500]]
Il est donc basé sur l'île de Lewis.
En se baladant sur le site, on peut retrouver la photo de Raoul de l'énoncé et même une autre.
![[M3_Hwga_S_P_R.png|500]]
Et les descriptions nous donne des détails sur le lieu de la photo et la personne qui y est apparemment lié : Gizem.
On peut noter que Gizem était aussi un personnage récurrent dans le lore Medileak.
![[M3_Hwga_S_P_G.png|500]]
On peut même retrouver Gizem sur des photos plus bas, avec une indication sur le circuit de ses prestations.
Enfin, on peut accéder à un album de portrait réalisé par ce photographe, et un détail nous intrigue, tous les portraits qu'il a réalisés ont pour description le prénom de la personne photographié sauf une qui est décrite comme "untitled".

Le photographe met à disposition une adresse mail pour le contacter en cas de besoin : `alan@alanmccornish.co.uk`
Malheureusement, nous n'arrivons pas à pivoter dessus. On va donc essayer de retrouver les réseaux sur lequel il est présent.
Pour ce faire, on va commencer par le pseudo `alanmccornish` qui est aussi son nom de domaine.
Malheureusement, les outils classiques comme `sherlock` ou `osintisnotacrime` ne fait le lien avec aucune plateforme intéressante.
On change donc de méthode et on se met à tenter ce pseudo sur tous les sites connus pour du partage de photo / album photos. Si cela ne fonctionne toujours pas alors, on changera de pseudo.
En parallèle quelqu'un fait de la recherche par image inversée via une photo du photograph sur son site.
On peut donc retrouver par l'une de ces deux méthodes son profil sur le site [500px](https://500px.com/p/alanmccornish) : **==hxxps://500px.com/p/alanmccornish==**
![[M3_Hwga_S_5px.png|500]]
On remarque aussi encore une fois la dame "untitled".
![[M3_Hwga_S_5px_U.png|500]]
On apprend dans la description que c'est une journaliste française qui ne veut pas donner son nom, mais qui enquête sur quelqu'un avec un passé sombre dans le domaine de la médecine, ce qui nous rappelle étrangement Raoul. 

---
## Love me tender

### Énoncé [1/5]
>Vous fouillez l'album du photographe, cliché après cliché. Et au milieu des paysages et des portraits, un visage familier finit par sortir du lot : **==Xxx==**, prise en pleine prestation sur scène.

### RETEX [1/5]
On peut donc déjà répondre : **==Gizem==** via l'analyse du contenu du site ci-dessus. On peut même le vérifier via les WU des itérations précédentes de Medileak.
![[M3_Hwga_LmT_G.png]]

### Énoncé [2/5]
>Aucun doute possible : c'est bien elle, à ses côtés depuis l'affaire de la clinique **==Xxxx==**.
>Ils sont donc ensemble, et au même endroit. Premier point marqué.

### RETEX [2/]
On peut encore une fois se référencer aux WUs des Medileaks précédents.
![[M3_Hwga_LmT_C.png]]
Elle est donc à ses côtés depuis l'affaire de la clinique **==Yemanja==**
### Énoncé [3/5]
>Et puisqu'elle remonte sur scène, il y a fort à parier qu'elle a ==pris du galon== depuis son premier ==profil musical== et qu'on retrouve maintenant ses **==nouveaux==** titres sur la célèbre plateforme **==Xxxx==**.

### RETEX [3/5]
On peut commencer par vérifier son compte sur SoundCloud pour les anciens Medileaks.
![[M3_Hwga_LmT_SC.png|400]]
Son compte existe toujours, mais il n'y a pas de nouveaux titres.
Il va donc falloir trouver un nouveau compte sur la même plateforme ou sur une autre.
Ici, il y a plusieurs techniques possibles. Pendant que certains font de la recherche par image inversée sur ses photos, d'autres peuvent faire des recherches par mots clés.
![[M3_Hwga_LmT_G_MC.png|500]]
Via la recherche `gizem raoul` on tombe sur un profil sur [Anghami](https://play.anghami.com/song/1269341682) (un service de streaming musical orienté Moyen-Orient et Afrique du Nord)
Ce profil, c'est un nouveau compte musical de Gizem Ilhanet, elle a juste pris le nom de Raoul "Reidid" en le diminuant un peu "Reid" pour se "refaire" une identité.
On a donc son nouveau nom de scène, mais Anghami n'est pas vraiment mainstream, on ne peut donc pas réellement dire que c'est une plateforme à utiliser lorsque l'on a "pris du galon".

On peut donc rechercher un compte sur d'autres plateformes plus mainstream et utilisé.
On peut retrouver son :
- [profil Deezer](https://www.deezer.com/fr/album/957942101)
- profil [Amazon Music](https://music.amazon.com/artists/B0GWN74KVK/gizem-reid)
- activité sur [Youtube musique](https://music.youtube.com/watch?v=QIN3qYkR7J8&list=OLAK5uy_lG8lof5dkbeA3Bru3z53t67DPeF-apQwg) (sans compte)
- et encore d'autres plateformes...
Étant donné que l'on a la possibilité de choisir la plateforme pour le flag, et qu'Oscar Zulu (les organisateurs du CTF) aiment bien les réponses cocorico, on va choisir le flag **==Deezer==**

### Énoncé [4/5]
>Vous écoutez. Vous prenez des notes. Et l'un des morceaux attire particulièrement l'attention : elle y évoque **Xxxx Xxxx** — un nom qui sent la personne, ou le lieu, à plein nez.

### RETEX [4/5]
On va donc pouvoir écouter toutes les nouvelles musiques de Gizem et analyser leurs paroles.
![[M3_Hwga_LmT_D.png|500]]
Une chanson en particulier nous attire : `Skye`.
Outre le fait que le titre fait référence à une île écossaise non loin de Lewis (là où se trouve le photographe).
![[M3_Hwga_LmT_S.png|500]]
C'est aussi et surtout parce que ses paroles sont remplies de références à des lieux.
En voici une transcription (un peu bancale).
![[M3_Hwga_LmT_T.png|500]]
Gizem y raconte comment un homme nommé Daniel a gentiment accepté de les aider leur d'une mésaventure mécanique avec leur voiture, il les a donc logés dans une maison de campagne et leur a même préparé à manger.
Elle ne précise pas son nom de famille, mais l'appelle `Daniel from Interhome`.
À noter que Interhome est une agence de location de vacances.

Elle utilise souvent dans le refrain un terme qui ressemble à Floaty Gary.
Essayons de vérifier si cette histoire n'est pas juste inventée pour la musique.
En cherchant `Floaty Gary Skye` sur un moteur de recherche, on peut comprendre que le terme qu'elle chantait n'était pas `Floaty Gary` mais plutôt `Flodigarry` qui est un petit village sur l'île de Skye.
![[M3_Hwga_LmT_FG.png|500]]
En recherchant les mots clés du type `airbnb daniel interhome skye flodigarry` ,on peut retrouver quelques annonces comme [celle-ci](https://www.airbnb.co.uk/rooms/24446299?location=Gairloch%2C%20United%20Kingdom&search_mode=regular_search&adults=1&check_in=2026-06-27&check_out=2026-07-02&children=0&infants=0&pets=0&source_impression_id=p3_1779486291_P3shi_1Uqa6jQuco&previous_page_section_name=1001&federated_search_id=47da7b65-a659-4cad-b292-bdf08013d555), qui nous confirme qu'il y a bien un Daniel de Interhome qui existe et qui propose des [maisons de campagne](https://www.google.com/maps/place/57°40'27.1"N+6°15'50.8"W/@57.6741937,-6.2642315,3a,75y,91.75h,90t/data=!3m7!1e1!3m5!1smaKj5dE7QNwtZkyYpIK7bw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3DmaKj5dE7QNwtZkyYpIK7bw%26yaw%3D91.75478!7i16384!8i8192!4m4!3m3!8m2!3d57.6741889!4d-6.2641215?hl=fr&entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D).
![[M3_Hwga_LmT_DfI.png|500]]
Étant donné que son nom de famille n'est pas divulgué par souci de protection de la vie privée, le flag est donc **==Daniel de Interhome==**.

### Énoncé [5/5]
>Quelques recherches en parallèle, et le tableau se complète : elle entretient un compte sur **==Xxxx==** sous le pseudo **==Xxxx==**, dédié à l'autopromotion.

### RETEX [5/5]
Maintenant que l'on connait son nouveau nom de scène `Gizem Reid`, on peut essayer de trouver ses différents comptes.
![[M3_Hwga_LmT_OnC.png|500]]
On peut retrouver, via `osintisnotacrime` ou un autre outil du style, quelques comptes qui lui sont liés. Comme un [Instagram](https://www.instagram.com/gizemreid/) et un [Ko-Fi](https://ko-fi.com/gizemreid), mais celui qui nous intéresse le plus en ce moment, c'est le compte **==instagram==** : **==gizemreid==**.
![[M3_Hwga_LmT_I.png|500]]
Dessus, elle a l'air d'y faire la promotion de son nouvel album et elle y partage aussi certaines photos de ses voyages.
![[M3_Hwga_LmT_I_P.png|500]]

---
***Les autres parties du CTF :***
 · | · Here we go again
 · | · [[Voyage Voyage]]
 · | · [[Money For Nothing]]
 · | · [[Ecole du micro d argent]]
 · | · [[Antisocial]]
 · | · [[Hygiaphone]]
 · | · [[Ya foye]]
 · | · [[Family Affair]]