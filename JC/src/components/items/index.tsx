import { useState } from "react";
import { type Apply, type Errors, type ItemProps } from "../../types";
import { handleErrors, handleSubmit } from "../../helpers";

export const Items: React.FC<ItemProps> = ({ id, title, candidate }) => {
//ESTADOS LOCALES
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [inputErrors, setInputErrors] = useState<Errors>({ message: "" });
  const [errorApply, setErrorApply] = useState<string>("");

//HANDLES
  const handleApply = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const validateErrors = handleErrors(repoUrl);
      const hasError = Object.values(validateErrors).some((err) => err !== "");
      if (hasError) return;

      const apply: Apply = {
        uuid: candidate.uuid,
        jobId: id,
        candidateId: candidate.candidateId,
        repoUrl: repoUrl,
        applicationId: candidate.applicationId,
      };      
     handleSubmit(apply);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        const message = error.message;
        setErrorApply(message);
      }
    }
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setRepoUrl(value);
    setInputErrors(handleErrors(value));
  };

  return (
    <>
      {errorApply ? (
        <p className="error">{errorApply}</p>
      ) : (
        <form key={id} onSubmit={handleApply} className="item">
          <h1 className="title">POSICION: {title}</h1>
          <label className="link" htmlFor="repoUrl"> LINK REPOSITORIO GIT</label>
          <input
            type="text"
            name="repoUrl"
            id="repoUrl"
            onChange={handleChangeInput}
            value={repoUrl}
            className="input"
          />
          <p className="error">{inputErrors.message}</p>
          <button className="button" type="submit">POSTULAR</button>
        </form>
      )}
    </>
  );
};
