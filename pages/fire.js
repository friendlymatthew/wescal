import ReactPlayer from "react-player";
import Link from "next/link";

export default function FirePage() {
  return (
    <div className="grid grid-cols-1 place-items-center p-4">
      <ReactPlayer url="https://www.youtube.com/watch?v=L_LUpnjgPso" playing />
      <Link href="/">
        <button id="back" className="text-accent font-semibold text-2xl p-4 hover:text-accent-focus">
          Go Back
        </button>
      </Link>
      <ReactPlayer url="https://www.youtube.com/watch?v=Uc0RmO6oVkE&t=242s" playing width="0" height="0"/>
    </div>
  );
}
