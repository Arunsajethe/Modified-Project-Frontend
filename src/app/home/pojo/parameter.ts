import { ParameterType } from "./parametertype";

export class Parameter{

    constructor(public para_id:number,
                public para_name:string,
                public para_desp:string,
                public para_details:string,
                public para_type:ParameterType)
    {

    }

}


