import Identicon from '@polkadot/react-identicon';
import clsx from 'clsx';
import { buttonStyles } from '@gear-js/ui';

type Props = {
  address: string;
  isActive?: boolean;
  block?: boolean;
};

function AccountButton({ address, isActive, block }: Props) {
  const className = clsx(
    buttonStyles.button,
    buttonStyles.medium,
    isActive ? buttonStyles.primary : buttonStyles.secondary,
    block && buttonStyles.block
  );

  return (
    <div className={className}>
      <Identicon
        value={address}
        className={buttonStyles.icon}
        theme="polkadot"
        size={28}
      />
      {`${address.substring(0, 8)}...`}
    </div>
  );
}

export { AccountButton };
