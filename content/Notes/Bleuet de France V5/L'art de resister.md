---
tags:
  - Osint
  - BleuetV5
  - Chall
order: 5
---
![[BleuetV5.png]]

>[!info] Notes
> Voici les retex des challs liés à la partie "L'art de résister" du CTF BLEUET DE FRANCE V5 by AEGE.


***Les autres parties du CTF :***
 · | · [[Dans la peau d'un resistant]]
 · | · [[L'audace de resister]]
 · | · [[Un devoir de memoire]]
 · | · L'art de resister
 · | · [[Nos partenaires]]

---
## Des mots pour contrer les maux

### Énoncé 
>![[BLEUETV5_ArtDR_M.png|500]]
> Alors que vous rentrez chez vous, vous vous souvenez que votre grand-père vous avait transmis une cassette en lien avec cette saison. Il vous disait que la musique présente sur cet enregistrement portait le même nom qu'un code utilisé par des résistants de son village. Hélas, le temps a fait son œuvre, et cette [cassette](https://bleuet.aege.fr/files/a739a239215831207754030b43b748a3/CTF_Bleuet_2K26_-_Des_mots_pour_contrer_les_maux_-_Cassette_abimee.mp3) ne contient plus qu'une courte bande audio.
>![[BLEUETV5_ArtDR_M_C.mp3]]
>A l'aide de cette bande audio, retrouvez le titre de cette musique.
>
>>**Format de flag** : Titre_musique

### RETEX
Pour ce challenge, on peut tout simplement utiliser Shazam ou un [outil similaire en ligne](https://songfinder.gg/#recognition-form) qui va pouvoir identifier la musique à partir de ce court extrait.
![[BLEUETV5_ArtDR_M_S.png|500]]
On trouve donc le flag **==Chanson_D'Automne==**

---
## Un vers pour la liberté

### Énoncé 
>![[BLEUETV5_ArtDR_V.png|500]]
> Votre grand-père appréciait particulièrement la musique de cet enregistrement parce que certains vers symbolisaient un code employé par la Résistance.
>
>De quel réseau de résistants est-il question ?
>
>>**Format de flag** : Nom_réseau

### RETEX

D'après la [page Wikipédia de cette chanson](https://fr.wikipedia.org/wiki/Chanson_d'automne), les paroles proviennent d'un texte de Paul Verlaine.
![[BLEUETV5_ArtDR_V_W.png|500]]
De plus la chanson de Léo Ferré a été utilisé par Radio Londres pour ordonner aux saboteurs ferroviaires du réseau de résistant **==VENTRILOQUIST==** de faire sauter leurs objectifs. 
On a donc le flag.

---
## L'art et la résistance

### Énoncé 
>![[BLEUETV5_ArtDR_AeR.png|500]]
> « Qu’est-ce que créer, aujourd’hui, dans le monde dans lequel nous vivons ? C’est proposer, de temps à autre, dans un acte de résistance non pas modeste, mais mineur, un signal – un livre, une œuvre d’art – qui émettra une faible lueur vaine et gratuite dans la nuit. » - Jean-Philippe Toussaint
>
> L’art est un acte de résistance qui était souvent utilisé comme moyen de défier l’oppression et de garder vivante l’espérance. Cette [peinture](https://bleuet.aege.fr/files/cb94ec66af163109ac911c01f02eff41/CTF_Bleuet_2K26_-_Lart_et_la_resistance_-_Peinture.png) représente d’une certaine manière la libération de l’oppression en Europe. Elle met en avant ==un artiste== qui a profondément marqué la ==littérature française== et qui a ==annoncé==, malgré lui, une ==opération militaire d’envergure==.
>
>Qui est cet individu et de quelle opération s’agit-il ?
>
>>**Format du flag** : marie_leroux_opération

### RETEX
En utilisant Google Lens sur ce tableau, on trouve [sa page wikipédia](https://fr.wikipedia.org/wiki/Un_coin_de_table).
On y apprend son nom "Un coin de table" mais aussi qui y est représenté.
![[BLEUETV5_ArtDR_AeR_W.png|500]]
On peut remarquer que ==Paul Verlain== est, lui aussi, représenté sur ce tableau. Ce qui correspond avec l'énoncé.
D'ailleurs sur [sa page wikipédia](https://fr.wikipedia.org/wiki/Chanson_d'automne), une légende y est décrite comme annonciateur du début du débarquement de Normandie.
![[BLEUETV5_ArtDR_AeR_WL.png|500]]
Et si on s'intéresse à celle du [débarquement de Normandie](https://fr.wikipedia.org/wiki/D%C3%A9barquement_de_Normandie), on apprend que le début de la bataille de Normandie porte le nom d'Opération ==Overlord==.
![[BLEUETV5_ArtDR_AeR_O.png|500]]
On a donc notre flag : **==paul_verlaine_overlord==**

---
## Résistant dans l'art

### Énoncé 
>![[BLEUETV5_ArtDR_RdA.png|500]]
> Votre grand-père était un fan inconditionnel de l’Art. La vision de Pablo Picasso résonnait particulièrement en lui, notamment parce qu’il pouvait en faire un parallèle plein de sens avec la Résistance : « La peinture n'est pas faite pour décorer les appartements. C'est un instrument de guerre offensive contre l'ennemi ». En fouillant dans la valise, vous découvrez une photo d’un croquis qui vous intrigue, car il semble représenter un ==bâtiment au nord de Lyon==. En effectuant des recherches sur ce dernier, vous découvrez qu’en ==1942==, un ==célèbre résistant==, également artiste dans l’âme, ==ouvre sous son vrai nom une galerie de tableaux modernes==. Cette activité légale lui a servi de ==couverture afin de justifier ses nombreux déplacements dans l’hexagone==.
>
>Quel est le nom de la galerie d’art et comment se nomme le bâtiment illustré sur le croquis ?
>
>>**Format du flag** : nom de la galerie_nom du bâtiment (le flag est attendu en minuscule et sans accent)

### RETEX
On doit donc chercher deux choses, le nom du résistant qui a ouvert la galerie de tableaux modernes comme couverture et le croquis d'un bâtiment au nord de Lyon.

En cherchant les mots clés `résistant artiste galerie couverture` sur Google, on trouve [un site](https://www.telerama.fr/arts-expositions/jean-moulin-le-grand-resistant-qui-ne-resistait-pas-a-l-art-la-double-vie-d-un-collectionneur-2901-7016372.php) qui nous apprend que ce résistant, c'était Jean Moulin et que la galerie, c'est la galerie ==Romanin== à Nice.
Romanin c'est son nom d'artiste, il avait déjà pris l'habitude de signer ses œuvres sous ce nom depuis un certain temps.
Parce que la ville est sous occupation italienne, moins dure que l'occupation allemande. De plus il n'y est pas connu et n'y a aucune attache.
Le cœur de ses activités de résistances se trouve à Lyon puis à Paris.

On a plus qu'à trouver un croquis de jean moulin en lien avec le "nord de Lyon" ou juste au nord de Lyon.

En cherchant les mots clés `Jean Moulin croquis`, le [premier site indexé](https://www.jeanmoulin.fr/DerniersCroquis) nous apprend que jean moulin a toujours aimé dessiner et faire des croquis. On y apprend aussi que son dernier dessin, il le dédie à son bourreau, Klaus Barbie qui, au cours d'un interrogatoire, voulant obtenir des noms et des adresses, lui tend un crayon et du papier. Jean Moulin fait mine d'acquiescer. Il griffonne un instant et rend le papier à Barbie qui le lui arrache des mains avant d'éclater de fureur en y découvrant sa propre caricature.

Je suis d'abord parti du principe que l'on cherchait un croquis d'un bâtiment au nord de Lyon (mais dans Lyon) j'ai donc cherché longtemps et ma seule piste, c'était un croquis de la place Raspail dans lequel on peut voir (en haut à droite) une partie de l'hotel dieu.
![[BLEUETV5_ArtDR_RdA_C1.png|500]]
Mais le problème, c'est que ce bâtiment se trouve dans le centre (voir le sud) de Lyon.
![[BLEUETV5_ArtDR_RdA_C1M.png|500]]

Je change donc d'approche et je commence à rechercher des croquis direct de bâtiment de la main de Jean Moulin.
![[BLEUETV5_ArtDR_RdA_C2.png|500]]
On peut trouver sur le site visité plus tôt un croquis de l'église de Beauregard (Ain).
Et cette église se trouve au nord de Lyon (ce qui me va bien au vu de l'énoncé).
![[BLEUETV5_ArtDR_RdA_C2M.png]]
On peut même retrouver le même point de vue du croquis via [une photo](https://www.google.com/maps/place/%C3%89glise+Saint-Fran%C3%A7ois-d'Assise/@46.000647,4.7531245,3a,75y,356.5h,84.57t/data=!3m7!1e1!3m5!1smCEE82YO0R3aUTxwZcJW9w!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D5.431746036586006%26panoid%3DmCEE82YO0R3aUTxwZcJW9w%26yaw%3D356.5014899390909!7i16384!8i8192!4m6!3m5!1s0x47f49bca84d56a33:0xbc26db636866d535!8m2!3d46.0007241!4d4.7520452!16s%2Fg%2F1213hq7w?entry=ttu&g_ep=EgoyMDI2MDUxMC4wIKXMDSoASAFQAw%3D%3D).

On a donc le flag **==romanin_eglise_beauregard==**

---
## Une oreille pour se souvenir

### Énoncé 
>![[BLEUETV5_ArtDR_O.png|500]]
> Comme votre grand-père, vous avez à cœur le devoir de mémoire. Cet hiver, pour les 10 ans des attentats du 13 novembre, vous êtes allés rendre hommage aux victimes de cette tuerie devant le ==bar « La Belle Équipe »==. À moins de ==150 mètres==, vous tombez sur le ==restaurant== dans lequel vous alliez souvent manger avec votre grand-père, non pas parce qu’il appréciait particulièrement le menu, mais parce que son ==nom== d’enseigne, rappelant un ==moment météorologique de l'année==, était un mot cher à son cœur et à la ==Résistance==. Alors, vous entrez, vous vous installez et vous commandez le ==menu découverte en 5 étapes==.
>
>De quel restaurant s'agit-il ?
>
>>**Format de flag** : Nomdurestaurant

### RETEX

En cherchant `bar La Belle Équipe` sur Google Maps, on tombe sur un bar du 11ᵉ arrondissement de Paris.
![[BLEUETV5_ArtDR_O_M.png|500]]
A environ 100m de ce bar, il y a le restaurant gastronomique **==Automne==**. On peut le vérifier avec les outils de mesures de Google Maps.

Et il comporte dans ses menus le même que celui de l'énoncé.
![[BLEUETV5_ArtDR_0_MM.png|500]]

---
***Les autres parties du CTF :***
 · | · [[Dans la peau d'un resistant]]
 · | · [[L'audace de resister]]
 · | · [[Un devoir de memoire]]
 · | · L'art de resister
 · | · [[Nos partenaires]]