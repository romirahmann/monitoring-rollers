import { useParams } from "react-router-dom";

export function PositionPage() {
  const { category } = useParams();
  console.log(category);
  return (
    <>
      <h1>Position Page</h1>
    </>
  );
}
