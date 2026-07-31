---
tags:
  - Osint
  - BleuetV5
  - Chall
order: 4
---
![[BleuetV5.png]]

>[!info] Notes
> Voici les retex des challs liés à la partie "L'audace de résister" du CTF BLEUET DE FRANCE V5 by AEGE.
> C'était ma première participation au Bleuet et j'ai vraiment bien aimé, particulièrement les challenges comme `Le tract dissident` et `Plymouth 2`

***Les autres parties du CTF :***
 · | · [[Dans la peau d'un resistant]]
 · | · [[L'audace de resister]]
 · | · Un devoir de mémoire
 · | · [[L'art de resister]]
 · | · [[Nos partenaires]]

---
## Plus qu'un numéro

### Énoncé 
> ![[BLEUETV5_DM_PQN.png|500]]
> Votre grand-père avait réussi à obtenir une vraie ==fiche matricule==, un document authentique ! Malheureusement, avec le temps, l’encre s’est progressivement effacée et vous ne disposez plus que du numéro de matricule et le lieu de naissance de la ==résistante== : **62863**, **Cognac**. Intéressez-vous à son identité et à son histoire.
>
> Indiquez les coordonnées géographiques de son lieu de décès
>
>> **Format de flag** : 19.11_20.22

### RETEX
En cherchant `résistante matricule 62863 Cognac` on tombe sur [cette fiche](https://maitron.fr/riviere-marie-henriette-dite-paule-nee-querois/).
On y apprend que la résistante en question est RIVIÈRE Marie, Henriette dite Paule (née QUÉROIS)
D'après la fiche : `elle mourut pendant la nuit à l’infirmerie de Ravensbrück le 15 février 1945.`

Et d'après Google Maps, voici les coordonnées du camp : **==53.19_13.16==**
![[BLEUETV5_DM_PQN_M.png|500]]
Pas besoin de localiser précisément l'infirmerie sur la carte, le camp se situe presque entièrement dans les mêmes deux chiffres après la virgule que celui du flag.

---
## L'équipage

### Énoncé 
>![[BLEUETV5_DM_E.png|500]]
> Dans la valise, vous trouvez cette [photographie](https://bleuet.aege.fr/files/b3c2a357d8005fc0bab0cf9b0dc5035a/CTF_Bleuet_2K26_-_Lequipage_-_bis.png) d’un équipage d’agents de la Résistance. Votre curiosité vous pousse à trouver l’identité de la personne agenouillée tout à droite sur l’image.
>
>  Comment s’appelle-t-il ?
>
>> **Format du flag** :  Nomdefamille

### RETEX
En faisant une recherche par image inversée via Google Lens en ne pointant que la partie sans le cercle rouge, on peut trouver une correspondance exacte.
![[BLEUETV5_DM_E 1.png|500]]
Cette correspondance renvoie vers le site https://www.plan-sussex-1944.net/ qui est décidément très utile pour ce CTF.
![[BLEUETV5_DM_E_PS.png|500]]
On y apprend que la personne agenouillée tout à droite sur l'image est l'opérateur radio de l'équipage "Stapel" Wallace R. **==Goodman==**.

---
## La Charente libérée

### Énoncé 
>![[BLEUETV5_DM_CL.png|500]]
> « Après cette ==descente du maquis==, j'ai craint des représailles et peu après, j'ai rejoint le ==bois près de Louzac-Saint-André== ». Votre grand-père s’était apparemment intéressé à cet homme, mais ne vous a pas laissé son identité.
>
> Qui était le ==chef de ce réseau de résistance==, ainsi que son alias ?
>
>>**Format du flag** : Prénom_Nom_Alias

### RETEX
D'après [la page wikipédia de Louezac-Saint-André](https://fr.wikipedia.org/wiki/Louzac-Saint-Andr%C3%A9) :
```
Durant la Seconde Guerre mondiale, le maquis de Saint-André était dans les bois de Saint-André. Il a été rattaché au maquis de Bir Hacheim.
```

Et d'après[ celle du maquis de Bir Hacheim](https://fr.wikipedia.org/wiki/Maquis_de_Bir_Hacheim) :
```
Le maquis de Bir Hacheim est le nom donné en 1943 par Claude Bonnier à l'ensemble des maquis de Charente qu'il vient de restructurer, en hommage à la bataille de Bir Hakeim.
```

Et d'après [celle de Claude Bonnier](https://fr.wikipedia.org/wiki/Claude_Bonnier) : 
```
Sous le pseudonyme d'« Hypoténuse », il organise les forces des groupes-francs et des maquis du sud-ouest de la France, préparant des opérations de sabotage des voies de communication en vue du débarquement (Plan vert).

Il réorganise les maquis charentais, leur donne le nom de Bir Hacheim et, après un premier parachutage d'armes et de munitions, permet aux sabotages de reprendre
```

On a donc le flag : **==Claude_bonnier_hypoténuse==**

On pourrait chercher plus longtemps d'où vient la phrase de l'énoncé et si elle n'a pas juste été créée pour le challenge, mais on reste dans un CTF et si le flag passe, je passe à autre chose.

---
## Les fusillés du Mont-Valérien

### Énoncé 
>![[BLEUETV5_DM_FMV.png|500]]
> À côté d'autres photos, des notes de votre grand-père s’intéressaient à un sous-officier allemand catholique et antinazi qui, en 1944, parvient clandestinement à prendre trois photographies d’une exécution sur l’un des lieux majeurs de la répression nazie en France. Ces images, longtemps considérées comme de simples reconstitutions, ne seront véritablement authentifiées qu’au début des années 2000.
>
>**Votre mission** : retrouver le nom des résistants présents sur ces photographies.
>
> Voici le lien que votre grand-père avait noté :[https://www.fondationresistance.org/pages/rech_doc/photo.htm](https://www.fondationresistance.org/pages/rech_doc/photo.htm)
>
>> **Format du flag** : Debuy_Morel_Dupont_Guilleux (_le flag correspond aux quatre noms complets des résistants visibles sur le cliché_).

### RETEX
Le lien de l'énoncé ne marche plus.
![[BLEUETV5_DM_FMV_FL.png|500]]
On va donc la tester sur la [WayBackMachine](http://web.archive.org/web/20141215021117/https://www.fondationresistance.org/pages/rech_doc/photo.htm) :
![[BLEUETV5_DM_FMV_WB.png|500]]
On peut trouver des versions qui marchent, sur le site, on trouve donc un article sur une photographie de l'exécution au Mont-Valérien de membres du groupe Manouchian.
![[BLEUETV5_DM_FMV_GM.png|500]]
On y apprend le contexte de la photo et le nom des condamnés à mort.
```
C’est à ce jour l’une des trois seules photographies qui existent d’une exécution au Mont-Valérien. Selon Serge Klarsfeld, les condamnés photographiés seraient Celestino Alfonso, Wolf Josef Boczor, Emeric Glasz et Marcel Rajman.
```
Ce qui nous donne le flag : **==Alfonso_Boczor_Glasz_Rajman==**

---
## La Charente outragée

### Énoncé 
>![[BLEUETV5_DM_CO.png|500]]
> Alors que vous comprenez au fur et à mesure de vos recherches que votre grand-père passait ses étés d'enfant en Charente, vous tombez sur l'une de ses notes. « En ==1941==, le ==premier résistant charentais== a été ==exécuté==. Son exécution a été relayée très rapidement dans un ==journal français== ». Il semblerait que votre grand-père souhaitait retrouver cette Une de journal.
>
> Afin de lui rendre hommage, retrouvez quelles étaient la une du jour et la date de publication du numéro du journal ?
>
>> **Format du flag** : La_bataille_dans_Paris_26/03/1958

### RETEX
En cherchant les mots clés suivant sur Google, on trouve [un site](https://www.museedelaresistanceenligne.org/personnedetail.php?id=47624) qui nous renvoie vers le résistant Gontran Labrégère.
Et un autre qui nous donne un peu plus de détail :
![[BLEUETV5_DM_C0_LG.png|500]]
L'annonce a donc été publiée dans le journal _L’Œuvre_ le 14 octobre 1941.
On peut retrouver ce [numéro de L’Œuvre sur Gallica](https://gallica.bnf.fr/ark:/12148/bpt6k4622736f) :
![[BLEUETV5_DM_CO_G.png|500]]

On a donc le flag : **==La_lutte_devant_Moscou_14/10/1941==**

---
## La princesse

### Énoncé 
>![[BLEUETV5_DM_P.png|500]]
> Dans sa quête aux héros de la Résistance, votre grand-père s’était tout particulièrement intéressé à une ==résistante== connue sous le ==pseudonyme « La Princesse »==, qui s’était ==engagée en avril 1942==. Il avait pu discerner qu'elle était d’==origine italienne==, qu'elle avait exercé des ==fonctions de radio== et d’==agent de liaison==, mais aussi qu'elle disposait du ==statut d'agent permanent== qui conserve son activité professionnelle. Bien que votre grand-père était tombé sur un certain ==Gilbert Renaud qui faisait partie du même groupe de résistant==, il n'était pas parvenu à retrouver son identité à elle.
>
> Quel est le prénom et le nom d'épouse de « La Princesse » ?
>
>> **Format du flag** : Mathilde_Stuart

### RETEX
Ce chall m'a pris longtemps, parce que ma méthode n'était pas bonne, j'ai d'abord essayé de trouver la résistante via les informations qu'on avait sur elle, mais je n'ai rien trouvé d'intéressant.

Au bout d'un certain temps, j'ai décidé de changer de façon de faire, j'ai donc commencé à chercher des informations sur Gilbert Renaud et son groupe de résistant.
![[BLEUETV5_DM_P_GRG.png|500]]
J'ai appris qu'il avait fondé la "Confrérie Notre-Dame" (CND)
J'ai donc cherché la liste de résistante qui y appartenait.

Ne trouvant pas via recherche par mots clé la résistante d'origine italienne, j'ai fini par débloquer un indice.

>[!note] Indice
> Avant de s'intéresser à La Princesse, pourquoi ne pas faire des recherches sur Gilbert Renaud, qui semble-t-il faisait partie de son groupe de résistant.

Bon, j'aurais peut-être dû creuser un peu plus du côté de CND.

Je suis tombé sur le [site cnd-castille](https://www.cnd-castille.org/resistant) via la recherche `CNC resistante`
Étant donné qu'il y avait 161 pages de résultat, j'ai décidé d'utiliser leur propre barre de recherche.
En recherchant `princesse` je n'ai eu que trois résultats
![[BLEUETV5_DM_P_CND.png|500]]

En les analysant un par un, on apprend que le profil que l'on recherche est celui de Chedeville Eléonore Eleonora.
![[BLEUETV5_DM_P_CEE.png|500]]

On a donc le flag : **==Eleonore_Chedeville==**

---
***Les autres parties du CTF :***
 · | · [[Dans la peau d'un resistant]]
 · | · [[L'audace de resister]]
 · | · Un devoir de mémoire
 · | · [[L'art de resister]]
 · | · [[Nos partenaires]]