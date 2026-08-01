---
tags:
  - Osint
  - ChallOsint
  - TryHackMe
  - gallica
---
## Énoncé 
>It's just another Monday morning on your mail delivery route when an unusual letter catches your eye. The envelope is battered, riddled with holes as if it's been through a storm. The address is barely legible, and your coworkers at the post office wave it off as a lost cause.
>![[letter.png|500]]
>But something about it nags at you.
>
>You carefully open the damp envelope. Inside, you find a faded newspaper clipping and a short handwritten note. The clipping is torn and water-damaged, with key sections missing. 
>![[Newspaper_clipping.png|500]]
>The note is personal, clearly not meant for your eyes, but the fragments you can read hint at a story buried in time.
>![[THM_Letter_Note.png]]
>
>**Objective:**  Use the clues provided in the zip file to uncover the full name and age of the person mentioned in the note.
>
>>Flag format: THM{Name_Surname_age}, only the first letter of the name and surname should be capitalised
>>
>>Example: THM{Pierre-Henry_Lagaffe_23}

## RETEX
Pour une fois, c'est un chall sur une plateforme Anglophone, mais avec du français !
Le but ça va être de trouver le nom de la personne dont nous parle la lettre, il doit donc être en lien avec le journal expédié dans la même enveloppe.

>What is the postal code of the delivery address on the envelope?

Pour avoir plus de contexte, commençons par chercher d'où provient cette enveloppe.
Les informations basiques sont illisibles, seuls "Edouard G." et "SNSM" n'ont pas été détériorés par l'eau.
Par contre, on voit très bien l'espèce de code en bas à droite en orange.
Au début, je ne savais pas ce que c'était, mais après une rapide recherche : 
![[THM_Letter_code-barres.png|500]]
j'apprends que c'est un code-barres postal, ça sert à faciliter le tri du courrier par les machines de traitement, c'est donc le code postal qui y est transformé en "|" et "."
![[THM_Letter_wiki.png|500]]
On a donc plus qu'à le traduire :
`..||||| |.||.| ||..|| |||..| .||.||` devient donc `0 6 7 9 2` ce qui nous donne **==29760==**.
Et c'est le code postal de la commune de Penmarch dans le département du Finistère en région Bretagne.

---
> What is the flag?

Maintenant qu'on a plus de contexte sur l'origine de la lettre, on voudrait bien savoir de qui parle cette lettre.
>
>Mon cher Édouard,
>
>Aujourd'hui, en rangeant le grenier chez mes grands-parents, je suis tombée sur cette vieille coupure de journal. Ton ==arrière-grand-père== n'==avait même pas l'âge de passer le permis== quand il s'est ==distingué ce jour-là==. Le ==benjamin de l'équipe==, et certainement pas le moins courageux.
>
>Il serait si fier de te voir ==sur l'eau== à ton tour.
>
>Avec toute mon affection,
>Audette

C'est donc mon grand papi, et il s'est distingué, j'imagine sur l'eau, en étant le plus jeune de son équipe, tellement jeune qu'il n'avait pas le permis (-18 ans).
C'est donc potentiellement dans un contexte sportif, compétitif ou héroïque, il a peut-être gagné une médaille ou quelconque reconnaissance pour une action.

Par "ce jour-là", j'imagine qu'elle parle de quelque chose relaté sur le journal. On va donc essayer de retrouver son archive pour la lire un peu.

Le journal est "L'Ouest-Eclair", c'est un journal quotidien donc probablement beaucoup d'archives à son actif. Pour trouver celle que l'on veut, on va utiliser les titres, parce que le numéro et la date sont illisibles.
- "L'oeuvre urgente" : ça ne nous dit pas grand-chose ;
- "Une c...phe sur le...s du Finistère, deux ...vetage" : j'imagine une catastrophe dans la région avec des sauvetages, ça pourrais être le moment ou grand papi a brillé ;
- "Amund... a-t-il atteint le pôle Nord" : une expédition ça pourrait nous donner une fenêtre temporelle.
- "Les événements du Maroc, M Herriot se déclare solidaire de M. Painlevé." : assez flou, mais potentiellement utile.

On peut donc commencer nos recherches : 
![[THM_Letter_catastrophe.png|500]]
Je trouve deux incidents assez vieux dans le Finistère avec une notion de sauvetage.
Mais le plus vieux paraît plus logique au niveau temporalité (on parle d'un grand papi qui avait moins de 18 ans) mais aussi au niveau géographique (même département que la lettre).

Pour retrouver notre archive du journal, on va utiliser le site [Gallica](https://gallica.bnf.fr/) très bonne référence en termes d’archives de journaux.
Étant donné que les journaux doivent être imprimés et que l'information a dû prendre un peu de temps pour arriver dans les journaux, ça a dû être publié au moins le lendemain de la catastrophe, soit le 24 mai 1925.
![[THM_Letter_gallica.png|500]]
[Bingo !](https://gallica.bnf.fr/ark:/12148/bpt6k648015m.item)

Voici le contenu : 
![[Gallica_archive.pdf]]

On y apprend qu'il y a eu deux bateaux de pêche en perdition, qu'une équipe de sauvetage est allée à leur secours. Mais les bateaux de secours se sont retourné à cause des intempéries, ils ont réussi à regagner la côte en sauvant quatre hommes, mais il en restait beaucoup en mer. M Le Gall, président de la coopérative des pêcheurs de Kérity, a donc pris des risques inconsidérés et suite à des efforts surhumains, il a réussi à sauver six hommes vivants et trois corps.

J'imagine que grand papi n'était pas M Le Gall car trop jeune pour être président de quoi que ce soit. Mais il pourrait bien faire partie de l'équipage des sauveteurs qui ont récupéré quatre personnes. Je vais donc continuer à creuser cette piste en cherchant "catastrophe 23 mai 1925 penmarch"
Je tombe sur un [site](https://kbcpenmarch.franceserv.com/la-catastrophe-du-23-mai-1925-selon-les-annales-du-sauvetage.html) qui en parle et donne plus de détails, qui donne l'équipage complet, mais aussi les récompenses et les âges.
![[THM_Letter_name.png|500]]
Le seul personnel d'un équipage, ayant moins de 18 ans, c'est **==GOURLAOUEN Yves-Marie==** et il avait à l'époque **==15 ans==**.
De plus, son nom de famille a bien la même initiale que "Edouard G.", ce qui veut dire que c'était bien grand papi. D'ailleurs ce n'était pas le seul de la famille à aider, il y avait aussi GOURLAOUEN François et GOURLAOUEN Guillaume-Marie.

---
## Synthèse
L'objectif était d'identifier le nom complet et l'âge de l'arrière-grand-père au moment des faits mentionnés dans la lettre envoyée par Édouard G. Lettre liée à une coupure de journal _L'Ouest-Éclair_.

La lettre révèle un "arrière-grand-père" qui s'est distingué "sur l'eau" avant 18 ans, comme benjamin courageux d'une équipe. Le journal endommagé pointe vers une catastrophe dans le Finistère.

**Étapes de résolution** :
- **Décodage du code-barres postal orange** ( ..||||| |.||.| ||..|| |||..| .||.|| → 06792 → 29760, Penmarc'h, Finistère).
- **Repérage de l'événement via titres du journal :** "Une catastrophe sur les côtes du Finistère, deux sauvetages". 
- **Archive Gallica _L'Ouest-Éclair_ du 24/05/1925 :** naufrage de deux bateaux de pêche le 23/05/1925 ; tempête renverse les canots ; sauvetage de 4 hommes par un premier équipage, puis efforts héroïques de M. Le Gall pour 6 vivants + 3 corps.
- **Recoupement avec _Annales du sauvetage_ et sites locaux :** parmi l'équipage d'une challoupe seul **Yves-Marie Gourlaouen** a 15 ans (- 18 ans); initiale "G." et présence familiale (François et Guillaume-Marie Gourlaouen) confirment le lien avec Édouard G.

L'exploit s'inscrit dans cette catastrophe maritime tragique de Penmarch, où le jeune Gourlaouen a brillé par son courage.