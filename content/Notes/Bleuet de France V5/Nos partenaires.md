---
tags:
  - Osint
  - BleuetV5
  - Chall
order: 6
---
![[BleuetV5.png]]

>[!info] Notes
> Voici les retex des challs liés à la partie "Nos partenaires" du CTF BLEUET DE FRANCE V5 by AEGE.

***Les autres parties du CTF :***
 · | · [[Dans la peau d'un resistant]]
 · | · [[L'audace de resister]]
 · | · [[Un devoir de memoire]]
 · | · [[L'art de resister]]
 · | · Nos partenaires

---
## La force du collectif

### Énoncé 
> Dans un des carnets de votre grand-père, une phrase est lourdement soulignée à l'encre rouge : « _==On ne résiste jamais seul==._ » Hier comme aujourd'hui, les grandes actions reposent sur la force du collectif. Si vous avez pu ouvrir cette valise et plonger dans ces archives, c'est grâce au soutien de trois acteurs majeurs qui font vivre la mémoire et la solidarité au quotidien. Nous tenions à prendre le temps de les remercier :
>
> **Le Bleuet de France** : Symbole de la mémoire et de la solidarité, qui accompagne et soutient les victimes de guerre, d'attentats, ainsi que les anciens combattants et leurs familles.
>
> L'**Ordre de la Libération**: Gardien de l'héritage des Compagnons de la Libération, qui veille à transmettre les valeurs d'engagement et de courage de ceux qui ont sauvé notre pays.
>
> **Nine Line** : Association de terrain qui accompagne nos héros contemporains (militaires, pompiers, forces de l'ordre) blessés dans leur chair ou dans leur esprit, pour qu'ils ne soient jamais laissés pour compte.
>
> Leurs actions donnent tout son sens à cette compétition et à vos recherches.
>
> Pour valider ce challenge d'introduction utilisez la citation soulignée par votre grand-père.
>
>> **Format du flag** : united_we_conquer

### RETEX
Pour ce challenge le flag aurait dû être `On_ne_résiste_jamais_seul` mais je pense que les admins ont oublié de maj le flag, du coup, c'était **==On ne résiste jamais seul==**

---
## Le refuge des déchiffreurs

### Énoncé 
>![[BLEUETV5_NP_RD.png|500]]
> Été 1940. La France vient de tomber. Un ==officier français== rachète discrètement une propriété et y installe une ==équipe de cryptanalystes polonais== qui, depuis un château de la zone libre, vont continuer à ==déchiffrer les messages de la Wehrmacht en secret==. Ce centre clandestin porte le ==nom d'une ville portuaire==, à l'autre bout d'une ancienne route romaine. Il a fonctionné pendant deux ans, transmettant ses résultats à Londres. Puis, il a disparu. Retrouve sa trace.
>
> Une fois que vous avez retrouvé ce ==château==, retrouvez le **nom de code du site d’implantation** de cette cellule de cryptoanalystes qui avait pris place ici. Également, trouvez **qui en était au commandement**.
>
>> **Format du flag** : nom_organisation_Pierre_Lambert

### RETEX
Une [page wikipédia](https://fr.wikipedia.org/wiki/PC_Bruno) est le premier lien indexé par google pour les mots clés suivants : `officier français équipe de cryptanalystes polonais déchiffrer les messages de la Wehrmacht en secret château`.
![[BLEUETV5_NP_RD_PCB.png|500]]

Elle fait mention de PC Bruno, le nom de Code d'une cellule de déchiffrement pendant la Seconde Guerre mondiale avec du personnel polonais. Cette cellule est basée au château de Vignolles près de Gretz-Armainvilliers (au sud de Paris).
Elle est sous le commandement de ==Gustave Bertrand==. 
Ce résultat me parait un minimum convaincant, mais ce qui me chiffonne, c'est qu'il a été fondé en 1939 et pas en 1940 comme précisé dans l'énoncé.
L'article fait aussi mention de ==PC Cadix==, en spécifiant que l'équipe de Polonais y travaillera sous une unité à part pendant 2 ans au sujet d'Enigma.
![[BLEUETV5_NP_RD_PCC.png]]
La [page wikipédia de PC Cadix](https://fr.wikipedia.org/wiki/PC_Cadix) correspond beaucoup plus aux informations de l'énoncé que PC Bruno.
Pour en être vraiment sûr, je peux comparer les localisations à la vue satellite de l'énoncé. 
![[BLEUETV5_NP_RD_M.png|500]]
Le flag est donc **==pc_cadix_Gustave_Bertrand==**

---
## L'ingénieur de l'ombre

### Énoncé 
>![[BLEUETV5_NP_IO.png|500]]
> Ingénieur et officier, ==Gabriel Romon== se retrouve, sous le régime de Vichy, à la tête d’un centre d’écoutes stratégique. En apparence, il met ses compétences au service des autorités en place. En réalité, il ==détourne les informations qu’il capte pour alimenter la Résistance==. Il rejoint le ==Réseau Alliance==, une organisation clandestine particulièrement structurée, dont les membres utilisent des noms d’animaux pour préserver leur anonymat. Ce réseau, redoutablement efficace, attire rapidement l’attention des Allemands, qui lui attribuent un surnom d’inspiration biblique. Démasqué, Romon est arrêté puis fusillé. Mais son parcours a été conservé dans les archives, et il est encore possible d’en suivre les traces aujourd’hui.
>
> Au sein du réseau, ==chaque agent porte un nom d’animal==. Celui de Romon est ==celui d’un oiseau blanc==. Retrouvez-le.
>
>> **Format du flag** : poney

### RETEX
Pas besoin de beaucoup chercher pour ce challenge, [la page Wikipédia de Gabriel Romon](https://fr.wikipedia.org/wiki/Gabriel_Romon) est déjà bien assez fourni. 
![[BLEUETV5_NP_IO_W.png|500]]
Son surnom au sein du réseau Alliance était le **==cygne==**

---
## L'éclosion du souvenir

### Énoncé 
>![[BLEUETV5_NP_ES.png|500]]
> Cette ==fleur pousse dans la boue des champs de bataille==. Les soldats la remarquent, elle ==résiste quand tout est détruit==. En ==1925==, ==deux femmes== décident d'en faire un symbole concret : une petite ==fleur en tissu==, un ==bleuet== confectionné par des mutilés de guerre dans un atelier parisien, vendu dans la rue pour constituer leur maigre revenu. L'idée traverse un siècle. Mais tout a commencé quelque part, à une date précise. Retrouvez les origines.
>
> Après avoir retrouvé le **premier slogan que l’on pouvait voir sur  le site du Bleuet de France**, enquêtez sur les deux personnes à l’origine de ce mouvement. L’une d’entre-elle a ==signé la Déclaration de constitution de l’association nationale de bienfaisance== dite « le Bleuet de France ». **Quel est son nom ?**
>
>>**Format du flag** : et_un_pour_tous_et_tous_pour_un_Marie_Martine (sans accent)

### RETEX
Le site actuel du Bleuet de France comporte de slogan : "Le Bleuet de France Aidons ceux qui restent".
![[BLEUETV5_NP_ES_T.png|500]]
Mais si on va sur la Wayback Machine et qu'on recherche la date la plus vieille accessible pour ce site, on trouve [une version du 05 Novembre 2008](http://web.archive.org/web/20081105114857/http://www.bleuetdefrance.fr/) avec le slogan ==La mémoire se transmet, l'espoir se donne==.
![[BLEUETV5_NP_ES_WB.png|500]]

Le [site actuel du Bleuet](https://www.bleuetdefrance.fr/notre-histoire/une-fleur-dans-la-guerre-1916-1938/) tout comme sa [page Wikipédia](https://fr.wikipedia.org/wiki/Bleuet_de_France) retrace très bien l'histoire du Bleuet de France tout comme celle de ses acteurs principaux, je vous conseille de les lire.
On y apprend que les deux femmes à l'origine de cette association sont [Suzanne Lenhardt](https://www.bleuetdefrance.fr/notre-histoire/suzanne-lenhardt-lengagement-dune-infirmiere/) et [Charlotte Malleterre](https://www.bleuetdefrance.fr/notre-histoire/charlotte-malleterre-dans-le-sillage-des-generaux/).
![[BLEUETV5_NP_ES_B.png|500]]
On peut aussi y apprendre que la déclaration officielle de constitution de l'association nationale de bienfaisance dite "le Bleuet de France" a été signé et déposé le 6 mars 1935 (notamment par Suzanne Lenhardt).
![[BLEUETV5_NP_ES_D.png|500]]
![[BLEUETV5_NP_ES_D2.png|500]]
Le flag est donc : **==la_memoire_se_transmet_l_espoir_se_donne_Suzanne_Lenhardt==**

---
## MEDEVAC NEEDED
### Énoncé 
>![[BLEUETV5_NP_MN.png|500]]
> Zone de combat. Un soldat est à terre. Son équipier saisit la radio. Il a 30 secondes pour transmettre 9 lignes d'information qui permettront d'envoyer un hélicoptère. Pas une de plus, pas une de moins, c'est la procédure OTAN. C'est de cette procédure que tire son nom l'association **Nine Line** : née de la reconstruction d'un soldat blessé, elle soutient aujourd'hui militaires, pompiers et forces de l'ordre qui souffrent en silence.
>
> Voici un Nine Line intercepté. **Décodez-le des lignes 3 à 4**.
>
>> **Format du flag**: soleil_pluie_moto (_pas de chiffres, pas d'accents_)

### RETEX
En cherchant `Nine Line procédure` on trouve en premier résultat un site qui nous explique le protocole "9 Line MEDEVAC" (d'où le nom du challenge).
![[BLEUETV5_NP_MN_FR.png|500]]
On y comprend que les lignes 3 à 4 permettent de décrire rapidement le nombre de blessés par priorité et l'équipement spéciale associé requis.
Les "Alpha", "Bravo" et "Charlie" de l'énoncé font partie de l'alphabet militaire et permettent de décrire les lettres A, B et C en évitant les problèmes de compréhension dû à l'élocution.
Nous sommes donc dans un cas avec un blessé urgent et un blessé léger.
L'équipement requis est le treuil.
Le flag suivant ne fonctionnant pas, je décide de passer sur une version anglaise : `urgent_leger_treuil`.
![[BLEUETV5_NP_MN_AN.png|500]]
On obtient donc le flag suivant : **==urgent_priority_hoist==**

---
***Les autres parties du CTF :***
 · | · [[Dans la peau d'un resistant]]
 · | · [[L'audace de resister]]
 · | · [[Un devoir de memoire]]
 · | · [[L'art de resister]]
 · | · Nos partenaires