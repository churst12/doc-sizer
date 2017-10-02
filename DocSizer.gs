

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
  var paragraphs = document.getBody().getParagraphs();
  var pIndent = [];
  for(i=0; i<paragraphs.length; i++){
    var indent = paragraphs[i].getText();
    pIndent.push(indent);
  }
  return pIndent;
}
