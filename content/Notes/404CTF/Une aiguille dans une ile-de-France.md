---
tags:
  - Chall
  - Osint
  - OverpassTurbo
  - GEOINT
  - Umap
---
## Énoncé
>D'après nos renseignements, un duo d'individus malicieux cherche à s'en prendre à des scientifiques en Île-de-France pour dérober leurs prix. 
>Nous avons pu traquer leurs déplacements et avons mis en évidence plusieurs centaines de points d'intérêt à surveiller.
>![[404_26_AIDF_C.jpg]]
>Récemment, le duo est entré en communication et s'est donné rendez-vous près d'un des points d'intérêt, dans la ville où résiderait une grande scientifique. 
>Mais de qui s'agit-il ?
>
>>_Format du flag : 404CTF{marie-curie}_
>
>Un json fait des parties des assets de ce chall, en plus du screen du message.


## RETEX
Je n'ai malheureusement pas réussi à résoudre complètement ce challenge.

En revanche, toute la première partie GEOINT était correcte et m'a permis de réduire très fortement le nombre de possibilités. Je trouve la démarche intéressante, je me permets donc de la partager malgré tout.

Dans un premier temps, je regarde à quoi ressemble le fichier `.json` fourni dans les assets du challenge.
![[404_26_AIDF_POIS.png]]
On y trouve des centaines de couples **ID / coordonnées GPS**. En l'état, ce n'est pas très exploitable. Je convertis donc rapidement le fichier en `.csv` afin de pouvoir l'importer dans **UMap**, une carte interactive qui permet de visualiser facilement l'ensemble des points d'intérêt.

![[404_26_AIDFM.png]]
On remarque immédiatement que les POIs sont concentrés dans un disque d'environ **50 km de rayon autour de Paris**.

Le screenshot fourni dans l'énoncé indique que le rendez-vous a lieu **près d'une petite fontaine rectangulaire située sur le trottoir en face d'un café**. On va donc essayer d'exploiter cette information pour réduire le nombre de points d'intérêt.

Malheureusement, **Overpass Turbo ne permet pas d'exprimer une relation géographique comme "sur le trottoir d'en face"**. En revanche, il est très simple de rechercher deux objets situés à moins d'une certaine distance l'un de l'autre.

J'ai donc choisi de considérer qu'un café et une fontaine distants de moins de **20 mètres** correspondaient à cette description. Une chaussée urbaine française mesure en moyenne une dizaine de mètres de large ; un rayon de 20 mètres laisse donc une petite marge au cas où le point OSM représentant le café ou la fontaine serait positionné sur le bord du bâtiment ou du bassin plutôt qu'en son centre.

Avant de croiser les données, regardons combien il existe de fontaines puis de cafés dans ce disque.

**Toutes les fontaines**
```json
[out:json][timeout:120];

nwr[amenity=fountain](around:50000,48.8566,2.3522);

out tags center;
```
![[404_26_AIDF_FM.png]]

**Tous les cafés**
```json
[out:json][timeout:120];

nwr[amenity=cafe](around:50000,48.8566,2.3522);

out tags center;
```
![[404_26_AIDF_CF.png]]

Les deux requêtes suivantes sont volontairement symétriques. Elles permettent de récupérer les cafés proches des fontaines puis les fontaines proches des cafés afin d'obtenir deux jeux de données faciles à superposer dans UMap.

Cherchons maintenant tous les **cafés situés à moins de 20 mètres d'une fontaine**.
```json
[out:json][timeout:120];

nwr[amenity=fountain](around:50000,48.8566,2.3522)->.fountains;

nwr[amenity=cafe](around.fountains:20);

out tags center;
```
La première ligne stocke toutes les fontaines dans un ensemble nommé `.fountains`.

La seconde utilise l'opérateur `around` pour rechercher tous les cafés situés dans un rayon de 20 mètres autour de chacune de ces fontaines.
![[404_26_AIDF_CPM.png]]

Faisons ensuite l'inverse en recherchant les **fontaines situées à moins de 20 mètres d'un café**.
```json
[out:json][timeout:120];

nwr[amenity=cafe](around:50000,48.8566,2.3522)->.cafes;

nwr[amenity=fountain](around.cafes:20);

out tags center;
```
![[404_26_AIDF_FPM.png]]

On peut désormais exporter ces deux résultats au format **GeoJSON**, puis les importer dans **UMap** sur deux calques distincts.
![[404_26_AIDF_FPCPM.png]]
On obtient alors deux nouvelles couches :
- les fontaines candidates (en bleu) ;
- les cafés candidats (en marron).

![[404_26_AIDF_M.png]]
En ajoutant enfin les POIs du challenge (en gris), on constate qu'il ne reste plus qu'une poignée de candidats.

On ne peut malheureusement pas filtrer directement les **fontaines rectangulaires** avec Overpass Turbo. Il ne reste plus qu'à vérifier manuellement les quelques possibilités restantes à l'aide de Google Maps ou Street View.

![[404_26_AIDF_PU.png]]
L'un des points d'intérêt attire rapidement mon attention : il se situe dans un petit parc, juste à côté d'une fontaine, avec un café littéralement de l'autre côté de la chaussée.

![[404_26_AIDF_POIP.png]]
En vérifiant sur Google Maps, on constate qu'il s'agit bien d'une **petite fontaine rectangulaire**.

On peut alors en déduire que la ville recherchée est ==Viroflay==.

Malheureusement, c'est à ce moment-là que je me suis bloqué.

---

Pour terminer le challenge, il suffisait en réalité de consulter la page Wikipédia de Viroflay. On y découvre que **Catherine Cesarsky** y est mentionnée comme _« astrophysicienne ; elle réside à Viroflay »_.

Je n'ai tout simplement pas pensé à consulter cette source pourtant évidente. Comme quoi, il ne faut jamais négliger les sources les plus simples.

> Je remercie Kubow pour le pivot sur la page Wikipédia de Viroflay. Sans son write-up, je ne suis pas certain que j'aurais trouvé cette dernière étape.
>https://kubo-security.github.io/ctf/404ctf-2026/aiguille.html

