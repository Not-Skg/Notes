---
tags:
  - EUROPOL
  - Osint
  - ChallOsint
  - OsintIndustries
  - wayback
  - immat
---
## Énoncé
>  ==**Important**==
>This challenge has been made by EVO7
>This is a real Europol Most Wanted listing.  
>Participants may verify the information on the official Europol website:  
[https://eumostwanted.eu/de#/tymoshchuk-timoschuk-volodymyr-viktorovych-volodimir-viktorovich](https://eumostwanted.eu/de#/tymoshchuk-timoschuk-volodymyr-viktorovych-volodimir-viktorovich)
>
>==**Target Information**==
>- Name: TYMOSHCHUK (ТИМОЩУК), Volodymyr Viktorovych (Володимир Вікторович)
>- Date of birth: October 2, 1996 (29 years old)
>- Countries linked: France, Ukraine
>
>==**Wanted by France for**==
>- Computer-related crime
>- Participation in a criminal organisation
>- Racketeering and extortion
>This data originates from the official Europol Most Wanted listing.
>
>==**Case Summary (From official listing)**==
>From 2018 to 2020, Volodymyr TYMOSHCHUK and accomplices participated in deploying the LOCKERGOGA ransomware on hundreds of victim companies.  
>These attacks severely disrupted operations and forced multiple organisations to pay ransom demands.  
>Total global damages exceeded $18 billion.
>
>==**Objective**==
>Using legal open-source intelligence methods, identify:
>- the licence plate of the vehicle linked to the individual
>- its brand
>- model
>- year of manufacture
>- last known mileage
>
>==**Final Answer Format**==
>>Your final answer must follow this exact format, in this exact order:
>>*OSINT{[licence plate number], [brand], [model], [year], [mileage]}*
>>
>>Example format (not the solution)
>>*OSINT{OS 1111 NT, MCLAREN, 750S, 2023, 123KM}*
>
>==**Rules**==
>- Use only legal, open-source methods
>- No contact with the target
>- No intrusion or bypassing access controls


## RETEX
Ce challenge est un exercice de SOCMINT classique : à partir d'une fiche Europol Most Wanted, il s'agit de remonter jusqu'au véhicule d'un individu recherché (marque, modèle, année, kilométrage) en s'appuyant uniquement sur son identité et ses alias connus.

Je commence par chercher la notice exacte de cette personne sur le site d'Europol.

Le problème, c'est que le challenge date de 2025 et que la Wayback Machine ne possède pas d'archives visuelles intéressantes.
![[OI_OL_01.png]]
J'ai donc dû retrouver la notice par une recherche par mots-clés sur Google, qui a fini par me donner [plusieurs articles](https://www.lemonde.fr/pixels/article/2025/09/11/volodymyr-tymoshchuk-chef-ukrainien-d-un-reseau-de-cybercriminalite-place-sur-la-liste-europol-des-personnes-recherchees_6640353_4408996.html) contenant la notice en question.
![[OI_OL_02.png]]
Cette notice donne accès à plus d'informations sur le recherché, comme ses alias connus : Deadforz, Boba, Farnetwork, Msfv, Volotmsk.  
Ces alias, croisés avec sa photo, permettent d'entamer des recherches sur les réseaux, en espérant qu'il ait posté une photo de sa voiture.
![[OI_OL_03.png]]
Le premier pseudo mène à un compte TikTok avec une vidéo d'une personne conduisant une voiture, mais rien ne prouve que c'est bien la personne recherchée.
![[OI_OL_04.png]]
Et la photo de profil ne lui ressemble pas vraiment.  
Un comparateur en ligne permet de le confirmer :
![[OI_OL_05.png]]
On peut continuer nos recherches à partir des autres alias dont on dispose.
![[OI_OL_06.png]]
L'alias Volotmsk renvoie vers [un compte Instagram](https://www.instagram.com/volotmsk___/), qui possède plusieurs posts sur une voiture, mais le visage de la personne liée au compte est masqué.
![[OI_OL_07.png]]
Sa bio retient l'attention : elle affiche « Вова » (Vova), diminutif courant de Volodymyr, le prénom même de la cible. C'est sans doute ce qui explique la présence de l'alias « Boba » dans la notice Europol : en cyrillique, le « В » majuscule se lit visuellement comme un « B » latin, ce qui peut expliquer une transcription de « Вова » en « Boba ». On note aussi un drapeau ukrainien dans la bio, cohérent avec la nationalité de la cible.
![[OI_OL_08.png]]
En zoomant sur l'une des photos du compte, la plaque d'immatriculation du véhicule devient lisible, et elle est ukrainienne.
![[OI_OL_09.png]]
[Plus précisément](https://www.mesplaques.fr/plaque-immatriculation-ukraine), elle est immatriculée à Vinnytsia.
![[OI_OL_10.png]]
Cette plaque permet de [retrouver des informations sur le véhicule](https://auto-info.gratis/en/raport/3057c2e56a4b34d7bf95892f3c1e0c22/) : marque, modèle, VIN et date de fabrication.

![[OI_OL_11.png]]
Une story Instagram plus récente affiche même le compteur de la voiture : 36 921 km.

On obtient donc le flag : **==OSINT{AB 6637 IE, PORSCHE, CAYENNE, 2019, 36921KM}==**

Ce challenge montre bien qu'un simple alias, croisé avec une bio et quelques photos publiques, suffit souvent à remonter jusqu'à un véhicule précis, sans qu'aucune étape ne sorte du cadre de la recherche en sources ouvertes. On aurait pu pousser plus loin sur les autres traces numériques, mais ce n'était pas l'objectif ici.