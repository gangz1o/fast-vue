import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';
import axios from 'axios';

export interface Item {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface ItemCreate {
  title: string;
  description?: string;
  completed?: boolean;
}

export interface ItemUpdate {
  title?: string;
  description?: string;
  completed?: boolean;
}

export const useItemsStore = defineStore('items', () => {
  const items: Ref<Item[]> = ref([]);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

  const apiUrl = 'http://localhost:8000/api';

  async function fetchItems() {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`${apiUrl}/items/`);
      items.value = response.data;
    } catch (err) {
      console.error('Error fetching items:', err);
      error.value = 'Failed to fetch items';
    } finally {
      loading.value = false;
    }
  }

  async function addItem(item: ItemCreate) {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post(`${apiUrl}/items/`, item);
      items.value.push(response.data);
      return response.data;
    } catch (err) {
      console.error('Error adding item:', err);
      error.value = 'Failed to add item';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateItem(id: number, item: ItemUpdate) {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.put(`${apiUrl}/items/${id}`, item);
      const index = items.value.findIndex((i) => i.id === id);
      if (index !== -1) {
        items.value[index] = response.data;
      }
      return response.data;
    } catch (err) {
      console.error(`Error updating item ${id}:`, err);
      error.value = 'Failed to update item';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteItem(id: number) {
    loading.value = true;
    error.value = null;
    try {
      await axios.delete(`${apiUrl}/items/${id}`);
      items.value = items.value.filter((i) => i.id !== id);
    } catch (err) {
      console.error(`Error deleting item ${id}:`, err);
      error.value = 'Failed to delete item';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    items,
    loading,
    error,
    fetchItems,
    addItem,
    updateItem,
    deleteItem,
  };
});
