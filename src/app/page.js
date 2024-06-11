import Image from "next/image";
import '../css/style.css'
import 'tailwindcss/tailwind.css';
import Nav from'../components/nav'
import Report from '../components/report'

export default function Home() {
  return (
    <div>
      <Nav></Nav>
      <Report></Report>
    </div>
  );
}
