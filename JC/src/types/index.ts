export interface CandidateProps {
  uuid: string;
  candidateId: string;
  applicationId: string;
  firstName: string;
  lastName: string;
  email: string;
}
export const InitialStateCandidate: CandidateProps = {
  uuid: "",
  candidateId: "",
  applicationId: "",
  firstName: "",
  lastName: "",
  email: "",
};

export interface PositionsProps {
  id: string;
  title: string;
}

export interface SectionProps {
  positions: PositionsProps[];
  candidate: CandidateProps;
}
export interface ItemProps {
  key: string;
  id: string;
  title: string;
  candidate: CandidateProps;
}

export interface Apply {
  uuid: string;
  jobId: string;
  candidateId: string;
  repoUrl: string;
  applicationId: string;
}

export interface Errors {
  message: string;
}