
 
  console.log("Helllooo!");
  


  $(function() {


  

    $.getJSON('data.json', function(data) {
        console.log("loading data");
        var count = 0; 
      //  $.each(data, function(i, f) {
          console.log(data.length);
          var person; 
              var time;
              var details;
              var tblRow;
          for (var k = 0; data.length > k; k++) {
            person = data[k].person; 
            time = data[k].time; 
            console.log(time);
            details =  data[k].notedetails; 
            console.log("stilll working!");
            console.log(k);
              if (k == 0 ) {
                var notestring = "<div class=note1>  </div>"
              }
              if (k == 1) {
                var notestring = "<div class=note2>  </div>"
              }
              if (k == 2 ) {
                var notestring = "<div class=note3>  </div>"
              }
              if (k == 3 ) {
                var notestring = "<div class=note4>  </div>"
              }
              if (k == 4) {
                var notestring = "<div class=note5>  </div>"
              }
              
              $("#note-template").append(notestring);
             
                
            
                  tblRow =  "<h1>" + person + "</h1>" +
                 "<h2>" + time + "</h2>" + "<h3>" + details + "</h3>" + "</div";
                 
             
                 if (k == 0 ) {
                  $(".note1").append(tblRow);
                     
                $(".note1").append("<div class=closer>  </div>");
                
                }
                if (k == 1) {
                  $(".note2").append(tblRow);
                  $(".note2").append("<div class=closer>  </div>");
                
                }
                if (k == 2 ) {
                  $(".note3").append(tblRow);
                  $(".note3").append("<div class=closer>  </div>");
                  $(".closer").append("X");
                }
                if (k == 3 ) {
                  $(".note4").append(tblRow);
                  $(".note4").append("<div class=closer>  </div>");
                  $(".closer").append("X");
                }
                if (k == 4) {
                  $(".note5").append(tblRow);
                  $(".note5").append("<div class=closer>  </div>");
                  $(".closer").append("X");
                }
              
              
               
      $(".closer").click(function() { 
    console.log("clicked!"); 
    $(this).parent().remove();
  });
              
         
               
                
                
          }
           
           
     // });
 
    });
    $.getJSON('data2.json', function(data) {
        console.log("loading data 2");
        
        $.each(data, function(i, f) {
           
     
                var tblRow = "<h1>" + f.time + "</h1>" +
                "<h2>" + f.notedetails + "</h2>" + "<h3>" + f.view + "</h3>"
                $(tblRow).appendTo(".note-add");
            
           
      });
 
    });
    
});
$( document ).ready(function() {
  var button1Count = 0; 
  $(".button1").click(function() { 
    button1Count++;
    console.log("clicked!"); 
    if (button1Count % 2 != 0) {
    $("#note-adder-2").css('display', 'block');
    $("#popup-container").css('display', 'block');
    }
    if (button1Count % 2 == 0 ) {
      $("#note-adder-3").css('display', 'none');
      $("#note-adder-1").css('display', 'none');
      $("#note-adder-2").css('display', 'none');
      $("#popup-container").css('display', 'none');
    }
  });
  var button2Count = 0; 
  $(".button2").click(function() { 
    button2Count++;
    console.log("clicked!"); 
    if (button2Count % 2 != 0) {
    $("#note-adder-3").css('display', 'block');
    $("#popup-container").css('display', 'block');
    }
    if (button2Count % 2 == 0 ) {
      $("#note-adder-3").css('display', 'none');
      $("#note-adder-1").css('display', 'none');
      $("#note-adder-2").css('display', 'none');
      $("#popup-container").css('display', 'none');
    }
  });
  var button3Count = 0; 
  $(".button3").click(function() { 
    button3Count++;
    console.log("clicked!"); 
    if (button3Count % 2 != 0) {
    $("#note-adder-1").css('display', 'block');
    $("#popup-container").css('display', 'block');
    }
    if (button3Count % 2 == 0 ) {
      $("#note-adder-3").css('display', 'none');
      $("#note-adder-1").css('display', 'none');
      $("#note-adder-2").css('display', 'none');
      $("#popup-container").css('display', 'none');
    }
  });
 
  

});
/**  CARD SCANNER SENSOR 
utilises serial port data to read the card being scanner and loads them into the system 
*/


/*CAMERA ACCESS https://stackoverflow.com/questions/28189329/embed-camera-frame-in-web-app-html5*/ 
/*if(navigator.getUserMedia()) {
var errorCallback = function(e) {
    console.log('Reeeejected!', e);
  };

  // Not showing vendor prefixes.
  navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {
    var video = document.querySelector('video');
    video.src = window.URL.createObjectURL(localMediaStream);

    // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
    // See crbug.com/110938.
    video.onloadedmetadata = function(e) {
      // Ready to go. Do some stuff.
    };
  }, errorCallback);
}*/
// Your web app's Firebase configuration
