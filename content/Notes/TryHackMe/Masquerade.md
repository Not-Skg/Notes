---
tags:
  - cyberchef
  - DFIR
  - AutreChall
  - TryHackMe
---

## Scenario
>Jim from the Finance department received an email that appeared to come from the company’s system administrator, asking him to run a script to “**apply critical security updates**.” Trusting the message, Jim executed the script on his workstation. Shortly after, unusual network traffic and system activity were observed. You have been provided with relevant artifacts to investigate what happened, determine the impact, and identify how the attacker established control over the system.
>
>>**Important!**: These artifacts contain **real malware;** however, the challenge can be completed entirely through static analysis, and there is no need to run or execute any of the files. Despite that, analysis should still be conducted in a **controlled environment** such as a virtual machine (**VM**).

## RETEX

Pour ce challenge, notre collègue Jim du département des finances a exécuté un script sans savoir si son origine était malicieuse. Quelque temps plus tard, du traffic internet inhabituel a été détecté, de même pour des comportements du système.
On va donc essayer d'analyser tout ça...
Pour nous aider dans nos analyses, on a reçu un evtx et un pcap.

> What external domain was contacted during script execution?

Pour commencer, j'ai voulu regarder le contenu de l'evtx, pour ce faire j'ai utiliser un outil en ligne sympa développé par Omer Benamram, et sobrement nommé evtx.
![[THM_Masquerade_evtx1.png]]
Il n'y a pas beaucoup d'entrée, je peux donc les regarder une à une. 
Une entrée en particulier retient mon attention, elle contient un script.
Dans la deuxième ligne de ce script, je distingue une sorte de lien mais éparpiller et avec pleins de caractères dedans (`+`, `,`, `'`).

![[THM_Masquerade_cc_evtx1.png]]
En utilisant CyberChef, on peut facilement les retirer.

Ce qui nous donne donc deux strings intéressants : 
- Un lien : `http://api-edgecloud.xyz/amd.bin`
- Une clé `X9vT3pL2QwE8xR6ZkYhC4s`

En relisant attentivement le script, je m'aperçois qu'il télécharge `amd.bin` via le site `api-edgecloud` puis le renomme en `amdfendrsr.exe`. Mais avant de le renommer, il le déchiffre via la clé `X9vT3pL2QwE8xR6ZkYhC4s`.

---
> What encryption algorithm was used by the script?

Pour savoir la méthode de chiffrement utilisé, j'ai demandé à Perplexity.
![[THM_Masquerade_perpl.png]]
Il en a déduit que c'est du ==RC4==, et ça on aime bien parce que ça utilise une clé symétrique, on chiffre et déchiffre donc avec la même clé.

---
> What key was used to decrypt the second-stage payload?

Pour s'assurer que c'était bien la bonne clé, on peut essayer de déchiffrer le fichier.
![[THM_Masquerade_WS_amd.png]]
Pour ça il faut d'abord extraire le fichier comme suit :
File -> Export Objects -> HTTP -> amd.bin -> Save

Enfin, on peut l'ajouter sur CyberChef, lui préciser que c'est de l'Hex, qu'on veut le déchiffrer via RC4 et la clé **==`X9vT3pL2QwE8xR6ZkYhC4s`==**
![[THM_Masquerade_CC2.png]]
Et en téléchargeant le fichier résultant, on trouve bien un fichier considéré comme virus...
![[THM_Masquerade_DL.png]]

On peut vérifier son état via la commande `file` et on apprend que c'est un PE32
![[THM_Masquerade_PE.png]]

---
> What was the timestamp of the server response containing the payload?

Pour retrouver le timestamp lié a la réponse du serveur contenant la payload, on peut faire : 
![[THM_Masquerade_WS_Follow.png]]
Clic droit sur la requête à l'origine du téléchargement du ficheir amd.bin -> Follow -> HTTP stream
![[THM_Masquerade_WS_Follow_bin.png]]
On apprend donc que le serveur attaquant fonctionne sous python 3.11.2 et le timestamp est le suivant : **==Fri, 10 Apr 2026 05:28:23 GMT==**

---
> What is the SHA-256 hash of the extracted and decrypted payload?

Pour avoir le SHA-256 on peut juste demander à CyberChef d'ajouter un SHA256 sur le fichier qu'il nous a sorti plus tôt.
![[THM_Masquerade_CC_SHA.png]]
On obtient donc : **==`e3d39d42df63c6874780737244370ba517820f598fd2443e47ff6580f10c17cb`==**

---
> What remote URL did the client use to communicate with the victim machine?

En analysant les trames réseaux (Statistics -> Conversations -> IPv4) on s'aperçoit qu'une IP a eu un énorme trafic avec la victime lors de l'incident.
![[THM_Masquerade_WS_IP.png]]

En recherchant le SHA256 récupéré plus tôt sur VirusTotal, on apprend que c'est bien un virus connu, et qu'il est lié a une adresse spécifique, la même adresse qu'on a trouvé dans notre pcap : [http://34.174.57.99/](https://www.virustotal.com/gui/url/4f4c092eae02f1c391b9b5a6f8bdefd6a5c81e21b624192e2af22f8cf0684e33)
![[THM_Masquerade_VT.png]]

---
> Which encryption key and algorithm does the client use?

Normalement, si l'on veut vraiment analyser un PE dans les règles de l'art, il faudrait le décompiler, avec ghidra par exemple.
Mais je n'ai pas beaucoup de temps, donc je vais faire autrement.
![[THM_Masquerade_strings.png]] 
En regardant le résultat de la commande `strings` sur le PE, je me rends compte qu'il y a beaucoup de mot clé intéressant, `CIPHER`, `SHA256Managed`, `AesManaged`, `encryptedStriingWithIV`, ...
On peut donc déjà en déduire qu'il y a d'autres informations chiffrées liées à ce PE, et elles sont chiffrées via **==AES==** puisque le SHA256 était utilisé à l'étape d'avant.
![[THM_Masquerade_cat.png]]

Si on regarde un peu plus en détails avec un `cat`par exemple, on peut revoir ces mots clé, mais surtout ceci : `KeyCreateAesKeykeySystem.Security.Cryptographyop_EqualityEM4squ3r4d3Th3P4ck3tSt34lthM0d31337`
On a donc la clé de chiffrement AES utilisé : **==M4squ3r4d3Th3P4ck3tSt34lthM0d31337==**

---
> After determining the client's encryption, decrypt the commands the attacker executed on the victim and submit the flag.

En analysant encore un peu le PE, on retrouve ce `http://34.174.57.99/images?guid=GET...` que j'avais vu auparavant dans Wireshark.
![[THM_Masquerade_GET.png]]
En revenant sur Wireshark, on voit qu'il y en a quatre liés à cette adresse.
- `guid=c09Gc3pZOGRaOGF6MWo4bUNKM0tGUktFK2t2b3dOOEtQR2hhWUF0VVlhcUdwWjl4RGJHNXR1UnkyRzdOTXptdQ==`
- `guid=bk8zVGkzeDhoR1BYMjl5S1MvUHJEdHFTaVBvUlE1Q05xNGFkNS8xRGE3U1hzenBCeDJOamNuc1lGRE1INEdtRERxYkNMc1BsWFlaT2RXbmpYV1l1RGpHenUvdjlkMStCSnV1VC91a1lZVjlGUjR3NVR1TklVOVVBZExkMktDQnRqa0xjSnlpUW9oc1F0REowNS9COC9wQjlSK0EvL20rMGt0RnBhYWxMQW9YeG5teEJ0am81QkphMTExSmdFcXI0THcwSlB0OHg5dk8wNXNrTk92WkczUVNNZ2JUSTlMdGlpL2E4Z0t3NlRCemkybXM4WEVhTlpoQWlEMU5nMTZad0JJVCtSZEN5Wlg1Rm5hUHczcEZDZFVhbEFnRDdraWd4L29XTTVqOVBZWEl3dFBOQk44Tkx6bzNGd054OU9oYlNGSEhvUXdabXdzT3l6L0xsR0g0Zy9UbWRkVlByME1BZnVGNmY0WmptOExCRE40Y2ZzamRwVmJ2MHR1dDc2ZjR2MGQzSVFZT2FadmoxdzJrNm05MTAxcHhJM1I4REw1WWVXRHR6bC9QZUpxU2E3Qis1KzJvSHl0M3FsY1kwaUVoZzJ0ekYyaW9qYVlrSUZjNXVXMmtqUk9rMzFVcVFGengyTzN0c21KTU80L1U0S2VrM3dEQnRESTRiaG5rRjFTZnVKN0ZQVmtxU3R1RVE5Z2tsc0pNS3o5YnoxUzRLOXNpZnhoT0JTVS84ZmFweFRVQ0o5YkprOUt1c2JEZzZyaTQ3Wk1JbVFVRXpxV2ZaU2wwYTZ0VE5TUm40N3FOOFJpbjh4ZzhCTnZyT0FsUHdYMjdxcytqeExJTDFmM1FDcWlNb01mOU4xaTIrT1FneE5TT0pDVzdjb05WSEk4L2JERWh0aWhPa3V0bC85WGZjL2lKVWV1TDVXclFESHp6Mzg2azN2UWxHQzFTQ3ppVHBoRFM2VTFmeXNHSXNINzlIOENYakl4RjBLR0x4RE5YNFE1Y2pGczZSWjJ3K3Exd3BUTjBsclpad3NQbUV1YUdjZ0JoUXNBbW1LQ3AxODhSSUFNK2NaVTV1Q2NBZXJ4dytyaDFkbWk0elVmQUdRM2tqb2RXMTBuaUhPend0UGlDazUycXlmWWlrblJKdW12SDRMbytsb1BXRjNJOWFQTkFBUU94VUE2UkMvZkxwM0g0bkFiNTdmRksrcFRlcHcwc25IVzFuY2RDcjJyZUF1TmEwWFpidkVuK2RoeEdUUU95UTZlakNjSnhUZm1lSEJzZ1phWGNzVUZ6SkZ5N2F1Vk1hYnprZUFTOHNnQWhNeDRzTTAwZlNubGUyOG8xQUdtNEF2eU91VW85eXNtY0ZiN3FyVTZhWldtSVJqdkpXdFRuLzRraC84UUQyc3V6UzlJK2pxWkw0RWFqNzNNRFFDMmhOMmljRFlKWFNnUDZ3b1hvR256RS9ZOERxR2RDY2NsdWJwMVRxcUlodEVYVFM1N3Z0Q2NYeU9VQ1VRNWt2U0tyUkdNRWRrYlpQaHVVN1J0SW9SYlhEUUZtTW5YNmdnMWR6YUZiOTJTR29IZ3VseVY3KzRYYUJRK0FtM1ZDdXg4aXNOWHZWTzZwSDFpWDNIaUFxTlIyT3hYc0J6V2xlME90M3pzTGN1ZzNpNWhUZGZib3BCaS93bWt4KzhocHljYnhzOWJCbEVneENiUlVwRUhyZVpoL0lVY3J4ZXNGYmlyeERBL25icjBmSVAwT2VlOEFXRWVUSjJNZVNUeCt4dkZwcWorVUE0S1l5ZGZQOVJMdWJQcndvTTRJaFIrL0VvQnBTVWxPWEZ3NXNVTnEzQVdDeDVHdFdiWHR2eEt2Zy9NVi9acFJNSkdXcW1IUWZVaTdBc0xTenhnRk9Icm1lMDhTZTNlWVVLcHlzMzhaSXg1STlNRjJRd2YxQ01oaVJ4a0xnTldDT0RjYmY0WU16R2YwTllKT05TWkV2dWYrRWtubWg1YU5OQzBtYiszRWs3dWxmVFlFMGhhMDJoUlk3Ty9odXp5bWZqNm8zTVd0YTk5R0kxSE9KdjNkcU5IYWNqOElTcEdjSTliTC9DamtxWUpqR2YreWEySVhQODhkc3ptN2N5cUplUDZENCtTR211YXlJcWtmK0ZqVk9vMVpWc2liZnVUTXIwd1laemF6RW1icERWc1U3d1J0cEsvTjNMZFV4MFhXTFJTZ0ZTNkNSVHFLc3pWRnlrTnFHeEYrdVBQM2Y1UGNqWmxjcGV1L1VqTlJEbVhoRjM3NnJTNzkrRE9wN015dXFhUVhKNlFzWENFVlhxbVArUnV2cHBoOHlWUHJxZ0pkc2lEOHdJZXNIR1k3Znl6QmtJVFZUYjl4M0s2YU9pZzJ2clJEOVYzYnJHbzBIZ1MrbnZ2N05zNnlobTlkNDNsSjRQL2xNN0s5L2pXZGVjUi9xRWVpclo5WXhwd28vaFhJR0J3cDZQZVFxVFFzQnBqRGpxZkxlaVp4M2lKSXE5Ly9TY3R6QTIzUHdDdXZLbGNYNFlmWDYvVlkvZWVFTCtzZlN6UncyZ0JibnBRR2ZHaGEzZmpmTUFpM0o1aHBhVGJFWnpGVzJmY2VFYzlnMTFESzdWVWtaNnNUd2lLTUxsU0hLN3VSelV0cTJ2bGJtRjhiNi90ajNHdEE4ZS9YTm9WeGhVQ1NMUWZleE4waTMySzFQdUwwaTNmdGtkOVJtcEEyelgwSjhoTm93cjlFZDBoVHk2Nys5azFlcU41MEFWRFBIY3BFbDl1N1k0eXJ2RGV1WFRjZU93d1hUQm16L1ltV0tERlBJcVRLYU0yUzhIQmFOV1BSZXNNeEJua0xJTHpuOTc0TEgydUIvZzFJdUFvNmlaTU53UnZCQjhiNW9UN213aFBsY29KdzRBdmdvSXFUbkJjWUFoSHFnR1BEVzIxN25rb2pmM3VJT01XbU0zbU9RWkNOM2QyUmY3Zzh3K0NYL3NBUjlPMEVPdXFNYXBoTG4wMlNMRHFMOTA2RXU3ZkxTVkFXVzRwY0dGMm1pZGcwMjhjQ0RibXlCZFdRdkJSeHBJK1pIc2U5U0xnaWIxTlUwaUJ5UHFSemhsVzdzN2xML3NYYUdIVk9iUkFZUWJYMXErcjBrRkxHYXF2V1h5VitTOWJCSXJXc01lRlBCNVBEQWE1QS8xa243clpqZnA5aWR4Zm9jQlhUd2luaHlOYTZzcE9FUm5jd1F4a0xrK2pRNWZ5SGN6UXVlOTdaU3E5eUVPQkt0SGJOYlRmc1NsL1hZTzZ5a1dYeCtLY3NiVTNBanlzbXhsKzduTVBHYmttMnU4ZDVEdU5lWlArNEllWEdYUndzL3ZlQWpiLzRCN3k5YkRNZm5wYlRoRmY1Z0VkdldMM1lGcmlFZEZhYjEzeVZTdk9ObXBQVlFwd1d2MWo5Z3lZS2xPMklpVVpuTU9MbjZ2QTB1L1ZuNWFOb2FuTkUwdWpVdDR4dEhOK0xLQXNUQ29aL3VlK1ZZTEFGcWFSTExCWnUvajQ3ZmFYVFZIR2Fub0ZlMWNNUXBKK0k4ZEV0V3lodU00M3F2NGsrekRITU1IelRtTnVTR3FwTmQ2YnRwVjJEcWVTdktKWCtyQzVWSnY3OXowU1FBRURIOW1NR1FJeExYK0xvQW0xcUxaU0hReko3T1RDRTVNVURiVEdSbkNoQitiRkgwM0QzVk1aaUIvaUZzaEI1UWtHdTBpNmtlMGdaOWlzbVFRbHpTdWRpcFhHbUFvNXlCbi92bzZTV1oxZStZUWdscG5OWHFYZDh1Nmd3aHJOcmF2RnBJSVJxdjByQy9oVXcyK0QyV3ZrMXpBNi9RR0JJNlNlVmRYY0hLQ21WaUdRQWJMVjErYnAwZzRzZmZRaGV2bUNkY1lUaktKTGVoTTVMWnRMRWRaVjVueUdVd0YrdDE0N3ZSdWlqZXNYTGVZR3p6Mm1xUnFGSjhIeTZsMDJsK3lQWlpFK2c0ZVM5eGNCVlBIZmpCaEdzVGdNRFVRMjZMbVplWnRELzh2UExRTEczWExRY1VqK3lrbzduT1VjSFlUY2wvaHFUZVRvWWRJdDV2SGZFMk5RL3J0aStZS25ET3dHNFVVYkJNNlV5OHRWdmpPNVJ0M2pxbXVINVY1Y3NlbElPSWFSZkd2dEdXaU01UGtEaXIrN0pUbUhDSHNvUlFRVXdPLzhneVBpMU82STZJVENIRS8rSGVYVGhKeFJVY09wWms3aGRBWUt2NXFPUlVvRC8rNlpTWTNuWW0rYU5tbU5oUldhaVk2a1JrTXYrdHpvNXo0YjNKYmJ1bTlwekx1V0dzSVFZT0J0bFQ1cGtaeTF1QUgxWTNVc042bFZsbWloNVM5MWFtWmZXUll5VUpxcHlxVXhaZFVlaVJ0VG5Ub0Z4RGJBa3h6SFlHZ2lhMlV2cC9iVityRGNUaVdrZ1JsRG5aZnAxZXNObTQ2bktsNUx3RjlxUHlYK290SFpFSmhBL011TTlDcCtxUTFLTDR4UnF4RzBTd2o0OHlsckxEalNHOG8rM0xqOUVwb2dWVldkRlBmc0JNRmVMMWwrQ3U5bVdFa3VoSEtqSTBzcnJFM3QvdW5PQWNsT0xwajhncjhJR3NnY1FVRHcvSVFhZ3RJRUZYWWFIRnFHM051cFZmMTlLUFNOWlN4ZW9QWnIzTDIyOW5HQTBQNzVRdU8zakJCZWY3YUZJRFplTUtRZ0lWZ3AydlRmTDcwQ3BFUFdlL3ZLWHEvbStUN0creW16NWdpMGFOMEkzaWNhWnhHeEF3YWtFalM3QXRjd2EvWWJZTHVqTk9DVjJIS2pxYXFFOVNyWnkrVnJHU0hYS0oyaEJETGF0dWl2OVVQZnBsS2VQejBUTWJsVmlERTgrRGFqSnl0R3A5eTdSVHptS1lDUVF1SUxwY09PUnVGbi9acFlPdmNlRWx2cGRaMVdWMFhqQVRKdXNGa0xqVmd5bnVrNW4rSlRFTkZWbnlpUnVZeDVsYTNzdU14OHRyU09aVWFaNGJrc3dyYVpoQmhHNDd0K084ZFpmTFYwTVFzcG9ZWERsOHRIOGN6N1I1NmxBa2RwdDU5cys1dlB0VUNzRjlaVHR5UUxFWEowcjQ0TDg3bDM1ZFFETUdoWDUvYktXa2JMcDhWbDRLYkl6TjIxalpRSU9YVUllbURaYThobDFnZkFPUzU1WGwzQmo4MkNHd1lJWkVxditXR1BvK0Yxcjc0TVpXU1BQNG1MYXBpVjl4SHc9PQ==`
- `guid=K2FZUkhHSUlLRDJsNlZ1K3NGcUtqS3U3ZlJPN1FJdDdsSlUwSzNTbithaTBOQ2gwNEs1ZjhiSklET3NuaTVKYlk3TXZYem1Rd05nVWlDV2tCbzVhTGswaTRGZ2pjUzJVMWt0aHFSL3JvUTFVUUZWMVBnRVZmdGt6ajF3OXdmaXI1clBRYzFMQkRYR1V1Q2o2WDVKWFN6bnl3bVhJZE9uR01GQ0d3OFd5dGh6WGsyU2t6TnphcC82cHE0NUhYMTVESkxQOEM5cXJXTTdZUmt6aEJrb0JpQi90RUJKWm1YWUV1ODJpYkUzN0FwQVBidzVxZlhtVlVBNUVrZE5SUGpoaDhkYm1ZQjhmOGhObmFaVmx0a2tCUmZIa2s1a1N4S1ZqbTRjdkhGSXJrVHkrQ2cyZUdKd0NaOGFzRFNGYmQ0YVc1S29aWXBLZkMrYmYzaEp3Mnk3OWdIR0lEejY2NUs4dTRuT3YvWVBZZUJCVWVuTVR3Q3FGNXRDM1Z0UTlyYXdPVlBvOEtVZ0JRWnJmVGZEUEJmRTdvZmtGY0NxY05rMmxHQ2lMZnowSlVxNEdaR1IvVFNyclJiTHhNakhTK3RDeUFsVjNkdHJHSEhJUy95aUNQZDA3dDErUUJSbHJRSHdQcGlPTTlCMVgvZisyTDQyTENObXp1aGJ4bFlOL0JCbjJBL1lyZjNmejZrVXp5Y1VVQXVKNVR3TENjTm0yRHFGajdBU1dOVCs3ZUFVQldBWFNGdllsQTdHOGxMVTNPeEppNWVxWGxKZ204ZSttTkVwM0RSQkYyMjAxOVBpYnFtcDFsRjJLcXFBdncxOTZETGpaZEQ1eUJHaXV4TFh3VGE1UTZNWXRJbXRYc29RL3pRL0RteFF2VndPRk5xVHRscElnQzByR1hqcVF6bTdPVCthUUZKL3pEcFVqVHNRMW54ZXBOYTFhSkU5VXl5L3BtVXFLR3pWcTc1RXpORXF4d280TTJ3M21BK09paW5nQ0xEZktmcGZyR0JHZ2Y1WjQvQUl3cXZsc2R6NlhTcEZMSkhLM0pLMGh4UUJYK2I0aG1NK25BZCtiUXI5aGVtMXgwUVNLQkVnNFFMZ2J0ejVLbW5DL3JSY3FRVkVvaHViamxzdE96Vm5LOG54UDNRL3BQRkczeWpaRUFLdURBeGdVYWlMN2xOYXVXbHFQSFZ3MUxrRFFXZEZRZGZ0Zy80d0JWZXZtcUNrWFRieStrZm9oWE5OU0dOa0kyRUwyRndic1N3Y2tGSlN1bC9kdWRQMVlpQzVEU09tTFJMak5EKy92aGhhajZNUnkwdnZDOU1ZNnRZMGE3VkhEb0NYYllxWG0rMzZBSVQ0TXE2N2xDZWcvUUhwWFY5ZkNmYXdKSWJFZkR3YU9VbVJnTzY4bmFKaHlDdDBWZmlSeUl1anpTb2hjVGZFWEhqdnhsazRRQlNHREZUYWpiaUh3dVdtbmhCU2dYcFFveld1WmVVcXdRbXVNY0FCdmk4RFY1clFJREUrL3NJVmtDTTFuaVoweHBYM0txbDVRZU5CTnJEc2tQQzBaZ0hkdjFqT25wU0I0aWhVSFA4QTVtUG5qQXV2SzdaVEdUbS8wQWYxbk14ZWttTmI4ZmlPdXZkS1BGZFEzV2I5OUQ5WDJhc2RqWU1GeWtBSmYrOGd6U3dVNmlnOGtGbldsbG0zbDRBeDFjV1JUY0V1WHdDT2JOT3dKd3dha0prek9BVWc5V1J2dHVmWm82bG44ekVTRzJmRVBuUW9keTFkNjNOMnFBOFk3Tk93WTBRRjZVWWZWbVNRTXJ0cG95My9OeFJrNkNoYTNvYkxXU0F6czZJVjZGRDJaQWt2VStsK1hvckswSFdEeW9oZnBRenNLWXp1NFZzQkZjeEl4TUZhSGZOTzdtV1d6aHNIa2dIZmdIOVZmZmtxOWhqUUdUenB5OE5VblBybFFnbG1KUk53VHl1MnhKSmN2VVRhMk5rSXZBN0c4ODdaYVJEd1VlMkROOTV5OURUTloxZGRLRVZ1ZEppVDF0ajRQZXNsV21zUnFxMnJUVGpQbG4zMEgybTRyQ1liN1VmZ3RBdlBPNlNrNkpHVDFsMElDRFNUYTN5bVhJUDhWMHppKzZoRFhGNXU5eG5hMVZDN0FtUkhWcUl2OHpDV1VUR1dSa3h1Qk9XVDU1MGc3cjNoamVuSW1ENVpDTWpvRXhyUVJZVkVCR3pJdnpKa0JsVFFsTldVTzh4dDRnRDZyc0ZvWFVpNFF6b2xWb2Q1Q2JmL24vTXJNVGxqREFNb1RoUXAvd24rYjJsdHF4aTRUaWpTTFp6ZGlOQ01OcUxsalhuK0wvckNWU3ZkR0RVSmd0WG9QTGpoc3hFc0xxZGlMWW94MWNrYkJzbFV6Uk4xbHNOUG12ODFhcnFEQTRQWnVRYlNCYms1U3hjUjdFZXF1c3VhSjUwaWl1a2FrclZxN3ovbXVlTnIvK3B5UjMyUnhocUxNT3BRem93Q1ZMd0NCYm12LzhaM3BuWklCSFhPdFp4amw3U0FFZkNtSkt0bXk5TUhaUExIL3hxTWZnZFUzUkRkNTJONXREWE5oV05aZEwwdHdSN21YZEJPeVE4SE9RMmhmRlIwR1dKZ2xvckcwMEgzeUoraWE5RStqMzhWL3pQUkwvTFoxcUJ2WTlXRkpBbnlvU1E9PQ==`
- `guid=UVRNZUdTS0ozRzRaUGNlaGhLRUd0aXl2R3Zub2N2YW5UZTh3ZmorMEx1WXBPdEIvL1BSSzZ1RW5oN0EvMTIxRUJ3Z3NQZk5Yb2d0VUYxOTV0MFZ1SUZDZ1cwcnRHYzlCYlFLK1NzTWd1NVE9`

Ce doit être les données exfiltrées vers le serveur C2 de l'attaquant.
Essayons de les déchiffrer pour s'en assurer.
Pour l'instant ça ressemble à du base64.
![[THM_Masquerade_CC_b64.png]]
Après avoir déchiffré le base64 ça a toujours la même tête, on va donc retenter.
![[THM_Masquerade_CC_b64x2.png]]
Maintenant ça ressemble enfin a autre chose, on va transcrire en HEX pour l'instant
![[THM_Masquerade_CC_b64x2_hex.png]]
Là, on a donc notre iv + cipher avec l'iv qui est le string comportant les 32 premiers caractères (générique dans les chiffrements AES)

On va aussi transcrire la clé M4squ3r4d3Th3P4ck3tSt34lthM0d31337 en sha256
![[THM_Masquerade_CC_Key.png]]
iv : b0e16ccd8f1d67c6b3d63f26089dca15
cipher : 1284fa4be8c0df0a3c685a600b5461aa86a59f710db1b9b6e472d86ecd3339ae
key : 1284fa4be8c0df0a3c685a600b5461aa86a59f710db1b9b6e472d86ecd3339ae
![[THM_Masquerade_Clear1.png]]

En déchiffrant l'aes, on obtient donc : magic_hostname=DESKTOP-I6C5C7M
C'est donc bien le canal utilisé pour exfiltrer les infos de la machine compromise.

En déchiffrant les autres :
![[THM_Masquerade_Clear2.png]]
```
DESKTOP-I6C5C7M::::
USER INFORMATION
----------------

User Name           SID                                          
=================== =============================================
desktop-i6c5c7m\jim S-1-5-21-753961636-1548247123-2641200033-1001


GROUP INFORMATION
-----------------

Group Name                                                    Type             SID          Attributes                                        
============================================================= ================ ============ ==================================================
Everyone                                                      Well-known group S-1-1-0      Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\Local account and member of Administrators group Well-known group S-1-5-114    Group used for deny only                          
BUILTIN\Administrators                                        Alias            S-1-5-32-544 Group used for deny only                          
BUILTIN\Users                                                 Alias            S-1-5-32-545 Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\INTERACTIVE                                      Well-known group S-1-5-4      Mandatory group, Enabled by default, Enabled group
CONSOLE LOGON                                                 Well-known group S-1-2-1      Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\Authenticated Users                              Well-known group S-1-5-11     Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\This Organization                                Well-known group S-1-5-15     Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\Local account                                    Well-known group S-1-5-113    Mandatory group, Enabled by default, Enabled group
LOCAL                                                         Well-known group S-1-2-0      Mandatory group, Enabled by default, Enabled group
NT AUTHORITY\NTLM Authentication                              Well-known group S-1-5-64-10  Mandatory group, Enabled by default, Enabled group
Mandatory Label\Medium Mandatory Level                        Label            S-1-16-8192                                                    


PRIVILEGES INFORMATION
----------------------

Privilege Name                Description                          State   
============================= ==================================== ========
SeShutdownPrivilege           Shut down the system                 Disabled
SeChangeNotifyPrivilege       Bypass traverse checking             Enabled 
SeUndockPrivilege             Remove computer from docking station Disabled
SeIncreaseWorkingSetPrivilege Increase a process working set       Disabled
SeTimeZonePrivilege           Change the time zone                 Disabled

```

![[THM_Masquerade_Clear3.png]]
```
DESKTOP-I6C5C7M::::
Windows IP Configuration

   Host Name . . . . . . . . . . . . : DESKTOP-I6C5C7M
   Primary Dns Suffix  . . . . . . . : 
   Node Type . . . . . . . . . . . . : Hybrid
   IP Routing Enabled. . . . . . . . : No
   WINS Proxy Enabled. . . . . . . . : No

Ethernet adapter Ethernet:

   Connection-specific DNS Suffix  . : 
   Description . . . . . . . . . . . : Intel(R) PRO/1000 MT Desktop Adapter
   Physical Address. . . . . . . . . : 08-00-27-93-C1-26
   DHCP Enabled. . . . . . . . . . . : Yes
   Autoconfiguration Enabled . . . . : Yes
   IPv6 Address. . . . . . . . . . . : fd17:625c:f037:2:749d:6899:1a7a:510b(Preferred) 
   Temporary IPv6 Address. . . . . . : fd17:625c:f037:2:8c6e:24df:8f2c:4d7f(Preferred) 
   Link-local IPv6 Address . . . . . : fe80::b27f:3332:d33c:1224%6(Preferred) 
   IPv4 Address. . . . . . . . . . . : 10.0.2.15(Preferred) 
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Lease Obtained. . . . . . . . . . : Thursday, April 9, 2026 10:05:46 PM
   Lease Expires . . . . . . . . . . : Friday, April 10, 2026 10:05:46 PM
   Default Gateway . . . . . . . . . : fe80::2%6
                                       10.0.2.2
   DHCP Server . . . . . . . . . . . : 10.0.2.2
   DHCPv6 IAID . . . . . . . . . . . : 101187623
   DHCPv6 Client DUID. . . . . . . . : 00-01-00-01-31-68-A4-61-08-00-27-93-C1-26
   DNS Servers . . . . . . . . . . . : 192.168.1.1
   NetBIOS over Tcpip. . . . . . . . : Enabled

```

![[THM_Masquerade_Clear4.png]]

```
DESKTOP-I6C5C7M::::THM{m45k3d_tr4ff1c_0v3r_c0v3rt_ch4nn3lz} 
```

---
## Synthèse 
**Contexte**  
Jim (Finance) exécute un script PowerShell malveillant présenté comme "mise à jour de sécurité critique" par un faux admin système. 
**Artefacts fournis :** **EVTX** (event logs) + **PCAP** (capture réseau). 
**Objectif :** reconstituer l'attaque en **analyse statique only** (VM obligatoire - malware réel).

### Déroulé Enquête

#### Phase 1 : Stage 1 (EVTX)
- **evtx.online** → script obfuscé → **CyberChef** : `http://api-edgecloud.xyz/amd.bin   X9vT3pL2QwE8xR6ZkYhC4s (RC4)`  
- **Wireshark** → Export `amd.bin` → RC4 decrypt → **PE32**(`e3d39d42df63c6874780737244370ba517820f598fd2443e47ff6580f10c17cb`). Serveur Python 3.11.2, **10 Apr 2026 05:28:23 GMT**.
#### Phase 2 : C2 (PCAP)
- **Conversations IPv4** → `34.174.57.99` (VT confirme). Endpoint : `/images?guid=BASE64encrypted` (4 GETs).
#### Phase 3 : Stage 2 (.NET)
- **strings** : `AesManaged`, `SHA256Managed` → **AES**. Clé : `M4squ3r4d3Th3P4ck3tSt34lthM0d31337`(SHA256 → 32B). IV : **32 hex chars**.
#### Phase 4 : Exfil C2
- **Pipeline** : Base64(x2) → Hex → **IV(32hex)+Cipher** → AES-CBC-PKCS7 :
- Déchiffrement des GUIDs :
```
GUID1: magic_hostname=DESKTOP-I6C5C7M   
GUID2: desktop-i6c5c7m\jim (SID/groups)   
GUID3: 10.0.2.15 (MAC 08-00-27-93-C1-26)   
GUID4: THM{m45k3d_tr4ff1c_0v3r_c0v3rt_ch4nn3lz}`
```

### Malware
**Comportement** :  **RAT (Remote Access Trojan)** stealth via **C2 HTTP masquerade**.
- **Téléchargement** : Stage 1 (PowerShell) → `api-edgecloud.xyz/amd.bin` (RC4) → `amdfendrsr.exe`
- **C2 Channel** : `34.174.57.99/images?guid=AES-encrypted` (images légitimes → stealth).
- **Exfiltration** : 4 beacons automatiques post-infection :
    1. **Recon host** : `magic_hostname=DESKTOP-I6C5C7M`
    2. **whoami** : `desktop-i6c5c7m\jim` (SID, groupes, privilèges)
    3. **ipconfig** : `10.0.2.15` (MAC `08-00-27-93-C1-26`)
    4. **Flag/Commands** : `THM{m45k3d_tr4ff1c_0v3r_c0v3rt_ch4nn3lz}`
- **Chiffrement** : AES-CBC (clé SHA256 dérivée) + double Base64 → **anti-IDS**.

**MITRE ATT&CK Mapped** : 
- T1204.002 : User Execution (PS1) 
- T1105 : Ingress Tool Transfer 
- T1027.002 : Obfuscated PS1/RC4 
- T1573.002 : HTTP C2 (AES) 
- T1041.001 : Exfil HTTP 

**IoCs** : 

| Type           | Valeur                                                           |
| -------------- | ---------------------------------------------------------------- |
| Domain         | api-edgecloud.xyz                                                |
| C2 IP          | 34.174.57.99                                                     |
| Payload SHA256 | e3d39d42df63c6874780737244370ba517820f598fd2443e47ff6580f10c17cb |
| AES Key        | M4squ3r4d3Th3P4ck3tSt34lthM0d31337                               |
