/*Función que permite mostrar la imagen de la etiqueta en un modal(bootstrap)
Nomre -> Título del modal(Nombre de la etiqueta)
frame -> número de frame de 
*/
var fpsVideo = 30;
var largoVideo = 303.303;
//FUncion para colocar imagen en Modale de VistaPrevia
function SetImageInModal(nombre, frame, xs, ys, xsl, ysl) {
    document.getElementById("tituloModalPreview").innerHTML=nombre;
    var _VIDEO = document.querySelector("#video");              
    var currentTime=frame/fpsVideo;   
    getImageFromVideo(_VIDEO,currentTime,"CanvasPreview",xs,ys,xsl,ysl);
}    

//Función para colocar imagen en Canvas
function getImageFromVideo(video,currentTime,htmlImgCanvasTag,xs,ys,xsl,ysl){                
    video.currentTime=currentTime;     
    document.getElementById("cargandoPrev").style.display="inline";    
    document.getElementById(htmlImgCanvasTag).style.display='none';
    video.addEventListener("seeked", function(e) {
        e.target.removeEventListener(e.type, arguments.callee); // remove the handler or else it will draw another frame on the same canvas, when the next seek happens
        var imgcanvas = document.getElementById(htmlImgCanvasTag);
        if(imgcanvas!=null){
            var ctx = imgcanvas.getContext("2d");          
            ctx.clearRect(0, 0, imgcanvas.width, imgcanvas.height);
            var yLengthF=ysl*imgcanvas.width/xsl;
            imgcanvas.width=xsl;
            imgcanvas.height=ysl;
            document.getElementById("ModalPrevisualizarEtiqueta").style.width=xsl;
            //ctx.drawImage(video, xs, ys, xsl, ysl, 0, 0, imgcanvas.width, yLengthF);  
            document.getElementById(htmlImgCanvasTag).style.display='inline';
            xsl=xsl-xs;
            ysl=ysl-ys;
            ctx.drawImage(video, xs, ys, xsl, ysl, 0, 0, xsl, ysl);                
            document.getElementById("cargandoPrev").style.display="none";
        }                                 
    });        
} 
//Función para cargar video 
function loadVideoPrueba(){
    document.getElementById('video').src = "../videos/reportajelisto.mp4"    
    
}

//Video timeline
//Obtener Segundos 
function obtenerSegundos(frame){
    return frame/fpsVideo;
}
//Función para agregar envento de carga timeLine sección Personalizar
function prevDrawTimeLine(){
    google.charts.load('current', {'packages':['timeline']});
      google.charts.setOnLoadCallback(drawChart);
}      
//Función para cargar timeLine sección personalizar
function drawChart() {
    var container = document.getElementById('timeline');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    var minutes = Math.floor(largoVideo / 60);
    var seconds = largoVideo - minutes * 60;
    dataTable.addColumn({ type: 'string', id: 'Etiqueta' });
    dataTable.addColumn({ type: 'string', id: 'dummy bar label' });
    dataTable.addColumn({ type: 'date', id: 'Inicio' });
    dataTable.addColumn({ type: 'date', id: 'Fin' });
    dataTable.addRows([
      [ 'Video',"", new Date(0,0,0,0,0,0),  new Date(0,0,0,0,minutes,seconds) ]]); 
      loadDataTableTimeLine(dataTable);

       var options = {
      colors: ['#cbb69d', '#603913', '#c69c6e'],
      timeline: { rowLabelStyle: {fontName: 'Helvetica', fontSize: 12, color: '#603913' },
                    barLabelStyle: { fontName: 'Garamond', fontSize: 12 } 
                }
    };

    chart.draw(dataTable, options);
    //Agregamos Evento para cambiar posición Video segun etiqueta
    google.visualization.events.addListener(chart, 'select', function() {                                    
        var i=chart.getSelection()[0].row-1;
        if(i==-1){
            var _VIDEO = document.querySelector("#video");              
            _VIDEO.currentTime=0;               
            limpiarEtiquetas();
            ocultarEdicion();            
            playVideo();            
            return;
        }        
        if (i<fOCR.length){     
            var _VIDEO = document.querySelector("#video");                    
            playVideo();
            _VIDEO.currentTime=fOCR[i][5]/fpsVideo;               
            videoEditInicio=fOCR[i][5];
            videoEditFin=fOCR[i][6];
            last_mousex=fOCR[i][0];
            last_mousey=fOCR[i][1];
            lengthx=fOCR[i][2]-fOCR[i][0];
            lengthy=fOCR[i][3]-fOCR[i][1];
            var t1=fOCR[i][5]/fpsVideo;
            var t2=fOCR[i][6]/fpsVideo;            
            idEtiquetaClic=i;
            CargarCuadroDerecha(fOCR[i][4],0,fOCR[i][0],fOCR[i][1],fOCR[i][2],fOCR[i][3],t1,t2,1);
            
        }
        else {
            if (i-fOCR.length<fOBJECT.length){
                var _VIDEO = document.querySelector("#video");
                playVideo();
                _VIDEO.currentTime=fOBJECT[i-fOCR.length][5]/fpsVideo;      
                videoEditInicio=fOBJECT[i-fOCR.length][5];
                videoEditFin=fOBJECT[i-fOCR.length][6];
                last_mousex=fOBJECT[i-fOCR.length][1];
                last_mousey=fOBJECT[i-fOCR.length][2];
                lengthx=fOBJECT[i-fOCR.length][3]-fOBJECT[i-fOCR.length][1];
                lengthy=fOBJECT[i-fOCR.length][4]-fOBJECT[i-fOCR.length][2];                                
                var t1=fOBJECT[i-fOCR.length][5]/fpsVideo;
                var t2=fOBJECT[i-fOCR.length][6]/fpsVideo;
                idEtiquetaClic=i;
                CargarCuadroDerecha(fOBJECT[i-fOCR.length][0],1,fOBJECT[i-fOCR.length][1],fOBJECT[i-fOCR.length][2],fOBJECT[i-fOCR.length][3],fOBJECT[i-fOCR.length][4],t1,t2,1);                                        
                
            }else {                
                var _VIDEO = document.querySelector("#video");    
                playVideo();
                _VIDEO.currentTime=fPEOPLE[i-fOCR.length-fOBJECT.length][5]/fpsVideo;                 						
                videoEditInicio=fPEOPLE[i-fOCR.length-fOBJECT.length][5];
                videoEditFin=fPEOPLE[i-fOCR.length-fOBJECT.length][6];
                last_mousex=fPEOPLE[i-fOCR.length-fOBJECT.length][1];
                last_mousey=fPEOPLE[i-fOCR.length-fOBJECT.length][2];
                lengthx=fPEOPLE[i-fOCR.length-fOBJECT.length][3]-fPEOPLE[i-fOCR.length-fOBJECT.length][1];
                lengthy=fPEOPLE[i-fOCR.length-fOBJECT.length][4]-fPEOPLE[i-fOCR.length-fOBJECT.length][2];
                var t1=fPEOPLE[i-fOCR.length-fOBJECT.length][5]/fpsVideo;
                var t2=fPEOPLE[i-fOCR.length-fOBJECT.length][6]/fpsVideo;
                idEtiquetaClic=i;
                CargarCuadroDerecha(fPEOPLE[i-fOCR.length-fOBJECT.length][0],2,fPEOPLE[i-fOCR.length-fOBJECT.length][1],fPEOPLE[i-fOCR.length-fOBJECT.length][2],fPEOPLE[i-fOCR.length-fOBJECT.length][3],fPEOPLE[i-fOCR.length-fOBJECT.length][4],t1,t2,1);    
                
            }
        }
                
      });
      }
//Función para cargar dataTable de timeline
function loadDataTableTimeLine(dataTable){
    		for (var i=0; i<fTable.length; i++) {
				j=i+1;
				if (i<fOCR.length){     
                    CargarDatosTimeLine(dataTable,i,'OCR',fOCR[i][4],fOCR[i][5],fOCR[i][6]);					
				}
				else {
					if (i-fOCR.length<fOBJECT.length){
                        CargarDatosTimeLine(dataTable,i,'OBJECT',fOBJECT[i-fOCR.length][0],fOBJECT[i-fOCR.length][5],fOBJECT[i-fOCR.length][6]);											
					}else {
                        CargarDatosTimeLine(dataTable,i,'PEOPLE',fPEOPLE[i-fOCR.length-fOBJECT.length][0],fPEOPLE[i-fOCR.length-fOBJECT.length][5],fPEOPLE[i-fOCR.length-fOBJECT.length][6]);											
					}
				}
			}
}


//Función para agregar fila a tabla de timeline
function CargarDatosTimeLine(dataTable,numero,tipo,NombreEtiqueta,frameInicio,frameFin){
    var segundosInicio=obtenerSegundos(frameInicio);
    var segundosFin=obtenerSegundos(frameFin);
    var minutesInicio = Math.floor(segundosInicio / 60);
    var secondsInicio = segundosInicio - minutesInicio * 60;
    var minutesFin = Math.floor(segundosFin / 60);
    var secondsFin = segundosFin - minutesFin * 60;
    dataTable.addRows([
          [tipo+": "+ NombreEtiqueta,"", new Date(0,0,0,0,minutesInicio,secondsInicio),  new Date(0,0,0,0,minutesFin,secondsFin) ]]);
    
}