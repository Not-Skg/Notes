---
tags:
  - Chall
  - Osint
  - Osint4fun
  - AdventOfOsint
---
## Énoncé
>On ne va pas se mentir, le Père Noël sous-traite la livraison à de pauvres lutins au statut d'auto-entrepreneur, qui en plus doivent se payer leurs propres traineaux !
>
>Ce qui devait arriver arriva... et l'un des lutins a fait un burn out. On sait qu'il est parti du bureau officiel du Père Noël, mais il n'arrive plus à parler... Tout juste a-t-il tendu un bout de papier contenant ceci :
>```
>246 ➡️ 1919.48  
>124 ➡️ 659.14  
>177 ➡️ 983.98
>```
>Ce pauvre Père Noël a fait appel à nous et à notre nouvel outil !
>
>Quelles grandes villes (plus de 100 000 habitants) devait-il livrer (dans l'ordre, dans l'orthographe locale).
>>*Format de réponse :* Berlin Paris Ryton-on-Dunsmore

## RETEX
Ce texte sur le bout de papier me fait penser à une localisation, donc soit à Longitude et Latitude ou alors à Degré et kilomètre.
Les créateurs du chall étant la team Oscar Zulu, je cherche le nom du nouvel outil qu'ils ont créé : [rhinomap](https://rhinomap.com).

Cet outil va nous permettre de tracer des lignes d'un nombre de kilomètres définit suivant un angle précis.

Vu qu'on parle d'une fugue de la part des lutins, on va partir du principe que notre point de départ, c'est le bureau officiel du père noël c'est [ici](https://www.google.com/maps/place/Santa+Claus+Office/@66.5442717,25.8427471,16.58z/data=!4m14!1m7!3m6!1s0x442b4e7e543e9979:0xd7f9b9e4341d7ed3!2sVillage+du+Père+Noël!8m2!3d66.5441465!4d25.8474678!16s%2Fm%2F026b3cp!3m5!1s0x442b4e7feaec782d:0xc8d2f43ead0feab9!8m2!3d66.5434901!4d25.8479321!16s%2Fg%2F1thw592f?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D). 

En utilisant Rhinomap on a donc un chemin : ![[18 Decembre.png]]

On passe donc par les trois grandes villes suivantes : **==Edinburgh Amsterdam Aix-en-Provence==**

