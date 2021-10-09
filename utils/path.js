/* eslint-disable @typescript-eslint/no-var-requires */
const resolveRelativeAppRoot = require('./resolvePath').resolveRelativeAppRoot;

module.exports = {
  root: resolveRelativeAppRoot('.'),
  dist: resolveRelativeAppRoot('dist'),
  clientDist: resolveRelativeAppRoot('dist/client'),
  mobileClientHtml: resolveRelativeAppRoot('dist/client/mobile.html'),
  webClientHtml: resolveRelativeAppRoot('dist/client/web.html'),
  serverDist: resolveRelativeAppRoot('dist/server'),
  src: resolveRelativeAppRoot('src'),
  mobileAppTsx: resolveRelativeAppRoot('src/apps/mobile/index.tsx'),
  webAppTsx: resolveRelativeAppRoot('src/apps/web/index.tsx'),
  serverAppTs: resolveRelativeAppRoot('src/server/server.ts'),
  htmlTemplate: resolveRelativeAppRoot('src/index.html'),
};
