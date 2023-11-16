

describe('Basic app functionality', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('should navigate properly', () => {
        cy.get('a').contains('Rates Table').click();
        cy.url().should('include', '/rates');

        cy.get('a').contains('About').click();
        cy.url().should('include', '/about');

        cy.get('a').contains('Main').click();
        cy.url().should('include', '/');
    });

    it('should display about page', () => {
        cy.get('a').contains('About').click();
        cy.get('h1').contains('About');
    });

});

describe('Currency Exchange', () => {
    beforeEach(() => {
        cy.visit('/');
    })
    it('verifies default values for currencies', () => {
        // wait after  the  element with class "form-loading" is not visible on the page:
        cy.get('.form-loading').should('not.be.visible');

        const sellCurrencySelect = cy.get('.currency-select').first();
        sellCurrencySelect.should('have.value', 'USD');

        const buyCurrencySelect = cy.get('.currency-select').last();
        buyCurrencySelect.should('have.value', 'EUR');
    });

    it('verifies the currencies are converted correctly', () => {
        // wait after  the  element with class "form-loading" is not visible on the page:
        cy.get('.form-loading').should('not.be.visible');

        const sellCurrencySelect = cy.get('.currency-select').first();
        sellCurrencySelect.select('USD');

        const buyCurrencySelect = cy.get('.currency-select').last();
        buyCurrencySelect.select('EUR');

        const sellInput = cy.get('.currency-input').first();
        sellInput.clear();
        sellInput.type('100');

        const buyInput = cy.get('.currency-input').last();
        // check if it has any non zero value:
        buyInput.should('not.have.value', '0');
    });

    it('verifies the swap button swaps currencies correctly', () => {
        // wait after  the  element with class "form-loading" is not visible on the page:
        cy.get('.form-loading').should('not.be.visible');

        cy.get('.currency-select').first().should('have.value', 'USD');
        cy.get('.currency-select').last().should('have.value', 'EUR');

        cy.get('.swap-button').click();

        cy.get('.currency-select').first().should('have.value', 'EUR');
        cy.get('.currency-select').last().should('have.value', 'USD');
    });

    it('verifies the swap button swaps currencies amount correctly', () => {
        // wait after  the  element with class "form-loading" is not visible on the page:
        cy.get('.form-loading').should('not.be.visible');


        cy.get('.currency-input').first().type('100');


        cy.get('.currency-input').last().should('not.have.value', '0');

        cy.get('.swap-button').click();

        cy.get('.currency-input').first().should('not.have.value', '100');
        // check for any value:
           cy.get('.currency-input').last().should('not.have.value', '0');
    });

    it('verifies that after currencies select they are stored as query params and can be loaded after page reload', () => {
    //     currencyFrom=USD&currencyTo=EUR
        cy.get('.currency-select').first().select('USD');
        cy.get('.currency-select').last().select('EUR');

        cy.get('.currency-select').first().should('have.value', 'USD');
        cy.get('.currency-select').last().should('have.value', 'EUR');

        cy.reload();

        cy.get('.currency-select').first().should('have.value', 'USD');
        cy.get('.currency-select').last().should('have.value', 'EUR');
    })
});

describe('Currency Exchange Rates Table', () => {
    beforeEach(() => {
        cy.visit('/rates');
    })
    const HEADERS_ROWS_OFFSET = 2;

    it('Should display rates table', () => {
        cy.get('table').should('be.visible');
    });

    it('should display rates table with 10 rows', () => {

        cy.get('table').find('tr').should('have.length', 10 + HEADERS_ROWS_OFFSET);
    });

    it("per page select should change the number of rows in the table", () => {
        cy.get("#rows-per-page").select("20");
        cy.get('table').find('tr').should('have.length', 20 + HEADERS_ROWS_OFFSET);

        cy.get("#rows-per-page").select("5");
        cy.get('table').find('tr').should('have.length', 5 + HEADERS_ROWS_OFFSET);
    });

    it("should calculate rates correctly", () => {
        cy.get('.currency-input').first().type('100');

        // each table row under the "Value" column should have a value that is not 0
        cy.get('table').find('tr').find('td').eq(2).each(($el) => {
            cy.wrap($el).should('not.have.value', '0');
        });
    });

});