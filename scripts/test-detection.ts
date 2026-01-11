
// Mock logic for testing IsAffiliateLink without importing private helper
const AFFILIATE_DOMAINS = [
    'amzn.to', 'geni.us', 'bit.ly', 'amazon.com'
];
const AFFILIATE_PARAMS = ['ref', 'aff', 'tag', 'partner', 'via'];
const AFFILIATE_PATHS = ['/go/', '/out/', '/ref/', '/recommend/'];

function isAffiliateLink(href: string): boolean {
    try {
        const url = new URL(href);
        const lowerHref = href.toLowerCase();

        if (AFFILIATE_DOMAINS.some(domain => url.hostname.includes(domain))) return true;
        if (AFFILIATE_PARAMS.some(param => url.searchParams.has(param) || lowerHref.includes(param + '='))) return true;
        if (AFFILIATE_PATHS.some(path => url.pathname.includes(path))) return true;

        return false;
    } catch (e) {
        return false;
    }
}

const testCases = [
    { url: 'https://amzn.to/3Flzyid', expected: true, reason: 'Known domain' },
    { url: 'https://example.com/blog-post', expected: false, reason: 'Standard link' },
    { url: 'https://mysite.com?ref=alex', expected: true, reason: 'Ref param' },
    { url: 'https://mysite.com?tag=myblog-20', expected: true, reason: 'Tag param' },
    { url: 'https://othersite.com/go/vpn', expected: true, reason: '/go/ path' },
    { url: 'https://othersite.com/out/hosting', expected: true, reason: '/out/ path' },
    { url: 'https://google.com', expected: false, reason: 'Standard link' },
    { url: 'https://geni.us/BPkcMv', expected: true, reason: 'Known domain' }
];

console.log('Testing Affiliate Link Detection Logic...\n');
let passed = 0;
testCases.forEach(test => {
    const result = isAffiliateLink(test.url);
    const icon = result === test.expected ? '✅' : '❌';
    if (result === test.expected) passed++;
    console.log(`${icon} URL: ${test.url}`);
    console.log(`   Expected: ${test.expected} (${test.reason}) | Got: ${result}\n`);
});

console.log(`\nResult: ${passed}/${testCases.length} Passed`);
