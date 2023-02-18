# Fullstack Afiliados

## How to use?

To use the application it is recommended to have docker installed, so it is not necessary to install the database and other utilities found in the docker-compose file.

Clone this project on your favorite dir and change to backend dir:

```console
cd backend
```

Edit the .env.example file to .env and put the necessary environment variables.

Start the dockers containers.

```console
docker-compose up -d
```

Run the command to create the tables in the database

```console
npx prisma generate
```

Run the migrates

```console
npx prisma migrate deploy
```
 
The application was available in

```console
http://localhost:3000/
```

## The available routes

### Return Transactions 

Route which returns an array of objects with information about the affiliate and a totalizer of the value of transactions carried out. 

### Request
Accept: application/json
```console
http://localhost:3000/transactions
```

### Response

```javascript
{
  "total" : string,
  "name_seller" : string,
}
```

### Upload File

Route for sending the txt file with information on transactions carried out by affiliates.
Method used: POST.

```console
http://localhost:3000/upload
```

change {file location.txt} to the location of the file you want to test. (Recommend using the [sales.txt](thub.com/mateusgiroletti/fullstack-afiliados/blob/main/sales.txt) file)

```
--form 'file=@"{file_location.txt}"'
```

### Response

```javascript
{
    "msg": "Transactions inserted successfully"
}
```

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `FILE IS REQUIRED!` |
| 404 | `NOT FOUND` |
| 415 | `FILE TYPE NOT ACCEPT` |
| 422 | `FILE FORMATTING IS NOT APPROPRIATE!` |
| 500 | `INTERNAL SERVER ERROR` |

>  This is a challenge by [Coodesh](https://coodesh.com/)
