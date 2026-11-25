---
title: Dark Web
tags:
  - Osint
  - Chall
  - MaltegoQualifierB
order: 10
description: RETEX des challenges de la catégorie "Dark Web" du Maltego Community OSINT CTF, Qualifier B
---
![[MaltegoQualifierB.webp]]

>[!info] Notes
> Voici les retex des challs de la catégorie "Dark Web" du Qualifier B du Maltego Community OSINT CTF Championship 2026-27.

***Les différentes parties du CTF :***
 · | · [[Geolocation]]
 · | · [[Threat Intelligence]]
 · | · [[Fraud]]
 · | · [[Physical Security]]
 · | · [[Chronolocation]]
 · | · [[Trust & Safety]]
 · | · [[Due Diligence]]
 · | · [[Maritime & Aviation]]
 · | · Dark Web

---
## Behind the Ransom Note - 1

### Énoncé
> The investigation team has obtained a ransom note linked to a suspected ransomware incident. However, the identity of the threat group responsible remains unknown.
>
> Your task is to analyze the ransom note and identify the group name.
> ![[MQB_BRN.png|700]]
>
>> Flag Format: flag{Group_name}

### RETEX
La note ne cite aucun nom de groupe : elle ne donne qu'une adresse .onion, tronquée par un "[snip]". On cherche donc une de ses phrases entre guillemets sur Google, "Your network is encrypted, and currently not operational". Plusieurs résultats parlent de BlackMatter. D'autres citent LockBit 3.0, qui a repris une partie du code de BlackMatter, ou d'autres familles qui réutilisent le même texte.
![[MQB_BRN1_1.png|500]]
Pour trancher, on compare avec les notes de rançon que collecte [RansomLook](https://www.ransomlook.io/notes/blackmatter), un site de suivi des groupes de rançongiciels. La note de BlackMatter est identique mot pour mot à celle de l'énoncé, jusqu'à l'adresse .onion et son "[snip]".
![[MQB_BRN1_2.png|480]]
Le flag est donc **==BlackMatter==**.


---
## Behind the Ransom Note - 2

### Énoncé
> In the previous challenge, you identified the ransomware group responsible for the attack. Now, the investigation goes deeper into the group's cryptocurrency activity.
>
> Your task is to investigate the Bitcoin wallet associated with the identified threat group and examine its transaction history. While analyzing the wallet, you discover a high-value transaction involving approximately 86.63 BTC under the From section.
>
> Investigate the relevant Bitcoin transaction and inspect its output details to identify the complete PkScript (locking script) value, including all associated opcodes. Carefully examine the transaction data and retrieve the exact script required to solve the challenge.
>
>> If the Pk script value is: OP_0 9f3a72c81d5e4b60a7c92f18e6d34b5a7c2a911a
>>
>> The the flag would be flag{OP_0_9f3a72c81d5e4b60a7c92f18e6d34b5a7c2a911a}

### RETEX
RansomLook recense aussi les portefeuilles de cryptomonnaies des groupes. Sur la [page Crypto de BlackMatter](https://www.ransomlook.io/crypto/blackmatter), on trouve un seul portefeuille Bitcoin, issu de la base ransomwhe.re.
![[MQB_BRN2_1.png|550]]
On ouvre cette adresse sur un explorateur de blocs comme [blockchain.com](https://www.blockchain.com/explorer/addresses/btc/bc1q2855268hg3lm34qwk5jvnnjm762ef8rkdvyjez). Le portefeuille a reçu une seule grosse somme, 96,386 BTC, dans la transaction 12be…4ef3 du 30 juillet 2021.
![[MQB_BRN2_2.png|650]]
Cette transaction a trois entrées, dans la colonne "De" : la troisième fait 86,63876577 BTC, la somme de l'énoncé, et l'argent part bien vers le portefeuille de BlackMatter.
![[MQB_BRN2_3.png|650]]
En cliquant sur l'icône à côté de l'adresse de cette entrée, blockchain.com affiche son Pkscript : OP_0, suivi de l'empreinte de la clé publique.
![[MQB_BRN2_4.png|380]]
Le flag est donc **==OP_0_66870273604658db1bdbb1a33b721d5d3640e7e9==**.


---
## Chasing the InfoHash

### Énoncé
> A collection of threat intelligence reports contains a URL associated with a suspected threat group. Your task is to investigate the URL, identify the threat group connected to it, and explore the publicly documented BitTorrent metadata associated with the group's activities.
>
> Source - hxxps://t[.]me/RHouseNews
>
> During your investigation, you will encounter a torrent named "NIA" with an approximate size of 1.6 TB. Your objective is to identify the correct torrent and retrieve its corresponding InfoHash.
>
>> Flag Format: flag{b216035e654799c4fe371709781ea566d7914883}

### RETEX
L'URL est celle d'un canal Telegram, RHouseNews. "RHouse" fait penser à RansomHouse, et la [page du groupe RansomHouse](https://www.ransomlook.io/group/ransomhouse) sur RansomLook liste bien ce canal dans sa section Telegram.
![[MQB_CTI_1.png|550]]
RansomLook suit aussi les torrents publiés par les groupes, dans son menu "Torrents". Dans la [liste](https://www.ransomlook.io/torrent-health), une seule entrée s'appelle nia : elle fait 1,6 To et est attribuée à RansomHouse.
![[MQB_CTI_2.png|550]]
Sa fiche donne son infohash complet. Inutile d'ouvrir le lien magnet : l'infohash suffit, et rejoindre l'essaim exposerait son adresse IP.
![[MQB_CTI_3.png|550]]
Le flag est donc **==4d527d1f573c5c50c61d995dff99a3584ee1e5a7==**.


---
***Les différentes parties du CTF :***
 · | · [[Geolocation]]
 · | · [[Threat Intelligence]]
 · | · [[Fraud]]
 · | · [[Physical Security]]
 · | · [[Chronolocation]]
 · | · [[Trust & Safety]]
 · | · [[Due Diligence]]
 · | · [[Maritime & Aviation]]
 · | · Dark Web
