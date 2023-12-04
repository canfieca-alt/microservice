from flask import Flask, request, render_template, jsonify
import random

app = Flask(__name__)

items_list = []

@app.route("/")
def main():
    return render_template('index.html')

@app.route('/make_request', methods=['POST'])
def modify_data():
    data = request.get_json()
    print(f"BEEN HIT WITH REQUEST: {data['original']}")

    coordinates = data['original']
    item_name = list(coordinates.keys())[0]
    item_probability = coordinates[item_name]

    # Add the item to the list
    items_list.append((item_name, item_probability))

    # Choose an item based on probability
    chosen_item = choose_item(items_list)

    # Return the chosen item
    modified_data = {'result': chosen_item}
    return jsonify(modified_data)

def choose_item(items):
    total_probability = sum(prob for _, prob in items)
    rand_num = random.uniform(0, total_probability)

    cumulative_prob = 0
    for item, prob in items:
        cumulative_prob += prob
        if rand_num <= cumulative_prob:
            return f"Chosen item: {item} with probability: {prob}"

if __name__ == "__main__":
    app.run(debug=True, port=12121)
