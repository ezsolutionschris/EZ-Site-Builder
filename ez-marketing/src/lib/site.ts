export const site = {
  name: "EZ Marketing",
  tagline:
    "Full-service digital marketing agency helping small businesses get found online",
  phone: "717.291.4689",
  phoneTel: "+17172914689",
  address: {
    street: "111 Centerville Road",
    city: "Lancaster",
    state: "PA",
    zip: "17603",
    full: "111 Centerville Road, Lancaster, PA 17603",
  },
  location: "Lancaster, PA",
  yearsExperience: "25+",
  parentOrg: "EZSolution",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ezmarketing.com",
  links: {
    marketing: "https://www.ezmarketing.com",
    solution: "https://www.ezsolution.com",
    consultation:
      "https://www.ezmarketing.com/schedule-a-consultation/",
    ezComputer: "https://www.ezcomputersolutions.com",
    eos: "https://www.ezsolution.com/eos",
    team: "https://www.ezmarketing.com/about/our-team/",
  },
  productName: "EZ Site Builder",
} as const;

export const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const howItWorks = [
  {
    step: "1",
    title: "Describe your business",
    description:
      "Tell our AI what you do, who you serve, and what pages you need—in plain language.",
  },
  {
    step: "2",
    title: "Review your draft",
    description:
      "See a visual preview of your site layout. Refine with another prompt or work with our team.",
  },
  {
    step: "3",
    title: "Launch with EZ Marketing",
    description:
      "We polish design, SEO, and hosting so your site goes live with a Lancaster-based team behind you.",
  },
] as const;

export const features = [
  {
    title: "AI site drafts in minutes",
    description:
      "Generate a professional homepage layout from a short description—no templates to wrestle with.",
    icon: "spark",
  },
  {
    title: "SEO you control",
    description:
      "Title tags, descriptions, and Open Graph metadata structured for search and social sharing.",
    icon: "search",
  },
  {
    title: "Built for small business",
    description:
      "Mobile-friendly layouts, clear calls to action, and support from a team with 25+ years of experience.",
    icon: "gauge",
  },
  {
    title: "Part of EZSolution",
    description:
      "Backed by a parent company that has served 2,000+ small businesses across Central PA and beyond.",
    icon: "compass",
  },
] as const;

export const suggestedPrompts = [
  "I run a plumbing company in Lancaster, PA",
  "Create a one-page site for my bakery with hours and menu",
  "I need a professional homepage for my consulting business",
  "Build a landing page for my landscaping services",
] as const;

export const footerLinks = {
  ezSolution: [
    { label: "EZSolution", href: site.links.solution },
    { label: "EZComputer Solutions", href: site.links.ezComputer },
    { label: "EOS", href: site.links.eos },
  ],
  marketing: [
    { label: "EZMarketing.com", href: site.links.marketing },
    { label: "Our team", href: site.links.team },
    { label: "Schedule a consultation", href: site.links.consultation },
  ],
  platform: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Start building", href: "#builder" },
  ],
} as const;
