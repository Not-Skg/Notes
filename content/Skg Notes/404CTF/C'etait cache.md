---
tags:
  - Chall
  - Osint
---
## Énoncé
>Une très grande dame française de l'informatique est en possession d'un flag, égaré sur une plateforme bien connue. 
>![[404_26_CC.png]]
>À vous de réussir à le retrouver ! 
>
>>Format : 404CTF{leflag}

## RETEX
Sur le screenshot de l'énoncé, on peut lire une partie de l'URL : alice-reco...leur-repo-pos...AG.TXT
On peut aussi remarque l'interface et le logo de github.
![[404_26_CC_G.png|500]]
On a de la chance, il n'existe qu'un seul [compte github](https://github.com/alice-recoque) avec un username qui commence par "alice-reco".
![[404_26_CC_AR.png|500]]
Et Alice Recoque est une grande scientifique du domaine de l'informatique.
On est donc sur un profil qui match plutôt bien avec l'énoncé.
![[404_26_CC_GR.png|500]]
On retrouve même un repos avec les bons mots clés trouvé sur la photo et un des admins du 404 en contributeur.

Sur l'URL du screenshot, on pouvait voir un terme "AG.TXT", je pense fortement que c'est le FLAG.TXT qui comporte le flag, on va donc le trouver dans le repos.
On peut donc déjà cloner le repos via la commande : `git clone https://github.com/alice-recoque/le-meilleur-repo-possible.git`
![[404_26_CC_C.png|500]]

Le repos contient plusieurs flag.txt mais aucun ne possède le vrai flag. Et un de ces fichiers nous informe que le flag a été censuré, potentiellement suite à une maj, j'imagine.

Étant donné qu'on connait le format du flag, on peut déjà rechercher dans tout le repos, notamment l'historique, toutes les chaines de caractère qui commence par `404CTF{` via la commande : `git log -S "404CTF{" --all -p`.
![[404_26_CC_F.png|500]]
On a donc le flag : **==404CTF{PLuT0T_FriTE5_0û_P0T@T03S?}==**
