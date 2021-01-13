import { BaseService } from "./base.service";
import { ProductDto } from "../dtos";
import { ProductRepository } from "../repositories";

export class ProductService extends BaseService<ProductDto, typeof ProductRepository> {
  constructor() {
    super(ProductRepository);
  }

  public async insert(product: ProductDto): Promise<ProductDto> {
    product.validate();
    return ProductRepository.insert(product);
  }

  public async update(id: string, product: ProductDto): Promise<ProductDto> {
    product.id = id;
    return ProductRepository.update(product);
  }

  public async list(searchParams: any = {}, offset?: number, limit?: number, related = [], filters = []) {
    return ProductRepository.search(searchParams, offset, limit, related, filters);
  }
}

export default ProductService;
