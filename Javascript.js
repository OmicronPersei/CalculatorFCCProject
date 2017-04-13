/*global $, jQuery, navigator*/
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 2, maxerr: 50, white: true  */

function Calculator() {
  "use strict";
  
  this.userInputString = "";
  var oThis = this;
  
  var evaluateExpression = function(expression) {
    if ((expression !== undefined) && (expression !== "")) {
      if (String(expression).match(/^-\d+/)) {
        expression = String(expression).replace(/^-/, "0-");
      }
      var numberTokens = String(expression).match(/\d+\.\d+|\d+/g);
      var nonNumberTokens = String(expression).match(/[^\d\.]/g);

      var invalidInputStr = "Invalid input.";

      //Check that there are no more than one single operator in between numbers.
      var errenousOperatorTokens = String(expression).match(/\D{2,}/g);

      if (errenousOperatorTokens !== null) {
        var errenousOperatorTokensStr = errenousOperatorTokens.join(",");

        return invalidInputStr;
      }

      if (numberTokens !== null) {
        var acc = parseFloat(numberTokens[0], 10);
        var i;

        if (nonNumberTokens !== null) {
          if ((numberTokens.length - 1) === nonNumberTokens.length) {
            for (i = 1; i < numberTokens.length; ++i) {
              switch (nonNumberTokens[i-1]) {
                case "+":
                  acc += parseFloat(numberTokens[i], 10);
                  break;

                case "-":
                  acc -= parseFloat(numberTokens[i], 10);
                  break;

                case "*":
                  acc *= parseFloat(numberTokens[i], 10);
                  break;

                case "\/":
                  acc /= parseFloat(numberTokens[i], 10);
                  break;

                default:
                  return "Invalid operation: " + nonNumberTokens[i-1];
              }
            }
          } else {
            return invalidInputStr;
          }
          return acc;
        } else {
          return numberTokens[0];
        }
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
        
      case "(clr)":
        oThis.userInputString = "";
        return "";
        
      case "(del)":
        if (oThis.userInputString) {
          oThis.userInputString = oThis.userInputString.substr(0, oThis.userInputString.length - 1);
        }
        return oThis.userInputString;
        
      default:
        if (oThis.userInputString) {
          oThis.userInputString += buttonString;
        } else {
          oThis.userInputString = buttonString;
        }
        
        return oThis.userInputString;
    }
  };
}

function setupCalculator() {
  "use strict";
  
  var calc = new Calculator();
  
  $("#calculatorBody").on("click", ".calcButton", function(e) {
    var calcButtonValue = e.target.parentElement.getAttribute("calcButtonValue");
    
    if (calcButtonValue) {
      var userDisplay = calc.buttonPress(calcButtonValue);
      
      var calcInputText = $("#calculatorBody .calculatorInputText");
      
      if (userDisplay === undefined) {
        userDisplay = "";
      }
      
      calcInputText.html("<span>" + userDisplay + "</span>");
      calcInputText.textfill(40);
    }
  });
}

$(document).ready(function() {
  setupCalculator();
});