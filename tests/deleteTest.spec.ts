import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';

let userid: string;

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


test("Delete user", async ({request}) => {
    const response = await request.delete('https://serverest.dev/usuarios/'+userid)
    console.log(await response.json());
    expect(response.status()).toEqual(200);
    expect((await response.json()).message).toContain("Registro excluído com sucesso");
})

