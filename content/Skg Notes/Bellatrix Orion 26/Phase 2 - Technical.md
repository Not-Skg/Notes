---
tags:
  - Osint
  - CTF
  - Bellatrix
  - wpscan
---
![[Bellatrix_Illustration.png]]
>[!info] Notes
>Voici les retex de tous les challenges de cette deuxième journée de l'opération Bellatrix !
>Ils étaient un peu plus technique que ceux de la première phase, mais toujours aussi réaliste et immersif.
>Je pense que le seul point négatif c'est que certains flag était un peu trop "guessy" a mon goût.
>Aussi, je n'ai pas pu finir le challenge "Déclenchement immédiat" à temps, j'avais la page et toute les infos mais vu que je ne peux travailler sur le CTF que le soir, je n'ai malheureusement pas eu assez de temps pour casser le mot de passe requis.
>Et les indice ont été juste ce qu'il fallait pour m'achever, je n'aime pas en utiliser habituellement, mais là j'en étais carrément dégouté. La plupart des indices paraphrasaient juste les énoncés, quand ils ne tombaient pas sous le sens. Le seul vraiment utile, c'était le masque pour casser le bcrypt du dernier challenge.
>
>Le Comcyber a quand même continué sur une très bonne lancé !
>![[P2_Challs.png]]

---
## Surveillance du réseau social (intrigue principale)
### Mission
>Vous devez maintenant recueillir des preuves techniques de l'attaque informationnelle pour l'attribuer. En surveillant le réseau social du primo-diffuseur découvert la veille (sur [https://amstramgram.net/](https://amstramgram.net/)), vous pouvez découvrir ses relations. Trouvez des informations exploitables pour poursuivre votre investigation.
>
>**Actions requises:**
>>- Identifier le compte du primo-diffuseur sur le réseau social
>>- Analyser ses publications et interactions récentes
>>- Cartographier les relations avec d'autres comptes influents
>>- Documenter les preuves pour attribution
>>- ==Trouver un contact qui permettra de commencer à cartographier ses relations==

### RETEX
On va donc essayer de trouver un contact proche du primo diffuseur. Pour ce faire, on va fouiller son profil sur le réseau social Amstramgram.
![[P2_rs_mv.png|500]]
On a de la chance, il vient juste de faire un post pour féliciter sa soeur pour son anniversaire de mariage. Il va même jusqu'à la tagguer, ce qui nous évite d'avoir à la chercher dans les abonnements de Marc.
![[P2_rs_sp.png|500]]
On a donc un contact : ===Sophie Pichon== de naissance Veylanne, professeure de mathématique.

---
## La piste de l'organisation (intrigue principale)
### Mission
>Maintenant que vous avez découvert une relation de Marc Veylanne, utilisez ces informations pour découvrir si vous pouvez trouver des liens, qu'il entretiendrait lui-même ou ses relations, avec des entreprises en utilisant le registre des sociétés aquilonniennes disponible sur [http://aquilonie-info-societe.com/](http://aquilonie-info-societe.com/). Votre objectif est de trouver des preuves de son implication, directe ou indirecte, dans des structures suspectes.
>
>**Actions requises:**
>>- Accéder au registre des sociétés aquilonniennes
>>- Rechercher le nom de Marc Veylanne ou ses associés
>>- Analyser les résultats pour identifier des entreprises suspectes
>>- Extraire les détails des entreprises (adresse, dirigeants, activité)
>>- Documenter les liens entre Marc Veylanne et ces entreprises
>>- Trouver le site incriminé

### RETEX
Pour chercher les possibles liens entre le primo diffuseur et des sociétés, on peut tout simplement rechercher son identité sur le registre de sociétés aquiloniennes.
![[P2_orga_mv.png|500]]
Sans grande surprise, rien ne lui est rattaché directement.
On va donc creuser du côté d'une de ses relations (sa soeur).
![[P2_orga_sp.png|500]]
Cette fois-ci on trouve 5 résultats.
En creusant un peu on apprend que sa soeur serait gérante majoritaire d'une SARL de 2 personnes.
![[P2_statuts_peche_fraiche.pdf]]

![[P2_rapport_annuel_2022_peche_fraiche.pdf]]
Et cette deuxième personne n'est jamais nommé.
De plus, en 2022, ils auraient fait un chiffre d'affaire de 10M€, ce qui est énorme pour une entreprise de cette taille.
Le rapport annuel nous permet de récupérer un lien vers le site vitrine de cette société ==peche-fraiche.boutique==

---
## Fouiller le site (intrigue principale)
### Mission
>Ce site de vente en ligne semble tout à fait légitime, mais il peut vous orienter vers d'autres éléments techniques. Trouvez des ==liens vers un prestataire technique== dans les pages présentes sur le site. Votre objectif est d'identifier des indices cachés ou des références à des services externes utilisés par le site.
>
>**Actions requises:**
>>- Explorer toutes les pages du site de vente en ligne
>>- Analyser le code source des pages pour trouver des références techniques
>>- Rechercher des liens ou mentions de prestataires techniques (hébergement, développement, etc.)
>>- Identifier des éléments suspects ou inhabituels dans les métadonnées
>>- Documenter les preuves pour une analyse approfondie

### RETEX
Comme précisé dans l'énoncé, le site paraît légitime. 
![[P2_vitrine.png|500]]
Nous allons donc l'analyser pour essayer de trouver des traces d'un prestataire technique.
Mon premier réflexe est d'aller sur la page à propos : 
![[P2_vitrine_presta.png|500]]
Et ça a payé, on a donc le nom de la personne qui a réalisé ce site : ==Helene Volquoffe==. On a même un lien vers son site/portfolio personnel : https://quoffe-telephonie.tech/.

---
## Nos réalisations ... (intrigue principale)
### Mission
>Vous êtes à présent sur le site du prestataire technique du site de vente. En explorant son portefeuille de réalisation, vous pourrez trouver une galaxie de sites qui méritent une exploration approfondie. Votre objectif est d'identifier des sites suspects ou liés à des opérations de désinformation. On souhaite en particulier ==comprendre si derrière l'opération de désinformation on trouve un ou des commanditaires==.
>
**Actions requises:**
>>- Explorer le portefeuille du prestataire technique
>>- Analyser les sites listés pour identifier des motifs suspects
>>- Trouver un site qui implique directement Mercure
>>- Documenter les sites pertinents pour une investigation ultérieure
>>- Identifier des éléments techniques communs entre les sites

### RETEX
On va donc éplucher le site du presta pour essayer de trouver de potentiel client puissant qui pourrait être le commanditaire derrière la campagne de désinformation.
![[P2_presta.png|500]]
Outre le site vitrine de la SARL, cette prestataire a aussi développé un des sites de désinformation rencontré lors de la phase 1.
De plus, elle a aussi développé le site personnel / officiel du président de Mercure, Agrid Sokjon : ==agrid-sokjon.ovh==.

---
## La piste du financement (intrigue principale)
### Mission
>Vous recevez une indication d'un service partenaire sur un possible financement de plusieurs opérations de désinformation par le biais d'un site de vente en ligne. Un article semble suspect et pourrait servir à commander, rémunérer ou déclencher des attaques informationnelles. Votre objectif est d'analyser cet article et d'identifier des mécanismes de financement ou de coordination.
>
>**Actions requises:**
>>- Identifier l'article suspect sur le site de vente en ligne
>>- Analyser le contenu de l'article pour repérer des codes ou instructions cachés
>>- Passer une commande sur le site pour voir si cela mène à un rebond interessant.
>>- ==Découvrir le slogan de la milice !==

***ATTENTION*** Dans le cadre des épreuves d’OSINT et de cybersécurité de l’Opération Bellatrix, certaines étapes peuvent nécessiter de simuler une commande ou une interaction en ligne (ex : création de compte, formulaire de contact, etc.).

>[!warning] Consignes strictes à respecter 
>Utilisez des informations fictives : 
>- Nom : Exemple : "Jean Dupont" ou "Marie Martin". 
>- Adresse postale : Inventez une adresse plausible (ex : "123 Rue de la République, 75000 MercureVille, Pays: Mercure"). 
>- Numéro de téléphone : Utilisez un numéro fictif (ex : 01 23 45 67 89).
>
>Adresse email : Utilisez **une adresse fonctionnelle en mesure de recevoir des emails** . Idéalement une adresse email temporaire.
### RETEX
Après m'être créer une nouvelle identité numérique, je me suis créer un compte sur le site vitrine en suivant le conseille d'un service partenaire.
![[P2_vitrine_puppet.png|500]]

Suite à ça, je me suis mit a éplucher les articles, j'ai commencé mes recherches par les articles avec un prix incohérent (trop cher - trop peu cher), j'ai aussi retenu les articles avec des noms intrigants.

Le premier qui a attiré mon oeil est le "chapeau parti".
![[P2_vitrine_cap.png|500]]
J'ai pensé un moment que son prix était trop élevé et que son nom pouvait être un sous entendu comme le parti d'opposition, et que donc, si l'on l'achetais, alors on montrerais que l'on est du camp de ceux qui ont mené la campagne de désinformation.
Le problème, c'est que la description paraît trop propre pour ça.

Mon regard a donc divagué sur cette combinaison politique avec la même idée en tête : 
![[P2_vitrine_combi.png|500]]
Mais pour les mêmes raisons, j'ai finit par le délaisser.

Au final, ce qui m'a vraiment intrigué, c'est le nom de cet article : "L'art de maîtriser l'invisible"
![[P2_vitrine_veste.png|500]]
Et la description a confirmé mon doute : 
![[P2_vitrine_veste_desc.png|500]]
Rien que le fait qu'on puisse la commander lorsqu'elle est noté hors stock est douteux. Mais le fait qu'en plus il est noté qu'elle sert a sécuriser des données sensibles et les transporter sans trace. Tous ces signaux nous pousse a croire que quelque chose se cache derrière.

Étant donné que le commanditaire de la campagne de désinformation supposément lié à ce site vitrine est lié a Mercure, je décide de commander cet article en me faisant passer pour un habitant de Mercure.
![[P2_vitrine_commande.png|500]]
Et lors de la réception de la validation de commande, on m'offre un "bon de réduction" : AQUILONIE-UNIE.ORG.
Ce bon de réduction à le pattern d'un nom de domaine d'un site web.
![[P2_milice.png|500]]
Ma déduction était bonne, c'est littéralement le site caché de la milice.
On y trouve même leur slogan en page d'accueil : ==Vigilance, Honneur, Victoire==

---
## Analyse WHOIS des domaines suspects (intrigue principale)
### Mission
>Vous commencez a avoir une vision globale des structures ayant contribué directement ou indirectement à l'attaque informationnelle. Vous pouvez maintenant utiliser le service [https://aqui-whois.com/](https://aqui-whois.com/) qui vous donnera des informations précieuses sur les domaines ayant participé à l'attaque informationnelle. Peut-être y-trouverez vous les premiers éléments techniques d'attribution ? Votre objectif est de recueillir des preuves techniques pour identifier les acteurs derrière ces domaines.
>
>**Actions requises:**
>>- Accéder au service [https://aqui-whois.com/](https://aqui-whois.com/)
>>- Rechercher les domaines identifiés comme suspects
>>- Analyser les informations WHOIS (propriétaire, date de création, contact)
>>- Identifier des motifs communs entre les domaines (même propriétaire, même registrar)
>>- Identifier registar et date commune format DDMMYYYY

### RETEX
Maintenant qu'on a de bon soupçon sur les liens entre les sites, il faut le prouver.
Pour ce faire, on va analyser les enregistrement des sites de désinformation, du site du président de Mercure et du site de la milice.
![[P2_whois_gnm.png|500]]
![[P2_whois_mercurien.png|500]]
![[P2_whois_pres.png|500]]
![[P2_whois_milice.png|500]]
Leur point commun c'est qu'ils ont tous été créé. le ==02/02/2024== et plus grosse coincidence, ils ont tous le même registrar : ==Njalla==.
Sachant qu'en plus le même prestataire s'est occupé du développement de la plupart de ces sites, ça prouve que ce n'est pas juste une succession de coincidences, mais bien des engrenages de la campagne de désinformation en cours.

## Découverte de preuves cachées (optionnel)
### Mission
>Le site de vente en ligne pourrait encore contenir des ==preuves permettant de relier Marc Veylanne et la milice d'Aquilonnie==. En exploitant les fichiers robots.txt et sitemap.xml, vous pourrez peut-être accéder à des dossiers cachés. Votre objectif est de trouver des éléments compromettants liés à cette collaboration.
>
>Découvrez un ==script php== qui semble permettre d'accéder à davantage d'éléments ensuite.
>
>**Actions requises:**
>>- Accéder aux fichiers robots.txt et sitemap.xml du site
>>- Analyser les chemins et dossiers interdits ou cachés
>>- Explorer les dossiers identifiés pour trouver des preuves
>>- Rechercher des documents ou fichiers liés à Marc Veylanne ou à la milice
>>- Documenter les preuves pour une analyse approfondie

### RETEX
En fouillant chacun de ces sites, plus en détaille, on se rend compte qu'il ont tous le même robots.txt (ou presque). Dedans, la prestataire y a systématiquement laissé sa signature et un lien vers son portfolio.

Et sur le site vitrine de la boutique, le robots.txt bloque l'accès aux fichiers spécifiques : /==sauvegardes_reduc.php== et /htpasswd.
![[P2_vitrine_robot.png|500]]
Et lorsque l'on se rend sur peche-fraiche.boutique/sauvegardes_reduc.php, on trouve une page de connexion, ce qui laisse penser qu'une partie est caché.
![[P2_vitrine_php.png|500]]

---
## Les Wordpress d'Hélène Volquoffe (optionnel)
### Mission
>Les informaticiens prennent des habitudes. En explorant plus attentivement les caractéristiques techniques des sites réalisés par Hélène Volquoffe, vous trouverez un élément technique commun qui apportera une preuve supplémentaire. Votre objectif est d'identifier une ==signature technique récurrente== dans ses réalisations de sites Wordpress.
>
>**Actions requises:**
>>- Lister tous les sites connus réalisés par Hélène Volquoffe
>>- Analyser le code source et les technologies utilisées sur chaque site
>>- Identifier des motifs techniques récurrents (librairies, structures de code, commentaires)
>>- Documenter les éléments communs pour établir une signature technique
>>- Vérifier si cette signature est présente sur d'autres sites suspects
>
>Ce flag peux comporter un tiret.

### RETEX
En signature récurrente on pourrais prendre le robots.txt qui est littéralement identique a chaque fois, mais on va aller plus loin.
Pour gagner du temps et éviter de réinventer la roue à chaque projet, certains devs réutilisent des plugins qu'ils ont eux même créé. Ça leur permet de ne pas partir de zéro sur chaque projet et d'avoir une certaine base maitrisé.
![[P2_wpscan.png|500]]
En utilisant un outil comme `wpscan` on peut rapidement analyser les wordpress et identifier les points communs.
En l'occurence, la même version de wordpress est utilisé a chaque fois et un certain plugin ==my-plugin== est utilisé sous la version ==1.6.3==. C'est un plugin développé par la presta, ce qui prouve encore une fois le lien entre ces sites.

---
## Réutilisations de code sur les domaines (optionnel)
### Mission
>Par commodité, certains codes sont parfois réemployés à différents endroits. En analysant les domaines sur lesquels Hélène Volquoffe est intervenue ou aurait pu intervenir, vous obtiendrez des éléments techniques supplémentaires pour les relier. Votre objectif est d'==identifier des réutilisations de code ou de structures communes entre ces domaines==.
>
>**Actions requises:**
>>- Lister tous les domaines connus liés directement ou indirectement à Hélène Volquoffe
>>- Analyser les enregistrement de chaque domaine avec un outil comme `dig`
>>- Documenter les éléments réutilisés pour établir des liens techniques

### RETEX
Pour continuer dans cette approche de trouver des liens entre les sites, nous pouvons utilisé l'outil `dig`.

![[P2_dig_txt.png|500]]
On s'aperçoit que les sites de la presta ont tous la même infra.
![[P2_dig_gg.png|500]]
On peut aussi retrouver le code de vérification Google Search Console : ==RkxBR3tNYXJ0eSBCT0xBTn0==.
C'est la preuve technique ultime que tous ces sites sont liés au même proprio, car même infra DNS/OVH et même validation GSC.

---
## La temporalité de l'attaque (optionnel)
### Mission
>==Recomposer la chronologie précise de l’attaque informationnelle.== Retracer l’ordre exact et les horodatages des posts publiés lors de l’attaque informationnelle sur les plateformes Global News MAQ et Amstramgram. Le flag sera la succession des heures et minutes (format YYYYMMDDHHmm) séparés par des _ de chaque publication, dans l’ordre suivant :
>1. Commentaire du primo-diffuseur sur Global News MAQ 
>2. Premier post sur Amstramgram 
>3. Deuxième post sur Amstramgram
>
>**Actions requises :**
>>1. Identifier les posts concernés
>
>Sur Global News MAQ :
>Rechercher les posts liés à l’attaque (mots-clés : désinformation, Mercure, etc.). Noter les URLs et horodatages (heure/minute) de chaque publication.
>
>Sur Amstramgram :
>Utiliser la recherche avancée ou les archives pour retrouver les posts suspects. Extraire les heures exactes de publication.
>
>>2. Ordonner les posts par chronologie
>
>Lister les posts dans l’ordre strict indiqué ci-dessus. Vérifier que les horodatages sont cohérents (ex. : pas de chevauchement temporel illogique)

### RETEX
Pour ce challenge, il n'y a pas de technique spéciale, il faut juste chercher à la main.
![[P2_temp1.png|500]]
Le premier commentaire du primo-diffuseur sur Global News Maq était à ==202603221259==
![[P2_temp_2_3.png|500]]
Le premier post de Marc sur Amstramgram et le deuxième a ce propos ont été publié respectivement à ==202603240847== et ==202603241130==.

---
## Déclenchement immédiat (optionnel)
### Mission
>Votre objectif est de vous connecter à l’interface interne qui gère les sauvegardes des bons de réduction pour y découvrir le nom de l’opération de désinformation associée. Cette interface pourrait être un outil de gestion de campagnes marketing, une base de données client, ou un système de fidélisation détourné à des fins trompeuses.
>
>**Actions requises :**
>>- Identifier l’interface cible
>>- Accéder à l’interface
>>- Tester les identifiants par défaut (ex. : admin/admin, guest/guest) ou utiliser des informations d’accès récupérées (ex. : fuites, archives).
>>- ==Extraire le nom de l’opération==
>>- Identifier le libellé exact de l’opération de désinformation (ex. : "Opération_Nuage_Gris").
>>- Capturer des preuves (captures d’écran, extraits de base de données).

### RETEX
On va enfin utiliser la page /htpasswd. du site vitrine de la boutique et l'interface de connexion sur sauvegardes_reduc.php.
![[P2_vitrine_htpasswd.png|500]]
Cette première page contient `mveylanne:$2y$12$rENXhbwnj/o4ZqPg9w0EOe0ZuSb.VDLrJeb7MAdbK7xFjcglNA0DC`.
C'est les credentials a utiliser pour se connecter.
le username est : `mveylanne`, `$2y$` signifie que c'est en bcrypt et `$2y$12$rENXhbwnj/o4ZqPg9w0EOe0ZuSb.VDLrJeb7MAdbK7xFjcglNA0DC` le hash du mot de passe.

Il faut donc casser le hash pour pouvoir se connecter sur la page caché.
Vu que je n'ai pas beaucoup de temps, _(je rappelle que je travaille sur le CTF le soir après le travail)_, je vais chercher plus d'information sur Marc pour essayer de m'aider à construire un mot de passe type qu'il pourrait utiliser.

![[P2_marc_info.png|500]]
Sur le blog de Marc on peut trouver sa date d'anniversaire : 1996.
J'ai donc croisé les doigts et lancé des hashcat pour tenter de casser le mdp en espérant qu'il y a sa date de naissance dedans : 
![[P2_hashcat.png|500]]
Le script a tourné toute la nuit et n'a rien trouvé, le problème c'est que je dois aller au travail, je ne pourrais donc pas finir ce challenge par faute de temps.
Si j'avais su qu'il fallait casser un mot de passe, j'aurais lancé un script depuis le début avec plus de possibilité.

> Le lendemain, le mdp a été révélé : VLAN2024
> Je n'ai aucune idée de pourquoi 2024, du coup ça veut dire que j'était sur une fausse piste avec son anniversaire.
> ![[P2_hidden.png|500]]
> Le nom de l'opération était donc : ==OPE-Briser-Les-Ailes==.

---

[[Phase 1 - Analysis]] · | · Les autres phases du CTF · | · [[Phase 3 - Osint]] 
•