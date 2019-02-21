import json
from pprint import pprint
import pandas

with open('gapminder.json') as f:
    gapminder_data = json.load(f)

income_df = pandas.read_csv("income.csv")

# modify only stats, not pieces

names = []


for i in range(len(gapminder_data["pieces"])):
	item = gapminder_data["pieces"][i]
	name = item["name"]
	if True:
		series = income_df.loc[income_df['country'] == name]

		for j in range(len(item["states"])):
			t = str(int(item["states"][j]["t"]))
			if len(series[t].values) > 0:
				item["states"][j]["income"] = str(series[t].values[0])
			else:
				names.append(name)
				break;
				

gapminder_data["pieces"] = [item for item in gapminder_data["pieces"] if item["name"] not in names]

	

with open('gapminder.augmented.json','w') as f:
	json.dump(gapminder_data,f)
