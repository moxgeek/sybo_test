import {Configuration, UserApi} from "./generated";
import {UserRequest} from "./generated";

const config = new Configuration();

const userApi = new UserApi(config,"http://localhost:8000");

const userRequest = new UserRequest()

export {userApi, userRequest};