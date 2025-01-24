const fs = require('fs');
const path = require('path');

const uploadFolder = path.join(__dirname, 'uploads');
const uploadPdfFolder = path.join(uploadFolder, 'pdfs');

const deleteOldFiles = () => {
    const TEN_MINUTES = 10 * 60 * 1000; // 10 minutes in milliseconds
    fs.readdir(uploadPdfFolder, (err, files) => {
        if (err) {
            console.error('Error reading upload PDF folder:', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(uploadPdfFolder, file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }

                const now = Date.now();
                const fileAge = now - stats.mtimeMs;

                if (fileAge > TEN_MINUTES) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error(`Error deleting file: ${file}`, err);
                        } else {
                            console.log(`Deleted old file: ${file}`);
                        }
                    });
                }
            });
        });
    });
};

module.exports = {deleteOldFiles};
