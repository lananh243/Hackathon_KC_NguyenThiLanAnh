<template>
  <div>
    <div class="container">
      <nav>
        <!-- Adding a class for the links for better styling control -->
        <router-link to="/admin" exact-active-class="active" class="nav-link">
          Dashboard Page
        </router-link>
        <router-link
          to="/admin/manager-product"
          active-class="active"
          class="nav-link"
        >
          Manager Product
        </router-link>
        <router-link
          to="/admin/manager-category"
          active-class="active"
          class="nav-link"
        >
          Manager Category
        </router-link>
      </nav>
    </div>

    <router-view></router-view>
  </div>
</template>

<script setup></script>

<style scoped>
.active {
  background-color: grey;
  color: #fff;
  width: 180px;
  height: 25px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.nav-link {
  margin-right: 20px;
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
}

.container {
  width: 1000px;
  height: 80px;
  background-color: black;
  padding-left: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: auto;
  margin-top: 100px;
}
</style>
