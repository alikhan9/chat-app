import axios from "axios";

axios.defaults.withCredentials = true;

export const login = (username, password) => {
  const options = {
    url: `https://chatapp.alikhan-zaipoulaiev.fr/login?login=${username}&password=${password}`,
    method: 'POST',
  };
  return axios(options);
}

export const logout = () => {
  const options = {
    url: `https://chatapp.alikhan-zaipoulaiev.fr/logout`,
    method: 'POST',
  };
  return axios(options);
}

export const getUser = () => {
  const options = {
    url: `https://chatapp.alikhan-zaipoulaiev.fr/api/v1/users/getUser`,
    method: 'GET',
  };
  return axios(options);
}

export const getUserGroups = () => {
  const options = {
    url: `https://chatapp.alikhan-zaipoulaiev.fr/api/v1/groups/personal`,
    method: 'GET',
  };
  return axios(options);
}

export const getUserGroupsMessages = () => {
  const options = {
    url: `https://chatapp.alikhan-zaipoulaiev.fr/api/v1/groupMessages/personal`,
    method: 'GET',
  };
  return axios(options);
}

export const joinGroup = (group) => {
  const body = {
      id: group.id,
      name: group.name
  };

  return axios.post(`https://chatapp.alikhan-zaipoulaiev.fr/api/v1/groupMembers/join`, body);
}

export const leaveGroup = (group) => {
  const body = {
      id: group.id,
      name: group.name
  };

  return axios.post(`https://chatapp.alikhan-zaipoulaiev.fr/api/v1/groupMembers/leave`,body);
}


export const createUser = (username, first_name, last_name, password, email, dateofbirth) => {
  const data = {
    username: username,
    first_name: first_name,
    last_name: last_name,
    password: password,
    email: email,
    dateofbirth: dateofbirth

  };

  return axios.post('https://chatapp.alikhan-zaipoulaiev.fr/api/v1/users/add', data);
}


export const getGroupByName = (name) => {
  const data = {
    params: {
      name: name
    }
  };
  return axios.get("https://chatapp.alikhan-zaipoulaiev.fr/api/v1/groups/specefic",data);
}


export const getUserContacts = () => {
  const options = {
    url: `https://chatapp.alikhan-zaipoulaiev.fr/api/v1/users/contacts`,
    method: 'GET',
  };
  return axios(options);
}

export const deleteUserContact = (username) => {

  const data = {
    username : username
  };
  return axios.delete(`https://chatapp.alikhan-zaipoulaiev.fr/api/v1/contacts`,{data});
}

export const getUsersByUsername = (username) => {

  const data = {
    params: {
      username: username
    }
  };
  return axios.get(`https://chatapp.alikhan-zaipoulaiev.fr/api/v1/users/usernames`,data);
}

export const addContact = (name) => {
  const body = {
      username: name
  };

  return axios.post(`https://chatapp.alikhan-zaipoulaiev.fr/api/v1/contacts`, body);
}

export const getGroupMessages = (id) => {

  const data = {
    params: {
      id: id
    }
  };
  return axios.get(`https://chatapp.alikhan-zaipoulaiev.fr/api/v1/groupMessages/specefic`,data);
}

export const getUserContactsMessages = () => {
  const options = {
    url: `https://chatapp.alikhan-zaipoulaiev.fr/api/v1/messages/personal`,
    method: 'GET',
  };
  return axios(options);
}

export const getUserContactMessages = (username) => {

  const data = {
    params: {
      username: username
    }
  };
  return axios.get("https://chatapp.alikhan-zaipoulaiev.fr/api/v1/messages/specefic",data);
}

export const createGroup = (user,name) => {
  const body = {
      id: null,
      name: name,
      owner: user
  };

  return axios.post(`https://chatapp.alikhan-zaipoulaiev.fr/api/v1/groups`, body);
}

export const deleteGroup = (groupId) => {
  const data = {
    params :{
      id : groupId
    }

  };
  return axios.delete(`https://chatapp.alikhan-zaipoulaiev.fr/api/v1/groups`, data);
}
