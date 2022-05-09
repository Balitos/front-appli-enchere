import create from 'zustand';

const URI = 'http://192.168.1.12:8081';


interface LoginState {
  loginResponse: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>;
  editUser: (id: number, name: string, email: string, password: string, passwordConfirmation: string, token: string) => Promise<void>;


}
const useAuth = create<LoginState>((set) => ({
  loginResponse: null,
  login: async (email: string, password: string) => {
    const url = URI + '/api/auth/login?email=' + email + '&password=' + password;
    // console.log(url);
    try {
      let response = await fetch(url, { method: "POST" });
      let responseJsonData = await response.json();
      set({ loginResponse: responseJsonData });
      console.log(responseJsonData);
    }
    catch (e) {
      console.error(e)
    }
  },
  logout: async () => {
    const url = URI + '/api/auth/logout';
    let response = await fetch(url, { method: "POST" });
    set({ loginResponse: null });

  },
  register: async (name: string, email: string, password: string, passwordConfirmation: string) => {
    const url = URI + '/api/auth/register?name=' + name + '&email=' + email + '&password=' + password + '&password_confirmation=' + passwordConfirmation;
    console.log(url);
    try {
      let response = await fetch(url, { method: "POST" });
      let responseJsonData = await response.json();
      set({ loginResponse: responseJsonData });
      console.log(responseJsonData);
    }
    catch (e) {
      console.error(e)
    }
  },

  editUser: async (id: number, name: string, email: string, password: string, passwordConfirmation: string, token: string) => {
    const url = URI + '/api/auth/edit?id=' + id + '&name=' + name + '&email=' + email + '&password=' + password + '&password_confirmation=' + passwordConfirmation;
    console.log(url);


    let requestOptions = {
      method: 'PUT',
      headers: new Headers({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    }
    try {
      let response = await fetch(url, requestOptions);

      let responseJsonData = await response.json();
      set({ loginResponse: responseJsonData });
      console.log(responseJsonData);
    }
    catch (e) {
      console.error(e)
    }
  },
}));

export default useAuth;












