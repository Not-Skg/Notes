---
tags:
  - Osint
  - DeepThreats
  - Chall
  - casebandit
order: 5
description: RETEX des challenges de la partie "Partenaire particulier" du CTF DeepThreats
---
---
>[!info] Contexte
> Pour rappel, voici le contexte actuel de ce CTF sous forme de graphique Casebandit.
> ![[DT_WUD.svg]]

Partie Précédente : [[What's up doc ?]]
Prochaine partie : `[[L'ile mystérieuse]]`

---
## Un portefeuille bien garni

### Énoncé
> ![[DT_PP_UPBG_E.png]]
>Aquaventis Partners se présente donc comme un accélérateur, qui en échange d'une part capitalistique d'une entreprise, accompagne celle-ci dans son développement grâce à du conseil en stratégie et surtout à un réseau très étendu à l'international.
>
>> Combien d'autres entreprises accompagne-t-elle en plus de Marinatech ?
>
>_Flag format :  `51`_


### RETEX
Pour répondre à cette question, on peut tout simplement revenir sur le [site de l'entreprise](https://aquaventis-partners.org/) en question.

Sur la page d'accueil, on peut trouver un carrousel présentant les partenaires d'Aquaventis.
![[DT_PP_UPBG_1.png]]

On peut donc soit attendre pendant que le carrousel défile et noter tous les noms d'entités référencés, ou alors on peut regarder le code source de la page.
On y apprend que tout est noté en dur dans l'index.html.
![[DT_PP_UPBG_2.png]]
Et si l'on compte bien, le carrousel comporte 24 entités dont Marinatech donc 23 autres entreprises.
24 - 1 (Marinatech) dans le code = **==23==** autres entreprises dans le carrousel.

---
## Une belle histoire

### Énoncé
> ![[DT_PP_UBH_E.png]]
> Cette activité de développement international et de conseil en stratégie n'est apparemment pas la seule de l'entreprise. Celle-ci a visiblement des liens assez forts avec le Lianhua pour avoir signé un partenariat avec Hydronix Marine Corporation.
>
>> Pour combien de temps ce partenariat a-t-il été signé et quel est l'acronyme du nom exact de la structure concernée par celui-ci ?
>
>_Flag format :  `8 ans_MEDEF`_

### RETEX
Cette fois-ci, on va avoir besoin de plus d'informations, et si ça provient du Lianhua c'est encore mieux.
![[DT_PP_UBH_1.png]]
D'après le [Wiki du pays](https://lianhua.wiki/page/lianhua),  l'un des médias principaux du pays est https://lianhuanews-network.info.
![[DT_PP_UBH_2.png]]
Dessus, on peut fouiller quelque temps tout ce qui est accessible, parce qu'énormément de contenu est bloqué par un paywall (fictif évidemment).

![[DT_PP_UBH_3.png]]
On peut trouver dans l'onglet "[Vidéo](https://lianhuanews-network.info/video/index.html)", une vidéo consacrée au partenariat entre Aquaventis et Hydronix, et c'est même le seul endroit du site où les deux sont cités en même temps.
![[RELATION.mp4]]
Voici le transcript : 
```
0:03 Speaker 1
Hydronix Marine Corporation, a flagship of the Liano Republic's naval industry, has officially announced a strategic partnership with the French firm Aquaventus Partners. The agreement includes the creation and joint management of a maritime innovation center in Haidong with an initial duration of five years. 

0:19 Speaker 2
Located at the heart of one of the region's fastest growing maritime hubs, Haidong represents a new frontier for global collaboration.

0:27 Speaker 1
The initiative aims to attract companies from around the world, including French enterprises, to foster research and innovation in the maritime sector. 

0:35 Speaker 2
With cutting edge infrastructure and a strong commitment to innovation, the Liano Republic continues to position itself as a key player in the future of maritime technology. This partnership marks a significant step toward building an international ecosystem dedicated to sustainable and advanced maritime solutions.
```

On y comprend donc que la durée du partenariat est de **==5 ans==**, et la vidéo mentionne aussi un centre d'innovation maritime situé à Haidong qui serait au centre de ce partenariat.
![[DT_PP_UBH_4.png]]

Et [plusieurs fois](https://lianhuanews-network.info/article/hydronix-marine-lorii-investment.html), sur ce site, **==LORII==** est cité comme le principal centre asiatique de recherche de technologies maritimes avancées.

---
## Capital risque

### Énoncé
> ![[DT_PP_CR_E.png]]
> Votre enquête prend une bonne tournure mais il y a un acteur qui mérite votre attention, Aquaventis Partners. Quel est donc ce fonds d'investissement partenaire qui a brutalement cédé les parts de capital de Marinatech qu'il détenait depuis seulement quelques mois, sans les avoir informés au préalable de ses intentions ?
>
>> Indiquez l'adresse de l'entreprise
>
>_Flag format :  `Bâtiment Marvel - 78650 Le Vésinet`_

### RETEX

Pour rappel, on sait qu'Aquaventis Partners a cédé ses parts de Marinatech Industries qu'il détenait depuis quelque mois via la conversation entre Cheryl Lin et Jerôme Osfart (président d'Aquaventis Partners) récupérée sur le Black Lotus en .onion.
![[DT_PP_CR_1.png]]
Et d'après la conversation, les fonds ont été transférés à une entité nommée Blue Current.

Pour trouver l'adresse d'Aquaventis Partners, on peut regarder le footer de n'importe quelle page du [site d'Aquaventis](https://aquaventis-partners.org/), qui contient l'adresse dans la colonne "Contact"
![[DT_PP_CR_2.png]]

Mais on peut aussi croiser et valider la source via [la page "Mentions Légales"](https://aquaventis-partners.org/mentions-legales.html), dans laquelle il est écrit noir sur blanc l'adresse du siège social.
![[DT_PP_CR_3.png]]
Et cette adresse est donc la **==Tour Eagle - 92060 La Défense==**

---
## Qui a piqué mes parts ?!

### Énoncé
> ![[DT_PP_QPMP_E.png]]
> Quelque chose vous fait tiquer dans cette histoire de cessions de parts. Il vous faut donc en savoir plus. Marc-Olivier Chasseneuil n'a plus en mémoire le nom exact de l'entreprise à qui les parts ont été vendues parce que le dossier est au service juridique. Vous commencez donc par chercher cette information sur votre base de données européenne préférée, [papiers.business](https://papiers.business/).
>
>> Quelle est le nom de cette entité ?
>
>_Flag format :  `Red Flag France`_

### RETEX
Nous pouvons déjà chercher la société "Blue Current" sur papiers.business mais étant donné que ça ne repose pas sur une vraie base légale, seulement sur des messages récupérés en volant les credentials d'une plateforme de messagerie sécurisée sous .onion, il vaut mieux reprendre sur des bases saines.
![[DT_PP_QPMP_1.png]]
En recherchant [Aquaventis Partners sur papiers.business](https://papiers.business/entreprise.php?siren=926563594), on peut récupérer de nombreuses informations sur la société, mais un document en particulier nous intéresse au vu de son nom : 
`Marinatech_Cession_AquaVentis_Blue_Current_Europe_08_09_2026.pdf`

![[DT_PP_QPMP_2.pdf]]
Mais avant de le lire en profondeur, on peut finir de lire en diagonale le profil de la société sur papiers.business.
![[DT_PP_QPMP_3.png]]
On y découvre qu'alors que Jerôme Osfart est le Président et fondateur d'Aquaventis Partners, il ne détient que 10% des actions, ce qui ne lui laisse que peu de marge pour appuyer ses idées.
Les 90 autres pour cent des actions sont détenus par Blue Current Europe S.A.R.L...
![[DT_PP_QPMP_4.png]]
Et en lisant le document cité au-dessus, il est bien noté : 
```
AQUAVENTIS PARTNERS cede et transfere a BLUE CURRENT EUROPE S.a r.l., qui accepte, la pleine propriete de 50 000 actions de MARINATECH INDUSTRIES, d'une valeur nominale de 10 euros chacune, representant 20 % du capital social et 20 % des droits de vote.
```

On vient donc de trouver tout ce qu'il nous fallait pour affirmer que c'est bien **==BLUE CURRENT EUROPE==** qui a récupéré les 20 % des parts de MARINATECH qui appartenaient à Aquaventis Partners.

On peut même aller un peu plus loin en allant analyser [le profil de cette SARL sur papiers.business](https://papiers.business/entreprise.php?siren=B287451).
![[DT_PP_QPMP_5.png]]
Dessus, il y a un document qui peut nous intéresser : `Blue_Current_Europe_Portfolio_Financial_Participations_2026.pdf`
![[DT_PP_QPMP_6.png]]
On y découvre que Blue Current EUROPE a récemment acquis des parts conséquentes (~20%) dans 5 des sociétés partenaires d'Aquaventis : Marinatech Industries, Nereis Robotics, OceanGrid GmbH, Marisight AI B.V, SeaVector A/S et BlueFathom Ltd.
Et à chaque fois, c'était des actions qui appartenaient à Aquaventis initialement.

---
## Synthèse de nos éléments
On vient d'éclaircir une bonne partie de ce qui se cache derrière la cession des parts de Marinatech.

Sur le "que s'est-il passé ?", on sait désormais qui a récupéré les 20 % de parts cédés par Aquaventis Partners sans préavis : Blue Current Europe. On découvre au passage qu'Aquaventis n'est pas qu'un simple accélérateur pour Marinatech : son partenariat de 5 ans avec Hydronix Marine Corporation a donné naissance à LORII (Lianhua Oceanic Research & Innovation Institute), un centre d'innovation maritime basé à Haidong, ce qui montre que son rayon d'action dépasse largement ce seul dossier.

Sur le "qui poursuit quels intérêts ?", la découverte la plus marquante concerne justement Blue Current Europe : cette même entité se révèle être l'actionnaire majoritaire d'Aquaventis Partners elle-même, à hauteur de 90 % des parts. Elle a donc, en substance, organisé la cession d'un actif qu'elle contrôlait déjà indirectement.

Et sur la question d'une succession d'incidents indépendants ou d'une dynamique plus structurée, cette partie penche clairement pour la seconde hypothèse : Blue Current Europe a appliqué exactement le même schéma de rachat discret sur plusieurs autres sociétés du portefeuille d'Aquaventis, ce qui écarte l'idée d'un cas isolé propre à Marinatech.

Et voici le graphique CaseBandit qui résumé nos trouvailles durant cette partie :
![[DT_PP.svg]]
Partie Précédente : [[What's up doc ?]]
Prochaine partie : `[[L'ile mystérieuse]]`
