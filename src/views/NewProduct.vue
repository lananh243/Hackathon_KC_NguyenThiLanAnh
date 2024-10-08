<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h4>{{ isEditing ? "Chỉnh sửa sản phẩm" : "Thêm mới sản phẩm" }}</h4>
        <i @click="handleClose" class="fa-solid fa-xmark close-icon"></i>
      </div>
      <form class="form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label class="form-label" for="productName">Tên sản phẩm</label>
          <input
            v-model="newProduct.name"
            id="productName"
            type="text"
            class="form-control"
          />
          <div v-if="nameError" class="form-text error">
            {{ nameError }}
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="productPrice">Giá</label>
          <input
            v-model="newProduct.price"
            id="productPrice"
            type="number"
            class="form-control"
          />
          <div v-if="priceError" class="form-text error">
            {{ priceError }}
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="productQuantity">Số lượng</label>
          <input
            v-model="newProduct.quantity"
            id="productQuantity"
            type="number"
            class="form-control"
          />
          <div v-if="quantityError" class="form-text error">
            {{ quantityError }}
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="productImage">Hình ảnh</label>
          <input
            v-model="newProduct.image"
            id="productImage"
            type="text"
            class="form-control"
          />
          <div v-if="imageError" class="form-text error">
            {{ imageError }}
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="handleClose">
            Đóng
          </button>
          <button class="btn btn-primary">
            {{ isEditing ? "Cập nhật" : "Thêm mới" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, reactive, defineProps } from "vue";

const { listProduct, productToEdit } = defineProps([
  "listProduct",
  "productToEdit",
]);
const emit = defineEmits(["onClose", "addProduct", "updateProduct"]);

const isEditing = !!productToEdit; // Check if we are editing
const newProduct = reactive({
  id: productToEdit ? productToEdit.id : Math.floor(Math.random() * 100000000), // Use existing ID if editing
  name: productToEdit ? productToEdit.name : "",
  price: productToEdit ? productToEdit.price : 0,
  quantity: productToEdit ? productToEdit.quantity : 0,
  image: productToEdit ? productToEdit.image : "",
});

const nameError = ref("");
const imageError = ref("");
const priceError = ref("");
const quantityError = ref("");

const handleClose = () => {
  emit("onClose");
};

const handleSubmit = () => {
  nameError.value = "";
  imageError.value = "";
  priceError.value = "";
  quantityError.value = "";

  if (!newProduct.name) {
    nameError.value = "Tên không được để trống";
  }
  if (!newProduct.image) {
    imageError.value = "Ảnh không được để trống";
  }
  if (newProduct.price < 10000) {
    priceError.value = "Giá tối thiểu là 10.000 đ";
  }
  if (newProduct.quantity < 1 || newProduct.quantity > 100) {
    quantityError.value = "Số lượng tối thiểu là 1 và tối đa là 100";
  }

  if (
    !nameError.value &&
    !imageError.value &&
    !priceError.value &&
    !quantityError.value
  ) {
    const existingProduct = listProduct.find(
      (product) => product.name === newProduct.name
    );

    if (isEditing) {
      emit("updateProduct", newProduct);
      handleClose();
    } else {
      if (!existingProduct) {
        listProduct.push({ ...newProduct });
        localStorage.setItem("products", JSON.stringify(listProduct));
        handleClose();
      } else {
        nameError.value = "Sản phẩm đã tồn tại!";
      }
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Dark overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure modal is on top */
}

.modal-content {
  background: white;
  color: #333;
  padding: 20px;
  border-radius: 8px;
  width: 550px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-icon {
  cursor: pointer;
  font-size: 1.5em;
}

.modal-footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.btn {
  margin-left: 10px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
}

.form-control {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-control:focus {
  border-color: #007bff;
  outline: none;
}

.form-control::placeholder {
  color: #aaa;
}

.error {
  color: red;
}
</style>
