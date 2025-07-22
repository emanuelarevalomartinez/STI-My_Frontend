import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { useLoginController } from "../login.controller";
import { LoginModel, setErrorMessageLogin } from "../../model";
import axios from "../../../../../api/axiosConfig";
import { setAuthToken } from "../../../../../api/axiosConfig";
import { ADMIN_ROUTES } from "../../../../../routes";
import { ROLES } from "../../../register/view/components/register.form.const";
import { setUserNameLocalStorage } from "../../../../../store/browser";

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));


vi.mock("../../../../../store/browser", () => ({
  getAuthPageLocalStorageOrLogin: vi.fn(() => "login"),
  setUserNameLocalStorage: vi.fn(),
  setStudentFirstTimeOnSystemLocalStorage: vi.fn(),
}));

vi.mock("../../../../../api/axiosConfig", () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: {} })),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  },
  setAuthToken: vi.fn(),
}));

describe("useLoginController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("validateLoginFields", () => {
    const validCases = [
      {
        description: "username normal y password complejo",
        data: { username: "usuarioValido", password: "Password1!" },
      },
      {
        description: "username con números",
        data: { username: "user123", password: "Secure1@" },
      },
      {
        description: "username con guiones bajos",
        data: { username: "user_name", password: "P@ssw0rd" },
      },
      {
        description: "username con 3 caracteres (límite mínimo)",
        data: { username: "usr", password: "A1@bcdef" },
      },
      {
        description: "password con múltiples caracteres especiales",
        data: { username: "admin", password: "P@$$w0rd!123" },
      },
    ];

    const invalidCases = [
      {
        description: "username vacío",
        data: { username: "", password: "Password1!" },
      },
      {
        description: "username con espacios",
        data: { username: "  ", password: "Password1!" },
      },
      {
        description: "password vacío",
        data: { username: "usuario", password: "" },
      },
      {
        description: "password sin números",
        data: { username: "usuario", password: "Password@" },
      },
      {
        description: "password sin mayúsculas",
        data: { username: "usuario", password: "password1@" },
      },
      {
        description: "password sin caracteres especiales",
        data: { username: "usuario", password: "Password1" },
      },
      {
        description: "password demasiado corto",
        data: { username: "usuario", password: "P@1" },
      },
      {
        description: "ambos campos inválidos",
        data: { username: "u", password: "p" },
      },
    ];

    validCases.forEach(({ description, data }) => {
      it(`debe aceptar ${description}`, () => {
        const { result } = renderHook(() => useLoginController());
        const isValid = result.current.validateLoginFields(data);
        expect(isValid).toBe(true);
        expect(mockDispatch).toHaveBeenCalledWith(setErrorMessageLogin(null));
      });
    });

    invalidCases.forEach(({ description, data }) => {
      it(`debe rechazar ${description}`, () => {
        const { result } = renderHook(() => useLoginController());
        const isValid = result.current.validateLoginFields(data);
        expect(isValid).toBe(false);
        expect(mockDispatch).toHaveBeenCalledWith(
          setErrorMessageLogin(expect.any(String))
        );
      });
    });
  });

  // 2

  describe("sendLoginData", () => {
    beforeEach(() => {
      vi.clearAllMocks();
      mockedAxiosPost.mockReset();
      mockedAxiosPost.mockImplementation(() => Promise.resolve({ data: {} }));
    });

    const mockedAxiosPost = axios.post as ReturnType<typeof vi.fn>;

    it("debe manejar login exitoso", async () => {
      mockedAxiosPost.mockResolvedValueOnce({
        data: {
          data: {
            username: "emanueldam",
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYW51ZWxkYW1AZXN0dWRpYW5udGVzLnVjaS5jdSIsImlhdCI6MTc0NjUyNzI5NiwiZXhwIjoxNzQ2NTM0NDk2fQ.Wll3Tw4T2X-bCrwpFwlHJapIioIL3GhLGyG1DYVhESk",
            role: ROLES.ADMIN,
            firstTime: false,
          },
        },
      });

      
      const { result } = renderHook(() => useLoginController());

      await act(async () => {
        await result.current.sendLoginData({
          username: "emanueldam",
          password: "Admin123!",
        });
      });

      expect(mockedAxiosPost).toHaveBeenCalledTimes(1);
      expect(mockedAxiosPost).toHaveBeenCalledWith("/auth/login/", {
        username: "emanueldam",
        password: "Admin123!",
      });

      expect(setAuthToken).toHaveBeenCalledWith(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYW51ZWxkYW1AZXN0dWRpYW5udGVzLnVjaS5jdSIsImlhdCI6MTc0NjUyNzI5NiwiZXhwIjoxNzQ2NTM0NDk2fQ.Wll3Tw4T2X-bCrwpFwlHJapIioIL3GhLGyG1DYVhESk"
      );
      expect(setUserNameLocalStorage).toHaveBeenCalledWith("emanueldam");
      expect(mockNavigate).toHaveBeenCalledWith(ADMIN_ROUTES.HOME);
    });
  });

  describe("LoginController + LoginModel", () => {
    afterEach(() => {
      vi.restoreAllMocks();
      vi.resetAllMocks();
    });
  
    const testCases = [
      { username: "adminUser", password: "AdminPass1!" },
      { username: "user1234", password: "UserSecure!@1" },
      { username: "guestUser", password: "GuestPass@" },
      { username: "special_chars", password: "Pass#$%^&*" },
      { username: "shortName", password: "Short1!" },
      { username: "long_username_example", password: "SecurePa$$word123!" },
      { username: "validUser", password: "NoUsername123!" },
      { username: "validUser", password: "NoUser345Poni*" },
      { username: "validUser", password: "NoNumbers!" },
    ];
  
    testCases.forEach(({ username, password }) => {
      it(`Debe probar login con username "${username}" y password "${password}"`, async () => {
        vi.spyOn(axios, "post").mockResolvedValueOnce({
          data: {
            data: {
              username,
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYW51ZWxkYW1AZXN0dWRpYW5udGVzLnVjaS5jdSIsImlhdCI6MTc0NjUyNzI5NiwiZXhwIjoxNzQ2NTM0NDk2fQ.Wll3Tw4T2X-bCrwpFwlHJapIioIL3GhLGyG1DYVhESk",
              role: "STUDENT",
              firstTime: false,
            },
          },
        });
  
        const response = await LoginModel.loginUser({ username, password });
  
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith("/auth/login/", { username, password });
  
        if (username && password) {
          expect(response.success).toBe(true);
          expect(response.data.username).toBe(username);
        } else {
          expect(response.success).toBe(false);
        }
      });
    });
  });
  
});
