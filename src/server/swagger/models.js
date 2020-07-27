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
    {
      name: 'Comptes',
      description: 'API for comptes in the system',
    },
  ],
  schemes: [
    'https',
    'http',
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
    // '/comptes': {
    //   get: {
    //     tags: [
    //       'Comptes',
    //     ],
    //     summary: 'Get all compte in system',
    //     security: [
    //       {
    //         JWT: [],
    //       },
    //     ],
    //     responses: {
    //       200: {
    //         description: 'OK',
    //         schema: {
    //           $ref: '#/definitions/Comptes',
    //         },
    //       },
    //       401: {
    //         description: 'KO',
    //         schema: {
    //           properties: {
    //             error: {
    //               type: 'Invalid token.',
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    //   post: {
    //     tags: [
    //       'Comptes',
    //     ],
    //     description: 'Create new compte in system',
    //     parameters: [
    //       {
    //         name: 'comptes',
    //         in: 'body',
    //         description: 'Comptes that we want to signin',
    //         schema: {
    //           properties: {
    //             rib: {
    //               type: 'string',
    //             },
    //           },
    //         },
    //       },
    //     ],
    //     security: [
    //       {
    //         JWT: [],
    //       },
    //     ],
    //     produces: [
    //       'application/json',
    //     ],
    //     responses: {
    //       200: {
    //         description: 'OK',
    //         schema: {
    //           $ref: '#/definitions/Comptes',
    //         },
    //       },
    //       400: {
    //         description: 'Bad Request',
    //         schema: {
    //           $ref: '#/definitions/Errors',
    //         },
    //       },
    //       401: {
    //         description: 'KO',
    //         schema: {
    //           properties: {
    //             error: {
    //               type: 'Invalid token.',
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    // '/comptes/{compteId}': {
    //   parameters: [
    //     {
    //       name: 'compteId',
    //       in: 'path',
    //       required: true,
    //       description: 'ID of compte that we want to find',
    //       type: 'string',
    //     },
    //   ],
    //   get: {
    //     tags: [
    //       'Comptes',
    //     ],
    //     security: [
    //       {
    //         JWT: [],
    //       },
    //     ],
    //     summary: 'Get Compte with given ID',
    //     responses: {
    //       200: {
    //         description: 'Compte is found',
    //         schema: {
    //           $ref: '#/definitions/Comptes',
    //         },
    //       },
    //       404: {
    //         description: 'Compte not found',
    //         schema: {
    //           properties: {
    //             error: {
    //               type: 'Compte not found',
    //             },
    //           },
    //         },
    //       },
    //       401: {
    //         description: 'KO',
    //         schema: {
    //           properties: {
    //             error: {
    //               type: 'Invalid token.',
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    //   delete: {
    //     summary: 'Delete Compte with given ID',
    //     tags: [
    //       'Comptes',
    //     ],
    //     security: [
    //       {
    //         JWT: [],
    //       },
    //     ],
    //     responses: {
    //       200: {
    //         description: 'Compte is deleted',
    //         schema: {
    //           properties: {
    //             success: {
    //               type: 'string',
    //             },
    //             _id: {
    //               type: 'string',
    //             },
    //           },
    //         },
    //       },
    //       404: {
    //         description: 'Comptes not found',
    //         schema: {
    //           properties: {
    //             error: {
    //               type: 'Compte not found',
    //             },
    //           },
    //         },
    //       },
    //       401: {
    //         description: 'KO',
    //         schema: {
    //           properties: {
    //             error: {
    //               type: 'Invalid token.',
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // put: {
    //   summary: 'Update user with give ID',
    //   tags: [
    //     'Users',
    //   ],
    //   parameters: [
    //     {
    //       name: 'user',
    //       in: 'body',
    //       description: 'User with new values of properties',
    //       schema: {
    //         $ref: '#/definitions/User',
    //       },
    //     },
    //   ],
    //   responses: {
    //     200: {
    //       description: 'User is updated',
    //       schema: {
    //         $ref: '#/definitions/User',
    //       },
    //     },
    //     404: {
    //       description: 'User not found',
    //       schema: {
    //         properties: {
    //           error: {
    //             type: 'User not found',
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    // },
    '/login': {
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
        security: [
          {
            JWT: [],
          },
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
      get: {
        tags: [
          'Users',
        ],
        security: [
          {
            JWT: [],
          },
        ],
        summary: 'Get all users in system',
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Users',
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
        security: [
          {
            JWT: [],
          },
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
      delete: {
        summary: 'Delete user with given ID',
        tags: [
          'Users',
        ],
        security: [
          {
            JWT: [],
          },
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
      put: {
        summary: 'Update user with give ID',
        tags: [
          'Users',
        ],
        security: [
          {
            JWT: [],
          },
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
    '/operations/{rib}/{min}/{max}': {
      parameters: [
        {
          name: 'rib',
          in: 'path',
          required: true,
          description: 'rib of user that we want to find operations',
          type: 'string',
        },
        {
          name: 'min',
          in: 'path',
          required: true,
          description: 'date min format YYYY-MM-DD',
          type: 'string',
        },
        {
          name: 'max',
          in: 'path',
          required: true,
          description: 'date max format YYYY-MM-DD',
          type: 'string',
        },
      ],
      get: {
        tags: [
          'Operations',
        ],
        summary: 'Get Operations of rib in system',
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
          400: {
            description: 'KO',
            schema: {
              properties: {
                error: {
                  type: 'Rib not found or Date Invalid',
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
    Comptes: {
      required: [
        'rib',
      ],
      properties: {
        rib: {
          type: 'string',
        },
      },
    },
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
    ArrayOfRibs: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    User: {
      required: [
        'email',
        'password',
        'role',
      ],
      properties: {
        email: {
          type: 'string',
          uniqueItems: true,
        },
        password: {
          type: 'string',
        },
        role: {
          type: 'number',
        },
        rib: {
          type: 'array',
          $ref: '#/definitions/ArrayOfRibs',
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
