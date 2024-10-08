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
const props = defineProps(["productId", "isVisible"]);

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
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  color: #333;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
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
  color: #333;
}

.close-icon:hover {
  color: #ff0000;
}

.modal-footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.confirm {
  margin-left: 10px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
}

.cancel {
  margin-left: 10px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #6c757d;
  color: white;
}

.confirm:hover {
  background-color: #0056b3;
}

.cancel:hover {
  background-color: #5a6268;
}
</style>
