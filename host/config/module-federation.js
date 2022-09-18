const deps = require("../package.json").dependencies;
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { NodeFederationPlugin, StreamingTargetPlugin } = require("@module-federation/node");

module.exports = {
    client: new ModuleFederationPlugin({
      name: "host",
      remotes: {
        App1: `App1@http://localhost:4000/moduleEntry.js`,
        App2: `App2@http://localhost:4010/moduleEntry.js`,
        host: "host@http://localhost:9090/host.js"
      },
      exposes: {
        "./model1": "./src/model1",
        "./model2": "./src/model2",
      },
      shared: [{
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      }],
    }),
    server: [
      new NodeFederationPlugin({
          name: "host",
          library: { type: "commonjs-module" },
          filename: "remoteEntry.js",
          remotes: {
            App1: `App1@http://localhost:4000/moduleEntry.js`,
            App2: `App2@http://localhost:4010/moduleEntry.js`,
            host: "host@http://localhost:9090/host.js"
          },
          exposes: {
            "./model1": "./src/model1",
            "./model2": "./src/model2",
          },
          shared: [{
            ...deps,
            react: {
              singleton: true,
              requiredVersion: deps.react,
            },
            "react-dom": {
              singleton: true,
              requiredVersion: deps["react-dom"],
            },
            "@npm-registry/eapteka-ui": {
              singleton: true,
              requiredVersion: deps["@npm-registry/eapteka-ui"],
            }
          }],
      }),
      new StreamingTargetPlugin({
          name: "host",
          library: { type: "commonjs-module" },            
          remotes: {
            App1: `App1@http://localhost:4000/moduleEntry.js`,
            App2: `App2@http://localhost:4010/moduleEntry.js`,
            host: "host@http://localhost:9090/host.js"
          },
      }),
    ]
}