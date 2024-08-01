import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import { useRouter } from "next/router"

export default function Product() {
  const { query } = useRouter()

  return(
    <ProductContainer>
      <ImageContainer></ImageContainer>
      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>

        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum nihil quis assumenda eius ducimus rerum, quidem, minima sequi voluptas fugiat perferendis soluta est esse possimus, sapiente doloribus veniam omnis repellat.</p>

        <button>
          Compar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}
