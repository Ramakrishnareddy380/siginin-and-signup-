pipeline {
    agent any

    environment {
        IMAGE_NAME = "signup-signin-app"
        DOCKER_HUB_REPO = "your_dockerhub_username/signup-signin-app" // Replace with your Docker Hub repo
        SERVER_IP = "your_server_ip" // IP address of your deployment server
        SSH_CREDENTIALS_ID = "server-ssh-credentials" // Jenkins credentials ID for SSH access
        PORT = "3000"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/yourusername/your-repo.git' // Replace with your GitHub repo
            }
        }

        stage('Build & Test') {
            steps {
                script {
                    // Install dependencies and run tests
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh "docker build -t ${IMAGE_NAME} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Login to Docker Hub and push the image
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                        sh "docker login -u $DOCKER_HUB_USERNAME -p $DOCKER_HUB_PASSWORD"
                        sh "docker tag ${IMAGE_NAME} ${DOCKER_HUB_REPO}"
                        sh "docker push ${DOCKER_HUB_REPO}"
                    }
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                script {
                    // SSH into the server and deploy the Docker container
                    sshagent(credentials: [SSH_CREDENTIALS_ID]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no user@${SERVER_IP} '
                            docker pull ${DOCKER_HUB_REPO} &&
                            docker stop ${IMAGE_NAME} || true &&
                            docker rm ${IMAGE_NAME} || true &&
                            docker run -d -p ${PORT}:3000 --name ${IMAGE_NAME} ${DOCKER_HUB_REPO}
                        '
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            deleteDir() // Clean up the workspace
        }
        failure {
            echo 'The build failed!'
        }
    }
}
