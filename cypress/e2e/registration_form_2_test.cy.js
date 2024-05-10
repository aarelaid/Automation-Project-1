beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {
    it('User can use only same both first and validation passwords', ()=>{
        // Add test steps for filling in only mandatory fields
        // Type confirmation password which is different from first password
        cy.get('#username').type('Something')
        cy.get('#email').type('angela.aarelaid3@gmail.com')
        cy.get('[data-cy="name"]').type('Angela')
        cy.get('#lastName').type('Aarelaid')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('Maasikas124')
        cy.get('[name="confirm"]').type('Maasikas123')
        cy.get('h2').contains('Select a car').click()

        // Assert that submit button is not enabled
        cy.get('.submit_button').should('not.be.enabled')

        // Assert that error message is visible, and the message should contain: "Passwords do not match!")
        cy.get('#password_error_message').should('be.visible').should('contain','Passwords do not match!')

        // Change the test, so the passwords would match
        cy.get('[name="confirm"]').scrollIntoView()
        cy.get('[name="confirm"').clear()
        cy.get('[name="confirm"').type('Maasikas124')
        cy.get('h2').contains('Last name').click()

        // Assert that error message "Passwords do not match!" is not visible anymore
        cy.get('#password_error_message').should('not.be.visible')

        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')
        
    })

    it('User can submit form with all fields added', ()=>{
        // Add test steps for filling in ALL fields
        cy.get('#username').type('Something')
        cy.get('#email').type('angela.aarelaid3@gmail.com')
        cy.get('[data-cy="name"]').type('Angela')
        cy.get('#lastName').type('Aarelaid')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.contains('h2', 'Please select your favorite Web language')
        cy.contains('h2','Your favourite transport')
        cy.contains('h2', 'Select a car')
        cy.contains('h2','Select your favourite animal')
        cy.get('input[name="password"]').type('Maasikas124')
        cy.get('[name="confirm"]').type('Maasikas124')
        cy.get('h2').contains('Select a car').click()

        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')

        // Assert that after submitting the form system show successful message
        cy.get('.submit_button').click()
        cy.get('#success_message').contains('User successfully submitted registration').should('be.visible')

    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        cy.get('#username').type('Something')
        cy.get('#email').type('angela.aarelaid3@gmail.com')
        cy.get('[data-cy="name"]').type('Angela')
        cy.get('#lastName').type('Aarelaid')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('Maasikas124')
        cy.get('[name="confirm"]').type('Maasikas124')
        cy.get('h2').contains('Select a car').click()

        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')

        // Assert that after submitting the form system shows successful message
        cy.get('.submit_button').click()
        cy.get('#success_message').contains('User successfully submitted registration').should('be.visible')

    })

    // Add at least 1 test for checking some mandatory field's absence

    it('User cannot submit form with mandatory field empty', ()=>{
        // example, how to use function, which fills in all mandatory data
        // in order to see the content of the function, scroll to the end of the file
        inputValidData('johnDoe')

        // Clear last name field 
        cy.get('#lastName').scrollIntoView()
        cy.get('#lastName').clear()
        cy.get('h2').contains('First name').click()

        // Assert that error message "Mandatory input field is not valid or empty!"
        cy.get('#input_error_message').should('be.visible')
 
        // Assert that submit button is not enabled
        cy.get('.submit_button').should('not.be.enabled')

        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')

})
})


/*
Assignement 5: create more visual tests
*/
describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('#logo').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')

        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('#logo').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)  

    })

    it('My test for second picture', () => {
        // Create similar test for checking the second picture
        cy.log('Will check another picture source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr','src').should('include','cypress_logo')

        //it should be less than 116 and greater than 80
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 116)
             .and ('be.greaterThan', 80)

    });

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')

    })

    // Create similar test for checking the second link 

    it('Check the second link in the navigation bar', () => {
        // Get navigation element, find its second child, check the link conetnt and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()

        // Check that the Registration Form 3 link is correct
        cy.url().should('contain', '/registration_form_3.html')

    })

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

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

    // Create test similar to previous one verifying check boxes

    it('Check that checkbox list is correct', () => {
        // Array of found elements with given selector has 3 elements in total
        cy.get('input[type=checkbox]').should('have.length', 3)

        // There are 3 checkbox buttons present and unchecked
        cy.get('input[type=checkbox]').eq(0).should('not.be.checked')
        cy.get('input[type=checkbox]').eq(1).should('not.be.checked')
        cy.get('input[type=checkbox]').eq(2).should('not.be.checked')

        // Verify the label of each checkbox
        cy.get('#vehicle1').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[type=checkbox]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[type=checkbox]').next().eq(2).should('have.text','I have a boat')

        // Try marking the first checkbox as checked and assert its state
        cy.get('input[type="checkbox"]').first().check()
        cy.get('input[type=checkbox]').eq(0).should('be.checked')

        // Try marking the second checkbox as checked and assert the state of the first and second checkboxes (both will stay checked)
        cy.get('input[type="checkbox"]').eq(1).check()
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('be.checked')

    })

    // Check that the dropdown of favorite animals is correct

    it('Car dropdown is correct', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)

        // Check that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')

        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])

        })
    })

    // Check that the dropdown of favorite animals is correct
    it('Favourite animal dropdown is correct', () => {
        // Verify that the animal dropdown has 6 options
        cy.get('#animal').children().should('have.length', 6)

        // Verify that each element of dropdown has correct label
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')
      
    })
})

//inputValidData('JohnDoe')
function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}