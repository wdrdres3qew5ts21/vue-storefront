<template>
  <div>
    <div class="categories">
      <img class="collection-image" src="../../../../assets/category.jpg" alt="">
      <div class="image-content">
        <hr>
        <p class="title">
          CATEGORIES
        </p>
        <hr>
      </div>
    </div>
    <div>
      <router-link :to="localizedRoute('')">
        <img src="../../../../assets/man.jpg" alt="">
        <div class="image-content">
          <p class="category-title">
            MAN
          </p>
        </div>
      </router-link>
      <router-link :to="localizedRoute('')">
        <img src="../../../../assets/woman.jpg" alt="">
        <div class="image-content">
          <p class="category-title">
            WOMAN
          </p>
        </div>
      </router-link>
      <router-link :to="localizedRoute('')">
        <img src="../../../../assets/kids.jpg" alt="">
        <div class="image-content">
          <p class="category-title">
            KIDS
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryListing'
}
</script>

<style lang="scss" scoped>

    img {
      width: 100%;
    }

    hr {
      background-color: #EEEEEE;
      width: 251px;
      border: 2.5px solid #EEEEEE;
    }

    .title {
      color: #EEEEEE;
      font-style: normal;
      font-weight: 1000;
      font-size: 30px;
      line-height: 41px;
      text-align: center;
      letter-spacing: 0.25em;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      margin: 15px 0 15px 0;
    }

    .category-title {
      font-style: normal;
      font-weight: 600;
      font-size: 25px;
      line-height: 34px;
      text-align: center;
      letter-spacing: 0.1em;
      color: #EEEEEE;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .image-content {
      transition: unset !important;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    a {
      text-decoration: none;
      position: relative;
      display: inherit;

      &:hover {
      text-decoration: none;
      color: black;
      }
    }

    div {
      position: relative;
      display: grid;
    }

    a.underline:after, a:not(.no-underline):hover:after {
      position: unset;
    }
</style>
