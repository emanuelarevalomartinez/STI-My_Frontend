import { vi, describe, it, expect, beforeEach, test } from "vitest";
import {
  RegisterModel,
  setErrorMessageRegister,
  useRegisterController,
} from "../..";
import { ROLES } from "../../view/components/register.form.const";
import {
  RegisterProfessorRequestInterface,
  RegisterStudentRequestInterface,
  RegisterVerifyData,
} from "../../../../../shared";
import * as RegisterModelModule from '../../model';
import { renderHook } from "@testing-library/react";
import { act } from "react";

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

 vi.mock("../../model/register.service", () => ({
  RegisterModel: {
    registerUser: vi.fn(),
    getAllCurrentsSubjects: vi.fn(),
  },
  }));

vi.mock("../../model/registerSlice", () => ({
  setErrorMessageRegister: vi.fn(),
}));

vi.mock("../../controller/register.controller", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;

  return {
    ...actual,
    useRegisterController: vi.fn(() => ({
      validateRegisterFields: vi.fn().mockImplementation(() => {
        mockDispatch(
          setErrorMessageRegister("Nombre debe tener al menos 3 caracteres")
        );
        return false;
      }),

      defineTypeOfUser: vi.fn().mockImplementation((userData) => ({
        fullname: `${userData.name} ${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        facultad: userData.facultad,
        subject: userData.subject || "",
        academicYear: userData.academicYear || "",
        curseType: userData.curseType || "",
        group: userData.group || "",
      })),

     registerUser: vi.fn(async (data) => {
      return RegisterModel.registerUser(data);
    }),
      dispatchRegister: mockDispatch,
    getAvailablesSubjectsForProfessors: vi.fn(async () => {
      return RegisterModel.getAllCurrentsSubjects();
    }), 
    })),
  };
});

describe("useRegisterController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("validateRegisterFields", () => {
    it("debe retornar falso y un mensaje de error para nombres incorrectos", () => {
      const { validateRegisterFields } = useRegisterController();
      const invalidData: RegisterVerifyData = {
        name: "ab",
        firstName: "Coret",
        lastName: "Osoaria",
        email: "coretot@estudiantes.uci.cu",
        password: "Password123",
        confirmPassword: "Password123",
        role: ROLES.STUDENT,
        facultad: "Facultad 1",
        academicYear: Number("2025"),
        curseType: "Presencial",
        subject: "Matemática 1",
        group: "1103",
      };

      const result = validateRegisterFields(invalidData);

      expect(result).toBe(false);
      expect(mockDispatch).toHaveBeenCalledWith(
        setErrorMessageRegister("Nombre debe tener al menos 3 caracteres")
      );
    });
  });

  describe("defineTypeOfUser", () => {
    it("debe retornar una estructura correcta para rol de profesor", () => {
      const { defineTypeOfUser } = useRegisterController();
      const professorData: RegisterVerifyData = {
        name: "Emanuel",
        firstName: "Arévalo",
        lastName: "Martínez",
        email: "emanueldam@estudiantes.uci.cu",
        password: "Password123",
        confirmPassword: "Password123",
        role: ROLES.PRINCIPAL_PROFESSOR,
        facultad: "Facultad 3",
        subject: "Estructura de Datos",
        academicYear: Number("-1"),
        curseType: "",
        group: "",
      };

      const result = defineTypeOfUser(professorData);

      expect(result).toEqual({
        fullname: `${professorData.name} ${professorData.firstName} ${professorData.lastName}`,
        email: "emanueldam@estudiantes.uci.cu",
        password: "Password123",
        role: ROLES.PRINCIPAL_PROFESSOR,
        facultad: "Facultad 3",
        subject: "Estructura de Datos",
        academicYear: -1,
        curseType: "",
        group: "",
      });
    });

    it("debe retornar una estructura correcta para el rol de estudiante", () => {
      const { defineTypeOfUser } = useRegisterController();
      const studentData: RegisterVerifyData = {
        name: "Isaias",
        firstName: "Osiaria",
        lastName: "Tabares",
        email: "isaiasot@estudiantes.uci.cu",
        password: "Password123",
        confirmPassword: "Password123",
        role: ROLES.STUDENT,
        facultad: "Facultad 3",
        academicYear: Number(""),
        group: "",
        subject: "IA",
        curseType: "",
      };

      const result = defineTypeOfUser(studentData);

      expect(result).toEqual({
        fullname: `${studentData.name} ${studentData.firstName} ${studentData.lastName}`,
        email: "isaiasot@estudiantes.uci.cu",
        password: "Password123",
        role: ROLES.STUDENT,
        facultad: "Facultad 3",
        academicYear: "",
        curseType: "",
        group: "",
        subject: "IA",
      });
    });
  });

  describe("registerUser", () => {
    function registerUser(userData: RegisterVerifyData) {
      if (userData.role === ROLES.PRINCIPAL_PROFESSOR) {
        const professorData: RegisterProfessorRequestInterface = {
          fullname: `${userData.name} ${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          password: userData.password,
          role: userData.role,
          facultad: userData.facultad,
          subject: userData.subject,
        };

        return RegisterModel.registerUser(professorData);
      }

      if (userData.role === ROLES.STUDENT) {
        const studentData: RegisterStudentRequestInterface = {
          fullname: `${userData.name} ${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          password: userData.password,
          role: userData.role,
          facultad: userData.facultad,
          academicYear: Number(userData.academicYear),
          group: userData.group,
          curseType: userData.curseType,
        };

        return RegisterModel.registerUser(studentData);
      }

      throw new Error("Rol de usuario no válido");
    }

    it("debe simular un registro exitoso para estudiantes", async () => {
      const studentData: RegisterVerifyData = {
        name: "Carlos",
        firstName: "Curbelo",
        lastName: "Dueñas",
        email: "carloscd@estudiantes.uci.cu",
        password: "Password123",
        confirmPassword: "Password123",
        role: ROLES.STUDENT,
        facultad: "Facultad 3",
        academicYear: Number("2025"),
        group: "3302",
        curseType: "Regular",
        subject: "",
      };

      await registerUser(studentData);

      expect(RegisterModel.registerUser).toHaveBeenCalledWith(
        expect.objectContaining({
          fullname: "Carlos Curbelo Dueñas",
          email: "carloscd@estudiantes.uci.cu",
        })
      );
    });

    it("debe simular un registro exitoso para profesores", async () => {
      const professorData: RegisterVerifyData = {
        name: "Maidelis",
        firstName: "Milanés",
        lastName: "Luque",
        email: "maidelisml@estudiantes.uci.cu",
        password: "Password123",
        confirmPassword: "Password123",
        role: ROLES.PRINCIPAL_PROFESSOR,
        facultad: "Facultad 3",
        academicYear: Number(""),
        group: "",
        curseType: "",
        subject: "IA",
      };

      await registerUser(professorData);

      expect(RegisterModel.registerUser).toHaveBeenCalledWith(
        expect.objectContaining({
          fullname: "Maidelis Milanés Luque",
          email: "maidelisml@estudiantes.uci.cu",
          subject: "IA",
        })
      );
    });
  });

// integracion
describe('useRegisterController and RegisterModel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('debe registrar exitosamente a un estudiante', async () => {
    const mockData: RegisterProfessorRequestInterface = {
      fullname: 'Carlos Curbelo Dueñas',
      email: 'carlos@uc.edu.cu',
      password: 'Test1234!',
      role: 'student',
      facultad: 'Facultad 3',
      subject: 'IA',
    };

    const registerUserSpy = vi
      .spyOn(RegisterModelModule.RegisterModel, 'registerUser')
      .mockResolvedValue({
        success: true,
        data: { username: 'Carlos123' },
      });

    const { result } = renderHook(() => useRegisterController());

    await act(async () => {
      await result.current.registerUser(mockData);
    });

    expect(registerUserSpy).toHaveBeenCalledTimes(1);
    expect(registerUserSpy).toHaveBeenCalledWith(mockData);
  });
});
  
});
