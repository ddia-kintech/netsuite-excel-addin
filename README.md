# NetSuite Excel Add-in

This repository contains a Microsoft Excel add-in that integrates with NetSuite to import and export financial data.

## Features

- Import journals, bills, invoices, and purchase orders from Excel to NetSuite
- Download GL accounts, subsidiaries, customers, vendors and other data from NetSuite
- Select custom forms and generate appropriate templates
- Uses secure Token-Based Authentication (TBA) for NetSuite API access

## Setup

1. **Set up NetSuite Access**:
   - Create an Integration record in NetSuite
   - Create a Token-Based Authentication (TBA) token
   - Note the Consumer Key/Secret and Token ID/Secret

2. **Configure the Add-in**:
   - Update your credentials in the login form
   - The add-in will store them securely for the current session

3. **Install the Excel Add-in**:
   - Open Excel
   - Go to Insert tab > My Add-ins > Upload My Add-in
   - Select the manifest.xml file

## Development

This add-in is built using:
- Office.js for Excel integration
- Express.js for the API backend
- NetSuite RESTlets for server-side processing

## Security

- All communication with NetSuite uses OAuth 1.0a signature-based authentication
- No credentials are stored in the browser's local storage or cookies
- HTTPS is required for all API communications