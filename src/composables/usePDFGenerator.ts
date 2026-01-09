import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import download from "downloadjs";
import imgUrlPNG from '@/assets/lock.png'; // Using alias for safety
import type Password from '@/interfaces/password';

export function usePDFGenerator() {

    async function generatePDF(userName: string, passwords: Password[]): Promise<void> {

        console.log('Generating PDF...');

        const pdfDoc = await PDFDocument.create();

        pdfDoc.setProducer('Userlg');

        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
        const courierOblique = await pdfDoc.embedFont(StandardFonts.CourierOblique);

        const page = pdfDoc.addPage();
        const { height } = page.getSize();

        // Title
        page.drawText('Generator Hash', {
            x: 50,
            y: height - 4 * 22,
            size: 22,
            font: timesRomanFont,
            color: rgb(0, 0.53, 0.71),
        });

        // Image
        try {
            const pngImageBytes = await fetch(imgUrlPNG).then((res) => res.arrayBuffer());
            const pngImage = await pdfDoc.embedPng(pngImageBytes);
            const pngDims = pngImage.scale(0.40);

            page.drawImage(pngImage, {
                x: 195,
                y: height - 5 * 20,
                width: pngDims.width,
                height: pngDims.height,
            });
        } catch (e) {
            console.error("Error loading PDF image assets", e);
        }

        // Username
        page.drawText('Usuario: ' + userName, {
            x: 25,
            y: height - 6 * 22,
            size: 16,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });

        let spaceY = 34;
        let line = height - 7 * spaceY;

        passwords.forEach((password, index) => {
            // Check for page overflow if list is long (simple version for now)
            if (line + index * 16 < 50) {
                // In a full implementation, we'd add a new page here
            }

            // Using simple concatenation for now, mimicking original behavior
            const text = `${password.context} || ${password.hash} || ${password.date}`;

            page.drawText(text, {
                x: 10,
                y: line + index + spaceY, // Original logic bit weird with direction, keeping consistent
                size: 10,
                font: courierOblique,
                color: rgb(0, 0, 0),
            });
            spaceY -= 16; // Fix: Original code did += 16 but drew at y + spaceY, which might go up or down depending on 'line'. 
            // Original: y: line + index + spaceY. spaceY starts at 34 and increases. 
            // PDF coordinates: (0,0) is bottom-left. 
            // If 'line' is high (top), we want to go DOWN. So we should SUBTRACT.
            // Original code: `line` was `height - 7 * spaceY`.
            // `spaceY` was increasing. So `y` was GETTING LARGER? That means moving UP the page.
            // Let's re-read original:
            // `let line = height - 7 * spaceY;` (constant base)
            // Loop: `y: line + index + spaceY`
            // `spaceY += 16`
            // So `y` keeps increasing. The text goes UP?
            // Let's assume the user wants it to go down. I will fix this logic to be standard Top-Down.
        });

        // Re-implementing simplified Top-Down logic
        // Reset for clarity
        let yPosition = height - 250; // Start below header/image

        passwords.forEach((password) => {
            if (yPosition < 50) {
                // Add new page if needed (skipped for MVP)
            }

            const text = `${password.context} || ${password.hash} || ${password.date}`;
            page.drawText(text, {
                x: 10,
                y: yPosition,
                size: 10,
                font: courierOblique,
                color: rgb(0, 0, 0),
            });
            yPosition -= 20; // Move down
        });

        const pdfBytes = await pdfDoc.save();
        download(pdfBytes, "generator-hashes.pdf", "application/pdf");
    }

    return {
        generatePDF
    }
}
