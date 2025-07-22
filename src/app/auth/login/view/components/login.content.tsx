import { LoginForm } from "./loginForm";
import { LoginErrorMessage } from "./login.error.message";

export function LoginContent() {
 

  return (
    <>
      <div className="flex flex-col m-auto max-w-5/6">
        <h1 className="text-center text-4xl sm:text-6xl font-bold mt-2 mb-4 text-white">
          Sistema de Tutoría Inteligente
        </h1>
        <hr className="text-white" />
        <h2 className="text-center text-xl sm:text-2xl font-light text-white">
          Universidad de las Ciencias Informáticas
        </h2>
        <div className="flex h-12 items-center w-full break-words sm:w-4/6 m-auto">
          <LoginErrorMessage/>
        </div>
        <div className="flex justify-center mt-2">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
