import { BiSearch } from "react-icons/bi";

export default function SearchButton({ onClick }) {
  return (
    <BiSearch
      className="icon"
      style={{
        position: "absolute",
        right: "10px"
      }}
      size="20px"
      color="gray"
      onClick={onClick}
    />
  );
}
