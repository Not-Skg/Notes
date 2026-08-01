---
tags:
  - Osint
  - googlelens
  - BleuetV5
  - Chall
  - aperisolve
order: 2
---
![[BleuetV5.png]]

>[!info] Notes
> Voici les retex des challs liés à la partie "Dans la peau d'un résistant" du CTF BLEUET DE FRANCE V5 by  AEGE.

***Les autres parties du CTF :***
 · | · Dans la peau d'un resistant
 · | · [[L'audace de resister]]
 · | · [[Un devoir de memoire]]
 · | · [[L'art de resister]]
 · | · [[Nos partenaires]]

---
## Alpha ici Bravo

### Énoncé 
>![[BLEUETV5_PR_AB.png|500]]
> Votre grand-père adorait se mettre dans la peau de résistants. Il est parvenu à obtenir l'[archive audio](https://bleuet.aege.fr/files/f0a4740d14f2b11c4914dd46b14b2025/CTF_Bleuet_2K26_-_Alpha_ici_Bravo_-_audio.wav) d'un enregistrement radio intercepté en 1944. Il avait noté que cet enregistrement semblait provenir d’un maquis de la résistance capté accidentellement lors d’une transmission clandestine. Un largage de matériel y était programmé dans les jours suivants la transmission, mais le lieu exact de réception était inconnu.
> ![[BLEUETV5_PR_AB.wav]]
> Votre grand-père s'était donné pour mission de localiser la commune concernée par ce largage à partir des seuls éléments donnés.
>
>> **Format de flag** : Nomcommune

### RETEX
Pour ce challenge, nous avons accès à un enregistrement audio. En écoutant ce dernier, on peut distinguer deux voix différentes et des bruits de fond d'une gare ferroviaire.

Voici la transcription de ce que dit la première voix : 
```
Ici l'opérateur Atlas, message à destination de Londres.
Prêt pour réception colis ce soir, terrain pratiquable, vent faible, lune visible après la onzième heure.
Présence d'une infrastructure ferroviaire a proximité, annonce civile audible durant la transmission.
Fin de message, fin de transmission.
```
Cette première voix est super compréhensible puisqu'elle a un timbre sonore qui dépasse tout le reste, ce qui n'est pas le cas de la deuxième.

Pour la deuxième voix, voici ce que j'ai d'abord compris :
```
Le train en provenance de N et en direction de Besançon/Briançon desservira essentiellement les gares de Embrun, L'Argentine-la-Gaçait, L, Besançon/Briançon.
Dernier appel avant le départ du train.
```
Globalement, on comprend que c'est un message d'annonce dans une gare. Ce qui pourrait fortement nous aider ça serait de trouver les villes/gares annoncées.

Commençons par le terme qui me donne le plus de confiance : Besançon/Briançon.
Je ne sais pas si la gare indiquée est "Besançon" ou "Briançon", mais pour le savoir, je peux chercher sur la carte si des villes à côté ressemble la gare précédente que j'ai entendu "L'Argentine-la-Gaçait".

![[BLEUETV5_PR_AB_M1.png|500]]
Pour Besançon, je ne trouve rien d'intéressant. Ça doit donc être une hallucination auditive.

![[BLEUETV5_PR_AB_M.png|500]]
Par contre pour Briançon, on retrouve plein de nom de ville qui permettent de reconstituer le message de façon crédible : 
```
Le train en provenance de Veynes et en direction de Briançon desservira essentiellement les gares de :
- Embrun, 
- L'Argentière-la-Bessée, 
- Prelles, 
- Briançon.
Dernier appel avant le départ du train.
```

On sait donc que l'on se trouve dans une gare entre Veynes et Embrun qui a une ligne ferroviaire qui dessert jusqu'à Briançon.
Et plus précisément, on est à l'arrêt de cette ligne juste avant l'arret d'Embrun.

On peut retrouver la carte de la ligne de Veynes à Briançon sur sa [page wikipédia](https://fr.wikipedia.org/wiki/Ligne_de_Veynes_%C3%A0_Brian%C3%A7on#:~:text=La%20ligne%20de%20Veynes%20%C3%A0,%2DC%C3%B4te%2Dd'Azur.). 
![[BLEUETV5_PR_AB_C.png]]

Le dernier arrêt avant Embrun est donc **==Chorges==**.

---
## Décryptage en piqué

### Énoncé 
>![[BLEUETV5_PR_DP.png|500]]
> La captation d’image et de son. S’agirait-il d’une preuve irréfutable pour identifier des actions ? Ici, nous voulons reconnaître et retrouver des renseignements en lien avec la libération de l’Europe. Une [courte vidéo](https://bleuet.aege.fr/files/dbd91830ff8f3c7ec68d33634c729088/CTF_Bleuet_2K26_-_Decryptage_en_pique_-_video.mp4), manifestement ancienne. Des images de bombardements, un lieu, des dates. A l'époque, votre grand-père du haut de son mètre d'enfant attendait les Alliés. Ces images témoignent de ce qu'il espérait.
>![[BLEUETV5_PR_DP_V.mp4|500]]
> Retrouvez le lieu et la date du début de ces faits.
>
>> **Format du flag** : 03/05/2024_lyon (_Le résultat attendu est sans accent et en minuscule. La date est au format : JJ/MM/AAAA_)

### RETEX
La vidéo présente manifestement la préparation, le déroulement et la reconstruction d'une ville suite à un bombardement intensif.
En utilisant Google Lens sur une image de la vidéo qui présente un point de vue de la ville par avion, on arrive à trouver des résultats qui pointent vers ==Brest==
![[BLEUETV5_PR_DP_GL.png|500]]
Puis en cherchant `brest seconde guerre mondiale bombardement`, on trouve un article du [site de l'Union Nationale des Combattants du Finistère](https://www.unc29.fr/39-45/brest-et-la-seconde-guerre-mondiale/) qui nous donne plus de détail sur ce bombardement, mais aussi la date de début de ces bombardements. 
![[BLEUETV5_PR_DP_UNC.png|500]]
On a donc le flag : **==07/08/1944_brest==**

---
## Le repère

### Énoncé 
>![[BLEUETV5_PR_R.png|500]]
>**Latitude** : 48.844001  **Longitude** : 2.34805 
>
> Des coordonnées précises, notées à la main ? Peut être un point de rendez-vous utilisé par des agents de la ==Résistance française== lors d’une mission de préparation et notamment d’appui ? Il n'était pas rare que ==pour se reconnaître==, les agents utilisent une ==phrase codée ainsi qu’une photographie==. 
>
>À partir de ces éléments, retrouvez le surnom de la personne figurant sur la photographie qui servait de code aux agents pour se reconnaître.
>
>> **Format du flag**  : Le_Lynx

### RETEX
On a donc des coordonnées en degrés décimaux, ces coordonnées renvoient vers "8 Rue Tournefort, 75005 Paris, France"
![[BLEUETV5_PR_R_C.png|500]]
En s'y rendant sur Google Maps, on peut trouver un restaurant et une plaque qui a l'air de rendre hommage a quelqu'un ou quelque chose, un bouquet de fleur y est même présent.
![[BLEUETV5_PR_R_M.png|500]]
[Une page wikipédia](https://fr.wikipedia.org/wiki/Rue_Tournefort_(Paris)) existe pour cette rue, et dessus, on peut y trouver [une photo](https://en.wikipedia.org/wiki/File:8_rue_Tournefort_-_Paris_-IMG_3681.jpg) de la plaque commémorative.
![[BLEUETV5_PR_R_W.png|500]]
On y apprend qu'une certaine "Madame Andrée Goubillon" a caché 42 parachutistes français lors de la Seconde Guerre mondiale dans l'initiative du plan Sussex.

En cherchant `Andree Goubillon photo`, on peut trouver [cette page](https://www.plan-sussex-1944.net/fr/missions/mission_pathfinder.htm) qui nous donne plus d'informations.

![[BLEUETV5_PR_R_MA.png|500]]
```
Madame Goubillon se souvient que pour se présenter, les agents qui entraient la première fois dans son café devaient dire : « Bonjour ma tante, comment va mon oncle ? » 
Ils montraient en même temps la photo d’un bébé, connu sous le nom de Mic-Mic, en fait le dernier fils du colonel Rémy.
```

On a donc le flag : **==Mic_Mic==**

---
## Plastique et crayons

### Énoncé 
>![[BLEUETV5_PR_PC.png]]
> Parmi les images conservées par votre grand-père figure [cet endroit](https://bleuet.aege.fr/files/4430ca250e5269bc711aa3a731667062/CTF_Bleuet_2K26_-_Plastique_et_crayons_-_bis.png). Après quelques recherches, vous vous apercevez qu'ici s’est joué l'un des sabotages ferroviaires les plus efficaces de la résistance française. L’auteur des faits a agi en plein jour, alors même que les sentinelles allemandes patrouillaient dans les alentours. Par ailleurs, un document titré de son nom relate encore son exploit.
>
> D’après ce dernier, combien de temps ont duré les explosions et à quelle distance ont-elles pu être entendues ?
>
>> **Format du flag** : moins_de_15h_plus_de_37km

### RETEX
En utilisant Google Lens sur l'image de l'énoncé, on peut trouver [ce site](https://cprd-landes.org/actualites/evenements/il-y-a-80-ans-lexplosion-du-train-de-laluque/.
![[BLEUETV5_PR_PC_M.png|500]]
Ce site nous apprend qu'==Henri Ferrand==, un ancien instituteur a fait exploser plusieurs wagons Allemands en plein jour dans les Landes.
Ce site nous donne plein d'informations, mais aucune citation de monsieur qui pourrait nous aider à compléter ce flag.
En cherchant `archives henry ferrand Landes`, on peut trouver tout ce qui concerne Henri Ferrand sur [le site d'archives des Landes](https://archives.landes.fr/service-educatif/concours-national-de-la-resistance-et-de-la-deportation/cnrd-2022-2023/les-documents/theme-4--enseignants-et-eleves-resistants/henri-ferrand).
![[BLEUETV5_PR_PC_AL.png|500]]
Notamment [un dossier](https://archives.landes.fr/service-educatif/concours-national-de-la-resistance-et-de-la-deportation/cnrd-2022-2023/les-documents/theme-4--enseignants-et-eleves-resistants/henri-ferrand#visionneuse-cms_3942694_0) à son nom.
![[BLEUETV5_PR_PC_FH.png|500]]
On a donc le flag : **==plus_de_48h_plus_de_50km==**

---
## Lettre d'un soldat

### Énoncé 
>![[BLEUETV5_PR_LS.png|500]]
> Il y a 80 ans, le maréchal Pétain venait de signer l’armistice avec l’Allemagne nazie, le général de Gaulle lançait depuis la radio de Londres son appel à la résistance et à la poursuite du combat contre l’ennemi. Parmi les premiers documents de la valise de votre grand-père, figurent un [tract](https://bleuet.aege.fr/files/00c2ae68a608f74705b1ef40106ba133/CTF_Bleuet_2K26_-_Lettre_dun_soldat_-_Tract.png) clandestin froissé, et le  [portrait](https://bleuet.aege.fr/files/00f87ab409944aedb36894d1cfc3c436/CTF_Bleuet_2K26_-_Lettre_dun_soldat_-_SoldatLettre.png) au fusain d'un soldat. Ce portrait illustre une lettre.
>
> Retrouvez la dernière phrase de cette lettre.
>
>> **Format du flag** : Il nous appartient de veiller tous ensemble à ce que notre société reste une société dont nous soyons fiers. (_Le résultat attendu est une phrase ponctuée avec accent et majuscule_).

### RETEX
Pour ce challenge, nous avons accès à deux fichiers, avançons par étape.

Après une recherche inversée via Google Lens, on peut déduire que le casque représenté [est probablement](https://www.world-war-helmets.com/fiche/Casque-Francais-Adrian-Mle-15) un casque Adrian d'infanterie.
![[BLEUETV5_PR_LS_CI.png|500]]
On ne peut pas vraiment tirer plus d'information de ce croquis.

Par contre, on peut trouver via Google Lens [un article de la BNF](https://www.bnf.fr/fr/actualites/lappel-du-18-juin-1940-et-le-general-de-gaulle-dans-les-collections-de-la-bnf) sur l'appel du 18 juin 1940 du Général de Gaulle illustré par ce tract clandestin de la resistance française.
![[BLEUETV5_PR_BNF.png|500]]
Une de leurs sources : "des tracts de la Résistance française" renvoie vers Gallica, leur outil d'archives.
![[BLEUETV5_PR_LS_G.png|500]]
On y retrouve quelques documents, mais en cliquant sur "voir tous les documents du même ensemble" on en trouve 3 spécifiques dont [une lettre comportant le croquis de l'énoncé](https://gallica.bnf.fr/ark:/12148/bpt6k990554s).
![[BLEUETV5_PR_LS_G2.png|500]]
On peut donc lire la lettre entière.
![[BLEUETV5_PR_LS_G3.png|500]]
Et en déduire le flag : **==Si je suis aujourd'hui déchu de mes droits, privé de ma nationalité, dépossédé de mes biens, je ne désespère pas d'être demain comblé d'honneur, traité en héros national et pensionné.==**

Ce challenge m'a pris beaucoup de temps parce que je n'avais pas vu le bouton "voir tous les documents du même ensemble", je n'avais donc pas accès à la lettre et je cherchais directement via mots clés sans trouver de combinaison intéressante.

---
## Motif aléatoire

### Énoncé 
>![[BLEUETV5_PR_MA.png|500]]
> Une [image](https://bleuet.aege.fr/files/7e36f21d21d70a4a8ced1b5be81043ba/CTF_Bleuet_2K26_-_Motif_aleatoire_-_bis.png) qui ressemble à du bruit aléatoire... Cependant, votre grand-père ne gardait rien sans raison. Ce qui semble chaotique cache toujours un ordre...
>
> À vous de le trouver.
>
>> **Format du flag** : nom_du_reseau_de_resistance

### RETEX
Pour ce challenge, j'ai eu beaucoup de chance, j'avais déjà fait un challenge de ce type sur Osintopia. 
J'avais donc déjà la forte intuition qu'il fallait utiliser un [stereogram solver](https://piellardj.github.io/stereogram-solver/) pour retrouver le message caché derrière ce bruit.
![[BLEUETV5_PR_MA_V.png|500]]
On peut donc retrouver de cette façon le logo de **==ceux_de_la_liberation==**.
Qui était l'[un des plus grands mouvements de la Résistance intérieure française](https://fr.wikipedia.org/wiki/Ceux_de_la_Lib%C3%A9ration) (en zone occupée) pendant la Seconde Guerre mondiale.

---
## Interception de code

### Énoncé 
>![[BLEUETV5_PR_IC.png|500]]
> Dans les nombreux documents laissés dans la valise de votre grand-père, certains sont beaucoup plus récents. Il semblerait qu'un ami de votre grand-père, lui aussi passionné, par le courage des résistants, a laissé un message chiffré à l’aide d’un algorithme baptisé CTFCodec. Vous avez en votre possession le [code source de l’algorithme](https://bleuet.aege.fr/files/c1add2f43d21d2fbe058b70abe0151c5/CTF_Bleuet_2K26_-_Interception_de_code_-_codec_1.php)ainsi qu’un message chiffré.
>
> On sait que la clé a été communiquée par un certain ==Philippe Kieffer==. Retrouvez-la.
>
> Cet algorithme de chiffrement vous permettra de retrouver des informations complémentaires.  
> Le message chiffré dont vous disposez est le suivant : **59.YclN9cRcazVHWkbj3YRjHGIvALPBJCTU**
>
> Où est-ce que cela vous mène ?
>
>> **Format du flag** : plage_du_petit_sperone (_le résultat attendu est sans accents en minuscules_)

```php
<?php


class CTFCodec {

    private string $key;

    // -----------------------------------------------------
    // Constructeur : on dérive la clé en SHA256 (32 octets)
    // -----------------------------------------------------
    public function __construct(string $key) {
        $this->key = hash("sha256", $key, true);
    }

    // -----------------------------------------------------
    // Rotation gauche sur 8 bits
    // -----------------------------------------------------
    private function rotl(int $b, int $n): int {
        return (($b << $n) & 0xFF) | ($b >> (8 - $n));
    }

    // -----------------------------------------------------
    // Rotation droite sur 8 bits
    // -----------------------------------------------------
    private function rotr(int $b, int $n): int {
        return (($b >> $n) | ($b << (8 - $n))) & 0xFF;
    }

    // -----------------------------------------------------
    // Masque pseudo-aléatoire dépendant clé + seed + index
    // -----------------------------------------------------
    private function mask(int $i, int $seed): int {
        $h = hash("sha256", $this->key . chr($seed) . pack("N", $i), true);
        return ord($h[$i % 32]);
    }

    // -----------------------------------------------------
    // Layer 1 : XOR + rotations
    // -----------------------------------------------------
    private function L1E(string $data, int $seed): string {
        $out = "";
        foreach (str_split($data) as $i => $c) {
            $b = ord($c);
            $b = $this->rotl($b, ($i + $seed) % 7);
            $b ^= $this->mask($i, $seed);
            $b = $this->rotr($b, ($seed + $i) % 5);
            $out .= chr($b);
        }
        return $out;
    }

    private function L1D(string $data, int $seed): string {
        $out = "";
        foreach (str_split($data) as $i => $c) {
            $b = ord($c);
            $b = $this->rotl($b, ($seed + $i) % 5);
            $b ^= $this->mask($i, $seed);
            $b = $this->rotr($b, ($i + $seed) % 7);
            $out .= chr($b);
        }
        return $out;
    }

    // -----------------------------------------------------
    // Layer 2 : shuffle pseudo-chaotique (inversible)
    // -----------------------------------------------------
    private function L2E(string $data, int $seed): string {
        $a = str_split($data);
        $n = count($a);

        for ($i = 0; $i < $n; $i++) {
            $j = ($this->mask($i, $seed) + $seed) % $n;
            [$a[$i], $a[$j]] = [$a[$j], $a[$i]];
        }

        return implode("", $a);
    }

    private function L2D(string $data, int $seed): string {
        $a = str_split($data);
        $n = count($a);

        for ($i = $n - 1; $i >= 0; $i--) {
            $j = ($this->mask($i, $seed) + $seed) % $n;
            [$a[$i], $a[$j]] = [$a[$j], $a[$i]];
        }

        return implode("", $a);
    }

    // -----------------------------------------------------
    // Encodage final : Base64URL stable
    // -----------------------------------------------------
    private function b64u_encode(string $d): string {
        return rtrim(strtr(base64_encode($d), "+/", "-_"), "=");
    }

    private function b64u_decode(string $d): string {
        $pad = 4 - (strlen($d) % 4);
        if ($pad < 4) $d .= str_repeat("=", $pad);
        return base64_decode(strtr($d, "-_", "+/"));
    }

    // -----------------------------------------------------
    // ENCODE
    // -----------------------------------------------------
    public function encode(string $msg): string {

        $seed = random_int(0, 255); // seed mutation

        $msg = $this->L1E($msg, $seed);
        $msg = $this->L2E($msg, $seed);

        $msg = $this->b64u_encode($msg);

        return sprintf("%02X", $seed) . "." . $msg;
    }

    // -----------------------------------------------------
    // DECODE
    // -----------------------------------------------------
    public function decode(string $cipher): string {

        list($hex, $data) = explode(".", $cipher, 2);
        $seed = hexdec($hex);

        $data = $this->b64u_decode($data);

        $data = $this->L2D($data, $seed);
        $data = $this->L1D($data, $seed);

        return $data;
    }
}

/***********************************************
 * TEST *
 ***********************************************/

$codec = new CTFCodec("");

$input = "";

$enc = $codec->encode($input);
$dec = $codec->decode($enc);

echo "Original : $input\n";
echo "Encodé : $enc\n";
echo "Décodé : $dec\n";

?>

```

### RETEX
Après une rapide analyse du code, j'en déduis que le code sert à chiffre et déchiffrer des messages à partir d'une clé.
Je pourrais la brut force, mais ce n'est pas vraiment l'esprit OSINT recherché dans ce CTF.

Je cherche donc des informations sur ce Philippe Kieffer. [Sa page wikipédia](https://fr.wikipedia.org/wiki/Philippe_Kieffer) est une des plus remplies de ce CTF.
![[BLEUETV5_PR_IC_W.png|500]]
Étant donné que l'énoncé dit qu'il a partagé une clé, je cherche un homonyme sur les réseaux.
Je trouve une [chaine Youtube](https://www.youtube.com/@philippekieffer3532/videos) et un [compte Facebook](https://www.facebook.com/CommandantPhilippeKieffer/), mais elles ne donnent pas réellement d'informations sur cette fameuse clé.
Par contre, je trouve un [compte Github](https://github.com/Philippe-Kieffer) intéressant.
![[BLEUETV5_PR_IC_G.png|500]]

On a donc la clé : `Commandos-SAS-Qui-ose-gagne!`

En modifiant un peu la fin du code php, on peut décoder le message chiffré. 
![[BLEUETV5_PR_IC_PHP.png|500]]
On obtient donc les coordonnées suivantes : **(49.3696815, -0.8710842)**
![[BLEUETV5_PR_IC_GM.png|500]]
Ces coordonnées nous mènent au lieu du débarquement de Normandie : **==omaha_beach==**

---
## Les ondes du silence

### Énoncé 
>![[BLEUETV5_PR_OS.png|500]]
> Une [page arrachée](https://bleuet.aege.fr/files/2ea9ebc56675c034ab9e08e325e444ac/CTF_Bleuet_2K26_-_Les_ondes_du_silence_-_bis.png), sans en-tête. Elle évoque un ==sabotage réussi mené par des Français libres==. Votre grand-père n'avait pas signé ce document, mais il évoquerait un sabotage réussi, mené par des Français libres.
>
> Quel est le nom de cette opération ? Et quelles ==infrastructures se sont effondrées== à la suite des explosions ?
>
>> **Format du flag** : mission_darklord_antennes_avant_et_arriere (_le flag est attendu en minuscule et sans accent_)

### RETEX
On peut voir sur l'image de l'énoncé deux wavesforms distinctes. Étant donné que c'est censé représenter un son, je me suis dit que je pouvais le retransformer en son via un [outil en ligne](https://melobytes.com/en/app/spectrogram). 

L'outil a été capable d'en extraire un bout de la musique "S4M (Something For Me)" de Crossy.
Après de longue recherche qui n'aboutissait à rien, j'ai compris que j'étais coincé dans un rabbit hole.

J'ai donc voulu débloquer un indice.

>[!note] indice 1
>Les formes présentent sur l'image sont nommées "waveforms" en anglais.

Jusqu'ici, on est bon par rapport à ce que j'avais déjà trouvé. Débloquons le dernier indice.

>[!note] indice 2
>Ces waveforms permettent possiblement de déceler des lettres, un alphabet.

Ça je n'y avais pas pensé, enfin un vrai indice lors d'un CTF, et pas juste une évidence ou une reformulation/paraphrase de l'énoncé.

En cherchant `waveforms alphabet` on peut donc trouver ce dont on a besoin.
![[BLEUETV5_PR_OS_A.png|500]]
On peut traduire ces wavesforms par ==Radio paris==

On peut donc maintenant chercher les mots clés suivants `radio paris sabotage résistant`. On peut ensuite avoir accès à [ce site](https://www.archives18.fr/espace-culturel-et-pedagogique/jeux-et-decouvertes/detournons-les-archives-/deuxieme-concours--le-sabotage-des-pylones-emetteurs-dallouis-du-vendredi-13-au-mercredi-25-novembre) qui décrit "Le sabotage des pylônes émetteurs d'Allouis".

```
Radio Paris est un poste créé par le service de la propagande allemande. Cette radio cherche à séduire l’auditoire tout en véhiculant de violents éditoriaux qui visent les Alliés et tentent de propager la haine des juifs.

...

La neutralisation des pylônes d'Allouis était un objectif majeur de la guerre des ondes. Le premier sabotage a lieu dans la nuit du 9 au 10 mai 1942, c’est l’opération « Pilchard », menée par trois Français libres : Henri Clastère, Paul Bodhaine et Maxime Gaudin. C’est une réussite puisque la BBC n’est plus brouillée sur le territoire français pendant 12 jours !
```

Ça concorde parfaitement avec l'énoncé !
On peut ensuite lire les documents extraits d'un dossier de procédure du tribunal de Bourges qui nous donnent plus de détails.
![[BLEUETV5_PR_OS_AP.png|500]]
On obtient donc le flag : **==operation_pilchard_pylones_nord_et_ouest==**

---
## Zone Sud

### Énoncé 
>![[BLEUETV5_PR_ZS.png|500]]
> Si le mot « résisté » doit toujours se conjuguer au présent, nous devons tout de même revenir sur une histoire marquante d’un personnage féminin unique. Une photographie d'une femme. Aucun nom, ni prénom au dos, votre grand-père admirait certaines personnes en silence, ou bien, [cette photo](https://bleuet.aege.fr/files/e53a636865eca08422b3293fca3042a0/CTF_Bleuet_2K26_-_Zone_Sud_-_bis.jpeg) cache peut être un secret. Un lieu propice pour une ==action d’éclat== est lié à ce document, il sera nécessaire de trouver l'identité de cette femme et d’approfondir vos recherches à l’aide de la photographie jointe. Son prénom et son nom d’épouse d’origine vous serviront de clé.
>
> Retrouvez les coordonnées géographiques du lieu des faits !
>
>> **Format du flag** : 35° 43’ 76’’ nord, 5° 32’ 32’’ est (_Le résultat attendu est avec des caractères spéciaux et en minuscules_).

### RETEX

En utilisant Google Lens sur la photo, on peut trouver le nom de cette personne, mais aussi la ville associée a cette personne.
![[BLEUETV5_PR_ZS_GL.png|500]]
Il s'agit donc de Lucie Aubrac, qui est connue notamment pour son [rôle dans la résistance](https://fr.wikipedia.org/wiki/Lucie_Aubrac) :

```
En août 1940, elle organise l'évasion de son mari, prisonnier de guerre. Le couple se réfugie à Lyon.

...

Raymond et elle consacrent alors tout leur temps libre aux activités : diffusion de tracts, recrutement, sabotages

...

Lucie et Raymond contribuent à faire de Libération le mouvement de Résistance le plus important en zone Sud après le mouvement Combat fondé par Henri Frenay.

...

« Catherine », alias Lucie Samuel, n'a de cesse de monter des coups pour libérer ses camarades avec l'aide des groupes francs nouvellement formés

...

Le 24 mai 1943 Lucie organise, avec la participation de son mari, l'évasion de l'hôpital de l'Antiquaille des comparses de Raymond

...
organiser le 6 septembre une exfiltration des quatre résistants avec un commando de faux gestapistes censé les conduire à un interrogatoire

...

C'est pendant un transfert, le 21 octobre 1943, que Lucie et ses compagnons attaquent, avenue Berthelot, à 300 mètres avant le boulevard des Hirondelles, le camion allemand dans lequel se trouvent quatorze résistants dont son mari.
```

Sa page wikipédia est une des pages les plus chargée de ce CTF.
L'action d'éclat de l'énoncé me fait fortement penser a l'évasion de l'hôpital de l'Antiquaille qu'elle a organisé. Je pense a ce coup en particulier puisque c'est le premier "gros coup".
L'hôpital de l'Antiquaille de Lyon se trouve au coordonnées suivantes :  45° 45’ 34’’ nord, 4° 49’ 21’’ est.
Mais le flag ne passe pas...

Je test donc avec d'autres lieux liés à ces coups, dont le lieu du 21 octobre 1943 mais rien ne fonctionne, je donc décidé de débloquer un indice.

>[!note] Indice
>La stéganographie est la pratique de dissimulation d'informations dans un autre message ou un objet physique pour éviter que celles-ci soient détectées. Il existe des logiciels pour décoder certains messages cachés. Parmi eux : Steganographic Decoder.
C'est vrai que je n'avais pas forcément beaucoup prété attention à la "clé" de l'énoncé.

Je lance donc [aperisolve](https://www.aperisolve.com) sur la photo de l'énoncé ce qui me donne le mot de passe `Lucie Samuel` qui est le nom d'épouse de Lucie Aubrac, ce qui coïncide encore avec l'énoncé.
![[BLEUETV5_PR_ZS_A.png|500]]
En utilisant un [Steganographic decoder en ligne](https://futureboy.us/stegano/decinput.html) avec ce mot de passe on trouve les mots `Hopital de l Antiquaille`.
On pouvait aussi ouvrir la partie Steghide d'aperisolve qui nous renvoie vers la payload caché via le mot de passe.
![[BLEUETV5_PR_ZS_SD.png|500]]
Ma première idée était donc la bonne.
Je reteste les coordonnées mais ça ne marche toujours pas, pourtant c'est celles sur wikipédia et je les modifie pour qu'elles ai le même format que dans l'énoncé....

Après de longue recherche je me suis apperçu que le format de l'énoncé précisait `’’` mais que des vrai coordonnées s'écrivent avec `″`.

>[!warning] Attention
> `’’` ≠ `″`
> Ce sont des caractères différents.

Le flag qui fonctionne est donc le suivant : **==45° 45′ 34″ nord, 4° 49′ 21″ est==**

---
***Les autres parties du CTF :***
 · | · Dans la peau d'un resistant
 · | ·  [[L'audace de resister]]
 · | · [[Un devoir de memoire]]
 · | · [[L'art de resister]]
 · | · [[Nos partenaires]]


