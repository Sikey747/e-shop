import Link from "next/link";
import Container from "../Container/Container";
import UserMenu from "./../UserMenu/UserMenu";
import { getCurrentUser } from "./../../../actioms/getCurrentUser";
import Badge from "./../Badge/Badge";

export default async function Header({}) {

  const currentUser = await getCurrentUser();
  console.log(currentUser?.role);
  
  return (
    <header className="sticky left-0 top-0 z-[100] w-full border-b-[1px] bg-slate-200 pb-4 pt-4 shadow-sm">
      <Container>
        <nav className="flex items-center justify-between gap-4">
          <Link className="font-f2 text-2xl font-bold" href="/">
            E-Shop
          </Link>
          {/* <div className="hidden md:block">Search</div> */}
          {currentUser?.role === "ADMIN" ?
          <Link href="/admin">Admin</Link>:""}
          <div className="flex items-center gap-4">
            <Badge />
            <UserMenu
              userName={currentUser?.name}
              userImag={currentUser?.image}
            />
          </div>
        </nav>
      </Container>
    </header>
  );
}