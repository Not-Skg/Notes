---
tags:
  - Osint
  - LAF
  - Chall
  - casebandit
order: 9
---

## Éléments déjà découverts
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.
>Voici le graphique issu de la dernière partie : [[Chapitre 2 - Acte 2 - Activités]]

![[LAF_C2_A2_A.svg]]
Nous allons pouvoir nous appuyer dessus pour poursuivre nos recherches dans la suite du CTF.

Néanmoins, il faut noter que cette partie du CTF se débloquait en même temps que la partie [[Chapitre 2 - Acte 2 - Activités]]; nous devons donc partir du principe que le site into-tacs.shop vient tout juste d’être découvert.

---
## BONUS - Les fourberies du renard

### Énoncé
>Ce site vitrine vous permet de constater une infraction en lien avec leurs activités de dressage.
>
>>Quel est l'article de loi encore en vigueur qui définit et encadre la pratique pour laquelle Into-Tacs est en infraction ? Depuis quand le texte est-il en vigueur ? 
>
>_Format : `Article R221-13 du Code Pénal-01/05/2006`

### RETEX
Pour rappel, le site into-tacs.shop propose un service d’entraînement canin (mordant, détection, obéissance en milieu hostile).
![[LAF_C2_A2_DT_FR_SEM.png]]

On peut même en voir une sorte de vitrine dans la partie de présentation des services, accompagnée d’une image montrant un éducateur canin en tenue molletonnée se faisant mordre ou tirer par un chien. 
Le mordant doit être un service dont ils sont fiers, puisqu’ils le mettent en avant avec une image. 

On va donc chercher l’encadrement légal de cette pratique via la recherche :`loi entrainement au mordant`
D'après [legifrance.gouv.fr](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031281823), 
![[LAF_C2_A2_DT_FR_LEM.png]]
>Seuls les dresseurs détenant un certificat de capacité peuvent exercer l’activité de dressage des chiens au mordant et acquérir des objets et des matériels destinés à ce dressage. Source : **==Article L211-17 du Code rural et de la pêche maritime==**

D’ailleurs, ce texte est en vigueur depuis le **==01/01/2016==**.

Donc, si Into-Tacs veut être dans les règles, ils doivent posséder ce certificat. Chaque site possède une partie « mentions légales » pour diverses raisons réglementaires ; j’imagine que, s’ils avaient un certificat, ils l’exposeraient là-dessus.
![[LAF_C2_A2_DT_FR_ML.png]]
Le site possède bien une partie « Certificats » dans ses mentions légales, avec la mention du certificat de dressage au mordant, mais il y est indiqué `n°XX/XXX du XX/XX/XXXX`. 

Cela donne l’impression que le site n’est pas fini, ou qu’ils ne l’ont pas encore. 
En inspectant le code source de la page, on peut voir deux commentaires sous forme de todo-list : l’un indique qu’il faut finir le détail des mentions légales, et l’autre qu’il faut ajouter le certificat lorsqu’ils l’auront.

Ils exercent donc cette activité de manière illégale, puisqu’ils ne possèdent pas le certificat.

---
## Le loup déguisé

### Énoncé
>En plus de leurs liens avec l'enlèvement de Malo, ces individus ne respectent donc pas la loi. Mais pour que leur petite entreprise de dressage de chiens continue d'exister, ils doivent avoir un ami dans le domaine juridique.
>
>>Quelle est l'identité de cet ami ? 
>
>_Format : `Jacques Vergès`

### RETEX
On avait trouvé un peu plus tôt la mention d’un certain conseiller externe « Maître Artaux », qui était mentionné comme gérant de leurs problèmes légaux. 
Étant donné que cette fois-ci, on ne dispose que d’un nom, et que l’on n’a même pas de photo, il va falloir faire attention au lien entre le suspect et ce « Maître Artaux ». 
Ceux qui se font appeler Maître dans le milieu juridique sont souvent des avocats. On peut commencer nos recherches en épluchant les profils d’avocats portant le nom de famille Artaux sur LinkedIn.
![[LAF_C2_A2_DT_LD_RL.png]]
On a de la chance, il n’en existe qu’un seul sur LinkedIn.
![[LAF_C2_A2_DT_LD_PL.png]]
Il se nomme **==James Artaux==**, il est basé à Orléans, il aime les échecs et il « entretient des partenariats avec différentes entreprises, notamment dans le domaine de la sécurité privée et l’élevage canin ». 
On a donc une proximité géographique avec le lieu du catnapping, un partenariat avec des entreprises du même secteur qu’Into-Tacs, et le même nom de famille que leur conseiller externe. Autant de coïncidences ne semblent pas plausibles : il s’agit très probablement du conseiller externe recherché.

---
## Les commencements de l'oiseau

### Énoncé
>Il est fort probable que James utilise lui aussi un pseudo, qui pourra vous être utile pour la suite de votre enquête.
>
>>Sous quel pseudo James Artaux est-il aussi connu ? 
>
>_Format : `Daredevil`

### RETEX
Maintenant que l’on a son nom et son prénom, on peut essayer de cartographier sa présence sur les réseaux sociaux.

En cherchant `James Artaux` sur Google, on peut trouver [son compte Facebook](https://www.facebook.com/people/James-Artaux/61582170877792/), qui utilise d’ailleurs la même photo de profil.
![[LAF_C2_A2_DT_CO_PL.png]]
Dans sa description, il cite même son « pseudo pour les intimes »:  **==Tigris==**

On peut le confirmer sur chess.com en cherchant `James Artaux`, où il apparaît sous le pseudo `Tigris001`.
![[LAF_C2_A2_DT_CO_CC.png]]

---
## Le Territoire du Loup

### Énoncé
>Afin d'aider la police, il peut être intéressant de pouvoir indiquer où vit ce James. Il doit bien avoir laissé des indications quelque part.
>
>>Où semble résider James Artaux ? 
>
>_Format : `XX.XXXXXXX, XX.XXXXXXX`

### RETEX

Sur [son profil Facebook](https://www.facebook.com/people/James-Artaux/61582170877792/), James a publié deux posts qui vont nous permettre de trouver sa maison.
![[LAF_C2_A2_DT_CO_PL.png]]

Dans le premier, il précise qu’il affectionne beaucoup le numéro 89 et que c’est le numéro de sa maison. 
Dans le deuxième, il annonce qu’il a mis en vente son échiquier en bois, et que pour une fois, il ne s’est pas embêté à sortir à côté de son jardin pour prendre la photo, sous-entendu, la photo provient de chez lui. Peut-être que si l’on trouve ses annonces, on aura des indices visuels sur sa situation géographique. 

Étant donné qu’il précise juste « toutes les informations dans la description de l’annonce », sans préciser la plateforme, l’annonce doit être présente sur Facebook. Or, son compte Facebook ne possède pas d’autres posts liés. Il doit donc avoir un compte sur Facebook Marketplace.
![[LAF_C2_A2_DT_TL_AFMP.png]]
Étant donné qu’il avait précisé être situé à Orléans sur LinkedIn, on peut commencer les recherches par `échiquier bois Orléans` sur Facebook Marketplace, et on ne trouve qu’un seul résultat.
![[LAF_C2_A2_DT_TL_EFMP.png]]
Malheureusement, le profil du vendeur ne s’affiche pas pour moi, mais sa situation géographique et le fait qu’il précise qu’il ne s’en sert plus à cause des nouvelles technologies (sous-entendu, il utilise chess.com à la place) nous permettent de savoir que c’est bien James Artaux le vendeur.

![[LAF_C2_A2_DT_TL_CFMP.png]]
Lors du CTF, je ne comprenais pas pourquoi je n’avais pas la possibilité de voir le profil du vendeur, mais ce n’était pas grave puisque mes coéquipiers le pouvaient, et ils ont pu afficher le profil de James Artaux avec ses trois annonces de vente, dont celle de l’échiquier. En fait, c’était simplement parce que je n’avais pas moi-même de profil Marketplace : je n’avais donc pas le droit de voir ce type d’informations.

Le [WU des challmakers TACOSINT](https://github.com/Tacosint/Write-up_L-appel-de-la-foret_2026/tree/main), publié à la fin du CTF, partage un tips caché dans les assets de ce CTF, qui permettait de trouver le compte Marketplace de James à partir de son compte Facebook classique. Je vous partage l’extrait en question ici, mais je vous invite fortement à le lire : ils n’utilisent pas toujours les mêmes méthodes que notre équipe.
![[LAF_C2_A2_DT_TL_WU-TACOSINT.png]]
Merci encore aux TACOSINT. 

Quoi qu’il en soit, l’annonce de la mise en vente de l’échiquier est accompagnée d’une photo en intérieur, sans aucun indice visuel ni indice dans la description. De plus, la localisation Marketplace est très approximative : elle ne nous aide pas plus que l’indice « proche d’Orléans ».
![[LAF_C2_A2_DT_TL_AJA.png]]
En revanche, James a aussi publié deux autres annonces, apparemment proches de son jardin d’après son post Facebook.
Donc, si l’on arrive à trouver la localisation de prise de vue de la photo, alors il ne nous restera plus qu’à trouver la maison numéro 89 la plus proche.
![[LAF_C2_A2_DT_TL_AIAJA.png]]
Pour la suite, nous avons encore utilisé une méthode différente de celle prévue par les challmakers. 

Vu les indices visuels, nous avions bien compris que nous devions être dans une petite commune proche d’Orléans, que cette commune possédait une église collée à un bâtiment en forme de tour, avec une antenne à l’apparence peu anodine en haut. 
Le problème, c’est que nous n’avons pas pensé à vérifier ce qu’était ce type d’antenne. 

Nous avons donc cherché pendant un certain temps sans succès, avant de continuer temporairement les autres challenges disponibles, dont ceux de la partie [[Chapitre 2 - Acte 2 - Développement]]. Durant cette partie, nous avons trouvé l’asset suivant : https://meta.wikimedia.org/wiki/Special:CentralAuth?target=RenDavePet. Je ne précise pas d’où il vient pour ne pas spoiler, mais cela nous a permis de voir les contributions Wikipédia d’un certain contributeur.
Et, par pur hasard 👀, ce contributeur a participé à [un article wikipédia](https://en.wikipedia.org/w/index.php?title=Baccon&diff=prev&oldid=1354454977) portant sur une tour Chappe à Baccon, dans le Loiret, en France.
![[LAF_C2_A2_DT_TL_CTW.png]]
Et cette tour possède les mêmes caractéristiques que celle des photos provenant des annonces de James.
![[LAF_C2_A2_DT_TL_GGM.png]]
En cherchant un numéro 89 à Baccon, on peut trouver 89 Rue de la Planche, à Baccon, juste à côté du point de vue de la photo. Il habite donc aux coordonnées **==47.892098, 1.628996==**.

La vraie méthode pour trouver cet emplacement reposait sur le fait d’identifier que l’antenne à l’apparence peu anodine était en fait le mât d’un sémaphore télégraphe, aussi appelé télégraphe Chappe. 
Il fallait ensuite chercher ces télégraphes Chappe proches d’Orléans pour enfin trouver celui qui nous intéressait.

---
## Synthèse de nos éléments
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.

![[LAF_C2_A2_DT.svg]]