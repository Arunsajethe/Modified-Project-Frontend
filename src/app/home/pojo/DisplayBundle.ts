import { Product } from "./product";

export class DisplayByBundle
{
    constructor(public bundle_id:string,
            public bundle_name:string,
            public bundle_desp:string,
            public bundle_category:string,
            public product_id:number[],
            public products:Product[])
    {

    }
}