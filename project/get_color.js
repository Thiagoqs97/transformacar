const Vibrant = require('node-vibrant');

Vibrant.from('https://zngosfnoajpqzxrgwrtw.supabase.co/storage/v1/object/public/Catalogo/Captura-de-tela-2025-02-10-172638-1-Photoroom.jpg')
  .getPalette()
  .then((palette) => {
    console.log('Vibrant:', palette.Vibrant?.hex);
    console.log('DarkVibrant:', palette.DarkVibrant?.hex);
    console.log('LightVibrant:', palette.LightVibrant?.hex);
    console.log('Muted:', palette.Muted?.hex);
    console.log('DarkMuted:', palette.DarkMuted?.hex);
    console.log('LightMuted:', palette.LightMuted?.hex);
  })
  .catch(err => console.error(err));
