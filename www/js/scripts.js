function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.onreadystatechange = function () {
  var state = document.readyState;
  if (state == 'interactive') {
       document.getElementById('contents').style.visibility="hidden";
  } else if (state == 'complete') {
      setTimeout(function(){
         document.getElementById('interactive');
         document.getElementById('load').style.visibility="hidden";
         document.getElementById('contents').style.visibility="visible";
      },1000);
  }
}

$(function() {
  $('#signature-div').signature();
  $('#signature-div').signature({guideline: true});
  $("#submit-signature").hide();
  $('#signature-div').signature({ 
    change: function(event, ui) { 
      if($('#signature-div').signature('isEmpty')==true) {
        $('#submit-signature').hide();
      }
      else if($('#signature-div').signature('isEmpty')==false) {
        $('#submit-signature').show();
      }
    }}); 
  $('#clear').click(function() {
    $('#signature-div').signature('clear');
  });
  $('#reset').click(function() {
    $('#signature-div').signature('clear');
  });
  $('#json').click(function() {
    alert($('#signature-div').signature('toJSON'));
  });
  $('#svg').click(function() {
    alert($('#signature-div').signature('toSVG'));
  });
});

$(function (event, view, data) {
// Remove #field_1 so it works for ALL inputs
    $('input').keyup(function() {
        this.value = capitalizeFirstLetter(this.value);
    });
    $('input').on('focus', function() { $(this).blur(); });
    
    $('input#firstname').on('focus', function() {
      $('input#firstname').addClass('focused');
      // $('input#lastname').removeClass('focused');
    });

    $('input#lastname').on('focus', function() {
      $('input#lastname').addClass('focused');
      // $('input#firstname').removeClass('focused');
    });
    
    $('input#email').on('focus', function() {
      $('input#email').addClass('focused');
      // cordova.plugins.Keyboard.close();
    });
    
    $('input#phone').on('focus', function() {$('input#phone').addClass('focused')});
    
    $('input#street').on('focus', function() {$('input#street').addClass('focused')});
    
    $('input#city').on('focus', function() {$('input#city').addClass('focused')});
    
    $('input#zip').on('focus', function() {$('input#zip').addClass('focused')});

    $('input#otherinsurance').on('focus', function() {$('input#otherinsurance').addClass('focused')});

    $('input#password').on('focus', function() {$('input#password').addClass('focused')});

});