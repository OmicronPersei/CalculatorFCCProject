/*global $, jQuery, navigator*/
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 2, maxerr: 50, white: true  */

function Calculator(DOMID) {
  "use strict";
  
  this.DOMID = DOMID;
  
  this.userInputString = "";
  var oThis = this;
  
  var evaluateExpression = function(expression) {
    var numberTokens = expression.match(/\d+/g);
    var nonNumberTokens = expression.match(/\D/g);
    
    //Check that there are no more than one single operator in between numbers.
    var errenousOperatorTokens = expression.match(/\D{2,}/g);
    
    if (errenousOperatorTokens !== null) {
      var errenousOperatorTokensStr = errenousOperatorTokens.join(",");
      
      return "The following inputs are invalid: " + errenousOperatorTokensStr;
    }
    
    if (numberTokens !== null) {
      var acc = parseInt(numberTokens[0], 10);
      var i;
      
      if (nonNumberTokens !== null) {
        for (i = 1; i < numberTokens.length; ++i) {
          switch (nonNumberTokens[i-1]) {
            case "+":
              acc += parseInt(numberTokens[i], 10);
              break;
              
            case "-":
              acc -= parseInt(numberTokens[i], 10);
              break;
              
            case "*":
              acc *= parseInt(numberTokens[i], 10);
              break;
              
            case "\/":
              acc /= parseInt(numberTokens[i], 10);
              break;
              
            default:
              return "Invalid operation: " + nonNumberTokens[i-1];
          }
        }
        return acc;
      } else {
        return numberTokens[0];
      }
    }
  };
  
  this.buttonPress = function(buttonString) {
    switch (buttonString) {
      case "=":
        var result = evaluateExpression(oThis.userInputString);
        //Set the user input string to the result, as if the user wants to work with
        //the currently displayed result.
        oThis.userInputString = result;
        return result;
        
      case "CLR":
        oThis.userInputString = "";
        return "";
        
      default:
        oThis.userInputString += buttonString;
        return oThis.userInputString;
    }
  };
}

function calculatorOnClicked(e) {
  "use strict";
  
  console.log(e.target.parentElement.getAttribute("calcButtonValue"));
}

function setupCalculator() {
  "use strict";
  
  $("#calculatorBody").on("click", ".calcButton", calculatorOnClicked);
}

$(document).ready(function() {
  setupCalculator();
});