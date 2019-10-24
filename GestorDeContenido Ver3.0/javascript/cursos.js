// JavaScript Document
if(localStorage.getItem('estilo')==null){
	localStorage.setItem('estilo','normal');
}
$( document ).ready(function() {

	if(localStorage.getItem('estilo')=='oscuro'){
	//estiloVideoGallery
	document.getElementsByName("estiloVideoGallery")[0].href="../css/video-galleryOscuro.css"
}
	if(localStorage.getItem('estilo')=='normal'){

		document.getElementsByName("estiloVideoGallery")[0].href="../css/video-gallery.css"
	}
});

function cambiarEstiloCursos(){
		if(localStorage.getItem('estilo')=='normal'){
				document.getElementsByName("estiloPrincipal")[0].href="../css/temaPrincipalOscuro.css"
				document.getElementsByName("estiloVideoGallery")[0].href="../css/video-galleryOscuro.css"
				localStorage.setItem('estilo','oscuro');
				}			
				else{
						document.getElementsByName("estiloPrincipal")[0].href="../css/temaPrincipal.css"
						document.getElementsByName("estiloVideoGallery")[0].href="../css/video-gallery.css"
						localStorage.setItem('estilo','normal');

				}		

	}
function crearGrilla(){

	}

