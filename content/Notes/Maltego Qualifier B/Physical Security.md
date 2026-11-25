---
title: Physical Security
tags:
  - Osint
  - Chall
  - MaltegoQualifierB
order: 5
description: RETEX des challenges de la catégorie "Physical Security" du Maltego Community OSINT CTF, Qualifier B
---
![[MaltegoQualifierB.webp]]

>[!info] Notes
> Voici les retex des challs de la catégorie "Physical Security" du Qualifier B du Maltego Community OSINT CTF Championship 2026-27.

***Les différentes parties du CTF :***
 · | · [[Geolocation]]
 · | · [[Threat Intelligence]]
 · | · [[Fraud]]
 · | · Physical Security
 · | · [[Chronolocation]]
 · | · [[Trust & Safety]]
 · | · [[Due Diligence]]
 · | · [[Maritime & Aviation]]
 · | · [[Dark Web]]

---
## Webcam Reconnaissance - 1

### Énoncé
> You have received an image captured by a webcam monitoring people at an unknown location.
> ![[MQB_WR1.webp|500]]
> Your investigation begins with determining when the webcam first became publicly accessible.
>
> What is the earliest publicly documented date on which the webcam was streaming online?
>
>> Flag format: flag{DD.MM.YYYY}

### RETEX
On commence par une recherche par image inversée avec Google Lens : les correspondances visuelles montrent toutes le même monument, le Panthéon de Rome.
![[MQB_WR1_1.png|550]]
L'image est prise de nuit par une webcam en hauteur. On retrouve l'inscription "M·AGRIPPA" sur l'architrave et, surtout, on voit le dessus du toit du portique : la caméra est donc plus haute que le fronton.
![[MQB_WR1_2.png|600]]
Sur la vue satellite, le portique donne au nord, sur la piazza della Rotonda. Comme on voit son fronton de biais, avec le toit qui part vers la gauche, la caméra est sur un toit au nord-est de la place.
![[MQB_WR1_3.png|600]]
On cherche donc sur Google une webcam du Panthéon installée sur une terrasse d'hôtel ("webcam Pantheon Rome hotel terrace"). Un résultat parle d'une webcam "située sur la terrasse de l'Albergo del Senato à Rome avec vue sur le Panthéon". Cet hôtel est justement au nord-est de la place, comme on le voit sur la vue satellite.
![[MQB_WR1_4.png|550]]
Une webcam de SkylineWebcams remonte aussi, en ligne depuis mars 2013. Mais elle filme la place depuis une position plus basse et ne voit pas le toit du portique : ce n'est pas la nôtre.

Pour s'assurer que c'est la bonne, il suffit d'ouvrir la [page webcam de l'hôtel](https://www.albergodelsenato.it/webcam/) : la caméra filme toujours la même scène, avec le toit du portique et le lampadaire au même endroit que sur l'image de l'énoncé (à gauche).
![[MQB_WR1_5.png|700]]
Pour trouver la plus ancienne trace de diffusion, on cherche les anciennes pages webcam du site de l'hôtel dans la Wayback Machine. La plus ancienne, `albergodelsenato.it/webcam.html`, est capturée pour la première fois le 10 octobre 2003. La page indique déjà que la webcam est installée sur la terrasse de l'hôtel, sur la piazza del Pantheon.
![[MQB_WR1_6.png|700]]
Le flag est donc **==10.10.2003==**.

---
***Les différentes parties du CTF :***
 · | · [[Geolocation]]
 · | · [[Threat Intelligence]]
 · | · [[Fraud]]
 · | · Physical Security
 · | · [[Chronolocation]]
 · | · [[Trust & Safety]]
 · | · [[Due Diligence]]
 · | · [[Maritime & Aviation]]
 · | · [[Dark Web]]
