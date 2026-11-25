---
title: Due Diligence
tags:
  - Osint
  - Chall
  - MaltegoQualifierB
order: 8
description: RETEX des challenges de la catégorie "Due Diligence" du Maltego Community OSINT CTF, Qualifier B
draft: true
---
![[MaltegoQualifierB.webp]]

>[!info] Notes
> Voici les retex des challs de la catégorie "Due Diligence" du Qualifier B du Maltego Community OSINT CTF Championship 2026-27.

***Les différentes parties du CTF :***
 · | · [[Geolocation]]
 · | · [[Threat Intelligence]]
 · | · [[Fraud]]
 · | · [[Physical Security]]
 · | · [[Chronolocation]]
 · | · [[Trust & Safety]]
 · | · Due Diligence
 · | · `[[Maritime & Aviation]]`
 · | · [[Dark Web]]

---
## Tracing the Corporate Past

### Énoncé
> You are conducting a due diligence investigation into a company called "Cyber Security Falcon Holding Ltd."
>
> During your investigation, you discover indications that the company may have operated under a different name in the past.
>
> Your task is to investigate the company's registration history and uncover its former identity.
>
> What was the previous registered name of Cyber Security Falcon Holding Ltd.?
>
>> Format: flag{CompanyName}
>>
>> Example: flag{Company_Name_LTD}

### RETEX
On ne trouve la société ni au registre britannique (Companies House), ni dans les bases habituelles comme OpenCorporates. Une recherche Google avec le nom exact entre guillemets donne deux résultats utiles. Le premier est un avis paru en 2021 dans The BVI Beacon, un journal des îles Vierges britanniques : la société y est en liquidation volontaire, sous le numéro 2026087. Le second vient d'i-BVI, un service de recherche dans le registre des sociétés des îles Vierges britanniques.
![[MQB_TCP_1.png|550]]
En cherchant "Cyber Security Falcon" sur i-BVI, on trouve la fiche de la société, avec le même numéro et son ancien nom.
![[MQB_TCP_2.png|650]]
Le flag est donc **==Yoroi_Falcon_Holding_Ltd==**.

>[!warning] Piège
> Le résultat i-BVI de Google mène à la fiche d'une autre société, Benefit Bright (B.V.I.) Limited, dont l'ancien nom est Glory Venture Limited : `flag{Glory_Venture_Limited}` et `flag{Glory_Venture_LTD}` ont été refusés. Et malgré l'exemple de format (`_LTD`), il fallait garder l'écriture du registre, "Ltd".


---
## The Hidden Résumé

### Énoncé
> You have been tasked with conducting a due diligence investigation into Fred Lerner, the Founder and CEO of 1HourPhoto Inc.
>
> Investigators have received intelligence suggesting that a copy of his professional résumé or CV is publicly available somewhere on the internet, separate from his LinkedIn profile.
>
> Your task is to locate the document and examine its details.
>
> What is the filename of Fred Lerner's publicly available résumé/CV?
>
>> Format: flag{filename.ext}
>>
>> Example: flag{cvfile.pdf}

### RETEX
On cherche un CV de Fred Lerner ailleurs que sur LinkedIn. Beaucoup de dirigeants ont un site à leur nom : on regarde donc ce que la Wayback Machine a archivé sur le domaine `fredlerner.com`. L'onglet "URLs" liste toutes les adresses archivées du domaine, et on n'y trouve qu'un seul PDF : `fredlernercv.pdf`, capturé le 6 septembre 2013.
![[MQB_THR_1.png|650]]
Le document archivé est bien le CV de Fred H. Lerner, le fondateur de MailPix (devenu 1HourPhoto) : il y détaille son parcours chez Ritz Interactive, Kodak Processing Labs ou Berkey Photo. Attention à l'homonyme : un autre Fred Lerner, bibliothécaire et historien, a son site sur `fredlerner.org`.

Le flag est donc **==fredlernercv.pdf==**.


---
## Tracing a Dead Domain - 1

### Énoncé
>

### RETEX

---
## The Invisible Director - 1

### Énoncé
> You have been tasked with investigating a company called "BRENNAN CYBER SERVICES LIMITED." The company does not appear to have an official website, so you will need to rely on other publicly available sources and records to uncover information about the people behind it.
>
> Who is the director name of BRENNAN CYBER SERVICES LIMITED?
>
>> Format: flag{first_last}

### RETEX
La société n'a pas de site web, et elle n'apparaît pas au registre britannique Companies House. Brennan étant un nom irlandais, on cherche du côté de l'Irlande : la société est sur CompanyCheck.ie, qui reprend les données du registre irlandais des sociétés (CRO). C'est bien elle : Brennan Cyber Services Ltd, n° 693811, enregistrée à Bantry, dans le comté de Cork.
![[MQB_TID_1.png|600]]
Les dirigeants ne sont pas affichés gratuitement, mais la fiche donne accès aux comptes annuels déposés au CRO, en PDF et sans compte. Or les comptes d'une petite société sont signés par son directeur : on y lit "Mr Ian Brennan, Director".
![[MQB_TID_2.png|500]]
Le flag est donc **==ian_brennan==**.


---
***Les différentes parties du CTF :***
 · | · [[Geolocation]]
 · | · [[Threat Intelligence]]
 · | · [[Fraud]]
 · | · [[Physical Security]]
 · | · [[Chronolocation]]
 · | · [[Trust & Safety]]
 · | · Due Diligence
 · | · `[[Maritime & Aviation]]`
 · | · [[Dark Web]]
