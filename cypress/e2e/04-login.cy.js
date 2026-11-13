// Flujo Inicio de sesión
// Casos de prueba: TC-02-001 (Negativo) y TC-02-002 (Positivo)
// Módulo: Login

describe("Flujo Inicio de sesión", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
  });

  // ─── TC-02-001 | Negativo ────────────────────────────────────────────────
  // Resultado esperado: Mensaje de credenciales incorrectas.
  // El usuario permanece en la página de login.
  it("TC-02-001 | Muestra error al iniciar sesión con contraseña incorrecta", function () {
    // 1. Ir a la página de login
    cy.visit("/#/auth/login");

    // 2. Ingresar email válido con contraseña incorrecta (datos del fixture)
    cy.get('[data-test="email"]').type(this.users.invalid.email);
    cy.get('[data-test="password"]').type(this.users.invalid.password);

    // 3. Enviar el formulario
    cy.get('[data-test="login-submit"]').click();

    // 4. Verificar que aparece mensaje de error
    cy.get('[data-test="login-error"]').should("be.visible");
    cy.contains("Invalid email or password").should("be.visible");

    // 5. Verificar que no se inició sesión (sigue en la página de login)
    cy.url().should("include", "/auth/login");
  });

  // ─── TC-02-002 | Positivo ────────────────────────────────────────────────
  // Resultado esperado: Se inicia sesión correctamente con el usuario de prueba.
  // Se muestra la cuenta del usuario. No hay mensajes de error.
  it("TC-02-002 | Inicia sesión correctamente con credenciales válidas", function () {
    // 1. Usar el custom command login con datos del fixture
    cy.login(this.users.valid.email, this.users.valid.password);

    // 2. Verificar que se inició sesión (aparece el nombre/cuenta del usuario)
    cy.get('[data-test="nav-user-menu"]').should("be.visible");
    cy.url().should("not.include", "/auth/login");

    // 3. Verificar que no se muestra ningún mensaje de error
    cy.get('[data-test="login-error"]').should("not.exist");
  });
});
