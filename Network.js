export default class Network {
    static get(path, callBack) {
        console.log("Network.dkm()");
        console.log(Network.dkm());
        fetch(Network.dkm().endpoint + path, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Network.token}`
            }
        }
        ).then(responseJson => {
            callBack(responseJson)
        }
            ).catch(error => {
                console.error(error);
            }
            );
    }

    static dkm() {
        var v = {
            grant_type: "authorization_code",
            redirect_uri: "cloud.artik.example.hellocloud://oauth2callback",
            state: "abcdefgh",
            code_verifier: "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk",
            client_id: "0c2cefcfe2f245f58e053c31fa2241cb",
            endpoint: 'https://api.artik.cloud/v1.1'
        };
        return v;
    };
}

