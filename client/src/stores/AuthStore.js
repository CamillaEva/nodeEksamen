
import { writable } from 'svelte/store';

export const user = writable(null);

export const userInfo = writable(null);

export const caloriesInfo = writable({
    usedCalories: 0,
    percentage: 0
});