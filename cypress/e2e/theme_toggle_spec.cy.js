// cypress/integration/theme_toggle_spec.js

describe('Theme Toggle', () => {
    it('should toggle between light and dark mode', () => {
      cy.visit('http://localhost:3000/'); // Adjust the URL based on your setup
  
      // Ensure it starts in light mode
      cy.get('html').should('not.have.class', 'dark');
  
      // Click the toggle button
      cy.get('button').contains('Mode').click(); // Adjust button text if needed
  
      // Check that dark mode is applied
      cy.get('html').should('have.class', 'dark');
    });
  });
  