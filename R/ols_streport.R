library(tidyverse)

data  <- read_csv('~/Desktop/streport.csv')

data  <- rename(data, search.term = `Search term`, match.type = `Match type`, ad.group = `Ad group`, cpc = `Avg. CPC`, cost.conv = `Cost / conv.`)

names(data)
#  [1] "search.term"    "match.type"     "Added/Excluded" "Campaign"      
#  [5] "ad.group"       "Impr."          "Cost"           "Clicks"        
#  [9] "CTR"            "cpc"            "Conversions"    "cost.conv"     

model1  <- lm(Clicks ~ CTR + Impr. + cost.conv + cpc, data)
summary(model1)

model1  <- lm(Clicks ~ Impr., data)
ggplot(model1, aes(Clicks, Impr.)) +
  geom_point() +
  geom_smooth(method=lm)

model2  <- lm(Clicks ~ ., data)
