---
tags:
  - Osint
  - LAF
  - Chall
  - casebandit
order: 15
---
## Éléments déjà découverts
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.
>Voici le graphique issu de la dernière partie : [[Chapitre 2 - Acte 3 - Transport]]

![[LAF_C2_A3_T.svg]]

Nous allons pouvoir nous appuyer dessus pour poursuivre nos recherches dans la suite du CTF, et sur cette partie plus que jamais puisqu'elle constitue une sorte de synthèse de toutes les parties précédentes.

---
## Le Piège de l'Araignée

### Énoncé
>Après ces heures de recherches, vous avez récolté beaucoup d'informations sur l'enlèvement et l'organisation derrière celui-ci. Il serait intéressant de tenir informé votre contact au sein de la police, sur des détails que vous avez pu récolter concernant l'enlèvement de Malo. Vous lui envoyez un message récapitulatif résumant les informations.
>
>« Madame Brethone,
> Suite à notre dernier échange en lien avec l'enlèvement du chat Malo de madame Michelle, j'ai pu récolter de nouvelles informations. Afin de vous aider dans votre enquête, veuillez trouver ci-dessous les éléments que j'ai pu obtenir : »
>![[LAF_C2_A4_PA_B.png]]
>>Les dates sont à renseigner au format format `dd/mm/yyyy`

### RETEX
![[LAF_C2_A4_PA_1.jpg]]
On peut déjà répondre à toutes les questions (sauf la valeur) rien qu'en survolant le graphe.
Dans l'ordre attendu :
- Pseudo : **==Virgata==**
- Prénom Nom : **==Steven Pichon==**
- nom du réseau : **==Instagram==**
- date : **==11/04/2026==**
- valeur : ??
- date : **==18/05/2026==**
- adresse crypto : **==0x3D8B1dAc8556a66c2A2280eaAA153C9b026e2585==**

Pour la valeur du montant, on peut utiliser le graphe de ChainMap créé quelques parties plus tôt ; on peut aussi en profiter pour vérifier l'adresse en question.
![[LAF_C2_A4_PA_2.png]]
On a donc la valeur : **==0.031==**


---
## La hiérarchie de la meute

### Énoncé
>![[LAF_C2_A4_HM.png]]
>Au vu de l'ampleur qu'a cette enquête, vous lui communiquez les informations sur les membres que vous avez identifiés dans cette organisation ainsi que les informations pouvant aider à leur capture :
>![[LAF_C2_A4_HM_Q.png]]
>>Les pseudos attendus sont ceux utilisés sur le canal de communication de l'organisation, sans les numéros ajoutés automatiquement par l'application utilisée, et qui sont présents sur les profils des membres

### RETEX
Pareil, on a déjà presque tout :
- Nom de l'organisation : **==la meute rouge==**
- Nom de la partie :  **==Noctua==**
- Nom de la partie :  **==Tusko==**
- Nom de la partie :  **==Panthera==**
- Nom de la partie :  **==Scorpiox==**
- Prénom Nom : Sylvie xxx
- Pseudo : **==Lycaon==**
- XXX avenue bidule : XXX Rue de Bourgogne
- Ville : **==Orléans==**

Pour son adresse, on avait trouvé l'emplacement de son appart, mais on n'avait pas récupéré le numéro de rue.
![[LAF_C2_A4_HM_1.png]]
En utilisant Street View aux coordonnées trouvées la dernière fois (47.9000918, 1.9089714), Google attribue le numéro **==215==** à cet emplacement.

![[LAF_C2_A4_HM_2.png]]
Pour son nom de famille, on peut trouver une conversation sur Keybase où Tigris annonce avoir trouvé un portefeuille après la dernière réunion ; il va même jusqu'à poster une photo de ce dernier.
![[LAF_C2_A4_HM_3.png]]
Et Lycaon annonce ensuite que c'est le sien.
Et sur une des cartes de fidélité présentes dedans, on peut lire **==Durand==**, son nom de famille.

---
## Noctua

### Énoncé
>![[LAF_C2_A4_HM.png]]
>Vous décidez de commencer par la branche Noctua :
>![[LAF_C2_A4_N_Q.png]]
>>Les pseudos attendus sont ceux utilisés sur le canal de communication de l'organisation, sans les numéros ajoutés automatiquement par l'application utilisée, et qui sont présents sur les profils des membres

### RETEX
Pour ce challenge, il nous manque quelques informations sur le graphe.
Mais on a déjà les identités : **==Huhul==** est **==Dave Renault==**, et **==Virgata==** est **==Steven Pichon==**.

Pour Huhul, on avait trouvé plus tôt ses repos GitHub, mais on ne les avait jamais vraiment analysés en profondeur.
![[LAF_C2_A4_N_1.png]]
Le repo qui nous intéresse particulièrement, c'est celui nommé "Discord_weather_station". Étant donné que la météo dépend énormément de l'emplacement géographique, il y a peut-être un peu plus d'informations cachées dedans.
![[LAF_C2_A4_N_2.png]]
Un [commit du 11 février 2026](https://github.com/RenDavePet/Discord_weather_station/commit/cca94cc1962acc2ef7747f9d2a88c055a017ce09) est nommé "Move home location to .env for privacy", ça m'a l'air d'être super intéressant pour trouver ce que l'on cherche.
![[LAF_C2_A4_N_3.png]]
On peut trouver dans ce commit la suppression des coordonnées suivantes : 47.7793, 1.8742.
![[LAF_C2_A4_N_4.png]]
Et ces coordonnées nous renvoient vers une maison du village nommé **==Ardon==**.

Pour Virgata, on n'avait jamais vraiment pris le temps de lire ses articles.
![[LAF_C2_A4_N_5.png]]
Et dans [celui sur Oscar Zulu](https://blog-de-osinttheanimals.xyz/posts/oscar-zulu--léquipe-française-qui-révolutionne-losint-par-le-jeu-et-lenquête/), il explique vivre à **==Limoges==**.

---
## Tusko

### Énoncé
>![[LAF_C2_A4_HM.png]]
>Vous décidez de commencer par la branche Tusko :
>![[LAF_C2_A4_T_Q.png]]
>>Les pseudos attendus sont ceux utilisés sur le canal de communication de l'organisation, sans les numéros ajoutés automatiquement par l'application utilisée, et qui sont présents sur les profils des membres

### RETEX
Pour celui-ci, il nous manque encore une fois l'adresse, mais on a déjà l'identité : **==Maximus==** est **==Jean Charpentier==**.
L'asset le concernant que l'on n'a pas encore exploité, c'est ses [avis sur Google Maps](https://www.google.com/maps/contrib/101301989685559340667/reviews/@47.9011262,1.9009994,406m/data=!3m1!1e3!4m3!8m2!3m1!1e1?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D).
![[LAF_C2_A4_T_1.png]]
Et on a de la chance, car il explique, dans un commentaire adressé à un magasin de jeux, qu'il habite juste à côté.
![[LAF_C2_A4_T_2.png]]
Et la porte à côté, c'est le **==12 Rue des Carmes==**, à **==Orléans==**.

---
## Panthera

### Énoncé
>![[LAF_C2_A4_HM.png]]
>Vous décidez de commencer par la branche Panthera :
>![[LAF_C2_A4_P_Q.png]]
>>Les pseudos attendus sont ceux utilisés sur le canal de communication de l'organisation, sans les numéros ajoutés automatiquement par l'application utilisée, et qui sont présents sur les profils des membres

### RETEX
Pour ce challenge, on a déjà toutes les informations qu'il nous faut sur l'avocat.
- Pseudo : **==Tigris==**
- Prénom Nom : **==James Artaux==**
- XXX avenue bidule : **==89 rue de la Plance==**
- Ville : **==Baccon==**

Pour le comptable aussi :
- Pseudo : **==Leo==**
- Prénom Nom : **==Yves Poulain==**
- Ville : **==Bou==**

Pour la ville, je ne l'avais pas mentionnée dans les précédents challenges, mais elle était explicitée dans la description de son compte Facebook.
![[LAF_C2_A4_P_1.png]]

Pour la personne en charge des relations clients et fournisseurs, là, il y a quelques recherches à faire.
Via les informations déjà acquises, on connaît son identité :
- Pseudo : **==Uncia==**
- Prénom Nom : **==Marisa Giraud==**
Mais on n'a pas encore son lieu de résidence.
![[LAF_C2_A4_P_2.png]]
On peut trouver sur Keybase une conversation où Uncia explique avoir passé la semaine à galérer à repeindre son portail et ses volets, surtout à cause d'une masse de lierre, et elle affirme les peindre en **==bleu==**.

On a donc un indice visuel supplémentaire, mais qui ne nous avance pas beaucoup plus.
On avait trouvé un peu plus tôt son compte Strava, et puisqu'elle y enregistre régulièrement des courses, on peut exporter toutes ses courses et voir si elles se terminent ou commencent souvent dans la même zone.
![[LAF_C2_A4_P_3.png]]

Toutes les courses commencent ou finissent dans l'encadré rouge.
À partir de maintenant, il suffit de se déplacer sur Street View dans cette zone pour trouver une maison qui correspond à nos critères.
![[LAF_C2_A4_P_4.png]]
Finalement, on peut trouver au **==23 rue Kléber==** à **==Fleury-les-Aubrais==**, [une maison](https://www.google.com/maps/@47.9232338,1.9098282,3a,64.3y,322.16h,103.15t/data=!3m7!1e1!3m5!1swZ9Hzg_ZpGyj7nXvgBWhBA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-13.151644646834654%26panoid%3DwZ9Hzg_ZpGyj7nXvgBWhBA%26yaw%3D322.16190395363566!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D) avec une grosse masse de lierre, des volets et un portail bleus, ainsi qu'une porte bleue.

D'ailleurs, petite astuce : pour s'assurer du numéro d'une maison, la vue OSM peut être intéressante :
![[LAF_C2_A4_P_B.png]]

---
## Scorpiox

### Énoncé
>![[LAF_C2_A4_HM.png]]
>Vous décidez de commencer par la branche Scorpiox :
>![[LAF_C2_A4_S_Q.png]]
>>Les pseudos attendus sont ceux utilisés sur le canal de communication de l'organisation, sans les numéros ajoutés automatiquement par l'application utilisée, et qui sont présents sur les profils des membres

### RETEX
À partir du graphe, on peut déjà affirmer :
- Pseudo : **==Julietteae==**
- Prénom Nom : **==Emma Poirier==**
- Pseudo : **==Morelos==**
- Prénom Nom : **==Hubert Lemaître==**
- XXX avenue bidule : **==16 rue Jacqueline Domergue==** (via XQJM+H27 Boulay-les-Barres en description du [compte X de Morelos](https://x.com/MorelHunt25591))
- Ville : **==Boulay-les-Barres==**
- Pseudo : **==Martinezi==**
- Prénom Nom : **==Edouard Pasquier==**
- Ville : **==Tours==**

On a quand même passé du temps sur ce challenge : lors d'un précédent, on avait sauté une étape et raté la liste X du compte X d'Emma Poirier.
Le support nous a donc demandé de refaire le challenge "Les Traces de l'Ours", mais étant donné que nous ne connaissions pas l'existence de ce système de liste, on a fini par demander un hint.

---
## La nuit de la panthère

### Énoncé
>Vous pensez avoir fait le tour de ce que vous pouvez trouver sur cette organisation. Il est temps de remettre de l'ordre dans vos informations. Vous informez donc en premier votre allié dans cette enquête de l'événement qui doit avoir lieu très bientôt :
>![[LAF_C2_A4_NP_P.png]]
>>Les dates sont à renseigner au format dd/mm/yyyy

### RETEX
On peut déjà affirmer ces infos via le graphe :
- type d'évènement : vente aux enchères
- Nom de Code : Bellerophon

On peut trouver la date de l'évènement sur le calendrier Google de Maximus :
![[LAF_C2_A3_O_TT_CGG.png]]
- Date : 06/07/2026
- Lieu-dit : Villarçay
- Ville : Averdon
- type d'endroit : boîte aux lettres mortes
- technique d'indication : fléché allemand

Pour ce qui est du nombre d'animaux destinés à la vente lors de cette soirée, on peut le connaître grâce au fichier nommé `liste_animaux_complete.csv` sur le Drive Proton.
![[LAF_C2_A4_NP_1.png]]
En additionnant le nombre d'individus par espèce contenant le tag Bellerophon, on trouve le nombre : **==56==**.

On peut ensuite compléter cette liste via le carrousel du .onion, qui contient le prix des individus.
![[LAF_C2_A3_C_LDA_O.png]]
Le carrousel ne contient que 10 animaux, et ne propose donc que 10 prix, mais son contenu change à chaque rafraîchissement de page. Une autre technique consiste à modifier la limite d'animaux sur la requête faite par le site à l'API.

Attention, le fichier Excel fait foi, donc même si un individu est noté comme réservé sur le .onion, on le considère quand même comme faisant partie de ceux destinés à la vente.
![[LAF_C2_A4_NP_2.png]]
On arrive donc à la somme de **==407 100==**€ après avoir réalisé le calcul démontré sur la capture d'écran.

---
## Synthèse de nos éléments
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.

![[LAF_C2_A4.svg]]