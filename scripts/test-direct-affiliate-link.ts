import { checkLinkHealth, isAffiliateLink } from '../lib/scraper/idx.ts';

async function testDirectAffiliateLink() {
    const url = 'https://amzn.to/341eGEK';

    console.log('🧪 Testing Direct Affiliate Link Scanning');
    console.log('═'.repeat(60));
    console.log(`URL: ${url}\n`);

    // Test 1: Check if URL is recognized as affiliate link
    console.log('1️⃣ Is this an affiliate link?');
    const isAffiliate = isAffiliateLink(url);
    console.log(`   Result: ${isAffiliate ? '✅ YES' : '❌ NO'}`);

    // Test 2: Check link health
    console.log('\n2️⃣ Checking link health...');
    try {
        const health = await checkLinkHealth(url);
        console.log(`   Status: ${health.status}`);
        console.log(`   Status Code: ${health.statusCode}`);
        console.log(`   Stock Status: ${health.stockStatus}`);

        if (health.status === 'broken') {
            console.log('\n   ✅ CORRECTLY DETECTED AS BROKEN');
        } else {
            console.log('\n   ❌ INCORRECTLY DETECTED AS HEALTHY');
        }
    } catch (error: any) {
        console.error(`   ❌ Error: ${error.message}`);
    }
}

testDirectAffiliateLink().catch(console.error);
