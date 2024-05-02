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
import { Plan } from '../../common/types';
import { useEffect } from 'react';
import PlansApi from '../../api/PlansApi';
import EditPlanDialog from './EditPlanDialog';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useDispatch } from 'react-redux';
import { USER_ID_KEY } from '../../common/constants';



export default function PlansTable() {
  const dispath = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [plans, setPlans] = React.useState<Plan[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editPlan, setEditPlan] = React.useState<Plan | null>(null);

  const userId = localStorage.getItem(USER_ID_KEY)

  useEffect(() => {
    if (userId != null) {
      PlansApi.getPlansByUserId(Number(userId)).then((p) => setPlans(p))
    }

  }, []);

  //const setPlanFunc = (plan: Plan | null) => dispath(setPlan(plan));

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAddPlan = () => {
    if (userId != null) {
      setEditPlan({ id: 0, userId: Number(userId), name: "", url: "", description: "" })
    }
  }

  const handleDeletePlan = async (p: Plan) => {
    if (window.confirm(`Delete plan ${p.name}?`)) {
      await PlansApi.deletePlan(p.id)
      if (userId != null) {
        PlansApi.getPlansByUserId(Number(userId)).then((p) => setPlans(p))
      }
    }
  }

  const handleOpenPlan = (p: Plan) => {
    //setPlanFunc(p); 
    navigate(`/plans/${p.id}`);
  }

  const handleSavePlan = async (p: Plan) => {
    setEditPlan(null);
    if (p.id == 0) {
      await PlansApi.createPlan(p)
    }
    else {
      await PlansApi.updatePlan(p)
    }

    if (userId != null) {
      PlansApi.getPlansByUserId(Number(userId)).then((p) => setPlans(p))
    }
  }

  const handleClosePlan = () => setEditPlan(null)

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
        <Button variant="outlined" startIcon={<Add />} onClick={handleAddPlan}>
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
                          onClick={() => handleDeletePlan(row)}
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
                          onClick={() => handleOpenPlan(row)}
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

        {editPlan && <EditPlanDialog plan={editPlan} handleSave={handleSavePlan} handleClose={handleClosePlan} />}
      </Paper>
    </>
  );
}