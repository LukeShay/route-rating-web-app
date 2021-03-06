import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import React from 'react';
import { StandardProps } from '../standardProps';

export interface SimpleTableProps extends StandardProps {
  head?: React.ReactNode;
  body: React.ReactNode[] | null;
}

const SimpleTable: React.FC<SimpleTableProps> = ({
  head,
  body,
  testId,
  id,
}): JSX.Element => {
  return (
    <TableContainer
      component={Paper}
      data-test-id={testId}
      data-testid={`${id}-table-test-id`}
    >
      <Table>
        <TableHead>{head}</TableHead>
        <TableBody>{body}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimpleTable;
