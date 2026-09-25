import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/jobSeekingCallout.scss"
import { resolveRelative } from "../util/path"
import { classNames } from "../util/lang"

interface JobSeekingCalloutOptions {
    title: string
    subtitle: string
    linkText: string
    targetSlug: string
}

const defaultOptions: JobSeekingCalloutOptions = {
    title: "Recherche un poste OSINT",
    subtitle: "Disponible pour de nouvelles opportunités.",
    linkText: "En savoir plus →",
    targetSlug: "a-propos",
}

export default ((opts?: Partial<JobSeekingCalloutOptions>) => {
    const options: JobSeekingCalloutOptions = { ...defaultOptions, ...opts }

    const JobSeekingCallout: QuartzComponent = ({
        fileData,
        displayClass,
    }: QuartzComponentProps) => {
        if (fileData.slug === options.targetSlug) {
            return null
        }

        const href = resolveRelative(fileData.slug!, options.targetSlug as any)

        return (
            <div class={classNames(displayClass, "job-seeking-callout")}>
                <a href={href} class="job-seeking-callout-link">
                    <div class="job-seeking-callout-header">
                        <span class="job-seeking-callout-dot"></span>
                        <span class="job-seeking-callout-title">{options.title}</span>
                    </div>
                    <div class="job-seeking-callout-subtitle">{options.subtitle}</div>
                    <div class="job-seeking-callout-cta">{options.linkText}</div>
                </a>
            </div>
        )
    }

    JobSeekingCallout.css = style
    return JobSeekingCallout
}) satisfies QuartzComponentConstructor
