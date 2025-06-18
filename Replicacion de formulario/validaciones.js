document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('mainForm');
    const fileInput = document.getElementById('subir-archivo');
    const fileName = document.querySelector('.nombre-archivo');

    // Mostrar nombre del archivo seleccionado
    fileInput.addEventListener('change', function() {
        fileName.textContent = this.files.length > 0 ? this.files[0].name : 'Ningún archivo seleccionado';
    });

    // Validar al enviar el formulario
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validar nombre completo
        const nombre = document.getElementById('nombre');
        if (nombre.value.trim() === '') {
            mostrarError('nombre', 'Escribe tu nombre completo');
            isValid = false;
        } else if (nombre.value.trim().length < 3) {
            mostrarError('nombre', 'El nombre debe tener al menos 3 caracteres');
            isValid = false;
        } else {
            limpiarError('nombre');
        }

        // Validar edad
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

        // Validar código postal
        const codigoPostal = document.getElementById('codigoPostal');
        const cpRegex = /^\d{5}$/;
        if (!codigoPostal.value) {
            mostrarError('codigoPostal', 'Ingresa el código postal');
            isValid = false;
        } else if (!cpRegex.test(codigoPostal.value)) {
            mostrarError('codigoPostal', 'El código postal no es válido (debe tener 5 dígitos)');
            isValid = false;
        } else {
            limpiarError('codigoPostal');
        }

        // Validar género
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

        // Validar intereses
        const intereses = document.querySelectorAll('input[name="intereses"]:checked');
        if (intereses.length === 0) {
            mostrarError('intereses', 'Selecciona al menos uno de la lista de intereses');
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

        // Validar archivo (opcional)
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
    });

    // Función para mostrar mensajes de error
    function mostrarError(elementoId, mensaje) {
        const errorElement = document.getElementById(`error-${elementoId}`);
        const inputElement = document.getElementById(elementoId) || 
                           document.querySelector(`[name="${elementoId}"]`)?.closest('.campo');
        
        if (errorElement) {
            errorElement.textContent = mensaje;
            errorElement.style.display = 'block';
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
    function limpiarError(elementoId) {
        const errorElement = document.getElementById(`error-${elementoId}`);
        const inputElement = document.getElementById(elementoId) || 
                           document.querySelector(`[name="${elementoId}"]`)?.closest('.campo');
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        
        if (inputElement) {
            inputElement.classList.remove('error');
            if (inputElement.classList.contains('opciones')) {
                inputElement.style.border = 'none';
                inputElement.style.padding = '0';
            }
        }
    }

    // Validación en tiempo real para código postal
    document.getElementById('codigoPostal').addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, ''); // Solo números
        if (this.value.length > 5) {
            this.value = this.value.slice(0, 5); // Limite de 5 dígitos
            mostrarError('codigoPostal', 'El código postal no es válido (máximo 5 dígitos)');
        } else {
            limpiarError('codigoPostal');
        }
    });
});
