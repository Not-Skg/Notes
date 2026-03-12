---
tags:
  - Chall
  - Osint
  - Osint4fun
  - AdventOfOsint
---
# Énoncé [1/2]
>During the autumn of 2025, the UK Maritime Trade Operations (UKMTO) issued a warning regarding a maritime incident that occurred near the following coordinates: `12.381162, 46.468557`.
>The cause of the incident, however, could not be determined with certainty.
>What is the IMO number of the vessel involved?


## RETEX
En cherchant `alerte UKMTO d'automne 2025` on trouve : https://www.ukmto.org/ukmto-products/advisories/2025
et ça nous donne pleins de rapport, il faut tous les vérifier 1 par 1 jusqu'à trouver :

| 20251018-UKMTO_ADVISORY_036-25 - Update-002 | 19/10/2025 | 14:50 | 20251018-UKMTO_ADVISORY_036-25 - Update-002 | Gulf of Aden |
| ------------------------------------------- | ---------- | ----- | ------------------------------------------- | ------------ |
puis en cherchant `a` on trouce le [pdf](https://www.steamshipmutual.com/sites/default/files/medialibrary/files/JMIC%20Week%2042%20Dashboard%2013%20October%20-%2019%20October%202025.pdf) avec dedans l'info : ==IMO 9014432==

# Énoncé [2/2]
>In response to the vessel’s distress situation, several assets were deployed to provide assistance, including an aircraft from the French armed forces.
>Which officer was in command of the rescue operation?

## RETEX
En cherchant : `116NM east of Aden, Yemen` on trouve ce [site](https://shipandbunker.com/news/world/676046-24-crew-rescued-from-lpg-tanker-after-fire-in-gulf-of-aden#:~:text=24%20crew%20members%20have%20been,45%20AM%20UTC%20on%20Saturday.) qui nous dit : ==Andrea Quondamatteo==
