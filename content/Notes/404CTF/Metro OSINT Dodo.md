---
tags:
  - Osint
  - Chall
---
## Énoncé
>Il y a quelques mois, en fin de matinée, j’ai mis plus d’une demie heure à faire un trajet direct qui normalement prend 11 à 12 minutes. Tout ça à cause d’un malaise voyageur à Châtelet. Mon trajet était entre deux stations comportant des noms de scientifiques.
>
>Quelles étaient ces deux stations ?
>
>>_Format du flag : 404CTF{les-halles_republique}_

## RETEX
Pour ce chalenge, on pourrait chercher un compte tweeter qui donnerait l'actualité d'une ligne qui passe par Châtelet, ou trouver un article qui parle d'un malaise voyageur, mais vu qu'on ne connait pas la ligne, ça fait trop "guessy".
On va donc avoir une démarche pragmatique
![[content/Notes/404CTF/404_26_MOD/404_26_MOD_W.png|500]]
D'après [Wikipédia](https://fr.wikipedia.org/wiki/Ch%C3%A2telet_(m%C3%A9tro_de_Paris)), les lignes 1, 4, 7, 11 et 14 passent par Châtelet.
On peut donc rechercher les plans de toutes ces lignes pour faire une première analyse rapide.

Ligne 1
>![[content/Notes/404CTF/404_26_MOD/404_26_MOD_M1.png|500]]

Ligne 4
>![[content/Notes/404CTF/404_26_MOD/404_26_MOD_M4.png|500]]

Ligne 7
>![[content/Notes/404CTF/404_26_MOD/404_26_MOD_M7.png|500]]

Ligne 11
>![[content/Notes/404CTF/404_26_MOD/404_26_MOD_M11.png|500]]
> Je pense qu'on peut déjà exclure celle-là, puisque d'après l'énoncé le trajet a été allongé à cause d'un malaise à Châtelet, ce qui signifie que Châtelet est une station qui fait partie du trajet de 11 à 12 minutes.

Ligne 14
>![[content/Notes/404CTF/404_26_MOD/404_26_MOD_M14.png|500]]

Après une première analyse, on a donc exclu la ligne 11, maintenant, deux choix s'offre à nous :
- soit on cherche toutes les stations avec un nom de scientifique avec la station Châtelet entre deux de ces stations puis on regarde le temps nécessaire pour parcourir la distance entre ces deux stations,
- soit on cherche directement le temps nécessaire pour parcourir la distance entre toutes les combinaisons de stations avec Châtelet dedans puis on regarde si une de ces combinaisons de stations possède les noms de scientifiques.
Je vais partir sur le premier choix.

Pour la ligne 1 je ne trouve rien de probant.
Par contre, pour la ligne 4, je trouve la station `Réaumur - Sébastopol` nommé [en hommage](https://fr.wikipedia.org/wiki/R%C3%A9aumur_-_S%C3%A9bastopol_(m%C3%A9tro_de_Paris)) à René-Antoine Ferchault de Réaumur, un physicien et naturaliste français, donc un scientifique.
![[content/Notes/404CTF/404_26_MOD/404_26_MOD_WRS.png|500]]
Je trouve aussi la station `Raspail`, nommé en hommage à François-Vincent Raspail, un chimiste et homme politique français, donc aussi un scientifique.
![[content/Notes/404CTF/404_26_MOD/404_26_MOD_WR.png|500]]
Malheureusement, le trajet est trop long, il fait 14 minutes au lieu de 11/12.
![[content/Notes/404CTF/404_26_MOD/404_26_MOD_T_RSR.png|500]]

Il faut donc chercher une station entre les deux dernières pour raccourcir le temps de trajet.

Je m'aperçois que `Montparnasse - Bienvenüe` à une façon étrange d'écrire "Bienvenue", ça doit donc potentiellement être un nom de famille.
En effet, c'est le nom du [créateur du métro parisien](https://fr.wikipedia.org/wiki/Montparnasse_-_Bienven%C3%BCe_(m%C3%A9tro_de_Paris)) : Fulgence Bienvenüe.
![[content/Notes/404CTF/404_26_MOD/404_26_MOD_WMB.png|500]]
Les ingénieurs sont proches des scientifiques : ils s’appuient sur la science pour tester des hypothèses et produire des solutions, même si leur but principal est l’application.
On peut donc vérifier si le trajet est dans les temps.
![[content/Notes/404CTF/404_26_MOD/404_26_MOD_T_RSMB.png|500]]
11 minutes, c'est parfait par rapport à l'énoncé, le flag est donc : **==404CTF{reaumur-sebastopol_montparnasse-bienvenue}==**

---
Les autres RETEX du [[404CTF 2026]] !