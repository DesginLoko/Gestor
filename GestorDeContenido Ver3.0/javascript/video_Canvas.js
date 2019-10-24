var wV,hV,scaleFac,vid,c,cvideo2,cAux,ctx,ctxvideo2,lineaTimpoSug;
var isInFs=false;
//Funciones necesarias para cargar video previsualización
function loadVideoCanvasMod(){
    wV = fMetaVideo[2];
    hV = fMetaVideo[3];
    scaleFac = 1;
    lineaTimpoSug=document.getElementById('TiempoSug');
    vid = document.getElementById('video');
    c = document.getElementById('canvas0');
   // cvideo2 = document.getElementById('canvasEdit');
    cAux = document.getElementById('cAux');	
    c.width = wV/scaleFac;

    c.height = hV/scaleFac;
    ///cvideo2.width = wV/scaleFac;
    //cvideo2.height = hV/scaleFac;

    ctx = c.getContext('2d');
    //ctxvideo2 = cvideo2.getContext('2d');
    //var ctxAux = cAux.getContext('2d');		
    lineaTimpoSug.value=vid.currentTime;
    vid.addEventListener("play",procPlay(c,ctx,vid,0,0));		
    vid.addEventListener("pause",function(){window.clearInterval(ii);},false);
    vid.addEventListener("ended",function(){clearInterval(ii);},false);
}
function playVideo(){          
    const playPromise = vid.play(); 
    if (playPromise !== null){
        playPromise.catch(() => {sleep(1000); vid.play();  })
    }
    document.getElementById("btnPlayVidSug").style.display='none';
    document.getElementById("btnPauseVidSug").style.display='inline';
    document.getElementById("btnPlayVidEdit").style.display='none';
    document.getElementById("btnPauseVidEdit").style.display='inline';
    videoEditFin=null;
}
function playVideoEdit(){          
    const playPromise = vid.play(); 
    if (playPromise !== null){
        playPromise.catch(() => {sleep(1000); vid.play();  })
    }
    document.getElementById("btnPlayVidSug").style.display='none';
    document.getElementById("btnPauseVidSug").style.display='inline';
    document.getElementById("btnPlayVidEdit").style.display='none';
    document.getElementById("btnPauseVidEdit").style.display='inline';    
}
function playpauseVideo(){  
    if((vid.currentTime > 0 && !vid.paused && !vid.ended && vid.readyState > 2)){
        pauseVideo();
    }else{
        playVideo();
    }    
}

function sleep(milliseconds) {
 var start = new Date().getTime();
 for (var i = 0; i < 1e7; i++) {
  if ((new Date().getTime() - start) > milliseconds) {
   break;
  }
 }
}
function pauseVideo(){
    vid.pause();   
    document.getElementById("btnPlayVidSug").style.display='inline';
    document.getElementById("btnPauseVidSug").style.display='none';
    document.getElementById("btnPlayVidEdit").style.display='inline';
    document.getElementById("btnPauseVidEdit").style.display='none';
}
function stopVideo(){
    vid.pause();   
    vid.currentTime=0;
    document.getElementById("btnPlayVidSug").style.display='inline';
    document.getElementById("btnPauseVidSug").style.display='none';
    document.getElementById("btnPlayVidEdit").style.display='inline';
    document.getElementById("btnPauseVidEdit").style.display='none';
}
function fullScreenCanvasSug(){
    if(isInFs){
        closeFullscreen();
    }    
    var elem = document.getElementById("divVideoCanvasSug");
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
        isInFs=true;
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
        isInFs=true;
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
        isInFs=true;
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
        isInFs=true;
      }    
}
function closeFullscreen() {
  var elem = document.getElementById("divVideoCanvasSug");
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
    isInFs=false;
}

function procPlay(canvas,context,video,screen,currTT){    
    var interval=window.setInterval(function(){
        lineaTimpoSug.value=video.currentTime;
        context.drawImage(video,0,0,canvas.width,canvas.height);				
        dibujarOCR(context,screen);						
    },1000/8);
    if (currTT==3){vid.currentTime = fOCR[i][5]/fMetaVideo[4];}
}
function setVideoTime(segundos){
        video.currentTime=segundos;
}
function dibujarOCR(CTX,videoX){			
			/*Begin path to plot OCR*/
			CTX.beginPath();
			CTX.strokeStyle = "blue";
			CTX.lineWidth = 5;
			if (videoX==0){
				CTX.fillStyle="white";
				CTX.font = "400% Arial";
			}
			for (var i=0; i<fOCR.length; i++) {
				var currF= fMetaVideo[4]*vid.currentTime;//fps*time= currentFrame
				//console.log(fOCR[i][5]+":  "+currF+"   :"+fOCR[i][6]);
				if ( fOCR[i][5]<=currF&&currF<=fOCR[i][6]){
					var w = (fOCR[i][2]-fOCR[i][0])/scaleFac;
					var h = (fOCR[i][3]-fOCR[i][1])/scaleFac;
					var x = (fOCR[i][0])/scaleFac;
					var y = (fOCR[i][1])/scaleFac;
					CTX.strokeRect(x,y,w,h);
					if (videoX==0){
						CTX.fillText(fOCR[i][4],x,y);
					}
					lab++;

				}
			}lab=0;
			CTX.fill();
			CTX.closePath();
			/*Begin path to plot OBJECTS*/
			CTX.beginPath();
			CTX.strokeStyle = "black";
			CTX.lineWidth = 5;
			if (videoX==0){
				CTX.fillStyle="white";
				CTX.font = "400% Arial";
			}
			for (var i=0; i<fOBJECT.length; i++) {
				var currF= fMetaVideo[4]*vid.currentTime;//fps*time= currentFrame
				//console.log(fOCR[i][5]+":  "+currF+"   :"+fOCR[i][6]);
				if ( fOBJECT[i][5]<=currF&&currF<=fOBJECT[i][6]){
					var w = (fOBJECT[i][3]-fOBJECT[i][1])/scaleFac;
					var h = (fOBJECT[i][4]-fOBJECT[i][2])/scaleFac;
					var x = (fOBJECT[i][1])/scaleFac;
					var y = (fOBJECT[i][2])/scaleFac;
					//console.log(x+":"+y+":"+w+":"+h+"---bingo---"+fOCR[i][5]+":  "+currF+"   :"+fOCR[i][6])
					CTX.strokeRect(x,y,w,h);
					if (videoX==0){
						CTX.fillText(fOBJECT[i][0],x,y);
					}
					lab++;

				}
			}lab=0;
			CTX.fill();
			CTX.closePath();

			/*Begin path to plot PEOPLE*/
			CTX.beginPath();
			CTX.strokeStyle = "brown";
			CTX.lineWidth = 5;
			if (videoX==0){
				CTX.fillStyle="white";
				CTX.font = "400% Arial";
			}
			for (var i=0; i<fPEOPLE.length; i++) {
				var currF= fMetaVideo[4]*vid.currentTime;//fps*time= currentFrame				
				if ( fPEOPLE[i][5]<=currF&&currF<=fPEOPLE[i][6]){
					var w = (fPEOPLE[i][3]-fPEOPLE[i][1])/scaleFac;
					var h = (fPEOPLE[i][4]-fPEOPLE[i][2])/scaleFac;
					var x = (fPEOPLE[i][1])/scaleFac;
					var y = (fPEOPLE[i][2])/scaleFac;					
					CTX.strokeRect(x,y,w,h);
					if (videoX==0){
						CTX.fillText(fPEOPLE[i][0],x,y);
					}
					lab++;

				}
			}lab=0;
			CTX.fill();
			CTX.closePath();
		}