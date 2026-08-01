---
tags:
  - Osint
  - googlelens
  - whatsmyname
  - sherlock
  - LAF
  - Chall
  - casebandit
  - overpassturbo
order: 4
---
>[!info] Information
>Tous les challenges ci-dessous, sont censé être des challenges bonus et donc comporter `[BONUS]` dans leur titre, mais je le met pas par soucis de lisibilité.
## Éléments déjà découverts
> Parce que ce CTF est très long, je me permets de partager à chaque fin de page dédiée un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l’ensemble de nos éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.
> Voici le graphique résultant de la dernière partie : [[Chapitre 1 - Introduction]]

![[LAF_C1_I.svg]]

 Nous allons pouvoir nous baser sur ce dernier pour continuer nos recherches dans la suite du CTF.

---
## La coquetterie du paon

### Énoncé
>Vous continuez de vous renseigner sur le cercle proche de Renée. Sa petite fille, Sarah, semble à l'aise avec les réseaux sociaux. C'est en effet elle qui a communiqué le contact d'un pet-sitter à sa grand-mère.
>En approfondissant vos recherches sur elle, vous trouverez peut-être de nouvelles pistes.
>
>>Quel autre pseudo Sarah utilise-t-elle ?
>
>_Format : `PommeDeTerre45`_

### RETEX
Pour rappel, nous avions trouvé précédemment [le compte Facebook](https://www.facebook.com/michelle.sarah2003) de Sarah Michelle. 
Si l'on regarde l'URL de ce compte Facebook : `https://www.facebook.com/michelle.sarah2003`, on peut s'apercevoir qu'elle a été personnalisée contrairement à celle de Lucia Michelle par exemple : `https://www.facebook.com/profile.php?id=61577432904055`.
On a donc accès à un premier nom d'utilisateur lié à Sarah : `michelle.sarah2003`. 

On peut donc utiliser un outil comme Sherlock pour essayer de pivoter à partir de ce nom d’utilisateur.
![[LAF_C1_LFM_CP_UN.png]]
Parmi les résultats de Sherlock, on peut trouver un [compte Instagram](https://instagram.com/michelle.sarah2003).
![[LAF_C1_LFM_CP_CI.png]]
On peut y retrouver Sarah en photo de profil, avec “Sarah Michelle” et la même citation de Simone de Beauvoir en description que sur son compte Facebook : « Se vouloir libre, c’est aussi vouloir les autres libres ».
On est donc bien sûr d’être sur un compte de Sarah Michelle, la petite-fille de notre voisine.
On peut aussi trouver en description la ligne : "AKA : @UnderTheVeil03 😊"
_Au cas où, “AKA” signifie : “Also Known As”._
Donc, en plus d'avoir trouvé son compte Instagram, nous venons de trouver son pseudo sur d'autres réseaux : **==UnderTheVeil03==**.

---
## La générosité d'une Girafe

### Énoncé
>Et voilà, un nouveau pseudo pour Sarah. Vous avez de plus en plus d'informations sur elle, mais vous n'en savez pas beaucoup plus sur la disparition de Malo...
>Peut-être que Sarah pourrait vous aider à avancer dans votre enquête ? Mais pour cela il faudrait savoir si elle est disponible et dans le coin.
>
>>Dans quelle ville se trouve Sarah en ce moment ? 
>
>_Format : `Paris`

### RETEX
Étant donné que nous avons trouvé deux pseudos utilisés par Sarah lors du dernier challenge, nous allons commencer par cartographier sa présence sur les réseaux.

En croisant les résultats de Sherlock, Maigret et Whatsmyname sur le pseudo `michelle.sarah2003`, on ne trouve rien de plus.
Par contre, en ciblant `UnderTheVeil03` via ces outils, on peut trouver quelques sources intéressantes.
![[LAF_C1_LFM_GG_WMN.png]]
- Un [compte X](https://x.com/UnderTheVeil03)
- Un [lien Mastodon API](https://mastodon.social/api/v2/search?q=UnderTheVeil03&type=accounts)

Pour le premier point, on retrouve Sarah en photo de profil, on est donc sûr que le compte appartient à la bonne personne.
![[LAF_C1_LFM_GG_XA.png]]
Pour le deuxième, cela nous renvoie vers une ligne un peu indigeste à l’œil, on va donc passer en CLI pour réarranger un peu tout ça.
En utilisant la commande `curl 'https://mastodon.social/api/v2/search?q=UnderTheVeil03&type=accounts' | jq`
On obtient le résultat suivant :
```json
{
  "accounts": [
    {
      "id": "116267510059762568",
      "username": "UnderTheVeil03",
      "acct": "UnderTheVeil03@gaygeek.social",
      "display_name": "UnderTheVeil03",
      "locked": false,
      "bot": false,
      "discoverable": true,
      "indexable": true,
      "group": false,
      "created_at": "2026-03-21T00:00:00.000Z",
      "note": "",
      "url": "https://gaygeek.social/@UnderTheVeil03",
      "uri": "https://gaygeek.social/ap/users/116267488125493790",
      "avatar": "https://files.mastodon.social/cache/accounts/avatars/116/267/510/059/762/568/original/0e24c0de05439216.png",
      "avatar_static": "https://files.mastodon.social/cache/accounts/avatars/116/267/510/059/762/568/original/0e24c0de05439216.png",
      "avatar_description": "",
      "header": "https://files.mastodon.social/cache/accounts/headers/116/267/510/059/762/568/original/716edd13ab021b23.jpg",
      "header_static": "https://files.mastodon.social/cache/accounts/headers/116/267/510/059/762/568/original/716edd13ab021b23.jpg",
      "header_description": "",
      "followers_count": 0,
      "following_count": 4,
      "statuses_count": 4,
      "last_status_at": null,
      "hide_collections": false,
      "show_media": true,
      "show_media_replies": true,
      "show_featured": true,
      "feature_approval": {
        "automatic": [],
        "manual": [],
        "current_user": "denied"
      },
      "emojis": [],
      "fields": []
    }
  ],
  "statuses": [],
  "hashtags": [],
  "collections": []
}
```
Ça peut faire un peu peur au premier coup d’œil, mais en soi seule la ligne "url" nous intéresse vraiment : elle nous donne [le lien d'un compte](https://gaygeek.social/@UnderTheVeil03) nommé UnderTheVeil03 sur le serveur Mastodon "gaygeek.social".

On y retrouve cette fois une photo de profil similaire à celle de son compte Facebook. Ce choix de serveur Mastodon concorde avec ses abonnements Twitter pro-LGBT et ses t-shirts aux couleurs du drapeau LGBT.
![[LAF_C1_LFM_GG_XS.png]]
On est donc certain que c'est bien le compte de Sarah Michelle.
![[LAF_C1_LFM_GG_M.png]]

En regardant rapidement le contenu de chacun de ses comptes, on peut trouver [un post](https://gaygeek.social/@UnderTheVeil03/116629547663802510) sur son compte Mastodon qui explique qu’elle part le 3 juillet (date à laquelle Malo a été kidnappé) pour le week-end à **==Limoges==**, afin de faire du bénévolat dans un refuge.
![[LAF_C1_LFM_GG_MP.png]]
On sait donc qu'elle n'est pas disponible à ce jour, et qu'elle ne pourra donc pas nous aider.

---
## Le grand rêve d'un Tatou

### Énoncé
>Vous voilà désormais en possession de beaucoup d'informations grâce aux réseaux de Sarah. Il semblerait d'ailleurs qu'elle ait une soeur avec qui elle passe souvent du temps.
>
>>Quel est le métier que rêve de faire la soeur de Sarah ?
>
>_Format : `Cycliste`

### RETEX

Maintenant que l’on connaît la présence de Sarah sur les réseaux sociaux, on peut analyser le contenu de ses comptes pour répondre à ce challenge.

1. **Facebook :** 
   aucun contenu lié à une soeur.
2. **Instagram :**
   3 posts faisant mention de sa "petite soeur" dont un qui mentionne une certaine Martine.
   Chaque post a l’air d’être lié à un contexte de “visite” avec sa petite sœur dans des lieux associés à des métiers (pompiers, astronautes, policiers).
3. **X :** 
   [Un post](https://x.com/UnderTheVeil03/status/2062468267206127843) cite sa petite soeur en expliquant qu'elle la "tanne avec son métier de rêve depuis 2 mois".
   ![[LAF_C1_LFM_GRT_XP.png]]
   Le post date de juin, donc sa sœur a commencé à la tanner à ce propos depuis avril. Ce qui coïncide avec les deux derniers posts de Sarah, dans un contexte de visite avec sa sœur dans certains lieux, publiés sur Instagram en début et fin avril.
4. **Mastodon :**
   Aucun contenu lié à sa soeur.

On va donc devoir se rabattre sur le lien entre les posts Instagram et le post sur X.
Le post sur X a été réalisé le 4 juillet, et elle dit précisément : « Ça fait aujourd’hui 2 mois ».
On est donc au jours près, et [cette publication sur Instagram](https://www.instagram.com/p/DWtIGSzDN1_/) a été postée exactement deux mois avant ce post X.
![[LAF_C1_LFM_GRT_I.png]]
Le contexte du post semble être une visite de la Cité de l’espace, promouvant le fait de devenir **==Astronaute==**.
On peut donc en déduire que sa soeur y a découvert le métier de ses rêves.

---
## Cachée comme un phasme

### Énoncé
> Vous voilà avec de plus en plus d'information sur toute la famille Michelle. La seule personne majeure dont vous ignorez la localisation ce week-end est Lucia... Si elle est dans le coin, elle aura peut-être des informations sur Malo.
>
>>Dans quelle résidence loge Lucia en ce moment ?
>
>_Format : `Residencia Pinos`

### RETEX
Cette fois-ci, on veut des infos sur Lucia, on va donc repartir de son compte Facebook.
Ça va être très rapide, elle n'a que 6 posts.
Les voici dans l'ordre de publication : 
1. Partage de sa date de naissance : 3 janvier 1982
2. Photo d'une ruelle vue de haut à propos d'un weekend avec Jean Michelle (son mari), publié le 03/01/2022
3. Photo prise d'un hôtel le 03/01/2023
4. Photo d'une sorte de port prise le 03/01/2024
5. Partage d'une nouvelle photo de profil
6. Explique qu'elle part le weekend du 03/07/2026 pour une virée avec sa meilleure amie dans l'hôtel où elle a fêté ses 40 ans.

On connait sa date de naissance via le `1.`, on sais donc qu'elle a eu 40 ans le 03/01/2022, soit au moment du [post](https://www.facebook.com/photo?fbid=122094262130914430&set=a.122094253400914430) `2.`.
![[LAF_C1_LFM_CP_PF.png]]
Pour trouver le nom de la résidence dans laquelle elle loge en ce moment, on peut s'aider de ces points sur la photo : 
1. La façade en contrebas avec des motifs atypiques
2. L'intersection vers une autre ruelle
3. Le bâtiment au fond de la ruelle qui la fait bifurquer vers la gauche
4. La tour/horloge en fond.

À partir de là, on peut commencer de plusieurs façons : essayer de trouver de quelle tour il s’agit via une recherche d’image inversée pour ensuite trouver le lieu et valider avec la façade aux motifs, ou bien chercher des informations sur la façade aux motifs atypiques, confirmer avec la tour puis identifier le lieu.

Personnellement je préfère la deuxième option.
En lançant une recherche d’image inversée via Google Lens en se focalisant sur la façade aux motifs, on peut trouver en résultat deux endroits cohérents :
1. Palazzo di Bianca Capello
2. Palazzo Guicciardini
![[LAF_C1_LFM_CP_GGL.png]]
Mais en vérifiant via Google Street View, on s'aperçoit que le premier s'y rapproche mais n'est pas exactement pareil que sur la photo.
![[LAF_C1_LFM_CP_GSV.png]]
Tandis que pour le deuxième, on colle parfaitement à la photo.
![[LAF_C1_LFM_CP_GSV2.png]]
On peut donc passer sur Google Earth pour confirmer tout ça en essayant d'avoir la même vue que sur la photo. 
![[LAF_C1_LFM_CP_GE.png]]
Google Earth ne nous permet malheureusement pas d’avoir une vue panoramique aussi basse, mais il est quand même possible d’avoir une vue un peu plus haute, tout en gardant les quatre points de la photo initiale en vue.
La tour/horloge que nous voyons de loin sur la photo initiale est donc la tour de l’horloge du Palazzo Vecchio.
![[LAF_C1_LFM_CP_CGSV.png]]
En comparant la photo initiale avec les vues disponible via Google Street View, on peut même trouver approximativement la fenêtre d'où a été prise la photo.
![[LAF_C1_LFM_GMC.png]]
Puis via Google Maps, on peut trouver le nom de l'hôtel lié à ce bâtiment : **==Residenza Benizzi==**

Ce qui confirme donc que Lucia Michelle est en Italie à l'heure actuelle et ne peut donc pas nous aider pour Malo.

---
## Le câlin du chimpanzé

### Énoncé
>Vous voilà avec la localisation de Lucia. Elle ne semble pas être liée à la disparition de Malo. Afin d'en savoir un peu plus sur elle, vous décidez de continuer un peu vos investigations sur cette dernière pour être sûr de ne rien omettre.
>
>>Quel est le nom de jeune fille de la belle-fille de Renée ? 
>
>_Format : `Leroux`_

### RETEX
Aucune information de ce type n'est disponible sur le compte Facebook de Lucia, il va donc falloir chercher autre part.
Commençons par [le compte Facebook de son mari](https://www.facebook.com/profile.php?id=61579482161478).
![[LAF_C1_LFM_CC_PF.png]]
Ce dernier avait partagé le 24 mai 2008 [un post avec une photo de mariage](https://www.facebook.com/permalink.php?story_fbid=pfbid0D6c8CGveMPVyvpBk11RVPJtrs9q34VtZ9Hej557K6QsdKnDf96iRYyqoykDDPPVWl&id=61579482161478) avec sa femme Lucia. Sur ce post, il n'y a qu'une description apparente : "Min kärlek" qui signifie "Mon amour".
![[LAF_C1_LFM_CC_II.png]]
À première vue, rien de bien concluant, mais en inspectant l’image, on peut voir un attribut alt : « Le jour où Mlle Karlson est devenue Mme Michelle ».
L’alt de l’image a probablement été renseigné manuellement par Jean suite au [post Facebook de sa fille](https://www.facebook.com/michelle.sarah2003/posts/pfbid031EUJCpYPq9MKKsJZ9gjJxprwEdmQ3a5GY1DMMYEN3Ht2gnNtUzGTRRFjJERneRH1l) sur le sujet.
On a donc trouvé son nom de jeune fille : **==Karlson==**

---
## La balade du zèbre

### Énoncé
>Maintenant que vous avez réuni des informations sur les petites-filles de Renée, qu'en est-t'il de leur parents ? 
>Même s'il n'est pas aussi bavard que Sarah, leur père semble lui aussi partager quelques informations sur les réseaux sociaux.
>
>>Où doit-il se trouver ce week-end ? 
>
>_Format : `XX.XXXXXXX, XX.XXXXXXX`

### RETEX
Le [compte Facebook de Jean](https://www.facebook.com/profile.php?id=61579482161478) ne comporte pas grand chose, il ne va pas être facile d'avancer dans nos recherches uniquement avec ce dernier.
La seule information réellement intéressante qui en ressort, c'est qu'il aime la course à pied.
![[LAF_C1_LFM_BZ_CF.png]]
Heureusement, nous avons accès aux réseaux de sa famille.
En relisant attentivement chaque interaction de tous les comptes précédemment trouvés, on peut trouver ce post Mastodon de sa fille le concernant :
![[LAF_C1_LFM_BZ_PM.png]]
Elle y explique essayer de se remettre au sport en allant courir avec son père.
En recoupant cette information avec le loisirs décrit sur son compte Facebook, on peut considérer que c'est une activité régulière.
Il a donc potentiellement un compte sur une plateforme à ce propos.
La plateforme de course à pied la plus connue est Strava, donc commençons par là.

En recherchant Jean Michelle Jr sur Strava on peut trouver un compte avec une photo de profil qui semble être le Jean Michelle Jr que l'on connait.
![[LAF_C1_LFM_BZ_CS.png]]
Sur ce compte, il y a une localisation approximative : Saint-Martin-Terressus, Haute-Vienne, et un post qui explique qu'il fera une course non officielle avec un ami dans la Haute-Vienne lors du weekend du 03/07. Une photo accompagne le post, essayons de localiser le point de vue pour savoir où il est exactement ce weekend. Il est aussi précisé dans le post que la photo date un peu.

Il y a plusieurs façons de faire. Je vais décrire ici la méthode que nous avons utilisée pour flag ce challenge, celle que j’ai tentée infructueusement, et celle prévue initialement par les challmakers.

**Méthode 1 :** Par Heiden (le crack)
![[LAF_C1_LFM_BZ_M1_1.png]]
Sur la photo on peut distinguer :
1. Un lampadaire
2. Une route qui vire à droite en arc de cercle
3. Une intersection qui forme une sorte de "Y" avec la route principale
Ensuite, on peut se rappeler que le post précisait Haute-Vienne comme lieu de course.

Il faut savoir qu'en France, l’éclairage public est une compétence des communes, qui lancent des marchés publics pour acheter des luminaires auprès de fabricants en spécifiant leurs besoins. Il n’est donc pas rare de voir une petite commune avec exactement les mêmes lampadaires dans toute la commune, surtout après un programme de rénovation homogène,  lampadaires qui seront potentiellement différents de ceux d’autres communes.

Donc concrètement, si l’on a une photo d’un lampadaire d’une commune et le nom de la région liée, pour trouver le nom de la commune en question, on peut vérifier rapidement un lampadaire de chaque commune de la région via Google Street View pour voir s’il est identique à celui de la photo.
![[LAF_C1_LFM_BZ_M1_2.png]]
Ensuite, pour trouver l'emplacement de la photo, il suffit de trouver une intersection en "Y" comme sur la photo.
![[LAF_C1_LFM_BZ_M1_3.png]]
Enfin, il suffit de jouer avec les dates des prises de vue pour trouver celle qui fait correspondre le décor à la photo.
![[LAF_C1_LFM_BZ_M1_4.png]]
C'est une méthode qui marche très bien pour les petites communes mais devient vite inutilisable pour les plus grosses communes, puisqu'elles sont plus souvent sujet à des rénovations et ont donc potentiellement plusieurs lampadaires différents dans la même commune.

**Méthode 2 :** par moi - non abouti 
Étant donné que j'aime beaucoup Overpass-Turbo, je me suis dit que c'était le moment de le sortir, le cadre est parfait pour son utilisation : peu d'informations, seulement une photo.

Voici les indices visuels que j'avais repéré sur la photo : 
- 1 intersection avec une voie spécifique pour ceux qui veulent tourner. (intersection en Y)
- 1 stop pour ceux qui veulent s'insérer dans la route.
- 1 panneau de direction routière. 
Ce dernier panneau nous dit :
- C'est une départementale : rectangle jaune en haut du panneau.
- Une autoroute n'est pas loin (couleure bleue)
- la route pointe vers une grande agglomération (couleur verte)
- la route pointe vers 3 directions locales (couleur blanche)

J’ai donc tenté différentes requêtes Overpass-Turbo pour trouver un stop qui fait se rejoindre deux routes départementales en formant un Y, non loin d’une autoroute, d’une grande agglomération et de trois petites directions locales, le tout dans la Haute-Vienne.
Le problème, c’est que j’en ai sorti beaucoup trop de données, et ça a été beaucoup trop long et épuisant à analyser.

**Méthode 3 :** par les Challmakers
Cette méthode était celle prévu par les créateurs de ce challenge, d'après [leur RETEX](https://github.com/Tacosint/Write-up_L-appel-de-la-foret_2026), il fallait bien utiliser Overpass-Turbo et le panneau stop de la photo, mais il fallait surtout repérer la petite fontaine à eau sur le côté à droite.
![[LAF_C1_LFM_BZ_M2_FE.png]]
En se faisant, on pouvait tout simplement faire une requête pour trouver tous les panneaux stop à moins de 15 m d’une fontaine à eau dans la Haute-Vienne.
```json
[out:json][timeout:60];

{{geocodeArea:Haute-Vienne}}->.hv;

nwr[highway=stop](area.hv)->.stop;

nwr[amenity=drinking_water](area.hv)->.eau;

nwr.stop(around.eau:15);

out body;

>;

out skel qt;
```

![[LAF_C1_LFM_M3_OT.png]]

Overpass-Turbo nous renvoie ensuite sept résultats qu’il suffit de vérifier un par un pour trouver le lieu de la prise de photo : **==45.835361, 1.490293==**

Au final, on a pu trouver où se trouve Jean Michelle Jr lors du kidnapping de Malo, et il n'est malheureusement pas disponible non plus pour nous aider.

---
## Synthèse de nos éléments
> Parce que ce CTF est très long, je me permets de partager à chaque fin de page dédiée un extrait du graphique généré via [CaseBandit](https://app.casebandit.com), qui permet de visualiser l'ensemble de nos éléments et de garder une vue d’ensemble des liens entre personnes, lieux et indices.

![[LAF_C1_LFM.svg]]