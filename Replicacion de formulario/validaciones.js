    const formulario = document.getElementById('mainForm');
    const fileInput = document.getElementById('subir-archivo');
    const fileName = document.querySelector('.nombre-archivo');

    // Mostrar nombre del archivo seleccionado
    fileInput.addEventListener('change', function() {
        fileName.textContent = this.files.length > 0 ? this.files[0].name : 'No file chosen';
    });

        // Validar nombre (requiere, mínimo 3 caracteres)
        const nombre = document.getElementById('nombre');
        if (nombre.value.trim() === '') {
            mostrarError('nombre', 'Escribe tu nombre completo');
            isValid = false;

        // Validar edad ( entre 1 y 120)
        const edad = document.getElementById('edad');
        if (!edad.value) {
            mostrarError('edad', 'Escribe tu edad');
            isValid = false;
        } else if (edad.value < 1 || edad.value > 120) {
            mostrarError('edad', 'La edad debe estar entre 1 y 120 años');
            isValid = false;
        } else {
            limpiarError('edad');
        }

        // Validar código postal (exactamente 5 dígitos)
        const codigoPostal = document.getElementById('codigoPostal');
        const cpRegex = /^\d{5}$/;
        if (!codigoPostal.value) {
            mostrarError('codigoPostal', 'Ingresa el código postal');
            isValid = false;
        } else if (!cpRegex.test(codigoPostal.value)) {
            mostrarError('codigoPostal', 'El código postal no es válido');
            isValid = false;
        } else {
            limpiarError('codigoPostal');
        }

        // Validar género (requerido)
        const genero = document.querySelector('input[name="genero"]:checked');
        if (!genero) {
            mostrarError('genero', 'Selecciona tu género');
            isValid = false;
        } else {
            limpiarError('genero');
        }

        // Validar carrera
        const carrera = document.querySelector('input[name="carrera"]:checked');
        if (!carrera) {
            mostrarError('carrera', 'Selecciona una carrera');
            isValid = false;
        } else {
            limpiarError('carrera');
        }

        // Validar intereses (al menos uno seleccionado)
        const intereses = document.querySelectorAll('input[name="intereses"]:checked');
        if (intereses.length === 0) {
            mostrarError('intereses', 'Selecciona al menos uno de la lista interés');
            isValid = false;
        } else {
            limpiarError('intereses');
        }

        // Validar país
        const pais = document.getElementById('pais');
        if (pais.value === '') {
            mostrarError('pais', 'Selecciona tu país');
            isValid = false;
        } else {
            limpiarError('pais');
        }

        // Validar archivo (opcional, pero si se sube debe ser imagen)
        if (fileInput.files.length > 0) {
            const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            const fileExt = fileInput.files[0].name.split('.').pop().toLowerCase();
            
            if (!validExtensions.includes(fileExt)) {
                mostrarError('archivo', 'Solo se permiten imágenes (JPG, PNG, GIF)');
                isValid = false;
            } else {
                limpiarError('archivo');
            }
        }

        // Si todo es válido, mostrar mensaje de éxito
        if (isValid) {
            alert('Formulario enviado correctamente');
        }
    

    // Función para mostrar mensajes de error
    function mostrarError(campoId, mensaje) {
        const errorElement = document.getElementById(`error-${campoId}`);
        const inputElement = document.getElementById(campoId) || 
                           document.querySelector(`[name="${campoId}"]`)?.closest('.opciones');
        
        if (errorElement) {
            errorElement.textContent = mensaje;
        }
        
        if (inputElement) {
            inputElement.classList.add('error');
            if (inputElement.classList.contains('opciones')) {
                inputElement.style.border = '1px solid #e74c3c';
                inputElement.style.borderRadius = '4px';
                inputElement.style.padding = '8px';
            }
        }
    }

    // Función para limpiar errores
    function limpiarError(campoId)
    {
        const errorElement = document.getElementById(`error-${campoId}`);
        const inputElement = document.getElementById(campoId) || 
                           document.querySelector(`[name="${campoId}"]`)?.closest('.opciones');
        
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        if (inputElement)
        {
            inputElement.classList.remove('error');
            if (inputElement.classList.contains('opciones')) 
            {
                inputElement.style.border = 'none';
                inputElement.style.padding = '0';
            }
        }
    }
}