var request = new XMLHttpRequest();
var data, getData
var tabel = document.querySelector("#tabel");
var cari = document.querySelector("#cari");

function hide(x){
    document.querySelector(x).style.visibility = 'hidden';
}

function show(x){
    document.querySelector(x).style.visibility = 'visible';
}

request.open('GET', 'https://swapi.co/api/planets/?format=json', true);
request.onload = function() {
    data = JSON.parse(this.response);
    data = data.results;
    tampil();
    
    function tampil(){
        for (var i=0; i<data.length; i++){        
            const row = tabel.insertRow(-1);
            const name = row.insertCell(-1);
            const rotation = row.insertCell(-1);
            const climate = row.insertCell(-1);
            const terrain = row.insertCell(-1);
            name.textContent = data[i].name;
            rotation.textContent = data[i].rotation_period;
            climate.textContent = data[i].climate;
            terrain.textContent = data[i].terrain;
        }
    }
    
    function hapus(){
        var j = tabel.rows.length - 1;
        for(j; j > 0; j--) {
                tabel.deleteRow(j);
            }
    }
    
    function carikan(){
        if (getData.length>0) {
//            hide("#pesan");
            for (var k=0; k<getData.length;k++){        
                const row = tabel.insertRow(-1);
                const name = row.insertCell(-1);
                const rotation = row.insertCell(-1);
                const climate = row.insertCell(-1);
                const terrain = row.insertCell(-1);
                name.textContent = getData[k].name;
                rotation.textContent = getData[k].rotation_period;
                climate.textContent = getData[k].climate;
                terrain.textContent = getData[k].terrain;
            }
        }
    }
    
    function cariNama(){
        getData = data.filter(key => key.name.includes(cari.value));
        carikan();
    }
    
    function cariRotation(){
        getData = data.filter(key => key.rotation_period.includes(cari.value));
        carikan();
    }
    
    function cariClimate(){
        getData = data.filter(key => key.climate.includes(cari.value));
        carikan();
    }
    
    function cariTerrain(){
        getData = data.filter(key => key.terrain.includes(cari.value));
        carikan();
    }
    
    cari.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            hapus();
            cariNama();
            cariRotation();
            cariClimate();
            cariTerrain();
            if (cari.value == "") {
                hapus();
                tampil();
            } else if (tabel.rows.length == 1) {
                row = tabel.insertRow(-1);
                const message = row.insertCell(-1);
                message.colSpan = 4;
                message.innerHTML = '<div class="ui negative icon message"><i class="large frown outline icon"></i>Oops, data&nbsp;<b>' + cari.value + '</b>&nbsp;not found!</div>';
            }
        }
    });
};

request.send();