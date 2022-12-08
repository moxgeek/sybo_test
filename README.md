
# Test project for sybo

a simple project with python ( using fastapi and sqlite as database ) and react as front end.

## Backend
location : `back` 

use the package manager [pip](https://pip.pypa.io/en/stable/) to install all requirements located on the txt file.

```
pip install -r requirements.txt
```
and in order to start the server : 
```python
uvicorn main:app --host localhost --port 8005
```
that will show the following log: 
```python
2022-12-08 18:31:08,604 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2022-12-08 18:31:08,605 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("user")
2022-12-08 18:31:08,605 INFO sqlalchemy.engine.Engine [raw sql] ()
2022-12-08 18:31:08,606 INFO sqlalchemy.engine.Engine COMMIT
INFO:     Started server process [17132]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://localhost:8005 (Press CTRL+C to quit)
```

NB: the port is 8005, you can change it if you want, however you should change the url in your front in this case.

i let some of test record at database if you want to just fetch at the beginning .
also there is some test 
**( i want to add more test but i don't see what we could test at the end ... )**

## Frontend (sorry for the ugly design)

location : `front` 
use the package manager npm in order to install all dependencies 

```bash
npm install --save
```

in order to run the server
```bash
 run start
```
by default it's 3000 port, if you are using somehow an other port, **please consider to update the url in backend to avoid any Cross-Origin nightmare.** 

also there is some test file using **puppeteer**.
