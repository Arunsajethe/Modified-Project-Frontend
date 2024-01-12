import { Feature } from "./feature";

export class Product{

    constructor(public pid:number,
                public pname:string,
                public desp:string,
                public details:string,
                public maxLocations:number,
                public category:string,
                public feature:Feature[])
    {

    }

}


