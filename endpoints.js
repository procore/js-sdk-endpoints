const fetch = require('isomorphic-fetch');
const R = require('ramda');
const fs = require('fs');
const path = require('path');
const Progress = require('progress');
const pascalCase = require('to-pascal-case');
const S = require('string');
const Handlebars = require('handlebars');

const ENDOINTS_URL ='http://procore-api-documentation-staging.s3-website-us-east-1.amazonaws.com';

const notEmpty = R.compose(
  R.not,
  R.isEmpty
);

const endpointTemplatePath = path.join(
  __dirname,
  'endpoint.template'
);

const requiredField = R.ifElse(
  R.identity,
  () => '',
  () => '?'
);

const typescriptType = type => {
  switch(type) {
    case 'integer':
      return 'number';
    default:
      return type;
  }
}

Handlebars.registerHelper(
  'interface',
  R.reduce(
    (memo, { name, required, type }) =>
      memo.concat(`${name}${requiredField(required)}: ${typescriptType(type)};\n`),
    ''
  )
);

Handlebars.registerHelper(
  'args',
  R.ifElse(
    R.isEmpty,
    R.identity,
    R.compose(
      R.join(', '),
      R.pluck('name')
    )
  )
);

const isProductionGroup = R.compose(
  R.equals('production'),
  R.prop('highest_support_level')
);

const removeNonProductionGroups = (groups) => new Promise(
  (resolve, reject) => {
    resolve(R.filter(isProductionGroup, groups))
  }
);

const isProductionEndpoint = R.compose(
  R.equals('production'),
  R.prop('support_level')
);

const removeNonProductionEndpoints = (endpoints) => new Promise(
  (resolve, reject) => {
    resolve(R.filter(isProductionEndpoint, endpoints))
  }
);

const endpointCommand = (to, { destination, index }) => {
  return fetch(`${ENDOINTS_URL}/master/groups.json`)
    .then((res) => {
      return res.json().catch((err) => {
        err.endpoint = endpointName;
        err.reason = 'parsing JSON';

        throw err;
      });
    })
    .then(removeNonProductionGroups)
    .then((groups) => {
      const bar = new Progress(':bar :percent', { total: groups.length });

      const libPath = path.join(process.cwd(), to);

      const libIndexPath = path.join(libPath, index);

      const endpointsFolderPath = path.join(libPath, destination);

      if (!fs.existsSync(endpointsFolderPath)) {
        fs.mkdirSync(endpointsFolderPath);
      }

      return Promise.all(
        groups.map(({ name }) => {
          const endpointName = name.toLowerCase()

          const alreadySnakeCase = /^[a-z_]*$/.test(endpointName);

          const gelatoGroup = alreadySnakeCase ?
            S(endpointName) :
            S(endpointName).dasherize().s;

          return fetch(`${ENDOINTS_URL}/master/${gelatoGroup}.json`)
            .then((res) => res.json())
            .then(removeNonProductionEndpoints)
            .then(([{ path: endpointPath, path_params, query_params }]) => {
              fs.readFile(endpointTemplatePath, 'utf8', (err, data) => {
                const camelizedEndpointName = S(endpointName).camelize().s;

                const pascalCaseEndpointName = pascalCase(endpointName);

                const params = R.when(
                  R.compose(
                    R.not,
                    R.contains('id'),
                    R.pluck('name')
                  ),
                  R.concat([{ name: "id", type: "integer" }])
                )(path_params);

                const config = {
                  params,
                  name: camelizedEndpointName,
                  interfaceName: pascalCaseEndpointName,
                  definitions: params,
                  path: endpointPath
                };

                if (err) throw err;

                template = Handlebars.compile(data)

                file = template(config);

                return fs.writeFile(path.join(endpointsFolderPath, `${gelatoGroup}.ts`), file, () => {
                    if (err) throw err;

                    fs.appendFileSync(libIndexPath, `export { default as ${camelizedEndpointName} } from './${destination}/${gelatoGroup}'\n`)

                    bar.tick();
                });
              });
          })
          .catch((err) => {
            err.endpoint = endpointName;
            err.reason = 'Fetch';

            throw err;
          });
        })
      )
      .catch((err) => {
        if (err.endpoint && err.reason) {
          console.error(`Failed to fetch and parse JSON for endpoint: ${err.endpoint} failed at step: ${err.reason}`);
        }

        throw err;
      })
    })
}

module.exports= endpointCommand;
