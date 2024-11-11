pipeline {
    agent any
    tools {
        nodejs 'NodeJS'          // Ensure Node.js is installed
        dockerTool 'docker'       // Use the Docker tool configured in Jenkins
    }
    stages {
        stage('Checkout SCM') {
            steps {
                git branch: 'main', url: 'https://github.com/Ramakrishnareddy380/siginin-and-signup-.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Docker Build and Push') {
            steps {
                script {
                    withDockerRegistry(credentialsId: '1234') {
                        sh "docker build -t rkreddy380/app ."  // Build Docker image
                        sh "docker push rkreddy380/app"        // Push Docker image
                    }
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    def buildScriptExists = sh(script: "npm run | grep build", returnStatus: true) == 0
                    if (buildScriptExists) {
                        sh 'npm run build'
                    } else {
                        echo 'No build script defined.'
                    }
                }
            }
        }
    }
}
