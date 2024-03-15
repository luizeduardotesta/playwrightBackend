import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';

let userid: string;
let getResponseBody: any;

test("Create user sucesso", async ({request}) => {
    const email = faker.internet.email();
    const nome = faker.internet.userName();
    const password = faker.internet.password();

  const response = await request.post('https://serverest.dev/usuarios',
    {
      data: {
          "nome": nome,
          "email": email,
          "password": password,
          "administrador": "true"
        }, 
        headers: {
          "Accept": "application/json"
        }
      });

  console.log(await response.json());
  expect(response.status()).toEqual(201);
  
  const responseBody  = await response.json()

  userid = responseBody._id
})

test("Get users by ID", async ({request}) => {
  const response = await request.get('https://serverest.dev/usuarios/'+userid)
  console.log(await response.json());
  expect(response.status()).toEqual(200);

  getResponseBody = await response.json();
})

test("Update user", async ({request}) => {
  expect(getResponseBody).toBeDefined();

  const email = faker.internet.email();

  const response = await request.put('https://serverest.dev/usuarios/'+userid,
    {
      data: {
          "nome": "Fulano da Silva",
          "email": email,
          "password": "teste",
          "administrador": "true"
        }, 
        headers: {
          "Accept": "application/json"
        }
      });

  console.log(await response.json());
  expect(response.status()).toEqual(200);

  const putResponseBody = await response.json();
  expect(putResponseBody.message).toEqual("Registro alterado com sucesso");
})


