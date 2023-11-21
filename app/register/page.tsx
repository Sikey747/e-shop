import Link from "next/link";
import Container from "../components/Container/Container";
import FormRegister from "./FormRegister";
import Button from "../components/Button/Button";


export default function Register({}) {
  return (
    <section>
      <Container className="mx-auto flex w-full w-full max-w-[650px] flex-col items-center gap-6 rounded-md p-4 py-10 shadow-xl shadow-slate-200 md:pb-8">
      <h1 className="text-2xl font-semibold">Registration Page</h1>
        <FormRegister/>
        <h4 className=" text-sm text-center">
        If you have registered the go to&nbsp;
        <Link href="/login" className="underline text-blue-600">
         log in page
        </Link>
        </h4></Container>
    </section>
  );
}
