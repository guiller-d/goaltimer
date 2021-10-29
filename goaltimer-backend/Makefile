all: clean

clean:
	gradle clean

compile:
	gradle build

test:
	gradle test

jar: 
	gradle build -x test
	gradle bootJar

run: jar
	echo Starting Spring at:  http://localhost:8080
	java -jar build/libs/goaltimer-backend-1.0.jar

# Docker

docker-build: jar
	docker build -t goaltimer-backend .
	docker images

docker-run: docker-build
	docker run --name goaltimer-backend -td -p 80:8080 goaltimer-backend	
	docker ps

docker-clean:
	docker stop goaltimer-backend
	docker rm goaltimer-backend
	docker rmi goaltimer-backend

docker-shell:
	docker exec -it goaltimer-backend bash 

docker-push:
	docker login
	docker build -t $(account)/goaltimer-backend:v1 -t $(account)/goaltimer-backend:v1 .
	docker push $(account)/goaltimer-backend:v1 

# Compose

network-ls:
	docker network ls 

network-create:
	docker network create --driver bridge goaltimer-backend-v1_network

network-prune:
	docker network prune

compose-up:
	docker-compose up --scale gumball=3 -d

compose-down:
	docker-compose down 	

lb-stats:
	echo "user = admin | password = admin"
	open http://localhost:1936

lb-test:
	open http://localhost


# Pod

pod-run:
	kubectl apply -f pod.yaml

pod-list:
	kubectl get pods

pod-desc:
	kubectl describe pods goaltimer-backend

pod-delete:
	kubectl delete -f pod.yaml

pod-shell:
	kubectl exec -it goaltimer-backend -- /bin/bash

pod-logs:
	kubectl logs -f goaltimer-backend

# Deployment

deployment-create:
	kubectl create -f deployment.yaml --save-config 

deployment-get:
	kubectl get deployments

deployment-get-pods:
	kubectl get pods -l name=goaltimer-backend

deployment-pod-shell:
	kubectl exec -it $(pod) -- /bin/bash

deployment-upgrade:
	kubectl apply  -f deployment.yaml

deployment-delete:
	kubectl delete deployment goaltimer-backend-deployment

# Service

service-create:
	kubectl create -f service.yaml

service-get:
	kubectl get services

service-get-ip:
	kubectl get service goaltimer-backend -o wide

service-delete:
	kubectl delete service goaltimer-backend

# Ingress

ingress-apply:
	kubectl apply -f ingress.yaml

ingress-ip:
	kubectl get ingress goaltimer-backend-ingress




