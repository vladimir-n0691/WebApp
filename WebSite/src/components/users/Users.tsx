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
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useDispatch } from 'react-redux';
import { USER_ID_KEY } from '../../common/constants';
import { User } from '../../common/types';
import UsersApi from '../../api/UsersApi';
import UserEditDialog from './UserEditDialog';

export default function Users() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [users, setUsers] = React.useState<User[]>([]);

    const [editUser, setEditUser] = React.useState<User | null>(null);

    useEffect(() => {
        if (users.length == 0) {
            UsersApi.getAll().then((p) => setUsers(p))
        }
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleAdd = () => {
        setEditUser({ id: 0, userRole: 0, company: "", login: "", email: "", firstName: "", lastName: "", password: "" })
    }

    const handleEdit = (user: User) => {
        setEditUser(user)
    }

    const handleDelete = async (user: User) => {
        if (window.confirm(`Delete user ${user.login}?`)) {
            await UsersApi.delete(user.id)
            UsersApi.getAll().then((p) => setUsers(p))
        }
    }

    const handleSave = async (user: User) => {
        setEditUser(null);

        if (user.id == 0) {
            await UsersApi.create(user)
        }
        else {
            await UsersApi.update(user)
        }

        UsersApi.getAll().then((p) => setUsers(p))
    }

    const handleClose = () => setEditUser(null)

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
                <Button variant="outlined" startIcon={<Add />} onClick={handleAdd}>
                    Add user
                </Button>
            </Toolbar>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 640 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Id</TableCell>
                                <TableCell align="left">Role</TableCell>
                                <TableCell align="left">First name</TableCell>
                                <TableCell align="left">Last name</TableCell>
                                <TableCell align="left">Login</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell align="left">{row.id}</TableCell>
                                            <TableCell align="left">{row.userRole}</TableCell>
                                            <TableCell align="left">{row.firstName}</TableCell>
                                            <TableCell align="left">{row.lastName}</TableCell>
                                            <TableCell align="left">{row.login}</TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="open drawer"
                                                    onClick={() => handleDelete(row)}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="open drawer"
                                                    onClick={() => handleEdit(row)}
                                                >
                                                    <Edit />
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
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

                {editUser && <UserEditDialog user={editUser} handleSave={handleSave} handleClose={handleClose} />}
            </Paper>
        </>
    );
}