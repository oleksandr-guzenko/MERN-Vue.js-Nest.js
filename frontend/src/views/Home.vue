<template>
  <div class="container-fluid">
    <div class="container p-5">

      <p>Import your excel file:</p>
      <div class="input-group input-group-lg mb-3">
        <input type="file" class="form-control" id="inputGroupFile02" @change="getFile">
      </div>
      <button class="btn btn-lg btn-primary" @click="postFile">Import</button>
      <!-- <button class="input-group-text" for="inputGroupFile02" @click="postFile">Upload</button> -->
      <hr />
      <p>Export below as excel file:</p>
      <div class="text-left mb-3">
        <button class="btn btn-lg btn-primary" @click="exportFile">Export</button>
      </div>

    </div>
    <div class="text-center" v-if="customers.length === 0">
      <h2> No customer found at the moment </h2>
    </div>

    <table id="sheetjs" class="table table-bordered table-responsive">
      <thead class="thead-dark">
        <tr>
          <th scope="col"></th>
          <th scope="col">Lead ID</th>
          <th scope="col">Company Name Chinese</th>
          <th scope="col">Company Name English</th>
          <th scope="col">Address</th>
          <th scope="col">Region</th>
          <th scope="col">Province (level 2)</th>
          <th scope="col">City (level 3)</th>
          <th scope="col">Area</th>
          <th scope="col">Telephone</th>
          <th scope="col">Fax</th>
          <th scope="col">Product Category</th>
          <th scope="col">Business type</th>
          <th scope="col">Email</th>
          <th scope="col">Contact Person</th>
          <th scope="col">Comments</th>
          <th scope="col">Certifications</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer._id">
          <td>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group" style="margin-bottom: 20px;">
                <router-link :to="{name: 'edit', params: {id: customer._id}}" class="btn btn-sm btn-outline-secondary">Edit</router-link>
                <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteCustomer(customer._id)">Delete</button>
              </div>
            </div>
          </td>
          <td>{{ customer.Lead_ID }}</td>
          <td>{{ customer.Company_Name_Chinese }}</td>
          <td>{{ customer.Company_Name_English }}</td>
          <td>{{ customer.Address }}</td>
          <td>{{ customer.Region }}</td>
          <td>{{ customer.Province_level_2 }}</td>
          <td>{{ customer.City_level_3 }}</td>
          <td>{{ customer.Area }}</td>
          <td>{{ customer.Telephone }}</td>
          <td>{{ customer.Fax }}</td>
          <td>{{ customer.Product_Category }}</td>
          <td>{{ customer.Business_type }}</td>
          <td>{{ customer.Email }}</td>
          <td>{{ customer.Contact_Person }}</td>
          <td>{{ customer.Comments }}</td>
          <td>{{ customer.Certifications }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { server } from "../helper";
import axios from "axios";
import XLSX from "xlsx";

export default {
  data() {
    return {
      postData: [],
      customers: []
    };
  },
  created() {
    this.fetchCustomers();
  },
  methods: {
    postFile() {
      console.log("postData", this.postData);
      if (this.postData.length <= 0) return;

      axios
        .post(`${server.baseURL}/customer/create`, {
          list_data: JSON.stringify(this.postData)
        })
        .then(data => {
          console.log("create", data);
          this.customers = data.data;
        });
      window.location.reload();
    },
    renameKey(obj, oldKey, newKey) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    },
    exportFile() {
      let tbl = document.getElementById("sheetjs");
      var wb = XLSX.utils.table_to_book(tbl, { sheet: "sheet1" });
      return XLSX.writeFile(wb, "MySheetName.xlsx");
    },
    getFile(e) {
      const input = e.target;
      const reader = new FileReader();
      reader.onload = () => {
        let fileData = reader.result;
        let wb = XLSX.read(fileData, { type: "binary" });
        wb.SheetNames.forEach(async sheetName => {
          let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
          rowObj.map(obj => {
            for (let key in obj) {
              let newKey = key
                .replaceAll(" ", "_")
                .replaceAll("(", "")
                .replaceAll(")", "");
              if (newKey !== key) {
                this.renameKey(obj, key, newKey);
              }
            }
          });
          this.postData = rowObj;
        });
      };
      reader.readAsBinaryString(input.files[0]);
    },
    fetchCustomers() {
      axios.get(`${server.baseURL}/customer/customers`).then(data => {
        console.log("customers", data);
        this.customers = data.data;
      });
    },
    deleteCustomer(id) {
      axios
        .delete(`${server.baseURL}/customer/delete?customerID=${id}`)
        .then(data => {
          console.log(data);
          window.location.reload();
        });
    }
  }
};
</script>

