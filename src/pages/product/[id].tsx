import { stripe } from "@/lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Stripe from "stripe";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState } from 'react';

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageURL: string;
    price: string;
    description: string;
    defaultPriceId: string;
  }
}

export default function Product({ product }: ProductProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  function handleBuyProduct() {
    console.log(product.defaultPriceId);
  }

  return (
    <ProductContainer>
      <ImageContainer>
        {!imageLoaded && (
          <Skeleton
            width={576}
            height={656}
            style={{
              background: 'linear-gradient(100deg,#1ea483 0%, #7465d4 100%)',
              borderRadius: '8px'
            }}
          />
        )}
        <img
          src={product.imageURL}
          width={520}
          height={480}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>
          {product.price !== null
            ? `R$ ${product.price}`
            : 'Preço não disponível'}
        </span>
        <p>{product.description}</p>
        <button onClick={handleBuyProduct}>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await stripe.products.list();
  const paths = response.data.map(product => ({
    params: { id: product.id }
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
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
          imageURL,
          price: price.unit_amount !== null ? (price.unit_amount / 100).toFixed(2) : null,
          description: product.description ?? 'Descrição não disponível.',
          defaultPriceId: price.id,
        }
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
