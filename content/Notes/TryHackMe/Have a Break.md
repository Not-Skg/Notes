---
tags:
  - Osint
  - Chall
  - TryHackMe
---
## Investigation
>[!warning] **Disclaimer**
>This challenge is inspired by a real cargo theft that occurred in March 2026, in which a shipment of KitKat products was stolen in transit between Italy and Poland. All companies, agencies, individuals, documents, and investigative findings presented in this challenge are entirely fictional. No real employees, law enforcement personnel, or organisations are implicated. The real theft remains under investigation by the relevant authorities.
### Background
>On 26 March 2026, a refrigerated truck carrying over 400,000 units of KitKat product vanished somewhere between Central Italy and Poland. Nestlé confirmed the theft two days later. The vehicle has not been found.
>
>The European Cargo Threat Assessment (**ECTA**) does not believe this was opportunistic. A shipment of this size, on a contracted route, does not disappear without someone helping it along.
>
>An anonymous tip reached a journalist the following evening. ECTA obtained it under judicial authority. That is where your investigation begins.

### Your Assignment
>You are a CZ Node investigator on Project HAVEABREAK. Your goal is to identify the culprit behind the heist by using the following files:

| File                              | Description                            |
| --------------------------------- | -------------------------------------- |
| `ecta_memo.pdf`                   | Your briefing. Start here.             |
| `exhibit_a.eml`                   | Exhibit A — referenced in the memo     |
| `exhibit_b.jpg`                   | Exhibit B — referenced in the memo     |
| `transeuro_data/employees.csv`    | Subpoenaed from TransEuro Logistics IT |
| `transeuro_data/access_log.csv`   | Subpoenaed from TransEuro Logistics IT |
| `transeuro_data/comms_export.txt` | Subpoenaed from TransEuro Logistics IT |
## RETEX

Ce challenge s’inscrit dans une enquête fictive autour du vol d’un chargement de KitKat disparu entre l’Italie et la Pologne en mars 2026. 
L’objectif est d’identifier la personne responsable du vol à partir d’un petit dossier d’enquête composé de plusieurs pièces : 
- `ecta_memo.pdf` : le briefing de départ. 
- `exhibit_a.eml` : un mail anonyme récupéré sous autorité judiciaire. 
- `exhibit_b.jpg` : une photo du véhicule au dernier point connu. 
- `transeuro_data/employees.csv` : la base des employés de TransEuro Logistics. 
- `transeuro_data/access_log.csv` : les journaux d’accès du système de planification. 
- `transeuro_data/comms_export.txt` : un export de communications internes. 
À partir de ces éléments, il faut recouper les indices techniques, logiques et OSINT pour remonter jusqu’au coupable.
![[content/Notes/TryHackMe/Have a Break/HaB_tree.png|500]]

---
>Which VPN service was used to send the anonymous email from the **.eml** file?

Pour trouver le vpn utilisé lors de l'envoi de l'email,  on peut analyser `exhibit_a.eml`.
![[content/Notes/TryHackMe/Have a Break/HaB_eml.png|500]]
Dans les entêtes cachés de l'email, il y a l'adresse source suivante : `193.32.249.132`.
Une petite recherche Google sur cette IP nous donne immédiatement le résultat : elle appartient à **==Mullvad VPN==**.
![[content/Notes/TryHackMe/Have a Break/HaB_VPN.png|500]]

---
>What is the full street address of the petrol station where the missing vehicle was last seen?

Pour localiser la station essence où le véhicule a été vu pour la dernière fois, on commence par lire le briefing `ecta_memo.pdf`.
![[content/Notes/TryHackMe/Have a Break/HaB_ecta_memo_hint.png|500]]
On y apprend que `exhibit_b.jpg` montre la **dernière photo** du véhicule, prise à une station sur la **D1 proche de Hulin**. 
![[content/Notes/TryHackMe/Have a Break/exhibit_b.png|500]]
En examinant la photo, on identifie clairement l'enseigne : **Orlen**.
Une recherche "Orlen Hulin" sur Google Maps nous donne instantanément la station correspondante à l'adresse :  **==Kroměřížská 1281, 768 24 Hulín, Czechia==** _(ne pas oublier de mettre le nom du pays en anglais)_
![[content/Notes/TryHackMe/Have a Break/HaB_Orlen_hulin.png|500]]

---
>At what time did the suspicious action take place in the route planning system on March 25th, 2026?  
>>**Format: HH:MM:SS**

Pour identifier l'horaire de l'action suspecte dans le système de planification, on examine les logs `access_log.csv`.
![[content/Notes/TryHackMe/Have a Break/HaB_access_log.png|500]]
Parmi toutes les actions, **une seule se démarque** : l'**export de `ROUTE_IT_PL_Q1_2026`** réalisé à **==22:14:09==**. 
Ce qui est troublant : 
- C'est le **seul export** dans les logs 
- Il a eu lieu **tard le soir**

---
>What is the employee ID of the person who sent the anonymous email?

L'employé anonyme précise dans son mail qu'il a vu dans les **activités du système interne la nuit** que quelqu'un avait donné les détails de la route à une autre personne.
![[content/Notes/TryHackMe/Have a Break/HaB_eml_hint.png|500]]
On peut donc en déduire qu'il a consulté les logs **quelque temps après l'exfiltration**, mais encore **pendant la nuit**.
![[content/Notes/TryHackMe/Have a Break/HaB_sus_night.png|500]]
La seule personne qui a accédé au fichier en question le **même soir** est l'ID **BR-0312**.

---
>What is the employee ID of the employee responsible for leaking the shipment details?

L'employé qui a **exfiltré les informations** est donc **==BR-0291==**.
Parce que :
- Il a **effectué l'export** du fichier route
- Après blocage par le management, il a eu **plusieurs accès refusés**, prouvant qu'il **utilisait activement** le fichier jusqu'au bout

---
>What is the full name of the culprit?

En examinant minutieusement `comms_export.txt`, on remarque que l'employé BR-0291 s'est **connecté sur un autre compte**.
![[content/Notes/TryHackMe/Have a Break/HaB_switch_account.png|500]]
Sur ce compte secondaire, il a utilisé l'adresse **kraliknovak09@gmail.com** pour envoyer le document.
![[content/Notes/TryHackMe/Have a Break/HaB_pa.png|500]]
Sur ce compte secondaire, BR-0291 utilise l'adresse **kraliknovak09@gmail.com** pour envoyer le document.
En utilisant l'outil **Epios**, on fait la liaison entre cette adresse et un compte Google.
![[content/Notes/TryHackMe/Have a Break/HaB_Epios.png|500]]
On pivote ensuite sur ses **avis** et on confirme que c'est bien lui : il a laissé un **commentaire sur la station essence** du début du challenge.
![[content/Notes/TryHackMe/Have a Break/HaB_map_contribution.png|500]]
On a donc son nom complet : **==Radovan Blšťák==**.

---
## Synthèse 
**Contexte** : Enquête fictive sur le vol d'un camion réfrigéré transportant 400 000 KitKat entre l'Italie et la Pologne en mars 2026. Mission : identifier le coupable à partir d'un dossier d'enquête ECTA.

### **Le déroulé de l'enquête**

**Point de départ** : Un email anonyme (exhibit_a.eml) arrive chez un journaliste. Dans ses en-têtes, une IP (193.32.249.132) qui appartient à **Mullvad VPN**. L'expéditeur est un employé qui a vu quelque chose de suspect.

**Première piste géographique** : Le memo ECTA mentionne une photo (exhibit_b.jpg) prise sur la D1 près de Hulin. On reconnaît l'enseigne **Orlen** et une recherche Google Maps donne l'adresse exacte : **Kroměřížská 1281, 768 24 Hulín, Czechia**.

**Logs suspects** : Dans access_log.csv, une action intrigue : l'**export du fichier ROUTE_IT_PL_Q1_2026** à **22:14:09** le 25 mars. C'est le seul export des logs, réalisé tard le soir.

**Qui a signalé ?** : L'employé anonyme parle d'une activité vue "la nuit". En vérifiant les logs du même soir, seul **BR-0312** a accédé au fichier après l'export.

**Qui a fuité ?** : L'analyse des logs désigne **BR-0291**. Il a fait l'export et a continué d'essayer d'y accéder après blocage par le management.

**Identification finale** : Dans comms_export.txt, BR-0291 utilise un compte secondaire avec l'email **kraliknovak09@gmail.com**. Epios fait le lien vers un compte Google, et ses avis confirment : il a commenté la station Orlen. **Radovan Blšťák** est identifié.

### **Ce qui a bien marché**
La chaîne était logique : email → logs → employé → email perso → identité. Les pivots OSINT (Epios, avis Google) étaient parfaits.