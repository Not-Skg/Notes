---
tags:
  - Chall
  - Osint
  - Osint4fun
  - AdventOfOsint
---
## Énoncé [1/2]
>Il y a un an et quelques jours, une association organisait une remise de prix, et le choix de ce lieu n’était pas anodin.
>![[19 Decembre.png|500]]
>Sur le site internet de cette association, une image illustre cet héritage. Cette image était destinée à illustrer un ouvrage.
>
>Qui est représenté sur l'image et qui est l'auteur de l'ouvrage ?
>>*Format de réponse :* Publius Ventidius Bassus Marcus Antonius

## RETEX [1/2]
Déjà le texte sur la pancarte parle d'une académie et ça a l'air d'être de l'italien.
Via Google Lens, on trouve la photo suivante quand on se concentre sur la montagne au fond.
![[content/Notes/Osint4Fun/Advent Of Osint 2025/19 December/19D_Napleds.png|500]]
On est donc bien en Italie.

Sur la pancarte, il y a ==club & event, ristorante, cocktail bar== de marqué et grâce à tout ça, on peut trouver la localisation exacte de la prise de photo : 
![[content/Notes/Osint4Fun/Advent Of Osint 2025/19 December/19D_bar.png|500]]

Maintenant cherchons l'association qui y a tenu une cérémonie vers décembre 2024.
Vu qu'ils n'ont pas de site, on retrouve leur [insta](https://www.instagram.com/akademiacucina/?hl=fr) et leur [facebook](https://www.facebook.com/akademiacucina/?locale=it_IT)
Dorks : `site:facebook.com/akademiacucina "Dicembre" 2024`
Je ne trouve rien via les réseaux, par contre, je trouve un [article](https://www.pozzuolinews24.it/aiost-akademia-cucina-more-consegna-perle-professionisti-ostriche-pozzuoli/) via ce dork : `akademiacucina cerimonia dicembre 2024`. Qui fait mention de ==l’Associazione Italiana Ostricari==.

Sur la page de présentation de leur association sur leur [site](https://associazioneitalianaostricari.it/associazione/) on peut voir cette image : ![[19 Decembre.2.png]]
Via Google Lens, on apprend que la personne sur l'illustration est ==Gaius Sergius Orata==, l'écrivain, c'est ==Sextus Pompeius Festus== ce qui donne le flag : **==Caius Sergius Orata Valerius Maximus==** en français.

---
## Énoncé [2/2]
>==Sergius Orata== était un entrepreneur aux multiples talents ce qui lui valu une pique de L. Crassus lors d'un procès. ==Cette== histoire est racontée par ==Valerius Maximus==.
>
>Quels sont les huit derniers mots du paragraphe qui raconte cette histoire (sans ponctuation) 
>>*Format de réponse :* quam diu etiam furor iste tuus nos eludet
## RETEX [2/2]
En cherchant `procès Sergius Orata par Valerius Maximus` on trouve l'histoire traduite : [ici](https://droitromain.univ-grenoble-alpes.fr/Francogallica/Valere9_fran.htm) On a du bol, la pique est lancé dès le début : 

	Mon ami Considius a tort de penser qu'en éloignant Orata du lac Lucrin, 
	il le privera d'huîtres ; car, si on lui défend d'en prendre là, 
	il saura bien en trouver sur le toit de ses maisons.

On peut donc retrouver la version [latin](https://www.thelatinlibrary.com/valmax9.html) via `Sergius Orata Valerius Maximus chapter 9 latin`
On retrouve donc les 0 derniers mots : **==si inde petere non licuisset in tegulis reperturum==**.