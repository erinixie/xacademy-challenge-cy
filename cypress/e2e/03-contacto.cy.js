// Flujo Formulario de contacto
// Caso de prueba: TC-04-001
// Módulo: Contacto | Tipo: Positivo
// Resultado esperado: Se muestra mensaje de confirmación del envío:
// "Thanks for your message! We will contact you shortly."

describe("Flujo Formulario de contacto", () => {
  beforeEach(() => {
    cy.fixture("contact").as("contact");
  });

  it("TC-04-001 | Envía el formulario de contacto con datos válidos y muestra confirmación", function () {
    // 1. Ir a la página de contacto
    cy.visit("/#/contact");

    // 2. Completar todos los campos con datos válidos (del fixture)
    cy.fillContactForm(this.contact);

    // 3. Enviar el mensaje
    cy.get('[data-test="contact-submit"]').click();

    // 4. Verificar que se muestra el mensaje de confirmación
    cy.contains("Thanks for your message! We will contact you shortly.").should(
      "be.visible"
    );
  });
});
