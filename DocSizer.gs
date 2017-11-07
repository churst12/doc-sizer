


function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Start', 'showSidebar')
      .addToUi();
}

function onInstall(e) {
  onOpen(e);
}


function showSidebar() {
  var cache = CacheService.getUserCache();
  cache.remove("wordsShort");
  cache.remove("wordsLong");
  //if(CacheService.getUserCache().get("wordsShort") == null) {
   
    var wordsShort = "isn’t,aren’t,wasn’t,weren’t,haven’t,hasn’t,hadn’t,won’t,wouldn’t,don’t,doesn’t,didn’t,can’t,couldn’t,shouldn’t,mightn’t,mustn’t,I’m,I’ll,I’d,I’ve,I’d,you’re,you’ll,you’d,you’ve,you’d,he’ll,she’ll,it’s,it’ll,we’re,we’ll,we’ve,they’re,they’ll,they’ve,that’s,that’ll,who’s,who’ll,what’s,where’ll,when’s,when’ll,why’ll,why’d,how’s,how’d,how’ll";
    CacheService.getUserCache().put("wordsShort", wordsShort);
    var wordsLong = "is not,are not,was not,were not,have not,has not,had not,will not,would not,do not,does not,did not,can not,could not,should not,might not,must not,I am,I will,I would,I have,I had,you are,you will,you would,you have,you had,he will,she will,it is,it will,we are,we will,we have,they are,they will,they have,that is,that will,who is,who will,what has,where will,when is,when will,why will,why would,how is,how would,how will";
    CacheService.getUserCache().put("wordsLong", wordsLong);
  //}
  var ui = HtmlService.createHtmlOutputFromFile('Sidebar').setTitle('DocSizer');
  DocumentApp.getUi().showSidebar(ui);
}


function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function alphabetize(array) {
   
  
  
}
function printOutput(value) {
   
  
  
}
function getOverflow() {
  
  var lines = data.split('\n');
  for(i=0; i<lines.length; i++){

  }
  return true;
}

function getParagraphs() {
   var body = DocumentApp.getActiveDocument().getBody();
   var paragraphs = body.getParagraphs(); 
   return paragraphs;
}

function getPString(pNum) {
   var body = DocumentApp.getActiveDocument().getBody();
   var paragraphs = body.getParagraphs();
   var pString = paragraphs[pNum].getText();
   var pArray = [pString, pNum];
   return pArray;
  
  
}

function getMargin() {
   var body = DocumentApp.getActiveDocument().getBody();
   var rightM = body.getMarginLeft();
   var leftM = body.getMarginRight();
   return rightM + leftM;
  
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

function wordExpandWithoutQuotes() {
    var body = DocumentApp.getActiveDocument().getBody();
    var wordsShort = getWordsShortArray();
    var wordsLong = getWordsLongArray();
    for(var i=0; i<wordsShort.length; i++) {
       var leftQRange = body.findText('“');
       var rightQRange = body.findText('”');
      Logger.log("leftRange: " + leftQRange.getStartOffset())
      // body.replaceText(wordsShort[i], wordsLong[i]);
    }
    
    return true;
}

function wordContract() {
    var body = DocumentApp.getActiveDocument().getBody();
    var wordsShort = getWordsShortArray();
    var wordsLong = getWordsLongArray();
    for(var i=0; i<wordsLong.length; i++) {
       body.replaceText(wordsLong[i], wordsShort[i]);
    }
    
    return true;
}

function settingsPage() {
   var ui = HtmlService.createHtmlOutputFromFile('Settings')
   .setTitle('DocSizer - Settings')
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
  Logger.log(wordsShortArray.length);
   return wordsShortArray;
  
}

function getWordsLongArray() {
   var wordsLongValue = CacheService.getUserCache().get("wordsLong");
   var wordsLongArray = wordsLongValue.split(',');
  Logger.log(wordsLongArray.length);
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
   Logger.log("before removing cache, cache length: " + cache.get("wordsShort").length);
   Logger.log("before removing cache, cache length: " + cache.get("wordsLong").length);
   cache.remove("wordsShort");
   cache.remove("wordsLong");
   Logger.log("putting into cache, short length: " + wordShortString.length);
   Logger.log("putting into cache, long length: " + wordLongString.length);
   cache.put("wordsShort", wordShortString);
   cache
   
   
   
   .put("wordsLong", wordLongString);
}

function lineSpacing(value) {
  var body = DocumentApp.getActiveDocument().getBody();
  var paragraphs = body.getParagraphs();
  for(var i=0; i<paragraphs.length; i++) {
     //Logger.log(paragraphs[i]);
     paragraphs[i].setLineSpacing(value);
  }
  
  
}

function showText() {
   var body = DocumentApp.getActiveDocument().getBody();
   var paragraphs = body.getParagraphs();

  return paragraphs[0].getIndentStart();
}

function changeFont(font, fontSize) {
   var body = DocumentApp.getActiveDocument().getBody();
   var text = body.editAsText();
   text.setFontFamily(font);
   text.setFontSize(parseInt(fontSize));
  
}

function lineOverflow(pNum, counter) {
   var body = DocumentApp.getActiveDocument().getBody();
   var paragraphs = body.getParagraphs();
   var notifier = "";
   for(var i=1; i<counter; i++) {
      notifier = notifier + '@';
   }
   paragraphs[pNum].appendText(notifier);
   var wordRange = paragraphs[pNum].findText(notifier);
   var wordsAppended = wordRange.getElement().asText();
   wordsAppended.setBackgroundColor('#ffff00');
}

function setWordCache( value) {
  
  
}

function setOverflowCache(value) {
   cache =  CacheService.getUserCache();
   cache.remove("overflowSpacing");
   cache.put("overflowSpacing", value);
  
  
}

function getOverflowCache() {
  cache =  CacheService.getUserCache();
  return cache.get("overflowSpacing"); 
}

function periodSpace() {
   var body = DocumentApp.getActiveDocument().getBody();
   body.replaceText('[.] ', '.  ')
}

function marginSet(side, value) {
  var body = DocumentApp.getActiveDocument().getBody();
  var ptValue = parseInt(value * 72);
  Logger.log(value);
  Logger.log(ptValue);
  if(side === "top") {
     body.setMarginTop(ptValue);
  }
  if(side === "bottom") {
     body.setMarginBottom(ptValue);
  }
}










