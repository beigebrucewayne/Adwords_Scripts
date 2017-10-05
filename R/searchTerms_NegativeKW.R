#####
# SearchTerms -> Negative Exact KW
#
# Purpose: take AdWords Search Term Report and filter for terms
# with 1 - 20 ( ) and 0 ( ). Next, turn these terms into exact matches
# by appending [ ] around each term. Then, you will upload said list
# to AdWords.
#
# Thesis: by adding more and more terms as negative exact matches
# you're making your spend incrementally more efficient. Each time
# you patch areas of inefficient spend. Ideally, this ensures that 
# spend is being allocated with maximum benefit.
#
# by: kade killary
# contact: kade.killary@xmedia.com
# license: MIT
# date: October 3, 2017
#####

# TODO: strip first two rows out of csv before analysis
# TODO: user input for file path -> pass to function

library(tidyverse)

search.terms  <- read_csv('/Users/Kade.Killary/Desktop/searchterms.csv')

# rename columns, get rid of spaces
search.t  <- rename(search.terms, search_term = `Search term`, match_type = `Match type`, added_excluded = `Added/Excluded`, campaign = Campaign, ad_group = `Ad group`, impr = Impr., avg_cost = `Avg. cost`, cost = Cost, clicks = Clicks, ctr = CTR, conv = Conversions)

# x <- c("10%","5%")
# as.numeric(sub("%","",x))/100

# getting rid of % sign in ctr column
ctr.remove.percent  <- search.t$ctr
fixed.ctr  <- as.numeric(sub("%", "", ctr.remove.percent))/100

# add column -> tibble
st.fixed.ctr  <- add_column(search.t, fixed_ctr = fixed.ctr)

# filter df for search terms with 0 (ctr or conv)
zero.terms  <- st.fixed.ctr %>%
  filter(clicks < 5 | impr > 20)

# get string of search terms
zero.search.terms  <- zero.terms$search_term

exact.match  <- function(x) {
  print(paste("[", x[i], "]"))
}

exact.match.terms  <- zero.search.terms %>%
  map(exact.match)
