// export const swaggerDocument = require('./models.json');
import swaggerDoc from './models';

export const options = {
  validatorUrl: null,
  oauth: {
    clientId: 'your-client-id1',
    clientSecret: 'your-client-secret-if-required1',
    realm: 'your-realms1',
    appName: 'your-app-name1',
    scopeSeparator: ',',
    additionalQueryStringParams: {},
  },
  swaggerOptions: {
    authAction: { JWT: { name: 'JWT', schema: { type: 'apiKey', in: 'header', name: 'Authorization', description: 'Bearer <JWT>' }, value: 'Bearer <JWT>' } },
  },
  docExpansion: 'full',
  operationsSorter: function (a, b) {
    const score = {
      '/test': 1,
      '/bar': 2,
    };
    console.log('a', a.get('path'), b.get('path'));
    return score[a.get('path')] < score[b.get('path')];
  },
};

export const swaggerDocument = swaggerDoc;
