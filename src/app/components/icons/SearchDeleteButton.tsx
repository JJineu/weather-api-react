import { LuDelete } from "react-icons/lu";

export default function SearchDeleteButton({ onClick }) {
  return (
    <LuDelete
      className="icon"
      style={{
        position: "relative",
      }}
      size="20px"
      color="gray"
      onClick={onClick}
    />
  );
}
