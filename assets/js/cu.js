var xmlns = "http://www.w3.org/2000/svg",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
  container = select('.container'),
  imageContainer = select('#image-container'),
  circleDragger = select('#circleDragger'),
    scPlayer,
    vinylStartRotation = 31,
    vinylEndRotation = 53,
    vinylRotationScale = (vinylEndRotation - vinylStartRotation),
    trackDuration


//center the container cos it's pretty an' that
TweenMax.set(container, {
  position: 'absolute',
  top: '50%',
  left: '50%',
  xPercent: -50,
  yPercent: -50
})
TweenMax.set('svg', {
  visibility:'visible'
})

SC.initialize({
    client_id: '516b790a82b7c6d89856376fa4ced361',
    redirect_uri: 'https://storymore.com/soundcloud'
  });


 createTrack()


TweenMax.set(['#vinylShine1', '#vinylShine2', '#vinylShine3'], {
  drawSVG:'30% 30%'
})
TweenMax.set('#armGroup',  {
  //rotation:33,
  svgOrigin:'396.5 188'
})

TweenMax.set([ circleDragger], {
  svgOrigin:'396.5 188'
})

TweenMax.set('#vinylShineGroup', {
  //svgOrigin:'284 320'
  transformOrigin:'50% 50%'
})

var tl = new TimelineMax();
tl.fromTo('#arm', 1, {
  drawSVG:'0% 0%'
}, {
  drawSVG:'0% 13%',
  ease:Power1.easeOut
})
.from('#balance', 1, {
  attr:{
    r:0
  },
  ease:Anticipate.easeIn
},'-=1')
.to('#arm', 2, {
  drawSVG:'0% 100%',
  ease:Power4.easeInOut
},'-=0.5')
.from('#stylus', 1, {
  scale:0,
  transformOrigin:'75% 15%',
  ease:Power2.easeInOut
},'-=0.9')
.staggerFrom('#vinylGroup circle', 2, {
  //x:'-=100',
  attr:{
    r:0
  },
  ease:Elastic.easeOut.config(1, 0.82)
},0.46,'-=0.6')
.from('#titleGroup', 0.5, {
  scale:0.8,
  alpha:0,
  //rotation:-45,
  transformOrigin:'50% 50%'//,
  //ease:Elastic.easeOut.config(1, 0.82)
},'-=2.6')

tl.timeScale(1.2);

var vinylShineTl = new TimelineMax({paused:true});
vinylShineTl.to(['#vinylShine1', '#vinylShine2', '#vinylShine3'], 1.4, {
  drawSVG:'65% 78%',
  ease:Linear.easeNone
})
.to(['#vinylShineGroup'], 3.3, {
  rotation:'+=360',
  repeat:-1,
  yoyo:false,
  transformOrigin:'50% 50%',
  ease:Linear.easeNone
},'-=1.4');


stylusDragger = Draggable.create(circleDragger,{
  type:'rotation',
  trigger:'#dragger',
  cursor:'pointer',
  bounds:{min:0,max:vinylStartRotation},
  onDrag:onDrag,
  onRelease:onDragEnd,
  onPress:onPress
})

function onDrag(e){
  
  TweenMax.set('#armGroup', {
    rotation:circleDragger._gsTransform.rotation
  })
}

function onPress(){
  
  scPlayer.pause();
  setSylusHold();
}


function onDragEnd(e){
  
  //return stylus to off position
  if(circleDragger._gsTransform.rotation < vinylStartRotation){
    
    TweenMax.to(['#armGroup'], 0.3,{
      rotation:0,
      ease:Back.easeOut.config(0.6)
    })       
    TweenMax.set(circleDragger,{
      rotation:0
    })   
    
    stopVinyl(); 
    
    scPlayer.pause();
    
    setSylusDropped();
    
    return;
    
  }
  
  
  if(scPlayer.currentTime() > 0){
    var headDragPercent = ((circleDragger._gsTransform.rotation - vinylStartRotation)/vinylRotationScale);
    
    //console.log("headDragPercent: " + (headDragPercent * trackDuration) );
    scPlayer.play();
    scPlayer.seek(headDragPercent * trackDuration);
    playVinyl();
    setSylusDropped();
  
    return;
    
  }
  //console.log(circleDragger._gsTransform.rotation)
  //put the needle on the reckid  
  if(circleDragger._gsTransform.rotation >= vinylStartRotation){
  
    scPlayer.play();
    
    TweenMax.to('#armGroup', 0.3,{
      rotation:vinylStartRotation,
      ease:Back.easeOut.config(0.6)
    })
 
    TweenMax.set(circleDragger, {
      rotation:vinylStartRotation
    })   
    
    playVinyl();
    
    setSylusDropped();
    
  } 
    stylusDragger[0].vars.bounds.max = vinylEndRotation;
    stylusDragger[0].applyBounds();    
 
}

function setSylusDropped(){
  
    TweenMax.to('#armGroup', 0.2,{
      scaleY:1,
      ease:Back.easeOut.config(2)
    })   
}

function setSylusHold(){
  
    TweenMax.to('#armGroup', 0.2,{
      scaleY:0.98,
      ease:Back.easeOut.config(0.3)
    })   
}

function playVinyl(){
  //console.log(playTrackTl.duration())
  //
  //console.log(vinylShineTl.paused())
  if(vinylShineTl.paused()){
    vinylShineTl.resume();
    
    
  } else {
    
  }
  

}


function stopVinyl(){
  
  vinylShineTl.pause();
  TweenMax.to(['#vinylShine1', '#vinylShine2', '#vinylShine3'], 1, {
    drawSVG:'100% 100%',
    ease:Linear.easeNone,
    onComplete:function(){
      //vinylShineTl.pause(0);
      TweenMax.set(['#vinylShine1', '#vinylShine2', '#vinylShine3'], {
      drawSVG:'30% 30%'
      })
    }
})
  TweenMax.to(['#vinylShineGroup'], 3.3, {
    rotation:'+=90',
    ease:Power1.easeOut
  })  
}

function endTrack(e){
  //alert('endTrack')
  TweenMax.to([circleDragger, '#armGroup'], 2, {
    rotation:0,
    ease:Back.easeOut.config(0.3)
  })
  
  stopVinyl();

}

function updateDragger(){
  //console.log(scPlayer.currentTime())
  //console.log(scPlayer.currentTime()/trackDuration)
  var trackTimePercent = scPlayer.currentTime()/trackDuration;
  TweenMax.to([circleDragger, '#armGroup'], 0.1, {
    rotation:vinylStartRotation + ((trackTimePercent * vinylRotationScale)),
    ease:Linear.easeNone
  })
}

function createTrack(tracks){
  streamTrack();
  
}

function streamTrack(){
  
  SC.stream('/tracks/271746620').then(function(player){
    //player.play();
if (player.options.protocols[0] === 'rtmp') {
        player.options.protocols.splice(0, 1);
    }       
    scPlayer = player;  

    trackDuration = scPlayer.options.duration;
    player.on('time', function (){
      updateDragger();

    })
      player.on('finish', function (){
        endTrack()
    })

  });  
}


//ScrubGSAPTimeline(tl)