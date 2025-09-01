// Hend Store — PWA Service Worker (GitHub Pages)
const CACHE = "hend-v3";

// حدّث هذه القائمة بما يناسب ملفاتك في المستودع
const CORE_ASSETS = [
  "/Hendstore/",
  "/Hendstore/index.html",
  "/Hendstore/manifest.json",
  "/Hendstore/icon-192.png",
  "/Hendstore/icon-512.png"
];

// تثبيت: تخزين الملفات الأساسية
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(CORE_ASSETS)).catch(() => null)
  );
  self.skipWaiting();
});

// تفعيل: تنظيف الكاشات القديمة
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// جلب: 
// 1) لطلبات الصفحات (navigate) => شبكة أولاً ثم كاش، مع رجوع لـ index.html عند الانقطاع
// 2) للملفات الثابتة من نفس الأصل => كاش أولاً ثم شبكة
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // نتجاهل طلبات المتصفّح الخاصة بالخلفية (chrome-extension إلخ)
  if (url.origin.startsWith("chrome-extension")) return;

  // 1) تنقّل صفحات
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          // خزّن نسخة حديثة
          const cache = await caches.open(CACHE);
          cache.put(req, fresh.clone());
          return fresh;
        } catch (err) {
          // رجوع للأوفلاين: حاول من الكاش أو أعد index.html
          const cached = await caches.match(req);
          return cached || caches.match("/Hendstore/index.html");
        }
      })()
    );
    return;
  }

  // 2) ملفات ثابتة من نفس الدومين
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const networkFetch = fetch(req)
          .then((res) => {
            // احفظ نسخة بالكاش للمرات القادمة
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
            return res;
          })
          .catch(() => cached); // عند انقطاع الشبكة استخدم الكاش إن وجد
        return cached || networkFetch;
      })
    );
  }
});

// لتحديث فوري بعد نشر نسخة جديدة
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});
