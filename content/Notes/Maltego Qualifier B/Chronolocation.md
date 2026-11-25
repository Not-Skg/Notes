---
title: Chronolocation
tags:
  - Osint
  - Chall
  - MaltegoQualifierB
order: 6
description: RETEX des challenges de la catégorie "Chronolocation" du Maltego Community OSINT CTF, Qualifier B
---
![[MaltegoQualifierB.webp]]

>[!info] Notes
> Voici les retex des challs de la catégorie "Chronolocation" du Qualifier B du Maltego Community OSINT CTF Championship 2026-27.

***Les différentes parties du CTF :***
 · | · [[Geolocation]]
 · | · [[Threat Intelligence]]
 · | · [[Fraud]]
 · | · [[Physical Security]]
 · | · Chronolocation
 · | · [[Trust & Safety]]
 · | · [[Due Diligence]]
 · | · [[Maritime & Aviation]]
 · | · [[Dark Web]]

---
## Eyes From Orbit

### Énoncé
> An incident occurred in October, and satellite imagery captured the area associated with the event. Investigators believe the imagery may hold clues about the organization or facility targeted in the attack.
> ![[MQB_EFO.webp|500]]
> Your task is to analyze the satellite imagery, investigate the incident using publicly available information, and identify the name of the company or industry targeted.
>
>> Flag Format: If the targeted company is Test, submit flag{Test}.
>>
>> Note: Write the flag with the first letter capitalized and replace all spaces with underscores.

### RETEX
L'image satellite montre une zone industrielle en plein désert, avec un panache de fumée noire qui s'échappe d'un site. On lance une recherche par image inversée avec Google Lens : parmi les correspondances visuelles, une publication reprend la même image avec le titre "Saudi Aramco Refinery In Riyadh Has Been Struck". On tient une piste : la raffinerie de Saudi Aramco à Riyad.
![[MQB_EFO_1.png|450]]
Pour la confirmer, on cherche une source de presse. La même image illustre un [article du Guardian](https://www.theguardian.com/world/2026/oct/12/why-are-the-houthis-attacking-saudi-airports-riyadh-yemen) du 12 octobre 2026, avec la légende "Smoke rising from the site of the Saudi Aramco refinery south of Riyadh on 3 October after a suspect Houthi attack". C'est bien un incident d'octobre, comme l'indique l'énoncé.
![[MQB_EFO_2.png|450]]
L'énoncé demande le nom de la société visée. Le flag est donc **==Saudi_Aramco==**.

---
***Les différentes parties du CTF :***
 · | · [[Geolocation]]
 · | · [[Threat Intelligence]]
 · | · [[Fraud]]
 · | · [[Physical Security]]
 · | · Chronolocation
 · | · [[Trust & Safety]]
 · | · [[Due Diligence]]
 · | · [[Maritime & Aviation]]
 · | · [[Dark Web]]
