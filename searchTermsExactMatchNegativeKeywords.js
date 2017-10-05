/***
 *
 * AdWords Script:
 * Search Terms -> Exact Negative Match Keywords
 *
 *
 * The goal of this script is to find terms that
 * are draining your account. It grabs the search term
 * report and adds terms that are sub-optimal as
 * exact match negative keywords in the AdGroup. Ideally,
 * it should lower your CPC, while saving you a good
 * amount of spend to further allocate elsewhere.
 *
 *
 * by: Kade Killary
 * contact: kade.killary@xmedia.com
 * license: MIT
 * date: October 3, 2017
 *
 ***/


function main () {
  getAllAdGroups()
}

function getAllAdGroups () {
  var DATE_RANGE = 'LAST_30_DAYS'
  var CONDITION = 'Impressions > 0'
  var adGroupIterator = AdWordsApp.adGroups()
  	.withCondition(CONDITION)
  	.forDateRange(DATE_RANGE)
  	.get()
  while (adGroupIterator.hasNext()) {
    var adGroup = adGroupIterator.next()
    runReport(adGroup.getName())
  }
}

function runReport (adGroupName) {
  /*
   * Depending on terms you want to filter for
   * you'll need to add them in your AWQL query
   *
   */
  var report = AdWordsApp.report(
  'SELECT AdGroupName, Query, Clicks, Conversions ' +
  'FROM SEARCH_QUERY_PERFORMANCE_REPORT ' +
  'WHERE AdGroupName = "'+adGroupName+'" ' +
  'DURING LAST_30_DAYS')

  var zeroSearchTerms = []
  var rows = report.rows()
  while (rows.hasNext()) {
    var row = rows.next()
    /*
     * Decide on what terms you want to filter for
     *
     * Terms with Clicks < 5
     * Terms with Impressions > 50 and Clicks < 5
     * Terms with CTRs < 5%
     *
     */
    if (row['Clicks'] < 10 || row['Conversions'] < 1) {
      zeroSearchTerms.push(row['Query'])
    } else {
      continue
    }
  }
  var exactMatchNegKW = []
  for (var i = 0; i < zeroSearchTerms.length; i++) {
    exactMatchNegKW.push('['+zeroSearchTerms[i]+']')
  }
  addNegativeKWToAdGroup(adGroupName, exactMatchNegKW)
}

function addNegativeKWToAdGroup(nameOfAdGroup, arrayOfNegKW) {
  for (var i = 0; i < arrayOfNegKW.length; i++) {
    var kwToAdd = arrayOfNegKW[i]
    var adGroupIterator = AdWordsApp.adGroups()
      .withCondition('Name = "'+nameOfAdGroup+'"')
      .get()
    if (adGroupIterator.hasNext()) {
      var adGroup = adGroupIterator.next()
      adGroup.createNegativeKeyword(kwToAdd)
    }
  }
}
