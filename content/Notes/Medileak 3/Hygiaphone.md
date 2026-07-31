---
tags:
  - Osint
  - Medileak3
  - Chall
order: 7
---

>Plus on crie plus fort, moins ça fait du moins de bruit. (Normalement.)
![[M3_H.png]]

***Les autres parties du CTF :***
 · | · [[Here we go again]]
 · | · [[Voyage Voyage]]
 · | · [[Money For Nothing]]
 · | · [[Ecole du micro d argent]]
 · | · [[Antisocial]]
 · | · Hygiaphone
 · | · [[Ya foye]]
 · | · [[Family Affair]]
 
 ---
## Undercover of the night

### Énoncé [1/3]
>Henri-Pierre n'est pas seul à se sentir concerné. Vous fouillez les threads, et il apparaît qu'un collectif s'est constitué autour de cette histoire de données de santé.
>
>Au cœur du dispositif, un média : **==XXxxx==**, qui publie régulièrement sur son site **==XXxxx==**.

### RETEX [1/3]
En se baladant un peu sur les comptes Mastodon qui ont relayé les `#nohealthdatalake`, peut trouver des post mettant en avant des articles de **==Santé Éthique==**.
![[M3_H_UOTN.png|500]]
Ces articles sont hébergés sur le site **==hxxps://santethique.eu==**.


### Énoncé [2/3]
>Vous parcourez les signatures. Tiens, tiens. Une certaine **==XXxxx==** s'intéresse elle aussi à **==XXxxx==** et à son dernier voyage…
>
>Saura-t-on l'identifier ?

On peut retrouver sur le site santé éthique, [un article](https://santethique.eu/article/sur-la-piste-de-rr-skye-hebrides) de **==Cynthia==** qui porte sur une enquête sur terrain au sujet des agissements d'un certain R.R.
![[M3_H_UOTN_SE1.png|500]]
Rien que le synopsis et les mots clés associés nous permettent d'affirmer qu'elle parle de Raoul Reidid.

En lisant son article, on s'aperçoit qu'elle a vraiment suivi Raoul à la trace, et s'est donc rendu dans tous les endroits qu'il a traversé : petites salles, des festivals de village, des pubs.
![[M3_H_UOTN_SE2.png|500]]

Ça nous rappelle donc le photographe du premier challenge, qui avait pris Raoul et Gizem en photo dans des lieux ou Gizem se produisait en concert.
D'ailleurs, il avait aussi photographié une journaliste qui ne voulait pas donner son nom…
![[M3_Hwga_S_5px_U.png]]
On peut donc facilement affirmer que c'est un portrait de Cynthia.

### Énoncé [3/3]
>C'est bien elle ! Il ne reste plus qu'à entrer en contact. L'adresse : **==XXxxx==**

### RETEX [3/3]

À la fin de l'article, il est précisé que si on a plus d'informations sur cette affaire, on peut contacter Santé Éthique.

On peut même retrouver sur [la page de contact](https://santethique.eu/contact) un code d'accès à une messagerie chiffrée.
![[M3_H_UOTN_SE3.png|500]]

Ce code nous donne accès à une conversation avec la rédaction de Santé Éthique.
![[M3_H_UOTN_I1.png|500]]
En se faisant passer pour un journaliste qui est tombé sur l'article de Cynthia suite à ses recherches sur Raoul.
Et après avoir mis en confiance la rédaction en lui prouvant qu'on était de bonnes volontés, un minimum prudent et professionnel, la rédaction nous donne le code d'accès à la messagerie chiffrée de Cynthia.

---
##  (I Can't Get No) Satisfaction

### Énoncé [1/3]
>Le contact est établi. Cynthia répond vite, et ne tourne pas autour du pot : elle aussi est sur le dossier.
>
>Elle confirme que **==XXxxx==** cherche à s'implanter à **==XXxxx==**, mais que le projet semble sérieusement compromis.

### RETEX [1/3]
Cynthia est aussi très prudente, après avoir répondu ses questions et lui en avoir posé pour se jauger mutuellement, elle nous confirme que **==Veda Medical Data School==** cherche à s'implanter à **==Limoges==**. On peut attester de cette information via [la lettre ouverte](https://henripierregirolles.wordpress.com/2026/02/18/lettre-ouverte-a-madame-la-prefete-le-campus-est-abandonne-les-donnees-voyagent-toujours/) de H-P.G, qui est d'ailleurs lui aussi un rédacteur d'article sur ce site.

### Énoncé [2/3]
>Pour étayer son propos, elle vous oriente vers un document plutôt édifiant publié par **==XXxxx XXxxx==**.

### RETEX [2/3]
Cynthia nous oriente ensuite vers la lettre ouverte de **==Henri-Pierre Girolles==** cité précédemment.
![[M3_H_S.png|500]]

### Énoncé [3/3]
>Et avant de raccrocher, elle glisse une dernière information : **==XXxxx==** n'est pas un acteur secondaire dans cette histoire — car **==XXxxx==** est richissime.

### RETEX [3/3]
Avant de couper la conversation, elle nous annonce qu'il faudrait creuser un peu plus sur **==Gizem==**, parce qu'elle est toujours au centre de ces histoires, et sa famille qui est soit-dit en passant richissime est aussi impliqué.

---
***Les autres parties du CTF :***
 · | · [[Here we go again]]
 · | · [[Voyage Voyage]]
 · | · [[Money For Nothing]]
 · | · [[Ecole du micro d argent]]
 · | · [[Antisocial]]
 · | · Hygiaphone
 · | · [[Ya foye]]
 · | · [[Family Affair]]