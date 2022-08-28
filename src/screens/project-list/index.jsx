
import { List } from './list';
import { SearchPanel } from './search-panel';
import React, { useState, useEffect } from 'react'
import { cleanObject } from 'utils';
import * as qs from 'qs';
console.log(qs)
const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async (res) => {
      console.log('rrrr', res)
      if (res.ok) {
        setList(await res.json());
      }
    });
  }, [param]);
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  }, [])
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  );
};
