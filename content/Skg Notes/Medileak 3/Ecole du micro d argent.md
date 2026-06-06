---
tags:
  - Osint
  - Medileak3
  - Chall
---

>C'est du Erasmus !
![[M3_EMA.png]]

***Les autres parties du CTF :***
 · | · [[Here we go again]]
 · | · [[Voyage Voyage]]
 · | · [[Money For Nothing]]
 · | · Ecole du micro d argent
 · | · [[Antisocial]]
 · | · [[Hygiaphone]]
 · | · [[Ya foye]]
 · | · [[Family Affair]]

---
## Je fais mon job à plein temps

### Énoncé
>Tiens, tiens. Une école de Data Analysts en Slovénie. Le site est en ligne, les pages "équipe" et "programmes" parfaitement à jour. Et un nom finit par sortir du lot.
>
>Raoul s'y est dégoté une nouvelle vocation. Il y gère le **==XXxxx XXxxx Xxxx==**, sur une durée de **==XXxxx==**. Son adresse de contact professionnelle est **==XXxxx==**.

### RETEX
Sur la [page Training](https://vedamedicaldataschool.eu/training.html) de la Veda, on peut trouver les Syllabus de tous leurs programmes.
![[M3_EMA_JPT_V1.png|500]]
En les regardant un par un, on peut trouver la mention de Raoul dans le programme "Ethics of Medical Data & AI".
![[M3_EMA_JPT_V2.png|500]]
Il y est mentionné comme un externe référent de la partie : **==Pharmaceutical usage of AI and Data Ethics==** son adresse de contact est la suivante : **==ethicspharma-external{at}vedamedicaldataschool.eu==**
![[M3_EMA_JPT_V3.png|500]]
Et ce programme dure **==2 mois==**.

>Pharmacien raté, pseudo-médecin, vendeur d'huiles magiques, directeur médical fantôme, et maintenant formateur. La reconversion est totale.


---
##  The Teacher
### Énoncé
>Vous remontez son contrat. Raoul est employé depuis **==XXxxx==**, et il a été recruté directement par **==XXxxx XXxxx==** pour encadrer les **==XXxxx==** avec les apprentis.
>
>Mais dans quel but, exactement ?
>Quel est son nouvel objectif ?
>Dans quel état j'erre ?

### RETEX
Pour ce challenge, nous avons choisi d'interroger Lidia Podkrajšek, la fondatrice et directrice de Veda Medical School.
![[M3_EMA_TT_LP_1.png|500]]
Nous nous sommes donc faits passer pour un policier local, en expliquant que l'on venait sous la demande de Ludvik Ogrizek.
![[M3_EMA_TT_LP_2.png|500]]
En discutant avec on s'aperçoit que **==Ludvik Ogrizek==** lui avait forcé la main pour ajouter Raoul dans l'équipe pédagogique. On essaie donc de lui soutirer plus d'information en lui faisant croire que c'est parce que Ludvik pourrait être en dangers à cause de Raoul.
![[M3_EMA_TT_LP_3.png|500]]
On apprend ensuite que Raoul a été recruté il y a **==8 mois==** pour encadrer les **==ateliers DataLake==** avec les apprentis. 
![[M3_EMA_TT_LP_4.png|500]]
Plus précisément, il a été embauché le 15 septembre dernier.

---
##  Étudiant poil aux dents

### Énoncé [1/3]
>Cette école mérite qu'on s'y attarde un peu plus longuement. Notamment du côté des élèves.
>
>En parcourant la liste des étudiants, dénichée sur **==XXxxx==**, un profil sort du lot : **==XXxxx XXxxx==**.

### RETEX [2/3]
Le footer du site de l'école possède un lien vers le portail étudiant.
![[M3_EMA_EPD_SP1.png|500]]
Ça nous redirige vers **==hxxps://student.vedamedicaldataschool.eu==**, qui nous donne accès à la liste de tous les étudiants par générations, avec leurs réseaux sociaux associés.
![[M3_EMA_EPD_SP2.png|500]]

On a perdu beaucoup de temps sur ce challenge. On avait du mal à trouver l'étudiant qui "sort du lot", on ne comprenait pas si c'était dû au fait qu'il a un nom spécifique, un certain nombre de réseaux sociaux ou une activité spécifique. On a donc analysé tous les comptes à dispositions.
En voici un aperçu :
![[M3_EMA_EPD_RSG.png|500]]
Pour ce qui est des Githubs, la plupart étaient déjà désactivé, le reste n'avait juste pas d'activité.

Voici une petite liste (non exhaustive) des profils qui nous ont fait douter : 
- Anna Raid - seul profil avec 2 comptes de réseau sociaux
  ![[M3_EMA_EPD_AR.png]]
- Tamás Péter - messages suspects sur X
  ![[M3_EMA_EPD_TP.png|500]]
- Matej Horvat - possède un guide touristique de l'île de Skye
  ![[M3_EMA_EPD_MH.png|500]]

Pendant un moment, on avait même l'impression que la OZ se moquait de nous à travers certains posts comme celui-ci.
![[M3_EMA_EPD_JOKE.png]]

Mais au final, le profil qui était celui attendu était celui de **==Thimothé Valleurant==** alias **==timtheboss==** sur **==Mastodon==**.

![[M3_EMA_EPD_TV.png|500]]
Il sort du lot parce qu'il nous apprend qu'un stage dans un labo est en cours, qu'il implique d'autres étudiants de la Veda, et qu'il a pour mentor un certain R.


### Énoncé [2/3]
>On gratte. Il dispose d'un compte **==XXxxx==**, sous le pseudonyme **==XXxxx==**.
>
### RETEX [2/3]

On a donc déjà répondu à la question via l'analyse précédente : **==timtheboss==** sur **==Mastodon==**.

### Énoncé [3/3]
>Et en remontant ses publications, on tombe sur quelque chose d'inattendu : il a décroché **==XXxxx==** avec **==XXxxx XXxxx==**, basé à **==XXxxx==**.

### RETEX [3/3]

On y a donc aussi déjà partiellement répondu, il a décroché un stage avec XXXXX, basé à Limoges.
Maintenant, il faut juste trouver chez qui est ce stage.
En revérifiant les sous-domaines liés au site de la Veda, on en trouve un que l'on n'a pas encore exploité : git.vedamedicaldataschool.eu
![[M3_EMA_EPD_DNS.png|500]]

On a de la chance, ce Gitea est public, on parvient donc à retrouver le compte de Thimothé.
![[M3_EMA_EPD_GITEA.png|500]]
On arrive donc à trouver le lieu du stage en se baladant un peu dans ses REPOS : Labaurence.
![[M3_EMA_EPD_GITEA2.png|500]]

On va donc essayer de creuser un peu plus via leur site : hxxps://labaurence.fr
![[M3_EMA_EPD_LAB.png|500]]
Le footer de leur site nous apprend leur nom officiel : **==Labaurence SELAS.==**

Il existe même un site spécifique pour ce projet de stage : hxxps://datalake.labaurence.fr.
On y apprend que c'est une plateforme de donnees de sante anonymisees qui permettrait de montrer l'étendu des analyses possibles et les méthodes utilisées.

>Vous reposez votre café. Limoges. Encore Limoges.

---
***Les autres parties du CTF :***
 · | · [[Here we go again]]
 · | · [[Voyage Voyage]]
 · | · [[Money For Nothing]]
 · | · Ecole du micro d argent
 · | · [[Antisocial]]
 · | · [[Hygiaphone]]
 · | · [[Ya foye]]
 · | · [[Family Affair]]