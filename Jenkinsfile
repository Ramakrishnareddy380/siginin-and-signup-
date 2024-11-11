pipeline {
    agent any

    environment {
        DOCKER = '/usr/local/bin/docker' // Path to Docker
        IMAGE_NAME = 'rkreddy380/docker' // Docker image name
        REGISTRY = 'docker.io'          // Docker registry URL
    }

    stages {
        stage('Checkout SCM') {
            steps {
                // Clone the repository
                git branch: 'main', url: 'https://github.com/Ramakrishnareddy380/siginin-and-signup-.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh "${DOCKER} build -t ${IMAGE_NAME}:latest ."
                }
            }
        }
        
        stage('Run Docker Image') {
            steps {
                script {
                    // Run the Docker container
                    sh "${DOCKER} run -d -p 3000:3000 ${IMAGE_NAME}:latest"
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    // Push the Docker image to DockerHub
                    withDockerRegistry([credentialsId: 'dockerhub-credentials', url: "https://${REGISTRY}"]) {
                        sh "${DOCKER} push ${IMAGE_NAME}:latest"
                    }
                }
            }
        }
    }

    post {
        always {
            // Clean up Docker images and containers after the job
            sh "${DOCKER} ps -aq | xargs -I {} ${DOCKER} rm -f {} || true"
            sh "${DOCKER} rmi ${IMAGE_NAME}:latest || true"
        }
    }
}
