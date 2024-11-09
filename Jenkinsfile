pipeline {
    agent any  // Use any available agent
}
}

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                // Example build step, replace with your build command (e.g., npm install, mvn package, etc.)
                sh 'echo Building project'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing...'
                // Example test step, replace with your testing command (e.g., npm test, mvn test, etc.)
                sh 'echo Running tests'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...'
                // Example deploy step, replace with actual deployment command
                sh 'echo Deploying project'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
