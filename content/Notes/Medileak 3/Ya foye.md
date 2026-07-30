---
tags:
  - Osint
  - Medileak3
  - Chall
---

>Y'a pas à dire ! On est bien tous ensemble non ?
![[content/Notes/Medileak 3/Ya foye/M3_YF.png]]

***Les autres parties du CTF :***
 · | · [[Here we go again]]
 · | · [[Voyage Voyage]]
 · | · [[Money For Nothing]]
 · | · [[Ecole du micro d argent]]
 · | · [[Antisocial]]
 · | · [[Hygiaphone]]
 · | · Ya foye
 · | · [[Family Affair]]

---
## Under Pressure

### Énoncé [1/3]
>Vous cherchez le document évoqué par Cynthia. Henri-Pierre Girolles y a publié une résolution faisant capoter le projet d'implantation de la Veda Medical Data School à Limoges !
>
>À la lecture, le montage financier devient lisible : l'école devait apporter **==XXxxx==** en fonds propres et un engagement de **==XXxxx==** via **==XXxxx==**.

### RETEX [1/3]

En lisant [le document lié](https://henripierregirolles.wordpress.com/2026/01/16/le-projet-de-campus-veda-abandonne-une-bonne-nouvelle-ou-presque/) au projet partagé par H-P.G, on peut retrouver les sommes qui aurait dû être versé si le projet avait été accepté.
![[content/Notes/Medileak 3/projet_resolution_2025-12-15.pdf]]
L'école devait donc apporter **==1 850 00 euros==** en fonds propres et un engagement de **==6 200 000 euros==** via **==STAVROS & LYNCH PARTNERS LTD==**.
![[content/Notes/Medileak 3/Ya foye/M3_YF_UP1.png|500]]

### Énoncé [2/3]
>Ils s'appuient sur une structure luxembourgeoise identifiée comme étant **==XXxxx==**.

### RETEX [2/3]
On avait vu précédemment que STAVROS & LYNCH PARTNERS LTD était lié à **==LIMOUSIN HOLDING SA==** par l'intermédiare de Crédit Briance & Vienne.
![[content/Notes/Medileak 3/Ya foye/M3_YF_UP2.png]]
Et le projet de la Veda nous le prouve encore via le document que nous a fourni H-P.G.
### Énoncé [3/3]
>Mais le plus intéressant reste à venir, vous tombez sur une opération qui vous donne plus d'infos sur une personne que vous pensiez être une victime depuis le début : **==XXxxx==**, de STAVROS & LYNCH PARTNERS LTD, a fait **==XXxxx==** à **==XXxxx==** portant sur **==XXxxx==** de la **==XXxxx==**, située à **==XXxxx==**
>… Vous comprenez peut-être mieux certaines allusions.

### RETEX [3/3]
La seule personne intéressante venant de [STAVROS & LYNCH PARTNERS LTD](https://stavroslynch.com) c'est **==Despina KYPARISSIDOU==**.
![[Ya foyeaaa-1.png|500]]
Et en cherchant un peu ses activités, on découvre qu'elle a fait **==une donation==** de parts entre vivant via la société **==SCI Nicosian Holding==**.
![[content/Notes/Medileak 3/Ya foye/M3_YF_UP3.png|500]]
On apprend en lisant le document, que la donataire est **==Gizem Ihanet==**, la fille de Despina Kyparissidou, et que la donation porte sur **==20 parts==**.
![[content/Notes/Medileak 3/Ya foye/M3_YF_UP4.png|500]]

On apprend aussi, que la mère, la fille et le siège social réside **==chez le rat — 87920 CONDAT-SUR-VIENNE==**.
![[content/Notes/Medileak 3/Ya foye/M3_YF_UP5.png|500]]

---
##  Gold Digger

### Énoncé [1/2]
>Vous repartez sur les registres. Et là, surprise : la filiale évoquée plus haut porteuse du projet d'école dirige également **==XXxxx==**.

### RETEX [1/2]
On l'avait déjà trouvé depuis longtemps : **==Crédit Briance & Vienne==**.
![[content/Notes/Medileak 3/Ya foye/M3_YF_UP2.png|500]]

### Énoncé [2/2]
>Une banque locale, à l'ancienne, avec son site internet à l'adresse **==XXxxx==**.

### RETEX [2/2]
Pareil : **==hxxps://briancevienne.fr==**
![[content/Notes/Medileak 3/Ya foye/M3_YF_GD.png|500]]

---
## Around the World

### Énoncé [1/6]
>Reste à comprendre ce que vient faire Labaurence dans cette galaxie.
>
>Quelques requêtes plus tard, vous identifiez un site de données qui leur appartient : **==XXxxx==**.

### RETEX [1/6]
On l'avait déjà trouvé dans la partie `Ecole du Micro D'argent`, le site est :  **==hxxps://datalake.labaurence.fr==**
![[content/Notes/Medileak 3/Ya foye/M3_YF_AW.png|500]]

### Énoncé [2/6]
>Les données sont anonymisées. C'est la moindre des choses pour un datalake de recherche orienté santé.
>
>Sauf qu'en ouvrant le fichier au format **==XXxxx==**, un détail vous saute aux yeux.
>
>En croisant avec **==XXxxx==**, l'anonymisation tombe comme un château de cartes : on parvient à retrouver qui se cache **derrière chaque ligne de données** !
>
>>**NDLR :** _Spammer une API n'est pas considéré comme une méthode valable, et conduira à un ban immédiat_

### RETEX [2/6]

Si on essaie de télécharger le dataset via l'option sur le site, on obtient un fichier au format **==parquet==**, qui est idéal pour stocker et gérer une grande quantité de données.
![[content/Notes/Medileak 3/Familly Affair/M3_YF_AW2.png|500]]
En analysant le fichier, je me suis aperçu que beaucoup trop d'informations était accessible via l'entête.
En effet, l'entête comporte (liste non exhaustive) : code_barre, date_analyse, code_labo, nom_labo, age_patient et sexe.
On peut donc techniquement retrouver quelqu'un qui a fait une analyse dans un certain labo via son âge au moment de l'analyse, son sexe, l'emplacement du labo (puisque les gens ont tendance à aller au plus proche de leur logement). En croisant toutes ces infos, on a typiquement le genre d'info que l'on a sur une liste électorale : nom, sexe, age, logement... La seule différenc, c'est qu'ils ne sont pas clairement nommés dans le fichier.

### Énoncé [3/6]
>Démonstration : `PAN00120231031bd7e8d30bd0a56ff8` correspond en clair à **==XXxxx==**, qui habite à **==XXxxx==**.
>
>Le système est purement et simplement **corrompu**.

### RETEX [3/6]
On se rappelle que Tim avait travaillé sur ce projet et les fichiers sont sur Gitea.
![[content/Notes/Medileak 3/Ya foye/M3_YF_AW3.png|500]]
Le script `anonymize.py` génère le code barre, en voici un extrait :

```
Module d'anonymisation des prélèvements.

Génère le code-barre apposé sur les tubes d'analyse. Le code-barre conserve une partie métier en clair (labo, date) pour permettre le tri et l'archivage, et une partie identitaire chiffrée via HMAC-SHA256.

Format du code-barre (31 caractères) :

LLLLLLDDDDDDDDHHHHHHHHHHHHHHHHC
└────┘└──────┘└──────────────┘
labo date hash patient └─ checksum Luhn
(6 c.) (8 c.) (16 c.) (1 c.)

Le hash patient = HMAC-SHA256(secret_key, normalisée(nom|prénom|ddn|insee|labo))
tronqué aux 16 premiers caractères hexadécimaux (64 bits).

Le hash dépend du code labo : un même patient analysé dans 2 labos différents aura 2 hash distincts. C'est volontaire pour éviter le pivot trivial inter-labos.

La clé secrète est lue depuis `secret.key` (256 bits hexadécimaux).
```

On a donc cette forme pour le code-barres : `LABO(6 caracteres) + DATE(8 caracteres) + HASH(16 caracteres) + CHECKSUM(1 caractere)` donc d'après l'énoncé `PAN001 20231031 bd7e8d30bd0a56ff 8`

Ça veut donc dire : 
- PAN001 = labo donc LAB-PAN-001
- 20231031 = date du prelevement, donc 31/10/2023 
- bd7e8d30bd0a56ff   = hash patient à retrouver pour avoir le nom, prénom
- 8  = chiffre de controle

Pour recalculer le hash patient, on a besoin de la secret.key. En regardant l'historique du projet sur Gitea, on voit une maj ou une clé de test est retiré...
![[content/Notes/Medileak 3/Ya foye/M3_YF_AW4.png|500]]
Et coup de bol, c'est notre secret.key.
![[content/Notes/Medileak 3/Ya foye/M3_YF_AW5.png|500]]
Elle vaut `801423438c04143903c48e7a3b8ed0a04dedd58bee66323a86255dbdd53284d2`
Cette clé permet de recalculer les hash des personnes de la liste électorale.

Il faut donc normaliser toutes nos données des femmes avec l'âge correspondant à `PAN00120231031bd7e8d30bd0a56ff8` (pour gagner du temps) sous la forme : `INITIALE_NOM|PRENOM|DATE_NAISSANCE|CODE_COMMUNE|CODE_LABO` et ça pour chaque dame.

On obtient donc un message à tester par personne, prenom celui-là par exemple : `M|AURORE|19491220|87085|LAB-PAN-001`, on calcule son hash via : 
```python
printf '%s' 'M|AURORE|19491220|87085|LAB-PAN-001' \ | openssl dgst -sha256 -mac HMAC \   -macopt hexkey:801423438c04143903c48e7a3b8ed0a04dedd58bee66323a86255dbdd53284d2
```
ce qui nous donne `bd7e8d30bd0a56ff5a4ebd727b20c8ed95df8ae581b5687bcfd96717628e77d2`, en ne gardant que les 16 premiers caractères : `bd7e8d30bd0a56ff`
C'est exactement le hash dans le code-barres :  `PAN00120231031bd7e8d30bd0a56ff8`

On sait donc maintenant que **==MARION Aurore==**, née le 20/12/1949, qui habite 120 RUE ERNEST MEISSONIER 87000 **==LIMOGES==** correspond à `PAN00120231031bd7e8d30bd0a56ff8`

### Énoncé [4/6]
>Sacré Tim, pas vraiment un boss... Soit Monsieur **==XXxxx==**, son prof, est mauvais, soit il a mal noté les cours, mais il a oublié d'utiliser le package **==XXxxx==** (en se fiant aux dernières meilleures pratiques) pour supprimer le fichier **==XXxxx==**... Permettant de casser la pseudonymisation.

### RETEX [4/6]
On a déjà vu qu'un des profs de Tim est M. **==Lemourat==** et que le fichier qui permet de casser la pseudonymisation c'est **==secret.key==**.
![[content/Notes/Medileak 3/Ya foye/M3_YF_AW6.png|500]]
On peut même le retrouver dans une note de cours.
![[content/Notes/Medileak 3/Ya foye/M3_YF_AW7.png|500]]
Il a donc oublié d'utiliser le package **==git-filter-repo==** pour supprimer la secret.key.

### Énoncé [5/6]
>Le laboratoire et la banque seraient donc liés ? Sur le papier, rien ne les rapproche officiellement.
>
>Il faut une preuve matérielle.
>
>Ça tombe bien : ils ont oublié de vider la **==XXxxx==**. A cheval donné on ne regarde pas l'odeur des dents, ou quelque chose comme ça.

### RETEX [5/6]

En utilisant la fonction d'exploration, on peut se rendre au siège de la banque Crédit Briance et Vienne.
![[content/Notes/Medileak 3/Familly Affair/M3_YF_AW8.png|500]]
On peut donc voir la banque et les hommes en costards devant.
![[content/Notes/Medileak 3/Familly Affair/M3_YF_AW9.png|500]]
En cliquant sur la **==poubelle==** on peut récupérer un des documents sortis d'une déchiqueteuse.
![[content/Notes/Medileak 3/Familly Affair/M3_YF_AW10.png]]
Au final, une déchiqueteuse, c'est juste une usine à puzzle...
Avec un peu de temps on peut facilement reconstruire les documents.
![[content/Notes/Medileak 3/Ya foye/M3_YF_AW11.png|500]]
Si besoin, voici [un lien](https://excalidraw.com/#json=rs4aYuKa848spR7UHs_D5,W6aIqoUS3hJ7J0YPKNdC8A) vers le document complet recomposé.


### Énoncé [6/6]
>Sur le document référencé **==XXxxx==**, que vous avez exhumé et reconstitué avec un certain héroïsme, le coût total du crédit accordé au Labaurence s'élève à **==XXxxx==**.

### RETEX [6/6]
On a donc le document référencé **==CBV/PRO/2026-03147==** qui présente un crédit de **==14 402,88 €==** accordé au Labaurence.

---
## I Can See Clearly Now

### Énoncé [1/4]
>Le lien entre S&L, Limousin Holding, le labo et toute la clique est désormais établi.
>Mais quelle contrepartie la banque obtient-elle en échange de sa précieuse collaboration avec le labo ?
>
>Bonne question, n'est-ce pas ?
>Vous y revenez. Et si Henri-Pierre était lui aussi une victime collatérale dans cette histoire ?
>
>En épluchant les flux applicatifs côté banque, vous comprenez le mécanisme. Lorsqu'un habitant du département effectue une **==XXxxx==**, la banque utilise des informations auxquelles elle ne devrait pas avoir accès. Un scoring est même établi à partir de l'URL **==XXxxx==**.

### RETEX [1/4]
Lorsque l'on essaie de faire une **==simulation de prêt==** sur le site de la banque Crédit Briance & Vienne, un scoring est établi à partir de l **==https://briancevienne.fr/api/v1/score==**
![[content/Notes/Medileak 3/Ya foye/M3_YF_ICS1.png|500]]
On peut s'en apercevoir en regardant le code source de la page de simulation de prêt.
![[content/Notes/Medileak 3/Ya foye/M3_YF_ICS2.png|500]]

### Énoncé [2/4]
>À la lecture des données de notre lanceur d'alerte, il semble en parfaite santé… Mais souvenons-nous du stagiaire.
>
>Lui aussi a laissé des traces. Vous remontez ses dépôts : il a développé des éléments stockés sur **==XXxxx==**. On y repère un **==XXxxx==** récent, identifié par le hash **==XXxxx==**, portant sur le fichier **==XXxxx==**.
>
>Et tout ça, à la demande de **==XXxxx==**.

### RETEX [2/4]
On s'en était déjà aperçu dans la partie `Ecole du micro d'Argent`.
![[content/Notes/Medileak 3/Ecole du micro d argent/M3_EMA_EPD_GITEA2.png|500]]
Sur le Gitea : **==hxxps://git.vedamedicaldataschool.eu==**, plus précisément sur le repos `lab-data-pipeline` on peut voir en dernier **==commit==** affectant **==data/resultats_labo.csv==** une correction de valeur a la demande de **==Raoul Reidid==**. On peut identifier le commit via le hash **==1815b2ea38a873d04a1e1a8699b374dd5fc1eb75==** (dispo dans l'URL).
![[content/Notes/Medileak 3/Ya foye/M3_YF_ICS3.png|500]]
Les données de H-P.G ont donc bien été modifiés, ce qui explique toutes ses craintes qu'il avait exprimées sur [son site](https://henripierregirolles.wordpress.com/2025/09/23/une-etrange-mention-sur-mon-compte-rendu-de-prise-de-sang/).

### Énoncé [3/4]
>Il est donc en danger. Surtout qu'il a été conseillé par le **==XXxxx==** de **==XXxxx==** pour commander des traitements sur **==XXxxx==**, comme il l'indique sur cette page **==XXxxx==**. Il semble beaucoup apprécier les gélules **==XXxxx==** et le **==XXxxx==**

### RETEX [3/4]
Je ne l'ai pas souvent précisé, mais un bon réflexe lorsque l'on découvre un site, c'est de vérifier les sous-domaines associés et vérifier aussi le `robots.txt`'(s'il existe), lorsque l'[on le fait](https://henripierregirolles.wordpress.com/robots.txt) avec le WordPress de H-P.G, on peut trouver la sitemap de son site.
![[content/Notes/Medileak 3/Ya foye/M3_YF_ICS4.png|500]]
Et lorsqu'on l'analyse, on peut trouver des pages qui sont un peu moins référencer sur son site, et donc plus dur à trouver lorsque l'on ne connait pas leur existence, comme la page **==hxxps://henripierregirolles.wordpress.com/ma-sante/==**.
![[content/Notes/Medileak 3/Ya foye/M3_YF_ICS5.png|500]]
Sur cette page, il explique qu'il a rencontré un **==stagiaire==** de **==Labaurence==** qui lui a conseillé de commander des traitements révolutionnaires sur **==medideal24.eu==**, et que ça l'aidera beaucoup pour ses problèmes de santé...
![[content/Notes/Medileak 3/Ya foye/M3_YF_ICS6.png|500]]

On peut trouver des commentaires de H-P.G sur 2 articles de la boutique, probablement les seuls qu'il a achetés.
Sur [SomniHerb](https://medideal24.eu/product/somniherb-organic-evening-blend-30-sachets/) : 
![[content/Notes/Medileak 3/Ya foye/M3_YF_ICS7.png|500]]

Et sur [GlycoNatur](https://medideal24.eu/product/glyconatur-blood-sugar-balance-60-caps/) :
![[content/Notes/Medileak 3/Ya foye/M3_YF_ICS8.png|500]]

### Énoncé [4/4]
>Pourtant, après ce qui est arrivé en 2024 à sa **==XXxxx==** **==XXxxx==**, on aurait pu croire qu'il serait plus prudent…
>
### RETEX [4/4]
L'arnaque dans laquelle H-P.G est tombé nous rappel fortement ce qui est arrivé à **==sa belle sœur==** **==Christine Daguerran==**, il en avait parlé dans [un article sur son site](https://henripierregirolles.wordpress.com/2024/10/10/ce-que-ma-belle-soeur-a-vecu-cette-annee-et-pourquoi-je-ne-peux-pas-me-taire/)
![[content/Notes/Medileak 3/Ya foye/M3_YF_ICS9.png|500]]
C'est à n'y rien comprendre, lui pourtant si attentionné sur tout ce qui touche ses données, il n'a pas réussi à voir que Raoul était visible sur une photo dans la page de présentation de la photo... Ce même Raoul qui avait arnaqué sa belle sœur.

---
***Les autres parties du CTF :***
 · | · [[Here we go again]]
 · | · [[Voyage Voyage]]
 · | · [[Money For Nothing]]
 · | · [[Ecole du micro d argent]]
 · | · [[Antisocial]]
 · | · [[Hygiaphone]]
 · | · Ya foye
 · | · [[Family Affair]]