export const siteConfig = {
  name: "ASTU Gebeya",
  description: "Campus marketplace for buying and selling",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "",
    github: "",
  },
  colors: {
    primary: "#1E3A8A",
    secondary: "#FACC15",
    accent: "#0EA5E9",
  },
}

export const metadata = {
  title: `${siteConfig.name} - ${siteConfig.description}`,
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
}
