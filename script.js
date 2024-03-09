document.getElementById("traffic-light-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario predeterminado
    
    // Obtén el estado actual del semáforo
    var currentState = document.getElementById("current-state").value;
    
    // Realiza una solicitud POST al controlador PHP
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "semaforoController.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            // Actualiza el estado del semáforo con la respuesta del controlador
            document.getElementById("current-state").value = xhr.responseText;
            updateTrafficLights(xhr.responseText);
        }
    };
    xhr.send("current_state=" + currentState);
});

document.getElementById("start-sequence").addEventListener("click", function() {
    startSequence();
});

// Función para iniciar la secuencia de cambio de luces del semáforo
function startSequence() {
    var currentState = document.getElementById("current-state").value;
    var states = ["green", "yellow", "red"];
    var currentIndex = states.indexOf(currentState);
    
    // Reiniciar la secuencia
    clearInterval(window.intervalId);
    
    // Iniciar un temporizador para cambiar las luces cada 5 segundos
    window.intervalId = setInterval(function() {
        currentIndex = (currentIndex + 1) % states.length;
        var nextState = states[currentIndex];
        changeTrafficLightState(nextState);
    }, 5000);
}

// Función para cambiar visualmente el estado del semáforo
function changeTrafficLightState(state) {
    // Actualizar el estado del semáforo con la respuesta del controlador
    document.getElementById("current-state").value = state;
    
    // Actualizar visualmente el estado del semáforo
    var lights = document.querySelectorAll(".traffic-light > div");
    lights.forEach(function(light) {
        light.classList.remove("active");
    });
    var activeLight = document.querySelector("." + state);
    activeLight.classList.add("active");
}

// Función para actualizar visualmente los estados de los tres semáforos
function updateTrafficLights(state) {
    // Actualizar visualmente los estados de los tres semáforos
    var trafficLights = document.querySelectorAll(".traffic-light");
    trafficLights.forEach(function(trafficLight) {
        var lights = trafficLight.querySelectorAll("div");
        lights.forEach(function(light) {
            light.classList.remove("active");
        });
        var activeLight = trafficLight.querySelector("." + state);
        activeLight.classList.add("active");
    });
}
