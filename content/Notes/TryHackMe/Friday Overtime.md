---
tags:
  - cyberchef
  - CTI
  - AutreChall
  - TryHackMe
---
## Énoncé 
>[!warning] Disclaimer
>**Please note:** The artefacts used in this scenario were retrieved from a real-world cyber-attack. Hence, it is advised that interaction with the artefacts be done only inside the attached VM, as it is an isolated environment.

>**Hello Busy Weekend. . .**
>
>It's a Friday evening at PandaProbe Intelligence when a notification appears on your CTI platform. While most are already looking forward to the weekend, you realise you must pull overtime because SwiftSpend Finance has opened a new ticket, raising concerns about potential malware threats. The finance company, known for its meticulous security measures, stumbled upon something suspicious and wanted immediate expert analysis.
>
>As the only remaining CTI Analyst on shift at PandaProbe Intelligence, you quickly took charge of the situation, realising the gravity of a potential breach at a financial institution. The ticket contained multiple file attachments, presumed to be malware samples. 
>
>With a deep breath, a focused mind, and the longing desire to go home, you began the process of:
>1. Downloading the malware samples provided in the ticket, ensuring they were contained in a secure environment.
>2. Running the samples through preliminary automated malware analysis tools to get a quick overview.
>3. Deep diving into a manual analysis, understanding the malware's behaviour, and identifying its communication patterns.
>4. Correlating findings with global threat intelligence databases to identify known signatures or behaviours.
>5. Compiling a comprehensive report with mitigation and recovery steps, ensuring SwiftSpend Finance could swiftly address potential threats.
## RETEX
Pour ce challenge, j’utilise une **machine virtuelle isolée**, spécialement configurée pour l’analyse de fichiers potentiellement malveillants.  
Mon premier réflexe est de **découvrir mon environnement** : j’ai accès à un terminal, mais aucun fichier disponible en local.  
Je remarque aussi la présence d’une plateforme appelée **DocIntel / PandaProb**, qui semble être notre outil de ticketing interne.  
Un **ticket est déjà disponible**.
![[THM_FO_ticket.png|500]]
**Le ticket explique qu’un possible RAT a été découvert**, et qu’il aurait déjà infecté plus de **9 000 systèmes**.  
Dans le descriptif, plusieurs fichiers suspects sont partagés dans une archive ZIP protégée par le mot de passe suivant : `Panda321!`

---
> Who shared the malware samples?

D’après le ticket, **la personne à l’origine du partage est ==Olivier Bennett==**

---
> What is the SHA1 hash of the file "pRsm.dll" inside samples.zip?

Après avoir décompressé le fichier `samples.zip` à l’aide du mot de passe communiqué (`Panda321!`), j’obtiens plusieurs fichiers DLL supposés malveillants.
![[THM_FO_sha1sum_dll.png|500]]

Afin de générer une empreinte qui permettra d’identifier précisément le fichier, j’utilise la commande suivante dans le terminal : `sha1sum pRsm.dll`

Le résultat renvoyé est : 
**SHA‑1 : ==9d1ecbbe8637fed0d89fca1af35ea821277ad2e8==**

---
> Which malware framework utilizes these DLLs as add-on modules?

Je souhaite maintenant déterminer si ce fichier correspond à un malware déjà connu.  
Pour cela, je soumets le **hash** obtenu précédemment sur **VirusTotal** afin de le comparer avec des échantillons référencés.  
Les résultats indiquent que ces DLL sont bien connues et utilisées comme modules additionnels du **framework de malware ==MgBot==**.
![[THM_FO_VT.png|500]]
Ce framework est fréquemment lié à des campagnes menées par le groupe **Evasive Panda** et offre des fonctions modulaires telles que la collecte de données, la persistance ou le contrôle à distance.

---
> Which MITRE ATT&CK Technique is linked to using pRsm.dll in this malware framework?

En effectuant une recherche sur les mots-clés _“MgBot MITRE pRsm.dll”_, je trouve [cet article](https://www.welivesecurity.com/2023/04/26/evasive-panda-apt-group-malware-updates-popular-chinese-software/) expliquant la correspondance MITRE ATT&CK.
![[THM_FO_article.png|500]]
L’article mentionne que le fichier `pRsm.dll` est associé à la **technique ==T11223==** du cadre **MITRE ATT&CK**, correspondant à des comportements d’injection et d’exécution de modules RAT.

---
> What is the CyberChef defanged URL of the malicious download location first seen on 2020-11-02?

L’article précédemment cité répertorie également l’URL malveillante utilisée pour la distribution du malware.
![[THM_FO_url.png|500]]
Pour éviter toute ouverture accidentelle, je passe l’adresse dans **CyberChef** afin de la _defang_(neutraliser) :
![[THM_FO_cyberchef.png|500]]
On a donc l'URL de sortie suivante : **==hxxp[://]update[.]browser[.]qq[.]com/qmbs/QQ/QQUrlMgr_QQ88_4296[.]exe==**

---
> What is the CyberChef defanged IP address of the C&C server first detected on 2020-09-14 using these modules?

En recherchant la date **2020‑09‑14** dans la même source, je repère l’adresse IP du serveur de commande et contrôle (C2) utilisé par ces modules.
![[THM_FO_C2.png|500]]
Je la defang également dans CyberChef  : **==122[.]10[.]90[.]12==**

---
> What is the md5 hash of the spyagent family spyware hosted on the same IP targeting Android devices in Jun 2025?

Enfin, je poursuis la corrélation en étudiant les autres malwares hébergés sur la même IP via **VirusTotal**.
![[THM_FO_ip.png|500]]
On y découvre qu’en **juin 2025**, un spyware Android appartenant à la **famille SpyAgent** a été détecté à la même adresse.
Voici le hash du spyware Android : **==951F41930489A8BFE963FCED5D8DFD79==**

---
## Synthèse
L’investigation a permis d’identifier que les fichiers transmis par SwiftSpend Finance étaient liés au framework **MgBot**, un spyware utilisé par le groupe **Evasive Panda**.  
Les analyses — extraction, calcul de hash, recherche sur VirusTotal et corrélation MITRE ATT&CK — avaient pour objectif de confirmer la nature du malware, retracer son origine et comprendre ses mécanismes opérationnels (RAT modulaire, injection de DLL, communications avec un C2).  
Les indicateurs collectés (hashs, URL et IP defangées, famille de spywares associée) permettent de renforcer la détection et d’alimenter la base de Threat Intel de l’organisation, tout en facilitant la mise en place de mesures de mitigation adaptées pour le client.