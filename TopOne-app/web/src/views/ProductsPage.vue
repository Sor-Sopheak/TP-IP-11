<template>
  <div class="wrapper">
    <h1 class="product-title">{{ title }}</h1>
    <div id="page-wrap">
      <div class="grid-wrap-left">
        <ul>
          <li class="category" v-for="category in categories" :key="category._id">
            <a href="#" > {{ category.name }} </a>
          
            <ul>
              <li class="subCategory" v-for="subCategory in category.subcategory" :key="subCategory._id">
                <a href="#" @click="onClick( subCategory._id)"> {{ subCategory.name }} </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      
      <div class="grid-wrap-right">
        <div class="product-item" v-for="product in products" :key="product._id">
          <img :src="product.imageUrl" alt="" />
          <h3 class="product-name">{{ product.name }}</h3>
          <p>{{ product.price }}</p>
          <p class="product-description">{{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductsPage",

  data() {
    return {
      title: "លេខមួយ.com",
      products: [],
      category: [],
      subCategory: [],
    };
  },

  async mounted() {
    try {
      const productResponse = await fetch("http://127.0.0.1:3000/product/all");
      const categoryResponse = await fetch("http://127.0.0.1:3000/category/all");
      const subCategoryResponse = await fetch("http://127.0.0.1:3000/item/all");

      const productData = await productResponse.json();
      const categoryData = await categoryResponse.json();
      console.log(categoryData);
      const subCategoryData = await subCategoryResponse.json();

      this.categories = categoryData;
      this.subCategories = subCategoryData;
      this.products = productData;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  methods: {
    async onClick( subCategoryId) {
      try {
        let url = "http://localhost:3000/product/all";
            url = `http://localhost:3000/product/all/${subCategoryId}`;
        
            const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        this.products = data;
        
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  },
};
</script>
  
<style>

  body{
    margin: 0;
    padding: 0;
  }

  .wrapper {
    margin: auto;
    width: 90%;
    height: 100vh;
    overflow-y: auto;
    border: 1px solid gray;
  }

  .product-title {
    color: black;
    text-align: center;
  }

  #page-wrap {
    display: grid;
    grid-template-columns: 0.3fr .7fr;
    gap: 10px;
    padding: 10px;
  }

  .grid-wrap-left {
    background-color: #f0f0f0;
  }

  .product-item-left{
    display: flex;
  }

  .grid-wrap-right {
    background-color: #ffffff;
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    gap: 10px;
  }

  .product-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    background-color: #f8f8f8;
    padding: 10px; 
  }

  .product-item img {
    display: flex;
    justify-items: center;
    align-items: center;
    margin: auto;
    width: 100%;
    height: auto; 
    object-fit: contain; 
    max-width: 200px; 
    max-height: 250px; 
  }
</style>


