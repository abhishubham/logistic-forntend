import type { ConfigurationParameters } from '@/api/configuration';
import { Configuration } from '@/api/configuration';

export const createConfig = (token?: string, overrides?: ConfigurationParameters) =>
  new Configuration({
    // OpenAPI Generator expects basePath WITHOUT the route prefix since
    // it already includes the path in each endpoint (e.g. /api/v1/auth/login).
    // Our env contains the full URL (http://host:port/api/v1), so strip the suffix.
    basePath: (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000')
      .replace(/\/?api\/(v\d+)?$/i, '')
      .replace(/\/$/, ''),
    baseOptions: {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
    ...overrides,
  });


