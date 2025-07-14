/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Product, ProductCategory, ProductDetails } from '../types/types';
import { getProducts, getProductsByCategory } from '../utils/api';

export const useProductDetails = () => {
  const { category, productId } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );
  const [productsBySelectedModel, setProductsBySelectedModel] = useState<
    ProductDetails[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(productDetails?.images[0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        const productsByCategories = await getProductsByCategory(
          category as ProductCategory,
        );

        const selectedProduct =
          products.find((p) => p.itemId === productId) || null;

        const selectedProductDetails =
          productsByCategories.find((p) => p.id === productId) || null;

        const productsBySelectedModel =
          selectedProductDetails ?
            productsByCategories.filter(
              (p) => p.namespaceId === selectedProductDetails.namespaceId,
            )
          : [];

        setProducts(products);
        setProduct(selectedProduct);
        setProductDetails(selectedProductDetails);
        setSelectedImage(selectedProductDetails?.images[0]);
        setProductsBySelectedModel(productsBySelectedModel);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category, productId]);

  return {
    category,
    products,
    product,
    productDetails,
    productsBySelectedModel,
    isLoading,
    hasError,
    selectedImage,
    setSelectedImage,
  };
};
