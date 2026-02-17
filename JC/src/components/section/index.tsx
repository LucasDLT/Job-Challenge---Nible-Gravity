import type { SectionProps } from "../../types";
import { Items } from "../items";

export const SectionPositions: React.FC<SectionProps> = ({ positions, candidate }) => {
  return (
    <section className="section">
      {positions.map((c) => {
        return <Items key={c.id} id={c.id} title={c.title} candidate={candidate} />;
      })}
    </section>
  );
};
