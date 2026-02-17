import type { Apply, CandidateProps, Errors, PositionsProps } from "../types";

const baseUrl = import.meta.env.VITE_BASE_URL;
const email = import.meta.env.VITE_EMAIL;

//HANDLE PARA GET DE DATOS 
export const handleGetData = async (): Promise<CandidateProps> => {
  const query = new URLSearchParams({
    email: email,
  });
  const request = await fetch(
    `${baseUrl}/api/candidate/get-by-email?${query.toString()}`,
    {
      method: "GET",
    },
  );
  if (!request.ok) {
    throw new Error(
      `Error Http :${request.status}. Error al obtener los datos del candidato`,
    );
  }
  const response: CandidateProps = await request.json();
  if (!response)
    throw new Error(
      "ocurrio un error al obtener datos del candidato, intenta nuevamente",
    );

  const normalized = normalizeData(response);
  return normalized;
};

//NORMALIZADOR DE DATOS
const normalizeData = (data: CandidateProps): CandidateProps => {
  if (!data)
    throw new Error(
      "error inesperado con la informacion del candidato, intenta nuevamente",
    );
  return {
    uuid: data.uuid,
    candidateId: data.candidateId,
    applicationId: data.applicationId,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
  };
};

//GET DE POSICIONES
export const handleGetPositions = async (): Promise<PositionsProps[]> => {
  const request = await fetch(`${baseUrl}/api/jobs/get-list`, {
    method: "GET",
  });
  if (!request.ok) {
    throw new Error(
      `Error Http :${request.status}. Error al obtener listado de posiciones`,
    );
  }
  const response: PositionsProps[] = await request.json();
  if (!response)
    throw new Error(
      "ocurrio un error al obtener el listado de posiciones, intenta nuevamente",
    );
  return response;
};

//SUBMIT DE POSTULACION
export const handleSubmit = async (data: Apply) => {
  const request = await fetch(`${baseUrl}/api/apply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!request.ok) {
    throw new Error(
      `Error Http :${request.status}. Error al enviar la postulacion`,
    );
  }
  const response = await request.json();
  if (response.ok === false) throw new Error("ocurrio un error al postular");
  if (response.ok === true) {
    console.log("postulacion exitosa");
  }
};

//CONTROL DE ERRORES DEL INPUT
export const handleErrors = (repoUrl: string): Errors => {
  const errors: Errors = {
    message: "",
  };
  const repoRegex = /\bhttps:\/\/github\.com\/[^\/]+\/[^\/]+\.git\b/;

  if (!repoUrl.trim()) {
    errors.message = "el campo es requerido para continuar";
  } else if (!repoRegex.test(repoUrl.trim())) {
    errors.message =
      "formato incompatible ingrese la direccion del repositorio git";
  }
  return errors;
};
