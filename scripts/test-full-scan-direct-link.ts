import { performFullScan } from '../lib/scraper/service.ts';

async function testFullScanWithDirectLink() {
    const url = 'https://amzn.to/341eGEK';

    console.log('🧪 Testing Full Scan with Direct Affiliate Link');
    console.log('═'.repeat(60));
    console.log(`URL: ${url}\n`);

    try {
        console.log('🔄 Starting full scan...\n');
        const scan = await performFullScan(url);

        console.log('📊 Scan Results:');
        console.log(`   Scan ID: ${scan.id}`);
        console.log(`   URL: ${scan.url}`);
        console.log(`   Links Found: ${scan.links.length}`);

        if (scan.links.length > 0) {
            console.log('\n📋 Link Details:');
            scan.links.forEach((link, index) => {
                console.log(`\n   Link ${index + 1}:`);
                console.log(`     URL: ${link.href}`);
                console.log(`     Status: ${link.status}`);
                console.log(`     Status Code: ${link.statusCode}`);
                console.log(`     Stock: ${link.stockStatus}`);
            });

            const brokenLinks = scan.links.filter(l => l.status === 'broken');
            if (brokenLinks.length > 0) {
                console.log(`\n   ✅ SUCCESS: Found ${brokenLinks.length} broken link(s)`);
            } else {
                console.log(`\n   ⚠️  No broken links found`);
            }
        } else {
            console.log('\n   ❌ FAIL: No links were checked!');
        }

    } catch (error: any) {
        console.error('\n❌ Error during scan:', error.message);
        console.error(error.stack);
    }
}

testFullScanWithDirectLink().catch(console.error);
