import { HomeContainer, Product } from "@/styles/pages/home";
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";
import Head from "next/head";
// import { useState } from "react";
import Image from "next/image";
// import Skeleton from "react-loading-skeleton";

interface ProductsProps {
  products: {
    id: string;
    name: string;
    imageURL: string;
    price: string;
  }[]
}

export default function Home({ products }: ProductsProps) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 48,
    }
  });

  // const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {/* {!imageLoaded && (
          <Skeleton
            width={520}
            height={655}
            style={{
              background: 'linear-gradient(100deg, #1ea483 0%, #7465d4 100%)',
              borderRadius: '8px'
            }}
          />
        )
        } */}
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} prefetch={false}>
            <Product className="keen-slider__slide">
              <Image
                src={product.imageURL}
                width={520}
                height={480}
                alt={product.name}
                // onLoad={() => setImageLoaded(true)}
                style={{
                  objectFit: 'cover',
                  transition: 'opacity 0.5s ease',
                }}
              />
              <footer>
                <strong>{product.name}</strong>
                <span>
                  {product.price !== null
                    ? `R$ ${product.price}`
                    : 'Preço não disponível'}
                </span>
              </footer>
            </Product>
          </Link>
        ))}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageURL: product.images[0] ?? '',
      price: price.unit_amount !== null
        ? (price.unit_amount / 100).toFixed(2)
        : null,
    }
  });

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
