---
tags:
  - Osint
  - Chall
---
---
## BONUS - L'envol des perroquets

### Énoncé
>En janvier 2023, une convention a rassemblé trois entités françaises dans le cadre d'une mobilisation renforcée pour lutter contre la maltraitance animale.
>
>>Quels sont les trois acronymes respectifs de ces entités ?
>
>_Format : `ABCD_EFGH_IJK` (ordre alphabétique)_

### RETEX

On a déjà pas mal de mots-clés via l’énoncé, mais on peut aussi déduire le mot-clé “signée”, puisqu’une convention a généralement vocation à être signée.
En faisant la recherche : `"janvier 2023 convention signée maltraitance animale française"`, on peut donc trouver pas mal de résultat à ce propos : 
1. [Une question à l'assemblée qui cite cette convention](https://questions.assemblee-nationale.fr/q16/16-9021QE.htm)
2. [Un article du ministère de l'Agriculture détaillant cette coopération renforcée](https://agriculture.gouv.fr/cooperation-renforcee-entre-la-spa-et-letat-pour-lutter-contre-les-abandons-et-la-maltraitance)
3. [Une page de la préfecture du Maine-et-Loire qui mentionne la convention tripartite](https://www.maine-et-loire.gouv.fr/Actions-de-l-Etat/Protection-et-sante-des-animaux/Maltraitance-animale#:~:text=Le%2027%20janvier%202023%2C%20les,coopération%20entre%20les%20trois%20acteurs.)
4. [Un article de la Gendarmerie qui revient sur cette mobilisation renforcée](https://www.gendarmerie.interieur.gouv.fr/gendinfo/actualites/2025/lutte-contre-la-maltraitance-animale-une-mobilisation-renforcee)
Toutes parlent d'une convention signée fin janvier 2023 à ce sujet par le ministère de l’Intérieur et des Outre-mer (MIOM), le ministère de l’Agriculture et de la Souveraineté alimentaire (MASA) et la Société protectrice des animaux (SPA).
![[LAF_FD_EDP.png]]
On a donc le flag dans l'ordre alphabétique : **==MASA_MIOM_SPA==**

---

## BONUS - Le trésor des corbeaux

### Énoncé
>En janvier 2026, à Arras, une saisie pour le moins inhabituelle a eu lieu. Des félins naturalisés ont en effet été saisis et des photos immortalisent cet instant.
>
>>Combien d'animaux sont montrés sur ces photos ?
>_Format : `8`_

### RETEX

Cette fois-ci en cherchant `"janvier 2026 Arras saisie félins naturalisés"`, on ne trouve qu'une [fausse piste](https://www.douane.gouv.fr/sites/default/files/2026-01/19/CP%20Félins.pdf).
![[LAF_FD_TDC_FP.png]]
Ce communiqué de presse est une fausse piste puisque la date et le lieu ne concorde pas avec l’énoncé, donc on écarte cette source même si le sujet (félins) semble proche.
Le problème vient du fait qu'on a donné trop d'informations dans la recherche. En allégeant la requête à `"Arras saisie félins naturalisés"`, on laisse plus de latitude au moteur pour faire le lien, et on tombe sur [l'album flickr de la Douane](https://www.flickr.com/photos/douanefrance/albums/with/72177720330751374).
Et dans cet album, on peut retrouver une série de 3 photos avec pour intitulé : [Saisie de félins naturalisés par la BSI](https://www.flickr.com/photos/douanefrance/albums/72177720331712030/ "https://www.flickr.com/photos/douanefrance/albums/72177720331712030/").
![[LAF_FD_TDC_F.png]]
D'après ce même album, ces photos ont été prises le 25 janvier 2026, tout colle donc parfaitement avec l'énoncé.
Et sur la photo d'ensemble on peut compter 3 animaux distincts, on a donc le flag : **==3==**

---

## BONUS - L'insouciance du paresseux

### Énoncé
>La chasse et le braconnage semblent faire partie de la nature humaine. L'Homme n'a pas attendu le XXe siècle pour chasser des animaux jusqu'à l'extinction totale de l'espèce.
>
>>Quelle espèce de mammifère possède la durée la plus courte entre sa découverte par l'Homme et son extinction ?
>
>_Format : `Iguane des Fidji`_

### RETEX

En recherchant les mots clés suivants : `espèce de "mammifère" possède la durée la plus courte entre sa "découverte" par l'Homme et son "extinction"` on peut trouver en premier résultat [un article du musée des confluences](https://museedesconfluences.fr/fr/le-musee/actualites/la-rhytine-de-steller).
Pour cette recherche on vient d'appuyer sur les termes "mammifère", "découverte" et "extinction" afin de montrer au moteur de recherche qu'ils nous sont important.
Cet article trouvé déclare que la rhytine de Steller possède ce funeste record, quelques décennies ayant suffi à l’homme pour mener cette espèce à l’extinction.
![[LAF_FD_IDP.png]]
On peut valider cette information via [la page Wikipédia de ce mammifère](https://fr.wikipedia.org/wiki/Rhytine_de_Steller), qui confirme la découverte au XVIIIe siècle et une extinction en moins de trente ans.

On a donc le flag : **==Rhytine de Steller==**