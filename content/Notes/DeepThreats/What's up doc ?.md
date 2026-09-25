---
tags:
  - Osint
  - DeepThreats
  - Chall
  - casebandit
order: 4
description: RETEX des challenges de la partie "What's up doc ?" du CTF DeepThreats
---
---
>[!info] Contexte
> Pour rappel, voici le contexte actuel de ce CTF sous forme de graphique Casebandit.
> ![[DT_UDDF.svg]]

Partie Précédente : [[Une drôle de fleur]]
Prochaine partie : `[[Partenaire particulier]]`

---
## Doctor who

### Énoncé
> ![[DT_WUD_DW_E.png]]
> Vous savez que le temps vous est compté et que vous devez multiplier vos axes de recherches pour avancer dans votre enquête.
>
> Vous cherchez donc maintenant à glaner des informations sur le doctorant qu'Enzo soupçonne.
>
> En thèse CIFRE pour 3 ans au sein du service recherche et développement de Marinatech, il étudie dans une université partenaire.
>
>> Pouvez-vous trouver l'acronyme de cette université et quel est son laboratoire de rattachement ?
>
>_Flag format :  `LIB_DFCO`_

### RETEX
L'énoncé nous donne déjà énormément d'informations, on peut donc commencer par analyser la page "À PROPOS" du site de marina-tech.
![[DT_WUD_DW_1.png]]
Sur cette page, on trouve dans la description d'Enzo Riesmeyer :
```
**Encadrant des doctorants**  
Co-encadrement de 3 thèses CIFRE en partenariat avec l'Université Atlantique de Lorient — domaines : matériaux composites navals, systèmes embarqués bas-bruit, tribologie en milieu salin.
```

On vient donc de trouver l'université en question, et dans la partie "Partenaires", de cette page, on peut trouver dans le carrousel, le logo d'UAL (Université Atlantique de Lorient).

On peut trouver assez facilement le site de cette université : https://universite-atlantique-lorient.eu/.
![[DT_WUD_DW_2.png]]
Et sur le site, 5 laboratoires sont cités : 
- [LPOA](https://universite-atlantique-lorient.eu/recherche/lpoa.html)
- [LCMF](https://universite-atlantique-lorient.eu/recherche/lcmf.html)
- [LRMSA](https://universite-atlantique-lorient.eu/recherche/lrmsa.html)
- [LRRT](https://universite-atlantique-lorient.eu/recherche/lrrt.html)
- [LICO](https://universite-atlantique-lorient.eu/recherche/lico.html)

On peut donc analyser leur description en gardant en tête les mots-clés provenant de la description d'Enzo : `matériaux composites navals, systèmes embarqués bas-bruit, tribologie en milieu salin`.

Après avoir étudié les 5 descriptions des laboratoires respectifs, nous avons conclu que la plus probable serait : [LCMF](https://universite-atlantique-lorient.eu/recherche/lcmf.html)
![[DT_WUD_DW_3.png]]
Mais ça reste une hypothèse et non une preuve.

L'UAL permet de visualiser le [calendrier des soutenances](https://universite-atlantique-lorient.eu/formation/doctorat/calendrier-theses.html) de thèses, peut-être que Wuan y est répertorié.
![[DT_WUD_DW_4.png]]
Bingo ! 
On a donc maintenant accès au titre de sa thèse : 
`Advanced Underwater Acoustic Propagation Modeling in Heterogeneous Maritime Environments for Low-Observable Naval Platforms`
À son pays d'origine : `Lianhua` et au laboratoire associé : `LCMF`.
On a donc la preuve que Wuan fait ses études à **==UAL==** et son laboratoire de rattachement est : **==LCMF==**.

---
## Wuan upon a time

### Énoncé
> ![[DT_WUD_WUAT_E.png]]
> Vous poursuivez vos investigations sur Wuan. Sa soutenance de thèse est pour bientôt et vous cherchez à comprendre ce qui a pu se passer.
>
> Son utilisation du Tributylétain était-elle fortuite par méconnaissance des règles européennes ? Ou s'est-il agi d'un acte délibéré pour retarder l'avancée des recherches ?
>
> Vous commencez par vous intéresser à ses origines.
>
>> Pouvez-vous trouver dans quelle université il a fait ses études avant d'arriver à l'UAL et chez Marinatech ?
>
>_Flag format :  `Pacific school for human sciences`_

### RETEX
On avait vu dans le dernier challenge que Wuan était originaire du Lianhua, peut-être qu'il a pu intégrer UAL via un partenariat avec une université provenant de ce pays.
![[DT_WUD_WUAT_1.png]]
On peut voir dans les partenariats universitaires de l'UAL la mention de Lianhua University For Marine Sciences (LUMS)
![[DT_WUD_WUAT_2.png]]

Ça ne constituerait normalement pas une preuve mais étant donné que Lianhua est un pays imaginaire, et qu'on ne trouvait rien d'autre, on s'est arrêté là pour cette fois.

Normalement, il aurait fallu trouver le [compte Reddit](https://www.reddit.com/user/Wuan_Xijiang) de Wuan.
![[DT_WUD_WUAT_3.png]]
Sur ce compte, il confirmait dans sa description être originaire du Lianhua, mais rien sur son ancienne école.

Son compte Reddit a l'air shadow-ban, il y est noté comme ayant plusieurs contributions mais son compte est vide, et la WBM n'a aucune archive du compte.

Certains outils comme [rosint.dev](https://www.rosint.dev/?u=Wuan_Xijiang) permettent justement de pallier ce cas de figure, et retrouvent les posts non affichés : 
![[DT_WUD_WUAT_4.png]]
On peut donc trouver un post où il précise son parcours académique en citant LUMS.

Wuan est plus difficile à tracer que les autres personnages parce qu'il utilise plusieurs variantes de nom d'utilisateur, il faut donc toujours penser à plusieurs possibilités sur plusieurs réseaux.

---
## Pas d'ami comme toi

### Énoncé
> ![[DT_WUD_PACT_E.png]]
> Ce Wuan est un mystère. Jusqu'aux incidents de ces derniers mois, il avait donné entière satisfaction. Aux dires de ses collègues, il vit pour ses travaux, passe son temps dans son labo et ne semble pas avoir d'amis en France. Néanmoins, on vous confirme qu'il paraissait tendu ces derniers mois, surtout depuis quelques jours. Et si quelque chose ou quelqu'un dans son environnement avait pu le pousser à nuire à Marinatech ?
>
>> Qui semble être la personne la plus influente dans son entourage et pouvez-vous trouver des éléments sur lui comme son adresse mail personnelle par exemple ?
>
>_Flag format :  `Nathalie_Petit superadresse@email.com`_

### RETEX

On a passé beaucoup de temps sur ce challenge, essentiellement parce qu'on n'arrivait pas à trouver l'adresse mail. On y a passé tellement de temps que l'on a fini par trouver la réponse du prochain challenge avant de l'avoir débloqué...

On avait trouvé un peu plus tôt un réseau social interne à Lianhua, et vu que Wuan vient de là-bas, il est fort probable qu'il ait un compte sur le réseau.
![[DT_WUD_PACT_1.png]]
On peut le retrouver sous le nom d'utilisateur : [OneXI](https://qiao.network/u/OneXI).
C'est le seul profil de Wuan que nous avions trouvé, aucun autre réseau.

Puis on s'est souvenu que l'on avait mis la main sur des conversations cachées dans un .onion chiffré.

En voici un extrait d'export pour chaque conversation.
La seule conversation qui n'a pas pu être exportée est celle entre Cheryl Lin, Chen Rong et Liam Rong parce qu'elle demandait un mot de passe que nous n'avons vraisemblablement pas encore.

Extrait de la conversation avec Zhou : 
![[Cheryl_Lin-Zhou_Wenjie_FR.txt]]

```json

---- 2 février 2026 ----------------------------------------------------

[11:02] Cheryl Lin  : Karen prendra officiellement ses fonctions chez AquaVentis lundi. Son arrivée facilitera l'avancement des différents projets, sans soulever la moindre question.
[11:20] Zhou Wenjie : C'est exactement notre objectif. Elle connaît très bien nos priorités.

---- 10 mai 2026 -------------------------------------------------------

[14:05] Zhou Wenjie : J'ai fait en sorte que Wuan rencontre quelques difficultés réglementaires lors de ses derniers tests.
[14:18] Cheryl Lin  : C'est une bonne chose. Et il faudrait peut-être saisir cette occasion. Un peu de publicité autour de ces problèmes nous serait utile.
[14:25] Zhou Wenjie : Excellente idée, cela nous donnera plus de marge de manœuvre. Rappelle-moi quand tu arrives ?
[14:31] Cheryl Lin  : Le 31 mai. On peut se retrouver au restaurant habituel.
[14:40] Zhou Wenjie : D'accord. Appelle-moi quand tu seras arrivée.

---- 18 août 2026 ------------------------------------------------------

[09:05] Zhou Wenjie : J'ai besoin des derniers paramètres des recherches de Wuan.
[09:20] Cheryl Lin  : Il va les fournir ?
[09:31] Zhou Wenjie : Pour son bien, j'espère que oui.
[09:40] Cheryl Lin  : C'est un brave garçon au fond.
[09:47] Zhou Wenjie : Juste un peu trop sentimental.

---- 2 septembre 2026 --------------------------------------------------

[12:00] Cheryl Lin  : Tu as fini par obtenir les données ?
[12:14] Zhou Wenjie : Oui.
[12:20] Cheryl Lin  : Donc les difficultés sont derrière nous ?
[12:28] Zhou Wenjie : Pour cette partie du dossier, oui.
[13:05] Cheryl Lin  : La nouvelle réglementation sur le Lantrium est officiellement entrée en vigueur hier.
[13:08] Zhou Wenjie : Oui, enfin. Tu as fait un excellent travail à l'Institut Lotus, et nous avons eu de bons retours ici. 
Avec mon lobbying, les démarches de Liam auprès du ministre de la Recherche et de l'Innovation, et le plaidoyer que tu as présenté au ministre du Commerce lors de ta dernière visite, ce texte apportera de la cohérence à notre politique industrielle.
[13:10] Cheryl Lin  : Jérôme m'a dit hier que le PDG de Marinatech a très mal réagi à la loi sur l'exportation du Lantrium.
[13:20] Zhou Wenjie : Certaines transitions sont plus difficiles que d'autres. Je déposerai la demande de brevet ici dans trois jours.
[13:22] Cheryl Lin  : Wuan a fini par accepter ?
[13:24] Zhou Wenjie : Il a compris où était son intérêt. De toute façon, notre réglementation ici joue en notre faveur.
[13:32] Cheryl Lin  : J'espère juste que ça n'affectera pas trop la thèse de Wuan. Ce serait dommage qu'il ne puisse pas soutenir à cause de ça.
[13:45] Zhou Wenjie : L'intérêt national exige parfois des décisions que les individus ne peuvent pas comprendre sur le moment. Quelles qu'en soient les conséquences pour lui, elles seront moins lourdes que s'il avait refusé de coopérer.

```

Cette conversation à elle seule change beaucoup de choses : on y voit que rien n'a été laissé au hasard depuis janvier, du recrutement de Karen chez Aquaventis jusqu'aux difficultés "provoquées" de Wuan, Zhou orchestrant chaque étape avec une froideur assez glaçante.

Avec Chen et Zhou :
![[Cheryl_Lin-Zhou_Wenjie-Chen_Rong_FR.txt]]

```json
---- Date non indiquée (avant le 9 juin 2026) --------------------------

[09:14] Zhou Wenjie : Ce week-end, j'ai reçu plusieurs messages de Wuan. Il dit que son directeur technique commence à remettre en question une partie de ses résultats de recherche.
[09:20] Chen Rong   : Sur quelle base ?
[09:27] Zhou Wenjie : Un désaccord sur un choix technique. Rien d'irrémédiable pour l'instant, mais l'ambiance semble s'être tendue.
[09:33] Chen Rong   : Est-ce qu'il se sent visé ?
[09:40] Zhou Wenjie : Pas encore. Il craint surtout de perdre la confiance de l'équipe.

---- 9 juin 2026 -------------------------------------------------------

[18:42] Chen Rong   : D'après ses réseaux sociaux publics, Enzo Riesmeyer est plus actif ces derniers jours.
[18:50] Cheryl Lin  : Jérôme l'a vu lors de sa visite chez Marinatech, il était vraiment très agité.
[19:02] Zhou Wenjie : Oui, j'ai lu ses messages. Ce sont davantage des inquiétudes que des accusations, mais cette affaire ne doit pas aller plus loin.

---- 13 juillet 2026 ---------------------------------------------------

[14:25] Zhou Wenjie : Chen, au sujet du tributylétain, Cheryl t'a-t-elle parlé de son idée de faire fuiter l'information sur les réseaux sociaux ?
[14:31] Chen Rong   : Oui, elle m'en a touché deux mots rapidement. Nous venons de trouver la cible parfaite sur X : un militant écologiste radical, facile à acheter.
[14:36] Cheryl Lin  : Très bien

---- 17 août 2026 ------------------------------------------------------

[10:32] Zhou Wenjie : Les tests chez Marinatech sont presque terminés.
[10:33] Zhou Wenjie : D'après Wuan, le revêtement atteint désormais les objectifs fixés.
[10:41] Chen Rong   : Excellente nouvelle.
[10:47] Zhou Wenjie : Il me manque encore la formule finale.
[10:48] Zhou Wenjie : J'espère qu'il coopérera sans faire de difficultés.

---- 31 août 2026 ------------------------------------------------------

[18:12] Zhou Wenjie : Il a refusé.
[18:16] Chen Rong   : Pour quelle raison ?
[18:20] Zhou Wenjie : Il estime que ces données appartiennent à Marinatech.
[18:26] Chen Rong   : Sa loyauté envers son employeur est louable.
[18:33] Zhou Wenjie : C'est justement là que ça se complique. Cette loyauté ne devrait pas passer avant sa loyauté envers son pays. Je compte sur vous pour le lui rappeler.
[18:40] Chen Rong   : Veut-il rentrer au Lianhua après sa soutenance de thèse ?
[18:44] Zhou Wenjie : Oui.
[18:45] Zhou Wenjie : Il parle souvent de retourner voir son père.
[18:52] Chen Rong   : C'est une bonne chose.
[18:53] Chen Rong   : Les liens familiaux aident souvent à rester fidèle à ses engagements et à ne pas s'écarter du droit chemin.

---- 2 septembre 2026 --------------------------------------------------

[22:27] Chen Rong   : Alors ? Wuan a-t-il compris à qui il devait sa loyauté ?
[22:33] Zhou Wenjie : Oui. J'ai récupéré les données.
[22:40] Chen Rong   : Les décisions difficiles ne le restent généralement pas longtemps. Mais je vais quand même continuer à garder un œil sur lui.
```

Ce qu'on retient surtout de cet échange, c'est le rôle de Chen : c'est lui qui gère le sale boulot (la fuite avec un bouc émissaire payé, la surveillance d'Enzo, et in fine la pression sur le père de Wuan), pendant que Zhou garde les mains "propres" en pilotant tout depuis le Lianhua.

https://qiao.network/u/Zhouwenj71

Avec Karen :
![[Cheryl_Lin-Karen_Lin_FR.txt]]

```json
---- 2 juillet 2026 ----------------------------------------------------

[13:00] Karen Lin  : Les échanges sont devenus beaucoup plus tendus.
[13:06] Cheryl Lin : Entre qui ?
[13:12] Karen Lin  : Enzo et Wuan.
[13:13] Karen Lin  : Ils ne déjeunent plus ensemble.

---- 16 juillet 2026 ---------------------------------------------------

[19:40] Karen Lin  : Les publications sur les réseaux sociaux ont suscité beaucoup d'attention.
[19:48] Cheryl Lin : Est-ce que ça va affecter AquaVentis ?
[19:55] Karen Lin  : Pas directement.
[19:56] Karen Lin  : Mais Marinatech consacre désormais une grande partie de son énergie à gérer cette controverse.

---- 29 juillet 2026 ---------------------------------------------------

[11:00] Karen Lin  : Jérôme m'a demandé si je pensais que la demande de brevet pourrait aboutir avant l'automne.
[11:10] Cheryl Lin : Qu'as-tu répondu ?
[11:16] Karen Lin  : Que tout dépendait du calendrier des procédures réglementaires.
[11:24] Cheryl Lin : Réponse prudente.

---- 14 août 2026 ------------------------------------------------------

[15:00] Karen Lin  : Wuan a l'air épuisé.
[15:08] Cheryl Lin : Tu lui as parlé ?
[15:14] Karen Lin  : Quelques minutes.
[15:15] Karen Lin  : Il semble très préoccupé, mais refuse de dire quoi que ce soit.
[15:22] Cheryl Lin : Ne le force pas.

```

Karen, elle, semble surtout être tenue au courant sans être directement impliquée dans les manœuvres les plus sombres, elle rapporte ce qu'elle observe chez Marinatech sans jamais évoquer la partie coercition. Difficile de savoir si elle est complice ou simplement utilisée comme œil supplémentaire sur place.

Et avec Jerôme : 
![[Cheryl_Lin-Jérôme_Osfart_FR.txt]]

```json
---- 31 mai 2026 -------------------------------------------------------

[21:00] Jérôme Osfart : Salut chérie. Tu es bien arrivée à Xinhai ? Je suis passé vite fait chez Marinatech aujourd'hui. Le directeur technique semble contrarié.
[21:05] Cheryl Lin    : Salut mon coeur. Fatiguée du voyage mais bien arrivée. Je suis toujours tellement heureuse de revenir au pays. Il faudrait vraiment que tu viennes avec moi la prochaine fois. Quel est le problème avec Marinatech ?
[21:10] Jérôme Osfart : Un doctorant. Je n'ai pas tout compris.
[21:12] Cheryl Lin    : Wuan ?
[21:14] Jérôme Osfart : Oui.
[21:18] Cheryl Lin    : Quel est le problème ?
[21:19] Jérôme Osfart : Je n'ai pas tout compris mais apparemment Wuan a utilisé un produit interdit dans la composition de leur nouvelle techno sur les revêtements pour les sous-marins. Du coup ça va tout retarder. Enzo est comme un dingue
[21:23] Cheryl Lin    : Ok, tiens moi au courant. Bonne nuit chéri !

---- 9 juin 2026 -------------------------------------------------------

[20:00] Jérôme Osfart : Claire Dumontal m'indique qu'Enzo consulte énormément de documentation réglementaire.
[20:10] Cheryl Lin    : Continue simplement à observer.
[20:16] Jérôme Osfart : Tu sembles peu inquiète.
[20:22] Cheryl Lin    : Ce sont des contretemps qui arrivent souvent, je suis pragmatique c'est tout

---- 23 juin 2026 ------------------------------------------------------

[19:30] Jérôme Osfart : Je crains que cette histoire finisse par ralentir leur programme.
[19:38] Cheryl Lin    : Un retard n'est pas toujours une mauvaise chose.
[19:44] Jérôme Osfart : Tu parles comme ton mentor, Zhou.
[19:50] Cheryl Lin    : C'est probablement lui qui m'a appris la patience.

---- 16 juillet 2026 ---------------------------------------------------

[14:15] Jérôme Osfart : Je suis encore passé chez Marinatech. Ils sont très contrariés par ce qui circule sur les réseaux sociaux.
[14:20] Cheryl Lin    : Les controverses passent.
[14:22] Jérôme Osfart : Celle-ci tombe vraiment mal.
[14:30] Cheryl Lin    : Les calendriers ne dépendent pas toujours de nous.

---- 4 août 2026 -------------------------------------------------------

[18:00] Jérôme Osfart : Chasseneuil veut accélérer le dépôt du brevet. Wuan a trouvé une alternative au Tributyletain. Il termine quelques essais, d'ici un mois ça devrait être bon.
[18:12] Cheryl Lin    : Il est logique qu'il cherche à protéger ses travaux.
[18:20] Jérôme Osfart : Tu sembles dire cela avec beaucoup de détachement.
[18:28] Cheryl Lin    : J'essaie simplement de regarder les choses avec suffisamment de recul.

---- 21 août 2026 ------------------------------------------------------

[13:00] Jérôme Osfart : J'ai échangé quelques mots avec Enzo Riesmeyer en allant voir Chasseneuil ce matin. Wuan semble ne pas être dans son assiette du tout.
[13:15] Cheryl Lin    : Ça lui passera, il travaille beaucoup sur cette nouvelle techno.
[13:20] Jérôme Osfart : Peut-être.
[13:26] Cheryl Lin    : Tu devrais surtout te concentrer sur AquaVentis et sur les autres boîtes que tu as en portefeuille. N'oublie pas ta mission première trésor.

---- 1er septembre 2026 ------------------------------------------------

[19:00] Jérôme Osfart : Chasseneuil vient de m'appeler. Il est très remonté par la loi sur le Lantrium. Il me demande comment j'ai pu ne pas être au courant.

[19:08] Cheryl Lin    : C'était prévisible.
[19:14] Jérôme Osfart : Dans un sens il a raison ! Pourquoi tu ne m'as rien dit ? Ils craignent de ne pas pouvoir exporter leur nouvelle technologie.
[19:24] Cheryl Lin    : Beaucoup d'entreprises devront s'adapter. Mais cette loi est capitale pour nos intérêts. Je ne t'ai rien dit parce que j'ai dû oublier.
[19:31] Jérôme Osfart : Alors moi je me demande comment tu as pu oublier un truc pareil. On en reparlera à la maison tout à l'heure mais je suis encore au bureau.

---- 6 septembre 2026 --------------------------------------------------

[10:00] Jérôme Osfart : Chasseneuil m'a encore appelé. Il est dans une rage de dingue.
[10:05] Cheryl Lin    : Que se passe-t-il ?
[10:10] Jérôme Osfart : Leur brevet vient d'être déposé au Lianhua.
[10:16] Cheryl Lin    : C'est plutôt une bonne nouvelle pour nous ça.
[10:22] Jérôme Osfart : Je n'avais jamais vu Marc dans un tel état.

```

Jérôme, en revanche, est clairement instrumentalisé : Cheryl le tient volontairement à l'écart de l'essentiel, et sa dernière question ("j'ai l'impression qu'il me manque une partie de l'histoire") montre qu'il commence tout juste à s'en douter.

On vient donc de mettre la main sur énormément de réponses, on sait donc aussi quelle est la personne la plus influente autour de Wuan : Zhou Wenjie qui est en quelque sorte son mentor.

On peut même trouver son compte QIAO : https://qiao.network/u/Zhouwenj71
![[DT_WUD_PACT_2.png]]
Ce qui nous permet de poser un visage sur un nom, mais à part un post qui fait mention d'une soutenance de thèse d'un jeune doctorant, il n'y a rien de réellement probant.

À partir d'ici, nous avons été bloqués très longtemps, et nous avons fini par en déduire une chose : on a loupé un asset, mais malgré toutes nos recherches, on n'a pas réussi à trouver un autre compte de Wuan ou Zhou.

On a donc utilisé un indice en espérant qu'il nous serve à trouver l'asset qu'il nous manque.

>[!Note] Hint
>Sur Google Docs, on peut demander l'accès sans demander.

On a donc vraiment loupé un asset... Dans l'idée il faudrait trouver un asset qui nous renvoie vers un Google Doc. Cet indice confirme donc notre idée.
On a même été jusqu'à émettre des hypothèses sur l'adresse mail recherchée, puis tenté de voir si elle existait via des outils comme HaveIBeenPwned.

En faisant une énième vérification sur les réseaux, j'ai fini par trouver via maigret en tentant "Wuan.Xijiang" le [compte Medium](https://medium.com/@Wuan.Xijiang) de Wuan.
![[DT_WUD_PACT_3.png]]
En description, il y précise même avoir été diplômé de la Lianhua University for Marine Sciences.

On aurait pu aussi faire rebond via la description du [compte Reddit](https://www.reddit.com/user/Wuan_Xijiang) de Wuan, dans laquelle il citait son compte Medium. Mais nous ne l'avons jamais trouvé...

>[!warning] Tips
>Je pense que ce qu'il nous a manqué sur cette partie de CTF, c'est une liste claire des choses testées, et des choses à tester, avec les résultats obtenus, et surtout, il faudrait tester à la main certains réseaux les plus connus (Reddit, Medium, X, Instagram, etc) et tenter des combinaisons de nom et prénoms sur des outils comme sherlock ou maigret lorsque l'on n'a rien trouvé avec le nom d'utilisateur trouvé précédemment.
>
>Par exemple, avec le nom d'utilisateur `OneXI` de Wuan, on ne trouvait rien, on a donc tenté des choses comme `Wuan-Xijiang`, `Wuan_Xijiang`, `Xijiang-Wuan` ou encore `Xijiang_Wuan` mais nous avons arrêté trop tôt et n'avons pas vérifié à la main certains réseaux pourtant très communs.

Bref, revenons au challenge. En lisant les posts de Wuan sur Medium, on peut trouver [un post](https://medium.com/@wuan.xijiang/evolution-prospective-du-lantrium-efdc9bb6fcc2) dans lequel Wuan décrit un homme comme son mentor. 
![[DT_WUD_PACT_4.png]]
Et un lien vers un Google Doc y est référencé comme un article écrit par ce mentor.
![[DT_WUD_PACT_5.png]]
À première vue, l'article semble être classique, et il n'y a aucun auteur référencé.
![[DT_WUD_PACT_6.png]]
Mais en demandant l'accès en écriture, une fenêtre s'ouvre et le propriétaire du fichier in extenso celui qui recevra la demande d'accès au fichier en mode écriture si on finit la demande, est référencé comme : zhou.wenj71@gmail.com. 

On vient donc de trouver la personne la plus importante de l'entourage de Wuan : **==Zhou Wenjie==** et son mail **==zhou.wenj71@gmail.com==**.

---
## Message intime

### Énoncé
> ![[DT_WUD_MI_E.png]]
> Vous avez pu constater que les lois du Lianhua en matière de sécurité peuvent être très coercitives à l'encontre de ses ressortissants. Wuan avait-il vraiment l'intention de s'approprier la technologie qu'il a développée chez Marinatech au seul profit de son pays ? Se pourrait-il qu'il ait été instrumentalisé voire pire ? Est-il possible qu'il ait laissé un indice permettant de savoir s'il est bien le traître que tout le monde imagine ?
>
>> Par quelle phrase termine t-il ce message adressé à un proche ?
>
>_Flag format :  `最亲爱的妈妈`_

### RETEX
Ce challenge, nous l'avions déjà réussi avant de le débloquer, en étant perdus dans nos recherches sur Wuan, nous avions fini par analyser tous ses posts, et donc ses images.

On sait que Wuan est surveillé de près, et j'imagine qu'il le sait aussi.
On sait aussi que le Lianhua est un pays assez fermé, à l'instar de la Corée du Nord.

On peut donc imaginer qu'il a caché des messages quelque part pour quelqu'un qui lui est cher. En analysant son compte QIAO, on s'aperçoit qu'il cite énormément son père.
![[DT_WUD_MI_1.png]]

Il le porte en haute estime et c'est la personne qui lui donne le mal de pays lorsqu'il est loin de ce dernier.
Son dernier poste est même intitulé `C'est pour toi, papa.`

La stéganographie n'est pas de l'osint, mais pour le coup, ça paraîtrait logique au vu du contexte d'y avoir recours.

On peut utiliser le site aperisolve ou vérifier nous même les données de l'image de son dernier poste.
![[DT_WUD_MI_2.png]]
Exiftool nous avertit même qu'il y a des choses à la fin des données de l'image.
`Warning                         : [minor] Trailer data after PNG IEND chunk`

La commande strings nous permet de trouver une phrase : `Tu te souviens du vieux ferry de Haidong ?`.

Ce message n'a pas été laissé au hasard, ça veut forcément dire qu'il y a quelque chose de caché dans cette photo, et le moyen d'y accéder et de répondre à cette question.
![[DT_WUD_MI_3.png]]
En utilisant binwalk, on peut comprendre qu'un ZIP se cache derrière les données de l'image, donc après l'offset 1488672.
![[DT_WUD_MI_4.png]]
On peut extraire ce zip mais il est chiffré, il nous faut donc la réponse à la question précédente.

D'après le wiki du Lianhua, Haidong est une ville portuaire du pays.
![[DT_WUD_MI_5.png]]

Et cette ville possède [une page](https://lianhua.wiki/page/haidong-hai-dong) dans le wiki.
![[DT_WUD_MI_6.png]]
Sur cette page on peut voir une photo du plus vieux ferry de Haidong.
![[DT_WUD_MI_7.png]]
Et le ferry possède un nom, inscrit sur la coque, et en le traduisant on obtient : "Lotus bleu", ce doit être le mot de passe que l'on cherche.

On peut donc dès à présent dezipper le dossier : 
![[DT_WUD_MI_8.png]]
Puis l'afficher : 
![[DT_WUD_MI_9.png]]
Le fichier txt caché dans ce zip se termine par **==你深愛的兒子==**.
Et voici la traduction de ce fichier : 

```
Mon cher père,

Pardonne-moi d'écrire cette lettre avec tant de prudence, mais tu sais à quel point ils nous surveillent étroitement. Je n'aurai jamais assez de mots pour te remercier de m'avoir appris à agir ainsi.

J'ai honte. Honte de ce que j'ai fait à mon employeur en France, qui m'avait fait confiance. Mais j'espère que tu comprendras qu'ils ne m'ont laissé aucun choix, et que j'ai eu peur qu'ils s'en prennent à toi. Quand le professeur Wenjie m'a suggéré d'utiliser du tributylétain dans mes recherches, j'ai cru qu'il voulait m'aider — surtout après les résultats incroyables que j'ai obtenus. Mais l'affaire a ensuite éclaté sur les réseaux sociaux, car ce produit est interdit en Europe. J'ai travaillé jour et nuit pour trouver une solution de remplacement, et j'ai fini par mettre au point une formule presque aussi efficace. Nous étions enfin sur le point de déposer un brevet.

Puis, il y a une semaine, le professeur m'a réclamé cette formule. J'ai refusé, parce que j'avais déjà signé un accord de confidentialité avec Marinatech. Mais peu après, un homme du nom de Chen Rong est venu me trouver, pour me dire que tu allais bien — et que ce serait dommage que ça change. J'ai eu peur. J'ai envoyé la formule au professeur Wenjie, qui a déposé le brevet en nos deux noms.

Je risque d'être arrêté en France, sans pouvoir terminer ma thèse. Il ne reste qu'une semaine avant ma soutenance. J'ai le cœur brisé. Papa, j'ai honte, pardonne-moi de t'apporter ce déshonneur.

Ton fils qui t'aime.
```

Cette lettre change complètement notre lecture de Wuan. On l'a longtemps considéré comme le traître potentiel de cette histoire, mais c'est avant tout une victime prise dans un chantage familial, forcée de choisir entre trahir son employeur et mettre son père en danger. Ça rend le personnage beaucoup plus tragique qu'antipathique.

---
## Synthèse de nos éléments
On vient de mettre la main sur des mois d'échanges qui changent complètement la lecture de cette affaire.

Sur le "que s'est-il passé ?", on découvre que rien n'a été laissé au hasard. C'est Zhou Wenjie qui a lui-même provoqué les premières difficultés réglementaires de Wuan en mai 2026, avant de lui suggérer le tributylétain. Une fois l'affaire publique et Wuan rongé par la culpabilité, celui-ci a développé de sa propre initiative une formule de remplacement, que Zhou a fini par lui extorquer en le faisant chanter via son père, resté au Lianhua. Cette formule a été brevetée au Lianhua avant même que Marinatech n'ait pu déposer la sienne.

Sur le "qui poursuit quels intérêts ?", on découvre que même l'arrivée de Karen Lin chez Aquaventis Partners, en février 2026, n'avait rien d'un hasard : Zhou Wenjie et Cheryl Lin l'avaient sciemment placée là pour faciliter leurs projets sans éveiller les soupçons. Chacun y joue un rôle précis : Zhou pilote le volet technique et les pressions sur le terrain avec l'aide de Chen Rong, Liam Rong agit auprès du ministère de la Recherche, Cheryl plaide auprès du ministre du Commerce, et Jérôme Osfart sert d'instrument, en grande partie tenu dans l'ignorance du plan d'ensemble par sa propre femme.

Et sur la dynamique structurée, la préméditation du recrutement de Karen Lin, couplée à la coordination millimétrée entre Zhou, Cheryl, Chen et Liam sur plusieurs mois, confirme qu'on est bien face à une opération construite de longue date, et non une succession d'incidents malheureux.

Et voici le graphique CaseBandit qui résumé nos trouvailles durant cette partie :
![[DT_WUD.svg]]

Partie Précédente : [[Une drôle de fleur]]
Prochaine partie : `[[Partenaire particulier]]`