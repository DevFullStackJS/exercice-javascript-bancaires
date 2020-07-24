const config = require('../../config');

module.exports = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Gestion banquaire Application API',
    description: 'Gestion banquaire Application API',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  host: config.url,
  basePath: config.pathApi,
  tags: [
    {
      name: 'Users',
      description: 'API for users in the system',
    },
    {
      name: 'Operations',
      description: 'API for operation in the system',
    },
  ],
  schemes: [
    'http',
    'https',
  ],
  servers: [
    {
      url: 'https://api_url_testing',
      description: 'Testing server',
    },
  ],
  consumes: [
    'application/json',
  ],
  produces: [
    'application/json',
  ],
  securitySchemes: {
    JWT: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  securityDefinitions: {
    JWT: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  paths: {
    '/users/login': {
      post: {
        tags: [
          'Users',
        ],
        description: 'Create new user in system',
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'User that we want to signin',
            schema: {
              properties: {
                email: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                },
              },
            },
          },
        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/login',
            },
          },
          201: {
            description: 'KO',
            schema: {
              properties: {
                error: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    '/users': {
      post: {
        tags: [
          'Users',
        ],
        description: 'Create new user in system',
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'User that we want to create',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'New user is created',
            schema: {
              $ref: '#/definitions/User',
            },
          },
          400: {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/Errors',
            },
          },
        },
      },
      get: {
        tags: [
          'Users',
        ],
        summary: 'Get all users in system',
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Users',
            },
          },
        },
      },
    },
    '/users/{userId}': {
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          description: 'ID of user that we want to find',
          type: 'string',
        },
      ],
      get: {
        tags: [
          'Users',
        ],
        summary: 'Get user with given ID',
        responses: {
          200: {
            description: 'User is found',
            schema: {
              $ref: '#/definitions/User',
            },
          },
          404: {
            description: 'User not found',
            schema: {
              properties: {
                error: {
                  type: 'User not found',
                },
              },
            },
          },
        },
      },
      delete: {
        summary: 'Delete user with given ID',
        tags: [
          'Users',
        ],
        responses: {
          200: {
            description: 'User is deleted',
            schema: {
              properties: {
                success: {
                  type: 'string',
                },
                _id: {
                  type: 'string',
                },
              },
            },
          },
          404: {
            description: 'User not found',
            schema: {
              properties: {
                error: {
                  type: 'User not found',
                },
              },
            },
          },
        },
      },
      put: {
        summary: 'Update user with give ID',
        tags: [
          'Users',
        ],
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'User with new values of properties',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        ],
        responses: {
          200: {
            description: 'User is updated',
            schema: {
              $ref: '#/definitions/User',
            },
          },
          404: {
            description: 'User not found',
            schema: {
              properties: {
                error: {
                  type: 'User not found',
                },
              },
            },
          },
        },
      },
    },
    '/operations': {
      get: {
        tags: [
          'Operations',
        ],
        summary: 'Get all operation in system',
        security: [
          {
            JWT: [],
          },
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Operations',
            },
          },
          401: {
            description: 'KO',
            schema: {
              properties: {
                error: {
                  type: 'Invalid token.',
                },
              },
            },
          },
        },
      },
    },
    '/operations/{rib}': {
      parameters: [
        {
          name: 'rib',
          in: 'path',
          required: true,
          description: 'rib of user that we want to find operations',
          type: 'string',
        },
      ],
      post: {
        tags: [
          'Operations',
        ],
        summary: 'Get rib operations in system',
        security: [
          {
            JWT: [],
          },
        ],
        parameters: [
          {
            name: 'Date',
            in: 'body',
            description: 'User that we want to create',
            schema: {
              $ref: '#/definitions/Date',
            },
          },
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Operations',
            },
          },
          404: {
            description: 'KO',
            schema: {
              properties: {
                error: {
                  type: 'Rib not found',
                },
              },
            },
          },
          401: {
            description: 'KO',
            schema: {
              properties: {
                error: {
                  type: 'Invalid token.',
                },
              },
            },
          },
        },
      },
    },
  },
  definitions: {
    Date: {
      properties: {
        min: {
          type: 'string',
        },
        max: {
          type: 'string',
        },
      },
    },
    login: {
      properties: {
        user: {
          type: 'object',
        },
        token: {
          type: 'string',
          uniqueItems: true,
        },
      },
    },
    User: {
      required: [
        'email',
        'password',
        'username',
        'rib',
      ],
      properties: {
        email: {
          type: 'string',
          uniqueItems: true,
        },
        password: {
          type: 'string',
        },
        username: {
          type: 'string',
        },
        rib: {
          type: 'string',
        },
      },
    },
    Error: {
      properties: {
        value: {
          type: 'string',
        },
        msg: {
          type: 'string',
        },
        param: {
          type: 'string',
        },
        location: {
          type: 'string',
        },
      },
    },
    Errors: {
      type: 'array',
      $ref: '#/definitions/Error',
    },
    Users: {
      type: 'array',
      $ref: '#/definitions/User',
    },
    Operation: {
      required: [
        'RIB',
        'Date',
        'Libelle',
        'Montant',
        'Devise',
      ],
      properties: {
        RIB: {
          type: 'string',
        },
        Date: {
          type: 'string',
        },
        Libelle: {
          type: 'string',
        },
        Montant: {
          type: 'string',
        },
        Devise: {
          type: 'string',
        },
      },
    },
    Operations: {
      type: 'array',
      $ref: '#/definitions/Operation',
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};
