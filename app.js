    const FOLDER_ID = '18CzOefCL-ZgPzwbcQx9Ldo116z6JuzfN'; // Remplaza con tu ID de carpeta
    const API_KEY = 'AIzaSyAj4uz8zML6DlVo9wFK3yVkBw4YQwAKmO8'; // Remplaza con tu clave de API

    let images = [];
    let current = 0;

    async function fetchImages() {
      const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType contains 'image/' and trashed=false&fields=files(id)&key=${API_KEY}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.files && data.files.length > 0) {
          images = data.files.map(f => `https://lh3.googleusercontent.com/d/${f.id}=w1000`);
        } else {
          document.getElementById('slideshow').alt = "No hay imágenes disponibles";
        }
      } catch (e) {
        console.error('Error al obtener imágenes:', e);
        document.getElementById('slideshow').alt = "Error al conectar con Drive";
      }
    }

function showImage() {
  if (images.length === 0) return;
  const img = document.getElementById('slideshow');
  img.style.opacity = 0; // Fade out

  // Pre-carga la nueva imagen en un objeto temporal
  const tempImg = new window.Image();
  tempImg.src = images[current];
  tempImg.alt = `Imagen ${current + 1}`;
  tempImg.onerror = () => tempImg.alt = "Imagen no disponible";

  tempImg.onload = () => {
    // Cuando la nueva imagen esté lista, cámbiala y haz fade in
    img.src = tempImg.src;
    img.alt = tempImg.alt;
    setTimeout(() => {
      img.style.opacity = 1; // Fade in
      current = (current + 1) % images.length;
    }, 50); // Pequeño delay para asegurar el cambio de src antes del fade in
  };
}

    async function startSlideshow() {
      await fetchImages();
      if (images.length === 0) return;
      showImage();
      setInterval(showImage, 4000); // Cambia de imagen cada 3 segundos
      setInterval(fetchImages, 30000); // Refresca las imágenes cada 30 segundos
        
    }

    startSlideshow();