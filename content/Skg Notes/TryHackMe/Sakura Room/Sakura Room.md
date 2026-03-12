---
tags:
  - Chall
  - TryHackMe
  - Osint
---
# Task [2/6]
## Background
>The OSINT Dojo recently found themselves the victim of a cyber attack. It seems that there is no major damage, and there does not appear to be any other significant indicators of compromise on any of our systems. However during forensic analysis our admins found an image left behind by the cybercriminals. Perhaps it contains some clues that could allow us to determine who the attackers were?
>We've copied the image left by the attacker, you can view it in your browser [here](https://raw.githubusercontent.com/OsintDojo/public/3f178408909bc1aae7ea2f51126984a8813b0901/sakurapwnedletter.svg).

## Instructions
>Images can contain a treasure trove of information, both on the surface as well as embedded within the file itself. You might find information such as when a photo was created, what software was used, author and copyright information, as well as other metadata significant to an investigation. In order to answer the following question, you will need to thoroughly analyze the image found by the OSINT Dojo administrators in order to obtain basic information on the attacker.

## Retex
En inspectant l'image on tombe sur : ==SakuraSnowAngelAiko==

# Task [3/6]
## Background
>It appears that our attacker made a fatal mistake in their operational security. They seem to have reused their username across other social media platforms as well. This should make it far easier for us to gather additional information on them by locating their other social media accounts. 

## Instructions
>Most digital platforms have some sort of username field. Many people become attached to their usernames, and may therefore use it across a number of platforms, making it easy to find other accounts owned by the same person when the username is unique enough. This can be especially helpful on platforms such as on job hunting sites where a user is more likely to provide real information about themselves, such as their full name or location information.
>
>A quick search on a reputable search engine can help find matching usernames on other platforms, and there are also a large number of specialty tools that exist for that very same purpose. Keep in mind, that sometimes a platform will not show up in either the search engine results or in the specialized username searches due to false negatives. In some cases you need to manually check the site yourself to be 100% positive if the account exists or not. In order to answer the following questions, use the attacker's username found in Task 2 to expand the OSINT investigation onto other platforms in order to gather additional identifying information on the attacker. Be wary of any false positives!

## Retex
En cherchant vite fait son username sur google on tombe sur un compte [github](https://github.com/sakurasnowangelaiko) et un compte [twiter](https://x.com/sakuraloveraiko).
Sur son github il y a une clé pgp publique, par nature une clé pgp publique peut contenir l'adresse mail de sa créatrice. D'après le site keys.opengpg.org, la clé appartient à l'adresse mail : sakurasnowangel83@protonmail.com 
Sur son compte twitter elle se présente comme AikoAbe3 on peut en déduire son nom et prénom ==Aiko Abe==. 

# Task [4/6]

## Background
>It seems the cybercriminal is aware that we are on to them. As we were investigating into their Github account we observed indicators that the account owner had already begun editing and deleting information in order to throw us off their trail. It is likely that they were removing this information because it contained some sort of data that would add to our investigation. Perhaps there is a way to retrieve the original information that they provided?

## Instructions
>On some platforms, the edited or removed content may be unrecoverable unless the page was cached or archived on another platform. However, other platforms may possess built-in functionality to view the history of edits, deletions, or insertions. When available this audit history allows investigators to locate information that was once included, possibly by mistake or oversight, and then removed by the user. Such content is often quite valuable in the course of an investigation. In order to answer the below questions, you will need to perform a deeper dive into the attacker's Github account for any additional information that may have been altered or removed. You will then utilize this information to trace some of the attacker's cryptocurrency transactions.

## Retex
On retourne sur son compte github et on cherche un repo lié à une crypto-monaie, on trouve le repo ETH avec pour dernier changement la suppression de la ligne 
`stratum://0xa102397dbeeBeFD8cD2F73A89122fCdB53abB6ef.Aiko:pswd@eu1.ethermine.org:4444`
On a donc le type de crypto : ==ethereum== et l'adresse du wallet :==0xa102397dbeeBeFD8cD2F73A89122fCdB53abB6ef==

Via [etherscan.io](https://etherscan.io/address/0xa102397dbeeBeFD8cD2F73A89122fCdB53abB6ef#analytics) on trouve l'historique de ce wallet et il y a bien du changement le 23 janvier 2021 et c'était d'==Ethermine== et l'autre crypto c'était du ==Tether==.

# Task [5/6]

## Background
>Just as we thought, the cybercriminal is fully aware that we are gathering information about them after their attack. They were even so brazen as to message the OSINT Dojo on Twitter and taunt us for our efforts. The Twitter account which they used appears to use a different username than what we were previously tracking, maybe there is some additional information we can locate to get an idea of where they are heading to next?
>
>We've taken a screenshot of the message sent to us by the attacker, you can view it in your browser [here](https://raw.githubusercontent.com/OsintDojo/public/main/taunt.png).

## Instructions
>Although many users share their username across different platforms, it isn't uncommon for users to also have alternative accounts that they keep entirely separate, such as for investigations, trolling, or just as a way to separate their personal and public lives. These alternative accounts might contain information not seen in their other accounts, and should also be investigated thoroughly. In order to answer the following questions, you will need to view the screenshot of the message sent by the attacker to the OSINT Dojo on Twitter and use it to locate additional information on the attacker's Twitter account. You will then need to follow the leads from the Twitter account to the Dark Web and other platforms in order to discover additional information.

## Retex
Le nom du compte twitter c'est ==SakuraLoverAiko==, et d'après un de ces post on a `b2b37b3c106eb3f86e2340a3050968e2` et dans un autre post elle insiste sur les mots deep et past qui fait référénce à un site sur le darknet, en cherchant sur thor on trouve donc le SSID du wifi DK1F-G et via wigle.net on retrouve le SSID : ==84:AF:EC:34:FC:F8==

# Task [6/6]

## Background
>Based on their tweets, it appears our cybercriminal is indeed heading home as they claimed. Their Twitter account seems to have plenty of photos which should allow us to piece together their route back home. If we follow the trail of breadcrumbs they left behind, we should be able to track their movements from one location to the next back all the way to their final destination. Once we can identify their final stops, we can identify which law enforcement organization we should forward our findings to.


## Instructions
>In OSINT, there is oftentimes no "smoking gun" that points to a clear and definitive answer. Instead, an OSINT analyst must learn to synthesize multiple pieces of intelligence in order to make a conclusion of what is likely, unlikely, or possible. By leveraging all available data, an analyst can make more informed decisions and perhaps even minimize the size of data gaps. In order to answer the following questions, use the information collected from the attacker's Twitter account, as well as information obtained from previous parts of the investigation to track the attacker back to the place they call home.

## Retex
En se penchant sur la dernière photo de son compte twitter où elle dit se rendre juste après chez elle on peut voir une tour spéciale. Et cette tour se trouve être d'après Lens, le monument de Washington. Et le plus proche aéroport est le Ronald Reagan Airpot avec pour abréviation ==DCA==. Pour trouver le dernier aéroport escale, on prend l'autre photo, celle de l'hôtel. Il est écrit dessus "First Class Lounge Sakura Lounge" et en cherchant sur google on apprends que c'est au japon. 
On apprend que c'est au Tokyo International Airport avec l'abréviation : ==HND==

Le lac qui est pas loin du trajet en avion est le ==Lake Inawashiro==  et sur la page en onion, la ville noté était ==Hirosaki==.