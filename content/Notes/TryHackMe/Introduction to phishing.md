---
tags:
  - SOC_Simulator
  - TryHackMe
  - Phishing
---
## Contexte
![[content/Notes/TryHackMe/Introduction to phishing/THM_intro-phishing.png]]
Ce challenge est un peu particulier. Il fait partie des challenges, développés par TryHackMe, qui repose sur un simulateur de SOC. Le principe, se mettre dans la peau d'un Analyste SOC L1. 
Nous allons donc avoir accès à une interface de ticketing classique, nous devrons les analyser (en utilisant des outils comme Splunk), puis répondre aux tickets en expliquant la situation, les impacts, les actions recommandées et décider si un passage au niveau 2 (pour plus d'analyse) est requis ou non.

Pour remplir les tickets, je vais utiliser le format suivant, le principe est d'être le plus synthétique possible pour faire gagner le plus de temps possible aux analystes SOC L2.

```
Who:

When:

Where:

What:

Why:

Impact:

IOCs:(hashes, domains, IP addresses, file names, etc)

Description:

Recommended actions:
```

Je pourrais rajouter une partie : `Mitre technique` mais étant donné que ce challenge se concentre sur le phishing, ça ne serait pas très pertinent.

Aussi, il faut savoir que le challenge se termine lorsque tous les vrai positifs ont été trouvés. Ça veut donc dire que même s'il reste des tickets dans la file, le challenge est fini lorsque je trouve le dernier Vrai Positif.

Voici des données qui sont à notre disposition dans ce challenge.
### Alert Triage Playbook

1. **Initial Alert Review**:
    - **Access the SOC Dashboard**: Open the SOC dashboard and review the new alerts
    - **Assign Alert to Yourself**: Add the first (earliest) alert to the list of assigned alerts
    - **Understand Alert Logic**: Review the alert description and understand its logic
    - **Review Alert Details**: Look at the IOCs provided in the alert, like IPs and domains
2. **Investigate in the SIEM**:
    - **Access the SIEM**: Open the "SIEM" tool to access raw security events that triggered the alert
    - **Query Related Logs**: Perform searches to gather more context and build the activity timeline
    - **Use Analyst VM**: From the "Analyst VM", open the TryDetectThis app to check the threat score of found indicators
    - **Correlate and Validate**: Correlate the alert data with other data sources to validate the credibility of the alert
3. **Resolution and Closure**:
    - **Decide on Alert Classification**: Click "Write Case Report" and follow the **Alert Classification** guide
    - **Write Case Report**: Provide a detailed report of the triaged alert according to the **Alert Reporting** guide
    - **Decide if Alert Requires Escalation**: For True Positives, refer to the same guide and follow the Escalation section
    - **Submit and Close the Alert**: Once the alert is triaged, submit and close its case report in the SOC dashboard

### Alert Classification

**True Positive**

Classification for unauthorised access to information, threats like malware, adware, phishing, brute force, account breach, or an action that violates the company’s security policies. True Positives are often candidates for further remediation steps like host isolation, password rotation, or malware cleanup.

**False Positive**

Classification for activities which were determined to be legitimate, meaning those that did not have malicious intent, can’t harm the organisation, and don’t violate the security policies. False Positives are often candidates for review to improve the detection rule or fix a misconfiguration in the network.

**Classification Examples**

- Rule "Windows Account Brute Force":
    - **True Positive**: Threat actor indeed attempted brute force, even if it was unsuccessful
    - **True Positive:** Contractor ran brute force attack via Hydra without getting any approval
    - **False Positive:** IT misconfigured their script and it now fails to log in every minute
    - **False Positive:** The password was expired but user tried to login with old credentials 6 times
- Rule "Login from Unfamiliar Location":
    - **True Positive**: Threat actor used EC2 instance in US to breach Europe-based employee
    - **True Positive:** Threat actor used a popular VPN service to access the breached account
    - **False Positive:** US-based employee accessed their email from phone during a vacation in Asia
    - **False Positive:** Sales person used an approved VPN to login and triggered the alert

### Alert Escalation

**Escalation Required**

True Positive alert must be escalated if additional actions or remediation are required, or if the alert belongs to a single incident (single attack chain) and is connected to other alerts that require escalation.

**When Escalation IS NOT Required**

- An employee downloaded an unwanted or cracked software from the web, but the downloaded installer was quarantined by AV or removed by the user before execution, before any impact
- A corporate mail server received an email, classified it as phishing, and quarantined it before any users had a chance to access the malicious email
- Botnet scanned the corporate website for common vulnerabilities like XSS and path traversal, and the activity did not cause any performance or security issues

**When Escalation IS Required**
- Threat actor gained access to the corporate server or workstation and ran a port or network scan from there, even if the scan was not successful or no further actions were followed
- Threat actor tried to dump credentials from the breached file server via Mimikatz, but the attempt was blocked by an existing EDR solution
- The alert was identified as part of a larger attack chain but was initially misclassified. Here, an analyst needs to go back and update their case report


### Alert Reporting

- Provide a clear and detailed explanation of the reason why the activity is classified as TP or FP
- Clearly explain why the alert requires escalation and which remediation actions may be required
- Specify the entities associated with the activity detected by the alert:
    - Identify **who** or **what** was affected
    - Indicate **where** the activity occurred
    - Clarify **when** the activity took place
- Provide all IOCs associated with the activity:
    - **Network Indicators**: IP addresses, Ports, Domains, URLs, etc
    - **Host Indicators**: File Names, File Paths, Hashes, Signatures, etc.
- Specify which goals the threat actor attempted to achieve
- (Optional) Specify which MITRE techniques or tactics the activity can be related to

### Best Practice Reports

- **True Positive - "Windows Account Brute Force"**
    
    > This activity is classified as a True Positive due to detected brute force attempts from the IP address 211.219.22.213 to the CORP-11 Windows host on the TryHatMe environment. This IP is flagged as malicious on the TryDetectThis app. The attack targeted the username Bob Taylor. This activity started at 10:22 on 05.02.2025. After more than 100 unsuccessful attempts, a successful login was detected at 10:27 on 05.02.2025 from a malicious IP to Bob's account. Immediate escalation is required, as unauthorised access was detected, necessitating remediation actions like account lockout and password change.
    
- **False Positive - "Windows Account Brute Force"**
    
    > This activity is classified as a False Positive. I detected that Bob Taylor attempted to log into the CORP-11 Windows host on the TryHatMe environment from the IP address 12.23.4.115. It is worth noting that this user regularly engages in activity from this IP address. During the investigation, 6 failed login attempts were found starting at 12:23 on 01.02.2025, with the reason for the failures being the user's expired password. This resulted in failed events triggering the correlation rule. No anomalies were found.
    

Voici l'annuaire de l'entreprise avec l'identifiant des postes pour chaque utilisateur.
![[content/Notes/TryHackMe/Introduction to phishing/THM_intro-phishing_info_compagnie.png]]
On peut aussi préciser le sous réseau utilisé : Office Network → 10.20.2.0/24

---
## Tickets
Nous avons à notre disposition une interface de SIEM, il était possible de choisir entre Splunk et Elastik, pour cette fois, j'ai pris Splunk.
Nous avons aussi accès à une machine d'analyste avec un outil nommé `TryDetectThis` qui permet de vérifier la légitimité d'un domaine par exemple.
![[content/Notes/TryHackMe/Introduction to phishing/THM_into-Phishing_alertes.png]]
Enfin, nous avons aussi accès à une file de ticket, qui s'agrandit avec le temps.

---
### Ticket 8816 - Access to Blacklisted External URL Blocked by Firewall
![[content/Notes/TryHackMe/Introduction to phishing/THM_intro-phihsing_1_alerte.png]]
J'ai choisi de prioriser ce ticket parce qu'il était le seul avec une sévérité Haute, pour les autres, je prendrais le plus vieux de la sévérité la plus haute.
Ce ticket nous décrit donc une tentative d'accès à un URL bloqué par le firewall : `http://bit.ly/3sHkX3da12340`.
Cette URL serait soit dans la blacklist, soit résultante d'un canal d'intelligence de la menace.
On peut donc la check sur TryDetectThis.
![[content/Notes/TryHackMe/Introduction to phishing/THM_intro-phihsing_1_alerte_url.png]]
L'outil nous dit qu'elle est clean, mais c'est possible qu'elle ne fasse juste pas encore partie des bases de données contactées par l'outil.
Continuons en vérifiant l'IP liée à cette URL : `67.199.248.11`
![[content/Notes/TryHackMe/Introduction to phishing/THM_intro-phishing_1_alerte_ip.png]]
L'adresse IP est considérée comme malicieuse. 

Essayons d'avoir plus de contexte, pour ce faire, on peut chercher les mots clés qui nous intéressent dans Splunk, comme l'adresse IP ou le lien directement.
![[content/Notes/TryHackMe/Introduction to phishing/THM_intro-phishing_1_alerte_mail.png]]
On peut trouver un log qui explicite qu'`h.harris@thetrydaily` a reçu un email de la part de `urgents@amazon.biz` qui lui explique que son colis n'a pas pu être livré parce qu'il manque des informations dans l'adresse et que ce colis sera retourné à l'expéditeur si les informations manquantes ne sont pas ajoutées via le lien suivant dans les 48H : `http://bit.ly/3sHkX3da12340`.

Après avoir vérifié l'annuaire, on apprend que `h.harris@thetrydaily`, c'est Hannah Harris du service des ressources humaines et que son poste, c'est le `win-3457`.

On sait donc que c'est elle qui a reçu ce phishing à 16:20:30 et qu'elle a cliqué sur le lien à 16:21:34, mais qu'elle n'a pas pu accéder à la page parce que l'URL était bloquée par le Firewall.

C'est donc un Vrai positif, et nous n'avons pas besoin d'escalader puisque l'URL a été bloquée par le Firewall donc aucun impact n'a été recensé.

On peut donc écrire la réponse au ticket suivante :
```
Who: Hannah Harris (human ressource)

When: 4/26/26 3:20 PM

Where: win-3457

What:receveice phishing email and click on the malicious link

Why: To obtain some information from their target (adress, name, etc)

Impact: The firewall block the OUTbound request

IOCs: urgents@amazon.biz, http://bit.ly/3sHkX3da12340, 67.199.248.11

Description: Hannah Harris received from the sender urgents@amazon.biz an email with the subject "Your Amazon Package Couldn't Be Delivered - Action Required", the email contians somes red flag like : sense of emergency "within 48 hours", lack of information (only "your package" not even an id package). 
The Url doesn't trigger the TryDetectThisApp but the IP was state as malicious.
The firewall block the OUTbound request, and the url was already blacklist

Recommended actions:
Alert Hannah Harris that it was a phishing attempted, and make her participate in a formation about phishing.
```

---

### Ticket 8814 - Inbound Email Containing Suspicious External Link
![[content/Notes/TryHackMe/Introduction to phishing/THM_intro-phishing_2_alerte.png]]
Pour ce ticket, c'est une alerte de réception d'un email contenant un lien externe suspicieux.
L'email a été réceptionné par `j.garcia@thetrydaily.thm` qui est Julia Garcia du service "Content", et qui utilise le poste win-3452, avec l'IP suivante : `10.20.2.8`.

L'expéditeur est `onboarding@hrconnex.thm` et le lien suspicieux est le suivant : `https://hrconnex.thm/onboarding/15400654060/j.garcia`

Encore une fois, je commence par vérifier tout ça sur TryDetectThis :
![[content/Notes/TryHackMe/Introduction to phishing/THM_intro-phishing_mail.png]]
![[content/Notes/TryHackMe/Introduction to phishing/THM_intro-phishing_url.png]]
Cette fois-ci, le domaine et l'URL sont clean, mais continuons les analyses.

![[content/Notes/TryHackMe/Introduction to phishing/THM_intro-phishing_2_alerte_splunk.png]]
En recherchant des logs contenant `hrconnex.thm` je suis tombé sur un log qui explicite un mail de `h.harris@thetrydaily` (du service des ressources humaines) qui explique à `j.carter@thetrydaily.thm` (du IT Support) que J. Garcia (celui qui a reçu le mail avec le lien suspicieux) n'a pas reçu son mail d'inscription a leur nouvelle application externe `hrconnex.thm`, ce qui fait qu'il ne peut pas compléter son profil et signer des papiers.

La date et le nom de l'application concorde avec les infos du ticket, on sait donc que ce n'est qu'un faux positif, et qu'il faudrait mettre en whitelist le domaine et les mails de la part de cette application.

On peut donc répondre au ticket : 
```
This activity is classified as a False Positive. 
Julia Garcia, Content, win-3452, 10.20.2.8 receveid an email, at 04/26/2026 16:17, with a link wich was from our new third party app : The Try Daily.
The link with considered suspicious, but it was truly from the solution, Jacob Carter from the IT Support explained it in an mail .
We need to white list mails from this app.
```

---
### Ticket 8815 - Inbound Email Containing Suspicious External Link
![[content/Notes/TryHackMe/Introduction to phishing/THM_intro-phihsing_3_alerte.png]]
Ce ticket fait directement référence au mail reçu par Harris avec le lien suspicieux sur lequel elle aurait cliquée.
On peut donc lier ce ticket au ticket 8816.
Puis répondre directement au ticket : 
```
This alert is link to the alerte number : 8816. So it's also a true positive.

Who: Hannah Harris (human ressource)

When: 4/26/26 3:20 PM

Where: win-3457

What:receveice phishing email and click on the malicious link

Why: To obtain some information from their target (adress, name, etc)

Impact: The firewall block the OUTbound request

IOCs: urgents@amazon.biz, http://bit.ly/3sHkX3da12340, 67.199.248.11

Description: Hannah Harris received from the sender urgents@amazon.biz an email with the subject "Your Amazon Package Couldn't Be Delivered - Action Required", the email contians somes red flag like : sense of emergency "within 48 hours", lack of information (only "your package" not even an id package).  
The Url doesn't trigger the TryDetectThisApp but the IP was state as malicious.  
The firewall block the OUTbound request, and the url was already blacklist

Recommended actions:  
Alert Hannah Harris that it was a phishing attempted, and make her participate in a formation about phishing.
```

---
### Ticket 8817 - Inbound Email Containing Suspicious External Link
![[content/Notes/TryHackMe/Introduction to phishing/THM_intro-phishing_3_alerte.png]]
Ce ticket est aussi lié à la réception d'un mail qui contient un lien suspicieux.
Le mail aurait été reçu par `c.allen@thetrydaily.thm` (Charlotte Allen du service Développement Web sur la machine `win-3463` avec l'IP `10.20.2.25`).

Cette fois-ci l'expéditeur est `no-reply@m1crosoftsupport.co`, et le lien est : `https://m1crosoftsupport.co/login`.
Cette fois-ci pas de doute, c'est un phishing, ils ont même utilisé une technique de Typosquatting en remplaçant le "i" de Microsoft par un "1" pour paraître légitime.
Nous devons donc constater si l'utilisatrice a cliqué ou non sur le lien.
![[content/Notes/TryHackMe/Introduction to phishing/THM_intro-phishing_splunk.png]]
D'après Splunk, le firewall a autorisé la requête suite au clic sur le lien par Charlotte. L'IP de destination est `45.148.10.131`.
Je ne vois pas grand-chose d'autre avec mes logs, mais on peut donc en déduire que c'est un vrai positif et qu'il faut l'envoyer un L2 pour qu'ils vérifient l'étendu des dégats (s'il y en a), mais aussi pour bloquer le domaine et l'IP et faire les actions de remédiations nécessaires (renouvellement de mot de passe, kill session momentanée, etc).

On peut donc répondre au ticket : 
```
Who: Charlotte Allen, Web Development

When: 4/26/26 16:22

Where: win-3463, 10.20.2.25

What:receveice phishing email and click on the malicious link

Why: To obtain some information from their target (adress, name, etc)

Impact: The firewall accept the OUTbound request when she clicked on the link

IOCs: no-reply@m1crosoftsupport.co, https://m1crosoftsupport.co/login, 45.148.10.131

Description: Charlotte Allen received from the sender no-reply@m1crosoftsupport.co an email with the subject "Unusual Sign-In Activity on Your Microsoft Account", the email contains somes red flag like : sense of emergency "secure your account immediately", typposquatting "m1crosoftsupport.co" microsoft but with an "1" instead of the "i"
The firewall didn't block the OUTbound request.

Recommended actions:
Alert Charlotte Allen that it was a phishing attempted, and make her participate in a formation about phishing.

Escalated to L2, rotate the password of Charlotte Allen, survey her account, check if their are unusual activity on it.

Blacklist the domain "m1crosoftsupport.co" and the ip "45.148.10.131"
```

Et apparemment, c'était le dernier vrai positif, l'exercice s'arrête donc avec ce ticket.

---
## Résultats
![[content/Notes/TryHackMe/Introduction to phishing/THM_intro-phishing-1.png]]
J'ai donc réussi à trouver tous les vrais positifs.

Par contre, j'ai perdu beaucoup de point sur les détails de renvoi de ticket, en voici une analyse : 
- Je n'ai pas toujours renseigné toutes les infos dans le "Who", de temps en temps, j'oubliai l'IP ou l'email.
- Je n'ai pas réutilisé certaines phrases de contexte tel quel dans l'énoncé, du coup l'IA considère que je n'ai pas renseigné certaines infos comme les actions de remédiation, je devais noter "remediation actions" plutôt que "Recommended actions" et j'aurais dû noter directement "the external URL that is listed in the organisation's blacklist or threat intelligence feeds" plutôt que de le reformuler avec mes mots.
- Je n'ai pas été très explicite sur les impacts en termes de perte de données ou de compromission.
- Je n'ai pas non plus précisé complètement pourquoi je faisais escalader les tickets vers la L2.
- Je devrais mentionner lorsqu'il n'y a pas d'impact visible de mon côté plutôt que de ne pas en parler.

Pour une simulation de SOC un peu plus complexe et difficile, [[Phishing Unfolding]] est un très bon exercice.