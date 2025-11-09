import Shorten from "~/pages/shorten/Shorten";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ZipLinks" },
    { name: "description", content: "Shorten Your Links!" },
  ];
}

const shorten = () => {
  return <Shorten />;
};

export default shorten;
