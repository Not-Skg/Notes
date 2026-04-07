---
tags:
  - Chall
  - Osint
  - Osint4fun
  - AdventOfOsint
---
## Énoncé [1/2]
>Cette photo, prise lors d'une cérémonie, montre l'un des signataires.
>![[24 Decembre.png|200]]
>Quels sont les noms des trois personnes qui étaient présentes ?
>>*Format de réponse :* Farsi Haddad Mansour

## RETEX [1/2]
Après un rapide Google LENS, on apprend que c'est le drapeau égyptien.

Sur le panneau derrière : 
- ICARDA : International center for agricultural research in the dry areas
- CGIAR : Consultative Group on International Agricultural Research
On cherche donc une cérémonie de signature d'un papier sur l'agriculture en Égypte.

Via la recherche suivante : `ICARDA EGYPT signatories` on trouve l'[article](https://icarda.org/media/news/icarda-and-egypt-unite-new-agreement-boost-research-sustainable-water-management)
![[24 Decembre.2.png|500]]
On a le même panneau, mur, boite de mouchoir et petit drapeau sur le bureau. C'est donc bien le bon moment/endroit.
Toujours via l'article, il y a ces trois personnes de présent :
- [Hani **==Sewilam==**](https://en.wikipedia.org/wiki/Hani_Sewilam)
- [Vinay **==Nangia==**](https://icarda.org/about-us/our-team/vinay-nangia)
- Walid **==Hakiki==**
## Énoncé [2/2]
>La guerre en ==Syrie a contraint l'ICARDA à prendre une mesure inédite== : alors que des pays comme le Burundi, le Cameroun ou le Mali n'étaient concernés que par un unique « échantillon », un autre pays en totalisait dix.
>
>Quel est le nom complet, dans sa langue d'origine, de la personne ayant collecté plusieurs « échantillons » de ce pays ? Et combien « d'échantillons » provenaient de Syrie ?
>>*Format de réponse :* Γεώργιος Νικόλαος Παβλος 1597

## RETEX [2/2]
En cherchant : `Syria forced ICARDA to take an unprecedented measure` j'ai trouvé l'article suivant : https://pulitzercenter.org/stories/how-syrias-war-threatened-middle-easts-food-future

On y comprend donc que ICARDA a réalisé le premier retrait de l'histoire du Svalbard Global Seed Vault en Norvège, récupérant 80% de sa collection dupliquée là-bas, complété par des copies d'autres institutions pour atteindre 98%. Cette banque arctique, conçue comme "disque dur de secours" pour l'humanité, a permis de régénérer les semences actives au Liban, où ICARDA s'est relogé dans la Bekaa Valley.

Indice 
>Il faut exporter tous les retraits effectués par l'ICARDA ce qui peut se faire facilement sur https://seedvault.nordgen.org/search. Une fois les données traitées, on trouve un seul pays avec 10 retraits. On peut alors consulter ces retraits facilement sur le site de l'ICARDA comme avec cette url : https://grs.icarda.org/accessions/?IG=65890.

En téléchargeant le fichier demandé on trouve le Guatemala
![[24 Decembre.3.png|500]]
Maintenant il faudrait trouver le nom de la personne dans sa langue d'origine.
En cherchant [plus d'info sur un des dépôts](https://grs.icarda.org/accessions/?IG=4410), on a le nom : S.M. Bukasov
du cyrillique : **==Сергей Михайлович Букасов==**
Et d'après le fichier de tout à l'heure, il y a **==7496==** samples provenant de Syrie.
