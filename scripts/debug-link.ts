import axios from 'axios';

async function debugLink() {
    const url = 'https://amzn.to/3Flzyid';
    console.log(`Checking ${url}...`);

    try {
        // Try HEAD first (simulating current logic)
        console.log('Attempting HEAD request...');
        const result = await axios.head(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; AffiliateLinkMonitor/1.0; +http://localhost)'
            },
            maxRedirects: 5,
            validateStatus: () => true
        });
        console.log(`HEAD Status: ${result.status}`);
        console.log('HEAD Location:', result.headers['location']);

        // Try GET if HEAD fails or generally to see difference
        console.log('\nAttempting GET request...');
        const getResult = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            maxRedirects: 5,
            validateStatus: () => true
        });
        console.log(`GET Status: ${getResult.status}`);
        console.log('GET Final URL:', getResult.request.res.responseUrl);

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
            if (error.response) {
                console.error('Response Status:', error.response.status);
                console.error('Response Headers:', error.response.headers);
            }
        } else {
            console.error('Error:', error);
        }
    }
}

debugLink();
