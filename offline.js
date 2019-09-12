'use strict'
const cacheName = 'cache-v0';
const precacheResources = [
	'/',
	'componentes.css',
	'desafios.html',
	'formulario.html',
	'confirmacao.html',
	'submeter-desafios.html',
];

self.addEventListener(
	'install',
	event => {
		console.log('Service worker install event!');
		event.waitUntil(
			caches.open(cacheName)
			.then(cache => cache.addAll(precacheResources))
			.catch(err => console.log(err))
		);
	}
);

self.addEventListener(
	'activate',
	event => console.log('Service worker activate event!')
);

self.addEventListener(
	'fetch',
	event => {
		console.log('Fetch intercepted for: ', event.request.url);
		event.respondWith(
			caches.match(event.request).then(
				cachedResponse =>
				cachedResponse? cachedResponse: fetch(event.request)
			)
		);
		event.waitUntil(update(event.request));
	}
);

function update(request) {
	return caches.open(cacheName).then(cache => {
		return fetch(request).then(response => {
			return cache.put(request, response);
		});
	});
}