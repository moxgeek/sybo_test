import React from "react";
import User from "./User";
import Table from 'react-bootstrap/Table';

export default function UserList({ users, handleUpdateUser, handleDeleteUser }){
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Full name</th>
                <th>High score</th>
                <th className="w-25">Action</th>
            </tr>
            </thead>
            <tbody>
            {
                users.map(user => {
                return <User key={user.user_id} handleUpdateUser={handleUpdateUser} handleDeleteUser={handleDeleteUser} user={user} />
            })
            }
            </tbody>
        </Table>
    )
}