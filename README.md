# API CRUD COMPANY USER

## Route Example
`GET /company?attributes=name` ALL companies with attribute name
`GET /user?attributes=firstname&where=firstname:John` ALL users firstname where firstname is John 
`POST /assoUserCompany` 
```
"dataAsso":{
    "user_id": 1,
    "company_id": 2
}
``` Add user 1 in company 2

## Stack

Nodejs (Typescript)
Express
Sequelize (Mysql ORM)
Docker (Docker-compose example deploy)