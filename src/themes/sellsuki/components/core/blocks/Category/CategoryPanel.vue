<template>
  <div class="categories">
    <div
      class="categories__handler"
    >
      <div class="row categories__heading">
        <p class="heading">
          FILTER
        </p>
        <p class="amount">
          {{ amount }} results
        </p>
      </div>
      <div class="row">
        <button
          class="clear categories__button no-outline bg-cl-transparent"
          @click="clearCategory()"
        >
          VIEW ALL
        </button>
        <template v-for="category in categories">
          <div class="category-name" :key="category.category_id">
            <button
              class="categories__button no-outline bg-cl-transparent"
              :class="{ 'categories__button--active': value.includes(category.category_id) }"
              type="button"
              @click="toggleCategory(category)"
            >
              {{ category.name }}
            </button>
            <font-awesome-icon class="circle" v-if="!isLastElement(category)" icon="circle" size="xs" style="color: #404040;"/>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    },
    amount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  },
  methods: {
    toggleCategory (category) {
      const isSelected = this.value.includes(category.category_id)
      if (isSelected) {
        this.$emit('input', this.value.filter(categoryId => categoryId !== category.category_id))
      } else {
        this.$emit('input', [...this.value, category.category_id])
      }
    },
    clearCategory () {
      this.$emit('input', [])
    },
    isLastElement (category) {
      const index = this.categories.indexOf(category) + 1
      if (index === this.categories.length) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~theme/css/variables/colors";
$break-large: 1030px;

* {
  font-family: Nunito Sans;
  font-style: normal;
  font-weight: normal;
}

p.heading {
  font-weight: 800;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.1em;
  color: #404040;
  margin-right: 10px;
}

p.amount {
  font-size: 12px;
  line-height: 16px;
  color: #C5C5C5;
}

.categories {
  padding: 0 7%;

  &__heading {
    width: 100%;
    align-items: center;
    padding: 20px 0 10px 0;
  }

  &__handler {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }

  &__button {
    display: flex;
    align-items: center;
    border: none;
    padding: 0;
    transition: all 0.2s ease;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #404040;

    &--active {
      font-weight: bold;
      text-decoration: underline;
    }
    @media screen and (min-width: $break-large) {
      &:hover{
        background: #333;
        color: #fff;
      }
    }
  }

  &__button-text {
    display: block;
    margin-right: 15px;
  }

}

.category-name {
  display: flex;
  align-items: center;
}

.fa-xs {
  font-size: 0.4em !important;
}

.circle {
  padding: 0 10px;
}

.clear {
  padding-right: 20px;
}
</style>
