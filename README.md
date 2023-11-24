# School System API

This API manages students for a school system, providing endpoints for CRUD operations on student records.

## Setup Instructions

### Prerequisites

- Node.js
- Microsoft SQL Server
- ORM (Sequelize)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/souravsaini/nodejs-task2.git
   cd nodejs-task3
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory:

   ```env
   TOKEN_SECRET='<ANY STRING>'
   DB_NAME='<DB NAME>'
   DB_USER='<USERNAME>'
   DB_PASSWORD='<PASSWORD>'
   DB_HOST='localhost' or Remote URL
   PORT=5000
   ```

4. Start the server:

   ```bash
   node app.js
   ```

## API Endpoints

### Auth

#### Signup

- Endpoint: `POST /api/auth/signup`
- Description: Register a user.
- Request Body:
  - `email` (required): User email.
  - `password` (required): User password.

#### Signin

- Endpoint: `POST /api/auth/signin`
- Description: User Login.
- Request Body:
  - `email` (required): User email.
  - `password` (required): User password.

### Students

#### Add a new student

- Endpoint: `POST api/user/students`
- Description: Creates a new student record.
- Request Body:
  - `firstname` (required): The firstname of the student.
  - `lastname`: The lastname of the student.
  - `studentId` (required): A unique id of the student (can be registration id provided by the school)
- Headers:
  - `Authorization`: Bearer JWT_TOKEN

#### Retrieve student details

- Endpoint: `GET api/user/students/{id}`
- Description: Retrieves details of a specific student by ID.
- Parameters:
  - `{id}` - The unique identifier of the student.
- Headers:
  - `Authorization`: Bearer JWT_TOKEN

#### List students with cursor-based pagination

- Endpoint: `GET api/user/students`
- Description: Lists students using cursor-based pagination for efficient data retrieval.
- Query Parameters:
  - `cursor` (optional): The cursor to paginate through student records.
- Example:

  - `GET /api/user/students?cursor=10`

    Above API request will return index=10 to index=19 records from the table after sorting it via firstname.
    This will return the 10 records from index=10 in the database as the limit set in the code is 10.
    Limit can also be passed as query param in the future release.

    In this example, Student table has 21 records.

###### API Response for /api/user/students?cursor=10

    ```json
      {
        "success": true,
        "message": "Students fetched successfully",
        "data": {
            "students": [
                {
                    "_id": "0853a822-339f-416d-9deb-54e09d24bc48",
                    "firstname": "Maria",
                    "lastname": "Garcia",
                    "studentId": "4"
                },
                {
                    "_id": "cbad3627-0cfe-4d2b-aa2b-33b3ad345d2c",
                    "firstname": "Marlon",
                    "lastname": "Samuels",
                    "studentId": "17"
                },
                {
                    "_id": "982747c4-e70a-465d-93fa-4a257a6426b6",
                    "firstname": "Martha",
                    "lastname": "Johnson",
                    "studentId": "11"
                },
                {
                    "_id": "dd149f3b-2f05-447e-b615-014b4a372aba",
                    "firstname": "Mary",
                    "lastname": "Martinez",
                    "studentId": "7"
                },
                {
                    "_id": "94784620-d48e-4e42-bde7-47f9848a40f7",
                    "firstname": "Mary",
                    "lastname": "Smith",
                    "studentId": "6"
                },
                {
                    "_id": "4dc9c434-ccbe-40b5-a439-c88f1bea2785",
                    "firstname": "Mary",
                    "lastname": "Jones",
                    "studentId": "22"
                },
                {
                    "_id": "5a446244-ae60-4019-b8c9-8a202ccd3dea",
                    "firstname": "Michael",
                    "lastname": "Smith",
                    "studentId": "2"
                },
                {
                    "_id": "6a213f69-7fd2-4fb3-bfa8-273d529b1544",
                    "firstname": "Mitchelle",
                    "lastname": "Miller",
                    "studentId": "19"
                },
                {
                    "_id": "7165b8b5-822f-40c6-8b21-f297bc8d6677",
                    "firstname": "Robert",
                    "lastname": "Smith",
                    "studentId": "3"
                },
                {
                    "_id": "8c8b0910-5995-48f9-ba00-27e8c9af6e4a",
                    "firstname": "Serena",
                    "lastname": "Williams",
                    "studentId": "13"
                }
            ],
            "nextCursor": 20
          }
      }
    ```

###### API Response for /api/user/students?cursor=20

    ```json
      {
        "success": true,
        "message": "Students fetched successfully",
        "data": {
            "students": [
                {
                    "_id": "7c43d29f-6369-4de5-935d-fc108a6157d2",
                    "firstname": "Venus",
                    "lastname": "Williams",
                    "studentId": "14"
                }
            ],
            "nextCursor": null
        }
    }
    ```

#### Update student information

- Endpoint: `PUT api/user/students/{id}`
- Description: Updates details of a specific student by ID. It will only update the fields which are passed in the request body.
- Parameters:
  - `{id}` - The unique identifier of the student.
- Request Body (fields to update):
  - `firstname`: The firstname of the student.
  - `lastname`: The lastname of the student.
  - `studentId`: A unique id of the student (can be registration id provided by the school)

#### Remove a student

- Endpoint: `DELETE api/user/students/{id}`
- Description: Removes a specific student by ID.
- Parameters:
  - `{id}` - The unique identifier of the student.
