// Flujo Validaciones del formulario de registro
// Caso de prueba: TC-03-001
// Módulo: Registro | Tipo: Negativo
// Resultado esperado: No se crea la cuenta. Se muestran mensajes de error de
// campo obligatorio en cada campo requerido.

describe("Flujo Validaciones del formulario de registro", () => {
  beforeEach(() => {
    cy.visit("/#/auth/register");
  });

  it("TC-03-001 | Muestra errores de validación al enviar el formulario vacío", () => {
    // 1. Intentar enviar el formulario sin completar ningún campo
    cy.get('[data-test="register-submit"]').click();

    // 2. Verificar que aparecen los mensajes de error en los campos obligatorios
    cy.get('[data-test="first-name-error"]').should("be.visible");
    cy.get('[data-test="last-name-error"]').should("be.visible");
    cy.get('[data-test="dob-error"]').should("be.visible");
    cy.get('[data-test="address-error"]').should("be.visible");
    cy.get('[data-test="postcode-error"]').should("be.visible");
    cy.get('[data-test="city-error"]').should("be.visible");
    cy.get('[data-test="state-error"]').should("be.visible");
    cy.get('[data-test="country-error"]').should("be.visible");
    cy.get('[data-test="phone-error"]').should("be.visible");
    cy.get('[data-test="email-error"]').should("be.visible");
    cy.get('[data-test="password-error"]').should("be.visible");

    // 3. Verificar que no se creó ninguna cuenta (sigue en la página de registro)
    cy.url().should("include", "/auth/register");
  });
});
