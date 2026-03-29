const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
    ],
    // additionalSitemaps: [`${SITE_URL}/pages-sitemap.xml`],
  },
}
