help:
		@clear
		@echo ""
		@echo "==========================================================="
		@echo ""
		@echo "  ** DOCKER COMMANDS **"
		@echo ""
		@echo "      build      - build containers"
		@echo "      start      - run containers"
		@echo "      stop       - stop containers gracefully"
		@echo "      kill       - stop containers forcefully"
		@echo "      restart    - restart containers"
		@echo "      status     - check status of running containers"
		@echo ""
		@echo "  ** DEV COMMANDS **"
		@echo "      node     - Run python commands like manage.py"
		@echo "==========================================================="



# Docker Commands
# -----------
build:
		$(info Building containers.)
		@docker-compose build
start:
		$(info Starting containers.)
		@docker-compose up 
stop:
		$(info Stopping containers.)
		@docker-compose stop
kill:
		$(info Killing containers.)
		@docker-compose kill
restart:
		$(info Restarting containers.)
		@docker-compose restart
status:
		@docker-compose ps
prune:
		$(info Clearing unused images.)
		@docker system prune -af

deploy_production:
		$(info Deploying into production.)
		@docker exec -it marlonadmin gcloud builds submit --config cloudBuild/production.yml .

deploy_staging: 
		$(info Deploying into staging.)
		@docker exec -it marlonadmin gcloud builds submit --config cloudBuild/staging.yml .

# Dev commands
node:
		@docker exec -it marlonadmin bash

