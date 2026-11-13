# XAcademy Challenge CY

XAcademy Challenge Cypress

## Casos de prueba

https://docs.google.com/spreadsheets/d/1TLOOQ11iRNS8Cm6WChSnFqbJbHfaEOFLiX5Vy68Lrjk/edit?usp=sharing

## Tablero de Trello

https://trello.com/b/s8VrYxcK

## Integrantes

- Nombre: Erika Nicole Crespi
- email: erikanicolecrespi@gmail.com

---

## Ejecución

Los tests E2E usan `https://with-bugs.practicesoftwaretesting.com` como URL base. 

Para ejecutarlos, abre Cypress con `npx cypress open` o por consola con `npx cypress run`.

### Resultados de Tests

Detalle del resultado de tests ejecutados con `npx cypress run`:

```bash
       Spec                                              Tests  Passing  Failing  Pending  Skipped  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ √  01-compra.cy.js                          00:06        1        1        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  02-registro.cy.js                        619ms        1        1        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  03-contacto.cy.js                        00:01        1        1        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  04-login.cy.js                           00:01        2        2        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  05-busqueda.cy.js                        598ms        1        1        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ×  06-carrito.cy.js                         00:13        3        1        2        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  07-api.cy.js                             264ms        2        2        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ×  1 of 7 failed (14%)                      00:24       11        9        2        -        -  
```
