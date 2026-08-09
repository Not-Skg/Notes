---
tags:
  - Osint
  - LAF
  - Chall
  - casebandit
  - overpassturbo
  - rhinomap
  - geneanet
  - dotdb
order: 17
---
## Éléments déjà découverts
>Parce que ce CTF est très long, je me permets de partager, à la fin de chaque page dédiée, un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.
>Voici le graphique issu de la dernière partie : [[Chapitre 3 - Crime]]

![[LAF_C3_C.svg]]

---
## Chargé comme une mule

> [!challmaker] Eldwiin
### Énoncé
>_📳 Bling 📳_
>Il semblerait que votre nouvelle amie policière ait vraiment besoin de vous sur cette affaire. Vous recevez un nouveau message avec une nouvelle piste :
>![[LAF_C3_P_CM_1.png]]
>Ainsi, l'identité de Péhuson est Guillaume Calidur. Bon, vous voilà avec un nouveau fil à tirer !
>
>> Où a-t-il travaillé pour son dernier poste ?
>
>_Format : `Le Monde_Bâtiment de Aulnay-Sous-Bois`_

### RETEX
![[LAF_C3_P_CM_2.png]]
En recherchant "Guillaume Calidur" sur Google, on trouve très rapidement un [compte LinkedIn](https://www.linkedin.com/in/guillaume-calidur-29b3313b8/).
![[LAF_C3_P_CM_3.png]]
Ce compte possède une photo de profil avec la même veste que sur la caméra de surveillance.
![[LAF_C3_P_CM_4.png]]
Et dans le CV présent sur ce compte, on apprend que Guillaume Calidur est un enquêteur OSINT spécialisé dans la protection animale, et son compte précisait qu'il était basé à Orléans. C'est donc bien Péhuson.

Et on peut voir que son dernier post était un post d'enquêteur à **==La SPA_Refuge de Chilleurs-Aux-Bois==**.

---
## La protection de la tortue

> [!challmaker] Eldwiin
### Énoncé
>Vous en apprenez un peu plus sur la personne qui vous a aidé tout au long de votre enquête. Jusque-là, rien d'anormal, vous voilà rassuré. Vous décidez de creuser encore un petit peu, juste pour être sûr.
>
>>Péhuson a participé à une opération en janvier 2025, quel est le nom de cette opération ?
>
>_Format : `Ambroisie`_

### RETEX
D'après son CV, de 2021 à 2025, Guillaume Calidur travaillait en tant que bénévole dans l'association : Les Soulèvements de Gaïa.
![[LAF_C3_P_PT_1.png]]
Et d'après son unique post sur LinkedIn, ça lui avait vraiment tenu à cœur, et il précise que même si l'association n'existe plus, le site existe encore. Essayons de le trouver.
Après de longues tentatives manuelles infructueuses, on a fini par demander à une IA, qui nous a donné le site en question : https://lessoulevementsdegaia.xyz
![[LAF_C3_P_PT_2.png]]

Mais grâce au WU des TACOSINT, je viens d'apprendre que la façon propre de le faire est d'utiliser l'outil [dotdb](https://dotdb.com/search?keyword=soulevement&position=any), un outil de recherche de nom de domaine par mots-clés.
![[LAF_C3_P_PT_3.png]]
Ainsi, en cherchant le mot-clé « soulèvement », on pouvait trouver facilement le site.

Avant même de regarder qui compose cette association, l'onglet « Projet Savior » nous intrigue : il est autant mis en avant que l'accueil, les membres ou même l'onglet Actions, ça doit donc être très important.
![[LAF_C3_P_PT_4.png]]
Sur cet onglet, on apprend que c'est un projet qui a pour objectif de concevoir un outil capable d’identifier et d’anticiper les zones sensibles de passage des animaux, afin de prévenir plus efficacement les activités de braconnage.

En décembre 2024, ils annoncent lancer le mois suivant l'opération de terrain **==Ahosu==**, et pour cette opération, le but est de suivre des Culpeos (ce qui nous rappelle étrangement le Culpéo enlevé quelques challenges plus tôt par la meute rouge).

En février 2025, Guillaume laisse un message sur le site : 
```
Nous avons le regret d’annoncer l’arrêt du projet Savior. L’Opération Ahosu, qui s’est déroulée le mois dernier, ne s’est pas déroulée comme prévu ; vous en avez probablement entendu parler, et nous ne nous étalerons pas sur le sujet tant que nous n’aurons pas les éléments nous permettant de dévoiler la vérité. Un élément extérieur a fait échouer l’Opération à tel point que des animaux en ont subi les conséquences.

Je continuerais de me battre dans l’ombre, ils le paieront.

Guillaume
```

On y apprend donc que l'opération a échoué à cause d'un élément extérieur, et Guillaume est remonté à bloc, puisque des animaux en ont subi les conséquences de cet échec.
(Peut-être est-ce vraiment lié à la meute rouge.)

---
## La taupe

### Énoncé
>Tout commence à faire sens... Ainsi, un membre de la meute rouge s'était infiltré au sein des soulèvements de Gaïa, ce qui leur a permis de mettre en place l'enlèvement de la famille de Takiri, un culpeo, en janvier 2025 afin de le revendre par la suite.
>
>Cet enlèvement a fait échouer l'opération Ahosu de l'association, ce qui a réduit la confiance que leurs partenaires avaient en eux, et a fini par entraîner la chute de l'association.
>
>Le président de cette association, Guillaume Calidur, en découvrant que les kidnappeurs de Malo étaient aussi derrière la fin de son association et la séparation entre le culpeo et sa famille, n'a pas pu se contenir et a décidé de prendre la justice entre ses mains.
>
>Il a donc attaqué le lieu de leur prochaine soirée, à Villarçay, où tous les membres étaient présents. En empoisonnant l'eau avec du Zolpidem, il a réussi à exécuter les 10 membres avec son Five-seven qu'il s'est procuré auprès de Viktor Zakarof.
>
>>Mais quelle est la véritable identité de cette taupe ?
>
>_Format : `Kim Philby`_

### RETEX
Bon, il est temps d'analyser les membres de l'association.
![[LAF_C3_P_LT_1.png]]
On peut trouver sur l'onglet « Membres » le prénom de tous ceux qui la composent, avec une photo et une petite description.
![[LAF_C3_P_LT_2.png]]
D'ailleurs, une personne nous intrigue, « Maxime » : déjà, c'est le seul à avoir son prénom et son nom indiqués dans le nom de fichier de sa photo, et en plus son prénom et sa fonction (Logisticien) nous font penser à la meute rouge.
D'ailleurs, on y découvre que les photos de cette page sont hébergées sur un sous-domaine : https://pehuson.lessoulevementsdegaia.xyz

En mettant côte à côte les photos de profil des deux hommes, on s'aperçoit que c'est en fait la même personne.
![[LAF_C3_P_LT_3.png]]
Maxime Dubois est donc un alias de Maximus, aka **==Jean Charpentier==** : c'était donc la taupe infiltrée dans l'association, et c'est grâce à lui que la meute rouge a su où et quand chercher le culpeo.
D'ailleurs, sur le sous-domaine, on peut trouver un fichier nommé Takiri.png qui présente le profil Animaltracker de l'animal enlevé par la meute rouge.
![[LAF_C3_P_LT_4.png]]

On peut aussi trouver sur le sous-domaine une ordonnance pour du Stilnox.
![[LAF_C3_P_LT_5.png]]

Et un article d'un journal d'investigation sur l'opération Ahosu qui nous en apprend un peu plus sur ce qu'il s'est passé :

![[scandale-au-cœur-de-l’equateur-l’opération-ahosu-et-les-ombres-des-soulèvements-de-gaïa.pdf]]
Des braconniers ont bien enlevé la famille de Takiri (les culpéos), mais étant donné que seule l'association connaissait leur emplacement, les soupçons se sont portés sur elle, et tous ses partenaires (SPA, Les Animaux Avant Tout, et même les aides du ministère de l'Intérieur) ont coupé les ponts (les mails qui en parlent sont disponibles sur le sous-domaine).
Et les donateurs ont gelé leurs financements, ce qui explique pourquoi l'association n'existe plus.
![[LAF_C3_P_LT_6.png]]
Aussi, on peut y trouver un poster de l'organisation de la meute rouge, ce qui prouve que Guillaume enquêtait sur eux depuis un certain temps.

---
## Hors de la Tanière

> [!challmaker] Eldwiin
### Énoncé
>Vous informez votre contact de la police des doutes qui se sont inscrits dans votre esprit au fur et à mesure de votre enquête. Vous soupçonnez fortement Péhuson d'avoir un lien avec cette affaire sordide et en informez la Policière en charge de l'affaire :
>![[LAF_C3_P_HT_1.png]]
>La policière vous appelle et vous lui expliquez ce que vous avez trouvé, et vos doutes. Elle vous indique qu'à l'aide de l'identification précédente, il y a une adresse de facturation, et qu'elle va se rendre sur place tout de suite.
>Vous patientez ce qui vous semble être une éternité, impossible de vous reposer. Vous vous demandez sans cesse comment vous avez bien pu être dans ce pétrin, tout en estimant que ce genre d'expérience est vraiment incroyable et que vous vous sentez vraiment utile.
>
>_📳 Bling 📳_
>![[LAF_C3_P_HT_2.png]]
>Quelques instants plus tard, vous recevez les photos et la chanson évoquées par la policière dans son message.
>![[hors_taniere_image_1.jpg]]
>![[hors_de_la_taniere_image_2.jpg]]
>![[hors_de_la_taniere_image_3.jpg]]
>![[Les Cendres de Gaia.mp3]]
>>Où est parti se réfugier Péhuson ?
>
>_Format : `XX.XXXXXXX, XX.XXXXXXX`_

### RETEX
La musique est vraiment sympa, mais elle ne nous aide en rien dans notre enquête : elle sert juste de manifeste pour Péhuson et tente d'expliquer ses actes.

On peut voir sur ses tableaux en liège que Guillaume a réussi à retracer l'identité de toute la meute rouge (probablement grâce aux informations qu'on lui a partagées). Mais à la base, il avait quand même des doutes sur Isabelle et Maxime : comme quoi il avait une bonne intuition.
D'ailleurs, on peut noter que sur sa liste de courses, il ne prend que des aliments vegan, ce qui est un souci de détail dans la cohérence de l'histoire que j'apprécie énormément.
![[LAF_C3_P_HT_3.png]]
Mais ce qui nous intéresse le plus, c'est qu'avant de partir de chez lui, il a recherché la planque idéale et n'a pas pris le temps d'effacer les post-it de ses recherches.

Ce qui nous permet donc de comprendre ce qui suit : 
1. Péhuson veut rester proche de sa mère et la contacte tous les deux jours parce qu'elle est malade.
2. Pour lui, la planque idéale doit être : 
		- Un bâtiment inhabité, avec possibilité de voiture (pour rester discret)
		- À moins de 20 km d'un aéroport (pour pouvoir fuir rapidement)
		- À moins de 8 km de sa mère (qui est malade)
		- À moins de 50 m d'une pharmacie (probablement pour sa mère) 
		- À moins de 200 m d'une crèche
		- À moins de 200 m des « flics » (pour rester discret)

Globalement, on a tout ce qu'il nous faut pour le retrouver, sauf l'adresse de sa mère, qui nous permettrait de réduire grandement la zone de recherche.

Après de longues recherches infructueuses, on en a conclu que sa mère n'avait pas de compte sur les réseaux sociaux ; il faut donc chercher autrement.

On s'est dit qu'elle était peut-être présente sur des sites d'arbres généalogiques.
![[LAF_C3_P_HT_4.png]]
En recherchant Guillaume Calidur sur [Geneanet](https://gw.geneanet.org/jucalidur?lang=fr&n=calidur&p=guillaume), on peut trouver une fiche à son nom, et la date de naissance coïncide avec celle de l'ordonnance : c'est donc bien Péhuson.
![[LAF_C3_P_HT_5.png]]
Et sa mère y a aussi une fiche, encore plus exhaustive puisqu'elle précise sa résidence : « Marigny-les-Usages, 45197, Loiret, Centre-Val de Loire, France ».
![[LAF_C3_P_HT_6.png]]
On remerciera donc la sœur de Guillaume, qui a renseigné toute sa famille sur ce site et a même précisé l'adresse de leur mère...

On peut donc commencer nos recherches. Par souci de lisibilité, je vais utiliser deux outils, Rhinomap et Overpass Turbo, mais normalement, Overpass Turbo suffit pour réussir ce challenge.

Première méthode : je n'utilise Overpass Turbo que pour extraire les points d'intérêt, puis je les ajoute dans Rhinomap. J'ai utilisé cette méthode parce que je ne connaissais pas le tag OSM "building", et j'avais donc peur de n'obtenir que des tags trop larges pour cibler un bâtiment abandonné.

On peut commencer par tracer un cercle de 8 km autour de l'adresse de la mère de Péhuson.
Puis importer les aéroports à moins de 20 km (compris dans ce cercle).
![[LAF_C3_P_HT_7.png]]

Puis on peut ajouter les postes de police et les crèches, en mettant à chaque fois des cercles de tailles adéquates.

![[LAF_C3_P_HT_8.png]]
Et pour finir, on cherche les endroits qui coïncident.
![[LAF_C3_P_HT_9.png]]
Avec cette méthode, j'ai trouvé les coordonnées : **==47.93678274973762, 1.911696195602417==**
![[LAF_C3_P_HT_10.png]]
Les coordonnées renvoient vers un bâtiment un peu caché, qui permettrait d'y laisser une voiture au cas où, comme le voulait Péhuson.
On en a discuté avec le support : ce n'était pas le lieu prévu, mais ça fonctionne quand même.

Le problème vient du fait que, selon qu'on place nos centres de cercle sur un bout d'un immeuble, au milieu ou sur un autre bout, le résultat change, puisque les distances diffèrent.

L'autre problème, ce sont les différences entre nos requêtes (qui utilisaient certains tags) et celles prévues par les challmakers, qui utilisaient des tags moins courants : building=kindergarten au lieu de amenity=kindergarten ou amenity=childcare, ou encore aeroway=runway, qui recherche les pistes et non les aéroports, là où nous avions cherché aeroway=aerodrome.
On a donc pu récupérer des points d'intérêt qu'ils n'avaient pas, et inversement.

Donc, si l'on reste uniquement sur Overpass Turbo avec les mêmes tags qu'eux, on trouve le lieu suivant : **==47.9300060309747, 1.922275588959997==**
![[LAF_C3_P_HT_11.png]]

Via la requête : 
```json
// On récupère les avions
nwr[aeroway=runway]({{bbox}})->.avion;

//On récupère Marigny
nwr[name="Marigny-les-Usages"]({{bbox}})->.marigny;

//On récupère les postes de police
nwr[amenity=police]({{bbox}})->.police;

// On récupère les bâtiments
nwr[building]({{bbox}})->.house;
nwr[building=kindergarten]({{bbox}})->.enfants;

// On récupère les pharmacies
nwr[amenity=pharmacy]({{bbox}})->.pharmacie;


//On garde les bâtiments aux bonnes distances de tout ça :
nwr.house(around.enfants:200)->.houseKids;
nwr.houseKids(around.police:200)->.housePolice;
nwr.housePolice(around.pharmacie:50)->.housePharma;
nwr.housePharma(around.marigny:8000)->.houseMarigny;
nwr.houseMarigny(around.avion:20000);

/*added by auto repair*/
(._;>;);
/*end of auto repair*/
out;
```

---

> [!challmaker] Eldwiin
# Fin
>Vous venez tout juste d'appuyer sur envoyer pour transmettre à la police la localisation de la planque parfaite selon Péhuson. Celle-ci vous remercie et part directement en direction de la planque qui, fort heureusement, n'est pas si loin.
>
>Les minutes d'attente sont insoutenables. Et si vous vous étiez trompé et que Péhuson était innocent ?
>
>Non, tout concorde trop pour qu'il ne soit pas à l'origine de ce drame. Vous n'en revenez toujours pas qu'il puisse être à l'origine d'un massacre comme ça. D'autant plus que s'il a pu réaliser ce massacre, c'est grâce aux informations que vous lui avez si gentiment communiquées. Mais vous ne pouviez pas savoir qui il était vraiment.
>
>Et quand on lit ce qu'il a écrit sur son site, et que l'on sait qui sont les victimes, on pourrait presque le comprendre. Mais ce n'est pas comme ça que la justice fonctionne en France, et vous êtes fiers d'avoir aidé la police à faire son travail et résoudre ce crime.
>
>Vous profitez de ce train de pensées pour préparer un dossier avec tous les éléments que vous avez recueillis, que ce soit à l'encontre de Péhuson, mais aussi de la Meute Rouge afin de le fournir aux autorités.
>
>En parlant d'autorités : _📳 Bling 📳_
>![[LAF_C3_P_F_1.png]]
>Cette dernière vous transmet même une image exclusive concluant votre enquête : 
>![[LAF_C3_P_F_2.png]]
>Vous fermez votre ordinateur, les doigts encore tremblants. Le silence qui suit est étrange, presque trop calme après des jours de tension.  
>Vous vous levez, étirez vos membres endoloris par des heures passées devant l'écran, et regardez par la fenêtre. Dehors, la ville s'agite, indifférente à ce que vous venez d'accomplir.  
>Vous repensez à tous ces indices, ces nuits blanches, ces doutes. Vous avez tenu bon. Vous avez suivi la piste jusqu'au bout, sans vous laisser décourager. Et maintenant, c'est terminé. L'enquête est bouclée, le coupable est sous les verrous, et vous, vous pouvez enfin souffler.  
>Vous vous allongez sur votre canapé, le corps lourd mais l'esprit léger. La satisfaction d'un travail accompli vous envahit.
> 
>Mission accomplie.
> 
>>Pour valider ce challenge et clore votre enquête, écrivez le message suivant : cette fois c'est vraiment la fin
> 
>Et pour fêter ça, vous vous écoutez une dernière musique avant un repos bien mérité :
>![[La forêt se tait.mp3]]

Bon, bah c'est vraiment la fin de ce CTF cette fois-ci, je crois bien que c'est le CTF le plus long auquel j'ai participé jusqu'à présent. Encore un grand merci à l'équipe des TACOSINT pour ce CTF.

Pour finir ça proprement, voici une synthèse de tous les éléments récoltés depuis le début, et un petit résumé explicatif du déroulé de l'histoire de ce CTF.
## Synthèse de nos éléments
>Parce que ce CTF était vraiment très long, je me permets de partager ici le graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble des éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices de ce CTF.
>A partir de maintenant, on ne le modifiera plus.

![[LAF_C3_P.svg]]

# Résumé synthétique du lore de ce CTF
Tout commence le vendredi 3 juillet 2026 à Orléans : notre voisine, Renée Michelle, se fait « voler » son chat Malo pendant qu'elle fait ses courses. En creusant sur elle et sa famille (son fils Jean Michelle Jr, sa belle-fille Lucia née Karlson, ses petites-filles Sarah et Martine), on comprend vite qu'aucun d'eux n'est impliqué : ils sont tous ailleurs ce week-end-là.

La vraie piste, c'est le pet-sitter de Renée, Joseph Delamarre, étudiant précaire payé pour transmettre l'adresse de Malo à un certain « Virgata », en réalité Steven Pichon, un « chasseur » d'animaux de compagnie basé à Limoges.

Steven nous mène à into-tacs.shop, une fausse entreprise de dressage canin qui sert de couverture à trois autres membres : Emma Poirier (Julietteae), Hubert Lemaître (Morelos) et Édouard Pasquier (Martinezi), ainsi qu'à leur avocat complaisant, James Artaux (Tigris), à Baccon. Le développeur des deux sites, Dave Renault (Huhul), a mis en place les pages cachées, mais c'est en fouillant les profils de Morelos et Martinezi qu'on trouve l'URL cachée et le mot de passe qui donnent accès au site .onion de l'organisation.

Ce site .onion révèle l'ampleur réelle de l'affaire : la Meute Rouge, une organisation structurée de trafic d'animaux (sauvages et domestiques), dirigée par Sylvie Durand (Lycaon) et organisée en quatre divisions (Noctua, Tusko, Panthera, Scorpiox). On reconstitue tout leur fonctionnement : financement en cryptomonnaie géré par Yves Poulain (Leo), rapatriement d'animaux depuis l'Algérie par cargo puis par la route jusqu'en France, communication par boîte aux lettres morte gérée par Marisa Giraud (Uncia), et une grosse vente aux enchères prévue le 6 juillet 2026 à Villarçay, pour environ 407 100 € d'animaux.

En parallèle, un enquêteur privé indépendant, Péhuson, nous aide bénévolement tout au long de l'enquête, aussi déterminé que nous à faire tomber ce trafic. On transmet toutes nos informations à la police, censée intervenir à la soirée du 6 juillet.

Mais le lendemain, coup de théâtre : tous les membres de la Meute Rouge présents à la soirée sont retrouvés morts, empoisonnés au Zolpidem puis exécutés au Five-seven. Et Péhuson, qui répondait habituellement en quelques minutes, ne donne plus signe de vie.

L'enquête sur le tueur nous ramène droit à lui : sous ce pseudonyme se cache Guillaume Calidur, ancien enquêteur OSINT bénévole des Soulèvements de Gaïa, une association de protection animale. En janvier 2025, leur opération de terrain Ahosu (protection des culpéos) a échoué à cause d'une taupe infiltrée par la Meute Rouge (Jean Charpentier, aka Maximus), qui a permis l'enlèvement de la famille de Takiri, un culpeo, ce qui a provoqué la chute de l'association par perte de financements et de partenaires. Rongé par la culpabilité et la rage, Guillaume a mené sa propre enquête sur ses anciens ennemis, s'est procuré un Five-seven auprès de Viktor Zakarof, et a exécuté les dix membres présents à la soirée de Villarçay avec l'eau empoisonnée au Zolpidem.

Ironie amère : c'est en partie grâce aux informations qu'on lui a nous-mêmes fournies, croyant collaborer avec un allié, que « Péhuson » a pu mener sa vengeance à bien. On finit par le localiser, retranché dans une planque choisie selon des critères très précis (proche de sa mère malade, d'un aéroport, d'une pharmacie, mais loin des regards), grâce à des recherches généalogiques et une analyse géospatiale sur Overpass Turbo. La police l'interpelle, et l'enquête se referme sur un dossier remis aux autorités concernant à la fois Guillaume Calidur et les restes de la Meute Rouge.