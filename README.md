🚀 Kubernetes Deployment Guide

Follow these steps exactly to deploy the entire application with Kind + Kubernetes.

1️⃣ Clone the Repository
git clone https://github.com/dhrumilparmar/GloryMaps--Project-Roadmaps-Generator.git


Downloads the full project locally.

2️⃣ Navigate to the Project Directory
cd GloryMaps--Project-Roadmaps-Generator


Moves you into the project folder.

3️⃣ Go to the Kubernetes Manifests Folder
cd k8s


This folder contains all the Kubernetes YAML files.

4️⃣ Create a Kind Cluster
kind create cluster --name=glorymaps --config=config.yml


Creates a Kubernetes cluster named glorymaps

Uses config.yml to expose ports and configure nodes

5️⃣ Create Namespace
kubectl apply -f ns.yml


Creates the mern-app namespace

Keeps all services organized inside one environment

6️⃣ Deploy MongoDB
kubectl apply -f mongo.yml


Deploys MongoDB pod with persistent volume

Stores roadmap data safely

7️⃣ Expose MongoDB Service
kubectl apply -f mongo-service.yml


Makes MongoDB available internally for backend pods

Service name is usually mongo-service

8️⃣ Deploy Frontend App
kubectl apply -f front-dep.yml


Deploys the React frontend inside Kubernetes

Uses the Docker image specified in the YAML file

9️⃣ Create Frontend Service
kubectl apply -f front-service.yml


Exposes frontend inside the cluster

Required for port-forwarding later

🔟 Deploy Backend App
kubectl apply -f back-dep.yml


Deploys backend API service

Connects to MongoDB using environment variables in YAML

1️⃣1️⃣ Create Backend Service
kubectl apply -f back-service.yml


Exposes backend internally

Frontend uses this service to communicate with the API

1️⃣2️⃣ Access the Frontend (Port Forwarding)
sudo -E kubectl port-forward svc/front-service -n mern-app 5173:5173 --address=0.0.0.0


Opens the frontend at http://localhost:5173

Makes the app accessible from any device on the same network

-E preserves environment variables when using sudo

✅ Verify Deployment

Check running pods:

kubectl get pods -n mern-app


Check services:

kubectl get svc -n mern-app


Check cluster info:

kubectl cluster-info


If all pods show Running, your deployment is successful.
