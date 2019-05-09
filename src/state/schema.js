import { schema } from 'normalizr';
import decoders from './utils/decoders';

const provider = {
  cartodb: 'carto',
  raster: 'carto',
  'xyz tileset': 'leaflet',
  gee: 'leaflet',
};

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

export const layer = new schema.Entity(
  'layers',
  {},
  {
    processStrategy: l => {
      const group = l.relationships.layer_group.data;
      const source = l.relationships.sources.data;
      const layerConfig = JSON.parse(l.attributes.layer_config || '{}');
      const config = {
        cartodb: {
          body: {
            layers: [
              {
                options: {
                  cartocss: l.attributes.css,
                  cartocss_version: '2.1.0',
                  sql: l.attributes.query,
                },
                type: 'mapnik',
              },
            ],
            minzoom: l.attributes.zoom_min,
            maxzoom: l.attributes.zoom_max,
          },
          account: 'cdb',
        },
        raster: {
          body: {
            layers: [
              {
                options: {
                  cartocss: l.attributes.css,
                  cartocss_version: '2.3.0',
                  sql: l.attributes.query,
                  raster: true,
                  raster_band: 1,
                  geom_column: 'the_raster_webmercator',
                  geom_type: 'raster',
                },
                type: 'cartodb',
              },
            ],
            minzoom: l.attributes.zoom_min,
            maxzoom: l.attributes.zoom_max,
          },
          account: 'cdb',
        },
        'xyz tileset': {
          type: 'tileLayer',
          body: {
            url: l.attributes.query,
          },
        },
        gee: {
          ...layerConfig,
          decodeFunction: decoders[layerConfig.decoder],
          canvas: true,
        },
      };

      return {
        id: parseInt(l.id, 10),
        slug: l.attributes.slug,
        name: l.attributes.name,
        type: l.attributes.layer_provider,
        description: l.attributes.info,
        cartocss: l.attributes.css,
        interactivity: l.attributes.interactivity,
        sql: l.attributes.query,
        color: l.attributes.color,
        opacity: l.attributes.opacity,
        no_opacity: l.attributes.opacity === 0,
        order: l.attributes.order || null,
        maxZoom: l.attributes.zoom_max || 100,
        minZoom: l.attributes.zoom_min || 0,
        legend: l.attributes.legend,
        group: group ? parseInt(group.id, 10) : null,
        // active: l.attributes.active,
        published: l.attributes.published,
        info: l.attributes.info,
        dashboard_order: l.attributes.dashboard_order,
        download: l.attributes.download || null,
        dataset_shortname: l.attributes.dataset_shortname || null,
        dataset_source_url: l.attributes.dataset_source_url || null,
        attributions: source ? parseInt(source.id, 10) : null,
        analysisSuitable: l.attributes.analysis_suitable,
        analysisQuery: l.attributes.analysis_query,
        layerProvider: l.attributes.layer_provider,
        // Layer manager params
        provider: provider[l.attributes.layer_provider],
        layerConfig: config[l.attributes.layer_provider],
        decodeParams:
          l.attributes.layer_provider === 'gee'
            ? config.gee.decodeParams
            : null,
        decodeFunction:
          l.attributes.layer_provider === 'gee'
            ? config.gee.decodeFunction
            : null,
        params: l.attributes.layer_provider === 'gee' ? config.gee.params : {},
      };
    },
  },
);

export const persisted_layer = new schema.Entity('persisted_layers');

export const layer_group = new schema.Entity(
  'layer_groups',
  {},
  {
    processStrategy: lg => {
      const superGroupId = lg.attributes.super_group_id;
      return {
        id: parseInt(lg.id, 10),
        slug: lg.attributes.slug,
        name: lg.attributes.name,
        father: superGroupId ? parseInt(superGroupId, 10) : null,
        order: lg.attributes.order,
        // active: lg.attributes.active,
        group_type: lg.attributes.layer_group_type,
      };
    },
  },
);

export const source = new schema.Entity(
  'sources',
  {},
  {
    processStrategy: s => ({
      id: parseInt(s.id, 10),
      ...s.attributes,
    }),
  },
);

export const country = new schema.Entity(
  'countries',
  {},
  { idAttribute: 'iso' },
);
