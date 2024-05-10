beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')

})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
 */

describe('Visual tests for registration form 3', () => {

    it('Radio buttons and its content', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
    
        // Verify labels of the radio button
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never')

        // Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Dropdown and dependencies between 2 dropdowns', () => {
        // List of cities changes depending on the choice of country
        // Select a country
        cy.get('#country').select('Spain')

        // Verify that Spain has 4 countries in dropdown
        // We are assuming that the city dropdown options are updated asynchronously
        cy.get('#city').children().should('have.length.greaterThan', 0)

        // Assert that the city dropdown contains expected labels for the selected country
        cy.get('#city').find('option').eq(0).should('have.text', "")
        cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
        cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
        cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')
        
        // Select a city
        cy.get('#city').select('Valencia')

        // Assert that the selected city is Valencia
        cy.get('#city').should('contain', 'Valencia')

        // Select a new country
        cy.get('#country').find('option'). eq(2). should('have.text', 'Estonia')

        // If city is already chosen and country is updated, then city choice should be removed
        // Assert that the city dropdown does not have any selected option
        cy.get('#city').should('contain', "")

    })

    it('Checkboxes, their content and links', () => {
        // Array of found elements with given selector has 2 elements in total
        cy.get('input[type=checkbox]').should('have.length', 2)

        // There are 2 checkbox buttons present and unchecked
        cy.get('input[type=checkbox]').eq(0).should('not.be.checked')
        cy.get('input[type=checkbox]').eq(1).should('not.be.checked')

        // Verify the label of each checkbox
        cy.get('input[type=checkbox]').eq(0).should('have.text', "")
        cy.get('input[type=checkbox]').eq(1).should('have.text', "")

        // Try marking the first textbox as checked and assert its state
        cy.get('input[type="checkbox"]').first().check()
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')

        // Try marking the checkbox as unchecked 
        cy.get('input[type="checkbox"]').eq(0).scrollIntoView()
        cy.get('input[type="checkbox"]').uncheck()

        // Check the second checkbox link
        cy.get('button').children().eq(0).should('be.visible')
          .and('have.attr', 'href', 'cookiePolicy.html')
          .click()

        // Check that the second checkbox list is correct
       cy.url().should('contain', '/cookiePolicy.html')

    })

    it('Email', () => {

        // Type "fsfs" and assert than an error message is shown with the following text: "Invalid email address"
         cy.get('.email').type('fsfs')
         cy.get('#emailAlert').should('be.visible').and('contain', 'Invalid email address')
 
        // Type "fsfs@gmail." and assert than an error message is shown with the following text: "Invalid email address"
         cy.get('.email').type('fsfs@gmail.')
         cy.get('#emailAlert').should('be.visible').and('contain', 'Invalid email address')

        // Leave the email field empty and assert that an error message is shown with the following text: "Email is required"
        cy.get('.email').click()
        cy.get('.email').type('fsfs@gmail.com')
        cy.get('.email').clear()
        cy.get('#emailAlert').should('be.visible').and('contain', 'Email is required')

        // Type "fsfs@gmail.com" and assert than an error message is not shown
        cy.get('.email').type('fsfs@gmail.com')
        cy.get('#emailAlert').should('have.css', 'display', 'block')


    })

})

/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */

describe('Functional tests for registration form 3', () => {

    it('All fields are filled in + corresponding assertions', () => {
        // Fill in ALL the fields
        cy.get('#name').type('Angela Aarelaid')
        cy.get('.email').type('fsfs@gmail.com')
        cy.get('#country').select('Spain')
        cy.get('#city').select('Valencia')
        cy.get('input[type="date"]').click({ multiple: true }); // Open the Date Picker
        const targetDate=new Date('2023,4,19') // Select a date
        const formattedDate = `${targetDate.getFullYear()}-${(targetDate.getMonth() + 1).toString().padStart(2, '0')}-${targetDate.getDate().toString().padStart(2, '0')}`; // Get the formatted date in 'yyyy-mm-dd' format

        // Get the individual components of the target date
        const year=targetDate.getFullYear(); 
        const month=targetDate.toLocaleString('default', {month: 'long'}); // Full month name
        const day=targetDate.getDate();

        // Find and click the elements to navigate to the desired month and year
        cy.get('input[type="date"]').each(($input) => {
            const date = '2023-4-19';
          });
          
        // Find and click the cell corresponding to the target day in the calendar
        cy.get('input[type="date"]').each(($input) => {
            const date = '2023-04-19'; // Adjust the date value as needed
            cy.wrap($input).type(date);
          });
        
        // Assert that the registration date contains the expected value
        cy.get('input[type="date"]').should('have.value', formattedDate)

        // Select the frequency of receiving our newsletter
        cy.get('input[type="radio"]').eq(1).check()

        // Birthday
        cy.get('#birthday').click({ multiple: true }); // Open the Birthday Date Picker

        // Select birthday date
        const birthdayDate = {
            year: '1997', 
            month: '04',
            day: '19'
          };
        
        // Get the formatted date in 'yyyy-mm-dd' format
        const formattedBirthday = `${birthdayDate.year}-${birthdayDate.month.padStart(2, '0')}-${birthdayDate.day.padStart(2, '0')}`;

        // Set the date for the second date picker
        cy.get('#birthday').each(($input) => {
            const year = '1997';
            const month = '04'; // Leading zero for April
            const day = '19'; // Leading zero for the 19th day
            const date = `${year}-${month}-${day}`; 
            cy.wrap($input).type(date);
        });

        // Assert that the selected birthday date is correct 
        cy.get('#birthday').should('have.value', '1997-04-19')

        // Checkboxes
        cy.get('input[type=checkbox]').eq(0).check()
        cy.get('input[type=checkbox]').eq(1).check()

        // Assert that two checkboxes are checked
        cy.get('input[type=checkbox]').eq(0).should('be.checked')
        cy.get('input[type=checkbox]').eq(1).should('be.checked')

        // Click on the "Choose file" button
        cy.get('#myFile').click()

        // Choose file from the "Desktop" folder
        cy.readFile('load_this_file_reg_form_3.txt', 'base64').then(fileContent => {
            cy.get('#myFile').selectFile({
                contents: Cypress.Buffer.from('file contents'),
                fileContent: fileContent,
                fileName: 'load_this_file_reg_form_3.txt',
                mimeType: 'text/plain'
            });
        });    

        // Assert that the selected file is displayed correctly 
        cy.get('#myFile').invoke('val').should('contain', 'load_this_file_reg_form_3.txt')

        cy.get('input[type="submit"]').should('be.enabled')
        cy.window().then(win => { // Call postYourAdd function
            win.postYourAdd();
        })

        // Assert that the "Submit" button is enabled 
        cy.get('input[type="submit"]').should('be.enabled')
        cy.window().then(win => { // Call postYourAdd function
            win.postYourAdd();
        })
        
        cy.get('input[type="submit"]').click()
        
    })

    it('Only mandatory fields are filled + corresponding assertions', () => {
        // Fill in only MANDATORY fields
        cy.get('#country').select('Spain')
        cy.get('#city').select('Valencia')
        cy.get('.email').type('fsfs@gmail.com')
        cy.get('#birthday').click({ multiple: true }); // Open the Birthday Date Picker
        const birthdayDate = { // Select birthday date
            year: '1997', 
            month: '04',
            day: '19'
          };
        
        const formattedBirthday = `${birthdayDate.year}-${birthdayDate.month.padStart(2, '0')}-${birthdayDate.day.padStart(2, '0')}`; // Get the formatted date in 'yyyy-mm-dd' format

        cy.get('#birthday').each(($input) => { // Set the date for the second date picker
            const year = '1997';
            const month = '04'; // Leading zero for April
            const day = '19'; // Leading zero for the 19th day
            const date = `${year}-${month}-${day}`; 
            cy.wrap($input).type(date);
        });

        // Check the checkbox "Accept our privacy policy" and assert that it is checked
        cy.get('input[type=checkbox]').eq(0).check()
        cy.get('input[type=checkbox]').eq(0).should('be.checked')

        // Assert that the "Submit" button is enabled
        cy.get('input[type="submit"]').should('be.enabled')
        cy.get('input[type="submit"]').click()

    })

    it('Mandatory fields are absent + corresponding assertions (try using function)', () => {
        function inputValidData(name){
        cy.log('Name will be filled')
        }

        cy.get('input[type="date"]').click({ multiple: true }); // Open the Date Picker
        const targetDate=new Date('2023,4,19') // Select a date
        const formattedDate = `${targetDate.getFullYear()}-${(targetDate.getMonth() + 1).toString().padStart(2, '0')}-${targetDate.getDate().toString().padStart(2, '0')}`; // Get the formatted date in 'yyyy-mm-dd' format

        // Get the individual components of the target date
        const year=targetDate.getFullYear(); 
        const month=targetDate.toLocaleString('default', {month: 'long'}); // Full month name
        const day=targetDate.getDate();

        // Find and click the elements to navigate to the desired month and year
        cy.get('input[type="date"]').each(($input) => {
            const date = '2023-4-19';
          });
          
        // Find and click the cell corresponding to the target day in the calendar
        cy.get('input[type="date"]').each(($input) => {
            const date = '2023-04-19'; // Adjust the date value as needed
            cy.wrap($input).type(date);
          });
        
        // Assert that the registration date contains the expected value
        cy.get('input[type="date"]').should('have.value', formattedDate)

        // Check the second checkbox "Accept our privacy policy"
        cy.get('input[type=checkbox]').eq(1).check() 
        cy.get('input[type=checkbox]').eq(1).should('be.checked')

        // Click on the "Choose file" button
        cy.get('#myFile').click()

        // Choose file from the "Desktop" folder
        cy.readFile('load_this_file_reg_form_3.txt', 'base64').then(fileContent => {
            cy.get('#myFile').selectFile({
                contents: Cypress.Buffer.from('file contents'),
                fileContent: fileContent,
                fileName: 'load_this_file_reg_form_3.txt',
                mimeType: 'text/plain'
            });
        });    

        // Assert that the selected file is displayed correctly 
        cy.get('#myFile').invoke('val').should('contain', 'load_this_file_reg_form_3.txt')

        // Assert that the "Submit" button is not enabled
        cy.get('input[type="submit"]').should('not.be.enabled')
        
    })

    it('Add file functionality', () => {
    // Click on the "Choose file" button
    cy.get('#myFile').click()

    // Choose file from the "Desktop" folder
    cy.readFile('load_this_file_reg_form_3.txt', 'base64').then(fileContent => {
        cy.get('#myFile').selectFile({
            contents: Cypress.Buffer.from('file contents'),
            fileContent: fileContent,
            fileName: 'load_this_file_reg_form_3.txt',
            mimeType: 'text/plain'
        });
    });    

    // Assert that the selected file is displayed correctly 
    cy.get('#myFile').invoke('val').should('contain', 'load_this_file_reg_form_3.txt')
    
    })

})
