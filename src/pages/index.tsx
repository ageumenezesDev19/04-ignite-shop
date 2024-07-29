import { HomeContainer, Product } from "@/styles/pages/home";
import { useKeenSlider } from 'keen-slider/react'

import Image from "next/image";

import shirt1 from '@/assets/Shirts/Type1.png'
import shirt2 from '@/assets/Shirts/Type2.png'
import shirt3 from '@/assets/Shirts/Type3.png'

import 'keen-slider/keen-slider.min.css'

export default function Home() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 48,
    }
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={shirt1} width={520} height={480} alt="Camiseta Tipo 1" />
        <footer>
          Camiseta X
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={shirt2} width={520} height={480} alt="Camiseta Tipo 2" />
        <footer>
          Camiseta X
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={shirt3} width={520} height={480} alt="Camiseta Tipo 3" />
        <footer>
          Camiseta X
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={shirt1} width={520} height={480} alt="Camiseta Tipo 1" />
        <footer>
          Camiseta X
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}
