// NetSuite Import Assistant - Taskpane JavaScript
// Configuration for GitHub Pages deployment

// Global state
const state = {
    connected: false,
    serverUrl: 'https://workspace.djibirilgoundo.repl.co', // Your Replit server URL
    credentials: {
        accountId: '8176363_SB1', // Hardcoded Account ID
        consumerKey: 'd33cb0953bd87bd9ed7953df9fe52da5d885a99d069deda21131b9697b7d2e3a', // Hardcoded Client ID
        consumerSecret: 'd4a2de9a8a6b35aad9b6ed162f955ba0247bffd1a38af7d9b53ee0cf3b6242f4', // Hardcoded Client Secret
        tokenId: '4b18d0bde1ee3ae2444059a78e28d4f065807e1ca57e02895af049ced2de6aed', // Default Token ID
        tokenSecret: 'dc2ce472e35c32a98c0a9c4e5919d323294e07fc1ced22520dd0e32ab2248b5a' // Default Token Secret
    },
    selectedSubsidiary: '',
    isBookSpecific: false,
    masterData: {
        subsidiaries: [],
        accounts: [],
        customers: [],
        vendors: [],
        employees: [],
        responsibilities: [], // Department in standard NetSuite
        activities: [],       // Class in standard NetSuite
        locations: [],
        icCodes: [],          // Intercompany codes
        accountingBooks: []
    }
};

// Template definitions for each subsidiary
const templateDefinitions = {
    // SEMOS SA - Regular Journal
    "SEMOS SA": {
        templateId: "414",
        fields: [
            { id: "externalid", label: "External ID", type: "text", required: true },
            { id: "currency", label: "Currency", type: "text", required: true },
            { id: "trandate", label: "Date", type: "date", required: true },
            { id: "memo", label: "Memo", type: "text", required: true },
            { id: "custbody_filing_number", label: "Filing Number", type: "text", required: true },
            { id: "subsidiary", label: "Subsidiary", type: "dropdown", source: "subsidiaries", required: true },
            { id: "account", label: "Account", type: "dropdown", source: "accounts", required: true },
            { id: "debit", label: "Debit", type: "number", required: false },
            { id: "credit", label: "Credit", type: "number", required: false },
            { id: "memoline", label: "Memo Line", type: "text", required: false },
            { id: "entity", label: "Customer", type: "dropdown", source: "customers", required: false },
            { id: "entity", label: "Vendor", type: "dropdown", source: "vendors", required: false },
            { id: "entity", label: "Employee", type: "dropdown", source: "employees", required: false },
            { id: "iccode", label: "IC-Code", type: "dropdown", source: "icCodes", required: false },
            { id: "department", label: "Responsibility", type: "dropdown", source: "responsibilities", required: false },
            { id: "class", label: "Activity", type: "dropdown", source: "activities", required: false },
            { id: "location", label: "Location", type: "dropdown", source: "locations", required: false }
        ]
    },
    // SEMOS SA - Book Specific Journal
    "SEMOS SA_book": {
        templateId: "415",
        fields: [
            { id: "externalid", label: "External ID", type: "text", required: true },
            { id: "currency", label: "Currency", type: "text", required: true },
            { id: "trandate", label: "Date", type: "date", required: true },
            { id: "memo", label: "Memo", type: "text", required: true },
            { id: "custbody_filing_number", label: "Filing Number", type: "text", required: true },
            { id: "subsidiary", label: "Subsidiary", type: "dropdown", source: "subsidiaries", required: true },
            { id: "accountingbook", label: "Accounting Book", type: "dropdown", source: "accountingBooks", required: true },
            { id: "account", label: "Account", type: "dropdown", source: "accounts", required: true },
            { id: "debit", label: "Debit", type: "number", required: false },
            { id: "credit", label: "Credit", type: "number", required: false },
            { id: "memoline", label: "Memo Line", type: "text", required: false },
            { id: "entity", label: "Customer", type: "dropdown", source: "customers", required: false },
            { id: "entity", label: "Vendor", type: "dropdown", source: "vendors", required: false },
            { id: "entity", label: "Employee", type: "dropdown", source: "employees", required: false },
            { id: "iccode", label: "IC-Code", type: "dropdown", source: "icCodes", required: false },
            { id: "department", label: "Responsibility", type: "dropdown", source: "responsibilities", required: false },
            { id: "class", label: "Activity", type: "dropdown", source: "activities", required: false },
            { id: "location", label: "Location", type: "dropdown", source: "locations", required: false }
        ]
    },
    // Corporate Companies - Regular Journal
    "Corporate Companies": {
        templateId: "574",
        fields: [
            { id: "externalid", label: "External ID", type: "text", required: true },
            { id: "currency", label: "Currency", type: "text", required: true },
            { id: "trandate", label: "Date", type: "date", required: true },
            { id: "memo", label: "Memo", type: "text", required: true },
            { id: "subsidiary", label: "Subsidiary", type: "dropdown", source: "subsidiaries", required: true },
            { id: "account", label: "Account", type: "dropdown", source: "accounts", required: true },
            { id: "debit", label: "Debit", type: "number", required: false },
            { id: "credit", label: "Credit", type: "number", required: false },
            { id: "memoline", label: "Memo Line", type: "text", required: false },
            { id: "entity", label: "Customer", type: "dropdown", source: "customers", required: false },
            { id: "entity", label: "Vendor", type: "dropdown", source: "vendors", required: false },
            { id: "entity", label: "Employee", type: "dropdown", source: "employees", required: false },
            { id: "iccode", label: "IC-Code", type: "dropdown", source: "icCodes", required: false },
            { id: "department", label: "Responsibility", type: "dropdown", source: "responsibilities", required: false },
            { id: "class", label: "Activity", type: "dropdown", source: "activities", required: false },
            { id: "location", label: "Location", type: "dropdown", source: "locations", required: false }
        ]
    },
    // Corporate Companies - Book Specific Journal 
    "Corporate Companies_book": {
        templateId: "575",
        fields: [
            { id: "externalid", label: "External ID", type: "text", required: true },
            { id: "currency", label: "Currency", type: "text", required: true },
            { id: "trandate", label: "Date", type: "date", required: true },
            { id: "memo", label: "Memo", type: "text", required: true },
            { id: "subsidiary", label: "Subsidiary", type: "dropdown", source: "subsidiaries", required: true },
            { id: "accountingbook", label: "Accounting Book", type: "dropdown", source: "accountingBooks", required: true },
            { id: "account", label: "Account", type: "dropdown", source: "accounts", required: true },
            { id: "debit", label: "Debit", type: "number", required: false },
            { id: "credit", label: "Credit", type: "number", required: false },
            { id: "memoline", label: "Memo Line", type: "text", required: false },
            { id: "entity", label: "Customer", type: "dropdown", source: "customers", required: false },
            { id: "entity", label: "Vendor", type: "dropdown", source: "vendors", required: false },
            { id: "entity", label: "Employee", type: "dropdown", source: "employees", required: false },
            { id: "iccode", label: "IC-Code", type: "dropdown", source: "icCodes", required: false },
            { id: "department", label: "Responsibility", type: "dropdown", source: "responsibilities", required: false },
            { id: "class", label: "Activity", type: "dropdown", source: "activities", required: false },
            { id: "location", label: "Location", type: "dropdown", source: "locations", required: false }
        ]
    }
};

// Initialize Office.js
Office.onReady(function(info) {
    if (info.host === Office.HostType.Excel) {
        document.getElementById('connect-button').addEventListener('click', connectToNetSuite);
        document.getElementById('load-fields-button').addEventListener('click', loadTemplate);
        document.getElementById('generate-template-button').addEventListener('click', generateExcelTemplate);
        document.getElementById('import-button').addEventListener('click', importToNetSuite);
        
        // Tab navigation
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                activateTab(tabName);
            });
        });
        
        // Handle subsidiary selection change
        document.getElementById('subsidiary').addEventListener('change', handleSubsidiaryChange);
        
        // Handle book-specific checkbox
        const bookSpecificCheckbox = document.createElement('input');
        bookSpecificCheckbox.type = 'checkbox';
        bookSpecificCheckbox.id = 'book-specific';
        bookSpecificCheckbox.addEventListener('change', function() {
            state.isBookSpecific = this.checked;
        });
        
        const bookSpecificLabel = document.createElement('label');
        bookSpecificLabel.htmlFor = 'book-specific';
        bookSpecificLabel.innerText = 'Book Specific Journal';
        
        const bookSpecificDiv = document.createElement('div');
        bookSpecificDiv.className = 'form-group';
        bookSpecificDiv.appendChild(bookSpecificLabel);
        bookSpecificDiv.appendChild(bookSpecificCheckbox);
        
        // Insert after the subsidiary dropdown
        const setupTab = document.getElementById('setup-tab');
        const subsidiaryFormGroup = document.querySelector('#setup-tab .form-group:nth-child(2)');
        setupTab.insertBefore(bookSpecificDiv, subsidiaryFormGroup.nextSibling);
        
        // Populate transaction type dropdown with Journal Entry only for now
        document.getElementById('transaction-type').innerHTML = '<option value="journal">Journal Entry</option>';
        
        // Auto-populate the login form with hardcoded credentials
        document.getElementById('account-id').value = state.credentials.accountId;
        document.getElementById('account-id').disabled = true; // Make it read-only
        
        document.getElementById('consumer-key').value = state.credentials.consumerKey;
        document.getElementById('consumer-key').disabled = true; // Make it read-only
        
        document.getElementById('consumer-secret').value = state.credentials.consumerSecret;
        document.getElementById('consumer-secret').disabled = true; // Make it read-only
        
        document.getElementById('token-id').value = state.credentials.tokenId;
        document.getElementById('token-secret').value = state.credentials.tokenSecret;
        
        updateStatus('Office.js initialized. Ready to connect to NetSuite. Account, Consumer Key, and Consumer Secret are pre-filled. Please verify the Token ID and Token Secret.');
    }
});

// Tab navigation
function activateTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelector(`.tab[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Connect to NetSuite with credentials
function connectToNetSuite() {
    showLoading('Connecting to NetSuite...');
    
    // Get token values from form (Account ID, Consumer Key, and Consumer Secret are hardcoded)
    state.credentials.tokenId = document.getElementById('token-id').value;
    state.credentials.tokenSecret = document.getElementById('token-secret').value;
    
    // Validate that token values are provided
    if (!state.credentials.tokenId || !state.credentials.tokenSecret) {
        hideLoading();
        updateStatus('Please provide Token ID and Token Secret values.', true);
        return;
    }
    
    // Call the server to validate credentials
    fetch(`${state.serverUrl}/api/validate-credentials`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state.credentials)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            state.connected = true;
            
            // Fetch subsidiaries
            return fetch(`${state.serverUrl}/api/subsidiaries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state.credentials)
            });
        } else {
            throw new Error(data.message || 'Failed to connect to NetSuite. Please check your credentials.');
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Populate subsidiary dropdown
            state.masterData.subsidiaries = data.data;
            const subsidiaryDropdown = document.getElementById('subsidiary');
            subsidiaryDropdown.innerHTML = '<option value="">-- Select Subsidiary --</option>';
            
            // Add the specific subsidiaries we need
            subsidiaryDropdown.innerHTML += '<option value="SEMOS SA">SEMOS S.A</option>';
            subsidiaryDropdown.innerHTML += '<option value="Corporate Companies">Corporate Companies</option>';
            
            subsidiaryDropdown.disabled = false;
            
            // Move to the setup tab
            activateTab('setup');
            document.getElementById('load-fields-button').disabled = false;
            
            updateStatus('Connected to NetSuite. Please select a subsidiary.');
        } else {
            throw new Error(data.message || 'Failed to retrieve subsidiaries from NetSuite.');
        }
    })
    .catch(error => {
        updateStatus('Error: ' + error.message, true);
    })
    .finally(() => {
        hideLoading();
    });
}

// Handle subsidiary selection change
function handleSubsidiaryChange() {
    const subsidiaryValue = document.getElementById('subsidiary').value;
    state.selectedSubsidiary = subsidiaryValue;
    
    // Enable the Load Form Fields button if a subsidiary is selected
    document.getElementById('load-fields-button').disabled = !subsidiaryValue;
}

// Load template based on selected subsidiary and book specific flag
function loadTemplate() {
    const subsidiary = state.selectedSubsidiary;
    if (!subsidiary) {
        updateStatus('Please select a subsidiary', true);
        return;
    }
    
    showLoading('Loading master data from NetSuite...');
    
    // Get template key
    const templateKey = state.isBookSpecific ? `${subsidiary}_book` : subsidiary;
    
    // Load master data from NetSuite
    Promise.all([
        fetchMasterData('accounts'),
        fetchMasterData('customers'),
        fetchMasterData('vendors'),
        fetchMasterData('employees'),
        fetchMasterData('departments'), // Responsibility
        fetchMasterData('classes'),     // Activity
        fetchMasterData('locations'),
        state.isBookSpecific ? fetchMasterData('accountingbooks') : Promise.resolve([])
    ])
    .then(() => {
        // Display template configuration
        const template = templateDefinitions[templateKey];
        if (!template) {
            throw new Error(`Template not found for ${subsidiary} with book specific: ${state.isBookSpecific}`);
        }
        
        // Show template fields for configuration
        const templateFields = document.getElementById('template-fields');
        templateFields.innerHTML = `
            <p>The following fields will be included in the template:</p>
            <div class="field-list">
                ${template.fields.map(field => `
                    <div class="field-item">
                        <input type="checkbox" id="${field.id}_check" name="${field.id}" value="${field.id}" 
                            ${field.required ? 'checked disabled' : 'checked'}>
                        <label for="${field.id}_check">${field.label}</label>
                    </div>
                `).join('')}
            </div>
            <p>Template ID: ${template.templateId}</p>
        `;
        
        document.getElementById('generate-template-button').disabled = false;
        activateTab('template');
        updateStatus('Template fields loaded. Select which fields to include and click Generate Template.');
    })
    .catch(error => {
        updateStatus('Error loading template data: ' + error.message, true);
    })
    .finally(() => {
        hideLoading();
    });
}

// Fetch master data from the server
function fetchMasterData(type) {
    return fetch(`${state.serverUrl}/api/${type}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state.credentials)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Map to the correct property in state
            const mappings = {
                'departments': 'responsibilities',
                'classes': 'activities',
                'accountingbooks': 'accountingBooks'
            };
            
            const stateProperty = mappings[type] || type;
            state.masterData[stateProperty] = data.data;
            return data.data;
        } else {
            throw new Error(`Failed to retrieve ${type} from NetSuite: ${data.message}`);
        }
    });
}

// Generate Excel template based on selected fields
function generateExcelTemplate() {
    showLoading('Generating Excel template...');
    
    // Check which fields are selected
    const selectedFields = [];
    document.querySelectorAll('.field-item input:checked').forEach(checkbox => {
        const fieldId = checkbox.value;
        // Find the field definition
        const templateKey = state.isBookSpecific ? `${state.selectedSubsidiary}_book` : state.selectedSubsidiary;
        const template = templateDefinitions[templateKey];
        const fieldDef = template.fields.find(f => f.id === fieldId);
        
        if (fieldDef) {
            selectedFields.push(fieldDef);
        }
    });
    
    try {
        Excel.run(function(context) {
            // Get the current worksheet
            const sheet = context.workbook.worksheets.getActiveWorksheet();
            
            // Clear existing content
            sheet.getRange().clear();
            
            // Add headers to the first row
            const headers = selectedFields.map(field => field.label);
            const headerRange = sheet.getRange("A1").getResizedRange(0, headers.length - 1);
            headerRange.values = [headers];
            headerRange.format.font.bold = true;
            headerRange.format.fill.color = "#D0D0D0";
            
            // Create data validation for dropdown fields
            return context.sync()
                .then(() => {
                    // Start from row 2 (row index 1) for data rows
                    const promises = selectedFields.map((field, colIndex) => {
                        if (field.type === 'dropdown' && state.masterData[field.source]) {
                            // Get the column letter (A, B, C, etc.)
                            const colLetter = String.fromCharCode(65 + colIndex); // A=65 in ASCII
                            const dataRange = sheet.getRange(`${colLetter}2:${colLetter}100`);
                            
                            // Create data validation with dropdown values
                            const sourceValues = state.masterData[field.source].map(item => 
                                typeof item === 'string' ? item : item.name || item.id || '');
                            
                            if (sourceValues.length > 0) {
                                // Excel has a limit on the number of items in a dropdown
                                // If we have too many items, we'll limit it to avoid errors
                                const maxDropdownItems = 1000;
                                const validationValues = sourceValues.slice(0, maxDropdownItems);
                                
                                const dataValidation = dataRange.dataValidation;
                                dataValidation.clear();
                                dataValidation.rule = {
                                    list: { 
                                        inCellDropdown: true,
                                        source: validationValues.join(",")
                                    }
                                };
                            }
                        }
                        return context.sync();
                    });
                    
                    return Promise.all(promises);
                })
                .then(() => {
                    // Auto-fit columns
                    sheet.getUsedRange().format.autofitColumns();
                    sheet.getUsedRange().format.autofitRows();
                    
                    // Update status
                    activateTab('import');
                    document.getElementById('import-status').textContent = 
                        "Template generated. Fill in the data in Excel and click 'Import to NetSuite' when ready.";
                    document.getElementById('import-button').disabled = false;
                    
                    updateStatus('Template generated successfully. Fill in your data and then import to NetSuite.');
                    hideLoading();
                });
        }).catch(error => {
            updateStatus('Error generating template: ' + error.message, true);
            hideLoading();
        });
    } catch (error) {
        updateStatus('Error accessing Excel: ' + error.message, true);
        hideLoading();
    }
}

// Import data to NetSuite
function importToNetSuite() {
    showLoading('Preparing data for import...');
    
    // Get the template ID based on subsidiary and book specific flag
    const templateKey = state.isBookSpecific ? `${state.selectedSubsidiary}_book` : state.selectedSubsidiary;
    const template = templateDefinitions[templateKey];
    const templateId = template.templateId;
    
    try {
        Excel.run(function(context) {
            // Get the active worksheet
            const sheet = context.workbook.worksheets.getActiveWorksheet();
            const usedRange = sheet.getUsedRange();
            usedRange.load(["values", "rowCount", "columnCount"]);
            
            return context.sync()
                .then(function() {
                    // Extract headers and data
                    if (usedRange.rowCount < 2) {
                        throw new Error("No data to import. Please fill in the template.");
                    }
                    
                    const values = usedRange.values;
                    const headers = values[0];
                    const rows = values.slice(1).filter(row => row.some(cell => cell !== "")); // Remove empty rows
                    
                    // Convert data to CSV string
                    const csvData = [];
                    
                    // Add headers
                    csvData.push(headers.join(","));
                    
                    // Add data rows
                    rows.forEach(row => {
                        csvData.push(row.join(","));
                    });
                    
                    const csvString = csvData.join("\n");
                    
                    // Call server to import data
                    return fetch(`${state.serverUrl}/api/import-journal`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            credentials: state.credentials,
                            templateId: templateId,
                            csvData: csvString,
                            subsidiary: state.selectedSubsidiary,
                            isBookSpecific: state.isBookSpecific
                        })
                    });
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        document.getElementById('import-status').textContent = 
                            `Data imported successfully to NetSuite. Job ID: ${data.jobId || 'N/A'}`;
                        updateStatus('Data imported to NetSuite successfully.');
                    } else {
                        throw new Error(data.message || 'Import failed. Please check your data and try again.');
                    }
                    hideLoading();
                });
        }).catch(error => {
            updateStatus('Error importing data: ' + error.message, true);
            hideLoading();
        });
    } catch (error) {
        updateStatus('Error accessing Excel: ' + error.message, true);
        hideLoading();
    }
}

// Utility functions
function showLoading(message) {
    document.getElementById('loading-message').textContent = message || 'Loading...';
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function updateStatus(message, isError = false) {
    const statusElement = document.getElementById('status-message');
    statusElement.textContent = 'Status: ' + message;
    if (isError) {
        statusElement.style.color = 'red';
        statusElement.style.borderLeftColor = 'red';
    } else {
        statusElement.style.color = '';
        statusElement.style.borderLeftColor = '';
    }
}
