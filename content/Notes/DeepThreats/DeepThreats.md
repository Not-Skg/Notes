---
tags:
  - Osint
  - DeepThreats
  - CTF
  - casebandit
order: 1
description: Mon RETEX sur le CTF DeepThreats
---

![[DT.png]]

***Les différentes parties du CTF :***
 · | · [[A vos marques]]
 · | · [[En eaux troubles 1]]
 · | · [[Une drôle de fleur]]
 · | · [[What's up doc ?]]
 · | · [[Partenaire particulier 1]]
 · | · [[L'ile mystérieuse]]
 · | · [[En eaux troubles 2]] (suite au déblocage du VPN)
 · | · [[Partenaire particulier 2]] (suite au déblocage du VPN)
  
---

Le CTF _DeepThreats_, organisé par le Campus OSINT de la DGA (Direction générale de l'armement) et réalisé par [Hakiligence](https://www.linkedin.com/company/hakiligence/) et [HACK'OLYTE](https://www.linkedin.com/company/hack-olyte/), s'est déroulé du 10 au 13 septembre 2026, de 20h à 20h. Le scénario plongeait les participants dans l'investigation d'une ingérence étrangère menée par un pays fictif, situé en mer de Chine et inspiré de la Corée du Nord, contre une entreprise française stratégique de défense. Le système de score reposait sur des points variables selon la difficulté, un nombre de tentatives limité par challenge (3 à 5) et des indices payants (50 à 150 points) en cas de blocage.

Ce RETEX se veut le reflet fidèle de notre parcours sur ce CTF, avec nos réussites, nos limites et les points qui m'ont interrogé, plutôt qu'un simple compte-rendu de résultats.

Nous avons participé à quatre avec Heiden, avec qui j'ai déjà fait quelques CTF, ainsi que deux nouveaux venus dans l'OSINT, Wizzwoman et 6borg, tous deux sans expérience préalable sur ce type de challenge (6borg ayant tout de même déjà pratiqué des challenges cyber classiques). Le CTF couvrait une large palette de domaines, à l'exception notable du GEOINT, peu présent au vu du scénario centré sur un pays imaginaire.

![[DT_TEAM.png]]

Le point fort du CTF reste une mécanique que je n'avais jamais rencontrée auparavant : à un certain stade de l'histoire, l'accès à un VPN nous a permis de nous infiltrer dans le réseau privé interne du pays visé, normalement fermé de l'extérieur, afin de le cartographier et d'en extraire les preuves de l'ingérence étrangère. Cette connexion était surveillée via un score de détection : toute action jugée suspecte, comme un dump de données ou un accès à des fichiers restreints, pouvait entraîner un bannissement temporaire du VPN. Cette immersion technique, couplée à un scénario crédible, a largement contribué à la qualité de l'expérience.

![[DT_STATS.png]]

Nous avons résolu l'intégralité des challenges de la trame principale, à l'exception du tout dernier : un problème de connexion au VPN de la plateforme nous a bloqués dans les toutes dernières minutes du CTF, si bien que nous ne l'avons flaggé que quelques minutes après la deadline officielle. Au final, nous avons terminé 49e sur 489 équipes, soit le top 11 %.

Un point de vigilance à mentionner franchement : contrairement à ce qu'annonçait la communication autour de l'évènement, promettant une investigation 100% OSINT, une partie du CTF nous a menés bien au-delà, avec l'exploitation d'une IDOR, d'une mauvaise configuration d'un serveur Apache, et la récupération des identifiants d'une personne pour usurper son accès à un canal de communication chiffré. Cette portion, plus proche d'un pentest improvisé que d'une véritable démarche OSINT, repose sur des pratiques que je ne cautionne pas dans ce contexte. Ne nous attendant pas à devoir aller jusque-là au vu du règlement, nous avons d'ailleurs consommé plusieurs indices sur ces épreuves précises.

Voici, en un coup d'œil, l'ensemble des ramifications que notre enquête a permis de mettre au jour :

![[DT_PP2.svg]]

En dehors de cet épisode d'intrusion évoqué plus haut, j'ai vraiment apprécié cette expérience et la performance de toute l'équipe. Le CTF est complet et technique, surtout sur la fin, ce qui explique sans doute que seulement 49 équipes sur 489 soient allées jusqu'au bout de la trame principale. Le côté histoire, avec ses découvertes et ses retournements de situation, renforcé par la pression du VPN et des bannissements, a beaucoup contribué à l'ambiance, tout comme la communauté : sur le support comme sur le Discord, admins et participants étaient à fond dans une super ambiance. J'y ai beaucoup appris, et je ne peux que le recommander aux amoureux de l'OSINT en quête de nouveautés. Merci aux admins, qui ont très bien géré le support malgré la charge, toujours dans la bonne humeur et avec beaucoup de pédagogie.

Le certificat officiel : 
![[certificat_2026-09-21.png]]
