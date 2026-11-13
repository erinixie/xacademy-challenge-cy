// Flujo Pruebas de API
// Casos de prueba: TC-09-001, TC-09-002, TC-09-003
// Módulo: API | Se usan cy.request() — sin abrir la página
// API base: https://api-with-bugs.practicesoftwaretesting.com

const API_URL = "https://api-with-bugs.practicesoftwaretesting.com";

describe("Flujo Pruebas de API", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
  });

  // ─── TC-09-001 y TC-09-002 — en el mismo `it` según el enunciado ────────
  // TC-09-001: GET /products → 200 y lista no vacía
  // TC-09-002: POST /users/login con credenciales válidas → 200 y access_token
  it("TC-09-001 + TC-09-002 | GET de productos y login con credenciales válidas", function () {
    // TC-09-001: Pedir la lista de productos
    cy.request("GET", `${API_URL}/products`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.be.an("array");
      expect(response.body.data.length).to.be.greaterThan(0);

      // Verificar que cada ítem tiene id, name y description
      const firstProduct = response.body.data[0];
      expect(firstProduct).to.have.property("id");
      expect(firstProduct).to.have.property("name");
      expect(firstProduct).to.have.property("description");
    });

    // TC-09-002: Iniciar sesión por API con el usuario de prueba
    cy.request({
      method: "POST",
      url: `${API_URL}/users/login`,
      body: {
        email: this.users.valid.email,
        password: this.users.valid.password,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("access_token");
      expect(response.body.access_token).to.be.a("string");
      expect(response.body.access_token.length).to.be.greaterThan(0);
    });
  });

  // ─── TC-09-003 | Negativo ────────────────────────────────────────────────
  // Resultado esperado: Status 401. No se devuelve token de acceso.
  it("TC-09-003 | POST de login con contraseña inválida devuelve 401 sin token", function () {
    cy.request({
      method: "POST",
      url: `${API_URL}/users/login`,
      body: {
        email: this.users.invalid.email,
        password: this.users.invalid.password,
      },
      failOnStatusCode: false, // evita que Cypress falle antes de las aserciones
    }).then((response) => {
      // 1. Verificar status 401
      expect(response.status).to.eq(401);

      // 2. Verificar que no se devuelve token de acceso
      expect(response.body).to.not.have.property("access_token");
    });
  });
});
