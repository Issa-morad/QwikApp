/*
 * WHAT IS THIS FILE?
 *
 * The service-worker.ts file is used to have state of the art prefetching.
 * https://qwik.builder.io/qwikcity/prefetching/overview/
 *
 * Qwik uses a service worker to speed up your site and reduce latency, ie, not used in the traditional way of offline.
 * You can also use this file to add more functionality that runs in the service worker.
 */

import { setupServiceWorker } from "@builder.io/qwik-city/service-worker";
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";

const revision = import.meta.env.VITE_GIT_COMMIT_HASH;

precacheAndRoute([
  { url: "/", revision },
  { url: "/image", revision },
  { url: "/video", revision },
  { url: "/text", revision },
  { url: "/view", revision },
  { url: "/create", revision },
  { url: "/edit", revision },
  {
    url: "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js",
    revision: "1.6.0",
  },
]);
cleanupOutdatedCaches();
registerRoute(new NavigationRoute(createHandlerBoundToURL("/text")));
registerRoute(new NavigationRoute(createHandlerBoundToURL("/")));
registerRoute(new NavigationRoute(createHandlerBoundToURL("/image")));
registerRoute(new NavigationRoute(createHandlerBoundToURL("/video")));
registerRoute(new NavigationRoute(createHandlerBoundToURL("/view")));
registerRoute(new NavigationRoute(createHandlerBoundToURL("/create")));
registerRoute(new NavigationRoute(createHandlerBoundToURL("/edit")));
registerRoute(
  ({ request }) =>
    request.destination === "style" || request.destination === "image",
  new CacheFirst(),
);
// Cache API data using Workbox strategies
registerRoute(
    'https://dog.ceo/api/breeds/image/random',
    new StaleWhileRevalidate({
      cacheName: 'dog-api-cache',
      plugins: [
        new CacheFirst({
              cacheName: 'dog-api-cache',
              fetchOptions: {
                  credentials: 'same-origin',
                  mode: 'cors',
              },
          }) as any, // Use 'as any' to work around TypeScript typing issue
      ],
    })
  );
  
  registerRoute(
    'https://picsum.photos/v2/list?page=2&limit=100',
    new StaleWhileRevalidate({
      cacheName: 'picsum-api-cache',
      plugins: [
        new CacheFirst({
              cacheName: 'picsum-api-cache',
              fetchOptions: {
                  credentials: 'same-origin',
                  mode: 'cors',
              },
          }) as any,
      ],
    })
  );
  
  registerRoute(
    'https://jsonplaceholder.typicode.com',
    new StaleWhileRevalidate({
      cacheName: 'text-api-cache',
      plugins: [
        new CacheFirst({
              cacheName: 'text-api-cache',
              fetchOptions: {
                  credentials: 'same-origin',
                  mode: 'cors',
              },
          }) as any,
      ],
    })
  );  

setupServiceWorker();

addEventListener("install", () => self.skipWaiting());

addEventListener("activate", () => self.clients.claim());

declare const self: ServiceWorkerGlobalScope;