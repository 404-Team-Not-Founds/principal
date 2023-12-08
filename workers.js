const cacheName = 'my-pwa-cache-v1';

// Liste des ressources à mettre en cache
const resourcesToCache = [
    './img/appartement.png',
    './img/associations.jpg',
    './img/belle_fin.jpg',
    './img/blablacar.png',
    './img/bureau.jpg',
    './img/confirmation.png',
    './img/dechet.jpg',
    './img/douche.png',
    './img/electrique.jpg',
    './img/karting.jpg',
    './img/mauvaise_fin.png',
    './img/moyenne_fin.png',
    './img/negative.png',
    './img/parc_accro.jpg',
    './img/perso.jpeg',
    './img/poubelle.png',
    './img/question.png',
    './img/recyclage.png',
    './img/transport_commun.jpg',
    './img/tri.png',
    './img/velo.jpg',
    './img/voiture.jpg',
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