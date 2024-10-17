import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <Link href="/about">About</Link>
      <Link href="/reviews">Reviews</Link>
      <Link href="/submit">Submit a review</Link>
    </>
  );
}
