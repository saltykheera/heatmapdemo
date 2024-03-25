import json
import matplotlib.pyplot as plt
import numpy as np

# Read JSON data from file
with open('click_data.json', 'r') as f:
    json_data = json.load(f)

# Extract "div" values
div_values = [entry["div"] for entry in json_data]

# Count the frequency of each "div" value
div_counts = {}
for div in div_values:
    div_counts[div] = div_counts.get(div, 0) + 1

# Prepare data for heatmap
unique_divs = sorted(set(div_values))
heatmap_data = np.zeros((len(unique_divs),))
for i, div in enumerate(unique_divs):
    heatmap_data[i] = div_counts.get(div, 0)

# Plot heatmap
plt.figure(figsize=(10, 6))
plt.barh(unique_divs, heatmap_data, color='skyblue')
plt.xlabel('Frequency')
plt.ylabel('Div')
plt.title('Heatmap of Div Frequencies')
plt.grid(axis='x')
plt.show()
