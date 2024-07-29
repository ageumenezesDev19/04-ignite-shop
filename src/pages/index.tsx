import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";

import shirt1 from '@/assets/Shirts/Type1.png'
import shirt2 from '@/assets/Shirts/Type2.png'
import shirt3 from '@/assets/Shirts/Type3.png'

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={shirt1} width={520} height={480} alt={""} />

        <footer>
          Camiseta X
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product>
        <Image src={shirt1} width={520} height={480} alt={""} />

        <footer>
          Camiseta X
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}
