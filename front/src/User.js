import React from "react";
import {Badge, Button, ButtonGroup} from "react-bootstrap";
import {Trash, PencilSquare} from "react-bootstrap-icons";

export default function User({user , handleUpdateUser, handleDeleteUser }){
    function handleDeleteUserClick(){
        handleDeleteUser(user.id)
    }
    function handleUpdateUserClick(){
        handleUpdateUser(user)
    }
    return(
        <tr>
            <td> {user.name} </td>
            <td> {user.highscore} <Badge bg="dark">XP</Badge></td>
            <td>
                <ButtonGroup className="me-2" aria-label="First group">
                    <Button variant="warning"   onClick={handleUpdateUserClick}><PencilSquare /></Button>
                    <Button variant="danger"   onClick={handleDeleteUserClick}><Trash /></Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}