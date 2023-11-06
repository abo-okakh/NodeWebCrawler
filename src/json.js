const fs = require('fs')
function JsonWrite(path,data) {
    try {
        // Specify the file path
        const filePath = path;

        let existingData = {};

        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // Read the existing JSON data from the file
            const jsonData = fs.readFileSync(filePath, 'utf-8');

            try {
                // Parse the JSON data into a JavaScript object
                existingData = JSON.parse(jsonData);
            } catch (parseError) {
                console.error('Error parsing existing JSON data:', parseError);
                return;
            }
        }

        // Merge the existing data with the new data
        const updatedData = { ...existingData, ...data };

        // Convert the merged data back to a JSON string
        const updatedJsonData = JSON.stringify(updatedData, null, 2);

        // Write the updated data back to the JSON file
        fs.writeFileSync(filePath, updatedJsonData, 'utf-8');

        console.log('Data appended to data.json:', data);
    } catch (error) {
        console.error('Error appending data to data.json:', error);
    }
}
function JsonRead(path) {
    try {
        // Specify the file path
        const filePath = path;

        let existingData = {};

        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // Read the existing JSON data from the file
            const jsonData = fs.readFileSync(filePath, 'utf-8');

            try {
                // Parse the JSON data into a JavaScript object
                existingData = JSON.parse(jsonData);
            } catch (parseError) {
                console.error('Error parsing existing JSON data:', parseError);
                return existingData;
            }
        }

        return existingData;
    } catch (error) {
        console.error('Error reading data from data.json:', error);
        return {}; // Return an empty object in case of an error
    }
}

function JsonSearch(name) {
    const data = JsonRead();
    if (data && typeof data === 'object') { // if it is an object then do this if not then u have to use index like data[1] or smh
        return data[name];
    } else {
        return undefined;
    }
}
module.exports = {
    JsonWrite,
    JsonRead,
    JsonSearch
}

