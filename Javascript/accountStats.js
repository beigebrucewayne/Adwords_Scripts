/***
 *
 * Get account data for the prior day
 *
 * by: kade killary
 * kade.killary@xmedia.com
 * license: MIT
 *
 */

function main() {
  getCurrentAccountDetails()
}

var SPREADSHEET_URL = ''
var SHEET = 'Sheet1'

function getCurrentAccountDetails() {
  // get account + data
  // get data for yesterday
  var currentAccount = AdWordsApp.currentAccount()
  var stats = currentAccount.getStatsFor('YESTERDAY')
 
  // getting data
  var impr = stats.getImpressions()
  var clicks = stats.getClicks()
  var ctr = stats.getCtr()
  var cpc = stats.getAverageCpc()
  var cost = stats.getCost()
  var pos = stats.getAveragePosition()
  
  // Get the date
  var now = new Date();
  // Subtract one day from it
  now.setDate(now.getDate()-1)
  var month = now.getUTCMonth() + 1 //months from 1-12
  var day = now.getUTCDate()
  var year = now.getUTCFullYear()
  var newdate = day + "/" + month + "/" + year
  
  // grab spreadsheet
  var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL)
  var sheet = ss.getSheetByName(SHEET)
  
  // appendRow() -> takes an Array
  var dataArray = new Array(newdate, impr, clicks, ctr, cpc, cost, pos)
  // write data -> spreadsheet
  sheet.appendRow(dataArray)
}
