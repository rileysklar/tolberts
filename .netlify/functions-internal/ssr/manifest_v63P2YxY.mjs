import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import './chunks/astro_lhthRWai.mjs';
import 'clsx';
import 'cssesc';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    })
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify","routes":[{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"posts/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/posts","isIndex":true,"type":"page","pattern":"^\\/posts\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/index.astro","pathname":"/posts","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"calendar/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/calendar","isIndex":false,"type":"page","pattern":"^\\/calendar\\/?$","segments":[[{"content":"calendar","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/calendar.astro","pathname":"/calendar","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contact-form-api.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact-form-api\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact-form-api.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact-form-api.json.js","pathname":"/api/contact-form-api.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://tolbertrestaurant.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/rileysklar/Code/tolberts/src/pages/posts/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/rileysklar/Code/tolberts/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/rileysklar/Code/tolberts/src/pages/calendar.astro",{"propagation":"none","containsHead":true}],["/Users/rileysklar/Code/tolberts/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/rileysklar/Code/tolberts/src/pages/posts/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/posts/index@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/api/contact-form-api.json.js":"chunks/pages/contact-form-api_Iu7YCcnU.mjs","\u0000@astrojs-manifest":"manifest_v63P2YxY.mjs","/Users/rileysklar/Code/tolberts/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_3wEZly-Z.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_G9dLv3ag.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_Y-tR_n5L.mjs","\u0000@astro-page:src/pages/api/contact-form-api@_@json.js":"chunks/contact-form-api_AifJHUGn.mjs","\u0000@astro-page:src/pages/posts/index@_@astro":"chunks/index_ohIxCxgi.mjs","\u0000@astro-page:src/pages/posts/[...slug]@_@astro":"chunks/_.._UEVOEQxi.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_jbgSaZXd.mjs","\u0000@astro-page:src/pages/calendar@_@astro":"chunks/calendar_J088Nw9T.mjs","/Users/rileysklar/Code/tolberts/src/content/posts/tolberts-restaurant-chili-parlor-history.md?astroContentCollectionEntry=true":"chunks/tolberts-restaurant-chili-parlor-history_UYf7VcsN.mjs","/Users/rileysklar/Code/tolberts/src/content/posts/tolberts-restaurant-chili-parlor-history.md?astroPropagatedAssets":"chunks/tolberts-restaurant-chili-parlor-history_Rey64p_g.mjs","/Users/rileysklar/Code/tolberts/src/content/posts/tolberts-restaurant-chili-parlor-history.md":"chunks/tolberts-restaurant-chili-parlor-history_KDNS18YS.mjs","@/components/PhotoGallery":"_astro/PhotoGallery.FnWbZGr5.js","@/components/FormHorizontal":"_astro/FormHorizontal.CxJsssNd.js","@/components/HeroMain":"_astro/HeroMain.3b6njOXN.js","@/components/Calendar":"_astro/Calendar.3YK97Ib5.js","@/components/TopNav":"_astro/TopNav.xGCMrEu4.js","@astrojs/react/client.js":"_astro/client.aEt3OhRr.js","/astro/hoisted.js?q=0":"_astro/hoisted.IHk5Wk-0.js","/Users/rileysklar/Code/tolberts/src/components/Leaderboard":"_astro/Leaderboard.nN_dU5uU.js","@/components/Footer":"_astro/Footer.FznxKKgA.js","@/components/CalendarHero":"_astro/CalendarHero.WzNko2rt.js","/astro/hoisted.js?q=1":"_astro/hoisted._h3q0egP.js","/Users/rileysklar/Code/tolberts/src/components/CalendarHero":"_astro/CalendarHero.4e-3yn0L.js","/astro/hoisted.js?q=2":"_astro/hoisted.l-JsOPk0.js","@/components/Accordion":"_astro/Accordion.pvCfQS3z.js","@/components/Testimonials":"_astro/Testimonials.J0v7aAfI.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/ar-ogimage-optimized.oKGeGWZw.png","/_astro/_slug_.XEvp7Tn6.css","/_astro/about.N11FxgU3.css","/android-chrome-192x192.png","/android-chrome-512x512.png","/apple-touch-icon.png","/chili-white.svg","/chili.svg","/favicon-16x16.png","/favicon-32x32.png","/favicon.ico","/logo-black.png","/logo-white.png","/robots.txt","/site.webmanifest","/tlb-1.jpg","/tlb-2.jpg","/tlb-3.jpg","/tlb-4.jpg","/tolberts.webp","/tolbs-outside-mobile.jpg","/tolbs-outside.jpg","/_astro/Accordion.pvCfQS3z.js","/_astro/Calendar.3YK97Ib5.js","/_astro/CalendarHero.4e-3yn0L.js","/_astro/CalendarHero.WzNko2rt.js","/_astro/Footer.FznxKKgA.js","/_astro/FormHorizontal.CxJsssNd.js","/_astro/HeroMain.3b6njOXN.js","/_astro/Leaderboard.nN_dU5uU.js","/_astro/PhotoGallery.FnWbZGr5.js","/_astro/Testimonials.J0v7aAfI.js","/_astro/TopNav.xGCMrEu4.js","/_astro/button.mZav3FXX.js","/_astro/client.aEt3OhRr.js","/_astro/hoisted.IHk5Wk-0.js","/_astro/hoisted._h3q0egP.js","/_astro/hoisted.l-JsOPk0.js","/_astro/index.5T7PonIV.js","/_astro/index.QdJ1Nv66.js","/_astro/jsx-runtime.Y3sYeAW6.js","/_astro/react-icons.esm.ahoENlN0.js","/_astro/utils.03ws4raF.js","/about/index.html","/posts/index.html","/index.html","/calendar/index.html"],"buildFormat":"directory"});

export { manifest };
