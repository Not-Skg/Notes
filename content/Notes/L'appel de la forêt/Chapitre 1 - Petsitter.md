---
tags:
  - Osint
  - Chall
  - CaseBandit
order: 6
---

## Éléments déjà découverts
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.
>Voici le graphique issu de la dernière partie : [[Chapitre 1 - La Famille Michelle - BONUS]]

![[LAF_C1_LFM.svg]]

Nous allons pouvoir nous appuyer dessus pour poursuivre nos recherches dans la suite du CTF.

---
## La mésange babysitter

### Énoncé
_🔔 Drriiiiiiiiiiing 🔔_
Vous sursautez. Vous ne vous ferez donc jamais à cette sonnette, celui qui a réglé le son devait avoir le même âge que votre voisine... Vous ouvrez la porte et vous retrouvez justement face à Renée. Celle-ci semble un peu plus rassurée que tout à l'heure.
![[LAF_C1_P_MB_E.png]]
>**Renée Michelle**
> « Je viens d'avoir la police, tu sais, ils m'ont dit qu'ils avaient une enquêtrice spécialisée pour ces cas. Je me suis permise, hein, je leur ai donné ton contact en cas de besoin. »

_*Génial, maintenant, en plus de se méfier des entreprises qui revendent vos données, votre voisine s'y met aussi, elle n'a pas dû entendre parler du RGPD*_

>**Renée Michelle**
> « Ah ! Et j'ai bien tout vérifié, encore et encore, rien n'a disparu, penses-tu ! Ils ont juste pris mon Malo »

_*C'est étrange... depuis quand les cambrioleurs s'intéressent uniquement au chat ?*_

Après vous avoir dit cela, elle commence à marmonner quelque chose à propos de son Malo et de sa friandise qu'il doit prendre alors qu'elle retourne à son appartement.

Bon, où en étiez-vous ? Ah oui, ce pet-sitter semble être un bon point de départ. Vous décidez donc de concentrer une partie de vos recherches sur celui-ci afin de découvrir s'il a un lien avec la disparition de Malo.

>>Quel est le Prénom et le Nom du pet-sitter ?
>
>_Format : `Will Smith`_

### RETEX

Pour rappel, on avait pu trouver dans un post Facebook de Sarah Michelle (la petite-fille de Renée Michelle) une affiche publicitaire pour le pet-sitter dans la rue, avec un numéro de téléphone inscrit dessus.

![[LAF_C1_I_SOS_AP.png]]
De plus, un commentaire sur ce post, de la part de Lucia Michelle (la belle-fille de Renée), précisait qu’une de ses amies avait trouvé un de ses messages sur un autre réseau avec le même numéro.
![[LAF_C1_I/LAF_C1_I_SOS_APC.png]]
Après plusieurs tentatives de reverse phone lookup avec des outils comme EPIEOS, la seule idée qui me vient à l’esprit est de chercher directement à la main ce numéro de téléphone sur tous les réseaux sociaux connus.
Bluesky s’avère être le bon réseau social, puisque la recherche `https://bsky.app/search?q=0261913352` est la seule à renvoyer un résultat intéressant.

![[LAF_C1_P_MB_RLP.png]]
Le résultat en question est [un post Bluesky](https://bsky.app/profile/josphdlmrr.bsky.social/post/3mon2h2gfss2h) d’un compte nommé `josphdlmrr`. On y retrouve une offre de pet-sitting et le même numéro que sur l’affiche, ce qui confirme qu’on a trouvé le bon compte.
![[LAF_C1_P_MB_CBS.png]]
Sur son compte, il n’y a qu’un post, un commentaire de sa part sous son propre post, et la publication d’une photo mentionnant le bas de sa rue. Le nom d’utilisateur du compte ressemble à un raccourcissement d’un prénom et d’un nom de famille, obtenu en retirant quelques voyelles, mais ce n’est qu’une suspicion. Pour confirmer tout cela, il va falloir pivoter à partir de ce nom d’utilisateur pour trouver d’autres comptes.
![[LAF_C1_P_MB_S.png]]

En utilisant un outil comme Sherlock, on peut trouver [un compte Instagram](https://instagram.com/josphdlmrr) avec le même nom d’utilisateur.
![[LAF_C1_P_MB_CI.png]]
On peut valider qu’il s’agit bien de deux comptes appartenant au pet-sitter puisqu’il utilise des photos de profil montrant son visage.
En description du compte Instagram et en nom secondaire, on trouve un prénom et un nom : **==Joseph Delamarre==**. Cela coïncide avec l’idée que son pseudo `josphdlmrr` est un raccourcissement de « Joseph Delamarre » en supprimant les voyelles, sauf la première.
![[LAF_C1_P_MB_CIV.png]]
De plus, deux de ses publications sur Instagram citent Malo et montrent des photos de lui. Ce qui nous permet, au passage, de voir pour la première fois à quoi ressemble le chat kidnappé.
Il précise même, dans [un autre post](https://www.instagram.com/p/DWJMl-UjEZC/?img_index=1) , qu’il « ne faut pas sous-estimer les petites annonces dans la rue », ce qui fait probablement référence aux affiches présentes à Orléans sur lesquelles Sarah était tombée.

---
## Bavard comme une pie

### Énoncé
_🔔 Drriiiiiiiiiiing 🔔_
Encore une fois vous sursautez. Encore une fois vous retrouvez la mère Michelle devant votre porte.

![[LAF_C1_P_BCP_EMM.png]]
>**Renée Michelle**
>« Dis-moi, j'ai oublié de te dire tout à l'heure; ma mémoire n'est plus ce qu'elle était; ma petite fille m'avait montré un truc sur l'ordinateur lors de nos dernières vacances à propos d'un monsieur qui faisait des enquêtes sur les animaux disparus. Même si je sais qu'elle est très occupée aujourd'hui, je l'ai appelée pour la prévenir que mon pauvre petit Malo avait disparu; j'ai eu tellement peur de la déranger tu sais !
>Mais entendre sa voix m'a fait beaucoup de bien, je m'inquiète tellement pour mon Malo ! Où j'en étais déjà ? Ah oui, je me suis encore permise, je lui ai donné ton contact pour qu'elle le transmette à l'enquêteur des animaux, je me suis dit que ça pourrait t'aider ! Mais je t'embête bien assez comme ça ! Tiens, prends-en une petite poignée, c'est pour te remercier de m'aider, vas-y vas-y, je t'en prie. »

_*Allons bon, vos informations personnelles continuent de se balader.*_

Vous remerciez votre voisine et retournez vous assoir devant votre ordinateur.

_📳 Bling 📳_
Votre téléphone s'allume, et laisse apparaître une notification : 
![[LAF_C1_P_BCP_EP.png]]

Bon, eh bien cela vaut peut-être le coup de suivre les idées de ce détective pour chien et chat, il a l'air de mieux maîtriser le sujet que vous...

>>Quelle est la race et quel est le prix de Malo, le chat de votre voisine ? 
>
>_Format : `siamois_5003`_

### RETEX

Pour ce challenge, il fallait se souvenir d’un post de Jean Michelle Jr sur Facebook, et plus précisément des commentaires qui l’accompagnaient.
![[LAF_C1_P_BCP_CF.png]]

Jean avait posté un mème à propos des races de chiens et de chats, et sa femme et sa fille nous donnent, dans deux commentaires différents, la race du chat de Renée : **==Bengal==** , et le prix d’achat : **==1200==**€.
![[LAF_C1_P_BCP_RII.png]]

On peut confirmer ces résultats en faisant une recherche d’image inversée sur l’une des photos de Malo. D’après[la page Wikipédia de la race](https://fr.wikipedia.org/wiki/Bengal), le prix d’un chaton peut varier de 800 € à 3000 €, ce qui est cohérent avec le commentaire.

---
## Pris dans la toile

### Énoncé
_🔔 Drriiiiiiiiiiing 🔔_
![[LAF_C1_P_PDT_EMM.png]]
Cette sonnette n'aura décidément jamais autant servi. Votre voisine est encore devant votre porte, elle tient un papier abimé.

>**Renée Michelle**
>« C'est encore moi ! J'ai continué de ranger le bazar qu'ils m'ont mis dans le salon, et j'ai trouvé ça sous le canapé, un p'tit bout de papier tout raplapla. Je suis sûre qu'il n'est pas à moi je ne laisse jamais traîner de bout de papier, imagine un peu si je glisse dessus, ce serait le drame ! Enfin bon, je me suis dit que ça pouvait avoir un lien avec mon petit Malo, qu'est-ce que tu en penses ? J'ai bien essayé de le lire, mais je n'y comprends rien à ce qui est écrit, surtout le petit zigouigoui en bas là, à côté des chiffres. J'espère que ça te sera utile.
>En tout cas, merci infiniment pour tout ce que tu fais pour moi, je m'en veux de t'embêter autant, mais tu sais ce petit chat, c'est toute ma vie... »

Vous la remerciez en prenant le papier, puis lui assurez que c'est normal de s'entraider et que vous allez tout faire pour retrouver Malo. Bon , jetons un oeil à ce papier, il contient sûrement des informations sur les intentions des catnappeurs un fois Malo enlevé : 
![[LAF_C1_P_PDT_EPF.png]]

Vous décidez d'en informer votre nouvelle connaissance
![[LAF_C1_P_PDT_EP.png]]

>>Où les catnappers se sont-ils rendus ? 
>
>_Format : `XX.XXXXXXX, XX.XXXXXXX`

### RETEX

Ce challenge a l’air de tourner essentiellement autour de ce bout de papier abîmé ; autrement, on y aurait eu accès plus tôt.
Il présente trois caractéristiques : 
- Les mots : « Bâtiment en chantier ».
- Un dessin qui semble représenter une antenne.
- Le numéro : 0452750521.

C’est possiblement le lieu de regroupement après le catnapping : un bâtiment en chantier proche d’une antenne, le tout lié au numéro 0452750521. Et cela reste probablement proche du logement de Renée, donc dans les alentours d’Orléans.
La vraie question est donc de savoir à quoi sert ce numéro : est-il lié à l’entreprise qui gère le chantier du bâtiment ? Est-ce une sorte d’identifiant pour l’antenne ?

Après plusieurs tentatives de reverse phone lookup avec des outils comme EPIEOS, ainsi que plusieurs recherches Google infructueuses par mots-clés, il devient impératif de changer de méthodologie.

Cherchons par étapes : d’abord un registre d’antennes en France avec leurs identifiants, et si l’on ne trouve pas le numéro dedans, alors c’est qu’il est lié à une société de construction.

En cherchant « antenne France » sur Google, on peut trouver le site [cartoradio.fr](https://www.cartoradio.fr/#/) , géré par l’Agence Nationale des Fréquences (ANFR), qui propose une carte de France avec toutes ses antennes et leurs couvertures. Malheureusement, la carte ne nous permet pas de rechercher une antenne via un numéro.
![[LAF_C1_P_PDT_carto.png]]
En revanche, la page d’accueil propose un lien vers un [Portail Open Data Anfr](https://data.anfr.fr/accueil).
Sur ce portail, on a la possibilité de [rechercher directement les antennes-relais](https://data.anfr.fr/visualisation/information/?id=observatoire_2g_3g_4g&disjunctive.adm_lb_nom)

![[LAF_C1_P_PDT_ant.png]]

En faisant une recherche textuelle sur 0452750521, on peut trouver huit enregistrements, chacun pour une technologie différente, mais tous liés à la même localisation : 47°57'3''N 1°53'28''E.
![[LAF_C1_P_PDT_ZC.png]]
Ces coordonnées pointent vers un bâtiment proche d’une zone en construction à Orléans. Cette zone possède bien un bâtiment en travaux d’après la vue Street View.
![[LAF_C1_P_PDT_BC.png]]

Le flag de ce challenge est donc constitué des coordonnées du bâtiment en chantier proche de l’antenne identifiée via le numéro : **==47.9513734669 1.8923789263==**

---
## Le terrier du lapin

### Énoncé
>Vous informez votre comparse que vous pensez avoir trouvé l'endroit où est retenu Malo, ou en tout cas un endroit où les catnappeurs pourraient être.
>Vous vous étirez et vous accordez quelques minutes de repos en lançant de la musique.
>Après quelques minutes, votre téléphone émet une notification. Vous coupez la musique qui devenait assourdissante... En même temps, quelle idée de faire une chanson en lien avec des cloches, faut vraiment être marteau.
> 
>![[LAF_C1_P_TDL_EP1.png]]
>Nous voilà rassuré, Malo va bien, votre voisine va pouvoir retrouver son chat, et vous allez pouvoir retourner à votre vie tranquille...
>Néanmoins, ce pet-sitter semble avoir un lien direct avec la disparition de Malo. Afin d'aider la police de votre mieux, vous décidez donc de poursuivre vos investigations pour trouver le lieu de vie de ce pet-sitter.
>Comme pour répondre à la décision que vous venez de prendre, une nouvelle notification apparaît sur votre téléphone : 
>![[LAF_C1_P_TDL_EP2.png]]
>Vous vous empressez de télécharger l'image envoyée par Péhuson : 
>![[LAF_C1_P_TDL_EI.png]]
>
>>Quel est l'adresse du pet-sitter ? 
>
>_Format : `XX.XXXXXXX, XX.XXXXXXX`

### RETEX

C'est donc l'heure de ressortir le [post Bluesky](https://bsky.app/profile/josphdlmrr.bsky.social/post/3mkcqcujink2m) du pet-sitter, aka josphdlmrr.bsky.social.

![[LAF_C1_P_TDL_PBS.png]]
Sur ce post, le pet-sitter partageait une photo prise depuis le bas de sa rue. Donc, si l’on arrive à trouver la localisation de la prise de vue, alors on trouve sa rue. Et s'il a vraiment un lien avec le catnapping, alors on devrait y trouver une porte double ocre, comme noté sur le papier affiché sur la cage de Malo.

Sur cette photo, il y a quatre points notables : 
- Un feu tricolore.
- Une intersection avec passage piéton derrière le feu.
- Le bord d’un cours d’eau en fond, vraisemblablement la Loire puisqu’il travaille à Orléans.
- Un street art représentant Popeye.

Pour essayer de réduire encore un peu la zone de recherche, on peut faire une recherche d’image inversée sur ce street art.
![[LAF_C1_P_TDL_GGL.png]]
À la suite de cette recherche d’image inversée, on peut trouver [un article de Décathlon](https://www.decathlon-outdoor.com/fr-fr/explore/france/street-art-d-orleans-68506b4cbb816) sur une balade dans Orléans qui retrace les plus beaux street arts de la ville, dont celui de Popeye.
![[LAF_C1_P_TDL_PSA.png]]
Et ce parcours traverse ou passe à côté de dix intersections face à la Loire.
Ce qui nous laisse donc dix localisations à vérifier.

![[LAF_C1_P_TDL_SVR.png]]
En visitant ces différents points d’intérêt via Street View, on finit par trouver l’intersection que l’on cherche. Notre pet-sitter habite donc rue « Notre Dame de Recouvrance ».
![[LAF_C1_P_TDL_DPO.png]]
En remontant la rue, on peut trouver une double porte ocre au numéro 11 ; ce doit donc être le lieu d’habitation du pet-sitter.
Le flag est donc :   **==47.8988059627 1.9005905092==**

---
## Synthèse de nos éléments
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.

![[LAF_C1_P.svg]]