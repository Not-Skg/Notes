---
tags:
  - Osint
  - GEOINT
  - Tool
  - Cheatsheet
---
>Outil qui permet d'émettre des requêtes à l'API d'Open Street Map (OSM), et d'en visualiser les résultats sur une carte interactive.

# Recherche simple

Une requête en Overpass Qwery Language est composé de ces différents éléments :

```
Type[TAG](Emprise)
sortie;
```

## Emprise
>Zone géographique dans laquelle la requête va être émise.

- `({{bbox}})` : zone de la carte visible dans la partie droite de la fenêtre. (par défault)
- `{{geocodeArea:name}}` : pour les noms de lieux (ville, région, pays, ...)

Exemple : 
```json
{{geocodeArea:poitiers}}->.searchArea;
way["highway"](area.searchArea);
```

Pour plus d'info : [wiki](https://wiki.openstreetmap.org/wiki/FR:Overpass_turbo/Requ%C3%AAtes_Overpass_Turbo_%C3%A9tendues)

## Type
>Par défault `nwr` pour intérroger les trois.

| Type | désignation                                                               | Exemples         |
| ---- | ------------------------------------------------------------------------- | ---------------- |
| node | noeud, point géographique (long/lat)                                      | feu tricolore    |
| way  | voie, interconnection d'au moins 2 noeuds (chemin ouvert, circuit, zones) | route, bâtiment  |
| rel  | relation, regroupement de plusieurs noeuds, voies ou relations            | ville, frontière |
## Tag
>Ressources : [TagInf](https://taginfo.openstreetmap.org/keys), [wiki d'OSM](https://wiki.openstreetmap.org/) 

A chaque type est associé un ou plusieurs ==tags==, sous la forme : `["clé"="valeur"]`
Ça permet de préciser la requête, par exemple : [oneway=yes]
Pour chercher un tag quel que soit sa valeur : `["key"]`
Et pour une correspondance partiel : `["key"~"regex"];`

### Ajout de critère
> Plusieurs tag consécutif

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

Il suffit de faire plusieurs requête avant la sortie et de les gardés dans des `();`
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
> On peut donner un nom à une requête afin de la lié à d'autres.

(requête)->.nom;

ex :
```(node[amenity~"(bar|cafe|pub)"](area.searchArea);)-> .bcp;```
## Fonctions
### Around
>Recherche dans un rayon autour d'un objet nommé

node(around.objet:distance) ["lieu_voulu"];

ex:
`node(around.bcp:50) ["amenity"="restaurant"];`
-> les restaurant qui sont à moins de 50m d'un bcp
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

Ex:
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