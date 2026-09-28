---
tags:
  - Osint
  - DeepThreats
  - Chall
  - casebandit
order: 8
description: RETEX des challenges de la partie 2 de "Partenaire particulier" du CTF DeepThreats, accessible seulement après déblocage du VPN
---
---
>[!info] Contexte
> Pour rappel, voici le contexte actuel de ce CTF sous forme de graphique Casebandit.
> ![[DT_EET2.svg]]
>
> J'ai séparé "Partenaire particulier" en deux RETEX distincts : ces deux derniers challenges ne sont faisables qu'après avoir gagné l'accès au VPN, ce qui n'arrive que tard dans le CTF.

Partie Précédente : [[En eaux troubles 2]]

---
## Poupées russes

### Énoncé
> ![[DT_PP_PR_E.png]]
> Vous avez pu vous rendre compte qu'Aquaventis Partners n'est française que par son siège social et qu'elle appartient en réalité à un fonds d'investissement européen. Pour autant, vous avez appris, la preuve en est ici, que les apparences peuvent être trompeuses et il n'y a rien de plus opaque qu'un fond d'investissement. Damned ! Il vous faut vérifier que ce n'est pas un meuble à tiroirs.
>
>> Quelle entreprise possède réellement Aquaventis Partners ?
>
>_Flag format :  `The Michelle Mother`_

### RETEX

Pour rappel, on avait découvert dans un précédent challenge qu'Aquaventis Partners était détenue à 90 % par Blue Current Europe. Voyons donc qui se cache derrière cette dernière.

On retrouve Blue Current Europe sur [papiers.business](https://papiers.business/entreprise.php?siren=B287451), qui référence son acte constitutif :
![[DT_PP_PR_1.pdf]]
Blue Current Europe S.à r.l. est une société luxembourgeoise, constituée le 18 novembre 2022 avec un capital de 15 000 000 EUR. Son unique associé fondateur, détenant 100 % des parts, est Blue Current Holding Ltd, dont le siège se trouve à Haidong, en République du Lianhua.

![[DT_PP_PR_2.png]]
Encore une société du Lianhua donc. On va logiquement vérifier son immatriculation sur le CRA interne, le registre national d'entreprises du pays, accessible depuis le VPN.

![[DT_PP_PR_3.png]]
La fiche de Blue Current Holding Ltd, dirigée par Shen Yikang (Président/CEO), indique un actionnaire majoritaire : Hydronix Marine Corporation.

On retrouve donc, au bout de cette chaîne de poupées russes, un nom qui ne nous est pas inconnu : **==Hydronix Marine Corporation==**, l'entreprise avec laquelle Aquaventis avait justement noué un partenariat de 5 ans pour donner naissance à LORII, découvert dans Partenaire particulier 1. Autrement dit, l'entreprise qui possède réellement Aquaventis Partners n'est autre que son propre partenaire d'innovation maritime déclaré.

Hydronix Marine Corporation est l'actionnaire majoritaire de Blue Current Holding.

Voici la chaîne de détention complète :

```
Fonds souverain national (Lianhua)
        └── 51 % → HYDRONIX MARINE CORPORATION (Lianhua)
                  ├── partenariat déclaré de 5 ans avec AquaVentis Partners → LORII (Lianhua Oceanic Research & Innovation Institute, Haidong)
                  │
                  └── Actionnaire majoritaire → Blue Current Holding Ltd (Haidong, Lianhua), Président/CEO : Shen Yikang
                            └── 100 % → Blue Current Europe S.à r.l. (Luxembourg, RCS B287451)
                                      └── 90 % → AquaVentis Partners SAS (La Défense), Jérôme Osfart, Président, 10 %
                                                └── 20 % → MARINATECH INDUSTRIES

```

Ce recoupement donne enfin du sens à toute l'action de Chen Rong observée jusqu'ici. En menaçant Enzo et en épaulant Zhou dans la pression exercée sur Wuan, il ne protégeait pas seulement les intérêts personnels de Zhou : il protégeait, en réalité, toute une chaîne de sociétés écrans qui remonte jusqu'au Lianhua lui-même, celle-là même qui a permis au pays de reprendre discrètement le contrôle des parts de Marinatech via Hydronix Marine Corporation. Intimidation d'un côté, montage capitalistique de l'autre : deux moyens différents au service du même objectif, mettre la main sur les technologies de Marinatech sans attirer l'attention.


On a voulu pousser la vérification un cran plus loin en allant regarder directement le site d'Hydronix Marine Corporation, sur sa page "About".
![[DT_PP_PR_4.png]]

Et la page l'affiche noir sur blanc : Hydronix Marine Corporation est elle-même détenue à 51 % par le fonds souverain national du Lianhua, le reste se répartissant entre 34 % de flottant boursier et 15 % d'investisseurs institutionnels. Ce n'est donc pas juste une entreprise privée qui a discrètement repris le contrôle de Marinatech par une chaîne de sociétés écrans : au bout de cette chaîne, l'actionnaire majoritaire, c'est littéralement l'État du Lianhua. Ça change la nature des conséquences : on ne parle plus d'une simple opération capitalistique menée par un groupe industriel opportuniste, mais d'une prise de participation indirecte d'un État étranger dans une PME de la Base Industrielle et Technologique de Défense française, exactement le genre de scénario que les contrôles des investissements étrangers sont censés empêcher.

---
## Le pacte

### Énoncé
> ![[DT_PP_LP_E.png]]
> Vous le saviez !! Cela fait un moment que vous avez senti qu'un truc n'était pas clair avec Aquaventis et finalement, vous découvrez que cette soi-disant structure française appartient à Hydronix Marine Corporation.
>
> Pour boucler votre enquête, il faudrait néanmoins trouver une preuve irréfutable du mandat réel d'Aquaventis et de la raison pour laquelle cette entreprise a réellement été créée. Mais avec tout ce que vous êtes déjà parvenu à trouver jusqu'ici, il ne fait aucun doute que vous y arriverez.
>
>> En cas d'impossibilité de transfert direct du capital en raison de clauses particulières, que doivent faire les parties ?
>
>_Flag format :  `The rivals will do whatever it takes to ensure that each of them stays alive, even if they hate each other`_

### RETEX
Dans Poupées russes, on vient de découvrir qu'Aquaventis Partners appartient en réalité à Hydronix Marine Corporation, au bout d'une chaîne de sociétés écrans. Il nous manque maintenant la pièce qui explique pourquoi : une preuve du vrai mandat d'Aquaventis, et de la raison pour laquelle cette structure a été montée de cette façon plutôt qu'une simple filiale classique.

Pour trouver cette preuve, on a d'abord fouillé tous les sites liés à l'histoire accessibles via le VPN, sans succès. On est même allé jusqu'à éplucher la base de données des lois, dans l'espoir qu'un texte encadre spécifiquement ce genre de montage, mais toujours rien. On a donc fini par se concentrer sur le site d'Hydronix Marine Corporation lui-même, via le VPN.

![[DT_PP_LP_1.png]]
Étant donné que nous ne pouvons utiliser aucun outil ni extension via le VPN, nous sommes obligés de faire nos recherches à la main. Le robots.txt révèle qu'il existe toute une partie d'administration, mais en demandant au support du CTF, on apprend que c'est hors scope. On a tenté aussi les sitemap.xml, mais rien de probant non plus.

On a bloqué très longtemps là-dessus, avant de finir par utiliser un indice :
>[!Note] Hint
>Deux entreprises sont mentionnées dans l’énoncé : deux sites à explorer et à analyser.
>Mais n'oubliez pas :
>>D'après plusieurs sources, certains services web sont accessibles à la fois depuis le réseau interne et depuis l'Internet public. Selon leur mode de publication, le contenu ou les données présentés peuvent différer.

On est donc sur la bonne piste puisque l'on analyse hydronix-marine-corporation.ln. On avait déjà dû changer le TLD d'un autre domaine pour réussir un précédent challenge, et cette fois-ci, il s'agit du site d'une entreprise du Lianhua qui travaille aussi à l'international. On se dit donc qu'il est plausible qu'elle ait, elle aussi, un site accessible depuis l'extérieur du pays, en .int.

Les sites ont très peu de différences en soi, en voici des extraits :

| hydronix-marine-corporation.ln                                                             | hydronix-marine-corporation.int                                                    |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| ![[DT_PP_LP_2.png]]<br>![[DT_PP_LP_3.png]] | ![[DT_PP_LP_8.png]]<br>![[DT_PP_LP_9.png]] |
| ![[DT_PP_LP_4.png]]       | ![[DT_PP_LP_10.png]]                                          |
| ![[DT_PP_LP_5.png]]![[DT_PP_LP_6.png]]    | ![[DT_PP_LP_11.png]]                                         |
| ![[DT_PP_LP_7.png]]       | ![[DT_PP_LP_12.png]]                                        |
| locale et à jour : V 13.37        | internationale et non à jour : V 12.01                                            |
Les seuls changements notables sont la version du site et quelques offres d'emploi qui changent, aucun autre dossier ou fichier n'est accessible dans une des deux versions du site.

On débloque donc un deuxième hint :

>[!Note] Hint
>Partons sur le site d’Hydronix Marine Corporation. Celui-ci semble exister en deux versions : une en «.ln» et une autre en «.int».
>
>L’une de ces deux versions ne semble d’ailleurs pas être à jour… Il y a probablement quelques éléments intéressants à creuser de ce côté-là !
>
>Et puis, cette nouvelle offre d’emploi récemment publiée sur leur site semble plutôt intrigante… Une miss configuration sur l'ancien site ?

On était donc encore une fois sur la bonne voie, mais on n'avait pas imaginé qu'il fallait exploiter une misconfiguration. C'est à mon sens l'un des points problématiques de ce CTF : dans un cadre normal, hors CTF, c'est illégal et peu éthique.

![[DT_PP_LP_13.png]]
Sur le site le moins à jour, une offre d'emploi faisait bien allusion à une misconfiguration, en demandant à un Web Security Engineer de postuler pour aider notamment à fixer des vulnérabilités et des misconfigurations sur les services. Offre qui n'existe plus sur la nouvelle version du site, signifiant qu'ils ont trouvé la bonne personne et ainsi corrigé ces soucis.

On avait pu voir plus tôt, dans le robots.txt, que le site tournait sous Apache. Après une petite recherche, on apprend qu'ajouter `/server-status` à l'URL d'un domaine sous Apache permet de révéler des informations sur le serveur, dont d'éventuelles misconfigurations.
![[DT_PP_LP_14.png]]
Et en l'utilisant sur hydronix-marine-corporation.int, donc le moins à jour, on apprend qu'un dossier est accessible à tout le monde à cause d'une misconfiguration, le dossier : `/s3cr3tfileS3cuR7s3d`.

![[DT_PP_LP_15.png]]
En y accédant, le score de détection augmente automatiquement d'un coup. Et on peut y voir 5 fichiers accessibles, dont un nommé : `HMC_AquaVentis_Strategic_Development_Agreement.pdf`, ça doit être celui que l'on cherche.

![[DT_PP_LP_16.png]]
En y accédant, on est censé voir le fichier, mais nous avons eu un problème technique qui bloquait l'affichage du document.

![[DT_PP_LP_17.png]]
Et en rafraîchissant la page, ou en revenant en arrière puis en le rouvrant, rien ne change, pire encore, le score de détection grimpe en flèche.

![[DT_PP_LP_18.png]]
Au final, on a fini bloqué : banni par le système de détection pour une durée de 10 minutes. Le CTF se termine à 20h00, il est 19h52... on ne pourra donc pas finir dans les temps.

Ce n'est que quelques temps après la fin du CTF, une fois le ban levé et les services de la plateforme de nouveau disponibles, qu'on a pu revenir sur ce dossier. L'affichage du document ne fonctionnait toujours pas, mais cette fois le bouton de téléchargement est apparu, ce qui nous a enfin permis de récupérer le fichier.

Voici donc le document qu'on cherchait : STRATEGIC DEVELOPMENT AND INVESTMENT COOPERATION AGREEMENT - Hydronix Marine Corporation / Jérôme OSFART
![[DT_PP_LP_19.pdf]]

On y trouve l'article suivant :
```
**ARTICLE 5 - TRANSFER OF STRATEGIC EQUITY INTERESTS**

5.6 Where a direct transfer cannot be completed, the Parties shall examine an alternative structure providing substantially equivalent economic or governance rights, subject at all times to applicable law.
```

Cette clause répond donc à la question qu'on se posait, mais il faut la décortiquer pour comprendre pourquoi elle est si importante.

En clair, cet article dit ceci : si jamais Hydronix ne peut pas racheter Marinatech directement, c'est à dire devenir actionnaire en son nom propre, les deux parties doivent alors chercher un autre montage juridique qui leur donne à peu près les mêmes avantages (mêmes droits sur l'argent généré, même pouvoir de décision) sans que ce soit un rachat classique, du moment que ça reste légal.

Autrement dit, le contrat prévoyait déjà, noir sur blanc, un plan B au cas où l'achat direct serait impossible ou interdit. Et c'est exactement ce plan B qu'on a mis au jour dans Poupées russes : si Hydronix ne pouvait pas détenir Marinatech en direct, sans doute pour des raisons de protection des actifs stratégiques français, alors la chaîne Blue Current Holding → Blue Current Europe → Aquaventis Partners est très probablement la "structure alternative" que cet article autorisait. Le montage capitalistique n'était donc pas un simple choix d'opacité, c'était une solution de contournement prévue contractuellement dès le départ.

Le plus gros problème que l'on a eu avec ce challenge, en dehors du fait que c'était une sorte de mini pentest dans le sens où il fallait exploiter une misconfiguration pour accéder aux fichiers, c'est que le VPN buguait énormément sur la fin : plusieurs fois, sur des URL légitimes, les sites ne chargeaient pas.

![[DT_PP_LP_20.png]]
Et pire, les documents à lire via la misconfiguration ne voulaient pas charger non plus. On avait donc la solution sous les yeux, mais impossible de l'exploiter à cause d'un problème technique.
![[DT_PP_LP_21.png]]
Il n'était donc pas possible non plus de télécharger le fichier à ce moment-là. Normalement, d'après le write-up officiel des admins, la page aurait dû s'afficher comme suit :
![[DT_PP_LP_22.png]]
avec même un bouton qui nous aurait permis de télécharger le document directement...

Et en prime, j'ai voulu laisser un message du type : "C'est chiant de se faire ban juste avant la fin, ça veut dire que t'as plus aucune possibilité de continuer" sur le serveur communautaire du CTF. Mais un bot a vu mon message, l'a pris pour un message à contenu invectivant ou autre, et m'a banni du Discord pendant 24h. Je ne pouvais donc ni envoyer de message, ni réagir aux autres messages, ni envoyer des mèmes, ni discuter avec le support. C'était une sensation bizarre d'avoir été mis à l'écart d'un challenge pour lequel on avait donné beaucoup de notre temps et de notre énergie.

Ça donne aussi un énorme sentiment d'insatisfaction, de non-complétion, dû au fait de ne pas avoir eu accès au challenge de conclusion suivant.


---
## Conclusion

### Énoncé
> ![[DT_EET2_C_E.png]]
>>  Fin du compteur
>>  En validant ce challenge, vous arrêtez définitivement le chronomètre lié à votre temps de résolution de l’enquête. En cas d’égalité de points entre plusieurs équipes, ce temps de résolution sera utilisé comme critère pour vous départager.
>
>Félicitations cher(s) enquêteur(s) ! Vous êtes arrivé(s) au bout ! Nous savons maintenant que nous avons affaire à un très bel exemple d'ingérence étrangère et de guerre économique sur des acteurs de la Défense française ! Les différents services du ministère des Armées, DGA en tête, vont pouvoir prendre le relai sur les mesures à prendre. Merci pour votre implication !
>
>Vous trouverez ci-dessous la catégorie Sidequest si vous souhaitez booster votre score final.
>
>Si vous faites partie des 15 premières équipes dimanche à 20h00 (fin du CTF), Vous aurez alors accès à un espace sur cette plateforme sur lequel vous trouverez les instructions pour faire votre rapport d'enqûete et deposer celui-ci avant le mercredi 16 septembre minuit. Les points obtenus pour le rapport s'ajouteront au score du CTF pour déterminer le classement final qui sera annoncé dimanche prochain à 20h.
>
>Un grand merci pour votre participation et nous espérons que vous avez pris autant de plaisir à faire ce CTF que nous à le concevoir !
>
>>Rentrez le mot ci-dessous pour stopper votre chrono définitif, encore BRAVO !
>>LIANHUA4EVER
### RETEX

J'aurais aimé le voir dans les temps : c'est très rare que je ne finisse pas un CTF, surtout après un tel investissement. Malgré tout ce que j'ai pu dire sur ce CTF, en bien comme en mauvais, je le trouve vraiment intéressant : complet, technique (surtout sur la fin, peut-être même un peu trop pour des néophytes), ce qui explique sans doute que seulement 49 équipes soient allées jusqu'au bout.

Côté ambiance, c'était vraiment sympa. Il y a d'abord le côté histoire, avec ses découvertes et ses retournements de situation, renforcé par la pression du VPN et des bannissements. Et il y a le côté communauté : sur le support comme sur le Discord, tout le monde (admins comme challengers) était à fond et dans une super ambiance. J'y ai beaucoup appris, et je pense ne pas être le seul : je ne peux que le recommander aux amoureux de l'OSINT en quête de nouveautés.

Encore merci aux admins, qui ont vraiment bien géré le support malgré l'énorme charge à laquelle ils ont dû faire face, toujours dans la bonne humeur et avec beaucoup de pédagogie.

---
## Synthèse finale de nos éléments

Ce dernier chapitre permet enfin de refermer les trois questions posées dès le début de l'enquête, avec une réponse complète pour chacune d'elles.

Sur le "que s'est-il passé ?", l'histoire tient enfin debout de bout en bout. Le Lianhua, via son champion naval Hydronix Marine Corporation, visait la technologie de revêtement furtif de Marinatech. Pour y parvenir, Zhou Wenjie, mentor de Wuan et Directeur du National Innovation Council du Lianhua, a lui-même provoqué les premières difficultés du doctorant avant de lui souffler l'usage du tributylétain, produit interdit qui a ensuite fuité sur les réseaux (une fuite payée, remontant jusqu'à l'Institut Lotus). Une fois la formule de remplacement de Wuan mise au point, Zhou la lui a extorquée via Chen Rong, qui a fait pression sur le père de Wuan resté au Lianhua, avant de la déposer comme brevet au Lianhua avant même que Marinatech ne puisse déposer le sien. En parallèle, sur le volet capitalistique, Aquaventis Partners, le partenaire censé accompagner Marinatech à l'international, a cédé sans préavis les 20 % qu'il détenait dans Marinatech à Blue Current Europe, une cession rendue possible par la liberté totale de cession inscrite dans les statuts de Marinatech (article 10). On a par la suite découvert que Blue Current Europe n'était elle-même qu'un maillon d'une chaîne remontant jusqu'à Hydronix Marine Corporation, actionnaire majoritaire de Blue Current Holding : Hydronix se retrouve donc à la fois partenaire déclaré d'Aquaventis via LORII et propriétaire réel d'Aquaventis par la bande. Et en creusant jusqu'au bout, on a découvert qu'Hydronix elle-même est détenue à 51 % par le fonds souverain national du Lianhua : au bout de toute cette chaîne de sociétés écrans, l'actionnaire final, c'est littéralement l'État. Un document contractuel a fini de boucler cette partie en révélant que ce montage n'était même pas improvisé : l'article 5.6 de l'accord signé entre Hydronix et Aquaventis prévoyait dès le départ qu'en cas d'impossibilité de transfert direct, les parties chercheraient une structure alternative à droits équivalents, exactement la chaîne de sociétés écrans qu'on a remontée.

 Sur le "qui poursuit quels intérêts ?", chaque acteur trouve enfin sa place précise dans le dispositif. Zhou Wenjie pilote l'ensemble depuis le Lianhua, avec la double casquette de mentor manipulateur de Wuan et d'acteur institutionnel du pays. Chen Rong est l'homme de terrain : c'est lui qui menace le père de Wuan, et c'est aussi lui qu'on retrouve derrière le mail de menace envoyé à Enzo, via une société qu'il préside. Liam Rong, son frère, a construit et pilote la façade numérique de l'Institut Lotus et fait pression sur le ministère de la Recherche. Cheryl Lin en est la vitrine officielle, directrice des relations publiques de l'institut et autrice de la doctrine sur le Lantrium, tout en plaidant elle-même auprès du ministre du Commerce et en tenant son propre mari, Jérôme Osfart, dans l'ignorance quasi totale du plan d'ensemble. Sa sœur, Karen Lin, sert d'œil discret placé chez Aquaventis. Et derrière ce dispositif humain, Hydronix Marine Corporation, et donc en dernier ressort l'État du Lianhua lui-même, apparaît comme le véritable bénéficiaire financier de toute l'opération, à la fois partenaire affiché et propriétaire caché de l'entreprise censée représenter les intérêts français dans cette histoire.

Enfin, sur la question d'une succession d'incidents indépendants ou d'une dynamique plus structurée, cette dernière partie referme définitivement le débat. Le cadre juridique découvert au Lianhua (contrôle des exportations de Lantrium à portée extraterritoriale, obligation de coopération pouvant aller jusqu'à la haute trahison) donne un fondement légal à la pression exercée sur Wuan, pendant que la clause contractuelle entre Hydronix et Aquaventis planifiait à l'avance le contournement capitalistique. Rien de tout cela n'est une suite de coïncidences malheureuses pour Marinatech : c'est une opération d'ingérence étrangère et de guerre économique, méthodique, coordonnée à plusieurs niveaux (technique, humain, juridique et financier) et construite sur plusieurs mois, exactement comme les administrateurs du CTF le résument eux-mêmes au moment de refermer l'enquête.

### Avant / après : ce que révèle la comparaison des deux graphiques

Pour mesurer le chemin parcouru, il suffit de comparer le tout premier graphique CaseBandit, généré au tout début de l'enquête, à celui d'aujourd'hui.

![[DT_AVM.svg]]
À l'époque, Marinatech Industries est le seul nœud nommé du schéma. Tout le reste n'est qu'une série de cases anonymes reliées par les quatre premiers indices de l'enquête : 
- un "Partenaire Marinatech" qui lui confie puis revend 20 % de son capital sans préavis, 
- une "Entreprise Tierce" qui rachète ces parts, 
- un "Media" à l'origine d'une fuite d'informations confidentielles, 
- et une "Nation étrangère" qui bloque une partie de ses perspectives d'innovation et dépose un brevet juste avant elle. 
Quatre questions sans nom, et rien d'autre.

![[DT_PP2.svg]]

Le graphique final, lui, met un nom, un visage et une preuve derrière chacune de ces cases. Le "Partenaire Marinatech" anonyme, c'est Aquaventis Partners, dont on a fini par démonter toute la structure actionnariale jusqu'au bout. L'"Entreprise Tierce", c'est Blue Current Europe, elle-même détenue par Blue Current Holding. La "Nation étrangère", c'est la République du Lianhua, via son fonds souverain et son champion naval Hydronix Marine Corporation. Et le "Media", c'est tout un appareil d'influence, l'Institut Lotus et Lianhua News Network, avec des noms précis derrière chaque rouage : Zhou Wenjie, Chen Rong, Cheryl Lin, Liam Rong, Karen Lin. Ce qui tenait sur quatre cases vides au premier jour de l'enquête occupe aujourd'hui l'essentiel du graphique.

### Le mot de la fin

Ce RETEX est la synthèse de l'avancée de notre équipe, de nos méthodes, de nos doutes et de nos échecs autant que de nos réussites. Je ne le rédige pas parce qu'on me le demande, mais parce que j'aime partager et que je trouve enrichissant de lire ceux des autres pour progresser. L'objectif n'est donc pas de vous livrer un rapport d'investigation figé, mais de partager notre cheminement, pour que vous puissiez comprendre comment on raisonne en OSINT, où on s'est trompé, et où on a fini par trouver la bonne piste.

Si vous cherchez un vrai rapport d'investigation façon DGA, sans le cheminement mais avec toute la synthèse opérationnelle (fiches acteurs, chronologie millimétrée, vulnérabilités classées, recommandations), je vous invite à lire celui de TacosZulu, l'équipe arrivée deuxième au classement. Les deux versions racontent la même histoire sans se contredire ; la leur va même un peu plus loin sur certains points, notamment sur le dossier caché derrière la misconfiguration Apache, où l'on a eu accès aux cinq documents une fois le CTF terminé, mais dont je n'ai repris dans ce RETEX que celui qui répondait à la question du challenge, l'accord HMC/SD-09-2025 entre Hydronix et Aquaventis. Leur rapport exploite aussi les quatre autres, et ça vaut le détour : on y apprend qu'un contrat de recherche entre Hydronix et la LUMS existait déjà depuis décembre 2025, signé personnellement par Zhou Wenjie, avec une clause permettant à Hydronix de retarder jusqu'à 90 jours la publication d'une thèse ou d'un article pour laisser le temps de déposer un brevet, autrement dit le mécanisme même utilisé contre Wuan était prévu par écrit bien avant que l'affaire n'éclate. On y trouve aussi un accord d'essais entre Hydronix et le LORII portant sur la comparaison de signatures acoustiques sous-marines, et surtout la mention d'un programme baptisé NEREUS, avec son fournisseur Meridian Fabrication, qui donne enfin un nom concret à la destination militaire finale de toute cette histoire, un élément qu'aucun challenge du CTF ne nous a demandé de trouver.

---

Partie Précédente : [[En eaux troubles 2]]