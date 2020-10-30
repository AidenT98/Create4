
 
  console.log("Helllooo!");

  $("#closer").click(function() { 
    console.log("clicked!"); 
    $(this).parent().remove();
  });
$(document).ready(function() {
  $("#add-note-click").click(function() {
    $(".add-a-note").css('display', 'none');
  });
  $("#add-note-click").click(function() { 
    $("#popup-container").css('display', 'none');
    $(this).parent().parent().parent().parent().css('display', 'none');
  }); 
  $(".circle").click(function() { 
    $("#popup-container").css('display', 'none');
    $(this).parent().parent().css('display', 'none');
  }); 
  $(".yes-no").click(function() { 
    $("#popup-container").css('display', 'none');
    $(this).parent().css('display', 'none');
  }); 


  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  
  $("#note-input-form form").submit(function(event) {
    event.preventDefault();

   
   var firstName = $("#input:checked").val(); 
    var note = $("#text").val();
    console.log(firstName);
		console.log(note);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('note', note);
    console.log(localStorage);
   if (localStorage != null) {
    var notestring = "<div class=note6> <h1>"+ localStorage.getItem('firstName') + "</h1>" + "<h2>" + formatAMPM(new Date)+ " Today" + "</h2>" + "<h3>" + localStorage.getItem('note') + "</h3> </div>";
    

    $("#note-template").append(notestring);
    $("#note6").append();
    $("#note6").append("<div class=closer>  X </div>");
  
   }
  });
  var notecount = 0;
  $("#note-input-form-2 form").submit(function(event) {
    notecount++; 
    event.preventDefault();

   
   var firstName = $("#input:checked").val(); 
    var note = $("#text").val();
    console.log(firstName);
		console.log(note);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('note', note);
    console.log(localStorage);
   if (localStorage != null) {
    var notestring =  "<h1>" + "To: " + localStorage.getItem('firstName') + "</h1>" + "<h2>" + formatAMPM(new Date)+ " Today" + "</h2>" + "<h3>" + localStorage.getItem('note') + "</h3>";
    
    if (notecount == 1) {
    $(".note-add5").append(notestring);
    $("#note6").append();
    $("#note6").append("<div class=closer>  X </div>");
    }
    if (notecount == 2) {
      $(".note-add6").append(notestring);
     
      }
  
   }
  });
  
  $("#capture").click(function() {
    
    var notestring = "<div class=note6>   <h1> Lenord </h1> "+ formatAMPM(new Date) + " Photo By Current Users" + "</div>"; 
    
    $("#note-template").append(notestring);

  
  

  });
});
  

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
        //  $.each(data, function(i, f) {
      
               var person1; 
                var time1;
                var details1;
                var tblRow1;
     
         
      
              for (var k = 0; data.length > k; k++) {
                person1 = data[k].person; 
                time1 = data[k].time; 
                details1 =  data[k].notedetails; 
                tblRow1 =  "<h1>" + person1 + "</h1>" +
                "<h2>" + time1 + "</h2>" + "<h3>" + details1 + "</h3>" + "</div";
                
            
                if (k == 0 ) {
                  //console.log(tblRow1);
                 $(".note-add1").append(tblRow1);
                    
               //$(".note1").append("<div class=closer>  </div>");
               }
               if (k == 1) {
                 $(".note-add2").append(tblRow1);
             //    $(".note2").append("<div class=closer>  </div>");
               
               }
               if (k == 2 ) {
                $(".note-add3").append(tblRow1);
              //   $(".note3").append("<div class=closer>  </div>");
              //   $(".closer").append("X");
               }
               if (k == 3 ) {
               $(".note-add4").append(tblRow1);
               //  $(".note4").append("<div class=closer>  </div>");
               //  $(".closer").append("X");
               }
               if (k == 4) {
                $(".note-add5").append(tblRow1);
                // $(".note5").append("<div class=closer>  </div>");
                // $(".closer").append("X");
               }
             
              }
            
           

 
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
  var button4Count = 0; 
  $(".add").click(function() { 
    button4Count++;
    console.log("clicked!"); 
    if (button4Count % 2 != 0) {
    $(".add-a-note").css('display', 'block');
    }
    if (button4Count % 2 == 0 ) {
      $(".add-a-note").css('display', 'none');
    }
  });
  var button5Count = 0; 
  $(".button4").click(function() { 
    button5Count++;
    console.log("clicked!"); 
    if (button5Count % 2 != 0) {
      $("#note-adder-4").css('display', 'block');
      $("#popup-container").css('display', 'block');
    }
    if (button5Count % 2 == 0 ) {
      $("#note-adder-4").css('display', 'none');
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
