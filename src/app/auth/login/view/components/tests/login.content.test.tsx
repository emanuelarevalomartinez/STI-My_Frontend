import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "../../../model";
import { LoginContent } from "../login.content";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";
import { JSX } from "react";

const mockStore = configureStore({
  reducer: {
    login: loginReducer,
  },
  preloadedState: {
    login: {
      errorMessageLogin: null,
      authView: "login",
    },
  },
});

describe("Component LoginContent", () => {
  const renderWithProviders = (component: JSX.Element) =>
    render(
      <MemoryRouter>
        <Provider store={mockStore}>{component}</Provider>
      </MemoryRouter>
    );

  it("debe renderizar correctamente los títulos principales", () => {
    renderWithProviders(<LoginContent />);

    expect(
      screen.getByText("Sistema de Tutoría Inteligente")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Universidad de las Ciencias Informáticas")
    ).toBeInTheDocument();
  });

  it("debe mostrar el formulario de inicio de sesión", () => {
    renderWithProviders(<LoginContent />);

    expect(
      screen.getByPlaceholderText("Nombre de Usuario")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
  });

  it("debe mostrar el mensaje de error si está presente", () => {
    mockStore.dispatch({
      type: "login/setErrorMessageLogin",
      payload: "Error en el login",
    });

    renderWithProviders(<LoginContent />);

    expect(screen.getByText("Error en el login")).toBeInTheDocument();
  });
});
