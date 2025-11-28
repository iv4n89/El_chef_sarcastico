import CookingApp from "./components/CookingApp";

export const metadata = {
  title: "El chef sarcástico",
  description:
    "Selecciona ingredientes y deja que el chef sarcástico te diga si tu combinación es buena o asquerosa.",
}

export default async function Home() {
  return <>
    <CookingApp />
  </>;
}
