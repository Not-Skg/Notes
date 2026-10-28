---
title: TraceLabs Search Party
tags:
  - Osint
  - Toolbox
  - CTF
  - TraceLabs
description: Comment bien débuter l'initiative et faire avancer l'enquête au mieux.
---
<div class="toolbox-banner toolbox-banner--stack">
<img src="./TraceLabs_banner.webp" alt="" class="toolbox-banner-img" width="1308" height="498" style="aspect-ratio:2.63/1;object-fit:cover" />
<div class="toolbox-banner-text" id="toolbox-banner-text">
<span class="fiches-hero-bar"></span>
<p class="toolbox-banner-sub">Comment bien débuter l'initiative et faire avancer l'enquête au mieux.</p>
</div>
</div>

Un Search Party de Trace Labs n'a pas grand-chose à voir avec un CTF classique. Pas de flag à trouver, pas d'énoncé conçu pour nous mener vers une solution, et surtout aucune garantie de découvrir quoi que ce soit.

Pendant quatre heures, l'objectif est de faire avancer de véritables enquêtes sur des personnes portées disparues, uniquement à partir de sources ouvertes (OSINT). Cela peut passer par la découverte d'un compte sur un réseau social, l'identification d'un proche encore inconnu des enquêteurs ou la reconstitution d'une partie du parcours de la personne avant ou après sa disparition, à partir de photographies, de vidéos ou même de tickets de transport.

Contrairement à un CTF traditionnel, les informations collectées peuvent avoir de réelles conséquences. On ne cherche donc pas à résoudre une affaire ni à déterminer si une activité criminelle a eu lieu : notre rôle se limite à recueillir des éléments factuels et vérifiables, qui seront ensuite transmis aux autorités compétentes par Trace Labs.

Après une première participation, voici ce que j'aurais aimé savoir avant de me lancer, et comment j'aborderais aujourd'hui une Search Party pour éviter de perdre du temps tout en apportant des informations réellement utiles.

## Avant le CTF : choisir son dossier et comprendre le barème

Lors de ma participation, quatre dossiers de personnes disparues étaient proposés à l'ensemble des équipes, avec parfois un cinquième dossier supplémentaire en bonus.

Pour chaque personne, nous disposions d'un point de départ relativement succinct : nom, prénom, éventuels pseudonymes, caractéristiques physiques (cicatrices, couleur des yeux...), quelques liens et une synthèse des circonstances de la disparition.

La tentation est grande de commencer immédiatement à chercher sur Google ou sur les réseaux sociaux. Pourtant, je conseille de prendre quelques minutes pour parcourir les différents dossiers avant de choisir sur lequel travailler.

Tous n'offrent pas les mêmes possibilités de recherche. Certains disposent de plusieurs pseudonymes, de profils sociaux identifiés ou d'un contexte suffisamment précis pour orienter les premières recherches. D'autres n'ont quasiment aucune présence numérique exploitable.

Et contrairement à un CTF OSINT classique, ce n'est pas parce qu'un dossier est proposé qu'il contient nécessairement des informations encore accessibles. Autant choisir dès le départ celui qui semble le plus prometteur, quitte à en changer si les recherches n'aboutissent pas.

L'autre préparation indispensable, c'est de lire le [barème officiel de Trace Labs](https://docs.tracelabs.org/searchparty/searchparty-scoring-system) avant même le début du CTF.

Les informations sont réparties en plusieurs catégories, avec des récompenses très différentes :

|Catégorie|Points|
|---|---|
|Amis et famille|10|
|Informations de base (pseudonymes, profils sociaux...)|50|
|Informations avancées (signes distinctifs, antécédents de disparition...)|250|
|Avancement de la chronologie après la disparition|1 000|
|Localisation actuelle et précise|5 000|

Les catégories à 10 ou 50 points sont généralement les plus accessibles : découvrir un profil social inconnu, identifier un proche ou établir un lien avec un employeur.

Les catégories supérieures demandent davantage de travail, notamment lorsqu'il s'agit de retrouver des éléments permettant de prolonger la chronologie après la disparition.

Ces informations nécessitent une validation particulière du staff, avec des preuves solides et sans la moindre spéculation. Une localisation trop vague, comme un pays ou une région, ne suffira pas à obtenir les 5 000 points de la catégorie _Location_.

Le barème permet donc d'orienter ses recherches, mais il ne faut pas en faire une fin en soi : une information à 10 points peut être utile à l'enquête, tandis qu'une prétendue localisation à 5 000 points, mal justifiée, ne vaut rien.

## Organiser son équipe dès le départ

C'est probablement le point que j'avais le plus sous-estimé lors de ma première participation.

J'avais fait équipe avec deux inconnus rencontrés sur le Discord d'un CTF, sans préparation particulière. Aucun de nous n'avait déjà participé à une Search Party, mais nous n'étions pas complètement débutants pour autant : j'avais déjà participé à de nombreux CTF entièrement consacrés à l'OSINT, et l'un de mes coéquipiers disposait d'une certaine expérience professionnelle dans le domaine, comme il me l'avait expliqué :

> I use to lead backgrounds screenings at a cyber crime organization. Thats the gist of my experience.

Nous avions donc des profils assez différents, mais aucune expérience du format Trace Labs. Et surtout, nous avions bien un Excalidraw et un canal Discord communs, mais aucun vocal et aucune véritable organisation. Chacun travaillait de son côté sur un dossier différent, et nous échangions principalement lorsqu'une soumission était refusée.

Avec le recul, je pense que c'était une erreur.

Plutôt que de disperser les recherches, je privilégierais aujourd'hui une équipe concentrée sur un même dossier, avec une répartition claire des tâches : recherche de profils sociaux, exploration des relations, vérification des informations et rédaction des soumissions.

Cela permet de croiser plus facilement les découvertes, d'éviter les doublons et de faire bénéficier toute l'équipe du contexte accumulé.

Je ferais également tourner régulièrement la personne chargée des soumissions. Vérifier les preuves, rédiger les justifications en anglais et répondre aux retours du coach demande de la concentration. Au bout d'un moment, la fatigue peut facilement entraîner des erreurs.

Enfin, il ne faut pas hésiter à changer de piste, voire de dossier, lorsque les recherches n'aboutissent plus. Quatre heures passent très vite, et s'acharner pendant une heure sur une piste qui ne mène nulle part n'est pas forcément la meilleure stratégie.

## Chercher des informations, pas simplement des profils

Une fois le dossier choisi, le premier réflexe consiste souvent à rechercher le nom et les pseudonymes connus de la personne sur les différentes plateformes.

C'est un bon début, mais il ne faut pas s'arrêter au premier résultat.

Sur de vrais dossiers, les traces numériques sont rarement aussi propres que dans un challenge OSINT. Une même personne peut avoir créé plusieurs comptes sur une seule plateforme, parfois à plusieurs années d'intervalle, avec des variations de pseudonyme ou des informations de profil différentes.

J'ai notamment rencontré des situations où une personne semblait avoir recréé jusqu'à six comptes sur une même plateforme, comme si elle avait perdu l'accès aux précédents.

Il ne faut donc pas hésiter à rechercher différentes variantes des pseudonymes connus et à multiplier les recoupements plutôt que de considérer qu'un compte trouvé correspond automatiquement à la bonne personne.

Une photo de profil, un pseudonyme ou une ville ne suffisent pas toujours. En revanche, plusieurs éléments concordants peuvent permettre d'établir un lien beaucoup plus solide.

L'objectif n'est pas de collecter le maximum de profils possible, mais de comprendre ce que chacun apporte au dossier.

Il en va de même pour les proches. Une personne présente dans une liste d'amis n'est pas nécessairement un contact pertinent. Il faut pouvoir justifier la relation, par exemple grâce à des interactions significatives, des publications communes ou des éléments montrant qu'ils se connaissent réellement.

Cette distinction est importante : les enquêteurs n'ont aucun intérêt à recevoir une liste de centaines de profils sans contexte.

## Soumettre une information exploitable

Trouver une information ne suffit pas. Encore faut-il être capable de la présenter de manière à ce qu'une autre personne puisse la vérifier rapidement.

Dès la première soumission, un coach nous est attribué. C'est lui qui examine les informations, les valide ou les refuse, notamment lorsqu'elles sont déjà connues ou que les preuves sont insuffisantes.

Une bonne soumission doit répondre à trois questions :

- **Qu'a-t-on découvert ?** L'information précise que l'on souhaite apporter.
- **Où l'a-t-on trouvée ?** Un lien direct vers la source, accompagné si possible d'une capture d'écran.
- **Pourquoi est-ce pertinent ?** Les éléments qui permettent de rattacher cette découverte à la personne recherchée et à son dossier.

Prenons un exemple fictif : une photographie publiée sur un compte attribué à la personne disparue montre un ticket de bus dont la date est postérieure à sa disparition.

Il serait tentant de soumettre immédiatement que cette personne a pris le bus en question.

Mais le ticket prouve-t-il réellement qu'elle était à bord ? La photographie a-t-elle été prise le jour de sa publication ? Le compte appartient-il bien à la personne recherchée ?

Tant que ces questions ne sont pas résolues, il faut présenter ce que l'on observe, sans transformer une hypothèse en certitude.

Pour faciliter la vérification, je recommande d'accompagner les soumissions de captures d'écran annotées. Personnellement, j'utilise Flameshot pour encadrer les éléments intéressants ou ajouter des flèches afin que le coach comprenne immédiatement ce qu'il doit regarder.

La capture d'écran n'est pas obligatoire, mais elle peut faire gagner un temps précieux, à condition de conserver également un lien direct vers la source.

Il faut aussi garder à l'esprit que le coach ne connaît pas nécessairement toutes les recherches effectuées par l'équipe. Chaque soumission doit donc être suffisamment claire pour être comprise indépendamment des précédentes.

Et comme les échanges se font en anglais, mieux vaut être capable de rédiger rapidement quelques phrases simples et précises, sans perdre du temps à chercher comment conjuguer un verbe ou tourner une phrase.

## OPSEC : rester strictement passif

C'est sans doute la règle la plus importante de Trace Labs : **les recherches doivent rester strictement passives**.

Pas de message, pas de demande d'ami, pas de like, pas d'abonnement, pas de tentative de connexion à un compte et surtout pas de réinitialisation de mot de passe.

On observe les informations accessibles, on les recoupe et on les documente, sans interagir avec les personnes ou les comptes concernés.

Pour limiter les risques, l'utilisation d'une machine virtuelle (VM) dédiée aux recherches et de _sock puppets_, c'est-à-dire de comptes distincts de nos identités personnelles, est fortement recommandée, dans le respect des règles de Trace Labs et des plateformes consultées.

Une VM permet notamment d'isoler l'environnement de recherche de notre machine principale, tandis que les sock puppets évitent d'exposer directement nos comptes personnels. Cela ne garantit toutefois pas l'anonymat et ne dispense évidemment pas de respecter les règles de reconnaissance passive.

L'utilisation d'un VPN peut également faciliter certaines recherches. En choisissant un serveur situé dans le pays ou la région de la dernière localisation connue de la personne disparue, on peut parfois obtenir des résultats différents sur Google, notamment en raison de la géolocalisation et de l'indexation locale des contenus. Ce n'est pas une garantie, puisque les résultats dépendent aussi de la langue, des paramètres de recherche et d'autres signaux, mais cela peut permettre de découvrir des pages ou des profils moins visibles depuis notre propre pays.

Ces précautions ne sont pas simplement une question de confidentialité. Une action, même anodine en apparence, peut perturber une enquête en cours ou modifier des éléments susceptibles d'intéresser les forces de l'ordre.

Et j'en ai fait l'expérience dès ma première participation.

Nous avions déjà réussi à trouver et à soumettre plusieurs informations qui nous avaient rapporté des points lorsque l'un de mes coéquipiers a lancé une procédure de réinitialisation de mot de passe sur un compte que nous pensions lié à un dossier.

Il n'est pas allé au bout de la procédure, mais cela ne changeait rien : la simple tentative pouvait déjà laisser une trace sur la plateforme, notamment une adresse IP, et introduire du bruit dans l'enquête.

Résultat : **notre équipe a été disqualifiée en plein milieu de la Search Party**.

Nous n'avons pas essayé de contester la décision. Nous participions en équipe, et la responsabilité était donc collective. Les règles étaient claires et nous aurions dû nous assurer que chacun les avait comprises avant de commencer.

Nous avons malgré tout conservé notre badge de participation, et les informations que nous avions découvertes ont été reprises pour être transmises aux forces de l'ordre.

Cette expérience m'a surtout appris qu'il ne suffit pas de connaître soi-même les règles d'OPSEC. Il faut également s'assurer que tous les membres de l'équipe les appliquent.

Avant de commencer une nouvelle Search Party, je prendrais donc quelques minutes pour rappeler explicitement les actions interdites et convenir d'une règle simple : au moindre doute sur une manipulation, on demande au coach avant de faire quoi que ce soit.

## Garder le contact avec les organisateurs

Pendant toute la durée de l'évènement, il faut surveiller le Discord officiel de Trace Labs.

Les organisateurs peuvent publier des consignes importantes, modifier le périmètre des recherches ou retirer un dossier en cours de route à la suite de nouvelles informations.

Dans ce dernier cas, il faut évidemment arrêter immédiatement toute recherche sur la personne concernée.

Le coach constitue également un interlocuteur essentiel. Il ne sert pas uniquement à attribuer des points : il peut aider à comprendre pourquoi une soumission est refusée, clarifier les règles ou faire remonter une découverte sensible au staff.

En particulier, si une recherche révèle un élément potentiellement criminel, ce n'est pas à nous de l'interpréter ni de mener des investigations supplémentaires de notre propre initiative. Il faut le signaler au coach et suivre les consignes.

L'objectif reste de contribuer à une enquête, pas de se substituer aux enquêteurs.

Cette prudence doit également se poursuivre après l'évènement : les informations personnelles découvertes pendant les recherches n'ont pas vocation à être publiées dans un RETEX, même si elles étaient accessibles publiquement.

Il faut également supprimer toutes les données collectées pendant la Search Party, afin de ne conserver aucune information personnelle sur nos machines. Le plus simple reste de réinitialiser ou de supprimer la VM utilisée pour les recherches, en veillant à ne pas oublier les éventuels fichiers enregistrés en dehors de celle-ci. Et si l'on utilise des _sock puppets_ temporaires, créés spécifiquement pour une session de Search Party et supprimés une fois celle-ci terminée, c'est encore mieux : cela évite d'accumuler des comptes et des données liés aux différentes enquêtes.

## Ce que je retiens de cette première participation

Malgré la disqualification, cette première Search Party a été une expérience intéressante, notamment parce qu'elle m'a confronté aux limites d'une recherche OSINT menée dans un contexte réel.

Dans un CTF traditionnel, on peut généralement supposer qu'un indice a été placé quelque part pour être trouvé. Ici, rien ne garantit qu'une piste aboutira, qu'une information sera encore disponible ou même qu'il restera quelque chose à découvrir.

Il faut donc savoir chercher, mais aussi savoir s'arrêter.

Si je devais recommencer, je changerais surtout trois choses : préparer l'équipe en amont, concentrer davantage nos efforts sur un même dossier et consacrer plus de temps à la vérification des informations avant leur soumission.

Je ferais aussi beaucoup plus attention aux aspects pratiques, notamment au fuseau horaire de l'évènement. Une Search Party ne commence pas forcément à une heure confortable pour tout le monde, et c'est le genre de détail qu'on peut facilement oublier lors de l'inscription.

Enfin, je garderais à l'esprit qu'un classement ne reflète pas nécessairement l'utilité réelle des recherches. Une information modeste mais correctement vérifiée peut avoir davantage de valeur qu'une découverte spectaculaire reposant sur des suppositions.

Le plus important n'est pas de trouver le plus de choses possible, mais de transmettre des informations fiables, pertinentes et obtenues sans perturber l'enquête.

C'est ce qui distingue, à mon sens, une Search Party d'un simple CTF OSINT.
![[TL_PO-2026.png|300]]![[TL_PSP.png|300]]