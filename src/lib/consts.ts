import { siFacebook, siGithub, siInstagram, siX } from "simple-icons";

export const SITE_URL = "https://mugnavo.com"; // no trailing slash
export const SITE_TITLE = "Mugnavo";
export const SITE_DESCRIPTION =
  "High-quality web design and development solutions for growing businesses and startups.";
export const SITE_ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const SITE_WEBSITE_ID = `${SITE_URL}/#website`;
export const SITE_LOGO_URL = `${SITE_URL}/logo.svg`;
export const SITE_CONTACT_EMAIL = "hello@mugnavo.com";
export const SITE_SOCIALS = [
  { href: "https://github.com/mugnavo", label: "GitHub", icon: siGithub },
  { href: "https://x.com/mugnavo", label: "X", icon: siX },
  { href: "https://instagram.com/mugnavo", label: "Instagram", icon: siInstagram },
  { href: "https://facebook.com/mugnavo", label: "Facebook", icon: siFacebook },
];

export const SERVICES = [
  {
    title: "Websites",
    description:
      "High-performance, SEO-optimized websites and marketing pages built for speed and conversion.",
    imageSrc: "/images/services-v2/web.webp",
    includes: [
      "Marketing sites and landing pages",
      "Content you can edit yourself",
      "Search and performance basics built in",
      "Analytics and forms set up from day one",
    ],
  },
  {
    title: "Mobile Apps",
    description:
      "Cross-platform apps for Android and iOS built with native-level performance and UX.",
    imageSrc: "/images/services-v2/mobile.webp",
    includes: [
      "iOS and Android from one codebase",
      "App store submission and releases",
      "Push notifications and offline support",
      "A backend shared with your web app",
    ],
  },
  {
    title: "Commerce & Content",
    description:
      "Bespoke ecommerce and content-driven systems designed for brand growth and heavy lifting.",
    imageSrc: "/images/services-v2/commerce.webp",
    includes: [
      "Online stores with a smooth checkout",
      "Product, order, and inventory management",
      "Headless content management",
      "Payment and shipping integrations",
    ],
  },
  {
    title: "SaaS & Cloud Solutions",
    description:
      "Scalable software-as-a-service products built with robust architectures and seamless user workflows.",
    imageSrc: "/images/services-v2/saas.webp",
    includes: [
      "Product design from the first sketch",
      "Accounts, teams, and billing",
      "Dashboards and admin tools",
      "Deployment, monitoring, and upkeep",
    ],
  },
] as const;
