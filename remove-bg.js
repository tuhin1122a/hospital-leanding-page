const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');
const path = require('path');

async function main() {
  const inputPath = path.join(__dirname, 'public', 'hero-doctor.png');
  const outputPath = path.join(__dirname, 'public', 'cutout.png');
  
  console.log('Loading image and removing background...');
  try {
    const fileBuffer = fs.readFileSync(inputPath);
    // Needs Uint8Array
    const uint8Array = new Uint8Array(fileBuffer);
    
    // Process image
    const blob = await removeBackground(uint8Array, {
      model: "isnet", // Use the large model for best quality
      output: {
        format: 'image/png',
        quality: 1.0,
      }
    });
    
    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync(outputPath, buffer);
    console.log('Background removed successfully and saved to cutout.png!');
  } catch(e) {
    console.error('Failed to remove background:', e);
  }
}

main();
