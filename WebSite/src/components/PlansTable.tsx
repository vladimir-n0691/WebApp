import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import { Add, ArrowForward, Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Plan } from '../common/types';
import { useEffect } from 'react';
import PlansApi from '../api/PlansApi';
import EditPlanDialog from './plan/EditPlanDialog';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';


export default function PlansTable() {
  const [editPlan, setEditPlan] = React.useState<Plan | null>(null);

  const [page, setPage] = React.useState(0);
  const [plans, setPlans] = React.useState<Plan[]>([]);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    PlansApi.getPlans().then((p) => setPlans(p))
  }, []);

  const navigate = useNavigate();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Toolbar
        style={{ marginLeft: 0, paddingLeft: 0 }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 1
        }}
      >
        <Button variant="outlined" startIcon={<Add />} onClick={() => {
          setEditPlan({id: -1, name: "", url: "", description: ""})
        }}>
          Add plan
        </Button>
      </Toolbar>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 640 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">URL</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plans
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell align="left">{row.id}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.url}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          edge="start"
                          color="inherit"
                          aria-label="open drawer"
                          onClick={async () => {
                            if (window.confirm(`Delete plan ${row.name}?`)) {
                              await PlansApi.deletePlan(row.id)
                              await PlansApi.getPlans().then((p) => setPlans(p))
                            }
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          edge="start"
                          color="inherit"
                          aria-label="open drawer"
                          onClick={() => setEditPlan(row)}
                        >
                          <Edit />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          edge="start"
                          color="inherit"
                          aria-label="open drawer"
                          onClick={() => navigate(`/plans/${row.id}`)}
                        >
                          <ArrowForward />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={plans.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {editPlan && <EditPlanDialog plan={editPlan} handleSave={async (p) => {
          setEditPlan(null);
          await PlansApi.editPlan(p)
          await PlansApi.getPlans().then((p) => setPlans(p))
        }} handleClose={() => setEditPlan(null)} />}
      </Paper>
    </>
  );
}
