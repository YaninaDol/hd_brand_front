import { createStore, combineReducers } from 'redux';
import { productsReducer, usersReducer,categoriesReducer,seasonsReducer,subCategoriesReducer,materialsReducer, sizesReducer, productsizesReducer } from './reducers';

const rootReducer = combineReducers({
  products: productsReducer,
  users: usersReducer,
  categories:categoriesReducer,
  seasons: seasonsReducer,
  subcategories: subCategoriesReducer,
  materials: materialsReducer,
  sizes: sizesReducer,
  productsizes: productsizesReducer,
});

const store = createStore(rootReducer);

export default store;