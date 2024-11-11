pipeline {
    agent any
    tools {
        nodejs 'NodeJS' // Ensure "NodeJS" is installed in Jenkins tools configuration
    }
    environment {
        DOCKER_PATH = '/usr/local/bin/docker' // Explicit path to the Docker executable
    }
    stages {
        stage('Checkout SCM') {
            steps {
                git branch: 'main', url: 'https://github.com/Ramakrishnareddy380/siginin-and-signup-.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install' // Install dependencies
            }
        }
        stage('Check Docker Access') {
            steps {
                script {
                    def dockerExists = sh(script: "if [ -x \"$DOCKER_PATH\" ]; then echo 'Docker found'; else echo 'Docker not found'; fi", returnStdout: true).trim()
                    echo dockerExists
                    sh "$DOCKER_PATH --version || echo 'Docker command failed'"
                }
            }
        }
        stage('Build and Push Docker Image') {
            steps {
                script {
                    sh '/usr/local/bin/docker --version'
                    sh '/usr/local/bin/docker build -t app .'
                   
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
