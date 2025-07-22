import { FormEvent, useState } from "react";
import { Input, Select } from "../../../../../common";
import { Button } from "../../../../../common/buttons/Button";
import {
  FIELD_PLACEHOLDER_GROUP_TEXT,
  FIELD_PLACEHOLDER_PASSWORD_CONFIRM_TEXT,
  FIELD_PLACEHOLDER_PASSWORD_TEXT,
  FIELD_PLACEHOLDER_USER_EMAIL_TEXT,
  FIELD_PLACEHOLDER_USER_NAME_FIRST_NAME_TEXT,
  FIELD_PLACEHOLDER_USER_NAME_LAST_NAME_TEXT,
  FIELD_PLACEHOLDER_USER_NAME_TEXT,
} from "./register.form.dictionary";
import { ACADEMIC_YEAR_OPTIONS, COURSE_TYPE_OPTIONS, DEFAULT, FACULTAD_OPTIONS, ROLE_OPTIONS, ROLES } from "./register.form.const";
import { RegisterVerifyData, SubjectTransformInterface } from "../../../../../shared/interfaces";
import { useRegisterController } from "../../controller";
import { formatTextWhithSpaces } from "../../../../../shared";

export function RegisterForm() {
  const { validateRegisterFields, defineTypeOfUser, registerUser, getAvailablesSubjectsForProfessors } = useRegisterController();

  const [subjects, setSubjects] = useState<SubjectTransformInterface[]>([]);

  const [formData, setFormData] = useState({
    userName: "",
    userNameFirstName: "",
    userNameLastName: "",
    userGroup: "",
    subject: "",
    typeOfCourse: "",
    role: "",
    userEmail: "",
    userPassword: "",
    userPasswordConfirm: "",
    academicYear: 0,
    userFaculty: "",
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "role") {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
        academicYear: 0,
        curseType: "",
        group: "",
        subject: "",
      }));
  
      if (value === ROLES.PRINCIPAL_PROFESSOR || value === ROLES.AUXILIAR_PROFESSOR) {
        const availableSubjects = await getAvailablesSubjectsForProfessors();
        setSubjects(availableSubjects);
      } else {
        setSubjects([]);
      }
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: RegisterVerifyData = {
      name: formData.userName,
      firstName: formData.userNameFirstName,
      lastName: formData.userNameLastName,
      email: formData.userEmail,
      password: formData.userPassword,
      confirmPassword: formData.userPasswordConfirm,
      role: formData.role,
      facultad: formData.userFaculty,
      group: formData.userGroup,
      academicYear: formData.academicYear,
      curseType: formData.typeOfCourse,
      subject: formData.subject,
    };

    if (validateRegisterFields(data)) {
      const newUser = defineTypeOfUser(data);
      registerUser(newUser);
    } else {
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-2 sm:w-[600px] w-[400px]">
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <Input
          type="text"
          name="userName"
          placeholder={FIELD_PLACEHOLDER_USER_NAME_TEXT}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="userNameFirstName"
          placeholder={FIELD_PLACEHOLDER_USER_NAME_FIRST_NAME_TEXT}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="userNameLastName"
          placeholder={FIELD_PLACEHOLDER_USER_NAME_LAST_NAME_TEXT}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row w-full gap-2">
        <Input
          type="email"
          name="userEmail"
          placeholder={FIELD_PLACEHOLDER_USER_EMAIL_TEXT}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="userPassword"
          placeholder={FIELD_PLACEHOLDER_PASSWORD_TEXT}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row w-full gap-2">
        <Input
          type="password"
          name="userPasswordConfirm"
          placeholder={FIELD_PLACEHOLDER_PASSWORD_CONFIRM_TEXT}
          onChange={handleChange}
          required
        />
        <Select
          name="userFaculty"
          onChange={handleChange}
          required
        >
          <option value={DEFAULT}>Facultad</option>
          {FACULTAD_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </Select>
      </div>

      <Select
        name="role"
        onChange={handleChange}
        required
      >
        <option value={DEFAULT}>Estatus</option>
        {ROLE_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </Select>

      {formData.role === ROLES.STUDENT && (
        <div className="flex flex-col sm:flex-row w-full gap-2">
          <Select
            name="academicYear"
            onChange={handleChange}
            required
          >
            <option value={0}>Año Académico</option>
            {ACADEMIC_YEAR_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
          <Select
            name="typeOfCourse"
            onChange={handleChange}
            required
          >
            <option value={DEFAULT}>Tipo de Curso</option>
            {COURSE_TYPE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
          <Input
            type="text"
            name="userGroup"
            placeholder={FIELD_PLACEHOLDER_GROUP_TEXT}
            onChange={handleChange}
            required
          />
        </div>
      )}

      {(formData.role === ROLES.PRINCIPAL_PROFESSOR || formData.role === ROLES.AUXILIAR_PROFESSOR) && (
        <Select
          name="subject"
          onChange={handleChange}
          required
        >
          <option value={DEFAULT}>Asignatura que imparte</option>
          {subjects.map(option => (
            <option key={option.value} value={option.value}>
              {formatTextWhithSpaces(option.label).toUpperCase()}
              </option>
          ))}
        </Select>
      )}
      <Button className="mt-4" variant="primary">Registrarse</Button>
    </form>
  );
}