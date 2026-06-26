---
tags:
  - Chall
  - Osint
  - GEOINT
---
## Énoncé
>Quand vous étiez jeune, vous accompagniez régulièrement votre père chercheur durant ses déplacements. 
>Mais un repas dans un hôtel en particulier brûle en vos souvenirs : un peu avant le réveillon, en plein confinement, vous y aviez mangé "l'entrecôte de bœuf cuite au barbecue, accompagnée des légumes du potager du Roi". 
>Mais vous avez beau vous creuser la cervelle, impossible de retrouver le nom du lieu !
>Seules quelques images vous reviennent par flash quand vous essayez de vous souvenir. 
>Parviendrez-vous à retrouver le nom de l'hôtel de ce restaurant, et le prix du plat ? 
>![[404_26_EG_V.mp4]]
>>Format : 404CTF{plaza_athenee-12}

## RETEX
Je n'ai malheureusement pas réussi à résoudre complètement ce challenge, mais toute la partie GEOINT était correcte et m'a permis d'identifier l'établissement recherché.

Je trouve la démarche intéressante, je me permets donc de la partager malgré tout.

Avant toute chose, analysons quelques arrêts sur image de la vidéo fournie dans l'énoncé.
![[404_26_EG_AI1.png]]
Le premier arrêt sur image nous montre un logo avec l'intitulé **« Relais & Châteaux »**.

![[404_26_EG_AI2.png]]
Le deuxième arrêt sur image nous montre une vue sur le bord d'un lac ou d'un étang. On peut déjà relever plusieurs éléments caractéristiques :
- des constructions humaines sur la rive opposée ;
- quelques arbres atypiques qui dépassent nettement de la canopée ;
- une berge présentant une forme en arc de cercle.

Ces éléments pourront servir plus tard pour confirmer une localisation.
![[404_26_EG_AI3.png]]
Ce troisième arrêt sur image apporte davantage d'informations. On distingue clairement la tour Eiffel au loin, un bâtiment présentant une forme sphérique sur sa droite ainsi qu'une colline boisée au premier plan, sur laquelle se trouvent plusieurs bâtiments de tailles variées.

On peut donc raisonnablement limiter nos recherches aux environs de Paris.

D'après [Wikipédia](https://fr.wikipedia.org/wiki/Relais_%26_Ch%C3%A2teaux), **Relais & Châteaux** est une association regroupant des hôtels et restaurants de luxe indépendants. Le logo présenté correspond parfaitement à celui visible sur le premier arrêt sur image.
![[404_26_EG_RCP.png]]
Il existe toutefois un nombre important d'établissements Relais & Châteaux autour de Paris. Il va donc falloir exploiter les autres indices afin de réduire la zone de recherche.

Je décide alors de partir du troisième arrêt sur image dans le but de déterminer l'emplacement exact depuis lequel la vidéo a été prise.
![[404_26_EG_EM.png]]
En explorant les environs de Paris sur Google Earth tout en gardant la tour Eiffel comme point de repère principal, on finit par retrouver un point de vue identique à celui visible dans la vidéo.
Je n'ai jamais identifié avec certitude le bâtiment sphérique visible sur la capture, mais ce détail n'était finalement pas nécessaire pour la suite de l'investigation.
Les encadrés rouges permettent de comparer les éléments caractéristiques du paysage et de confirmer qu'il s'agit bien du même point de vue.
![[404_26_EG_ML.png]]
Un élément attire immédiatement l'attention : un établissement Relais & Châteaux se trouve à proximité immédiate du point de vue identifié.

De plus, un étang est également présent juste à côté. Si notre hypothèse est correcte, il devrait correspondre au second arrêt sur image.
![[404_26_EG_EM-1.png]]
En faisant le tour de l'étang à l'aide de Google Maps, on retrouve exactement le même point de vue que celui visible sur la vidéo.
Là encore, les encadrés rouges permettent de mettre en évidence les éléments communs entre les deux images.

Nous pouvons désormais confirmer avec un très haut niveau de confiance que nous sommes au bon endroit.
L'établissement recherché est donc **Les Étangs de Corot**, qui fait à la fois hôtel et restaurant.
À partir de là, je me suis mis à la recherche du plat mentionné dans l'énoncé.

Les cartes disponibles sur Google Maps ne contenaient malheureusement aucune trace du menu recherché.
J'ai ensuite exploré les photos associées à l'établissement sur Google Maps, sans succès.

Comme l'énoncé précise que le repas a eu lieu peu avant Noël, durant le confinement, il était peu probable que le menu soit encore présent sur les supports actuels. Je me suis donc tourné vers le [site](https://www.etangs-corot.com/) officiel de l'établissement puis vers ses archives sur la Wayback Machine.

Malheureusement, c'est à ce moment-là que je me suis bloqué.

---
Pour terminer le challenge, il fallait en réalité élargir les sources consultées.
Je remercie une nouvelle fois Kubow pour son excellent write-up :

[https://kubo-security.github.io/ctf/404ctf-2026/enfancegourmande.html](https://kubo-security.github.io/ctf/404ctf-2026/enfancegourmande.html)

Dans les grandes lignes, la suite consistait à :
- retrouver le compte Facebook de l'établissement ;
- identifier une publication datant de la période comprise entre le 30 octobre et le 15 décembre 2020 ;
- récupérer un lien Shopify mentionné dans cette publication ;
- consulter [les archives Wayback Machine de cette boutique](https://web.archive.org/web/20201114205533/https://etangs-de-corot.myshopify.com/) Shopify.

On y retrouvait alors le plat mentionné dans l'énoncé :
> « Entrecôte de bœuf cuite au barbecue, accompagnée des légumes du Potager du Roi »

ainsi que son prix : **60 €**.

Avec le recul, mon erreur a été de rester focalisé sur le site officiel et ses archives. Une fois l'établissement identifié, il fallait penser à élargir les sources et consulter également les réseaux sociaux, qui sont souvent beaucoup plus riches lorsqu'il s'agit de retrouver des menus temporaires ou des communications liées à des événements particuliers.