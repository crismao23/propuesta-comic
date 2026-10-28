# 💖 Nuestra Historia en Cómic - Propuesta Interactiva

Una experiencia web interactiva, romántica y estilo novela gráfica / cómic para pedirle que sea tu novia a través de 3 regalos con códigos QR y mini-retos interactivos.

---

## 🌟 ¿Cómo funciona la experiencia?

1. **3 Regalos Físicos con Código QR**:
   - Cada regalo que le entregues llevará una pequeña tarjeta con un código QR impreso (generado directamente desde la web).
   - **Regalo 1**: Abre el reto del **Capítulo 1: El Primer Encuentro**. Al responder, ¡se desbloquea la **Viñeta #1** con sonido pop y confeti!
   - **Regalo 2**: Abre el reto del **Capítulo 2: Risas y Complicidad**. Al responder, se desbloquea la **Viñeta #2**.
   - **Regalo 3**: Abre el reto del **Capítulo 3: Nuestro Presente**. Al responder, se desbloquea la **Viñeta #3**.
2. **El Gran Clímax Final**:
   - Una vez desbloqueadas las 3 viñetas, se despliega automáticamente la página estelar del cómic con la gran pregunta:
     > **"¿Quieres ser mi novia? ❤️"**
   - Incluye dos botones:
     - **¡SÍ, ACEPTO! 💖**: Desata una lluvia de confeti de corazones, fanfarria musical y revela la pantalla de victoria ("¡Oficialmente juntos!").
     - **No...**: Un botón travieso e imposible de presionar que se escapa automáticamente y cambia de frase cuando intenta tocarlo o pasar el cursor por encima.

---

## 🚀 Cómo publicarlo GRATIS en internet (Tener tu URL pública)

Elige cualquiera de las dos opciones para tener tu enlace público en 2 minutos:

### Opción A: GitHub Pages (Recomendado y 100% Gratuito)
1. Entra a [GitHub](https://github.com) e inicia sesión.
2. Crea un nuevo repositorio público (por ejemplo llamado `propuesta` o `nuestra-historia`).
3. En tu computadora, abre la terminal dentro de esta carpeta y ejecuta:
   ```bash
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/propuesta.git
   git add .
   git commit -m "Mi propuesta en comic"
   git push -u origin main
   ```
4. En la página de tu repositorio en GitHub, ve a **Settings** > **Pages**.
5. En **Source**, selecciona la rama `main` (o `master`) y guarda.
6. ¡Listo! En 1 minuto tendrás tu enlace público oficial:
   `https://TU-USUARIO.github.io/propuesta/`

---

### Opción B: Netlify Drop (Sin comandos, solo arrastrar y soltar)
1. Entra a [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastra esta carpeta completa (`propuesta-comic`) directamente a la pantalla del navegador.
3. ¡Al instante obtendrás una URL pública activa (ejemplo: `https://mi-sorpresa-amor.netlify.app`) lista para compartir!

---

## 🖨️ Cómo imprimir los Códigos QR para tus 3 Regalos

1. Abre tu página web en el navegador (ya sea en tu URL pública o de forma local abriendo `index.html`).
2. Haz clic en el botón inferior: **"⚙️ Modo Creador / Generar Códigos QR para Regalos"**.
3. Pega la URL pública de tu web (si ya la publicaste en GitHub Pages).
4. La herramienta generará al instante los 3 códigos QR en alta resolución vinculados a cada etapa:
   - `?etapa=1` (Regalo #1)
   - `?etapa=2` (Regalo #2)
   - `?etapa=3` (Regalo #3)
5. Presiona el botón verde **"🖨️ Imprimir Tarjetas de Regalo"** para imprimir las 3 tarjetitas recortables listas para pegar en los regalos.

---

## 🎨 Cómo personalizar las preguntas, textos o imágenes

- **Cambiar las imágenes del cómic**:
  En la carpeta `images/`, reemplaza `comic1.jpg`, `comic2.jpg` y `comic3.jpg` por tus fotos favoritas de ustedes o tus propias ilustraciones manteniendo los mismos nombres.
- **Cambiar las preguntas y respuestas**:
  Abre el archivo `app.js` y edita la lista `DEFAULT_RETOS` al inicio del archivo con tus propias anécdotas, fechas o recuerdos especiales.
