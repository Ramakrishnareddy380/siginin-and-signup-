pipeline {
  agent any
  tools { nodejs "NodeJS" }
  stages {
    stage('Checkout SCM') {
      steps {
        git branch: 'main', url: 'https://github.com/Ramakrishnareddy380/siginin-and-signup-.git'
      }
    }
    stage('Test') {
      steps {
        sh 'npm install'  // Change from 'bat' to 'sh' for Unix/Linux/macOS systems
        sh 'npm test'
      }

      stage('Build') {
      steps {
        sh 'npm run build'  // Change from 'bat' to 'sh' for Unix/Linux/macOS systems
      }
    }
  }
}
