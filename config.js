/**
 * Configuration file for NetSuite Import Assistant (Excel Add-in)
 * Updated with your NetSuite credentials
 */
const CONFIG = {
  // NetSuite account information
  netsuite: {
    accountId: '8176363_SB1',                // Full realm with _SB1 suffix
    baseUrl: 'https://8176363-sb1.app.netsuite.com', // The correct system URL from datacenter API
    restUrl: 'https://8176363-sb1.restlets.api.netsuite.com', // The correct REST API URL from datacenter API
  },
  
  // Server configuration
  server: {
    // Current deployment URL
    baseUrl: window.location.origin,
  },
  
  // OAuth1.0a / TBA configuration
  oauth: {
    // The OAuth Consumer Key/Client ID from your NetSuite Integration record
    clientId: '8e6fa5785a9504ad20c14f5391668b4fc8b2258d7ae7a7abd5fe0b163d4a8f3c',
    // Default token information (for testing/development)
    tokenId: 'ff595eea5e8d26893e930fa6266138e255438324659c606d6c596b8e9f4bb04a',
    tokenSecret: '210767d8afa7fd9e6027a87cdea1591e8848a8524d2ea374512a977a226beb29',
    // Scope for REST access
    scope: 'restlets',
    // Use the current origin for the redirect URI - this must match what's in your NetSuite Integration record
    redirectUri: window.location.origin + '/callback.html'
  }
};