/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Product, ProductCategory, ProductDetails } from '../types/types';
import { getProducts, getProductsByCategory } from '../utils/api';

export const useProductDetails = () => {
  const { category, productId } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );
  const [productsBySelectedModel, setProductsBySelectedModel] = useState<
    ProductDetails[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(productDetails?.images[0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

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

        setProduct(selectedProduct);
        setProductDetails(selectedProductDetails);
        setSelectedImage(selectedProductDetails?.images[0]);
        setProductsBySelectedModel(productsBySelectedModel);
      } catch (error) {
        setProduct(null);
        setProductDetails(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category, productId]);

  useEffect(() => {}, [category, productId]);

  return {
    category,
    product,
    productDetails,
    productsBySelectedModel,
    isLoading,
    selectedImage,
    setSelectedImage,
  };
};
