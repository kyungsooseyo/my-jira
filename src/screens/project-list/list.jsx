import React from 'react'
export const List = ({ list, users }) => {
  return <table>
    <thead>
      <tr>
        <th>名称</th>
        <th>负责人</th>
      </tr>
    </thead>
    <tbody>
      {
        list.map(project => {
          return <tr key={project.id}>
            <td>{project.name}</td>
            <td>{users.find(user => user.id === project.id)?.name || '未知'}</td>
          </tr>
        })
      }
    </tbody>
  </table>;
};
