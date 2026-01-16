
// Validating the OOS detection logic in isolation
// This avoids complex dependency mocking for a simple logic check.

function detectStockStatus(html: string): 'in_stock' | 'out_of_stock' | 'unknown' {
    if (!html) return 'unknown';
    const lowerHtml = html.toLowerCase();

    // 1. Check for specific keywords in visible text (simple heuristic)
    const oosKeywords = [
        'currently unavailable',
        'out of stock',
        'sold out',
        'temporarily out of stock',
        'no longer available'
    ];

    if (oosKeywords.some(keyword => lowerHtml.includes(keyword))) {
        return 'out_of_stock';
    }

    // 2. Check for Schema.org availability
    // Look for: "availability": "http://schema.org/OutOfStock" or "availability": "https://schema.org/OutOfStock"
    if (lowerHtml.includes('schema.org/outofstock')) {
        return 'out_of_stock';
    }

    if (lowerHtml.includes('schema.org/instock')) {
        return 'in_stock';
    }

    return 'unknown';
}

function runTests() {
    console.log("Starting OOS Detection Logic Tests...");
    let testsPassed = 0;
    let testsFailed = 0;

    const testCases = [
        {
            name: "Keyword 'Currently unavailable'",
            html: '<html><body><h1>Product</h1><p>Currently unavailable</p></body></html>',
            expected: 'out_of_stock'
        },
        {
            name: "Keyword 'Out of stock' (case insensitive)",
            html: '<html><body><span class="status">OUT OF STOCK</span></body></html>',
            expected: 'out_of_stock'
        },
        {
            name: "Schema.org OutOfStock",
            html: '<html><script type="application/ld+json">{"availability": "http://schema.org/OutOfStock"}</script></html>',
            expected: 'out_of_stock'
        },
        {
            name: "Schema.org InStock",
            html: '<html><script type="application/ld+json">{"availability": "https://schema.org/InStock"}</script></html>',
            expected: 'in_stock'
        },
        {
            name: "No signal (Unknown)",
            html: '<html><body><h1>Product</h1><p>Buy now</p></body></html>',
            expected: 'unknown'
        },
        {
            name: "Mixed signals (Privacy mismatch? no, just text)",
            html: '<html><body><h1>Sold Out Event</h1></body></html>',
            expected: 'out_of_stock' // "Sold Out" keyword
        }
    ];

    testCases.forEach(test => {
        const result = detectStockStatus(test.html);
        if (result === test.expected) {
            console.log(`✅ Passed: ${test.name}`);
            testsPassed++;
        } else {
            console.log(`❌ Failed: ${test.name}`);
            console.log(`   Expected: ${test.expected}, Got: ${result}`);
            testsFailed++;
        }
    });

    console.log(`\nSummary: ${testsPassed}/${testCases.length} tests passed.`);
    if (testsFailed > 0) process.exit(1);
}

runTests();
