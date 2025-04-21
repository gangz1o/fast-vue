<template>
  <div class="items-view">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto my-12" max-width="800">
            <v-card-title class="text-h4 font-weight-bold">
              {{ t('items.title') }}
            </v-card-title>
            <v-card-text>
              <p class="text-body-1 mb-4">
                {{ t('items.description') }}
              </p>

              <!-- Add Item Form -->
              <v-form @submit.prevent="addNewItem" class="mb-6">
                <v-row>
                  <v-col cols="12" md="5">
                    <v-text-field
                      v-model="newItem.title"
                      :label="t('items.itemTitle')"
                      required
                      variant="outlined"
                      density="comfortable"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="5">
                    <v-text-field
                      v-model="newItem.description"
                      :label="t('items.itemDescription')"
                      variant="outlined"
                      density="comfortable"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-btn
                      type="submit"
                      color="primary"
                      block
                      :loading="itemsStore.loading"
                      :disabled="!newItem.title"
                    >
                      {{ t('items.addItem') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>

              <!-- Loading State -->
              <div v-if="itemsStore.loading" class="text-center my-4">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>

              <!-- Error State -->
              <v-alert
                v-if="itemsStore.error"
                type="error"
                class="mb-4"
              >
                {{ itemsStore.error }}
              </v-alert>

              <!-- Items List -->
              <v-list v-if="itemsStore.items.length > 0">
                <v-list-item
                  v-for="item in itemsStore.items"
                  :key="item.id"
                  :class="{ 'bg-gray-100': item.completed }"
                >
                  <template v-slot:prepend>
                    <v-checkbox
                      v-model="item.completed"
                      @change="toggleItemStatus(item)"
                      hide-details
                      color="primary"
                    ></v-checkbox>
                  </template>

                  <v-list-item-title :class="{ 'text-decoration-line-through': item.completed }">
                    {{ item.title }}
                  </v-list-item-title>

                  <v-list-item-subtitle v-if="item.description">
                    {{ item.description }}
                  </v-list-item-subtitle>

                  <template v-slot:append>
                    <v-btn
                      icon="mdi-delete"
                      variant="text"
                      color="error"
                      @click="deleteItemById(item.id)"
                      density="comfortable"
                    ></v-btn>
                  </template>
                </v-list-item>
              </v-list>

              <!-- Empty State -->
              <v-alert
                v-else-if="!itemsStore.loading"
                type="info"
                class="mb-4"
              >
                {{ t('items.noItems') }}
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useItemsStore, type Item, type ItemCreate } from '../stores/items'
import { useI18n } from 'vue-i18n'

const itemsStore = useItemsStore()
const { t } = useI18n()

const newItem = ref<ItemCreate>({
  title: '',
  description: '',
  completed: false
})

onMounted(async () => {
  await itemsStore.fetchItems()
})

async function addNewItem() {
  if (!newItem.value.title) return

  try {
    await itemsStore.addItem(newItem.value)
    // Reset form
    newItem.value = {
      title: '',
      description: '',
      completed: false
    }
  } catch (error) {
    console.error('Failed to add item:', error)
  }
}

async function toggleItemStatus(item: Item) {
  try {
    await itemsStore.updateItem(item.id, {
      completed: item.completed
    })
  } catch (error) {
    console.error('Failed to update item status:', error)
  }
}

async function deleteItemById(id: number) {
  try {
    await itemsStore.deleteItem(id)
  } catch (error) {
    console.error('Failed to delete item:', error)
  }
}
</script>

<style scoped>
.items-view {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>
