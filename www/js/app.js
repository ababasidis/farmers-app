// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'mgo-angular-wizard', 'onScreenKeyboard'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.close();

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
  });
})

.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
})

.controller('WizardCtrl', function($scope, $window, $q, $timeout, WizardHandler) {

  $scope.canExit = true;
  $scope.stepActive = true;
  $scope.isConnected = false;

  $scope.states = ['New York','------------','Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  $scope.stateselect = $scope.states[0];

  $scope.months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  $scope.monthselect = $scope.months[0];

  $scope.days = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
  $scope.dayselect = $scope.days[0];

  $scope.years = ['1930','1931','1932','1933','1934','1935','1936','1937','1938','1939','1940','1941','1942','1943','1944','1945','1946','1947','1948','1949','1950','1951','1952','1953','1954','1955','1956','1957','1958','1959','1960','1961','1962','1963','1964','1965','1966','1967','1968','1969','1970','1971','1972','1973','1974','1975','1976','1977','1978','1979','1980','1981','1982','1983','1984','1985','1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021']
  $scope.yearselect = $scope.years[0];

  $scope.finished = function() {
      
      // alert("Wizard finished :)");
      $window.location.reload();
  };

  $scope.logStep = function() {
      
      console.log("Step continued");
  };

  $scope.goBack = function() {
      
      WizardHandler.wizard().goTo(0);
  };

  $scope.exitWithAPromise = function() {
      
      var d = $q.defer();
      $timeout(function() {
          d.resolve(true);
      }, 1000);
      return d.promise;
  };

  $scope.exitToggle = function() {
      
      $scope.canExit = !$scope.canExit;
  };

  $scope.stepToggle = function() {
      
      $scope.stepActive = !$scope.stepActive;
  };

  $scope.exitValidation = function() {
      
      return $scope.canExit;
  };

  $scope.focusFirstName = function() {
    console.log('Focus First Name');
    $('#firstname').focus();
    // $('#firstname').click();
  }

  $scope.focusLastName = function() {
    console.log('Focus Last Name');
    $('#lastname').focus();
    // $('#firstname').click();
  }

  $scope.focusEmail = function() {
    console.log('Focus email');
    $('#email').focus();
    // $('#firstname').click();
  }

  $scope.focusPhone = function() {
    console.log('Focus phone');
    $('#phone').focus();
    // $('#firstname').click();
  }

  $scope.focusStreet = function() {
    console.log('Focus street');
    $('#street').focus();
    // $('#firstname').click();
  }

  $scope.focusZIP = function() {
    console.log('Focus ZIP');
    $('#zip').focus();
    // $('#firstname').click();
  }

  $scope.focusCity = function() {
    console.log('Focus city');
    $('#city').focus();
    // $('#firstname').click();
  }

  $scope.focusOtherInsurance = function() {
    console.log('Focus insurance');
    $('#otherinsurance').focus();
    // $('#firstname').click();
  }

  $scope.focusPassword = function() {
    console.log('Focus password');
    $('#password').focus();
    // $('#firstname').click();
  }


  $scope.submitForm = function(_firstname, _lastname, _email, _phone, _month, _day, _year, _street, _state, _city, _zip, _otherinsurance, _allstate, _statefarm, _progressive, _nycm, _erie, _nationwide, _metlife, _liberty, _other) {
    
    $scope.email = _email;


    if(typeof(Storage)!=="undefined") {
      if (localStorage.getItem("1") == null) {
        $scope.previousdata = "First, Last, Email, Phone, Month, Day, Year, Street, State, City, ZIP, Other Insurance, Allstate, Statefarm, Progressive, NYCM, Erie, Nationwide, Metlife, Liberty, other, signature map\r\n";
      }

      if(localStorage.getItem("replyemails")==null || localStorage.getItem("replyemails")=="undefined") {
        $scope.previousemails = 'tbabasidis@gmail.com';
      }

      if(localStorage.getItem("replyemails")!==null) {
        $scope.previousemails = localStorage.getItem("replyemails");
      }

      if(localStorage.getItem("1")!==null) {
        $scope.previousdata = localStorage.getItem("1");
      }
      
      localStorage.setItem("replyemails", $scope.previousemails + ','+_email);
      localStorage.setItem("1", $scope.previousdata +"\r\n"+ _firstname + ", " + _lastname + ", " + _email + ", " + _phone + ", " + _month  + ", " + _day + ", " + _year + ", " + _street + ", " + _city + ", " + _state + ", " + _zip + ", " + _otherinsurance +", AS:" + _allstate + ", SF:" +  _statefarm + ", PG:" + _progressive + ", NY:" + _nycm + ", ER:" + _erie + ", NW:" + _nationwide + ", ML:" + _metlife + ", LR:" + _liberty + ", OT:" + _other + ", " + $('#signature-div').signature('toJSON'));
    } else {
      alert("Sorry! No Web Storage Support. Please run on a browser that supports local storage. ");
    }
  };

  $scope.loadStorage = function() {
    
    // return table;

    document.getElementById('csvimporthint').innerHTML = localStorage.getItem("1");
    document.getElementById('replyemails').innerHTML = localStorage.getItem("replyemails");
  };

  $scope.checkConnectionActive = function() {
    
    if (navigator.onLine) {
      console.log('Device online.');
    } else {
      alert('You must connect to Internet to share data.');
      console('Device offline.');
    }
  };

  $scope.clearLocalStorage = function() {
    
    localStorage.clear();
    $window.location.reload();
    alert('Local storage cleared!');
  };

  $scope.sendAsCSV = function() {

    $scope.csvdata = localStorage.getItem("1");
    var data = localStorage.getItem("1");
    var attached_file = "base64:contactform.csv//"+window.btoa(data);

    // if(window.plugins && window.plugins.emailComposer) {
    //     window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
    //         console.log("Response -> " + result);
    //     }, 
    //     "Farmer's App Contact Form Data", // Subject
    //     '<p>Copy and paste the following key into your web browser to download contact form as CSV: </p> data:text/csv;base64,' + window.btoa(data),                      // Body
    //     ["dwager@dhwagency.com"],    // To
    //     null,                    // CC
    //     null,                    // BCC
    //     true,                   // isHTML
    //     null,                    // Attachments
    //     null);                   // Attachment Data
    //     // alert('Contact form data has been sent! ');
    // }
    window.plugin.email.open({
                to:          ["dwager@farmersagent.com"], // email addresses for TO field
                cc:          null, // email addresses for CC field
                bcc:         null, // email addresses for BCC field
                attachments: attached_file, // file paths or base64 data streams
                subject:    "Farmer's App Contact Form Data", // subject of the email
                body:       "<p>Please download the attached file. </p> <p>If the attachment does not download correctly, copy and paste the following key into your web browser to download contact form as CSV: </p> data:text/csv;base64," + window.btoa(data), // email body (for HTML, set isHtml to true)
                isHtml:    true, // indicats if the body is HTML or plain text
            }, function () {
                console.log('email view dismissed');
            },
            this);   
  };

  $scope.replyAll = function() {



    // window.plugins.emailComposer.open();

    var replyRecipients = localStorage.getItem("replyemails");
    var temp = new Array();
    temp = replyRecipients.split(",");
    // alert(temp);
    console.log(temp);
    // if(window.plugins && window.plugins.emailComposer) {
    //     window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
    //         console.log("Response -> " + result);
    //     }, 
    //     "Thanks for stopping by!", // Subject
    //     '<img src="http://www.athanasiosbabasidis.com/img/Horizontal-Color-Logo.png" alt="David H Wager, LLC" style="width:50%;"><br/>Hi, <p>Thank you so much for stopping by our booth today! The winner of the raffle will be contacted within the next few days.  We hope you win! </p><p>In the meantime, please take a moment to <a href="https://www.facebook.com/dwageragencyfarmersinsurance/">Like our page on Facebook</a> and follow us on <a href="https://www.instagram.com/dhwagency/">Instagram</a> and <a href="https://twitter.com/dhwagency">Twitter</a>.  </p><p>Within the next 24-48 hours, someone from our team will be contacting you to schedule a FREE Farmers Friendly Review.  A FREE Farmers Friendly Review will allow us the opportunity to review your current insurance coverages and look for gaps and savings potential.  There is no obligation or cost to you in this process. </p><p>We’re looking forward to earning your business. </p><p>Thank you,</p><p>Dave, Joe, Nikki & Elizabeth</p><p>The David H. Wager Agency, LLC</p>',                      // Body
    //     ["dwager@dhwagency.com"],    // To
    //     null,                    // CC
    //     temp,                    // BCC
    //     true,                   // isHTML
    //     null,                    // Attachments
    //     null);                   // Attachment Data
    //     // alert('Contact form data has been sent! ');
    // }
    window.plugin.email.open({
                to:          ["dwager@farmersagent.com"], // email addresses for TO field
                cc:          null, // email addresses for CC field
                bcc:         temp, // email addresses for BCC field
                attachments: null, // file paths or base64 data streams
                subject:    "Thanks for Stopping By the Farmers Booth!", // subject of the email
                body:       '<img src="http://www.athanasiosbabasidis.com/img/Horizontal-Color-Logo.png" alt="David H Wager, LLC" style="width:50%;"><br/>Hi, <p>Thank you so much for stopping by our booth today! The winner of the raffle will be contacted within the next few days.  We hope you win! </p><p>In the meantime, please take a moment to <a href="https://www.facebook.com/dwageragencyfarmersinsurance/">Like our page on Facebook</a> and follow us on <a href="https://www.instagram.com/dhwagency/">Instagram</a> and <a href="https://twitter.com/dhwagency">Twitter</a>.  </p><p>Within the next 24-48 hours, someone from our team will be contacting you to schedule a FREE Farmers Friendly Review.  A FREE Farmers Friendly Review will allow us the opportunity to review your current insurance coverages and look for gaps and savings potential.  There is no obligation or cost to you in this process. </p><p>We’re looking forward to earning your business. </p><p>Thank you,</p><p>Dave, Joe, Nikki & Elizabeth</p><p>The David H. Wager Agency, LLC</p>', // email body (for HTML, set isHtml to true)
                isHtml:    true, // indicats if the body is HTML or plain text
            }, function () {
                console.log('email view dismissed');
            },
            this);  
  };

})

.directive('phoneInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0,10);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function() {
                $browser.defer(listener);
            });
        }

    };
})
.filter('tel', function () {
    return function (tel) {
        console.log(tel);
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if(number){
            if(number.length>3){
                number = number.slice(0, 3) + '-' + number.slice(3,7);
            }
            else{
                number = number;
            }

            return ("(" + city + ") " + number).trim();
        }
        else{
            return "(" + city;
        }

    };
})