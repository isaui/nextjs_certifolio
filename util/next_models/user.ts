// Di dalam berkas userInterfaces.ts

import { Actor } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

export default interface User {
    authClient: AuthClient | null;
    identity: any | null;
    contract: Actor | null;
  }
  