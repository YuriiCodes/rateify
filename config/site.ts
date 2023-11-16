export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Rateify",
    description: "Convert currencies with ease; See multiple currencies at once; Get the latest exchange rates.",
    navItems: [
        {
            key: "main",
            href: "/",
        },
        {
            key: "ratesTable",
            href: "/rates",
        },
        {
            key: "about",
            href: "/about",
        },
    ],
    navMenuItems: [
        {
            key: "main",
            href: "/",
        },
        {
            key: "ratesTable",
            href: "/rates",
        },
        {
            key: "about",
            href: "/about",
        },
    ],
    links: {
        github: "https://github.com/nextui-org/nextui",
    },
};
