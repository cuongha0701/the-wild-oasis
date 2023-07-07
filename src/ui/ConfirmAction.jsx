import styled from 'styled-components';

import Button from './Button';
import Heading from './Heading';
import SpinnerMini from './SpinnerMini';

const StyledConfirmAction = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmAction({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  action,
}) {
  let title;
  let buttonVariation;

  if (action === 'delete') {
    title = `Confirm to delete ${resourceName}`;
    buttonVariation = 'danger';
  }

  if (action === 'checkout') {
    title = `Check out for guest: ${resourceName}?`;
    buttonVariation = 'primary';
  }

  if (!action) {
    title = 'Confirm action?';
    buttonVariation = 'primary';
  }

  return (
    <StyledConfirmAction>
      <Heading as="h3">{title}</Heading>
      <p>Are you sure you want to continue? This action cannot be undone.</p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          variation={buttonVariation}
          disabled={disabled}
          onClick={() => onConfirm({ onSettled: () => onCloseModal?.() })}
        >
          {disabled ? <SpinnerMini /> : 'Confirm'}
        </Button>
      </div>
    </StyledConfirmAction>
  );
}

export default ConfirmAction;
