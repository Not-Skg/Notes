---
title: Threat Intelligence
tags:
  - Osint
  - Chall
  - MaltegoQualifierB
order: 3
description: RETEX des challenges de la catégorie "Threat Intelligence" du Maltego Community OSINT CTF, Qualifier B
---
![[MaltegoQualifierB.webp]]

>[!info] Notes
> Voici les retex des challs de la catégorie "Threat Intelligence" du Qualifier B du Maltego Community OSINT CTF Championship 2026-27.

***Les différentes parties du CTF :***
 · | · [[Geolocation]]
 · | · Threat Intelligence
 · | · `[[Fraud]]`
 · | · `[[Physical Security]]`
 · | · `[[Chronolocation]]`
 · | · `[[Trust & Safety]]`
 · | · `[[Due Diligence]]`
 · | · `[[Maritime & Aviation]]`
 · | · `[[Dark Web]]`

---
## Blind Spot - 1

### Énoncé
> Your team is investigating a suspected cyberattack, and the only initial pivot point available is the file hash: 00fb522f8d19a1ee3fa1d23c55d55134454fb9067474d836dfd9019c948d0e9e
>
> During the investigation, an analyst discovers that suspicious executables placed inside a particular directory were ignored by Windows Defender. Your task is to investigate the available malware analysis data and examine the process tree to identify the exact directory path excluded from protection.
>
>> Submit the full excluded directory path using the following flag format: flag{Excluded_Directory_Path}
>>
>> Note: Submit the exact string as it appears in the analysis report. Preserve the original letter casing, spelling, and path format without making any changes.

### RETEX
Le seul point de départ est un hash SHA256. Pas besoin de récupérer l'échantillon : on regarde d'abord si des sandboxes publiques l'ont déjà analysé. C'est le cas sur ANY.RUN, qui en a une [analyse publique](https://app.any.run/tasks/f0e39539-4067-4f67-a6ed-38cee9f6733a/), classée AsyncRAT et DonutLoader.

L'énoncé nous oriente vers l'arbre des processus (Processes).
![[MQB_BS1_1.png|700]]
L'échantillon lance, via `cmd.exe`, un faux `OneDrive.exe` placé dans `C:\ProgramData` (1). Ce faux OneDrive appelle ensuite deux fois `MpCmdRun.exe`, l'outil en ligne de commande de Windows Defender, avec l'option `-AddExclusion` (2) : le dossier `C:\ProgramData` est exclu de l'analyse, et le malware peut y déposer ses exécutables sans être détecté.

Le dossier exclu est donc **==C:\Program Data==**.

>[!warning] Attention à l'écriture
> Le rapport écrit `C:\ProgramData`, sans espace, alors que le flag validé était `flag{C:\Program Data}`, avec une espace.

---
## Blind Spot - 2

### Énoncé
> Following the previous investigation analysts captured an outbound TLS handshake initiated by an impostor process communicating with an external Command-and-Control (C2) server. Your task is to investigate the available malware analysis report and examine the network activity to identify the exact socket address used for the Remote Access Trojan (RAT) communication channel.
>
> Determine the destination IPv4 address and destination port associated with the suspicious communication and submit them in the required flag format.
>
>> Flag Format: flag{IP_Port}
>>
>> Submit the destination IP address and port exactly as identified in the analysis report. Replace every dot (.) in the IPv4 address with an underscore (_), and separate the IP address and port with an underscore. Do not include any dots in the final flag.
>>
>> Example: If the destination IP is x.x.x.x and the port is 0000, the flag should be: flag{x_x_x_x_0000}

### RETEX
L'analyse ANY.RUN de la partie 1 ne dure que 70 secondes, et on n'y voit aucune connexion du faux OneDrive vers un serveur de commande. On cherche donc le même hash sur une autre sandbox publique : [Triage](https://tria.ge/s?q=00fb522f8d19a1ee3fa1d23c55d55134454fb9067474d836dfd9019c948d0e9e), de Recorded Future, en a aussi un rapport (1).
![[MQB_BS2_1.png|700]]
Dans la partie Network du [rapport](https://tria.ge/261017-kymwdscw7k/behavioral1), l'onglet TCP liste les connexions ouvertes pendant l'analyse. Une seule vient de `OneDrive.exe`, notre processus imposteur : une connexion TLS vers `31.6.11.228`, sur le port `7777` (1).
![[MQB_BS2_2.png|550]]
Le même rapport lève d'ailleurs une alerte Suricata "AsyncRAT Malware Default X.509 Certificate Detected" : le certificat échangé pendant la poignée de main TLS est celui d'AsyncRAT, ce qui confirme que c'est bien le canal du RAT.

Le flag est donc **==31_6_11_228_7777==**.

---
## Blind Spot - 3

### Énoncé
> During the ongoing malware investigation, analysts used automated configuration extraction tools to recover the encrypted configuration dictionary from the running AsyncRAT client.
>
> Your task is to examine the available malware analysis report, investigate the extracted configuration data, and identify the raw ASCII string obtained after decoding the relevant value.
>
>> Submit the decoded ASCII string using the specified flag format.
>>
>> Flag Format: flag{decoded_ascii_string}

### RETEX
Triage extrait automatiquement la configuration des malwares qu'il reconnaît. Dans le même rapport, la partie Malware Config confirme qu'on a affaire à AsyncRAT (1) et donne sa configuration : botnet, mutex, fichier d'installation…
![[MQB_BS3_1.png|450]]
AsyncRAT chiffre sa configuration en AES, avec une clé stockée encodée en base64. Triage affiche directement cette clé décodée, dans la ligne `aes.plain` (2).

La chaîne ASCII décodée est donc **==5i7HJHHAzLmjYv0NAzYvFAhJrIoZXJR2==**.

---
## Blind Spot - 4

### Énoncé
> During the investigation, analysts uncovered a suspicious behavior in the masqueraded OneDrive.exe payload. Dynamic analysis revealed that the process invoked a Windows API capable of intercepting user keystrokes system-wide. Your task is to examine the malware analysis report, identify the Windows API function responsible for this behavior, and determine the hook identifier parameter used to enable the keystroke-monitoring capability.
>
>> Submit both values in the specified flag format. Flag Format: flag{API_Name_HookIdentifier}
>>
>> Preserve the exact spelling and capitalization of the API function name and hook identifier as shown in the analysis report. Replace spaces or other separators with underscores (_) as required by the flag format. Note - Use the hook identifier’s constant name exactly as shown in the report , not its numeric value. Preserve exact spelling and capitalization.

### RETEX
Le flag a deux parties : le nom de la fonction Windows, puis l'identifiant du hook.

Pour intercepter les frappes clavier sur tout le système, un programme Windows installe un "hook" avec la fonction `SetWindowsHookEx`. Dans la partie Signatures du rapport Triage, on trouve justement "Suspicious use of SetWindowsHookEx" (1), attribuée au processus 2176, qui est le faux `OneDrive.exe` dans l'arbre des processus (2).
![[MQB_BS4_1.png|550]]

Le rapport ne montre pas les paramètres de l'appel. Mais on sait depuis la partie 3 que le malware est AsyncRAT, dont le code source est public sur [GitHub](https://github.com/NYAN-x-CAT/AsyncRAT-C-Sharp/blob/master/AsyncRAT-C%23/Plugin/LimeLogger/LimeLogger/Packet.cs). Dans son module keylogger, on voit que :
- le hook est installé avec `SetWindowsHookEx(WHKEYBOARDLL, …)` (1) ;
- `WHKEYBOARDLL` vaut 13 (2) ;
- la fonction est importée avec `CharSet = CharSet.Auto` (3) : sous Windows, .NET appelle alors la version Unicode de la fonction, `SetWindowsHookExW`, d'où le W.
![[MQB_BS4_2.png|700]]

Il reste à retrouver le nom de la constante qui vaut 13. La [documentation Microsoft de SetWindowsHookExW](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setwindowshookexw) liste les identifiants possibles : 13 correspond à `WH_KEYBOARD_LL`, le hook qui surveille les frappes clavier "bas niveau" (1).
![[MQB_BS4_3.png|600]]

En assemblant la fonction et l'identifiant, on obtient **==SetWindowsHookExW_WH_KEYBOARD_LL==**.

---
***Les différentes parties du CTF :***
 · | · [[Geolocation]]
 · | · Threat Intelligence
 · | · `[[Fraud]]`
 · | · `[[Physical Security]]`
 · | · `[[Chronolocation]]`
 · | · `[[Trust & Safety]]`
 · | · `[[Due Diligence]]`
 · | · `[[Maritime & Aviation]]`
 · | · `[[Dark Web]]`
