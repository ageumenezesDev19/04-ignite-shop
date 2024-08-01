import { stripe } from "@/lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Stripe from "stripe";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageURL: string;
    price: string | null;
    description: string;
  }
}

export default function Product({ product }: ProductProps) {
  return (
    <ProductContainer>
      <ImageContainer>
        <img src={product.imageURL} width={520} height={480} alt={product.name} />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>
          {product.price !== null
            ? `R$ ${product.price}`
            : 'Preço não disponível'}
        </span>
        <p>{product.description}</p>
        <button>Comprar agora</button>
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
    fallback: 'blocking', // Use 'blocking' to wait for the page to be generated if it doesn't exist yet
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageURL: product.images[0] ?? '',
        price: price.unit_amount !== null ? (price.unit_amount / 100).toFixed(2) : null,
        description: product.description ?? 'Descrição não disponível.',
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
