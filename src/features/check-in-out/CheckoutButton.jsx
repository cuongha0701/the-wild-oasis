import { useCheckout } from './useCheckout';

import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import ConfirmAction from '../../ui/ConfirmAction';

function CheckoutButton({ bookingId, guestsName, onCloseModal }) {
  const { isCheckingOut, checkout } = useCheckout();

  function handleConfirm() {
    checkout(bookingId, {
      onSettled: () => onCloseModal?.(),
    });
  }

  return (
    <Modal>
      <Modal.Open opens="checkout">
        <Button variation="primary" size="small" disabled={isCheckingOut}>
          Check out
        </Button>
      </Modal.Open>

      <Modal.Window name="checkout">
        <ConfirmAction
          resourceName={guestsName}
          action="checkout"
          onConfirm={handleConfirm}
          disabled={isCheckingOut}
        />
      </Modal.Window>
    </Modal>
  );
}

export default CheckoutButton;
