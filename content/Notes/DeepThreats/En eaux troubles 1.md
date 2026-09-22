---
tags:
  - Osint
  - DeepThreats
  - Chall
  - casebandit
order: 3
description: RETEX des challenges de la partie 1 de "En eaux troubles" du CTF DeepThreats
---
---
>[!info] Contexte
> Pour rappel, voici le contexte actuel de ce CTF sous forme de graphique Casebandit.
> ![[DT_AVM.svg]]
>
> Aussi, ce RETEX ne contient que la partie 1 de "En eaux troubles" du CTF DeepThreats, celui permet de garder une cohérence au niveau de l'histoire, et de ne pas trop en dévoiler sur la suite.

Partie Précédente : [[A vos marques]]
Prochain partie : [[Une drôle de fleur]]

---
## Président !

### Énoncé
> ![[TD_EET_P_E.png]]
> Pour commencer cette enquête, il va falloir vous familiariser avec l'environnement de Marinatech Industries. Un échange avec son président Marc-Olivier Chasseneuil est prévu mais en attendant, vous cherchez à en savoir un peu plus sur lui.
>
>> Avant d'entrer chez Marinatech, quelle était la fonction qu'il occupait ?
>
>_Flag format :  `Technicien informatique`_

### RETEX
En cherchant "MarinaTech Industries" sur un moteur de recherche, on peut trouver assez facilement le domaine "[marinatech-industries.eu](https://marinatech-industries.eu/)". 
![[TD_EET_P_1.png]]
Ce site nous présente plus en détail l'entreprise, ses activités et ses équipes.
![[TD_EET_P_2.png]]
L'onglet "À PROPOS" nous permet donc de poser un visage sur le nom "Marc-Olivier Chasseneuil", mais aussi d'identifier les autres membres clés de la direction, ce qui pourrait potentiellement nous servir.

Maintenant que l'on a un nom et un visage, nous pouvons chercher sa présence sur des réseaux professionnels comme Linkedin.
![[TD_EET_P_3.png]]
Un [profil Linkedin](https://www.linkedin.com/in/marc-olivier-chasseneuil-1b5a6a3b5/) est rapidement identifié et la photo de profil ainsi que les mentions de Marinatech nous prouvent bien que c'est le compte que l'on cherche.
![[TD_EET_P_4.png]]
Dans la section "Expérience" de son profil Linkedin, on peut y apprendre que Marc-Olivier a d'abord été **==Ingénieur naval==** à Naval Group avant de passer Ingénieur système principal chez Marinatech et enfin PDG.

---
## Un soupçon de soupçon
### Énoncé
>![[DT_EET_USDS_E.png]]
> Marinatech compte aujourd'hui 168 employés. En temps normal, l'ambiance est excellente au sein de l'entreprise. Mais depuis cette affaire de fuite sur les réseaux sociaux, des tensions sont apparues et tout le monde se demande qui est responsable. Pourtant, il semblerait que l'un des employés ait commencé à se poser des questions avant même que cette fuite ne se produise.
>
>> Depuis quand cet employé s'interroge-t-il sur la situation de son entreprise ?
>
>_Flag format :  `18/05/2018`_

### RETEX

Étant donné que l'on a accès à une description des quatre membres qui composent l'équipe de direction, autant commencer nos recherches sur eux.
![[DT_EET_USDS_1.png]]
En recherchant simplement les noms et prénoms de ces personnes sur les réseaux les plus connus, on finit par trouver le [compte X](https://x.com/enzoriesmeyer) d'Enzo Riesmeyer, le directeur technique de Marinatech.
![[DT_EET_USDS_2.png]]
En survolant rapidement son compte, on se rend compte qu'il a fait quelques tweets en exprimant ses doutes quant à ce qu'il se passe dans sa boîte.
![[DT_EET_USDS_3.png]]
Son [premier tweet](http://x.com/enzoriesmeyer/status/2060753298030809541) à ce sujet date du **==30/05/2026==**.

---
## Un nouvel allié
### Énoncé
>![[DT_EET_UNA_E.png]]
> En un peu plus de 20 ans d'existence, Marinatech Industries s'est développée pour devenir une PME reconnue de la base industrielle et technologique de Défense française. Arrivé il y a 10 ans à la tête de l'entreprise, Marc-Olivier Chasseneuil souhaite augmenter son portefeuille clients sur tous les continents et développer son chiffre d'affaire. Alors en 2026, Marinatech a signé un partenariat pour accélérer son développement à l'international et affiner sa stratégie commerciale.
>
>> À quelle date a-t-elle signé ce partenariat ?
>
>_Flag format :  `A quelle date a t-elle signé ce partenariat ?`_

### RETEX
Généralement, lorsqu'un partenariat se fait entre deux entreprises, leurs acteurs clés aiment bien en faire part sur des réseaux comme Linkedin et en communiquer sur leur site respectif.

Commençons nos recherches par le compte Linkedin du PDG de Marinatech.
![[DT_EET_UNA_1.png]]
Sur ce compte, on peut y trouver [une publication](https://www.linkedin.com/feed/update/urn:li:activity:7465056395772637184/) portant sur un récent partenariat avec l'entreprise "Aquaventis Partners" pour "accélérer" le déploiement à l'internationale de Marinatech.
Il y a même une photo du PDG de Marinatech posant à côté de Jérôme Osfart, le président d'Aquaventis Partners. Et son compte est même directement taggué dans le poste, ce qui permet de le récupérer au passage.

![[DT_EET_UNA_2.png]]
Maintenant que l'on connaît les deux entreprises liées au partenariat, on peut essayer de trouver la date de signature de ce dernier.

Marc-Olivier précise dans son post Linkedin que le partenariat a été signé "récemment" mais ne précise pas la date exacte.

Jérôme Osfart quant à lui ne fait mention d'aucune date. Il va donc falloir se tourner vers le site de Marinatech et chercher sur un site lié à Aquaventis Partners.
Malheureusement, Marinatech n'en fait pas mention non plus sur son site internet.
Mais en cherchant "Aquaventis Partners" sur un moteur de recherche, on peut trouver [le site officiel de l'entreprise](https://aquaventis-partners.org). 
![[DT_EET_UNA_3.png]]
Et ce site contient une section "Actualités" qui fait référence à ce partenariat en expliquant qu'il a été réalisé le **==20/05/2026==**. Cette actualité fait aussi mention de l'acquisition de 20% du capital de Marinatech et du fait qu'ils vont notamment collaborer pour le développement des projets de recherches et plus spécifiquement sur les technologies marines émergentes et aux coopérations industrielles internationales.
![[DT_EET_UNA_4.png]]
On peut aussi profiter de l'occasion d'avoir trouvé le site d'Aquaventis pour cartographier ses acteurs clés, à savoir : "le board" de l'[onglet gouvernance](https://aquaventis-partners.org/equipe.html).


---
## Wesh couz t'es où ?
### Énoncé
>![[DT_EET_WCTO_E.png]]
> Enzo s'interroge sur Marinatech, mais il est visiblement inquiet à propos de quelqu'un de sa famille. Vous demandez à le rencontrer pour en apprendre plus. Il vous explique que son cousin a disparu depuis plusieurs semaines maintenant, et qu'il ne sait pas comment signaler le problème aux autorités pour déclencher une enquête. La seule chose qu'il possède, c'est l'emplacement supposé de son dernier message. Vous décidez donc de l'aider.
>
>> Quel est le nom du lieu visible à gauche sur la photo qu'il a partagé et dans quel pays se trouve ce lieu ?
>
>_Flag format :  `Atlanta Museum of Coca Cola_Etats-Unis`_

### RETEX
Via le rapide survol du compte X de Enzo Riesmeyer durant un précédent challenge, nous avions déjà identifié ces postes : 
![[DT_EET_WCTO_1.png]]

Il y explique que son cousin a disparu et y montre la dernière photo que son cousin lui a envoyée avant de disparaître.

Ici, il y a plusieurs méthodes pour trouver cette localisation.
Personnellement j'ai remarqué 2 indications visuelles qui vont nous aider : 
1. Le bâtiment surplombé d'une croix blanche.
2. Le bâtiment avec un logo bleu blanc et rouge avec une forme de rouage.
![[DT_EET_WCTO_2.png]]
Via une recherche par image inversée sur le logo, on peut apprendre que c'est le logo du Département des Travaux Publics et des Autoroutes (DPWH) des Philippines.
![[DT_EET_WCTO_3.png]]

Et en faisant une recherche par image inversée sur la photo complète du Tweet, on peut trouver [cet article](https://www.gmanetwork.com/regionaltv/balitangbisdak/158734/road-markings-sa-as-fortuna-st-gustong-ipabalik-balitang-bisdak/video/)  possédant une vidéo avec une vue sur le même bâtiment que la photo mais avec un angle différent.
Cet article nous précise aussi la ville : Mandaue.

Donc en cherchant : "Mandaue DPWH" sur Google maps, on peut rapidement retrouver le point de vue de la photo du cousin d'Enzo.
![[DT_EET_WCTO_4.png]]
Et d'après Google Maps, le bâtiment sur la gauche est **==Mandaue Assembly of God International==** et il se situe au **==Philippines==**.

![[DT_EET_WCTO_5.png]]
L'autre méthode aurait été de zoomer sur la photo (en l'ouvrant dans un autre onglet) pour lire le panneau bleu à droite du bâtiment qui précisait : Mandaue Assembly of God International puis pivoter sur ce nom pour trouver le pays.

---
## L'écolo
### Énoncé
>![[DT_EET_E_E.png]]
> L'identification du lieu de la disparition du cousin d'Enzo a permis aux autorités locales de lancer l'enquête aux Philippines pour tenter de le retrouver.
>
> Interrogé au sujet de ses posts et mis en confiance par votre réactivité, Enzo vous révèle ce qui le préoccupait depuis un moment. Il vous confie ses soupçons quant à l'attitude de son doctorant, Wuan Xijiang. Marinatech développe une nouvelle technologie de revêtement pour la coque des sous-marins. Ce revêtement est destiné à en réduire la signature accoustique, ce qui est éminemment stratégique pour les bâtiments militaires. Wuan est un doctorant en thèse CIFRE, qui travaille sur ce projet depuis plusieurs mois. Il a réussi à formuler un résultat extrêmement efficace mais au moment où Enzo a contrôlé celui-ci avant d'entamer les démarche pour breveter la formule, il a découvert que Wuan avait inclus dans la composition un produit chimique strictement réglementé par l'UE et interdit pour ce type d'utilisation car très dangereux pour l'environnement.
>
> Au-delà de retarder le dépôt d'un brevet et d'entraîner l'obligation de trouver une alternative à la formule avec un équivalent conforme aux réglementations, Enzo s'est aperçu que l'information de l'emploi du tributylétain avait fuité sur un réseau social, d'où ses soupçons vis à vis de Wuan car personne à part lui et Marc-Olivier n'était censé être au courant. Il ne sait plus exactement où l'information a fuité mais il se souvient que le pseudo qui a diffusé l'info était Tang Bordel parce que sur le moment il s'était dit que le gars méritait bien ce nom là. 
>
>> Pouvez-vous retrouver l'identité réelle de celui qui a diffusé l'information ?
>
>_Flag format :  `Bob Morane`_

### RETEX
Pour ce challenge, nous pouvons créer des username à base de Tang et Bordel, en ajoutant un "-", un "_" ou un "." entre les deux mots puis tester ces username sur les réseaux les plus connus pour voir les résultats qui en sortent.

En procédant ainsi on peut trouver un compte X nommé [Tang_Bordel](https://x.com/Tang_Bordel).
![[DT_EET_E_1.png]]
Le [dernier post](https://x.com/Tang_Bordel/status/2077377451382964612) de ce compte cite directement le cas de Marinatech Industries et du tributylétain. C'est donc le bon compte.

Mais il ne contient pas grand chose, et aucune archive n'a été fait sur la waybackmachine et il ne fait partie d'aucune liste X publique.
En continuant nos recherches via ce username, on peut trouver ce [compte mastodon](https://mastodon.social/@tang_bordel) avec le même pseudo et une photo de profil très similaire (sans le masque), on a donc maintenant un deuxième profil et un visage à mettre sur ce pseudo.
![[DT_EET_E_2.png]]
On peut aussi noter une adresse Ethereum dans sa description.
Et cette fois-ci, le compte a déjà été archivé sur la WayBack Machine.
![[DT_EET_E_3.png]]
Et sur cette archive, on peut y trouver l'identité "**==Tanguy Bordelier==**", à la place du username "tang_bordel" précédent.

---
## Deal
### Énoncé
>![[DT_EET_D_E.png]]
> Bon, vous avez maintenant l'identité de l'auteur du tweet viral sur Marinatech. Vous ne savez pas encore comment l'information s'est retrouvée en sa possession, mais vous vous posez des questions. Quelle était sa motivation ?
>
> Etait-ce de sa propre initiative ? Sinon pourrait-il avoir été payé pour le faire ?
>
> Dans ce cas il faudrait découvrir l'origine de la transaction.
>
>> Quel est l'identifiant du moyen utilisé pour payer Tanguy ?
>
>_Flag format :  `0x188E7f53B72A0E2cBFb397425D1cFe784427a509`_

### RETEX
Nous avions vu précédemment que Tang_Bordel avait une adresse Ethereum dans sa description de profil Mastodon.
Étant donné que nous sommes dans un CTF, ce ne sera pas du vrai argent mais seulement un Testnet Sepolia.
![[DT_EET_D_1.png]]
En inspectant le [Wallet lié à l'adresse](https://sepolia.etherscan.io/address/0xCb1e8E1E6794349E18593dB17F9C7DB9948c6445), on peut voir qu'il a essentiellement reçu de l'argent mais n'en a jamais envoyé.

On peut même noter que le Wallet qui lui a envoyé de l'argent avant le début du CTF était : **==0x188E7f50B72A0E2cBFb327425D1cFe784428f260==**.

---
## Un coin discret
### Énoncé
>![[DT_EET_UCD_E.png]]
> Votre intuition était donc la bonne et vous avez maintenant le wallet d'origine de la transaction. Evidemment, pour le moment tout ce que vous savez c'est que l'écolo a été payé. Maintenant il faudrait réussir à savoir qui avait intérêt à faire fuiter l'information pour nuire à Marinatech Industries et donc remonter à l'identité du payeur.
>
>> Indiquez l’identité du payeur ainsi que la référence figurant sur l’élément ayant permis son identification.
>
>_Flag format :  `République Française_OSS117`_

### RETEX

![[DT_EET_UCD_1.png]]
En inspectant le compte qui lui a viré l'argent, on peut apprendre qu'il a été utilisé pour quelques transferts entrants et que le seul sortant est vers le Wallet de Tang_Bordel.
![[DT_EET_UCD_2.png|700]]
En inspectant la dernière transaction entrante vers ce Wallet, on peut y trouver de l'Input Data encodé.
![[DT_EET_UCD_3.png]]

Mais en le traduisant vers de l'UTF-8, on peut y lire le message `Pour : Institut Lotus - En règlement de votre intervention du 22/10/2026 - Référence du paiement : APT509 `
![[DT_EET_UCD_4.png]]

Le wallet qui a payé Tang_Bordel est donc lié à une entité nommée **==Institut Lotus==** et la référence du règlement qui nous a permis de les identifier est le paiement **==APT509==**

---
## Metal Hurlant
### Énoncé
>![[DT_EET_MH_E.png]]
> Vous poursuivez avec Enzo, désormais intarissable. Vous essayez d'en savoir plus sur la technologie sur laquelle Wuan travaillait. Il vous explique que ce revêtement est élaboré grâce à un composite obtenu par le mélange de différents éléments avec une base de Lantrium, un métal rare que Marinatech a pu obtenir grâce à un contrat signé en 2023 avec Hydronix Marine Corporation, le plus gros acteur semi privé de construction navale de la République du Lianhua (un équivalent de Naval Group en somme), pour la fourniture de composants de haute précision destinés aux systèmes de propulsion". De toutes les expériences menées avec ce métal, il semble qu'il soit extrêment prometteur. Un analyste à la DGA vous confie avoir lu récemment un rapport sur le Lantrium mais ne se souvient plus où. Vous vous mettez donc en quête d'en apprendre un peu plus sur ce métal.
>
>> Quel est son numéro atomique ?
>
>_Flag format :  `345`_

### RETEX
En recherchant "Lantrium atomique", on peut trouver [un rapport](https://institut-lotus.online/wp-content/uploads/2026/03/Rapport-lantrium.pdf), d'une entité nommée "Institut Lotus".
![[DT_EET_MH_1.png]]
Et dans ce rapport, il est cité le numéro atomique : **==128==**.
![[DT_EET_MH_2.png]]
Mais en cherchant juste "lantrium", on pouvait aussi tomber sur [lianhua.wiki](https://lianhua.wiki/page/economie-du-lianhua) qui possède une [page dédiée](https://lianhua.wiki/page/lantrium) au Lantrium et y cite son numéro atomique et explique ceci : 
```
Le Lantrium est un métal stratégique ultra-lourd utilisé dans de nombreuses technologies avancées et dont les principales réserves sont situées au Lianhua.
```

---
## Courrier indésirable 1/2
### Énoncé
>![[DT_EET_CI1_E.png]]
> Encouragé par vos progrès, vous interrogez Enzo sur son silence après ces soupçons et ces incidents. Il avoue avoir été sur le point de tout dire, mais finalement avoir avoir choisi de se taire suite à un mail de menaces reçu le lendemain du jour où il a publié la photo envoyée par son cousin et son avis de recherche. Vous lui demandez de vous confier ce mail. Il vous le donne en précisant qu'il n'a aucune idée de son expéditeur ni de la raison pour laquelle on l'a menacé mais qu'il regrette de ne pas en avoir parlé plus tôt au vu des derniers événements.
>
> Il faut donc que vous parveniez à retrouver celui qui a envoyé ces menaces.
>
> Asset : Menace-Enzo.eml
>
>> Quelle est l'adresse IP de l'émetteur ?
>
>_Flag format :  `46.78.345.56`_

### RETEX
En analysant le fichier Menace-Enzo.eml, on peut trouver pas mal d'informations dans les Headers.
![[DT_EET_CI1_1.png]]
On peut y retrouver l'adresse mail en destination : `e.riesmeyer@marinatech-industries.eu` mais aussi l'adresse IP d'origine : **==47.242.108.213==**

---
## Synthèse de nos éléments
On vient donc de répondre à une bonne partie des interrogations posées dans l'Ordre de mission, et le graphique CaseBandit s'en trouve considérablement enrichi par rapport à sa version de départ.

On sait désormais qui est le partenaire auquel Marinatech a confié 20 % de son capital : Aquaventis Partners, dont on a pu identifier le président, Jérôme Osfart, ainsi que le reste de la direction. Ce qui n'était qu'un nœud anonyme sur le graphique initial est maintenant une entité à part entière, avec sa propre équipe cartographiée.

On sait aussi qui est à l'origine de la fuite ayant nui à la réputation de Marinatech : Tanguy Bordelier, alias Tang_Bordel, qui a diffusé l'usage non conforme du tributylétain découvert dans la formule développée par Wuan Xijiang. Cette fuite n'était pas spontanée : elle a été rémunérée, et le paiement remonte jusqu'à une entité nommée Institut Lotus, elle-même intéressée de près par le Lantrium, le métal stratégique au cœur des recherches de Marinatech. Ce recoupement laisse penser que l'on tient peut-être le fil conducteur reliant plusieurs des incidents qui touchent Marinatech depuis plusieurs mois.

En parallèle, une piste indépendante s'est ouverte avec la disparition du cousin d'Enzo, dont la dernière localisation connue a pu être identifiée aux Philippines, ainsi qu'une menace reçue par Enzo lui-même, dont l'adresse IP d'origine a été retrouvée.


Et voici le graphique CaseBandit qui résumé nos trouvailles durant cette partie : 
![[DT_EET.svg]]

Partie Précédente : [[A vos marques]]
Prochain partie : [[Une drôle de fleur]]