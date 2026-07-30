---
tags:
  - Chall
  - Osint
  - Osint4fun
  - AdventOfOsint
---
## Énoncé
>Un amateur de films a laissé sur Google cet avis qui, avec 2 étoiles et quelques lignes, est plutôt banal.
>![[23 Decembre.png|500]]
>Il permet pourtant de récupérer une information cruciale... qui se montrera bien bavarde une fois intégrée dans Google Maps.
>
>Le 17 juin 2024 dans l'après-midi, combien de pas la montre connectée de l'utilisateur indiquait-elle, et quelle heure était-il ?
>>*Format de réponse :* 2814 17:12:52

## Retex
J'ai testé pleins de dork mais au final, le seul intéressant est le plus simple : `"savi" "anil kapoor" site:google.com`
Je retrouve donc [l'avis](https://profile.google.com/k4cxyig4)
![[23 Decembre.2.png|500]]
Vu que l'avis ne montre rien d'intéressant qui pourrait être lié à Google Maps, je décide de regarder le ==code source==.
Dedans, on peut y trouver ça : `102786079115098093662` c'est assez tricky comme partie parce qu'il faut connaitre, mais en gros, c'est un ==Gaia ID==, un identifiant unique de compte Google.
On vérifie avec `ghunt gaia 102786079115098093662` et ça match.
On peut donc chercher les avis/photo Google Maps laissé par ce compte et voir si on peut en tirer quelque chose : `https://www.google.com/maps/contrib/102786079115098093662/` 

On trouve cette photo : 
![[23 Decembre.3.png|500]]
On a donc l'heure **==15:54:19==** et le nombre de pas : **==1247==**
