import { renderers } from './renderers.mjs';
import { manifest } from './manifest_3d3lTS1H.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_G9dLv3ag.mjs');
const _page1 = () => import('./chunks/about__Fey2uv1.mjs');
const _page2 = () => import('./chunks/contact-form-api_AifJHUGn.mjs');
const _page3 = () => import('./chunks/index_G0saBKvx.mjs');
const _page4 = () => import('./chunks/_.._dnS8jfOj.mjs');
const _page5 = () => import('./chunks/index_FQMLXSmA.mjs');
const _page6 = () => import('./chunks/calendar_OalcGz3a.mjs');
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
    "middlewareSecret": "8703d8e9-a26c-4b91-9f21-c3a62169b69e"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
serverEntrypointModule.start?.(_manifest, _args);

export { __astrojsSsrVirtualEntry as default, pageMap };
