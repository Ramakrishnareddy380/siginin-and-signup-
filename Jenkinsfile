pipeline {
    agent any
    tools {
        nodejs "NodeJS" // Ensure "NodeJS" is installed in Jenkins tools configuration
        dockerTool"docker"
    }
    stages {
        stage('Checkout SCM') {
            steps {
                git branch: 'main', url: 'https://github.com/Ramakrishnareddy380/siginin-and-signup-.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'  // Install dependencies
            }
        }
        stage('Check Docker Access') {
            steps {
                sh 'which docker || echo "Docker not found"'
                sh 'docker --version'
            }
        }
        stage('Docker Build and Push') {
            steps {
                script {
                    withDockerRegistry(credentialsId: '1234') {
                        sh 'docker build -t rkreddy380/app .'  // Docker build command
                        sh 'docker push rkreddy380/app'        // Docker push command
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
