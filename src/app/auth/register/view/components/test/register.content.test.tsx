import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RegisterContent } from '../register.content';


vi.mock('../registerForm', () => ({
  RegisterForm: () => <div data-testid="register-form">Mocked RegisterForm</div>
}));

vi.mock('../register.error.message', () => ({
  RegisterError: () => <div data-testid="register-error">Mocked RegisterError</div>
}));

describe('RegisterContent', () => {
  test('debe renderizar los títulos principales correctamente', () => {
    render(<RegisterContent />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /sistema de tutoría inteligente/i
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /universidad de las ciencias informáticas/i
      })
    ).toBeInTheDocument();
  });

  test('debe mostrar el componente RegisterError', () => {
    render(<RegisterContent />);
    expect(screen.getByTestId('register-error')).toBeInTheDocument();
  });

  test('debe mostrar el componente RegisterForm', () => {
    render(<RegisterContent />);
    expect(screen.getByTestId('register-form')).toBeInTheDocument();
  });
});
