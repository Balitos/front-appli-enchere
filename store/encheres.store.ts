import create from 'zustand';

const URI = 'http://192.168.1.12:8081';


interface EnchereState {
    enchereResponse: any;
    getEnchereResponse: any;
    getHighestBidResponse: any;
    
    addEnchere: (user_id: string, product_id: string, value: string) => Promise<void>;
    getEnchere: (product_id: string) => Promise<void>;
    getHighestBid: (product_id: string) => Promise<void>;


}

const useEnchere = create<EnchereState>((set) => ({
    enchereResponse: null,
    getEnchereResponse: null,
    getHighestBidResponse: [{}],
    
    addEnchere: async (user_id: string, product_id: string, value: string) => {
        const url = URI + '/api/encheres?user_id=' + user_id + '&product_id=' + product_id + '&value=' + value;
        console.log(url);
        try {
            let response = await fetch(url, { method: "POST" });
            let responseJsonData = await response.json();
            set({ enchereResponse: responseJsonData });
            console.log(responseJsonData);

        }
        catch (e) {
            console.error(e)
        }
    },
    getEnchere: async (product_id: string) => {
        const url = URI + '/api/productEnchere?product_id=' + product_id;
        // console.log(url);
        try {
            let response = await fetch(url, { method: "GET" });
            let responseJsonData = await response.json();
            set({ getEnchereResponse: responseJsonData });
            // console.log(responseJsonData);

        }
        catch (e) {
            console.error(e)
        }
    },
    getHighestBid: async (product_id: string) => {
        const url = URI + '/api/highestBid?product_id=' + product_id;
        // console.log(url);
        try {
            let response = await fetch(url, { method: "GET" });
            let responseJsonData = await response.json();
            set({ getHighestBidResponse: responseJsonData });
            // console.log(responseJsonData);

        }
        catch (e) {
            console.error(e)
        }
    },
    
   
}));

export default useEnchere;












