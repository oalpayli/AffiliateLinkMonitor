
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outputPath = path.join(process.cwd(), 'public', 'guide.pdf');

// Create a document
const doc = new PDFDocument({ margin: 0, size: 'A4' }); // Reset margin for custom layout

// Pipe its output to a file
doc.pipe(fs.createWriteStream(outputPath));

// ==============================
// COLORS
// ==============================
const colors = {
    primary: '#4f46e5', // Indigo 600
    secondary: '#7c3aed', // Violet 600
    dark: '#0f172a', // Slate 950
    text: '#334155', // Slate 700
    textLight: '#94a3b8', // Slate 400
    white: '#ffffff',
    bgLight: '#f8fafc' // Slate 50
};

// ==============================
// HELPER FUNCTIONS
// ==============================
function addHeader(doc, title) {
    doc.save();

    // Top banner
    doc.rect(0, 0, 595.28, 80).fill(colors.dark);

    // Logo text (simulated)
    doc.fontSize(16).fillColor(colors.white).text('LinkMonitor', 50, 30);

    // Page Title
    if (title) {
        doc.fontSize(12).fillColor(colors.textLight).text(title.toUpperCase(), 50, 32, { align: 'right', width: 495 });
    }

    doc.restore();
    doc.y = 100; // Reset content start
}

function addFooter(doc) {
    const bottom = 800;
    doc.save();
    doc.moveTo(50, bottom).lineTo(545, bottom).strokeColor('#e2e8f0').stroke();
    doc.fontSize(10).fillColor(colors.textLight).text('© 2026 Affiliate Link Monitor - www.affiliatelinkmonitoring.com', 50, bottom + 15, { align: 'center' });
    doc.restore();
}

function addSectionTitle(doc, number, title) {
    doc.moveDown(0.5);
    doc.fontSize(18).fillColor(colors.primary).text(`${number}. ${title}`);
    doc.rect(doc.x, doc.y + 5, 50, 3).fill(colors.secondary); // Underline
    doc.moveDown(1.5);
}

function addChecklistItem(doc, text) {
    const x = 60;
    const y = doc.y;

    // Checkbox box
    doc.save();
    doc.rect(x, y, 12, 12).strokeColor(colors.primary).stroke();
    doc.restore();

    // Text
    doc.fontSize(12).fillColor(colors.text).text(text, x + 25, y - 2, { width: 450 });
    doc.moveDown(0.8);
}

// ==============================
// COVER PAGE
// ==============================

// Background
doc.rect(0, 0, 595.28, 841.89).fill(colors.dark);

// Decorative gradient circles (simple solids for PDFKit)
doc.save();
doc.circle(500, 100, 200).fillOpacity(0.1).fill(colors.secondary);
doc.circle(100, 700, 150).fillOpacity(0.1).fill(colors.primary);
doc.restore();

// Cover Text
doc.moveDown(8);
doc.fontSize(14).fillColor(colors.secondary).text('FREE AFFILIATE GUIDE', { align: 'center', letterSpacing: 2 });
doc.moveDown(1);
doc.fontSize(40).fillColor(colors.white).text('AMAZON INFLUENCER', { align: 'center' });
doc.fontSize(40).fillColor(colors.white).text('CHECKLIST 2026', { align: 'center' });
doc.moveDown(1);
doc.fontSize(18).fillColor(colors.textLight).text('Double Your Earnings in 30 Days', { align: 'center' });

// Cover Footer / CTA
doc.moveDown(12);
doc.fontSize(12).fillColor(colors.white).text('Presented by LinkMonitor', { align: 'center' });


// ==============================
// PAGE 2: CHECKLIST
// ==============================
doc.addPage();
addHeader(doc, 'The Basics & Strategy');

addSectionTitle(doc, 1, 'The Profile Basics');
const basics = [
    'Profile Picture: Clear, professional, smiling face (not a logo).',
    'Bio: Clear value proposition. Who are you helping?',
    'Storefront URL: Is it easy to remember? (e.g. amazon.com/shop/yourname)',
    'Social Links: Are all your social profiles linked correctly?'
];
basics.forEach(item => addChecklistItem(doc, item));

doc.moveDown(2);

addSectionTitle(doc, 2, 'Content Strategy');
const strategy = [
    'Vertical Video: Are you posting Reels/TikToks for every product?',
    'Tagging: Tag the EXACT product variant you demonstrate.',
    'Hook: Do the first 3 seconds grab attention?',
    'Call to Action: Tell them where to find the link ("Link in bio").'
];
strategy.forEach(item => addChecklistItem(doc, item));

addFooter(doc);

// ==============================
// PAGE 3: TRAFFIC & MAINTEANCE
// ==============================
doc.addPage();
addHeader(doc, 'Traffic & Maintenance');

addSectionTitle(doc, 3, 'Driving Traffic');
const traffic = [
    'Pinterest: Create Idea Pins for top-performing products.',
    'Instagram Stories: Use "Link" sticker daily.',
    'YouTube Shorts: Repurpose your vertical videos.',
    'Blog/Website: Create "Best X for Y" listicles.'
];
traffic.forEach(item => addChecklistItem(doc, item));

doc.moveDown(2);

// Highlight Section for Maintenance
doc.rect(40, doc.y, 515, 230).fill(colors.bgLight);
doc.fillColor(colors.dark); // Reset color for text insdie box
doc.y += 20;
doc.x = 55; // Indent inside box

addSectionTitle(doc, 4, 'The Silent Killer: Broken Links');
doc.fontSize(11).fillColor(colors.text).text(
    'Did you know 15% of Amazon links break every year? Products go out of stock, pages get deleted, and you lose commission.',
    { width: 480, obit: true }
);
doc.moveDown(1.5);

const maintenance = [
    'Check for 404 Errors: Manually click your top 50 links.',
    'Check for Out of Stock: Ensure promoted items are buyable.',
    'Update Old Links: Replace dead products with similar active ones.',
    'Monitor Tags: Ensure your affiliate tag is still active.'
];
maintenance.forEach(item => addChecklistItem(doc, item));

addFooter(doc);

// ==============================
// PAGE 4: AUTOMATION CTA
// ==============================
doc.addPage();

// Background for CTA Page
doc.rect(0, 0, 595.28, 841.89).fill(colors.bgLight);

doc.y = 250;
doc.fontSize(24).fillColor(colors.primary).text('Want to automate this?', { align: 'center' });
doc.moveDown();
doc.fontSize(14).fillColor(colors.text).text(
    'Stop checking links manually. Use LinkMonitor to scan your entire website or storefront automatically every day.',
    { align: 'center', width: 400, align: 'center' }
);
doc.moveDown(2);

// Simulated Button
const btnWidth = 200;
const btnHeight = 50;
const btnX = (595.28 - btnWidth) / 2;
const btnY = doc.y;
doc.roundedRect(btnX, btnY, btnWidth, btnHeight, 10).fill(colors.secondary);
doc.fillColor(colors.white).fontSize(16).text('Start for FREE', btnX, btnY + 15, { align: 'center', width: btnWidth });
doc.link(btnX, btnY, btnWidth, btnHeight, 'https://www.affiliatelinkmonitoring.com');

doc.moveDown(2);
doc.fontSize(12).fillColor(colors.textLight).text('www.affiliatelinkmonitoring.com', { align: 'center', link: 'https://www.affiliatelinkmonitoring.com' });

// Finalize
doc.end();

console.log('PDF Generated successfully with new design at public/guide.pdf');

