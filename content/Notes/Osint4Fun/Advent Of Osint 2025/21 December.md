---
tags:
  - Chall
  - Osint
  - Osint4fun
  - AdventOfOsint
---
## Énoncé
>Dans la ville suédoise de Gävle, on construit chaque mois de décembre (et ce, depuis 1966 !) un bouc en paille géant en l’honneur du traditionnel « julbock », l’un des plus anciens symboles de Noël scandinave.
>![[Tony Nordin.png|500]]
>Cependant, cette construction fait régulièrement l’objet de faits divers assez cocasses : elle est illégalement brûlée presque chaque année ! Les pro- et anti-boucs rivalisent désormais d’imagination pour protéger ou incendier le bouc, avec des stratagèmes de plus en plus sophistiqués. Parmi les moyens de surveillance mis en place, un live en continu est diffusé chaque année pour que tout le monde puisse garder un œil dessus... et guetter le moindre pyromane !
>
>Quel est le titre de la musique diffusée à minuit heure locale, dans la nuit du 30 au 31 décembre 2019 ?
>>*Pas de format de réponse spécifié*

## RETEX
On peut trouver un [tweet à ce propos](https://x.com/IliasBM/status/1211358584698736640/photo/1) et le [compte officiel](https://x.com/GavleGoat), mais ce dernier ne donne rien avant 2019. 
Aillant peut que ça soit un rabbit hole, je décide de chercher du côté de la communication officielle de la ville.
On retrouve assez facilement le compte YouTube officiel de la [ville](https://www.youtube.com/@sharegavle)
De la même façon, elle ne remonte pas assez loin. Et ça même en cherchant sur la Waybackmachine.

Il faut savoir que l'on peut rechercher des infos sur une chaine YouTube via sur username mais aussi via son ID.
 
Pour ce faire, on inspecte la page et on cherche `/channel/` on a donc UClC8PklsjYOPQ8DNpALPKLg

	(Je viens d'apprendre qu'on peut aussi le trouver en faisant simplement "Partager la chaine" > "Copier l'ID"...)

Grâce à ça on peut construire le lien : hxxps://www[.]youtube[.]com/channel/ID

Ça ne donne toujours rien, mais du coup, on peut retester via l'autre chaine youtube gavlegoatlive. Cette fois ci on trouve quelque chose en [2019](https://web.archive.org/web/20190801000000*/https://www.youtube.com/channel/UC_521_9yuT-EQqfF7cip2Ig).
![[content/Notes/Osint4Fun/Advent Of Osint 2025/21 December/21D_jackpot.png|500]]

On retombe donc sur cette [vidéo](https://www.youtube.com/watch?v=7hUjdVKkHro&spf=navigate&themeRefresh=1) et elle sonne minuit à 11:35:55 et on peut trouver via shazam le nom de la musique qui est donc : la musique est donc : **==Up on the Housetop==**



