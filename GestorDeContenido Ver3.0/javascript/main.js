
var pagina=0;
if(localStorage.getItem("usuario")==null){
		location.href="../index.html";  		
  }

if(localStorage.getItem('estilo')==null){
	localStorage.setItem('estilo','normal');
}


$( document ).ready(function() {
      if(localStorage.getItem("usuario")==null){
			location.href="../index.html";  		
  } else{
  		document.getElementsByName("username")[0].innerHTML= localStorage.getItem("usuario");
  }
  if(localStorage.getItem('estilo')=='normal'){
	document.getElementsByName("estiloPrincipal")[0].href="../css/temaPrincipal.css"
}
	if(localStorage.getItem('estilo')=='oscuro'){
	//estiloVideoGallery
		document.getElementsByName("estiloPrincipal")[0].href="../css/temaPrincipalOscuro.css"

}
});

function init() {
  // initialisation stuff here
  if(localStorage.getItem("usuario")==null){
		location.href="../index.html";  		
  }

}
function salir(){
	localStorage.removeItem("usuario");
	init();
	}
function setEditModal(nombre,tipo){
	console.log(nombre+ " " +tipo);
	document.getElementById("newNameEdit").value=nombre;
	document.getElementById("newTypeEdit").value=tipo;
	//window.confirm(localStorage.getItem("usuario")+", Esta a punto de editar "+tipo + " "+nombre);
	}

	function cambiarEstilo(){
		if(localStorage.getItem('estilo')=='normal'){
				document.getElementsByName("estiloPrincipal")[0].href="../css/temaPrincipalOscuro.css"
				localStorage.setItem('estilo','oscuro');
				}			
				else{
						document.getElementsByName("estiloPrincipal")[0].href="../css/temaPrincipal.css"
						localStorage.setItem('estilo','normal');

				}		

	}
function removeEtiqueta(e){
	//obtenemos el elemento de la pagina que queremos eliminar
	//podemos acceder a todos sus atributos por ejemplo al id de la etiqueta a eliminar
	var i=0;
	//obtenemos el id de la etiqueta ya q el id del elemento html esta conformado asi: rm_id
	while (e[i]!="_"){
		i++;
		}
	var etiquetaID=e.substring(i+1,e.length);
	window.confirm(localStorage.getItem("usuario")+", Esta seguro que desea eliminar la etiqueta: "+ etiquetaID);
	
	}
var firstClic=true;

$(window).click(function(e) {
    if($('#myNavbar')[0].className=="navbar-collapse collapse in"&&firstClic){
        firstClic=false;
    }else if($('#myNavbar')[0].className=="navbar-collapse collapse in"&&!firstClic){
        firstClic=true;
        document.getElementById("myNavbar").className="navbar-collapse collapse";
        //$('#myNavbar')[0].collapse('hide');
    }
    
});