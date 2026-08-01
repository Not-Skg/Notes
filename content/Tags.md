---
title: Tags
draft: true
---
> [!note]
> Page interne (non publiée, `draft: true`). Sert de mémo pour savoir quels tags ont un vrai effet sur le site et lesquels ne servent qu'à l'organisation/visuel dans Obsidian.

## Tags essentiels au fonctionnement

Ces tags sont lus par le code (`HomeExplorer.tsx`, pages `/tags/...` de Quartz). Les retirer ou les mal orthographier casse une fonctionnalité.

- **`CTF`** : marque la page principale (top-level) d'un CTF. Alimente la card "CTF" de la homepage et la page `/tags/CTF`.
- **`ChallOsint`** : marque un challenge OSINT autonome (pas un sous-chall d'un CTF). Alimente la card "Chall OSINT" de la homepage, groupée par plateforme.
- **`AutreChall`** : marque un challenge autonome hors OSINT (SOC, DFIR, CTI...). Alimente la card "Autres challenges" de la homepage.
- **`Toolbox`** : marque une ressource/outil. Alimente la card "Toolbox" de la homepage.
- **Tags de plateforme reconnus** pour le regroupement dans la card "Chall OSINT" (casse exacte importante, doit matcher le nom du fichier tag et le registre dans `HomeExplorer.tsx`) : `Osint4fun`, `TryHackMe`, `OSINT-FR`, `IsFred`, `OSINTOPIA`, `YouArePlayer`. Une note `ChallOsint` avec une plateforme absente de cette liste sera groupée sous "Autres" dans la card.

### Frontmatter (pas des tags, mais même logique de dépendance)

- **`order`** (nombre) : fixe la position dans l'Explorer (sidebar) et sert à désigner la page d'accueil d'un dossier (`Foo/Foo.md`). Voir `explorerSortFn` / `explorerMapFn` dans `quartz.layout.ts`.
- **`draft: true`** : exclut la page de la publication (plugin RemoveDrafts). Cette page en est un exemple.

## Tags décoratifs (organisation / graphe uniquement)

Tout le reste : `Osint`, `Chall`, `DFIR`, `CTI`, les tags d'événement (`Medileak-3`, `BleuetV5`, `LeCaire`, `Bellatrix`...), les tags d'outil/technique (`Sherlock`, `crypto`, `nmap`, `Gobuster`, `OverpassTurbo`, `enola`...). Ils n'ont aucun effet sur la homepage ni sur le tri. Ils servent uniquement à :
- Regrouper visuellement des notes proches dans le Graph View
- Générer une page `/tags/<tag>` (utile pour naviguer, mais rien d'automatisé n'en dépend)

Les retirer, les renommer ou les typo ne casse rien de fonctionnel, seulement l'esthétique du graphe et les pages de tags correspondantes.
