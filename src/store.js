import { createStore, combineReducers } from 'redux';
import { productsReducer, usersReducer,categoriesReducer,seasonsReducer,subCategoriesReducer,materialsReducer } from './reducers';

const rootReducer = combineReducers({
  products: productsReducer,
  users: usersReducer,
  categories:categoriesReducer,
  seasons: seasonsReducer,
  subcategories: subCategoriesReducer,
  materials: materialsReducer,
});

const store = createStore(rootReducer);

export default store;