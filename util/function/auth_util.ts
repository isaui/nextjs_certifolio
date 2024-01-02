import { AuthClient } from "@dfinity/auth-client";
import { AUTH_BASE_URL } from "../base/base_url";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../motoko/declarations/certifolio_backend/certifolio_backend_next";
import User from "../next_models/user";

const handleAuthenticated = async  (authClient: AuthClient)=> {
    const identity = authClient.getIdentity();
    const agent = new HttpAgent({ identity: identity, host: AUTH_BASE_URL });
    if (process.env.DFX_NETWORK !== "ic") {
      agent.fetchRootKey().catch((err) => {
        console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
        console.error(err);
      });
    }
    const actor = Actor.createActor(idlFactory, {
        agent,
        canisterId: process.env.CANISTER_ID_CERTIFOLIO_BACKEND,
      });
    // const principal = await actor.whoami();
    const user: User = {
        identity:identity,
        contract: actor,
        authClient: authClient
    }
    return user;
}

const isAuthenticated= async  (authClient: AuthClient) :Promise<boolean> => {
    return authClient.isAuthenticated()
}

const logoutUser = async (authClient: AuthClient, onSuccess: () => void) => {
    try {
      await authClient.logout();
      onSuccess(); // Panggil callback onSuccess setelah logout berhasil
    } catch (error) {
      console.error('Logout failed:', error);
      // Tangani kesalahan jika logout gagal
      // Anda juga dapat menambahkan callback onFailure di sini untuk menangani kasus logout yang gagal
    }
  };

const loginUser = async ( onSuccess: (newUser:User) => void): Promise<string> => {
    try {
      console.log(process.env.INTERNET_IDENTITY_CANISTER_ID);
      const URL = `${AUTH_BASE_URL}/?canisterId=${process.env.INTERNET_IDENTITY_CANISTER_ID}`;
      const authClient = await AuthClient.create();
      await authClient?.login({
          maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000000000),
          onSuccess: async () => {
              const user = await handleAuthenticated(authClient);
              onSuccess(user);
              },
              identityProvider:  URL,
          });
      return "SUCCESS";
    } catch (error) {
      return "FAILED";
    }
}

export {
    loginUser,
    isAuthenticated,
    logoutUser 
}

