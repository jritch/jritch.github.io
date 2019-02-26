import json
from pprint import pprint
import pandas

with open('gapminder.json') as f:
    gapminder_data = json.load(f)

new_vars = [
				["income","income.csv"],
				["child_mortality","child_mortality.csv"],
				["co2_emissions","co2_emissions.csv"],
		   ]


names = []

for var_name, file_name in new_vars:

	df = pandas.read_csv(file_name)

	print df.head()

	# modify only states, not pieces

	for i in range(len(gapminder_data["pieces"])):
		item = gapminder_data["pieces"][i]
		name = item["name"]
		if True:
			series = df.loc[df['country'] == name]

			for j in range(len(item["states"])):
				t = str(int(item["states"][j]["t"]))
				if int(t) <= 2014 and len(series[t].values) > 0:
					item["states"][j][var_name] = str(series[t].values[0])
				elif int(t) <= 2014:
					if int(t) > 1960:
						names.append(name)
						break;
				else:
					continue

print names
gapminder_data["pieces"] = [item for item in gapminder_data["pieces"] if item["name"] not in names]

	

with open('gapminder.augmented.json','w') as f:
	json.dump(gapminder_data,f)
