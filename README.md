## Requirements
* Java 17

## Running the server and React application
On the root folder
```
./gradlew bootRun
```

## Access the application
After the build is complete and the server is up, go to the following URL on your web browser
```
http://localhost:8080/
```

## Known bugs
* When selecting the files on the form for a new Employee, the name of the files are not being shown on the input, but are in fact being selected.
* As a result of the of the bug above, there is still no validation requiring the user to upload all the documents.
* There is a validation that shows a message for files with 3 pages or more, but the system is accepting and uploading it.

## Missing features
* There is no validation for the format of the CPF and the cellphone number.
* It is not possible to update or remove an Employee after adding one.