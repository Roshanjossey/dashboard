/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const { addMatchImageSnapshotPlugin, } = require('cypress-image-snapshot/plugin');
const retinaScreenWidth = 2800
const retinaScreenHeight = 2400
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'chrome' && browser.isHeadless) {
      launchOptions.args.push(`--window-size=${retinaScreenWidth},${retinaScreenHeight}`)

      // force screen to be retina (2800x2400 size)
      launchOptions.args.push('--force-device-scale-factor=2')
    }

    if (browser.name === 'electron' && browser.isHeadless) {
      // fullPage screenshot size is 1400x1200
      launchOptions.preferences.width = retinaScreenWidth
      launchOptions.preferences.height = retinaScreenHeight
    }

    if (browser.name === 'firefox' && browser.isHeadless) {
      // menubars take up height on the screen
      // so fullPage screenshot size is 1400x1126
      launchOptions.args.push('--width=' + retinaScreenWidth)
      launchOptions.args.push('--height=' + retinaScreenHeight)
    }
  })

  addMatchImageSnapshotPlugin(on, config);
}
