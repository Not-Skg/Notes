---
tags:
  - Osint
  - googlelens
  - exif
  - ChallOsint
  - TryHackMe
  - wayback
  - sherlock
---
## 1. The Leaked Photo
### Énoncé
>An ACME Jet Solutions employee uploaded a photo of a residential property believed to be linked to ACME Jet's early operations. 
>>Can you figure out where the picture was taken to confirm or debunk the rumour? 
>>![[edited-house-1763031553617.jpg|500]]
### RETEX
Pour cette première partie de challenge, il faut donc trouver la localisation de cette photo.
Par habitude, je commence par regarder les méta-données de la photo.
![[THM_DF_exif.png|500]]
Et cette dernière contient des coordonnées GPS : `26°12' 14.76", 28°2' 50.28"`. 
Le problème, c'est qu'elle ne précise pas les points cardinaux. 
Analysons un peu la photo pour essayer de les déduire.
![[THM_DF_p1_a.png|500]]
Près de l'entrée, on peut voir un logo "ADT armed response"
Et une rapide recherche Google nous apprend que c'est une entreprise sud-africaine spécialisée dans les services de sécurité.
![[THM_DF_ADT.png|500]]
On peut donc en déduire les points cardinaux et ainsi la localisation GPS exact : `26°12' 14.76"S, 28°2' 50.28"E`.
Pour trouver le "E", j'ai juste testé "W" puis "E". Étant donné que "W" nous emmène en pleine mer, j'ai plus confiance sur la piste du E.
![[THM_DF_city_map.png|500]]
En recherchant les coordonnées sur Google Maps, on trouve la ville **==Johannesburg==**.
On pourrait rechercher l'emplacement exact de la maison en partant des mots clés suivants : "Johannesburg The rectory" déduit de la photo et de nos précédentes recherches, mais ça serait une perte de temps, le flag ne demande que le nom de la ville.

---
## 2. Archived Company Website
### Énoncé
>ACME Jet Solutions (warc-acme.com/jef/), is all over social media claiming they were founded in 2025 and that they're the fastest-growing data company in Africa.  
>But something doesn't add up, one of their ex-employees ensures you that the company existed long before that.  
>
>>Your job as an OSINT investigator is to verify their founding date using only public information.
### RETEX
On veut vérifier la date de création de : [warc-acme.com/jef/](warc-acme.com/jef/.
Pour ce faire, on peut utiliser la [WaybackMachine](https://archive.org/details/warc-acme.com-jef)
![[THM_DF_jef_wbm.png|500]]
On a donc la date de première publication : **==2016 02 10 à 22:46:02==**

---
## 3. Mysterious Landmark
### Énoncé
>Further Investigation uncovers another image believed to be connected to the company's international expansion.  
  >![[landmark-1763035881792.jpg|500]]
>Research reveals that to the right of the iconic landmark is a building that played a big role in the fight for independence of a particular country. Signs on the external wall provides the name of the building.   
>
>>Submit the name of building translated into English as the flag.
### RETEX
En faisant une recherche inversée via Google Lens, on apprend que la tour au centre de cette photo est : "Spire of Dublin"
![[THM_DF_dublin.png|500]]
Le seul bâtiment qui dénote aux alentours et qui fait ancien, c'est le **==General Post Office==**

---
## 4. Internal Documents
### Énoncé
>After uncovering ACME Jet Solutions origins and tracing their online presence through archived websites and international landmarks, investigators believe that an internal document was accidentally leaked by one of the company's developers. 
>
>The document may contain crucial information about the individual responsible for maintaining their systems.
### RETEX
On a donc accès à un nouveau document.
Voici son contenu :
```
From: Mark
To: Robin

This document outlines recent updates made to the internal tracking system. I will be releasing a video very soon, I implore everyone to watch it!  
  
There have been multiple improvements we’ve made:  
  
- Optimised database queries
- Improved user authentication logging
- Minor bug fixes across the platform
- More fixes mentioned but they’d be too long to list

All developers are reminded not to share interal documentation externally.
```

Il dit qu'il va partager une vidéo, mais il ne précise ni comment ni où.
On va donc analyser les méta-données de ce fichier pour espérer trouver un username créateur et pivoter sur ses réseaux.
![[THM_DF_odt_exif.png|500]]
On va donc pouvoir pivoter via `markwilliams7243`.
![[THM_DF_sherlock.png|500]]
On trouve un compte YouTube via sherlock, ce qui colle avec son avis de publier une vidéo.
![[THM_DF_yt.png|500]]
Sur son compte YouTube, on a bien la confirmation qu'il va publier la vidéo, mais aussi le flag.