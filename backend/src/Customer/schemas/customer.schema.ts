import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
    Lead_ID: String,
    Company_Name_Chinese: String,
    Company_Name_English: String,
    Address: String,
    Region: String,
    Province_level_2: String,
    City_level_3: String,
    Area: String,
    Telephone: String,
    Fax: String,
    Product_Category: String,
    Business_type: String,
    Email: String,
    Contact_Person: String,
    Comments: String,
    Certifications: String,
    created_at: { type: Date, default: Date.now }
})