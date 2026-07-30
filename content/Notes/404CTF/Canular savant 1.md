---
tags:
  - Chall
  - Osint
  - OverpassTurbo
  - GEOINT
---
## Énoncé
>Je (1.85m) me baladais à Paris, jusqu'à me retrouver à un rond-point bordé de plusieurs fontaines.
>
>De quel rond-point s'agissait-il ?
>
>>_Format du flag : 404CTF{carrefour-etoile_du_porte-avion-charles-de-gaulle}_
>
>_Les flags de cette série ne comportent pas d'accents_

## RETEX

Étant donné que ce challenge est plutôt facile, je vais m'en servir pour faire un petit tuto d'utilisation de Overpass-Turbo.
En préambule, je vous conseillerai d'aller lire ma CheatSheet sur [[Overpass-turbo]].

L'idée est simple : l'énoncé nous indique que l'auteur se trouvait à un **rond-point bordé de plusieurs fontaines**. Nous allons donc chercher ces deux types d'objets dans OpenStreetMap puis croiser les résultats.

### Fontaines de Paris
```json
[out:json][timeout:60];
{{geocodeArea:Paris}}->.searchArea;

nwr["amenity"="fountain"](area.searchArea);

out tags center;
```
Décomposition :
- `out:json` : demande un résultat au format JSON.
- `timeout:60` : autorise jusqu'à 60 secondes d'exécution, ça évite de charger trop longtemps dans le cas où la requête est foirée.
- `{{geocodeArea:Paris}}` : récupère automatiquement la zone correspondant à Paris.
- `->.searchArea` : stocke cette zone dans une variable nommée `searchArea`.
- `nwr` : recherche simultanément les **n**odes, **w**ays et **r**elations, parce qu'on est jamais sûr de comment les fontaines ont été taguées, si c'est une fontaine simple ça peut être un node, si c'est une fontaine avec une forme spéciale ou un diamètre spécial ça peut être considéré comme un way.
- `[amenity=fountain]` : filtre les objets possédant ce tag, amenity : tag utilisé pour des équipements ou services (fontaines, écoles, parkings, toilettes, etc.).
- `(area.searchArea)` : limite la recherche à Paris.
- `out tags center` : affiche les tags et le centre géométrique de chaque objet.

Cette requête permet d'afficher toutes les fontaines recensées dans OpenStreetMap pour Paris.
![[content/Notes/404CTF/404_26_CS1/404_26_CS1_FP.png]]


### Ronds-points de Paris
```json
[out:json][timeout:60];
{{geocodeArea:Paris}}->.searchArea;

nwr[junction=circular](area.searchArea);

out center;
```
Cette requête fonctionne de la même manière que la précédente, mais cherche cette fois les objets possédant : `junction=circular`

![[content/Notes/404CTF/404_26_CS1/404_26_CS1_RPP.png]]

Je préfère utiliser `junction=circular` plutôt que `junction=roundabout` parce que les deux tags n'ont pas exactement la même signification dans OpenStreetMap.

- `junction=roundabout` désigne un véritable giratoire, avec les règles de priorité associées.
- `junction=circular` désigne plus largement une chaussée circulaire à sens unique autour d'un îlot central, sans présumer du régime de priorité.

Dans la pratique, de nombreuses places et grands carrefours circulaires urbains sont tagués avec `junction=circular`. 
Pour une recherche portant simplement sur des « ronds-points » au sens courant du terme, ce tag est donc souvent plus intéressant, car il permet de retrouver davantage de candidats.

### Croiser les ronds-points et les fontaines de Paris
```json
[out:json][timeout:60];
{{geocodeArea:Paris}}->.searchArea;

nwr[amenity=fountain](area.searchArea)->.fountains;

way[junction=circular](around.fountains:120)(area.searchArea)->.junctions;

(
  .junctions;
  nwr[amenity=fountain](around.junctions:120);
);

out tags center;
```

Cette requête est un peu plus intéressante.

#### Étape 1 : stocker toutes les fontaines

```json
nwr[amenity=fountain](area.searchArea)->.fountains;
```

Tous les objets correspondant à des fontaines sont placés dans l'ensemble `.fountains`.

#### Étape 2 : rechercher les ronds-points proches d'une fontaine

```json
way[junction=circular](around.fountains:120)(area.searchArea)->.junctions;
```

Le filtre :

```json
(around.fountains:120)
```

Signifie : "Recherche les objets situés à moins de 120 mètres d'un élément de l'ensemble `.fountains`."

On obtient ainsi tous les carrefours circulaires proches d'au moins une fontaine.

#### Étape 3 : afficher les ronds-points et les fontaines associées

```json
(  .junctions;  nwr[amenity=fountain](around.junctions:120););
```

On construit un ensemble contenant :
- les ronds-points trouvés précédemment ;
- toutes les fontaines situées dans un rayon de 120 mètres autour de ces ronds-points.

Enfin :

```json
out tags center;
```

Affiche les résultats sur la carte.

![[404_26_CS1_FP&RPP.png]]

### Identification du bon rond-point

Grâce à cette dernière requête, on remarque plusieurs carrefours circulaires possédant des fontaines à proximité.
![[content/Notes/404CTF/404_26_CS1/404_26_CS1_FP1.png]]
![[content/Notes/404CTF/404_26_CS1/404_26_CS1_FP2.png]]
Cependant, dans la plupart des cas :
- les fontaines sont placées au centre de la place ;
- il n'y en a qu'une seule ;
- ou elles ne correspondent pas à la description de l'énoncé.

En inspectant les résultats, un lieu attire immédiatement l'attention : le **Rond-point des Champs-Élysées-Marcel-Dassault**.
![[content/Notes/404CTF/404_26_CS1/404_26_CS1_VP.png]]

On y trouve plusieurs fontaines distinctes réparties sur le pourtour du rond-point :

```json
Way 67027580
Way 67027581
Way 67027582
Way 67027584
Way 67027586
Way 67027587
```

Toutes sont taguées `amenity=fountain`et `natural=water`
De plus elles forment exactement l'ensemble des fontaines visibles autour du rond-point.
![[content/Notes/404CTF/404_26_CS1/404_26_CS1_P.png]]
Un autre indice confirme l'hypothèse : parmi tous les carrefours circulaires trouvés, c'est le seul dont le champ `name`contient explicitement `Rond-point`, alors que les autres sont généralement nommés :

```json
Place d'Italie
Place Victor Hugo
Place des Victoires
Place François-Ier...
```

Le flag était donc : **==404CTF{rond-point_des_champs-elysees}==**