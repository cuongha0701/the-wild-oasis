import styled, { css } from 'styled-components';

const Row = styled.div`
  display: flex;
  ${(props) => {
    if (props.type === 'horizontal')
      return css`
        justify-content: space-between;
        align-items: center;
      `;

    if (props.type === 'vertical')
      return css`
        flex-direction: column;
        gap: 1.6rem;
      `;
  }}
`;

Row.defaultProps = {
  type: 'vertical',
};
export default Row;
