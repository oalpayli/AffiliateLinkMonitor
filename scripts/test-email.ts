import { sendAlertEmail } from '../lib/email.ts';

async function testEmail() {
    console.log('📧 Testing Email Alert\n');

    const testData = {
        monitorUrl: 'https://amzn.to/341eGEK',
        scanId: 'test-scan-123',
        brokenLinks: [
            { href: 'https://amzn.to/341eGEK', statusCode: 404 },
            { href: 'https://amazon.com/product/broken', statusCode: 404 }
        ],
        oosLinks: [
            { href: 'https://amazon.com/product/oos', statusCode: 200 }
        ]
    };

    console.log('Sending test email with:');
    console.log(`  Broken Links: ${testData.brokenLinks.length}`);
    console.log(`  OOS Links: ${testData.oosLinks.length}`);
    console.log('');

    await sendAlertEmail('test@example.com', testData);

    console.log('\n✅ Email sent (check console output above for simulation)');
}

testEmail().catch(console.error).finally(() => process.exit(0));
