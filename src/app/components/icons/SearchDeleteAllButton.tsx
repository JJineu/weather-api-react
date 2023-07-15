import { AiFillDelete } from "react-icons/ai";

export default function SearchDeleteAllButton({ onClick }) {
  return (
    <AiFillDelete
      className="icon"
      style={{
        position: "relative",
      }}
      size="20px"
      color="dimgray"
      onClick={onClick}
    />
  );
}
