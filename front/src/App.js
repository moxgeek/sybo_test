import './App.css';
import {Container, Row, Button, InputGroup, Overlay, Popover, OverlayTrigger} from "react-bootstrap";

import Form from 'react-bootstrap/Form';
import UserList from "./UserList";
import React, {useState, useRef, useEffect} from "react";
import {Configuration, UserApi} from "./generated";

import "bootstrap/dist/css/bootstrap.css";
const config = new Configuration();

const userApi = new UserApi(config,"http://localhost:8005");



function App() {

    const [users,setUsers] = useState([{}])
    const [showUpdate, setShowUpdate] = useState(false);
    const userNameRef = useRef()
    const highscoreRef = useRef()
    const updateIdRef = useRef()
    const [showPop,setShowPop] = useState(false);


    useEffect( () => {
        const fetchData = async () => {
         const tmpUserList =   await userApi.getAllUsersUsersGet()
            setUsers(tmpUserList.data)
        }
        fetchData()
    },[])

    async function handleAddUser() {
        try {
            const userResponse = await userApi.createUserUserPost({
                name: userNameRef.current.value,
                highscore: highscoreRef.current.value
            })
            setUsers(prevUsers => {
                return [...prevUsers, userResponse.data]
            });

            userNameRef.current.value = null
            highscoreRef.current.value = null
        }catch (e) {
            setShowPop(true)
        }
    }

    async function handleDeleteUser(e) {
        try {
            await userApi.deleteUserUserUserIdDelete(e)
            const newUsers = users.filter((x) => {
                return x.id !== e
            })
            setUsers(newUsers);
        }catch (e){
            setShowPop(true)
        }
    }

    async function handleUpdateUser(user) {
        updateIdRef.current.value = user.id;
        userNameRef.current.value = user.name;
        highscoreRef.current.value = user.highscore;
        setShowUpdate(true)
    }

    function cancelUpdateUser(){
        updateIdRef.current.value = null;
        userNameRef.current.value = null;
        highscoreRef.current.value = null;
        setShowUpdate(false)
    }

    async function confirmUpdateUser() {
        const id = updateIdRef.current.value
        const name = userNameRef.current.value;
        const highscore = highscoreRef.current.value;

        try {
            let updatedUser = await userApi.updateUserUserUserIdPut(id, {name: name, highscore: highscore})
            updatedUser = updatedUser.data;
            users.forEach(user => {
                if (user.id === updatedUser.id) {
                    user.name = updatedUser.name
                    user.highscore = updatedUser.highscore
                }
            });
            cancelUpdateUser()
           }catch (e){
        setShowPop(true)
    }
    }

    return (
      <Container>
          <Row>
              <UserList users={users} handleUpdateUser={handleUpdateUser} handleDeleteUser={handleDeleteUser}/>


              <Form>
                  <input type="hidden"  ref={updateIdRef}/>
                  <Form.Group className="mb-3">
                      <Form.Label>Full name</Form.Label>
                      <Form.Control  ref={userNameRef}  type="text" placeholder="Enter the user full name" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                      <Form.Label>High score</Form.Label>
                      <InputGroup>
                          <InputGroup.Text>XP</InputGroup.Text>
                          <Form.Control
                              ref={highscoreRef} type="number"
                              placeholder="Enter a start score"
                          />
                      </InputGroup>
                  </Form.Group>
                  <Overlay
                      placement="bottom"
                      show={showPop}
                  >
                      <Popover>
                          <Popover.Header as="h3">
                              <button  onClick={()=>{setShowPop(false)}}>&times;</button>
                              information that you have put in are incorrect.
                          </Popover.Header>
                          <Popover.Body>

                              remember, the name should be <strong>longer then 6 and the xp score should be bigger the 1</strong>
                              <br/>

                              <i>sorry if your name is KIM</i>
                          </Popover.Body>
                      </Popover>

                  </Overlay>
                  { !showUpdate ? (
                      <Button onClick={handleAddUser} variant="success">Add</Button>
                  ) : (
                      <>
                      <Button onClick={confirmUpdateUser} variant="warning">Update</Button>{' '}
                      <Button onClick={cancelUpdateUser} variant="secondary">Clear</Button>{' '}

                      </>
                      )}
                   </Form>
          </Row>
      </Container>
  )
}

export default App;
