---
title: Maritime & Aviation
tags:
  - Osint
  - Chall
  - MaltegoQualifierB
order: 9
description: RETEX des challenges de la catégorie "Maritime & Aviation" du Maltego Community OSINT CTF, Qualifier B
draft: true
---
![[MaltegoQualifierB.webp]]

>[!info] Notes
> Voici les retex des challs de la catégorie "Maritime & Aviation" du Qualifier B du Maltego Community OSINT CTF Championship 2026-27.

***Les différentes parties du CTF :***
 · | · [[Geolocation]]
 · | · [[Threat Intelligence]]
 · | · [[Fraud]]
 · | · [[Physical Security]]
 · | · [[Chronolocation]]
 · | · [[Trust & Safety]]
 · | · `[[Due Diligence]]`
 · | · Maritime & Aviation
 · | · [[Dark Web]]

---
## Uncovering the Aircraft's Ownership Trail

### Énoncé
> You are investigating an interesting aviation case when you receive a file containing seemingly unreadable or encoded data. Your task is to analyze the provided file, extract meaningful information, and trace the aircraft's ownership history.
>
> Through your investigation, identify one name listed under "Other Owner Names" is also listed as a co-owner of the aircraft registered as N292AF.
>
> Uncovering_the_Aircrafts_Ownership_Trail.txt
>
> Submit the owner's name exactly as it appears in the registry record, including any suffix such as a title.
>
>> Flag Format: flag{OWNER_FULL_NAME}
>>
>> Note - Submit the owner's full name in UPPERCASE. Replace all spaces between names with underscores (_).
>>
>> Ensure the spelling matches the information found during your investigation.

### RETEX
Le fichier fourni ne contient que des points et des tirets : c'est du morse. Avec CyberChef et l'opération "From Morse Code", on obtient un message répété : "ICAO24: A7AC49 ADS-B DF17, TYPE CODE 4 (AIRCRAFT IDENTIFICATION)", suivi d'une trame ADS-B en hexadécimal. A7AC49 est l'adresse ICAO de l'avion, l'identifiant unique de son transpondeur.
![[MQB_AOT_1.png|600]]
Une simple recherche Google de cette adresse donne l'immatriculation de l'avion : N594AF, un Pilatus PC-24. Le N initial indique un avion immatriculé aux États-Unis.
![[MQB_AOT_2.png|500]]
On consulte donc le [registre de la FAA](https://registry.faa.gov/AircraftInquiry/Search/NNumberResult?nNumberTxt=594AF), l'administration américaine de l'aviation civile, pour N594AF puis pour N292AF, l'avion cité dans l'énoncé. Ce sont deux avions en copropriété : chaque fiche liste les copropriétaires dans la rubrique "Other Owner Names". Un seul nom apparaît dans les deux listes.
![[MQB_AOT_3.png|700]]
Le flag est donc **==DAVIDSON_THOMAS_N_TRUSTEE==**.


---
## Decoding the Satellite Downlink - 1

### Énoncé
> Your team is investigating satellite communication systems and has recovered a file containing technical information about a satellite's digital downlink. Your task is to analyze the provided file and identify the modulation scheme and baud rate (symbol rate) used by the satellite to transmit its primary AX.25 packets.
>
> Decoding_the_Satellite_Downlink_-_1.txt
>
> Examine the available technical information carefully and determine both the modulation type and symbol rate to construct the flag.
>
>> Flag Format: flag{Modulation type_symbol rate}
>>
>> Example: flag{ABC_1234}

### RETEX
Le fichier contient deux lignes de chiffres : c'est un TLE (Two-Line Element), le format standard qui décrit l'orbite d'un satellite.
```
1 98194U 26229B   26296.75886877  .00002265  00000-0  19958-3 0  9993
2 98194  97.6993  32.6703 0010090  44.7107 315.4926 14.97421341  2503
```
Sur la première ligne, on lit le numéro de catalogue du satellite, 98194, et sa désignation internationale, 26229B : le deuxième objet (B) du 229e lancement de 2026.

En cherchant cette désignation dans le [catalogue de CelesTrak](https://celestrak.org/satcat/table-satcat.php?INTDES=2026-229), on trouve que l'objet B est CPSAT, un satellite sud-coréen.
![[MQB_SD1_1.png|650]]
La base communautaire [SatNOGS DB](https://db.satnogs.org/satellite/AMZY-1477-5767-9442-4222) répertorie les émetteurs des satellites amateurs. Sur la fiche de CPSAT, l'émetteur principal s'appelle "Mode U - BPSK9k6 - AX.25 G3RUH" : il émet en BPSK, à 9600 bauds.
![[MQB_SD1_2.png|550]]
Le flag est donc **==BPSK_9600==**.


---
## Decoding the Satellite Downlink - 2

### Énoncé
> Mission control has received downlinked telemetry packets from the amateur satellite's transceiver subsystem (Beacon 6 – TRS). During a recent high-elevation ground pass, the primary Earth station transmitted an emergency uplink sequence to the satellite's onboard receiver.
>
> Your task is to investigate the satellite's telemetry dashboard and locate the Onboard Receiver Signal Strength panel. Analyze the telemetry data for 2026-10-22 at 15:04:29 and determine the maximum uplink power received at the satellite's antenna port.
>
> Submit the identified signal strength as the flag.
>
>> Flag Format: flag{VALUE} - if the value is 25.1 dBm so flag would be flag{25.1_dBm}

### RETEX
La fiche SatNOGS DB de CPSAT renvoie aussi vers son tableau de bord de télémétrie ("Telemetry Dashboard"), un Grafana public. On y règle la période autour du 22 octobre 2026 à 15:04:29, en UTC, et on ouvre le panneau "Onboard receiver signal strength (dBm)", dans la partie "Beacon 6 - TRS". Un seul point est enregistré à ce moment-là : en le survolant, on lit -104.5 dBm.
![[MQB_SD2_1.png|700]]
Le flag est donc **==-104.5_dBm==**.


---
## Vessel Identification

### Énoncé
>

### RETEX

---
## Tracing Vessel Identity Across Flag Changes - 1

### Énoncé
> Using the provided vessel photograph, investigate the vessel's maritime identity and ownership history. Cross-reference maritime databases and historical vessel records to determine the vessel's current MMSI number. Then identify the two flag states under which it operated while it was named "Range ****".
> ![[MQB_TVI.webp|500]]
> Use only flags that are consistent across the records you find, and ignore any annotations attached to a flag.
>
> Submit the current MMSI followed by the two flag nations in alphabetical order. Capitalize the first letter of each flag name.
>
>> Flag Format: flag{MMSI_Flag1_Flag2}

### RETEX
Le nom du pétrolier est peint sur sa coque : PELAGOS ONE.
![[MQB_TVI_1.png|600]]
En cherchant ce nom sur un site de suivi des navires comme VesselFinder, on retrouve le navire par son numéro IMO, 9299898, qui le suit quels que soient ses changements de nom. Il s'appelle aujourd'hui PALARA. Sa fiche la plus complète est celle du [registre de la "flotte fantôme"](https://war-sanctions.gur.gov.ua/en/transport/shadow-fleet/409) tenu par le renseignement militaire ukrainien (GUR) : on y trouve le nom actuel, le numéro IMO et le MMSI actuel, 667002277.
![[MQB_TVI_2.png|600]]
La même fiche liste ses anciens noms, dont Range Vale. Pour les pavillons portés sous ce nom, [The Maritime Executive](https://maritime-executive.com/article/madagascar-and-landlocked-zimbabwe-warn-imo-of-false-flags) cite la base Equasis : sous le nom Range Vale, le navire a déclaré successivement les Comores, le Zimbabwe, puis la Sierra Leone, tous marqués comme faux.
![[MQB_TVI_3.png|330]]
Le Zimbabwe, un pays sans accès à la mer et sans registre maritime, a d'ailleurs signalé cette fraude à l'OMI. En ignorant l'annotation "false", comme le demande l'énoncé, et en mettant de côté la Sierra Leone, qui est toujours le pavillon actuel du navire sous le nom PALARA, il reste les Comores et le Zimbabwe.

Le flag est donc **==667002277_Comoros_Zimbabwe==**.

>[!warning] À confirmer
> Flag reconstitué après le CTF à partir des sources : à vérifier avec celui qui a été validé.


---
## Tracing Vessel Identity Across Flag Changes - 2

### Énoncé
> An international coalition has imposed restrictions on tanker IMO 9299898, with the United Kingdom initiating sanctions-related actions in October 2024, followed by the European Union, Switzerland, and Canada.
>
> Your task is to investigate the vessel's sanctions records and identify the authority-issued sanctions tracking identifier assigned to it by the UK Foreign, Commonwealth & Development Office (FCDO) under the sanctions program GB-RUS.
>
> Correlate the available sanctions information and retrieve the exact identifier assigned to the vessel.

### RETEX
La [liste officielle des sanctions britanniques](https://search-uk-sanctions-list.service.gov.uk/?searchValue=9299898) se consulte en ligne, et on peut y chercher directement le numéro IMO 9299898. Elle renvoie une seule fiche, au nom de TURBO VOYAGER, l'un des anciens noms du navire, sous le régime "Russia", avec une désignation le 17 octobre 2024. Son identifiant unique est RUS2239.
![[MQB_TVI_4.png|650]]
Le flag est donc **==RUS2239==**.


---
## Tracing Vessel Identity Across Flag Changes - 3

### Énoncé
> A tanker built in 2005 was designated by both the European Union and Switzerland in December 2024 for deceptive and irregular shipping practices. Identify the vessel and investigate its sanctions history. Submit the country that first imposed sanctions on the vessel, followed by the IMO General Assembly resolution cited as the legal basis for the EU and Swiss designations.
>
>> Write the country name in full (no abbreviations), capitalizing the first letter of each word, with underscores for spaces. Keep the resolution code exactly as written.

### RETEX
La fiche GUR du navire résume tout son historique de sanctions dans la partie "Justification". Le Royaume-Uni est le premier à le sanctionner, le 17 octobre 2024. L'Union européenne et la Suisse suivent en décembre 2024, en citant la résolution A.1192(33) de l'Assemblée générale de l'Organisation maritime internationale, qui décrit les pratiques de navigation irrégulières et à haut risque.
![[MQB_TVI_5.png|650]]
Le flag est donc **==United_Kingdom_A.1192(33)==**.


---
## Tracing Vessel Identity Across Flag Changes - 4

### Énoncé
> Following the UK's sanctions against UAE-based operator Radiating World Shipping Services LLC in December 2023, the tanker underwent management restructuring involving newly established shell corporations, potentially to evade international enforcement measures.
>
> Your task is to investigate the vessel's corporate and management history to identify the specific commercial management entity that officially assumed the role of "Commerce Manager" on March 21, 2026.
>
> The entity is identified in the relevant records as a "Person of Interest." Trace the vessel's management changes and uncover the name of the newly appointed commercial management entity.
>
>> Note: Write the entity name exactly as it appears in the source, preserving spelling and capitalization. Replace spaces with underscores (_). Do not alter abbreviations or suffixes (for example, keep "Ltd" as written; don't change it to "LTD" or "Limited").

### RETEX
Toujours sur la fiche GUR, la partie "Available additional information" donne les sociétés liées au navire. Depuis le 21 mars 2026, son gestionnaire commercial ("Commercial ship manager") est Lundavrex Portalis Ltd, une société de Hong Kong, qui en est aussi devenue le propriétaire le même jour.
![[MQB_TVI_6.png|650]]
Le flag est donc **==Lundavrex_Portalis_Ltd==**.


---
## Tracing Vessel Identity Across Flag Changes - 5

### Énoncé
> Ukrainian intelligence actively monitors merchant vessels suspected of participating in sanctions circumvention, weapons transportation, and illicit cargo operations in support of the Russian Federation.
>
> The vessel under investigation has been documented by Ukraine's Defense Intelligence agency (ГУР МО України).
>
> Your task is to investigate the agency's maritime shadow fleet registry and identify the internal program code or identifier used for maritime shadow fleet sanctions designations. Examine the relevant registry records and retrieve the exact program identifier.

### RETEX
Le registre du GUR est repris par [OpenSanctions](https://www.opensanctions.org/entities/NK-cfWFCgJ7etMfnZSJx4xSsb/), qui agrège les listes de sanctions et attribue à chacune un code de programme. Dans les données brutes de la fiche du navire (lien "raw data explorer"), la ligne `programId` de la source `ua_war_sanctions`, c'est-à-dire le registre du GUR, vaut UA-WS-MARE.
![[MQB_TVI_7.png|650]]
Le flag est donc **==UA-WS-MARE==**.


---
## Tracing Vessel Identity Across Flag Changes - 6

### Énoncé
> The tanker currently named Palara has been subject to sanctions by multiple jurisdictions between October 2024 and December 2025. Its sanctions timeline includes the United Kingdom, European Union, Switzerland, Canada, New Zealand and Ukraine, plus one jurisdiction not named here (Jurisdiction X).
>
> Identify Jurisdiction X from the sanctions records. Then examine the vessel's registration history across all available records and count the distinct flag states it has been registered under, including flags marked false or unverified, and excluding its current flag. Submit the jurisdiction followed by the count.
>
> Correlate the sanctions timeline with the vessel's registration history and submit both findings in the required flag format.

### RETEX
La fiche GUR liste les pays qui ont sanctionné le navire : en plus de ceux cités dans l'énoncé, on y trouve l'Australie, qui l'a sanctionné le 4 décembre 2025.
![[MQB_TVI_2.png|600]]
Pour les pavillons, la même fiche donne six anciens pavillons : Grèce, Niue, Indonésie, Îles Cook, Honduras et Tanzanie.
![[MQB_TVI_6.png|650]]
L'énoncé demande de compter aussi les pavillons marqués comme faux : il faut donc ajouter les Comores et le Zimbabwe, déclarés sous le nom Range Vale (partie 1). La Sierra Leone est exclue, puisque c'est le pavillon actuel. Cela fait 8 pavillons.

Le flag est donc **==Australia_8==**.

>[!warning] À confirmer
> Flag reconstitué après le CTF à partir des sources : à vérifier avec celui qui a été validé (sans les faux pavillons, le compte serait de 6).


---
***Les différentes parties du CTF :***
 · | · [[Geolocation]]
 · | · [[Threat Intelligence]]
 · | · [[Fraud]]
 · | · [[Physical Security]]
 · | · [[Chronolocation]]
 · | · [[Trust & Safety]]
 · | · `[[Due Diligence]]`
 · | · Maritime & Aviation
 · | · [[Dark Web]]
