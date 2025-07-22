import { describe, it, expect, beforeEach, afterEach } from "vitest";
import axios from "../../../../../api/axiosConfig";
import { LoginRequestInterface, ResponseInterface } from "../../../../../shared/interfaces";
import AxiosMockAdapter from "axios-mock-adapter";
import { LoginModel } from "../login.service";

describe("Unit Test LoginModel", () => {
  let mockAxios: AxiosMockAdapter;

  beforeEach(() => {
    mockAxios = new AxiosMockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it("debe autenticar exitosamente al usuario con rol de administrador", async () => {
    const mockUserData: LoginRequestInterface = { username: "adminUser", password: "securePass" };
  
    mockAxios.onPost("/auth/login/").reply(200, {
      data: { userId: "999", token: "superSecretToken", role: "admin" }
    });
  
    const result: ResponseInterface = await LoginModel.loginUser(mockUserData);
  
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ userId: "999", token: "superSecretToken", role: "admin" });
  });
  
  it("debe autenticar exitosamente al usuario con datos mínimos", async () => {
    const mockUserData: LoginRequestInterface = { username: "simpleUser", password: "123456" };
  
    mockAxios.onPost("/auth/login/").reply(200, {
      data: { userId: "456", token: "basicToken" }
    });
  
    const result: ResponseInterface = await LoginModel.loginUser(mockUserData);
  
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ userId: "456", token: "basicToken" });
  });
  
  
  it("debe manejar error de autenticación cuando la contraseña es incorrecta", async () => {
    const mockUserData: LoginRequestInterface = { username: "validUser", password: "wrongPassword" };
  
    mockAxios.onPost("/auth/login/").reply(401, {
      message: "Error inesperado"
    });
  
    const result: ResponseInterface = await LoginModel.loginUser(mockUserData);
  
    expect(result.success).toBe(false);
    expect(result.error).toBe("Error inesperado");
  });
  

  it("debe manejar errores inesperados por tiempo de espera agotado", async () => {
    const mockUserData: LoginRequestInterface = { username: "testUser", password: "password123" };
  
    mockAxios.onPost("/auth/login/").timeout();
  
    const result: ResponseInterface = await LoginModel.loginUser(mockUserData);
  
    expect(result.success).toBe(false);
    expect(result.error).toBe("Error inesperado");
  });
  
  it("debe manejar error inesperado cuando el servidor devuelve un error 500", async () => {
    const mockUserData: LoginRequestInterface = { username: "testUser", password: "password123" };
  
    mockAxios.onPost("/auth/login/").reply(500);
  
    const result: ResponseInterface = await LoginModel.loginUser(mockUserData);
  
    expect(result.success).toBe(false);
    expect(result.error).toBe("Error inesperado");
  });
  
});
