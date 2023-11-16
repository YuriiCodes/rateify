export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "A currency conversion app",
    description: "Convert currencies with ease; See multiple currencies at once; Get the latest exchange rates.",
    navItems: [
        {
            label: "Main",
            href: "/",
        },
        {
            label: "Rates Table",
            href: "/rates",
        },
        {
            label: "About",
            href: "/about",
        },
    ],
    navMenuItems: [
        {
            label: "Main",
            href: "/",
        },
        {
            label: "Rates Table",
            href: "/rates",
        },
        {
            label: "About",
            href: "/about",
        },
    ],
    links: {
        github: "https://github.com/nextui-org/nextui",
    },
};
