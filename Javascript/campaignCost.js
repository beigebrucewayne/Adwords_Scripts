/***
 *
 * Get campaign cost's and have them added
 * to a spreadsheet.
 * 
 * by: kade killary
 * contact: kade.killary@xmedia.com
 * license: MIT
 *
 */

function main () {
  runReport()
}

// enter the spreadsheet url with edit access
var SPREADSHEET_URL = ''
// enter name of sheet -> the name at the bottom of the page
var SPREADSHEET_NAME = ''

function runReport () {
  var report = AdWordsApp.report(
    'SELECT CampaignName, Cost ' +
    'FROM CAMPAIGN_PERFORMANCE_REPORT ' +
    'DURING YESTERDAY')
  var rows = report.rows()
  while (rows.hasNext()) {
    var row = rows.next() 
    var name = row['CampaignName']
    var cost = row['Cost']
    appendRow(name, cost)
  }
}

function appendRow(col1, col2) {
  //Create a date object using the current time
  var now = new Date();
  now.setDate(now.getDate()-1)
  var month = now.getUTCMonth() + 1 //months from 1-12
  var day = now.getUTCDate()
  var year = now.getUTCFullYear()
  // new proper format day/month/year
  var newdate = month + "/" + day + "/" + year

  var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL)
  var sheet = ss.getSheetByName(SPREADSHEET_NAME)
  var color = sheet.getRange('A:A')
  color.setBackground('#FF9999')
  
  // data to be appended to spreadsheet
  // Month - Campaign Name - Cost
  var dataArray = new Array(newdate, col1, col2)
 
  sheet.appendRow(dataArray)
}
