// Flujo Búsqueda de productos
// Caso de prueba: TC-06-001
// Módulo: Búsqueda | Tipo: Positivo
// Resultado esperado: Se listan productos cuyo nombre o descripción coincide
// con el término buscado. Cada resultado muestra nombre, imagen y precio.

describe("Flujo Búsqueda de productos", () => {
  const searchTerm = "Hammer";

  it("TC-06-001 | Busca un producto existente y muestra resultados relevantes", () => {
    // 1. Entrar a la página principal
    cy.visit("/");

    // 2. Escribir en el buscador el nombre de una herramienta del catálogo
    cy.get('[data-test="search-query"]').type(searchTerm);

    // 3. Ejecutar la búsqueda
    cy.get('[data-test="search-submit"]').click();

    // 4. Verificar que aparecen resultados
    cy.get('[data-test="product-name"]').should("have.length.greaterThan", 0);

    // 5. Verificar que al menos un producto contiene el término buscado
    cy.get('[data-test="product-name"]').should(($productNames) => {
      const hasMatchingProduct = [...$productNames].some((productName) =>
        productName.textContent
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      );

      expect(hasMatchingProduct).to.be.true;
    });
  });
});
