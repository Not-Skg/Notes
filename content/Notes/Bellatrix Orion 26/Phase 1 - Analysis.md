---
tags:
  - Osint
  - Bellatrix
  - Disarm
  - Scrapp
  - Chall
---
![[content/Notes/Bellatrix Orion 26/Bellatrix_Illustration.png]]

>[!info] Notes
>Voici les retex de tous les challenges de cette première journée de l'opération Bellatrix !
>Ils étaient tous sympa, pas très difficile et plutôt réaliste.
>Le Comcyber a fait fort avec ce CTF !
>![[content/Notes/Bellatrix Orion 26/P1/P1_Challs.png]]

---
## Un message d'alerte (intrigue principale)
### Mission
>Vous venez de recevoir une information par un canal sécurisé, une simple capture d'écran, lacunaire et réalisée rapidement, apparemment le post aurait ensuite été supprimé. Cette publication qui a circulé sur les réseaux, désinforme sur des sujets concernant l'armée Française. 
>**Votre objectif:** ==retrouver le blog mentionné dans cette publication==. 
>Il faut commencer à dérouler la pelotte avec peu d'indices mais votre contact a insisté sur l'importance de la mission. "Opération Bellatrix" a-t-il mentionné.
>![[content/Notes/Bellatrix Orion 26/P1/P1_alerte.png|500]]
>**Actions requises:**
>>- Analyser la capture d'écran de la publication initiale
>>- Accéder au blog et noter son addresse
>>- Être vigilant face aux leurres et fausses pistes

### RETEX
Pour ce premier challenge, il n'y a pas vraiment de défi. La capture d'écran présente une sorte de commentaire. Un commentaire discréditant le rafale, et par la même occasion la France.
Il présente aussi un domaine en affirmant qu'on pourrait y retrouver plus d'information.

Il suffit donc de chercher `global-news-maq` sur un moteur de recherche.
![[content/Notes/Bellatrix Orion 26/P1/P1_alerte_gnmi.png|500]]
On trouve rapidement le blog en question, qui se trouve être un wordpress.
Son adresse complète est donc la suivant : ==global-news-maq.info==.

![[content/Notes/Bellatrix Orion 26/P1/P1_gnm.png|500]]
Le blog se présente comme une source d'informations sérieuses et vérifiées en provenance d'Aquilon. En regardant les extrait des articles disposé en première page, un détail nous choque : tous les articles ont un point de vue anti-France ou produit Français.

---
## La vidéo du sauvetage (intrigue principale)

### Mission:
>Vous êtes maintenant sur le blog identifié.  Ce blog comporte de nombreux articles qui visent à décridibiliser l'armée Francaise. 
>Votre prochain objectif est crucial: ==localiser une vidéo montrant le sauvetage d'une pilote==. 
>Le contenu visuel ne sera pas suffisant pour remonter la piste, il faut découvrir la provenance de cette video ! 
>Nous **devons** comprendre ce qui s'est réellement passé.
>>**Attention flag accessible sur le blog dès 08h00**
>
>**Actions requises:**
>>- Explorer méthodiquement le blog à la recherche de liens vidéo
>>- Identifier les liens principaux
>>- Identifier en particulier le site de provenance de la video en observant le code source HTML de la page.

### RETEX
Cette fois-ci, nous devons découvrir l'origine d'une vidéo.
Pour trouver cette vidéo nous pouvons faire une recherche du mot clé "vidéo" sur le blog.
![[content/Notes/Bellatrix Orion 26/P1/P1_vid.png|500]]
Seul deux résultats apparaissent.
Le premier ne comporte pas de vidéo malgré le titre de l'article>.
Le [deuxième](https://global-news-maq.info/massacre-golfe-gascogne-crime-guerre/) par contre en contient une.
![[content/Notes/Bellatrix Orion 26/P1/video.mp4]]
Cette vidéo montre 2 avions de chasse se percutant, une pilote s'échouer en mer puis se faire sortir de l'eau par deux marin sur ce qui ressemble à un bateau de pêche.
L'article qui présente cet extrait comme la suite d'un "acte de barbarie inqualifiable" dans lequel l'armée française aurait mitraillé trois chalutiers Aquiloniens via leur Rafales, sans sommation ni avertissement.
Les mots utilisés sont dur, menaçant et fortement exposés (gras + majuscule)
![[content/Notes/Bellatrix Orion 26/P1/P1_vid_art.png|500]]
En inspectant la page, plus précisément le code source qui implémente la vidéo, on apprends que la vidéo est hébergé sur un autre site.
![[content/Notes/Bellatrix Orion 26/P1/P1_vid_art_2.png|500]]
Et cet autre autre site (==passion-video.tech==) se présente comme un forum de vidéo généraliste avec des catégories Tech, Nature, Voyages et "Militaire", ce qui explique la présence de cette vidéo sur ce site.
En cherchant "vidéo.mp4", qui est le nom du fichier vidéo hébergé sur ce site et réutilise sur le site "d'information", on trouve une publication, qui met en avant cette vidéo avec le titre "Drôle de pêche - Récupération d'une pilote de Rafale".
![[content/Notes/Bellatrix Orion 26/P1/P1_vid_pass.png|500]]
Pour l'instant rien de choquant. Mais sous ce post, un commentaire nous attire l'oeil.
![[content/Notes/Bellatrix Orion 26/P1/P1_vid_pass_comm.png|500]]
Il indique que la vidéo semble avoir été repris vers un autre site. 
Ce qui signifie qu'un autre site s'en sert aussi, probablement dans un article.

---
## Au service d'une cause (intrigue principale)

### Contexte 
>Dans le cadre de votre enquête, la vidéo spécifique a été identifiée comme ayant été reprise et rediffusée sur un ou plusieurs sites tiers. Cette pratique, souvent utilisée dans des campagnes de désinformation ou de manipulation, peut influencer la perception du public. En fouillant le forum pour y trouver le fil de discussion dans lequel cette vidéo a été postée, votre mission est d'identifier le ou les sites ayant ensuite également repris cette vidéo et de comprendre les motivations derrière cette reprise. La tonalité du discours est également un élément notable afin de comprendre le déroulement de l'attaque informationnelle.

### Mission 
>Votre objectif est de ==retracer la diffusion de cette vidéo sur des plateformes tierces.== Vous devrez identifier un site ayant repris la vidéo, analyser le contexte de sa rediffusion, et déterminer les raisons possibles derrière cette action. 
>Cette analyse permettra de comprendre si la vidéo a été utilisée à des fins malveillantes ou si sa reprise s'inscrit dans une stratégie de manipulation de l'information.
>
>Actions requises:
>>- Rechercher des occurrences de cette vidéo sur d'autres plateformes ou sites web.
>>- Analyser le contexte de la reprise : titre, description, commentaires, et audience cible.
>>- ==Déterminer les motivations possibles== derrière la reprise (désinformation, propagande, gain financier, etc.).
> 
>**Importance:** Comprendre la diffusion et la recontextualisation de contenus multimédias est essentiel pour lutter contre la désinformation. En identifiant les sites ayant repris la vidéo et en analysant leurs motivations, vous contribuerez à démanteler les réseaux de manipulation et à protéger l'intégrité de l'information.

### RETEX

D'après le commentaire trouvé dans le dernier challenge, la vidéo a aussi été repris sur le site : ==le-mercurien-victorieux.info==
![[content/Notes/Bellatrix Orion 26/P1/P1_cause_mercurien.png|500]]
Ce site se définit comme un média d'information "mercurien".
La vidéo est elle aussi utilisé dans un article décrivant un crime de guerre dans le Golfe de Gascogne, il y décrit la même chose que l'autre article, avec des éléments de langage choquant, et mot en gras, et toujours cette même façon de dénigrer l'armée Française.
![[content/Notes/Bellatrix Orion 26/P1/P1_cause_mercurien_art.png|500]]

---
## Rétablir la véracité des faits (intrigue principale)
### Contexte
> Dans un environnement saturé d'informations, les campagnes de désinformation se propagent rapidement, semant le doute et la confusion. Pour contrer ces attaques, des débunkages officiels sont régulièrement publiés par des autorités compétentes ou des organisations spécialisées. Cependant, ces débunkages ne sont efficaces que s'ils sont relayés et accessibles au public. Votre mission est d'identifier les relais de ces débunkages officiels et d'utiliser les canaux d'information officiels pour apprendre à distinguer les informations fiables des fausses.
> 
>**Attention ce flag est accessible dès 10h30**

### Mission
>Votre objectif est de ==localiser les débunkages officiels== publiés en réponse à des campagnes de désinformation spécifiques. Vous devrez identifier les canaux officiels qui relayent ces débunkages, analyser leur crédibilité, et comprendre comment ils contribuent à la lutte contre la désinformation. 
>Cette mission vous permettra de développer des compétences essentielles pour évaluer la fiabilité des sources d'information.
>
>**Actions requises:**
>>- Identifier le commentateur qui debunk la prétendue attaque sur des civils.
>>- Identifier les autorités ou organisations officielles responsables de la publication de débunkages.
>>- Rechercher les canaux de communication utilisés pour diffuser ces débunkages (sites web, réseaux sociaux, communiqués de presse, etc.).
>>- Analyser la crédibilité et la réputation des sources identifiées.
>
>**Importance:** Savoir identifier et utiliser les relais de débunkage officiel est crucial pour lutter contre la désinformation. En maîtrisant ces compétences, vous contribuerez à protéger l'intégrité de l'information et à renforcer la résilience de la société face aux attaques informationnelles.

### RETEX
En lisant les commentaires sous cette publication, on trouve un certain ==SoldatFr== qui explique que cet article est "un tissu de mensonge", et que l'information a été debunké sur le site "debunk-officiel-fr.site".
![[content/Notes/Bellatrix Orion 26/P1/P1_veracite.png|500]]
Il explique aussi que la pilote en question est "lynx", la pilote que l'on cherche.
Ça impliquerai donc, si tant est que cette information est vrai, que 2 médias d'informations promouvoient de la désinformation, et incite les gens a hair l'armée Française.
Ce site de debunk, est un site gouvernementale, le Ministères Français l'utilise pour debunker des campagnes de désinformations.
Les informations données par le commentaire sont confirmées dans un communiqué officiel du Ministère des armées.
![[content/Notes/Bellatrix Orion 26/P1/P1_veracite_ministere.png|500]]

---
## Identifier le primo-diffuseur (intrigue principale)

### Contexte
>Une attaque informationnelle a été qualifiée et observée, révélant une campagne coordonnée de désinformation visant à manipuler l'opinion publique. Les analyses préliminaires ont permis de cartographier la propagation des fausses informations, mais l'identité du primo-diffuseur — c'est-à-dire le compte ou la source à l'origine de la diffusion initiale — reste inconnue. Identifier ce primo-diffuseur est crucial pour comprendre l'origine de l'attaque, ses commanditaires potentiels, et pour prendre des mesures ciblées afin de neutraliser la menace.

### Mission 
>Votre objectif est de ==retracer la diffusion initiale de l'attaque informationnelle== pour identifier le primo-diffuseur. Vous devrez analyser les données disponibles (publications, partages, interactions) pour déterminer quel compte ou quelle source a été le premier à diffuser le contenu malveillant. Cette identification permettra de remonter à la source de l'attaque et de comprendre les mécanismes de sa propagation.
>
>**Actions requises:**
>>- Analyser les données temporelles des publications et des partages pour identifier les premiers signes de diffusion.
>>- Retracer les interactions entre les comptes pour déterminer la chaîne de propagation.
>>- Identifier les comptes ou sources ayant publié le contenu malveillant en premier.
>>- Vérifier l'authenticité et l'historique des comptes suspects pour confirmer leur rôle dans l'attaque.
>>- Documenter les findings et les preuves permettant d'identifier le primo-diffuseur.
>
>**Importance:** L'identification du primo-diffuseur est une étape clé dans la lutte contre les attaques informationnelles. En remontant à la source de la désinformation, vous contribuerez à démanteler les réseaux de manipulation et à prévenir de futures campagnes. Cette mission est essentielle pour protéger l'intégrité de l'information et pour renforcer la résilience face aux attaques informationnelles.

### RETEX
Généralement, les primo-diffuseurs d'information narguent les média d'information en expliquant qu'il avait toujours les informations avant eux. Je vais donc chercher dans les commentaires des différents articles de ces sites de "désinformation".
![[content/Notes/Bellatrix Orion 26/P1/P1_primo1.png|500]]
![[content/Notes/Bellatrix Orion 26/P1/P1_primo2.png|500]]
![[content/Notes/Bellatrix Orion 26/P1/P1_primo3.png]]
![[content/Notes/Bellatrix Orion 26/P1/P1_primo4.png]]

Ici, celui qui correspond parfaitement à ces critères, c'est un certain ==Marc Veylanne==.
Il nous donne même un lien vers son [blog personnel](https://verite-veylanne.blog/) et un autre vers son [Amstramgram](https://amstramgram.net/profile.php?username=veylanne), réseau social très en vogue chez les jeunes.

![[content/Notes/Bellatrix Orion 26/P1/P1_primo_Ams.png|500]]
En inspectant son profil sur Amstramgram, on apprend qu'il avait bien communiqué sur ce "faux" évènement avant la sortie des articles sur les média d'informations rencontrés plus tôt.
Et après une recherche avancé sur le réseau social, on comprends qu'il est le premier de la plateforme a en avoir parlé, un peu comme un lanceur d'alerte.

---
## Trop beau pour être vrai (optionnel)

### Contexte
>Dans le cadre d'une opération de désinformation sophistiquée, ==un blog malveillant a été identifié comme vecteur d'attaques informationnelles==. Ce blog utilise une tactique d'usurpation de marque en reproduisant le logo d'une plateforme de news légitime et reconnue. Cette stratégie vise à semer le doute sur la légitimité des informations diffusées et à manipuler l'opinion publique.

### Mission
>Votre objectif est d'==identifier la plateforme de news originale dont le logo a été copié==. Cette identification est cruciale pour évaluer l'ampleur de la campagne de désinformation et pour informer les autorités compétentes.
>**Actions requises:**
>>- Examiner attentivement le logo présent sur le blog suspect.
>>- Effectuer une analyse comparative avec les logos de plateformes de news connues.
>>- Identifier les éléments distinctifs et les similitudes entre les logos.
>>- Déterminer la plateforme originale dont le logo a été usurpé.
>
> **Importance:** Cette mission est essentielle pour contrer les attaques informationnelles et pour protéger l'intégrité des sources d'information légitimes. En identifiant la plateforme originale, vous contribuerez à démanteler la campagne de désinformation et à restaurer la confiance du public dans les médias fiables.

### RETEX
Le premier site de désinformation rencontré est le global-news-maq. Commençons nos recherche par lui.
Son logo est le suivant : 
![[content/Notes/Bellatrix Orion 26/P1/P1_logo1.png]]
En faisant une recherche inversé avec un outil classique comme Google Lens, on trouve ce logo : 
![[content/Notes/Bellatrix Orion 26/P1/P1_logo2.png|300]]
Qui s'avère être le logo du media canadien ==globalnews.ca==.
C'est le même logo, les couleurs ont juste été inversé. D'ailleurs, l'outil utilisé pour inversé les couleurs n'est pas très propre puisque l'on peut encore voir les traces de rouge sur le bas du chevron du logo du site de désinformation. Le mot "maq" a aussi été ajouté

---
## (Dé)-Crédibiliser l'information (optionnel)
### Contexte
> Dans le cadre d'une opération de désinformation, ce blog malveillant publie des articles contenant des pseudo-avis de faux experts. Ces experts, présentés comme des autorités dans leur domaine, sont en réalité des personnages fictifs créés pour donner une apparence de légitimité aux informations diffusées. Votre mission est de vérifier l'authenticité des experts cités et **d'identifier les indices** montrant que l'un d'eux n'existe pas.

### Mission 
>Votre objectif est d'analyser les articles du blog et de ==déterminer si l'expert cité dans l'un d'eux est un faux expert==. Vous devrez identifier les indices qui révèlent son inexistence et documenter vos findings pour contrer la campagne de désinformation.
>
>>**Actions requises:**
>>- Lire attentivement les articles du blog et identifier les experts cités.
>>- Rechercher des informations sur les experts cités dans des sources fiables et vérifiées.
>>- Analyser les profils des experts pour détecter des incohérences ou des anomalies.
>>- Identifier les indices qui montrent que l'expert cité n'existe pas ou est fictif ou que l'expertise est médiocre.
>
> **Importance:** Cette mission est cruciale pour démasquer les tentatives de manipulation de l'opinion publique et pour protéger la crédibilité des véritables experts. En identifiant les faux experts, vous contribuerez à démanteler la campagne de désinformation et à restaurer la confiance dans les sources d'information légitimes.

### RETEX
Pour décrédibiliser l'armée française, ce média a fait appel a un expert. Cet expert "révèle des défaillances majeures" sur le Griffon, véhicule tactique blindé de l'armée française.
Tout cela se passe dans un [article exclusif](https://global-news-maq.info/expertise-accablante-sur-le-griffon-nouveau-blinde-de-larmee-francaise/).
![[content/Notes/Bellatrix Orion 26/P1/P1_expert.png|500]]
Un rapport d'expertise de 2 pages y est même affiché.
![[content/Notes/Bellatrix Orion 26/P1/P1_doc.pdf]]
L'expert en question serait "Dr. Pierre Martin", ingénieur en armement diplômé de l'école de l'armement du cap d'Adge et consultant DPLG.
![[content/Notes/Bellatrix Orion 26/P1/P1_expert_caduq.png|500]]
Le problème avec cette présentation c'est que ==consultant DPLG== c'est pour les architectes donc rien a voir avec l'armement. L'expert n'en est donc pas un d'office, et le rapport d'expertise est caduc.

---
## Cyber-physique ! (optionnel)
### Contexte
>Dans le cadre de la lutte contre la désinformation, le framework DISARM (Disinformation Analysis and Risk Management framework) est un outil essentiel pour caractériser et analyser les attaques informationnelles. Ce framework permet de classer les tactiques, techniques et procédures (TTP) utilisées par les acteurs malveillants pour manipuler l'information. Votre mission est d'==appliquer ce framework pour détecter et identifier la tactique spécifique utilisée dans le dernier post publié à 17h sur le blog de désinformation concernant l'incident==.
>
>**Attention ce flag est accessible dès 17h00**

### Mission
>Votre objectif est d'analyser le dernier post publié sur un blog de désinformation et d'utiliser le framework DISARM pour caractériser l'attaque informationnelle. Vous devrez identifier les éléments clés du post (contenu, ton, sources citées, etc.) et les comparer avec les tactiques définies dans le framework DISARM. Cette analyse permettra de ==déterminer la tactique spécifique utilisée== et de documenter les preuves soutenant cette classification.
>
>**Actions requises:**
>>- Lire et analyser le contenu du dernier post publié sur le blog de désinformation.
>>- Identifier les éléments clés du post (messages, sources, ton, etc.).
>>- Consulter le framework DISARM pour comprendre les tactiques, techniques et procédures (TTP) définies.
>>- Comparer les éléments du post avec les tactiques du framework DISARM.
>>- Déterminer la tactique spécifique utilisée dans le post et documenter les preuves soutenant cette classification.
>
>**Importance:** L'utilisation du framework DISARM pour caractériser les attaques informationnelles est cruciale pour développer des contre-mesures efficaces. En identifiant les tactiques utilisées par les acteurs malveillants, vous contribuerez à démanteler les campagnes de désinformation et à protéger l'intégrité de l'information. Cette mission renforce également la capacité à détecter et à contrer les attaques similaires à l'avenir.

### RETEX
On doit donc analyser un article du média de désinformation global-news-maq datant de 17h00.
Pour m'assurer que c'est le bon article je vais regarder tous les articles de la journée jusqu'à trouver celui qui possède un timestamp de publication indiquant 17h00. Je suis obligé de procéder de la sorte parce que les articles ne donne pas ouvertement l'heure de publication.
![[content/Notes/Bellatrix Orion 26/P1/P1_disarm.png|500]]
Celui qui nous intéresse est donc [celui-ci](https://global-news-maq.info/mobilisation-generale-contre-france/).
![[content/Notes/Bellatrix Orion 26/P1/P1_disarm_art.png|500]]
On peut y lire des mots durs, un vocabulaire qui attise la haine et la violence. Mais aussi et surtout un appel a la manifestation.
Ce qui colle parfaitement avec technique ==T0126== de le framework Disarm, qui aide a analyser des attaques informationnelles. Et donc la tactique TA10 (mais malgré l'énoncé, le flag est composé du code de la Technique)
![[content/Notes/Bellatrix Orion 26/P1/P1_disarm_T0126.png|500]]
D'ailleurs on pourrait décrire le but de cette campagne via la technique T0138.001 et la technique T0138.002
![[content/Notes/Bellatrix Orion 26/P1/P1_disarm_tech1.png|500]]
![[content/Notes/Bellatrix Orion 26/P1/P1_disarm_tech2.png|500]]

---
## Une metadata vaut mille images (optionnel)
### Contexte
>Dans le cadre de la lutte contre la désinformation, il est crucial de pouvoir identifier l'origine des contenus multimédias utilisés pour manipuler l'opinion publique. Les sites de désinformation utilisent fréquemment des images générées par intelligence artificielle (IA) pour créer des visuels trompeurs ou falsifiés. Ces images, bien que réalistes (ou parfois pas du tout!), contiennent souvent des métadonnées exploitable qui peuvent révéler des informations sur leur création, leur auteur, ou les outils utilisés pour les générer. Votre mission est d'analyser ces métadonnées pour tracer l'origine des images et documenter les méthodes utilisées pour les créer.
>
>Une image en particulier est manifestement crée par une IA, il s'agit de ==l'image qui montre un pilote en mer sur un rafale qui flotte sur l'eau==.

### Mission
>Votre objectif est d'examiner les images suspectes. Vous devrez ==analyser ces métadonnées pour identifier des indices sur l'origine des images==, les outils de génération utilisés, et les éventuelles modifications apportées. Cette analyse permettra de comprendre les techniques employées par les acteurs malveillants et de développer des contre-mesures efficaces.
>
>**Actions requises:**
>>- Identifier les images suspectes utilisées dans des campagnes de désinformation.
>>- Extraire les métadonnées des images à l'aide d'outils spécialisés.
>>- Analyser les métadonnées pour identifier des informations sur l'origine des images (logiciel utilisé et version, etc.).
>>- Rechercher des signatures ou des motifs spécifiques indiquant l'utilisation d'outils de génération par IA.
>
>**Importance:** L'analyse des métadonnées des images générées par IA est essentielle pour lutter contre la désinformation. En identifiant l'origine des images et les outils utilisés pour les créer, vous contribuerez à démanteler les réseaux de manipulation et à protéger l'intégrité de l'information. Cette mission renforce également la capacité à détecter et à contrer les campagnes de désinformation futures.

### RETEX
On va donc analyser les images qui nous paraissent suspectes, pour voir si on peut en extraire des informations intéressantes.
La première image qui m'est venue a l'esprit est celle-ci :
![[content/Notes/Bellatrix Orion 26/P1/P1_meta.png|500]]
Elle est tirée d'un [article](https://global-news-maq.info/video-choc-pilote-rafale-recuperation-mer/) sur global-news-maq qui parlais du sauvetage de Lynx.
Cette image parait suspicieuse parce qu'elle ne colle pas avec la direction artistique des autres images d'articles. Et puis, ce canard jaune a l'air beaucoup trop hors contexte à mon goût.

![[content/Notes/Bellatrix Orion 26/P1/P1_meta_data.png|500]]
En analysant les méta-données, on trouve des détails intéressant :
- `Software : ComfyUI 0.2.2` → ComfyUI est un front-end / workflow manager pour modèles de diffusion (Stable Diffusion, SDXL, etc.).
- `User Comment : Steps: 35, Sampler: DPM++ 2M Karras, CFG scale: 7.5, Seed: 1847392056, Size: 1024x1024, Model: juggernautXL_v9, Clip skip: 2`
    - `Steps`, `Sampler`, `CFG scale`, `Seed`, `Model`, `Clip skip` sont des paramètres de génération IA, pas de prise de vue réelle.
    - `Size: 1024x1024` montre qu’à l’origine l’image a été générée en 1024x1024 puis recadrée/redimensionnée en 1024x768.
- `Image Description : a photograph of leaked internal document on desk, ultra realistic, 8k, --no watermark` ressemble plus à un prompt qu’à une description saisie à la main.

On est donc sûr que l'image a été généré par IA via le logiciel ==ComfyUI 0.2.2==

---
## Mesurer l'attaque (optionnel)
### Contexte
>Dans le cadre de la lutte contre les campagnes de désinformation, une agence partenaire a effectué un scraping du réseau social amstramgram.net. Les données collectées, fournies sous forme de fichier CSV, contiennent des informations sur les publications, les comptes utilisateurs, et leurs interactions. Une analyse préliminaire suggère la présence d'une attaque de type =="coordinated inauthentic behavior"== (CIB), où des comptes fictifs ou contrôlés agissent de manière coordonnée pour amplifier des narratives trompeuses. Votre mission est d'analyser ce jeu de données pour détecter et documenter ces comportements inauthentiques.

### Mission
>Votre objectif est d'examiner le fichier CSV fourni et d'identifier les signes d'une campagne de comportements inauthentiques coordonnés. Vous devrez analyser les données pour ==mesurer le volume d'utilisation du second hastag le plus utilisé lors de cette campagne==. Cette analyse permettra de confirmer la présence d'une attaque CIB et de fournir des preuves pour contrer cette campagne.
>
>**Actions requises:**
>>- Importer et explorer les fichiers CSV pour comprendre sa structure et son contenu.
>>- Mesurer le volume du second hashtag utilisé durant l'attaque.
>
>**Importance:** La détection des comportements inauthentiques coordonnés est essentielle pour lutter contre la désinformation. En identifiant ces campagnes, vous contribuerez à démanteler les réseaux de manipulation et à protéger l'intégrité des débats publics. Cette mission renforce également la capacité à détecter et à contrer les attaques similaires à l'avenir.

### RETEX
Pour analyser simplement ce fichier csv, je vais utiliser ce script python :
```python
import pandas as pd
 
CSV_PATH = "feed.csv"
 
df = pd.read_csv(CSV_PATH)
 
all_tags = []
for tags in df["tags"].dropna():
    all_tags.extend(tags.split(";"))
 
counts = pd.Series(all_tags).value_counts().head(5)
 
print("=" * 40)
print("  Top 5 hashtags par volume")
print("=" * 40)
for rank, (tag, count) in enumerate(counts.items(), 1):
    print(f"  {rank}. {tag:<35} {count} posts")
print("=" * 40)
```

En l'executant sur le fichier en question, on a ces résultats :
![[content/Notes/Bellatrix Orion 26/P1/P1_mesure.png|500]]
On peut donc voir les 5 hashtags les plus utilisés ainsi que leur nombre d'utilisation respective.

---
## Analyser l'attaque (optionnel)
### Contexte
>Dans le cadre de l'enquête sur les comportements inauthentiques coordonnés (CIB) sur le réseau social amstramgram.net, une analyse préliminaire a confirmé la présence de deux campagnes distinctes. Ces campagnes utilisent des hashtags spécifiques pour amplifier leurs messages et manipuler les tendances. Votre mission est de réaliser une analyse temporelle pour mesurer le délai entre la première utilisation d'un hashtag et le pic de volume d'activité associé à ces campagnes. Cette analyse permettra de comprendre la dynamique de propagation des CIB et d'identifier des motifs temporels récurrents.
### Mission
>Votre objectif est d'analyser les données temporelles contenues dans le fichier CSV pour évaluer le délai entre l'introduction d'un hashtag et son pic de popularité dans le cadre des deux campagnes CIB identifiées. Vous devrez extraire les données pertinentes, calculer les délais, et comparer les dynamiques des deux campagnes. Cette analyse fournira des insights précieux sur les stratégies de propagation des acteurs malveillants.
>
>**Actions requises:**
>>- Importer et explorer les fichiers CSV pour identifier les colonnes pertinentes (dates, hashtags, volumes de publication, etc.).
>>- Filtrer les données pour isoler les deux campagnes CIB identifiées.
>>- Pour chaque campagne, identifier la date de première utilisation de chaque hashtag associé.
>>- Déterminer la date du pic de volume pour chaque hashtag.
>>- ==Calculer le délai, en minutes, entre la première utilisation et le pic de volume pour chaque hashatg==.
>>- Le flag est valable pour les différents hashtag de la campagne.
>
>**Importance:** L'analyse temporelle des campagnes CIB est essentielle pour comprendre leur dynamique de propagation et pour développer des contre-mesures efficaces. En identifiant les délais moyens entre l'introduction d'un hashtag et son pic de popularité, vous contribuerez à anticiper les futures campagnes et à limiter leur impact sur l'opinion publique.

### RETEX
Cette fois-ci, on dois chercher le délai entre la première utilisation d'un hashtag, et son pic d'utilisation.
Pour ce faire je vais utiliser ce script python : 
```python
import pandas as pd

HASHTAG = "#JusticePourLesVictimes"
CSV_PATH = "feed.csv"

# Chargement
df = pd.read_csv(CSV_PATH)
df["date"] = pd.to_datetime(df["date"])

# Filtrage sur le hashtag cible
mask = df["tags"].notna() & df["tags"].apply(lambda x: HASHTAG in x.split(";"))
sub = df[mask].copy()

if sub.empty:
    print(f"Aucun post trouvé pour {HASHTAG}")
else:
    first_use = sub["date"].min()
    first_post = sub.loc[sub["date"].idxmin()]

    # Pic par heure
    sub["hour"] = sub["date"].dt.floor("h")
    hourly = sub.groupby("hour").size()
    peak_hour = hourly.idxmax()
    peak_count = hourly.max()

    delay_minutes = (peak_hour - first_use).total_seconds() / 60

    print("=" * 55)
    print(f"  Analyse CIB — {HASHTAG}")
    print("=" * 55)
    print(f"  Total de posts          : {len(sub)}")
    print(f"  Première utilisation    : {first_use.strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"  Auteur du 1er post      : @{first_post['username']}")
    print(f"  Pic d'activité (heure)  : {peak_hour.strftime('%Y-%m-%d %H:%M')} ({peak_count} posts)")
    print(f"  Délai 1re util. → pic   : {delay_minutes:.1f} minutes")
    print("=" * 55)

    print("\n  Distribution horaire :")
    print(f"  {'Heure':<22} {'Posts':>6}  {'Barre'}")
    print(f"  {'-'*22} {'-'*6}  {'-'*20}")
    max_count = hourly.max()
    for hour, count in hourly.items():
        bar = "█" * int(count / max_count * 20)
        marker = " ← pic" if hour == peak_hour else ""
        print(f"  {hour.strftime('%Y-%m-%d %H:%M'):<22} {count:>6}  {bar}{marker}")

    print(f"\n  FLAG : {int(delay_minutes)} minutes\n")
```

Il marche au cas par cas, j'ai décidé de le faire fonctionner pour le hashtag "JusticePourLesVictimes"
![[content/Notes/Bellatrix Orion 26/P1/P1_analyser.png|500]]
En exécutant le script, on voit que son pic d'utilisation se trouvé a 12h00.
Le délai est de 192.8 minutes, on peut donc arrondir a 193.

---

Les autres phases du CTF  · | ·  [[Phase 2 - Technical]]  · | ·  [[Phase 3 - Osint]] 
