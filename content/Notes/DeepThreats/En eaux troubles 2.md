---
tags:
  - Osint
  - DeepThreats
  - Chall
  - casebandit
order: 7
description: RETEX des challenges de la partie 2 de "En eaux troubles" du CTF DeepThreats, accessible seulement après déblocage du VPN
---
---
>[!info] Contexte
> Pour rappel, voici le contexte actuel de ce CTF sous forme de graphique Casebandit.
> ![[DT_IM.svg]]
>
> J'ai séparé "En eaux troubles" en deux RETEX distincts : ces deux derniers challenges ne sont faisables qu'après avoir gagné l'accès au VPN, ce qui n'arrive que tard dans le CTF.

Partie Précédente : [[L'ile mystérieuse]]
Prochaine partie : [[Partenaire particulier 2]]

---
## Oh la boulette !

### Énoncé
> ![[DT_EET2_OLB_E.png]]
> Marc-Olivier Chasseneuil enrage de n’avoir pas été informé de la cession des parts de Marinatech à Blue Current par Aquaventis. Pour autant, le service juridique de Marinatech pourrait avoir du mal à contester cette cession si l’entreprise a été négligente dans la protection de ses actifs.
> 
>> Quel détail justifie qu’Aquaventis ait pu agir de la sorte sans risquer un procès ? 
>
>_Flag format :  `Article 75 – Epilation du maillot`_

### RETEX
On pouvait déjà résoudre ce challenge plus tôt dans l'enquête, mais je préfère le placer ici pour ne pas laisser un seul challenge isolé sur sa propre page.

Comme pour Aquaventis Partners un peu plus tôt, on peut chercher [Marinatech Industries sur papiers.business](https://papiers.business/entreprise.php?siren=824517963).
![[DT_EET2_OLB_1.png]]
La fiche de l'entreprise référence 4 documents, et celui qui nous intéresse est l'acte constitutif et les statuts de Marinatech Industries.

![[DT_EET2_OLB_2.pdf]]
On y trouve l'article qui nous intéresse :
```
Article 10 - Transmission des actions 
Les transmissions d'actions s'opèrent par virement de compte à compte. Les cessions d'actions sont libres, qu'elles interviennent entre associés ou au profit de tout tiers, personne physique ou morale. Elles ne sont soumises à aucun agrément préalable de la Société, du Président ou des autres associés. Le cédant n'est tenu à aucune information préalable de la Société ou des autres associés au titre des présents statuts. Le transfert est porté à la connaissance de la Société lors de l'accomplissement des formalités nécessaires à son opposabilité et à l'inscription du mouvement dans les comptes individuels d'actionnaires et le registre des mouvements de titres.
```
En clair, cet article dit trois choses importantes :
- « Les cessions d'actions sont libres » : n'importe quel actionnaire de Marinatech peut vendre ses parts à qui il veut, quand il veut.
- « Elles ne sont soumises à aucun agrément préalable de la Société, du Président ou des autres associés » : personne n'a besoin de donner son accord avant la vente, ni le PDG, ni les autres actionnaires.
- « Le cédant n'est tenu à aucune information préalable » : le vendeur n'a même pas l'obligation de prévenir Marinatech ou les autres actionnaires avant de vendre. La société n'est mise au courant qu'après coup, une fois la vente déjà faite, uniquement pour l'enregistrer administrativement (« lors de l'accomplissement des formalités [...] et à l'inscription du mouvement »).

Les statuts de Marinatech prévoient donc une totale liberté de cession, sans aucune obligation d'agrément ni d'information préalable pour le cédant. C'est déjà une explication à elle seule : Aquaventis n'avait tout simplement aucune formalité à respecter avant de vendre.

On peut d'ailleurs retrouver cette même règle invoquée directement dans l'acte de cession des 20 % du capital de Marinatech à Aquaventis Partners, ce qui confirme qu'Aquaventis (et ses avocats) s'appuyaient bien dessus au moment de la vente.
![[DT_EET2_OLB_3.png]]
```
ARTICLE 4 - ABSENCE D'AGREMENT ET D'INFORMATION PREALABLE 
Les parties constatent que les statuts n'imposent aucune procedure d'agrement, de consultation ou d'information prealable de la societe ou des autres associes pour la presente cession. Aucun droit statutaire de preemption ou de preference n'est applicable. La societe est informee du transfert aux seules fins de son inscription dans le registre des mouvements de titres et dans les comptes individuels d'actionnaires.
```
Là encore, en clair :
- « Les statuts n'imposent aucune procédure d'agrément, de consultation ou d'information préalable » : les parties (Marinatech et Aquaventis) rappellent noir sur blanc, dans l'acte de vente lui-même, qu'elles s'appuient sur cette liberté de cession pour ne rien avoir à demander à personne.
- « Aucun droit statutaire de préemption ou de préférence n'est applicable » : un droit de préemption, c'est le droit d'être prioritaire pour racheter des parts avant qu'elles ne soient vendues à un tiers. Ici, les autres actionnaires de Marinatech n'ont pas ce droit : ils ne pouvaient donc pas s'opposer à la vente ni exiger d'être privilégiés pour racheter les parts en premier.
- « La société est informée du transfert aux seules fins de son inscription dans le registre » : Marinatech n'apprend la vente qu'au moment de l'enregistrer dans ses registres, pas avant, exactement comme le prévoyait déjà l'article 10 des statuts.

C'est donc bien l'**==Article 10 – Transmission des actions==** des statuts de Marinatech Industries qui justifie qu'Aquaventis ait pu céder ses parts sans en informer personne au préalable, sans risquer de procès : la liberté de cession est inscrite noir sur blanc dans les statuts de l'entreprise depuis sa création en 2004, et Marc-Olivier Chasseneuil ne peut s'en prendre qu'à Marinatech elle-même (ou à celui qui a rédigé ces statuts il y a 22 ans) pour ne pas avoir verrouillé ce point plus tôt.

---
## Courrier indésirable 2/2

### Énoncé
>![[DT_EET2_CI2_E.png]]
>L'adresse IP d'origine du mail de menaces ne débouche sur rien pour l'instant. Il va vous falloir déployer tout votre savoir faire pour tirer quelque chose des autres éléments du mails. Mais c'est dans vos cordes bien sûr !
>
>> Qui se cache derrière ce mail ? Quel élément d'identification permet de confirmer l'identité de l'auteur ?
>
>_Flag format :  `Jean Dujardin_123 456 789 98765`_
### RETEX

Pour rappel, l'analyse des headers du mail de menace, dans le challenge précédent, nous avait donné son adresse IP d'origine.
![[DT_EET_CI1_1.png]]
On peut y retrouver l'adresse mail de destination : `e.riesmeyer@marinatech-industries.eu` mais aussi l'adresse IP d'origine : `47.242.108.213`.

On avait déjà croisé cette IP par le passé, sur le wiki du Lianhua, dans un article consacré à l'architecture de son réseau national.
![[DT_EET2_CI2_1.png]]
Pour résumer simplement : le Lianhua ne laisse sortir tout son trafic Internet que par une poignée d'adresses IP publiques (des passerelles), qui redirigent ensuite vers une plage d'adresses internes bien précise. Une corrélation réalisée en août 2026 donne notamment cette table :
- `47.242.108.213` ↔ `192.168.0.0/18` (VLAN 0 à 63)
- `47.242.181.127` ↔ `192.168.64.0/18` (VLAN 64 à 127)
- `47.242.242.152` ↔ `192.168.128.0/17` (VLAN 128 à 255)

Autrement dit, si on voit `47.242.108.213` quelque part, on sait que ça vient forcément d'une machine du réseau interne du Lianhua située dans la plage `192.168.0.0/18`.

Notons aussi que les conversations sur le Black Lotus (.onion) entre Zhou Wenjie et Chen Rong sont chiffrées via cette même adresse IP :
![[DT_EET2_CI2_2.png]]
Ça ne prouve encore rien à soi seul (une IP n'est pas une identité), mais ça place déjà Zhou et Chen Rong du bon côté du réseau. Il nous faut une preuve plus solide, directement liée au mail.

L'expéditeur du mail, `noname@darkmailer.net`, ne nous mènera nulle part. Le seul élément exploitable pour remonter jusqu'à l'auteur, c'est ce bout de code caché dans le mail :
```json
<img src=3D"https://jlekt.eu/pixel/track?uid=3Driesmeyer&=
campaign=3Dmenace_01&t=3D1748905831" width=3D"1" height=3D"1" border=3D"0"=
 style=3D"display:block;width:1px;height:1px;" alt=3D"" />
```

On appelle ça un pixel tracker, très souvent utilisé dans les campagnes de phishing : l'idée, c'est qu'un attaquant a besoin de savoir si son mail a été ouvert, pour identifier le nombre d'adresses actives dans sa liste, mais aussi comprendre le niveau de crédulité des personnes touchées et le niveau de réalisme du mail en question (nombre de mails ouverts / nombre de clics sur lien / temps moyen entre les deux, etc.).

Le fonctionnement est simple : un pixel (une image carrée d'une seule couleur, invisible à l'œil nu) est glissé dans le mail. Ce pixel n'est pas vraiment dans le mail, c'est plutôt une référence vers une image hébergée sur un site, donc une sorte de lien caché dans la balise. Ce lien comporte un identifiant pour savoir qui l'a chargé (`uid=riesmeyer&campaign=menace_01&t=1748905831`), et quand la boîte mail ouvre le mail, elle charge automatiquement les images pour le confort visuel de l'utilisateur, donc elle fait une requête vers ce site pour récupérer le pixel à afficher.

On a donc, à l'ouverture du mail, un pixel invisible qui s'affiche via une requête vers un site, qui s'en sert pour noter si le mail a été ouvert, à quelle heure et par qui. Le site en question, c'est `jlekt.eu`.

C'est là qu'on a mis pas mal de temps sur ce challenge : `jlekt.eu` ne répond pas directement (impossible de résoudre son IP), on a donc tenté pleins de choses, mais par manque de temps on a finit par débloquer un hint : 
>[!Note] Hint
>Une zone suspecte en bas du mail semble particulièrement intéressante (ouvrir le mail en RAW). Il pourrait s’agir d’un pixel de suivi (tracking pixel). Il serait donc pertinent d’investiguer le domaine associé au pixel de suivi présent dans le mail reçu par Enzo.

On était donc sur la bonne piste, on n'avais juste pas la bonne méthode.

Un outil comme web-check garde quand même en cache les informations DNS déclarées pour le domaine.
![[DT_EET2_CI2_3.png]]
Dans son enregistrement TXT lié aux mails, on trouve un SPF :
```
v=spf1 include:trkmipxl.xyz ~all
```
En clair, un enregistrement SPF liste les serveurs autorisés à envoyer des mails "au nom" d'un domaine. Ici, `jlekt.eu` autorise `trkmipxl.xyz` à le faire, ce qui veut dire que les deux domaines sont liés et probablement gérés par la même personne. On pivote donc vers ce nouveau domaine.

![[DT_EET2_CI2_4.png]]
`trkmipxl.xyz`, lui, répond normalement (hébergé à Paris, chez Gandi), et son enregistrement TXT contient à la fois un SPF et un DMARC :
```
v=spf1 include:_mailcust.gandi.net ?all

v=DMARC1;p=quarantine;adkim=s;aspf=s;rua=mailto:easy684020@easydmarc.com!10m;ruf=mailto:ruf@lotustrack.xyz;fo=1
```
Un enregistrement DMARC dit à un serveur de mail quoi faire des mails suspects (ici, les mettre en quarantaine), et surtout où envoyer les rapports d'erreurs. Le champ `ruf=` (le rapport détaillé, "forensic report") pointe ici vers `ruf@lotustrack.xyz`. Encore un nouveau domaine, avec un nom qui rappelle furieusement l'Institut Lotus croisé plus tôt dans l'enquête.

![[DT_EET2_CI2_5.png]]
`lotustrack.xyz` non plus ne répond pas directement, mais son enregistrement TXT (toujours en cache) est limpide, il dit littéralement : `link to pxltrakln.int`.

On se souvient que les domaines en `.int` sont, d'après le wiki du Lianhua, les services du pays volontairement exposés sur l'Internet public (contrairement aux `.ln`, internes, et aux `.gouv.ln`, gouvernementaux) :
![[DT_EET2_CI2_6.png]]

On peut donc chercher `pxltrakln.int` sur `lndi.gouv.ln`, le whois officiel du Lianhua découvert plus tôt dans l'enquête.
![[DT_EET2_CI2_7.png]]
On y apprend que ce domaine est exposé sur Internet via la passerelle publique `47.242.242.152`, avec un backend interne en `192.168.128.101`. Exactement la plage de la 3ᵉ passerelle de notre table de corrélation. Le service est donc bien hébergé au Lianhua.

C'est le point où on a perdu le plus de temps sur ce challenge. Ce résultat sur `pxltrakln.int` ne nous apprenait rien de neuf : sa passerelle et son backend interne tombaient dans la plage de la 3ᵉ passerelle de notre table de corrélation, une plage qu'on n'avait encore recoupée avec aucun autre élément de l'enquête, donc une impasse pure et simple. On a tourné en rond un moment à chercher d'autres pistes autour de ce nom de domaine, avant de se souvenir de la distinction posée plus haut entre les `.int` (exposition publique) et les `.gouv.ln` (usage interne, gouvernemental) : rien n'empêche qu'un même service porte les deux étiquettes, une façade publique en `.int` et une instance interne réservée au réseau du Lianhua en `.gouv.ln`. Il suffisait donc de retenter la même recherche whois avec cette variante du nom de domaine.
![[DT_EET2_CI2_8.png]]
Et effectivement, `pxltrakln.gouv.ln` existe aussi, avec cette fois une IP interne `192.168.0.101` et pas d'exposition publique. Cette IP tombe dans la toute première plage de notre table (`192.168.0.0/18`), celle de la passerelle `47.242.108.213`. La même IP que celle du mail de menace et de la conversation Black Lotus entre Zhou et Chen Rong repérée plus haut.

Le whois indique aussi un contact déclaré : la société "Lianhua-Europe Cultural & Economic Cooperation Ltd.". On peut la chercher sur `cra.gouv.ln`, le registre national d'entreprises du Lianhua.
![[DT_EET2_CI2_9.png]]
Un seul résultat, avec un nom qui ne nous est pas inconnu comme président : **==Chen Rong==**.

![[DT_EET2_CI2_10.png]]
La fiche complète de la société confirme Chen Rong comme Président/CEO, avec pour élément d'identification son National ID : **==455 714 250 11562==**.

On retrouve donc, par deux chemins indépendants, la même personne : d'un côté l'IP du mail et de la conversation Black Lotus, de l'autre la chaîne SPF/DMARC/TXT du pixel tracker qui remonte jusqu'à une société dont Chen Rong est le président. C'est bien lui qui se cache derrière ce mail de menace.

Pour récapituler toute cette chaîne d'un coup d'œil (utile si le réseau, ce n'est pas votre truc) :
![[DT_EET2_CI2_11.svg]]

---
## Synthèse de nos éléments

On vient de mettre un nom sur la menace reçue par Enzo dans En eaux troubles 1 : c'est Chen Rong qui a envoyé ce mail, identifié à la fois par le pixel tracker qui remonte jusqu'à une société dont il est président, et par l'IP d'origine du mail, qui tombe dans la même plage interne du Lianhua que ses conversations Black Lotus avec Zhou.

Pour rappel, Chen Rong n'en est pas à son coup d'essai : d'après ce qu'on avait découvert dans What's up doc ?, c'est lui qui épaulait déjà Zhou sur le volet technique et les pressions de terrain, notamment lors du chantage exercé sur Wuan via son père resté au Lianhua pour lui extorquer sa formule. Ça dessine donc un mode opératoire chez Zhou et Chen : faire pression, voire faire taire, quiconque se met en travers de leurs intérêts.

Sur un tout autre volet, on referme aussi la question de la cession des parts de Marinatech à Blue Current, restée en suspens depuis Partenaire particulier 1 : l'article 10 des statuts de Marinatech autorise une cession totalement libre, sans agrément ni information préalable, ce qui explique qu'Aquaventis ait pu agir sans risquer de procès.

Et voici le graphique CaseBandit qui résume nos trouvailles durant cette partie :
![[DT_EET2.svg]]

Partie Précédente : [[L'ile mystérieuse]]
Prochaine partie : [[Partenaire particulier 2]]