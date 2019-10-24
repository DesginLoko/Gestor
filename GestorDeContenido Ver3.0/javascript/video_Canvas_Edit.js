//Funciones necesarias para editar etiquetas en canvas
var canvasEdit, ctxEdit,canvasx,canvasy,last_mousex,last_mousey,lengthx,lengthy,mousedown,afterMouseUp,
    canvasWCliente,canvasHCliente, videoEditInicio,videoEditFin, lineaTimpoEdit,container,values,ultimaResaltada,idDesdeClic,idEtiquetaClic,modoTexto;

function loadVideoCanvasEdit(){   
 
    
    document.getElementById("etiquetas").checked = true;
    scaleFac = 1;
    wV = fMetaVideo[2];
    hV = fMetaVideo[3];    
    vid = document.getElementById('video');
    canvasEdit = document.getElementById('canvasEdit');
    ctxEdit = canvasEdit.getContext('2d');
    lineaTimpoEdit=document.getElementById('TiempoEdit');
    //Variables
    canvasEdit.width = wV/scaleFac;
    canvasEdit.height = hV/scaleFac;
    canvasWCliente=canvasEdit.clientWidth;
    canvasHCliente=canvasEdit.clientHeight;
    canvasx = $(canvasEdit).offset().left;
    canvasy = $(canvasEdit).offset().top;
    last_mousex = last_mousey = 0;
    mousex = mousey = 0;
    mousedown = false;                    	    
    vid.addEventListener("play",procPlayEdit(canvasEdit,ctxEdit,vid,0,0));		
    vid.addEventListener("pause",function(){window.clearInterval(ii);},false);
    vid.addEventListener("ended",function(){clearInterval(ii);},false);
    mostrarEtiquetas();
    CargarAudioTexto();
    //ocultarEdicion();
    iniciarSlider();
    stopVideo();    
    prevDrawTimeLine();
    playVideo();
    //Mousedown
    $(canvasEdit).on('mousedown', function(e) {        
        if( modoTexto==null || modoTexto){
            return;
        }
        var rect = document.getElementById('canvasEdit').getBoundingClientRect();
        mousex = (e.clientX - rect.left) / (document.getElementById('canvasEdit').clientWidth / document.getElementById('canvasEdit').width);
        mousey = (e.clientY - rect.top) / (document.getElementById('canvasEdit').clientHeight / document.getElementById('canvasEdit').height);
        last_mousex = Math.ceil(mousex);
        last_mousey = Math.ceil(mousey);
        document.getElementById("lblPosInicial").innerHTML=" x: "+last_mousex + "    y: "+last_mousey;                
        /*
        last_mousex = parseInt(e.clientX-canvasx);
        last_mousey = parseInt(e.clientY-canvasy);*/
        mousedown = true;
        pauseVideo();
    });

    //Mouseup
    $(canvasEdit).on('mouseup', function(e) {    
        if( modoTexto==null || modoTexto){
            return;
        }
        mousedown = false;
        afterMouseUp=true;
    });

    //Mousemove
    $(canvasEdit).on('mousemove', function(e) {
        if( modoTexto==null || modoTexto){
            return;
        }
        /*mousex = parseInt(e.clientX-canvasx);
        mousey = parseInt(e.clientY-canvasy);*/
        
        var rect = document.getElementById('canvasEdit').getBoundingClientRect();

        mousex = (e.clientX - rect.left) / (document.getElementById('canvasEdit').clientWidth / document.getElementById('canvasEdit').width);
        mousey = (e.clientY - rect.top) / (document.getElementById('canvasEdit').clientHeight / document.getElementById('canvasEdit').height);
        mousex = Math.ceil(mousex);
        mousey = Math.ceil(mousey);
        
        
        if(mousedown) {                        
            var width = mousex-last_mousex;
            var height = mousey-last_mousey;
            lengthx=width;
            lengthy=height;            
            document.getElementById("lblPosFinal").innerHTML=" x: "+mousex + "    y: "+mousey;
            
        }else{
            if(idEtiquetaClic==null && afterMouseUp){
                
                CargarCuadroDerecha("Etiqueta Nueva",0,last_mousex,last_mousey,mousex,mousey,vid.currentTime,vid.currentTime+5,2);
                videoEditFin=vid.currentTime+5;
                afterMouseUp=false;
            }
        }
        //Output
        //$('#output').html('canvasWCliente:'+canvasWCliente+' current: '+mousex+', '+mousey+'<br/>last: '+last_mousex+', '+last_mousey+'<br/>mousedown: '+mousedown);
    });            
}
function procPlayEdit(canvas,context,video,screen,currTT){    
    var interval=window.setInterval(function(){
        //lineaTimpoSug.value=video.currentTime;
        lineaTimpoEdit.value=video.currentTime;
        verificarResaltado(video.currentTime);
        if(videoEditFin!=null&&video.currentTime>Math.floor(videoEditFin/fpsVideo)){
            pauseVideo();
            videoEditFin=null;
        }
        context.drawImage(video,0,0,canvas.width,canvas.height);				
        dibujarOCREdit(context,screen);						
    },1000/8);
    if (currTT==3){vid.currentTime = fOCR[i][5]/fMetaVideo[4];}
}
function dibujarOCREdit(CTX,videoX){			
			/*Begin path to plot OCR*/
			CTX.beginPath();
			CTX.strokeStyle = "red";
			CTX.lineWidth = 5;						
            var w = lengthx;
            var h = lengthy;
            var x = last_mousex;
            var y = last_mousey;
            CTX.strokeRect(x,y,w,h);										
			CTX.fill();
			CTX.closePath();

		}
//el parámetro tipo de la función carga ya sea el actualizar 1 o el agregar 2
function CargarCuadroDerecha(nombre,tipoEtiqueta,xinicial,yinicial,xfinal,yfinal,tiempoinicial,tiempofinal,tipo){     
    var divEdicionEiquetas= document.getElementById("divEdicionEiquetas");
    divEdicionEiquetas.style.display="inline"; 
    var timeLineDobleSlider=document.getElementById("timeLineDobleSlider");
    timeLineDobleSlider.style.display="inline";
    iniciarSlider();
    document.getElementById("txtNombreEdit").value=nombre;
    cambiarTiempoInicial(1);    
    cambiarTiempoFinal(tiempofinal);
    cambiarTiempoInicial(tiempoinicial);    
    if(xinicial==null){
        document.getElementById("lblPosInicial").innerHTML="";
        document.getElementById("lblPosFinal").innerHTML="";        
        return;
    }
    if(tipo==1)
        {
            var btnCrear= document.getElementById("button-Crear-Etiqueta");
            btnCrear.style.display="none";
            var btnActualizar= document.getElementById("button-Actualizar-Etiqueta");
            btnActualizar.style.display="inline";
        }else{
            var btnCrear= document.getElementById("button-Crear-Etiqueta");
            btnCrear.style.display="inline";
            var btnActualizar= document.getElementById("button-Actualizar-Etiqueta");
            btnActualizar.style.display="none";
        }
    
    document.getElementById("selectTipoEdit").selectedIndex = tipoEtiqueta;
    document.getElementById("lblPosInicial").innerHTML=" x: "+xinicial + "    y: "+yinicial;
    document.getElementById("lblPosFinal").innerHTML=" x: "+xfinal + "    y: "+yfinal;
    if(tiempoinicial!=null)
        playVideoEdit()
        
}
function CargarCuadroDerechaAT(idAuTxt,texto,tiempoinicial,tiempofinal){    
    var divEdicionAudioTexto= document.getElementById("divEdicionAudioTexto");
    divEdicionAudioTexto.style.display="inline"; 
    cambiarTiempoInicial(0);
    cambiarTiempoFinal(tiempofinal);
    cambiarTiempoInicial(tiempoinicial);    
    var txtAudioTexto=document.getElementById("txtAudioTexto");
    txtAudioTexto.value=texto;
    var idAT=document.getElementById("idAT");
    idAT.innerHTML=idAuTxt;
    if(tiempoinicial!=null)
        playVideoEdit()
}
function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}
function cambiarTiempoInicial(segundos){
    if(segundos==null){
        document.getElementById("lblTiempoInicio").innerHTML="";  
        document.getElementById("lblTiempoInicioAT").innerHTML="";  
        return;
    }
    var minutes = Math.floor(segundos / 60);
    var seconds = segundos - minutes * 60;
    document.getElementById("lblTiempoInicio").innerHTML=str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);  
    document.getElementById("lblTiempoInicioAT").innerHTML=str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);  
    var s=new Slider(document.getElementById("minTime"));
    s.valueNow=segundos;
    s.init();
    s.moveSliderTo(Math.floor(segundos));
}
function cambiarTiempoFinal(segundos){
    if(segundos==null){
        document.getElementById("lblTiempoFinal").innerHTML="";
        document.getElementById("lblTiempoFinalAT").innerHTML="";
        return;
    }
    var minutes = Math.floor(segundos / 60);
    var seconds = segundos - minutes * 60;
    document.getElementById("lblTiempoFinal").innerHTML=str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
    document.getElementById("lblTiempoFinalAT").innerHTML=str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
    var s=new Slider(document.getElementById("maxTime")); 
    s.valueNow=segundos;
    s.init();
    s.moveSliderTo(Math.floor(segundos));
}
function cambiarTiempoInicialSV(segundos){
    if(segundos==null){
        document.getElementById("lblTiempoInicio").innerHTML="";  
        document.getElementById("lblTiempoInicioAT").innerHTML="";  
        return;
    }
    var minutes = Math.floor(segundos / 60);
    var seconds = segundos - minutes * 60;
    document.getElementById("lblTiempoInicio").innerHTML=str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);  
    document.getElementById("lblTiempoInicioAT").innerHTML=str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);  
}
function cambiarTiempoFinalSV(segundos){
    if(segundos==null){
        document.getElementById("lblTiempoFinal").innerHTML="";
        document.getElementById("lblTiempoFinalAT").innerHTML="";
        return;
    }
    var minutes = Math.floor(segundos / 60);
    var seconds = segundos - minutes * 60;
    document.getElementById("lblTiempoFinal").innerHTML=str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
    document.getElementById("lblTiempoFinalAT").innerHTML=str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
}
function CargarAudioTexto(){
    var divAudioTexto=document.getElementById("audioTextoTime");
    var textoCompleto="";
    for (var i=0;i<fAudioText.length; i++) {
        var texto="";
        texto=" <span id='spAudText"+i+"' onclick='clickEnTexto(this)' txtId='"+i+"' onmouseover='overPutBold(this)' onmouseleave='removeBold(this)'>"+fAudioText[i][0]+"</span>";
        textoCompleto+=texto;
    }
    divAudioTexto.innerHTML=textoCompleto;
}
function clickEnTexto(elemeto){
    var idtxt=elemeto.attributes["txtId"].value;        
    playVideo();
    vid.currentTime=fAudioText[idtxt][1];
    videoEditFin=fAudioText[idtxt][2]*fpsVideo;
    videoEditInicio=fAudioText[idtxt][1]*fpsVideo;
    CargarCuadroDerechaAT(idtxt,fAudioText[idtxt][0],fAudioText[idtxt][1],fAudioText[idtxt][2]);                
}
function verificarResaltado(segundos){
    if(idDesdeClic!=null){
        var el=document.getElementById("spAudText"+idDesdeClic);
        if(el!=null){
            resaltar(el);
            idDesdeClic=null;
            return;
        }
    }
    for (var i=0;i<fAudioText.length; i++) {
        if(fAudioText[i][1]<=segundos&&fAudioText[i][2]>=segundos){
            var el=document.getElementById("spAudText"+i);
            if(el!=null){
                resaltar(el);
            }
        }
    }
}
function resaltar(elemento){
    
    if(ultimaResaltada){
        if(elemento==ultimaResaltada){
            return;
        }
        ultimaResaltada.className ="";
        ultimaResaltada.blur()
    }    
    elemento.className ="resaltar";
    elemento.focus({preventScroll:true});
    ultimaResaltada=elemento;
    //window.location.hash = elemento;
}
function overPutBold(elemento){    
    elemento.setAttribute("style", "font-weight: bold;");
}
function removeBold(elemento){        
    elemento.removeAttribute("style")
}
function mostrarEtiquetas(elemento){
    modoTexto=false;
    var audio= document.getElementById("audioTextoTimeCont");
    audio.style.display="none";
    var etiquetas= document.getElementById("etiquetasTime");
    etiquetas.style.display="inline";    
    limpiarEtiquetas();
    iniciarSlider();
    ocultarEdicion();
}
function mostrarAudioTexto(elemento){
    modoTexto=true;
    var audio= document.getElementById("audioTextoTimeCont");
    audio.style.display="inline";
    var etiquetas= document.getElementById("etiquetasTime");
    etiquetas.style.display="none";    
    limpiarEtiquetas();    
    iniciarSlider();
    ocultarEdicion();
    
}
function ocultarEdicion(){
    limpiarEtiquetas();    
    var divEdicionEiquetas= document.getElementById("divEdicionEiquetas");
    divEdicionEiquetas.style.display="none";
    var divEdicionAudioTexto= document.getElementById("divEdicionAudioTexto");
    divEdicionAudioTexto.style.display="none";
    var timeLineDobleSlider=document.getElementById("timeLineDobleSlider");
    timeLineDobleSlider.style.display="none";    
}

function limpiarEtiquetas(){
    CargarCuadroDerecha("","",null,null,null,null,null,null,1);
    CargarCuadroDerechaAT(null,"",null,null);
    lengthx=0;
    lengthy=0;
    last_mousex=0;
    last_mousey=0;
}
function cancelarEdicionEtiqueta(){
    var tiempoAntes = vid.currentTime;
    ocultarEdicion()    ;
    iniciarSlider();
    vid.currentTime=tiempoAntes;
    idEtiquetaClic=null;
    playVideo();
}
function actualizarEtiqueta(){
    var tiempoAntes = vid.currentTime;
    ocultarEdicion()    ;
    iniciarSlider();
    vid.currentTime=tiempoAntes;
    playVideo();
}
function cancelarEdicionAT(){
    var tiempoAntes = vid.currentTime;
    ocultarEdicion()    ;
    iniciarSlider();
    vid.currentTime=tiempoAntes;    
    playVideo();
}
function actualizarAT(){    
    var tiempoAntes = vid.currentTime;
    var idAT=document.getElementById("idAT");
    var id =idAT.innerHTML;
    var txtAudioTexto=document.getElementById("txtAudioTexto");
    var nuevoTexto=txtAudioTexto.value;
    fAudioText[id][0]=nuevoTexto;
    CargarAudioTexto();
    ocultarEdicion();
    iniciarSlider();
    vid.currentTime=tiempoAntes;
    
    playVideo();
    
}


