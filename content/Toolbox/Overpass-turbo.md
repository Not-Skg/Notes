---
title: Overpass Turbo
tags:
  - Osint
  - GEOINT
  - Toolbox
  - Cheatsheet
  - overpassturbo
description: Petit cours / Cheetsheat sur l'utilisation d'Overpass Turbo
---
<div class="toolbox-banner toolbox-banner--stack">
<img src="./Overpass_banner.webp" alt="" class="toolbox-banner-img" width="1600" height="533" style="aspect-ratio:3/1;object-fit:cover" />
<div class="toolbox-banner-text" id="toolbox-banner-text">
<span class="fiches-hero-bar"></span>
<p class="toolbox-banner-sub">Outil qui permet d'émettre des requêtes à l'API d'OpenStreetMap (OSM), et d'en visualiser les résultats sur une carte interactive.</p>
</div>
</div>

# Exemple de requête

Vous venez d'emménager à Paris et vous souhaitez organiser une soirée parfaite avec votre copine. Au programme : un bon restaurant, une séance de cinéma et un dernier verre pour terminer la soirée. Mais pas question de traverser tout Paris entre chaque activité !

Votre mission est de trouver des lieux qui respectent tous les critères suivants :

- 🍽️ Un restaurant dans le 10<sup>e</sup> arrondissement de Paris, pour rester à proximité de votre appartement.
- 🎬 Un cinéma à moins de 100 mètres du restaurant, pour ne pas risquer de manquer le début du film.
- 🍸 Un bar à moins de 50 mètres du cinéma, pour finir la soirée en beauté.

**Le problème ?** Sur Google Maps, trouver un restaurant, un cinéma et un bar est facile. Mais identifier tous les établissements qui respectent simultanément ces contraintes géographiques devient vite fastidieux.

Heureusement, vous connaissez Overpass Turbo ! Grâce à une seule requête, vous pouvez croiser les données d'OpenStreetMap, appliquer vos critères de distance et visualiser les lieux correspondants sur une carte.

![[Overpass_exemple.webp]]

En quelques secondes, vous avez identifié plusieurs possibilités pour votre soirée, repérées par les numéros sur la carte :

1. [Le Louxor](https://fr.wikipedia.org/wiki/Le%20Louxor), avec bar intégré, ou le Barbès et le Kyushu Japonais non loin
2. [Le Brady](https://fr.wikipedia.org/wiki/Le_Brady), avec L'Exode et Palais des Rajpout
3. [L'Archipel](https://fr.wikipedia.org/wiki/L'Archipel), avec La Scala et Le Canard Sauvage
4. [Le Grand Rex](https://fr.wikipedia.org/wiki/Le%20Grand%20Rex), avec Le 40 et l'Indiana Café (restaurant)

Il ne reste plus qu'à choisir selon vos préférences !

Derrière cette requête, il n'y a que quelques briques à connaître : une zone, un type d'objet, un tag, une sortie. Voyons-les une par une.

# Recherche simple

Une requête en Overpass Qwery Language est composé de ces différents éléments :

```
Type[TAG](Emprise)
sortie;
```

## Emprise
>Zone géographique dans laquelle la requête va être émise.

- `({{bbox}})` : zone de la carte visible dans la partie droite de la fenêtre. (par défaut)
- `{{geocodeArea:name}}` : pour les noms de lieux (ville, région, pays, ...)

Exemple : 
```json
{{geocodeArea:poitiers}}->.searchArea;
way["highway"](area.searchArea);
```

Pour plus d'info : [wiki](https://wiki.openstreetmap.org/wiki/FR:Overpass_turbo/Requ%C3%AAtes_Overpass_Turbo_%C3%A9tendues)

## Type
>Par défaut `nwr` pour interroger les trois.

| Type | désignation                                                               | Exemples         |
| ---- | ------------------------------------------------------------------------- | ---------------- |
| node | noeud, point géographique (long/lat)                                      | feu tricolore    |
| way  | voie, interconnection d'au moins 2 noeuds (chemin ouvert, circuit, zones) | route, bâtiment  |
| rel  | relation, regroupement de plusieurs noeuds, voies ou relations            | ville, frontière |
## Tag
>Ressources : [TagInf](https://taginfo.openstreetmap.org/keys), [wiki d'OSM](https://wiki.openstreetmap.org/) 

À chaque type est associé un ou plusieurs ==tags==, sous la forme : `["clé"="valeur"]`
Ça permet de préciser la requête, par exemple : [oneway=yes]
Pour chercher un tag quelle que soit sa valeur : `["key"]`
Et pour une correspondance partielle : `["key"~"regex"];`

### Ajout de critère
> Plusieurs tags consécutif

ex : `way["highway"]["maxspeed"="30"]({{bbox}});`

## Sortie
> Se finit par un `;`

Généralement seulement `out;` mais on peut préciser la nature de la sortie : 

| nature      | sortie                                                     |
| ----------- | ---------------------------------------------------------- |
| `out body;` | objets avec leurs attributs complets                       |
| `out skel;` | squelette, uniquement les identifiants                     |
| `out geom;` | géométrie complète (positions des noeuds dans un way, etc) |
| `out meta;` | avec métadonnées (version, timestamp, utilisateur)         |
| `out qt;`   | optimisé en rapidité                                       |

### Extraire plusieurs types d'objets

Il suffit de faire plusieurs requêtes avant la sortie et de les garder dans des `();`
```json
(
node["key1"="val1"](area.searchArea);
node["key2"="val2"](area.searchArea);
node["key3"="val3"](area.searchArea);
);
```

Avec la même clé en simplifiant
```json
(
node[key~"(val1|val2|val3)"](area.searchArea);
);
```

exemple : 
```json
(
node["amenity"="bar"](area.searchArea);
node["amenity"="cafe"](area.searchArea);
node["amenity"="pub"](area.searchArea);
);
```

et 
```json
(
node[amenity~"(bar|cafe|pub)"](area.searchArea);
);
```

---
# Recherche Composées

## Nommer les recherches
> On peut donner un nom à une requête afin de la lier à d'autres.

(requête)->.nom;

ex :
```(node[amenity~"(bar|cafe|pub)"](area.searchArea);)-> .bcp;```
## Fonctions
### Around
>Recherche dans un rayon autour d'un objet nommé

node(around.objet:distance) ["lieu_voulu"];

ex :
`node(around.bcp:50) ["amenity"="restaurant"];`
-> les restaurants qui sont à moins de 50m d'un bcp
> **TIPS :** amenity est une base de donnée plutôt sympa

## Conditions

### Filtres numériques 
```json
way["maxspeed"~"^[3-4][0-9]$"];    // vitesses entre 30 et 49
node["height"="10"];               // hauteur exacte
```
### Négation
`node["amenity"]["amenity"!="parking"];`

### Conditions internes `if`
**Syntaxe**
`(type["clé"](if: condition)(zone););`

Ex :
`way["highway"](if: t["maxspeed"] == "50")({{bbox}});`

#### Fonctions et opérateurs utilisables dans `if`

| Fonction / Opérateur              | Description                      | Exemple                                           |
| --------------------------------- | -------------------------------- | ------------------------------------------------- |
| `is_number(x)`                    | teste si la valeur est numérique | `is_number(t["maxspeed"])`                        |
| `is_tag(key)`                     | teste si le tag existe           | `is_tag("surface")`                               |
| `t["key"]`                        | valeur d'un tag                  | `t["name"]`                                       |
| `~`                               | regex                            | `t["name"] ~ "École"`                             |
| `!~`                              | non correspondance               | `t["highway"] !~ "residential"`                   |
| `\==`, `!=`, `<`, `>`, `<=`, `>=` | comparaisons                     | `t["maxspeed"] > 30`                              |
| `&&`                              | et                               | `is_number(t["maxspeed"]) && t["maxspeed"] > 90 ` |

---

Ressources utiles pour aller plus loin : 
- [Article du Predicta Lab](https://predictalab.medium.com/geoint-comment-utiliser-overpass-turbo-pour-losint-ed1da66354e9) , 
- [Introduction à Overpass turbo de Boris Mericskay](https://sites-formations.univ-rennes2.fr/mastersigat/Cours/OverpassTurbo_SOTM_2022.pdf)

Pour une utilisation d'Overpass-Turbo dans des challenge : [[Canular savant 1]], [[Une aiguille dans une ile-de-France]]