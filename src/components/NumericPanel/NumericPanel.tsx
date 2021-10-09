import React from 'react';
import { IRandomService } from 'src/services';
import styled from 'styled-components';
import { color, space, SpaceProps } from 'styled-system';

type NumericPanelProps = {
  service: IRandomService;
  number: number;
};

const Container = styled.div`
  display: flex;
`;

const Button = styled.button<SpaceProps>`
  ${color}
  ${space}
`;

const Number = styled.div``;

export function NumericPanel(props: NumericPanelProps): JSX.Element {
  return (
    <Container>
      <Number>{props.number}</Number>
      <Button color='gray' marginLeft='2' onClick={(): void => props.service.update()}>
        Update
      </Button>
    </Container>
  );
}
