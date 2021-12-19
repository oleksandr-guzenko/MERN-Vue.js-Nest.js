import { Document } from 'mongoose';

export interface Customer extends Document {
    readonly Lead_ID: string;
    readonly Company_Name_Chinese: string;
    readonly Company_Name_English: string;
    readonly Address: string;
    readonly Region: string;
    readonly Province_level_2: string;
    readonly City_level_3: string;
    readonly Area: string;
    readonly Telephone: string;
    readonly Fax: string;
    readonly Product_Category: string;
    readonly Business_type: string;
    readonly Email: string;
    readonly Contact_Person: string;
    readonly Comments: string;
    readonly Certifications: string;
}