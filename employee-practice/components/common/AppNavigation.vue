<template>
  <nav>
    <ul>
      <li>
        <NuxtLink to="/">
          <Icon name="tabler:home-filled" class="nav" />
          <span class="ml-xs">ホーム</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/department">
          <Icon name="tabler:users-group" class="nav" />
          <span class="ml-xs">部署管理</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/employee"
          ><Icon name="tabler:man-filled" class="nav" />
          <span class="ml-xs">従業員管理</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup></script>

<style scoped>
nav {
  width: 10rem;
  background-color: #aad;
  padding: 3rem 1rem 0;
  min-height: 100vh;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 0.2rem 1rem;
  margin-bottom: 15px;
  border-radius: 0.5rem;
}

li:hover {
  background-color: #00000033;
  cursor: pointer;
}

li:hover > a {
  text-decoration: underline;
}

a {
  color: #333;
  text-decoration: none;
  font-weight: bold;
}
</style>
