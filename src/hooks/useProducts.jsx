import { useMutation, useQueryClient, useQuery} from "@tanstack/react-query";
import { getProducts as fetchProducts, addNewProduct } from "../api/firebase";

export default function useProducts() {
  const queryClient = useQueryClient();

  const productQuery = useQuery(['products'], fetchProducts, { staleTime: 1000 * 60, })

  const addProduct = useMutation(({product, url})=> addNewProduct(product, url),{
    onSuccess: () => queryClient.invalidateQueries(['products'])
  })

  return { productQuery, addProduct }
}