const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const sharp = require("sharp");

function generatePaths(file) {
  const imagePath = path.join(__dirname, "..", "Uploads", file.filename);
  const pdfPath = path.join(
    __dirname,
    "..",
    "Uploads",
    "pdfs",
    `CK_Image_to_PDF_${file.filename.split("-")[0]}.pdf`
  );
  return { pdfPath, imagePath };
}

async function preprocessImage(imagePath, index) {
  const ext = path.extname(imagePath).toLowerCase();
  const supportedFormats = [".jpg", ".jpeg", ".png", ".bmp", ".gif"];

  if (!supportedFormats.includes(ext)) {
    const outputTempPath = `temp-image-${index}.png`;
    await sharp(imagePath).toFormat("png").toFile(outputTempPath);
    return outputTempPath;
  }
  return imagePath;
}

async function convertImagesToSinglePDF(imagePaths, pdfPath) {
  return new Promise(async (resolve, reject) => {
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(pdfPath);
    const tempFiles = [];

    doc.pipe(writeStream);

    for (let index = 0; index < imagePaths.length; index++) {
      let processedImagePath;

      try {
        processedImagePath = await preprocessImage(imagePaths[index], index);
        if (processedImagePath !== imagePaths[index]) {
          tempFiles.push(processedImagePath);
        }
      } catch (err) {
        console.error(
          `Error processing image ${imagePaths[index]}:`,
          err.message
        );
        continue;
      }

      if (index > 0) doc.addPage();
      try {
        doc.image(processedImagePath, {
          fit: [500, 500],
          align: "center",
          valign: "center",
        });
      } catch (err) {
        console.error(
          `Error adding image ${processedImagePath} to PDF:`,
          err.message
        );
      }
    }

    doc.end();

    writeStream.on("finish", () => {
      console.log(`PDF created at: ${pdfPath}`);
      // Cleanup temporary files
      tempFiles.forEach((file) => {
        fs.unlink(file, (err) => {
          if (err) console.error(`Error deleting file ${file}:`, err.message);
          else console.log(`Deleted temporary file: ${file}`);
        });
      });
      resolve();
    });

    writeStream.on("error", (err) => {
      console.error(`Error writing PDF:`, err.message);
      reject(err);
    });
  });
}

module.exports = { generatePaths, convertImagesToSinglePDF };
