const productsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PRODUCTS':
        return action.payload;
      case 'ADD_PRODUCT':
        return [...state, action.payload];
      case 'DELETE_PRODUCT':
          return state.filter(product => product.id !== action.payload);
      case 'SETPRODUCT':
  return action.payload;
      case 'EDIT_PRODUCT':
        return state.map(product =>
          product.id === action.payload.productId ? action.payload.updatedProduct : product
        );
      default:
        return state;
    }
  };
  
  const usersReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_USERS':
        return action.payload;
      case 'DELETE_USER':
        return state.filter(user => user.id !== action.payload);
      default:
        return state;
    }
  };
  const categoriesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CATEGORIES':
        return action.payload;
        case 'SETCATEGORY':
          return action.payload;
      case 'ADD_CATEGORY':
        return [...state, action.payload];
      case 'DELETE_CATEGORY':
        return state.filter(category => category.id !== action.payload);
      case 'EDIT_CATEGORY':
        return state.map(category =>
          category.id === action.payload.categoryId ? action.payload.updatedCategory : category
        );
    
      default:
        return state;
    }}
    const seasonsReducer = (state = [], action) => {
      switch (action.type) {
        case 'SET_SEASONS':
          return action.payload;
        case 'ADD_SEASON':
          return [...state, action.payload];
          case 'SETSEASON':
  return action.payload;
        case 'DELETE_SEASON':
          return state.filter(season => season.id !== action.payload);
        case 'EDIT_SEASON':
          return state.map(season =>
            season.id === action.payload.seasonId ? action.payload.updatedSeason : season
          );
      
        default:
          return state;
      }
    };
    
    const subCategoriesReducer = (state = [], action) => {
      switch (action.type) {
        case 'SET_SUBCATEGORIES':
          return action.payload;
        case 'ADD_SUBCATEGORY':
          return [...state, action.payload];
          case 'SETSUBCATEGORY':
  return action.payload;
        case 'DELETE_SUBCATEGORY':
          return state.filter(subcategory => subcategory.id !== action.payload);
        case 'EDIT_SUBCATEGORY':
          return state.map(subcategory =>
            subcategory.id === action.payload.subcategoryId ? action.payload.updatedSubcategory : subcategory
          );
      
        default:
          return state;
      }
    };
    
    const materialsReducer = (state = [], action) => {
      switch (action.type) {
        case 'SET_MATERIALS':
          return action.payload;
          case 'SETMATERIAL':
  return action.payload;
        case 'ADD_MATERIAL':
          return [...state, action.payload];
        case 'DELETE_MATERIAL':
          return state.filter(material => material.id !== action.payload);
        case 'EDIT_MATERIAL':
          return state.map(material =>
            material.id === action.payload.materialId ? action.payload.updatedMaterial : material
          );
      
        default:
          return state;
      }
    };
    const sizesReducer = (state = [], action) => {
      switch (action.type) {
        case 'SET_SIZES':
          return action.payload;
        default:
          return state;
      }
    };
    const productsizesReducer = (state = [], action) => {
      switch (action.type) {
        case 'SET_PRODUCTSIZES':
          return action.payload;
        default:
          return state;
      }
    };
    
  export { productsReducer, usersReducer,categoriesReducer , seasonsReducer, subCategoriesReducer, materialsReducer,sizesReducer,productsizesReducer };