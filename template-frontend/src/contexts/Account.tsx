import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

type Account = {
  publicKey: string | null;
  privateKey: string | null;
};

function useAccountData() {
  const navigate = useNavigate();

  const [account, setAccount] = useState<Account>({
    publicKey: sessionStorage.templatePublicKey,
    privateKey: sessionStorage.templatePrivateKey,
  });

  const isLoggedIn = !!(account.publicKey && account.privateKey);

  const logout = () => {
    setAccount({ publicKey: null, privateKey: null });
    navigate("/");
  };

  useEffect(() => {
    if (isLoggedIn) {
      sessionStorage.setItem("templatePublicKey", account.publicKey as string);
      sessionStorage.setItem(
        "templatePrivateKey",
        account.privateKey as string
      );
    } else {
      sessionStorage.removeItem("templatePublicKey");
      sessionStorage.removeItem("templatePrivateKey");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return {
    account,
    setAccount,
    isLoggedIn,
    logout,
  };
}

const AccountContext = createContext({} as ReturnType<typeof useAccountData>);

function AccountProvider({ children }: { children: ReactNode }) {
  return (
    <AccountContext.Provider value={useAccountData()}>
      {children}
    </AccountContext.Provider>
  );
}

const useAccount = () => useContext(AccountContext);

export { AccountProvider, useAccount };
