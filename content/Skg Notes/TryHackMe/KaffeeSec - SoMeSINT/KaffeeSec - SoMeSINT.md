#TryHackMe #Chall #Osint 

# Task [2/7]
## Background
>_You are Aleks Juulut, a private eye based out of Greenland. You don't usually work digitally, but have recently discovered OSINT techniques to make that aspect of your job much easier. You were recently hired by a mysterious person under the moniker "H" to investigate a suspected cheater, named Thomas Straussman._
>
>_After a brief phone-call with his wife, Francesca Hodgerint, you've learned that he's been acting suspicious lately, but she isn't sure exactly what he could be doing wrong. She wants you to investigate him and report back anything you find. Unfortunately, you're out of the country on a family emergency and cannot get back to Greenland to meet the deadline of the investigation, so you're going to have to do all of it digitally. Good luck!_

## Retex
> Who hired you?

==ks{H}==

> Who are you investigating? (ks{firstname lastname})

==ks{thomas straussman}==

# Task [3/7]

## Instruction 
>How exciting! Through talking to people who know Thomas, you've found out that he has a very guessable online handle: `tstraussman`. With this handle, we can find his social media accounts, and start off this room.
>
>The overall process for finding information from social media accounts starts with finding the social media accounts themselves. Finding social media accounts from names or emails can be automated through a process called enumeration. This is usually done with CLI tools or scripts, but you can get similar effects with Google dorking. [Here](http://tryhackme.com/room/googledorking) is a room on Google dorking; it's great reading material before you attempt this task and also includes a cheat sheet that comes in handy.
>
>_**Disclaimer:** Before starting, I will preface this by saying the only places these accounts are found on are Twitter and Reddit. Please **do not** try to investigate further out-of-scope, as you will both meet a dead end and be snooping on accounts not involved with this CTF at all. I am not responsible for any actions/interactions made with an account outside of the sockpuppets created for this CTF. As a general rule, we're collecting PASSIVE information - there's no interacting directly with these accounts._

## Retex
> What is Thomas' favorite holiday?

D'après la description de son [compte twitter](https://x.com/tstraussman) c'est à noël

==christmas==

> What is Thomas' birth date?

https://www.reddit.com/user/Tstraussman/comments/kh1pzg/big_thank_you/
On a donc d'après [ce site](https://trevorfox.com/reddit-post-date-finder/) les dates : 
- **UTC Date:** Sun, Dec 20, 2020, 08:32:57 PM UTC
- **Local Date:** Sun, Dec 20, 2020, 09:32:57 PM GMT+1
Et il a 30 ans donc ==12–20–1990==

> What is Thomas' fiancee's Twitter handle?

Toujours d'après la description twitter on a le nom Francesca, donc si on cherche dans ses réponses on trouve le [compte](https://x.com/FHodgelink/with_replies) de sa fiancé 

==@FHodgelink==

> What is Thomas' background picture of?

==Buddha==

# Task [4/7]

## Instruction

> On [[Spiderfoot]]
> Click on "New Scan". In the "Scan Target" field, type in "Thomas Straussman" or "tstraussman"; then, under `By Use Case`, ensure that you checked the `All` option. Finally, press run.
> Looking at the results, you can figure out which are false positives by filtering out anything that isn't related to `Reddit` or `Twitter`.
> If you find a Twitter account that leads to `shadowban.eu`, click on the link.
> If you can't find anything related to Twitter, go to `Settings --> Account Finder` and set the highlighted option to `False`.

## Retex
> What was the source module used to find these accounts?

==sfp_accounts==

> Check the shadowban API. What is the value of "search"?

==ks{1346173539712380929}==

# Task [5/7]

## Instruction
>Now that you have Thomas' Reddit and Twitter accounts, you can do some cool stuff!
>At this point, consider downloading a reverse search extension for your browser, my favorite is [[RevEye]], which lets you choose from a handful of great reverse search engines, or use all of them simultaneously.
>[Chrome](https://chrome.google.com/webstore/detail/reveye-reverse-image-sear/keaaclcjhehbbapnphnmpiklalfhelgf) / [Firefox](https://addons.mozilla.org/en-US/firefox/addon/reveye-ris/)
>There are a few key types of information that we want to find from socials:
> - Images of places that contain clear identifiers like buildings, signs, monuments, or landmarks (For IMINT/GEOMINT purposes)
> - Clear images of the subject's face (For reverse image searches and possibly finding more accounts/sources of info)
> - Clear images of the subject in a group of people (Family photos, friend groups, other information that can give context to their relationship with the group)
> - Personal information in their bio, or other personal data from their profile itself (Where they grew up, currently live, went to school, etc..)
> - Relevant posts that may contain information on their whereabouts or personal habits (Do they smoke? Drink? Go to bars often? Love to vacation to specific places? All this information can help in an investigation.)
> 
> Since you have gotten most useful information from Thomas' Twitter, it's time to "pivot" to his fiancee's account.
> What personal information can you find?
> NOTE: If you get stuck on the first flag, consider two things:
> - You can reverse image search landscapes / locations and most likely get a result
> - You can look at the source of the website (ctrl + shift + c, then click on the image) and try to find some metadata from the image.

## Retex 
>Where did Thomas and his fiancee vacation to?

D'après ce [post](https://x.com/FHodgelink/status/1341170334783864833) c'était en Allemagne et la description nous dit que c'est à ==Koblenz, Germany==

> When is Francesca's Mother's birthday? (without the year)

D'après son dernier tweet : ==December 25th==

> What is the name of their cat?

D'après le premier tweet sur lequel on était tombé de la fiancé ==Gotank==

> What show does Francesca like to watch?

Elle à retweet 2 post lié à un show, l'un de ==90DayFiancee== et l'autre de Cardi B qui demande si ses fan ont aimer son show facebook mais le premier est le bon

# Task [6/7]

## Instruction 
>Now that we've gathered intel from Thomas and Francesca's Twitters, lets move to another platform - Reddit.
>For the sake of this investigation, we're going to be using Reddit in two different ways:
>- Use the old version (http://old.reddit.com/) for wayback machine purposes
>- Use the new version (https://www.reddit.com/) for other purposes (later on)
>
>First, you're going to want to install the **WayBackMachine** extension for your browser (you don't _**need**_ it, but it'll make your life much easier).
>- [Get it for Firefox](https://addons.mozilla.org/en-US/firefox/addon/wayback-machine_new/)
>- [Get it for Chrome](https://chrome.google.com/webstore/detail/wayback-machine/fpnmgdkabkmnadcjpehmlllkndpkmiak?hl=en-US)
>
>Using Reddit's old site, navigate to Thomas' profile. Right click anywhere on the page and click on Wayback machine --> All Versions. You will see a calendar that shows all of the saved versions of the site, click through and take a look at each saved version (in this case there should be none).
>So it hasn't been saved yet... Nothing out of the ordinary, right?
>Next, go to Thomas' birthday post. Repeat the steps to find the first version of the site and..... Voila!
>We've discovered a coworker, which is another source of intel for us! But the question is... **_how much_** _intel?_

## Retex 
> What is the name of Thomas' coworker?

En cherchant à la bonne [date](https://web.archive.org/web/20201221174825/https://old.reddit.com/user/Tstraussman/comments/kh1pzg/big_thank_you/) on trouve que son collègue s'appelle ==Hans Minik==

> Where does his coworker live?

Dans la description de son compte reddit il y a 
 "Nuuk is the best!! 🇬🇱🇬🇱🇬🇱"
 et son collègue y vit donc ==Nuuk, Greenland==

> What is the paste ID for the link we found? (flag format)

Si on change un peu la date sur la WBM on finit par trouver ce [poste](https://web.archive.org/web/20210210022607/https://old.reddit.com/user/minikhans/comments/kqas4d/disappointed/) et dedans il y a le lien https://pastebin.com/szcELGMY on a donc l'id pour le pastebin : ==ks{szcELGMY}==

> Password for the next link? (flag format)

==ks{ww4ju}==

> What is the name of Thomas' mistress?

==Emilia Moller==

> What is Thomas' Email address?

straussmanthom@mail.com

# Task [7/7]
==Fin==
