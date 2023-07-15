import { AiFillDelete } from "react-icons/ai";

export default function SearchDeleteAllButton({
  onClick,
}: {
  onClick: () => void;
}) {
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
