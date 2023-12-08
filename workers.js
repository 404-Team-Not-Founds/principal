const cacheName = 'my-pwa-cache-v1';

// Liste des ressources à mettre en cache
const resourcesToCache = [
    './principal/img/appartement.png',
    './principal/img/associations.jpg',
    './principal/img/belle_fin.jpg',
    './principal/img/blablacar.png',
    './principal/img/bureau.jpg',
    './principal/img/confirmation.png',
    './principal/img/dechet.jpg',
    './principal/img/douche.png',
    './principal/img/electrique.jpg',
    './principal/img/karting.jpg',
    './principal/img/mauvaise_fin.png',
    './principal/img/moyenne_fin.png',
    './principal/img/negative.png',
    './principal/img/parc_accro.jpg',
    './principal/img/perso.jpeg',
    './principal/img/poubelle.png',
    './principal/img/question.png',
    './principal/img/recyclage.png',
    './principal/img/transport_commun.jpg',
    './principal/img/tri.png',
    './principal/img/velo.jpg',
    './principal/img/voiture.jpg',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(resourcesToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si la ressource est présente dans le cache, on la renvoie
                if (response) {
                    return response;
                }

                // Sinon, on effectue la requête réseau et on met en cache la réponse
                return fetch(event.request)
                    .then(response => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        const responseToCache = response.clone();

                        caches.open(cacheName)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    });
            })
    );
});