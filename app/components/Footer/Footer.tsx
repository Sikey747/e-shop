import Link from "next/link";
import Container from "../Container/Container";
import {
  shopCategories,
  customerServices,
  aboutUs,
  followUs,
} from "./../../../mocap/mocap";
import List from "./../Container/List";
import { MdFacebook } from "react-icons/md";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";

export default function Footer({}) {
  return (
    <footer className="mt-12 bg-slate-700 text-slate-200 text-sm pt-16 pb-16">
      <Container className={"flex gap-7 md:flex-nowrap flex-wrap"}>
        <List title="Shop Categories" li={shopCategories} />
        <List title="Customer Services" li={customerServices} />
        <List title="About Us" text={aboutUs} />
        <List title="Follow Us">
          {followUs &&
            followUs.map((el) => {
              return (
                <li key={el.title}>
                  <Link href={el.link}>
                    {el.title === "Facebook" && <MdFacebook size={24}/>}
                    {el.title === "Twitter" && <AiFillTwitterCircle size={24}/>}
                    {el.title === "Instagram" && <AiFillInstagram size={24}/>}
                    {el.title === "Youtube" && <AiFillYoutube size={24}/>}
                  </Link>
                </li>
              );
            })}
        </List>
      </Container>
    </footer>
  );
}
