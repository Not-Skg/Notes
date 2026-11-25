---
title: Fraud
tags:
  - Osint
  - Chall
  - MaltegoQualifierB
order: 4
description: RETEX des challenges de la catégorie "Fraud" du Maltego Community OSINT CTF, Qualifier B
---
![[MaltegoQualifierB.webp]]

>[!info] Notes
> Voici les retex des challs de la catégorie "Fraud" du Qualifier B du Maltego Community OSINT CTF Championship 2026-27.

***Les différentes parties du CTF :***
 · | · [[Geolocation]]
 · | · [[Threat Intelligence]]
 · | · Fraud
 · | · [[Physical Security]]
 · | · [[Chronolocation]]
 · | · [[Trust & Safety]]
 · | · `[[Due Diligence]]`
 · | · `[[Maritime & Aviation]]`
 · | · [[Dark Web]]

---
## The Fake Financial Advisor

### Énoncé
> You notice that your grandmother has recently started talking about investing in cryptocurrencies and making large profits.
>
> After speaking with her, you discover that she has been communicating with someone claiming to be a financial advisor named Antony Smith, who has encouraged her to invest money in cryptocurrency.
>
> You warn her that this could be a scam, but she refuses to believe you. She insists that the advisor must be legitimate because he has a genuine-looking profile picture and a professional identity.
>
> To prove your suspicions, you decide to investigate the person behind the profile picture. Your grandmother sends you the photograph he has been using.
> ![[MQB_FFA.png|300]]
> Your investigation reveals that the person in the photograph is actually a TV host.
>
> Which TV channel does the person in the photograph work for as a host?
>
>> Format: flag{first_last}

### RETEX
La photo du faux conseiller est en noir et blanc, sans aucun indice autour. On lance donc une recherche par image inversée. Sur Yandex, l'onglet "Sites" fait remonter la même photo, au même format (500×519), sur ostankino-school.ru, le site d'une école de télévision de Moscou, avec le nom "Глеб Кудрявцев" (Gleb Kudryavtsev).
![[MQB_FFA_1.png|700]]
La page est la liste des anciens élèves de l'école. Sous la photo, on lit "Ведущий прямых эфиров на канале "Музыка Первого"", c'est-à-dire "Présentateur des directs sur la chaîne Muzyka Pervogo".
![[MQB_FFA_2.png|600]]
Muzyka Pervogo est la chaîne musicale de Pervy kanal, la première chaîne de télévision russe. Le flag est donc **==muzyka_pervogo==**.

---
***Les différentes parties du CTF :***
 · | · [[Geolocation]]
 · | · [[Threat Intelligence]]
 · | · Fraud
 · | · [[Physical Security]]
 · | · [[Chronolocation]]
 · | · [[Trust & Safety]]
 · | · `[[Due Diligence]]`
 · | · `[[Maritime & Aviation]]`
 · | · [[Dark Web]]
