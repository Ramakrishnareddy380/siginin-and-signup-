pipeline {
    agent any
    tools {
        nodejs "NodeJS"// Ensure "NodeJS" is installed in Jenkins tools configuration
        Docker "docker"
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
        stage('Docker Build and Push') {
            steps {
                script {
                    withDockerRegistry(credentialsId: '1234') {
                        sh 'docker build -t rkreddy380/app:latest .'  // Corrected "build" command
                        sh 'docker push rkreddy380/app:latest'        // Added correct push command
                    }
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    // Check if the "build" script exists in package.json before running
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
