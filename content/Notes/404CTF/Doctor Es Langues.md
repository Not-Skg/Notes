---
tags:
  - Chall
  - Osint
---
## Énoncé
>En farfouillant bien, vous devriez trouver le petit compte d'un chercheur qui utilise cette image en bannière. 
>![[404_26_DES_B.jpg]]
>En étudiant son CV, vous trouverez qu'il maîtrise une langue à un niveau "confirmé”. 
>Quelle est cette langue ?
> 
>>Format : 404CTF{klingon}
>
> Règle d'or en OSINT, n'interagissez PAS avec les personnes qui font l'objet de vos recherches. Ce n'est pas nécessaire.

## Énoncé
Vu que la photo de l'énoncé parait vraiment banale, on peut commencer par regarder les méta-données via un outil comme exiftool :
![[404_26_DES_ET.png|500]]
Je pense que le message est passé... c'est la bannière du [compte Twitter de SadiQuatrenot](https://x.com/SadiQuatrenot/with_replies).
![[404_26_DES_TX.png|500]]
On peut donc retrouver facilement son compte Twitter.
![[404_26_DES_TP.png|500]]
Et en cherchant un peu, on peut trouver un post dans lequel il partage son CV et son [blog](https://www.blogger.com/profile/15995011235130208479) par la même occasion.
Étant donné que le post Twitter mentionne une mise à jour du CV et qu'on peut le retrouver sur le blog, je vais directement chercher si une archive du blog existe sur la [WBM](https://web.archive.org/web/20260507223535/https://quiestsadiquatrenot.blogspot.com/).  
![[404_26_DES_WBM.png|500]]
On y retrouve une version très légèrement différente, avec la mention de l'apprentissage du malais.
On a donc le flag : **==404CTF{malais}==**