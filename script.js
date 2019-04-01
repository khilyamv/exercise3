var request = new XMLHttpRequest();
var data;
var tabel = document.querySelector("#tabel");
var cari = document.querySelector("#cari");
var pesan = document.querySelector("#pesan");

function hide(x){
    document.querySelector(x).style.visibility = 'hidden';
}

function show(x){
    document.querySelector(x).style.visibility = 'visible';
}

hide("#pesan");

request.open('GET', 'https://swapi.co/api/planets/?format=json', true);
request.onload = function() {
    data = JSON.parse(this.response);
    data = data.results;
    tampil();
    
    function tampil(){
        for (var i=0; i<data.length; i++){        
            const row = tabel.insertRow(-1);
            const name = row.insertCell(-1);
            const climate = row.insertCell(-1);
            const gravity = row.insertCell(-1);
            name.textContent = data[i].name;
            climate.textContent = data[i].climate;
            gravity.textContent = data[i].gravity;
        }
    }
    
    function hapus(){
        var j = tabel.rows.length - 1;
        for(j; j > 0; j--) {
                tabel.deleteRow(j);
            }
    }
    
    function ketemu(){
        var getData = data.filter(key => key.name === cari.value);
        if (cari.value == "") {
            hide("#pesan");
            hapus();
            tampil();
        } else if (getData.length>0) {
            hapus();
            hide("#pesan");
            for (var k=0; k<getData.length;k++){        
                const row = tabel.insertRow(-1);
                const name = row.insertCell(-1);
                const climate = row.insertCell(-1);
                const gravity = row.insertCell(-1);
                name.textContent = getData[k].name;
                climate.textContent = getData[k].climate;
                gravity.textContent = getData[k].gravity;
            }
        } else {
            show("#pesan");
            pesan.innerHTML = "<i class='large frown outline icon'></i>Oops, planet <b>" + cari.value + "</b> not found!";
        }
    }
    
    cari.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            ketemu();
        }
    });
};

request.send();