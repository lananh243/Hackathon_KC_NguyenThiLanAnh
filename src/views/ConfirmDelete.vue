<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Xác nhận</h3>
        <i @click="cancelDelete" class="fa-solid fa-times close-icon"></i>
      </div>
      <p>Bạn có chắc chắn muốn xóa sản phẩm này không ?</p>
      <div class="modal-footer">
        <button class="confirm" @click="confirmDelete">Delete</button>
        <button class="cancel" @click="cancelDelete">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["productId", "isVisible"]); // Simplified prop definitions

const emit = defineEmits(["deleteConfirmed", "close"]);

const confirmDelete = () => {
  emit("deleteConfirmed", props.productId);
  emit("close");
};

const cancelDelete = () => emit("close");
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
  background: white; /* Light background */
  color: #333; /* Dark text color */
  padding: 20px;
  border-radius: 8px;
  width: 400px; /* Fixed width */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-icon {
  cursor: pointer;
  font-size: 1.5em; /* Larger close icon */
  color: #333; /* Color of the close icon */
}

.close-icon:hover {
  color: #ff0000; /* Change color on hover */
}

.modal-footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.confirm {
  margin-left: 10px; /* Space between buttons */
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #007bff; /* Bootstrap primary color */
  color: white;
}

.cancel {
  margin-left: 10px; /* Space between buttons */
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #6c757d; /* Bootstrap secondary color */
  color: white;
}

.confirm:hover {
  background-color: #0056b3; /* Darker shade on hover */
}

.cancel:hover {
  background-color: #5a6268; /* Darker shade on hover */
}
</style>
