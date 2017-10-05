
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
  return true;
}

function punctReplace(findMe, fSize) {
   var body = DocumentApp.getActiveDocument().getBody();
   var foundElement = body.findText(findMe);

   while (foundElement != null) {
        // Get the text object from the element
        var foundText = foundElement.getElement().asText();

        // Where in the Element is the found text?
        var start = foundElement.getStartOffset();
        var end = foundElement.getEndOffsetInclusive();

        // Change the font size
        foundText.setFontSize(start, end, fSize);

        // Find the next match
        foundElement = body.findText(findMe, foundElement);
   }
   return true;
}
function wordReplace(findMe) {
    var body = DocumentApp.getActiveDocument().getBody();
    body.replaceText("don’t", "do not");
    return true;
}