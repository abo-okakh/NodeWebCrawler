const fs = require('fs')

function JsonWrite(filePath, data) {
    try {
        let existingData = {};

        if (fs.existsSync(filePath)) {
            const jsonData = fs.readFileSync(filePath, 'utf-8');
            try {
                existingData = JSON.parse(jsonData);
            } catch (parseError) {
                console.error('Error parsing existing JSON data:', parseError);
                return;
            }
        }

        const updatedData = { ...existingData, ...data, timestamp: new Date().toISOString() };
        const updatedJsonData = JSON.stringify(updatedData, null, 2);
        fs.writeFileSync(filePath, updatedJsonData, 'utf-8');

        console.log('Data appended to', filePath, 'at', updatedData.timestamp, ':', data);
    } catch (error) {
        console.error('Error appending data to', filePath, ':', error);
    }
}

function JsonRead(filePath) {
    try {
        let existingData = {};

        if (fs.existsSync(filePath)) {
            const jsonData = fs.readFileSync(filePath, 'utf-8');
            try {
                existingData = JSON.parse(jsonData);
            } catch (parseError) {
                console.error('Error parsing existing JSON data:', parseError);
                return existingData;
            }
        }

        return existingData;
    } catch (error) {
        console.error('Error reading data from', filePath, ':', error);
        return {}; // Return an empty object in case of an error
    }
}

function JsonSearch(filePath, name) {
    const data = JsonRead(filePath);
    if (data && typeof data === 'object') {
        return data[name];
    } else {
        console.error('Error searching for data in JSON:', filePath);
        return undefined;
    }
}

module.exports = {
    JsonWrite,
    JsonRead,
    JsonSearch
};
