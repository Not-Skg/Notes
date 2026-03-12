---
tags:
  - Chall
  - Osint
  - Osint4fun
  - AdventOfOsint
---
# Énoncé [1/2]
>This photo, taken during a ceremony, shows one of the signatories.
>
>![[24 Decembre.png|200]]
>
>What are the surnames of the three people who were present?

## RETEX
Après un rapide LENS :
- Drapeau égyptien

Sur le panneau derrière : 
- ICARDA : International center for agricultural research in the dry areas
- CGIAR : Consultative Group on International Agricultural Research
On cherche donc une cérémonie de signature d'un papier sur l'agriculture en égypte

Dork : 
`ICARDA EGYPT signatories` --> [article](https://icarda.org/media/news/icarda-and-egypt-unite-new-agreement-boost-research-sustainable-water-management)
![[24 Decembre.2.png]]
On a le même panneau, mur, boite de mouchoir et petit drapeau sur le bureau. C'est donc bien le bon moment/endroit.
Il y a donc ces trois personnes de présent:
- [Hani Sewilam](https://en.wikipedia.org/wiki/Hani_Sewilam)
- [Vinay Nangia](https://icarda.org/about-us/our-team/vinay-nangia)
- [Walid Hakiki]()
Flag : ==Sewilam Nangia Hakiki==

# Énoncé [2/2]
>The war in Syria forced ICARDA to take an unprecedented measure: while countries such as Burundi, Cameroon or Mali were concerned by only a single « sample », another country accounted for ten.
>
>What is the full name, in the original language, of the person who collected several « samples » from that country? And how many « samples » came from Syria?

En cherchant : `Syria forced ICARDA to take an unprecedented measure` j'ai trouvé l'article suivant : https://pulitzercenter.org/stories/how-syrias-war-threatened-middle-easts-food-future

On y comprend donc que ICARDA a réalisé le premier retrait de l'histoire du Svalbard Global Seed Vault en Norvège, récupérant 80% de sa collection dupliquée là-bas, complété par des copies d'autres institutions pour atteindre 98%. Cette banque arctique, conçue comme "disque dur de secours" pour l'humanité, a permis de régénérer les semences actives au Liban, où ICARDA s'est relogé dans la Bekaa Valley.

Indice 
>You need to export all the withdrawals carried out by ICARDA, which can easily be done on https://seedvault.nordgen.org/search. Once the data has been processed, you will find only one country with 10 withdrawals. You can then easily consult these withdrawals on the ICARDA website, for example using this URL: https://grs.icarda.org/accessions/?IG=65890.

En téléchargeant le fichier demandé on trouve le Guatemala
![[24 Décembre.3.png]]

Maintenant il faudrais trouer le nom de la personne dans le langage d'origine.
En cherchant [plus d'info sur un des dépôts](https://grs.icarda.org/accessions/?IG=4410) on a le nom : S.M. Bukasov
du cyrillic : ==Сергей Михайлович Букасов==
Et d'après le fichier de tout à l'heure il y a ==7496== samples provenant de Syrie.
