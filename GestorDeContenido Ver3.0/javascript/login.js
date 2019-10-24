// JavaScript Document
//funcion basica para ingresar con determinados credenciales... 
function ingreso() {
	//ingreso para aparentar login
	var usr=document.getElementById("usr").value;
	var pssw=document.getElementById('pssw').value;
	//valores por defecto.... 
	if(usr=="admin@ucuenca.edu.ec" && pssw=="admin2019"){
		//almacenamos el nombre del usuario en la sesion en cache...
		localStorage.setItem("usuario", "Administrador");
        sessionStorage.setItem("usuario", "Administrador");
		location.href="app/cursos.html";
		//console.log(usr);
	}else {//validamos si el correo o el password esta mal notificar adecuandamente, si el correo esta mal no pasa al psswd
		if(usr!="admin@ucuenca.edu.ec"){
			document.getElementById("usr").value="";
			document.getElementById("pssw").value="";
			document.getElementById("mensaje").innerHTML = "Correo electrónico incorrecto!";
			}
			else if(pssw!="admin2019"){
			
			document.getElementById("pssw").value="";
			document.getElementById("mensaje").innerHTML = "Clave ingresada incorrecta!";
				
				}						
		
		}
	
	}
function pulsar(e) {
		console.log('Entre');
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
		console.log('Entre');
        var boton = document.getElementById("button-ingresar");
        boton.onclick();
    }
}