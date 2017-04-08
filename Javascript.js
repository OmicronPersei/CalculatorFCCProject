/*global $, jQuery, navigator*/
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 2, maxerr: 50, white: true  */

function Calculator(DOMID) {
  "use strict";
  
  this.DOMID = DOMID;
  
  var userInputString = "";
  var oThis = this;
  
  var evaluateExpression = function(expression) {
    var numberTokens = expression.split(/\d+/g);
    var nonNumberTokens = expression.split(/\D/g);
    
    //Check that there are no more than one single operator in between numbers.
    var errenousOperatorTokens = expression.split(/\D{2,}/g);
    
    if (errenousOperatorTokens !== null) {
      var errenousOperatorTokensStr = errenousOperatorTokens.join(",");
      
      return "The following inputs are invalid: " + errenousOperatorTokensStr;
    }
    
    var leftToken = undefined;
    
    
  };
  
  this.buttonPress = function(buttonString) {
    switch (buttonString) {
      case "=":
        //blah
        break;
        
      case "CLR":
        //blah
        break;
        
      default:
        oThis.userInputString += buttonString;
        break;
    }
  };
}