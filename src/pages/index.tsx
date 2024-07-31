import { HomeContainer, Product } from "@/styles/pages/home";
import { useKeenSlider } from 'keen-slider/react';
import Image from "next/image";
import 'keen-slider/keen-slider.min.css';
import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";

interface ProductsProps {
  products: {
    id: string;
    name: string;
    imageURL: string;
    price: number | null;
  }[]
}

export default function Home({ products }: ProductsProps) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 48,
    }
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => (
        <Product key={product.id} className="keen-slider__slide">
          <Image src={product.imageURL} width={520} height={480} alt={product.name} />
          <footer>
            <strong>{product.name}</strong>
            <span>{product.price !== null
              ? `R$ ${product.price.toFixed(2)}`
              : 'Preço não disponível'}</span>
          </footer>
        </Product>
      ))}
    </HomeContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response  = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageURL: product.images[0] ?? '',
      price: price.unit_amount !== null ? price.unit_amount / 100 : null,
    }
  });

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, //2h
  };
};
