export const schemaHeader = {
  $schema: 'https://json-schema.org/draft-07/schema#',
  $id: 'https://ic3.dev/test_schema.json',
  title: 'Test Schema',
  description: 'Just for testing',
  type: 'object'
}

const linked_schemas = {
  type: 'array',
  items: { type: 'string', pattern: '[A-Za-z0-9-._]{4,100}$' },
  minItems: 1,
  maxItems: 10,
  uniqueItems: true
}

const metadata = {
  schema: {
    name: 'test_schema'
  }
}

export const test_schema_1 = {
  ...schemaHeader,
  properties: {
    linked_schemas: linked_schemas,
    name: {
      type: 'string'
    },
    geolocation: {
      type: 'object',
      properties: {
        lat: {
          type: 'number'
        },
        lon: {
          type: 'number'
        }
      },
      required: ['lat', 'lon']
    }
  },
  required: ['linked_schemas', 'name', 'geolocation'],
  metadata: metadata
}

export const test_schema_2 = {
  ...schemaHeader,
  properties: {
    linked_schemas: linked_schemas,
    name: {
      type: 'string'
    },
    urls: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          url: {
            type: 'string',
            pattern: '^https?://.*'
          }
        },
        required: ['name', 'url']
      }
    }
  },
  required: ['linked_schemas', 'name', 'urls'],
  metadata: metadata
}

export const test_schema_3 = {
  ...schemaHeader,
  properties: {
    linked_schemas: linked_schemas,
    person: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        address: {
          type: 'object',
          properties: {
            street: {
              type: 'string'
            },
            location: {
              type: 'object',
              properties: {
                locality: {
                  type: 'string'
                },
                region: {
                  type: 'string'
                },
                country: {
                  type: 'string'
                }
              },
              required: ['country', 'locality']
            }
          },
          required: ['location']
        }
      },
      required: ['name']
    }
  },
  required: ['linked_schemas', 'person'],
  metadata: metadata
}

export const test_schema_4 = {
  ...schemaHeader,
  properties: {
    linked_schemas: linked_schemas,
    single_choice: {
      type: 'string',
      enum: ['zero', 'one', 'two', 'three', 'four'],
      enumNames: ['None', 'First', 'Second', 'Third', 'Fourth']
    },
    multiple_choice: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['one', 'two', 'three', 'four', 'five'],
        enumNames: ['First', 'Second', 'Third', 'Fourth', 'Fifth']
      }
    }
  },
  required: ['linked_schemas', 'single_choice', 'multiple_choice'],
  metadata: metadata
}

export const test_schema_5 = {
  ...schemaHeader,
  properties: {
    linked_schemas: linked_schemas,
    wrapping_object: {
      type: 'object',
      properties: {
        single_choice: {
          type: 'string',
          enum: ['zero', 'one', 'two', 'three', 'four'],
          enumNames: ['None', 'First', 'Second', 'Third', 'Fourth']
        },
        multiple_choice: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['one', 'two', 'three', 'four', 'five'],
            enumNames: ['First', 'Second', 'Third', 'Fourth', 'Fifth']
          }
        }
      }
    }
  },
  required: ['linked_schemas', 'wrapping_object'],
  metadata: metadata
}

export const karte_von_morgen = {
  ...schemaHeader,
  properties: {
    linked_schemas: linked_schemas,
    name: {
      title: 'Name',
      description: 'The name of the entity, organization, project, item, etc.',
      type: 'string',
      metadata: {
        creator: {
          name: 'Murmurations Network',
          url: 'https://murmurations.network'
        },
        field: {
          name: 'name',
          version: '1.0.0'
        },
        context: ['https://schema.org/name'],
        purpose:
          'The common name that is generally used to refer to the entity, organization, project, item, etc., which can be a living being, a legal entity, an object (real or virtual) or even a good or service.'
      }
    },
    primary_url: {
      title: 'Primary URL',
      description:
        'The primary URL of the entity or item (i.e., its unique, canonical and definitive website address)',
      type: 'string',
      maxLength: 2000,
      metadata: {
        creator: {
          name: 'Murmurations Network',
          url: 'https://murmurations.network'
        },
        field: {
          name: 'primary_url',
          version: '1.0.0'
        },
        context: ['https://schema.org/identifier'],
        purpose:
          'The primary URL is used to uniquely identify the entity or item, and is usually represented as a website address or specific web page that is well-known to be linked to the entity. It can be used to link to the entity or item from other entities or items.'
      }
    },
    description: {
      title: 'Description',
      description:
        'A description of the item, entity, organization, project, etc.',
      type: 'string',
      metadata: {
        creator: {
          name: 'Murmurations Network',
          url: 'https://murmurations.network'
        },
        field: {
          name: 'description',
          version: '1.0.0'
        },
        context: ['http://schema.org/description'],
        purpose:
          'The Description field can be used to provided a description of the item, entity, organization, project, etc. We have chosen not to add a maximum length but aggregators may snip the first ~160 characters of this field to provide a summary in directory listings or maps, so make sure the first sentence provides a good overview of the entity you are describing.'
      }
    },
    latitude: {
      title: 'Latitude',
      description: 'A decimal amount between -90 and 90',
      type: 'number',
      minimum: -90,
      maximum: 90,
      metadata: {
        creator: {
          name: 'Murmurations Network',
          url: 'https://murmurations.network'
        },
        field: {
          name: 'latitude',
          version: '1.0.0'
        },
        context: ['https://schema.org/latitude']
      }
    },
    longitude: {
      title: 'Longitude',
      description: 'A decimal amount between -180 and 180',
      type: 'number',
      minimum: -180,
      maximum: 180,
      metadata: {
        creator: {
          name: 'Murmurations Network',
          url: 'https://murmurations.network'
        },
        field: {
          name: 'longitude',
          version: '1.0.0'
        },
        context: ['https://schema.org/longitude']
      }
    },
    locality: {
      title: 'Locality',
      description:
        'The locality (city, town, village, etc.) where the entity is located',
      type: 'string',
      metadata: {
        creator: {
          name: 'Murmurations Network',
          url: 'https://murmurations.network'
        },
        field: {
          name: 'locality',
          version: '1.0.0'
        },
        context: ['https://schema.org/addressLocality']
      }
    },
    region: {
      title: 'Region',
      description:
        'The region (state, county, province, etc.) where the entity is located',
      type: 'string',
      metadata: {
        creator: {
          name: 'Murmurations Network',
          url: 'https://murmurations.network'
        },
        field: {
          name: 'region',
          version: '1.0.0'
        },
        context: ['https://schema.org/addressRegion']
      }
    },
    country_name: {
      title: 'Country name',
      description: 'The name of country where the entity is based',
      type: 'string',
      metadata: {
        creator: {
          name: 'Murmurations Network',
          url: 'https://murmurations.network'
        },
        field: {
          name: 'country_name',
          version: '1.0.0'
        },
        context: ['https://schema.org/Country'],
        purpose:
          "A free form field to enter a country's name. The Index will try to match that text to a country's name and will store the country's two-letter ISO-3166-1 code in the Index database to enable searching by country for the entity. The name-to-ISO mapping is here: https://github.com/MurmurationsNetwork/MurmurationsLibrary/blob/main/countries/map.json"
      }
    },
    email: {
      title: 'Contact Email',
      description: 'An email address at which to contact the entity',
      type: 'string',
      metadata: {
        creator: {
          name: 'Murmurations Network',
          url: 'https://murmurations.network'
        },
        field: {
          name: 'email',
          version: '1.0.0'
        },
        context: ['https://schema.org/email'],
        purpose:
          "Provides a contact email address for an entity. It is a free form text field without validation so that an email can be entered in a less machine-readable format (e.g., 'myname at somedomain dot org')."
      }
    },
    image: {
      title: 'Image',
      description:
        'The URL of an image or logo starting with http:// or https://',
      type: 'string',
      maxLength: 2000,
      pattern: '^https?://.*',
      metadata: {
        creator: {
          name: 'Murmurations Network',
          url: 'https://murmurations.network'
        },
        field: {
          name: 'image',
          version: '1.0.0'
        },
        context: ['https://schema.org/image'],
        purpose:
          'An image that is generally used to refer to the entity, organization, project, item, etc.'
      }
    },
    kvm_category: {
      title: 'Type of Entry',
      description:
        'KVM category for the entity: Initiative (non-profit), Company (for-profit)',
      type: 'array',
      items: {
        type: 'string'
      },
      uniqueItems: true
    },
    tags: {
      title: 'Tags',
      description:
        'Keywords relevant to this entity and its activities or attributes, searchable in the Murmurations index',
      type: 'array',
      items: {
        type: 'string'
      },
      uniqueItems: true,
      metadata: {
        creator: {
          name: 'Murmurations Network',
          url: 'https://murmurations.network'
        },
        field: {
          name: 'tags',
          version: '1.0.0'
        },
        context: ['https://schema.org/keywords'],
        purpose:
          'Tags holds a list of unique keywords that are used to describe any aspect of the entity, such that there is enough information to fit the entity into a variety of data taxonomies.'
      }
    }
  },
  required: ['linked_schemas', 'name', 'primary_url'],
  metadata: {
    creator: {
      name: 'Karte von Morgen',
      url: 'https://www.kartevonmorgen.org'
    },
    schema: {
      name: 'karte_von_morgen-v1.0.0',
      purpose:
        'Entries (Initiatives, Organisations, Companies) from Kartevonmorgen.org'
    }
  }
}
