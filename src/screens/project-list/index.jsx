import { List } from './list'
import { SearchPanel } from './search-panel'
import React, { useState, useEffect } from 'react'
import { cleanObject, useMount, useDebounce } from 'utils'
import * as qs from 'qs'
console.log(qs)
const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const debounceParam = useDebounce(param, 1000)
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(
      async (res) => {
        console.log('rrrr', res)
        if (res.ok) {
          // const a = await res.json()
          // console.log('🚀 ~ file: index.jsx ~ line 21 ~ fetch ~ json', a)
          setList(await res.json())
        }
      }
    )
  }, [debounceParam])
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json())
      }
    })
  })
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <div>
        <SearchPanel
          param={param}
          setParam={setParam}
          users={users}
        ></SearchPanel>
      </div>
      <div style={{ display: 'inline-block' }}>
        <List list={list} users={users}></List>
      </div>
    </div>
  )
}
