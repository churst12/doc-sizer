


function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Start', 'showSidebar')
      .addToUi();
}

function onInstall(e) {
  onOpen(e);
}

function showSidebar() {
  if(CacheService.getUserCache().get("wordsShort") == null) {
    var wordsShort = "can’t,don’t,wasn’t,hasn’t";
    CacheService.getUserCache().put("wordsShort", wordsShort);
    var wordsLong = "can not,do not,was not,has not";
    CacheService.getUserCache().put("wordsLong", wordsLong);
  }
  var ui = HtmlService.createHtmlOutputFromFile('Sidebar').setTitle('DocSizer');
  DocumentApp.getUi().showSidebar(ui);
}

function printOutput(value) {
   
  
  
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

function wordExpand() {
    var body = DocumentApp.getActiveDocument().getBody();
    var wordsShort = getWordsShortArray();
    var wordsLong = getWordsLongArray();
    for(var i=0; i<wordsShort.length; i++) {
       body.replaceText(wordsShort[i], wordsLong[i]);
    }
    
    return true;
}

function settingsPage() {
   var ui = HtmlService.createHtmlOutputFromFile('Settings')
   .setTitle('Settings')
   .setWidth(300);
   DocumentApp.getUi().showSidebar(ui);
  
}
function cancelSettings() {
   var ui = HtmlService.createHtmlOutputFromFile('Sidebar')
   .setTitle('DocSizer')
   .setWidth(300);
   DocumentApp.getUi().showSidebar(ui);
  
}

function addWordPrompt() {
   var html = HtmlService.createHtmlOutputFromFile('AddWord')
      .setWidth(400)
      .setHeight(140);
   DocumentApp.getUi() // Or DocumentApp or FormApp.
      .showModalDialog(html, ' ');
}

function getWordsShortArray() {
   var wordsShortValue = CacheService.getUserCache().get("wordsShort");
   var wordsShortArray = wordsShortValue.split(',');
   return wordsShortArray;
  
}

function getWordsLongArray() {
   var wordsLongKey = CacheService.getUserCache().get("wordsLong");
   var wordsLongArray = wordsLongKey.split(',');
   return wordsLongArray;
}

function addWord(wordShort, wordLong) {
   var wordsShortArray = getWordsShortArray();
   var wordsLongArray = getWordsLongArray();
   var included = false;
   for(var i=0; i<wordsShortArray.length; i++) {
     if(wordsShortArray[i].equals(wordShort)) {
         included = true;
         Logger.log("duplicate word contraction has been requested");
     }
   }
   if(included != true) {
      wordsShortArray.push(wordShort); 
      wordsLongArray.push(wordLong);
   }
   var wordShortString = wordsShortArray.join(",");
   var wordLongString = wordsLongArray.join(",");
   cache = CacheService.getUserCache();
   cache.remove("wordsShort");
   cache.remove("wordsLong");
   cache.put("wordsShort", wordShortString);
   cache.put("wordsLong", wordLongString);
   Logger.log(cache.get("wordsShort"));
}





