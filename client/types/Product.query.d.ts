export interface ProductResponse{
      products:{
        brand?: string;
    category?: string;
    subCategory?: string;
    productName?: string;
    title?: string;
    color?: string;
    productPrice?: number;
    productSpecification?: string;
    fabric?: string;
    fitType?: string;
    washCare?: string;
    otherDescription?: string;
    imagesId?: string;
    sizeSet?: {
        name?: string;
        value?: string;
        quantity?: number;
    }[];
      }[],
      total:number
}