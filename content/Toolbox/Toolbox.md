---
title: ToolBox
description: Les outils que j'utilise, classés par situation pour ne rien oublier pendant une analyse.
---
<div class="toolbox-banner">
<img src="./WP.webp" alt="" class="toolbox-banner-img" width="1400" height="560" />
<div class="toolbox-banner-text" id="toolbox-banner-text">
<span class="fiches-hero-bar"></span>
<p class="toolbox-banner-sub">Les outils que j'utilise, classés par situation pour ne rien oublier pendant une analyse.</p>
</div>
</div>

<div id="tb-headings" hidden>

# Guides et cheatsheets

# Must have pour un CTF OSINT

# J'ai quelque chose, je fais quoi ?

# Annuaire complet

</div>

<div id="toolbox-root"></div>

---

<div class="fiches-hero">
<img src="./Fiches_techniques.webp" alt="" class="fiches-hero-img" />
<div class="fiches-hero-text">
<span class="fiches-hero-bar"></span>

# Fiches techniques

Des guides pratiques pour aller plus loin, avec des méthodes, des conseils et des exemples concrets.

</div>
</div>

## Pages cachées

Quelques fichiers à tester à la racine d'un site (`https://exemple.com/...`), et ce qu'ils peuvent révéler.

<div class="pc-group">
<div class="pc-group-title">Sur n'importe quel site</div>
<div class="pc-row"><div class="pc-name"><code>robots.txt</code><span class="pc-tag">Chemins cachés</span></div><p class="pc-desc">Indique aux moteurs de recherche les chemins à ne pas explorer. Les lignes <code>Disallow</code> pointent souvent vers des zones que le site préfère garder discrètes (administration, dossiers privés, environnement de test).</p></div>
<div class="pc-row"><div class="pc-name"><code>sitemap.xml</code><span class="pc-tag">Pages oubliées</span></div><p class="pc-desc">Liste les pages que le site veut voir indexées. On y trouve parfois des pages qu'aucun menu ne mentionne, d'anciennes pages, et des dates de dernière modification.</p></div>
<div class="pc-row"><div class="pc-name"><code>security.txt</code><span class="pc-tag">Contacts</span></div><p class="pc-desc">Souvent dans <code>/.well-known/security.txt</code>. Donne le contact à joindre pour signaler une faille : adresses mail, parfois des noms, une clé PGP ou la politique de sécurité de l'organisation.</p></div>
<div class="pc-row"><div class="pc-name"><code>ads.txt / app-ads.txt</code><span class="pc-tag">Liens entre sites</span></div><p class="pc-desc">Liste les régies publicitaires autorisées à vendre les espaces du site ou de l'application, avec un identifiant d'éditeur. Retrouvé sur d'autres sites, cet identifiant permet de les relier au même propriétaire.</p></div>
<div class="pc-row"><div class="pc-name"><code>favicon.ico</code><span class="pc-tag">Infrastructure</span></div><p class="pc-desc">L'icône du site. Son empreinte (hash) peut être recherchée sur des moteurs comme Shodan pour retrouver d'autres serveurs ou sites qui utilisent la même icône, donc souvent la même infrastructure.</p></div>
</div>
<div class="pc-group">
<div class="pc-group-title">Pages de statut serveur</div>
<p class="pc-intro">Un serveur, peu importe l'outil derrière (Apache, NGINX, etc.), possède souvent une page de statut qui permet de voir s'il fonctionne bien. Elle est parfois restée accessible au public.</p>
<div class="pc-row"><div class="pc-name"><code>/server-status</code><span class="pc-tag">Apache</span></div><p class="pc-desc">La page de statut d'Apache.</p></div>
<div class="pc-row"><div class="pc-name"><code>/nginx_status</code><span class="pc-tag">NGINX</span></div><p class="pc-desc">L'équivalent pour NGINX. Le nom du chemin est configurable, donc il peut varier.</p></div>
</div>

## GitHub .patch

Ajouter `.patch` à l'URL d'un commit GitHub permet de récupérer sa version brute. En plus des modifications, l'en-tête du fichier contient souvent l'auteur du commit et l'adresse mail qu'il avait configurée.

<div class="fiche-ex">
<div class="fiche-ex-row"><span class="fiche-ex-label">Avant</span><code>https://github.com/utilisateur/projet/commit/abc123</code></div>
<div class="fiche-ex-row"><span class="fiche-ex-label">Après</span><code>https://github.com/utilisateur/projet/commit/abc123.patch</code></div>
</div>

## Facebook vers Marketplace

En navigation privée, on peut passer d'un compte Facebook à son compte Marketplace, en gardant le même identifiant.

<div class="fiche-ex">
<div class="fiche-ex-row"><span class="fiche-ex-label">Avant</span><code>https://www.facebook.com/profile.php?id=<b>MONID</b></code></div>
<div class="fiche-ex-row"><span class="fiche-ex-label">Après</span><code>https://www.facebook.com/marketplace/profile/<b>MONID</b></code></div>
</div>

## Listes Twitter

Les listes dans lesquelles un compte figure, ou qu'il a créées, donnent souvent des indices sur ses centres d'intérêt et son entourage.

## Attribut alt des photos

Sur certains réseaux (Facebook par exemple), l'attribut `alt` des images contient une description automatique de la photo. Elle se lit en inspectant la page.

---

[[index|HomePage]]  · | ·  Les pages sympas  · | ·  [[heatmap|Journal d'activité]]
