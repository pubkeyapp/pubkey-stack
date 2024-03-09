import { AppConfig } from '../entity/app-config.entity'

export function getEnvEnvTemplate(appConfig: AppConfig) {
  return `(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([''], function() {
            return (root.__env = factory());
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals
        root.__env = factory();
    }
}(this, function() {
    return {{ENV}};
}));
`.replace('{{ENV}}', JSON.stringify(appConfig))
}
