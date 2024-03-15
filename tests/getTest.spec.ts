import { test, expect } from '@playwright/test';


test("Get users", async ({request}) => {

    const response = await request.get('https://serverest.dev/usuarios')
    expect(response.status()).toEqual(200);
    const responseBody = await response.json();
    expect(responseBody.usuarios.length).toBeGreaterThan(0);
})