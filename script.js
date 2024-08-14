var mymap = L.map('mapid').setView([36.274801, -6.090434], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

const marcadoresDiscotecas = [];
const marcadoresPlayas = [];
const marcadoresComer = [];
var markersPlayas = L.layerGroup().addTo(mymap);
var markersDiscotecas = L.layerGroup().addTo(mymap);
var markersComer = L.layerGroup().addTo(mymap);

var iconoPlaya = L.icon({
    iconUrl: 'imagenes/icono_playas.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var iconoDiscoteca = L.icon({
    iconUrl: 'imagenes/icono_discotecas.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var iconoComer = L.icon({
    iconUrl: 'imagenes/icono_comer.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

fetch('https://sheets.googleapis.com/v4/spreadsheets/1KTcSlLLjBO4Ft9ORrTyE1pWboekQ51TdltLAb-kAlPo/values/Vacaciones!A8:H?key=AIzaSyD1qXjPmgBaRtX0zJtH76nvU708Gvs3A-g')
.then(response => response.json())
.then(data => {
    const cc = data.values;

    cc.forEach(coor => {
        if(coor.length > 1 ){
            if(coor[5].charAt(0) === "-" || !isNaN(parseInt(coor[5].charAt(0)))){
                
                const nombre = coor[0];
                const imagen = coor[3]
                const coordenadas = coor[5].split(',').map(parseFloat);

                // Almacenar las coordenadas en el array de marcadores
                if(coor[7] == 'Playa'){
                    marcadoresPlayas.push({ nombre: nombre, imagen: imagen, coordenadas: coordenadas, icono: iconoPlaya });
                }else{
                    if (coor[7] == 'Discoteca') {
                        marcadoresDiscotecas.push({ nombre: nombre, imagen: imagen, coordenadas: coordenadas, icono: iconoDiscoteca });
                    }else{
                        marcadoresComer.push({ nombre: nombre, imagen: imagen, coordenadas: coordenadas, icono: iconoComer });
                    }
                }

            }else{
                console.log("No entro");
            }
        }
    });

    // Una vez completada la petición y se hayan almacenado todas las coordenadas
    // Mostrar los marcadores en el mapa
    marcadoresPlayas.forEach(marcador => {
        console.log("Agrego marcador: " + marcador.coordenadas);
        // Crear el marcador con las coordenadas
        var marker = L.marker(marcador.coordenadas, {icon: marcador.icono}).addTo(markersPlayas);
        marker.bindPopup(`<b>${marcador.nombre}</b><br><a target='blank' href="${marcador.imagen}">Ver imagen</a>`).openPopup();
    });
    marcadoresDiscotecas.forEach(marcador => {
        console.log("Agrego marcador: " + marcador.coordenadas);
        // Crear el marcador con las coordenadas
        var marker = L.marker(marcador.coordenadas, {icon: marcador.icono}).addTo(markersDiscotecas);
        marker.bindPopup(`<b>${marcador.nombre}</b><br><a target='blank' href="${marcador.imagen}">Ver imagen</a>`).openPopup();
    });
    marcadoresComer.forEach(marcador => {
        console.log("Agrego marcador: " + marcador.coordenadas);
        // Crear el marcador con las coordenadas
        var marker = L.marker(marcador.coordenadas, {icon: marcador.icono}).addTo(markersDiscotecas);
        marker.bindPopup(`<b>${marcador.nombre}</b><br><a target='blank' href="${marcador.imagen}">Ver imagen</a>`).openPopup();
    });
})
.catch(error => console.error(error));

function cambiarParaiso(paraiso){
    switch(paraiso){
        case 0:
            markersPlayas.remove();
            markersDiscotecas.remove();
            markersComer.remove();
            markersDiscotecas.addTo(mymap);
            markersPlayas.addTo(mymap);
            markersComer.addTo(mymap);
            break;
        case 1:
            markersComer.remove();
            markersPlayas.remove();
            markersDiscotecas.remove();
            markersDiscotecas.addTo(mymap);
            break;
        case 2:
            markersComer.remove();
            markersDiscotecas.remove();
            markersPlayas.remove();
            markersPlayas.addTo(mymap);
            break;
        case 3: 
            markersComer.remove();
            markersDiscotecas.remove();
            markersPlayas.remove();
            markersComer.addTo(mymap);

    }
}
