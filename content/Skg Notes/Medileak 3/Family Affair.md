---
tags:
  - Osint
  - Medileak3
  - Chall
---

>Vous avez une belle vision de l'ensemble... Enfin, si vous n'avez pas traversé les éléments de l'enquête comme un touriste sur la voie de gauche d'une autobahn allemande.
![[M3_FA.png]]

***Les autres parties du CTF :***
 · | · [[Here we go again]]
 · | · [[Voyage Voyage]]
 · | · [[Money For Nothing]]
 · | · [[Ecole du micro d argent]]
 · | · [[Antisocial]]
 · | · [[Hygiaphone]]
 · | · [[Ya foye]]
 · | · Family Affair
## Sweet Child o' Mine

### Énoncé [1/3]
>Raoul était peinard sur son île a ramasser des plantes, quand **==XXxxx==** a vu sa photo lorsqu'elle a posé pour **==XXxxx==**.

### RETEX [1/3]
D'après les précédents challenges, lorsque Raoul était sur l'île de Skye pour ramasser des Achillées Millefeuille pour medideal 24, **==Cynthia==** s'est mis à essayer de le retrouver pour son enquête, allant même physiquement sur l'île à ses frais.
En discutant avec **==Alan McCornish==**, le photographe qui avait pris en photo Raoul et Gizem dans un bar sur l'île, elle finit, elle aussi, par se faire faire un portrait par Alan. Cynthia accepte qu'Alan partage son portrait sur 500px à la condition de ne pas divulguer son nom.

### Énoncé [2/3] 
>Sauf qu'à priori, elle a manqué de discrétion, et **==XXxxx==** a vu ses plans contrariés et son concert annulé... Sur **==XXxxx==** elle a d'ailleurs dit qu'elle allait peut-être accepter l'aide de **==XXxxx==**.

### RETEX [2/3]
En parallèle de la récolte de Raoul, **==Gizem Ihanet==** faisait la tourner de certains lieux pour des concerts. Elle projetait même de faire un concert sur la terrace du Flodigarry Hotel. Elle avait annoncé son concert via un post **==Instagram==** le 25 avril. Mais le 9 mai, dans un autre post, elle explique que le concert est annulé à cause du business de raoul, plus précisément parce qu'il se fait harceler par quelqu'un. On peut donc en déduire que c'était Cynthia qui le suivait à la trace, ils ont donc dû annuler le concert et quitter le lieu dans l'urgence. 
Gizem a même indiqué espérer que Raoul accepte enfin l'aide de la **==famille==** de Gizem.


### Énoncé [3/3]
>Et quelle famille... il s'avère que Gizem est en fait la **==XXxxx==** de **==XXxxx==**, qui co-dirige **==XXxxx==**.

### RETEX [3/3]

D'après le document libre, qui acte la donation de parts entre vivants trouvés sur le RhinoCorp de Nicosian Holding, Cynthia est la **==fille==** de **==Despina KYPARISSIDOU==** gérante de Nicosian Holding, et Managing Partner de **==Stavros & Lynch==**, donc codirigeante de cette société.


---
##  Soldier of Fortune

### Énoncé [1/3]
Et au final... si Raoul était encore le dindon de la farce ?  
Si sa nouvelle activité avait été utilisée pour servir des intérêts supérieurs ?

Car vous avez découvert que HPG a fait capoter le projet de **==XXxxxx==** d'implanter un établissement à Limoges ! Et vu les liens financiers existants, les menaces reçues ne sont pas étonnantes !

### RETEX [1/3]

HPG est un ancien conseiller communautaire en Haute-Vienne et actuel conseiller communautaire de la Communauté de communes des Portes de Briance, élu pour Saint-Léger-la-Briance.
À travers un premier article sur son WordPress personnel, il présente le dossier **==VEDA MEDICAL DATA SCHOOL==** comme un projet encore séduisant à ce stade, mais déjà entouré de zones d’ombre sur la structure juridique, les capitaux et les partenaires réels.

Dans ce premier texte, il adopte une posture prudente : il ne rejette pas le projet, mais demande des précisions avant tout engagement de la collectivité. Il insiste surtout sur la nécessité de comprendre à qui l’intercommunalité aurait affaire, et sur le fait que les réponses fournies restent trop floues.

Dans un deuxième article, il durcit légèrement le ton après une réunion publique. Il revient sur les promesses de campus, d’emplois et d’activité locale, mais pointe plus nettement les questions d’origine des capitaux et de circulation de données de santé avec des partenaires.

Enfin, dans son dernier texte, il explique que le projet a été abandonné parce que les vérifications n’ont pas permis d’identifier clairement la structure actionnariale, l’origine des fonds et les garanties de gouvernance. Ses doutes répétés ont donc contribué à installer une exigence de transparence qui a pesé sur la décision finale de ne pas donner suite au protocole d’accord.

Le montage financier reposait sur VEDA MEDICAL DATA SCHOOL, qui apportait ses fonds propres, sur STAVROS & LYNCH PARTNERS LTD, présentée comme l’investisseur principal avec un engagement de 6,2 millions d’euros, et sur LIMOUSIN HOLDING SA, utilisée comme holding intermédiaire et véhicule de portage du campus français. Le projet visait à implanter un établissement d’enseignement supérieur à Limoges, à l’entrée du chef-lieu, avec des formations liées aux données de santé, à la médecine prédictive et à l’ingénierie biomédicale.

On sait aujourd’hui, du moins à l’échelle de ce que nous avons pu lire et recouper, que l’architecture financière et institutionnelle de l’ensemble ne relevait pas seulement d’un montage académique, mais d’un enchevêtrement de relais locaux, bancaires et capitalistiques qui expliquent aussi bien l’enthousiasme initial que les inquiétudes rétrospectives.

C’est là qu’intervient LIMOUSIN HOLDING SA, qui n’était pas uniquement une structure de passage dans le dossier VEDA : elle occupait aussi une fonction de pilotage plus large, puisqu’elle était présentée comme présidant le conseil d’administration et assurant la direction générale de Crédit Briance & Vienne, la banque locale de Limoges. Dans le même temps, un document référencé CBV/PRO/2026-03147 faisait apparaître un crédit de 14 402,88 euros accordé au Labaurence par cette même banque, ce qui donnait au dossier une épaisseur très concrète, bien loin des seules déclarations de principe.

À partir de là, il devenait difficile de ne pas voir comment certains flux se répondaient. Labaurence gérait des données de santé avec des élèves de la VEDA dans le cadre d’un stage, et l’anonymisation mise en avant ne tenait qu’en apparence : il suffisait d’une clé fuitée et d’un simple croisement avec une source comme une liste électorale pour réidentifier les personnes liées aux données. Autrement dit, les informations n’étaient pas aussi neutralisées qu’on voulait bien le dire, et l’écart entre anonymisation théorique et réidentification pratique posait déjà un problème sérieux.

C’est précisément dans ce contexte qu’il faut relire le cas de Girolles. Lorsqu’un habitant du département effectue une simulation de prêt, la banque semble disposer d’éléments qu’elle ne devrait pas avoir en main, au point d’établir un scoring. À la lecture des données, Girolles apparaît d’abord en parfaite santé, alors même que ses informations ont été modifiées par un stagiaire à la demande de Raoul Reidid. C’est aussi à ce moment-là qu’il commence à acheter des produits Medideal24, conseillé par un stagiaire de Labaurence, alors que Medideal24 appartient à l’univers de Raoul Reidid, déjà impliqué auparavant dans une arnaque visant la belle-sœur de Girolles.

Dans cette séquence, les coïncidences deviennent trop nombreuses pour rester anodines. Au moment où le projet VEDA se délite, Girolles se retrouve aussi suivi par Despina KYPARISSIDOU, gérante de Nicosian Holding et managing partner de Stavros & Lynch, qui va jusqu’à lui adresser des menaces anonymes par téléphone. Elle offre par ailleurs des parts de sa société à Gizem, sa fille, ce qui ajoute encore une couche d’opacité à un ensemble déjà marqué par les liens capitalistiques, les intérêts croisés et les interférences personnelles.

Au final, la défiance de Girolles n’apparaît plus comme une simple posture d’élu tatillon. Elle prend la forme d’une réaction logique face à un système où la banque, le laboratoire, l’investisseur et les intermédiaires semblaient tous reliés d’une manière ou d’une autre, directement ou indirectement. Dans cette lecture, l’abandon du campus n’est pas seulement la conséquence d’un dossier mal ficelé : c’est aussi le résultat d’un faisceau d’alertes, de doutes et de pressions qui rendaient le projet difficilement soutenable.


### Énoncé [2/3]
On ne va pas retracer toute votre enquête... mais quand même, ce que Cynthia vous a indiqué avant de couper la conversation sur S&L vous intrigue...

En étudiant ces investisseurs, vous découvrez qu'ils ont lancé en 2026 une entreprise au Moyen-Orient.

**==Xxxxxx ==**propose ses services sur le site **==Xxxxxx==**.

### RETEX [2/3]

En parcourant la [review annuel de 2025 de S&L](https://stavroslynch.com/sl_annual_review_2025.html), des investisseurs du projet VEDA, on apprend qu'ils ont lancé en 2026 une entreprise au Moyen-Orient nommé **==Kydonia Continental Security Holdings Ltd==**
![[M3_FA_1.png|500]]
Cette entreprise possède son propre site internet : **==hxxps://kydonia.vip==**

### Énoncé [3/3]
>Ils proposent des services de sécurité et une forte odeur de barbouzerie se dégage malgré un habillage très respectable...
>
>Le **==XXXxxx==** ils ont d'ailleurs posté leur arrivée à **==XXXxxx==** pour assurer la sécurité d'un évènement début juin.
>
>Comme montré sur la photo ci-dessous, on retrouve un véhicule bien connu et déjà croisé pendant notre enquête.

### RETEX [3/3]

Cette entreprise est aussi présente sur [X](https://x.com/KidoniaSecurity) sous le pseudo `KidoniaSecurity`.
![[M3_FA_2.png|500]]
Sur un de leur post sur X, le **==11 mai==** ils ont d'ailleurs posté leur arrivée à **==Limoges==** pour assurer la sécurité d'un évènement début juin.
Sur la photo qui accompagne l'annonce, on retrouve même la voiture présente devant la maison de Despina et Gizem, la même qui était devant l'agence de Crédit Briance & Vienne et aussi la même qui avait suivi H-P.G.

> Quelle sera leur cible ? Qui veulent-ils protéger ?  
Les meilleurs d'entre vous auront à le découvrir très bientôt !
>
>En attendant... vous pouvez revivre les chapitres ici :  
>![https://www.youtube.com/watch?v=WyF8RHM1OCg&list=TLGGwC1C_UIzHSExMzA1MjAyNg](https://www.youtube.com/watch?v=WyF8RHM1OCg&list=TLGGwC1C_UIzHSExMzA1MjAyNg)

>[!info]
>Notre équipe n'a pas été retenue pour la finale, nous n'avons donc pas pû y accéder et découvrir le reste des challenges, je vous redirige donc vers leurs WU pour la suite.

---
***Les autres parties du CTF :***
 · | · [[Here we go again]]
 · | · [[Voyage Voyage]]
 · | · [[Money For Nothing]]
 · | · [[Ecole du micro d argent]]
 · | · [[Antisocial]]
 · | · [[Hygiaphone]]
 · | · [[Ya foye]]
 · | · Family Affair