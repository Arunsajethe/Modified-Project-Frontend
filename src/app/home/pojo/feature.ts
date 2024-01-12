import { Parameter } from "./parameter";

export class Feature{

    constructor(public fid:number,
                public fname:string,
                public fdesp:string,
                public fdetails:string,
                public parameters:Parameter[])
    {

    }

}


