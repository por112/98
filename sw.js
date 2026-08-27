const CACHE_NAME = 'v1_app_cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css', // ปรับเปลี่ยนตามไฟล์ CSS ในโปรเจกต์
  '/script.js'   // ปรับเปลี่ยนตามไฟล์ JS ในโปรเจกต์
];

// ติดตั้ง Service Worker และบันทึกไฟล์ลง Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// เรียกใช้งานไฟล์จาก Cache หากไม่มีการเชื่อมต่อเน็ต
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
