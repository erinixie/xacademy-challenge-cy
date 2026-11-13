// Flujo Carrito de compras
// Casos de prueba: TC-07-001, TC-07-002 y TC-07-003 (Positivos)
// Módulo: Carrito
// NOTA: Los tests cubren BUG-006, BUG-007 y BUG-008.
// Los tests verifican el comportamiento ESPERADO; fallan porque el bug existe.

describe("Flujo Carrito de compras", () => {
  // ─── TC-07-001 | Positivo ────────────────────────────────────────────────
  // Resultado esperado: El producto aparece en el carrito con su nombre,
  // precio y cantidad 1. El precio coincide con el del catálogo.
  it("TC-07-001 | Agrega un producto al carrito correctamente", () => {
    // 1. Ir a la página principal y abrir el primer producto
    cy.visit("/");
    cy.get('[data-test="product-name"]').first().as("productName");

    // Guardar el nombre del producto para verificarlo luego
    cy.get("@productName")
      .invoke("text")
      .then((name) => {
        cy.wrap(name.trim()).as("expectedName");
      });

    cy.get("@productName").first().click();

    // 2. Agregar el producto al carrito
    cy.get('[data-test="add-to-cart"]').click();

    // 3. Ir al carrito
    cy.get('[data-test="nav-cart"]').click();

    // 4. Verificar que el producto está en el carrito con cantidad 1
    cy.get('[data-test="product-title"]').should("have.length", 1);
    cy.get('[data-test="product-quantity"]').should("have.value", "1");

    // 5. Verificar que el nombre del producto en el carrito coincide
    cy.get("@expectedName").then((name) => {
      cy.get('[data-test="product-title"]').should("contain.text", name);
    });
  });

  // ─── TC-07-002 | Positivo ────────────────────────────────────────────────
  // Resultado esperado: Agregar dos veces el mismo producto actualiza la
  // cantidad del carrito a 2.
  it("TC-07-002 | Actualiza la cantidad al agregar el mismo producto dos veces", () => {
    // 1. Abrir un producto y agregarlo al carrito
    cy.visit("/");
    cy.get('[data-test="product-name"]').first().click();
    cy.get('[data-test="add-to-cart"]').click();

    // 2. Agregar nuevamente el mismo producto
    cy.get('[data-test="add-to-cart"]').click();

    // 3. Verificar que se mantiene una línea con cantidad 2
    cy.get('[data-test="nav-cart"]').click();
    cy.get('[data-test="product-title"]').should("have.length", 1);
    cy.get('[data-test="product-quantity"]').should("have.value", "2");
    cy.get('[data-test="cart-quantity"]').should("have.text", "2");
  });

  // ─── TC-07-003 | Positivo ────────────────────────────────────────────────
  // Resultado esperado: El producto se elimina de la lista. El total se
  // actualiza a 0 y se muestra el carrito vacío.
  it("TC-07-003 | Elimina un producto del carrito y lo deja vacío", () => {
    // 1. Usar el custom command para agregar el primer producto al carrito
    cy.addFirstProductToCart();

    // 2. Ir al carrito y verificar que el producto está
    cy.get('[data-test="nav-cart"]').click();
    cy.get('[data-test="product-title"]').should("have.length.greaterThan", 0);

    // 3. Eliminar el producto
    cy.get('[data-test="product-title"]')
      .first()
      .closest("tr")
      .find(".btn-danger")
      .click();

    // 4. Verificar que el carrito queda vacío
    cy.get('[data-test="product-title"]').should("not.exist");
    cy.contains("Your cart is empty").should("be.visible");
  });
});
