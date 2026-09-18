---
tags:
  - Osint
  - DeepThreats
  - Chall
order: 2
---
---
## Welcome

### Énoncé
>![[DT_AVM_VA.png]]
> **Un dernier rappel**
>
>Avant de vous lancer dans cette enquête et de découvrir les défis préparés par le **CAMPUS OSINT**, une première étape est indispensable.
>
>Prenez le temps de lire le règlement de l'événement. Il contient les règles à respecter tout au long du CTF et les informations essentielles pour participer dans les meilleures conditions.
>
> **Validation des règles**
>
>Avant d'accéder à l'enquête, répondez à cette première question en vous appuyant sur le règlement de l'évènement :
>
>> Quelle sanction résulte d'une action offensive contre un site ou un asset du CTF ?
>
>_Flag format :  `éclosion de l'oeuf`_

### RETEX
Ce type de premier challenge est un grand classique.
![[DT_AVM_VA_F.png]]
On peut trouver très facilement le flag **==bannissement de l'équipe==** dans le règlement.


---
## Scoring

### Énoncé
>![[DT_AVM_S.png]]
>> **Début du compteur**
>>
>>En validant ce challenge, vous faites démarrer le chronomètre de résolution de l'enquête principale du CTF. Il s'arrêtera automatiquement lorsque votre équipe aura résolu l'ensemble des challenges de l'enquête. En cas d'égalité de points entre plusieurs équipes, le temps de résolution sera utilisé comme critère pour départager les équipes.
>
> **Fonctionnement du classement**
>
>Avant de commencer votre enquête, prenez quelques instants pour découvrir le fonctionnement du classement de ce CTF.
>
>Le classement de votre équipe repose sur deux critères principaux :
>
> - Le nombre de points obtenus par votre équipe ;
> - Le temps total nécessaire pour terminer l'enquête principale du CTF.
>
>> Important : les challenges de la catégorie SIDEQUEST sont indépendants de l'enquête principale et du temps de résolution.
>
> **A — Scoring**
>
>Afin de ne pas pénaliser les erreurs, nous avons choisi un système qui récompense les bonnes réponses.
>
>Chaque challenge est limité à un nombre de tentatives compris entre 3 et 5 selon le challenge.
>
>À chaque résolution, votre équipe obtient les points du challenge ainsi qu'un éventuel bonus, calculé en fonction du nombre de tentatives nécessaires.
>
>Challenges limités à 3 tentatives :
> - 1re tentative = 20 % pts bonus
> - 2e tentative = 10 % pts bonus
> - 3e tentative = 0 pt bonus
>
>Challenges limités à 5 tentatives :
> - 1re tentative = 20 % pts bonus
> - 2e tentative = 15 % pts bonus
> - 3e tentative = 10 % pts bonus
> - 4e tentative = 5 % pts bonus
> - 5e tentative = 0 pt bonus
>
>**Exemple :** Prenons un challenge rapportant 50 points, avec un maximum de 3 tentatives. Si vous le résolvez dès votre première tentative : 50 points + 20 % de bonus = 60 points
>
>Le bonus est toujours calculé sur la valeur en points du challenge.
>
>**À noter :** une fois le nombre maximal de tentatives atteint sans résolution, le challenge ne rapporte aucun bonus et vous devrez solliciter un déblocage (via le centre de déblocage) qui vous coutera de 40 à 100 pts en fonction du nombre de tentatives souhaité (Si vous êtes certain de la réponse, vous pouvez demander 1 seule tentative supplémentaire qui vous coutera 40 pts ; pour remettre le compteur à 3 ou 5 tentatives il vous en coûtera 100 pts).
>
>**B — Temps de résolution**
>Dès que vous validez ce challenge, le compteur de temps de votre équipe démarre. Il s'arrêtera automatiquement lorsque vous aurez résolu le dernier challenge de l'enquête principale du CTF.
>
>Les SIDEQUEST, au nombre de 6, ne sont pas prises en compte dans ce compteur : Elle s'ouvriront à la clôture du dernier challenge, après l'arrêt du chronomètre. A vous de voir si vous souhaitez gagner des points bonus en les résolvant.
>
>**⚠️ Point de vigilance**
>
>Le compteur continue de tourner même lorsque vous n'êtes pas connecté à la plateforme.Si vous faites une pause, quittez la plateforme ou reprenez l'enquête plus tard, le temps continue de s'écouler jusqu'à la résolution complète de l'enquête principale.
>
>Vous pouvez consulter le temps mis pour résoudre l'enquête une fois celle-ci terminée, depuis la page dédiée à votre équipe.
>
>**Pourquoi prendre le temps en compte ?**
>
>Le temps intervient **uniquement pour départager les équipes en cas d'égalité de points.**
>
>L'objectif est de garantir une équité entre les équipes ayant commencé à des moments différents. Par exemple, une équipe qui commence le vendredi soir doit pouvoir rester compétitive face à une équipe ayant commencé 24 heures plus tôt, à condition d'obtenir un meilleur temps de résolution à nombre de points égal.
>
>⏱️ Quand démarrer le compteur ?
>
>Dès que vous validez ce challenge, le compteur démarre immédiatement.
>
>Si vous souhaitez attendre les autres membres de votre équipe ou commencer l'enquête plus tard, **nous vous recommandons donc de ne valider ce challenge qu'une fois votre équipe prête à commencer**.
>
>> Ce nouveau système de scoring est expérimental. Nous espérons qu'il permettra d'apporter davantage d'équité au classement tout en récompensant les équipes les plus efficaces, sans pénaliser excessivement les erreurs au cours de l'enquête.
>
>Merci d'avoir pris le temps de lire ces règles et bonne chance !
>
>>Pour confirmer que vous avez compris le fonctionnement du classement et accepter son principe, saisissez la phrase ci-dessous pour valider ce challenge :
>> ==J'ai compris ce système et l'accepte==


### RETEX
Ce challenge sert globalement à rappeler et à synthétiser le fonctionnement du classement de ce CTF. Ce n'est donc pas vraiment un challenge, mais une lecture appréciée pour mieux comprendre comment le classement sera réalisé.

---
## Ordre de mission

### Énoncé
> ![[DT_AVM_ODM.png]]
> Vous retrouverez ci-dessous le contexte de l'enquête :
> ![[CONTEXTE.pdf]]
>Vous retrouverez ci-dessous l'ordre de mission :
>![[ORDRE_DE_MISSION.pdf]]
>Bonne enquête !
>
>> Pour valider ce challenge, tapez : ==GO==

### RETEX 
Ce challenge présente enfin le contenu de ce CTF : nous allons devoir enquêter sur Marinatech Industries, une entreprise de la Base Industrielle et Technologique de Défense (**BITD**) française.

Depuis plusieurs mois, on recense des fuites d'informations confidentielles, et des publications susceptibles de porter atteinte à la réputation de l'entreprise sont apparues en ligne.
Depuis septembre, en quelques jours, le partenaire auquel elle a confié 20% de son capital pour accélérer son développement à l'international a vendu ses parts à une entreprise tierce sans que Marinatech n'en soit informée préalablement. 
Marinatech voit une partie de ses perspectives d’innovation bloquées par l’adoption d’une loi sur le contrôle des exportations à portée extraterritoriale.
Un problème de conformité a retardé le dépôt de brevet d'une technologie sur laquelle ils travaillaient depuis plusieurs mois, et lors du dépôt, l'INPI a informé Marinatech que le brevet en question venait d'être déposé sur une base nationale étrangère.

![[DT_AVM.svg]]

Ce contexte nous ramène à ces trois questions : 
- Que s’est-il passé ? 
- Qui poursuit quels intérêts ? 
- MarinaTech fait-elle face à une succession d’incidents indépendants ou à une dynamique plus structurée ?

Nous allons donc tenter de trouver ces réponses durant ce CTF.

