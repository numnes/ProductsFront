import { HttpResponse, HttpService } from "services/httpService";
import { Product } from "types/Product";

type ProductsResponseData = {
  total: number;
  data: Product[];
};

export class ProductController {
  constructor(private readonly httpService: HttpService) {}

  async getProducts(
    page?: number,
    perPage?: number,
    searchField?: string,
    search?: string
  ): Promise<HttpResponse<ProductsResponseData>> {
    try {
      let path = `/products?per_page=${perPage || 10}&page=${page || 1}`;
      if (search) path += `&search_field=${searchField}&search=${search}`;

      const { data, status } =
        (await this.httpService.get<ProductsResponseData>(
          path
        )) as HttpResponse<ProductsResponseData>;
      return { data, status };
    } catch (error: any) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  async getProduct(id: number): Promise<HttpResponse<Product>> {
    try {
      let path = `/products/${id}`;

      const { data, status } = (await this.httpService.get<Product>(
        path
      )) as HttpResponse<Product>;
      return { data, status };
    } catch (error: any) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  async postProduct(product: Product): Promise<HttpResponse<any>> {
    try {
      const { status } = (await this.httpService.post<any>(
        "/products",
        product
      )) as HttpResponse<any>;
      return { status };
    } catch (error: any) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  async patchProduct(product: Product): Promise<HttpResponse<any>> {
    try {
      const { status } = (await this.httpService.patch<any>(
        `/products/${product.id}`,
        product
      )) as HttpResponse<any>;
      return { status };
    } catch (error: any) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  async deleteProduct(id: number): Promise<HttpResponse<any>> {
    try {
      const { status } = (await this.httpService.delete<any>(
        `/products/${id}`
      )) as HttpResponse<any>;
      return { status };
    } catch (error: any) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
}
