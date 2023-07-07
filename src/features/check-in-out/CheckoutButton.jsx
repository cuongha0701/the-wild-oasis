import { useCheckout } from './useCheckout';

import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import ConfirmAction from '../../ui/ConfirmAction';

function CheckoutButton({ bookingId, guestsName, buttonStyles = {} }) {
  const { isCheckingOut, checkout } = useCheckout();

  return (
    <Modal>
      <Modal.Open opens="checkout">
        <Button {...buttonStyles} disabled={isCheckingOut}>
          Check out
        </Button>
      </Modal.Open>

      <Modal.Window name="checkout">
        <ConfirmAction
          resourceName={guestsName}
          action="checkout"
          onConfirm={(option) => checkout(bookingId, option)}
          disabled={isCheckingOut}
        />
      </Modal.Window>
    </Modal>
  );
}

export default CheckoutButton;
