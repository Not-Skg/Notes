---
tags:
  - Osint
  - Chall
  - CaseBandit
draft: false
---
## Éléments déjà découverts
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.
>Voici le graphique issu de la dernière partie : [[Chapitre 2 - Acte 3 - Communication]]

![[LAF_C2_A3_C.svg]]

Nous allons pouvoir nous appuyer dessus pour poursuivre nos recherches dans la suite du CTF.

## La Toile du Tisserin

### Énoncé
>_📳 Bling 📳_
>![[LAF_C2_A3_O_TT_P.png]]
>
>En effet, il est probable que le groupe possède un stockage en ligne qu'il utilise afin de conserver ses documents les plus importants. Et vu leur organisation, vous êtes persuadé qu'ils auront un mot de passe pour accéder à celui-ci.
>
>>Quel est le mot de passe pour accéder à cet espace ?  
>
>_Format : `MotDePasseDur`

### RETEX
Pour rappel, on avait trouvé dans la dernière partie un groupe public nommé « lameuterouge » sur Keybase, et sur ce groupe, on avait trouvé plein d’informations sur leurs membres via les documents disponibles dans les dossiers partagés publics de Lycaon, la cheffe du groupe.
![[LAF_C2_A3_C_LDA_EKB.png]]
De plus, dans les dossiers partagés publics d’un certain Maximus, on avait trouvé un txt qui donnait le lien d’un drive Proton.
![[LAF_C2_A3_O_TT_DP.png]]
Mais malheureusement, ce drive est protégé par un mot de passe, il faut donc continuer nos recherches.
![[LAF_C2_A3_O_TT_KBC.png]]
On ne trouve qu’une seule mention du drive dans les conversations enregistrées sur Keybase : lorsque Virgata et Uncia demandent à Maximus le mot de passe du drive, il répond qu’il va imprimer quelque chose pour les aider... 
Ça ne nous donne pas beaucoup d’indices non plus, donc on va devoir changer de méthode. 
Après avoir cherché partout sur Keybase et tenté de pivoter sur le nom d’utilisateur Maximus en vain, on change une dernière fois de méthode : on va analyser le .onion pour voir si on n’a pas loupé un pivot quelque part. 

Dans la page « Contact », on a la possibilité de remplir un formulaire de satisfaction.
![[LAF_C2_A3_O_TT_OFS.png]]
C’est un Framaform classique.
![[LAF_C2_A3_O_TT_FF.png]]
On a même la possibilité de contacter l’auteur du formulaire via le bouton en bas à droite.
![[LAF_C2_A3_O_TT_CFF.png]]
Et l’adresse de contact est `tuskontheroad@tacosint.fr`
Un outil comme Epieos nous permet de rattacher ce mail à un compte Google.
![[LAF_C2_A3_O_TT_GG.png]]
On obtient donc le [calendrier Google](https://calendar.google.com/calendar/u/0/embed?src=tuskontheroad@tacosint.fr) de Maximus et [ses avis sur google maps](https://www.google.com/maps/contrib/101301989685559340667/reviews/@47.9016089,1.8986838,2873m/data=!3m2!1e3!4b1!4m3!8m2!3m1!1e1?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D).
![[LAF_C2_A3_O_TT_CGG.png]]
On obtient donc quelques infos sympas, mais rien qui nous permette d’aller plus loin que ce que l’on a déjà. Cela nous sert quand même à valider que le compte Google appartient bien à Maximus, puisque l’identité du compte est référencée comme Jean Charpentier, comme sur la fiche RH.

Par contre, on n’a pas encore pivoté sur ce qui compose l’adresse mail, à savoir `tuskontheroad`.
![[LAF_C2_A3_O_TT_WMN.png]]
Un outil comme WhatsMyName nous permet de trouver un avis Google déjà repéré via Epieos, ainsi qu’un [post reddit](https://www.reddit.com/r/3Dprinting/comments/1u1v09x/3d_viewer/?solution=cb48703fa4805c2ecb48703fa4805c2e&js_challenge=1&token=7afd7253fec22262ff1c52b1703fe9ec70f898469f934821b3a3ec4855b91bc9&jsc_orig_r=&tl=fr) d’un compte nommé tuskontheroad.
![[LAF_C2_A3_O_TT_PR.png]]
Le post porte sur un logiciel 3D à utiliser avec une imprimante 3D. Cela nous rappelle qu’il avait dit qu’il allait « imprimer quelque chose » : on est donc peut-être sur la bonne piste.
![[LAF_C2_A3_O_CR.png]]
[Sur son compte](https://www.reddit.com/user/tuskontheroad/), il poste deux fois au sujet de ses créations de modèles 3D, et il dit même publier sur Thingiverse.
Sur l’une des captures d’écran qu’il partage, on peut même trouver la licence qu’il utilise pour partager ses créations : CC BY-NC, ainsi que le tag lié au fichier : `Low Poly Animal`, et le nom du fichier : `perroquet.stl`. Cela nous permet donc de lancer [une recherche filtrée](https://www.thingiverse.com/search?page=1&type=things&q=Low+Poly+Animal+perroquet&license=cc-nc) sur Thingiverse.
![[LAF_C2_A3_O_TT_T.png]]
Cela nous permet de trouver [le fichier qu'il a partagé](https://www.thingiverse.com/thing:7357453), ainsi que son [compte sur la plateforme](https://www.thingiverse.com/MaximusJC3D/designs), sous le pseudo `MaximusJC3D`.

Sur son compte, un fichier a été partagé le 2 mai 2026, donc le jour où il a dit qu’il allait imprimer quelque chose. En utilisant la fonction 3D, on peut visualiser le modèle d’éléphant qui compose le fichier.
![[LAF_C2_A3_O_TT_PE.png]]
Et sous ce modèle, on peut trouver la chaîne de caractères **==MeuteRouge4EVER==**.
![[LAF_C2_A3_O_TT_DPO.png]]
Cela a fortement l’air d’être un mot de passe, et en le testant sur le drive, on peut y entrer : c’est donc le bon mot de passe.

---
## La traque du faucon

### Énoncé
>Bon, ce groupe est vraiment bine organisé, et semble même mener des campagnes à l'étranger. Les informations que vous avez pu obtenir jusqu'à présent semblent indiquer qu'ils ont mené la traque d'un animal bien spécifique en janvier 2025.
>
>>Quel est le prénom de l'animal traqué par le groupe en janvier 2025 ? 
>
>_Format : `Baloo`

### RETEX
Le drive renferme deux fichiers GPX nommés « Traque_Famille_Culpeo_1 » et « Traque_Famille_Culpeo_2 ».
![[LAF_C2_A3_O_TF_DGPX.png]]
Ces fichiers renferment des tracés GPS datant du 26 et du 27 janvier 2025, ce qui correspond parfaitement à l’énoncé puisque [les culpeos](https://fr.wikipedia.org/wiki/Culpeau) sont une famille d’animaux provenant d’Amérique du Sud, donc de l’étranger.
![[LAF_C2_A3_O_TF_WC.png]]
En important les GPX dans CaseBandit, on peut visualiser les deux tracés et se rendre compte qu’ils appartiennent bien à la zone d’habitat de cette famille d’animaux.
![[LAF_C2_A3_O_TF_CB.png]]

Puis nous avons bloqué longtemps sur ce challenge, vraiment longtemps. 
On a essayé plein de méthodes pour trouver le prénom de l’animal traqué : 
- Rechercher sur les sites liés aux lieux proches des tracés (par exemple : réserve naturelle, parc, etc.). 
- Rechercher dans les commentaires des lieux Google un message du type : « On a volé mon... ».
- Rechercher sur Street View s’il n’y avait pas de pancarte du type : « X a disparu, appelez-moi au XXX si vous avez des infos... ». 
- Rechercher par mots-clés sur Google à propos d’un culpeo kidnappé dans la région, et pareil sur les réseaux sociaux.
Mais rien, on ne trouvait strictement rien. 

Puis Global a eu une idée de génie : chercher sur une application de tracking d’animaux, "[Animal Tracker](https://www.animaltracker.app/dashboard)".
![[LAF_C2_A3_O_TF_TA.png]]
Et à l’emplacement des traces GPX, on peut [trouver un animal](https://www.animaltracker.app/map/animals/d54e1887-eb67-4219-b54c-95420a026211) nommé **==Takiri==**, qui a désormais disparu mais qui avait été localisé à cet endroit à la même date que les GPX. 

On vient donc de trouver l’animal qui a été kidnappé par la Meute Rouge, et, par la même occasion, son prénom.

---
## La colère du dragon

### Énoncé
>Voilà donc comment ils procèdent pour obtenir de nouveaux animaux plus exotiques que Malo...
>![[LAF_C2_A3_O_CD_P.png]]
>Vous sentez que ce sujet lui tient vraiment à coeur. Même si vous n'êtes pas autant remonté que lui, cette pratique révoltante doit être stoppée au plus vite !
>Vous décidez donc que vous mènerez à bien votre enquête, pour sauver ces animaux innocents.
>
>>Pour valider le challenge, écrivez le message suivant : `Je vais les stopper`

### RETEX
Le challenge n’en est pas vraiment un : il sert surtout à faire avancer l’histoire et à démontrer l’implication de Péhuson dans cette affaire, et à quel point ça le frustre.

---
## Le radar de la chauve-souris

### Énoncé
>Ce drive est une vraie mine d'informations ! En regardant de plus près, vous pensez pouvoir trouver des informations sur les membres et leurs clients.
>Vous informez votre acolyte de votre trouvaille, et vous vous lancez dans l'exploration du contenu de celle-ci.
>![[LAF_C2_A3_O_RCS.png]]
>
>>Où la rencontre avec un client le 15/06/2025 a-t-elle eu lieu ? 
>
>_Format : `Guadeloupe`

### RETEX
Sur le drive découvert précédemment, il y avait un fichier nommé : appel_Uncia_15-06-2025.wav.
Ce doit être l’asset principal pour ce challenge.
![[appel_Uncia_15-06-2025.wav]]
Ce fichier est un message vocal d’Uncia à destination de Lycaon. Voici le texte que j’arrive à retranscrire :
```
Salut Sylvie ! Pardon Lycaon !

Je viens de rencontrer le nouveau prospect, il a l'air bien intéressé par ce qu'on peut lui proposer.
Financièrement, je ne m'inquiète pas, vu sa villa, on ne devrait avoir aucun problème pour être payés. Je vais quand même en profiter pour faire un petit check pour vérifier qu'il ne nous a pas embobinés.

Au fait, je vais essayer de vous ramener une petite bière artisanale, je sais que ça vous fera plaisir !
Je pense être de retour d'ici 2 ou 3 jours, le temps de faire les dernières vérifs et de rentrer.

Je vous tiens au courant si j'ai quoi que ce soit d'intéressant d'ici là.

Bonne fin de journée cheffe, à plus tard.

[BIP-BIP-BIP]
```
Le message précise bien qu’Uncia revient d’un rendez-vous avec un client et qu’elle ramène des bières artisanales, mais on ne peut rien tirer de plus du contenu, à part qu’on connaît maintenant le prénom de Lycaon : Sylvie. 

Par contre, en bruit de fond, on peut entendre un chant d’oiseau.
![[crop_appel_Uncia_15-06-2025.wav]]

En utilisant un outil comme [birdnet](https://birdnet.cornell.edu/demo/?lang=fr), on peut essayer de reconnaître le chant de l’oiseau.
![[LAF_C2_A3_O_RCS_BD.png]]
L’outil reconnaît l’oiseau « Corsican Nuthatch », aussi appelé « Sitta whiteheadi », la sittelle corse.

On peut vérifier cela en cherchant le chant de cet oiseau sur [oiseaux.net](https://www.oiseaux.net/oiseaux/sittelle.corse.html)
![[LAF_C2_A3_O_RCS_ON.png]]
On y retrouve exactement le même chant, enregistré par Fernand Deroussen.
![[XC134311 - Sittelle corse - Sitta whiteheadi.mp3]]

On est donc sûr de l’espèce de l’oiseau et, d’après oiseaux.net, cette espèce vit exclusivement en **==Corse==**.
Uncia se trouvait donc forcément en Corse le 15/06/2025.

---
## L'énergie du frelon oriental

### Énoncé
>Vous commencez enfin à voir plus clair dans l'organisation du groupe. Après un court échange avec votre acolyte, vous orientez vos recherches sur la personne qui semble chapeauter toute cette organisation.
>![[LAF_C2_A3_O_EFO_P.png]]
>Vous avez déjà pu glaner quelques informations sur celle-ci, mais pour transmettre le cas à votre contact de la police, comme cela a été le cas pour le pet-sitter, il vous manque encore l'information la plus important : 
>
>>Où réside la personne qui est considérée comme chef de l'organisation ? 
>
>_Format : `XX.XXXXXXX, XX.XXXXXXX`

### RETEX
En relisant attentivement les canaux sur Keybase, on peut trouver une conversation dans le canal « Membres uniquement » sur la dégustation de bière artisanale.
![[LAF_C2_A3_O_EFO_GE1.png]]
Lycaon y partage la photo ci-dessous en précisant qu’elle déguste la bière depuis son appartement.
![[LAF_C2_A3_O_EFO_GE2.png]]
Donc, si l’on arrive à localiser le point de vue de cette photo, alors on trouve son appartement.

En utilisant Google Lens sur la cathédrale visible sur la photo, on peut reconnaître la cathédrale Sainte-Croix d’Orléans.
![[LAF_C2_A3_O_EFO_GE3.png]]
En prenant en compte le placement des deux tours de la cathédrale et de la flèche, on peut déjà avoir une idée de l’endroit où la photo a été prise (on regarde vers le nord-est lorsque la cathédrale est devant nous).

En regardant de plus près la photo, on peut voir un bout de toit rond. Ce sera notre point de repère (un toit rond au sud-ouest de la cathédrale).
![[LAF_C2_A3_O_EFO_GE4.png]]
On peut ensuite s’approcher via la vue sur Google Earth en utilisant certains éléments clés de la photo.
![[LAF_C2_A3_O_EFO_GE5.png]]
Enfin, on peut s’assurer de l’emplacement exact via l’angle de la photo et les repères visibles en vue satellite.
![[LAF_C2_A3_O_EFO_GE6.png]]
Lycaon habite donc aux coordonnées : **==47.9000918, 1.9089714==**

---
## Synthèse de nos éléments
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.

![[LAF_C2_A3_O.svg]]
