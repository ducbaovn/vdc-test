import { BaseService } from "./base.service";
import { ProductDto } from "../dtos";
import { ProductRepository } from "../repositories";

export class ProductService extends BaseService<ProductDto, typeof ProductRepository> {
  constructor() {
    super(ProductRepository);
  }

  public async insert(name: string, price: number, description?: string): Promise<ProductDto> {
    const product = new ProductDto();
    product.name = name;
    product.price = price;
    product.description = description;
    product.validate();
    return ProductRepository.insert(product);
  }

  public async update(id: string, name: string, price: number, description?: string): Promise<ProductDto> {
    const product = new ProductDto();
    product.id = id;
    if (name) {
      product.name = name;
    }
    if (price != null) {
      product.price = price;
    }
    if (description) {
      product.description = description;
    }
    return ProductRepository.update(product);
  }

  public async list(searchParams: any = {}, offset?: number, limit?: number, related = [], filters = []) {
    return ProductRepository.search(searchParams, offset, limit, related, filters);
  }
}

export default ProductService;
