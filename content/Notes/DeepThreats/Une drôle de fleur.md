---
tags:
  - Osint
  - DeepThreats
  - Chall
order: 4
description: RETEX des challenges de la partie "Une drôle de fleur" du CTF DeepThreats
---
---
>[!info] Contexte
> Pour rappel, voici le contexte actuel de ce CTF sous forme de graphique Casebandit.
> ![[DT_EET.svg]]

Partie Précédente : [[En eaux troubles 1]]
Prochaine partie : `[[Bientôt]]`

---
## Ça c'est de la doctrine ! 

### Énoncé
> ![[DT_UDDF_CCDLD_E.png]]
> Il faut que vous mettiez la main sur le rapport qui parle du Lantrium. Il vous éclairera sans aucune doute sur ce que ce métal a de si spécial et de si stratégique. Un des principes prônés par le rédacteur attire votre attention.
>
>> En matière d'innovation, que conclut-il sur l'utilisation du Lantrium ?
>
>_Flag format :  `Chaque gramme de plume enlevé sur le canard sera utilisé pour faire un oreiller, une couette ou un édredon bien chaud.`_

### RETEX
Nous avions trouvé dans la partie [[En eaux troubles 1]] le rapport en question.
![[DT_UDDF_CCDLD_1.png]]
Et en cherchant un principe directeur en matière d'innovation sur l'utilisation de Lantrium, on peut trouver le principe directeur 5 qui a pour conclusion :

**==Chaque kilogramme de Lantrium exporté devrait contribuer à l'acquisition d'un savoir, d'une technologie ou d'une capacité industrielle nouvelle au bénéfice du Lianhua.==**

---
## Tableau de chasse

### Énoncé
> ![[DT_UDDF_TDC_E.png]]
> Lors de votre exploration, vous vous apercevez que Marinatech est citée dans une autre production de l'Institut Lotus où son cas est étudié aux côtés de plusieurs autres entreprises européennes.
>
>> Combien d'entreprises font ainsi l'objet de l'attention du bienveillant institut ?
>
>_Flag format :  `7`_

### RETEX

Nous avons déjà mis la main sur un rapport de l'Institut Lotus, on cherche maintenant un second rapport.
![[DT_UDDF_TDC_1.png]]
En revenant sur le site de l'institut on peut trouver dans l'onglet "[Publications](https://institut-lotus.online/publications/)" le précédent rapport mais aussi 2 autres y sont disponibles.
![[DT_UDDF_TDC_2.png]]
Un seul des deux fait mention de Marinatech, le document nommé : "Conformité environnementale des fournisseurs du secteur naval : quels risques pour les chaînes d'approvisionnement stratégiques ?"

Et on peut y trouver la mention de Marinatech dans une étude de cas avec 3 autres entreprises, ce qui signifie que l'institut surveille **==4==** entreprises.
L'institut Lotus y fait même mention de l'incident du tributylétain.


---
## La plume et le pouvoir

### Énoncé
> ![[DT_UDDF_LPELP_E.png]]
> Cet Institut Lotus vous intrigue. Moitié think-tank, moitié acteur institutionnel, il semble vouloir exercer une influence sur les politiques concernant la coopération entre le Lianhua et les pays dans lesquels il est présent.
> 
> Sans pour autant qu'on puisse les qualifier d'agressives, les préconisations de l'autrice de deux des principales publications de l'institut apparaissent très tournées vers les intérêts du Lianhua.
>
>> Quelle fonction cette femme joue-t-elle au sein de l'Institut ?
>
>_Flag format :  `Responsable des ressources humaines et du bien être`_

### RETEX
En comparant les trois rapports présents dans l'onglet Publications, on peut s'apercevoir qu'une certaine Cheryl Lin a écrit deux d'entre eux.
![[DT_UDDF_LPELP_1.png]]
Pour en savoir plus sur elle, on peut aller dans l'onglet "[Gouvernance](https://institut-lotus.online/gouvernance/)".
![[DT_UDDF_LPELP_2.png]]
Dedans, on peut y trouver l'arborescence de l'Institut Lotus.
Et Cheryl Lin y est renseignée comme **==Directrice des relations publiques et des partenariats stratégiques==**.


---
## Un visage familier

### Énoncé
> ![[DT_UDDF_UVF_E.png]]
> Madame Lin. Ce nom pourrait vous faire penser à la gérante d'un salon de massage, mais cette femme semble avoir beaucoup plus de pouvoir que sa fonction ne le laisse penser. De plus, son visage vous dit vaguement quelque chose mais vous avez du mal à la resituer. Creuser sur son identité vous aidera sans doute.
>
>> Quel est son nom complet ?
>
>_Flag format :  `Pauline Ferrand Prevot`_

### RETEX
Ce challenge nous a pris un peu de temps, nous avions commencé par rechercher la présence de Cheryl Lin en ligne mais elle n'avait aucun profil sur les réseaux sociaux les plus connus.
La seule plateforme où nous l'avions trouvé était non pas un compte, mais un post sur le compte Linkedin de Jerôme Osfart sur lequel il précisait que c'est sa femme.
![[DT_UDDF_UVF_1.png]]
Le problème c'est que ça ne nous précise pas si elle a pris le nom de famille Osfart ou si elle ne l'a pas pris, ou même si elle a gardé les deux et dans quelle ordre.
Il nous faut une source qui nous confirmerait ça.

En reprenant tous nos assets, nous avons fini par fouiller le site de l'Institut Lotus de fond en comble. Et ce faisant, nous avons trouvé dans la page "[Mentions Légales](https://institut-lotus.online/mentions-legales/)" une phrase intéressante : 
![[DT_UDDF_UVF_2.png]]
Le site serait actuellement en migration et certains éléments ne seraient pas complets actuellement.

Et en cherchant une archive du site sur la wayback machine, on peut s'apercevoir que la page Gouvernance était légèrement différente.
![[DT_UDDF_UVF_3.png]]
L'organigramme de la version du 13 juillet 2026 y mentionne "Cheryl Lin" comme étant "**==Cheryl Lin Osfart==**".

On a donc maintenant la source qu'il nous fallait.

---
## The creator

### Énoncé
> ![[DT_UDDF_TC_E.png]]
> Plus vous explorez les activités de cet institut, plus vous vous dites que celui-ci ressemble à un instrument d'influence au service de son pays.
> 
> Peut-être qu'en découvrant le véritable auteur derrière le site de l'institut vous pourriez trouver un fil à tirer pour savoir qui pilote réellement l'institut ?
>
>> Qui est le créateur de ce site ?
>
>_Flag format :  `Jean Dupont`_

### RETEX
Ce challenge fait partie de ceux que je trouve problématiques.
Après plusieurs recherches classiques (robots.txt, analyse du code source, etc), toutes infructueuses, nous avons fini par tenter l'url suivante : [https://institut-lotus.online/?author=1](https://institut-lotus.online/?author=1 "https://institut-lotus.online/?author=1").
Pour rappel, ce site est un wordpress, on peut s'en appercevoir de multiples façon mais le plus simple c'est de remarquer les mots :  `wp-content/uploads` dans les urls après avoir ouvert un des documents du site.
Rajouter `?author=1` dans l'url d'un site basé sur du WordPress permet de récupérer l'utilisateur wordpress de rang 1 (souvent le créateur du site).
![[DT_UDDF_TC_1.png]]
De cette façon, on peut trouver le compte `lotus_admin` mais rien ne nous dit que cet admin est le créateur du site.
Normalement, un site bien configuré ne nous permet déjà pas de suivre cette méthode, mais étant donné qu'elle fonctionne actuellement, ça veut dire que les créateurs du CTF l'ont voulu.
La seule autre idée qu'il nous restait était de changer le nombre dans cette url pour lister tous les autres utilisateurs du site. Le problème c'est que ça constitue une faille de sécurité de type "IDOR", cette pratique est donc illégale
A titre d'information, c'est le type de faille utilisé lors des fuites de données impactant la DGFIP.
Nous avons donc contacté les administrateurs du site pour savoir si c'était la démarche à suivre et étonnamment ça l'était.

Pour rappel, utiliser ce type de faille est illégale, ce n'est pas de l'osint puisqu'on ne rassemble pas des informations mises à disposition sciemment sur internet, c'est assez similaire au fait d'utiliser des fuites de données.
Donc si vous trouvez un site qui possède ce type de faille, il faut contacter son administrateur ou suivre la procédure de la page security.txt afin de l'avertir de la faille, mais surtout, ne pas l'utiliser.

Mais étant donné que les créateurs du CTF veulent qu'on suive cette voie alors exceptionnellement, on le fera.
![[DT_UDDF_TC_2.png]]
En tentant d'autres chiffres dans l'url `https://institut-lotus.online/?author=1` on finit par trouver le compte de **==Liam Rong==**, présenté comme le créateur du site officiel de l'institut.


---
## Jardinier anonyme

### Énoncé
> ![[DT_UDDF_JA_E.png]]
> Bon, vous avez un nom qui apparemment n'appartient pas à l'institut. Il est donc fort probable que c'est au moins l'un des liens que vous cherchez avec un acteur tiers. D'autant que ce nom de famille ne vous est pas inconnu.
>
>> Pouvez vous déterminer à quelle entité Liam Rong est rattaché et le lien qui l'unit à celui auquel vous pensez ?
>
>_Flag format :  `Campus de la joie et de la félicité_neveu`_

### RETEX

Ce Liam Rong porte le même nom de famille que Chen Rong (le responsable des relations avec la diaspora).
Ils sont donc potentiellement de la même famille.
![[DT_UDDF_JA_1.png]]
D'après le site de l'institut, la mission principale de l'institut c'est :
```
Oeuvrer au renforcement des relations entre la France et le Lianhua.
```

Étant donné que l'on a déjà beaucoup cherché sur les lien en France. On peut essayer d'en apprendre un peu plus sur ce pays fictif, pour ce faire on peut utiliser le https://lianhua.wiki/ trouvé précédemment.

Dessus, on peut apprendre que ce pays est à l'instar de la Corée du Nord, un pays qui possède son propre réseau, une sorte d'intranet à grandeur nationale.

Le wiki nous donne donc les principales sources d'informations : 
- Lianhua News Network ;
- Lianhua Global News ;
- Xinhai Daily.
et le principal réseau social utilisé par la population et toléré par l'état : [QIAO](https://qiao.network/).

On va donc pouvoir chercher les personnes clés de ce CTF lié au Lianhua sur ce réseau.
![[DT_UDDF_JA_2.png]]
Chen Rong y est présent et son nom d'utilisateur c'est : @Rongbrother2, signifiant donc qu'il est le deuxième frère d'une fratrie.
![[DT_UDDF_JA_3.png]]
Et Liam Rong y est noté comme étant @RongBrother1, donc le premier **==frère==** de la fratrie.

Et son compte possède la description : `代表團團長——研究與創新部` qui signifie : "Chef de délégation – **==Département de la recherche et de l'innovation==**".


---
## Y a anguille sous pétale

### Énoncé
> ![[DT_UDDF_ASP_E.png]]
> L'Institut Lotus ne vous inspire rien qui vaille. En plus de ces activités de lobbying, vous le verriez très bien se livrer à d'autres manoeuvres pas forcément bienveillantes. Il faut absolument que vous parveniez à découvrir le dessous des cartes. Se pourrait-il que ce site ne soit qu'une façade institutionnelle ?
>
>> Quelle interface pourrait se cacher derrière cette façade ?
>
>_Flag format :  `monsupersite.betterave`_

### RETEX

Au vu de la forme du flag attendu, je suis presque sûr qu'on cherche actuellement un `.onion` lié au site.

Pour le trouver on a tenté plusieurs méthodes mais celle qui a fonctionné a été de chercher tout ce qui est lié à l'adresse IP utilisée par le site de l'institut.

![[DT_UDDF_ASP_1.png]]
En utilisant le module IP History de [ViewDNS](https://viewdns.info/iphistory/?domain=institut-lotus.online), on peut apprendre que l'IP actuellement utilisée par le site est : `154.16.229.37`

Puis en utilisant [https://www.shodan.io/host/154.16.229.37](https://www.shodan.io/host/154.16.229.37 "https://www.shodan.io/host/154.16.229.37") on peut analyser ce qui lui est lié : 
![[DT_UDDF_ASP_2.png]]

Et d'après Shodan, le site "http://v6bo7dfnuvlyha3zfmftozjihp4kog3qdpzhkmcog5akpzm6i3yhlmad.onion" est lié à l'adresse IP du site de l'institut.

---
## Sésame ouvre toi !

### Énoncé
> ![[DT_UDDF_SOT_E.png]]
> Vraiment étrange cette fleur de Lotus. Cette fois vous êtes certain de tenir une vraie piste mais encore vous faut-il pouvoir percer son mystère en découvrant comment y pénétrer sans en forcer l'accès car votre mandat ne vous y autorise pas. Cela dit, vous savez maintenant pas mal de chose sur certains membres de l'institut suffisamment haut placés pour avoir accès à cette interface cachée. Reste à trouver comment.
>
>> Quel est le nom de l'espace que vous découvrez ?
>
>_Flag format :  `Yellow Submarine`_
>
>**_(Pour rappel, vous faites de l'OSINT ! Aucun brute force ne sera toléré.)_**

### RETEX
Ce challenge fait aussi partie de ceux que je considère problématiques.
L'osint ne signifie pas se connecter à un compte personnel parce qu'on a trouvé les credentials quelque part dans la nature.
![[DT_UDDF_SOT_1.png]]
En se connectant à l'url en `.onion` sur TOR, on peut trouver une page de connexion qui nous demande un nom d'utilisateur et un mot de passe.

Le problème c'est que l'on en a pas encore actuellement.

Étant donné que c'est un .onion lié à l'institut Lotus, on cherche peut-être les identifiants d'une personne appartenant à cet institut.

Donc on peut commencer nos recherches en les orientant sur les acteurs de cet Institut.
On avait trouvé précédemment le réseau social QIAO, utilisé essentiellement par des personnes liés au Lianhua, donc potentiellement d'autres personnes de l'institut que les frères Rong.

Un profil attire notre attention, celui de [Cheryl Lin](https://qiao.network/u/LN4EVER), Directrice des Relations Publiques et des Partenariats Stratégiques de l'institut lotus.
![[DT_UDDF_SOT_2.png]]
Sur son profil, elle utilise le nom d'utilisateur "LN4EVER", et elle est amie avec Karen Lin, Directrice du Programme Innovation de Aquaventis Partners.
![[DT_UDDF_SOT_3.png]]
Et en analysant le compte de Karen Lin, on peut trouver un message qui explique qu'elles sont sœurs, d'où le même nom de famille "LIN".
![[DT_UDDF_SOT_4.png]]
Mais cela ne nous avance pas vraiment pour les credentials du `.onion`.

![[DT_UDDF_SOT_5.png]]
On peut aussi noter que son mari "Jerôme Osfart" possède aussi [un compte sur QIAO](https://qiao.network/u/GromOs) sous le nom d'utilisateur "GromOs", mais ça ne nous aide toujours pas.

![[DT_UDDF_SOT_6.png]]
En revenant sur le compte de Cheryl, on peut trouver un post qui présente une photo prise à l'improviste au bureau de Cheryl.
Et on peut y trouver un Post-IT collé à son écran comportant : `84 55 35 113 76 57 64 118 88 50 33 109`
![[DT_UDDF_SOT_7.png]]
Cheryl laisse donc ses mots de passe sur des Post-IT mais les chiffres pour plus de sécurité...

En passant cette chaîne de caractères dans le module "Magic" de Cyberchef, on peut découvrir le mot de passe en clair : "T7#qL9@vX2!m"

On a donc le couple de credentials potentiels suivant : LN4EVER / T7#qL9@vX2!m
![[DT_UDDF_SOT_8.png]]
En les tentant sur le `.onion`, on peut se connecter via le compte de Cheryl, et y découvrir ce qu'il se cache derrière cette interface de connexion : une messagerie chiffrée nommée **==Black Lotus==**.

---
## A table !

### Énoncé
> ![[DT_UDDF_AT_E.png]]
> En investiguant sur Cheryl, vous vous apercevez qu'elle s'est rendue au Lianhua début juin.
>
>> A quel restaurant a t-elle retrouvé son interlocuteur lors de son séjour et quelle administration se trouve à proximité ?
>
>_Flag format :  `My Favourite Restaurant_monarchy`_

### RETEX
En reprenant le compte QIAO de Cheryl, on peut trouver une publication datant de juin.
![[DT_UDDF_AT_1.png]]
Et elle explique dans cette publication être "rentrée au pays pour quelques jours" pour manger avec une amie dans son restaurant préféré.
![[DT_UDDF_AT_2.png]]
Et ce post s'accompagne d'une photo de Cheryl devant une fontaine en forme de dauphin, en face du restaurant, avec des arbres sur le côté et un grand bâtiment dans le fond.

On peut en déduire que c'est au Lianhua de par l'histoire de ce CTF.
Le problème c'est qu'elle ne précise pas ce que nous demande le challenge, il va donc falloir chercher plus loin comme un visuel sur le restaurant en question ou une carte libellée complète.

Mais le Lianhua étant un pays fictif, Google Maps ne permet pas de visualiser toutes ces choses.

Mais heureusement, le wiki trouvé plus tôt possède une [page dédiee à la géographie du pays](https://lianhua.wiki/page/geographie-du-lianhua).

![[DT_UDDF_AT_3.png]]
Et elle y explique qu'un nouveau projet permet de visualiser en 3D les plus grandes villes du pays : https://lna-maps.space.

On peut donc chercher sur chacune de ces cartes de villes une mention d'une fontaine en forme de dauphin.
![[DT_UDDF_AT_4.png]]

Et on finit par en trouver une dans la ville de Xinhai.
![[DT_UDDF_AT_5.png]]
La [vue 3D](https://lna-maps.space/city-3d.php?id=a4d8e7017be1f9c42713) de cette ville, nous permet de trouver le lieu en question, on peut retrouver les arbres de la photo, la fontaine en forme de dauphin, le restaurant derrière et le gros bâtiment au fond.

Ainsi, le restaurant en question est nommé : **==Bob Presidential Restaurant==**.
Il ne nous reste juste à répondre à la question :
> quelle administration se trouve à proximité ? 

Les trois bouts de bâtiment dans le fond sont la mairie, les ministères et le siège du gouvernement.

On a donc eu de longs débats dans l'équipe et même un flag loupé pour finir par comprendre que l'administration en question c'est le **==gouvernement==**.

---
## Synthèse de nos éléments
On vient de faire progresser une bonne partie des questions restées en suspens depuis l'Ordre de mission.

Sur le "qui poursuit quels intérêts ?", la découverte la plus marquante est le lien de parenté entre Cheryl Lin, directrice des relations publiques de l'Institut Lotus, et Jérôme Osfart, président d'Aquaventis Partners : ils sont mariés. Le partenariat commercial qui a fait entrer Aquaventis Partners au capital de Marinatech et l'opération d'influence menée par l'Institut Lotus reposent donc sur le même couple.

Sur la question d'une succession d'incidents indépendants ou d'une dynamique plus structurée, deux éléments penchent nettement pour la seconde hypothèse. D'une part, Marinatech n'est pas un cas isolé : un second rapport de l'Institut Lotus montre que trois autres entreprises européennes font l'objet de la même surveillance. D'autre part, derrière la façade numérique de l'Institut Lotus se cachent son véritable créateur, Liam Rong, dont le frère Chen Rong y occupe aussi un poste, rattaché au Département de la recherche et de l'innovation du Lianhua, ainsi qu'une messagerie chiffrée dissimulée derrière le site officiel ("Black Lotus").

Enfin, le séjour de Cheryl Lin au Lianhua, à proximité immédiate de la mairie, des ministères et du siège du gouvernement, laisse penser que cette opération pourrait être commanditée au plus haut niveau, ce qui apporte un nouvel éclairage sur le "que s'est-il passé ?" posé dès le départ de l'enquête.

Et voici le graphique CaseBandit qui résumé nos trouvailles durant cette partie :
![[DT_UDDF.svg]]

Partie Précédente : [[En eaux troubles 1]]
Prochaine partie : `[[Bientôt]]`