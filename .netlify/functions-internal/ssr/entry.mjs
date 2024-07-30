import { renderers } from './renderers.mjs';
import { manifest } from './manifest_v63P2YxY.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_G9dLv3ag.mjs');
const _page1 = () => import('./chunks/about_Y-tR_n5L.mjs');
const _page2 = () => import('./chunks/contact-form-api_AifJHUGn.mjs');
const _page3 = () => import('./chunks/index_ohIxCxgi.mjs');
const _page4 = () => import('./chunks/_.._UEVOEQxi.mjs');
const _page5 = () => import('./chunks/index_jbgSaZXd.mjs');
const _page6 = () => import('./chunks/calendar_J088Nw9T.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/contact-form-api.json.js", _page2],
    ["src/pages/posts/index.astro", _page3],
    ["src/pages/posts/[...slug].astro", _page4],
    ["src/pages/index.astro", _page5],
    ["src/pages/calendar.astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "8d496110-d7ba-4da5-b41d-722bf7f1df47"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
serverEntrypointModule.start?.(_manifest, _args);

export { __astrojsSsrVirtualEntry as default, pageMap };
