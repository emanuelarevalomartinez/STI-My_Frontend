import { describe, test, expect, vi, beforeEach } from 'vitest';
import axios from '../../../../../api/axiosConfig';
import { RegisterProfessorRequestInterface, RegisterStudentRequestInterface, ResponseInterface } from '../../../../../shared';
import { RegisterModel } from '../register.service';
import { AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from 'axios'

vi.mock('../../../../../api/axiosConfig.ts', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn()
  }
}));

const makeAxiosError = (message: string, responseData?: any): AxiosError => {
    const dummyConfig: InternalAxiosRequestConfig = {
      url: '/dummy',
      method: 'GET',
      headers: new AxiosHeaders(),
      transformRequest: [],
      transformResponse: [],
      timeout: 0,
      adapter: undefined,
      xsrfCookieName: '',
      xsrfHeaderName: '',
      maxContentLength: -1,
      maxBodyLength: -1,
      transitional: {},
      withCredentials: false,
      paramsSerializer: undefined,
      data: undefined
    };
  
    return new AxiosError(
      message,
      undefined,
      dummyConfig,
      null,
      responseData
        ? {
            data: responseData,
            status: 400,
            statusText: 'Bad Request',
            headers: new AxiosHeaders(),
            config: dummyConfig,
          }
        : undefined
    );
  };

const mockedAxios = axios as unknown as {
  post: ReturnType<typeof vi.fn>,
  get: ReturnType<typeof vi.fn>
};

describe('RegisterModel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('registerUser', () => {
    const testCases: {
      description: string;
      input: RegisterProfessorRequestInterface | RegisterStudentRequestInterface;
      axiosResponse?: any;
      axiosError?: any;
      expected: ResponseInterface;
    }[] = [
      {
        description: 'registro exitoso de profesor',
        input: {
          fullname: 'Ana María Pérez',
          email: 'ana@uci.cu',
          password: 'Pass123',
          role: 'PRINCIPAL_PROFESSOR',
          facultad: 'Facultad 1',
          subject: 'Matemática'
        },
        axiosResponse: { data: { data: { username: 'ana123' } } },
        expected: { success: true, data: { username: 'ana123' } }
      },
      {
        description: 'registro exitoso de estudiante',
        input: {
          fullname: 'Carlos Gómez',
          email: 'carlos@uci.cu',
          password: 'Pass456',
          role: 'STUDENT',
          facultad: 'Facultad 2',
          group: '101',
          academicYear: 2,
          curseType: 'Regular'
        },
        axiosResponse: { data: { data: { username: 'carlos456' } } },
        expected: { success: true, data: { username: 'carlos456' } }
      },
      {
        description: 'error del servidor con mensaje específico',
        input: {
          fullname: 'Pedro Rodríguez',
          email: 'pedro@uci.cu',
          password: '123456',
          role: 'STUDENT',
          facultad: 'Facultad X',
          group: '202',
          academicYear: 3,
          curseType: 'Curso por Encuentro'
        },
        axiosError: makeAxiosError('Bad Request', { message: 'Email ya registrado' }),
        expected: { success: false, error: 'Email ya registrado' }
      },
      {
        description: 'error inesperado sin respuesta del servidor',
        input: {
          fullname: 'Lucía Martínez',
          email: 'lucia@uci.cu',
          password: 'lucia123',
          role: 'PRINCIPAL_PROFESSOR',
          facultad: 'Facultad 5',
          subject: 'Física'
        },
        axiosError: makeAxiosError('Network Error'),
        expected: { success: false, error: 'Network Error' }
      },
      {
        description: 'error inesperado sin ser AxiosError',
        input: {
          fullname: 'Luis Fernández',
          email: 'luis@uci.cu',
          password: 'pass789',
          role: 'PRINCIPAL_PROFESSOR',
          facultad: 'Facultad 6',
          subject: 'Historia'
        },
        axiosError: makeAxiosError('Network Error'),
        expected: { success: false, error: 'Network Error' }
      }
    ];

    testCases.forEach(({ description, input, axiosResponse, axiosError, expected }) => {
      test(description, async () => {
        if (axiosResponse) {
          mockedAxios.post.mockResolvedValueOnce(axiosResponse);
        } else if (axiosError) {
          mockedAxios.post.mockRejectedValueOnce(axiosError);
        }

        const result = await RegisterModel.registerUser(input);
        expect(result).toEqual(expected);
        expect(mockedAxios.post).toHaveBeenCalledWith('/user/', input);
      });
    });
  });

  describe('getAllCurrentsSubjects', () => {
    test('debe devolver lista de asignaturas correctamente', async () => {
      const mockSubjects = [{ id: 1, subjectName: 'Matemática' }, { id: 2, subjectName: 'Física' }];
      mockedAxios.get.mockResolvedValueOnce({ data: mockSubjects });

      const result = await RegisterModel.getAllCurrentsSubjects();

      expect(result).toEqual({
        success: true,
        data: mockSubjects
      });

      expect(mockedAxios.get).toHaveBeenCalledWith('/subject/');
    });

    test('debe manejar errores de tipo AxiosError con mensaje del servidor', async () => {
        mockedAxios.get.mockRejectedValueOnce(
            makeAxiosError('401', { message: 'Network Error' })
          );
        
          const result = await RegisterModel.getAllCurrentsSubjects();
        
          expect(result).toEqual({
            success: false,
            error: 'Network Error'
          });
    });

    test('debe manejar errores inesperados no AxiosError', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Error inesperado'));

      const result = await RegisterModel.getAllCurrentsSubjects();

      expect(result).toEqual({
        success: false,
        error: 'Unexpected Error'
      });
    });
  });
});
