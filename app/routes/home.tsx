import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { ComingSoon } from "~/pages/comingsoon";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Suprice" },
    { name: "description", content: "Website Under Contruction" },
  ];
}

export default function Home() {
  return <ComingSoon />;
}
