export const setProducts = (products) => ({
    type: 'SET_PRODUCTS',
    payload: products,
  });
  
  export const setUsers = (users) => ({
    type: 'SET_USERS',
    payload: users,
  });
  export const setSizes = (sizes) => ({
    type: 'SET_SIZES',
    payload: sizes,
  });
  export const setProductSizes = (productsizes) => ({
    type: 'SET_PRODUCTSIZES',
    payload: productsizes,
  });
  export const addProduct = (product) => ({
    type: 'ADD_PRODUCT',
    payload: product,
  });
  export const editProduct = (productId, updatedProduct) => ({
    type: 'EDIT_PRODUCT',
    payload: { productId, updatedProduct },
  });
  export const deleteProduct = (productId) => ({
    type: 'DELETE_PRODUCT',
    payload: productId,
  });
  export const deleteUser = (userId) => ({
    type: 'DELETE_USER',
    payload: userId,
  });
  export const setCategories = (categories) => ({
    type: 'SET_CATEGORIES',
    payload: categories,
  });
  export const addCategory = (category) => ({
    type: 'ADD_CATEGORY',
    payload: category,
  });
  
  export const deleteCategory = (categoryId) => ({
    type: 'DELETE_CATEGORY',
    payload: categoryId,
  });
  
  export const editCategory = (categoryId, updatedCategory) => ({
    type: 'EDIT_CATEGORY',
    payload: { categoryId, updatedCategory },
  });

  export const setSubCategories = (subcategories) => ({
    type: 'SET_SUBCATEGORIES',
    payload: subcategories,
  });
  export const addSubCategory = (subcategory) => ({
    type: 'ADD_SUBCATEGORY',
    payload: subcategory,
  });
  
  export const deleteSubCategory = (subcategoryId) => ({
    type: 'DELETE_SUBCATEGORY',
    payload: subcategoryId,
  });
  
  export const editShoeType = (subcategoryId, subcategory) => ({
    type: 'EDIT_SUBCATEGORY',
    payload: { subcategoryId, subcategory },
  });


  export const setSeasons = (seasons) => ({
    type: 'SET_SEASONS',
    payload: seasons,
  });
  export const addSeason = (season) => ({
    type: 'ADD_SEASON',
    payload: season,
  });
  
  export const deleteSeason = (seasonId) => ({
    type: 'DELETE_SEASON',
    payload: seasonId,
  });
  
  export const editSeason = (seasonId, updatedSeason) => ({
    type: 'EDIT_SEASON',
    payload: { seasonId, updatedSeason },
  });
  export const setMaterials = (materials) => ({
    type: 'SET_MATERIALS',
    payload: materials,
  });
  export const addMaterial = (material) => ({
    type: 'ADD_MATERIAL',
    payload: material,
  });
  
  export const deleteMaterial = (materialId) => ({
    type: 'DELETE_MATERIAL',
    payload: materialId,
  });
  
  export const editMaterial = (materialId, updatedMaterial) => ({
    type: 'EDIT_MATERIAL',
    payload: { materialId, updatedMaterial },
  });
  export const setProduct = (product) => ({
    type: 'SETPRODUCT',
    payload: product,
  });
  
  export const setSeason = (season) => ({
    type: 'SETSEASON',
    payload: season,
  });
  
  export const setMaterial = (material) => ({
    type: 'SETMATERIAL',
    payload: material,
  });
  
  export const setSubCategory = (subcategory) => ({
    type: 'SETSUBCATEGORY',
    payload: subcategory,
  });
  export const setCategory = (subcategory) => ({
    type: 'SETCATEGORY',
    payload: subcategory,
  });