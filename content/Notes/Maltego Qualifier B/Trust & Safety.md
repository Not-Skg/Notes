---
title: Trust & Safety
tags:
  - Osint
  - Chall
  - MaltegoQualifierB
order: 7
description: RETEX des challenges de la catégorie "Trust & Safety" du Maltego Community OSINT CTF, Qualifier B
---
![[MaltegoQualifierB.webp]]

>[!info] Notes
> Voici les retex des challs de la catégorie "Trust & Safety" du Qualifier B du Maltego Community OSINT CTF Championship 2026-27.

***Les différentes parties du CTF :***
 · | · [[Geolocation]]
 · | · [[Threat Intelligence]]
 · | · [[Fraud]]
 · | · [[Physical Security]]
 · | · [[Chronolocation]]
 · | · Trust & Safety
 · | · `[[Due Diligence]]`
 · | · `[[Maritime & Aviation]]`
 · | · [[Dark Web]]

---
## Instagram Real Identity Hunt

### Énoncé
> You have been tasked with investigating a suspicious Instagram account suspected of impersonating another person.
>
> Instagram Profile ID: 53217660376
>
> Question: What is the exact date on which the profile picture of the Instagram account was updated?
>
>> Format: flag{DD.MM.YYYY}

### RETEX
On ne connaît que l'identifiant numérique du compte. Un outil comme [miniwebtool](https://miniwebtool.com/instagram-user-id-lookup/) permet de retrouver le nom d'utilisateur qui lui correspond : c'est le compte @iqrashrarti, qui porte bien notre identifiant.
![[MQB_IRIH_0.png|700]]
Ça nous permet déjà de voir le profil, mais pas de savoir quand sa photo a été changée. Pour ça, il faut aller un peu plus loin : quand on est connecté à Instagram, l'adresse `https://www.instagram.com/api/v1/users/53217660376/info/` renvoie toutes les informations du compte au format JSON, dont le champ `profile_pic_id`.
![[MQB_IRIH_1.png|700]]
C'est l'identifiant de la photo de profil, suivi de celui du compte. La partie qui nous intéresse est donc `3838249302603076106` : cet identifiant a été attribué à la photo au moment où elle a été envoyée sur Instagram. Comme ceux de Twitter ou de Discord, il contient sa date de création : ses premiers bits comptent les millisecondes écoulées depuis le 24 août 2011, la date de départ choisie par Instagram, et ses 23 derniers bits servent seulement à identifier le serveur et à numéroter les photos.

Pour retrouver la date, on retire donc ces 23 bits (`>> 23`), on ajoute l'écart entre le 1er janvier 1970 et le 24 août 2011 (1314220021721 ms) pour obtenir un horodatage Unix classique, puis on divise par 1000 pour passer en secondes. Une seule commande fait tout le calcul :
```bash
date -u -r $(( ((3838249302603076106 >> 23) + 1314220021721) / 1000 ))
```
![[MQB_IRIH_2.png|600]]

Si on ne veut pas faire le calcul soi-même, le site Epoch Converter propose un [convertisseur d'identifiants Snowflake](https://www.epochconverter.com/snowflake) qui connaît déjà la date de départ d'Instagram : il suffit de choisir Instagram, de coller l'identifiant de la photo, et on obtient la même date.
![[MQB_IRIH_3.png|600]]
La photo de profil a été mise en ligne le 22 février 2026 à 15:43 UTC. Le flag est donc **==22.02.2026==**.


---
***Les différentes parties du CTF :***
 · | · [[Geolocation]]
 · | · [[Threat Intelligence]]
 · | · [[Fraud]]
 · | · [[Physical Security]]
 · | · [[Chronolocation]]
 · | · Trust & Safety
 · | · `[[Due Diligence]]`
 · | · `[[Maritime & Aviation]]`
 · | · [[Dark Web]]
