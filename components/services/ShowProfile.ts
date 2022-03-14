const URI = 'http://10.31.37.146:8081';

export default {
    async signIn(email: string, password: string) {
        const url = URI + '/api/auth/login?email=' + email + '&password=' + password;
        console.log(url);
        try {
            let response = await fetch(url, { method: "POST" });
            let responseJsonData = await response.json();
            return responseJsonData;
        }
        catch (e) {
            console.error(e)
        }
    }
}