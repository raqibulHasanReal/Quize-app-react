import React from "react";
import {admins} from "../Constant/admin";
import {users} from "../Constant/user";
import {Card} from "react-bootstrap";
import infoStyle from "../Style/infoStyle.module.css";

const Information = () => {
  const getAdmins = () => {
    const list = []
    admins.map((admin,index) => {
      list.push(
          <Card
              bg={"success"}
              key={index}
              className={infoStyle.card}
          >
              <Card.Header>Admin</Card.Header>
              <Card.Body>
                  <Card.Title> name: {admin.name}</Card.Title>
                  <Card.Text className="text-white">
                      email: {admin.email}
                  </Card.Text>
                  <Card.Text className="text-white">
                      password: {admin.password}
                  </Card.Text>
              </Card.Body>
          </Card>
      )
    })
    return list
  }
  const getUsers = () => {
      const list = []
      users.map((user,index) => {
          list.push(
              <Card
                  bg={"danger"}
                  key={index}
                  className={infoStyle.card}
              >
                  <Card.Header>User</Card.Header>
                  <Card.Body>
                      <Card.Title> name: {user.name}</Card.Title>
                      <Card.Text className="text-white">
                          email: {user.email}
                      </Card.Text>
                      <Card.Text className="text-white">
                          password: {user.password}
                      </Card.Text>
                  </Card.Body>
              </Card>
          )
      })
      return list
  }
  return(
      <div className={infoStyle.container}>
          <div className={infoStyle.container}>
              <div className={infoStyle.title}>
                admins:
              </div>
              <div className={infoStyle.cardContainer}>
                {getAdmins()}
              </div>
          </div>
          <div className={infoStyle.container}>
              <div className={infoStyle.title}>
                  users:
              </div>
              <div className={infoStyle.cardContainer}>
                  {getUsers()}
              </div>
          </div>
      </div>
  )
}

export default Information