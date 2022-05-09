import create from 'zustand';

const URI = 'http://192.168.1.12:8081';


interface ProductState {
  productResponse: any;
  getProductResponse: any;
  getuserProductsResponse: any;
  editProductsResponse: any;
  deleteProductsResponse: any;
  winningBidResponse: any;

  getProduct: () => Promise<void>;
  getuserProducts: (winningUserId: string) => Promise<void>;
  
  addProduct: (title: string, description: string, price: string, image: string, user_id: string, endDate: string) => Promise<void>;
  editProduct: (title: string, description: string, price: string, image: string, user_id: string, endDate: string, productId: string) => Promise<void>;
}

const useProduct = create<ProductState>((set) => ({
    productResponse: null,
    getProductResponse: null,
    getuserProductsResponse: null,
    editProductsResponse: null,
    deleteProductsResponse: null,
    winningBidResponse: null,

  addProduct: async (title: string, description: string, price: string, image: string, user_id: string, endDate: string) => {
    const url = URI + '/api/products?title=' + title + '&description=' + description + '&price=' + price + '&image=' + image + '&user_id=' + user_id + '&endDate=' + endDate;
    console.log(url);
    try {
      let response = await fetch(url, { method: "POST" });
      let responseJsonData = await response.json();
      set({ productResponse: responseJsonData });
      console.log(responseJsonData);
      
    }
    catch (e) {
      console.error(e)
    }
  },
  getProduct: async () => {
    const url = URI + '/api/products';
    // console.log(url);
    try {
      let response = await fetch(url, { method: "GET" });
      let responseJsonData = await response.json();
      set({ getProductResponse: responseJsonData });
      // console.log(responseJsonData);
    }
    catch (e) {
      console.error(e)
    }
  },
  getuserProducts: async (user_id: string) => {
    const url = URI + '/api/userProducts?user_id=' + user_id;
    // console.log(url);
    try {
      let response = await fetch(url, { method: "GET" });
      let responseJsonData = await response.json();
      set({ getuserProductsResponse: responseJsonData });
      // console.log(responseJsonData);
    }
    catch (e) {
      console.error(e)
    }
  },
  editProduct: async (title: string, description: string, price: string, image: string, user_id: string, endDate: string, productId: string) => {
    const url = URI + '/api/products/' + productId + '/?title=' + title + '&description=' + description + '&price=' + price + '&image=' + image + '&user_id=' + user_id + '&endDate=' + endDate + '&productId=' + productId;
    // console.log(url);
    try {
      let response = await fetch(url, { method: "PUT" });
      let responseJsonData = await response.json();
      set({ editProductsResponse: responseJsonData });
      // console.log(responseJsonData);
    }
    catch (e) {
      console.error(e)
    }
  },
  deleteProduct: async (productId: string) => {
    const url = URI + '/api/products/' + productId;
    console.log(url);
    try {
      let response = await fetch(url, { method: "DELETE" });
      let responseJsonData = await response.json();
      set({ deleteProductsResponse: responseJsonData });
      console.log(responseJsonData);
    }
    catch (e) {
      console.error(e)
    }
  },
  winningBid: async (productId: string, winningUserId: string ) => {
    const url = URI + '/api/winningBid/' + productId + '/?user_id=' + winningUserId;
    console.log(url);
    try {
      let response = await fetch(url, { method: "PUT" });
      let responseJsonData = await response.json();
      set({ winningBidResponse: responseJsonData });
      console.log(responseJsonData);
    }
    catch (e) {
      console.error(e)
    }
  },
  }));

export default useProduct;












