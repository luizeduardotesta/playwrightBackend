import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';

let userid: string;
let postResponseBody: any;

test("Create user", async ({request}) => {
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
    
    postResponseBody = await response.json();
    userid = postResponseBody._id;
})

test("Get users by ID", async ({request}) => {
    expect(postResponseBody).toBeDefined();

    const response = await request.get('https://serverest.dev/usuarios/'+userid)
    console.log(await response.json());
    expect(response.status()).toEqual(200);
    
    const getResponseBody = await response.json();

    expect(getResponseBody._id).toEqual(postResponseBody._id);
})