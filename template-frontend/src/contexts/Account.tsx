import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type Account = {
  publicKey: string | null;
  privateKey: string | null;
};

type Value = {
  account: Account;
  setAccount: React.Dispatch<React.SetStateAction<Account>>;
  isLoggedIn: boolean;
  logout: () => void;
};

const AccountContext = createContext({} as Value);

function AccountProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account>({
    publicKey: sessionStorage.templatePublicKey,
    privateKey: sessionStorage.templatePrivateKey,
  });

  const isLoggedIn = !!(account.publicKey && account.privateKey);

  const logout = () => {
    setAccount({ publicKey: null, privateKey: null });
  };

  useEffect(() => {
    if (isLoggedIn) {
      sessionStorage.setItem('templatePublicKey', account.publicKey as string);
      sessionStorage.setItem(
        'templatePrivateKey',
        account.privateKey as string
      );
    } else {
      sessionStorage.removeItem('templatePublicKey');
      sessionStorage.removeItem('templatePrivateKey');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <AccountContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ account, setAccount, isLoggedIn, logout }}
    >
      {children}
    </AccountContext.Provider>
  );
}

const useAccount = () => useContext(AccountContext);

export { AccountProvider, useAccount };
