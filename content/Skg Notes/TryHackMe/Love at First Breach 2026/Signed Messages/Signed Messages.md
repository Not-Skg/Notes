---
tags:
  - Chall
  - TryHackMe
  - LoveAtFirstBreach
  - web
  - RSA
---
## Énoncé
>My Dearest Hacker,
>
>LoveNote built it's reputation on trust. Every message, every action, signed and verified by the system itself. LoveNoe claims that no message can be forged, no identity faked.
>
>Yet an internal leak suggests the platform may be trusting something it shouldn't. With Valentine's Day fast approaching, the consequences of a broken trust system could be disastrous.
>
>>*You can find the web application here:* `http://MACHINE_IP:5000`
## Retex
Cette fois-ci c'est un site de note qui signe et chiffre chaque action par le système.
![[Home_page.png|500]]
Mais d'après l'énoncé le système de confiance n'est pas top.
![[Admin.png|500]]
Déjà on peut voir que même sans se créer de compte on peut se connecter au compte admin sans mdp.
Et le message envoyé plus tôt par ce compte est :
```
Welcome to LoveNote

Welcome to LoveNote! Send encrypted love messages this Valentine's Day. Your communications are secured with industry-standard RSA-2048 digital signatures.
```
On y comprend donc que ce chall sera consacré au RSA et donc le jeu de public key / private key.
![[gobuster.png|500]]
Après un rapide `gobuster` on peut voir qu'il y a pleins de pages existantes mais plus particulièrement une page "debug".

![[debug_page.png|500]]
On peut y accéder même sans se connecter à un compte donc elle est accessible de l'extérieur.
On y apprends aussi qu'au lieu d'utiliser de la vraie randomisation, les clés sont générées à partir d'un **seed prévisible basé sur un username**.

La seed est toujours de la forme : 
```python
seed = "{username}_lovenote_2026_valentine"
```

Donc si on a la seed, on peut recréer la clé privé d'un compte, `admin` à tout hasard.

Le site nous permet de vérifier si un message à bien été fait par une personne a partir :
- username
- message
- Digital Signature (Hex)

On va utiliser le script suivant, qui se base sur cette page de debug.

```python
import hashlib  
from sympy import nextprime  
from Crypto.PublicKey import RSA  
from Crypto.Signature import pss  
from Crypto.Hash import SHA256  
from Crypto.Util.number import inverse  
  
TARGET_USER = "grostest"  
TARGET_MESSAGE = "pitit_message"  
  
def generate_admin_key():  
print(f"[*] Generating deterministic 512-bit key for: {TARGET_USER}")  
  
# Deterministic seed  
seed_str = f"{TARGET_USER}_lovenote_2026_valentine"  
seed_bytes = seed_str.encode()  
  
# Generate p  
sha256_p = hashlib.sha256(seed_bytes).hexdigest()  
p = nextprime(int(sha256_p, 16))  
  
# Generate q  
sha256_q = hashlib.sha256(seed_bytes + b"pki").hexdigest()  
q = nextprime(int(sha256_q, 16))  
  
n = p * q  
e = 65537  
phi = (p - 1) * (q - 1)  
d = inverse(e, phi)  
  
key = RSA.construct((n, e, d, p, q))  
  
modBits = key.size_in_bits()  
h = SHA256.new(TARGET_MESSAGE.encode())  
  
emLen = (modBits - 1 + 7) // 8  
maxSalt = emLen - h.digest_size - 2  
  
print(f"[*] Key size: {modBits} bits")  
print(f"[*] EM Length: {emLen} bytes")  
print(f"[*] Calculated Max Salt: {maxSalt} bytes")  
  
if maxSalt < 0:  
raise ValueError("Key too small for PSS padding.")  
  
signer = pss.new(key, salt_bytes=maxSalt)  
signature = signer.sign(h)  
  
return signature.hex()  
  
  
if __name__ == "__main__":  
try:  
signature = generate_admin_key()  
  
print("\n" + "="*60)  
print(" >>> FINAL ZEUS SIGNATURE <<< ")  
print("="*60)  
print(signature)  
print("="*60)  
print("1. Go to Verify page.")  
print("2. User: zeus")  
  
except Exception as e:  
print(f"[!] Error: {e}")
```

Afin de vérifier que le script fonctionne bien on peut déjà comparer ce qu'il donne avec ce que nous donne le site lors de la création d'un compte : 
![[create_account.png|500]]
![[keys.png|500]]

Et en vérifiant la signature avec l'ancien message et le compte admin, on a accès au flag : **==THM{PR3D1CT4BL3_S33D5_BR34K_H34RT5}==**

## Explication de la faille
Les clés RSA sont générées avec une **seed prévisible** (`{username}_lovenote_2026_valentine`) au lieu d’entropie aléatoire. Avec la seed d’`admin`, on recrée sa clé privée et signe n’importe quel message → le site valide la signature comme légitime.
## Pour s'en protéger
- **Random vrai** : utiliser un vrai random ou une seed vraiment secrète ou changeante pour éviter de la retrouver.
- **Pas d’info leak** : La page `/debug` ne doit **jamais** exister en prod