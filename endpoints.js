const fetch = require('isomorphic-fetch');
const R = require('ramda');
const fs = require('fs');
const path = require('path');
var S = require('string');
const Handlebars = require('handlebars');

const notEmpty = R.compose(
  R.not,
  R.isEmpty
);

const endpointTemplatePath = path.join(
  __dirname,
  'endpoint.template'
);

Handlebars.registerHelper(
  'args',
  R.ifElse(
    R.isEmpty,
    R.identity,
    names => `, ${names.join(', ')}`
  )
);

const endpointCommand = (to, opt) => {
  fetch('http://procore-api-documentation-staging.s3-website-us-east-1.amazonaws.com/master/groups.json')
    .then((res) => res.json())
    .then((groups) => {
      groups.forEach(({ name }) => {
        const endpointName = name.toLowerCase()

        const gelatoGroup = S(endpointName).dasherize().s;

        fetch(`http://procore-api-documentation-staging.s3-website-us-east-1.amazonaws.com/master/${gelatoGroup}.json`)
          .then(res => res.json())
          .then(([{ path: endpointPath, path_params }]) => {
            fs.readFile(endpointTemplatePath, 'utf8', (err, data) => {
              const endpointFunctionName = S(endpointName).camelize().s;

              const config = {
                name: endpointFunctionName,
                path: endpointPath,
                params: R.pluck('name', path_params)
              };

              if (err) throw err;

              template = Handlebars.compile(data)

              file = template(config);

              fs.writeFile(path.join(process.cwd(), to, `${gelatoGroup}.ts`), file, () => {
                  if (err) throw err;

                  console.log(`${endpointName} file generated`);
              });
            });
          });
      });
    });
}

module.exports= endpointCommand;
