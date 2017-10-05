/**
 * Go through all keywords and label bad performers
 */


function main() {
  AdWordsApp.createLabel('Bad Performer')

  var keywordIterator = AdWordsApp.keywords()
    .withCondition('Clicks = 0')
    .forDateRange('LAST_7_DAYS')
    .get()

  while (keywordIterator.hasNext()) {
    var keyword = keywordIterator.next()
    keyword.applyLabel('Bad Performer')
  }
}
