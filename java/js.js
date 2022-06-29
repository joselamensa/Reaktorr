function agregar() {
    document.getElementById("agregado").innerHTML = " Añadido 1 unidad";
}

function validar()
{
    var usuario = document.getElementById("usuario").value;
    var Contraseña = document.getElementById("pass").value;	

    if(usuario == "jose" && Contraseña == "1234")
    {
        window.location= "./personaldata.html";
    }
    else
    {
        document.getElementById("incorrec").innerHTML = "Contraseña incorrecta";
    }

}