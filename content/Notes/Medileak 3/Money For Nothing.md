---
tags:
  - Osint
  - Medileak3
  - Chall
---

>Pour sortir un album, il faut bien des finances...
![[content/Notes/Medileak 3/Money For Nothing/M3_MFN.png]]

***Les autres parties du CTF :***
 · | · [[Here we go again]]
 · | · [[Voyage Voyage]]
 · | · Money For Nothing
 · | · [[Ecole du micro d argent]]
 · | · [[Antisocial]]
 · | · [[Hygiaphone]]
 · | · [[Ya foye]]
 · | · [[Family Affair]]

---
 ## In da club

### Énoncé [1/2]
>Intéressons nous à notre chanteuse et sa présence en ligne. En grattant un peu, vous tombez sur un compte ouvert sur **==XXxxx==**, sous le pseudonyme **==XXxxx==**. Probablement pour partir à la pêche aux mécènes.

### RETEX [1/2]
On avais trouvé lors du challenge `Love me tender` de `Here we go again` les comptes lié au pseudo **==gizemreid==**. Et Ko-Fi en faisait parti.
![[content/Notes/Medileak 3/Here we go again/M3_Hwga_LmT_OnC.png|500]]
**==Ko-Fi==** est une plateforme qui propose de soutenir financièrement des personnes ou des groupes, comme la OZ par exemple. Et pour ce faire, on peut leur payer un café ou plutôt la somme nécessaire pour un café en terrasse a Paris Centre, soit 5$.

### Énoncé [2/2]
>Elle y sollicite des contributions pour financer son projet d'album. Rien que de très banal — sauf quand on regarde la liste des donateurs de plus près.
>
>Parmi eux, un certain **==XXxxx==** lui a versé **==XXxxx==**.
>
>Et ce pseudonyme-là, on l'a déjà croisé dans notre enquête. Le hasard, décidément, ne fait jamais bien les choses.

### RETEX [2/2]

![[content/Notes/Medileak 3/Money For Nothing/M3_MFN_IDC_KF.png|500]]
On peut voir qu'une seule personne a offert de l'argent à Gizem via Ko-FI, cette personne a offert 1 café soit **==5$==**.
![[content/Notes/Medileak 3/Money For Nothing/M3_MFN_IDC_KFT.png|500]]
Le compte qui lui a offert cet argent est **==couleraoul==** et la traduction du message rédigé en grec nous apprend qu'il serait son plus grand fan.
On a donc potentiellement un nouveau compte/pseudonyme a surveiller lié à Raoul Reidid.

---
##  Mon Amie La Rose
### Énoncé [1/2]
>Le financement de l'album, c'est touchant. Raoul, fidèle au poste, cinq dollars glissés en douce sur le compte Ko-fi de Gizem. On a connu des déclarations d'amour plus romantiques.
>
>Mais le voyage n'avait rien de sentimental.
>
>En recoupant avec l'étiquette du colis abandonnée dans le cottage avec les sentiers fréquentés par le couple, un schéma se dessine : la collecte de **==XXxxx==**, aux propriétés analgésiques, faisait partie intégrante de la mission. Visiblement, ses vieilles habitudes ont la vie dure.

### RETEX [1/2]
Ce challenge est un de ceux qui nous a posé le plus de problème.
On a commencé par retracer tous les déplacements de Raoul et Gizem, à localiser toutes les photos de Gizem sur son compte Instagram et chercher des [fleurs du coin](https://www.naturephotographie.com/portfolios/voyages/la-flore-sur-lile-de-skye/) reconnues pour avoir des propriétés analgésiques.
On hésitait donc énormément avec la Bruyère, mais on n'avait aucune preuve concrète de sa récolte par Raoul.
On a aussi essayé de pivoter sur le username couleraoul via des outils comme sherlock mais aucun site intéressant n'en ressortait.
Jusqu'à ce que l'un de nous se rappelle que OsintIsNotACrime analysait plus de site depuis le début du Medileak 3.
![[content/Notes/Medileak 3/Money For Nothing/M3_MFN_AR_ONC.png|500]]
Grace a cet outil, on a découvert le site Inaturalist, sur lequel de nombreuses personnes identifient et partage de nombreuses espèces de faunes et de flores. Dont un certain [couleraoul](https://www.inaturalist.org/people/couleraoul), qui a contribué à l'observation de 2 espèces sur l'île de Skye.
![[content/Notes/Medileak 3/Money For Nothing/M3_MFN_AR_IN.png|500]]
Les [Callunes](https://www.inaturalist.org/taxa/119451), qui n'ont malheureusement pas les propriétés recherchées.
![[content/Notes/Medileak 3/Money For Nothing/M3_MFN_AR_C.png|500]]
Et la [Achillée Millefeuille](https://www.inaturalist.org/taxa/52821) qui elle a les propriété que l'on recherche.
![[content/Notes/Medileak 3/Money For Nothing/M3_MFN_AR_MF.png|500]]
Raoul a donc profité de son escapade à Flodigarry pour récolter des **==Achillées Millefeuille==**.

### Énoncé [2/2]
>Des spécimens qui apportent la "clairvoyance", et qui n'intéressent pas grand monde — sauf peut-être **==XXxxx==**, dont le site se trouve à l'adresse **==XXxxx==** et dont les activités sont basées en **==XXxxx==**.

### RETEX [2/2]
On a pu voir sur le screen ci-dessus que les Achillées observées par Raoul sont étiquetées **==Medideal24==**. Et pour rappel, c'est le nom de la société sur le certificat de livraison de colis trouvé dans la poubelle lors de la partie `Voyage Voyage`.
En recherchant tout simplement `medideal24` sur Google, on peut trouver le site **==hxxps://medideal24.eu==** qui nous en apprends plus sur leur activités et sur leur localisation.
![[content/Notes/Medileak 3/Money For Nothing/M3_MFN_AR_MDD.png|500]]
Ils sont donc basés à Ljubljana en **==Slovénie==**.

---
##  Magnolia For Ever
### Énoncé [1/2]
>Et voilà. Raoul n'est jamais bien loin d'une belle affaire.
>
>Vous remontez la piste professionnelle. Depuis sa "disparition", il a vite retrouvé chaussure à son pied : il occupe désormais le poste de "**==XXxxx XXxxx XXxxx==**" au sein d'une société fondée par **==XXxxx XXxxx==**.

### RETEX [1/3]
En allant sur la page "About us" du site, on peut retrouver une photo de groupe des gens derrière Medideal24, et sur cette photo, on peut retrouver notre cher Raoul Reidid à présent sous le poste de **==Senior Herbal Advisor==**
![[content/Notes/Medileak 3/Money For Nothing/M3_MFN_MFE_PC.png|500]]
Société fondée par la personne à sa droite : **==Ludvik Ogrizek==**.

### Énoncé [2/3]
>Quelques croisements de profils plus tard, on identifie le point de contact d'origine. Les deux hommes se seraient connus à **==XXxxx XXxxx==** — une de ces coïncidences qui ne surprennent plus personne à ce stade de l'enquête.

### RETEX [2/3]
Pour ce challenge, il fallait lire le WU des premiers Medileak, on pouvait retrouver le CV de Raoul et le comparer à celui de Ludvikk.
![[content/Notes/Medileak 3/Money For Nothing/M3_MFN_MFE_LO.png|500]]
On y apprend donc qu'ils ont fréquenté en même temps l'**==Université internationale de Chypre==**.
Ils ont donc dû se rencontrer là-bas.

### Énoncé [3/3]
>Le fondateur ne s'arrête pas là. Il cumule avec une activité de **==XXxxx==** au sein de **==XXxxx XXxxx==**, dont le site est accessible à l'adresse ==XXxxx==.
>
>Une école. Un labo. Un pseudo-directeur médical au casier bien garni. Le tableau commence à prendre forme.

### RETEX [3/3]
Ludvik Ogrizek est aussi le **==Co-Fondateur==** de la **==Veda Medical Data School==**, accessible via le site **==hxxps://vedamedicaldataschool.eu==**.

---
***Les autres parties du CTF :***
 · | · [[Here we go again]]
 · | · [[Voyage Voyage]]
 · | · Money For Nothing
 · | · [[Ecole du micro d argent]]
 · | · [[Antisocial]]
 · | · [[Hygiaphone]]
 · | · [[Ya foye]]
 · | · [[Family Affair]]