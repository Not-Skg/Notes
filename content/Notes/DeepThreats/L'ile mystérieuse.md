---
tags:
  - Osint
  - DeepThreats
  - Chall
  - casebandit
order: 6
description: RETEX des challenges de la partie "L'ile mystérieuse" du CTF DeepThreats, qui débloque le VPN.
---
---
>[!info] Contexte
> Pour rappel, voici le contexte actuel de ce CTF sous forme de graphique Casebandit.
> ![[DT_PP.svg]]

Partie Précédente : [[Partenaire particulier 1]]
Prochaine partie : [[En eaux troubles 2]]

---
## Geoguessr level 1

### Énoncé
> ![[DT_IM_GL1_E.png]]
> Décidément, le nom de la République du Lianhua ressort beaucoup dans cette enquête. Vos cours de géographie sont loin alors il va falloir trouver des informations sur ce pays.
> 
>> Quelle est sa capitale ?
>
>_Flag format :  `Paris`_

### RETEX
On avait découvert, il y a quelque temps, le wiki dédié au Lianhua.
On peut y trouver toutes les informations que l'on cherche sur la situation géographique du Lianhua.
![[DT_IM_GL1_1.png]]
D'après la [page Géographie](https://lianhua.wiki/page/geographie-du-lianhua), le Lianhua est situé :
- au sud de la Chine continentale ;
- à l'ouest de l'île de Luçon (Philippines) ;
- à l'est du Viêt Nam ;
- au nord de Bornéo.

![[DT_IM_GL1_2.png]]
C'est un État insulaire dont la capitale se nomme **==Xinhai==**, qui se trouve aussi être le nom de la province dans laquelle elle est située.

---
## French Touch

### Énoncé
> ![[DT_IM_FT_E.png]]
>Vous ignoriez à quel point le Lianhua est technologiquement mature. Pourtant, d'après ce que vous lisez en creusant plus loin, le pays n'a de cesse de chercher à développer sa souveraineté dans de nombreux domaines, à commencer par le maritime. Pour cela, il cherche à établir des partenariats avec des pays qu'il considère posséder un avantage technologique dans certains secteurs.
> 
>> Quel est le premier domaine dans lequel la France est reconnue pour son expertise selon l'auteur d'un article au Lianhua ?
>
>_Flag format :  `Military strategy`_

### RETEX
Nous avions aussi trouvé la principale source d'information du pays : [LNN](https://lianhuanews-network.info/index.html).
![[DT_IM_FT_1.png]]
En fouillant le site d'actualité, on peut trouver dans l'onglet "Top Stories", [un article](https://lianhuanews-network.info/article/hydronix-marine-lorii-investment.html) qui fait mention de la France en tant que partenaire stratégique.
![[DT_IM_FT_2.png]]
Et la France y est reconnue comme un expert international en **==architecture navale==**.
Et le LORII y est aussi mentionné, annonçant une série d'initiatives visant à encourager les entreprises, les start-ups et les équipes de recherche françaises à mettre en place des projets de collaboration à Haidong.

---
## Connexion établie

### Énoncé
>![[DT_IM_CE_E.png]]
> **Accès au Lianhua**
>
>Vous êtes désormais prêt.
>
>Votre première phase de reconnaissance est terminée, il est temps de franchir une nouvelle étape : **vous connecter au réseau du Lianhua**.
>
>La DGA met à votre disposition un moyen de connexion sécurisé à destination du réseau informatique du Lianhua.
>
>Un bouton **« Connexion au Lianhua »** est désormais disponible en bas à droite de cette page. Il vous permettra d'accéder au réseau informatique du pays (si le bouton n'apparaît pas, veuillez rafraîchir la page).
>
>Cependant, restez vigilant. D'après les renseignements recueillis au cours de votre enquête, ce réseau est loin d'être un environnement sûr. Chaque connexion peut révéler de nouvelles informations... ou attirer une attention indésirable. Afin de limiter les risques de détection, seuls certains sites, préalablement identifiés par la DGA et/ou repérés par vos soins lors de la première phase de reconnaissance, sont accessibles. La navigation vers tout autre site est restreinte.
>
>Avant de poursuivre, il est **fortement recommandé** de prendre connaissance du fonctionnement de ce mécanisme :
> 
>Bonne chance, et restez discret.
>> > Pour valider ce challenge, entrez le mot suivant : **==SURVEILLANCE==**

### RETEX
Ce challenge permet de débloquer un accès à un VPN, ce qui va nous aider dans nos recherches puisqu'on pourra enfin investiguer à l'intérieur du réseau fermé du pays.

C'est la première fois que je vois une mécanique de VPN dans un CTF, et je trouve ça incroyable.
C'est une super bonne idée, ça nous plonge encore plus dans l'histoire, et le système de surveillance qui nous bannit à la détection rajoute de la pression et un réalisme profond.
(même si ça se retournera contre nous à la fin...)

Le seul point négatif que j'ai à son égard, c'est qu'il empêche l'équipe d'investiguer au complet, seul un accès est disponible, ce qui peut s'avérer contraignant en cas d'avis divergent dans les recherches, ou de manque de temps.

Avant de se connecter, recherchons des infos sur le réseau interne du pays.
La [page wiki dédiée à son réseau informatique](https://lianhua.wiki/page/reseau-informatique-du-lianhua) peut nous aider.
![[DT_IM_CE_1.png]]
Elle permet notamment de pivoter vers la page dédiée à ses extensions de domaines.
![[DT_IM_CE_2.png]]
On y apprend que les sites accessibles uniquement depuis le réseau interne utilisent l'extension .ln, les services gouvernementaux utilisent l'extension .gouv.ln et certains services destinés à être accessibles depuis l'Internet public utilisent une extension .int.

On va donc pouvoir réaliser une liste des sites que l'on voudrait visiter via ce VPN afin de ne pas perdre de temps.

Le but va être de cartographier tout ce qui est accessible et qui pourrait nous intéresser et tout ce qui ne l'est pas, en essayant de ne pas attirer l'attention bien évidemment.

On va donc imaginer des domaines potentiels liés à l'histoire du CTF, et tenter plusieurs TLD et tenter des alternatives plausibles.
![[DT_IM_CE_3.png]]
Par exemple, le wiki précise que les médias principaux du pays sont 
- LNN
- Xinhai Daily
- Phoenix Tech Review

Ça peut-être intéressant d'analyser les différences entre les médias hors pays et ceux interne au pays, on peut donc créer la liste suivante : 
- xinhai-daily.ln 
- xinhai.daily.ln 
- xinhai-daily.int 
- xinhai.daily.int 
- xinhaidaily.ln
- xinhaidaily.int
- lianhuanews-network.info
- lianhuanews-network.ln
- lianhuaglobalnews.ln
- lianhuaglobal-news.int
- lianhuaglobal-news.ln
- lianhua.global-news.int
- lianhua.global-news.ln
- lianhua-global-news.int
- lianhua-global-news.ln
- lianhuaglobalnews.int
- lianhuaglobalnews.ln
- phoenix-tech-review.int 
- phoenix-tech-review.ln
- phoenixtech-review.int
- phoenixtech_review.int
- phoenixtech.review.int
- phoenixtech-review.ln
- phoenixtech_review.ln
- phoenixtech.review.ln
- ...

![[DT_IM_CE_4.png]]
Une fois connecté, nous n'avons accès à rien, juste une page d'accueil qui précise qu'on est bien connecté, on a donc bien fait de se préparer à l'avance, on peut donc tenter nos nombreux domaines potentiels. Bien sûr, on laisse un temps d'attente entre chaque tentative, on ne fait pas du brute force de domaine, et aussi on essaie de privilégier les plus plausibles et si un domaine répond, on ne teste pas les alternatives pour éviter de faire trop de bruit.

Voici une liste des seuls domaines qui ont fonctionné suite à nos premiers essais :
- gouv.ln
![[DT_IM_CE_5.png]]

- lums.ln
![[DT_IM_CE_6.png]]

- lorii.ln
![[DT_IM_CE_7.png]]

- hydronix-marine-corporation.ln
![[DT_IM_CE_8.png]]


On peut aussi noter que gouv.ln renvoie vers 4 sous-domaines via son footer.
![[DT_IM_CE_9.png]]

On peut aussi les retrouver dans l'onglet "Official Registries"
![[DT_IM_CE_10.png]]

- ipo.gouv.ln, la base de données de dépôt de brevet du Lianhua.
![[DT_IM_CE_11.png]]

- cra.gouv.ln, le registre national des entreprises du Lianhua.
![[DT_IM_CE_12.png]]

- laws.gouv.ln, la base de données des lois et autres documents administratifs liés au Lianhua.
![[DT_IM_CE_13.png]]

- lndi.gouv.ln, le whois officiel du Lianhua, qui peut donc nous permettre de récupérer des informations liées à un nom de domaine.
![[DT_IM_CE_14.png]]


---
## Un homme occupé

### Énoncé
> ![[DT_IM_UHO_E.png]]
> Vous avez découvert que Zhou Wenjie, le professeur et mentor de Wuan est pleinement impliqué dans les manoeuvres destinées à s'approprier la technologie de Marinatech. Mais quel est son véritable rôle officiel au Lianhua ?
> 
>> À quelle entité appartient-il et quelle est sa fonction ? 
>
>_Flag format :  `Local Military Strategy_Advisor`_

### RETEX
Étant donné que l'on suspecte une ingérence étrangère, donc à un niveau étatique, on va commencer par chercher si Zhou Wenjie fait partie du gouvernement actuel.
![[DT_IM_UHO_1.png]]
Dans l'onglet Gouvernement de gouv.ln, on peut retrouver Zhou dans la partie Strategic Agencies & Directorates.
![[DT_IM_UHO_2.png]]

Il y est référencé comme étant **==Directeur==** du **==National Innovation Council==**.

---
## Contrôle total

### Énoncé
> ![[DT_IM_CT_E.png]]
> Comme vous avez pu le constater, l'institut Lotus a beaucoup d'influence à l'extérieur, mais également au sein même du Lianhua par l'intermédiaire du conseil national de l'innovation. Ainsi, la doctrine déguisée en recommandations prônant la souveraineté sur le Lantrium semble avoir porté ses fruits en matière d'influence puisque le gouvernement Lianhuanais a fait voter une loi sur les minerais stratégiques pour entre autres, assurer un contrôle des exportations sur ce métal en particulier.
>
> Marc-Olivier Chasseneuil est persuadé que la nouvelle technologie développée par Marinatech est concernée mais pouvez-vous retrouver cette loi et l'article précis qui permet d'en être certain ?
> 
>> Quelle est la référence de cet article ?
>
>_Flag format :  `VT-TLO-2018-397 - Art. 25`_

### RETEX

L'énoncé mentionne une loi sur les minerais stratégiques votée par le gouvernement du Lianhua : on retourne donc sur laws.gouv.ln, repéré lors du challenge « Connexion établie », pour tenter de la retrouver.

Le problème, c'est que malgré la présence d'une barre de recherche, cette dernière ne fonctionne pas très bien, elle ne recherche que via les mots présents dans le titre ou la description des lois, nous avons donc dû parcourir les catégories de lois existantes pour trouver une qui pourrait nous aider. Le site propose un filtre par domaine juridique.
![[DT_IM_CT_1.png]]
On parcourt donc chacun de ces domaines à la recherche d'une loi qui pourrait concerner le Lantrium. On a fait une liste en survolant les noms, puis lu en détail chaque loi de cette liste, en voici un extrait de cette liste :

- Lantrium Research Infrastructure and Safety Act
- Lantrium Mining Rehabilitation and Environmental Monitoring Act
- Research Data and Scientific Repositories Act
- Strategic Minerals and Materials Act of the Republic of Lianhua
- Advendec Materials Research Coordination Act

Après avoir feuilleté chacune d'elles, on trouve finalement l'article qui nous intéresse dans une loi classée du côté un peu inattendu du droit de l'énergie : « Strategic Minerals and Materials Act of the Republic of Lianhua ».
![[DT_IM_CT_2.png]]
Cette loi porte la référence **LH-ENE-2026-082**, elle est en vigueur depuis le 1er septembre 2026 et comporte 20 articles répartis en 5 chapitres.

En parcourant le chapitre IV, consacré au contrôle des exportations, on tombe sur l'article qui cite explicitement le Lantrium :
![[DT_IM_CT_3.png]]
```
Art. 15 Enhanced Control of Lantrium

Exports of unprocessed Lantrium, high-purity Lantrium, specified Lantrium compounds and industrial products containing controlled concentrations of Lantrium shall require an individual export authorization unless expressly exempted by regulation. The competent authority may establish quantitative quotas or destination-specific restrictions where necessary to preserve national supply or prevent strategic diversion.  
  
Applications involving Lantrium intended for advanced maritime systems, underwater acoustic technologies, military propulsion, signature reduction, advanced sensors, autonomous platforms or another application designated as strategically sensitive shall receive enhanced national security review.  
  
The exporter shall take reasonable steps to determine the actual end user and intended use of the material. Where information submitted by the purchaser is incomplete, inconsistent or gives reasonable grounds to suspect diversion, the exporter shall suspend the transaction and seek guidance from the competent authority before proceeding
```

En clair, cet article se découpe en trois temps :

- « Exports of [...] Lantrium [...] shall require an individual export authorization unless expressly exempted by regulation » : toute exportation de Lantrium (brut, purifié, sous forme de composés, ou dans des produits industriels qui en contiennent) doit obtenir une autorisation d'exportation au cas par cas. Le Lianhua peut aussi imposer des quotas ou restreindre certaines destinations pour garder le métal chez lui ou éviter qu'il parte vers un acteur non désiré.
- « Applications involving Lantrium intended for advanced maritime systems, underwater acoustic technologies, military propulsion, signature reduction [...] shall receive enhanced national security review » : si le Lantrium est destiné à des usages maritimes avancés, à des technologies acoustiques sous-marines, à la propulsion militaire ou à la réduction de signature (= rendre un sous-marin plus discret), la demande d'exportation subit un contrôle de sécurité nationale renforcé. C'est exactement le cas de Marinatech : son revêtement à base de Lantrium sert justement à réduire la signature acoustique des sous-marins.
- « The exporter shall take reasonable steps to determine the actual end user [...] Where information [...] gives reasonable grounds to suspect diversion, the exporter shall suspend the transaction » : celui qui exporte le Lantrium doit vérifier qui va réellement l'utiliser et pourquoi. S'il y a un doute sur le véritable destinataire ou l'usage prévu, il doit stopper la vente et consulter les autorités avant de continuer.

Autrement dit, cet article donne au Lianhua un droit de regard (et de veto) sur toute exportation de Lantrium à usage militaire ou stratégique, ce qui explique directement pourquoi Marinatech se retrouve bloquée : sa technologie de revêtement furtif coche justement toutes les cases qui déclenchent ce contrôle renforcé.

La référence de l'article est la suivante **==LH-ENE-2026-082 - Art. 15==**.

---
## Made in France

### Énoncé
> ![[DT_IM_MIF_E.png]]
> Maintenant que vous vous êtes familiarisés avec l'écosystème internet du Lianhua, il est temps de creuser cette histoire de brevet.
> 
>> Quel est l'identifiant du brevet déposé dans la base de données nationale avec la technologie de Marinatech ?
>
>_Flag format :  `IP-2036-08987`_

### RETEX
Étant donné que nous avions appris dans un challenge précédent que c'est Zhou qui a récupéré la formule de Wuan et qui a fini par déposer le brevet, on peut directement chercher son nom sur ipo.gouv.ln.
![[DT_IM_MIF_1.png]]
On trouve 6 dépôts de brevet à son nom, tous liés au Lantrium, et le dernier en date cite aussi Wuan en inventeur.
![[DT_IM_MIF_2.png]]
Le brevet est nommé "Lantrium Phononic Damping Composite (LPDC)" et son identifiant est **==LH-2026-09154==**.

---
## Non négociable

### Énoncé
> ![[DT_IM_NN_E.png]]
> Ce confetti au milieu de la mer de Chine vous fait finalement un peu penser à Taïwan par son niveau de développement technologique. En revanche, il semble d'après ce que vous avez lu, que le Lianhua ait une conception un peu particulière des droits de ses citoyens. Dans certains pays, les lois sur le renseignement peuvent être particulièrement coercitives.
> 
>> Quelle est la référence de l'article de loi évoquant le refus de coopérer ?
>
>_Flag format :  `Atomic Energy Act_chapter 18_Art. 4`_

### RETEX

Contrairement au challenge précédent, la loi qui nous intéresse ici se devine assez bien à partir de l'énoncé, qui parle de « lois sur le renseignement ». On peut donc directement chercher « National Intelligence Act » dans la barre de recherche de laws.gouv.ln, qui fonctionne bien tant qu'on tape des mots présents dans le titre ou la description des lois.
![[DT_IM_NN_1.png]]
La recherche renvoie 5 résultats, dont un décret d'application et plusieurs articles isolés. Celui qui nous intéresse est le texte principal, le « **==National Intelligence Act==** of the Republic of Lianhua » (référence LH-INT-2020-001), dont la description annonce directement la couleur : « This Act regulates intelligence activities, cooperation duties, overseas obligations of Lianhua citizens and the protection of strategic State interests, including a strict provision on refusal to cooperate in national security matters. ». En clair, une loi sur le renseignement qui prévoit justement une clause stricte sur le refus de coopérer, exactement ce que cherche l'énoncé

On ouvre donc la fiche complète de cette loi.
![[DT_IM_NN_2.png]]
Elle comporte 12 articles répartis en 4 chapitres, dont un « **==Chapter III== — Duties of Cooperation** » qui semble particulièrement prometteur.

En l'ouvrant, on y trouve bien l'article qui nous intéresse :
![[DT_IM_NN_3.png]]

```
Art. 9 Refusal to Cooperate and High Treason

Any deliberate and unjustified refusal by a citizen of the Republic of Lianhua to cooperate with lawful requests issued by competent national authorities, where such refusal seriously endangers or is likely to endanger national security, scientific assets, technological assets or strategic interests of the Republic, may constitute an act of High Treason. This provision applies regardless of whether the citizen is located within the territory of the Republic or abroad.
```
En clair voici ce qui nous intéresse dans l'**==article 9==**:

- « Any deliberate and unjustified refusal [...] to cooperate with lawful requests [...] where such refusal seriously endangers [...] national security, scientific assets, technological assets or strategic interests of the Republic, may constitute an act of High Treason » : tout citoyen du Lianhua qui refuse volontairement et sans justification de coopérer avec une demande légale des autorités peut être considéré coupable de haute trahison, à condition que ce refus mette sérieusement en danger la sécurité nationale ou des intérêts scientifiques, technologiques ou stratégiques du pays.
- « This provision applies regardless of whether the citizen is located within the territory of the Republic or abroad » : cette règle s'applique même si le citoyen concerné vit et travaille à l'étranger, elle suit donc les citoyens du Lianhua où qu'ils soient dans le monde.

Autrement dit, un ressortissant du Lianhua ne peut pas se réfugier derrière le fait de travailler pour une entreprise étrangère (comme Marinatech) pour refuser de transmettre ses recherches ou ses brevets au Lianhua si les autorités les lui réclament : le risque encouru est d'être considéré comme traître à la nation, où qu'il se trouve dans le monde.

---
## Mon précieux

### Énoncé
> ![[DT_IM_MP_E.png]]
> A ce stade, nous avons compris que Zhou _(prenom)_ Wenjie _(nom)_ joue un rôle important dans la stratégie du Lianhua pour son développement technologique. Dans un média, Zhou Wenjie évoque le cas de Marinatech en parlant de l'usage du Lantrium par les entreprises étrangères.
> 
>> Quel "droit" évoque-t-il quand il parle de bénéficier de la valeur crée ? (attention, flag en français)
>
>_Flag format :  `droit divin`_

### RETEX

Dans un précédent challenge, nous avions débloqué un accès à la messagerie chiffrée sur un .onion.
![[DT_IM_MP_1.png]]
Dans une conversation avec Cheryl Lin, Zhou précise que le podcast d'une interview pour LNN est dès à présent en ligne, et que ce podcast couvre le sujet de la souveraineté technologique.
![[DT_IM_MP_2.png]]
Dans l'[onglet "Podcasts"](https://lianhuanews-network.info/podcast/index.html) du site de LNN, on peut trouver un unique podcast gratuit, le reste est bloqué par un paywall (fictif).
![[DT_IM_MP_3.png]]
En analysant le code source de la page, on peut contourner le paywall et récupérer d'autres podcasts.
Pour ce faire, on peut juste ajouter les URL liées à https://lianhuanews-network.info/podcast/.

Par exemple, https://lianhuanews-network.info/podcast/audio/How_Haidong_built_a_marine_research_powerhouse.m4a.

Ce n'est pas très éthique, ni légal, mais au moins ça nous prouve que d'autres audio existent, et ce n'est pas pour rien.

En écoutant le podcast jusqu'au bout, on entend le conseil suivant : `Find all our others podcasts for free on your favorite streaming plateform`

Ce qui signifie qu'ils ont une présence sur d'autres plateformes.
En recherchant les mots clés "Lianhua Podcasts" sur Spotify, Deezer, SoundCloud etc., on finit par trouver [le compte Spotify de LNN](https://open.spotify.com/show/0340957ArCHOS1oG0SJFKm?si=110bf8d0ee9045b7).
![[DT_IM_MP_4.png]]
Sur le podcast "Lianhua National Podcasts", on peut retrouver les podcasts de LNN comme `How Haidong built a marine research powerhouse` mais aussi et surtout un podcast nommé `From Research to National Capability` qui cite en description "Professor Zhou Wenjie".
![[DT_IM_MP_5.mp3]]
Voici le transcript traduit de la partie qui nous intéresse: 

```
2:31 Speaker 1
(2:31 – 3:00) - Oh, elles reposent largement sur des ressources comme le Lantrium, pour ces fameuses technologies de furtivité des sous-marins. 

2:37 Speaker 2
Donc la question est la suivante : "Si des entités étrangères utilisent les ressources publiques du Lianhua pour de la technologie militaro-industrielle avancée, la République n'a-t-elle pas un DROIT INDÉNIABLE de bénéficier de cette valeur créée ?"
```

On vient donc de trouver la réponse, il parle ici de **==droit indéniable==** de bénéficier de la valeur créée par l'utilisation de ressources publiques du Lianhua pour de la technologie militaro-industrielle avancée à l'étranger.

---
## Synthèse de nos éléments
Cette partie nous fait franchir une étape décisive : l'accès au réseau interne du Lianhua confirme un engagement étatique bien plus direct qu'on ne le pensait.

Sur le "que s'est-il passé ?", deux éléments de l'Ordre de mission trouvent enfin leur explication. Le blocage des perspectives d'innovation de Marinatech s'explique par le Strategic Minerals and Materials Act (art. 15), qui soumet justement les technologies liées au Lantrium à un contrôle des exportations à portée extraterritoriale. Et le brevet déposé "sur une base nationale étrangère" avant même celui de Marinatech est bien identifié : LH-2026-09154, déposé par Zhou au nom du Lianhua.

Sur le "qui poursuit quels intérêts ?", Zhou Wenjie n'est plus seulement le mentor de Wuan : il est Directeur du National Innovation Council du Lianhua, donc un acteur institutionnel à part entière. Et dans un podcast public, il justifie lui-même la démarche par un "droit indéniable" du Lianhua à bénéficier de la valeur créée à partir de ses ressources, ce qui donne un visage doctrinal assumé à toute l'opération.

Enfin, sur la dynamique structurée, le National Intelligence Act (art. 9) apporte la pièce manquante : refuser de coopérer avec les autorités du Lianhua, même depuis l'étranger, peut être qualifié de haute trahison. Le chantage exercé sur Wuan n'était donc pas une initiative isolée de Zhou, il s'appuie sur un véritable arsenal juridique national.

Et voici le graphique CaseBandit qui résume nos trouvailles durant cette partie :
![[DT_IM.svg]]

Partie Précédente : [[Partenaire particulier 1]]
Prochaine partie : [[En eaux troubles 2]]
