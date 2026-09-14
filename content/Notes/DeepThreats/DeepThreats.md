---
tags:
  - Osint
  - DeepThreats
  - CTF
order: 1
description: Mon RETEX sur le CTF DeepThreats
---

![[DT.png]]

>[!info] Ce RETEX sera complété au fur et à mesure, au fil de la publication des différentes parties du CTF.

***Les différentes parties du CTF :***
 · | · `[[A vos marques]]`
 · | · `[[En eaux troubles]]`
 · | · `[[What's up doc ?]]`
 · | · `[[Partenaire particulier]]`
 · | · `[[Une drôle de fleur]]`
 · | · `[[L'ile mystérieuse]]`


---

Le CTF _DeepThreats_, organisé par le Campus OSINT de la DGA (Direction générale de l'armement), s'est déroulé du 10 au 13 septembre 2026, de 20h à 20h. Le scénario plongeait les participants dans l'investigation d'une ingérence étrangère menée par un pays fictif, situé en mer de Chine et inspiré de la Corée du Nord, contre une entreprise française stratégique de défense. Le système de score reposait sur des points variables selon la difficulté, un nombre de tentatives limité par challenge (3 à 5) et des indices payants (50 à 150 points) en cas de blocage.

Contrairement à ce qu'annonçait la communication autour de l'évènement, promettant une investigation 100% OSINT, une partie du CTF nous a menés bien au-delà : exploitation d'une IDOR, d'une mauvaise configuration d'un serveur Apache, et récupération des identifiants d'une personne pour usurper son accès à un canal de communication chiffré. 
C'est mon principal point noir sur ce CTF : cette portion, plus proche d'un pentest improvisé que d'une véritable démarche OSINT, repose sur des pratiques que je ne cautionne pas dans ce contexte. Ne nous attendant pas à devoir aller jusque-là au vu du règlement, nous avons d'ailleurs consommé plusieurs indices sur ces épreuves précises.

![[DT_CBF.png]]

Nous avons participé à quatre avec Heiden, avec qui j'ai déjà fait quelques CTF, ainsi que deux nouveaux venus dans l'OSINT, Wizzwoman et 6borg, tous deux sans expérience préalable sur ce type de challenge (6borg ayant tout de même déjà pratiqué des challenges cyber classiques). Le CTF couvrait une large palette de domaines, à l'exception notable du GEOINT, peu présent au vu du scénario centré sur un pays imaginaire. 
Nous avons résolu l'intégralité des challenges de la trame principale, à l'exception du tout dernier : un problème de connexion au VPN de la plateforme nous a bloqués dans les toutes dernières minutes du CTF, si bien que nous ne sommes parvenus à le flag que quelques minutes après la deadline officielle.

![[DT_TEAM.png]]

Le point fort du CTF reste une mécanique que je n'avais jamais rencontrée auparavant : à un certain stade de l'histoire, l'accès à un VPN nous a permis de nous infiltrer dans le réseau privé interne du pays visé, normalement fermé de l'extérieur, afin de le cartographier et d'en extraire les preuves de l'ingérence étrangère. 
Cette connexion était surveillée via un score de détection : toute action jugée suspecte, comme un dump de données ou un accès à des fichiers restreints, pouvait entraîner un bannissement temporaire du VPN. Cette immersion technique, couplée à un scénario crédible, a largement contribué à la qualité de l'expérience, malgré la réserve mentionnée plus haut.

![[DT_STATS.png]]

Au final, nous terminons 50e sur 455 équipes, soit le top 11 %. Mon principal regret sur ce CTF reste de ne pas avoir pu boucler la trame principale « officiellement », à quelques minutes près. Ce regret mis à part, et en dehors de l'épisode d'intrusion évoqué plus haut, j'ai vraiment apprécié cette expérience et la performance de toute l'équipe.

`[Bientôt - Certificat]`
