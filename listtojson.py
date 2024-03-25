import json

# Read JSON data from file
with open('click_data.json', 'r') as f:
    json_data = json.load(f)

# Extract "div" values and create the list
data = [{"div": entry["div"]} for entry in json_data]

# Print the resulting list
print(data)
