var contador = 0;

function cambNomTitulo(param) {
    var nombre = param.value;
    document.getElementById("myName").innerHTML = nombre;
}
function contar(){
    contador=contador+1;
    document.getElementById("cont").innerHTML = (contador);
}
function colorDivLeft(){
    document.getElementById("divLeft").style.background = "red";
}
function colorDivLeft2(){
    document.getElementById("divLeft").style.background = "green";
}
function calculaEdad(param){
    var today = new Date();
    var birthDate = new Date(param.value);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    document.getElementById("edad").innerHTML = age;
    document.getElementById("edad").value = age;
    document.getElementById("edad").innerText = age;



}


setInterval(changeText, 5000);
function changeText() {
    document.getElementById("textChange").innerHTML = "Ha cambiado!";
    document.getElementById("textChange").style.color = "red";

}

function colorDivRight(param){
    document.getElementById("divRight").style.background = param.value;
}

function hideImg(){
    if(document.getElementById("titleImg").style.visibility != 'hidden')
        document.getElementById("titleImg").style.visibility = 'hidden';
    else
        document.getElementById("titleImg").style.visibility = 'visible';

}

function enviar(){
    window.alert("Enviado");
}

