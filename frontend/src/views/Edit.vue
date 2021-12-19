<template>
  <div>
    <div class="col-12 col-lg-6 container my-4">
      <h2>Edit Customer </h2>
      <form id="create-post-form" @submit.prevent="editCustomer">
        <div class="form-group col-md-12">
          <label for="title"> Lead ID </label>
          <input type="text" id="Lead_ID" v-model="customer.Lead_ID" disabled name="title" class="form-control">
        </div>

        <div class="form-group col-md-12">
          <label for="title"> Company Name Chinese </label>
          <input type="text" id="Company_Name_Chinese" v-model="customer.Company_Name_Chinese" name="title" class="form-control">
        </div>

        <div class="form-group col-md-12">
          <label for="title"> Company Name English </label>
          <input type="text" id="Company_Name_English" v-model="customer.Company_Name_English" name="title" class="form-control">
        </div>

        <div class="form-group col-md-12">
          <label for="title"> Address </label>
          <input type="text" id="Address" v-model="customer.Address" name="title" class="form-control">
        </div>

        <div class="form-group col-md-12">
          <label for="title"> Region </label>
          <input type="text" id="Region" v-model="customer.Region" name="title" class="form-control">
        </div>

        <div class="form-group col-md-12">
          <label for="description"> Province (level 2) </label>
          <input type="text" id="Province" v-model="customer.Province_level_2" name="description" class="form-control">
        </div>

        <div class="form-group col-md-12">
          <label for="description"> City (level 3) </label>
          <input type="text" id="City" v-model="customer.City_level_3" name="description" class="form-control">
        </div>

        <div class="form-group col-md-12">
          <label for="description"> Area </label>
          <input type="text" id="Area" v-model="customer.Area" name="description" class="form-control">
        </div>

        <div class="form-group col-md-12">
          <label for="description"> Telephone </label>
          <input type="text" id="Telephone" v-model="customer.Telephone" name="description" class="form-control">
        </div>

        <div class="form-group col-md-12">
          <label for="description"> Fax </label>
          <input type="text" id="Fax" v-model="customer.Fax" name="description" class="form-control">
        </div>

        <div class="form-group col-md-12">
          <label for="description"> Product Category </label>
          <input type="text" id="Product_Category" v-model="customer.Product_Category" name="description" class="form-control">
        </div>

        <div class="form-group col-md-12">
          <label for="description"> Business type </label>
          <input type="text" id="Business_type" v-model="customer.Business_type" name="description" class="form-control">
        </div>

        <div class="form-group col-md-12">
          <label for="description"> Email </label>
          <input type="text" id="Email" v-model="customer.Email" name="description" class="form-control">
        </div>

        <div class="form-group col-md-12">
          <label for="description"> Contact Person </label>
          <input type="text" id="Contact_Person" v-model="customer.Contact_Person" name="description" class="form-control">
        </div>

        <div class="form-group col-md-12">
          <label for="description"> Comments </label>
          <input type="text" id="Comments" v-model="customer.Comments" name="description" class="form-control">
        </div>
        <div class="form-group col-md-12">
          <label for="description"> Certifications </label>
          <input type="text" id="Certifications" v-model="customer.Certifications" name="description" class="form-control">
        </div>

        <div class="form-group col-md-4 pull-right mx-auto my-3">
          <button class="btn btn-success" type="submit"> Edit Data </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../helper";
import router from "../router";
export default {
  data() {
    return {
      id: null,
      customer: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getCustomer();
  },
  methods: {
    editCustomer() {
      let customerData = {
        Lead_ID: this.customer.Lead_ID,
        Company_Name_Chinese: this.customer.Company_Name_Chinese,
        Company_Name_English: this.customer.Company_Name_English,
        Address: this.customer.Address,
        Region: this.customer.Region,
        Province_level_2: this.customer.Province_level_2,
        City_level_3: this.customer.City_level_3,
        Area: this.customer.Area,
        Telephone: this.customer.Telephone,
        Fax: this.customer.Fax,
        Product_Category: this.customer.Product_Category,
        Business_type: this.customer.Business_type,
        Email: this.customer.Email,
        Contact_Person: this.customer.Contact_Person,
        Comments: this.customer.Comments,
        Certifications: this.customer.Certifications
      };
      console.log("customerData", customerData);
      axios
        .put(
          `${server.baseURL}/customer/update?customerID=${this.id}`,
          customerData
        )
        .then(() => {
          router.push({ name: "home" });
        });
    },
    getCustomer() {
      axios
        .get(`${server.baseURL}/customer/customer/${this.id}`)
        .then(data => (this.customer = data.data));
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>

