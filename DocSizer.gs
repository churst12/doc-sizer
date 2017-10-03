
function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Start', 'showSidebar')
      .addToUi();
}

function onInstall(e) {
  onOpen(e);
}

function showSidebar() {
  var ui = HtmlService.createHtmlOutputFromFile('Sidebar').setTitle('Essay Sizer');
  DocumentApp.getUi().showSidebar(ui);
}


function printText() {
  var document = DocumentApp.getActiveDocument();
  var data = document.getBlob().getDataAsString();
  var lines = data.split('\n');
  for(i=0; i<lines.length; i++){

  }
  return lines;
}

function punctReplace() {
   var document = DocumentApp.getActiveDocument();
   var text = document.getBody().editAsText();
   var fSize = text.getFontSize();
   return text.findText(".").getElement().asText();
  
}