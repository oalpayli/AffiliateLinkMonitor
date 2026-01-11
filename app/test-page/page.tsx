export default function TestPage() {
    return (
        <div>
            <h1>Test Page</h1>
            <p>This page contains a broken affiliate link for testing.</p>
            {/* Broken link to non-existent page on localhost */}
            <a href="http://localhost:3000/non-existent-affiliate?ref=123">Broken Affiliate Link</a>
        </div>
    );
}
