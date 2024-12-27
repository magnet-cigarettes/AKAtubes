// Data array
const data = Array.from({ length: 100 }, (_, i) => ({
    plate: `AB${String(i + 1).padStart(4, "0")}CD`,
    liters: Math.floor(Math.random() * 13) + 3, 
}));

// Display data in table
function displayData() {
    const tableBody = document.querySelector("#data-table tbody");
    data.forEach((item, index) => {
        const row = `<tr>
                        <td>${index + 1}</td>
                        <td>${item.plate}</td>
                        <td>${item.liters} liter</td>
                     </tr>`;
        tableBody.insertAdjacentHTML("beforeend", row);
    });
}

// Search function
function searchPlate() {
    const input = document.querySelector("#plate-input").value.trim().toUpperCase();
    const resultDiv = document.querySelector("#search-result");
    
    // Start timing for iterative search
    const startIterative = performance.now();

    // Iterative search for the first match
    let result = null;
    for (let i = 0; i < data.length; i++) {
        if (data[i].plate === input) {
            result = data[i];
            break; // Exit loop once found
        }
    }

    const endIterative = performance.now();
    const timeIterative = endIterative - startIterative;

    // Start timing for recursive search
    const startRecursive = performance.now();

    // Recursive search function
    function recursiveSearch(arr, target, index = 0) {
        if (index >= arr.length) return null; 
        if (arr[index].plate === target) return arr[index]; 
        return recursiveSearch(arr, target, index + 1); 
    }

    const recursiveResult = recursiveSearch(data, input);
    const endRecursive = performance.now();
    const timeRecursive = endRecursive - startRecursive;

    // Display results
    if (result) {
        resultDiv.innerHTML = `
            <p><strong>Result:</strong> ${result.plate} - ${result.liters} liter</p>
            <p>Execution Time (Iterative): ${timeIterative.toFixed(2)} ms</p>
            <p>Execution Time (Recursive): ${timeRecursive.toFixed(2)} ms</p>
        `;
    } else {
        resultDiv.innerHTML = `
            <p><strong>Result:</strong> Plat nomor yang Anda cari tidak ada</p>
            <p>Execution Time (Iterative): ${timeIterative.toFixed(2)} ms</p>
            <p>Execution Time (Recursive): ${timeRecursive.toFixed(2)} ms</p>
        `;
    }
}

// Initialize data on page load
window.onload = displayData;

// Attach search function to button
document.querySelector("#search-button").addEventListener("click", searchPlate);
