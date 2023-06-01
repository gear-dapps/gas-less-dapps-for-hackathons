import { getProgramMetadata } from '@gear-js/api';
import { Button } from '@gear-js/ui';
import { useSendMessage } from 'hooks/useSendMessage';

function Home() {
  const pingProgramId =
    '0x39e3d9443261685ce84331b041300793f6456d4010766f44460598bfe285cfbc';
  const pingMetaHex =
    '0x000001000000000100000000000000000001010000003408000000050200040000020000';

  const sendMessage = useSendMessage(
    pingProgramId,
    getProgramMetadata(pingMetaHex)
  );

  const handleClick = () => sendMessage('PING');

  return (
    <div>
      <Button text="Ping" onClick={handleClick} />
    </div>
  );
}

export { Home };
