import { schema } from 'normalizr';

export const site_scopes = new schema.Entity(
  'site_scopes',
  {},
  {
    processStrategy: site => ({
      ...site.attributes,
      pages: site.relationships.site_pages.data,
    }),
  },
);
