import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HiArrowUpOnSquare, HiTrash } from 'react-icons/hi2';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import Modal from '../../ui/Modal';
import ConfirmAction from '../../ui/ConfirmAction';

import { useBooking } from './useBooking';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useDeleteBooking } from './useDeleteBooking';
import { useCheckout } from '../check-in-out/useCheckout';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();

  const { isLoadingBooking, booking } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeletingBooking, deleteBooking } = useDeleteBooking();

  const moveBack = useMoveBack();

  if (isLoadingBooking) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;

  const {
    status,
    id: bookingId,
    guests: { fullName },
  } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === 'checked-in' && (
          <Modal.Open opens="checkout">
            <Button icon={<HiArrowUpOnSquare />}>Check out</Button>
          </Modal.Open>
        )}

        <Modal.Open opens="delete-booking">
          <Button
            variation="danger"
            icon={<HiTrash />}
            disabled={isDeletingBooking}
          >
            Delete
          </Button>
        </Modal.Open>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>

      <Modal.Window name="checkout">
        <ConfirmAction
          resourceName={fullName}
          action="checkout"
          onConfirm={() => checkout(bookingId)}
          disabled={isCheckingOut}
        />
      </Modal.Window>

      <Modal.Window name="delete-booking">
        <ConfirmAction
          resourceName="booking"
          action="delete"
          onConfirm={() => {
            deleteBooking(bookingId, {
              onSuccess: () => moveBack(),
            });
          }}
          disabled={isDeletingBooking}
        />
      </Modal.Window>
    </Modal>
  );
}

export default BookingDetail;
