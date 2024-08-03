import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { useState } from 'react';
import Stripe from 'stripe';
import { stripe } from '../../lib/stripe';
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product';

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert('Falha ao redirecionar ao checkout!');
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image
            src={product.imageUrl} width={520} height={480} alt={product.name} />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>
          <button disabled={isCreatingCheckoutSession} onClick={handleBuyButton}>
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const products = await stripe.products.list({ limit: 100 });

    const paths = products.data.map((product) => ({
      params: { id: product.id },
    }));

    return {
      paths,
      fallback: 'blocking', // 'true' ou 'blocking'
    };
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps<ProductProps, { id: string }> = async ({ params }) => {
  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  const productId = params.id;

  try {
    const product = await stripe.products.retrieve(productId, {
      expand: ['default_price'],
    });

    const price = product.default_price as Stripe.Price;

    const imageURL = product.images && product.images[0] ? product.images[0] : '';

    return {
      props: {
        product: {
          id: product.id,
          name: product.name,
          imageUrl: imageURL,
          price: price.unit_amount !== null
            ? new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(price.unit_amount / 100)
            : 'Preço não disponível',
          description: product.description ?? 'Descrição não disponível.',
          defaultPriceId: price.id,
        },
      },
      revalidate: 60 * 60 * 1, // 1 hora
    };
  } catch (error) {
    console.error('Erro ao recuperar produto:', error);
    return {
      notFound: true,
    };
  }
};
