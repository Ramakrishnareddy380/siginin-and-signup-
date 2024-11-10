pipeline {
    agent any

    environment {
        IMAGE_NAME = "backend"
        DOCKER_HUB_REPO = "rkreddy380/backend // Replace with your Docker Hub repo
        SERVER_IP = "127.0.0.1" // IP address of your deployment server
        SSH_CREDENTIALS_ID = "rkreddy380" // Jenkins credentials ID for SSH access
        PORT = "3000"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/Ramakrishnareddy380/siginin-and-signup-.git' // Replace with your GitHub repo
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
                    sh "docker build -t backend."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Login to Docker Hub and push the image
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'reddyrk380', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
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
