
```html
data:text/html, <script src='https://cdn.jsdelivr.net/gh/dragon731012/caudns/jszip.js' defer></script> <script src='https://cdn.jsdelivr.net/gh/dragon731012/caudns/filesaver.js' defer></script> <script src='https://caudns.vercel.app/main.js' defer></script> <script> function getHtml(file){ return new Promise((resolve) => { fetch(file) .then((response) => { return response.text(); }) .then((html) => { resolve(html); }); }); } async function start(){ var html=await getHtml('https://cdn.jsdelivr.net/gh/dragon731012/caudns/data.txt'); html=html.toString(); console.log(html); document.body.innerHTML=html; } start(); </script>
```

