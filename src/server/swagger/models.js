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
    Annex_chauffage: {
      type: "object",
      properties: {
        "etat": {
          description: "missing description",
          type: "string"
        },
        type: {
          description: "missing description",
          type: "string"
        },
        Libelle: {
          type: 'string',
        },
        Montant: {
          type: 'string',
        },

      }
    },
    Bureau_etude: {
      type: "object",
      properties: {
        name: {
          "description": "\n",
          type: "string"
        },
        contact: {
          description: "missing description",
          type: "string"
        },
        adressElectronique: {
          description: "missing description",
          type: "string"
        }
      }
    },
    Calculs: {
      type: "object",
      properties: {
        logiciel: {
          description: "missing description",
          type: "string"
        },
        temps: {
          description: "missing description",
          type: "string"
        }
      }
    },
    Chauffage_regulation: {
      type: "object",
      properties: {
        type: {
          description: "missing description",
          type: "string"
        },
        marque: {
          description: "missing description",
          type: "string"
        },
        energie: {
          description: "missing description",
          type: "string"
        },
        commentaire: {
          description: "missing description",
          type: "string"
        },
        annex: {
          description: "missing description",
          type: "string"
        }
      }
    },
    Climatisation: {
      type: "object",
      properties: {
        description: {
          description: "missing description",
          type: "string"
        },
        media: {
          type: 'array',
          $ref: '#/definitions/Media',
        },
        performance: {
          type: 'object',
          $ref: '#/definitions/Performance',
        },
      }
    },
    Comptes: {
      type: "object",
      properties: {
        type: {
          description: "missing description",
          type: "string"
        },
        identifiant: {
          description: "missing description",
          type: "string"
        },
        password: {
          description: "missing description",
          type: "string"
        },
        contact: {
          description: "missing description",
          type: "string"
        },
        adress: {
          description: "missing description",
          type: "string"
        },
        photo: {
          description: "missing description",
          type: "string"
        },
        role: {
          description: "missing description",
          type: "string"
        }
      }
    },
    Conditions_utilisation: {
      type: "object",
      properties: {
        surface_chauffe: {
          "description": "\n",
          type: "string"
        },
        heures_presence: {
          description: "missing description",
          type: "string"
        },
        numbre_occupants: {
          description: "missing description",
          type: "string"
        },
        temperature: {
          description: "missing description",
          type: "string"
        }
      }
    },
    Decriptif_ouvrants: {
      type: "object",
      properties: {
        portes: {
          type: 'object',
          $ref: '#/definitions/Infos_descriptifs',
        },
        fenetres: {
          type: 'object',
          $ref: '#/definitions/Infos_descriptifs',
        }
      }
    },
    Descriptif_parois: {
      type: "object",
      properties: {
        planchers: {
          type: 'object',
          $ref: '#/definitions/Infos_descriptifs',
        },
        plafonds: {
          type: 'object',
          $ref: '#/definitions/Infos_descriptifs',
        },
        murs: {
          type: 'object',
          $ref: '#/definitions/Infos_descriptifs',
        }
      }
    },
    Descriptif_system: {
      type: "object",
      properties: {
        climatisation: {
          type: 'object',
          $ref: '#/definitions/Climatisation',
        },
        eclairage: {
          type: 'object',
          $ref: '#/definitions/Eclairage',
        },
        ventilation: {
          type: 'object',
          $ref: '#/definitions/Ventilation',
        },
        eau_chaude_sanitaire: {
          type: 'object',
          $ref: '#/definitions/Eau_chaude_sanitaire',
        },
        chauffage_regulation: {
          type: 'object',
          $ref: '#/definitions/Chauffage_regulation',
        },
      },
    },
    Eau_chaude_sanitaire: {
      type: "object",
      properties: {
        description: {
          description: "missing description",
          type: "string"
        },
        quantites: {
          description: "missing description",
          type: "string"
        },
        lieu: {
          description: "missing description",
          type: "string"
        },
        volume_chauffe: {
          description: "missing description",
          type: "string"
        },
        performance: {
          type: 'object',
          $ref: '#/definitions/Performance',
        }, media: {
          type: 'array',
          $ref: '#/definitions/Media',
        }
      }
    },
    Eclairage: {
      type: "object",
      properties: {
        type: {
          description: "missing description",
          type: "string"
        },
        dure_de_vie: {
          description: "missing description",
          type: "string"
        },
        efficacite: {
          description: "missing description",
          type: "string"
        },
        pice: {
          description: "missing description",
          type: "string"
        },
        performance: {
          type: 'object',
          $ref: '#/definitions/Performance',
        }, media: {
          type: 'array',
          $ref: '#/definitions/Media',
        }
      }
    },
    Etat_lieux_existants: {
      type: "object",
      properties: {
        conditions_utilisation: {
          type: 'object',
          $ref: '#/definitions/Conditions_utilisation',
        },
        descriptif_parois: {
          type: 'object',
          $ref: '#/definitions/Descriptif_parois',
        },
        descriptif_system: {
          type: 'object',
          $ref: '#/definitions/Descriptif_system',
        },
        decriptif_ouvrants: {
          type: 'object',
          $ref: '#/definitions/Decriptif_ouvrants',
        },
        ressenti_occupans: {
          type: 'object',
          $ref: '#/definitions/Ressenti_occupans',
        }
      }
    },
    Face: {
      type: "object",
      properties: {
        description: {
          description: "missing description",
          type: "string",
        },
        video: {
          type: 'array',
          $ref: '#/definitions/Media',
        },
        photo: {
          type: 'array',
          $ref: '#/definitions/Media',
        },
      }
    },
    Folders: {
      type: "object",
      properties: {
        info_generale: {
          type: 'object',
          $ref: '#/definitions/Info_generale',
        },
        etat_lieux_existants: {
          type: 'object',
          $ref: '#/definitions/Etat_lieux_existants',
        }
      }
    },
    Info_generale: {
      type: "object",
      properties: {
        maitre_ovrage: {
          type: 'object',
          $ref: '#/definitions/Maitre_ovrage',
        },
        bureau_etude: {
          type: 'object',
          $ref: '#/definitions/Bureau_etude',
        },
        reference: {
          type: 'object',
          $ref: '#/definitions/Reference',
        },
        zone_climatique: {
          type: 'object',
          $ref: '#/definitions/Zone_climatique',
        },
        plan: {
          type: 'object',
          $ref: '#/definitions/Plan',
        },
        calculs: {
          type: 'object',
          $ref: '#/definitions/Calculs',
        },
        site_audit: {
          type: 'object',
          $ref: '#/definitions/Site_audit',
        },
        photos_face: {
          type: 'object',
          $ref: '#/definitions/Photos_face',
        }
      }
    },
    Infos_descriptifs: {
      type: "object",
      properties: {
        description: {
          "description": "o\tMateriau\no\tVitrage\no\tDimension\no\tSurface\no\tUW\no\tVolet\no\tEpaisseur lame d’air\n",
          type: "string"
        },
        composition: {
          description: "missing description",
          type: "string"
        },
        information: {
          description: "missing description",
          type: "string"
        },
        materiau: {
          description: "missing description",
          type: "string"
        },
        vitrage: {
          description: "missing description",
          type: "string"
        },
        surface: {
          description: "missing description",
          type: "string"
        },
        Uw: {
          description: "missing description",
          type: "string"
        },
        volet: {
          description: "missing description",
          type: "string"
        },
        epaisseur_lame_air: {
          description: "missing description",
          type: "string"
        },
        dimension: {
          description: "missing description",
          type: "string"
        },
        Ud: {
          description: "missing description",
          type: "string"
        },
        code: {
          description: "missing description",
          type: "string"
        },
        quantites: {
          description: "missing description",
          type: "string"
        },
        media: {
          type: 'array',
          $ref: '#/definitions/Media',
        },
        performance: {
          type: 'object',
          $ref: '#/definitions/Performance',
        },

      }
    },
    Maitre_ovrage: {
      type: "object",
      properties: {
        statut: {
          description: "missing description",
          type: "string"
        },
        adress: {
          description: "missing description",
          type: "string"
        },
        nom: {
          description: "missing description",
          type: "string"
        }
      }
    },
    Media: {
      type: "object",
      properties: {
        type: {
          description: "missing description",
          type: "string"
        },
        url: {
          description: "missing description",
          type: "string"
        },
        name: {
          description: "missing description",
          type: "string"
        }
      }
    },
    MediaInput: {
      type: "object",
      properties: {
        type: {
          description: "missing description",
          type: "string"
        },
        url: {
          description: "missing description",
          type: "string"
        },
        name: {
          description: "missing description",
          type: "string"
        }
      }
    },
    Performance: {
      type: "object",
      properties: {
        key: {
          description: "\tInsiffisante(0)\n\tMoyenne(1)\n\tBone(2)\n\tTres Bonne(3)\n",
          type: "string"
        },
        description: {
          description: "missing description",
          type: "string"
        }
      }
    },
    Photos_face: {
      type: "object",
      properties: {
        nord: {
          type: 'array',
          $ref: '#/definitions/Face',
        },
        sud: {
          type: 'array',
          $ref: '#/definitions/Face',
        },
        ouest: {
          type: 'array',
          $ref: '#/definitions/Face',
        },
        est: {
          type: 'array',
          $ref: '#/definitions/Face',
        }
      }
    },
    Plan: {
      type: "object",
      properties: {
        description: {
          description: "missing description",
          type: "string"
        },
        legende: {
          description: "missing description",
          type: "string"
        },
        media: {
          type: 'array',
          $ref: '#/definitions/Media',
        }
      }
    },
    Reference: {
      type: "object",
      properties: {
        code: {
          description: "missing description",
          type: "string"
        },
        code_postal: {
          description: "missing description",
          type: "string"
        },
        objet: {
          description: "missing description",
          type: "string"
        },
        adress_batiment: {
          description: "missing description",
          type: "string"
        },
        media: {
          type: 'array',
          $ref: '#/definitions/Media',
        }
      }
    },
    Ressenti_occupans: {
      type: "object",
      properties: {
        question: {
          description: "missing description",
          type: "string"
        },
        resulta: {
          description: "missing description",
          type: "string"
        }
      }
    },
    Site_audit: {
      type: "object",
      properties: {
        date: {
          description: "missing description",
          type: "string"
        },
        departement: {
          description: "missing description",
          type: "string"
        },
        surface_habitable: {
          description: "missing description",
          type: "string"
        },
        anne_construction: {
          description: "missing description",
          type: "string"
        }
      }
    },
    Type_annex_chauffage: {
      type: "object",
      properties: {
        etat: {
          description: "missing description",
          type: "string"
        },
        performance: {
          type: 'object',
          $ref: '#/definitions/Performence',
        },
        media: {
          type: 'array',
          $ref: '#/definitions/Media',
        },
        code: {
          description: "missing description",
          type: "string"
        },
        label: {
          description: "missing description",
          type: "string"
        }
      }
    },
    TypeCompte: {
      type: "object",
      properties: {
        value: {
          description: "missing description",
          type: "string"
        },
        key: {
          description: "missing description",
          type: "string"
        }
      }
    },
    Ventilation: {
      type: "object",
      properties: {
        descriptif: {
          description: "missing description",
          type: "string"
        },
        media: {
          type: 'array',
          $ref: '#/definitions/Media',
        },
        performance: {
          type: 'object',
          $ref: '#/definitions/Performance',
        },
      }
    },
    Zone_climatique: {
      type: "object",
      properties: {
        media: {
          type: 'array',
          $ref: '#/definitions/Media',
        }
      }
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
