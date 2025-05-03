let puntuaciones = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
};

function probarCodigo(ejercicio) {
    const html = document.getElementById(`codigo${ejercicio}-html`).value;
    const css = document.getElementById(`codigo${ejercicio}-css`).value;
    const resultado = document.getElementById(`ejercicio${ejercicio}-resultado`);
    
    // Limpiar resultado anterior
    resultado.innerHTML = '';
    
    // Crear el estilo
    const style = document.createElement('style');
    style.textContent = css;
    resultado.appendChild(style);
    
    // Insertar el HTML
    resultado.innerHTML += html;
    
    // Evaluar el ejercicio
    evaluarEjercicio(ejercicio);
}

function evaluarEjercicio(ejercicio) {
    let puntos = 0;
    const puntuacionDiv = document.getElementById(`puntuacion${ejercicio}`);
    
    switch(ejercicio) {
        case 1:
            const cajaRoja = document.querySelector('#ejercicio1-resultado .caja-roja');
            if (cajaRoja) {
                const styles = window.getComputedStyle(cajaRoja);
                if (styles.width === '200px') puntos += 2.5;
                if (styles.height === '100px') puntos += 2.5;
                if (styles.backgroundColor === 'rgb(255, 0, 0)' || styles.backgroundColor === 'red') puntos += 2.5;
                if (styles.marginLeft === 'auto' && styles.marginRight === 'auto') puntos += 2.5;
            }
            puntos = Math.min(puntos, 10);
            break;

        case 2:
            const contenedor = document.querySelector('#ejercicio2-resultado .contenedor');
            const titulo = document.querySelector('#ejercicio2-resultado .titulo');
            const subtitulo = document.querySelector('#ejercicio2-resultado .subtitulo');
            
            if (contenedor) {
                const styles = window.getComputedStyle(contenedor);
                if (styles.border.includes('rgb(0, 0, 0)') || styles.border.includes('black')) puntos += 5;
            }
            if (titulo) {
                const styles = window.getComputedStyle(titulo);
                if (styles.color === 'rgb(0, 0, 255)' || styles.color === 'blue') puntos += 5;
                if (styles.textAlign === 'center') puntos += 2.5;
            }
            if (subtitulo) {
                const styles = window.getComputedStyle(subtitulo);
                if (styles.color === 'rgb(0, 128, 0)' || styles.color === 'green') puntos += 2.5;
            }
            puntos = Math.min(puntos, 15);
            break;

        case 3:
            const tarjeta = document.querySelector('#ejercicio3-resultado .tarjeta');
            const tarjetaImagen = document.querySelector('#ejercicio3-resultado .tarjeta-imagen');
            const tarjetaContenido = document.querySelector('#ejercicio3-resultado .tarjeta-contenido');
            const tarjetaTitulo = document.querySelector('#ejercicio3-resultado .tarjeta-titulo');
            const tarjetaDescripcion = document.querySelector('#ejercicio3-resultado .tarjeta-descripcion');
            
            if (tarjeta) puntos += 4;
            if (tarjetaImagen) puntos += 4;
            if (tarjetaContenido) puntos += 4;
            if (tarjetaTitulo) puntos += 4;
            if (tarjetaDescripcion) puntos += 4;
            puntos = Math.min(puntos, 20);
            break;

        case 4:
            const contenedorFlex = document.querySelector('#ejercicio4-resultado .contenedor-flex');
            const columnas = document.querySelectorAll('#ejercicio4-resultado .columna');
            
            if (contenedorFlex) {
                const styles = window.getComputedStyle(contenedorFlex);
                if (styles.display === 'flex') puntos += 5;
                if (styles.gap === '10px') puntos += 5;
            }
            if (columnas.length === 3) {
                puntos += 5;
                columnas.forEach(columna => {
                    const styles = window.getComputedStyle(columna);
                    if (styles.backgroundColor !== 'rgba(0, 0, 0, 0)') puntos += 1.67;
                });
            }
            puntos = Math.min(puntos, 20);
            break;

        case 5:
            const navbar = document.querySelector('#ejercicio5-resultado .navbar');
            const logo = document.querySelector('#ejercicio5-resultado .logo');
            const navLinks = document.querySelector('#ejercicio5-resultado .nav-links');
            const navLink = document.querySelectorAll('#ejercicio5-resultado .nav-link');
            
            if (navbar) puntos += 5;
            if (logo) puntos += 5;
            if (navLinks) puntos += 5;
            if (navLink.length >= 3) puntos += 5;
            puntos = Math.min(puntos, 20);
            break;

        case 6:
            const formulario = document.querySelector('#ejercicio6-resultado .formulario');
            const campos = document.querySelectorAll('#ejercicio6-resultado .campo');
            const labels = document.querySelectorAll('#ejercicio6-resultado label');
            const inputs = document.querySelectorAll('#ejercicio6-resultado input');
            const boton = document.querySelector('#ejercicio6-resultado button, #ejercicio6-resultado .boton');
            
            if (formulario) puntos += 3;
            if (campos.length >= 1) puntos += 3;
            if (labels.length >= 1) puntos += 3;
            if (inputs.length >= 1) puntos += 3;
            if (boton) puntos += 3;
            puntos = Math.min(puntos, 15);
            break;
    }
    
    puntuaciones[ejercicio] = puntos;
    puntuacionDiv.textContent = `Puntuación: ${puntos} puntos`;
    actualizarProgreso();
}

function actualizarProgreso() {
    const totalPuntos = Object.values(puntuaciones).reduce((a, b) => a + b, 0);
    const porcentaje = (totalPuntos / 100) * 100;
    
    document.getElementById('barraProgreso').style.width = porcentaje + '%';
    
    if (totalPuntos >= 90) {
        mostrarResultadoFinal('¡Excelente! Has dominado los DIVs', 'excelente');
    } else if (totalPuntos >= 70) {
        mostrarResultadoFinal('¡Bien hecho! Tienes buen manejo de DIVs', 'bien');
    } else if (totalPuntos >= 50) {
        mostrarResultadoFinal('Regular. Necesitas más práctica con DIVs', 'regular');
    }
}

function mostrarResultadoFinal(mensaje, clase) {
    const resultadoFinal = document.getElementById('resultadoFinal');
    const totalPuntos = Object.values(puntuaciones).reduce((a, b) => a + b, 0);
    
    resultadoFinal.textContent = `${mensaje} - Total: ${totalPuntos}/100`;
    resultadoFinal.className = `resultado-final ${clase}`;
    resultadoFinal.style.display = 'block';
}