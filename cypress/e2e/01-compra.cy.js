// Flujo Compra exitosa (E2E)
// Caso de prueba: TC-08-001
// Módulo: Checkout | Tipo: Positivo
// Resultado esperado: El producto agregado antes de iniciar sesión sigue en
// el carrito luego del login. El checkout avanza hasta confirmar y se muestra
// el mensaje de confirmación del pedido.

describe("Flujo Compra exitosa (E2E)", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    cy.fixture("checkout").as("checkout");
  });

  it("TC-08-001 | Permite completar una compra de principio a fin", function () {
    // 1. Ir a la página principal y verificar que se muestran productos
    cy.visit("/");
    cy.get('[data-test="product-name"]').should("have.length.greaterThan", 0);

    // 2. Abrir el primer producto y agregarlo al carrito
    cy.get('[data-test="product-name"]').first().click();
    cy.get('[data-test="add-to-cart"]').click();

    // 3. Ir al carrito y verificar que el producto está
    cy.get('[data-test="nav-cart"]').click();
    cy.get('[data-test="product-title"]').should("have.length.greaterThan", 0);

    // 4. Continuar con el checkout (redirige a login si no hay sesión)
    cy.get('[data-test="proceed-1"]').click();

    // 5. Iniciar sesión con el usuario de prueba (datos del fixture)
    cy.get('[data-test="email"]').type(this.users.valid.email);
    cy.get('[data-test="password"]').type(this.users.valid.password);
    cy.get('[data-test="login-submit"]').click();

    // 6. Completar la dirección de facturación
    cy.get('[data-test="proceed-2"]').click();
    cy.get('[data-test="address"]').type(this.checkout.address);
    cy.get('[data-test="city"]').type(this.checkout.city);
    cy.get('[data-test="state"]').type(this.checkout.state);
    cy.get('[data-test="country"]').type(this.checkout.country);
    cy.get('[data-test="postcode"]').type(this.checkout.postcode);

    // 7. Avanzar al pago y seleccionar Cash on Delivery
    cy.get('[data-test="proceed-3"]').click();
    cy.get('[data-test="payment-method"]').select("Cash on Delivery");
    cy.get('[data-test="account-name"]').type(this.checkout.accountName);
    cy.get('[data-test="account-number"]').type(this.checkout.accountNumber);

    // 8. Confirmar la compra
    cy.get('[data-test="finish"]').click();

    // 9. Verificar el mensaje de confirmación del pedido
    cy.contains("Payment was successful").should("be.visible");
  });
});
