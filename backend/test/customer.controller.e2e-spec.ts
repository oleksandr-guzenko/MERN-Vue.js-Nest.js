import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CustomerModule } from '../src/Customer/customer.module'
import { INestApplication } from '@nestjs/common';

describe('CustomerController', () => {
  let app: INestApplication;

  const customerService = {
    getAllCustomer: () => [{
      Lead_ID: 'L00050000',
      Company_Name_Chinese: '江阴市恒祥进出口贸易有限公司1',
      Company_Name_English: 'JIANGYIN CITY HANDSOME IMPORT/Jiangyin City Handsome Import and Export Trading Co., Ltd.',
      Address: 'ABC Hong Kong',
      Region: 'China',
      Province_level_2: 'Jiangsu',
      City_level_3: 'Jiangyin',
      Area: 'Zhutang',
      Telephone: '85291239123',
      Fax: '',
      Product_Category: 'Apparel, Textile & Fashion Accessories / Household, Office Furniture and Furnishings / Electrical Supplies',
      Business_type: 'Production Factory / OEM',
      Email: 'abc@gmail.com',
      Contact_Person: 'ABC',
      Comments: '',
      Certifications: '',
    }]
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CustomerModule]
    }).overrideProvider(customerService).useValue(customerService).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/GET /customer/customers', () => {
    return request(app.getHttpServer())
      .get('/customer/customers')
      .expect(200)
      .expect(customerService.getAllCustomer());
  });

  afterAll(async () => {
    await app.close();
  });
});
