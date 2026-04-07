---
tags:
  - Osint
  - Chall
  - TryHackMe
---
## 1. TIP-OFF
### Background
>The OSINT Dojo recently found themselves the victim of a cyber attack. It seems that there is no major damage, and there does not appear to be any other significant indicators of compromise on any of our systems. However during forensic analysis our admins found ==an image left behind by the cybercriminals==. Perhaps it contains some clues that could allow us to determine who the attackers were?
>We've copied the image left by the attacker, you can view it in your browser [here](https://raw.githubusercontent.com/OsintDojo/public/3f178408909bc1aae7ea2f51126984a8813b0901/sakurapwnedletter.svg).

### Instructions
>Images can contain a treasure trove of information, both on the surface as well as embedded within the file itself. You might find information such as ==when a photo was created==, what ==software== was used, ==author== and copyright information, as well as other metadata significant to an investigation. In order to answer the following question, you will need to thoroughly analyze the image found by the OSINT Dojo administrators in order to ==obtain basic information on the attacker==.

### Retex
Il faut donc commencer ce challenge en analysant la photo nommé : `sakurapwnedletter.svg`
![[sakurapwnedletter.png|300]]
Cette image a l'air d'une image classique que laisserait un attaquant.
Le binaire derrière veut surement dire quelque chose, mais ça doit être une phrase sans importance du style "une image, c'est beau, mais ce qu'elle renferme encore plus".
En inspectant la page tout bêtement, on a accès à plein d'information, mais la plus importante, c'est que le `.svg` a été créé via l'outil `Inkscape` et a été exporté à partir du chemin : `/home/SakuraSnowAngelAiko/Desktop/pwnedletter.png`. Son nom d'origine était donc `pwnedletter.png` mais surtout, elle était présente sur le bureau de l'utilisateur **==SakuraSnowAngelAiko==**

---
## 2. RECONNAISSANCE
### Background
>It appears that our attacker made a fatal mistake in their operational security. They seem to have ==reused their username across other social media platforms== as well. This should make it far easier for us to gather additional information on them by locating their other social media accounts. 

### Instructions
>Most digital platforms have some sort of username field. Many people become attached to their usernames, and may therefore use it across a number of platforms, making it easy to find other accounts owned by the same person when the username is unique enough. This can be especially helpful on platforms such as on job hunting sites where a user is more likely to provide real information about themselves, such as their full name or location information.
>
>A quick search on a reputable search engine can help find matching usernames on other platforms, and there are also a large number of specialty tools that exist for that very same purpose. Keep in mind, that sometimes a platform will not show up in either the search engine results or in the specialized username searches due to false negatives. In some cases you need to manually check the site yourself to be 100% positive if the account exists or not. In order to answer the following questions, use the attacker's username found in Task 2 to expand the OSINT investigation onto other platforms in order to gather additional identifying information on the attacker. Be wary of any false positives!
### Retex

On va donc devoir rechercher les comptes avec le même username qu'à la question précédente.
Via l'outil `sherlock` on en trouve une petite trentaine.
![[SR_sherlock.png|500]]
On y reconnait un profil plutôt lié à l'informatique et au code. Le site qui nous intéresse donc le plus dans ce résultat, c'est ==Github==.
![[SR_github.png|500]]
Son [compte](https://github.com/SakuraSnowAngelAiko) n'est plus du tout actif, mais un nom se dégage de ce compte : ==Aiko==.
Sur son compte, un repos attire mon regard : ==PGP==. Il contient une clé publique et d'après le site keys.openpgp.org, elle appartient bien a notre attaquant.
![[SR_Public.png|500]]
Et en prime, on a son adresse mail : **==sakurasnowangel83[@]protonmail[.]com==**
Essayons de trouver son nom/prénom via ses autres comptes.
Les résultats de sherlock ne nous donne pas grand-chose d'intéressant de ce côté, essayons donc de chercher directement sur Google.
![[SR_GG.png|500]]
On retrouve très facilement son [twitter](https://x.com/SakuraLoverAiko).
![[SR_2acc.png|500]]
Et dessus, il a posté un message en donnant son compte secondaire nommé ==AikoAbe3==. On peut en déduire son nom et prénom **==Aiko Abe==**.
Et ce qui appuie notre hypothèse, c'est que c'est vraiment un nom et prénom commun au Japon.
![[SR_prénom.png|500]]
![[SR_Nom.png|500]]

---
## 3. UNVEIL
### Background
>It seems the cybercriminal is aware that we are on to them. As we were investigating into their Github account we observed indicators that the account owner had already begun ==editing and deleting information== in order to throw us off their trail. It is likely that they were removing this information because it contained some sort of data that would add to our investigation. Perhaps there is a way to retrieve the original information that they provided?

### Instructions
>On some platforms, the edited or removed content may be unrecoverable unless the page was cached or archived on another platform. However, other platforms may possess built-in functionality to view the ==history of edits, deletions, or insertions==. When available this audit history allows investigators to locate information that was once included, possibly by mistake or oversight, and then removed by the user. Such content is often quite valuable in the course of an investigation. In order to answer the below questions, you will need to perform a deeper dive into the attacker's ==Github== account for any additional information that may have been altered or removed. You will then utilize this information to trace some of the attacker's ==cryptocurrency== transactions.

### Retex
On va donc devoir retourner sur son compte Github et chercher ses dernières modifications.
On va donc dans l'onglet "Repositories" et on les trie par "Last updated". Le tout premier qui remonte est "IO" mais il n'est pas vraiment intéressant parce que c'est juste un simple test de sa part.
Par contre, le deuxième est nommé ==ETH== et c'est aussi le nom d'une crypto.
![[SR_eth.png|500]]
`stratum://0xa102397dbeeBeFD8cD2F73A89122fCdB53abB6ef.Aiko:pswd@eu1.ethermine.org:4444`
La dernière modification a eu pour but de remplacer la ligne rouge par la ligne verte.
En gros, il a caviardé la ligne parce qu'elle contenait l'adresse de son wallet **==ethereum==** : **==0xa102397dbeeBeFD8cD2F73A89122fCdB53abB6ef==**.

Allons voir ce qu'il s'est passé sur ce wallet le 23 Janvier 2021 via le site [etherscan.io](https://etherscan.io/address/0xa102397dbeeBeFD8cD2F73A89122fCdB53abB6ef#analytics).
![[SR_ethermine.png|500]]

Il a donc reçu un paiement d'**==Ethermine==** et a pour habitude de les échanger en **==Tether==**
![[SR_Tether.png|500]]

---
## 4. TAUNT 
### Background
>Just as we thought, the cybercriminal is fully aware that we are gathering information about them after their attack. They were even so brazen as to message the OSINT Dojo on ==Twitter== and taunt us for our efforts. The Twitter account which they used appears to use a different username than what we were previously tracking, maybe there is some additional information we can locate to get an idea of ==where they are heading to next==?
>
>We've taken a screenshot of the message sent to us by the attacker, you can view it in your browser [here](https://raw.githubusercontent.com/OsintDojo/public/main/taunt.png).
>![[SR_Taunt.png|500]]
### Instructions
>Although many users share their username across different platforms, it isn't uncommon for users to also have alternative accounts that they keep entirely separate, such as for investigations, trolling, or just as a way to separate their personal and public lives. These alternative accounts might contain information not seen in their other accounts, and should also be investigated thoroughly. In order to answer the following questions, you will need to view the screenshot of the message sent by the attacker to the OSINT Dojo on Twitter and use it to locate additional information on the attacker's Twitter account. You will then need to follow the leads from the Twitter account to the ==Dark Web== and other platforms in order to discover additional information.
### Retex
On va donc retourner sur le compte twitter **==SakuraLoverAiko==**
En regardant un peu ses posts, on trouve quelques posts sympa comme celui-ci ou le hacker insiste sur les mots ==Deep== et ==Paste==.
![[SR_DP.png|500]]
Et celui-ci, où il a l'air de donnée une adresse `b2b37b3c106eb3f86e2340a3050968e2`.
![[SR_Wifi.png|500]]
Il voulait donc qu'on cherche un site sur le darkweb nommé ==DeepPaste==.
*(Ce site n'existe plus, mais c'est un équivalent de pastbin)*
![[SR_DPV3.png|500]]
En recherchant l'adresse qu'il avait donné, on trouve des noms de wifi, des ssiDs et des MDP.
Ce qui nous intéress, c'est donc le SSID du wifi de sa maison ==DK1F-G==, on va donc faire une recherche via ce dernier sur wigle.net.
![[SR_BSSID.png|150]]
On retrouve donc le BSSID suivant : **==84:AF:EC:34:FC:F8==**.

---
## 5. HOMEBOUND
### Background
>Based on their tweets, it appears our cybercriminal is indeed heading home as they claimed. Their Twitter account seems to have plenty of ==photos== which should allow us to piece together their route back home. If we follow the trail of breadcrumbs they left behind, we should be able to track their movements from one ==location== to the next back all the way to their final destination. Once we can identify their final stops, we can identify which ==law enforcement organization== we should forward our findings to.
### Instructions
>In OSINT, there is oftentimes no "smoking gun" that points to a clear and definitive answer. Instead, an OSINT analyst must learn to synthesize multiple pieces of intelligence in order to make a conclusion of what is likely, unlikely, or possible. By leveraging all available data, an analyst can make more informed decisions and perhaps even minimize the size of data gaps. In order to answer the following questions, use the information collected from the attacker's Twitter account, as well as information obtained from previous parts of the investigation to track the attacker back to the place they call home.
### Retex
On va donc essayer de retrouver sa localisation.
Son premier tweet est une photo qui va nous aider puisqu'elle dit qu'elle part de là pour aller à la maison.
![[SR_blossom.png|500]]
Sur cette photo en fond, on peut y voir le ==washington monument==.
![[SR_map.png|500]]
On peut donc en conclure qu'elle n'était pas très loin de l'aéroport Donald Reagan (**==DCA==**).

Ensuite, on peut prendre son post qui parle de sa dernière escale : 
![[SR_JAL.png|500]]
On y voit d'inscrit "First Class Lounge Sakura Lounge", en cherchant sur Google on apprend que c'est au Japon au Tokyo International Airport avec l'abréviation : **==HND==**

Maintenant, on peut s'attaquer au dernier post :
![[SR_mappy.png|500]]
Via ce qu'on a trouvé précédemment, on peut croire que l'attaquant vient du Japon, et cette photo le confirme puisqu'on le retrouve au Japon sur Google map :
![[SR_lac.png|500]]
Le lac qu'on voit sur la carte est le **==Lake Inawashiro==**  et sur le DeepPaste, la ville notée était **==Hirosaki==**.

L'attaquant est donc un japonais qui visitait l'Amérique.

---
## Synthèse 
- **Identité** : Aiko Abe, username `SakuraSnowAngelAiko`, Twitter `SakuraLoverAiko`.
- **Email** : `sakurasnowangel83@protonmail.com`, via sa clé PGP sur GitHub.
- **Crypto** : wallet Ethereum `0xa102397dbeeBeFD8cD2F73A89122fCdB53abB6ef`, recevant des paiements via Ethermine et échangeant en Tether.
- **Infra locale** : Wi‑Fi `DK1F-G` (BSSID `84:AF:EC:34:FC:F8`) via DeepPaste et wigle.net.[](https://www.secjuice.com/tryhackme-sakura-room-walkthrough/)​
- **Localisation / trajectoire** :
    - Départ de la zone de Washington D.C. (aéroport DCA).
    - Escale / lounge à Tokyo (HND).
    - Retour au Japon (Lake Inawashiro + ville Hirosaki).