import Link from "next/link";
import Container from "./../components/Container/Container";
import FormSigIn from "./FormSigIn";
export default function Login({}) {

  return (
    <Container>
      <section className="mx-auto flex w-full w-full max-w-[650px] flex-col items-center gap-6 rounded-md p-4 py-10 shadow-xl shadow-slate-200 md:pb-8">
        <h1 className="text-2xl font-semibold">Login Page</h1>
        <FormSigIn />
        <h4 className=" text-center text-sm">
          If you have not registered the go to&nbsp;
          <Link href="/register" className="text-blue-600 underline">
            registration page
          </Link>
        </h4>
      </section>
    </Container>
  );
}
// className="min-h-fit h-full flex items-center justify-center pb-12 pt-12"
