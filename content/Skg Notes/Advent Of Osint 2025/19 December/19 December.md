---
tags:
  - Chall
  - Osint
  - Osint4fun
  - AdventOfOsint
---
# Énoncé [1/2]
>A year and a few days ago, an association held an awards ceremony, and the choice of venue was no coincidence.![[19 Decembre.png]]
>On the association’s website, an image illustrates this heritage. This image was intended to illustrate a book.
> Who is depicted in the image, and who is the author of the book?

## RETEX
Déjà le texte sur la pancarte parle d'une académie et ça a l'air d'être de l'italien.
Via lens on trouve la photo suivante quand on se concentre sur la montagne au fond.![Bains thermaux](https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0a/51/c9/d9.jpg)
On est donc bien en Italie.

Sur la pancarte il y a aussi marqué : club & event, ristorante, cocktail bar et grace à tout ça on peut vérifier via [maps](https://www.google.com/maps/place/Akademia+Cucina+and+More/@40.8302513,14.0827622,3a,79.3y,233.81h,71.57t/data=!3m7!1e1!3m5!1s_WmAHoXCwmCGpAI_0gwOgw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D18.430798145372023%26panoid%3D_WmAHoXCwmCGpAI_0gwOgw%26yaw%3D233.8133729223468!7i16384!8i8192!4m10!1m2!2m1!1sakademya+club+%26+event,+ristorante,+cocktail+bar!3m6!1s0x133b11ebe69c2145:0x780b2e6f9b3e40f2!8m2!3d40.8302608!4d14.0826655!15sCi9ha2FkZW15YSBjbHViICYgZXZlbnQsIHJpc3RvcmFudGUsIGNvY2t0YWlsIGJhclovIi1ha2FkZW15YSBjbHViICYgZXZlbnQgcmlzdG9yYW50ZSBjb2NrdGFpbCBiYXKSAQpyZXN0YXVyYW504AEA!16s%2Fg%2F11c2r687w_?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D).

Maintenant chechons l'association qui à tenue une ceremony vers Décembre 2024.
Vu qu'ils n'ont pas de site on retrouve leur [insta](https://www.instagram.com/akademiacucina/?hl=fr) et leur [facebook](https://www.facebook.com/akademiacucina/?locale=it_IT)
Dorks : `site:facebook.com/akademiacucina "Dicembre" 2024`
Je trouve rien via les réseaux, par contre je trouve via ce dork : `akademiacucina cerimonia dicembre 2024`
Un [article](https://www.pozzuolinews24.it/aiost-akademia-cucina-more-consegna-perle-professionisti-ostriche-pozzuoli/) fait mention de ==l’Associazione Italiana Ostricari==
Sur la page de présentation de leur asso sur leur [site](https://associazioneitalianaostricari.it/associazione/) on peut voir cette image : ![[19 Decembre.2.png]]
Via Lens on apprend que la personne sur l'illustration est ==Gaius Sergius Orata==, l'écrivain c'est ==Sextus Pompeius Festus== ce qui donne le flag : ==Caius Sergius Orata Valerius Maximus== en français

# Énoncé [2/2]
>Sergius Orata was a multi-talented entrepreneur, which earned him a jibe from L. Crassus during a trial. This story is recounted by Valerius Maximus.
>What are the last eight words of the paragraph that tells this story (without punctuation)?

## RETEX
En cherchant `procès Sergius Orata par Valerius Maximus` on trouve l'histoire traduite : [ici](https://droitromain.univ-grenoble-alpes.fr/Francogallica/Valere9_fran.htm) On a du bol, la pique est lancé dès le début : 
	"Mon ami Considius a tort de penser qu'en éloignant Orata du lac Lucrin, il le privera d'huîtres ; car, si on lui défend d'en prendre là, il saura bien en trouver sur le toit de ses maisons."
On peut donc retrouver la version [latin](https://www.thelatinlibrary.com/valmax9.html) via `Sergius Orata Valerius Maximus chapter 9 latin`
et on à donc : ==si inde petere non licuisset in tegulis reperturum==.
