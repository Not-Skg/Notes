import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function PlatformProfiles(_props: QuartzComponentProps) {
  return null
}

PlatformProfiles.afterDOMLoaded = `
  ;(() => {
    const init = () => {
      const root = document.getElementById("platform-profiles-root")
      if (!root) return

      const platforms = [
        {
          name: "Osint4Fun",
          username: "SKG",
          description: "Challenges très intéressants et pédagogiques.",
          url: "https://www.osint4fun.eu/user/89b4eb44c0c38592/#badges-tab",
          logo: "./Logo/osint4fun.png",
          rank: "38ᵉ",
        },
        {
          name: "OSINT-FR",
          username: "skg",
          description: "Challenges plus réalistes et plus poussés.",
          url: "https://ctf.challenge-osint.fr/user?id=56ab7c5e-6110-4d86-b4c0-6270ffa88f15",
          logo: "./Logo/osintfr.png",
          rank: "8ᵉ",
        },
        {
          name: "IsFred",
          username: "Skg",
          description: "Des cours vraiment sympas.<br> J’ai commencé à apprendre l’OSINT dessus.",
          url: "https://isfred.fr/users/349",
          logo: "./Logo/isfred.png",
          rank: "5ᵉ",
        },
        {
          name: "TryHackMe",
          username: "Skg",
          description: "Peu d’OSINT mais de très bonnes simulations de SOC et de DFIR.",
          url: "https://tryhackme.com/p/Skg",
          logo: "./Logo/tryhackme.png",
          rank: "Top 1 %",
        },
        {
        name: "OSINTOPIA",
        username: "skg",
        description: "Ma plateforme favorite pour l’OSINT.<br>Elle a connu une refonte, et les centaines d’anciens challenges ne sont plus pris en compte.",
        url: "https://challenges.osintopia.fr/users/111",
        logo: "Logo/osintopia.png",
        rank: "10ᵉ",
      },
        {
        name: "YouArePlayer",
        username: "SKG",
        description: "Plateforme émergente vraiment sympa.<br> Osint mais pas que... ",
        url: "https://youareplayer.com/users/3ef5b34a-7396-4ae9-b1f2-da914e27da2d",
        logo: "Logo/yap.png",
        rank: "2ᵉ",
      },
        {
        name: "Osint Industries",
        username: "SKG",
        description: "Des challenges très réalistes, dont certains s\u2019appuient directement sur des fiches d\u2019Interpol, du GRU, du FSB et du FBI.",
        url: "https://ctf.osint.industries/users/7238",
        logo: "Logo/osint_industries.png",
        rank: "32ᵉ",
      },
        {
        name: "Oscar Zulu",
        username: "SKG",
        description: "Une bande de passionnés d\u2019OSINT, avec des challenges directement sur leur Discord.",
        url: "https://discord.com/invite/oscar-zulu",
        linkLabel: "Rejoindre le Discord",
        logo: "Logo/oscar_zulu.png",
        rank: "3ᵉ",
      }
      ]

      root.innerHTML = \`
        <div class="platform-cards">
          \${platforms.map((platform) => \`
            <article class="platform-card">
              <div class="platform-card-top">
                \${platform.logo
                  ? \`<img src="\${platform.logo}" alt="Logo \${platform.name}" class="platform-logo" />\`
                  : \`<span class="platform-logo platform-logo-fallback">\${platform.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}</span>\`}
                <div>
                  <h3>\${platform.name}</h3>
                  <p class="platform-username">\${platform.username}</p>
                </div>
                \${platform.rank ? \`<span class="platform-rank"><span>Classement</span><b>\${platform.rank}</b></span>\` : ""}
              </div>
              <p class="platform-description">\${platform.description}</p>
              \${platform.url
                ? \`<a href="\${platform.url}" target="_blank" rel="noopener noreferrer">\${platform.linkLabel || "Voir le profil"}</a>\`
                : \`<span class="platform-nolink">Pas de profil en ligne</span>\`}
            </article>
          \`).join("")}
        </div>
      \`
    }

    init()
    document.addEventListener("nav", init)
  })()
`

export default (() => PlatformProfiles) satisfies QuartzComponentConstructor