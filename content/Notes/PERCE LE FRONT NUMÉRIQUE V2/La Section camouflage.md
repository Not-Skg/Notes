---
title: La Section camouflage
tags:
  - Osint
  - Chall
  - PerceLeFrontNumeriqueV2
order: 4
description: RETEX des challenges de la partie "La Section camouflage" du CTF Perce le Front Numérique V2
---
![[PLFNV2_WP.jpg]]

>[!info] Notes
> Voici les retex des challs liés à la partie "La Section camouflage" du CTF Perce le Front Numérique V2.

***Les différentes parties du CTF :***
 · | · [[Learning Track]]
 · | · [[Les monuments militaires français]]
 · | · La Section camouflage
 · | · [[Les femmes dans les armées]]
 · | · [[Track Bonus - Le 14 Juillet]]


---
## Sur les traces de Louis Guingot

### Énoncé 
>Louis Guingot est un peintre français connu pour avoir développé, dès 1915, un système de camouflage innovant destiné à réduire la visibilité des soldats français sur le front ouest. 
>
>Son travail s’inscrit dans les premières formes de camouflage militaire moderne. 
>
>>Quelle est l’adresse du lieu de travail de Louis Guingot ?
>
>_Format du flag :  `1 boulevard Montmartre Paris`_

### RETEX
On commence tout simplement par [la page Wikipédia de Louis Guingot](https://fr.wikipedia.org/wiki/Louis_Guingot). On y apprend qu'il s'installe à Nancy et qu'il y fait construire sa villa, La Chaumière, rue d'Auxonne.
![[PLFNV2_SC_LG_W1.png|500]]
Il manque le numéro de rue. En cherchant `La Chaumière rue d'Auxonne Nancy`, on tombe sur [une notice de la base Mérimée](https://pop.culture.gouv.fr/notice/merimee/IA54000024) intitulée « Maison d'artiste dite la Chaumière », qui donne l'adresse : 10 rue d'Auxonne.
![[PLFNV2_SC_LG_POP.png|500]]
On a donc tenté `10 rue d'Auxonne Nancy`... et c'était faux. On ne s'était pas rendu compte qu'il s'agissait de sa **maison**, alors que l'énoncé demande son **lieu de travail**.

Pour aller plus loin, on retourne sur Wikipédia et on regarde les sources de l'article. La source n°2, celle qui est citée pour le passage sur La Chaumière, est une biographie écrite par Albert Conte sur le site de la commune de Lay-Saint-Christophe.
![[PLFNV2_SC_LG_W2.png|500]]
Sur [cette page](https://www.lay-saint-christophe.fr/histoire/personnalites-de-lay-saint-christophe/louis-guingot/), on apprend que la maison se trouvait au départ au n°8 bis, l'actuel n°10.
![[PLFNV2_SC_LG_LSC.png|500]]
Un peu plus bas, une publicité d'époque pour ses travaux de décoration donne l'adresse de ses ateliers :
![[PLFNV2_SC_LG_PUB.png|400]]
Ses ateliers se trouvaient donc au **==8 rue d'Auxonne Nancy==**, juste à côté de sa maison.

Moralité : bien lire la question, une maison-atelier et des ateliers ne sont pas forcément à la même adresse.

---
## Le camouflage au service de la discrétion

### Énoncé 
>En 1915, la Section de camouflage a pour objectif de cacher les hommes, les matériels et les positions à l’œil ennemi. 
>
>De nos jours, certains ont fait de la discrétion, de l’infiltration et de l’observation clandestine un cœur de métier essentiel pour mener à bien des opérations, obtenir du renseignement, identifier et localiser une cible prioritaire. 
>
>Ces hommes et femmes sont de véritables fantômes surnommés « les soldats de l’ombre ». Leur spécialité consiste à s’infiltrer en profondeur derrière les lignes ennemies pour recueillir et transmettre du renseignement via des interventions spéciales. Les renseignements stratégiques qu’ils collectent ont un impact immédiat sur les opérations militaires menées.
>
>>Quel est le nom de ce régiment ? 
>>De quel métier s’agit-il ? 
>
>_Format du flag :  `01e nom du régiment - nom du métier`_

### RETEX
En reprenant les mots-clés de l'énoncé, et en gardant le surnom entre guillemets : `régiment "soldats de l'ombre" infiltration renseignement derrière les lignes ennemies`.
![[PLFNV2_SC_CSD_G.png|500]]
Deux résultats ressortent et parlent du même régiment : le 13e régiment de dragons parachutistes (13e RDP). Le premier le décrit comme un régiment de « Recherche Aéroportée » servi par des soldats de l'ombre, et le second, [un sujet de forum](https://chemin-memoire-para.superforum.fr/t516-13e-rdp-les-soldats-de-lombre), s'intitule carrément « 13e RDP, les soldats de l'ombre ».

Pour le métier, c'est une autre histoire. Selon les sources, même officielles, on trouve plein d'appellations différentes. [La page du 13e RDP sur le site du Ministère des Armées](https://www.defense.gouv.fr/terre/unites-larmee-terre/nos-brigades/commandement-actions-speciales-terre/13e-regiment-dragons-parachutistes) parle de « Spécialiste en recherche aéroportée » :
![[PLFNV2_SC_CSD_DG.png|500]]
[Defense Zone](https://defense-zone.com/blogs/news/formation-equipiers-recherche-13e-rdp) parle plutôt « d'équipiers de recherche » :
![[PLFNV2_SC_CSD_DZ.png|500]]
Et un livre précise qu'au 13e RDP, on parle simplement « d'équipiers » :
![[PLFNV2_SC_CSD_P.png|500]]
On a donc tenté `13e régiment de dragons parachutistes - équipier recherche`, mais c'était faux.

La bonne source était en fait le site de recrutement de l'armée de Terre [sengager.fr](https://www.sengager.fr/tous-nos-postes/combattant-forces-speciales). La description du poste reprend presque mot pour mot l'énoncé :
![[PLFNV2_SC_CSD_SE1.png|500]]
Et plus bas, on voit que ce poste s'exerce justement au 13e RDP :
![[PLFNV2_SC_CSD_SE2.png|500]]
C'est bien cette appellation officielle qui était attendue : **==13e régiment de dragons parachutistes - combattant forces spéciales==**.

Quand l'énoncé ressemble à une fiche de poste, le mieux est de chercher directement sur les sites de recrutement officiels.

---
## Un objet bien étrange

### Énoncé 
>En 1916, durant la Première Guerre mondiale, l’armée française met en place une section spécialisée dans le camouflage afin de dissimuler hommes et matériels sur le front. 
>Cette unité, composée notamment d’artistes et de peintres, joue un rôle essentiel dans l’adaptation des techniques militaires aux contraintes du terrain. 
>Au sein de cette section, les membres décident d’offrir un objet particulier à l’officier qui la dirige, témoignant de leur esprit de corps et de leur engagement dans cette nouvelle forme de guerre. 
>
>>Quelle est la longueur exacte de cet objet ?
>
>_Format du flag :  `0,12m`_

### RETEX
L'officier qui dirige la section de camouflage en 1916, c'est Lucien-Victor Guirand de Scévola, qu'on a déjà croisé dans le challenge `Camouflage` du [[Learning Track]].

En cherchant `objet offert Guirand de Scévola section camouflage 1916`, on tombe sur [une fiche Google Arts & Culture](https://artsandculture.google.com/asset/rwFCEAdI2b_pZA?hl=fr) d'un objet conservé au Musée de l'Armée : un sabre d'officier d'artillerie unique.
![[PLFNV2_SC_OBE_S.png|250]]
La description confirme qu'il a été offert par la section à son chef :
![[PLFNV2_SC_OBE_GA1.png|500]]
La poignée en bronze représente un tronc d'arbre avec un caméléon, le symbole de la section de camouflage.

Dans les détails de la fiche, on trouve sa longueur exacte : **==1,07m==**.
![[PLFNV2_SC_OBE_GA.png|500]]

---
## À la recherche des ateliers de camouflage

### Énoncé 
>Pendant la Première Guerre mondiale, la section de camouflage de l’armée française regroupe des profils atypiques, issus du monde artistique et architectural. 
>
>Un individu né en 1867 rejoint cette section en 1915 et se voit confier la direction de plusieurs ateliers de camouflage. Ces derniers jouent un rôle clé dans la conception et la mise en œuvre des techniques de dissimulation utilisées sur le front. 
>
>>Quels sont les noms des ateliers de camouflage dirigés par cet individu au sein de la section de camouflage pendant la Première Guerre mondiale ? 
>
>_Format du flag :  `Océan et Oiseau-de-feu`_

### RETEX
L'énoncé insiste sur les profils issus du monde **artistique et architectural**, et donne une date de naissance précise. On a donc cherché un architecte né en 1867 dans des archives, avec la recherche `"section de camouflage" architecte 1867 archives`.
![[PLFNV2_SC_ARC_G.png|500]]
Le premier résultat est une notice de [FranceArchives](https://francearchives.gouv.fr/facomponent/b846f93000e6eeb321b5e22b577d5a5e3d7e5d7d), le portail national des archives, intitulée « Guerre de 1914-1918 : activités à la section de camouflage ». Elle concerne un certain Ernest Gaston (1867-1949), architecte, affecté à la section camouflage.
![[PLFNV2_SC_ARC_FA2.png|500]]
FranceArchives ne fait que référencer la notice. Le bouton « Voir sur le site d'origine » nous renvoie vers [la notice complète sur Archiwebture](https://archiwebture.citedelarchitecture.fr/ark:/43435/934595), la base d'archives de la Cité de l'architecture et du patrimoine.
![[PLFNV2_SC_ARC_AW.png|500]]
Tout colle : né en 1867, il demande en avril 1915 à rejoindre le Génie, il est affecté au service du camouflage, et il dirige plusieurs ateliers de fabrication de matériels : **==Chantilly et Juvisy-sur-Orge==**.

---
## Réseaux d’après-guerre

### Énoncé 
>Décoré en même temps que Lucien-Victor Guirand de Scévola, un autre peintre évolue, après la Première Guerre mondiale, à la croisée des milieux artistiques, militaires et mondains. Ancien membre de la Section de camouflage, il est nommé inspecteur général en 1915 et reçoit plusieurs distinctions au cours de sa carrière. Il décède le 11 juillet 1931. Le signataire de son acte de décès se retrouve, quelques années plus tard, lié à un mariage célébré un 8 novembre attirant l'attention des cercles mondains. 
>
>Cet événement relie plusieurs familles impliquées dans la Première Guerre mondiale et fait réapparaître certains noms déjà rencontrés dans les distinctions, documents administratifs ou relations sociales jalonnant le parcours de ce peintre. 
>
>>Quelles décorations le peintre en question a-t-il reçues ? 
>>De quel homme le signataire de son acte de décès a-t-il officié le mariage ? 
>
>_Format du flag :  `décoration1 et décoration2 - Prénom Nom`_

### RETEX
Pour identifier le peintre, on reprend les éléments les plus précis de l'énoncé : `peintre "section de camouflage" "inspecteur général" 1915`.
![[PLFNV2_SC_RAG_G.png|500]]
Les deux premiers résultats parlent de Jean-Louis Forain : une thèse intitulée « Jean-Louis Forain et la guerre de 1914-1918 », dont l'extrait indique qu'il est nommé inspecteur général de la section de camouflage en août 1915, et [un article du blog 87dit](https://87dit.canalblog.com/archives/2017/03/21/35076076.html) sur les artistes camoufleurs.

Sur cet article, on trouve une photo d'une remise de décorations à l'atelier d'Amiens, le 14 avril 1916, avec Guirand de Scévola, Jean-Louis Forain et Abel Truchet. C'est bien le peintre « décoré en même temps que Lucien-Victor Guirand de Scévola » :
![[PLFNV2_SC_RAG_D.png|400]]
Un peu plus bas, l'article lui consacre une courte biographie, qui nous donne déjà ses décorations :
![[PLFNV2_SC_RAG_D2.png|500]]

On vérifie la date de décès sur [sa page Wikipédia](https://fr.wikipedia.org/wiki/Jean-Louis_Forain), qui confirme aussi son rôle d'inspecteur général :
![[PLFNV2_SC_RAG_W.png|500]]
Surtout, elle nous donne le lieu exact de son décès : son domicile du 30 bis rue Spontini, dans le 16e arrondissement de Paris.
![[PLFNV2_SC_RAG_W2.png|500]]

Avec la date et l'arrondissement, on peut retrouver son acte de décès sur [le site des Archives de Paris](https://archives.paris.fr/archives-numerisees/etat-civil-de-paris/etat-civil-a-partir-de-1860/consulter-les-actes-detat-civil). Dans l'état civil, on choisit les actes de décès du 16e arrondissement pour l'année 1931, puis on parcourt le registre jusqu'au 11 juillet. C'est l'acte n°1371, dressé le 12 juillet :
![[PLFNV2_SC_RAG_AD.png]]
L'acte confirme ses deux décorations, **==croix de guerre et légion d'honneur==** (il était Commandeur de la Légion d'honneur), et nous donne le nom du signataire : Daniel Marin, adjoint au maire du 16e arrondissement.

Il faut maintenant trouver quel mariage Daniel Marin a célébré un 8 novembre. On cherche simplement les deux éléments entre guillemets : `"Daniel MARIN" "8 novembre"`.
![[PLFNV2_SC_RAG_GG.png|500]]
Le premier résultat est [une fiche Geneanet](https://gw.geneanet.org/ttiber4983?lang=fr&n=de+dampierre&p=roger), dont l'extrait mentionne à la fois le 8 novembre 1937 et Daniel Marin, adjoint au maire du 16e. Sur la fiche, on voit qu'il était l'officier d'état civil du mariage de Roger de Dampierre, vicomte de Dampierre et 2e duc de San Lorenzo, avec Raymonde Dreyfus.
![[PLFNV2_SC_RAG_GN.png|400]]
L'homme dont il a officié le mariage est donc **==Roger de Dampierre==**.

---
## Une planification herculéenne

### Énoncé 
>![[PLFNV2_SC_PH_E.jpg]]
>Au fil du temps, les armées comprennent qu’il ne suffit pas de cacher les hommes, les canons ou les véhicules. Il peut être encore plus efficace de montrer à l’ennemi quelque chose qui n’existe pas. 
>
>Cet homme a joué un rôle majeur en contribuant à la réalisation de l’un des plus grands subterfuges de la Seconde Guerre mondiale, qui a permis de détourner l’attention de l’une des opérations les plus spectaculaires de tous les temps, menée par les Alliés. 
>
>>Quel est le nom de ce subterfuge ? 
>>Combien de temps ont duré les bombardements ?
>
>_Format du flag :  `nom subterfuge - 2 mois`_

### RETEX
On commence par une recherche par image inversée de la photo de l'énoncé avec Google Lens.
![[PLFNV2_SC_PH_GL.png|500]]
Le premier résultat des correspondances visuelles est exactement notre image : c'est Joan Pujol García, plus connu sous son nom de code « Garbo ». Cet agent double espagnol a joué un rôle clé pour faire croire aux Allemands que le débarquement aurait lieu dans le Pas-de-Calais et non en Normandie. Le subterfuge, c'est donc l'opération Fortitude.

Pour la suite, le titre du challenge est un indice : il reprend le titre d'[un article du Ministère des Armées](https://www.defense.gouv.fr/actualites/debarquement-allie-du-6-juin-planification-herculeenne) sur la préparation du Débarquement.
![[PLFNV2_SC_PH_DT.png|500]]
Dans la partie « Opération Fortitude » de l'article, on apprend que l'aviation alliée a bombardé le nord-ouest de la France pendant les six semaines qui ont précédé le débarquement.
![[PLFNV2_SC_PH_DF.png|500]]
La réponse attendue était en semaines : **==opération fortitude - 6 semaines==**.

---
***Les différentes parties du CTF :***
 · | · [[Learning Track]]
 · | · [[Les monuments militaires français]]
 · | · La Section camouflage
 · | · [[Les femmes dans les armées]]
 · | · [[Track Bonus - Le 14 Juillet]]