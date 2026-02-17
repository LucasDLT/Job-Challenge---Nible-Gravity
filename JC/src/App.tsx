import "./App.css";
import { useState, useEffect } from "react";
import { SectionPositions } from "./components/section";
import { handleGetData, handleGetPositions } from "./helpers";
import {
  type CandidateProps,
  InitialStateCandidate,
  type PositionsProps,
} from "./types";

export interface errorProps {
  message: string;
}
function App() {
//ESTADOS LOCALES
  const [candidate, setCandidate] = useState<CandidateProps>(
    InitialStateCandidate,
  );
  const [positions, setPositions] = useState<PositionsProps[]>([]);

  const [errors, setErrors] = useState<string>("");

//EFFECT PARA HANDLES
  useEffect(() => {
    const loadStates = async () => {
      try {
        const dataCandidate = await handleGetData();
        setCandidate(dataCandidate);
        const dataPositions = await handleGetPositions();
        setPositions(dataPositions);
      } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) setErrors(error.message);
      }
    };

    loadStates();
  }, []);

  return (
    <main className="main">
      {errors ? (
        <p>{errors}</p>
      ) : (
        <>
          <h1>Listado de Posiciones </h1>
          <SectionPositions positions={positions} candidate={candidate} />
        </>
      )}
    </main>
  );
}

export default App;
