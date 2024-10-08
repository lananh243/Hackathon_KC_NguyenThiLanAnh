<template>
  <div class="container">
    <div class="title">
      <h1>Manager Product</h1>
      <div>
        <button class="button" @click="handleShowForm">Add New Product</button>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Option</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in listProduct" :key="product.id">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img">
              <img :src="product.image" alt="Product Image" class="image" />
            </div>
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.price.toLocaleString() }} ₫</td>
          <td>{{ product.quantity }}</td>
          <td>
            <div class="include">
              <button class="edit" @click="handleEdit(product)">Edit</button>
              <button class="delete" @click="handleDelete(product.id)">
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Form Thêm/Sửa Sản phẩm -->
    <NewProduct
      v-if="isShowForm"
      :listProduct="listProduct"
      :productToEdit="selectedProduct"
      @onClose="handleCloseForm"
      @addProduct="updateProductList"
      @updateProduct="updateProduct"
    ></NewProduct>
    <ConfirmDelete
      v-if="isDeleteModalVisible"
      :productId="productIdToDelete"
      :isVisible="isDeleteModalVisible"
      @deleteConfirmed="deleteProduct"
      @close="handleCloseDeleteModal"
    />
  </div>
</template>

<script setup>
import NewProduct from "./NewProduct.vue";
import ConfirmDelete from "./ConfirmDelete.vue";
import { ref } from "vue";

const isShowForm = ref(false);
const isDeleteModalVisible = ref(false);
const productIdToDelete = ref(null);
const selectedProduct = ref(null);
const listProduct = ref(JSON.parse(localStorage.getItem("products")) || []);

const handleShowForm = () => {
  selectedProduct.value = null;
  isShowForm.value = true;
};

const handleCloseForm = () => {
  isShowForm.value = false;
};

const handleDelete = (productId) => {
  productIdToDelete.value = productId;
  isDeleteModalVisible.value = true;
};

const handleCloseDeleteModal = () => {
  isDeleteModalVisible.value = false;
  productIdToDelete.value = null;
};

const handleEdit = (product) => {
  selectedProduct.value = product;
  isShowForm.value = true;
};

// Update the product list
const updateProductList = (newProduct) => {
  listProduct.value = [...listProduct.value, newProduct];
  localStorage.setItem("products", JSON.stringify(listProduct.value));
};

const updateProduct = (updatedProduct) => {
  const index = listProduct.value.findIndex(
    (product) => product.id === updatedProduct.id
  );
  if (index !== -1) {
    listProduct.value[index] = updatedProduct;
    localStorage.setItem("products", JSON.stringify(listProduct.value));
  }
};

const deleteProduct = () => {
  listProduct.value = listProduct.value.filter(
    (product) => product.id !== productIdToDelete.value
  );
  localStorage.setItem("products", JSON.stringify(listProduct.value));
  handleCloseDeleteModal();
};
</script>

<style scoped>
.container {
  width: 1000px;
  margin: auto;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.img {
  width: 50px;
  height: 50px;
  overflow: hidden;
}

.image {
  max-width: 100%;
  max-height: 100%;
}

.include {
  display: flex;
  justify-content: center;
}

.edit,
.delete {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit {
  background-color: #ffc107;
}

.delete {
  background-color: #dc3545;
}
</style>
