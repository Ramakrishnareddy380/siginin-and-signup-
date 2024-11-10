pipeline {
    agent any

    environment {
        IMAGE_NAME = "backend"
        DOCKER_HUB_REPO = "rkreddy380/backend" // Replace with your Docker Hub repo
        SERVER_IP = "127.0.0.1" // IP address of your deployment server
        SSH_CREDENTIALS_ID = "rkreddy380" // Jenkins credentials ID for SSH access
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/Ramakrishnareddy380/siginin-and-signup-.git' // Replace with your GitHub repo
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
                    sh "docker tag ${IMAGE_NAME} ${DOCKER_HUB_REPO}"
                    sh "docker push ${DOCKER_HUB_REPO}"
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                sshagent(credentials: [SSH_CREDENTIALS_ID]) {
                    sh """
                    ssh -o StrictHostKeyChecking=no user@${SERVER_IP} '
                        docker pull ${DOCKER_HUB_REPO} &&
                        docker run -d -p 3000:3000 --name ${IMAGE_NAME} ${DOCKER_HUB_REPO}
                    '
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            deleteDir() // Clean up workspace
        }
        failure {
            echo 'The build failed!'
        }
    }
}
