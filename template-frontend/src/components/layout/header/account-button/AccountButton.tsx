import Identicon from "@polkadot/react-identicon";
import clsx from "clsx";
import { buttonStyles } from "@gear-js/ui";

type Props = {
  address: string;
  isActive?: boolean;
  block?: boolean;
};

function AccountButton({ address, isActive, block }: Props) {
  return (
    <div
      className={clsx(
        buttonStyles.button,
        buttonStyles.medium,
        isActive ? buttonStyles.primary : buttonStyles.light,
        block && buttonStyles.block
      )}
    >
      <Identicon
        value={address}
        className={buttonStyles.icon}
        theme="polkadot"
        size={24}
      />
      {`${address.substring(0, 12)}...`}
    </div>
  );
}

export { AccountButton };
