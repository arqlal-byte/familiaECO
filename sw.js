/* Familia ECO · servicio público, sin caché de datos ni sesiones.
   Alcance del worker limitado a /familiaECO/. No borra cachés de otras apps. */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET'||req.mode!=='navigate')return;
  const url=new URL(req.url);
  const scopePath=new URL(self.registration.scope).pathname;
  if(url.origin!==self.location.origin||!url.pathname.startsWith(scopePath))return;
  event.respondWith(
    fetch(req).catch(()=>new Response(
      '<!doctype html><html lang="es-MX"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#2e7d32"><title>Familia ECO · Sin conexión</title></head><body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#f4f4f4;color:#26323c;font-family:system-ui,-apple-system,Arial,sans-serif"><main style="max-width:450px;padding:32px 24px;text-align:center"><h1 style="font-size:25px">Sin conexión a internet</h1><p style="line-height:1.6">Conéctate a internet para consultar las actividades de Familia ECO.</p><button onclick="location.reload()" style="font:inherit;border:0;border-radius:12px;background:#26323c;color:white;padding:14px 24px;min-height:48px;cursor:pointer">Reintentar</button></main></body></html>',
      {status:503,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}}
    ))
  );
});
