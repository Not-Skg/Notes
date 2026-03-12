---
tags:
  - Chall
  - Osint
  - Osint4fun
  - AdventOfOsint
---

# Énoncé
>A film enthusiast left on Google this review which, with 2 stars and just a few lines, is fairly unremarkable.
>![[23 Decembre.png]]
>However, it makes it possible to retrieve a crucial piece of information… which becomes very talkative once integrated into Google Maps.
>
>On the afternoon of 17 June 2024, how many steps did the user’s smartwatch show, and what time was it?

## Regex
J'ai testé pleins de dork mais au final le seul intéressant est le plus simple : `"savi" "anil kapoor" site:google.com`
Je retrouve donc [l'avis](https://profile.google.com/k4cxyig4)
![[23 Decembre.2.png]]

Vu que l'avis ne montre rien d'intéressant qui pourrais être lié à un point géographique, je décide de regarder le code source.
dedans on peut y trouver ça : `102786079115098093662` c'est assez tricky comme partie parce qu'il faut connaitre mais en gros c'est un Gaia ID, un identifiant unique de compte google.
on vérifie avec `ghunt gaia 102786079115098093662` et ça match donc on va sur une review maps et on cherche ce qui est lié à ce compte : `https://www.google.com/maps/contrib/102786079115098093662/` 

on tombe sur cette review : 
![[23 Decembre.3.png]]

Et du coup on a le flag : ==1247 15:54:19==
