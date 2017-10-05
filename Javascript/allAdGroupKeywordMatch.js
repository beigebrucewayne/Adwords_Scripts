function main () {
  getAlladGroups()
}

function getAlladGroups() {

  var adGroupIterator = AdWordsApp.adGroups().get();
  Logger.log('Total adGroups found : ' + adGroupIterator.totalNumEntities());
  while (adGroupIterator.hasNext()) {
    var adGroup = adGroupIterator.next();
 
    getKeywordsInAdGroup(adGroup.getName());
  }
}

function getKeywordsInAdGroup(adGroupName) {
  var keywordIterator = AdWordsApp.keywords()
      .withCondition('AdGroupName = "'+adGroupName+'"')
      .get();
  if (keywordIterator.hasNext()) {
    while (keywordIterator.hasNext()) {
      var keyword = keywordIterator.next();
      var line = keyword.getText()
      var match = keyword.getMatchType()
      
      appendARow(adGroupName, line, match)
    }
  }
}

function appendARow(agName, lineToEnter, matchType) {
  var SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1UoZT9E599ZEHfE46apcckjEJr39SZbf3DkvrW6CybKU/edit?usp=sharing';

  var SHEET_NAME = 'Sheet1';

  var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var sheet = ss.getSheetByName(SHEET_NAME);

  var arrLine = new Array(agName, lineToEnter, matchType)
  sheet.appendRow(arrLine);
}
