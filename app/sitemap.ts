import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nurjahandiagnostic.com'

  // Define static routes for the hospital
  const routes = [
    '',
    '/about',
    '/contact',
    '/doctors',
  ]

  // Add all services
  const services = [
    'emergency-care',
    'icu-facility',
    'diagnostic-lab',
    'specialist-consultation',
    'maternity-care',
    '24-7-pharmacy',
  ]

  return [
    ...routes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
