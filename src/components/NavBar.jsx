import Link from "next/link";
import Image from "next/image";
import bookIcon from "@/../public/bookIcon.webp";
export default function NavBar() {
  return (
    <>
      <div className="m-4 flex flex-row justify-start;">
        <Image src={bookIcon} alt="" width={100} height={200} />
        <h1 className="m-2 text-6xl content-center">BookBlog</h1>
      </div>
      <div className="text-lg  flex flex-row gap-5 justify-end m-4">
        <Link
          className="hover:scale-105 hover:bg-purple-300 hover:text-white"
          href="/about"
        >
          About
        </Link>
        <Link
          className="hover:scale-105 hover:bg-purple-300 hover:text-white"
          href="/reviews"
        >
          Reviews
        </Link>
        <Link
          className="hover:scale-105 hover:bg-purple-300 hover:text-white"
          href="/submit"
        >
          Submit a review
        </Link>
      </div>
    </>
  );
}
