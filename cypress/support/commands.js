// ─── Custom Command: login ──────────────────────────────────────────────────
// Navega a la página de login e inicia sesión con el email y password recibidos.
// Uso: cy.login('email@test.com', 'password123')
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/#/auth/login");
  cy.get('[data-test="email"]').clear().type(email);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-submit"]').click();
});

// ─── Custom Command: fillContactForm ────────────────────────────────────────
// Completa el formulario de contacto con los datos del objeto recibido.
// Uso: cy.fillContactForm({ firstName, lastName, email, subject, message })
Cypress.Commands.add("fillContactForm", (data) => {
  cy.get('[data-test="first-name"]').clear().type(data.firstName);
  cy.get('[data-test="last-name"]').clear().type(data.lastName);
  cy.get('[data-test="email"]').clear().type(data.email);
  cy.get('[data-test="subject"]').select(data.subject);
  cy.get('[data-test="message"]').clear().type(data.message);
});

// ─── Custom Command: addFirstProductToCart ──────────────────────────────────
// Desde la página principal, abre el primer producto y lo agrega al carrito.
// Uso: cy.addFirstProductToCart()
Cypress.Commands.add("addFirstProductToCart", () => {
  cy.visit("/");
  cy.get('[data-test="product-name"]').first().click();
  cy.get('[data-test="add-to-cart"]').click();
});
