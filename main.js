// Ensure that the script runs after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const promptForm = document.getElementById('list');
    const responseContainer = document.getElementById('responseContainer');

    function addItem() {
        const itemName = document.getElementById('itemName').value;
        const itemProbability = parseFloat(document.getElementById('itemProbability').value);

        if (!isNaN(itemProbability) && itemName) {
            const locations = { original: { [itemName]: itemProbability } };

            fetch('/make_request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(locations),
            })
                .then(response => response.json())
                .then(data => {
                    responseContainer.innerHTML = data['result'];
                })
                .catch(error => {
                    responseContainer.innerHTML = 'Error occurred. Please check the console for details.';
                    console.error('Error:', error);
                });
        } else {
            responseContainer.innerHTML = 'Invalid input. Please enter both item name and probability.';
        }
    }

    // Attach the addItem function to the button click event
    document.getElementById('addItemBtn').addEventListener('click', addItem);
});
