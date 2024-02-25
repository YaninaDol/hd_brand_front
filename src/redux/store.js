import { createStore, combineReducers } from 'redux';
import { productsReducer, usersReducer,categoriesReducer,seasonsReducer,subCategoriesReducer,materialsReducer, sizesReducer, productsizesReducer, similarproductsReducer } from './reducers';

const rootReducer = combineReducers({
  products: productsReducer,
  users: usersReducer,
  categories:categoriesReducer,
  seasons: seasonsReducer,
  subcategories: subCategoriesReducer,
  materials: materialsReducer,
  sizes: sizesReducer,
  productsizes: productsizesReducer,
  product: productsReducer,
  season: seasonsReducer,
  material: materialsReducer,
  subcategory: subCategoriesReducer,
  category:categoriesReducer,
  silimarproducts:similarproductsReducer
});

const store = createStore(rootReducer);

export default store;