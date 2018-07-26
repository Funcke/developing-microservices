# developing-microservices

This is the home of the Dynatrace Developing Microservices workshop.

Information: dominik.sachsenhofer@dynatrace.com

<br>
<br>

# Lab 1: Container and containerized apps

### Step 1/5: Create a Python Web application

File: directory/app.py

```
from flask import Flask 
app = Flask(__name__) 

@app.route("/")
def hello(): 
   return "Hello World!"

if __name__ == '__main__':
   app.run(debug=False, host='0.0.0.0', port=8080)
```

### Step 2/5: Create a requirements.txt

File: directory/requirements.txt

```
flask==0.10.1
```

### Step 3/5: Create a Dockerfile

File: directory/Dockerfile

```
FROM ubuntu:latest 
RUN apt-get update 
RUN apt-get install -y python-pip python-dev build-essential wget curl
COPY . /app 
WORKDIR /app 
RUN pip install -r requirements.txt 
EXPOSE 8080 
ENTRYPOINT ["python"] 
CMD ["app.py"]
```

### Step 4/5: Build the Docker container

```
sudo docker build -t sai-research/hello-world:latest .
```

### Step 5/5: Run the Docker container

```
sudo docker run -p 8080:8080 sai-research/hello-world:latest
```
