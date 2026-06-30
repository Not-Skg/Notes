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
        },
        {
          name: "OSINT-FR",
          username: "skg",
          description: "Challenges plus réalistes et plus poussés.",
          url: "https://ctf.challenge-osint.fr/user?id=56ab7c5e-6110-4d86-b4c0-6270ffa88f15",
          logo: "./Logo/osintfr.png",
        },
        {
          name: "IsFred",
          username: "Skg",
          description: "Des cours vraiment sympas.<br> J’ai commencé à apprendre l’OSINT dessus.",
          url: "https://isfred.fr/users/349",
          logo: "./Logo/isfred.png",
        },
        {
          name: "TryHackMe",
          username: "Skg",
          description: "Peu d’OSINT mais de très bonnes simulations de SOC et de DFIR.",
          url: "https://tryhackme.com/p/Skg",
          logo: "./Logo/tryhackme.png",
        },
        {
        name: "OSINTOPIA",
        username: "skg",
        description: "Ma plateforme favorite pour l’OSINT.<br>Elle a connu une refonte, et les centaines d’anciens challenges ne sont plus pris en compte.",
        url: "https://challenges.osintopia.fr/users/111",
        logo: "Logo/osintopia.png",
      },
        {
        name: "YouArePlayer",
        username: "SKG",
        description: "Plateforme émergente vraiment sympa.<br> Osint mais que... ",
        url: "https://youareplayer.com/users/3ef5b34a-7396-4ae9-b1f2-da914e27da2d",
        logo: "Logo/yap.png",
      }
      ]

      root.innerHTML = \`
        <div class="platform-cards">
          \${platforms.map((platform) => \`
            <article class="platform-card">
              <div class="platform-card-top">
                <img src="\${platform.logo}" alt="Logo \${platform.name}" class="platform-logo" />
                <div>
                  <h3>\${platform.name}</h3>
                  <p class="platform-username">\${platform.username}</p>
                </div>
              </div>
              <p class="platform-description">\${platform.description}</p>
              <a href="\${platform.url}" target="_blank" rel="noopener noreferrer">Voir le profil</a>
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