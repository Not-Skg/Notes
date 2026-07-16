---
tags:
  - Osint
  - Chall
---
---
## Welcome

### Énoncé
>Au cours de ce CTF, votre équipe sera amenée à réaliser une enquête en se reposant sur des informations disponibles en sources ouvertes. Les éléments récupérés devront ensuite être capitalisés et analysés afin de répondre à des questions disponibles sur cette plateforme CTFd.
>
>Comme dans n'importe quelle enquête, il est important de **prendre des notes** et de **conserver celles-ci**, car un élément récupéré à un instant T pourra vous être utile plus tard dans votre enquête.
>
>Nous avons voulu créer un CTF tourné autour du joueur et de sa place dans l'histoire, aussi, nous espérons que vous apprécierez cette histoire autant que nous avons apprécié la créer !
>
>>Afin que le CTF se déroule de la meilleure manière possible, merci de lire le règlement et de retranscrire la phrase indiquée dans celui-ci.
>
>_Format :  `J'aime manger des tacos, surtout avec des amis`_

### RETEX
Ce type de premier challenge est un grand classique.
![[LAF_I_W.png]]
On peut trouver très facilement le flag **==J'ai lu le règlement, et je m'engage à le respecter==** dans le règlement.

---
## Reportage animalier

### Énoncé
>Un reportage d'une chaîne du service public, en Octobre 2024, fait état d'un fait alarmant. Des animaux de compagnie, souvent de race, se font enlever.
>
>>D'après celui-ci, combien de vols ont été signalés en ligne entre le début de l'année 2024 et la parution de l'article ?
>
>_Format : `1000`_

### RETEX
Pour ce challenge, on sait déjà que le reportage doit provenir d'une chaîne du service public.
On est donc sur du France 2, France 3, France 5 ou France 24, ce qui permet de réduire fortement le périmètre de recherche dès le départ.
On va donc construire une requête Google avec des mots-clés assez larges (`"vol animaux compagnies race octobre 2024 france"`) pour maximiser les chances de tomber sur un article ou un reportage. On peut ensuite affiner en ajoutant directement le nom des chaînes (France 2, France 3, etc.) dans la recherche pour tester rapidement chaque possibilité.

On peut rapidement identifier deux articles pertinents via cette recherche : un de [France 2 via France Info](https://www.franceinfo.fr/environnement/biodiversite/animaux/animaux-les-vols-de-chiens-de-race-un-phenomene-en-pleine-expansion_6859943.html) et un de [France 3](https://france3-regions.franceinfo.fr/paris-ile-de-france/paris/les-vols-de-chiens-sont-en-hausse-en-ile-de-france-et-visent-des-races-specifiques-3050170.html)
![[LAF_I_RA.png]]
Dans les deux articles, le même nombre de signalements est mis en avant (2400), ce qui permet de recouper l’information et de valider le flag : **==2400==**.