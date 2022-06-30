var a = 0;

function agregar() {
    a = a + 1;
    document.getElementById("agregado").innerHTML = `Añadido ${a} unidad(es).`;
}
/* IDEA
function borrado() {
    document.getElementById("agregado").errase();
} 
*/
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